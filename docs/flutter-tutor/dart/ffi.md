# Dart FFI 使用

[官方文档](https://dart.dev/interop/c-interop)

FFI（Foreign Function Interface）允许 Dart 直接调用 C 语言代码，实现高性能计算或复用现有 C 库。

## 环境准备

### 编译器环境

安装 GCC 编译器（Windows 推荐 MinGW-W64）：

- 下载 [MinGW-W64](https://sourceforge.net/projects/mingw-w64/files/)
- 选择 `seh` 异常处理模式（性能好），安装后配置环境变量
- 验证：`gcc -v`

### Dart SDK

Dart 2.12+ 内置 `dart:ffi` 库，无需额外安装。

```bash
dart --version  # 确保 >= 2.12
```

## 基本流程

1. 编写 C 代码 → 编译为动态库（.dll/.so/.dylib）
2. 在 Dart 中加载动态库
3. 定义函数签名映射
4. 调用 C 函数

## 简单示例

### C 代码

```c
// src/test.c
#include <windows.h>

int add(int a, int b) {
    return a + b;
}

void showBox() {
    MessageBox(NULL, "Hello Dart", "Title", MB_OK);
}
```

```bash
# 编译为动态库
cd src
gcc test.c -shared -o test.dll
```

### Dart 代码

```dart
// bin/main.dart
import 'dart:ffi' as ffi;
import 'dart:io' show Platform;

// Native 函数签名（对应 C 类型）
typedef NativeAdd = ffi.Int32 Function(ffi.Int32, ffi.Int32);
typedef NativeShow = ffi.Void Function();

// Dart 函数签名（对应 Dart 类型）
typedef DartAdd = int Function(int, int);
typedef DartShow = void Function();

void main() {
  if (Platform.isWindows) {
    // 加载动态库
    ffi.DynamicLibrary dl =
        ffi.DynamicLibrary.open('src/test.dll');

    // 查找并转换函数
    var add = dl.lookupFunction<NativeAdd, DartAdd>('add');
    var showBox = dl.lookupFunction<NativeShow, DartShow>('showBox');

    print(add(8, 9)); // 17
    showBox();         // 弹出消息框
  }
}
```

## 字符串处理

### 使用 `Pointer<Utf8>`（推荐，Dart 2.12+）

```c
// src/encrypt.c
#include <string.h>

#define KEY 'x'

void encrypt(char *str, char *out, int out_len) {
    int len = strlen(str);
    for (int i = 0; i < len && i < out_len; i++) {
        out[i] = str[i] ^ KEY;
    }
    if (out_len > len) out[len] = '\0';
    else out[out_len] = '\0';
}

void decrypt(char *str, char *out, int out_len) {
    // 异或加密是对称的，解密与加密相同
    int len = strlen(str);
    for (int i = 0; i < len && i < out_len; i++) {
        out[i] = str[i] ^ KEY;
    }
    if (out_len > len) out[len] = '\0';
    else out[out_len] = '\0';
}
```

```bash
gcc src/encrypt.c -shared -o src/encrypt.dll
```

### Dart 调用字符串函数

```dart
import 'dart:ffi';
import 'package:ffi/ffi.dart'; // 需要 pub add ffi

typedef NativeEncrypt = Void Function(
    Pointer<Utf8>, Pointer<Utf8>, Int32);
typedef DartEncrypt = void Function(
    Pointer<Utf8>, Pointer<Utf8>, int);

void main() {
  final dl = DynamicLibrary.open('src/encrypt.dll');

  final encrypt = dl.lookupFunction<NativeEncrypt, DartEncrypt>('encrypt');
  final decrypt = dl.lookupFunction<NativeEncrypt, DartEncrypt>('decrypt');

  // 分配 Dart 字符串并转为 C 字符串
  final data = 'Hello, World!'.toNativeUtf8();
  final out = calloc<Uint8>(100);
  final outPtr = out.cast<Utf8>();

  // 加密
  encrypt(data, outPtr, 100);
  print('加密后：${outPtr.toDartString()}');

  // 解密
  final result = calloc<Uint8>(100);
  final resultPtr = result.cast<Utf8>();
  decrypt(outPtr, resultPtr, 100);
  print('解密后：${resultPtr.toDartString()}');

  // 释放内存
  calloc.free(data);
  calloc.free(out);
  calloc.free(result);
}
```

### 内存管理

```dart
import 'dart:ffi';
import 'package:ffi/ffi.dart';

class NativeAllocator {
  final List<Pointer> _allocations = [];

  Pointer<T> alloc<T extends NativeType>(int count) {
    final ptr = calloc<T>(count);
    _allocations.add(ptr);
    return ptr;
  }

  Pointer<Utf8> allocString(String str) {
    final ptr = str.toNativeUtf8(allocator: calloc);
    _allocations.add(ptr);
    return ptr;
  }

  void dispose() {
    for (final ptr in _allocations) {
      calloc.free(ptr);
    }
    _allocations.clear();
  }
}

// 使用
void main() {
  final alloc = NativeAllocator();
  try {
    final str = alloc.allocString('测试');
    print(str.toDartString());
  } finally {
    alloc.dispose();
  }
}
```

## 完整示例：调用系统 API

```dart
import 'dart:ffi';

// 获取当前进程 ID
final kernel32 = DynamicLibrary.open('kernel32.dll');
final getProcId = kernel32.lookupFunction<
    Int32 Function(),
    int Function()>('GetCurrentProcessId');

void main() {
  print('PID: ${getProcId()}');
}
```

## 常用类型映射

| C 类型 | Native 签名 | Dart 签名 |
|--------|-------------|-----------|
| `int` | `Int32` / `Int64` | `int` |
| `float` | `Float` | `double` |
| `double` | `Double` | `double` |
| `char*` | `Pointer<Utf8>` | `Pointer<Utf8>` |
| `void*` | `Pointer<Void>` | `Pointer<Void>` |
| `void` | `Void` | `void` |
| `int*` | `Pointer<Int32>` | `Pointer<Int32>` |
| `struct` | `Pointer<Struct>` | `Pointer<Struct>` |

## 注意事项

1. **内存管理**：`Pointer.fromNativeUtf8()` 分配的内存必须手动释放
2. **平台差异**：Windows 用 `.dll`，Linux 用 `.so`，macOS 用 `.dylib`
3. **AOT 编译**：使用 `dart:ffi` 后仍可 AOT 编译（Dart 2.12+）
4. **推荐包**：添加 `ffi` 包到 pubspec：`dart pub add ffi`

## 参考

- [dart:ffi 官方文档](https://dart.dev/interop/c-interop)
- [package:ffi](https://pub.dev/packages/ffi)
- [FFI 示例：SQLite](https://github.com/dart-lang/samples/tree/main/ffi)
