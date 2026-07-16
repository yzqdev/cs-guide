---
order: 14
---

# Swagger API 文档

NestJS 提供了 `@nestjs/swagger` 模块，可以自动生成 OpenAPI（Swagger）文档。

## 一、安装

```bash
npm install @nestjs/swagger swagger-ui-express
```

## 二、基础配置

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger 配置
    const config = new DocumentBuilder()
        .setTitle('API 文档')
        .setDescription('这是 NestJS 示例项目的 API 文档')
        .setVersion('1.0')
        .addTag('users', '用户管理')
        .addTag('auth', '认证管理')
        .addBearerAuth()  // 添加 JWT Bearer Token 支持
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);  // 访问路径：/api-docs

    await app.listen(3000);
    console.log('Swagger 文档：http://localhost:3000/api-docs');
}
bootstrap();
```

访问 `http://localhost:3000/api-docs` 查看自动生成的 API 文档。

## 三、装饰器 API

### 1. 控制器级别

```typescript
import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')           // 分组标签
@ApiBearerAuth()             // 需要 Bearer Token
@Controller('users')
export class UsersController {}
```

### 2. 方法级别

```typescript
@Controller('users')
export class UsersController {
    @Get()
    @ApiOperation({ summary: '获取用户列表', description: '支持分页和搜索' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: '页码' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: '每页数量' })
    @ApiResponse({ status: 200, description: '成功返回用户列表' })
    findAll(@Query('page') page = 1, @Query('limit') limit = 20) {}

    @Get(':id')
    @ApiOperation({ summary: '获取单个用户' })
    @ApiParam({ name: 'id', required: true, description: '用户 ID', type: Number })
    @ApiResponse({ status: 200, description: '成功返回用户信息' })
    @ApiResponse({ status: 404, description: '用户不存在' })
    findOne(@Param('id') id: number) {}

    @Post()
    @ApiOperation({ summary: '创建用户' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: '用户创建成功' })
    create(@Body() createUserDto: CreateUserDto) {}

    @Delete(':id')
    @ApiOperation({ summary: '删除用户' })
    @ApiResponse({ status: 204, description: '删除成功' })
    remove(@Param('id') id: number) {}
}
```

## 四、DTO 文档

使用 `@nestjs/swagger` 的装饰器为 DTO 添加文档信息：

### 1. 属性装饰器

```typescript
// users/dto/create-user.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: '用户名',
        example: 'alice',
        minLength: 2,
        maxLength: 20,
    })
    username: string;

    @ApiProperty({
        description: '邮箱地址',
        example: 'alice@example.com',
    })
    email: string;

    @ApiProperty({
        description: '密码',
        example: 'Abc123456',
        minLength: 6,
    })
    password: string;

    @ApiPropertyOptional({
        description: '年龄',
        example: 25,
        minimum: 0,
        maximum: 150,
    })
    age?: number;

    @ApiPropertyOptional({
        description: '个人简介',
        example: 'Hello, I am Alice!',
    })
    bio?: string;

    @ApiProperty({
        description: '角色',
        enum: ['admin', 'user', 'editor'],
        default: 'user',
    })
    role: string;
}
```

### 2. 响应 DTO

```typescript
// users/dto/user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ description: '用户 ID', example: 1 })
    id: number;

    @ApiProperty({ description: '用户名', example: 'alice' })
    username: string;

    @ApiProperty({ description: '邮箱', example: 'alice@example.com' })
    email: string;

    @ApiProperty({ description: '是否激活', example: true })
    isActive: boolean;

    @ApiProperty({ description: '创建时间', example: '2026-01-01T00:00:00.000Z' })
    createdAt: Date;
}

// 分页响应
export class PaginatedUserResponseDto {
    @ApiProperty({ description: '数据列表', type: [UserResponseDto] })
    data: UserResponseDto[];

    @ApiProperty({ description: '总数', example: 100 })
    total: number;

    @ApiProperty({ description: '当前页码', example: 1 })
    page: number;

    @ApiProperty({ description: '每页数量', example: 20 })
    limit: number;
}
```

### 3. 在控制器中使用响应 DTO

```typescript
@Get()
@ApiOperation({ summary: '获取用户列表' })
@ApiOkResponse({ type: UserResponseDto, isArray: true })
findAll() {
    return this.usersService.findAll();
}

@Get('paginated')
@ApiOperation({ summary: '分页获取用户' })
@ApiOkResponse({ type: PaginatedUserResponseDto })
findPaginated(@Query() query: PaginationDto) {
    return this.usersService.findPaginated(query);
}
```

## 五、枚举文档

```typescript
// common/enums/role.enum.ts
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    EDITOR = 'editor',
}

export class UpdateRoleDto {
    @ApiProperty({
        enum: UserRole,
        description: '用户角色',
        example: UserRole.ADMIN,
    })
    role: UserRole;
}
```

```typescript
// 控制器中使用
@Patch(':id/role')
@ApiOperation({ summary: '更新用户角色' })
updateRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
) {}
```

## 六、文件上传文档

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: '要上传的文件',
    })
    file: any;
}
```

```typescript
@Post('upload')
@ApiOperation({ summary: '上传文件' })
@ApiConsumes('multipart/form-data')
@ApiBody({
    description: '文件',
    type: UploadFileDto,
})
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
}
```

## 七、认证文档

```typescript
// auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'alice', description: '用户名' })
    username: string;

    @ApiProperty({ example: 'Abc123456', description: '密码' })
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({ description: 'JWT 令牌' })
    access_token: string;

    @ApiProperty({ description: '用户信息', type: UserResponseDto })
    user: UserResponseDto;
}
```

```typescript
@Post('login')
@ApiOperation({ summary: '用户登录' })
@ApiBody({ type: LoginDto })
@ApiOkResponse({ type: LoginResponseDto })
@ApiUnauthorizedResponse({ description: '用户名或密码错误' })
async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
}
```

## 八、自定义响应格式

```typescript
// common/decorators/api-response.decorator.ts
import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class ApiResult<T> {
    @ApiProperty({ example: 200 })
    code: number;

    @ApiProperty({ example: 'success' })
    message: string;

    data: T;

    @ApiProperty({ example: 1700000000000 })
    timestamp: number;
}

export function ApiSuccessResponse<T extends Type<any>>(dataType: T) {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResult) },
                    {
                        properties: {
                            data: { $ref: getSchemaPath(dataType) },
                        },
                    },
                ],
            },
        }),
    );
}
```

## 九、练习

1. 为 UsersController 添加完整的 Swagger 文档装饰器
2. 为 CreateUserDto 添加 ApiProperty 装饰器，包含示例值和描述
3. 在 main.ts 中启用 Swagger，设置 Bearer Token 认证
