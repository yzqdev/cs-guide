# java json处理


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