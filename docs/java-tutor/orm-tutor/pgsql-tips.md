# postgres技巧

## 修改自增的id

### postgresql主键自增

### 一、创建表时设置主键自增

 1、mysql主键自增使用AUTO_INCREMENT关键字，postgresql自增使用SERIAL关键字

  2、postgresql创建表

语句如下：

```sql
CREATE TABLE tb_ins
(
id serial PRIMARY KEY,
name VARCHAR,
age VARCHAR
)

```

  3、postgresql向表中插入数据
注意values里必须是单引号

在pg中的sql，单引号用来标识实际的值，双引号用来标识表名（table name）或列名（column name）等数据库中存在的值。

```sql
INSERT INTO tb_ins(name,age) VALUES( '小明',  '小红');
INSERT INTO tb_ins(name,age) VALUES( '小1',  '小红');
INSERT INTO tb_ins(name,age) VALUES( '小2',  '小红');
INSERT INTO tb_ins(name,age) VALUES( '小3',  '小红');

```

  4、postgresql查询表中数据
  级的查询前要先改编码`chcp 936`不然会乱码

```sql
select * from tb_ins;

test=# select * from tb_ins;
 id | name | age
----+------+------
  1 | 小明 | 小红
  2 | 小1  | 小红
  3 | 小2  | 小红
  4 | 小3  | 小红
(4 rows)

test=# 
```

以上查询验证自增关键字SERIAL是可用的

### 二、修改menu表id字段为主键自增

:::tip

```
SELECT * FROM pg_class c WHERE c.relkind = 'S';
```

通过上面的sql文可以查到postgresql内所有的sequence序列名。
:::
1、在PostgreSQL当中，我们实现ID自增首先创建一个关联序列，以下sql语句是创建一个序列：

```sql
CREATE SEQUENCE menu_id_seq START 1;
```

序列名称是menu_id_seq，起始数为1。

2、然后在字段默认值里设 `nextval('menu_id_seq'::regclass)`即可。

![res](https://img2020.cnblogs.com/blog/2203909/202102/2203909-20210203110131791-2075873613.png)

或者

```sql
CREATE SEQUENCE menu_id_seq START 你当前id的最大;
ALTER TABLE public.menu ALTER COLUMN id SET DEFAULT nextval('menu_id_seq'::regclass);
```

### 三、修改id的自增起始数

把当前最大的id做为当前的id自增起始数

```sql
select setval('gx_history_id_seq',(select max(id) from gx_history))
```
