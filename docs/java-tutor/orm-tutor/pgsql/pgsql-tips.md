# postgres技巧

## 字符集

:::tip
字符是各种文字和符号的统称，包括各个国家文字、标点符号、表情、数字等等。 字符集 就是一系列字符的集合。字符集的种类较多，每个字符集可以表示的字符范围通常不同，就比如说有些字符集是无法表示汉字的
:::

对于mysql来说,有两种常见编码实现: `utf8`和`utf8mb4`,用`utf8`的话,存储emoji 符号和一些比较复杂的汉字、繁体字就会出错,`utf8mb4`则不会

## spring使用postgres

在安装好了PostgreSQL之后，下面我们尝试一下在Spring Boot中使用PostgreSQL数据库。

第一步：创建一个基础的Spring Boot项目（如果您还不会，可以参考这篇文章：快速入门）

第二步：在pom.xml中引入访问PostgreSQL需要的两个重要依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

这里postgresql是必须的，spring-boot-starter-data-jpa的还可以替换成其他的数据访问封装框架，比如：MyBatis等，具体根据你使用习惯来替换依赖即可。因为已经是更上层的封装，所以基本使用与之前用MySQL是类似的，所以你也可以参考之前MySQL的文章进行配置，但数据源部分需要根据下面的部分配置。

第三步：在配置文件中为PostgreSQL数据库配置数据源、以及JPA的必要配置。

```
spring.datasource.url=jdbc:postgresql://localhost:5432/test
spring.datasource.username=postgres
spring.datasource.password=123456
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.hbm2ddl.auto=create
```

第四步：创建用户信息实体，映射user_info表（最后完成可在pgAdmin中查看）

```java
@Entity
@Data
@NoArgsConstructor
public class UserInfo {

/**
 * 设置自增id
 */
      @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_id_seq")
    @SequenceGenerator(name = "student_id_seq", sequenceName = "student_id_seq")
    @Column(name = "id")
    private Long id;

    private String name;
    private Integer age;

    public UserInfo(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}
```

第五步：创建用户信息实体的增删改查

```java
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

    UserInfo findByName(String name);

    UserInfo findByNameAndAge(String name, Integer age);

    @Query("from UserInfo u where u.name=:name")
    UserInfo findUser(@Param("name") String name);

}
```

第六步：创建单元测试，尝试一下增删改查操作。

```java
@Slf4j
@SpringBootTest
public class ApplicationTests {

    @Autowired
    private UserInfoRepository userRepository;

    @Test
    public void test() throws Exception {
        // 创建10条记录
        userRepository.save(new UserInfo("AAA", 10));
        userRepository.save(new UserInfo("BBB", 20));
        userRepository.save(new UserInfo("CCC", 30));
        userRepository.save(new UserInfo("DDD", 40));
        userRepository.save(new UserInfo("EEE", 50));
        userRepository.save(new UserInfo("FFF", 60));
        userRepository.save(new UserInfo("GGG", 70));
        userRepository.save(new UserInfo("HHH", 80));
        userRepository.save(new UserInfo("III", 90));
        userRepository.save(new UserInfo("JJJ", 100));

        // 测试findAll, 查询所有记录
        Assertions.assertEquals(10, userRepository.findAll().size());

        // 测试findByName, 查询姓名为FFF的User
        Assertions.assertEquals(60, userRepository.findByName("FFF").getAge().longValue());

        // 测试findUser, 查询姓名为FFF的User
        Assertions.assertEquals(60, userRepository.findUser("FFF").getAge().longValue());

        // 测试findByNameAndAge, 查询姓名为FFF并且年龄为60的User
        Assertions.assertEquals("FFF", userRepository.findByNameAndAge("FFF", 60).getName());

        // 测试删除姓名为AAA的User
        userRepository.delete(userRepository.findByName("AAA"));

        // 测试findAll, 查询所有记录, 验证上面的删除是否成功
        Assertions.assertEquals(9, userRepository.findAll().size());

    }

}
```

把单元测试跑起来：

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

:::tip
也可以使用下面的语句生成自增的id

```sql
create table test (id int  GENERATED BY DEFAULT AS IDENTITY (cache 100), info text);  
CREATE TABLE  
```

在navicat中要把虚拟类型改为`GENERATED BY DEFAULT AS IDENTITY`
:::

## 关于时区

### 使用时区

postgresql的timestamp等于mysql的datetime
postgres的timestamptz等于mysql的timestamp

```java

private Instant createTime
```

数组库设置create_time为`timestamptz`

### 不使用时区

```java

private LocalDatetime createTime
```

数组库设置create_time为`timestamp`
