# MySQL 高级特性

> 事务、视图、存储过程、触发器，掌握这些高级特性让 MySQL 更强大。

## 事务（Transaction）

### ACID 特性

| 特性 | 说明 |
|------|------|
| **原子性** | 事务要么全部成功，要么全部回滚 |
| **一致性** | 事务前后数据都处于一致状态 |
| **隔离性** | 并发事务之间相互隔离 |
| **持久性** | 提交后数据永久保存 |

### 事务控制

```sql
-- 开始事务
START TRANSACTION;
-- 或
BEGIN;

-- 执行操作
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;

-- 提交
COMMIT;

-- 或回滚
ROLLBACK;

-- 设置保存点
SAVEPOINT sp1;
UPDATE ...;
ROLLBACK TO SAVEPOINT sp1;  -- 回滚到保存点
```

### 隔离级别

```sql
-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 设置隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|----------|------|-----------|------|
| `READ UNCOMMITTED` | ✅ | ✅ | ✅ |
| `READ COMMITTED` | ❌ | ✅ | ✅ |
| `REPEATABLE READ`（默认）| ❌ | ❌ | ✅ |
| `SERIALIZABLE` | ❌ | ❌ | ❌ |

### 事务示例：转账

```sql
-- 正确的转账写法
START TRANSACTION;

-- 扣减转出账户
UPDATE accounts SET balance = balance - 200 WHERE id = 1 AND balance >= 200;
-- 检查是否扣减成功
IF ROW_COUNT() = 0 THEN
    ROLLBACK;
    SELECT '余额不足';
END IF;

-- 增加转入账户
UPDATE accounts SET balance = balance + 200 WHERE id = 2;

-- 提交
COMMIT;
```

## 视图（View）

视图是虚拟表，本质是一个保存的 SELECT 查询：

```sql
-- 创建视图
CREATE VIEW user_order_stats AS
SELECT
    u.id,
    u.username,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total), 0) AS total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username;

-- 使用视图（就像查普通表）
SELECT * FROM user_order_stats WHERE order_count > 0;

-- 查看视图定义
SHOW CREATE VIEW user_order_stats;

-- 修改视图
CREATE OR REPLACE VIEW user_order_stats AS
SELECT u.id, u.username, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING order_count > 0;

-- 删除视图
DROP VIEW IF EXISTS user_order_stats;
```

视图的优点：
- **简化查询**：复杂 JOIN 封装成视图后就像查单表
- **安全性**：隐藏表结构和敏感字段
- **逻辑独立性**：底层表结构变化时，视图可以不变

## 存储过程（Stored Procedure）

```sql
-- 修改分隔符（存储过程体包含分号）
DELIMITER //

CREATE PROCEDURE get_user_by_id(IN user_id INT)
BEGIN
    SELECT * FROM users WHERE id = user_id;
END //

DELIMITER ;

-- 调用
CALL get_user_by_id(1);

-- 带 IN 和 OUT 参数
DELIMITER //

CREATE PROCEDURE get_user_order_stats(
    IN user_id INT,
    OUT order_count INT,
    OUT total_amount DECIMAL(10,2)
)
BEGIN
    SELECT COUNT(*) INTO order_count FROM orders WHERE user_id = user_id;
    SELECT COALESCE(SUM(total), 0) INTO total_amount FROM orders WHERE user_id = user_id;
END //

DELIMITER ;

-- 调用获取输出参数
CALL get_user_order_stats(1, @cnt, @total);
SELECT @cnt, @total;

-- 查看存储过程
SHOW PROCEDURE STATUS WHERE Db = 'testdb';
SHOW CREATE PROCEDURE get_user_by_id;

-- 删除
DROP PROCEDURE IF EXISTS get_user_by_id;
```

### 存储过程中的控制流

```sql
DELIMITER //

CREATE PROCEDURE process_order(IN order_id INT)
BEGIN
    DECLARE order_status VARCHAR(20);

    -- 获取订单状态
    SELECT status INTO order_status FROM orders WHERE id = order_id;

    -- 条件判断
    IF order_status = 'pending' THEN
        UPDATE orders SET status = 'processed' WHERE id = order_id;
        SELECT '订单已处理';
    ELSEIF order_status = 'cancelled' THEN
        SELECT '订单已取消，无需处理';
    ELSE
        SELECT '订单状态: ', order_status;
    END IF;
END //

DELIMITER ;
```

## 函数（Function）

函数和存储过程的区别：函数**必须有返回值**，可以用在 SQL 表达式中。

```sql
DELIMITER //

CREATE FUNCTION get_user_level(total_amount DECIMAL(10,2))
RETURNS VARCHAR(20)
DETERMINISTIC  -- 相同输入返回相同结果
BEGIN
    DECLARE level VARCHAR(20);
    IF total_amount >= 10000 THEN
        SET level = '钻石';
    ELSEIF total_amount >= 5000 THEN
        SET level = '黄金';
    ELSEIF total_amount >= 1000 THEN
        SET level = '白银';
    ELSE
        SET level = '普通';
    END IF;
    RETURN level;
END //

DELIMITER ;

-- 使用函数
SELECT username, get_user_level(5000) AS level FROM users;
```

## 触发器（Trigger）

触发器在 INSERT / UPDATE / DELETE 时自动执行：

```sql
-- 记录操作日志
DELIMITER //

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_logs(user_id, action, created_at)
    VALUES (NEW.id, 'INSERT', NOW());
END //

DELIMITER ;

-- 防止不合法的更新
DELIMITER //

CREATE TRIGGER before_user_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.age < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '年龄不能为负数';
    END IF;
END //

DELIMITER ;

-- 记录删除日志
DELIMITER //

CREATE TRIGGER before_user_delete
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_logs(user_id, action, created_at)
    VALUES (OLD.id, 'DELETE', NOW());
END //

DELIMITER ;

-- 查看触发器
SHOW TRIGGERS;

-- 删除触发器
DROP TRIGGER IF EXISTS after_user_insert;
```

### OLD 和 NEW

| 触发操作 | OLD | NEW |
|---------|-----|-----|
| INSERT | 无 | 新插入的数据 |
| UPDATE | 更新前的数据 | 更新后的数据 |
| DELETE | 被删除的数据 | 无 |

## 练习

```sql
-- 1. 创建视图：显示每个分类的商品数量和均价
CREATE VIEW category_stats AS
SELECT c.name, COUNT(p.id) AS product_count, AVG(p.price) AS avg_price
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name;

-- 2. 创建存储过程：根据用户 ID 查询其所有订单详情
-- 3. 创建函数：输入成绩返回等级（优秀/良好/及格/不及格）
-- 4. 创建触发器：更新用户时自动记录更新时间到日志表
```
