# Java 常见错误

> 日常 Java 开发中遇到的常见编译、运行错误及其解决方法。

## 1. 找不到或无法加载主类

**错误信息：** `错误: 找不到或无法加载主类 Main`

**可能原因：**
- 未正确编译（需要先 `javac`）
- 包名与目录结构不匹配
- 环境变量 `CLASSPATH` 配置问题

**解决方法：**
```bash
# 确认当前目录结构正确
javac com/example/Main.java
java com.example.Main
```

## 2. 缺少 JavaFX 运行时组件

**错误信息：** `错误: 缺少 JavaFX 运行时组件, 需要使用该组件来运行此应用程序`

**原因：** JDK 11+ 已将 JavaFX 从 JDK 中剥离。

**解决方法：** 添加 `--module-path` 参数：
```bash
java --module-path "path\to\javafx-sdk-17\lib" --add-modules javafx.controls,javafx.fxml -jar app.jar
```

## 3. ClassCastException

**错误信息：** `java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String`

**原因：** 类型转换错误，通常在集合未使用泛型时发生。

**解决方法：** 使用泛型：
```java
List<String> list = new ArrayList<>();  // 加上泛型
```

## 4. ConcurrentModificationException

**错误信息：** `java.util.ConcurrentModificationException`

**原因：** 在遍历集合的同时修改了集合。

**解决方法：**
```java
// 使用 Iterator.remove()
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("bad")) {
        it.remove();
    }
}

// 或使用 removeIf (Java 8+)
list.removeIf(s -> s.equals("bad"));
```

## 5. OutOfMemoryError

**错误信息：** `java.lang.OutOfMemoryError: Java heap space`

**原因：** JVM 堆内存不足。

**解决方法：** 增加 JVM 堆内存：
```bash
java -Xms512m -Xmx2g -jar app.jar
```

## 6. UnsupportedClassVersionError

**错误信息：** `java.lang.UnsupportedClassVersionError: ... Unsupported major.minor version 61.0`

**原因：** 使用较低版本的 JRE 运行了较高版本 JDK 编译的代码。

**解决方法：** 升级 JRE 版本或降低编译目标版本：
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <source>17</source>
        <target>17</target>
    </configuration>
</plugin>
```

## 7. NullPointerException

**错误信息：** `java.lang.NullPointerException`

**原因：** 调用了 null 对象的方法或访问了 null 对象的属性。

**解决方法：**
```java
// 使用 Optional
Optional.ofNullable(obj).ifPresent(o -> o.doSomething());

// 显式判空
if (obj != null) {
    obj.doSomething();
}
```

## 8. NoSuchMethodError

**错误信息：** `java.lang.NoSuchMethodError`

**原因：** 依赖版本冲突，运行时找到的类版本与编译时不一致（缺少方法）。

**解决方法：** 使用 `mvn dependency:tree` 检查依赖冲突，排除冲突版本。

## 9. java.net.BindException: Address already in use

**原因：** 端口被占用。

**解决方法：**
```bash
# 查看端口占用
netstat -ano | findstr :8080

# 结束占用进程
taskkill /PID <进程ID> /F
```

## 10. 编码问题：UnmappableCharacterException

**错误信息：** `java.nio.charset.UnmappableCharacterException: Input length = 1`

**原因：** 源文件编码与编译器编码不一致。

**解决方法：** 在 Maven 中指定编码：
```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
</properties>
```
