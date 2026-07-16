---
order: 18
---

# 平台通道

## 1. 什么是平台通道

Flutter 通过 **MethodChannel** 与原生平台（Android/iOS/Windows/Mac）通信，以调用平台特定的 API。

```
Flutter (Dart)  <===>  MethodChannel  <===>  原生 (Kotlin/Swift)
```

## 2. 基本通信流程

### Flutter 端（Dart）

```dart
import 'package:flutter/services.dart';

class BatteryService {
  static const platform = MethodChannel('com.example.app/battery');

  static Future<int> getBatteryLevel() async {
    try {
      final result = await platform.invokeMethod<int>('getBatteryLevel');
      return result ?? -1;
    } on PlatformException catch (e) {
      throw Exception("获取电量失败: ${e.message}");
    }
  }
}
```

### Android 端（Kotlin - MainActivity.kt）

```kotlin
import android.os.BatteryManager
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
    private val CHANNEL = "com.example.app/battery"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            CHANNEL
        ).setMethodCallHandler { call, result ->
            if (call.method == "getBatteryLevel") {
                val batteryLevel = getBatteryLevel()
                if (batteryLevel != -1) {
                    result.success(batteryLevel)
                } else {
                    result.error("UNAVAILABLE", "无法获取电量", null)
                }
            } else {
                result.notImplemented()
            }
        }
    }

    private fun getBatteryLevel(): Int {
        val batteryManager = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
        return batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    }
}
```

### iOS 端（Swift - AppDelegate.swift）

```swift
import UIKit
import Flutter

@main
@objc class AppDelegate: FlutterAppDelegate {
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        let controller = window?.rootViewController as! FlutterViewController
        let batteryChannel = FlutterMethodChannel(
            name: "com.example.app/battery",
            binaryMessenger: controller.binaryMessenger
        )

        batteryChannel.setMethodCallHandler { (call, result) in
            if call.method == "getBatteryLevel" {
                let device = UIDevice.current
                device.isBatteryMonitoringEnabled = true
                if device.batteryState == .unknown {
                    result(FlutterError(code: "UNAVAILABLE", message: "电量信息不可用", details: nil))
                } else {
                    result(Int(device.batteryLevel * 100))
                }
            } else {
                result(FlutterMethodNotImplemented)
            }
        }

        GeneratedPluginRegistrant.register(with: self)
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
}
```

## 3. 传递复杂数据

```dart
// Dart 端
class DeviceInfoService {
  static const platform = MethodChannel('com.example.app/device');

  static Future<Map<String, dynamic>> getDeviceInfo() async {
    try {
      final result = await platform.invokeMethod<Map>('getDeviceInfo');
      return result?.cast<String, dynamic>() ?? {};
    } on PlatformException catch (e) {
      return {'error': e.message};
    }
  }
}

// Android (Kotlin)
MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
    if (call.method == "getDeviceInfo") {
        val info = mapOf(
            "deviceName" to Build.MODEL,
            "osVersion" to Build.VERSION.RELEASE,
            "sdkVersion" to Build.VERSION.SDK_INT,
            "manufacturer" to Build.MANUFACTURER,
        )
        result.success(info)
    } else {
        result.notImplemented()
    }
}
```

## 4. EventChannel - 事件流

```dart
// Dart 端
class SensorService {
  static const eventChannel = EventChannel('com.example.app/sensors');

  static Stream<Map<String, dynamic>> get accelerometerStream {
    return eventChannel.receiveBroadcastStream().map((event) {
      return (event as List).map((e) => e as double).toList();
    }).map((data) => {
      'x': data[0],
      'y': data[1],
      'z': data[2],
    });
  }
}

// 使用
SensorService.accelerometerStream.listen((data) {
  print('加速度计: x=${data['x']}, y=${data['y']}, z=${data['z']}');
});
```

## 5. 常用平台插件

### 官方插件

```yaml
dependencies:
  url_launcher: ^6.2.2 # 打开 URL/拨号
  camera: ^0.10.5 # 相机
  image_picker: ^1.0.4 # 图片选择器
  geolocator: ^10.1.0 # 定位
  geocoding: ^2.1.1 # 地理编码
  local_auth: ^2.1.8 # 生物识别认证
  share_plus: ^7.2.1 # 分享
  path_provider: ^2.1.1 # 文件路径
  connectivity_plus: ^5.0.2 # 网络连接
  device_info_plus: ^9.1.0 # 设备信息
  package_info_plus: ^5.0.1 # 应用信息
  vibration: ^1.8.4 # 震动
  sensors_plus: ^2.0.1 # 传感器
  permission_handler: ^11.1.0 # 权限管理
```

### url_launcher 示例

```dart
import 'package:url_launcher/url_launcher.dart';

class LinkService {
  static Future<void> openUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  static Future<void> makePhoneCall(String phoneNumber) async {
    final uri = Uri.parse('tel:$phoneNumber');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  static Future<void> sendEmail(String email) async {
    final uri = Uri.parse('mailto:$email');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }
}
```

### image_picker 示例

```dart
import 'package:image_picker/image_picker.dart';

class ImageService {
  static final _picker = ImagePicker();

  static Future<XFile?> pickFromGallery() async {
    return _picker.pickImage(source: ImageSource.gallery);
  }

  static Future<XFile?> takePhoto() async {
    return _picker.pickImage(source: ImageSource.camera);
  }

  static Future<List<XFile>> pickMultipleImages() async {
    return _picker.pickMultiImage();
  }
}
```

## 6. 权限处理

```yaml
dependencies:
  permission_handler: ^11.1.0
```

```dart
import 'package:permission_handler/permission_handler.dart';

class PermissionService {
  static Future<bool> requestCameraPermission() async {
    final status = await Permission.camera.request();
    return status.isGranted;
  }

  static Future<bool> requestLocationPermission() async {
    final status = await Permission.locationWhenInUse.request();
    return status.isGranted;
  }

  static Future<bool> checkPermission(Permission permission) async {
    return permission.status.isGranted;
  }

  static Future<bool> requestNotificationPermission() async {
    final status = await Permission.notification.request();
    return status.isGranted;
  }

  static Future<bool> requestStoragePermission() async {
    final status = await Permission.storage.request();
    return status.isGranted;
  }

  /// 打开应用设置
  static Future<void> openSettings() async {
    await openAppSettings();
  }
}

// 使用
Future<void> pickImage() async {
  final hasPermission = await PermissionService.requestCameraPermission();
  if (!hasPermission) {
    // 提示用户启用权限
    await PermissionService.openSettings();
    return;
  }
  final image = await ImageService.takePhoto();
}
```

## 7. 平台检测

```dart
import 'dart:io' show Platform;

class PlatformInfo {
  static bool get isAndroid => Platform.isAndroid;
  static bool get isIOS => Platform.isIOS;
  static bool get isWeb => kIsWeb;
  static bool get isDesktop => Platform.isWindows || Platform.isMacOS || Platform.isLinux;
  static bool get isMobile => isAndroid || isIOS;

  static String get platformName {
    if (isAndroid) return 'Android';
    if (isIOS) return 'iOS';
    if (isWeb) return 'Web';
    if (Platform.isWindows) return 'Windows';
    if (Platform.isMacOS) return 'macOS';
    if (Platform.isLinux) return 'Linux';
    return '未知';
  }
}

// 平台自适应 UI
Widget buildPlatformButton() {
  if (PlatformInfo.isIOS) {
    return CupertinoButton(child: const Text('提交'), onPressed: () {});
  }
  return ElevatedButton(child: const Text('提交'), onPressed: () {});
}
```
