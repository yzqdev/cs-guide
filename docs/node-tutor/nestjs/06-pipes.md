---
order: 6
---

# 管道与数据验证

管道（Pipe）有两个作用：**数据转换**（将输入数据转换为所需格式）和**数据验证**（验证输入数据的有效性）。

## 一、内置管道

NestJS 提供了 8 个内置管道：

| 管道 | 作用 |
|------|------|
| `ValidationPipe` | 基于 class-validator 的验证管道 |
| `ParseIntPipe` | 将字符串解析为整数 |
| `ParseFloatPipe` | 将字符串解析为浮点数 |
| `ParseBoolPipe` | 将字符串解析为布尔值 |
| `ParseArrayPipe` | 将字符串解析为数组 |
| `ParseUUIDPipe` | 验证字符串是否为 UUID |
| `ParseEnumPipe` | 验证值是否在枚举中 |
| `DefaultValuePipe` | 当参数为 undefined 时设置默认值 |

### 1. ParseIntPipe 示例

```typescript
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        // id 已被转为 number 类型
        return `用户 ID：${id}（类型：${typeof id}）`;
    }
}
```

访问 `GET /users/abc` 会自动返回 400 错误：

```json
{
    "statusCode": 400,
    "message": "Validation failed (numeric string is expected)",
    "error": "Bad Request"
}
```

### 2. 多个管道组合

```typescript
@Get(':id')
findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
) {
    return { id, page };
}
```

## 二、数据验证（ValidationPipe）

### 1. 安装依赖

```bash
npm install class-validator class-transformer
```

### 2. 定义 DTO

```typescript
// create-user.dto.ts
import { IsString, IsEmail, IsInt, Min, Max, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(2, 20, { message: '用户名长度为 2-20 个字符' })
    name: string;

    @IsEmail({}, { message: '请输入有效的邮箱地址' })
    email: string;

    @IsInt()
    @Min(0)
    @Max(150)
    age: number;

    @IsOptional()
    @IsString()
    avatar?: string;
}
```

### 3. 全局启用 ValidationPipe

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,           // 自动剥离 DTO 中没有装饰器的字段
        forbidNonWhitelisted: true, // 传入未定义字段时抛出异常
        transform: true,           // 自动类型转换（如 string → number）
        disableErrorMessages: false, // 生产环境可设为 true 隐藏详细信息
    }));

    await app.listen(3000);
}
bootstrap();
```

### 4. 在控制器中使用

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        // createUserDto 已通过验证
        return `创建用户：${createUserDto.name}`;
    }
}
```

请求 `POST /users` 带错误数据时：

```json
// 请求体：{ "name": "A", "email": "invalid", "age": -1 }

// 响应：
{
    "statusCode": 400,
    "message": [
        "用户名长度为 2-20 个字符",
        "请输入有效的邮箱地址",
        "age must not be less than 0"
    ],
    "error": "Bad Request"
}
```

## 三、自定义管道

### 1. 创建管道

```typescript
// parse-positive-int.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const parsed = parseInt(value, 10);

        if (isNaN(parsed) || parsed <= 0) {
            throw new BadRequestException(
                `${metadata.data} 必须是正整数`,
            );
        }

        return parsed;
    }
}
```

### 2. 使用自定义管道

```typescript
@Get(':id')
findOne(
    @Param('id', ParsePositiveIntPipe) id: number,
) {
    return `ID：${id}`;
}
```

## 四、参数验证示例

### 1. 查询参数验证

```typescript
import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class QueryUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;
}
```

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('users')
export class UsersController {
    @Get()
    findAll(@Query() query: QueryUserDto) {
        return query;
    }
}
```

### 2. 路径参数验证

```typescript
import { IsUUID, IsOptional, IsString } from 'class-validator';
import { Controller, Get, Param } from '@nestjs/common';

export class FindPostDto {
    @IsUUID()
    postId: string;

    @IsOptional()
    @IsString()
    include?: string;
}

@Controller('posts')
export class PostsController {
    @Get(':postId')
    findOne(@Param() params: FindPostDto) {
        return params;
    }
}
```

## 五、类型转换

启用 `transform: true` 后，NestJS 会自动进行类型转换：

```typescript
// 控制器
@Get(':id')
findOne(@Param('id') id: number) {
    return typeof id; // number（自动转换）
}

// DTO 中的类型也会自动转换
export class QueryDto {
    @Type(() => Number)  // class-transformer 装饰器
    @IsInt()
    page: number;

    @Type(() => Number)
    @IsInt()
    limit: number;
}
```

## 六、完整示例：用户注册验证

```typescript
// create-user.dto.ts
import {
    IsString, IsEmail, IsInt, Min, Max,
    IsOptional, Length, Matches, IsEnum,
} from 'class-validator';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export class CreateUserDto {
    @IsString()
    @Length(2, 20)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 30)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: '密码必须包含大小写字母和数字',
    })
    password: string;

    @IsInt()
    @Min(1)
    @Max(120)
    age: number;

    @IsEnum(Gender)
    gender: Gender;

    @IsOptional()
    @IsString()
    @Length(0, 200)
    bio?: string;
}
```

## 七、ValidationPipe 配置选项

```typescript
app.useGlobalPipes(new ValidationPipe({
    // 基本设置
    whitelist: true,               // 剥离无装饰器的字段
    forbidNonWhitelisted: true,    // 禁止未定义的字段
    forbidUnknownValues: true,     // 禁止未知值

    // 类型转换
    transform: true,               // 自动类型转换
    transformOptions: {
        enableImplicitConversion: true,  // 隐式类型转换
    },

    // 错误处理
    disableErrorMessages: process.env.NODE_ENV === 'production',  // 生产环境隐藏错误详情
    exceptionFactory: (errors) => {
        // 自定义错误格式
        return new BadRequestException({
            statusCode: 400,
            message: errors.map(e => Object.values(e.constraints || {}).join(', ')).join('; '),
            error: 'Bad Request',
        });
    },

    // 验证组
    always: true,                  // 始终验证
    groups: ['create'],            // 验证组
}));
```

## 八、练习

1. 创建一个自定义管道 `TrimPipe`，去除字符串首尾空格
2. 使用 `class-validator` 创建一个文章创建 DTO，包含标题（必填）、内容（必填）、标签（可选）
3. 配置 ValidationPipe，启用 `whitelist` 和 `forbidNonWhitelisted` 选项
