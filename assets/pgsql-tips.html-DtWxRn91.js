import{_ as e,c as t,o as n,d as s}from"./app-CbULZrmi.js";const o={},a=s(`<h1 id="postgres技巧" tabindex="-1"><a class="header-anchor" href="#postgres技巧"><span>postgres技巧</span></a></h1><h2 id="字符集" tabindex="-1"><a class="header-anchor" href="#字符集"><span>字符集</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>字符是各种文字和符号的统称，包括各个国家文字、标点符号、表情、数字等等。 字符集 就是一系列字符的集合。字符集的种类较多，每个字符集可以表示的字符范围通常不同，就比如说有些字符集是无法表示汉字的</p></div><p>对于mysql来说,有两种常见编码实现: <code>utf8</code>和<code>utf8mb4</code>,用<code>utf8</code>的话,存储emoji 符号和一些比较复杂的汉字、繁体字就会出错,<code>utf8mb4</code>则不会</p><h2 id="spring使用postgres" tabindex="-1"><a class="header-anchor" href="#spring使用postgres"><span>spring使用postgres</span></a></h2><p>在安装好了PostgreSQL之后，下面我们尝试一下在Spring Boot中使用PostgreSQL数据库。</p><p>第一步：创建一个基础的Spring Boot项目（如果您还不会，可以参考这篇文章：快速入门）</p><p>第二步：在pom.xml中引入访问PostgreSQL需要的两个重要依赖：</p><pre><code class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
    &lt;groupId&gt;org.postgresql&lt;/groupId&gt;
    &lt;artifactId&gt;postgresql&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;
</code></pre><p>这里postgresql是必须的，spring-boot-starter-data-jpa的还可以替换成其他的数据访问封装框架，比如：MyBatis等，具体根据你使用习惯来替换依赖即可。因为已经是更上层的封装，所以基本使用与之前用MySQL是类似的，所以你也可以参考之前MySQL的文章进行配置，但数据源部分需要根据下面的部分配置。</p><p>第三步：在配置文件中为PostgreSQL数据库配置数据源、以及JPA的必要配置。</p><pre><code>spring.datasource.url=jdbc:postgresql://localhost:5432/test
spring.datasource.username=postgres
spring.datasource.password=123456
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.hbm2ddl.auto=create
</code></pre><p>第四步：创建用户信息实体，映射user_info表（最后完成可在pgAdmin中查看）</p><pre><code class="language-java">@Entity
@Data
@NoArgsConstructor
public class UserInfo {

/**
 * 设置自增id
 */
      @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = &quot;student_id_seq&quot;)
    @SequenceGenerator(name = &quot;student_id_seq&quot;, sequenceName = &quot;student_id_seq&quot;)
    @Column(name = &quot;id&quot;)
    private Long id;

    private String name;
    private Integer age;

    public UserInfo(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}
</code></pre><p>第五步：创建用户信息实体的增删改查</p><pre><code class="language-java">public interface UserInfoRepository extends JpaRepository&lt;UserInfo, Long&gt; {

    UserInfo findByName(String name);

    UserInfo findByNameAndAge(String name, Integer age);

    @Query(&quot;from UserInfo u where u.name=:name&quot;)
    UserInfo findUser(@Param(&quot;name&quot;) String name);

}
</code></pre><p>第六步：创建单元测试，尝试一下增删改查操作。</p><pre><code class="language-java">@Slf4j
@SpringBootTest
public class ApplicationTests {

    @Autowired
    private UserInfoRepository userRepository;

    @Test
    public void test() throws Exception {
        // 创建10条记录
        userRepository.save(new UserInfo(&quot;AAA&quot;, 10));
        userRepository.save(new UserInfo(&quot;BBB&quot;, 20));
        userRepository.save(new UserInfo(&quot;CCC&quot;, 30));
        userRepository.save(new UserInfo(&quot;DDD&quot;, 40));
        userRepository.save(new UserInfo(&quot;EEE&quot;, 50));
        userRepository.save(new UserInfo(&quot;FFF&quot;, 60));
        userRepository.save(new UserInfo(&quot;GGG&quot;, 70));
        userRepository.save(new UserInfo(&quot;HHH&quot;, 80));
        userRepository.save(new UserInfo(&quot;III&quot;, 90));
        userRepository.save(new UserInfo(&quot;JJJ&quot;, 100));

        // 测试findAll, 查询所有记录
        Assertions.assertEquals(10, userRepository.findAll().size());

        // 测试findByName, 查询姓名为FFF的User
        Assertions.assertEquals(60, userRepository.findByName(&quot;FFF&quot;).getAge().longValue());

        // 测试findUser, 查询姓名为FFF的User
        Assertions.assertEquals(60, userRepository.findUser(&quot;FFF&quot;).getAge().longValue());

        // 测试findByNameAndAge, 查询姓名为FFF并且年龄为60的User
        Assertions.assertEquals(&quot;FFF&quot;, userRepository.findByNameAndAge(&quot;FFF&quot;, 60).getName());

        // 测试删除姓名为AAA的User
        userRepository.delete(userRepository.findByName(&quot;AAA&quot;));

        // 测试findAll, 查询所有记录, 验证上面的删除是否成功
        Assertions.assertEquals(9, userRepository.findAll().size());

    }

}
</code></pre><p>把单元测试跑起来：</p><h2 id="修改自增的id" tabindex="-1"><a class="header-anchor" href="#修改自增的id"><span>修改自增的id</span></a></h2><h3 id="postgresql主键自增" tabindex="-1"><a class="header-anchor" href="#postgresql主键自增"><span>postgresql主键自增</span></a></h3><h3 id="一、创建表时设置主键自增" tabindex="-1"><a class="header-anchor" href="#一、创建表时设置主键自增"><span>一、创建表时设置主键自增</span></a></h3><p>1、mysql主键自增使用AUTO_INCREMENT关键字，postgresql自增使用SERIAL关键字</p><p>2、postgresql创建表</p><p>语句如下：</p><pre><code class="language-sql">CREATE TABLE tb_ins
(
id serial PRIMARY KEY,
name VARCHAR,
age VARCHAR
)

</code></pre><p>3、postgresql向表中插入数据 注意values里必须是单引号</p><p>在pg中的sql，单引号用来标识实际的值，双引号用来标识表名（table name）或列名（column name）等数据库中存在的值。</p><pre><code class="language-sql">INSERT INTO tb_ins(name,age) VALUES( &#39;小明&#39;,  &#39;小红&#39;);
INSERT INTO tb_ins(name,age) VALUES( &#39;小1&#39;,  &#39;小红&#39;);
INSERT INTO tb_ins(name,age) VALUES( &#39;小2&#39;,  &#39;小红&#39;);
INSERT INTO tb_ins(name,age) VALUES( &#39;小3&#39;,  &#39;小红&#39;);

</code></pre><p>4、postgresql查询表中数据 级的查询前要先改编码<code>chcp 936</code>不然会乱码</p><pre><code class="language-sql">select * from tb_ins;

test=# select * from tb_ins;
 id | name | age
----+------+------
  1 | 小明 | 小红
  2 | 小1  | 小红
  3 | 小2  | 小红
  4 | 小3  | 小红
(4 rows)

test=# 
</code></pre><p>以上查询验证自增关键字SERIAL是可用的</p><h3 id="二、修改menu表id字段为主键自增" tabindex="-1"><a class="header-anchor" href="#二、修改menu表id字段为主键自增"><span>二、修改menu表id字段为主键自增</span></a></h3><div class="hint-container tip"><p class="hint-container-title">提示</p><pre><code>SELECT * FROM pg_class c WHERE c.relkind = &#39;S&#39;;
</code></pre><p>通过上面的sql文可以查到postgresql内所有的sequence序列名。</p></div><p>1、在PostgreSQL当中，我们实现ID自增首先创建一个关联序列，以下sql语句是创建一个序列：</p><pre><code class="language-sql">CREATE SEQUENCE menu_id_seq START 1;
</code></pre><p>序列名称是menu_id_seq，起始数为1。</p><p>2、然后在字段默认值里设 <code>nextval(&#39;menu_id_seq&#39;::regclass)</code>即可。</p><p><img src="https://img2020.cnblogs.com/blog/2203909/202102/2203909-20210203110131791-2075873613.png" alt="res"></p><p>或者</p><pre><code class="language-sql">CREATE SEQUENCE menu_id_seq START 你当前id的最大;
ALTER TABLE public.menu ALTER COLUMN id SET DEFAULT nextval(&#39;menu_id_seq&#39;::regclass);
</code></pre><h3 id="三、修改id的自增起始数" tabindex="-1"><a class="header-anchor" href="#三、修改id的自增起始数"><span>三、修改id的自增起始数</span></a></h3><p>把当前最大的id做为当前的id自增起始数</p><pre><code class="language-sql">select setval(&#39;gx_history_id_seq&#39;,(select max(id) from gx_history))
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>也可以使用下面的语句生成自增的id</p><pre><code class="language-sql">create table test (id int  GENERATED BY DEFAULT AS IDENTITY (cache 100), info text);  
CREATE TABLE  
</code></pre><p>在navicat中要把虚拟类型改为<code>GENERATED BY DEFAULT AS IDENTITY</code></p></div><h2 id="关于时区" tabindex="-1"><a class="header-anchor" href="#关于时区"><span>关于时区</span></a></h2><h3 id="使用时区" tabindex="-1"><a class="header-anchor" href="#使用时区"><span>使用时区</span></a></h3><p>postgresql的timestamp等于mysql的datetime postgres的timestamptz等于mysql的timestamp</p><pre><code class="language-java">
private Instant createTime
</code></pre><p>数组库设置create_time为<code>timestamptz</code></p><h3 id="不使用时区" tabindex="-1"><a class="header-anchor" href="#不使用时区"><span>不使用时区</span></a></h3><pre><code class="language-java">
private LocalDatetime createTime
</code></pre><p>数组库设置create_time为<code>timestamp</code></p>`,53),r=[a];function i(p,l){return n(),t("div",null,r)}const c=e(o,[["render",i],["__file","pgsql-tips.html.vue"]]),g=JSON.parse('{"path":"/java-tutor/orm-tutor/pgsql/pgsql-tips.html","title":"postgres技巧","lang":"zh-CN","frontmatter":{"description":"postgres技巧 字符集 提示 字符是各种文字和符号的统称，包括各个国家文字、标点符号、表情、数字等等。 字符集 就是一系列字符的集合。字符集的种类较多，每个字符集可以表示的字符范围通常不同，就比如说有些字符集是无法表示汉字的 对于mysql来说,有两种常见编码实现: utf8和utf8mb4,用utf8的话,存储emoji 符号和一些比较复杂的汉...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/pgsql/pgsql-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"postgres技巧"}],["meta",{"property":"og:description","content":"postgres技巧 字符集 提示 字符是各种文字和符号的统称，包括各个国家文字、标点符号、表情、数字等等。 字符集 就是一系列字符的集合。字符集的种类较多，每个字符集可以表示的字符范围通常不同，就比如说有些字符集是无法表示汉字的 对于mysql来说,有两种常见编码实现: utf8和utf8mb4,用utf8的话,存储emoji 符号和一些比较复杂的汉..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img2020.cnblogs.com/blog/2203909/202102/2203909-20210203110131791-2075873613.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T08:24:01.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T08:24:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"postgres技巧\\",\\"image\\":[\\"https://img2020.cnblogs.com/blog/2203909/202102/2203909-20210203110131791-2075873613.png\\"],\\"dateModified\\":\\"2024-03-24T08:24:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"字符集","slug":"字符集","link":"#字符集","children":[]},{"level":2,"title":"spring使用postgres","slug":"spring使用postgres","link":"#spring使用postgres","children":[]},{"level":2,"title":"修改自增的id","slug":"修改自增的id","link":"#修改自增的id","children":[{"level":3,"title":"postgresql主键自增","slug":"postgresql主键自增","link":"#postgresql主键自增","children":[]},{"level":3,"title":"一、创建表时设置主键自增","slug":"一、创建表时设置主键自增","link":"#一、创建表时设置主键自增","children":[]},{"level":3,"title":"二、修改menu表id字段为主键自增","slug":"二、修改menu表id字段为主键自增","link":"#二、修改menu表id字段为主键自增","children":[]},{"level":3,"title":"三、修改id的自增起始数","slug":"三、修改id的自增起始数","link":"#三、修改id的自增起始数","children":[]}]},{"level":2,"title":"关于时区","slug":"关于时区","link":"#关于时区","children":[{"level":3,"title":"使用时区","slug":"使用时区","link":"#使用时区","children":[]},{"level":3,"title":"不使用时区","slug":"不使用时区","link":"#不使用时区","children":[]}]}],"git":{"createdTime":1652540980000,"updatedTime":1711268641000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":4.17,"words":1252},"filePathRelative":"java-tutor/orm-tutor/pgsql/pgsql-tips.md","localizedDate":"2022年5月14日","autoDesc":true}');export{c as comp,g as data};
