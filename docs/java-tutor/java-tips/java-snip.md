# 一些java常用的片段

## 更改java版本

我想用java17怎么办呢?
​

在plugin里面加这个,就可以了

```xml
         <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                    <encoding>utf-8</encoding>
                </configuration>
            </plugin>
```

## 时间转换

```java
1.Timestamp 转 LocalDateTime 
Timestamp time = Timestamp.from(Instant.now());
LocalDateTime localDateTime = time.toLocalDateTime();
2.LocalDateTime  转 Timestamp
 DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
Timestamp time = Timestamp.valueOf(LocalDateTime.now().format(dtf);
```
