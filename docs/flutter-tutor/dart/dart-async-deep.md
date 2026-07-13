# Dart 异步编程深入

[官方文档](https://dart.dev/codelabs/async-await)

## Future 详解

### 创建 Future

```dart
// 1. 直接返回一个值
Future<String> greet() async => '你好！';

// 2. 使用 Future 构造函数
Future<int> delayedValue() {
  return Future<int>.delayed(
    Duration(seconds: 1),
    () => 42,
  );
}

// 3. 使用 Future.value（立即完成）
var immediate = Future.value('立即值');

// 4. 使用 Future.error（立即失败）
var error = Future.error(Exception('出错了'));

// 5. 使用 Future.sync（同步执行回调）
var sync = Future.sync(() => '同步执行');
```

### Future 链式调用

```dart
Future<String> fetchUser() async {
  await Future.delayed(Duration(seconds: 1));
  return '用户数据';
}

Future<String> fetchOrders(String user) async {
  await Future.delayed(Duration(seconds: 1));
  return '$user 的订单';
}

void main() {
  // 链式调用
  fetchUser()
      .then((user) {
        print('获取到用户：$user');
        return fetchOrders(user);
      })
      .then((orders) {
        print('获取到订单：$orders');
      })
      .catchError((e) {
        print('出错：$e');
      })
      .whenComplete(() {
        print('无论成功失败都会执行');
      });
}
```

### Future.wait — 并行等待

```dart
Future<String> fetchData1() async {
  await Future.delayed(Duration(seconds: 3));
  return '数据1';
}

Future<String> fetchData2() async {
  await Future.delayed(Duration(seconds: 2));
  return '数据2';
}

Future<String> fetchData3() async {
  await Future.delayed(Duration(seconds: 1));
  return '数据3';
}

void main() async {
  // 并行执行，全部完成后返回
  var results = await Future.wait([
    fetchData1(),
    fetchData2(),
    fetchData3(),
  ]);
  print(results); // [数据1, 数据2, 数据3]（约 3 秒后）

  // Future.wait 的 eagerError 参数
  try {
    await Future.wait([
      Future.error(Exception('任务失败')),
      fetchData1(),
    ], eagerError: true); // true=遇到第一个错误立即返回, false=等待所有完成
  } catch (e) {
    print(e);
  }
}
```

### Future 超时

```dart
void main() async {
  try {
    var result = await Future.delayed(
      Duration(seconds: 5),
      () => '慢速任务',
    ).timeout(Duration(seconds: 3));

    print(result);
  } on TimeoutException {
    print('任务超时！');
  }

  // 超时提供默认值
  var data = await Future.delayed(
    Duration(seconds: 5),
    () => '服务器数据',
  ).timeout(
    Duration(seconds: 2),
    onTimeout: () => '缓存数据（备用）',
  );
  print(data); // 缓存数据（备用）
}
```

## async / await 深入

### async* 与 yield（异步生成器）

```dart
// 异步生成器：生成异步数据序列
Stream<int> countStream(int max) async* {
  for (var i = 1; i <= max; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i; // 产生一个值
  }
}

void main() async {
  // 消费异步流
  await for (var value in countStream(5)) {
    print('计数：$value');
  }
  // 每秒输出一个数字：1, 2, 3, 4, 5

  // 使用 forEach
  await countStream(3).forEach(print);

  // 收集为列表
  var list = await countStream(5).toList();
  print(list); // [1, 2, 3, 4, 5]
}
```

### sync* 与 yield（同步生成器）

```dart
// 同步生成器：生成惰性序列
Iterable<int> fibonacci(int count) sync* {
  int a = 0, b = 1;
  for (var i = 0; i < count; i++) {
    yield a;
    int temp = a;
    a = b;
    b = temp + b;
  }
}

void main() {
  var fibs = fibonacci(10);
  print(fibs.toList()); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

  // 惰性求值：只在需要时计算
  for (var n in fibonacci(5)) {
    print(n); // 依次输出
  }
}
```

### yield* 委托

```dart
Stream<String> morning() async* {
  yield '起床';
  yield '刷牙';
  yield '吃早餐';
}

Stream<String> work() async* {
  yield '上班';
  yield '开会';
  yield '写代码';
}

Stream<String> evening() async* {
  yield '回家';
  yield '锻炼';
  yield '睡觉';
}

// 使用 yield* 委托给其他生成器
Stream<String> dailyRoutine() async* {
  yield* morning();
  yield* work();
  yield* evening();
}

void main() async {
  await for (var step in dailyRoutine()) {
    print('→ $step');
  }
}
```

## 错误处理

### try / catch / finally

```dart
Future<void> riskyOperation() async {
  try {
    var data = await fetchData();
    var processed = await processData(data);
    await saveData(processed);
  } on TimeoutException catch (e) {
    print('超时：$e');
  } on HttpException catch (e) {
    print('网络错误：$e');
  } catch (e, stackTrace) {
    print('未知错误：$e');
    print('堆栈：$stackTrace');
  } finally {
    print('清理资源');
  }
}
```

### 异常转换

```dart
class AppException implements Exception {
  final String message;
  final int code;
  AppException(this.message, this.code);

  @override
  String toString() => '[$code] $message';
}

Future<String> fetchData() async {
  try {
    var response = await httpGet('/api/data');
    return response;
  } on TimeoutException {
    throw AppException('请求超时', 408);
  } on HttpException {
    throw AppException('网络不可用', 503);
  }
}

// 自定义错误处理扩展
extension FutureExtensions<T> on Future<T> {
  Future<T> retry(int maxRetries, {Duration delay = Duration(seconds: 1)}) {
    return retryAsync(this, maxRetries, delay);
  }
}

Future<T> retryAsync<T>(Future<T> Function() fn, int maxRetries, Duration delay) async {
  for (var i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i == maxRetries - 1) rethrow;
      await Future.delayed(delay * (i + 1));
    }
  }
  throw Exception('重试失败');
}
```

## Stream 进阶

### Stream 转换

```dart
void main() async {
  var stream = Stream.periodic(
    Duration(seconds: 1),
    (i) => i,
  ).take(10);

  // map
  var doubled = stream.map((n) => n * 2);

  // where
  var evens = stream.where((n) => n % 2 == 0);

  // distinct（去重）
  var unique = Stream.fromIterable([1, 1, 2, 2, 3]).distinct();

  // take / skip
  var first3 = stream.take(3);
  var after3 = stream.skip(3);

  // transform
  var transformed = stream.transform(
    StreamTransformer.fromHandlers(
      handleData: (data, sink) {
        sink.add('数字：$data');
      },
    ),
  );

  // 链式
  await for (var n in stream
      .where((n) => n.isEven)
      .map((n) => n * 10)
      .take(3)) {
    print(n); // 0, 20, 40
  }
}
```

### StreamController

```dart
import 'dart:async';

class EventBus {
  final _controller = StreamController<String>.broadcast();

  Stream<String> get stream => _controller.stream;

  void emit(String event) {
    _controller.add(event);
  }

  void dispose() {
    _controller.close();
  }
}

void main() {
  var bus = EventBus();

  // 可以添加多个监听（广播流）
  var sub1 = bus.stream.listen((e) => print('监听器1: $e'));
  var sub2 = bus.stream.listen((e) => print('监听器2: $e'));

  bus.emit('事件1');
  bus.emit('事件2');

  // 取消监听
  sub1.cancel();

  bus.emit('事件3'); // 只有监听器2收到

  bus.dispose();
}
```

## Isolate — 多线程

Dart 的 Isolate 是独立的内存隔离区，用于并行计算。

```dart
import 'dart:isolate';

// 耗时的计算函数
int calculatePrimes(int limit) {
  int count = 0;
  for (int i = 2; i <= limit; i++) {
    bool isPrime = true;
    for (int j = 2; j * j <= i; j++) {
      if (i % j == 0) { isPrime = false; break; }
    }
    if (isPrime) count++;
  }
  return count;
}

void main() async {
  // 在主 Isolate 中计算（会卡住 UI）
  // var count = calculatePrimes(10000000);

  // 在新 Isolate 中计算（不阻塞主线程）
  var count = await Isolate.run(() => calculatePrimes(10000000));
  print('素数个数：$count');

  // 多个任务并行
  var results = await Future.wait([
    Isolate.run(() => calculatePrimes(1000000)),
    Isolate.run(() => calculatePrimes(2000000)),
    Isolate.run(() => calculatePrimes(3000000)),
  ]);
  print(results);
}
```

### 发送消息到 Isolate

```dart
import 'dart:isolate';

void worker(SendPort sendPort) {
  // 接收主线程消息
  ReceivePort receivePort = ReceivePort();
  sendPort.send(receivePort.sendPort);

  receivePort.listen((message) {
    if (message is int) {
      sendPort.send(message * message);
    }
  });
}

void main() async {
  ReceivePort mainReceivePort = ReceivePort();

  // 启动 Isolate
  await Isolate.spawn(worker, mainReceivePort.sendPort);

  // 获取 Worker 的 SendPort
  SendPort workerSendPort = await mainReceivePort.first;

  // 发送消息给 Worker
  workerSendPort.send(42);

  // 接收结果
  var result = await mainReceivePort.first;
  print('结果：$result'); // 结果：1764

  mainReceivePort.close();
}
```

## 实际案例

```dart
/// 带缓存的异步数据加载器
class AsyncCache<T> {
  final Future<T> Function() _fetcher;
  T? _cached;
  bool _loading = false;
  final List<void Function(T)> _pending = [];

  AsyncCache(this._fetcher);

  Future<T> get() async {
    if (_cached != null) return _cached!;

    if (_loading) {
      // 等待当前加载完成
      return await Future.delayed(
        Duration.zero,
        () => get(),
      );
    }

    _loading = true;
    try {
      _cached = await _fetcher();
      return _cached!;
    } finally {
      _loading = false;
    }
  }

  void invalidate() => _cached = null;
}

void main() async {
  var cache = AsyncCache(() async {
    print('正在获取数据...');
    await Future.delayed(Duration(seconds: 2));
    return '服务器数据';
  });

  // 第一次：实际加载
  print(await cache.get()); // 正在获取数据... 服务器数据

  // 第二次：使用缓存
  print(await cache.get()); // 服务器数据（不打印"正在获取数据"）

  // 清除缓存
  cache.invalidate();
  print(await cache.get()); // 重新加载
}
```
