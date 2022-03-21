# electron 技巧

## 无边框窗口的拖动

```html
默认情况下, 无框窗口是 non-draggable 的。 应用程序需要指定 `-webkit-app-region: drag` 在 CSS 中告诉Electron哪个区域是可拖拽的 (像 OS 的标准标题栏), 并且应用程序也可以使用 `-webkit-app-region: no-drag` 来排除 draggable region 中的 non-draggable 区域。 请注意, 当前只支持矩形形状。

要使整个窗口可拖拽, 您可以添加 `-webkit-app-region: drag` 作为 `body` 的样式:

<body style="-webkit-app-region: drag"></body>

请注意, 如果您已使整个窗口draggable, 则必须将按钮标记为 non-draggable, 否则用户将无法单击它们:

button {  -webkit-app-region: no-drag; }

如果你设置自定义标题栏为 draggable, 你也需要标题栏中所有的按钮都设为 non-draggable。
请注意，如果您使整个窗口都可拖拽，则必须将其中的按钮标记为不可拖拽，否则用户将无法点击它们：

button {
  -webkit-app-region: no-drag;
}

```

## electron常见错误
