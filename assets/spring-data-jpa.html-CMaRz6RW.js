import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const r={},i=n(`<h1 id="jpa教程" tabindex="-1"><a class="header-anchor" href="#jpa教程"><span>jpa教程</span></a></h1><p><a href="https://segmentfault.com/a/1190000037755804" target="_blank" rel="noopener noreferrer">https://segmentfault.com/a/1190000037755804</a> 首先了解Spring Date JPA是什么?</p><p>SpringData：其实SpringData就是Spring提供了一个操作数据的框架。而SpringData JPA只是SpringData框架下的一个基于JPA标准操作数据的模块。 SpringData JPA：基于JPA的标准数据进行操作。简化操作持久层的代码。只需要编写接口就可以。</p><p>JPA是Spring Data下的子项目,JPA是Java Persistence API的简称，中文名为Java持久层API，是JDK 5.0注解或XML描述对象－关系表的映射关系，并将运行期的实体对象持久化到数据库中</p><p>你可以理解为JPA和Mybatis是起相同作用的,都是持久层的框架,但是由于现在Mybatis的广泛应用,现在了解和使用JPA的人较少.</p><p>但在我使用的过程中,也发现其一些优势.</p><h2 id="整合" tabindex="-1"><a class="header-anchor" href="#整合"><span>整合</span></a></h2><h3 id="_1-导入jar包" tabindex="-1"><a class="header-anchor" href="#_1-导入jar包"><span>1. 导入jar包</span></a></h3><pre><code class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><h3 id="_2-yml配置文件" tabindex="-1"><a class="header-anchor" href="#_2-yml配置文件"><span>2. yml配置文件</span></a></h3><pre><code class="language-dts">spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mytest
    type: com.alibaba.druid.pool.DruidDataSource
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver //驱动
  jpa:
    hibernate:
      ddl-auto: update //自动更新
    show-sql: true  //日志中显示sql语句
</code></pre><p>这里注意: <code>jpa:hibernate:ddl-auto: update</code>是hibernate的配置属性，其主要作用是：自动创建、更新、验证数据库表结构。该参数的几种配置如下：</p><ol><li>create：每次加载hibernate时都会删除上一次的生成的表，然后根据你的model类再重新来生成新表，哪怕两次没有任何改变也要这样执行，这就是导致数据库表数据丢失的一个重要原因。</li><li>create-drop：每次加载hibernate时根据model类生成表，但是sessionFactory一关闭,表就自动删除。</li><li>update：最常用的属性，第一次加载hibernate时根据model类会自动建立起表的结构（前提是先建立好数据库），以后加载hibernate时根据model类自动更新表结构，即使表结构改变了但表中的行仍然存在不会删除以前的行。要注意的是当部署到服务器后，表结构是不会被马上建立起来的，是要等应用第一次运行起来后才会。</li><li>validate：每次加载hibernate时，验证创建数据库表结构，只会和数据库中的表进行比较，不会创建新表，但是会插入新值。</li></ol><p><strong>我在初次创建时会设为create,创建好后改为validate.</strong></p><h3 id="_3-实体类" tabindex="-1"><a class="header-anchor" href="#_3-实体类"><span>3.实体类</span></a></h3><p>既然上边的参数可以帮助我们自动的去通过实体类来创建维护表,那么实体类该怎么写呢,又是怎么建立与表的映射</p><p>简单的创建一个实体类:get/set方法由注解实现</p><pre><code class="language-java">@Entity
@Getter
@Setter
@Table(name = &quot;person&quot;)
public class Person {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = &quot;name&quot;, length = 20)
    private String name;

    @Column(name = &quot;agee&quot;, length = 4)
    private int age;
}
</code></pre><p>创建好实体类并标注好注解后启动主启动类,应该就会在你配置的数据库中自动生成表.</p><h3 id="_4-repository接口" tabindex="-1"><a class="header-anchor" href="#_4-repository接口"><span>4. Repository接口</span></a></h3><p>personRepository接口如下,</p><p>若只是简单的对单表进行crud只需要继承JpaRepository接口,传递了两个参数:1.实体类,2.实体类中主键类型</p><pre><code class="language-java">public interface PersonRepository extends JpaRepository&lt;Person, Long&gt; {
}
</code></pre><p>但是当然,我们在工作使用中,不可能只是简单的根据字段查一下就可以了,当你需要传入整个实体类,在根据其中的所有属性进行动态复杂查询,那仅仅继承这个接口就不能满足我们的需求了,</p><p>就需要我们再去继承<code>JpaSpecificationExecutor&lt;T&gt;</code>该接口,泛型内传入实体类,只要简单实现<code>toPredicate</code>方法就可以实现复杂的查询,</p><p>该接口中提供了几个方法:</p><pre><code class="language-java">public interface JpaSpecificationExecutor&lt;T&gt; {

    T findOne(Specification&lt;T&gt; spec);

    List&lt;T&gt; findAll(Specification&lt;T&gt; spec);

    Page&lt;T&gt; findAll(Specification&lt;T&gt; spec, Pageable pageable);

    List&lt;T&gt; findAll(Specification&lt;T&gt; spec, Sort sort);

    long count(Specification&lt;T&gt; spec);
}
</code></pre><p>方法中的<code>Specification</code>就是需要我们传进去的参数，它是一个接口,也是我们实现复杂查询的关键,其中只有一个方法<code>toPredicate</code></p><pre><code class="language-java">public interface Specification&lt;T&gt; {

    Predicate toPredicate(Root&lt;T&gt; root, CriteriaQuery&lt;?&gt; query, CriteriaBuilder cb);
}
</code></pre><p>其api编写可以参考: <a href="https://link.segmentfault.com/?enc=r05qZD5acNoUqNAnZib%2BPg%3D%3D.ICYoPanpFx1h4UshPIY005EW13XDmJd5ohahsQPAwikS%2BhefJYoYj2LIy26NBeUgEqCkcz0sqz61Lj4g8VxcQQ%3D%3D" target="_blank" rel="noopener noreferrer">http://blog.csdn.net/dracotianlong/article/details/28445725</a><a href="https://link.segmentfault.com/?enc=ehFpQucHYmD6HRnd3qpTdg%3D%3D.UgVVFVz%2FtdjdHP3wgL6FAdzal3C1FE%2BoQwDJ7oln%2FJerjmADbCyrWvHJ3YBteaGdO7CiB08xJZwccapqiam%2BJg%3D%3D" target="_blank" rel="noopener noreferrer">http://developer.51cto.com/art/200911/162722.htm</a></p><h3 id="_5-controller" tabindex="-1"><a class="header-anchor" href="#_5-controller"><span>5. Controller</span></a></h3><p>然后我们可以直接在controller中编写代码即可(如果业务复杂,当然假如service层也是最好).</p><p>简单crud:</p><pre><code class="language-java">@RestController
@RequestMapping(value = &quot;person&quot;)
public class PerconController {

    @Autowired
    private PersonRepository personRepository;

    @PostMapping(path = &quot;addPerson&quot;)
    public void addPerson(Person person) {
        personRepository.save(person);
    }

    @DeleteMapping(path = &quot;deletePerson&quot;)
    public void deletePerson(Long id) {
        personRepository.delete(id);
    }
}
</code></pre><p>简单的crud甚至不需要在Repository中写代码,JpaRepository中已有封装好的直接使用即可.</p><p>那么我们怎么自己去编写一些简单的代码呢?</p><p>我们以根据name查询person为例: 在repository接口中添加如下查询方法：</p><ol><li><p>注意方法名一定是findBy+属性名</p><pre><code class="language-java">Person findByName(String name);
</code></pre><p>还需要注意根据ID查找的findById是不用自己添加方法的,由接口已经封装,但是源码中返回的是Optional 类型。那么这个时候该如何获得T 实体类类型呢,只需要get()即可,就是<code>findById(Id).get()</code> 即返回T类型</p></li><li><p>除了添加findBy这种不用写sql的方法外,还有一种可以自己编写sql的方法:</p><p>可以在所添加的方法上通过@Query注解,在value属性上写sql语句来完成对数据库的操作,</p><p>带参查询:（1、根据参数位置2、根据Param注解）</p><pre><code class="language-java">   /**
     * 查询根据参数位置
     * @param name
     * @return
     */
    @Query(value = &quot;select * from person  where name = ?1&quot;,nativeQuery = true)
    Person findPersonByName(String Name);
 
    /**
     * 查询根据Param注解
     * @param name
     * @return
     */
    @Query(value = &quot;select p from person p where p.uname = :name&quot;)
    Person findPersonByNameTwo(@Param(&quot;name&quot;) String name);
</code></pre><p>相信大家也注意到,在@Query中传入了一个属性nativeQuery,</p><ul><li>@Query有nativeQuery=true，表示可执行的原生sql，原生sql指可以直接复制sql语句给参数赋值就能运行</li><li>@Query无nativeQuery=true， 表示不是原生sql，查询语句中的表名则是对应的项目中实体类的类名</li></ul></li></ol><p><strong>注意:</strong></p><p>对于自定义sql的删改方法,在方法上还要添加<code>@Transactional/@Modifying</code>注解,如下所示:</p><pre><code class="language-java">@Transactional
@Modifying
@Query(value = &quot;delete from Account where id =?1&quot;,nativeQuery = true)
void delAccount(int id);
</code></pre><p><strong>这里去了解了一下其生成sql的原理:</strong></p><p>其实JPA在这里遵循Convention over configuration（约定大约配置）的原则，遵循spring 以及JPQL定义的方法命名。Spring提供了一套可以通过命名规则进行查询构建的机制。这套机制会把方法名首先过滤一些关键字，比如 find…By, read…By, query…By, count…By 和 get…By 。系统会根据关键字将命名解析成2个子语句，第一个 By 是区分这两个子语句的关键词。这个 By 之前的子语句是查询子语句（指明返回要查询的对象），后面的部分是条件子语句。如果直接就是 findBy… 返回的就是定义Respository时指定的领域对象集合，同时JPQL中也定义了丰富的关键字：and、or、Between等等，下面我们来看一下JPQL中有哪些关键字：</p><blockquote><p><strong>Keyword Sample JPQL snippet</strong></p><ol><li>And----findByLastnameAndFirstname----where x.lastname = ?1 and</li><li>Or----findByLastnameOrFirstname----where x.lastname = ?1 or x.firstname = ?2</li><li>Is,Equals----findByFirstnameIs,findByFirstnameEquals----where x.firstname = ?1</li><li>Between----findByStartDateBetween----where x.startDate between ?1 and ?2</li><li>javaThan----findByAgejavaThan----where x.age &lt; ?1</li><li>javaThanEqual----findByAgejavaThanEqual----where x.age ⇐ ?1</li><li>GreaterThan----findByAgeGreaterThan----where x.age &gt; ?1</li><li>GreaterThanEqual----findByAgeGreaterThanEqual----where x.age &gt;= ?1</li><li>After----findByStartDateAfter----where x.startDate &gt; ?1</li><li>Before----findByStartDateBefore----where x.startDate &lt; ?1</li><li>IsNull----findByAgeIsNull----where x.age is null</li><li>IsNotNull,NotNull----findByAge(Is)NotNull----where x.age not null</li><li>Like----findByFirstnameLike----where x.firstname like ?1</li><li>NotLike----findByFirstnameNotLike----where x.firstname not like ?1</li><li>StartingWith----findByFirstnameStartingWith----where x.firstname like ?1 (parameter bound with appended %)</li><li>EndingWith----findByFirstnameEndingWith----where x.firstname like ?1 (parameter bound with prepended %)</li><li>Containing----findByFirstnameContaining----where x.firstname like ?1 (parameter bound wrapped in %)</li><li>OrderBy----findByAgeOrderByLastnameDesc----where x.age = ?1 order by x.lastname desc</li><li>Not----findByLastnameNot----where x.lastname &lt;&gt; ?1</li><li>In----findByAgeIn(Collection ages)----where x.age in ?1</li><li>NotIn----findByAgeNotIn(Collection age)----where x.age not in ?1</li><li>TRUE----findByActiveTrue()----where x.active = true</li><li>FALSE----findByActiveFalse()----where x.active = false</li><li>IgnoreCase----findByFirstnameIgnoreCase----where UPPER(x.firstame) = UPPER(?1)</li></ol></blockquote><p>复杂crud:</p><p>复杂crud的查询是依靠<code>JpaSpecificationExecutor&lt;T&gt;</code>接口,以及specification的<code>toPredicate</code>方法来添加条件,上文中也基本介绍过,所以在这里就简单贴一下代码,大家根据例子,应该就可以自己写了:</p><pre><code class="language-java">    public List&lt;Flow&gt; queryFlows(int pageNo, int pageSize, String status, String userName, Date createTimeStart, Date createTimeEnd) {
        List&lt;Flow&gt; result = null;

        // 构造自定义查询条件
        Specification&lt;Flow&gt; queryCondition = new Specification&lt;Flow&gt;() {
            @Override
            public Predicate toPredicate(Root&lt;Flow&gt; root, CriteriaQuery&lt;?&gt; criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List&lt;Predicate&gt; predicateList = new ArrayList&lt;&gt;();
                if (userName != null) {
                    predicateList.add(criteriaBuilder.equal(root.get(&quot;currentOperator&quot;), userName));
                }
                if (status != null) {
                    predicateList.add(criteriaBuilder.equal(root.get(&quot;status&quot;), status));
                }
                if (createTimeStart != null &amp;&amp; createTimeEnd != null) {
                    predicateList.add(criteriaBuilder.between(root.get(&quot;createTime&quot;), createTimeStart, createTimeEnd));
                }
                if (orderId!= null) {
                    predicateList.add(criteriaBuilder.like(root.get(&quot;orderId&quot;), &quot;%&quot; + orderId+ &quot;%&quot;));}
                return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };

        // 分页和不分页，这里按起始页和每页展示条数为0时默认为不分页，分页的话按创建时间降序
       
        if (pageNo == 0 &amp;&amp; pageSize == 0) {
            result = flowRepository.findAll(queryCondition);
        } else {
            result = flowRepository.findAll(queryCondition, PageRequest.of(pageNo - 1, pageSize, Sort.by(Sort.Direction.DESC, &quot;createTime&quot;))).getContent();
        }
       
        return result;
    }
</code></pre><p>理解了之后其实很简单,上边主要就是两部:1.先将你所需要的条件加到predicate集合中去,例子中也有equal/between/like相等/区间/模糊,基本也是平常使用的几个,添加好条件后2.进行了分页,判断有没有传入分页的参数,所有传了就分页,没传就查全部,分页中有一个getContent(),可以不加,不加的话还会返回页数/总条数等一些分页的参数,加这个方法就只返回list集合.</p><h2 id="补充" tabindex="-1"><a class="header-anchor" href="#补充"><span>补充</span></a></h2><h3 id="分页" tabindex="-1"><a class="header-anchor" href="#分页"><span>分页</span></a></h3><p>在上边说复杂查询的Repository接口时,其中的findAll方法,多传递一个pageable参数就可以自动的提供分页(pageable包含pageIndex和pageSize),相比较来说,省去了再引入pageHelper的步骤,更加简便.</p><p>但是这只是在复杂情况下进行一个分页,可是如果我们只是较简单的查询情况,例如只是用@Query注解来进行原生sql的查询时,该怎么去分页呢?</p><p><a href="https://link.segmentfault.com/?enc=hTbC1%2FrRI%2BivboTycA1%2BEg%3D%3D.%2FcAgvqY2qSqnA50XqDAQ%2FuxPoSTaLwwzuGCHJ1mmcR2LHPRjylsPs2f2pQrhrOMa" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/hdwang/p/7843405.html</a>大家可以参考这篇文章,方法比较全.</p><p>这篇文章中如果用@Query查询再进行分页时,一定要再@Query中添加countQuery属性,该属性通过查询去获取分页总数,这样分页就没问题了!</p><p><code>countQuery</code>代表当前分页的总页数，如果不设置这个参数相信你的分页一定不顺利</p><p>如下所示:</p><pre><code class="language-java">@Query(nativeQuery = true,
value = &quot;select id, name,age FROM people WHERE id=?! and name=?2 and age=?3,
countQuery = &quot;select count(*) FROM people WHERE id=?! and name=?2 and age=?3&quot;)
public Page findAll(Integer id,String name,Integer age,Pageable pageable);
</code></pre><p>如果既要分组group by,还要分页countQuery就需要: <code>countQuery = &quot;select count(*) FROM (select count(*) FROM people WHERE id=?! and name=?2 and age=?3 group by name) a&quot;</code>最后的a为别名,随意命名</p><p>如果不用()包裹再count(),返回的就是分组后每一行的count(),所以就需要再进行一步count()计算,才是分页的总数</p><p>注意,返回的Page对象要添加泛型,去规定返回的数据类型,若是没有泛型,返回的就是数组而不是对象.</p><p>但是需要注意:new PageRequest会发现已经过时,替代的方法是不要new PageRequest，而是直接用 PageRequest.of这个方法 根据你的需求选择入参；</p>`,61),o=[i];function l(p,s){return a(),t("div",null,o)}const c=e(r,[["render",l],["__file","spring-data-jpa.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/springboot/spring-data-jpa.html","title":"jpa教程","lang":"zh-CN","frontmatter":{"description":"jpa教程 https://segmentfault.com/a/1190000037755804 首先了解Spring Date JPA是什么? SpringData：其实SpringData就是Spring提供了一个操作数据的框架。而SpringData JPA只是SpringData框架下的一个基于JPA标准操作数据的模块。 SpringData...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/spring-data-jpa.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"jpa教程"}],["meta",{"property":"og:description","content":"jpa教程 https://segmentfault.com/a/1190000037755804 首先了解Spring Date JPA是什么? SpringData：其实SpringData就是Spring提供了一个操作数据的框架。而SpringData JPA只是SpringData框架下的一个基于JPA标准操作数据的模块。 SpringData..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-29T06:47:23.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-29T06:47:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"jpa教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-29T06:47:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"整合","slug":"整合","link":"#整合","children":[{"level":3,"title":"1. 导入jar包","slug":"_1-导入jar包","link":"#_1-导入jar包","children":[]},{"level":3,"title":"2. yml配置文件","slug":"_2-yml配置文件","link":"#_2-yml配置文件","children":[]},{"level":3,"title":"3.实体类","slug":"_3-实体类","link":"#_3-实体类","children":[]},{"level":3,"title":"4. Repository接口","slug":"_4-repository接口","link":"#_4-repository接口","children":[]},{"level":3,"title":"5. Controller","slug":"_5-controller","link":"#_5-controller","children":[]}]},{"level":2,"title":"补充","slug":"补充","link":"#补充","children":[{"level":3,"title":"分页","slug":"分页","link":"#分页","children":[]}]}],"git":{"createdTime":1655535285000,"updatedTime":1711694843000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":9.46,"words":2837},"filePathRelative":"java-tutor/springboot/spring-data-jpa.md","localizedDate":"2022年6月18日","autoDesc":true}');export{c as comp,u as data};
