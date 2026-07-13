# 异常过滤器

NestJS 内置了一个异常层，负责处理应用中所有未处理的异常。当异常未被路由处理程序捕获时，它会交给异常过滤器处理。

## 一、内置异常类

NestJS 提供了一系列 HTTP 异常类：

```typescript
import {
    BadRequestException,        // 400
    UnauthorizedException,      // 401
    NotFoundException,          // 404
    ForbiddenException,         // 403
    ConflictException,          // 409
    InternalServerErrorException,  // 500
    NotImplementedException,    // 501
    RequestTimeoutException,    // 408
    GatewayTimeoutException,    // 504
    HttpVersionNotSupportedException, // 505
    UnprocessableEntityException, // 422
    TooManyRequestsException,   // 429
} from '@nestjs/common';
```

### 使用示例

```typescript
import { Controller, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get(':id')
    findOne(@Param('id') id: string) {
        if (!id) {
            throw new BadRequestException('ID 不能为空');
        }

        const user = this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException({
                statusCode: 404,
                message: `用户 ${id} 不存在`,
                error: 'Not Found',
            });
        }

        return user;
    }
}
```

## 二、创建自定义异常

```typescript
// exceptions/business.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
    constructor(
        private readonly businessCode: number,
        message: string,
        statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super({ businessCode, message }, statusCode);
    }
}
```

```typescript
// 使用自定义异常
@Get('withdraw')
withdraw(@Body() body: { amount: number }) {
    if (body.amount > 10000) {
        throw new BusinessException(
            1001,
            '单次提现金额不能超过 10000 元',
            HttpStatus.BAD_REQUEST,
        );
    }
    return '提现成功';
}
```

## 三、创建异常过滤器

### 1. 基础过滤器

```typescript
// filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)  // 捕获 HttpException 及其子类
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const errorResponse = {
            code: status,
            message: typeof exceptionResponse === 'string'
                ? exceptionResponse
                : (exceptionResponse as any).message || exception.message,
            timestamp: new Date().toISOString(),
        };

        response.status(status).json(errorResponse);
    }
}
```

### 2. 捕获所有异常

```typescript
// filters/all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()  // 捕获所有异常
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = '服务器内部错误';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : (res as any).message || message;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        // 记录日志
        this.logger.error(`异常：${message}`, exception instanceof Error ? exception.stack : '');

        response.status(status).json({
            code: status,
            message,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
        });
    }
}
```

## 四、使用过滤器

### 方法级别

```typescript
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller('users')
export class UsersController {
    @Get()
    @UseFilters(HttpExceptionFilter)  // 只应用于此方法
    findAll() {
        throw new NotFoundException();
    }
}
```

### 控制器级别

```typescript
@Controller('users')
@UseFilters(HttpExceptionFilter)  // 应用于控制器下所有方法
export class UsersController {}
```

### 全局过滤器

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 全局过滤器（需要在 new 的时候注入依赖）
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(3000);
}
```

或使用模块注入：

```typescript
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
```

## 五、依赖注入

过滤器也可以利用依赖注入：

```typescript
// filters/logger-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
@Catch(HttpException)
export class LoggerExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(LoggerExceptionFilter.name);

    constructor(private readonly appName: string) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        this.logger.error(`[${this.appName}] 状态码：${status}，消息：${exception.message}`);

        response.status(status).json({
            error: exception.message,
            app: this.appName,
        });
    }
}
```

```typescript
// 控制器级别使用
@Controller('users')
@UseFilters(new LoggerExceptionFilter('MyApp'))
export class UsersController {}
```

注意：使用 `new` 创建时无法使用 DI，如果需要依赖注入，使用 `APP_FILTER` 方式注册。

## 六、异常过滤器执行顺序

```text
路由处理程序抛出异常
    ↓
局部过滤器（方法级）
    ↓
控制器过滤器
    ↓
全局过滤器
```

如果方法级的过滤器捕获并处理了异常，就不会传递给控制器和全局过滤器。

## 七、完整示例：统一错误响应

```typescript
// filters/unified-exception.filter.ts
import {
    ExceptionFilter, Catch, ArgumentsHost,
    HttpException, HttpStatus, Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class UnifiedExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(UnifiedExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let businessCode = -1;
        let message = '服务器繁忙，请稍后重试';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();

            if (typeof res === 'object') {
                const resObj = res as any;
                message = Array.isArray(resObj.message)
                    ? resObj.message.join('; ')
                    : resObj.message || message;
                businessCode = resObj.businessCode || status;
            } else {
                message = res;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        // 生产环境不暴露内部错误详情
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(
                `异常：${message}`,
                exception instanceof Error ? exception.stack : '',
                `${request.method} ${request.url}`,
            );
            message = '服务器繁忙，请稍后重试';
        }

        response.status(status).json({
            success: false,
            code: businessCode > 0 ? businessCode : status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
```

## 八、练习

1. 创建一个 `BusinessException` 自定义异常，包含 `code` 和 `message` 字段
2. 创建统一的异常过滤器，将异常响应统一为 `{ success: false, message, timestamp }` 格式
3. 在控制器中分别抛出 BadRequestException 和自定义 BusinessException，验证过滤器的处理结果
