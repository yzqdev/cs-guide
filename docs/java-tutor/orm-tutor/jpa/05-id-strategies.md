# JPA ID 生成策略

> JPA 通过 `@GeneratedValue` 指定主键生成策略，不同数据库支持不同策略。

## 四种标准策略

| 策略 | 说明 | 适用数据库 |
|------|------|-----------|
| `AUTO` | 自动选择（默认） | 所有 |
| `IDENTITY` | 数据库自增 | MySQL, PostgreSQL, SQL Server |
| `SEQUENCE` | 数据库序列 | PostgreSQL, Oracle, DB2 |
| `TABLE` | 序列表模拟自增 | 所有（性能较差） |

### IDENTITY — 数据库自增

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
```

特点：插入时依赖数据库的自增机制，MySQL 的 `AUTO_INCREMENT` 或 PostgreSQL 的 `SERIAL`。

### SEQUENCE — 序列（推荐 PostgreSQL）

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(
        name = "user_seq",
        sequenceName = "user_id_seq",  // 数据库中序列名
        allocationSize = 1             // 每次自增步长（建议 1）
    )
    private Long id;
}
```

### TABLE — 序列表

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "user_table_gen")
    @TableGenerator(
        name = "user_table_gen",
        table = "id_generator",          // 存储 ID 的表
        pkColumnName = "entity_name",    // 实体名列名
        valueColumnName = "next_id",     // 下一个 ID 列名
        allocationSize = 1
    )
    private Long id;
}
```

### AUTO — 自动选择

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // 等价于 @GeneratedValue
    private Long id;
}
```

Hibernate 会根据数据库方言自动选择：MySQL → IDENTITY、PostgreSQL → SEQUENCE、Oracle → SEQUENCE。

## UUID 主键

```java
import java.util.UUID;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // 或
    @Id
    private String id;

    @PrePersist
    public void generateId() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString().replace("-", "");
        }
    }
}
```

### UUID 的优缺点

| 优点 | 缺点 |
|------|------|
| 全局唯一，适合分布式 | 存储空间大（36 字符） |
| 无需自增，无冲突 | 索引性能不如 Long 自增 |
| 可提前生成，无需数据库交互 | 字符串排序无意义 |

## Hibernate 扩展策略

Hibernate 额外提供了 14 种 ID 生成器，常用如下：

```java
// UUID（Hibernate 旧版 UUID 算法）
@Id
@GeneratedValue(generator = "uuid_gen")
@GenericGenerator(name = "uuid_gen", strategy = "uuid")
private String id;  // 生成格式: 402880876359adeb016359ae27190000

// UUID2（新版，推荐，使用 Java UUID）
@Id
@GeneratedValue(generator = "uuid2_gen")
@GenericGenerator(name = "uuid2_gen", strategy = "uuid2")
private UUID id;  // 生成格式: 4af17c8e-8317-43e9-aff9-12d5590a71c6

// 手动指派
@Id
@GeneratedValue(generator = "assigned_gen")
@GenericGenerator(name = "assigned_gen", strategy = "assigned")
private Long id;  // 由应用程序自行设置 ID

// 序列（Hibernate 方式）
@Id
@GeneratedValue(generator = "seq_gen")
@GenericGenerator(name = "seq_gen", strategy = "sequence",
    parameters = @Parameter(name = "sequence", value = "my_seq"))
private Long id;
```

## 数据库支持对照

| 策略 | MySQL | PostgreSQL | Oracle | SQL Server |
|------|-------|------------|--------|------------|
| IDENTITY | ✅ AUTO_INCREMENT | ✅ SERIAL | ❌ | ✅ IDENTITY |
| SEQUENCE | ❌ | ✅ | ✅ | ✅ (SQL 2012+) |
| TABLE | ✅ | ✅ | ✅ | ✅ |
| AUTO | ✅（选 IDENTITY）| ✅（选 SEQUENCE）| ✅（选 SEQUENCE）| ✅ |

## 自定义 ID 生成器

### 示例一：自定义前缀

```java
public class MyIdGenerator implements IdentifierGenerator {
    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) {
        return "D4C-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}

// 使用
@Entity
public class Order {
    @Id
    @GenericGenerator(name = "my_id", strategy = "com.example.MyIdGenerator")
    @GeneratedValue(generator = "my_id")
    private String id;
}
```

### 示例二：雪花算法

雪花算法生成全局唯一的 64 位分布式 ID：

```java
@Component
public class SnowFlakeIdGenerator implements IdentifierGenerator {

    private final long twepoch = 1557825652094L;
    private final long workerIdBits = 5L;
    private final long datacenterIdBits = 5L;
    private final long sequenceBits = 12L;

    private final long maxWorkerId = -1L ^ (-1L << workerIdBits);
    private final long maxDatacenterId = -1L ^ (-1L << datacenterIdBits);

    private final long workerIdShift = sequenceBits;
    private final long datacenterIdShift = sequenceBits + workerIdBits;
    private final long timestampShift = sequenceBits + workerIdBits + datacenterIdBits;

    @Value("${snowflake.datacenter-id:1}")
    private long datacenterId;

    @Value("${snowflake.worker-id:0}")
    private long workerId;

    private long sequence = 0L;
    private long lastTimestamp = -1L;

    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis();
        if (timestamp < lastTimestamp) {
            throw new RuntimeException("Clock moved backwards");
        }
        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & (-1L ^ (-1L << sequenceBits));
            if (sequence == 0) timestamp = tilNextMillis();
        } else {
            sequence = 0;
        }
        lastTimestamp = timestamp;

        return (timestamp - twepoch) << timestampShift
             | datacenterId << datacenterIdShift
             | workerId << workerIdShift
             | sequence;
    }

    private long tilNextMillis() {
        long timestamp = System.currentTimeMillis();
        while (timestamp <= lastTimestamp) timestamp = System.currentTimeMillis();
        return timestamp;
    }

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) {
        return String.valueOf(nextId());
    }
}

// 配置
@Configuration
public class IdConfig {
    @Bean
    public SnowFlakeIdGenerator snowFlakeIdGenerator() {
        return new SnowFlakeIdGenerator();
    }
}

// 使用
@Entity
public class Order {
    @Id
    @GenericGenerator(name = "snowflake", strategy = "com.example.SnowFlakeIdGenerator")
    @GeneratedValue(generator = "snowflake")
    private String id;
}
```

## 选择建议

| 场景 | 推荐策略 |
|------|---------|
| MySQL 单体应用 | `IDENTITY` |
| PostgreSQL/Oracle | `SEQUENCE`（allocationSize=1）|
| 分布式环境 | 雪花算法或 UUID |
| 需要在插入前知道 ID | 雪花算法 |
| 可读性要求高 | `SEQUENCE` 或 `IDENTITY` |
| 不需要主键排序 | UUID |
