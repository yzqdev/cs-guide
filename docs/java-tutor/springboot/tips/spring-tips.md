# spring 技巧

## 启动时打印url
```java
  
@SpringBootApplication  
@Slf4j  
public class SimpleSecApplication {  
  
  public static void main(String[] args)  throws UnknownHostException{  
   var application= SpringApplication.run(SimpleSecApplication.class, args);  
   
     
log.info("""  
  ..######..##.....##..######...######..########..######...######.  .##....##.##.....##.##....##.##....##.##.......##....##.##....##  .##.......##.....##.##.......##.......##.......##.......##......  ..######..##.....##.##.......##.......######....######...######.  .......##.##.....##.##.......##.......##.............##.......##  .##....##.##.....##.##....##.##....##.##.......##....##.##....##  ..######...#######...######...######..########..######...######.""");  
Environment env = application.getEnvironment();  
String ip = InetAddress.getLocalHost().getHostAddress();  
String port = env.getProperty("server.port");  
String path = env.getProperty("server.servlet.context-path");  
if (StringUtils.isEmpty(path)) {  
  path = "";  
}  
  
log.info("""  
  \n----------------------------------------------------------  
    Application  is running! Access URLs:    Local访问网址:    http://localhost:{}{}  
    External访问网址:  http://{}:{}{}  
    swagger访问地址:   http://localhost:{}/swagger-ui/index.html  
  ----------------------------------------------------------  """,port,path,ip,port,path,port);
  }  
  
}
```

## 优雅的设置下载文件的名字

```java
@RestController  
@ApiVersion("1")  
@RequestMapping("/file")  
public class FileController {  
  @GetMapping("/down")  
  public void demo (HttpServletResponse response) throws IOException {  
  
    byte[] content = "Hello Spring".getBytes(StandardCharsets.UTF_8);  
  
    // 文件类型  
    response.setContentType("text/plain");  
    // 文本类型文件的编码  
    response.setCharacterEncoding(StandardCharsets.UTF_8.displayName());  
    // 文件长度  
    response.setContentLength(content.length);  
    // 文件的处理方式。 attachment 表示附件，filename 表示文件的名称  
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition  
      .attachment()     // 附件形式  
      .filename("中文文件.txt", StandardCharsets.UTF_8)  
      .build()  
      .toString());  
    response.getOutputStream().write(content);  
  }  
}
```

## 文件单个,多个,gzip

```java

public class FileController{
    
  
@GetMapping("/single")  
public void download (HttpServletRequest request, HttpServletResponse response) throws IOException {  
  
  // 要下载的文件  
  Path file = Paths.get("E:\\test.mp4");  
  
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
@GetMapping("/gzip")  
public void gzipDownload (HttpServletRequest request, HttpServletResponse response) throws IOException {  
  
  Path file = Paths.get("E:\\test.mp4");  
  
  String contentType = Files.probeContentType(file);  
  if (contentType == null) {  
    contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;  
  }  
  
  // 告诉客户端，文件使用了 gzip 编码，客户端会自动解码  
  response.setHeader(HttpHeaders.CONTENT_ENCODING, "gzip");  
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
@GetMapping("/zip")  
public void zipDownload (HttpServletRequest request, HttpServletResponse response) throws IOException {  
  
  // 要下载的文件列表  
  List<Path> files = Arrays.asList(Paths.get("E:\\test.mp4"),  
    Paths.get("E:\\node.txt"),  
    Paths.get("E:\\keys.txt"));  
  
  
  response.setContentType("application/zip"); // zip压缩  
  response.setHeader(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()  
    .filename("download.zip", StandardCharsets.UTF_8)  
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
```

## Spring factory用法

(1)使用spring.factories加载类，一般情况，加载的类和当前微服务的Java包(Package)没有共同包前缀，需借助@EnableAutoConfiguration注解扫描../META-INF/spring.factories。

(2)使用@Component注解加载类，一般是加载的类和当前微服务Java包(Package)有共同的包前缀，比如都在 com.hub.example目录下。

## SpringBoot 四种获取ApplicationContext的方式

先定义一个util

```java
 
public class SpringBeanUtils  {
    private static ApplicationContext applicationContext;
    public static void setApplicationContext(ApplicationContext applicationContext){
        SpringBeanUtils.applicationContext = applicationContext;
    }
}

```

1. 实现ApplicationContextInitializer接口

```java
public class SecondApplicationContextInitializer implements ApplicationContextInitializer {
  @Override
  public void initialize(ConfigurableApplicationContext applicationContext) {    
     SpringBeanUtils.setApplicationContext(applicationContext);
  }
}

```

2. 实现ApplicationListener接口

```java
public class CustApplicationListener implements ApplicationListener<ApplicationContextEvent> {
  @Override
  public void onApplicationEvent(ApplicationContextEvent event) {        
     SpringBeanUtils.setApplicationContext(event.getApplicationContext());
  }
}
```

实现此步骤之后，还需要将此类注入到Spring容器中，有两种方式
第一种： 在此类上加@Component注解
第二种：在  `resources/META-INF/spring.factories`文件中添加以下配置

```
org.springframework.context.ApplicationListener=\
CustApplicationListener的路径
```

3. 放在启动类main方法中设置

```java
@SpringBootApplication
public class SpSpringApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(WangMikeSpringApplication.class, args);        
        SpringBeanUtils.setApplicationContext(applicationContext);
    }
}
```

4. 实现ApplicationContextAware接口

```java
@Component
public class SpringBeanUtils implements ApplicationContextAware {
    private static ApplicationContext applicationContext;
    public  void setApplicationContext(ApplicationContext applicationContext){
        SpringBeanUtils.applicationContext = applicationContext;
    }
}
```
