# 初始化执行操作

通常的我们的项目开发中，经常会遇到那种在服务一启动就需要自动执行一些业务代码的情况。比如将数据库中的配置信息或者数据字典之类的缓存到redis，或者在服务启动的时候将一些配置化的定时任务开起来。关于spring mvc或者springboot如何在项目启动的时候就执行一些代码

## `@PostConstruct`注解

从Java EE5规范开始，Servlet中增加了两个影响Servlet生命周期的注解，@PostConstruct和@PreDestroy，这两个注解被用来修饰一个非静态的void（）方法。@PostConstruct会在所在类的构造函数执行之后执行，在init()方法执行之前执行。(@PreDestroy注解的方法会在这个类的destory()方法执行之后执行。)
@PostConstruct
不是spring提供的而是Java自己的注解。

Java中该注解的说明：@PostConstruct该注解被用来修饰一个非静态的void（）方法。被@PostConstruct修饰的方法会在服务器加载Servlet的时候运行，并且只会被服务器执行一次。PostConstruct注释用于需要依赖注入完成后才能执行任何初始化的方法上。 在类投入使用之前，必须调用此方法

在使用spring框架时，在一个类内，如果有构造器（Constructor ），有@PostConstruct，还有@Autowired，他们的先后执行顺序为Constructor >> @Autowired >> @PostConstruct。在类加载的时候，为当前类初始化一些数据，那么可以使用@PostConstruct注解

```java
@Component // 注意 这里必须有
public class StartAllJobInit {

    protected Logger logger = LoggerFactory.getLogger(getClass().getName());
    @Autowired
    JobInfoService jobInfoService;

    @Autowired
    JobTaskUtil jobTaskUtil;

    @PostConstruct // 构造函数之后执行
    public void init(){
        System.out.println("容器启动后执行");
        startJob();
    }

    public void startJob() {
        List<JobInfoBO> list = jobInfoService.findList();
        for (JobInfoBO jobinfo :list) {
            try {
                if("0".equals(jobinfo.getStartWithrun())){
                    logger.info("任务{}未设置自动启动。", jobinfo.getJobName());
                    jobInfoService.updateJobStatus(jobinfo.getId(), BasicsConstantManual.BASICS_SYS_JOB_STATUS_STOP);
                }else{
                    logger.info("任务{}设置了自动启动。", jobinfo.getJobName());
                    jobTaskUtil.addOrUpdateJob(jobinfo);
                    jobInfoService.updateJobStatus(jobinfo.getId(), BasicsConstantManual.BASICS_SYS_JOB_STATUS_STARTING);
                }
            } catch (SchedulerException e) {
                logger.error("执行定时任务出错，任务名称 {} ", jobinfo.getJobName());
            }
        }
    }
}
```

## 实现CommandLineRunner接口并重写run()方法

其实有两个接口ApplicationRunner,CommandLineRunner

这两个接口中有一个run方法，只需要实现这个方法即可。这两个接口的不同之处在于：ApplicationRunner中run方法的参数为ApplicationArguments，而CommandLineRunner接口中run方法的参数为String数组。
:::tip
注意：一定要有@Component这个注解。要不然SpringBoot扫描不到这个类,* 是不会执行。

@Order注解
如果有多个实现类，而需要他们按一定顺序执行的话，可以在实现类上加上@Order注解。@Order(value=整数值)。SpringBoot会按照@Order中的value值从小到大依次执行。
:::
例子

```java
@Component // 注意 这里必须有
//@Order(2) 如果有多个类需要启动后执行 order注解中的值为启动的顺序
public class StartAllJobInit implements CommandLineRunner {

    protected Logger logger = LoggerFactory.getLogger(getClass().getName());
    @Autowired
    JobInfoService jobInfoService;

    @Autowired
    JobTaskUtil jobTaskUtil;

    @Override
    public void run(String... args) {
        List<JobInfoBO> list = jobInfoService.findList();
        for (JobInfoBO jobinfo :list) {
            try {
                if("0".equals(jobinfo.getStartWithrun())){
                    logger.info("任务{}未设置自动启动。", jobinfo.getJobName());
                    jobInfoService.updateJobStatus(jobinfo.getId(), BasicsConstantManual.BASICS_SYS_JOB_STATUS_STOP);
                }else{
                    logger.info("任务{}设置了自动启动。", jobinfo.getJobName());
                    jobTaskUtil.addOrUpdateJob(jobinfo);
                    jobInfoService.updateJobStatus(jobinfo.getId(), BasicsConstantManual.BASICS_SYS_JOB_STATUS_STARTING);
                }
            } catch (SchedulerException e) {
                logger.error("执行定时任务出错，任务名称 {} ", jobinfo.getJobName());
            }
        }
    }
}
```

## 使用监听器

```java

 

/**
 * 初始化常量的监听器
 * <p>
 * 当spring装配好配置后，就去数据库读constants
 * <p>等待解决</p>
 * <p>
 * <a href="https://docs.spring.io/spring-boot/docs/2.7.0/reference/htmlsingle/#features.spring-application.application-events-and-listeners">链接</a>
 * </p>
 *
 * @author yanni
 */

public class ConstantsInitListener implements ApplicationListener<ApplicationContextInitializedEvent>, Ordered {

    private static final Log log = Log.get();

    private static final String initSql = "select config_value from tb_blog_config where config_field = 'init'";

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    @Override
    public void onApplicationEvent(ApplicationContextInitializedEvent applicationContextInitializedEvent) {
        ConfigurableEnvironment environment = applicationContextInitializedEvent.getApplicationContext().getEnvironment();

        // 获取数据库连接配置
        String dataSourceUrl = environment.getProperty("spring.datasource.url");
        String dataSourceUsername = environment.getProperty("spring.datasource.username");
        String dataSourcePassword = environment.getProperty("spring.datasource.password");

        // 如果有为空的配置，终止执行
        if (ObjectUtil.hasEmpty(dataSourceUrl, dataSourceUsername, dataSourcePassword)) {
            try {
                throw new Exception("database not cononnected");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Connection conn = null;
        try {
            Class.forName("org.postgresql.Driver");
            assert dataSourceUrl != null;
            conn = DriverManager.getConnection(dataSourceUrl, dataSourceUsername, dataSourcePassword);
            Entity init = SqlExecutor.query(conn, initSql, new EntityHandler());
            if (init == null) {
                SqlExecutor.execute(conn,SqlConstant.initAdminSql );
                 SqlExecutor.execute(conn, SqlConstant.insertConfigDataSql,new Object() );
              SqlExecutor.execute(conn,SqlConstant.initTagSql );
                 SqlExecutor.execute(conn,SqlConstant.initCateSql );
                 SqlExecutor.execute(conn,SqlConstant.initLinkSql );
               log.info("执行sql成功!");
            } else {
                log.info("数据已经存在");
            }
            // 获取sys_config表的数据

        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            log.error(">>> 读取数据库constants配置信息出错：{}", e.getMessage());

        } finally {
            DbUtil.close(conn);
        }

    }
}

```

然后在`resources/META-INF/spring.factories`写下

```txt
org.springframework.context.ApplicationListener=\
com.site.blog.config.listener.ConstantsInitListener
```

就可以在启动前写入sql
