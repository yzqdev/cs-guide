---
title: "异常处理"
order: 9
---

# 异常处理

> 统一的异常处理机制是构建健壮 API 的关键，Spring Boot 提供了全局异常处理方案。

## 自定义业务异常

```java
// 基础业务异常
@Data
@AllArgsConstructor
public class BusinessException extends RuntimeException {
    private int code;
    private String message;
}

// 常用异常子类
public class ResourceNotFoundException extends BusinessException {
    public ResourceNotFoundException(String resource, Object id) {
        super(404, resource + "不存在: " + id);
    }
}

public class BadRequestException extends BusinessException {
    public BadRequestException(String message) {
        super(400, message);
    }
}

public class UnauthorizedException extends BusinessException {
    public UnauthorizedException(String message) {
        super(401, message);
    }
}

public class ForbiddenException extends BusinessException {
    public ForbiddenException(String message) {
        super(403, message);
    }
}
```

## 统一响应体

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    private int code;
    private String message;
    private T data;
    private long timestamp;

    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data, System.currentTimeMillis());
    }

    public static <T> Result<T> error(int code, String message) {
        return new Result<>(code, message, null, System.currentTimeMillis());
    }

    public static <T> Result<T> error(ResultCode resultCode) {
        return new Result<>(resultCode.getCode(), resultCode.getMessage(),
                null, System.currentTimeMillis());
    }
}

// 枚举定义错误码
@Getter
@AllArgsConstructor
public enum ResultCode {
    SUCCESS(200, "success"),
    BAD_REQUEST(400, "请求参数错误"),
    UNAUTHORIZED(401, "未认证"),
    FORBIDDEN(403, "无权限"),
    NOT_FOUND(404, "资源不存在"),
    METHOD_NOT_ALLOWED(405, "请求方法不允许"),
    CONFLICT(409, "资源冲突"),
    INTERNAL_ERROR(500, "服务器内部错误"),
    SERVICE_UNAVAILABLE(503, "服务不可用");

    private final int code;
    private final String message;
}
```

## 全局异常处理器

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 业务异常
    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusiness(BusinessException e) {
        log.warn("业务异常: code={}, message={}", e.getCode(), e.getMessage());
        return Result.error(e.getCode(), e.getMessage());
    }

    // 参数校验失败
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleValidation(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldErrors().stream()
                .map(f -> f.getField() + ": " + f.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return Result.error(400, msg);
    }

    // 参数缺失
    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleMissingParam(MissingServletRequestParameterException e) {
        return Result.error(400, "缺少参数: " + e.getParameterName());
    }

    // HTTP 方法不支持
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public Result<Void> handleMethodNotSupported(HttpRequestMethodNotSupportedException e) {
        return Result.error(405, "不支持 " + e.getMethod() + " 方法");
    }

    // 参数类型转换失败
    @ExceptionHandler(TypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleTypeMismatch(TypeMismatchException e) {
        return Result.error(400, "参数类型错误: " + e.getPropertyName());
    }

    // 数据完整性违例（唯一约束等）
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Result<Void> handleDataIntegrity(DataIntegrityViolationException e) {
        return Result.error(409, "数据冲突，可能违反了唯一约束");
    }

    // 404 - 无映射路径
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result<Void> handleNotFound(NoHandlerFoundException e) {
        return Result.error(404, "接口不存在: " + e.getRequestURL());
    }

    // 未捕获异常
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result<Void> handleException(Exception e, HttpServletRequest request) {
        log.error("未捕获异常: {}", request.getRequestURI(), e);
        return Result.error(500, "服务器内部错误");
    }
}
```

## 处理方式选择

| 方式 | 适用场景 |
|------|---------|
| `try-catch` | 局部处理，需要自定义流程 |
| 全局 `@RestControllerAdvice` | 统一处理，大多数场景 |
| `ErrorController` / `BasicErrorController` | 处理 404 等容器级错误 |
| `@ExceptionHandler` 在 Controller 内 | 仅对单个 Controller 生效 |

## 404 处理

```yaml
spring:
  web:
    resources:
      add-mappings: false        # 禁用静态资源映射
  mvc:
    throw-exception-if-no-handler-found: true  # 无匹配路径时抛出异常
```

或在配置类中注册：

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        // 保留默认
    }
}
```

## 练习

1. 为你的应用定义一个完整的错误码枚举
2. 实现全局异常处理器，覆盖常见异常类型
3. 在 Service 中抛出 `ResourceNotFoundException` 并在 Controller 层验证是否能被正确处理
