---
order: 4
---

# 布局 Widget

## 1. 线性布局

### Row - 水平布局

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,  // 主轴对齐方式
  crossAxisAlignment: CrossAxisAlignment.center,     // 交叉轴对齐方式
  mainAxisSize: MainAxisSize.max,                   // 主轴尺寸
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 50, height: 100, color: Colors.green),
    Container(width: 50, height: 75, color: Colors.blue),
  ],
)
```

### Column - 垂直布局

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    const Text('项目 1'),
    const SizedBox(height: 8),
    const Text('项目 2'),
    const SizedBox(height: 8),
    ElevatedButton(
      onPressed: () {},
      child: const Text('按钮'),
    ),
  ],
)
```

#### MainAxisAlignment 取值

| 值             | 说明                       |
| -------------- | -------------------------- |
| `start`        | 起始对齐                   |
| `end`          | 末尾对齐                   |
| `center`       | 居中对齐                   |
| `spaceBetween` | 两端对齐，项目之间间距相等 |
| `spaceAround`  | 每个项目周围间距相等       |
| `spaceEvenly`  | 所有项目之间间距相等       |

## 2. 弹性布局

```dart
Row(
  children: [
    Expanded(
      flex: 2,
      child: Container(color: Colors.red),
    ),
    Expanded(
      flex: 1,
      child: Container(color: Colors.green),
    ),
    Expanded(
      flex: 1,
      child: Container(color: Colors.blue),
    ),
  ],
)
```

## 3. 层叠布局

### Stack - 堆叠容器

```dart
Stack(
  alignment: Alignment.center,
  children: [
    Container(
      width: 300,
      height: 300,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue, Colors.purple],
        ),
      ),
    ),
    const Positioned(
      top: 20,
      right: 20,
      child: Icon(Icons.close, color: Colors.white, size: 30),
    ),
    const Text(
      '居中文字',
      style: TextStyle(color: Colors.white, fontSize: 24),
    ),
    Positioned(
      bottom: 0,
      left: 0,
      right: 0,
      child: Container(
        height: 60,
        color: Colors.black54,
        child: const Center(child: Text('底部栏', style: TextStyle(color: Colors.white))),
      ),
    ),
  ],
)
```

## 4. 流式布局

### Wrap - 自动换行

```dart
Wrap(
  spacing: 8,    // 水平间距
  runSpacing: 4, // 垂直间距
  alignment: WrapAlignment.center,
  children: [
    Chip(label: const Text('Dart')),
    Chip(label: const Text('Flutter')),
    Chip(label: const Text('Android')),
    Chip(label: const Text('iOS')),
    Chip(label: const Text('Web')),
    Chip(label: const Text('Desktop')),
    Chip(label: const Text('Backend')),
  ],
)
```

## 5. 对齐与定位

```dart
// Align - 对齐
Align(
  alignment: Alignment.topRight,
  child: const Text('右上角'),
)

// Center - 居中（Align 的快捷方式）
Center(
  child: const Text('居中'),
)

// Padding - 内边距
Padding(
  padding: const EdgeInsets.all(16),
  child: const Text('带内边距的文字'),
)
```

## 6. Flex 布局

```dart
Flex(
  direction: Axis.horizontal,
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Flexible(
      flex: 1,
      fit: FlexFit.tight,
      child: Container(color: Colors.red, height: 100),
    ),
    Flexible(
      flex: 2,
      fit: FlexFit.loose,
      child: Container(color: Colors.blue, height: 100),
    ),
  ],
)
```

## 7. 布局实践示例

```dart
Scaffold(
  appBar: AppBar(title: const Text('布局演示')),
  body: Column(
    children: [
      // 顶部卡片
      Card(
        margin: const EdgeInsets.all(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              const CircleAvatar(
                radius: 30,
                backgroundImage: NetworkImage('https://via.placeholder.com/150'),
              ),
              const SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('张三', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  Text('Flutter 开发者'),
                ],
              ),
              const Spacer(),
              const Icon(Icons.star, color: Colors.amber),
            ],
          ),
        ),
      ),
      // 标签区域
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Wrap(
          spacing: 8,
          runSpacing: 4,
          children: ['Dart', 'Flutter', 'UI/UX', '移动开发'].map((tag) {
            return Chip(label: Text(tag));
          }).toList(),
        ),
      ),
      // 内容卡片
      Expanded(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Container(
              height: 200,
              decoration: BoxDecoration(
                color: Colors.blue.shade100,
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Center(child: Text('内容区域')),
            ),
          ],
        ),
      ),
    ],
  ),
)
```
