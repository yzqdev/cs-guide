# 中间件

中间件是在路由处理程序之前执行的函数。它可以访问请求和响应对象，以及应用请求-响应周期中的 `next()` 中间件函数。

## 一、中间件的作用

- 执行任意代码
- 修改请求和响应对象
- 结束请求-响应周期
- 调用堆栈中的下一个中间件
- 常见的中间件：日志记录、CORS、请求体解析、认证校验

## 二、创建中间件

### 1. 函数式中间件

```typescript
// logger.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
```

### 2. 类中间件

```typescript
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();

        // 请求结束时记录耗时
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`[${req.method}] ${req.url} - ${res.statusCode} (${duration}ms)`);
        });

        next();
    }
}
```

## 三、应用中间件

### 1. 在模块中应用

```typescript
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
    imports: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');  // 应用于所有路由
    }
}
```

### 2. 限定路径

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

@Module({})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('users');     // 只应用于 /users 路由

        consumer
            .apply(AuthMiddleware)
            .forRoutes('admin');     // 应用于 /admin 路由

        consumer
            .apply(CorsMiddleware)
            .forRoutes({ path: 'api/*', method: RequestMethod.GET });  // 限定方法和路径
    }
}
```

### 3. 排除某些路径

```typescript
consumer
    .apply(LoggerMiddleware)
    .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: 'metrics', method: RequestMethod.GET },
    )
    .forRoutes('*');
```

### 4. 多个中间件

```typescript
consumer
    .apply(LoggerMiddleware, AuthMiddleware, CorsMiddleware)
    .forRoutes('*');
```

## 四、全局中间件

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './common/middleware/logger.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 应用全局中间件（函数式）
    app.use(loggerMiddleware);

    await app.listen(3000);
}
bootstrap();
```

## 五、常见中间件示例

### 1. 请求耗时统计

```typescript
// request-timer.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestTimerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        const originalEnd = res.end;

        res.end = function (...args: any[]) {
            const duration = Date.now() - start;
            console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
            return originalEnd.apply(this, args);
        };

        next();
    }
}
```

### 2. IP 白名单

```typescript
// ip-whitelist.middleware.ts
import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpWhitelistMiddleware implements NestMiddleware {
    private readonly whitelist = ['127.0.0.1', '::1', '192.168.1.100'];

    use(req: Request, res: Response, next: NextFunction) {
        const ip = req.ip || req.socket.remoteAddress;

        if (!this.whitelist.includes(ip!)) {
            throw new ForbiddenException(`IP ${ip} 不在白名单中`);
        }

        next();
    }
}
```

### 3. 请求频率限制（简易版）

```typescript
// rate-limiter.middleware.ts
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
    private readonly requests = new Map<string, { count: number; resetTime: number }>();
    private readonly limit = 100;           // 最大请求数
    private readonly windowMs = 60000;     // 时间窗口（1分钟）

    use(req: Request, res: Response, next: NextFunction) {
        const ip = req.ip || 'unknown';
        const now = Date.now();

        let record = this.requests.get(ip);

        if (!record || now > record.resetTime) {
            record = { count: 0, resetTime: now + this.windowMs };
            this.requests.set(ip, record);
        }

        record.count++;

        if (record.count > this.limit) {
            throw new HttpException('请求过于频繁', HttpStatus.TOO_MANY_REQUESTS);
        }

        next();
    }
}
```

## 六、结合第三方中间件

NestJS 兼容 Express 的第三方中间件：

```bash
npm install helmet cors morgan compression
```

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());         // 安全头
    app.use(cors());           // 跨域
    app.use(morgan('dev'));    // 请求日志
    app.use(compression());    // Gzip 压缩

    await app.listen(3000);
}
```

也可以封装为 NestJS 模块方式：

```typescript
// proxy.md 中的反向代理示例
import { createProxyMiddleware } from 'http-proxy-middleware';

// 在 bootstrap 中
app.use('/mihoyo', createProxyMiddleware({
    target: 'https://bbs-api.mihoyo.com',
    changeOrigin: true,
    pathRewrite: {
        '^/mihoyo': '/',
    },
}));
```

## 七、中间件执行顺序

```text
请求 → 全局中间件 → 模块中间件 → 守卫 → 拦截器(前) → 管道 → 路由处理程序 → 拦截器(后) → 过滤器
```

## 八、练习

1. 创建一个 `LoggerMiddleware` 记录每个请求的 `method`、`url`、`statusCode` 和耗时
2. 创建一个 `AuthMiddleware` 检查请求头中的 `x-api-key`，无效时返回 401
3. 在 `AppModule` 中应用中间件，排除 `/health` 和 `/public` 路径
