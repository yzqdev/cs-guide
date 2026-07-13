# Kotlin 文件操作

## 读取文件

```kotlin
import java.io.File

fun main() {
    // 读取整个文件
    val content = File("test.txt").readText()
    println(content)

    // 按行读取
    val lines = File("test.txt").readLines()
    lines.forEach { println(it) }

    // 使用 use 自动关闭资源
    File("test.txt").useLines { lines ->
        lines.forEach { println(it) }
    }

    // 读取为字节数组
    val bytes = File("test.txt").readBytes()
}
```

## 写入文件

```kotlin
import java.io.File

fun main() {
    val file = File("output.txt")

    // 覆盖写入
    file.writeText("Hello, Kotlin!")
    file.writeText("新的内容")  // 会覆盖

    // 追加写入
    file.appendText("\n追加的内容")
    file.appendBytes("bytes".toByteArray())

    // 按行写入
    file.writeText("")
    file.appendText("第一行\n")
    file.appendText("第二行\n")

    // 使用 PrintWriter
    file.printWriter().use { writer ->
        writer.println("行1")
        writer.println("行2")
    }

    // 使用 BufferedWriter
    file.bufferedWriter().use { writer ->
        writer.write("Hello")
        writer.newLine()
        writer.write("World")
    }
}
```

## 文件信息与目录

```kotlin
import java.io.File

fun main() {
    val file = File("test.txt")

    // 文件信息
    println(file.name)          // test.txt
    println(file.extension)     // txt
    println(file.path)          // 完整路径
    println(file.absolutePath)  // 绝对路径
    println(file.exists())      // 是否存在
    println(file.length())      // 文件大小
    println(file.isFile)        // 是否是文件
    println(file.isDirectory)   // 是否是目录
    println(file.lastModified())// 最后修改时间

    // 创建文件/目录
    file.createNewFile()
    File("parent/child").mkdirs()  // 创建多级目录

    // 遍历目录
    File(".").walk().forEach { println(it) }

    // 递归删除
    file.deleteRecursively()

    // 临时文件
    val temp = createTempFile("prefix", ".txt")
    temp.writeText("临时文件")
}
```

## 路径操作

```kotlin
import java.nio.file.Paths
import java.nio.file.Files
import java.nio.file.StandardCopyOption

fun main() {
    val source = Paths.get("source.txt")
    val target = Paths.get("target.txt")

    // 复制
    Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING)

    // 移动
    Files.move(source, target, StandardCopyOption.REPLACE_EXISTING)

    // 删除
    Files.deleteIfExists(target)

    // 读取所有行
    Files.readAllLines(source).forEach { println(it) }

    // 写入
    Files.write(target, listOf("行1", "行2", "行3"))
}
```
