---
title: "RESTful API 开发"
order: 3
---

# RESTful API 开发

> 使用 Spring Boot 构建符合 REST 风格的 Web API。

## @RestController

```java
@RestController                     // = @Controller + @ResponseBody
@RequestMapping("/api/users")       // 类级别路径映射
public class UserController {

    // GET 请求
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    // POST 请求
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    // PUT 请求（全量更新）
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    // PATCH 请求（部分更新）
    @PatchMapping("/{id}")
    public User partialUpdate(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return userService.partialUpdate(id, updates);
    }

    // DELETE 请求
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }
}
```

## 请求参数接收

### @PathVariable — 路径变量

```java
@GetMapping("/users/{userId}/orders/{orderId}")
public Order getOrder(
        @PathVariable Long userId,
        @PathVariable Long orderId) {
    return orderService.findById(userId, orderId);
}
```

### @RequestParam — 查询参数

```java
@GetMapping("/users")
public List<User> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(required = false) String name) {

    // GET /api/users?page=0&size=20&name=张三
    return userService.findPage(page, size, name);
}
```

### @RequestBody — 请求体

```java
@PostMapping("/users")
public User create(@Valid @RequestBody UserCreateRequest request) {
    return userService.create(request);
}
```

### @RequestHeader — 请求头

```java
@GetMapping("/info")
public String getInfo(
        @RequestHeader("User-Agent") String userAgent,
        @RequestHeader(value = "Authorization", required = false) String auth) {
    return "User-Agent: " + userAgent;
}
```

### @CookieValue — Cookie

```java
@GetMapping("/cart")
public String getCart(@CookieValue(value = "sessionId", defaultValue = "") String sessionId) {
    return "Session: " + sessionId;
}
```

## DTO 模式

使用 DTO 隔离实体和 API 层：

```java
// 请求 DTO
@Data
public class UserCreateRequest {
    @NotBlank
    private String name;

    @Email
    private String email;

    private Integer age;
}

// 响应 DTO
@Data
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Integer age;
    private LocalDateTime createdAt;
}
```

转换逻辑：

```java
// 手动转换
public UserResponse toResponse(User user) {
    UserResponse dto = new UserResponse();
    dto.setId(user.getId());
    dto.setName(user.getName());
    dto.setEmail(user.getEmail());
    dto.setAge(user.getAge());
    dto.setCreatedAt(user.getCreatedAt());
    return dto;
}

// 或使用 MapStruct 自动转换
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
    User toEntity(UserCreateRequest request);
}
```

## 统一响应包装

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    private int code;
    private String message;
    private T data;

    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data);
    }

    public static <T> Result<T> success() {
        return new Result<>(200, "success", null);
    }

    public static <T> Result<T> error(int code, String message) {
        return new Result<>(code, message, null);
    }

    public static <T> Result<T> error(String message) {
        return new Result<>(500, message, null);
    }
}
```

使用：

```java
@GetMapping("/users")
public Result<List<User>> getAll() {
    return Result.success(userService.findAll());
}

@PostMapping("/users")
public Result<User> create(@Valid @RequestBody UserCreateRequest request) {
    User user = userService.create(request);
    return Result.success(user);
}

@GetMapping("/users/{id}")
public Result<User> getById(@PathVariable Long id) {
    // 不存在的 ID
    return Result.error(404, "用户不存在");
}
```

## 常用 HTTP 状态码

| 状态码 | 含义 | 使用场景 |
|--------|------|---------|
| 200 OK | 请求成功 | GET、PUT 成功 |
| 201 Created | 创建成功 | POST 创建资源 |
| 204 No Content | 无内容 | DELETE 成功 |
| 400 Bad Request | 参数错误 | 校验失败 |
| 401 Unauthorized | 未认证 | 需要登录 |
| 403 Forbidden | 无权限 | 权限不足 |
| 404 Not Found | 资源不存在 | ID 不存在 |
| 500 Internal Server Error | 服务器错误 | 异常未处理 |

## 统一处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .map(f -> f.getField() + ": " + f.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return Result.error(400, message);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result<Void> handleNotFound(NoSuchElementException e) {
        return Result.error(404, e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result<Void> handleException(Exception e) {
        return Result.error(500, "服务器内部错误");
    }
}
```

## 练习

1. 为 Article 资源实现完整的 REST API（GET/POST/PUT/DELETE）
2. 实现分页查询接口，支持 page、size、sort 参数
3. 添加一个搜索接口 `GET /api/users/search?q=关键字`，按用户名或邮箱模糊搜索
