---
title: "枚举与注解"
order: 12
---

# 枚举与注解

> 枚举（enum）用于定义一组常量，注解（annotation）用于为代码添加元数据。

## 枚举（Enum）

### 基本枚举

```java
// 定义枚举
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

// 使用枚举
Day today = Day.MONDAY;
System.out.println(today);  // MONDAY

// switch 中使用
switch (today) {
    case MONDAY:
        System.out.println("周一好");
        break;
    case FRIDAY:
        System.out.println("周五了！");
        break;
    case SATURDAY:
    case SUNDAY:
        System.out.println("周末！");
        break;
    default:
        System.out.println("工作日");
        break;
}
```

### 枚举的常用方法

```java
Day[] days = Day.values();   // 获取所有枚举常量数组
Day day = Day.valueOf("MONDAY");  // 通过字符串获取枚举常量
String name = Day.MONDAY.name();  // "MONDAY"（常量名）
int ordinal = Day.MONDAY.ordinal();  // 0（常量的索引，从 0 开始）
```

### 带字段的枚举

```java
public enum Season {
    SPRING("春", "温暖"),
    SUMMER("夏", "炎热"),
    AUTUMN("秋", "凉爽"),
    WINTER("冬", "寒冷");

    private final String chineseName;
    private final String feature;

    // 构造方法 — 枚举的构造方法默认是 private
    Season(String chineseName, String feature) {
        this.chineseName = chineseName;
        this.feature = feature;
    }

    public String getChineseName() {
        return chineseName;
    }

    public String getFeature() {
        return feature;
    }
}

// 使用
Season s = Season.SPRING;
System.out.println(s.getChineseName());  // 春
System.out.println(s.getFeature());      // 温暖
```

### 带抽象方法的枚举

```java
public enum Operation {
    ADD {
        @Override
        public double apply(double x, double y) {
            return x + y;
        }
    },
    SUBTRACT {
        @Override
        public double apply(double x, double y) {
            return x - y;
        }
    },
    MULTIPLY {
        @Override
        public double apply(double x, double y) {
            return x * y;
        }
    },
    DIVIDE {
        @Override
        public double apply(double x, double y) {
            return x / y;
        }
    };

    public abstract double apply(double x, double y);
}

// 使用
Operation op = Operation.ADD;
double result = op.apply(10, 5);  // 15.0
```

### 枚举实现接口

```java
public interface Describable {
    String getDescription();
}

public enum Color implements Describable {
    RED("红色", "热情"),
    GREEN("绿色", "生机"),
    BLUE("蓝色", "宁静");

    private final String chineseName;
    private final String description;

    Color(String chineseName, String description) {
        this.chineseName = chineseName;
        this.description = description;
    }

    @Override
    public String getDescription() {
        return chineseName + " — " + description;
    }
}
```

## 注解（Annotation）

### 内置注解

```java
// @Override — 检查方法是否正确重写父类方法
@Override
public String toString() {
    return "Custom toString";
}

// @Deprecated — 标记已废弃的方法，调用会有警告
@Deprecated
public void oldMethod() {
    // 不推荐使用
}

// @SuppressWarnings — 抑制编译器警告
@SuppressWarnings("unchecked")
public void uncheckedMethod() {
    List list = new ArrayList();  // 不加注解会警告
    list.add("string");
}

// @FunctionalInterface — 函数式接口（只有一个抽象方法）
@FunctionalInterface
public interface Runnable {
    void run();
}
```

### 自定义注解

```java
// 定义注解
// @Target — 注解可以应用的位置
@Target({ElementType.TYPE, ElementType.METHOD, ElementType.FIELD})
// @Retention — 注解保留策略
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
    // 注解属性（看起来像方法）
    String value() default "";           // 默认空字符串
    int count() default 0;               // 默认 0
    String[] tags() default {};          // 数组类型
    Class<?> type() default Object.class; // 类类型
}

// 使用自定义注解
@MyAnnotation(value = "测试", count = 5, tags = {"java", "annotation"})
public class AnnotatedClass {

    @MyAnnotation("字段注解")
    private String field;

    @MyAnnotation
    public void method() {
        // ...
    }
}
```

### 元注解

```java
// @Target — 指定注解可以放在哪里
@Target({
    ElementType.TYPE,        // 类、接口、枚举
    ElementType.METHOD,      // 方法
    ElementType.FIELD,       // 字段
    ElementType.PARAMETER,   // 参数
    ElementType.CONSTRUCTOR, // 构造方法
    ElementType.LOCAL_VARIABLE, // 局部变量
    ElementType.ANNOTATION_TYPE, // 注解
    ElementType.PACKAGE      // 包
})

// @Retention — 指定注解保留到哪个阶段
@Retention(RetentionPolicy.SOURCE)   // 仅在源码（编译时丢弃）
@Retention(RetentionPolicy.CLASS)    // 保留到 class 文件（默认）
@Retention(RetentionPolicy.RUNTIME)  // 运行时可用（反射可以读取）

// @Documented — 该注解应被 javadoc 记录
@Documented

// @Inherited — 子类可以继承父类的该注解
@Inherited

// @Repeatable — 同一个位置可以重复使用该注解（Java 8+）
@Repeatable
```

### 运行时读取注解（反射）

```java
import java.lang.reflect.*;

@MyAnnotation(value = "Hello", count = 10)
public class AnnotationReader {

    public static void main(String[] args) {
        // 获取类上的注解
        Class<AnnotationReader> clazz = AnnotationReader.class;
        MyAnnotation annotation = clazz.getAnnotation(MyAnnotation.class);

        if (annotation != null) {
            System.out.println("value: " + annotation.value());
            System.out.println("count: " + annotation.count());
            System.out.println("tags: " + Arrays.toString(annotation.tags()));
        }
    }
}
```

### 常用注解示例

```java
// @SuppressWarnings 常用值
@SuppressWarnings("unchecked")        // 抑制未检查转换警告
@SuppressWarnings("deprecation")      // 抑制使用废弃 API 的警告
@SuppressWarnings("rawtypes")         // 抑制原始类型警告
@SuppressWarnings("all")              // 抑制所有警告

// @SafeVarargs — 抑制可变参数泛型警告（Java 7+）
@SafeVarargs
public static <T> List<T> asList(T... elements) {
    List<T> list = new ArrayList<>();
    for (T elem : elements) {
        list.add(elem);
    }
    return list;
}
```

## 练习

```java
// 1. 定义一个表示 HTTP 状态码的枚举
public enum HttpStatus {
    OK(200, "成功"),
    NOT_FOUND(404, "未找到"),
    INTERNAL_SERVER_ERROR(500, "服务器内部错误");

    private final int code;
    private final String message;

    HttpStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() { return code; }
    public String getMessage() { return message; }

    public static HttpStatus fromCode(int code) {
        for (HttpStatus status : values()) {
            if (status.code == code) return status;
        }
        throw new IllegalArgumentException("未知状态码: " + code);
    }
}

// 2. 自定义 @NotNull 注解
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface NotNull {
    String message() default "字段不能为空";
}

// 使用
public class User {
    @NotNull(message = "用户名不能为空")
    private String username;

    @NotNull
    private String password;
}
```
