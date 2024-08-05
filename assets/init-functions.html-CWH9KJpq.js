import{_ as n,c as t,o as e,d as o}from"./app-CbULZrmi.js";const r={},i=o(`<h1 id="初始化执行操作" tabindex="-1"><a class="header-anchor" href="#初始化执行操作"><span>初始化执行操作</span></a></h1><p>通常的我们的项目开发中，经常会遇到那种在服务一启动就需要自动执行一些业务代码的情况。比如将数据库中的配置信息或者数据字典之类的缓存到redis，或者在服务启动的时候将一些配置化的定时任务开起来。关于spring mvc或者springboot如何在项目启动的时候就执行一些代码</p><h2 id="postconstruct注解" tabindex="-1"><a class="header-anchor" href="#postconstruct注解"><span><code>@PostConstruct</code>注解</span></a></h2><p>从Java EE5规范开始，Servlet中增加了两个影响Servlet生命周期的注解，@PostConstruct和@PreDestroy，这两个注解被用来修饰一个非静态的void（）方法。@PostConstruct会在所在类的构造函数执行之后执行，在init()方法执行之前执行。(@PreDestroy注解的方法会在这个类的destory()方法执行之后执行。) @PostConstruct 不是spring提供的而是Java自己的注解。</p><p>Java中该注解的说明：@PostConstruct该注解被用来修饰一个非静态的void（）方法。被@PostConstruct修饰的方法会在服务器加载Servlet的时候运行，并且只会被服务器执行一次。PostConstruct注释用于需要依赖注入完成后才能执行任何初始化的方法上。 在类投入使用之前，必须调用此方法</p><p>在使用spring框架时，在一个类内，如果有构造器（Constructor ），有@PostConstruct，还有@Autowired，他们的先后执行顺序为Constructor &gt;&gt; @Autowired &gt;&gt; @PostConstruct。在类加载的时候，为当前类初始化一些数据，那么可以使用@PostConstruct注解</p><pre><code class="language-java">@Component // 注意 这里必须有
public class StartAllJobInit {

    protected Logger logger = LoggerFactory.getLogger(getClass().getName());
    @Autowired
    JobInfoService jobInfoService;

    @Autowired
    JobTaskUtil jobTaskUtil;

    @PostConstruct // 构造函数之后执行
    public void init(){
        System.out.println(&quot;容器启动后执行&quot;);
        startJob();
    }

    public void startJob() {
        List&lt;JobInfoBO&gt; list = jobInfoService.findList();
        for (JobInfoBO jobinfo :list) {
            try {
                if(&quot;0&quot;.equals(jobinfo.getStartWithrun())){
                    logger.info(&quot;任务{}未设置自动启动。&quot;, jobinfo.getJobName());
                    jobInfoService.updateJobStatus(jobinfo.getId(), BasicsConstantManual.BASICS_SYS_JOB_STATUS_STOP);
                }else{
                    logger.info(&quot;任务{}设置了自动启动。&quot;, jobinfo.getJobName());
                    jobTaskUtil.addOrUpdateJob(jobinfo);
                    jobInfoService.updateJobStatus(jobinfo.getId(), BasicsConstantManual.BASICS_SYS_JOB_STATUS_STARTING);
                }
            } catch (SchedulerException e) {
                logger.error(&quot;执行定时任务出错，任务名称 {} &quot;, jobinfo.getJobName());
            }
        }
    }
}
</code></pre><h2 id="实现commandlinerunner接口并重写run-方法" tabindex="-1"><a class="header-anchor" href="#实现commandlinerunner接口并重写run-方法"><span>实现CommandLineRunner接口并重写run()方法</span></a></h2><p>其实有两个接口ApplicationRunner,CommandLineRunner</p><p>这两个接口中有一个run方法，只需要实现这个方法即可。这两个接口的不同之处在于：ApplicationRunner中run方法的参数为ApplicationArguments，而CommandLineRunner接口中run方法的参数为String数组。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>注意：一定要有@Component这个注解。要不然SpringBoot扫描不到这个类,* 是不会执行。</p><p>@Order注解 如果有多个实现类，而需要他们按一定顺序执行的话，可以在实现类上加上@Order注解。@Order(value=整数值)。SpringBoot会按照@Order中的value值从小到大依次执行。</p></div><p>例子</p><pre><code class="language-java">@Component // 注意 这里必须有
//@Order(2) 如果有多个类需要启动后执行 order注解中的值为启动的顺序
public class StartAllJobInit implements CommandLineRunner {

    protected Logger logger = LoggerFactory.getLogger(getClass().getName());
    @Autowired
    JobInfoService jobInfoService;

    @Autowired
    JobTaskUtil jobTaskUtil;

    @Override
    public void run(String... args) {
        List&lt;JobInfoBO&gt; list = jobInfoService.findList();
        for (JobInfoBO jobinfo :list) {
            try {
                if(&quot;0&quot;.equals(jobinfo.getStartWithrun())){
                    logger.info(&quot;任务{}未设置自动启动。&quot;, jobinfo.getJobName());
                    jobInfoService.updateJobStatus(jobinfo.getId(), BasicsConstantManual.BASICS_SYS_JOB_STATUS_STOP);
                }else{
                    logger.info(&quot;任务{}设置了自动启动。&quot;, jobinfo.getJobName());
                    jobTaskUtil.addOrUpdateJob(jobinfo);
                    jobInfoService.updateJobStatus(jobinfo.getId(), BasicsConstantManual.BASICS_SYS_JOB_STATUS_STARTING);
                }
            } catch (SchedulerException e) {
                logger.error(&quot;执行定时任务出错，任务名称 {} &quot;, jobinfo.getJobName());
            }
        }
    }
}
</code></pre><h2 id="使用监听器" tabindex="-1"><a class="header-anchor" href="#使用监听器"><span>使用监听器</span></a></h2><pre><code class="language-java">
 

/**
 * 初始化常量的监听器
 * &lt;p&gt;
 * 当spring装配好配置后，就去数据库读constants
 * &lt;p&gt;等待解决&lt;/p&gt;
 * &lt;p&gt;
 * &lt;a href=&quot;https://docs.spring.io/spring-boot/docs/2.7.0/reference/htmlsingle/#features.spring-application.application-events-and-listeners&quot;&gt;链接&lt;/a&gt;
 * &lt;/p&gt;
 *
 * @author yanni
 */

public class ConstantsInitListener implements ApplicationListener&lt;ApplicationContextInitializedEvent&gt;, Ordered {

    private static final Log log = Log.get();

    private static final String initSql = &quot;select config_value from tb_blog_config where config_field = &#39;init&#39;&quot;;

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    @Override
    public void onApplicationEvent(ApplicationContextInitializedEvent applicationContextInitializedEvent) {
        ConfigurableEnvironment environment = applicationContextInitializedEvent.getApplicationContext().getEnvironment();

        // 获取数据库连接配置
        String dataSourceUrl = environment.getProperty(&quot;spring.datasource.url&quot;);
        String dataSourceUsername = environment.getProperty(&quot;spring.datasource.username&quot;);
        String dataSourcePassword = environment.getProperty(&quot;spring.datasource.password&quot;);

        // 如果有为空的配置，终止执行
        if (ObjectUtil.hasEmpty(dataSourceUrl, dataSourceUsername, dataSourcePassword)) {
            try {
                throw new Exception(&quot;database not cononnected&quot;);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Connection conn = null;
        try {
            Class.forName(&quot;org.postgresql.Driver&quot;);
            assert dataSourceUrl != null;
            conn = DriverManager.getConnection(dataSourceUrl, dataSourceUsername, dataSourcePassword);
            Entity init = SqlExecutor.query(conn, initSql, new EntityHandler());
            if (init == null) {
                SqlExecutor.execute(conn,SqlConstant.initAdminSql );
                 SqlExecutor.execute(conn, SqlConstant.insertConfigDataSql,new Object() );
              SqlExecutor.execute(conn,SqlConstant.initTagSql );
                 SqlExecutor.execute(conn,SqlConstant.initCateSql );
                 SqlExecutor.execute(conn,SqlConstant.initLinkSql );
               log.info(&quot;执行sql成功!&quot;);
            } else {
                log.info(&quot;数据已经存在&quot;);
            }
            // 获取sys_config表的数据

        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            log.error(&quot;&gt;&gt;&gt; 读取数据库constants配置信息出错：{}&quot;, e.getMessage());

        } finally {
            DbUtil.close(conn);
        }

    }
}

</code></pre><p>然后在<code>resources/META-INF/spring.factories</code>写下</p><pre><code class="language-txt">org.springframework.context.ApplicationListener=\\
com.site.blog.config.listener.ConstantsInitListener
</code></pre><p>就可以在启动前写入sql</p>`,18),a=[i];function s(c,l){return e(),t("div",null,a)}const p=n(r,[["render",s],["__file","init-functions.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/springboot/init-functions.html","title":"初始化执行操作","lang":"zh-CN","frontmatter":{"description":"初始化执行操作 通常的我们的项目开发中，经常会遇到那种在服务一启动就需要自动执行一些业务代码的情况。比如将数据库中的配置信息或者数据字典之类的缓存到redis，或者在服务启动的时候将一些配置化的定时任务开起来。关于spring mvc或者springboot如何在项目启动的时候就执行一些代码 @PostConstruct注解 从Java EE5规范开始...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/init-functions.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"初始化执行操作"}],["meta",{"property":"og:description","content":"初始化执行操作 通常的我们的项目开发中，经常会遇到那种在服务一启动就需要自动执行一些业务代码的情况。比如将数据库中的配置信息或者数据字典之类的缓存到redis，或者在服务启动的时候将一些配置化的定时任务开起来。关于spring mvc或者springboot如何在项目启动的时候就执行一些代码 @PostConstruct注解 从Java EE5规范开始..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-18T06:54:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-18T06:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"初始化执行操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-18T06:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"@PostConstruct注解","slug":"postconstruct注解","link":"#postconstruct注解","children":[]},{"level":2,"title":"实现CommandLineRunner接口并重写run()方法","slug":"实现commandlinerunner接口并重写run-方法","link":"#实现commandlinerunner接口并重写run-方法","children":[]},{"level":2,"title":"使用监听器","slug":"使用监听器","link":"#使用监听器","children":[]}],"git":{"createdTime":1655535285000,"updatedTime":1655535285000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.51,"words":1053},"filePathRelative":"java-tutor/springboot/init-functions.md","localizedDate":"2022年6月18日","autoDesc":true}');export{p as comp,d as data};
