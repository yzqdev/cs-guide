# java片段

## java用法

<https://runnable.run/archives/shou-ba-shou-jiang-ni-de-javamaven-xiang-mu-tong-guo-graalvm-da-bao-cheng-windows-ke-zhi-xing-cheng-xu#%E5%AE%89%E8%A3%85graalvm-jdk>

## 格式化字符串

```java
 String versionTxt=String.format("%s,%s,版本名称:%s 版本号:%s",v.getTitle(),v.getAppId(),v.getVersionName(),UniUtil.getAppVersion(v.getAppId()).get("code"));
String ms = MessageFormat.format("{0,number,#.##}", 3.656);
```

## maven bom

<https://www.baeldung.com/spring-maven-bom>

## springboot

spring api 版本控制
<https://github.com/lkqm/spring-api-versioning>

```xml
  <dependency>
            <groupId>com.github.lkqm</groupId>
            <artifactId>spring-api-versioning</artifactId>
            <version>1.4.0</version>
        </dependency>

```
