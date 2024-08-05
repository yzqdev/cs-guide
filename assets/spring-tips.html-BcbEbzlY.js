import{_ as t,c as n,o as e,d as i}from"./app-CbULZrmi.js";const o={},p=i(`<h1 id="spring-技巧" tabindex="-1"><a class="header-anchor" href="#spring-技巧"><span>spring 技巧</span></a></h1><h2 id="启动时打印url" tabindex="-1"><a class="header-anchor" href="#启动时打印url"><span>启动时打印url</span></a></h2><pre><code class="language-java">  
@SpringBootApplication  
@Slf4j  
public class SimpleSecApplication {  
  
  public static void main(String[] args)  throws UnknownHostException{  
   var application= SpringApplication.run(SimpleSecApplication.class, args);  
   
     
log.info(&quot;&quot;&quot;  
  ..######..##.....##..######...######..########..######...######.  .##....##.##.....##.##....##.##....##.##.......##....##.##....##  .##.......##.....##.##.......##.......##.......##.......##......  ..######..##.....##.##.......##.......######....######...######.  .......##.##.....##.##.......##.......##.............##.......##  .##....##.##.....##.##....##.##....##.##.......##....##.##....##  ..######...#######...######...######..########..######...######.&quot;&quot;&quot;);  
Environment env = application.getEnvironment();  
String ip = InetAddress.getLocalHost().getHostAddress();  
String port = env.getProperty(&quot;server.port&quot;);  
String path = env.getProperty(&quot;server.servlet.context-path&quot;);  
if (StringUtils.isEmpty(path)) {  
  path = &quot;&quot;;  
}  
  
log.info(&quot;&quot;&quot;  
  \\n----------------------------------------------------------  
    Application  is running! Access URLs:    Local访问网址:    http://localhost:{}{}  
    External访问网址:  http://{}:{}{}  
    swagger访问地址:   http://localhost:{}/swagger-ui/index.html  
  ----------------------------------------------------------  &quot;&quot;&quot;,port,path,ip,port,path,port);
  }  
  
}
</code></pre><h2 id="优雅的设置下载文件的名字" tabindex="-1"><a class="header-anchor" href="#优雅的设置下载文件的名字"><span>优雅的设置下载文件的名字</span></a></h2><pre><code class="language-java">@RestController  
@ApiVersion(&quot;1&quot;)  
@RequestMapping(&quot;/file&quot;)  
public class FileController {  
  @GetMapping(&quot;/down&quot;)  
  public void demo (HttpServletResponse response) throws IOException {  
  
    byte[] content = &quot;Hello Spring&quot;.getBytes(StandardCharsets.UTF_8);  
  
    // 文件类型  
    response.setContentType(&quot;text/plain&quot;);  
    // 文本类型文件的编码  
    response.setCharacterEncoding(StandardCharsets.UTF_8.displayName());  
    // 文件长度  
    response.setContentLength(content.length);  
    // 文件的处理方式。 attachment 表示附件，filename 表示文件的名称  
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition  
      .attachment()     // 附件形式  
      .filename(&quot;中文文件.txt&quot;, StandardCharsets.UTF_8)  
      .build()  
      .toString());  
    response.getOutputStream().write(content);  
  }  
}
</code></pre><h2 id="文件单个-多个-gzip" tabindex="-1"><a class="header-anchor" href="#文件单个-多个-gzip"><span>文件单个,多个,gzip</span></a></h2><pre><code class="language-java">
public class FileController{
    
  
@GetMapping(&quot;/single&quot;)  
public void download (HttpServletRequest request, HttpServletResponse response) throws IOException {  
  
  // 要下载的文件  
  Path file = Paths.get(&quot;E:\\\\test.mp4&quot;);  
  
  // 获取文件的媒体类型  
  String contentType = Files.probeContentType(file);  
  if (contentType == null) {  
    // 如果获取失败，则使用通用的文件类型  
    contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;  
  }  
  
  response.setContentType(contentType);  
  // 文件大小  
  response.setContentLengthLong(Files.size(file));  
  /**  
   * 使用 ContentDisposition 构建 CONTENT_DISPOSITION 头，可以避免文件名称乱码的问题  
   */  
  response.setHeader(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()  
    .filename(file.getFileName().toString(), StandardCharsets.UTF_8)  
    .build()  
    .toString());  
  // 响应数据给客户端  
  Files.copy(file, response.getOutputStream());  
}  
@GetMapping(&quot;/gzip&quot;)  
public void gzipDownload (HttpServletRequest request, HttpServletResponse response) throws IOException {  
  
  Path file = Paths.get(&quot;E:\\\\test.mp4&quot;);  
  
  String contentType = Files.probeContentType(file);  
  if (contentType == null) {  
    contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;  
  }  
  
  // 告诉客户端，文件使用了 gzip 编码，客户端会自动解码  
  response.setHeader(HttpHeaders.CONTENT_ENCODING, &quot;gzip&quot;);  
  response.setContentType(contentType);  
  response.setHeader(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()  
    .filename(file.getFileName().toString(), StandardCharsets.UTF_8)  
    .build()  
    .toString());  
  
  // 使用Gzip压缩后，响应给客户端  
  try(GZIPOutputStream gzipOutputStream = new GZIPOutputStream(response.getOutputStream())){  
    Files.copy(file, gzipOutputStream);  
  }  
}  
  //下载多个文件
@GetMapping(&quot;/zip&quot;)  
public void zipDownload (HttpServletRequest request, HttpServletResponse response) throws IOException {  
  
  // 要下载的文件列表  
  List&lt;Path&gt; files = Arrays.asList(Paths.get(&quot;E:\\\\test.mp4&quot;),  
    Paths.get(&quot;E:\\\\node.txt&quot;),  
    Paths.get(&quot;E:\\\\keys.txt&quot;));  
  
  
  response.setContentType(&quot;application/zip&quot;); // zip压缩  
  response.setHeader(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()  
    .filename(&quot;download.zip&quot;, StandardCharsets.UTF_8)  
    .build()  
    .toString());  
  
  
  // 压缩多个文件到zip文件中，并且响应给客户端  
  try(ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream())){  
    for (Path file : files) {  
      try (InputStream inputStream = Files.newInputStream(file)) {  
        zipOutputStream.putNextEntry(new ZipEntry(file.getFileName().toString()));  
        StreamUtils.copy(inputStream, zipOutputStream);  
        zipOutputStream.flush();  
      }  
    }  
  }  
}
}
</code></pre><h2 id="spring-factory用法" tabindex="-1"><a class="header-anchor" href="#spring-factory用法"><span>Spring factory用法</span></a></h2><p>(1)使用spring.factories加载类，一般情况，加载的类和当前微服务的Java包(Package)没有共同包前缀，需借助@EnableAutoConfiguration注解扫描../META-INF/spring.factories。</p><p>(2)使用@Component注解加载类，一般是加载的类和当前微服务Java包(Package)有共同的包前缀，比如都在 com.hub.example目录下。</p><h2 id="springboot-四种获取applicationcontext的方式" tabindex="-1"><a class="header-anchor" href="#springboot-四种获取applicationcontext的方式"><span>SpringBoot 四种获取ApplicationContext的方式</span></a></h2><p>先定义一个util</p><pre><code class="language-java"> 
public class SpringBeanUtils  {
    private static ApplicationContext applicationContext;
    public static void setApplicationContext(ApplicationContext applicationContext){
        SpringBeanUtils.applicationContext = applicationContext;
    }
}

</code></pre><ol><li>实现ApplicationContextInitializer接口</li></ol><pre><code class="language-java">public class SecondApplicationContextInitializer implements ApplicationContextInitializer {
  @Override
  public void initialize(ConfigurableApplicationContext applicationContext) {    
     SpringBeanUtils.setApplicationContext(applicationContext);
  }
}

</code></pre><ol start="2"><li>实现ApplicationListener接口</li></ol><pre><code class="language-java">public class CustApplicationListener implements ApplicationListener&lt;ApplicationContextEvent&gt; {
  @Override
  public void onApplicationEvent(ApplicationContextEvent event) {        
     SpringBeanUtils.setApplicationContext(event.getApplicationContext());
  }
}
</code></pre><p>实现此步骤之后，还需要将此类注入到Spring容器中，有两种方式 第一种： 在此类上加@Component注解 第二种：在 <code>resources/META-INF/spring.factories</code>文件中添加以下配置</p><pre><code>org.springframework.context.ApplicationListener=\\
CustApplicationListener的路径
</code></pre><ol start="3"><li>放在启动类main方法中设置</li></ol><pre><code class="language-java">@SpringBootApplication
public class SpSpringApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(WangMikeSpringApplication.class, args);        
        SpringBeanUtils.setApplicationContext(applicationContext);
    }
}
</code></pre><ol start="4"><li>实现ApplicationContextAware接口</li></ol><pre><code class="language-java">@Component
public class SpringBeanUtils implements ApplicationContextAware {
    private static ApplicationContext applicationContext;
    public  void setApplicationContext(ApplicationContext applicationContext){
        SpringBeanUtils.applicationContext = applicationContext;
    }
}
</code></pre>`,23),a=[p];function r(s,l){return e(),n("div",null,a)}const u=t(o,[["render",r],["__file","spring-tips.html.vue"]]),g=JSON.parse('{"path":"/java-tutor/springboot/tips/spring-tips.html","title":"spring 技巧","lang":"zh-CN","frontmatter":{"description":"spring 技巧 启动时打印url 优雅的设置下载文件的名字 文件单个,多个,gzip Spring factory用法 (1)使用spring.factories加载类，一般情况，加载的类和当前微服务的Java包(Package)没有共同包前缀，需借助@EnableAutoConfiguration注解扫描../META-INF/spring.fa...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/tips/spring-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"spring 技巧"}],["meta",{"property":"og:description","content":"spring 技巧 启动时打印url 优雅的设置下载文件的名字 文件单个,多个,gzip Spring factory用法 (1)使用spring.factories加载类，一般情况，加载的类和当前微服务的Java包(Package)没有共同包前缀，需借助@EnableAutoConfiguration注解扫描../META-INF/spring.fa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T22:53:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-24T22:53:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"spring 技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-24T22:53:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"启动时打印url","slug":"启动时打印url","link":"#启动时打印url","children":[]},{"level":2,"title":"优雅的设置下载文件的名字","slug":"优雅的设置下载文件的名字","link":"#优雅的设置下载文件的名字","children":[]},{"level":2,"title":"文件单个,多个,gzip","slug":"文件单个-多个-gzip","link":"#文件单个-多个-gzip","children":[]},{"level":2,"title":"Spring factory用法","slug":"spring-factory用法","link":"#spring-factory用法","children":[]},{"level":2,"title":"SpringBoot 四种获取ApplicationContext的方式","slug":"springboot-四种获取applicationcontext的方式","link":"#springboot-四种获取applicationcontext的方式","children":[]}],"git":{"createdTime":1696975127000,"updatedTime":1719269626000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":2.77,"words":830},"filePathRelative":"java-tutor/springboot/tips/spring-tips.md","localizedDate":"2023年10月10日","autoDesc":true}');export{u as comp,g as data};
