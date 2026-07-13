# 数据库与表管理

> 学会创建、修改和删除数据库与表，掌握 MySQL 数据类型和约束。

## 数据库管理

```sql
-- 创建数据库
CREATE DATABASE testdb;
CREATE DATABASE testdb DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 查看所有数据库
SHOW DATABASES;

-- 选择数据库
USE testdb;

-- 查看当前数据库
SELECT DATABASE();

-- 查看数据库创建信息
SHOW CREATE DATABASE testdb;

-- 修改数据库字符集
ALTER DATABASE testdb CHARACTER SET utf8mb4;

-- 删除数据库
DROP DATABASE testdb;
DROP DATABASE IF EXISTS testdb;
```

### 字符集选择

| 字符集 | 说明 | 推荐 |
|--------|------|------|
| `utf8` | 每个字符最多 3 字节 | ❌ 不支持 emoji |
| `utf8mb4` | 每个字符最多 4 字节 | ✅ **推荐**（支持 emoji）|
| `latin1` | 每个字符 1 字节 | ❌ 只支持西欧字符 |

```sql
-- 查看支持的字符集
SHOW CHARSET;

-- 查看建库时的默认字符集
SHOW VARIABLES LIKE 'character_set_database';
```

## 数据类型

### 整数类型

| 类型 | 占用 | 范围 |
|------|------|------|
| `TINYINT` | 1 字节 | -128 ~ 127 |
| `SMALLINT` | 2 字节 | -32768 ~ 32767 |
| `MEDIUMINT` | 3 字节 | -838万 ~ 838万 |
| `INT` | 4 字节 | -21亿 ~ 21亿 |
| `BIGINT` | 8 字节 | -922亿亿 ~ 922亿亿 |

```sql
-- 无符号（只存正数，范围翻倍）
age TINYINT UNSIGNED  -- 0 ~ 255

-- ZEROFILL（显示时前面补零）
id INT(5) ZEROFILL   -- 1 显示为 00001
```

### 浮点类型

| 类型 | 说明 |
|------|------|
| `FLOAT` | 单精度浮点，约 7 位精度 |
| `DOUBLE` | 双精度浮点，约 15 位精度 |
| `DECIMAL(M,D)` | **精确小数**，M 总位数，D 小数位数 |

```sql
-- 金额建议用 DECIMAL
price DECIMAL(10, 2)  -- 总长 10 位，小数 2 位：99999999.99

-- FLOAT 和 DOUBLE 有精度误差
-- 0.1 + 0.2 != 0.3（浮点问题）
```

### 字符串类型

| 类型 | 说明 | 最大长度 |
|------|------|---------|
| `CHAR(N)` | **定长**字符串 | 255 |
| `VARCHAR(N)` | **变长**字符串 | 65535 |
| `TINYTEXT` | 短文本 | 255 |
| `TEXT` | 文本 | 65535 |
| `MEDIUMTEXT` | 中等文本 | 1677万 |
| `LONGTEXT` | 长文本 | 42亿 |

```sql
-- CHAR 适合定长字段（性能更好）
gender CHAR(1)      -- '男' / '女'
status CHAR(2)      -- '01' / '02'

-- VARCHAR 适合变长字段（节省空间）
username VARCHAR(50)
email VARCHAR(100)

-- 大文本
content TEXT
description LONGTEXT
```

:::tip
`CHAR` 和 `VARCHAR` 的选择：如果字段长度固定（如 MD5 密码 32 位），用 `CHAR` 性能更好；如果变化较大（如用户名），用 `VARCHAR` 节省空间。
:::

### 日期时间类型

| 类型 | 格式 | 说明 |
|------|------|------|
| `DATE` | `2024-01-15` | 日期 |
| `TIME` | `14:30:25` | 时间 |
| `DATETIME` | `2024-01-15 14:30:25` | 日期+时间 |
| `TIMESTAMP` | `2024-01-15 14:30:25` | 时间戳（受时区影响） |
| `YEAR` | `2024` | 年份 |

```sql
created_at DATETIME DEFAULT CURRENT_TIMESTAMP           -- 创建时间
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- 自动更新
```

### 其他类型

```sql
-- 布尔（实际存储为 TINYINT(1)）
is_active BOOLEAN DEFAULT TRUE

-- JSON（MySQL 5.7+）
attributes JSON

-- 枚举
status ENUM('pending', 'active', 'banned')

-- 二进制
photo BLOB
```

## 表管理

### 创建表

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    age TINYINT UNSIGNED DEFAULT 0 COMMENT '年龄',
    gender CHAR(1) DEFAULT '' COMMENT '性别',
    status ENUM('active', 'inactive') DEFAULT 'active' COMMENT '状态',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

### 查看表结构

```sql
-- 查看所有表
SHOW TABLES;

-- 查看表结构
DESC users;
DESCRIBE users;

-- 查看建表语句
SHOW CREATE TABLE users;

-- 查看表字段详情
SHOW FULL COLUMNS FROM users;
```

### 修改表

```sql
-- 添加列
ALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER email;

-- 修改列类型
ALTER TABLE users MODIFY COLUMN phone VARCHAR(30);

-- 修改列名和类型
ALTER TABLE users CHANGE COLUMN phone mobile VARCHAR(20);

-- 删除列
ALTER TABLE users DROP COLUMN mobile;

-- 重命名表
ALTER TABLE users RENAME TO members;
RENAME TABLE members TO users;
```

### 删除表

```sql
-- 删除表（结构和数据都删除）
DROP TABLE users;
DROP TABLE IF EXISTS users;

-- 清空表数据（保留结构，速度快）
TRUNCATE TABLE users;

-- 删除表数据（保留结构，可回滚）
DELETE FROM users;
```

## 约束

| 约束 | 说明 | 示例 |
|------|------|------|
| `PRIMARY KEY` | 主键（唯一+非空） | `id INT PRIMARY KEY` |
| `FOREIGN KEY` | 外键 | `FOREIGN KEY (class_id) REFERENCES classes(id)` |
| `UNIQUE` | 唯一 | `email VARCHAR(100) UNIQUE` |
| `NOT NULL` | 非空 | `username VARCHAR(50) NOT NULL` |
| `DEFAULT` | 默认值 | `age INT DEFAULT 0` |
| `CHECK` | 条件检查（8.0+） | `age INT CHECK (age >= 0)` |

```sql
-- 主键
id INT AUTO_INCREMENT PRIMARY KEY

-- 复合主键
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- 外键
class_id INT,
FOREIGN KEY (class_id) REFERENCES classes(id)
    ON DELETE CASCADE      -- 删除父表时级联删除
    ON UPDATE CASCADE      -- 更新父表时级联更新

-- CHECK 约束
score DECIMAL(5,2) CHECK (score >= 0 AND score <= 100)
```

## 存储引擎

| 特性 | InnoDB（默认） | MyISAM |
|------|---------------|--------|
| 事务 | ✅ | ❌ |
| 外键 | ✅ | ❌ |
| 行级锁 | ✅ | ❌（表级锁）|
| 全文索引 | ✅ (5.6+) | ✅ |
| 崩溃恢复 | ✅ | ❌ |
| 推荐 | **所有场景** | 只读表（已很少用）|

```sql
-- 查看支持的引擎
SHOW ENGINES;

-- 建表时指定引擎
CREATE TABLE my_table (
    id INT PRIMARY KEY
) ENGINE=MyISAM;

-- 修改引擎
ALTER TABLE my_table ENGINE=InnoDB;
```

## 练习

```sql
-- 1. 创建一个博客系统所需的表：
--    categories（分类）：id, name, created_at
--    posts（文章）：id, title, content, category_id, status, created_at, updated_at
--    comments（评论）：id, post_id, author, content, created_at

-- 2. 设置合适的：
--    - 主键、外键、默认值、字符集（utf8mb4）
--    - 为 title 和 author 添加索引
--    - 外键级联删除

-- 3. 查看建表语句验证
```
