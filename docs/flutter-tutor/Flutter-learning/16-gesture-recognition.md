---
order: 16
---

# 手势识别

## 1. GestureDetector（手势探测器）

```dart
GestureDetector(
  // 点击
  onTap: () => print('点击'),
  onTapUp: (details) => print('点击位置 ${details.globalPosition}'),
  onTapDown: (details) => print('按下'),
  onTapCancel: () => print('点击取消'),
  onDoubleTap: () => print('双击'),
  onLongPress: () => print('长按'),
  onLongPressStart: (details) => print('长按开始'),
  onLongPressMoveUpdate: (details) => print('长按移动'),
  onLongPressEnd: (details) => print('长按结束'),

  // 拖动
  onPanStart: (details) => print('拖动开始: ${details.localPosition}'),
  onPanUpdate: (details) => print('拖动偏移: ${details.delta}'),
  onPanEnd: (details) => print('拖动结束速度: ${details.velocity}'),

  // 水平拖动
  onHorizontalDragStart: (details) {},
  onHorizontalDragUpdate: (details) {},
  onHorizontalDragEnd: (details) {},

  // 垂直拖动
  onVerticalDragStart: (details) {},
  onVerticalDragUpdate: (details) {},
  onVerticalDragEnd: (details) {},

  // 缩放
  onScaleStart: (details) {},
  onScaleUpdate: (details) {
    print('缩放: ${details.scale}');
    print('旋转: ${details.rotation}');
  },
  onScaleEnd: (details) {},

  child: Container(
    width: 300,
    height: 300,
    color: Colors.blue.shade100,
  ),
)
```

## 2. GestureDetector vs InkWell

| 特性       | GestureDetector            | InkWell                  |
| ---------- | -------------------------- | ------------------------ |
| 水波纹效果 | 无（可配合 Ink 使用）      | 有                       |
| 手势类型   | 全部（点击、拖动、缩放等） | 基础（点击、双击、长按） |
| 性能       | 更轻量                     | 稍重（包含水波纹）       |
| 适用场景   | 自定义手势、拖动           | 按钮、列表项点击         |

## 3. 拖动示例

```dart
class DraggableBox extends StatefulWidget {
  @override
  State<DraggableBox> createState() => _DraggableBoxState();
}

class _DraggableBoxState extends State<DraggableBox> {
  Offset _position = const Offset(100, 100);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          left: _position.dx,
          top: _position.dy,
          child: GestureDetector(
            onPanUpdate: (details) {
              setState(() {
                _position += details.delta;
              });
            },
            child: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: const Center(
                child: Text('拖动我', style: TextStyle(color: Colors.white)),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
```

## 4. 缩放与旋转

```dart
class TransformableWidget extends StatefulWidget {
  @override
  State<TransformableWidget> createState() => _TransformableWidgetState();
}

class _TransformableWidgetState extends State<TransformableWidget> {
  double _scale = 1.0;
  double _rotation = 0.0;
  Offset _position = Offset.zero;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onScaleStart: (details) {
        // 开始缩放
      },
      onScaleUpdate: (details) {
        setState(() {
          _scale = details.scale.clamp(0.5, 3.0);
          _rotation = details.rotation;
        });
      },
      child: Transform(
        transform: Matrix4.identity()
          ..translate(_position.dx, _position.dy)
          ..rotateZ(_rotation)
          ..scale(_scale),
        alignment: Alignment.center,
        child: Container(
          width: 200,
          height: 200,
          decoration: BoxDecoration(
            color: Colors.blue,
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Center(
            child: Text('捏合 & 旋转', style: TextStyle(color: Colors.white)),
          ),
        ),
      ),
    );
  }
}
```

## 5. Dismissible - 滑动关闭

```dart
Dismissible(
  key: Key(item.id),
  direction: DismissDirection.horizontal,
  background: Container(
    color: Colors.red,
    alignment: Alignment.centerRight,
    padding: const EdgeInsets.only(right: 20),
    child: const Icon(Icons.delete, color: Colors.white),
  ),
  secondaryBackground: Container(
    color: Colors.green,
    alignment: Alignment.centerLeft,
    padding: const EdgeInsets.only(left: 20),
    child: const Icon(Icons.archive, color: Colors.white),
  ),
  confirmDismiss: (direction) async {
    return await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('确认'),
        content: const Text('确定要删除吗？'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('取消')),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('删除')),
        ],
      ),
    ) ?? false;
  },
  onDismissed: (direction) {
    removeItem(item.id);
  },
  child: ListTile(title: Text(item.title)),
)
```

## 6. InteractiveViewer（交互式查看器）

```dart
InteractiveViewer(
  minScale: 0.5,
  maxScale: 4.0,
  boundaryMargin: const EdgeInsets.all(100),
  panEnabled: true,
  scaleEnabled: true,
  onInteractionStart: (details) => print('开始'),
  onInteractionUpdate: (details) => print('更新'),
  onInteractionEnd: (details) => print('结束'),
  child: Image.network(
    'https://picsum.photos/800/600',
    width: 800,
    height: 600,
    fit: BoxFit.contain,
  ),
)
```

## 7. GestureRecognizer 深入

```dart
import 'package:flutter/gestures.dart';

class CustomGestureWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        style: DefaultTextStyle.of(context).style,
        children: [
          const TextSpan(text: '创建账户即表示您同意我们的 '),
          TextSpan(
            text: '服务条款',
            style: const TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
            recognizer: TapGestureRecognizer()
              ..onTap = () => showTermsOfService(),
          ),
          const TextSpan(text: ' 和 '),
          TextSpan(
            text: '隐私政策',
            style: const TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
            recognizer: TapGestureRecognizer()
              ..onTap = () => showPrivacyPolicy(),
          ),
        ],
      ),
    );
  }
}
```

## 8. 常见手势实践

```dart
// 滑动页面（PageView）
PageView(
  controller: PageController(viewportFraction: 0.8),
  children: [
    Container(color: Colors.red, child: const Center(child: Text('页面 1'))),
    Container(color: Colors.green, child: const Center(child: Text('页面 2'))),
    Container(color: Colors.blue, child: const Center(child: Text('页面 3'))),
  ],
)

// 下拉刷新
RefreshIndicator(
  onRefresh: () async {
    await Future.delayed(const Duration(seconds: 2));
  },
  child: ListView(
    children: [for (int i = 0; i < 20; i++) ListTile(title: Text('项目 $i'))],
  ),
)
```
