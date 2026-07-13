# Java 版本迁移与兼容性

> Java 8 → 9 → 11 → 17 → 21 的演进中，部分 API 被移除或替换，以下是最常见的迁移问题。

## javax.annotation 被废弃

JDK 9+ 移除了 `javax.annotation` 模块，`@Resource` 等注解不可用。请使用 Jakarta Annotation API 替代：

```xml
<!-- https://mvnrepository.com/artifact/jakarta.annotation/jakarta.annotation-api -->
<dependency>
    <groupId>jakarta.annotation</groupId>
    <artifactId>jakarta.annotation-api</artifactId>
    <version>2.1.0-B1</version>
</dependency>
```

相关依赖如 [easy-captcha](https://mvnrepository.com/artifact/com.github.whvcse/easy-captcha) 也已迁移到 Jakarta 命名空间。

## JavaFX 在 JDK 11+ 中缺失

JDK 11+ 已将 JavaFX 从 JDK 中移除，需要单独引入。

### 下载 JavaFX SDK

- 下载地址：[https://gluonhq.com/products/javafx/](https://gluonhq.com/products/javafx/)

### 运行时添加模块

```bash
java --module-path <path>/lib --add-modules ALL-MODULE-PATH -jar app.jar
```

### Maven 依赖

```xml
<dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-controls</artifactId>
    <version>17.0.2</version>
</dependency>
<dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-fxml</artifactId>
    <version>17.0.2</version>
</dependency>
```

## BASE64Decoder 替代方案

JDK 1.8 中 `sun.misc.BASE64Decoder` 已不建议使用，请使用 `java.util.Base64`：

```java
// 旧写法（不推荐）
BASE64Decoder base64 = new BASE64Decoder();
byte[] buffer = base64.decodeBuffer(publicKeyStr);

// 新写法（推荐）
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

Decoder decoder = Base64.getMimeDecoder(); // 注意不要使用 .getDecoder()
byte[] buffer = decoder.decode(publicKeyStr);
```

## 文件写入方式演进

### Java 7+ 推荐方式（NIO Files）

```java
// 写文本文件
List<String> lines = Arrays.asList("The first line", "The second line");
Path file = Paths.get("the-file-name.txt");
Files.write(file, lines, Charset.forName("UTF-8"));
// Files.write(file, lines, Charset.forName("UTF-8"), StandardOpenOption.APPEND);

// 写二进制文件
byte[] data = ...;
Path file = Paths.get("the-file-name");
Files.write(file, data);
// Files.write(file, data, StandardOpenOption.APPEND);
```

### 最简单方式

```java
// 文本文件
PrintWriter writer = new PrintWriter("the-file-name.txt", "UTF-8");
writer.println("The first line");
writer.println("The second line");
writer.close();

// 二进制文件
byte[] data = ...;
FileOutputStream out = new FileOutputStream("the-file-name");
out.write(data);
out.close();
```

### Java 7+ try-with-resources

```java
try (Writer writer = new BufferedWriter(new OutputStreamWriter(
        new FileOutputStream("filename.txt"), "utf-8"))) {
    writer.write("something");
}
```

### 工具类

- [`FileUtils.writeStringToFile(..)`](https://commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/FileUtils.html#writeStringToFile%28java.io.File,%20java.lang.String,%20java.nio.charset.Charset%29) — commons-io
- [`Files.write(..)`](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/io/Files.html#write%28java.lang.CharSequence,%20java.io.File,%20java.nio.charset.Charset%29) — Guava

### Java 8+ 批量操作

```java
Charset utf8 = StandardCharsets.UTF_8;
List<String> lines = Arrays.asList("1st line", "2nd line");
byte[] data = {1, 2, 3, 4, 5};

try {
    Files.write(Paths.get("file1.bin"), data);
    Files.write(Paths.get("file2.bin"), data,
            StandardOpenOption.CREATE, StandardOpenOption.APPEND);
    Files.write(Paths.get("file3.txt"), "content".getBytes());
    Files.write(Paths.get("file4.txt"), "content".getBytes(utf8));
    Files.write(Paths.get("file5.txt"), lines, utf8);
    Files.write(Paths.get("file6.txt"), lines, utf8,
            StandardOpenOption.CREATE, StandardOpenOption.APPEND);
} catch (IOException e) {
    e.printStackTrace();
}
```

### Java 7 之前的方式

```java
Writer writer = null;
try {
    writer = new BufferedWriter(new OutputStreamWriter(
          new FileOutputStream("filename.txt"), "utf-8"));
    writer.write("Something");
} catch (IOException ex) {
    // 报告异常
} finally {
   try { writer.close(); } catch (Exception ex) { /*ignore*/ }
}
```

参考：[Reading, Writing, and Creating Files (NIO2)](http://docs.oracle.com/javase/tutorial/essential/io/file.html)

### 其他示例

```java
public class Program {
    public static void main(String[] args) {
        String text = "Hello world";
        BufferedWriter output = null;
        try {
            File file = new File("example.txt");
            output = new BufferedWriter(new FileWriter(file));
            output.write(text);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (output != null) output.close();
        }
    }
}
```

```java
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;

public class WriterExample {
    public void writing() {
        try {
            File statText = new File("E:/Java/Reference/bin/images/statsTest.txt");
            FileOutputStream is = new FileOutputStream(statText);
            OutputStreamWriter osw = new OutputStreamWriter(is);    
            Writer w = new BufferedWriter(osw);
            w.write("POTATO!!!");
            w.close();
        } catch (IOException e) {
            System.err.println("Problem writing to the file statsTest.txt");
        }
    }

    public static void main(String[] args) {
        WriterExample write = new WriterExample();
        write.writing();
    }
}
```

## 参考链接

- StackOverflow: [How to create a file and write to a file in Java](http://stackoverflow.com/questions/2885173/how-to-create-a-file-and-write-to-a-file-in-java)
