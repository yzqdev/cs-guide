# java json处理

## jackson


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

:::



## gson




## fastjson



## org.json


```
// https://mvnrepository.com/artifact/org.json/json
implementation("org.json:json:20231013")

```