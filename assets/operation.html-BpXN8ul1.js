import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const r={},l=a(`<h1 id="mysql操作" tabindex="-1"><a class="header-anchor" href="#mysql操作"><span>mysql操作</span></a></h1><h1 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型"><span>数据类型</span></a></h1><table><thead><tr><th style="text-align:left;">名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">INT</td><td style="text-align:left;">整型</td><td style="text-align:left;">4字节整数类型，范围约+/-21亿</td></tr><tr><td style="text-align:left;">BIGINT</td><td style="text-align:left;">长整型</td><td style="text-align:left;">8字节整数类型，范围约+/-922亿亿</td></tr><tr><td style="text-align:left;">REAL</td><td style="text-align:left;">浮点型</td><td style="text-align:left;">4字节浮点数，范围约+/-1038</td></tr><tr><td style="text-align:left;">DOUBLE</td><td style="text-align:left;">浮点型</td><td style="text-align:left;">8字节浮点数，范围约+/-10308</td></tr><tr><td style="text-align:left;">DECIMAL(M,N)</td><td style="text-align:left;">高精度小数</td><td style="text-align:left;">由用户指定精度的小数，例如，DECIMAL(20,10)表示一共20位，其中小数10位，通常用于财务计算</td></tr><tr><td style="text-align:left;">CHAR(N)</td><td style="text-align:left;">定长字符串</td><td style="text-align:left;">存储指定长度的字符串，例如，CHAR(100)总是存储100个字符的字符串</td></tr><tr><td style="text-align:left;">VARCHAR(N)</td><td style="text-align:left;">变长字符串</td><td style="text-align:left;">存储可变长度的字符串，例如，VARCHAR(100)可以存储0~100个字符的字符串</td></tr><tr><td style="text-align:left;">BOOLEAN</td><td style="text-align:left;">布尔类型</td><td style="text-align:left;">存储True或者False</td></tr><tr><td style="text-align:left;">DATE</td><td style="text-align:left;">日期类型</td><td style="text-align:left;">存储日期，例如，2018-06-22</td></tr><tr><td style="text-align:left;">TIME</td><td style="text-align:left;">时间类型</td><td style="text-align:left;">存储时间，例如，12:20:59</td></tr><tr><td style="text-align:left;">DATETIME</td><td style="text-align:left;">日期和时间类型</td><td style="text-align:left;">存储日期+时间，例如，2018-06-22 12:20:59</td></tr></tbody></table><div class="hint-container tip"><p class="hint-container-title">提示</p><p>先创建几个例子</p><pre><code class="language-sql">create table samp_db.students (
    id int8 not null  unique primary key  auto_increment comment &#39;id主键&#39;,
    name varchar(32) not null  default &#39;&#39; comment &#39;姓名&#39;,
    sex varchar(32) not null  default &#39;男&#39; comment &#39;性别&#39;,
    score int2 not null  comment &#39;分数&#39;,
    class_id int8 not null comment &#39;班级id&#39;,
    index (id)
) if not exist;

create table samp_db.classes
(
    id   int8 unique    primary key         not null auto_increment,
    name varchar(32) default &#39;&#39; not null
);
-- 添加外键
ALTER TABLE students
ADD CONSTRAINT fk_class_id
FOREIGN KEY (class_id)
REFERENCES classes (id);
</code></pre></div><h2 id="创建数据库" tabindex="-1"><a class="header-anchor" href="#创建数据库"><span>创建数据库</span></a></h2><pre><code class="language-sql">create database samp_db
drop database samp_db; -- 删除 库名为 samp_db 的库
show databases;        -- 显示数据库列表。
use samp_db;           -- 选择创建的数据库 samp_db 
show tables;           -- 显示 samp_db 下面所有的表名字
describe 表名;          -- 显示数据表的结构
delete from 表名;       -- 清空表中记录
</code></pre><h2 id="创建表" tabindex="-1"><a class="header-anchor" href="#创建表"><span>创建表</span></a></h2><pre><code class="language-sql"># -- 如果数据库中存在user_accounts表，就把它从数据库中drop掉
DROP TABLE IF EXISTS \`user\`;
CREATE TABLE \`user\` (
  \`id\`             int(100) unsigned NOT NULL AUTO_INCREMENT primary key,
  \`password\`       varchar(32)       NOT NULL DEFAULT &#39;&#39; COMMENT &#39;用户密码&#39;,
  \`username\`       varchar(32)       not null default &#39;&#39; comment &#39;&#39;,
  \`reset_password\` tinyint(32)       NOT NULL DEFAULT 0 COMMENT &#39;用户类型：0－不需要重置密码；1-需要重置密码&#39;,
  \`mobile\`         varchar(20)       NOT NULL DEFAULT &#39;&#39; COMMENT &#39;手机&#39;,
  \`create_at\`      timestamp(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`update_at\`      timestamp(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  -- 创建唯一索引，不允许重复
  UNIQUE INDEX idx_user_mobile(\`mobile\`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
COMMENT=&#39;用户表信息&#39;;
</code></pre><h2 id="删除表" tabindex="-1"><a class="header-anchor" href="#删除表"><span>删除表</span></a></h2><pre><code class="language-sql">DROP TABLE user;     -- 用于删除数据库中的现有表。
TRUNCATE TABLE user; -- 用于删除表内的数据，但不删除表本身。
</code></pre><h2 id="增删改查" tabindex="-1"><a class="header-anchor" href="#增删改查"><span>增删改查</span></a></h2><h2 id="insert" tabindex="-1"><a class="header-anchor" href="#insert"><span>insert</span></a></h2><pre><code class="language-sql">insert into user(  username, password, reset_password, mobile, create_at, update_at) VALUES (&#39;用户名&#39;,&#39;123456&#39;,0,&#39;1888888888&#39;,&#39;2017-05-18 11:06:17&#39;,&#39;2017-05-18 11:06:17&#39;)
-- 向表中插入字段username和mobile
insert into user set username=&#39;setuser&#39;,mobile=&#39;11222222&#39;;
-- SQL实现将一个表的数据插入到另外一个表的代码
-- 如果只希望导入指定字段，可以用这种方法：
-- INSERT INTO 目标表 (字段1, 字段2, ...) SELECT 字段1, 字段2, ... FROM 来源表;
INSERT INTO orders (user_account_id, title) SELECT m.user_id, m.title FROM meeting m where m.id=1;

-- 向表 charger 插入一条数据，已存在就对表 charger 更新 \`type\`,\`update_at\` 字段；
INSERT INTO \`charger\` (\`id\`,\`type\`,\`create_at\`,\`update_at\`) VALUES (3,2,&#39;2017-05-18 11:06:17&#39;,&#39;2017-05-18 11:06:17&#39;) ON DUPLICATE KEY UPDATE \`id\`=VALUES(\`id\`), \`type\`=VALUES(\`type\`), \`update_at\`=VALUES(\`update_at\`);
</code></pre><h2 id="delete" tabindex="-1"><a class="header-anchor" href="#delete"><span>delete</span></a></h2><pre><code class="language-sql">-- 在不删除table_name表的情况下删除所有的行，清空表。
DELETE FROM table_name
-- 或者
DELETE * FROM table_name
-- 删除 Person 表字段 LastName = &#39;JSLite&#39; 
DELETE FROM person WHERE last_name = &#39;JSLite&#39; 
-- 删除 表meeting id 为2和3的两条数据
DELETE from meeting where id in (2,3);

</code></pre><h2 id="update" tabindex="-1"><a class="header-anchor" href="#update"><span>update</span></a></h2><pre><code class="language-sql">-- update语句设置字段值为另一个结果取出来的字段
UPDATE user set name = (SELECT name from user1 WHERE user1 .id = 1 )
WHERE id = (SELECT id from user2 WHERE user2 .name=&#39;小苏&#39;);
-- 更新表 orders 中 id=1 的那一行数据更新它的 title 字段
UPDATE \`orders\` set title=&#39;这里是标题&#39; WHERE id=1;


</code></pre><h2 id="select" tabindex="-1"><a class="header-anchor" href="#select"><span>select</span></a></h2><pre><code class="language-sql">select username,mobile from user where  id=1;
-- 选择所有
select  * from user;
 
-- 表 station 取个别名叫 s，表 station 中不包含 字段 id=13 或者 14 的，并且 id 不等于 4 的 查询出来，只显示 id
SELECT s.id from station s WHERE id in (13,14) and id not in (4);
-- 从表 users 选取 id=3 的数据，并只拉一条数据(据说能优化性能)
SELECT * FROM user  where id=3 limit 1
-- 结果集中会自动去重复数据
SELECT DISTINCT username FROM user
-- 表 person 字段 id 等于 order 字段 id 的值，
-- 结果集显示 person表的 last_name、first_name字段，order表的order_number字段
SELECT p.last_name, p.first_name, o.order_number FROM person p, order o WHERE p.id = o.id

-- gbk 和 utf8 中英文混合排序最简单的办法 
-- ci是 case insensitive, 即 “大小写不敏感”
SELECT tag, COUNT(tag) from news GROUP BY tag order by convert(tag using gbk) collate gbk_chinese_ci;
SELECT tag, COUNT(tag) from news GROUP BY tag order by convert(tag using utf8) collate utf8_unicode_ci;

</code></pre><h2 id="where" tabindex="-1"><a class="header-anchor" href="#where"><span>where</span></a></h2><pre><code class="language-sql">
-- 从表 persons 中选出 year 字段大于 1965 的数据
SELECT * FROM person WHERE year&gt;1965
-- 从 customers 表中选择 country = Mexico 的所有数据：
SELECT * FROM customer WHERE country=&#39;Mexico&#39;;
-- 从 customer 表中选择 customer_id = 1 的所有数据：
SELECT * FROM customer WHERE customer_id=1;
</code></pre><h3 id="and-or-和-not" tabindex="-1"><a class="header-anchor" href="#and-or-和-not"><span>AND, OR 和 NOT</span></a></h3><pre><code class="language-sql">-- 删除 meeting 表字段 
-- id=2 并且 user_id=5 的数据  和
-- id=3 并且 user_id=6 的数据 
DELETE from meeting where id in (2,3) and user_id in (5,6);

-- 使用 AND 来显示所有姓为 &quot;Carter&quot; 并且名为 &quot;Thomas&quot; 的人：
SELECT * FROM Persons WHERE FirstName=&#39;Thomas&#39; AND LastName=&#39;Carter&#39;;

</code></pre><h3 id="or" tabindex="-1"><a class="header-anchor" href="#or"><span>OR</span></a></h3><blockquote><p><code>OR 语法</code></p><pre><code class="language-sql">SELECT 列名称1, 列名称2, ... FROM 表名称 WHERE 条件1 OR 条件2 OR 条件3 ...;
</code></pre></blockquote><pre><code class="language-sql">-- 使用 OR 来显示所有姓为 &quot;Carter&quot; 或者名为 &quot;Thomas&quot; 的人：
SELECT * FROM Persons WHERE firstname=&#39;Thomas&#39; OR lastname=&#39;Carter&#39;
</code></pre><h3 id="not" tabindex="-1"><a class="header-anchor" href="#not"><span>NOT</span></a></h3><blockquote><p><code>NOT 语法</code></p><pre><code class="language-sql">SELECT 列名称1, 列名称2, ... FROM 表名称 WHERE NOT 条件2;
</code></pre></blockquote><pre><code class="language-sql">-- 从 Customers 表中选择 Country 不是 Germany 的所有字段：
SELECT * FROM Customers WHERE NOT Country=&#39;Germany&#39;;
</code></pre><h3 id="and-or-not" tabindex="-1"><a class="header-anchor" href="#and-or-not"><span>AND &amp; OR &amp; NOT</span></a></h3><pre><code class="language-sql">-- 从 Customers 表中选择所有字段，其中 Country 为 Germany 且城市必须为 Berlin 或 München（使用括号构成复杂表达式）：
SELECT * FROM Customers WHERE Country=&#39;Germany&#39; AND (City=&#39;Berlin&#39; OR City=&#39;München&#39;);
-- 从 Customers 表中选择 Country 不是 Germany 和 NOT &quot;USA&quot; 的所有字段：
SELECT * FROM Customers WHERE NOT Country=&#39;Germany&#39; AND NOT Country=&#39;USA&#39;;
</code></pre><h2 id="order-by" tabindex="-1"><a class="header-anchor" href="#order-by"><span>ORDER BY</span></a></h2><blockquote><p><code>ORDER BY 语法</code> 用于按升序或降序对结果集进行排序。</p><pre><code class="language-sql">SELECT 列名称1, 列名称2, ... FROM 表名称 ORDER BY 列名称1, 列名称2, ... ASC|DESC;
</code></pre><p>默认按 <code>ASC</code> 升序对记录进行排序。要按降序对记录进行排序，请使用 <code>DESC</code> 关键字。</p></blockquote><pre><code class="language-sql">-- 从 Customers 表中选择所有字段，按 Country 列排序：
SELECT * FROM Customers ORDER BY Country;
-- 从 Orders 表中选择 Company, OrderNumber 字段，按 Company 列排序：
SELECT Company, OrderNumber FROM Orders ORDER BY Company
-- 从 Orders 表中选择 Company, OrderNumber 字段，按 Company 列降序排序：
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC
-- 从 Orders 表中选择 Company, OrderNumber 字段，按 Company 列降序排序，并 OrderNumber 以顺序显示：
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC, OrderNumber ASC
</code></pre><h2 id="group-by" tabindex="-1"><a class="header-anchor" href="#group-by"><span>GROUP BY</span></a></h2><blockquote><p><code>GROUP BY 语法</code> 将具有相同值的行分组到汇总行中</p><pre><code class="language-sql">SELECT 列名称(s)
FROM 表名称
WHERE 条件
GROUP BY 列名称(s)
ORDER BY 列名称(s);
</code></pre></blockquote><pre><code class="language-sql">-- 列出了 Orders 每个发货人 Shippers 发送的订单 Orders 数量
SELECT Shippers.ShipperName, COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders
LEFT JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
GROUP BY ShipperName;
</code></pre><h2 id="in" tabindex="-1"><a class="header-anchor" href="#in"><span>IN</span></a></h2><blockquote><p><code>IN 语法</code> 运算符允许您在 WHERE 子句中指定多个值。运算符是多个 OR 条件的简写。</p><pre><code class="language-sql">SELECT 列名称(s) FROM 表名称 WHERE 列名称 IN (值1, 值2, ...);
SELECT 列名称(s) FROM 表名称 WHERE 列名称 IN (SELECT STATEMENT);
</code></pre></blockquote><pre><code class="language-sql">-- 从表 Persons 选取 字段 LastName 等于 Adams、Carter
SELECT * FROM Persons WHERE LastName IN (&#39;Adams&#39;,&#39;Carter&#39;)
-- 从表 Customers 选取 Country 值为 &#39;Germany&#39;, &#39;France&#39;, &#39;UK&#39; 的所有数据
SELECT * FROM Customers WHERE Country IN (&#39;Germany&#39;, &#39;France&#39;, &#39;UK&#39;);
-- 从表 Customers 选取 Country 值不为 &#39;Germany&#39;, &#39;France&#39;, &#39;UK&#39; 的所有数据
SELECT * FROM Customers WHERE Country NOT IN (&#39;Germany&#39;, &#39;France&#39;, &#39;UK&#39;);
-- 从表 Customers 选取与 Suppliers 表 Country 字段相同的所有数据：
SELECT * FROM Customers WHERE Country IN (SELECT Country FROM Suppliers);
</code></pre><h2 id="union" tabindex="-1"><a class="header-anchor" href="#union"><span>UNION</span></a></h2><blockquote><p><code>UNION 语法</code> 操作符用于合并两个或多个 SELECT 语句的结果集</p><pre><code class="language-sql">SELECT 列名称(s) FROM 表名称1
UNION
SELECT 列名称(s) FROM 表名称2;
</code></pre></blockquote><pre><code class="language-sql">-- 列出所有在中国表（Employees_China）和美国（Employees_USA）的不同的雇员名
SELECT E_Name FROM Employees_China UNION SELECT E_Name FROM Employees_USA
-- 列出 meeting 表中的 pic_url，
-- station 表中的 number_station 别名设置成 pic_url 避免字段不一样报错
-- 按更新时间排序
SELECT id,pic_url FROM meeting UNION ALL SELECT id,number_station AS pic_url FROM station  ORDER BY update_at;
-- 通过 UNION 语法同时查询了 products 表 和 comments 表的总记录数，并且按照 count 排序
SELECT &#39;product&#39; AS type, count(*) as count FROM \`products\` union select &#39;comment&#39; as type, count(*) as count FROM \`comments\` order by count;
</code></pre><h2 id="between" tabindex="-1"><a class="header-anchor" href="#between"><span>BETWEEN</span></a></h2><blockquote><p><code>BETWEEN 语法</code> 运算符选择给定范围内的值</p><pre><code class="language-sql">SELECT 列名称(s) FROM 表名称 WHERE 列名称 BETWEEN 值1 AND 值2;
</code></pre></blockquote><pre><code class="language-sql">-- 选择 Products 表中 Price 字段在 10 到 20 之间的所有：
SELECT * FROM Products WHERE Price BETWEEN 10 AND 20;
</code></pre><h2 id="as" tabindex="-1"><a class="header-anchor" href="#as"><span>AS</span></a></h2><blockquote><p><code>AS 语法</code> 用于为表或表中的列(字段)提供临时名称(别名)。</p><pre><code class="language-sql">SELECT 列名称 AS 别名 FROM 表名称;
SELECT 列名称(s) FROM 表名称 AS 别名;
</code></pre></blockquote><pre><code class="language-sql">-- 创建两个别名，一个用于 CustomerID 的 ID 别名列，一个用于 CustomerName  的 Customer 别名列：
SELECT CustomerID AS ID, CustomerName AS Customer FROM Customers;
-- 这句意思是查找所有 Employee 表里面的数据，并把 Employee 表格命名为 emp。
-- 当你命名一个表之后，你可以在下面用 emp 代替 Employee.
-- 例如 SELECT * FROM emp.
SELECT * FROM Employee AS emp
-- 列出表 Orders 字段 OrderPrice 列最大值，
-- 结果集列不显示 OrderPrice 显示 LargestOrderPrice
SELECT MAX(OrderPrice) AS LargestOrderPrice FROM Orders
-- 显示表 users_profile 中的 name 列
SELECT t.name from (SELECT * from users_profile a) AS t;
-- 表 user_accounts 命名别名 ua，表 users_profile 命名别名 up
-- 满足条件 表 user_accounts 字段 id 等于 表 users_profile 字段 user_id
-- 结果集只显示mobile、name两列
SELECT ua.mobile,up.name FROM user_accounts as ua INNER JOIN users_profile as up ON ua.id = up.user_id;
</code></pre><h2 id="join" tabindex="-1"><a class="header-anchor" href="#join"><span>JOIN</span></a></h2><p>JOIN 子句用于根据两个或多个表之间的相关列组合来自两个或多个表的行。</p><ul><li><code>JOIN</code>: 如果表中有至少一个匹配，则返回行</li><li><code>INNER JOIN</code>:在表中存在至少一个匹配时，INNER JOIN 关键字返回行。</li><li><code>LEFT JOIN</code>: 即使右表中没有匹配，也从左表返回所有的行</li><li><code>RIGHT JOIN</code>: 即使左表中没有匹配，也从右表返回所有的行</li><li><code>FULL JOIN</code>: 只要其中一个表中存在匹配，就返回行(MySQL 是不支持的，通过 <code>LEFT JOIN + UNION + RIGHT JOIN</code> 的方式 来实现)</li></ul><h3 id="inner-join" tabindex="-1"><a class="header-anchor" href="#inner-join"><span>INNER JOIN</span></a></h3><blockquote><p><code>INNER JOIN 语法</code> 选择在两个表中具有匹配值的记录。</p><pre><code class="language-sql">SELECT 列名称(s)
FROM 表1
INNER JOIN 表2
ON 表1.列名称 = 表2.列名称;
</code></pre></blockquote><pre><code class="language-sql">-- 选择包含 Customers 的所有 Orders：
SELECT Orders.OrderID, Customers.CustomerName FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
-- [JOIN 三张表] 选择包含 Customers 和 Shippers 的所有 Orders：
SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
FROM ((Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);
</code></pre><h3 id="left-join" tabindex="-1"><a class="header-anchor" href="#left-join"><span>LEFT JOIN</span></a></h3><blockquote><p><code>LEFT JOIN 语法</code> 返回左表 (表1) 中的所有记录，以及右表 (表2) 中的匹配记录</p><pre><code class="language-sql">SELECT 列名称(s)
FROM 表1
LEFT JOIN 表2
ON 表1.列名称 = 表2.列名称;
</code></pre></blockquote><pre><code class="language-sql">-- 将选择所有 Customers 以及他们可能拥有的任何 Orders：
SELECT Customers.CustomerName, Orders.OrderID FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;
</code></pre><h3 id="right-join" tabindex="-1"><a class="header-anchor" href="#right-join"><span>RIGHT JOIN</span></a></h3><blockquote><p><code>RIGHT JOIN 语法</code> 返回右表 (表2) 中的所有记录，以及左表 (表1) 中的匹配记录</p><pre><code class="language-sql">SELECT 列名称(s)
FROM 表1
RIGHT JOIN 表2
ON 表1.列名称 = 表2.列名称;
</code></pre></blockquote><pre><code class="language-sql">-- 返回所有 Employees 以及他们可能下的任何 Orders：
SELECT Orders.OrderID, Employees.LastName, Employees.FirstName FROM Orders
RIGHT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
ORDER BY Orders.OrderID;
</code></pre><h3 id="full-outer-join" tabindex="-1"><a class="header-anchor" href="#full-outer-join"><span>FULL OUTER JOIN</span></a></h3><blockquote><p><code>FULL OUTER JOIN 语法</code> 当左（表1）或右（表2）表记录中存在匹配时，关键字返回所有记录</p><pre><code class="language-sql">SELECT 列名称(s)
FROM 表1
FULL OUTER JOIN 表2
ON 表1.列名称 = 表2.列名称
WHERE 条件;
</code></pre></blockquote><h2 id="sql-函数" tabindex="-1"><a class="header-anchor" href="#sql-函数"><span>SQL 函数</span></a></h2><h3 id="count" tabindex="-1"><a class="header-anchor" href="#count"><span>COUNT</span></a></h3><blockquote><p><code>COUNT 语法</code> 返回与指定条件匹配的行数</p><pre><code class="language-sql">SELECT COUNT(列名称) FROM 表名称 WHERE 条件;
</code></pre></blockquote><pre><code class="language-sql">-- 表 Store_Information 有几笔 store_name 栏不是空白的资料。
-- &quot;IS NOT NULL&quot; 是 &quot;这个栏位不是空白&quot; 的意思。
SELECT COUNT (Store_Name) FROM Store_Information WHERE Store_Name IS NOT NULL; 
-- 获取 Persons 表的总数
SELECT COUNT(1) AS totals FROM Persons;
-- 获取表 station 字段 user_id 相同的总数
select user_id, count(*) as totals from station group by user_id;
</code></pre><h3 id="avg" tabindex="-1"><a class="header-anchor" href="#avg"><span>AVG</span></a></h3><blockquote><p><code>AVG 语法</code> 返回数值列的平均值</p><pre><code class="language-sql">SELECT AVG(列名称) FROM 表名称 WHERE 条件;
</code></pre></blockquote><pre><code class="language-sql">-- 查找 Products 表中所的 Price 平均值：
SELECT AVG(Price) FROM Products;
</code></pre><h3 id="sum" tabindex="-1"><a class="header-anchor" href="#sum"><span>SUM</span></a></h3><blockquote><p><code>SUM 语法</code> 返回数值列的总和</p><pre><code class="language-sql">SELECT SUM(列名称) FROM 表名称 WHERE 条件;
</code></pre></blockquote><pre><code class="language-sql">-- 查找 OrderDetails 表中 Quantity 字段的总和：
SELECT SUM(Quantity) FROM OrderDetails;
</code></pre><h3 id="max" tabindex="-1"><a class="header-anchor" href="#max"><span>MAX</span></a></h3><blockquote><p><code>MAX 语法</code> 返回所选列的最大值</p><pre><code class="language-sql">SELECT MIN(列名称) FROM 表名称 WHERE 条件;
</code></pre></blockquote><pre><code class="language-sql">-- 列出表 Orders 字段 OrderPrice 列最大值，
-- 结果集列不显示 OrderPrice 显示 LargestOrderPrice
SELECT MAX(OrderPrice) AS LargestOrderPrice FROM Orders
</code></pre><h3 id="min" tabindex="-1"><a class="header-anchor" href="#min"><span>MIN</span></a></h3><blockquote><p><code>MIN 语法</code> 返回所选列的最小值</p><pre><code class="language-sql">SELECT MIN(列名称) FROM 表名称 WHERE 条件;
</code></pre></blockquote><pre><code class="language-sql">-- 查找 Products 表中 Price 字段最小值，并命名 SmallestPrice 别名：
SELECT MIN(Price) AS SmallestPrice FROM Products;
</code></pre><h2 id="触发器" tabindex="-1"><a class="header-anchor" href="#触发器"><span>触发器</span></a></h2><blockquote><p>语法：</p><pre><code class="language-sql">create trigger &lt;触发器名称&gt;  
{ before | after}         -- 之前或者之后出发  
insert | update | delete  -- 指明了激活触发程序的语句的类型  
on &lt;表名&gt;                  -- 操作哪张表  
for each row              -- 触发器的执行间隔，for each row 通知触发器每隔一行执行一次动作，而不是对整个表执行一次。  
&lt;触发器SQL语句&gt;
</code></pre></blockquote><pre><code class="language-sql">delimiter $
CREATE TRIGGER set_userdate BEFORE INSERT 
on \`message\`
for EACH ROW
BEGIN
  set @statu = new.status; -- 声明复制变量 statu
  if @statu = 0 then       -- 判断 statu 是否等于 0
    UPDATE \`user_accounts\` SET status=1 WHERE openid=NEW.openid;
  end if;
END
$
DELIMITER ; -- 恢复结束符号
</code></pre><p>OLD和NEW不区分大小写</p><ul><li>NEW 用NEW.col_name，没有旧行。在DELETE触发程序中，仅能使用OLD.col_name，没有新行。</li><li>OLD 用OLD.col_name来引用更新前的某一行的列</li></ul><h2 id="添加索引" tabindex="-1"><a class="header-anchor" href="#添加索引"><span>添加索引</span></a></h2><h3 id="普通索引-index" tabindex="-1"><a class="header-anchor" href="#普通索引-index"><span>普通索引(INDEX)</span></a></h3><blockquote><p>语法：ALTER TABLE <code>表名字</code> ADD INDEX 索引名字 ( <code>字段名字</code> )</p></blockquote><pre><code class="language-sql">-- –直接创建索引
CREATE INDEX index_user ON user(title)
-- –修改表结构的方式添加索引
ALTER TABLE table_name ADD INDEX index_name ON (column(length))
-- 给 user 表中的 name 字段 添加普通索引(INDEX)
ALTER TABLE \`user\` ADD INDEX index_name (name)
-- –创建表的时候同时创建索引
CREATE TABLE \`user\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT ,
    \`title\` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    \`content\` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
    \`time\` int(10) NULL DEFAULT NULL ,
    PRIMARY KEY (\`id\`),
    INDEX index_name (title(length))
)
-- –删除索引
DROP INDEX index_name ON table
</code></pre><h3 id="主键索引-primary-key" tabindex="-1"><a class="header-anchor" href="#主键索引-primary-key"><span>主键索引(PRIMARY key)</span></a></h3><blockquote><p>语法：ALTER TABLE <code>表名字</code> ADD PRIMARY KEY ( <code>字段名字</code> )</p></blockquote><pre><code class="language-sql">-- 给 user 表中的 id字段 添加主键索引(PRIMARY key)
ALTER TABLE \`user\` ADD PRIMARY key (id);
</code></pre><h3 id="唯一索引-unique" tabindex="-1"><a class="header-anchor" href="#唯一索引-unique"><span>唯一索引(UNIQUE)</span></a></h3><blockquote><p>语法：ALTER TABLE <code>表名字</code> ADD UNIQUE (<code>字段名字</code>)</p></blockquote><pre><code class="language-sql">-- 给 user 表中的 creattime 字段添加唯一索引(UNIQUE)
ALTER TABLE \`user\` ADD UNIQUE (creattime);
</code></pre><h3 id="全文索引-fulltext" tabindex="-1"><a class="header-anchor" href="#全文索引-fulltext"><span>全文索引(FULLTEXT)</span></a></h3><blockquote><p>语法：ALTER TABLE <code>表名字</code> ADD FULLTEXT (<code>字段名字</code>)</p></blockquote><pre><code class="language-sql">-- 给 user 表中的 description 字段添加全文索引(FULLTEXT)
ALTER TABLE \`user\` ADD FULLTEXT (description);
</code></pre><h3 id="添加多列索引" tabindex="-1"><a class="header-anchor" href="#添加多列索引"><span>添加多列索引</span></a></h3><blockquote><p>语法： ALTER TABLE <code>table_name</code> ADD INDEX index_name ( <code>column1</code>, <code>column2</code>, <code>column3</code>)</p></blockquote><pre><code class="language-sql">-- 给 user 表中的 name、city、age 字段添加名字为name_city_age的普通索引(INDEX)
ALTER TABLE user ADD INDEX name_city_age (name(10),city,age); 
</code></pre><h3 id="建立索引的时机" tabindex="-1"><a class="header-anchor" href="#建立索引的时机"><span>建立索引的时机</span></a></h3><p>在<code>WHERE</code>和<code>JOIN</code>中出现的列需要建立索引，但也不完全如此：</p><ul><li>MySQL只对<code>&lt;</code>，<code>&lt;=</code>，<code>=</code>，<code>&gt;</code>，<code>&gt;=</code>，<code>BETWEEN</code>，<code>IN</code>使用索引</li><li>某些时候的<code>LIKE</code>也会使用索引。</li><li>在<code>LIKE</code>以通配符%和_开头作查询时，MySQL不会使用索引。</li></ul><pre><code class="language-sql">-- 此时就需要对city和age建立索引，
-- 由于mytable表的userame也出现在了JOIN子句中，也有对它建立索引的必要。
SELECT t.Name  
FROM mytable t LEFT JOIN mytable m ON t.Name=m.username 
WHERE m.age=20 AND m.city=&#39;上海&#39;;
SELECT * FROM mytable WHERE username like&#39;admin%&#39;; -- 而下句就不会使用：
SELECT * FROM mytable WHERE Name like&#39;%admin&#39;; -- 因此，在使用LIKE时应注意以上的区别。
</code></pre><p>索引的注意事项</p><ul><li>索引不会包含有NULL值的列</li><li>使用短索引</li><li>不要在列上进行运算 索引会失效</li></ul><h2 id="创建后表的修改" tabindex="-1"><a class="header-anchor" href="#创建后表的修改"><span>创建后表的修改</span></a></h2><h3 id="添加列" tabindex="-1"><a class="header-anchor" href="#添加列"><span>添加列</span></a></h3><blockquote><p>语法：<code>alter table 表名 add 列名 列数据类型 [after 插入位置];</code> 示例:</p></blockquote><pre><code class="language-sql">-- 在表students的最后追加列 address: 
alter table students add address char(60);
-- 在名为 age 的列后插入列 birthday: 
alter table students add birthday date after age;
-- 在名为 number_people 的列后插入列 weeks: 
alter table students add column \`weeks\` varchar(5) not null default &quot;&quot; after \`number_people\`;
</code></pre><h3 id="修改列" tabindex="-1"><a class="header-anchor" href="#修改列"><span>修改列</span></a></h3><blockquote><p>语法：<code>alter table 表名 change 列名称 列新名称 新数据类型;</code></p></blockquote><pre><code class="language-sql">-- 将表 tel 列改名为 telphone: 
alter table students change tel telphone char(13) default &quot;-&quot;;
-- 将 name 列的数据类型改为 char(16): 
alter table students change name name char(16) not null;
-- 修改 COMMENT 前面必须得有类型属性
alter table students change name name char(16) COMMENT &#39;这里是名字&#39;;
-- 修改列属性的时候 建议使用modify,不需要重建表
-- change用于修改列名字，这个需要重建表
alter table meeting modify \`weeks\` varchar(20) NOT NULL DEFAULT &#39;&#39; COMMENT &#39;开放日期 周一到周日：0~6，间隔用英文逗号隔开&#39;;
-- \`user\`表的\`id\`列，修改成字符串类型长度50，不能为空，\`FIRST\`放在第一列的位置
alter table \`user\` modify COLUMN \`id\` varchar(50) NOT NULL FIRST ;
</code></pre><h3 id="删除列" tabindex="-1"><a class="header-anchor" href="#删除列"><span>删除列</span></a></h3><blockquote><p>语法：<code>alter table 表名 drop 列名称;</code></p></blockquote><pre><code class="language-sql">-- 删除表students中的 birthday 列: 
alter table students drop birthday;
</code></pre><h3 id="重命名表" tabindex="-1"><a class="header-anchor" href="#重命名表"><span>重命名表</span></a></h3><blockquote><p>语法：<code>alter table 表名 rename 新表名;</code></p></blockquote><pre><code class="language-sql">-- 重命名 students 表为 workmates: 
alter table students rename workmates;
</code></pre><h3 id="清空表数据" tabindex="-1"><a class="header-anchor" href="#清空表数据"><span>清空表数据</span></a></h3><blockquote><p>方法一：<code>delete from 表名;</code> 方法二：<code>truncate table &quot;表名&quot;;</code></p></blockquote><ul><li><code>DELETE:</code>1. DML语言;2. 可以回退;3. 可以有条件的删除;</li><li><code>TRUNCATE:</code>1. DDL语言;2. 无法回退;3. 默认所有的表内容都删除;4. 删除速度比delete快。</li></ul><pre><code class="language-sql">-- 清空表为 workmates 里面的数据，不删除表。 
delete from workmates;
-- 删除workmates表中的所有数据，且无法恢复
truncate table workmates;
</code></pre><h3 id="删除整张表" tabindex="-1"><a class="header-anchor" href="#删除整张表"><span>删除整张表</span></a></h3><blockquote><p>语法：<code>drop table 表名;</code></p></blockquote><pre><code class="language-sql">-- 删除 workmates 表: 
drop table workmates;
</code></pre><h3 id="删除整个数据库" tabindex="-1"><a class="header-anchor" href="#删除整个数据库"><span>删除整个数据库</span></a></h3><blockquote><p>语法：<code>drop database 数据库名;</code></p></blockquote><pre><code class="language-sql">-- 删除 samp_db 数据库: 
drop database samp_db;
</code></pre><h2 id="其它实例" tabindex="-1"><a class="header-anchor" href="#其它实例"><span>其它实例</span></a></h2><h3 id="sql删除重复记录" tabindex="-1"><a class="header-anchor" href="#sql删除重复记录"><span>SQL删除重复记录</span></a></h3><p><a href="http://www.xiangguo.li/sql_and_nosql/2015/01/01/sql" target="_blank" rel="noopener noreferrer">转载</a></p><pre><code class="language-sql">-- 查找表中多余的重复记录，重复记录是根据单个字段（peopleId）来判断
select * from people where peopleId in (select peopleId from people group by peopleId having count(peopleId) &gt; 1)
-- 删除表中多余的重复记录，重复记录是根据单个字段（peopleId）来判断，只留有rowid最小的记录
delete from people 
where peopleId in (select peopleId from people group by peopleId having count(peopleId) &gt; 1)
and rowid not in (select min(rowid) from people group by peopleId having count(peopleId )&gt;1)
-- 查找表中多余的重复记录（多个字段）
select * from vitae a
where (a.peopleId,a.seq) in (select peopleId,seq from vitae group by peopleId,seq having count(*) &gt; 1)
-- 删除表中多余的重复记录（多个字段），只留有rowid最小的记录
delete from vitae a
where (a.peopleId,a.seq) in (select peopleId,seq from vitae group by peopleId,seq having count(*) &gt; 1) and rowid not in (select min(rowid) from vitae group by peopleId,seq having count(*)&gt;1)
-- 查找表中多余的重复记录（多个字段），不包含rowid最小的记录
select * from vitae a
where (a.peopleId,a.seq) in (select peopleId,seq from vitae group by peopleId,seq having count(*) &gt; 1) and rowid not in (select min(rowid) from vitae group by peopleId,seq having count(*)&gt;1)
</code></pre>`,133),s=[l];function o(d,c){return t(),n("div",null,s)}const p=e(r,[["render",o],["__file","operation.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/orm-tutor/mysql/operation.html","title":"mysql操作","lang":"zh-CN","frontmatter":{"description":"mysql操作 数据类型 提示 先创建几个例子 创建数据库 创建表 删除表 增删改查 insert delete update select where AND, OR 和 NOT OR OR 语法 NOT NOT 语法 AND & OR & NOT ORDER BY ORDER BY 语法 用于按升序或降序对结果集进行排序。 默认按 ASC 升序对记...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mysql/operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"mysql操作"}],["meta",{"property":"og:description","content":"mysql操作 数据类型 提示 先创建几个例子 创建数据库 创建表 删除表 增删改查 insert delete update select where AND, OR 和 NOT OR OR 语法 NOT NOT 语法 AND & OR & NOT ORDER BY ORDER BY 语法 用于按升序或降序对结果集进行排序。 默认按 ASC 升序对记..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-11-23T15:42:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-11-23T15:42:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mysql操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-11-23T15:42:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"创建数据库","slug":"创建数据库","link":"#创建数据库","children":[]},{"level":2,"title":"创建表","slug":"创建表","link":"#创建表","children":[]},{"level":2,"title":"删除表","slug":"删除表","link":"#删除表","children":[]},{"level":2,"title":"增删改查","slug":"增删改查","link":"#增删改查","children":[]},{"level":2,"title":"insert","slug":"insert","link":"#insert","children":[]},{"level":2,"title":"delete","slug":"delete","link":"#delete","children":[]},{"level":2,"title":"update","slug":"update","link":"#update","children":[]},{"level":2,"title":"select","slug":"select","link":"#select","children":[]},{"level":2,"title":"where","slug":"where","link":"#where","children":[{"level":3,"title":"AND, OR 和 NOT","slug":"and-or-和-not","link":"#and-or-和-not","children":[]},{"level":3,"title":"OR","slug":"or","link":"#or","children":[]},{"level":3,"title":"NOT","slug":"not","link":"#not","children":[]},{"level":3,"title":"AND & OR & NOT","slug":"and-or-not","link":"#and-or-not","children":[]}]},{"level":2,"title":"ORDER BY","slug":"order-by","link":"#order-by","children":[]},{"level":2,"title":"GROUP BY","slug":"group-by","link":"#group-by","children":[]},{"level":2,"title":"IN","slug":"in","link":"#in","children":[]},{"level":2,"title":"UNION","slug":"union","link":"#union","children":[]},{"level":2,"title":"BETWEEN","slug":"between","link":"#between","children":[]},{"level":2,"title":"AS","slug":"as","link":"#as","children":[]},{"level":2,"title":"JOIN","slug":"join","link":"#join","children":[{"level":3,"title":"INNER JOIN","slug":"inner-join","link":"#inner-join","children":[]},{"level":3,"title":"LEFT JOIN","slug":"left-join","link":"#left-join","children":[]},{"level":3,"title":"RIGHT JOIN","slug":"right-join","link":"#right-join","children":[]},{"level":3,"title":"FULL OUTER JOIN","slug":"full-outer-join","link":"#full-outer-join","children":[]}]},{"level":2,"title":"SQL 函数","slug":"sql-函数","link":"#sql-函数","children":[{"level":3,"title":"COUNT","slug":"count","link":"#count","children":[]},{"level":3,"title":"AVG","slug":"avg","link":"#avg","children":[]},{"level":3,"title":"SUM","slug":"sum","link":"#sum","children":[]},{"level":3,"title":"MAX","slug":"max","link":"#max","children":[]},{"level":3,"title":"MIN","slug":"min","link":"#min","children":[]}]},{"level":2,"title":"触发器","slug":"触发器","link":"#触发器","children":[]},{"level":2,"title":"添加索引","slug":"添加索引","link":"#添加索引","children":[{"level":3,"title":"普通索引(INDEX)","slug":"普通索引-index","link":"#普通索引-index","children":[]},{"level":3,"title":"主键索引(PRIMARY key)","slug":"主键索引-primary-key","link":"#主键索引-primary-key","children":[]},{"level":3,"title":"唯一索引(UNIQUE)","slug":"唯一索引-unique","link":"#唯一索引-unique","children":[]},{"level":3,"title":"全文索引(FULLTEXT)","slug":"全文索引-fulltext","link":"#全文索引-fulltext","children":[]},{"level":3,"title":"添加多列索引","slug":"添加多列索引","link":"#添加多列索引","children":[]},{"level":3,"title":"建立索引的时机","slug":"建立索引的时机","link":"#建立索引的时机","children":[]}]},{"level":2,"title":"创建后表的修改","slug":"创建后表的修改","link":"#创建后表的修改","children":[{"level":3,"title":"添加列","slug":"添加列","link":"#添加列","children":[]},{"level":3,"title":"修改列","slug":"修改列","link":"#修改列","children":[]},{"level":3,"title":"删除列","slug":"删除列","link":"#删除列","children":[]},{"level":3,"title":"重命名表","slug":"重命名表","link":"#重命名表","children":[]},{"level":3,"title":"清空表数据","slug":"清空表数据","link":"#清空表数据","children":[]},{"level":3,"title":"删除整张表","slug":"删除整张表","link":"#删除整张表","children":[]},{"level":3,"title":"删除整个数据库","slug":"删除整个数据库","link":"#删除整个数据库","children":[]}]},{"level":2,"title":"其它实例","slug":"其它实例","link":"#其它实例","children":[{"level":3,"title":"SQL删除重复记录","slug":"sql删除重复记录","link":"#sql删除重复记录","children":[]}]}],"git":{"createdTime":1669218165000,"updatedTime":1669218165000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":15.5,"words":4650},"filePathRelative":"java-tutor/orm-tutor/mysql/operation.md","localizedDate":"2022年11月23日","autoDesc":true}');export{p as comp,u as data};
