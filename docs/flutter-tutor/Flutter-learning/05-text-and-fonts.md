---
order: 5
---

# 文本与字体

## 1. Text Widget 深入

```dart
Text(
  'Hello Flutter',
  style: TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    fontStyle: FontStyle.italic,
    color: Colors.blue.shade700,
    backgroundColor: Colors.yellow.shade100,
    letterSpacing: 2.0,
    wordSpacing: 4.0,
    height: 1.5,           // 行高倍数
    decoration: TextDecoration.lineThrough,
    decorationColor: Colors.red,
    decorationStyle: TextDecorationStyle.dashed,
    decorationThickness: 2.0,
    shadows: [
      Shadow(
        color: Colors.black26,
        blurRadius: 4,
        offset: const Offset(2, 2),
      ),
    ],
    fontFamily: 'Roboto',
  ),
  textAlign: TextAlign.justify,
  maxLines: 3,
  overflow: TextOverflow.ellipsis,
  softWrap: true,
  textScaleFactor: 1.0,
  strutStyle: const StrutStyle(
    fontSize: 16,
    height: 1.4,
    forceStrutHeight: true,
  ),
)
```

## 2. 富文本

### Text.rich - 富文本

```dart
Text.rich(
  TextSpan(
    text: 'Hello ',
    style: TextStyle(fontSize: 16, color: Colors.black),
    children: [
      TextSpan(
        text: 'Flutter',
        style: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.blue,
        ),
      ),
      const TextSpan(
        text: '! ',
        style: TextStyle(fontSize: 16),
      ),
      WidgetSpan(
        child: Icon(Icons.favorite, color: Colors.red, size: 20),
      ),
      const TextSpan(
        text: ' 欢迎',
        style: TextStyle(fontStyle: FontStyle.italic),
      ),
    ],
  ),
)
```

### RichText - 底层富文本

```dart
RichText(
  text: TextSpan(
    style: DefaultTextStyle.of(context).style,
    children: [
      TextSpan(
        text: '点击 ',
        style: TextStyle(color: Colors.grey.shade600),
      ),
      TextSpan(
        text: '这里',
        style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
        recognizer: TapGestureRecognizer()..onTap = () {
          // 处理点击事件
        },
      ),
      TextSpan(
        text: ' 了解更多',
        style: TextStyle(color: Colors.grey.shade600),
      ),
    ],
  ),
)
```

## 3. 文本输入

### TextField

```dart
TextField(
  controller: _controller,
  decoration: InputDecoration(
    labelText: '用户名',
    hintText: '请输入您的用户名',
    helperText: '至少6个字符',
    prefixIcon: const Icon(Icons.person),
    suffixIcon: IconButton(
      icon: const Icon(Icons.clear),
      onPressed: () => _controller.clear(),
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
    ),
    filled: true,
    fillColor: Colors.grey.shade100,
  ),
  obscureText: false,  // 密码模式
  keyboardType: TextInputType.emailAddress,
  textInputAction: TextInputAction.next,
  maxLength: 30,
  maxLines: 1,
  onChanged: (value) => print(value),
  onSubmitted: (value) => print('提交: $value'),
  validator: (value) {
    if (value == null || value.isEmpty) {
      return '请输入内容';
    }
    return null;
  },
)
```

### TextFormField（在 Form 中使用）

```dart
TextFormField(
  decoration: const InputDecoration(labelText: '邮箱'),
  keyboardType: TextInputType.emailAddress,
  validator: (value) {
    if (value == null || !value.contains('@')) {
      return '邮箱格式无效';
    }
    return null;
  },
)
```

## 4. InputDecoration 深入

```dart
InputDecoration(
  // 标签
  labelText: '密码',
  labelStyle: TextStyle(color: Colors.blue),
  floatingLabelBehavior: FloatingLabelBehavior.auto,

  // 提示
  hintText: '请输入密码',
  hintStyle: TextStyle(color: Colors.grey.shade400),

  // 辅助文本
  helperText: '必须8个字符以上',
  helperStyle: TextStyle(color: Colors.grey.shade600),

  // 错误
  errorText: _errorMessage,
  errorStyle: TextStyle(color: Colors.red.shade700),
  errorMaxLines: 2,

  // 图标
  prefixIcon: Icon(Icons.lock),
  suffixIcon: Icon(Icons.visibility),

  // 边框
  border: OutlineInputBorder(
    borderRadius: BorderRadius.circular(8),
    borderSide: BorderSide(color: Colors.grey.shade300),
  ),
  focusedBorder: OutlineInputBorder(
    borderRadius: BorderRadius.circular(8),
    borderSide: BorderSide(color: Colors.blue, width: 2),
  ),
  errorBorder: OutlineInputBorder(
    borderRadius: BorderRadius.circular(8),
    borderSide: BorderSide(color: Colors.red),
  ),
  focusedErrorBorder: OutlineInputBorder(
    borderRadius: BorderRadius.circular(8),
    borderSide: BorderSide(color: Colors.red.shade700, width: 2),
  ),

  // 背景
  filled: true,
  fillColor: Colors.white,

  // 间距
  contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
)
```

## 5. 自定义字体

### 在 pubspec.yaml 中配置

```yaml
flutter:
  fonts:
    - family: Roboto
      fonts:
        - asset: fonts/Roboto-Regular.ttf
        - asset: fonts/Roboto-Bold.ttf
          weight: 700
        - asset: fonts/Roboto-Italic.ttf
          style: italic

    - family: NotoSansSC
      fonts:
        - asset: fonts/NotoSansSC-Regular.otf
        - asset: fonts/NotoSansSC-Bold.otf
          weight: 700
```

### 使用自定义字体

```dart
Text(
  '自定义字体文本',
  style: TextStyle(
    fontFamily: 'NotoSansSC',
    fontWeight: FontWeight.bold,
    fontSize: 20,
  ),
)
```

## 6. TextStyle 与主题

```dart
// 全局文本主题
MaterialApp(
  theme: ThemeData(
    textTheme: const TextTheme(
      displayLarge: TextStyle(fontSize: 96, fontWeight: FontWeight.w300),
      displayMedium: TextStyle(fontSize: 60, fontWeight: FontWeight.w400),
      headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
      titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.w500),
      bodyLarge: TextStyle(fontSize: 16),
      bodyMedium: TextStyle(fontSize: 14),
      labelLarge: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
    ),
  ),
)

// 使用主题样式
Text(
  '展示文本',
  style: Theme.of(context).textTheme.displayMedium,
)

// 从主题扩展
Text(
  '自定义样式',
  style: Theme.of(context).textTheme.titleLarge?.copyWith(
    color: Colors.blue,
    letterSpacing: 2,
  ),
)
```

## 7. 可选中文本

```dart
// SelectableText - 可选中文本
SelectableText(
  '这段文字可以被用户选中和复制。',
  style: TextStyle(fontSize: 16),
  onTap: () => print('文本被点击'),
)
```
