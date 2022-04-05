# java8之后的兼容性

​

## 缺少javafx和javax,添加javax

```xml
<dependency>
    <groupId>javax.annotation</groupId>
    <artifactId>javax.annotation-api</artifactId>
    <version>1.3.2</version>
</dependency>

```

## 如何在java8以上版本使用javafx?

fx下载地址 [https://gluonhq.com/products/javafx/](https://gluonhq.com/products/javafx/)
​
Open the command prompt and run `java --module-path <path to unzipped folder>/lib --add-modules ALL-MODULE-PATH -jar <path to mcaselector-1.16.3.jar>` where you replace everything in `<>` with the appropriate paths.

## JDK1.8 找不到 sun.misc.BASE64Decoder 的解决方法

使用JDK.18 自带

```java
java.util.Base64
java.util.Base64.Encoder;
java.util.Base64.Decoder;

```

代替sun.misc.BASE64Decoder
例子1

```java
BASE64Decoder base64 = new BASE64Decoder();
byte[] buffer = base64.decodeBuffer(publicKeyStr);

```

替代方法

```java
Decoder decoder=Base64.getMimeDecoder(); //注不要使用.getDecoder();
byte[] buffer =decoder.decode(publicKeyStr);

```
 
