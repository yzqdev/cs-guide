# 标准输入输出流

[官方文档](https://api.dart.dev/stable/dart-io/dart-io-library.html)

`dart:io` 提供了 `stdin`、`stdout`、`stderr` 三个标准流对象。

```dart
import 'dart:io';

void main() {
  // 向标准输出流写字符串（不换行）
  stdout.write('请输入用户名：');

  // 从标准输入流读取一行
  var input = stdin.readLineSync();

  // 带换行的输出
  stdout.writeln('你好，$input！');

  // 向标准错误流写入
  stderr.writeln('这只是一个演示');
}

// 读取一个字节
void readByte() {
  stdout.write('按任意键继续...');
  stdin.readByteSync();
  stdout.writeln('继续执行');
}

// 循环读取
void readLoop() {
  while (true) {
    stdout.write('输入 q 退出：');
    var line = stdin.readLineSync();
    if (line == 'q') break;
    stdout.writeln('你输入了：$line');
  }
}
```

# 文件操作

## 写文件

### 简便方式（自动关闭）

```dart
import 'dart:io';

void main() async {
  var file = File('test.txt');
  var content = '这是写入的内容';

  try {
    await file.writeAsString(content);
    print('写入完成');
  } catch (e) {
    print('写入失败：$e');
  }
}
```

`writeAsString` 参数说明：

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mode` | `FileMode` | `FileMode.write` | 写入模式 |
| `encoding` | `Encoding` | `utf8` | 字符编码 |
| `flush` | `bool` | `false` | 是否立即刷新 |

### 文件模式

| 常量 | 说明 |
|------|------|
| `FileMode.read` | 只读 |
| `FileMode.write` | 可写，文件存在则覆盖 |
| `FileMode.append` | 追加模式 |
| `FileMode.writeOnly` | 只写，文件存在则覆盖 |
| `FileMode.writeOnlyAppend` | 只写追加 |

### 追加写入

```dart
import 'dart:io';

void main() async {
  var file = File('log.txt');

  // 追加模式
  await file.writeAsString(
    '${DateTime.now()}: 日志条目\n',
    mode: FileMode.append,
  );
}
```

### 灵活写入（需手动关闭）

```dart
import 'dart:io';

void main() async {
  var file = File('output.txt');
  var sink = file.openWrite(mode: FileMode.append);

  sink.write('第一行');
  sink.writeln('第二行（带换行）');
  sink.writeAll(['第三行', '第四行'], '\n');
  sink.writeln('第五行');

  await sink.close();
  print('写入完成');
}
```

### 写入二进制数据

```dart
import 'dart:io';

void main() async {
  var file = File('data.bin');
  var bytes = <int>[0x48, 0x65, 0x6C, 0x6C, 0x6F]; // "Hello"

  await file.writeAsBytes(bytes);
  print('二进制数据写入完成');
}
```

## 读文件

### 简便方式

```dart
import 'dart:io';

void main() async {
  var file = File('test.txt');

  try {
    // 读取全部文本
    String content = await file.readAsString();
    print(content);

    // 按行读取
    List<String> lines = await file.readAsLines();
    lines.forEach(print);

    // 读取为字节
    List<int> bytes = await file.readAsBytes();
  } catch (e) {
    print('读取失败：$e');
  }
}
```

### 流式读取（适合大文件）

```dart
import 'dart:io';
import 'dart:convert';

void main() async {
  var file = File('large_file.txt');

  try {
    // 使用 Stream 逐行读取，避免一次加载整个文件
    var lines = file
        .openRead()
        .transform(utf8.decoder)
        .transform(const LineSplitter());

    await for (var line in lines) {
      print('行：$line');
    }
  } catch (e) {
    print('读取失败：$e');
  }
}
```

## 文件其他操作

```dart
import 'dart:io';

void main() async {
  var file = File('test.txt');

  // 判断是否存在
  if (await file.exists()) {
    print('文件存在');
  }

  // 复制
  await file.copy('backup.txt');

  // 重命名 / 移动
  await file.rename('new_name.txt');

  // 获取大小
  print('文件大小：${await file.length()} 字节');

  // 删除
  await file.delete();

  // 获取文件信息
  var stat = await file.stat();
  print('修改时间：${stat.modified}');
  print('创建时间：${stat.changed}');
  print('类型：${stat.type}');
}
```

## 目录操作

```dart
import 'dart:io';

void main() async {
  // 创建目录
  var dir = Directory('my_folder');
  if (!await dir.exists()) {
    await dir.create(recursive: true); // recursive 创建所有父目录
  }

  // 遍历目录
  await for (var entity in dir.list()) {
    if (entity is File) {
      print('文件：${entity.path}');
      var stat = await entity.stat();
      print('  大小：${stat.size} 字节');
    } else if (entity is Directory) {
      print('目录：${entity.path}');
    }
  }

  // 删除目录（递归）
  await dir.delete(recursive: true);
}

// 递归遍历目录树
Future<void> listDirRecursive(String path) async {
  var dir = Directory(path);
  if (!await dir.exists()) return;

  await for (var entity in dir.list()) {
    print(entity.path);
    if (entity is Directory) {
      await listDirRecursive(entity.path);
    }
  }
}
```

## 路径处理

```dart
import 'dart:io';

void main() {
  // 拼接路径
  var path =  Path('docs') / 'flutter' / 'dart.md';
  print(path); // docs/flutter/dart.md（跨平台）

  // 获取文件名
  print(Path.basename('a/b/file.txt')); // file.txt

  // 获取目录名
  print(Path.dirname('a/b/file.txt'));  // a/b

  // 获取扩展名
  print(Path.extension('file.txt'));    // .txt

  // 判断是否为绝对路径
  print(Path.isAbsolute('/a/b'));       // true

  // 当前目录
  print(Directory.current.path);
}
```

## 实际案例

### 文件复制工具

```dart
import 'dart:io';

Future<void> copyFile(String source, String dest) async {
  var srcFile = File(source);
  var destFile = File(dest);

  if (!await srcFile.exists()) {
    throw FileSystemException('源文件不存在', source);
  }

  // 确保目标目录存在
  await destFile.parent.create(recursive: true);

  // 流式复制（大文件友好）
  var reader = srcFile.openRead();
  var writer = destFile.openWrite();
  await reader.pipe(writer);

  print('已复制：$source → $dest');
}
```

### 日志写入器

```dart
import 'dart:io';

class Logger {
  final File _file;
  final IOSink _sink;

  Logger(String path)
      : _file = File(path),
        _sink = File(path).openWrite(mode: FileMode.append);

  void log(String message) {
    var time = DateTime.now().toString().substring(0, 19);
    _sink.writeln('[$time] $message');
  }

  Future<void> close() async {
    await _sink.flush();
    await _sink.close();
  }
}

// 使用
void main() async {
  var logger = Logger('app.log');
  logger.log('应用启动');
  logger.log('用户登录');
  logger.log('数据加载完成');
  await logger.close();
}
```
