# 控制器与路由

控制器负责处理传入的请求并向客户端返回响应。在 NestJS 中，控制器使用 `@Controller()` 装饰器定义。

## 一、创建控制器

### 使用 CLI

```bash
nest g controller cats
# 创建 src/cats/cats.controller.ts
```

### 基本控制器

```typescript
// cats.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')  // 路由前缀：/cats
export class CatsController {
    @Get()            // GET /cats
    findAll(): string {
        return '所有猫咪';
    }

    @Get('details')   // GET /cats/details
    findDetails(): string {
        return '猫咪详情';
    }
}
```

## 二、请求方法装饰器

```typescript
import { Controller, Get, Post, Put, Delete, Patch, Options, Head } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()           // GET    /users
    findAll() {}

    @Post()          // POST   /users
    create() {}

    @Put(':id')      // PUT    /users/:id
    update() {}

    @Delete(':id')   // DELETE /users/:id
    remove() {}

    @Patch(':id')    // PATCH  /users/:id
    partialUpdate() {}
}
```

## 三、路由参数

### 路径参数

```typescript
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    // GET /users/123
    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `用户 ID：${id}`;
    }

    // 多个参数：GET /users/123/posts/456
    @Get(':userId/posts/:postId')
    findPost(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
    ): string {
        return `用户 ${userId} 的文章 ${postId}`;
    }

    // 获取所有参数对象
    @Get(':id/detail')
    detail(@Param() params: Record<string, string>): string {
        return `参数：${JSON.stringify(params)}`;
    }
}
```

### 查询参数

```typescript
import { Controller, Get, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    // GET /users?page=1&limit=10
    @Get()
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return { page, limit };
    }

    // 获取所有查询参数对象
    @Get('search')
    search(@Query() query: Record<string, any>) {
        return query;
    }
}
```

### 请求体

```typescript
import { Controller, Post, Body } from '@nestjs/common';

// 定义 DTO（数据传输对象）
class CreateUserDto {
    name: string;
    email: string;
    age: number;
}

@Controller('users')
export class UsersController {
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        // createUserDto 包含请求体中的 name/email/age
        return `创建用户：${createUserDto.name}`;
    }

    // 只提取特定字段
    @Post('partial')
    partialCreate(@Body('name') name: string) {
        return `仅使用 name：${name}`;
    }
}
```

## 四、请求头与状态码

```typescript
import { Controller, Get, Post, Headers, Req, HttpCode, Header, Redirect } from '@nestjs/common';
import { Request } from 'express';

@Controller('demo')
export class DemoController {
    // 获取请求头
    @Get('headers')
    getHeaders(
        @Headers('authorization') auth: string,
        @Headers('user-agent') ua: string,
    ) {
        return { auth, ua };
    }

    // 获取完整请求对象
    @Get('request')
    getRequest(@Req() req: Request) {
        return {
            method: req.method,
            url: req.url,
            ip: req.ip,
        };
    }

    // 自定义响应状态码
    @Post()
    @HttpCode(201)
    create() {
        return '创建成功';
    }

    // 自定义响应头
    @Get('custom-header')
    @Header('X-Custom-Header', 'custom-value')
    @Header('X-Powered-By', 'NestJS')
    customHeader() {
        return '自定义响应头';
    }

    // 重定向
    @Get('redirect')
    @Redirect('https://nestjs.com', 301)
    redirect() {}
}
```

## 五、异步控制器

NestJS 原生支持异步处理：

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
    async findAll(): Promise<any[]> {
        // 模拟异步数据库查询
        const cats = await this.catsService.findAll();
        return cats;
    }

    @Get('breeds')
    async getBreeds(): Promise<{ name: string }[]> {
        const breeds = [
            { name: '英短' },
            { name: '美短' },
            { name: '布偶' },
        ];
        return Promise.resolve(breeds);
    }
}
```

## 六、完整示例：用户 CRUD

```typescript
// users.controller.ts
import {
    Controller, Get, Post, Put, Delete,
    Param, Query, Body, HttpCode, HttpStatus,
} from '@nestjs/common';

// 临时存储
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];
let nextId = 3;

@Controller('users')
export class UsersController {
    @Get()
    findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
        const start = (page - 1) * limit;
        return users.slice(start, start + limit);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        const user = users.find(u => u.id === Number(id));
        if (!user) {
            return { error: '用户不存在' };
        }
        return user;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: { name: string; email: string }) {
        const newUser = { id: nextId++, ...body };
        users.push(newUser);
        return newUser;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        const index = users.findIndex(u => u.id === Number(id));
        if (index === -1) return { error: '用户不存在' };
        users[index] = { ...users[index], ...body, id: Number(id) };
        return users[index];
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number) {
        const index = users.findIndex(u => u.id === Number(id));
        if (index > -1) users.splice(index, 1);
    }
}
```

## 七、练习

1. 创建一个 `posts` 控制器，包含完整的 CRUD 操作
2. 在控制器中添加分页查询和关键词搜索参数
3. 添加一个路由：`GET /posts/hot` 返回热门文章，注意路由顺序
