---
index: 1
---
# svg基础

svg是xml文档,所以你可以直接放在html里面

:::demo line

```html
<svg width="100" height="100">
<line x1="0" y1="0" x2="50" y2="10"
style="stroke:black" />
</svg>
```

:::

完整的html如下
:::demo

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

## reactangle

:::demo
其中 {rx="15" ry="15"}是圆角,如果只选了一个,那另一个就是一样的值

```html
<svg width="100" height="100">
<rect x="9" y="0" width="30" height="80" rx="15" ry="15"
style="fill:green; stroke:blue; stroke-width:5"/>
</svg>
```

:::

## circle

:::demo

```html
<svg width="100" height="100">
<circle cx="50" cy="50" r="50"
style="fill:yellow; stroke:blue; stroke-width:5" />
</svg>
```

:::

### ellipse

:::demo

```html
<svg width="100" height="100">
<ellipse cx="50" cy="50" rx="50" ry="30"
style="fill:yellow; stroke:red; stroke-width:5" />
</svg>
```

:::

### polygon多边形

:::demo

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

:::demo

```html
<svg width="100" height="100">
<text x="10" y="20">cats</text>
</svg>
```

:::

### 路径

:::demo

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
:::demo

```html
 
<svg width="100" height="100">
<path d="M 10 20 C 50 -15 90 45 10 80 L 60 80"
style="stroke:black; fill:none" />
</svg>
```

:::
