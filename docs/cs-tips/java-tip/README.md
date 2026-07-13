# Java 开发技巧

<Catalog />

## 目录

| 文件 | 内容 |
|------|------|
| [IO 操作](./io.md) | 文件读写、InputStream、BufferedReader、NIO 方式 |
| [Maven/Gradle](./mvn.md) | Maven 命令、Gradle 配置、依赖管理 |
| [代码片段](./snippet.md) | Java 实用代码段（格式化、GraalVM 等） |
| [StackOverflow 精选](./stackoverflow/) | 经典问答整理（集合/HashMap/单例/序列化等） |

## 快速参考

```java
// 字符串操作
String s = "hello";
s.length();                    // 5
s.substring(0, 2);             // "he"
s.split(",");                  // 分割
String.join(",", "a", "b");    // "a,b"

// 集合
List<String> list = new ArrayList<>();
Map<String, Integer> map = new HashMap<>();
Set<String> set = new HashSet<>();

// Lambda
list.forEach(item -> System.out.println(item));
list.stream().filter(s -> s.length() > 3).collect(Collectors.toList());

// 日期时间（Java 8+）
LocalDate today = LocalDate.now();
LocalDateTime now = LocalDateTime.now();
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
```
