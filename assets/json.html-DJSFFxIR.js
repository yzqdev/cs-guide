import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const o={},r=a(`<h1 id="java-json处理" tabindex="-1"><a class="header-anchor" href="#java-json处理"><span>java json处理</span></a></h1><h2 id="jackson" tabindex="-1"><a class="header-anchor" href="#jackson"><span>jackson</span></a></h2><p>安装</p><pre><code class="language-kotlin">// https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind
implementation(&quot;com.fasterxml.jackson.core:jackson-databind:2.17.0&quot;)

</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>jackson在实体类中无法绑定LocalDatetime,需要下面这样写</p><pre><code class="language-java">@JsonSerialize(using = LocalDateTimeSerializer.class)  
@JsonDeserialize(using = LocalDateTimeDeserializer.class)  
@JsonFormat(pattern = &quot;yyyy-MM-dd HH:mm:ss&quot;, timezone = &quot;GMT+8&quot;)  
private LocalDateTime createTime;  
@JsonSerialize(using = LocalDateTimeSerializer.class)  
@JsonDeserialize(using = LocalDateTimeDeserializer.class)  
@JsonFormat(pattern = &quot;yyyy-MM-dd HH:mm:ss&quot;, timezone = &quot;GMT+8&quot;)  
private LocalDateTime updateTime;
</code></pre><p>jackson使用</p><pre><code class="language-java">
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
class Car {
  private String brand  ;
  private int doors  ;
}
@Slf4j
public class JacksonTest {
  @Test
  void  jacksonTest(){
    ObjectMapper objectMapper = new ObjectMapper();

    String carJson =&quot;{ \\&quot;brand\\&quot; : \\&quot;Mercedes\\&quot;, \\&quot;doors\\&quot; : 5 }&quot;;

    try {
      Car car = objectMapper.readValue(carJson, Car.class);

      System.out.println(&quot;car brand = &quot; + car.getBrand());
      System.out.println(&quot;car doors = &quot; + car.getDoors());
      byte[] bytes = carJson.getBytes(StandardCharsets.UTF_8);

      Car car2 = objectMapper.readValue(bytes, Car.class);
      System.out.println(car2);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
  @Test
  void jacksonArr() throws JsonProcessingException {
    String jsonArray = &quot;[{\\&quot;brand\\&quot;:\\&quot;ford\\&quot;}, {\\&quot;brand\\&quot;:\\&quot;Fiat\\&quot;}]&quot;;

    ObjectMapper objectMapper = new ObjectMapper();


      Car[] carArray = objectMapper.readValue(jsonArray, Car[].class);
      System.out.println(Arrays.toString(carArray));
    List&lt;Car&gt; carList= Arrays.stream(carArray).toList();
    var listStr=objectMapper.writeValueAsString(carList);
    log.info(&quot;list to string {}&quot;,listStr);
    List&lt;Car&gt; carDeseriList=objectMapper.readValue(listStr, new TypeReference&lt;List&lt;Car&gt;&gt;() {});
    log.info(carDeseriList.toString());

  }
  @Test
  void writeJson() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();

    Car car = new Car();
    car.setBrand(&quot;宝马&quot;);
    car.setDoors(4);

    String json = objectMapper.writeValueAsString(car);
    System.out.println(json);
  }
}

</code></pre></div><p>springboot全局处理LocalDatetime转string</p><pre><code> 
  
import com.fasterxml.jackson.core.JsonGenerator;  
import com.fasterxml.jackson.databind.DeserializationFeature;  
import com.fasterxml.jackson.databind.ObjectMapper;  
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;  
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;  
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;  
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;  
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;  
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;  
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;  
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
import org.springframework.http.converter.HttpMessageConverter;  
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;  
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;  
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;  
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;  
  
import java.time.LocalDate;  
import java.time.LocalDateTime;  
import java.time.LocalTime;  
import java.time.format.DateTimeFormatter;  
import java.util.List;  
  
/**  
 * @author yzqde  
 * @date time 2023/10/8 6:36  
 * @modified By:  
 */@Configuration  
public class WebConf implements WebMvcConfigurer {  
  DateTimeFormatter pattern = DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;);  
  @Override  
  public void addInterceptors(InterceptorRegistry registry) {  
    WebMvcConfigurer.super.addInterceptors(registry);  
  }  
  
  @Override  
  public void addResourceHandlers(ResourceHandlerRegistry registry) {  
    WebMvcConfigurer.super.addResourceHandlers(registry);  
  
  }  
  
  /**  
   * JSON-转换器  
   */  
  @Override  
  public void configureMessageConverters(List&lt;HttpMessageConverter&lt;?&gt;&gt; converters){  
    MappingJackson2HttpMessageConverter jackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();  
    ObjectMapper objectMapper = new ObjectMapper();  
    objectMapper.enable(JsonGenerator.Feature.WRITE_BIGDECIMAL_AS_PLAIN);  
    objectMapper.enable(DeserializationFeature.USE_BIG_DECIMAL_FOR_FLOATS);  
    //处理失败  
    objectMapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);  
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);  
    objectMapper.configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);  
    objectMapper.configure(DeserializationFeature.FAIL_ON_NULL_CREATOR_PROPERTIES, false);  
    /**  
     * 序列换成Json时,将所有的Long变成String  
     * 因为js中得数字类型不能包括所有的java Long值  
     */  
    JavaTimeModule javaTimeModule = new JavaTimeModule();  
    javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    javaTimeModule.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd&quot;)));  
    javaTimeModule.addSerializer(LocalTime.class, new LocalTimeSerializer(DateTimeFormatter.ofPattern(&quot;HH:mm:ss&quot;)));  
    javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    javaTimeModule.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd&quot;)));  
    javaTimeModule.addDeserializer(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern(&quot;HH:mm:ss&quot;)));  
    objectMapper.registerModule(javaTimeModule);  
  
  
    jackson2HttpMessageConverter.setObjectMapper(objectMapper);  
    converters.add(jackson2HttpMessageConverter);  
  }  
  @Bean  
  public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {  
    return builder -&gt; {  
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;);  
      //返回时间数据序列化  
      builder.serializerByType(LocalDateTime.class, new LocalDateTimeSerializer(formatter));  
      //接收时间数据反序列化  
      builder.deserializerByType(LocalDateTime.class, new LocalDateTimeDeserializer(formatter));  
    };  
  }  
}
</code></pre><p>但是在aop中使用ObjectMapper会出错</p><p>需要</p><pre><code>\`\`\`java
 ObjectMapper mapper = new ObjectMapper();
 mapper.registerModule(new JavaTimeModule());
 mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
 String now = mapper.writeValueAsString(new SomeClass(LocalDateTime.now()));
 System.out.println(now);
</code></pre><pre><code>
## gson

安装

\`\`\`kotlin
// https://mvnrepository.com/artifact/com.google.code.gson/gson
implementation(&quot;com.google.code.gson:gson:2.10.1&quot;)

</code></pre><p>gson基本用法</p><pre><code class="language-java">
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
class Student {
  private String name;
  private int age;
}
@Slf4j
public class GsonTest {
  @Test
  void simpleMap() {
    Map&lt;Integer, String&gt; colours = new HashMap&lt;&gt;();
    colours.put(1, &quot;blue&quot;);
    colours.put(2, &quot;yellow&quot;);
    colours.put(3, &quot;green&quot;);
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    String output = gson.toJson(colours);
    System.out.println(output);
  }

  @Test
  void simpleEntity() {
    String jsonString = &quot;{\\&quot;name\\&quot;:\\&quot;Maxsu\\&quot;, \\&quot;age\\&quot;:24}&quot;;
    GsonBuilder builder = new GsonBuilder();
    builder.setPrettyPrinting();
    Gson gson = builder.create();
    Student student = gson.fromJson(jsonString, Student.class);
    System.out.println(student);
    jsonString = gson.toJson(student);
    System.out.println(jsonString);
  }

  @Test
  void simpleInt() {
    int[] marks = {100, 90, 85};
    Gson gson = new Gson();
//Serialization
    System.out.println(&quot;marks:&quot; + gson.toJson(marks));
//De-serialization
    marks = gson.fromJson(&quot;[100,90,85]&quot;, int[].class);
    System.out.println(&quot;marks:&quot; + Arrays.toString(marks));
  }

  @Test
  void simpleArray() {
    Gson gson = new GsonBuilder()
      .disableHtmlEscaping()
      .setLenient()
      .serializeNulls()
      .create();
    Student[] students = new Student[]{new Student(&quot;bb&quot;, 34), new Student(&quot;aa&quot;, 20)};
    var studentStr = gson.toJson(students);
    log.info(studentStr);
    var studentObj=gson.fromJson(studentStr,Student[].class);
    System.out.println(Arrays.toString(studentObj));

    // use list
    var stdList= Arrays.stream(students).toList();
    var stdListStr=gson.toJson(stdList);
    var type=new TypeToken&lt;List&lt;Student&gt;&gt;(){}.getType();
   List&lt;Student&gt; stdListObj=gson.fromJson(stdListStr,type);
    log.info(&quot;list string=&gt;&quot;+stdListStr);
    log.info(&quot;list obj {}&quot;,stdListObj.toString());
  }
}

</code></pre><h2 id="fastjson" tabindex="-1"><a class="header-anchor" href="#fastjson"><span>fastjson</span></a></h2><p>不推荐</p>`,15),s=[r];function i(c,l){return n(),t("div",null,s)}const u=e(o,[["render",i],["__file","json.html.vue"]]),m=JSON.parse('{"path":"/java-tutor/springboot/json.html","title":"java json处理","lang":"zh-CN","frontmatter":{"description":"java json处理 jackson 安装 提示 jackson在实体类中无法绑定LocalDatetime,需要下面这样写 jackson使用 springboot全局处理LocalDatetime转string 但是在aop中使用ObjectMapper会出错 需要 gson基本用法 fastjson 不推荐","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/json.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java json处理"}],["meta",{"property":"og:description","content":"java json处理 jackson 安装 提示 jackson在实体类中无法绑定LocalDatetime,需要下面这样写 jackson使用 springboot全局处理LocalDatetime转string 但是在aop中使用ObjectMapper会出错 需要 gson基本用法 fastjson 不推荐"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-20T19:28:54.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-20T19:28:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java json处理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-20T19:28:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"jackson","slug":"jackson","link":"#jackson","children":[]},{"level":2,"title":"fastjson","slug":"fastjson","link":"#fastjson","children":[]}],"git":{"createdTime":1697339432000,"updatedTime":1718911734000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":2.41,"words":723},"filePathRelative":"java-tutor/springboot/json.md","localizedDate":"2023年10月15日","autoDesc":true}');export{u as comp,m as data};
