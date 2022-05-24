---
index: 1
---
# svg基础

svg是xml文档,所以你可以直接放在html里面

::: normal-demo line

```html
<svg width="100" height="100">
<line x1="0" y1="0" x2="50" y2="10"
style="stroke:black" />
</svg>
```

:::

完整的html如下
::: normal-demo

```html
<!doctype html><html><head><meta charset="utf-8" />
<title>svg test</title>
</head>
<body>

<svg width="100" height="100">
<line x1="0" y1="0" x2="50" y2="10"
style="stroke:black" />
</svg>

</body>
</html>
```

:::

## 视窗单位

::: normal-demo

```html
<svg width="100" height="100" viewBox="0 0 10 10" >
<path d="M 0 0 L 100 100 "
style="stroke:black; fill:yellow; stroke-width:0.5" />
</svg>
```

:::

## reactangle

::: normal-demo
其中 {rx="15" ry="15"}是圆角,如果只选了一个,那另一个就是一样的值

```html
<svg width="100" height="100">
<rect x="9" y="0" width="30" height="80" rx="15" ry="15"
style="fill:green; stroke:blue; stroke-width:5"/>
</svg>
```

:::

## circle

::: normal-demo

```html
<svg width="100" height="100">
<circle cx="50" cy="50" r="50"
style="fill:yellow; stroke:blue; stroke-width:5" />
</svg>
```

:::

### ellipse

::: normal-demo

```html
<svg width="100" height="100">
<ellipse cx="50" cy="50" rx="50" ry="30"
style="fill:yellow; stroke:red; stroke-width:5" />
</svg>
```

:::

### polygon多边形

::: normal-demo

```html
<svg width="100" height="100">
<polygon points="0 0, 40 20, 90 90, 10 70"
style="stroke: blue; fill: yellow;" />
</svg>
```

:::

- 数字可以用空格或逗号分隔
- 每对数字代表一个点，即一个点的{ x，y }坐标
- 必须有偶数个值
- 最后一点将连接到第一点

如果由点构成的线相互交叉，则可以使用样式填充规则指定如何确定内部/外部。

### 折线

折线类似于多边形元素，只是最后一个点没有连接到第一个点。

### 文本

::: normal-demo

```html
<svg width="100" height="100">
<text x="10" y="20">cats</text>
</svg>
```

:::

### 路径

::: normal-demo

```html
<svg width="100" height="100">
<path d="M 0 0 L 50 50 L 40 10 m 40 10 l 10 10"
style="stroke:black; fill:green"></svg>
```

:::

- `M` 移动到

- `L` 一条线

- `m`

  Moveto (相对于前一点的坐标)

- `l`

  (相对于前一点的坐标)

### 三次样条曲线路径

路径标签是最通用和最常用的。它可以用来绘制曲线使用贝塞尔曲线。
::: normal-demo

```html
 
<svg width="100" height="100">
<path d="M 10 20 C 50 -15 90 45 10 80 L 60 80"
style="stroke:black; fill:none" />
</svg>
```

:::

## svg动画

SVG 可以通过以下方式动画:

动画
SVG 动画。(又名 SVG SMIL。(SMIL 的意思是同步多媒体集成语言) SMIL 是基于 XML 的动画的通用规范。在 SVG 中，SMIL 基本上意味着为动画设计的一些 SVG 标记)
网页动画→ DOM API，允许 JavaScript 直接设置 CSS 动画和 CSS 转换，而不需要操纵 CSS
JavaScript →通常使用 JavaScript。例如: 创建一个定时循环来绘制、移动、隐藏、删除等元素
截至2017-12年度:

所有浏览器都支持 CSS 动画
支持 SVG 动画，但不支持 Edge 和 Google Internet Explorer
基本功能支持 Google Chrome，Firefox，但不支持 Safari，Edge，Google Internet Explorer
SVG 动画是最强大的。因为，它支持通过一条路径移动一个形状(像过山车) ，或者随着时间改变一条路径(像一条移动的蛇)。

动画是最不强大的。它基本上意味着，使用转换属性移动或应用几何变换到一个元素。几何变换是非常有限的，它基本上只是意味着缩放，剪切，旋转，平移。[参见 CSS: 2D Transform ]

Web Animation“ API”(DOM 的一部分)允许 JavaScript 直接操作元素的几何形状，但基本上类似于 CSS 动画提供的功能。

以上都是声明性样式。也就是说，您指定形状、位置和时间，浏览器为每一帧生成(有效的)代码，结果是平滑的动画。

使用 JavaScript 编写循环和计时来创建动画，是最糟糕的方法，因为这涉及到繁琐的代码，最不顺畅，最占用 CPU 资源。

在动画中使用 JavaScript 也是最强大的，这是其他动画技术无法做到的。例如，流体动力学的模拟，风向矢量场随时间的变化等。

动画
要学习 CSS 动画，您需要学习以下所有主题。

2 d Transform
转换
动画
网页动画
网页动画

SVG 动画
下面是一个 SVG 动画示例。点击红色方块。

下面是代码。
::: normal-demo

```html
<svg>
<rect id="s67180" x="0" y="50" width="50" height="50" style="fill:red" />

<animate xlink:href="#s67180"
 attributeName="x"
 from="0"
 to="100"
 dur="2s"
 begin="click"
 fill="freeze" />

</svg>
```

:::
该代码表示，将给定 shape 元素 id 的属性值从0改为100，持续时间2秒，单击开始。当动画结束时，显示最后一帧(填充 = “冻结”)。

用于动画的 SVG 标签
SVG 提供了以下用于制作动画的标记。

animate
随时间改变属性值
animateMotion
沿着路径移动一个元素
animateTransform
更改属性的值 。(基本上意味着，旋转，移动，规模，剪切。)
set
一个简便的速记法 ，这对于为非数值属性和属性分配动画值非常有用，例如 财产
注意: 也有 animateccolor，但不推荐使用。只需使用 animate
有关指定 SVG 样式的方法，请参见: SVG: specification Styles。

## 样式属性

下面是 SVG 形状元素最基本的样式属性列表。

- `stroke`

  价值是一个 或 。违约是`none`

- `stroke-width`

  价值就是一个百分比的例子: ，相对于视图端口。或者, 价值 值可以是 a ，例如: (注意，CSS 长度需要一个单位) ，或者只需要一个整数。如果只是一个整数，则表示当前坐标的单位。违约是`1`

- `stroke-dasharray`

  值应该是一个数对的序列，例如, 。如果缺少一个，则使用第一个值填充最后一个值。默认值为`none`

- `stroke-linecap`

  线端的形状。可能的值是:`butt`, `round`, 。违约是`butt`

- `stroke-linejoin`

  多边形弯曲的形状。可能的值是:`miter`, `round`, 。违约是`miter`

- `stroke-miterlimit`

  值是一个整数。最大斜接点与线条粗细之比。默认值为`4`

- `stroke-opacity`

  值为0:1。值为0表示透明。默认值为`1`

- `fill`

  价值是一个 或 。违约是`black`

- `fill-opacity`

  值为0:1。值为0表示透明。默认值为`1`

- `fill-rule`

  可能的值是: {`nonzero`, `evenodd`, }.当一个形状与自身相交时使用。该值用于确定“内部”着色。违约是`nonzero`

## 中风例子

### 破折号示例

```
stroke-dasharray:20 5
stroke-dasharray:10 5 90 30
```

### 行程线图示例

```
stroke-linecap:butt
stroke-linecap:round
stroke-linecap:square
```

下面是代码:
::: normal-demo

```html
<svg width="100" height="100">
<line  x1="20" y1="50" x2="80" y2="50"
 style="stroke:blue; stroke-width:20;
stroke-linecap:butt" />
</svg>
```

:::

### 线性连接示例

```
stroke-linejoin:miter
stroke-linejoin:round
```

::: normal-demo

```html
<svg width="200" height="200">
<polygon points="
0 0
150 150
150 100
0 100
"
style="stroke: blue; fill: yellow;
stroke-width:20;
stroke-linejoin:bevel
" />
</svg>
stroke-linejoin:bevel
```

:::

## 填充不透明例子

::: normal-demo

```html
<svg width="100" height="100">
<rect x="9" y="0" width="30" height="80"
style="fill:green; stroke:blue; stroke-width:20;
stroke-opacity:.5;
fill-opacity:.5" />
<circle cx="70" cy="70" r="50"
style="fill:yellow; stroke:red; stroke-width:20;
stroke-opacity:.5;
fill-opacity:.5" />
</svg>
```

:::

例子

注意: 在绘制轮廓之前先填充形状。

一半的笔画宽度将与填充重叠。当笔画很粗(大笔画宽度)时，这一点尤为明显。
