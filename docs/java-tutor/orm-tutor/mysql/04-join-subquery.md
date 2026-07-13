# JOIN 与子查询

> 多表联查是 SQL 的核心能力，JOIN 和子查询让你能从多个表中获取关联数据。

## JOIN 类型

```
INNER JOIN  → 只返回匹配的行
LEFT JOIN   → 返回左表所有行，右表不匹配填 NULL
RIGHT JOIN  → 返回右表所有行，左表不匹配填 NULL
FULL JOIN   → 返回所有行（MySQL 不直接支持）
```

### 准备示例数据

```sql
-- 分类表
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

INSERT INTO categories (name) VALUES ('电子产品'), ('服装'), ('食品');

-- 商品表
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category_id INT,
    price DECIMAL(10,2),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO products (name, category_id, price) VALUES
('手机', 1, 4999),
('电脑', 1, 8999),
('T恤', 2, 99),
('牛奶', 3, 68),
('平板', 1, 3999);

-- 没有分类的商品（用于演示）
INSERT INTO products (name, price) VALUES ('测试商品', 0);
```

## INNER JOIN — 内连接

只返回两表都匹配的数据：

```sql
-- 查询商品及其分类
SELECT p.id, p.name, c.name AS category_name, p.price
FROM products p
INNER JOIN categories c ON p.category_id = c.id;

-- 可以简写为 JOIN
SELECT p.id, p.name, c.name AS category_name, p.price
FROM products p
JOIN categories c ON p.category_id = c.id;

-- 结果：5 条（测试商品没有分类，被排除）
```

## LEFT JOIN — 左连接

返回左表所有记录，右表不匹配时填 NULL：

```sql
-- 查询所有商品及其分类（包括未分类的商品）
SELECT p.id, p.name, c.name AS category_name, p.price
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- 结果：6 条（测试商品显示在最后，分类为 NULL）

-- 查找没有分类的商品
SELECT p.id, p.name, p.price
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE c.id IS NULL;
```

## RIGHT JOIN — 右连接

返回右表所有记录：

```sql
-- 查询所有分类及其商品（包括没有商品的分类）
SELECT c.name AS category_name, p.name AS product_name
FROM products p
RIGHT JOIN categories c ON p.category_id = c.id;

-- 查找没有商品的分类
SELECT c.name AS category_name
FROM products p
RIGHT JOIN categories c ON p.category_id = c.id
WHERE p.id IS NULL;
```

## 三表 JOIN

```sql
-- 订单表
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 订单商品表
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1
);

-- 查询订单、用户、商品信息
SELECT
    o.id AS order_id,
    u.username,
    p.name AS product_name,
    oi.quantity,
    o.total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;
```

## SELF JOIN — 自连接

表与自身关联，适用于树形结构（如分类层级、员工上下级）：

```sql
-- 员工表（带上级 ID）
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    manager_id INT REFERENCES employees(id)
);

INSERT INTO employees VALUES
(1, '张总', NULL),
(2, '李经理', 1),
(3, '王主管', 1),
(4, '小赵', 2),
(5, '小钱', 2),
(6, '小孙', 3);

-- 查询每个员工的上级
SELECT e.name AS 员工, m.name AS 上级
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- 结果：
-- 小赵  | 李经理
-- 小钱  | 李经理
-- 小孙  | 王主管
-- 李经理 | 张总
-- 王主管 | 张总
-- 张总  | NULL
```

## UNION — 合并结果集

```sql
-- UNION 合并（自动去重）
SELECT name FROM categories
UNION
SELECT name FROM products;

-- UNION ALL 合并（不去重，性能更好）
SELECT name FROM categories
UNION ALL
SELECT name FROM products;

-- 合并不同结构的表
SELECT id, username AS name, 'user' AS type FROM users
UNION ALL
SELECT id, title AS name, 'post' AS type FROM posts;
```

## 子查询

### WHERE 子查询

```sql
-- 查询年龄最大的用户
SELECT * FROM users WHERE age = (SELECT MAX(age) FROM users);

-- 查询高于平均年龄的用户
SELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);

-- IN 子查询
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);

-- EXISTS（存在即返回）
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
```

### FROM 子查询（派生表）

```sql
-- 查询每个分类的商品数和平均价格
SELECT
    c.name,
    stats.product_count,
    stats.avg_price
FROM categories c
LEFT JOIN (
    SELECT category_id,
           COUNT(*) AS product_count,
           AVG(price) AS avg_price
    FROM products
    GROUP BY category_id
) stats ON c.id = stats.category_id;
```

### SELECT 子查询（标量子查询）

```sql
-- 查询每个用户的订单数和总金额
SELECT
    u.id,
    u.username,
    (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count,
    (SELECT SUM(total) FROM orders o WHERE o.user_id = u.id) AS total_amount
FROM users u;
```

## 练习

```sql
-- 准备数据
CREATE TABLE classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    class_id INT,
    score DECIMAL(5,2),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

INSERT INTO classes (name) VALUES ('一班'), ('二班'), ('三班');
INSERT INTO students (name, class_id, score) VALUES
('张三', 1, 85), ('李四', 1, 92), ('王五', 2, 78),
('赵六', 2, 88), ('小明', 3, 95), ('小红', 3, NULL);

-- 练习 1：查询每个学生及其班级名（LEFT JOIN）
-- 练习 2：查询每个班级的学生数和平均分（GROUP BY + JOIN）
-- 练习 3：查询分数高于平均分的学生（子查询）
-- 练习 4：查询没有学生的班级（LEFT JOIN + IS NULL）
-- 练习 5：查询每个班级中分数最高和最低的学生
```
