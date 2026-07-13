# 自定义装饰器

NestJS 提供了多种装饰器来简化开发。同时，也允许创建自定义装饰器来封装重复逻辑。

## 一、参数装饰器

### 1. 获取用户信息

在认证守卫中，通常会将用户信息注入到 `request.user` 中。使用自定义装饰器可以方便地获取：

```typescript
// decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        // 如果传入了参数（如 'id'），则返回指定字段
        return data ? user?.[data] : user;
    },
);
```

```typescript
// 使用
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('users')
export class UsersController {
    @Get('me')
    getProfile(@CurrentUser() user: any) {
        return user;  // 返回整个用户对象
    }

    @Get('me/id')
    getUserId(@CurrentUser('id') userId: number) {
        return userId;  // 只返回用户 ID
    }
}
```

### 2. 获取请求 IP

```typescript
// decorators/ip.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Ip = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.headers['x-forwarded-for']
            || request.socket.remoteAddress
            || request.ip;
    },
);
```

```typescript
@Get()
getIp(@Ip() ip: string) {
    return `客户端 IP：${ip}`;
}
```

### 3. 分页参数解析

```typescript
// decorators/pagination.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface PaginationParams {
    page: number;
    limit: number;
    offset: number;
}

export const Pagination = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): PaginationParams => {
        const request = ctx.switchToHttp().getRequest();
        const page = Math.max(1, parseInt(request.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(request.query.limit) || 20));

        return {
            page,
            limit,
            offset: (page - 1) * limit,
        };
    },
);
```

```typescript
@Get()
findAll(@Pagination() pagination: PaginationParams) {
    const { page, limit, offset } = pagination;
    return `第 ${page} 页，每页 ${limit} 条，偏移 ${offset}`;
}
```

### 4. 查询参数公共装饰器

```typescript
// decorators/query-params.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface QueryParams {
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
    page: number;
    limit: number;
}

export const QueryParams = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): QueryParams => {
        const request = ctx.switchToHttp().getRequest();
        const { search, sort, order, page, limit } = request.query;

        return {
            search,
            sort: sort || 'createdAt',
            order: (order === 'asc' || order === 'desc') ? order : 'desc',
            page: Math.max(1, parseInt(page) || 1),
            limit: Math.min(100, Math.max(1, parseInt(limit) || 20)),
        };
    },
);
```

## 二、方法装饰器

### 1. 权限装饰器

```typescript
// decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: string[]) =>
    SetMetadata(PERMISSIONS_KEY, permissions);
```

```typescript
// 在 Guards 中使用
// permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!required) return true;

        const { user } = context.switchToHttp().getRequest();
        return required.some(perm => user.permissions?.includes(perm));
    }
}
```

```typescript
// 使用
@Controller('admin')
@UseGuards(PermissionsGuard)
export class AdminController {
    @Get('users')
    @Permissions('user:read')
    getUsers() {}

    @Post('users')
    @Permissions('user:create')
    createUser() {}

    @Delete('users/:id')
    @Permissions('user:delete')
    deleteUser() {}
}
```

### 2. 公共接口装饰器

```typescript
// decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

```typescript
// 在全局 JWT Guard 中使用
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // 检查是否标为公开接口
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        // 正常的 JWT 验证逻辑...
        return true;
    }
}
```

```typescript
// 使用
@Controller('auth')
export class AuthController {
    @Post('login')
    @Public()  // 跳过 JWT 验证
    login() {}

    @Post('register')
    @Public()  // 跳过 JWT 验证
    register() {}
}
```

## 三、装饰器组合

```typescript
// decorators/auth.decorator.ts
import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from './permissions.decorator';

export function Auth(...permissions: string[]) {
    return applyDecorators(
        UseGuards(AuthGuard, RolesGuard, PermissionsGuard),
        Permissions(...permissions),
    );
}
```

```typescript
// 使用组合装饰器
@Controller('admin')
export class AdminController {
    @Get('users')
    @Auth('user:read')  // 一行替代多个装饰器
    getUsers() {}

    @Get('settings')
    @Auth('settings:read')
    getSettings() {}
}
```

## 四、元数据反射

使用 `Reflector` 读取装饰器设置的元数据：

```typescript
// decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

```typescript
// 在 Guard 中读取元数据
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [
            context.getClass(),
            context.getHandler(),
        ]);
        console.log('所需角色：', roles);
        return true;
    }
}
```

## 五、完整示例：API 版本装饰器

```typescript
// decorators/api-version.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const API_VERSION_KEY = 'apiVersion';

export const ApiVersion = (version: string) =>
    SetMetadata(API_VERSION_KEY, version);
```

```typescript
// interceptors/version.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_VERSION_KEY } from '../decorators/api-version.decorator';

@Injectable()
export class VersionInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const version = this.reflector.get<string>(
            API_VERSION_KEY,
            context.getHandler(),
        );

        return next.handle().pipe(
            map((data) => ({
                version: version || '1.0',
                data,
            })),
        );
    }
}
```

```typescript
// 使用
@Controller('users')
@UseInterceptors(VersionInterceptor)
export class UsersController {
    @Get()
    @ApiVersion('2.0')
    findAll() {
        return [{ id: 1, name: 'Alice' }];
    }
}
```

## 六、练习

1. 创建一个 `@UserAgent()` 装饰器，获取请求的 User-Agent 信息
2. 创建一个 `@Throttle(limit, ttl)` 装饰器，设置接口的访问频率限制元数据
3. 创建一个 `@Roles('admin', 'editor')` 组合装饰器，将 `@SetMetadata`、`@UseGuards` 组合到一起
