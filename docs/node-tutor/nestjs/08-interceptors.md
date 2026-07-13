# 拦截器

拦截器（Interceptor）是基于面向切面编程（AOP）的组件。它可以在方法执行前后注入额外的逻辑。

## 一、拦截器的能力

- 在方法执行前/后执行额外的逻辑
- 转换函数返回的结果
- 转换函数抛出的异常
- 扩展函数的行为
- 完全覆盖函数（如缓存）

## 二、创建拦截器

每个拦截器都实现 `NestInterceptor` 接口的 `intercept()` 方法：

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('请求处理前...');

        const now = Date.now();
        return next
            .handle()  // 调用路由处理程序
            .pipe(
                tap(() => {
                    console.log(`请求处理后... 耗时：${Date.now() - now}ms`);
                }),
            );
    }
}
```

## 三、使用拦截器

### 控制器级别

```typescript
import { Controller, UseInterceptors, Get } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {
    @Get()
    findAll() {
        return '所有用户';
    }
}
```

### 方法级别

```typescript
@Get()
@UseInterceptors(LoggingInterceptor)
findAll() {
    return '所有用户';
}
```

### 全局拦截器

```typescript
// main.ts
app.useGlobalInterceptors(new LoggingInterceptor());

// 或使用模块注入
{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
}
```

## 四、常见拦截器示例

### 1. 响应格式包装

```typescript
// response.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StandardResponse<T> {
    code: number;
    message: string;
    data: T;
    timestamp: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<StandardResponse<T>> {
        return next.handle().pipe(
            map((data) => ({
                code: 200,
                message: 'success',
                data,
                timestamp: Date.now(),
            })),
        );
    }
}
```

使用后，所有返回都会统一格式：

```typescript
// 控制器返回 { id: 1, name: 'Alice' }
// 实际响应：
{
    "code": 200,
    "message": "success",
    "data": { "id": 1, "name": "Alice" },
    "timestamp": 1700000000000
}
```

### 2. 请求耗时统计

```typescript
// timing.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(TimingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - now;
                this.logger.log(`${method} ${url} - ${duration}ms`);

                // 慢请求告警
                if (duration > 1000) {
                    this.logger.warn(`慢请求：${method} ${url} 耗时 ${duration}ms`);
                }
            }),
        );
    }
}
```

### 3. 缓存拦截器

```typescript
// cache.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    private readonly cache = new Map<string, any>();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const cacheKey = `${request.method}-${request.url}`;

        // 检查缓存
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return of(cached);  // 直接返回缓存
        }

        // 执行路由并缓存结果
        return next.handle().pipe(
            tap((data) => {
                this.cache.set(cacheKey, data);
            }),
        );
    }
}
```

### 4. 超时拦截器

```typescript
// timeout.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    private readonly defaultTimeout = 5000; // 5 秒

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(this.defaultTimeout),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException('请求超时'));
                }
                return throwError(() => err);
            }),
        );
    }
}
```

### 5. 日志拦截器（完整版）

```typescript
// logger.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url, headers, body, ip } = request;
        const userAgent = headers['user-agent'] || 'unknown';
        const now = Date.now();

        return next.handle().pipe(
            tap((data) => {
                const response = context.switchToHttp().getResponse();
                const duration = Date.now() - now;

                this.logger.log(`${method} ${url} ${response.statusCode} ${duration}ms`);

                // 打印详细信息（开发环境）
                if (process.env.NODE_ENV === 'development') {
                    this.logger.debug(`IP: ${ip}, UA: ${userAgent}`);
                    if (body && Object.keys(body).length) {
                        this.logger.debug(`Body: ${JSON.stringify(body)}`);
                    }
                }
            }),
        );
    }
}
```

## 五、拦截器与 RxJS 操作符

拦截器充分利用了 RxJS 的强大能力：

| 操作符 | 用途 |
|--------|------|
| `map()` | 转换响应数据 |
| `tap()` | 执行副作用（不修改数据） |
| `catchError()` | 捕获异常 |
| `timeout()` | 超时处理 |
| `retry()` | 失败重试 |
| `delay()` | 延迟响应 |

```typescript
// 重试拦截器
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { retry, delay } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            retry(3),       // 失败重试 3 次
            delay(1000),    // 每次间隔 1 秒
        );
    }
}
```

## 六、执行顺序

```text
请求 → 中间件 → 守卫 → 拦截器(前) → 管道 → 路由处理程序 → 拦截器(后) → 过滤器
```

多个拦截器的执行顺序与注册顺序一致：

```typescript
@UseInterceptors(InterceptorA, InterceptorB)
// 执行顺序：
// InterceptorA.intercept() 前段
// → InterceptorB.intercept() 前段
// → 路由处理程序
// → InterceptorB.intercept() 后段
// → InterceptorA.intercept() 后段
```

## 七、练习

1. 创建一个 `TransformInterceptor`，将所有响应包装为 `{ code, data, message }` 格式
2. 创建一个 `ExcludeNullInterceptor`，将响应中所有 `null` 值转换为空字符串
3. 创建一个 `ErrorsInterceptor`，记录所有发生的异常到日志文件
