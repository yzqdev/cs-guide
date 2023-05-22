# 升级dart

注意:如果更新出现错误,就Go inside the flutter/bin folder and delete the cache folder. 然后重新flutter upgrade,让他自己下载dartsdk,
如果无法解压,就安装一下7z->`scoop install 7zip`

dart sdk下载地址<https://storage.flutter-io.cn/dart-archive/channels/stable/release/2.8.3/sdk/dartsdk-windows-x64-release.zip>

:::tip
下面格式
`https://storage.flutter-io.cn/dart-archive/channels/<stable|beta|dev>/release/<version>/sdk/dartsdk-<platform>-<architecture>-release.zip`

例子

- <https://storage.flutter-io.cn/dart-archive/channels/stable/release/2.7.2/sdk/dartsdk-windows-ia32-release.zip>
- <https://storage.flutter-io.cn/dart-archive/channels/stable/release/2.1.1/sdk/dartsdk-macos-x64-release.zip>
- <https://storage.flutter-io.cn/dart-archive/channels/beta/release/2.8.0-20.11.beta/sdk/dartsdk-linux-x64-release.zip>
- <https://storage.flutter-io.cn/dart-archive/channels/dev/release/2.9.0-1.0.dev/sdk/dartsdk-linux-x64-release.zip>

flutter更新地址

<https://storage.flutter-io.cn/flutter_infra_release/releases/stable/windows/flutter_windows_3.3.5-stable.zip>
:::

## 升级dart到2.12

- @required改为required
- 可以为null的类型使用string?修饰

## 组件被废弃

FlatButton被TextButton替代

this is c++ demo code
::: code-tabs#cpp

@tab c++

```cpp
#include <iostream>
using namespace std;
 
int main() 
{
    cout << "Hello, World!";
    return 0;
}
```

@tab dart

```dart
import 'dart:io';
import 'package:crypto/crypto.dart' as crypto;
import 'dart:typed_data';

bool isPhone(String input) {
  RegExp pathReg = RegExp(r"\.\\");
  return pathReg.hasMatch(input);
}
```

:::
