---
order: 17
---

# Dart 网络编程

[官方文档](https://api.dart.dev/stable/dart-io/dart-io-library.html)

Dart 标准库 `dart:io` 提供了 TCP、UDP、HTTP、WebSocket 等网络协议支持。

## 相关库

| 库 | 说明 | 链接 |
|----|------|------|
| `dart:io` | 标准库（TCP/UDP/HTTP/WebSocket） | 内置 |
| `package:http` | 轻量级 HTTP 客户端 | [pub.dev](https://pub.dev/packages/http) |
| `package:dio` | 功能强大的 HTTP 客户端（Flutter 首选） | [pub.dev](https://pub.dev/packages/dio) |
| `package:shelf` | HTTP 服务器中间件 | [pub.dev](https://pub.dev/packages/shelf) |
| `package:web_socket_channel` | WebSocket 封装 | [pub.dev](https://pub.dev/packages/web_socket_channel) |

## TCP

### TCP 服务端

```dart
import 'dart:convert';
import 'dart:io';

Future<void> startTCPServer() async {
  var server = await ServerSocket.bind(InternetAddress.loopbackIPv4, 8081);
  print('TCP 服务端已启动：${server.port}');

  await for (var socket in server) {
    print('新连接：${socket.remoteAddress.address}:${socket.remotePort}');

    // 接收数据
    socket.cast<List<int>>().transform(utf8.decoder).listen((data) {
      print('收到：$data');
      socket.write('已收到：$data');
    });

    // 连接关闭
    socket.done.then((_) {
      print('连接已关闭');
    });
  }
}

void main() => startTCPServer();
```

### TCP 客户端

```dart
import 'dart:convert';
import 'dart:io';

Future<void> startTCPClient() async {
  var socket = await Socket.connect('127.0.0.1', 8081);
  print('已连接到服务器');

  // 发送数据
  socket.write('你好，服务器！');

  // 接收响应
  socket.cast<List<int>>().transform(utf8.decoder).listen((data) {
    print('服务器响应：$data');
  });

  // 发送更多
  socket.writeln('第二条消息');
  socket.add(utf8.encode('第三条消息'));
}

void main() => startTCPClient();
```

## UDP

### UDP 服务端

```dart
import 'dart:convert';
import 'dart:io';

Future<void> startUDPServer() async {
  var socket = await RawDatagramSocket.bind(
      InternetAddress.loopbackIPv4, 8081);
  print('UDP 服务端已启动');

  await for (var event in socket) {
    if (event == RawSocketEvent.read) {
      var packet = socket.receive();
      if (packet != null) {
        print('收到：${utf8.decode(packet.data)} 来自：${packet.address}');

        // 回复
        socket.send(
          utf8.encode('已收到'),
          packet.address,
          packet.port,
        );
      }
    }
  }
}
```

### UDP 客户端

```dart
import 'dart:convert';
import 'dart:io';

Future<void> startUDPClient() async {
  var socket = await RawDatagramSocket.bind(
      InternetAddress.loopbackIPv4, 8082);

  // 发送数据
  socket.send(
    utf8.encode('你好，UDP 服务器！'),
    InternetAddress('127.0.0.1'),
    8081,
  );

  // 接收响应
  await for (var event in socket) {
    if (event == RawSocketEvent.read) {
      var packet = socket.receive();
      if (packet != null) {
        print('收到：${utf8.decode(packet.data)}');
        break;
      }
    }
  }
}
```

## HTTP

### HTTP 服务端

```dart
import 'dart:convert';
import 'dart:io';

Future<void> startHttpServer() async {
  var server = await HttpServer.bind(
      InternetAddress.loopbackIPv4, 8080);
  print('HTTP 服务端已启动：http://localhost:8080');

  await for (var request in server) {
    // 解析路径
    var path = request.uri.path;

    // 路由处理
    if (path == '/') {
      request.response.write('Welcome to Dart Server!');
    } else if (path.startsWith('/greet/')) {
      var name = path.split('/').last;
      request.response.write('Hello, $name!');
    } else if (path == '/json') {
      request.response
        ..headers.contentType = ContentType.json
        ..write(jsonEncode({
          'status': 'ok',
          'message': 'Hello JSON',
        }));
    } else {
      request.response.statusCode = HttpStatus.notFound;
      request.response.write('404 Not Found');
    }

    await request.response.close();
  }
}
```

### HTTP 客户端（标准库）

```dart
import 'dart:convert';
import 'dart:io';

void main() async {
  var client = HttpClient();

  try {
    // GET 请求
    var request = await client.getUrl(
      Uri.parse('https://api.github.com/users/dart-lang'),
    );

    // 设置请求头
    request.headers.set('User-Agent', 'Dart Client');

    var response = await request.close();

    // 读取响应
    var body = await response.transform(utf8.decoder).join();
    print('状态码：${response.statusCode}');
    print('响应体：$body');
  } finally {
    client.close();
  }
}
```

### HTTP 客户端（package:http — 推荐）

```dart
import 'package:http/http.dart' as http;

void main() async {
  // GET
  var response = await http.get(
    Uri.parse('https://api.example.com/users'),
    headers: {'Authorization': 'Bearer token'},
  );
  print('状态码：${response.statusCode}');
  print('响应：${response.body}');

  // POST
  var postResponse = await http.post(
    Uri.parse('https://api.example.com/users'),
    headers: {'Content-Type': 'application/json'},
    body: '{"name": "张三", "age": 25}',
  );
  print(postResponse.body);
}
```

### HTTP 客户端（dio — Flutter 首选）

```dart
import 'package:dio/dio.dart';

void main() async {
  var dio = Dio(BaseOptions(
    baseUrl: 'https://api.example.com',
    connectTimeout: Duration(seconds: 5),
    receiveTimeout: Duration(seconds: 3),
  ));

  try {
    // GET
    var response = await dio.get('/users',
      queryParameters: {'page': 1, 'limit': 10},
    );
    print(response.data);

    // POST
    var postResponse = await dio.post('/users',
      data: {'name': '张三', 'age': 25},
    );
    print(postResponse.data);
  } on DioException catch (e) {
    print('请求失败：${e.message}');
  }
}
```

## WebSocket

### WebSocket 服务端

```dart
import 'dart:io';

Future<void> startWebSocketServer() async {
  var server = await HttpServer.bind(
      InternetAddress.loopbackIPv4, 8083);
  print('WebSocket 服务端已启动：ws://localhost:8083/ws');

  await for (var request in server) {
    if (request.uri.path == '/ws') {
      // 升级为 WebSocket 连接
      var socket = await WebSocketTransformer.upgrade(request);
      print('WebSocket 连接建立：${request.connectionInfo?.remoteAddress}');

      // 监听消息
      socket.listen(
        (data) {
          print('收到：$data');
          socket.add('服务器已收到：$data');
        },
        onDone: () => print('连接关闭'),
      );
    }
  }
}
```

### WebSocket 客户端

```dart
import 'dart:io';

void main() async {
  var socket = await WebSocket.connect('ws://127.0.0.1:8083/ws');
  print('已连接到 WebSocket 服务器');

  // 发送消息
  socket.add('你好，WebSocket！');
  socket.add('第二条消息');

  // 接收消息
  await for (var data in socket) {
    print('服务器：$data');
    if (data == 'bye') {
      await socket.close();
      break;
    }
  }
}
```

## 实际案例

### HTTP 服务端 REST API

```dart
import 'dart:convert';
import 'dart:io';

Future<void> main() async {
  var server = await HttpServer.bind(
      InternetAddress.loopbackIPv4, 8080);

  var users = <int, String>{};

  await for (var req in server) {
    try {
      await handleRequest(req, users);
    } catch (e) {
      req.response.statusCode = 500;
      req.response.write('Server Error');
    } finally {
      await req.response.close();
    }
  }
}

Future<void> handleRequest(
    HttpRequest req, Map<int, String> users) async {
  switch (req.method) {
    case 'GET':
      req.response
        ..headers.contentType = ContentType.json
        ..write(jsonEncode(users));
      break;

    case 'POST':
      var body = await req.transform(utf8.decoder).join();
      var data = jsonDecode(body) as Map;
      var id = users.length + 1;
      users[id] = data['name'] as String;
      req.response.statusCode = 201;
      req.response.write('Created user $id');
      break;

    case 'DELETE':
      users.clear();
      req.response.write('All deleted');
      break;

    default:
      req.response.statusCode = 405;
      req.response.write('Method not allowed');
  }
}
```
