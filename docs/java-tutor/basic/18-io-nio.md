---
title: "I/O 与 NIO"
order: 18
---

# I/O 与 NIO

> Java I/O（Input/Output）通过流（Stream）进行数据读写。NIO（New I/O）是 Java 1.4 引入的非阻塞 I/O 框架。

## I/O 体系

```
字节流（8位字节）
├── InputStream（读取字节）
│   ├── FileInputStream
│   ├── BufferedInputStream
│   ├── DataInputStream
│   └── ObjectInputStream
└── OutputStream（写入字节）
    ├── FileOutputStream
    ├── BufferedOutputStream
    ├── DataOutputStream
    └── ObjectOutputStream

字符流（16位字符，处理文本）
├── Reader（读取字符）
│   ├── FileReader
│   ├── BufferedReader
│   ├── InputStreamReader
│   └── StringReader
└── Writer（写入字符）
    ├── FileWriter
    ├── BufferedWriter
    ├── OutputStreamWriter
    └── StringWriter
```

## 文件读写

### 字节流 — 处理二进制文件

```java
// 读取文件
try (FileInputStream fis = new FileInputStream("input.txt")) {
    int data;
    while ((data = fis.read()) != -1) {
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 写入文件
try (FileOutputStream fos = new FileOutputStream("output.txt")) {
    String content = "Hello, Java I/O!";
    fos.write(content.getBytes());
} catch (IOException e) {
    e.printStackTrace();
}

// 复制文件
try (FileInputStream fis = new FileInputStream("source.jpg");
     FileOutputStream fos = new FileOutputStream("dest.jpg")) {
    byte[] buffer = new byte[8192];  // 8KB 缓冲区
    int bytesRead;
    while ((bytesRead = fis.read(buffer)) != -1) {
        fos.write(buffer, 0, bytesRead);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### 字符流 — 处理文本文件

```java
// 读取文本文件
try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 写入文本文件
try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("第一行");
    writer.newLine();
    writer.write("第二行");
} catch (IOException e) {
    e.printStackTrace();
}

// 追加写入
try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt", true))) {
    writer.write("追加的内容");
    writer.newLine();
}
```

### 指定编码的读写

```java
// 读取（指定 UTF-8 编码）
try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(new FileInputStream("input.txt"), "UTF-8"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}

// 写入
try (BufferedWriter writer = new BufferedWriter(
        new OutputStreamWriter(new FileOutputStream("output.txt"), "UTF-8"))) {
    writer.write("中文内容");
}
```

## 文件与目录操作

```java
import java.io.File;

// File 对象
File file = new File("test.txt");
File dir = new File("mydir");

// 文件属性
file.exists();              // 是否存在
file.isFile();              // 是否是文件
file.isDirectory();         // 是否是目录
file.getName();             // 文件名
file.getPath();             // 路径
file.getAbsolutePath();     // 绝对路径
file.length();              // 文件大小（字节）
file.lastModified();        // 最后修改时间
file.canRead();             // 是否可读
file.canWrite();            // 是否可写

// 文件操作
file.createNewFile();       // 创建新文件
file.delete();              // 删除文件
file.renameTo(new File("new.txt"));  // 重命名

// 目录操作
dir.mkdir();                // 创建目录
dir.mkdirs();               // 创建多级目录
String[] files = dir.list();  // 列出文件名

// 递归遍历目录
public static void listFiles(File dir, String indent) {
    File[] files = dir.listFiles();
    if (files == null) return;
    
    for (File f : files) {
        System.out.println(indent + f.getName());
        if (f.isDirectory()) {
            listFiles(f, indent + "  ");
        }
    }
}
```

## NIO（New I/O）

NIO 提供了**缓冲区和通道**模型，性能更高。

### Files 工具类（Java 7+）

```java
import java.nio.file.*;

// 读取所有行
List<String> lines = Files.readAllLines(Paths.get("input.txt"), StandardCharsets.UTF_8);

// 写入
Files.write(Paths.get("output.txt"), lines, StandardCharsets.UTF_8);

// 复制
Files.copy(Paths.get("source.txt"), Paths.get("dest.txt"), StandardCopyOption.REPLACE_EXISTING);

// 移动
Files.move(Paths.get("source.txt"), Paths.get("dest.txt"));

// 删除
Files.deleteIfExists(Paths.get("temp.txt"));

// 创建目录
Files.createDirectories(Paths.get("a/b/c"));

// 文件属性
Files.exists(Paths.get("test.txt"));
Files.size(Paths.get("test.txt"));
Files.getLastModifiedTime(Paths.get("test.txt"));

// 遍历目录（Java 8+）
try (Stream<Path> stream = Files.walk(Paths.get("mydir"))) {
    stream.filter(Files::isRegularFile)
          .forEach(System.out::println);
}
```

### Path — 更强大的路径类

```java
Path path = Paths.get("/user/local/bin");

path.getFileName();       // bin
path.getParent();         // /user/local
path.getRoot();           // /
path.getNameCount();      // 3
path.getName(0);          // user
path.subpath(0, 2);       // user/local

Path absolute = path.toAbsolutePath();
Path real = path.toRealPath();  // 真实路径（解析符号链接）

// 组合路径
Path newPath = Paths.get("base").resolve("sub").resolve("file.txt");
```

## 序列化

```java
import java.io.*;

// 1. 类必须实现 Serializable 接口
class User implements Serializable {
    private static final long serialVersionUID = 1L;  // 版本号

    private String name;
    private int age;
    private transient String password;  // transient 字段不序列化

    // getter/setter
}

// 2. 序列化（写入）
try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("user.dat"))) {
    User user = new User("张三", 25, "123456");
    oos.writeObject(user);
}

// 3. 反序列化（读取）
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("user.dat"))) {
    User user = (User) ois.readObject();
    System.out.println(user.getName());  // 张三
    System.out.println(user.getPassword());  // null（transient）
}
```

## 标准 I/O

```java
// System.in — 标准输入
Scanner scanner = new Scanner(System.in);
System.out.print("请输入姓名: ");
String name = scanner.nextLine();
System.out.println("你好, " + name);

// System.out — 标准输出
System.out.println("普通输出");
System.err.println("错误输出");

// System.out.printf — 格式化输出
System.out.printf("姓名: %s, 年龄: %d, 分数: %.1f%n", "张三", 25, 92.5);
```

## 最佳实践

```java
// 1. 始终使用 try-with-resources 自动关闭资源
try (BufferedReader reader = Files.newBufferedReader(Paths.get("file.txt"))) {
    // ...
}

// 2. 使用缓冲流提高性能
// ❌ 不用缓冲：每次读写一个字节
try (FileInputStream fis = new FileInputStream("large.txt")) {
    int b;
    while ((b = fis.read()) != -1) { /* ... */ }  // 性能差
}

// ✅ 使用缓冲：每次读写 8KB
try (BufferedInputStream bis = new BufferedInputStream(
        new FileInputStream("large.txt"))) {
    int b;
    while ((b = bis.read()) != -1) { /* ... */ }  // 性能好
}

// 3. 使用 NIO Files 简化操作
// ✅ 推荐
List<String> lines = Files.readAllLines(Paths.get("file.txt"));

// 4. 指定编码，避免乱码
Files.readAllLines(Paths.get("file.txt"), StandardCharsets.UTF_8);
```

## 练习

```java
// 1. 文件复制（使用 NIO）
public static void copyFile(String source, String dest) throws IOException {
    Files.copy(Paths.get(source), Paths.get(dest), StandardCopyOption.REPLACE_EXISTING);
}

// 2. 统计文本文件行数
public static long countLines(String filename) throws IOException {
    try (Stream<String> lines = Files.lines(Paths.get(filename))) {
        return lines.count();
    }
}

// 3. 递归查找指定文件
public static List<Path> findFiles(String dir, String extension) throws IOException {
    try (Stream<Path> stream = Files.walk(Paths.get(dir))) {
        return stream.filter(Files::isRegularFile)
                     .filter(p -> p.toString().endsWith(extension))
                     .collect(Collectors.toList());
    }
}
```
