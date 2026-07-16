---
title: "参数校验"
order: 8
---

# 参数校验

> 使用 Bean Validation（JSR-380）对请求参数进行自动校验。

## 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

Spring Boot Web 场景下通常已包含，无需额外添加。

## 常用校验注解

### 基础注解

| 注解 | 说明 |
|------|------|
| `@NotNull` | 值不能为 null |
| `@NotEmpty` | 字符串/集合不能为 null 且长度 > 0 |
| `@NotBlank` | 字符串不能为 null 且去除空格后长度 > 0 |
| `@Size(min, max)` | 字符串/集合长度限制 |
| `@Min` | 最小值 |
| `@Max` | 最大值 |
| `@Range(min, max)` | 数值范围 |
| `@Positive` | 正数 |
| `@PositiveOrZero` | 非负整数 |
| `@Negative` | 负数 |
| `@NegativeOrZero` | 非正整数 |

### 格式校验

| 注解 | 说明 |
|------|------|
| `@Email` | 邮箱格式 |
| `@Pattern(regexp)` | 正则表达式 |
| `@Past` | 必须是过去时间 |
| `@PastOrPresent` | 过去或现在 |
| `@Future` | 必须是未来时间 |
| `@FutureOrPresent` | 未来或现在 |
| `@Digits(integer, fraction)` | 数字位数限制 |

## 请求体校验

```java
@Data
public class UserCreateRequest {

    @NotBlank(message = "用户名不能为空")
    @Size(min = 2, max = 50, message = "用户名长度需在 2-50 之间")
    private String name;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @NotNull(message = "年龄不能为空")
    @Min(value = 1, message = "年龄最小为 1")
    @Max(value = 150, message = "年龄最大为 150")
    private Integer age;

    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    @Future(message = "过期时间必须是未来时间")
    private LocalDateTime expiresAt;
}
```

```java
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
public class UserController {

    @PostMapping
    public Result<User> create(@Valid @RequestBody UserCreateRequest request) {
        User user = userService.create(request);
        return Result.success(user);
    }
}
```

## 路径参数和查询参数校验

```java
@RestController
@RequestMapping("/users")
@Validated  // 类级别需要
public class UserController {

    @GetMapping("/{id}")
    public Result<User> getById(
            @PathVariable @Positive(message = "ID 必须为正数") Long id) {
        return Result.success(userService.findById(id));
    }

    @GetMapping
    public Result<List<User>> search(
            @RequestParam(required = false)
            @Size(min = 2, max = 20, message = "关键字长度 2-20")
            String keyword,

            @RequestParam(defaultValue = "0")
            @Min(0) int page,

            @RequestParam(defaultValue = "20")
            @Min(1) @Max(100) int size) {
        return Result.success(userService.search(keyword, page, size));
    }
}
```

## 分组校验

```java
// 定义分组接口
public interface CreateGroup {}
public interface UpdateGroup {}

@Data
public class UserRequest {

    @Null(groups = CreateGroup.class, message = "创建时 ID 必须为空")
    @NotNull(groups = UpdateGroup.class, message = "更新时 ID 不能为空")
    private Long id;

    @NotBlank(groups = CreateGroup.class, message = "用户名不能为空")
    @Size(min = 2, max = 50)
    private String name;

    @NotBlank(groups = CreateGroup.class)
    @Email
    private String email;

    private Integer age;
}
```

```java
@PostMapping
public Result<User> create(@Validated(CreateGroup.class) @RequestBody UserRequest request) {
    return Result.success(userService.create(request));
}

@PutMapping("/{id}")
public Result<User> update(@Validated(UpdateGroup.class) @RequestBody UserRequest request) {
    return Result.success(userService.update(request));
}
```

## 自定义校验注解

```java
// 1. 定义注解
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneValidator.class)
public @interface Phone {
    String message() default "手机号格式不正确";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// 2. 实现校验器
public class PhoneValidator implements ConstraintValidator<Phone, String> {

    private static final Pattern PHONE_PATTERN =
            Pattern.compile("^1[3-9]\\d{9}$");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true;  // 非空校验交给 @NotBlank
        }
        return PHONE_PATTERN.matcher(value).matches();
    }
}

// 3. 使用
@Data
public class UserRequest {
    @Phone
    private String phone;
}
```

## 全局异常处理校验错误

```java
@RestControllerAdvice
public class ValidationExceptionHandler {

    // @RequestBody 校验失败
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleValidation(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return Result.error(400, msg);
    }

    // @RequestParam / @PathVariable 校验失败
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleConstraintViolation(ConstraintViolationException e) {
        String msg = e.getConstraintViolations().stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .collect(Collectors.joining("; "));
        return Result.error(400, msg);
    }

    // 参数类型转换失败
    @ExceptionHandler( BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleBindException(BindException e) {
        String msg = e.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return Result.error(400, msg);
    }
}
```

## 练习

1. 为 Article 的创建和更新分别定义校验组
2. 自定义一个 `@IdCard` 校验注解，校验身份证号格式
3. 校验嵌套对象（如在 UserRequest 中包含 Address 对象并对其字段进行校验）
