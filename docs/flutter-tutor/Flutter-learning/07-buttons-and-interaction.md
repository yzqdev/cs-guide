---
order: 7
---

# 按钮与交互

## 1. Material 按钮类型

### ElevatedButton（凸起按钮）

```dart
ElevatedButton(
  onPressed: () {
    print('按钮被按下');
  },
  onLongPress: () {
    print('长按');
  },
  style: ElevatedButton.styleFrom(
    foregroundColor: Colors.white,
    backgroundColor: Colors.blue,
    disabledForegroundColor: Colors.grey,
    disabledBackgroundColor: Colors.grey.shade300,
    elevation: 4,
    shadowColor: Colors.blue.withOpacity(0.4),
    padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
    ),
    side: const BorderSide(color: Colors.blue.shade700, width: 1),
    textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
  ),
  child: const Text('凸起按钮'),
)
```

### TextButton（文字按钮）

```dart
TextButton(
  onPressed: () {},
  style: TextButton.styleFrom(
    foregroundColor: Colors.blue,
    padding: const EdgeInsets.symmetric(horizontal: 16),
    textStyle: const TextStyle(fontSize: 16),
  ),
  child: const Text('文字按钮'),
)
```

### OutlinedButton（轮廓按钮）

```dart
OutlinedButton(
  onPressed: () {},
  style: OutlinedButton.styleFrom(
    foregroundColor: Colors.blue,
    side: const BorderSide(color: Colors.blue, width: 2),
    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
  ),
  child: const Text('轮廓按钮'),
)
```

### 按钮状态控制

```dart
ElevatedButton(
  onPressed: isEnabled ? () => handlePress() : null,  // null 表示禁用
  child: Text(isEnabled ? '点击我' : '已禁用'),
)
```

## 2. 图标按钮

```dart
// IconButton
IconButton(
  icon: const Icon(Icons.favorite),
  color: Colors.red,
  iconSize: 32,
  tooltip: '喜欢',
  onPressed: () {},
  splashRadius: 24,
  splashColor: Colors.red.withOpacity(0.3),
  highlightColor: Colors.transparent,
  hoverColor: Colors.red.withOpacity(0.1),
  disabledColor: Colors.grey,
  constraints: const BoxConstraints(minWidth: 48, minHeight: 48),
)

// 图标 + 文字按钮
ElevatedButton.icon(
  onPressed: () {},
  icon: const Icon(Icons.send),
  label: const Text('发送消息'),
  style: ElevatedButton.styleFrom(
    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
  ),
)
```

## 3. FloatingActionButton（浮动操作按钮）

```dart
Scaffold(
  floatingActionButton: FloatingActionButton(
    onPressed: () {},
    tooltip: '添加',
    backgroundColor: Colors.blue,
    foregroundColor: Colors.white,
    elevation: 6,
    highlightElevation: 12,
    shape: const CircleBorder(),
    mini: false,
    child: const Icon(Icons.add),
  ),
  // 扩展 FAB
  floatingActionButton: FloatingActionButton.extended(
    onPressed: () {},
    icon: const Icon(Icons.add),
    label: const Text('创建'),
    backgroundColor: Colors.blue,
  ),
)
```

## 4. 按钮主题

```dart
// 全局按钮主题
MaterialApp(
  theme: ThemeData(
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.white,
        backgroundColor: Colors.teal,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: Colors.teal,
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: Colors.teal,
        side: const BorderSide(color: Colors.teal),
      ),
    ),
  ),
)
```

## 5. InkWell 与 GestureDetector

### InkWell - 水波纹效果

```dart
InkWell(
  onTap: () {
    print('点击');
  },
  onDoubleTap: () {
    print('双击');
  },
  onLongPress: () {
    print('长按');
  },
  splashColor: Colors.blue.withOpacity(0.3),
  highlightColor: Colors.blue.withOpacity(0.1),
  radius: 100,
  borderRadius: BorderRadius.circular(12),
  child: Container(
    width: 200,
    height: 100,
    decoration: BoxDecoration(
      color: Colors.grey.shade100,
      borderRadius: BorderRadius.circular(12),
    ),
    child: const Center(child: Text('点击我')),
  ),
)
```

### GestureDetector - 高级手势

```dart
GestureDetector(
  onTap: () => print('点击'),
  onDoubleTap: () => print('双击'),
  onLongPress: () => print('长按'),
  onTapDown: (details) => print('按下位置 ${details.globalPosition}'),
  onTapUp: (details) => print('抬起'),
  onTapCancel: () => print('点击取消'),
  onPanStart: (details) => print('拖动开始'),
  onPanUpdate: (details) => print('拖动更新: ${details.delta}'),
  onPanEnd: (details) => print('拖动结束'),
  onScaleStart: (details) => print('缩放开始'),
  onScaleUpdate: (details) => print('缩放: ${details.scale}'),
  onHorizontalDragUpdate: (details) => print('水平拖动'),
  onVerticalDragUpdate: (details) => print('垂直拖动'),
  child: Container(
    width: 200,
    height: 200,
    color: Colors.blue.shade100,
    child: const Center(child: Text('手势目标')),
  ),
)
```

## 6. Dismissible - 滑动删除

```dart
Dismissible(
  key: Key(item.id.toString()),
  direction: DismissDirection.horizontal,
  background: Container(
    color: Colors.green,
    alignment: Alignment.centerLeft,
    padding: const EdgeInsets.only(left: 20),
    child: const Icon(Icons.archive, color: Colors.white),
  ),
  secondaryBackground: Container(
    color: Colors.red,
    alignment: Alignment.centerRight,
    padding: const EdgeInsets.only(right: 20),
    child: const Icon(Icons.delete, color: Colors.white),
  ),
  confirmDismiss: (direction) async {
    if (direction == DismissDirection.endToStart) {
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
      );
    }
    return true;
  },
  onDismissed: (direction) {
    if (direction == DismissDirection.endToStart) {
      deleteItem(item.id);
    } else {
      archiveItem(item.id);
    }
  },
  child: ListTile(title: Text(item.title)),
)
```

## 7. 弹出菜单

```dart
// PopupMenuButton
PopupMenuButton<String>(
  onSelected: (value) {
    print('选中: $value');
  },
  itemBuilder: (context) => [
    const PopupMenuItem(value: 'edit', child: Text('编辑')),
    const PopupMenuItem(value: 'share', child: Text('分享')),
    const PopupMenuDivider(),
    const PopupMenuItem(value: 'delete', child: Text('删除')),
  ],
  icon: const Icon(Icons.more_vert),
  offset: const Offset(0, 40),
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
)

// DropdownButton
DropdownButton<String>(
  value: selectedValue,
  items: ['选项1', '选项2', '选项3'].map((value) {
    return DropdownMenuItem(value: value, child: Text(value));
  }).toList(),
  onChanged: (value) {
    setState(() => selectedValue = value);
  },
)
```
