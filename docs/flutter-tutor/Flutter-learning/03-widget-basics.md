---
order: 3
---

# Widget 基础

## 1. Widget 概念

在 Flutter 中，**一切都是 Widget**。Widget 是对 UI 的不可变描述，描述了界面应该是什么样子。

### Widget 树

```
MaterialApp
└── Scaffold
    ├── AppBar
    │   └── Text
    ├── body: Center
    │   └── Column
    │       ├── Text
    │       ├── SizedBox
    │       └── ElevatedButton
    └── floatingActionButton: FloatingActionButton
        └── Icon
```

## 2. 常用基础 Widget

### Text - 文本显示

```dart
Text(
  'Hello Flutter',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    letterSpacing: 1.5,
    decoration: TextDecoration.underline,
    decorationColor: Colors.red,
    decorationStyle: TextDecorationStyle.wavy,
  ),
  textAlign: TextAlign.center,
  maxLines: 2,
  overflow: TextOverflow.ellipsis,
)
```

### Icon - 图标

```dart
Icon(
  Icons.star,
  color: Colors.amber,
  size: 48,
)
```

### Image - 图片

```dart
// 网络图片
Image.network('https://example.com/image.png')

// 本地图片（需在 pubspec.yaml 中配置 assets）
Image.asset('assets/images/logo.png')

// 文件图片
Image.file(File('/path/to/image.jpg'))

// 内存图片
Image.memory(Uint8List bytes)
```

### Container - 容器

```dart
Container(
  width: 200,
  height: 200,
  padding: const EdgeInsets.all(16),
  margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(
        color: Colors.grey.withOpacity(0.3),
        blurRadius: 10,
        offset: const Offset(0, 4),
      ),
    ],
    border: Border.all(color: Colors.grey.shade300),
  ),
  child: const Text('容器内容'),
)
```

## 3. 尺寸与约束

```dart
// SizedBox - 固定尺寸
SizedBox(width: 100, height: 50)

// ConstrainedBox - 约束范围
ConstrainedBox(
  constraints: const BoxConstraints(
    minWidth: 100,
    maxWidth: 300,
    minHeight: 50,
    maxHeight: 200,
  ),
  child: container,
)

// Expanded - 填充剩余空间（用于 Row/Column 中）
Expanded(
  flex: 2,
  child: Container(color: Colors.red),
)

// Flexible - 灵活（允许小于 flex 分配的大小）
Flexible(
  flex: 1,
  child: Container(color: Colors.blue),
)

// AspectRatio - 固定宽高比
AspectRatio(
  aspectRatio: 16 / 9,
  child: Container(color: Colors.green),
)

// FittedBox - 缩放以适应
FittedBox(
  fit: BoxFit.contain,
  child: Text('缩放我'),
)
```

## 4. 装饰与效果

### Opacity - 透明度

```dart
Opacity(
  opacity: 0.5,
  child: const Text('半透明'),
)
```

### Clip - 裁剪

```dart
// 圆角矩形裁剪
ClipRRect(
  borderRadius: BorderRadius.circular(16),
  child: image,
)

// 圆形裁剪
ClipOval(
  child: Container(width: 100, height: 100, color: Colors.blue),
)

// 路径裁剪
ClipPath(
  clipper: MyCustomClipper(),
  child: container,
)
```

### Transform - 变换

```dart
Transform.rotate(
  angle: -0.2,
  child: const Text('旋转的文字'),
)

Transform.translate(
  offset: const Offset(20, 10),
  child: const Text('移动的文字'),
)

Transform.scale(
  scale: 1.5,
  child: const Text('缩放后的文字'),
)
```

## 5. Material Design 组件

```dart
// Card - 卡片
Card(
  elevation: 4,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: Text('卡片内容'),
  ),
)

// Chip - 标签
Chip(
  label: const Text('Flutter'),
  avatar: const Icon(Icons.flutter_dash),
  onDeleted: () {},
)

// Divider - 分割线
const Divider(height: 1, thickness: 1, color: Colors.grey)

// LinearProgressIndicator - 线性进度条
LinearProgressIndicator(value: 0.7)

// CircularProgressIndicator - 圆形进度
const CircularProgressIndicator()
```

## 6. EdgeInsets 与 BorderRadius

```dart
// EdgeInsets 用法
EdgeInsets.all(16)
EdgeInsets.symmetric(horizontal: 16, vertical: 8)
EdgeInsets.only(left: 16, top: 8, right: 16, bottom: 8)
EdgeInsets.fromLTRB(16, 8, 16, 8)

// BorderRadius 用法
BorderRadius.all(Radius.circular(16))
BorderRadius.only(
  topLeft: Radius.circular(16),
  bottomRight: Radius.circular(16),
)
BorderRadius.horizontal(left: Radius.circular(16))
BorderRadius.vertical(top: Radius.circular(16))
```
