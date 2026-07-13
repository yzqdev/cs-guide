# PostgreSQL 函数与操作符

> PostgreSQL 内置了大量实用函数，涵盖字符串、数字、日期、聚合和条件处理。

## 字符串函数

```sql
-- 拼接
SELECT 'Hello' || ' ' || 'World';       -- Hello World
SELECT CONCAT('Hello', ' ', 'World');   -- Hello World
SELECT CONCAT_WS('-', '2024', '01', '15');  -- 2024-01-15

-- 长度
SELECT LENGTH('Hello');           -- 5（字符数）
SELECT OCTET_LENGTH('你好');      -- 6（字节数）

-- 截取
SELECT SUBSTRING('Hello World', 1, 5);  -- Hello（索引从 1 开始）
SELECT LEFT('Hello', 2);                -- He
SELECT RIGHT('Hello', 2);               -- lo

-- 查找
SELECT POSITION('World' IN 'Hello World');  -- 7
SELECT STRPOS('Hello World', 'World');      -- 7

-- 替换
SELECT REPLACE('Hello World', 'World', 'PostgreSQL');  -- Hello PostgreSQL

-- 大小写
SELECT UPPER('hello');              -- HELLO
SELECT LOWER('HELLO');              -- hello
SELECT INITCAP('hello world');      -- Hello World

-- 去空格
SELECT TRIM('  Hello  ');           -- Hello
SELECT LTRIM('  Hello');            -- Hello
SELECT RTRIM('Hello  ');            -- Hello

-- 填充
SELECT LPAD('5', 3, '0');           -- 005
SELECT RPAD('5', 3, '0');           -- 500

-- 正则
SELECT 'abc123' ~ '[a-z]+';              -- true（匹配）
SELECT REGEXP_REPLACE('hello123', '[0-9]', '', 'g');  -- hello
SELECT REGEXP_SPLIT_TO_TABLE('a,b,c', ',');  -- 拆成多行

-- 格式化
SELECT FORMAT('Hello %s, age %d', '张三', 25);  -- Hello 张三, age 25
```

## 数字函数

```sql
-- 取整
SELECT CEIL(3.14);          -- 4（向上）
SELECT FLOOR(3.14);         -- 3（向下）
SELECT ROUND(3.14159, 2);   -- 3.14（四舍五入）
SELECT TRUNC(3.14159, 2);   -- 3.14（截断）

-- 绝对值
SELECT ABS(-10);            -- 10

-- 幂/平方根
SELECT POW(2, 10);           -- 1024
SELECT SQRT(100);            -- 10

-- 随机数
SELECT RANDOM();             -- 0~1 随机
SELECT FLOOR(RANDOM() * 100) + 1;  -- 1~100

-- 最大/最小值
SELECT GREATEST(10, 20, 5); -- 20
SELECT LEAST(10, 20, 5);    -- 5

-- 取模
SELECT MOD(10, 3);           -- 1

-- 生成序列
SELECT GENERATE_SERIES(1, 10);           -- 1..10
SELECT GENERATE_SERIES(0, 100, 10);      -- 0,10,20,...,100
SELECT GENERATE_SERIES('2024-01-01'::DATE, '2024-01-07'::DATE, '1 day');
```

## 日期函数

```sql
-- 当前时间
SELECT NOW();              -- 2024-01-15 14:30:25.123+08
SELECT CURRENT_DATE;       -- 2024-01-15
SELECT CURRENT_TIME;       -- 14:30:25.123+08
SELECT CURRENT_TIMESTAMP;  -- 同 NOW()

-- 提取
SELECT EXTRACT(YEAR FROM NOW());       -- 2024
SELECT EXTRACT(MONTH FROM NOW());      -- 1
SELECT EXTRACT(DAY FROM NOW());        -- 15
SELECT EXTRACT(DOW FROM NOW());        -- 2（周日=0, 周一=1, ...）
SELECT EXTRACT(EPOCH FROM NOW());      -- 时间戳（秒）

-- 日期加减
SELECT NOW() + INTERVAL '1 day';       -- 明天
SELECT NOW() + INTERVAL '1 month';     -- 下月
SELECT NOW() - INTERVAL '1 year';      -- 去年

-- 截断
SELECT DATE_TRUNC('month', NOW());     -- 当月第一天
SELECT DATE_TRUNC('year', NOW());      -- 当年第一天
SELECT DATE_TRUNC('hour', NOW());      -- 整点

-- 日期差
SELECT AGE('2024-12-31', '2024-01-01');           -- 11 months 30 days
SELECT EXTRACT(DAY FROM AGE('2024-12-31', '2024-01-01')); -- 天数差

-- 格式化
SELECT TO_CHAR(NOW(), 'YYYY-MM-DD HH24:MI:SS');  -- 2024-01-15 14:30:25
SELECT TO_CHAR(NOW(), 'YYYY年MM月DD日');          -- 2024年01月15日
SELECT TO_CHAR(NOW(), 'Day');                     -- Tuesday

-- 字符串转日期
SELECT TO_DATE('2024-01-15', 'YYYY-MM-DD');
SELECT TO_TIMESTAMP('2024-01-15 14:30:25', 'YYYY-MM-DD HH24:MI:SS');
```

## 聚合函数

```sql
-- 基础聚合
SELECT
    COUNT(*) AS total,                -- 总数
    COUNT(DISTINCT department) AS dept_count,  -- 去重计数
    AVG(salary) AS avg_salary,        -- 平均值
    SUM(salary) AS total_salary,      -- 总和
    MAX(salary) AS max_salary,        -- 最大值
    MIN(salary) AS min_salary         -- 最小值
FROM employees;

-- 数组聚合
SELECT department, ARRAY_AGG(employee_name) AS employees
FROM employees GROUP BY department;

-- 字符串聚合
SELECT department, STRING_AGG(employee_name, ', ' ORDER BY salary DESC) AS employees
FROM employees GROUP BY department;

-- JSON 聚合
SELECT json_agg(employee_name) FROM employees;
```

## 条件函数

```sql
-- CASE
SELECT
    name,
    CASE
        WHEN score >= 90 THEN '优秀'
        WHEN score >= 80 THEN '良好'
        WHEN score >= 60 THEN '及格'
        ELSE '不及格'
    END AS grade
FROM students;

-- COALESCE — 返回第一个非 NULL
SELECT COALESCE(email, '无邮箱') FROM users;

-- NULLIF — 相等则返回 NULL
SELECT NULLIF(a, 0);  -- a=0 → NULL

-- GREATEST / LEAST
SELECT GREATEST(a, b, c) FROM numbers;
```

## 加密与安全函数

```sql
-- 需要 pgcrypto 扩展
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 哈希
SELECT MD5('123456');
SELECT DIGEST('123456', 'sha256');

-- 密码哈希（自动加盐）
SELECT CRYPT('mypassword', GEN_SALT('bf'));

-- UUID 生成
SELECT GEN_RANDOM_UUID();           -- 随机 UUID
SELECT UUID_GENERATE_V4();          -- UUID v4

-- 随机字节
SELECT ENCODE(GEN_RANDOM_BYTES(16), 'hex');
```

## 信息函数

```sql
SELECT VERSION();           -- PostgreSQL 版本
SELECT CURRENT_USER;        -- 当前用户
SELECT CURRENT_DATABASE();  -- 当前数据库
SELECT PG_BACKEND_PID();    -- 当前进程 ID

-- 查看表大小
SELECT PG_SIZE_PRETTY(PG_TOTAL_RELATION_SIZE('users'));

-- 查看数据库大小
SELECT PG_SIZE_PRETTY(PG_DATABASE_SIZE('testdb'));
```

## 练习

```sql
-- 1. 计算每个员工的年龄（根据出生日期）
-- 2. 格式化日期为 "2024年01月15日" 格式
-- 3. 使用 GENERATE_SERIES 生成一个数字表 1-100
-- 4. 用 COALESCE 处理 NULL 值
-- 5. 使用 STRING_AGG 将员工按部门拼成逗号分隔字符串
```
