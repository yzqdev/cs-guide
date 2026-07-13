# JWT 认证

JWT（JSON Web Token）是目前最流行的 API 认证方案之一。NestJS 提供了 `@nestjs/jwt` 和 `@nestjs/passport` 模块来简化认证流程。

## 一、安装依赖

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
```

## 二、创建 Auth 模块

```bash
nest g module auth
nest g service auth
nest g controller auth
```

## 三、JWT 配置

### 1. AuthModule 配置

```typescript
// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule,  // 需要用到 UsersService 验证用户
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'my-secret-key',
            signOptions: {
                expiresIn: '7d',  // 令牌有效期 7 天
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
```

### 2. AuthService

```typescript
// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === password) {  // 实际应用应使用 bcrypt 比较
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            username: user.username,
            roles: user.roles,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        };
    }

    async register(userData: any) {
        // 实际应用应使用 bcrypt 加密密码
        const user = await this.usersService.create(userData);
        return this.login(user);
    }
}
```

### 3. AuthController

```typescript
// auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: { username: string; password: string }) {
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password,
        );
        if (!user) {
            throw new UnauthorizedException('用户名或密码错误');
        }
        return this.authService.login(user);
    }

    @Public()
    @Post('register')
    async register(@Body() registerDto: any) {
        return this.authService.register(registerDto);
    }

    @Post('profile')
    getProfile(@Req() req: any) {
        return req.user;
    }
}
```

## 四、JWT 策略

JWT 策略用于验证请求中携带的 JWT token：

```typescript
// auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            // 从请求头 Authorization: Bearer xxx 中提取 token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 忽略过期检查（设为 false 则自动验证过期）
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'my-secret-key',
        });
    }

    // 验证通过后，返回的数据会被挂载到 request.user 上
    async validate(payload: any) {
        const user = await this.usersService.findOne(payload.sub);
        if (!user) {
            throw new UnauthorizedException('用户不存在');
        }
        return {
            id: payload.sub,
            username: payload.username,
            roles: payload.roles,
        };
    }
}
```

## 五、JWT Auth Guard

```typescript
// auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        // 检查是否标为公开接口
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        return super.canActivate(context);
    }
}
```

## 六、注册全局 Guard

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
```

## 七、公开接口装饰器

```typescript
// common/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

## 八、获取当前用户装饰器

```typescript
// common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return data ? user?.[data] : user;
    },
);
```

## 九、使用示例

```typescript
// users/users.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()  // 公开接口，不需要登录
    @Post('register')
    register(@Body() body: any) {
        return this.usersService.create(body);
    }

    @Get('profile')  // 需要登录
    getProfile(@CurrentUser() user: any) {
        return user;
    }

    @Get('profile/id')
    getUserId(@CurrentUser('id') id: number) {
        return { id };
    }
}
```

## 十、刷新 Token

```typescript
// auth/auth.service.ts（补充）
async refreshToken(user: any) {
    const payload = { sub: user.id, username: user.username };
    return {
        access_token: this.jwtService.sign(payload),
        expires_in: '7d',
    };
}
```

```typescript
// auth/auth.controller.ts（补充）
@Post('refresh')
async refresh(@CurrentUser() user: any) {
    return this.authService.refreshToken(user);
}
```

## 十一、完整集成

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
    imports: [AuthModule, UsersModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,  // 全局启用 JWT 验证
        },
    ],
})
export class AppModule {}
```

## 十二、练习

1. 为已有的 User 实体添加 `password` 字段，并使用 `bcrypt` 对密码进行哈希存储
2. 实现登录接口，返回 JWT token（包含用户 ID 和角色）
3. 创建需要管理员角色才能访问的接口（使用 RolesGuard + JwtAuthGuard 组合）
