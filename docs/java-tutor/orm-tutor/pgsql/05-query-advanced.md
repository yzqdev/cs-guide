# PostgreSQL 高级查询

> 窗口函数、CTE 递归、JSON 操作、全文检索等 PostgreSQL 王牌特性。

## 窗口函数

窗口函数在不改变行数的情况下进行分组计算。

### ROW_NUMBER / RANK / DENSE_RANK

```sql
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    student_name TEXT,
    subject TEXT,
    score INT
);

INSERT INTO scores VALUES
(1, '张三', '语文', 85), (2, '李四', '语文', 92),
(3, '王五', '语文', 85), (4, '张三', '数学', 90),
(5, '李四', '数学', 95), (6, '王五', '数学', 88);

-- 各学科排名
SELECT
    student_name,
    subject,
    score,
    ROW_NUMBER() OVER (PARTITION BY subject ORDER BY score DESC) AS row_num,
    RANK() OVER (PARTITION BY subject ORDER BY score DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY subject ORDER BY score DESC) AS dense_rank
FROM scores;
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

-- 分组占比
SELECT
    department,
    employee_name,
    salary,
    ROUND(salary / SUM(salary) OVER (PARTITION BY department) * 100, 2) AS pct
FROM employees;
```

### LEAD / LAG — 前后行

```sql
SELECT
    order_date,
    amount,
    LAG(amount, 1, 0) OVER (ORDER BY order_date) AS prev_day,
    LEAD(amount, 1, 0) OVER (ORDER BY order_date) AS next_day,
    CASE WHEN LAG(amount) OVER (ORDER BY order_date) > 0
         THEN ROUND((amount - LAG(amount) OVER (ORDER BY order_date)) /
              LAG(amount) OVER (ORDER BY order_date) * 100, 2)
         ELSE NULL
    END AS growth_pct
FROM orders;
```

### FIRST_VALUE / LAST_VALUE / NTILE

```sql
-- 分组内第一个/最后一个值
SELECT *,
    FIRST_VALUE(score) OVER (PARTITION BY subject ORDER BY score DESC) AS highest,
    LAST_VALUE(score) OVER (PARTITION BY subject ORDER BY score DESC
        RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest
FROM scores;

-- NTILE — 分桶（四分位）
SELECT *,
    NTILE(4) OVER (ORDER BY score DESC) AS quartile
FROM scores;
```

## CTE 公用表表达式（WITH）

### 基本 CTE

```sql
-- 用 CTE 分解复杂查询
WITH high_scores AS (
    SELECT * FROM scores WHERE score >= 90
),
counts AS (
    SELECT COUNT(*) AS total FROM scores
)
SELECT h.*, c.total FROM high_scores h, counts c;
```

### 递归 CTE

```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    parent_id INT REFERENCES categories(id)
);

INSERT INTO categories VALUES
(1, '电子产品', NULL), (2, '手机', 1), (3, '电脑', 1),
(4, '智能手机', 2), (5, '笔记本', 3);

-- 递归查询树形结构
WITH RECURSIVE category_tree AS (
    -- 基础：顶级
    SELECT id, name, parent_id, 0 AS level, name::TEXT AS path
    FROM categories WHERE parent_id IS NULL

    UNION ALL

    -- 递归：子级
    SELECT c.id, c.name, c.parent_id, ct.level + 1,
           ct.path || ' → ' || c.name
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY path;
```

### 生成连续日期

```sql
WITH dates AS (
    SELECT generate_series(
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '7 days',
        INTERVAL '1 day'
    )::DATE AS date
)
SELECT d.date, COALESCE(SUM(o.amount), 0) AS daily_total
FROM dates d
LEFT JOIN orders o ON o.order_date = d.date
GROUP BY d.date
ORDER BY d.date;
```

## JSON 高级操作

```sql
-- 创建表并插入 JSON 数据
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    data JSONB
);

INSERT INTO products (data) VALUES
('{"name": "手机", "price": 4999, "specs": {"ram": "8GB", "rom": "128GB"}, "tags": ["电子", "通信"]}'),
('{"name": "电脑", "price": 12999, "specs": {"ram": "16GB", "rom": "512GB"}, "tags": ["电子", "办公"]}');

-- JSON 路径查询（12+）
SELECT data @? '$.specs.ram' FROM products;
SELECT data @@ '$.price > 5000' FROM products;

-- JSON 聚合
SELECT jsonb_agg(data) FROM products;
SELECT jsonb_object_agg(data ->> 'name', data -> 'price') FROM products;

-- JSON 更新
UPDATE products SET data = jsonb_set(data, '{price}', '5999') WHERE id = 1;
UPDATE products SET data = data || '{"warranty": "1 year"}'::jsonb;
```

## 全文检索

```sql
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT,
    body TEXT,
    fts TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(body, ''))
    ) STORED
);

CREATE INDEX idx_fts ON articles USING GIN (fts);

INSERT INTO articles (title, body) VALUES
('PostgreSQL 教程', 'PostgreSQL 是一个功能强大的开源数据库');

SELECT title, ts_headline(body, to_tsquery('simple', '数据库'))
FROM articles
WHERE fts @@ to_tsquery('simple', '数据库');
```

## JSON 与表的互转

```sql
-- 行 → JSON
SELECT row_to_json(u) FROM users u WHERE id = 1;
SELECT json_agg(u) FROM users u;

-- JSON → 行
SELECT * FROM jsonb_to_record('{"id": 1, "name": "张三"}') AS x(id INT, name TEXT);
```

## 练习

```sql
-- 1. 用窗口函数计算每个部门工资排名前 3
-- 2. 用递归 CTE 查询组织架构树
-- 3. 用 JSONB 查询价格大于 5000 的商品
-- 4. 生成过去 30 天的每日订单统计（无订单也显示 0）
```
