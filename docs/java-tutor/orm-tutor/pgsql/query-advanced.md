# PostgreSQL 高级查询

> 窗口函数、CTE 公用表表达式、JSON 操作、全文检索等高级特性。

## 窗口函数（Window Functions）

窗口函数在不改变行数的情况下对行集进行计算，与聚合函数不同，它不会合并行。

### 基础语法

```sql
SELECT 字段,
       窗口函数() OVER (
           PARTITION BY 分组字段
           ORDER BY 排序字段
           ROWS/RANGE BETWEEN ... AND ...
       )
FROM 表;
```

### ROW_NUMBER / RANK / DENSE_RANK

```sql
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    student_name TEXT,
    subject TEXT,
    score INT
);

INSERT INTO scores VALUES
(1, '张三', '语文', 85),
(2, '李四', '语文', 92),
(3, '王五', '语文', 85),
(4, '张三', '数学', 90),
(5, '李四', '数学', 95),
(6, '王五', '数学', 88);

-- 每个学科的排名
SELECT
    student_name,
    subject,
    score,
    ROW_NUMBER() OVER (PARTITION BY subject ORDER BY score DESC) AS row_num,
    RANK() OVER (PARTITION BY subject ORDER BY score DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY subject ORDER BY score DESC) AS dense_rank
FROM scores;

-- 结果：
-- 李四  语文  92  1  1  1
-- 张三  语文  85  2  2  2
-- 王五  语文  85  3  2  2  (RANK 并列，DENSE_RANK 不跳号)
```

### 聚合窗口函数

```sql
-- 累计求和
SELECT
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) AS cumulative_amount
FROM orders;

-- 移动平均（最近 3 天）
SELECT
    order_date,
    amount,
    AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg
FROM orders;

-- 分组内占比
SELECT
    department,
    employee_name,
    salary,
    ROUND(salary / SUM(salary) OVER (PARTITION BY department) * 100, 2) AS pct
FROM employees;
```

### LEAD / LAG

```sql
-- 获取前后行的值
SELECT
    order_date,
    amount,
    LAG(amount, 1, 0) OVER (ORDER BY order_date) AS prev_amount,  -- 前一天
    LEAD(amount, 1, 0) OVER (ORDER BY order_date) AS next_amount  -- 后一天
FROM orders;

-- 计算环比增长
SELECT
    order_date,
    amount,
    LAG(amount) OVER (ORDER BY order_date) AS prev_amount,
    CASE
        WHEN LAG(amount) OVER (ORDER BY order_date) = 0 THEN NULL
        ELSE ROUND((amount - LAG(amount) OVER (ORDER BY order_date)) /
             LAG(amount) OVER (ORDER BY order_date) * 100, 2)
    END AS growth_rate
FROM orders;
```

### FIRST_VALUE / LAST_VALUE

```sql
-- 分组内的第一个和最后一个值
SELECT
    department,
    employee_name,
    salary,
    FIRST_VALUE(employee_name) OVER (PARTITION BY department ORDER BY salary DESC) AS highest_paid,
    LAST_VALUE(employee_name) OVER (
        PARTITION BY department
        ORDER BY salary DESC
        RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_paid
FROM employees;
```

### NTILE — 分桶

```sql
-- 将数据分成 N 组
SELECT
    student_name,
    score,
    NTILE(4) OVER (ORDER BY score DESC) AS quartile  -- 四分位
FROM scores;
```

## CTE 公用表表达式（WITH）

CTE 让复杂查询更清晰，也支持递归。

### 基本 CTE

```sql
-- 用 CTE 分解复杂查询
WITH high_scores AS (
    SELECT * FROM scores WHERE score >= 90
),
student_count AS (
    SELECT COUNT(*) AS cnt FROM scores
)
SELECT h.*, s.cnt
FROM high_scores h, student_count s;

-- 相当于临时视图，只在当前查询中有效
```

### 多表 CTE

```sql
-- 找出每个学科最高分的学生
WITH max_scores AS (
    SELECT subject, MAX(score) AS max_score
    FROM scores
    GROUP BY subject
)
SELECT s.student_name, s.subject, s.score
FROM scores s
JOIN max_scores m ON s.subject = m.subject AND s.score = m.max_score;
```

### 递归 CTE

递归 CTE 用于处理树形结构数据（如组织架构、评论回复）。

```sql
-- 创建分类表（树形结构）
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    parent_id INT REFERENCES categories(id)
);

INSERT INTO categories VALUES
(1, '电子产品', NULL),
(2, '手机', 1),
(3, '电脑', 1),
(4, '智能手机', 2),
(5, '功能手机', 2),
(6, '笔记本', 3),
(7, '台式机', 3);

-- 递归查询所有子分类
WITH RECURSIVE category_tree AS (
    -- 基础情况：顶级分类
    SELECT id, name, parent_id, 0 AS level
    FROM categories
    WHERE parent_id IS NULL

    UNION ALL

    -- 递归：子分类
    SELECT c.id, c.name, c.parent_id, ct.level + 1
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY level, id;

-- 结果：
-- 1  电子产品     NULL  0
-- 2  手机        1     1
-- 3  电脑        1     1
-- 4  智能手机    2     2
-- 5  功能手机    2     2
-- 6  笔记本      3     2
-- 7  台式机      3     2
```

### 递归查询组织架构

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    manager_id INT REFERENCES employees(id)
);

INSERT INTO employees VALUES
(1, 'CEO', NULL),
(2, 'CTO', 1),
(3, 'CFO', 1),
(4, '高级工程师', 2),
(5, '初级工程师', 4);

WITH RECURSIVE org_chart AS (
    SELECT id, name, manager_id, 0 AS level, name AS path
    FROM employees WHERE manager_id IS NULL

    UNION ALL

    SELECT e.id, e.name, e.manager_id, oc.level + 1,
           oc.path || ' -> ' || e.name
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, id;
```

## JSON 高级操作

### JSON 查询

```sql
-- 创建表
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    data JSONB
);

INSERT INTO products (data) VALUES
('{"name": "手机", "price": 4999, "specs": {"ram": "8GB", "rom": "128GB"}, "tags": ["电子", "通信"]}'),
('{"name": "电脑", "price": 12999, "specs": {"ram": "16GB", "rom": "512GB"}, "tags": ["电子", "办公"]}');

-- 基本查询
SELECT data -> 'name' AS name FROM products;
SELECT data ->> 'name' AS name FROM products;  -- 去引号

-- 嵌套 JSON
SELECT data -> 'specs' ->> 'ram' AS ram FROM products;

-- WHERE 条件
SELECT * FROM products WHERE data @> '{"name": "手机"}';
SELECT * FROM products WHERE data -> 'specs' ->> 'ram' = '8GB';

-- JSON 路径查询（PostgreSQL 12+）
SELECT data @? '$.specs.ram' FROM products;  -- 是否存在路径
SELECT data @@ '$.price > 5000' FROM products;  -- 路径表达式
```

### JSON 修改

```sql
-- 更新 JSON 字段
UPDATE products
SET data = jsonb_set(data, '{price}', '5999')
WHERE data ->> 'name' = '手机';

-- 删除 JSON 字段
UPDATE products
SET data = data - 'tags'
WHERE id = 1;

-- JSON 拼接
UPDATE products
SET data = data || '{"warranty": "1 year"}'::jsonb;

-- JSON 数组追加
UPDATE products
SET data = jsonb_set(data, '{tags}', data -> 'tags' || '"新品"'::jsonb);
```

### JSON 聚合

```sql
-- 行转 JSON 数组
SELECT jsonb_agg(data) FROM products;

-- 行转 JSON 对象
SELECT jsonb_object_agg(data ->> 'name', data -> 'price') FROM products;
-- {"手机": 4999, "电脑": 12999}
```

## 全文检索

```sql
-- 创建表
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT,
    body TEXT,
    search_vector TSVECTOR
);

-- 插入数据
INSERT INTO articles (title, body) VALUES
('PostgreSQL 教程', 'PostgreSQL 是一个功能强大的开源数据库'),
('Java 编程', 'Java 是一种面向对象的编程语言'),
('数据库设计', '好的数据库设计是系统成功的关键');

-- 更新全文检索向量
UPDATE articles SET
search_vector = to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(body, ''));

-- 创建 GIN 索引
CREATE INDEX idx_articles_search ON articles USING GIN (search_vector);

-- 全文检索查询
SELECT title, ts_headline('simple', body, to_tsquery('simple', '数据库 & 设计'))
FROM articles
WHERE search_vector @@ to_tsquery('simple', '数据库 & 设计');

-- 高亮结果
SELECT title, ts_headline(body, to_tsquery('simple', '数据库'))
FROM articles
WHERE search_vector @@ to_tsquery('simple', '数据库');
```

## 练习

```sql
-- 1. 使用窗口函数计算每个部门薪资排名前 3 的员工
SELECT * FROM (
    SELECT
        department,
        employee_name,
        salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank
    FROM employees
) ranked
WHERE rank <= 3;

-- 2. 使用 CTE 查询组织架构树
WITH RECURSIVE org_tree AS (
    SELECT id, name, manager_id, 1 AS depth
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id, ot.depth + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT * FROM org_tree ORDER BY depth, id;

-- 3. 查询 JSONB 中价格大于 5000 的商品
SELECT data ->> 'name' AS name, data -> 'price' AS price
FROM products
WHERE (data -> 'price')::numeric > 5000;
```
