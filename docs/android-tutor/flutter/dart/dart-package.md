# dart基础

## 版本管理

[官网](https://dart.dev/tools/pub/versioning)

配置环境变量

flutter默认的cache在`D:\flutter\.pub-cache`
dart默认的cache在`%LOCALAPPDATA%\Pub\Cache`
所以要想让dart使用flutter的cache路径,需要设置环境变量`PUB_CACHE`

```text
PUB_CACHE
这个变量决定了 pub get 下载的依赖包存在到的位置，默认一般在当前用户的目录下面，可以通过环境变量修改默认位置.

PUB_HOSTED_URL
这个变量了指定 pub get 从哪里下载依赖包的资源，默认为 pub.dev，但国内经常出现无法访问的情况，因此可以通过设置环境变量指定镜像地址。
```

比如我设置的`PUB_CACHE`就是`D:\flutter\.pub-cache`,这样下载依赖就不会下载到`%LOCALAPPDATA%\Pub\Cache`去了

## 编译为exe

见文档 [https://dart.dev/tools/dart-compile](https://dart.dev/tools/dart-compile)

例子

## 获取文件的md5

js

```js
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const buffer = fs.readFileSync(path.join(__dirname, 'app.apk'));
const hash = crypto.createHash('md5');
hash.update(buffer, 'utf8');
const md5 = hash.digest('hex');
console.log(md5);
```

dart

```powershell
# 运行
dart run bin\md5.dart
# 编译exe
dart compile exe bin\md5.dart
```

```dart
import 'dart:io';
import 'package:crypto/crypto.dart' as crypto;
import 'dart:typed_data';

bool isPhone(String input) {
  RegExp pathReg = RegExp(r"\.\\");
  return pathReg.hasMatch(input);
}

void main(List<String> arguments) async {

  var filePath = arguments[0] ;
  if(isPhone(filePath)){
    filePath=arguments[0].substring(2);

  }
  print(filePath);
  File file = File(filePath);

  try {
    final fileStream = file.openRead();
    var md5 = crypto.md5;
    final checksum = (await md5.bind(fileStream).first).toString();
    print(checksum);
  } catch (e) {
    print(e);
    print("找不到文件");
  }
}

```
