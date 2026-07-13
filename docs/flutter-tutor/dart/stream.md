# Stream 详解

[官方文档](https://dart.dev/libraries/async/streams)

Stream 和 Future 是 Dart 异步编程的核心。Stream 代表异步数据序列，可以随时间产生多个值。

## 什么是 Stream

Stream 是一个**异步数据队列**：数据按顺序到达，你可以监听并处理每个到达的数据。

```
数据源 → [Stream] → 监听器（处理数据）
```

Stream 有两种类型：
- **单订阅流（Single-subscription）**：只允许一个监听器
- **广播流（Broadcast）**：允许多个监听器

## 创建 Stream

### 从集合创建

```dart
void main() async {
  // fromIterable：从集合创建
  var stream = Stream<int>.fromIterable([1, 2, 3, 4, 5]);
  await for (var n in stream) {
    print(n);
  }

  // value：创建单个值的流
  var single = Stream<bool>.value(true);
  print(await single.first); // true

  // empty：创建空流
  var empty = Stream<int>.empty();
  print(await empty.length); // 0
}
```

### periodic — 周期性产生数据

```dart
void main() async {
  // 每秒产生一个递增数字（0, 1, 2, ...）
  var stream = Stream<int>.periodic(
    Duration(seconds: 1),
    (count) => count,
  ).take(5); // 只取前5个

  await for (var n in stream) {
    print('第${n + 1}秒');
  }
}
```

### fromFuture / fromFutures

```dart
void main() async {
  // 从一个 Future 创建 Stream
  var stream1 = Stream<String>.fromFuture(
    Future(() => '异步结果'),
  );
  await for (var s in stream1) {
    print(s); // 异步结果
  }

  // 从多个 Future 创建（按完成顺序）
  var stream2 = Stream<String>.fromFutures([
    Future.delayed(Duration(seconds: 3), () => '任务A'),
    Future.delayed(Duration(seconds: 1), () => '任务B'),
    Future.delayed(Duration(seconds: 2), () => '任务C'),
  ]);

  await for (var s in stream2) {
    print(s); // B, C, A
  }
}
```

### async* 生成器

```dart
// 使用 async* 创建 Stream（最常用方式）
Stream<int> countDown(int from) async* {
  for (var i = from; i >= 0; i--) {
    await Future.delayed(Duration(seconds: 1));
    yield i; // 产生一个值
  }
}

void main() async {
  await for (var n in countDown(3)) {
    print(n); // 3, 2, 1, 0
  }
}
```

## 监听 Stream

三种监听方式：

### 1. await for（推荐）

```dart
void main() async {
  var stream = Stream.periodic(
    Duration(milliseconds: 500), (i) => i
  ).take(3);

  await for (var value in stream) {
    print('收到：$value');
  }
  print('流结束');
}
```

### 2. forEach

```dart
void main() async {
  var stream = Stream.fromIterable([1, 2, 3]);

  await stream.forEach((value) {
    print(value);
  });
}
```

### 3. listen（最灵活）

```dart
void main() {
  var stream = Stream.periodic(
    Duration(seconds: 1), (i) => i
  ).take(5);

  var subscription = stream.listen(
    (data) => print('数据：$data'),    // onData
    onError: (e) => print('错误：$e'), // onError
    onDone: () => print('完成'),       // onDone
    cancelOnError: false,             // 遇到错误是否取消
  );

  // 控制订阅
  // subscription.pause();    // 暂停
  // subscription.resume();   // 恢复
  // subscription.cancel();   // 取消
}
```

## Stream 转换方法

### take / takeWhile

```dart
void main() async {
  var stream = Stream.periodic(
    Duration(seconds: 1), (i) => i
  );

  // take(3)：只取前3个
  await for (var n in stream.take(3)) {
    print(n); // 0, 1, 2
  }

  // takeWhile：满足条件时继续
  var stream2 = Stream.fromIterable([1, 2, 3, 4, 5]);
  await for (var n in stream2.takeWhile((n) => n < 4)) {
    print(n); // 1, 2, 3
  }
}
```

### skip / skipWhile

```dart
void main() async {
  var stream = Stream.fromIterable([1, 2, 3, 4, 5]);

  // skip(2)：跳过前2个
  await for (var n in stream.skip(2)) {
    print(n); // 3, 4, 5
  }

  // skipWhile：跳过满足条件的
  var stream2 = Stream.fromIterable([1, 2, 3, 4, 5]);
  await for (var n in stream2.skipWhile((n) => n < 3)) {
    print(n); // 3, 4, 5
  }
}
```

### where / map

```dart
void main() async {
  var stream = Stream.fromIterable([1, 2, 3, 4, 5]);

  // where：筛选
  var evens = stream.where((n) => n % 2 == 0);
  await for (var n in evens) {
    print(n); // 2, 4
  }

  // map：转换
  var squares = Stream.fromIterable([1, 2, 3])
      .map((n) => n * n);
  await for (var n in squares) {
    print(n); // 1, 4, 9
  }

  // 链式组合
  var result = Stream.fromIterable([1, 2, 3, 4, 5])
      .where((n) => n.isEven)
      .map((n) => '偶数：$n')
      .take(2);

  await for (var s in result) {
    print(s); // 偶数：2, 偶数：4
  }
}
```

### toList / toSet

```dart
void main() async {
  var stream = Stream.fromIterable([3, 1, 4, 1, 5]);

  // 收集为 List
  List<int> list = await stream.toList();
  print(list); // [3, 1, 4, 1, 5]

  // 收集为 Set（去重）
  var stream2 = Stream.fromIterable([3, 1, 4, 1, 5]);
  Set<int> set = await stream2.toSet();
  print(set); // {3, 1, 4, 5}

  // 获取长度
  var stream3 = Stream.fromIterable([1, 2, 3]);
  print(await stream3.length); // 3
}
```

### distinct / transform

```dart
// distinct：去重（连续重复）
void main() async {
  var stream = Stream.fromIterable([1, 1, 2, 2, 3, 1]);
  await for (var n in stream.distinct()) {
    print(n); // 1, 2, 3, 1
  }
}

// transform：自定义转换
void transformDemo() {
  var stream = Stream.fromIterable([1, 2, 3]);

  var transformed = stream.transform(
    StreamTransformer<int, String>.fromHandlers(
      handleData: (data, sink) {
        sink.add('数字：$data');
      },
      handleError: (error, stack, sink) {
        sink.addError('错误：$error');
      },
      handleDone: (sink) {
        sink.add('--- 结束 ---');
        sink.close();
      },
    ),
  );

  transformed.listen(print);
  // 数字：1
  // 数字：2
  // 数字：3
  // --- 结束 ---
}
```

## StreamController

`StreamController` 是 Stream 的控制中心，可以主动向流中添加数据。

```dart
import 'dart:async';

void main() {
  // 创建单订阅流
  var controller = StreamController<String>();

  // 监听
  controller.stream.listen(
    (data) => print('收到：$data'),
    onDone: () => print('流已关闭'),
  );

  // 添加数据
  controller.add('Hello');
  controller.sink.add('World');  // sink.add 与 .add 相同
  controller.addError('出错了');
  controller.close();  // 关闭流
}
```

### StreamController 参数

```dart
var controller = StreamController(
  onListen: () => print('开始监听'),
  onPause: () => print('暂停'),
  onResume: () => print('恢复'),
  onCancel: () => print('取消监听'),
  sync: false, // true = 同步，false = 异步
);

var sub = controller.stream.listen(print);
controller.add('数据');
sub.pause();
sub.resume();
sub.cancel();
controller.close();
```

### 向 StreamController 添加流

```dart
void main() async {
  var stream = Stream.periodic(
    Duration(seconds: 1), (e) => e
  ).take(5);

  var controller = StreamController<int>();

  // 将 Stream 添加到 Controller
  await controller.addStream(stream);

  controller.stream.listen(
    print,
    onDone: () => print('完成'),
  );
}
```

## 广播流

单订阅流只允许一个监听器，广播流允许多个。

```dart
// 单订阅流只能一个监听器
var single = Stream.fromIterable([1, 2, 3]);
single.listen(print);
// single.listen(print); // ❌ Bad state: Stream has already been listened to

// 广播流可以有多个监听器
void main() {
  // 方式1：asBroadcastStream
  var broadcast1 = Stream.fromIterable([1, 2, 3])
      .asBroadcastStream();
  broadcast1.listen((n) => print('A: $n'));
  broadcast1.listen((n) => print('B: $n'));

  // 方式2：StreamController.broadcast
  var controller = StreamController<int>.broadcast();
  controller.stream.listen((n) => print('X: $n'));
  controller.stream.listen((n) => print('Y: $n'));

  controller.add(1);
  controller.add(2);
  controller.close();
}
```

## StreamSubscription — 控制订阅

```dart
void main() {
  var stream = Stream.periodic(
    Duration(seconds: 1), (i) => i
  ).take(10);

  var subscription = stream.listen(print);

  // 暂停（3秒后恢复）
  subscription.pause();
  Future.delayed(Duration(seconds: 3), () {
    subscription.resume();
  });

  // 取消订阅
  Future.delayed(Duration(seconds: 6), () {
    subscription.cancel();
  });
}
```

## 错误处理

```dart
void main() {
  var controller = StreamController<int>();

  controller.stream.listen(
    (data) => print('数据：$data'),
    onError: (e) => print('错误：$e'),
    onDone: () => print('完成'),
    cancelOnError: true, // 遇到错误是否停止
  );

  controller.add(1);
  controller.addError(Exception('发生错误'));
  controller.add(2); // 不会执行（cancelOnError = true）
  controller.close();
}

// 使用 try-catch 在 await for 中
void main() async {
  try {
    await for (var n in Stream.fromIterable([1, 2, 3])) {
      print(n);
    }
  } catch (e) {
    print('出错：$e');
  }
}
```

## 实际案例

### 事件总线（Event Bus）

```dart
import 'dart:async';

class EventBus {
  final _controller = StreamController<Event>.broadcast();
  Stream<Event> get stream => _controller.stream;

  void emit(Event event) => _controller.add(event);

  // 按类型监听
  Stream<T> on<T extends Event>() =>
      _controller.stream.where((e) => e is T).cast<T>();

  void dispose() => _controller.close();
}

class Event {
  final String name;
  Event(this.name);
}

class LoginEvent extends Event {
  final String user;
  LoginEvent(this.user) : super('login');
}

class LogoutEvent extends Event {
  LogoutEvent() : super('logout');
}

void main() {
  var bus = EventBus();

  // 监听所有事件
  bus.stream.listen((e) => print('事件：${e.name}'));

  // 只监听登录事件
  bus.on<LoginEvent>().listen((e) => print('用户登录：${e.user}'));

  bus.emit(LoginEvent('张三'));
  bus.emit(LogoutEvent());
}
```

### 数据流转换管道

```dart
import 'dart:async';

class DataPipeline {
  final _input = StreamController<int>();
  Stream<String> get output => _input.stream
      .where((n) => n > 0)
      .map((n) => n * 2)
      .map((n) => '结果：$n');

  void add(int data) => _input.add(data);
  void close() => _input.close();
}

void main() async {
  var pipeline = DataPipeline();

  pipeline.output.listen(print);

  pipeline.add(5);   // 结果：10
  pipeline.add(-1);  // 被过滤（> 0）
  pipeline.add(3);   // 结果：6

  pipeline.close();
}
```

## Stream 与相关类

| 类 | 说明 |
|----|------|
| `Stream<T>` | 异步数据序列 |
| `StreamController<T>` | Stream 的控制中心，可主动添加数据 |
| `StreamSink<T>` | 数据输入接口（`controller.sink`） |
| `StreamSubscription<T>` | 订阅控制（暂停、恢复、取消） |
| `StreamTransformer<S, T>` | Stream 数据转换器 |
