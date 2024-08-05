import{_ as e,c as t,o as r,d as a}from"./app-CbULZrmi.js";const n={},s=a(`<h1 id="mybatis实现分页查询" tabindex="-1"><a class="header-anchor" href="#mybatis实现分页查询"><span>mybatis实现分页查询</span></a></h1><h2 id="引入依赖" tabindex="-1"><a class="header-anchor" href="#引入依赖"><span>引入依赖</span></a></h2><pre><code class="language-xml">&lt;!-- 引入mybatisPlus --&gt;
     　　&lt;dependency&gt;
            &lt;groupId&gt;com.baomidou&lt;/groupId&gt;
            &lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;
            &lt;version&gt;3.5.0&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!-- 引入mysql驱动包 --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;!-- 引入Druid依赖，阿里巴巴所提供的数据源 --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.alibaba&lt;/groupId&gt;
            &lt;artifactId&gt;druid&lt;/artifactId&gt;
            &lt;version&gt;1.0.29&lt;/version&gt;
　　　　&lt;/dependency&gt;
</code></pre><p>在application.yml配置</p><pre><code class="language-yaml">spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&amp;characterEncoding=UTF-8
    username: root
    password: 123456
</code></pre><p>在启动类上面添加@MapperScan注解，扫描mapper包</p><pre><code class="language-java">@SpringBootApplication
@MapperScan(&quot;com.qiao.demo02.mapper&quot;)
public class SpringbootDemo02Application {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootDemo02Application.class, args);
    }

}
</code></pre><p>新建User和UserMapper</p><pre><code class="language-java">@Data
public class User {
    @TableId
    private Integer userId;
    private String userName;
    private Integer userAge;
    private String userEmail;
}
</code></pre><p>usermapper</p><pre><code class="language-java">public interface UserMapper extends BaseMapper&lt;User&gt; {
 
}
</code></pre><p>最重要的是继承<code>BaseMapper&lt;E&gt;</code>接口：里面声明了很强大的CRUD方法</p><pre><code class="language-java">public interface BaseMapper&lt;T&gt; extends Mapper&lt;T&gt; {
    int insert(T entity);

    int deleteById(Serializable id);

    int deleteByMap(@Param(&quot;cm&quot;) Map&lt;String, Object&gt; columnMap);

    int delete(@Param(&quot;ew&quot;) Wrapper&lt;T&gt; wrapper);

    int deleteBatchIds(@Param(&quot;coll&quot;) Collection&lt;? extends Serializable&gt; idList);

    int updateById(@Param(&quot;et&quot;) T entity);

    int update(@Param(&quot;et&quot;) T entity, @Param(&quot;ew&quot;) Wrapper&lt;T&gt; updateWrapper);

    T selectById(Serializable id);

    List&lt;T&gt; selectBatchIds(@Param(&quot;coll&quot;) Collection&lt;? extends Serializable&gt; idList);

    List&lt;T&gt; selectByMap(@Param(&quot;cm&quot;) Map&lt;String, Object&gt; columnMap);

    T selectOne(@Param(&quot;ew&quot;) Wrapper&lt;T&gt; queryWrapper);

    Integer selectCount(@Param(&quot;ew&quot;) Wrapper&lt;T&gt; queryWrapper);

    List&lt;T&gt; selectList(@Param(&quot;ew&quot;) Wrapper&lt;T&gt; queryWrapper);

    List&lt;Map&lt;String, Object&gt;&gt; selectMaps(@Param(&quot;ew&quot;) Wrapper&lt;T&gt; queryWrapper);

    List&lt;Object&gt; selectObjs(@Param(&quot;ew&quot;) Wrapper&lt;T&gt; queryWrapper);

    IPage&lt;T&gt; selectPage(IPage&lt;T&gt; page, @Param(&quot;ew&quot;) Wrapper&lt;T&gt; queryWrapper);

    IPage&lt;Map&lt;String, Object&gt;&gt; selectMapsPage(IPage&lt;T&gt; page, @Param(&quot;ew&quot;) Wrapper&lt;T&gt; queryWrapper);
}
</code></pre><p>分页查询<a href="https://baomidou.com/pages/8f40ae/" target="_blank" rel="noopener noreferrer">https://baomidou.com/pages/8f40ae/</a></p><pre><code class="language-java">@Configuration
public class MybatisPlusConfig {

    /**
     * 新的分页插件,一缓和二缓遵循mybatis的规则,需要设置 MybatisConfiguration#useDeprecatedExecutor = false 避免缓存出现问题
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }
}

</code></pre><p>然后就可以使用分页了</p><pre><code class="language-java">@Resource
    private UserMapper userMapper;
    @Test
    public void queryUserForPage(){
        IPage&lt;User&gt; userPage = new Page&lt;&gt;(2, 2);//参数一是当前页，参数二是每页个数
        userPage = userMapper.selectPage(userPage, null);
        List&lt;User&gt; list = userPage.getRecords();
        for(User user : list){
            System.out.println(user);
        }
    }
</code></pre><p><strong>Controller返回json串</strong> 先定义一个包装类UserVo，用来保存分页所需要的数据</p><pre><code class="language-java">package com.qiao.demo02.vo;

@Data
public class UserVo {
    private Integer current;
    private Integer size;
    private Long total;
    private List&lt;User&gt; userList;
}
</code></pre><p>然后在控制器编写代码，这里省略了service层，实际开发业务代码写在service层，Controller只负责：接受参数、调用service层方法处理业务逻辑，返回结果 Controller类贴上了@RestController注解</p><pre><code class="language-java">@GetMapping(&quot;queryUser&quot;)
    public UserVo queryList(Integer current, Integer size) {
        /**
         * 这些代码应该写在service层
         */
        UserVo userVo = new UserVo();
        IPage&lt;User&gt; page = new Page&lt;&gt;(current, size);
        userMapper.selectPage(page, null);
        userVo.setCurrent(current);
        userVo.setSize(size);
        userVo.setTotal(page.getTotal());
        userVo.setUserList(page.getRecords());
        return userVo;
    }
</code></pre><h2 id="多条件查询" tabindex="-1"><a class="header-anchor" href="#多条件查询"><span>多条件查询</span></a></h2><h3 id="mapper层" tabindex="-1"><a class="header-anchor" href="#mapper层"><span>mapper层</span></a></h3><pre><code class="language-java">@Mapper
public interface UserMapper extends BaseMapper&lt;User&gt; {

}
</code></pre><h3 id="service层" tabindex="-1"><a class="header-anchor" href="#service层"><span>service层</span></a></h3><pre><code class="language-java">public interface UserService extends IService&lt;User&gt; {

    IPage&lt;User&gt; findPage(Page&lt;User&gt; pageParam, UserQuery userQuery);
}
</code></pre><h3 id="service实现类" tabindex="-1"><a class="header-anchor" href="#service实现类"><span>service实现类</span></a></h3><pre><code class="language-java">
@Service
public class UserServiceImpl extends ServiceImpl&lt;UserMapper, User&gt; implements UserService {

    /**
     * 条件分页查询
     */
    @Override
    public IPage&lt;User&gt; findPage(Page&lt;User&gt; pageParam, UserQuery userQuery) {
        QueryWrapper&lt;User&gt; queryWrapper = new QueryWrapper&lt;&gt;();
        /*非空则加入条件*/
        if (!StringUtils.isEmpty(userQuery.getName())) {
            queryWrapper.like(&quot;name&quot;, userQuery.getName());
        }
        if (!StringUtils.isEmpty(userQuery.getPhone())){
            queryWrapper.like(&quot;phone&quot;, userQuery.getPhone());
        }
        if (!StringUtils.isEmpty(userQuery.getStatus())){
            queryWrapper.eq(&quot;status&quot;, userQuery.getStatus());
        }
        IPage&lt;User&gt; userPage = baseMapper.selectPage(pageParam, queryWrapper);
        return userPage;
    }
}
</code></pre><h3 id="controller" tabindex="-1"><a class="header-anchor" href="#controller"><span>controller</span></a></h3><pre><code class="language-java">@RestController
@RequestMapping(&quot;/user&quot;)
public class UserController {

    @Autowired
    private UserService userService;

    /**
     *  分页讲师条件查询
     */
    @GetMapping(&quot;{page}/{limit}&quot;)
    public IPage&lt;User&gt; findPage(
                           @PathVariable(value = &quot;page&quot;) Long page,
                           @PathVariable(value = &quot;limit&quot;) Long limit,
                           UserQuery userQuery)
    {
        Page&lt;User&gt; pageParam = new Page&lt;User&gt;(page, limit);
        IPage&lt;User&gt; pageResult=userService.findPage(pageParam, userQuery);
        return pageResult;
    }

}
</code></pre><h2 id="多表联查分页" tabindex="-1"><a class="header-anchor" href="#多表联查分页"><span>多表联查分页</span></a></h2><h3 id="mapper" tabindex="-1"><a class="header-anchor" href="#mapper"><span>mapper</span></a></h3><pre><code class="language-java">public interface UserMapper extends BaseMapper&lt;User&gt; {
 
  List&lt;UserListModel&gt; selectUserListPage(Pagination page ,@Param(&quot;user&quot;) UserListBean user);
   
}
</code></pre><h3 id="xml语句" tabindex="-1"><a class="header-anchor" href="#xml语句"><span>xml语句</span></a></h3><pre><code class="language-xml">&lt;select id=&quot;selectUserListPage&quot; resultType=&quot;com.web.member.model.UserListModel&quot;&gt;
  SELECT
    *
  FROM
    ftms_user u
  LEFT JOIN ftms_user_level l ON u.level_id = l.id
  WHERE 1=1
    &lt;if test=&quot;user.nickname != null&quot;&gt;
      and u.nickname like &quot;%&quot;#{user.nickname}&quot;%&quot; 
    &lt;/if&gt;
&lt;/select&gt;
</code></pre><h3 id="service实现" tabindex="-1"><a class="header-anchor" href="#service实现"><span>service实现</span></a></h3><pre><code class="language-java">@Service
public class UserServiceImpl extends ServiceImpl&lt;UserMapper, User&gt; implements UserService {
 
  @Transactional(readOnly=true)
  @Override
  public Page&lt;UserListModel&gt; selectUserListPage(UserListBean user) {
    Page&lt;UserListModel&gt; page = new Page&lt;&gt;(user.getCurr(), user.getNums());// 当前页，总条数 构造 page 对象
    return page.setRecords(this.baseMapper.selectUserListPage(page, user));
  }
   
}
</code></pre>`,37),p=[s];function l(i,o){return r(),t("div",null,p)}const u=e(n,[["render",l],["__file","mp-pagination.html.vue"]]),g=JSON.parse('{"path":"/java-tutor/orm-tutor/mp-pagination.html","title":"mybatis实现分页查询","lang":"zh-CN","frontmatter":{"description":"mybatis实现分页查询 引入依赖 在application.yml配置 在启动类上面添加@MapperScan注解，扫描mapper包 新建User和UserMapper usermapper 最重要的是继承BaseMapper<E>接口：里面声明了很强大的CRUD方法 分页查询https://baomidou.com/pages/8f40ae/ ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mp-pagination.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"mybatis实现分页查询"}],["meta",{"property":"og:description","content":"mybatis实现分页查询 引入依赖 在application.yml配置 在启动类上面添加@MapperScan注解，扫描mapper包 新建User和UserMapper usermapper 最重要的是继承BaseMapper<E>接口：里面声明了很强大的CRUD方法 分页查询https://baomidou.com/pages/8f40ae/ ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mybatis实现分页查询\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"引入依赖","slug":"引入依赖","link":"#引入依赖","children":[]},{"level":2,"title":"多条件查询","slug":"多条件查询","link":"#多条件查询","children":[{"level":3,"title":"mapper层","slug":"mapper层","link":"#mapper层","children":[]},{"level":3,"title":"service层","slug":"service层","link":"#service层","children":[]},{"level":3,"title":"service实现类","slug":"service实现类","link":"#service实现类","children":[]},{"level":3,"title":"controller","slug":"controller","link":"#controller","children":[]}]},{"level":2,"title":"多表联查分页","slug":"多表联查分页","link":"#多表联查分页","children":[{"level":3,"title":"mapper","slug":"mapper","link":"#mapper","children":[]},{"level":3,"title":"xml语句","slug":"xml语句","link":"#xml语句","children":[]},{"level":3,"title":"service实现","slug":"service实现","link":"#service实现","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.88,"words":863},"filePathRelative":"java-tutor/orm-tutor/mp-pagination.md","localizedDate":"2022年3月21日","autoDesc":true}');export{u as comp,g as data};
