---
order: 15
---

# 动画

## 1. 动画基础

- **AnimationController**：控制动画执行（开始、停止、反向）
- **Tween**：定义值变化的范围（如 0.0 到 1.0）
- **CurvedAnimation**：定义动画的时序曲线
- **Listeners**：监听动画值的变化

## 2. AnimationController（动画控制器）

```dart
class AnimationDemo extends StatefulWidget {
  @override
  State<AnimationDemo> createState() => _AnimationDemoState();
}

class _AnimationDemoState extends State<AnimationDemo>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    );

    _animation = Tween<double>(begin: 0, end: 300).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _controller.addListener(() {
      setState(() {});  // 每次动画值变化时重建
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: _animation.value,
          height: 100,
          color: Colors.blue,
        ),
        ElevatedButton(
          onPressed: () {
            if (_controller.isCompleted) {
              _controller.reverse();
            } else {
              _controller.forward();
            }
          },
          child: const Text('切换动画'),
        ),
      ],
    );
  }
}
```

## 3. AnimatedWidget（动画组件）

```dart
// 无需手动 setState
class AnimatedBox extends AnimatedWidget {
  const AnimatedBox({super.key, required super.listenable});

  Animation<double> get _animation => listenable as Animation<double>;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: _animation.value,
      height: _animation.value,
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(_animation.value / 2),
      ),
    );
  }
}

// 使用
class DemoPage extends StatefulWidget {
  @override
  State<DemoPage> createState() => _DemoPageState();
}

class _DemoPageState extends State<DemoPage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat(reverse: true);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBox(listenable: _controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

## 4. 隐式动画 Widget

```dart
// AnimatedContainer
AnimatedContainer(
  duration: const Duration(milliseconds: 500),
  curve: Curves.easeInOut,
  width: _expanded ? 300 : 100,
  height: _expanded ? 300 : 100,
  color: _expanded ? Colors.blue : Colors.red,
  borderRadius: BorderRadius.circular(_expanded ? 20 : 50),
  child: const Center(child: Text('点击我')),
)

// AnimatedOpacity
AnimatedOpacity(
  duration: const Duration(milliseconds: 500),
  opacity: _visible ? 1.0 : 0.0,
  child: const Text('淡入/淡出'),
)

// AnimatedPadding
AnimatedPadding(
  duration: const Duration(milliseconds: 300),
  padding: EdgeInsets.all(_padded ? 32 : 8),
  child: Container(color: Colors.blue, height: 100),
)

// AnimatedPositioned
Stack(
  children: [
    AnimatedPositioned(
      duration: const Duration(milliseconds: 500),
      left: _moved ? 200 : 0,
      top: _moved ? 200 : 0,
      child: Container(width: 50, height: 50, color: Colors.red),
    ),
  ],
)

// TweenAnimationBuilder
TweenAnimationBuilder<double>(
  tween: Tween(begin: 0, end: 1),
  duration: const Duration(seconds: 2),
  curve: Curves.elasticOut,
  builder: (context, value, child) {
    return Transform.scale(
      scale: value,
      child: child,
    );
  },
  child: const FlutterLogo(size: 100),
)
```

## 5. Hero 动画（共享元素过渡）

```dart
// 发送页面
GestureDetector(
  onTap: () {
    Navigator.push(context, MaterialPageRoute(builder: (context) => const DetailPage()));
  },
  child: Hero(
    tag: 'image_hero',
    child: Image.network('https://picsum.photos/200', width: 200, height: 200),
  ),
)

// 接收页面
Scaffold(
  body: Center(
    child: Hero(
      tag: 'image_hero',
      child: Image.network('https://picsum.photos/400', width: 400, height: 400),
    ),
  ),
)
```

## 6. 交错动画

```dart
class StaggeredAnimation extends StatefulWidget {
  @override
  State<StaggeredAnimation> createState() => _StaggeredAnimationState();
}

class _StaggeredAnimationState extends State<StaggeredAnimation>
    with TickerProviderStateMixin {
  late AnimationController _controller;

  late Animation<double> _opacity;
  late Animation<double> _width;
  late Animation<double> _height;
  late Animation<Color?> _color;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    );

    _opacity = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0, 0.3, curve: Curves.easeIn),
      ),
    );

    _width = Tween<double>(begin: 50, end: 200).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.3, 0.6, curve: Curves.easeOutBack),
      ),
    );

    _height = Tween<double>(begin: 50, end: 200).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.6, 0.8, curve: Curves.easeInOut),
      ),
    );

    _color = ColorTween(begin: Colors.red, end: Colors.blue).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.8, 1.0, curve: Curves.easeInOut),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Opacity(
          opacity: _opacity.value,
          child: Container(
            width: _width.value,
            height: _height.value,
            color: _color.value,
          ),
        );
      },
    );
  }
}
```

## 7. 常用动画曲线

| 曲线            | 效果           |
| --------------- | -------------- |
| `linear`        | 匀速           |
| `easeIn`        | 慢速开始       |
| `easeOut`       | 慢速结束       |
| `easeInOut`     | 慢速开始和结束 |
| `bounceIn`      | 弹入           |
| `bounceOut`     | 弹出           |
| `elasticIn`     | 弹性进入       |
| `elasticOut`    | 弹性退出       |
| `fastOutSlowIn` | 先快后慢       |

```dart
// 自定义曲线
class CustomCurve extends Curve {
  @override
  double transform(double t) {
    return t * t * (3 - 2 * t);  // SmoothStep 平滑步进
  }
}
```
