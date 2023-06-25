# flutter安卓更新

### 应用程序升级流程

由于在 IOS 中没法直接下载安装，如果版本不一致则直接跳转到IOS应用对应的应用市场就可以了，所以本文仅介绍Android App的升级流程。

**Android App升级流程：**

1. 获取本地版本号；

2. 请求[服务器](https://cloud.tencent.com/product/cvm?from=10680)获取服务器版本号；

3. 如果本地版本和服务器版本不一致则提示升级，弹窗提示用户是否更新；

4. 用户确定升级，调用文件传输方法下载apk文件；

5. 监听下载进度；

6. 下载完成打开apk进行安装。

### 2.  Android 升级 App 涉及的 API 库

|名称|作用|地址|
|---|---|---|
|package_info|获取版本信息|地址|
|path_provider|获取文件存储位置|地址|
|flutter_downloader|文件下载|地址|
|open_file|打开文件|地址|

### 3. 获取版本信息

<https://pub.flutter-io.cn/packages/package_info>

1. 安装插件

```dart
dependencies:
  package_info: ^0.4.3+4
```

在pubspec.yaml中配置保存后，在VS Code环境中会自动下载依赖包。

如果无法正常下载，执行 flutter pub get 。

2. 引入并使用

```dart
// 引入获取版本信息包
import 'package:package_info/package_info.dart';

PackageInfo packageInfo = await PackageInfo.fromPlatform();
String appName = packageInfo.appName;
String packageName = packageInfo.packageName;
String version = packageInfo.version;
String buildNumber = packageInfo.buildNumber;

// 应用名称
print("appName:${appName}");
// 包名称
print("packageName:${packageName}");
// 版本号
print("version:${version}");
// 构建编号
print("buildNumber:${buildNumber}");
```

### 4. 获取[文件存储](https://cloud.tencent.com/product/cfs?from=10680)路径

<https://pub.flutter-io.cn/packages/path_provider>

1. 安装插件

```dart
dependencies:
  path_provider: ^1.6.27
```

在pubspec.yaml中配置保存后，在VS Code环境中会自动下载依赖包。

如果无法正常下载，执行 flutter pub get 。

2. 引入并使用

```dart
// 引入获取文件存储路径的包
import 'package:path_provider/path_provider.dart';

Directory tempDir = await getTemporaryDirectory();
String tempPath = tempDir.path;

Directory appDocDir = await getApplicationDocumentsDirectory();
String appDocPath = appDocDir.path;

var directory = await getExternalStorageDirectory();

String storageDirectory = directory.path;
// 获取临时目录
print("tempPath:${tempPath}");
// 获取应用的安装目录
print("appDocDir:${appDocPath}");
// 获取存储卡的路径
print("StorageDirectory:${storageDirectory}");
```

### 5. 文件下载

<https://pub.flutter-io.cn/packages/flutter_downloader>

1. 安装插件

```dart
dependencies:
  flutter_downloader: ^1.5.2
```

在pubspec.yaml中配置保存后，在VS Code环境中会自动下载依赖包。

如果无法正常下载，执行 flutter pub get 。

2. 配置权限

![img](https://ask.qcloudimg.com/http-save/yehe-7992912/upp00rg5gr.png?imageView2/2/w/1620)

代码如下：

```dart
<!-- 配置下载与安装相关的权限 -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
```

其它配置：

![img](https://ask.qcloudimg.com/http-save/yehe-7992912/t5rxesp89j.png?imageView2/2/w/1620)

代码如下：

```dart
<!-- 处理在Android上打开下载文件的通知上的点击操作-->
<provider
    android:name="vn.hunghd.flutterdownloader.DownloadedFileProvider"
    android:authorities="${applicationId}.flutter_downloader.provider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/provider_paths"/>
</provider>
<!-- 配置最大并发任务数:插件依赖于WorkManager库 -->
<provider
    android:name="androidx.work.impl.WorkManagerInitializer"
    android:authorities="${applicationId}.workmanager-init"
    tools:node="remove" />
<provider
    android:name="vn.hunghd.flutterdownloader.FlutterDownloaderInitializer"
    android:authorities="${applicationId}.flutter-downloader-init"
    android:exported="false">
    <!-- 设定数字以配置最大并发任务数 -->
    <meta-data
        android:name="vn.hunghd.flutterdownloader.MAX_CONCURRENT_TASKS"
        android:value="5" />
</provider>
```

3. 引入并使用

```dart
// 引入获取文件路径的包（提前安装）
import 'package:path_provider/path_provider.dart';
// 引入文件下载的包
import 'package:flutter_downloader/flutter_downloader.dart';

// 获取存储卡的路径
final directory = await getExternalStorageDirectory();
String _localPath = directory.path;


await FlutterDownloader.enqueue(
    // 远程的APK地址（注意：安卓9.0以上后要求用https）
    url: "http://www.ionic.wang/shop.apk",
    // 下载保存的路径
    savedDir: _localPath,
    // 是否在手机顶部显示下载进度（仅限安卓）
    showNotification:true,   
    // 是否允许下载完成点击打开文件（仅限安卓）      
    openFileFromNotification:true, 
);

FlutterDownloader.registerCallback((id, status, progress){
    print(status);
    print(progress);
});
```

### 6.  打开文件

<https://pub.flutter-io.cn/packages/open_file>

1. 安装插件

```dart
dependencies:
  open_file: ^3.0.3
```

在pubspec.yaml中配置保存后，在VS Code环境中会自动下载依赖包。

如果无法正常下载，执行 flutter pub get 。

2. 引入并使用

```dart
// 引入打开文件的包
import 'package:open_file/open_file.dart';
// 引入获取文件路径的包（提前安装）
import 'package:path_provider/path_provider.dart';

// 获取存储卡的路径
final directory = await getExternalStorageDirectory();
String _localPath = directory.path;

// 打开文件,apk的名称需要与下载时对应
OpenFile.open("${_localPath}/shop.apk");
```

### 7. 替换版本

安装包下载安装后，默认会生成一个新的版本，并不会覆盖原有的应用程序，为此，需要提前做一些版本号的配置。

```dart
<!-- android/app/src/min/AndroidManifest.xml -->
<manifest 
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.my_app" 
    android:versionCode="2" 
    android:versionName="0.0.2">
    
    ......

</manifest>
```

上面的代码在打包时，注意事项如下：

1. package的值不能变，即包名不能变；

2. android:versionCode的值要增加；

3. android:versionName的值要增加。

另外，上面代码中配置的版本号在 [package_info](https://pub.flutter-io.cn/packages/package_info) 这个插件中是无法获取的，所以还需要在pubspec.yaml配置同样的版本信息，这样才能获取版本信息进行对比。

```dart
# pubspec.yaml
version: 0.0.2+2
```

上面的代码中0.0.2对应的是android:versionName的值，+2对应的是android:versionCode的值。

完成上面这些步骤，就可以开始开始正式打包了。
