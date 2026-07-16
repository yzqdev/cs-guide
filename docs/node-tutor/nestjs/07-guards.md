---
order: 7
---

# 守卫与权限控制

守卫（Guard）是一个用 `@Injectable()` 装饰的类，它实现了 `CanActivate` 接口。守卫的主要职责是**决定请求是否应该由路由处理程序处理**。

## 一、守卫的作用

- 认证（Authentication）：检查用户是否已登录
- 授权（Authorization）：检查用户是否有权限执行操作
- 基于角色的访问控制
- API 密钥验证
- IP 白名单

## 二、创建守卫

```typescript
// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    private validateRequest(request: any): boolean {
        // 检查请求头中是否有 token
        const authHeader = request.headers.authorization;
        return !!authHeader && authHeader.startsWith('Bearer ');
    }
}
```

## 三、使用守卫

### 1. 控制器级别

```typescript
import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)  // 该控制器下所有路由都受保护
export class UsersController {
    @Get()
    findAll() {
        return '受保护的路由';
    }

    @Get('public')
    @UseGuards()  // 清空守卫（不受保护）
    publicRoute() {
        return '公开路由';
    }
}
```

### 2. 方法级别

```typescript
@Controller('users')
export class UsersController {
    @Get()
    @UseGuards(AuthGuard)  // 只有这个方法受保护
    findAll() {
        return '需要登录';
    }

    @Get('public')
    findAllPublic() {
        return '公开接口';
    }
}
```

### 3. 全局守卫

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 全局守卫
    app.useGlobalGuards(new AuthGuard());

    await app.listen(3000);
}
```

或者在模块中注册全局守卫：

```typescript
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
```

## 四、角色守卫

```typescript
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// 自定义装饰器，用于设置角色
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // 获取路由上设置的角色元数据
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        // 如果路由没有设置角色要求，放行
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;  // 由 AuthGuard 设置

        // 检查用户是否拥有所需角色
        return requiredRoles.some((role) => user?.roles?.includes(role));
    }
}
```

```typescript
// user.entity.ts（模拟）
export interface User {
    id: number;
    username: string;
    roles: string[];
}
```

```typescript
// auth.guard.ts（增加用户信息设置）
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.replace('Bearer ', '');

        // 模拟 token 解析——实际项目使用 JWT
        if (token === 'admin-token') {
            request.user = { id: 1, username: 'admin', roles: ['admin'] };
            return true;
        }
        if (token === 'user-token') {
            request.user = { id: 2, username: 'alice', roles: ['user'] };
            return true;
        }

        return false;
    }
}
```

```typescript
// 使用角色守卫
import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard, Roles } from './guards/roles.guard';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)  // 先认证，再授权
export class AdminController {
    @Get('dashboard')
    @Roles('admin')  // 仅 admin 角色可访问
    getDashboard() {
        return '管理面板';
    }

    @Post('users')
    @Roles('admin')
    createUser(@Body() body: any) {
        return '创建用户';
    }

    @Get('stats')
    @Roles('admin', 'editor')  // admin 或 editor 角色可访问
    getStats() {
        return '统计数据';
    }
}
```

## 五、综合示例：JWT 认证守卫

```typescript
// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly secret = process.env.JWT_SECRET || 'default-secret';

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('缺少认证令牌');
        }

        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('无效的令牌格式');
        }

        try {
            const payload = jwt.verify(token, this.secret);
            request.user = payload;  // 将解析出的用户信息挂到 request 上
            return true;
        } catch (err) {
            throw new UnauthorizedException('令牌无效或已过期');
        }
    }
}
```

```typescript
// 在路由处理程序中使用 user 信息
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    @Get()
    getProfile(@Req() req: Request) {
        // req.user 由 JwtAuthGuard 注入
        return req.user;
    }
}
```

## 六、守卫与中间件的区别

| 特性 | 中间件 | 守卫 |
|------|--------|------|
| 执行时机 | 请求进入后最早执行 | 中间件之后、拦截器之前 |
| 访问权限 | 不能知道路由处理程序 | 可以通过 `ExecutionContext` 获取路由信息 |
| 依赖注入 | 可访问 DI 容器 | 可访问 DI 容器 |
| 使用场景 | 日志、CORS、请求体解析 | 认证、授权、权限控制 |

执行顺序：

```text
请求 → 中间件 → 守卫 → 拦截器(前) → 管道 → 路由处理程序
```

## 七、练习

1. 创建一个 `ApiKeyGuard`，检查请求头中的 `x-api-key` 是否匹配预设值
2. 创建一个 `ThrottleGuard`，记录每个 IP 的请求次数，超过限制则返回 429
3. 结合 AuthGuard 和 RolesGuard，实现一套完整的认证授权系统
