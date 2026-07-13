# MySQL 常用函数

> MySQL 内置函数大全，按功能分类。

## 字符串函数

```sql
-- CONCAT — 字符串拼接
SELECT CONCAT('Hello', ' ', 'World');  -- Hello World

-- CONCAT_WS — 带分隔符拼接
SELECT CONCAT_WS('-', '2024', '01', '15');  -- 2024-01-15

-- LENGTH — 字节长度
SELECT LENGTH('Hello');   -- 5
SELECT LENGTH('你好');    -- 6（UTF-8 下中文占 3 字节）

-- CHAR_LENGTH — 字符长度
SELECT CHAR_LENGTH('你好');  -- 2

-- SUBSTRING — 截取
SELECT SUBSTRING('Hello World', 1, 5);  -- Hello（索引从 1 开始）
SELECT SUBSTRING('Hello World', 7);     -- World

-- REPLACE — 替换
SELECT REPLACE('Hello World', 'World', 'MySQL');  -- Hello MySQL

-- UPPER / LOWER — 大小写转换
SELECT UPPER('hello');  -- HELLO
SELECT LOWER('HELLO');  -- hello

-- TRIM — 去除空格
SELECT TRIM('  Hello  ');    -- Hello
SELECT LTRIM('  Hello');     -- Hello
SELECT RTRIM('Hello  ');     -- Hello

-- LPAD / RPAD — 填充
SELECT LPAD('5', 3, '0');   -- 005
SELECT RPAD('5', 3, '0');   -- 500

-- LOCATE — 查找位置
SELECT LOCATE('World', 'Hello World');  -- 7

-- REVERSE — 反转
SELECT REVERSE('Hello');  -- olleH

-- REPEAT — 重复
SELECT REPEAT('Ha', 3);  -- HaHaHa

-- LEFT / RIGHT — 取左右字符
SELECT LEFT('Hello', 2);   -- He
SELECT RIGHT('Hello', 2);  -- lo

-- FORMAT — 数字格式化
SELECT FORMAT(1234567.89, 2);  -- 1,234,567.89
```

## 数字函数

```sql
-- ABS — 绝对值
SELECT ABS(-10);  -- 10

-- CEIL / FLOOR — 向上/向下取整
SELECT CEIL(3.14);   -- 4
SELECT FLOOR(3.14);  -- 3

-- ROUND — 四舍五入
SELECT ROUND(3.14159, 2);  -- 3.14

-- TRUNCATE — 截断
SELECT TRUNCATE(3.14159, 2);  -- 3.14

-- POW / SQRT — 幂/平方根
SELECT POW(2, 10);   -- 1024
SELECT SQRT(100);    -- 10

-- RAND — 随机数（0-1）
SELECT RAND();
SELECT FLOOR(RAND() * 100) + 1;  -- 1-100 随机整数

-- MOD — 取模
SELECT MOD(10, 3);  -- 1

-- SIGN — 符号（负数=-1, 0=0, 正数=1）
SELECT SIGN(-10);  -- -1

-- GREATEST / LEAST — 最大/最小值
SELECT GREATEST(10, 20, 5);   -- 20
SELECT LEAST(10, 20, 5);      -- 5
```

## 日期函数

```sql
-- NOW — 当前日期时间
SELECT NOW();              -- 2024-01-15 14:30:25
SELECT CURDATE();          -- 2024-01-15
SELECT CURTIME();          -- 14:30:25

-- DATE / TIME / YEAR / MONTH / DAY
SELECT DATE(NOW());        -- 2024-01-15
SELECT TIME(NOW());        -- 14:30:25
SELECT YEAR(NOW());        -- 2024
SELECT MONTH(NOW());       -- 1
SELECT DAY(NOW());         -- 15
SELECT HOUR(NOW());        -- 14
SELECT MINUTE(NOW());      -- 30
SELECT SECOND(NOW());      -- 25
SELECT DAYOFWEEK(NOW());   -- 2（周日=1, 周一=2, ...）

-- 日期格式化
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s');  -- 2024-01-15 14:30:25
SELECT DATE_FORMAT(NOW(), '%Y年%m月%d日');         -- 2024年01月15日
-- 常用格式符: %Y(年), %m(月), %d(日), %H(24时), %h(12时), %i(分), %s(秒), %W(星期)

-- 日期加减
SELECT DATE_ADD(NOW(), INTERVAL 1 DAY);     -- 明天
SELECT DATE_ADD(NOW(), INTERVAL 1 MONTH);   -- 下月
SELECT DATE_SUB(NOW(), INTERVAL 1 YEAR);    -- 去年

-- 日期差
SELECT DATEDIFF('2024-12-31', '2024-01-01');  -- 365
SELECT TIMESTAMPDIFF(MONTH, '2024-01-01', '2024-12-31');  -- 11

-- 提取
SELECT EXTRACT(YEAR FROM NOW());    -- 2024
SELECT EXTRACT(MONTH FROM NOW());   -- 1

-- LAST_DAY — 当月最后一天
SELECT LAST_DAY(NOW());  -- 2024-01-31

-- 字符串 → 日期
SELECT STR_TO_DATE('2024-01-15', '%Y-%m-%d');  -- 2024-01-15
```

## 聚合函数

```sql
-- COUNT — 计数
SELECT COUNT(*) FROM students;               -- 总行数
SELECT COUNT(score) FROM students;           -- 非 NULL 的行数
SELECT COUNT(DISTINCT class_id) FROM students;  -- 去重计数

-- SUM — 求和
SELECT SUM(score) FROM students;

-- AVG — 平均值
SELECT AVG(score) FROM students;

-- MAX / MIN — 最大/最小值
SELECT MAX(score), MIN(score) FROM students;

-- GROUP_CONCAT — 分组拼接
SELECT class_id, GROUP_CONCAT(name ORDER BY id SEPARATOR ', ') AS names
FROM students GROUP BY class_id;
```

## 条件函数

```sql
-- IF — 简单条件
SELECT IF(score >= 60, '及格', '不及格') AS result FROM students;

-- IFNULL — 空值替换
SELECT IFNULL(email, '无邮箱') FROM users;

-- NULLIF — 值相等则返回 NULL
SELECT NULLIF(a, b);  -- a = b 时返回 NULL

-- CASE — 多分支条件
SELECT name, score,
    CASE
        WHEN score >= 90 THEN '优秀'
        WHEN score >= 80 THEN '良好'
        WHEN score >= 60 THEN '及格'
        ELSE '不及格'
    END AS grade
FROM students;
```

## JSON 函数（MySQL 5.7+）

```sql
-- JSON_OBJECT — 创建 JSON
SELECT JSON_OBJECT('name', '张三', 'age', 25);
-- {"age": 25, "name": "张三"}

-- JSON_ARRAY — 创建 JSON 数组
SELECT JSON_ARRAY(1, 2, 3);  -- [1, 2, 3]

-- JSON_EXTRACT — 提取值（也可以用 -> 和 ->>）
SELECT JSON_EXTRACT('{"name": "张三"}', '$.name');  -- "张三"
SELECT '{"name": "张三"}' -> '$.name';              -- "张三"
SELECT '{"name": "张三"}' ->> '$.name';             -- 张三（去引号）

-- JSON_CONTAINS — 判断是否包含
SELECT JSON_CONTAINS('[1,2,3]', '2');  -- 1

-- JSON_ARRAY_APPEND — 追加元素
SELECT JSON_ARRAY_APPEND('[1,2]', '$', 3);  -- [1, 2, 3]

-- JSON_KEYS — 获取所有键
SELECT JSON_KEYS('{"name": "张三", "age": 25}');  -- ["age", "name"]
```

## 加密函数

```sql
-- MD5
SELECT MD5('123456');  -- e10adc3949ba59abbe56e057f20f883e

-- SHA1 / SHA2
SELECT SHA1('123456');
SELECT SHA2('123456', 256);  -- SHA-256

-- AES 加密/解密
SELECT AES_ENCRYPT('hello', 'key');
SELECT AES_DECRYPT(AES_ENCRYPT('hello', 'key'), 'key');

-- 密码哈希
SELECT PASSWORD('123456');  -- MySQL 8.0+ 已废弃，使用认证插件
```

## 信息函数

```sql
-- 数据库/用户信息
SELECT DATABASE();     -- 当前数据库
SELECT USER();         -- 当前用户
SELECT VERSION();      -- MySQL 版本
SELECT CONNECTION_ID(); -- 当前连接 ID

-- 最后插入的 ID
INSERT INTO students(name) VALUES('张三');
SELECT LAST_INSERT_ID();  -- 返回最后插入记录的自增 ID

-- 影响行数
INSERT INTO students(name) VALUES('李四');
SELECT ROW_COUNT();  -- 1
```

## 练习

```sql
-- 1. 计算每个年龄段的用户数量
SELECT
    CASE
        WHEN age < 18 THEN '未成年'
        WHEN age BETWEEN 18 AND 30 THEN '青年'
        WHEN age BETWEEN 31 AND 60 THEN '中年'
        ELSE '老年'
    END AS age_group,
    COUNT(*) AS count
FROM users
GROUP BY age_group;

-- 2. 格式化日期为中文
SELECT DATE_FORMAT(create_at, '%Y年%m月%d日 %H:%i') AS create_time FROM orders;

-- 3. 计算订单金额区间分布
SELECT
    CASE
        WHEN amount < 100 THEN '小额'
        WHEN amount BETWEEN 100 AND 1000 THEN '中额'
        ELSE '大额'
    END AS amount_level,
    COUNT(*) AS order_count,
    SUM(amount) AS total_amount
FROM orders
GROUP BY amount_level;
```
