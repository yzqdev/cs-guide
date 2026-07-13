# 实体映射详解

> JPA 实体映射的核心注解，以及常见数据类型、枚举、字段定制等映射方式。

## 核心注解

| 注解 | 作用 | 必填 |
|------|------|------|
| `@Entity` | 标记该类为 JPA 实体 | 是 |
| `@Table` | 指定映射的表名 | 否（默认类名） |
| `@Id` | 标记主键字段 | 是 |
| `@GeneratedValue` | 主键生成策略 | 否 |
| `@Column` | 字段映射细节 | 否 |
| `@Transient` | 不映射到数据库 | 否 |
| `@Enumerated` | 枚举映射 | 否 |
| `@Lob` | 大字段映射 | 否 |

## @Entity 与 @Table

```java
@Entity                          // 标记为实体
@Table(name = "t_articles")      // 映射到 t_articles 表
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 省略其他字段
}
```

:::tip
如果不写 `@Table`，表名默认是类名（`Article`）。建议始终显式指定表名。
:::

## @Column 详解

```java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 字段名映射
    @Column(name = "user_name", length = 50, nullable = false)
    private String userName;

    // 唯一约束
    @Column(unique = true)
    private String email;

    // 默认值
    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer age;

    // 精度（适用于小数）
    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    // 不映射到数据库
    @Transient
    private String tempData;

    // 更新时忽略该字段
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
```

### @Column 常用属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `name` | 数据库列名 | `@Column(name = "user_name")` |
| `nullable` | 是否可为 null | `@Column(nullable = false)` |
| `unique` | 是否唯一 | `@Column(unique = true)` |
| `length` | 字符串长度 | `@Column(length = 100)` |
| `precision` | 数字总位数 | `@Column(precision = 10)` |
| `scale` | 小数位数 | `@Column(scale = 2)` |
| `columnDefinition` | 原生 SQL 定义 | `@Column(columnDefinition = "TEXT")` |
| `insertable` | 是否参与 INSERT | `@Column(insertable = false)` |
| `updatable` | 是否参与 UPDATE | `@Column(updatable = false)` |

## 枚举映射

```java
public enum UserStatus {
    ACTIVE,      // 活跃
    INACTIVE,    // 不活跃
    BANNED       // 已封禁
}

@Entity
public class User {

    // 方式一：存储为字符串（推荐，可读性好）
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private UserStatus status;

    // 方式二：存储为数字（索引从 0 开始）
    // @Enumerated(EnumType.ORDINAL)  // 不推荐：增删枚举值会导致数据错乱
    // private Role role;
}
```

:::warning
尽量避免使用 `EnumType.ORDINAL`，因为枚举的顺序改变会导致历史数据错乱。始终优先使用 `EnumType.STRING`。
:::

## @Lob 大字段

```java
@Entity
public class Article {

    // 大文本（CLOB — MySQL 中对应 LONGTEXT）
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    // 二进制数据（BLOB）
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] coverImage;
}
```

## 日期时间映射

```java
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Entity
public class Event {

    // Java 8 日期时间 API（推荐）
    private LocalDate eventDate;        // → DATE
    private LocalTime startTime;        // → TIME
    private LocalDateTime createdAt;    // → TIMESTAMP

    // 旧版 Date
    @Temporal(TemporalType.DATE)
    private Date birthday;              // → DATE

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;             // → TIMESTAMP
}
```

| Java 类型 | 数据库类型 |
|-----------|-----------|
| `LocalDate` | `DATE` |
| `LocalTime` | `TIME` |
| `LocalDateTime` | `TIMESTAMP` |
| `LocalDateTime` + `@Column(columnDefinition = "TIMESTAMPTZ")` | `TIMESTAMPTZ`（PostgreSQL） |
| `Instant` | `TIMESTAMP` |

## 字段类型映射参考

| Java 类型 | 数据库类型（MySQL） | 数据库类型（PostgreSQL） |
|-----------|-------------------|------------------------|
| `String` | `VARCHAR(255)` | `VARCHAR(255)` |
| `int` / `Integer` | `INT` | `INTEGER` |
| `long` / `Long` | `BIGINT` | `BIGINT` |
| `double` / `Double` | `DOUBLE` | `DOUBLE PRECISION` |
| `BigDecimal` | `DECIMAL(38,2)` | `NUMERIC(38,2)` |
| `boolean` / `Boolean` | `TINYINT(1)` | `BOOLEAN` |
| `LocalDate` | `DATE` | `DATE` |
| `LocalDateTime` | `DATETIME` | `TIMESTAMP` |
| `LocalTime` | `TIME` | `TIME` |
| `byte[]` | `BLOB` | `BYTEA` |
| `String` + `@Lob` | `LONGTEXT` | `TEXT` |

## 继承映射

JPA 支持三种继承策略：

### 策略一：单表（SINGLE_TABLE）

```java
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
public abstract class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}

@Entity
@DiscriminatorValue("DOG")
public class Dog extends Animal {
    private String breed;  // 品种
}

@Entity
@DiscriminatorValue("CAT")
public class Cat extends Animal {
    private boolean indoor;
}
```

### 策略二：联接表（JOINED）

```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Payment {
    @Id
    private Long id;
    private BigDecimal amount;
}

@Entity
public class CreditCardPayment extends Payment {
    private String cardNumber;
}

@Entity
public class WechatPayment extends Payment {
    private String openId;
}
```

### 策略三：每类一表（TABLE_PER_CLASS）
不推荐使用，因为查询时性能较差且不支持 IDENTITY 生成策略。

## @DynamicInsert / @DynamicUpdate

优化 SQL：只包含非空字段：

```java
@Entity
@DynamicInsert   // INSERT 时只包含非空字段
@DynamicUpdate   // UPDATE 时只包含有变更的字段
public class User {
    // ...
}
```

## 练习

```java
// 1. 创建一个 Order 实体，包含：
//    - id (自增主键)
//    - orderNo (唯一, 长度32)
//    - totalAmount (精度10, 小数2位)
//    - status (枚举: PENDING/PAID/SHIPPED/DELIVERED/CANCELLED，存储为字符串)
//    - remark (大文本)
//    - createdAt / updatedAt (自动填充)

// 2. 确保 status 使用 @Enumerated(EnumType.STRING)
```
