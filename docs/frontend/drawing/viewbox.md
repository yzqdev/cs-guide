---
index: 3
---
# viewbox基础

这个页面是一个关于 SVG { viewport，viewbox，coordinates }的教程。

## Viewport

视窗

## 视窗作为用户坐标

viewBox 属性用于指定用户坐标。

下面是 viewBox 的语法:

```html
<svg viewBox=spec >
```

该规范是一个字符串，包含以下值，以空格分隔:

- 及 是左上角的坐标
- 及 是 x 坐标和 y 坐标的范围，它们不能是负的

任何坐标位于 viewBox 之外的绘图都不会显示。

如果 viewBox 属性不存在，则坐标与 viewport 相同。

[参见 SVG: Viewport ]

下面是一些例子。

### 设置坐标原点

在这里，我们移动坐标，所以绘图区域的左上角是{30,0}。

这是一个以{30,0}为中心，半径为20的圆。

:::demo

```html
<svg width="100" height="100" viewBox="30 0 100 100">
<circle cx="30" cy="0" r="20" />
</svg>
```

:::

### 设置坐标宽度和高度

在这里，我们将 viewBox 的 x 和 y 范围都设置为50，并在中间画一个半径为25的圆。

:::demo

```html
<svg width="100" height="100" viewBox="0 0 50 50">
<circle cx="25" cy="25" r="25" />
</svg>
```

:::

您可以看到 viewBox 填充了视区，尽管 viewBox 的宽度为50，而 viewport 的宽度为100。

默认情况下:

1. 默认情况下，viewBox 将按比例缩放以适应视区。保持长宽比(不变形，不拉伸).(这可能会留下空白的两边。)
2. 视框将以视区为中心

技术细节。假设 viewport width 和 height 为{ pX，pY } ，viewBox width 和 height 为{ bX，bY }。现在，有两个比率: pX/bX 和 pY/bY。无论哪个小，都将是比例因子。

### 控制 viewport/viewBox 映射: “ preserveAspectRatio”属性

可以使用 preserveAspectRatio 属性控制 viewport 中 viewBox 的精确缩放和位置。

当 viewport 和 viewBox 具有相同的宽度和高度时，就没有问题了。

当 viewport 和 viewBox 有不同的宽度和高度时，会出现以下情况:

1. 对于每个 x 和 y 尺寸，viewBox 可以非均匀缩放(长宽比不保留)
2. 将 viewBox 缩放均匀，然后缩小，以适应
3. viewBox 可以均匀缩放和剪裁(这样部分就不会显示)

如果 viewBox 是均匀缩放的，那么也会出现对齐问题。也就是 x 维空间中的 lignn 到{ top，middle，bottom } ，y 维空间中的 lignn 到{ top，middle，bottom }。

SVG 提供了一个非常方便的属性 preserveAspectRatio。你只需要告诉它你想要上面的哪种情况，你不需要做任何关于缩放和定位的数学运算。

### 不要保留纵横比

```
preserveAspectRatio="none"
```

这意味着不要保留长宽比，要根据尺寸进行调整。

比较:
:::demo

```html
<svg width="100" height="100" viewBox="0 0 50 100" preserveAspectRatio="none">
<circle cx="25" cy="50" r="25" />
</svg>
```

:::

:::demo

```html
<svg width="100" height="100" viewBox="0 0 50 100" >
<circle cx="25" cy="50" r="25" />
</svg>
```

:::

### 保留高宽比

为了保持纵横比，使用以下方法:

“ alignment _spec meet_ or _ slice”

调整规范必须是:

- `xMinYMin`
- `xMinYMid`
- `xMinYMax`
- `xMidYMin`
- (预设)
- `xMidYMax`
- `xMaxYMin`
- `xMaxYMid`
- `xMaxYMax`

满足或片必须是其中之一:

- (默认情况下)意味着缩小以适应。(所以在视区的两侧可能有空白区域)
- 意味着剪辑。(所以部分图纸被切断)

### preserveAspectRatio 示例，使用“ meet”

下面是同样的图形，有3种不同的“ preserveAspectRatio”设置。全都符合(默认)。

Viewport 和 viewBox 具有相同的高度。只是宽度不同。视区宽度为100px，而 viewBox 宽度为50px。

:::demo

```html
<svg width="100" height="100" viewBox="0 0 50 100"
preserveAspectRatio="xMinYMid"
>
<circle cx="25" cy="50" r="25" />
</svg>
```

:::

:::demo

```html
<svg width="100" height="100" viewBox="0 0 50 100"
preserveAspectRatio="xMidYMid"
>
<circle cx="25" cy="50" r="25" />
</svg>
```

:::

:::demo

```html
<svg width="100" height="100" viewBox="0 0 50 100"
preserveAspectRatio="xMaxYMid"
>
<circle cx="25" cy="50" r="25" />
</svg>
```

:::

### 带“ slice”的 preserveAspectRatio 示例

这里是同样的绘图与3个不同的设置“ preserveAspectRatio”。所有与片。

Viewport 和 viewBox 具有相同的高度。只是宽度不同。视窗宽度为100px，而 viewBox 宽度为200px。
:::demo

```html
<svg width="100" height="100" viewBox="0 0 200 100"
preserveAspectRatio="xMinYMid slice"
>
<circle cx="100" cy="50" r="50" />
</svg>
```

:::

:::demo

```html
<svg width="100" height="100" viewBox="0 0 200 100"
preserveAspectRatio="xMidYMid slice"
>
<circle cx="100" cy="50" r="50" />
</svg>
```

:::
:::demo

```html
<svg width="100" height="100" viewBox="0 0 200 100"
preserveAspectRatio="xMaxYMid slice"
>
<circle cx="100" cy="50" r="50" />
</svg>
```

:::

## 嵌套 SVG

您可以将 SVG 嵌入到 SVG 中。这是有用的，当你想有一个区域的图形和另一个区域的标题，图例等。

例如，假设要绘制一个图 y = x ^ 2。要绘制的范围是{ x，0,10}和{ y，0,10}。因此，您可以创建一个高度和宽度为10的视图框。但是，你也需要一个区域来显示图表的标题。

通常，您需要缩放和定位所有绘图坐标，以便为标题留出空间。但是您可以在主 SVG 视图框中有一个嵌套的 SVG 标记。在内部的 SVG 中，您只需为绘图的坐标指定一个视框尺寸和位置。这样，您就不必重新计算绘图的坐标。

嵌套 SVG 的语法只是2个额外的属性，x 和 y: < SVG x = " val" y = " val" > 。X 和 y 指定内部 SVG 的 viewport 的左上角的位置。

下面是一个例子:

:::demo

```html
<svg width="100" height="100">
  <svg x="20" y="20" width="80" height="80" viewBox="0 0 100 100">
    <rect x="0" y="0" width="100" height="100" style="fill:green; stroke:blue; stroke-width:5" />
  </svg>
</svg>
```

:::

在上面的示例中，SVG 视图框与视图端口相同，边长为100。它有一个内部 SVG，边长为80，原点为{20,20}。内部的 SVG 有一个边长为100的视图框。(所以，你不必重新评价你的观点)它画一个长度为100的正方形。

### 使用者坐标单位

视框，用户坐标的单位大小
