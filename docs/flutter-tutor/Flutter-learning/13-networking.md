---
order: 13
---

# 网络请求

## 1. 添加依赖

```yaml
dependencies:
  http: ^1.1.0 # 基础 HTTP 请求
  dio: ^5.4.0 # 功能丰富的 HTTP 客户端
```

## 2. HTTP 包基础用法

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'https://jsonplaceholder.typicode.com';

  // GET 请求
  Future<List<dynamic>> getPosts() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/posts'));

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('加载帖子失败: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('网络错误: $e');
    }
  }

  // POST 请求
  Future<Map<String, dynamic>> createPost(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/posts'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(data),
    );

    if (response.statusCode == 201) {
      return json.decode(response.body);
    }
    throw Exception('创建帖子失败');
  }

  // PUT 请求
  Future<Map<String, dynamic>> updatePost(int id, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/posts/$id'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(data),
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    throw Exception('更新帖子失败');
  }

  // DELETE 请求
  Future<void> deletePost(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/posts/$id'));

    if (response.statusCode != 200) {
      throw Exception('删除帖子失败');
    }
  }
}
```

## 3. Dio 高级用法

### 初始化

```dart
import 'package:dio/dio.dart';

class DioClient {
  late final Dio _dio;

  DioClient() {
    _dio = Dio(
      BaseOptions(
        baseUrl: 'https://api.example.com',
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    // 添加拦截器
    _dio.interceptors.addAll([
      LogInterceptor(
        requestBody: true,
        responseBody: true,
      ),
      AuthInterceptor(),
    ]);
  }

  Future<Response> get(String path, {Map<String, dynamic>? params}) async {
    return _dio.get(path, queryParameters: params);
  }

  Future<Response> post(String path, {dynamic data}) async {
    return _dio.post(path, data: data);
  }

  Future<Response> put(String path, {dynamic data}) async {
    return _dio.put(path, data: data);
  }

  Future<Response> delete(String path) async {
    return _dio.delete(path);
  }
}
```

### 拦截器

```dart
class AuthInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    // 添加 Token
    options.headers['Authorization'] = 'Bearer $token';
    handler.next(options);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    // 统一响应处理
    if (response.statusCode == 401) {
      // Token 过期，跳转到登录页
    }
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    // 统一错误处理
    if (err.type == DioExceptionType.connectionTimeout) {
      // 连接超时
    }
    handler.next(err);
  }
}
```

### 错误处理

```dart
class ApiException implements Exception {
  final int? statusCode;
  final String message;

  ApiException({this.statusCode, required this.message});

  @override
  String toString() => 'ApiException($statusCode): $message';
}

class ErrorHandler {
  static ApiException handleDioError(DioException e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
        return ApiException(message: '连接超时，请检查网络');
      case DioExceptionType.sendTimeout:
        return ApiException(message: '发送超时');
      case DioExceptionType.receiveTimeout:
        return ApiException(message: '接收超时');
      case DioExceptionType.badResponse:
        return ApiException(
          statusCode: e.response?.statusCode,
          message: _handleStatusCode(e.response?.statusCode),
        );
      case DioExceptionType.cancel:
        return ApiException(message: '请求已取消');
      default:
        return ApiException(message: '网络错误，请稍后重试');
    }
  }

  static String _handleStatusCode(int? statusCode) {
    switch (statusCode) {
      case 400: return '请求参数错误';
      case 401: return '未授权，请重新登录';
      case 403: return '访问被拒绝';
      case 404: return '资源未找到';
      case 500: return '服务器内部错误';
      default: return '请求失败 ($statusCode)';
    }
  }
}
```

## 4. 数据模型与序列化

```dart
// 手动序列化
class User {
  final int id;
  final String name;
  final String email;

  User({required this.id, required this.name, required this.email});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'email': email,
  };
}

// 使用 json_serializable（推荐）
// 添加到 pubspec.yaml:
// dependencies: json_annotation: ^4.8.1
// dev_dependencies: json_serializable: ^6.7.1, build_runner: ^2.4.8

import 'package:json_annotation/json_annotation.dart';
part 'user.g.dart';

@JsonSerializable()
class User {
  final int id;
  final String name;
  final String email;

  @JsonKey(name: 'created_at')
  final DateTime? createdAt;

  User({required this.id, required this.name, required this.email, this.createdAt});

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}

// 生成代码
// flutter pub run build_runner build
```

## 5. 网络状态监听

```dart
import 'package:connectivity_plus/connectivity_plus.dart';

class NetworkConnectivity {
  static final Connectivity _connectivity = Connectivity();

  static Stream<bool> get onStatusChange {
    return _connectivity.onConnectivityChanged.map((result) {
      return result != ConnectivityResult.none;
    });
  }

  static Future<bool> checkConnectivity() async {
    final result = await _connectivity.checkConnectivity();
    return result != ConnectivityResult.none;
  }
}

// 使用示例
class NetworkAwareWidget extends StatefulWidget {
  @override
  State<NetworkAwareWidget> createState() => _NetworkAwareWidgetState();
}

class _NetworkAwareWidgetState extends State<NetworkAwareWidget> {
  bool _isConnected = true;

  @override
  void initState() {
    super.initState();
    NetworkConnectivity.onStatusChange.listen((isConnected) {
      setState(() => _isConnected = isConnected);
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_isConnected) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.wifi_off, size: 64, color: Colors.grey),
            SizedBox(height: 16),
            Text('没有网络连接'),
          ],
        ),
      );
    }
    return const DataWidget();
  }
}
```

## 6. 请求重试机制

```dart
Future<T> retryRequest<T>({
  required Future<T> Function() request,
  int maxRetries = 3,
  Duration delay = const Duration(seconds: 2),
}) async {
  int attempt = 0;
  while (true) {
    try {
      return await request();
    } catch (e) {
      attempt++;
      if (attempt >= maxRetries) rethrow;
      await Future.delayed(delay * attempt);
    }
  }
}

// 使用
final data = await retryRequest(
  request: () => apiService.getPosts(),
  maxRetries: 3,
);
```

## 7. 缓存策略

```dart
class CacheManager {
  static final Map<String, CacheEntry> _cache = {};

  T? get<T>(String key) {
    final entry = _cache[key];
    if (entry == null) return null;
    if (entry.isExpired) {
      _cache.remove(key);
      return null;
    }
    return entry.data as T;
  }

  void set(String key, dynamic data, {Duration ttl = const Duration(minutes: 5)}) {
    _cache[key] = CacheEntry(data: data, expiry: DateTime.now().add(ttl));
  }

  void clear() => _cache.clear();
}

class CacheEntry {
  final dynamic data;
  final DateTime expiry;

  CacheEntry({required this.data, required this.expiry});
  bool get isExpired => DateTime.now().isAfter(expiry);
}
```
