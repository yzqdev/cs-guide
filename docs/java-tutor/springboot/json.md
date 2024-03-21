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
