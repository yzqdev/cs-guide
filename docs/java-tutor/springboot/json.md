# java json处理

## jackson

安装

```kotlin
// https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind
implementation("com.fasterxml.jackson.core:jackson-databind:2.17.0")

```

:::tip
jackson在实体类中无法绑定LocalDatetime,需要下面这样写

```java
@JsonSerialize(using = LocalDateTimeSerializer.class)  
@JsonDeserialize(using = LocalDateTimeDeserializer.class)  
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")  
private LocalDateTime createTime;  
@JsonSerialize(using = LocalDateTimeSerializer.class)  
@JsonDeserialize(using = LocalDateTimeDeserializer.class)  
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")  
private LocalDateTime updateTime;
```

jackson使用

```java

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

    String carJson ="{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";

    try {
      Car car = objectMapper.readValue(carJson, Car.class);

      System.out.println("car brand = " + car.getBrand());
      System.out.println("car doors = " + car.getDoors());
      byte[] bytes = carJson.getBytes(StandardCharsets.UTF_8);

      Car car2 = objectMapper.readValue(bytes, Car.class);
      System.out.println(car2);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
  @Test
  void jacksonArr() throws JsonProcessingException {
    String jsonArray = "[{\"brand\":\"ford\"}, {\"brand\":\"Fiat\"}]";

    ObjectMapper objectMapper = new ObjectMapper();


      Car[] carArray = objectMapper.readValue(jsonArray, Car[].class);
      System.out.println(Arrays.toString(carArray));
    List<Car> carList= Arrays.stream(carArray).toList();
    var listStr=objectMapper.writeValueAsString(carList);
    log.info("list to string {}",listStr);
    List<Car> carDeseriList=objectMapper.readValue(listStr, new TypeReference<List<Car>>() {});
    log.info(carDeseriList.toString());

  }
  @Test
  void writeJson() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();

    Car car = new Car();
    car.setBrand("宝马");
    car.setDoors(4);

    String json = objectMapper.writeValueAsString(car);
    System.out.println(json);
  }
}

```

:::
springboot全局处理LocalDatetime转string
```
 
  
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
  DateTimeFormatter pattern = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");  
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
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters){  
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
    javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
    javaTimeModule.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd")));  
    javaTimeModule.addSerializer(LocalTime.class, new LocalTimeSerializer(DateTimeFormatter.ofPattern("HH:mm:ss")));  
    javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
    javaTimeModule.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd")));  
    javaTimeModule.addDeserializer(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern("HH:mm:ss")));  
    objectMapper.registerModule(javaTimeModule);  
  
  
    jackson2HttpMessageConverter.setObjectMapper(objectMapper);  
    converters.add(jackson2HttpMessageConverter);  
  }  
  @Bean  
  public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {  
    return builder -> {  
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");  
      //返回时间数据序列化  
      builder.serializerByType(LocalDateTime.class, new LocalDateTimeSerializer(formatter));  
      //接收时间数据反序列化  
      builder.deserializerByType(LocalDateTime.class, new LocalDateTimeDeserializer(formatter));  
    };  
  }  
}
```
但是在aop中使用ObjectMapper会出错

需要
```
```java
 ObjectMapper mapper = new ObjectMapper();
 mapper.registerModule(new JavaTimeModule());
 mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
 String now = mapper.writeValueAsString(new SomeClass(LocalDateTime.now()));
 System.out.println(now);
```
```

## gson

安装

```kotlin
// https://mvnrepository.com/artifact/com.google.code.gson/gson
implementation("com.google.code.gson:gson:2.10.1")

```

gson基本用法

```java

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
    Map<Integer, String> colours = new HashMap<>();
    colours.put(1, "blue");
    colours.put(2, "yellow");
    colours.put(3, "green");
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    String output = gson.toJson(colours);
    System.out.println(output);
  }

  @Test
  void simpleEntity() {
    String jsonString = "{\"name\":\"Maxsu\", \"age\":24}";
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
    System.out.println("marks:" + gson.toJson(marks));
//De-serialization
    marks = gson.fromJson("[100,90,85]", int[].class);
    System.out.println("marks:" + Arrays.toString(marks));
  }

  @Test
  void simpleArray() {
    Gson gson = new GsonBuilder()
      .disableHtmlEscaping()
      .setLenient()
      .serializeNulls()
      .create();
    Student[] students = new Student[]{new Student("bb", 34), new Student("aa", 20)};
    var studentStr = gson.toJson(students);
    log.info(studentStr);
    var studentObj=gson.fromJson(studentStr,Student[].class);
    System.out.println(Arrays.toString(studentObj));

    // use list
    var stdList= Arrays.stream(students).toList();
    var stdListStr=gson.toJson(stdList);
    var type=new TypeToken<List<Student>>(){}.getType();
   List<Student> stdListObj=gson.fromJson(stdListStr,type);
    log.info("list string=>"+stdListStr);
    log.info("list obj {}",stdListObj.toString());
  }
}

```

## fastjson

不推荐
