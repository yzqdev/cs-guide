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

## java读取文件

```java
try(BufferedReader br = Files.newBufferedReader(Paths.get("testBufferedWriter.txt"))){
    String inValue;
    while((inValue = br.readLine())!=null){
        System.out.println("Files.newBufferedReader="+inValue);
    }
}

List<String> lines = Files.readAllLines(Paths.get("testBufferedWriter.txt"));

for(String line:lines)System.out.println("Files.readAllLines=="+line);

try(BufferedWriter bw = Files.newBufferedWriter(Paths.get("testNewBufferedWriter.txt"))){
    for(String d:data){
        bw.write(d);
        bw.newLine();

    }
}
```

## gradle java编码

```kotlin
allprojects {
  // 将构建文件统一输出到项目根目录下的 build 文件夹
  layout.buildDirectory = File(rootDir, "build/${path.replace(':', '/')}")
  tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
  }
}

```
