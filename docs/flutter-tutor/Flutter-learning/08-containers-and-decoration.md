---
order: 8
---

# 容器与装饰

## 1. Container 深入

```dart
Container(
  width: double.infinity,
  height: 200,
  padding: const EdgeInsets.all(16),
  margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),

  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(16),
    boxShadow: [
      BoxShadow(
        color: Colors.black.withOpacity(0.1),
        blurRadius: 12,
        spreadRadius: 0,
        offset: const Offset(0, 4),
      ),
    ],
    border: Border.all(
      color: Colors.grey.shade200,
      width: 1,
    ),
    gradient: LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [Colors.blue.shade300, Colors.purple.shade300],
    ),
  ),

  alignment: Alignment.center,
  transform: Matrix4.rotationZ(0.1),
  child: const Text(
    '容器演示',
    style: TextStyle(color: Colors.white, fontSize: 18),
  ),
)
```

## 2. BoxDecoration 深入

```dart
BoxDecoration(
  // 颜色
  color: Colors.blue.shade100,

  // 渐变
  gradient: const LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Colors.blue, Colors.purple],
    stops: [0.0, 1.0],
  ),

  // 径向渐变
  gradient: RadialGradient(
    center: Alignment.center,
    radius: 0.8,
    colors: [Colors.orange, Colors.red],
  ),

  // 圆角
  borderRadius: BorderRadius.circular(12),
  borderRadius: const BorderRadius.only(
    topLeft: Radius.circular(16),
    bottomRight: Radius.circular(16),
  ),

  // 边框
  border: Border.all(
    color: Colors.blue,
    width: 2,
    strokeAlign: BorderSide.strokeAlignInside,
  ),
  border: Border(
    top: BorderSide(color: Colors.red, width: 3),
    bottom: BorderSide(color: Colors.blue, width: 3),
  ),

  // 阴影
  boxShadow: [
    BoxShadow(
      color: Colors.black.withOpacity(0.15),
      blurRadius: 10,
      spreadRadius: -2,
      offset: const Offset(0, 5),
    ),
  ],

  // 背景图片
  image: const DecorationImage(
    image: NetworkImage('https://example.com/bg.jpg'),
    fit: BoxFit.cover,
    opacity: 0.5,
    colorFilter: ColorFilter.mode(Colors.blue, BlendMode.overlay),
  ),

  // 形状
  shape: BoxShape.circle,  // 或 BoxShape.rectangle（默认）
)
```

## 3. 渐变效果

```dart
// 线性渐变
Container(
  decoration: const BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [
        Color(0xFF667eea),
        Color(0xFF764ba2),
      ],
    ),
  ),
)

// 径向渐变
Container(
  decoration: const BoxDecoration(
    gradient: RadialGradient(
      center: Alignment.center,
      radius: 0.5,
      colors: [
        Colors.yellow,
        Colors.orange,
        Colors.red,
      ],
      stops: [0.3, 0.6, 1.0],
    ),
  ),
)

// 扫描渐变
Container(
  decoration: const BoxDecoration(
    gradient: SweepGradient(
      center: Alignment.center,
      startAngle: 0,
      endAngle: 3.14,
      colors: [
        Colors.red,
        Colors.yellow,
        Colors.green,
        Colors.blue,
        Colors.red,
      ],
    ),
  ),
)
```

## 4. 阴影效果

```dart
// 基本阴影
BoxShadow(
  color: Colors.black.withOpacity(0.1),
  blurRadius: 4,
  offset: const Offset(0, 2),
)

// 多层阴影（拟态设计）
Container(
  decoration: BoxDecoration(
    color: Colors.grey.shade200,
    borderRadius: BorderRadius.circular(16),
    boxShadow: [
      BoxShadow(
        color: Colors.white.withOpacity(0.8),
        blurRadius: 10,
        offset: const Offset(-5, -5),
      ),
      BoxShadow(
        color: Colors.grey.withOpacity(0.5),
        blurRadius: 10,
        offset: const Offset(5, 5),
      ),
    ],
  ),
)

// 发光效果
BoxShadow(
  color: Colors.blue.withOpacity(0.3),
  blurRadius: 20,
  spreadRadius: 5,
  offset: Offset.zero,
)

// 底部阴影（Elevation）
Container(
  elevation: 8,
  shadowColor: Colors.blue.withOpacity(0.3),
  child: container,
)
```

## 5. DecoratedBox

```dart
DecoratedBox(
  decoration: BoxDecoration(
    color: Colors.amber.shade100,
    borderRadius: BorderRadius.circular(8),
  ),
  position: DecorationPosition.background,
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: const Text('装饰盒子'),
  ),
)
```

## 6. CustomPaint - 自定义绘制

```dart
class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..strokeWidth = 4
      ..style = PaintingStyle.fill;

    // 绘制圆形
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), 50, paint);

    // 绘制矩形
    canvas.drawRect(Rect.fromLTWH(10, 10, 100, 80), paint);

    // 绘制圆角矩形
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(10, 10, 150, 100),
        const Radius.circular(16),
      ),
      paint,
    );

    // 绘制线条
    final linePaint = Paint()
      ..color = Colors.red
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;
    canvas.drawLine(Offset.zero, Offset(size.width, size.height), linePaint);

    // 绘制文本
    final textPainter = TextPainter(
      text: const TextSpan(
        text: '自定义绘制',
        style: TextStyle(color: Colors.black, fontSize: 18),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(canvas, const Offset(20, 20));
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// 使用
CustomPaint(
  size: const Size(200, 200),
  painter: MyPainter(),
)
```

## 7. 背景效果

```dart
// 毛玻璃效果（BackdropFilter）
ClipRRect(
  borderRadius: BorderRadius.circular(16),
  child: BackdropFilter(
    filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
    child: Container(
      color: Colors.white.withOpacity(0.2),
      child: const Padding(
        padding: EdgeInsets.all(16),
        child: Text('毛玻璃效果'),
      ),
    ),
  ),
)

// 线性渐变遮罩
ShaderMask(
  shaderCallback: (bounds) => LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Colors.transparent, Colors.black],
  ).createShader(bounds),
  child: Image.network('https://picsum.photos/400/300'),
)
```
