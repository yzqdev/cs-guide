---
order: 6
---

# 图片与图标

## 1. Image Widget

### 图片来源

```dart
// 网络图片
Image.network(
  'https://picsum.photos/400/300',
  fit: BoxFit.cover,
  loadingBuilder: (context, child, loadingProgress) {
    if (loadingProgress == null) return child;
    return Center(
      child: CircularProgressIndicator(
        value: loadingProgress.expectedTotalBytes != null
            ? loadingProgress.cumulativeBytesLoaded / loadingProgress.expectedTotalBytes!
            : null,
      ),
    );
  },
  errorBuilder: (context, error, stackTrace) {
    return const Icon(Icons.error, color: Colors.red, size: 64);
  },
)

// 本地图片（在 pubspec.yaml 中声明 assets）
Image.asset('assets/images/logo.png')

// 内存图片
Image.memory(Uint8List.fromList(imageBytes))

// 文件图片
Image.file(File('/path/to/image.jpg'))

// ExactAssetImage（底层）
Image(image: ExactAssetImage('assets/images/logo.png'))

// NetworkImage（底层）
Image(image: NetworkImage('https://example.com/image.png'))
```

### BoxFit 模式

| 值          | 说明                 |
| ----------- | -------------------- |
| `fill`      | 填充区域，可能会变形 |
| `contain`   | 完整显示，可能有空白 |
| `cover`     | 覆盖区域，可能会裁剪 |
| `fitWidth`  | 适应宽度             |
| `fitHeight` | 适应高度             |
| `none`      | 原始大小             |
| `scaleDown` | 缩小以适应，不放大   |

### Image 属性深入

```dart
Image.network(
  'https://example.com/image.jpg',
  width: 200,
  height: 200,
  fit: BoxFit.cover,
  alignment: Alignment.center,
  repeat: ImageRepeat.noRepeat,
  color: Colors.blue.withOpacity(0.3),
  colorBlendMode: BlendMode.overlay,
  filterQuality: FilterQuality.high,
  isAntiAlias: true,
  gaplessPlayback: true,
  semanticLabel: '一张漂亮的图片',
  excludeFromSemantics: false,
)
```

## 2. 图标库

```dart
// Material 图标
Icon(Icons.favorite, color: Colors.red, size: 36)
Icon(Icons.home_filled, color: Colors.blue, size: 24)
Icon(Icons.settings_outlined, color: Colors.grey, size: 20)

// 带语义的图标
Icon(
  Icons.add_circle,
  semanticLabel: '添加项目',
)

// 自定义尺寸和颜色
Icon(
  Icons.star_half,
  size: 48,
  color: Colors.amber.shade700,
)
```

## 3. 图片缓存与优化

### cached_network_image 插件

```dart
// 添加到 pubspec.yaml: cached_network_image: ^3.3.0

import 'package:cached_network_image/cached_network_image.dart';

CachedNetworkImage(
  imageUrl: 'https://example.com/large-image.jpg',
  placeholder: (context, url) => const CircularProgressIndicator(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
  width: 200,
  height: 200,
  fit: BoxFit.cover,
  fadeInDuration: const Duration(milliseconds: 500),
  fadeOutDuration: const Duration(milliseconds: 300),
  cacheKey: 'unique-cache-key',  // 自定义缓存键
)
```

### Image.network 缓存配置

```dart
// 全局配置
class MyHttpOverrides extends HttpOverrides {}
// 使用 ImageCache
ImageCache imageCache = PaintingBinding.instance.imageCache;
imageCache.maximumSize = 500;              // 最大缓存图片数
imageCache.maximumSizeBytes = 50 << 20;   // 最大缓存 50MB
```

## 4. 圆形头像

```dart
// CircleAvatar
CircleAvatar(
  radius: 40,
  backgroundImage: NetworkImage('https://via.placeholder.com/150'),
  child: const Text('JD'),  // 没有图片时显示文字
)

// ClipOval + Image
ClipOval(
  child: Image.network(
    'https://via.placeholder.com/150',
    width: 80,
    height: 80,
    fit: BoxFit.cover,
  ),
)
```

## 5. 自定义 IconData

```dart
// 自定义 IconData
class CustomIcons {
  static const IconData heart = IconData(0xe800, fontFamily: 'MyIcons');
  static const IconData star = IconData(0xe801, fontFamily: 'MyIcons');
}

// 使用
Icon(CustomIcons.heart, color: Colors.red)
```

## 6. 图标按钮

```dart
// IconButton
IconButton(
  icon: const Icon(Icons.volume_up),
  iconSize: 32,
  color: Colors.blue,
  tooltip: '增加音量',
  onPressed: () {
    print('音量增加');
  },
  splashRadius: 24,
  splashColor: Colors.blue.withOpacity(0.2),
  highlightColor: Colors.transparent,
  disabledColor: Colors.grey,
  constraints: const BoxConstraints(minWidth: 48, minHeight: 48),
)

// 带文字的图标按钮
TextButton.icon(
  onPressed: () {},
  icon: const Icon(Icons.add),
  label: const Text('添加项目'),
)

OutlinedButton.icon(
  onPressed: () {},
  icon: const Icon(Icons.edit),
  label: const Text('编辑'),
)

ElevatedButton.icon(
  onPressed: () {},
  icon: const Icon(Icons.send),
  label: const Text('发送'),
)
```

## 7. 图片手势

```dart
// 可缩放图片
InteractiveViewer(
  minScale: 0.5,
  maxScale: 3.0,
  boundaryMargin: const EdgeInsets.all(100),
  child: Image.network('https://picsum.photos/800/600'),
)
```

## 8. FadeInImage

```dart
FadeInImage(
  placeholder: const AssetImage('assets/placeholder.png'),
  image: NetworkImage('https://example.com/image.jpg'),
  fadeInDuration: const Duration(milliseconds: 500),
  fadeOutDuration: const Duration(milliseconds: 300),
  fit: BoxFit.cover,
  placeholderFit: BoxFit.cover,
)
```

## 9. 图标主题

```dart
// 全局图标主题
MaterialApp(
  theme: ThemeData(
    iconTheme: const IconThemeData(
      color: Colors.blue,
      size: 24,
      opacity: 0.8,
    ),
  ),
)

// 局部覆盖
IconTheme(
  data: IconTheme.of(context).copyWith(
    color: Colors.red,
    size: 32,
  ),
  child: Row(
    children: const [
      Icon(Icons.favorite),  // 红色 32px
      Icon(Icons.star),      // 红色 32px
    ],
  ),
)
```
