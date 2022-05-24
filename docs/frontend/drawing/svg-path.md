---
index: 2
---
# 路径(path)基础

Path 元素是最强大和最有用的元素。它可以有效地替换任何其他 SVG 形状，如{ rect，circle，line，polygon }。

Path 元素也是最难理解的元素。如果您使用 JavaScript 编写 SVG 脚本，那么理解 path 元素是必不可少的。

## 移动到,画条线

::: normal-demo

```html
<svg width="100" height="100">
<path d="M 0 0 L 50 0 L 0 50 L 90 90"
style="stroke:black; fill:yellow; stroke-width:5" />
</svg>
```

:::

- `M x y`

  把笔移到x y.

- `L x y`

  画一条线x y.

## 路径的默认笔划样式

警告: 默认情况下，路径的笔划样式为无。因此，您需要添加 style = “ stroke: red”或类似的内容。[参见 SVG: 形状样式]
::: normal-demo

```html
<svg width="100" height="100">
<path d="M 0 0 L 50 50" />
</svg>
```

:::
线是不可见的，因为默认 风格是`none`

下面是同一行的一个例子，添加了样式。

::: normal-demo

```html
<svg width="100" height="100">
<path d="M 0 0 L 50 50" style="stroke:blue" />
</svg>
```

:::

[参见 SVG: 形状样式]

## 小写字母 = 相对坐标

::: normal-demo

```html
<svg width="100" height="100">
<path d="m 50 0
l  8 5
l -8 5
l  8 5
l -8 5
l  8 5
l -8 5
l  8 5
l -8 5"
style="stroke:black; fill:yellow" />
</svg>
```

:::

小写命令名的意思是使用相对坐标(相对于当前点)。所以，在这里，我们使用 l z 字形。每次 y 坐标增加5，而 x 向右增加8，向左增加 -8。

小写和大写命令可以混合使用。

::: normal-demo

```html
<svg width="100" height="100">
<path d="M 0 0 L 50 50 l 20 -10 l 10 30 m -10 5 l -20 8"
style="stroke:black; fill:none;" />
</svg>
```

:::

## 关闭路径

::: normal-demo

```html
<svg width="100" height="100">
<path d="m 10 10 l 0 20 l 30 30 z"
style="stroke:black; fill:yellow" />
</svg>
```

:::

- `z`

  关闭路径。画一条直线到起点

## 水平线、垂直线的快捷记法

水平线有一个快捷的符号。你可以写 h30，而不是 l30。同样的垂直线。

::: normal-demo

```html
<svg width="100" height="100">
<path d="M 10 10 h 10 v 10 h 10 v 10 h 10 v 10"
style="stroke:black; fill:yellow" />
</svg>
```

:::

- `H x`

  水平线到。 y 坐标与当前点的 y 坐标相同

- `h x`

  横线到, 相对于当前点的单位

- `V y`

  垂直线到。 x 坐标与当前点的 x 坐标相同

- `v y`

  垂直线到, 相对于当前点的单位

## 快捷符号，逗号，冗余空格

命令字母之间或负数之前的多余空格可以省略。例如:

- 和... 一样`M 7 8 L 3 4`.
- 和... 一样`L 3 -4`.
- 后面可以跟多对数字 和... 一样`L 3 4 L 5 6`.
- 空格和逗号是可以互换的 和... 一样 或`L 3,4,5,6`.

## 椭圆弧

路径: 椭圆弧

## 二次贝塞尔曲线

二次贝塞尔曲线只有一个控制点。

::: normal-demo

```html
<svg width="100" height="100">
<path d="M 0 0 Q 100 0 , 100 100"
style="stroke:black; fill:yellow" />
</svg>
```

:::

- `Q a1 a2 x y`

  画二次贝塞尔曲线到{x, } ，控制点为{a1, a2}.

- `q`

  (相对坐标)

::: normal-demo

```html
<svg width="100" height="100">
<path d="M 0 0 Q 100 0 , 50 50 T 100 100"
style="stroke:black; fill:yellow" />
</svg>
```

:::

- `T x y`

  与 q 相同，只是控制点是前一个 q 的反射，如果没有反射，则使用当前点

- `t`

  (相对坐标)

## 三次 Bezier 曲线

三次贝塞尔曲线有2个控制点。

::: normal-demo

```html
<svg width="100" height="100">
<path d="M 0 0 C 100 0, 0 100, 100 100"
 style="stroke:black; fill:yellow" />
</svg>
```

:::

- `C a1 a2 b1 b2 x y`

  画三次贝塞尔曲线到{x, 的控制点a1 和{b1 b2}.

- `c`

  (相对坐标)

- `S b1 b2 x y`

  与 c 相同，只是第一个控制点是通过电流点反射的最后一个 c 的结束控制点。如果最后一个命令不是 c，那么使用当前点作为第一个控制点

- `s`

  (相对坐标)
