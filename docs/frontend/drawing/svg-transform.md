---
index: 4
---
# 坐标转换

转换属性对一个形状执行几何变换操作，语法如下:

Transform = “ function1(...) function2(...) ...”

默认情况下，SVG 提供以下转换函数:

- `translate`
- `scale`
- `reflect`
- `rotate`
- 还有更多

下面是一些例子。

## 翻译

- `transform="translate(x y)"`

  快走 右边的单位 机组故障

```
<svg width="100" height="100">

<rect x="0" y="0" width="10" height="20"
 style="fill:gray"
/>

<rect x="0" y="0" width="10" height="20"
 style="fill:blue;"
 transform="translate(20 40)"/>

</svg>
```

## 比例

- `transform="scale(s)"`

  按系数均匀地比例 ，关于起源

- `transform="scale(s1, s2)"`

  X 比例因子 ，y 量表的倍数s2.

```
<svg width="100" height="100">

<circle cx="0" cy="0" r="10" style="fill:none; stroke:gray" />

<circle cx="0" cy="0" r="10" style="fill:none; stroke:blue" transform="scale(2)" />

</svg>
```

这是另一个例子。注意，我们以一个以{10,10}为中心的圆开始。缩放后，它的中心发生了变化。因为转换是针对{0,0}完成的。也就是说，任何点{ x，y }变成{ x *s，y* s }。

```
<svg width="100" height="100">

<circle cx="10" cy="10" r="10" style="fill:none; stroke:gray" />

<circle cx="10" cy="10" r="10" style="fill:none; stroke:blue" transform="scale(2)" />

</svg>
```

您可以通过 transform = “ scale (s1，s2)”来分别缩放 x 和 y 坐标。

```
<svg width="100" height="100">

<circle cx="10" cy="10" r="10" style="fill:none; stroke:gray" />

<circle cx="10" cy="10" r="10" style="fill:none; stroke:blue" transform="scale(2, 3)" />

</svg>
```

## 围绕原点旋转

- `transform="rotate(α)"`

  旋转 原点周围度，正数 是顺时针方向

```
<svg width="100" height="100">

<rect x="50" y="0" width="10" height="20"
 style="fill:none; stroke:gray;"
/>

<rect x="50" y="0" width="10" height="20"
 style="fill:blue;"
 transform="rotate(30)"/>

<rect x="50" y="0" width="10" height="20"
 style="fill:red;"
 transform="rotate(60)"/>

</svg>
```

## 围绕一个点旋转

- `transform="rotate(α x y)"`

  旋转 度，大约点{x, 肯定的 是顺时针方向

```
<svg width="100" height="100">

<rect x="50" y="0" width="10" height="20"
 style="fill:none; stroke:gray;"
/>

<rect x="50" y="0" width="10" height="20"
 style="fill:blue;"
 transform="rotate(30 50 0)"/>

<rect x="50" y="0" width="10" height="20"
 style="fill:red;"
 transform="rotate(60 50 0)"/>

</svg>
```

## 斜 x

- `transform="skewX(α)"`

  斜 x 坐标由 度

```
<svg width="100" height="100">

<rect x="10" y="10" width="30" height="30"
 style="fill:none; stroke:gray;"
/>

<rect x="10" y="10" width="30" height="30"
 style="fill:none; stroke:blue;"
 transform="skewX(20)"
/>

</svg>
```

## 斜 y

- `transform="skewY(α)"`

  斜 y 坐标由 度

这是一个正方形和螺旋形的结果。

```
<svg width="100" height="100">

<rect x="10" y="10" width="30" height="30"
 style="fill:none; stroke:gray;"
/>

<rect x="10" y="10" width="30" height="30"
 style="fill:none; stroke:blue;"
 transform="skewY(20)"/>

</svg>
```

## 结合变换

多重变换可以组合起来，像这样:

变换 =”... f3 f2 f1”

注意: 首先使用最右边的函数执行转换。(与群论或线性代数矩阵乘法中的约定相同)

这是一个长方形。

```
<svg width="100" height="100">
<rect x="0" y="0" width="10" height="20" />
</svg>
```

这是一个矩形，经过平移然后旋转(按照这个顺序)。

```
<svg width="100" height="100">
<rect x="0" y="0" width="10" height="20"
 style="fill:blue;"
 transform="rotate(30) translate(40 0)" />
</svg>
```

这是一个矩形，旋转然后平移(按这个顺序)。

```
<svg width="100" height="100">
<rect x="0" y="0" width="10" height="20"
 style="fill:red;"
 transform="translate(40 0) rotate(30)" />
</svg>
```
