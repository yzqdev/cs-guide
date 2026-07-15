# 使用 canvas

`<canvas>` 是 HTML5 提供的绘图元素，通过 JavaScript 在网页上绘制图形、文本、图像和动画。

:::tip

[MDN Canvas API 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

:::

## 基本用法

```html
<canvas id="myCanvas" width="400" height="300"></canvas>
```

```js
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
```

## 绘制图形

### 矩形

```js
// 填充矩形
ctx.fillStyle = '#FF0000'
ctx.fillRect(10, 10, 100, 50)

// 空心矩形（边框）
ctx.strokeStyle = '#0000FF'
ctx.lineWidth = 2
ctx.strokeRect(130, 10, 100, 50)

// 清除区域
ctx.clearRect(20, 20, 80, 30)
```

::: normal-demo

```html
<canvas id="rectDemo" width="300" height="100"></canvas>
```

```js
const c = document.getElementById('rectDemo')
const ctx = c.getContext('2d')
ctx.fillStyle = '#4CAF50'
ctx.fillRect(10, 10, 80, 60)
ctx.strokeStyle = '#2196F3'
ctx.lineWidth = 3
ctx.strokeRect(120, 10, 80, 60)
```

:::

### 路径与形状

```js
// 绘制三角形
ctx.beginPath()
ctx.moveTo(50, 10)
ctx.lineTo(10, 90)
ctx.lineTo(90, 90)
ctx.closePath()
ctx.fillStyle = '#FF9800'
ctx.fill()

// 绘制圆形
ctx.beginPath()
ctx.arc(150, 50, 40, 0, Math.PI * 2)
ctx.fillStyle = '#9C27B0'
ctx.fill()

// 绘制弧线
ctx.beginPath()
ctx.arc(250, 50, 40, 0, Math.PI)
ctx.stroke()
```

### 线条样式

```js
ctx.lineWidth = 5
ctx.lineCap = 'round'    // butt | round | square
ctx.lineJoin = 'bevel'   // round | bevel | miter
ctx.strokeStyle = '#E91E63'
```

## 绘制文本

```js
ctx.font = '30px Arial'
ctx.fillStyle = '#333'
ctx.fillText('Hello Canvas', 10, 50)

// 空心文本
ctx.strokeStyle = '#999'
ctx.lineWidth = 1
ctx.strokeText('Hello Canvas', 10, 100)

// 文本对齐
ctx.textAlign = 'center'   // left | center | right
ctx.textBaseline = 'middle' // top | middle | bottom
```

::: normal-demo

```html
<canvas id="textDemo" width="400" height="120"></canvas>
```

```js
const c = document.getElementById('textDemo')
const ctx = c.getContext('2d')
ctx.font = 'bold 36px sans-serif'
ctx.fillStyle = '#E91E63'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillText('Canvas 文本', c.width / 2, c.height / 2)
```

:::

## 绘制图像

```js
const img = new Image()
img.src = 'image.png'
img.onload = function () {
  // 原图绘制
  ctx.drawImage(img, 0, 0)
  // 缩放绘制
  ctx.drawImage(img, 100, 0, 200, 100)
  // 裁剪绘制 (源图区域 → 目标区域)
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
}
```

## 颜色与渐变

```js
// 线性渐变
const gradient = ctx.createLinearGradient(0, 0, 200, 0)
gradient.addColorStop(0, '#FF0000')
gradient.addColorStop(1, '#0000FF')
ctx.fillStyle = gradient
ctx.fillRect(0, 0, 200, 100)

// 径向渐变
const radial = ctx.createRadialGradient(100, 50, 10, 100, 50, 50)
radial.addColorStop(0, '#FFF')
radial.addColorStop(1, '#000')
ctx.fillStyle = radial
ctx.fillRect(0, 0, 200, 100)
```

## 变换

```js
ctx.translate(100, 50)    // 平移
ctx.rotate(Math.PI / 4)   // 旋转（弧度）
ctx.scale(2, 2)           // 缩放
ctx.save()                // 保存当前状态
ctx.restore()             // 恢复之前保存的状态
```

## 阴影

```js
ctx.shadowColor = 'rgba(0,0,0,0.5)'
ctx.shadowBlur = 10
ctx.shadowOffsetX = 5
ctx.shadowOffsetY = 5
ctx.fillRect(10, 10, 100, 60)
```

## 动画

使用 `requestAnimationFrame` 创建平滑动画：

```js
function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新状态
  x += dx
  y += dy

  // 绘制
  ctx.beginPath()
  ctx.arc(x, y, 20, 0, Math.PI * 2)
  ctx.fill()

  requestAnimationFrame(drawFrame)
}
drawFrame()
```

::: normal-demo

```html
<canvas id="animDemo" width="400" height="150"></canvas>
```

```js
const c = document.getElementById('animDemo')
const ctx = c.getContext('2d')
let x = 20, dx = 2

function animate() {
  ctx.clearRect(0, 0, c.width, c.height)
  ctx.beginPath()
  ctx.arc(x, 75, 15, 0, Math.PI * 2)
  ctx.fillStyle = '#FF5722'
  ctx.fill()
  x += dx
  if (x > c.width - 15 || x < 15) dx = -dx
  requestAnimationFrame(animate)
}
animate()
```

:::

## 像素操作

```js
const imageData = ctx.getImageData(0, 0, width, height)
const data = imageData.data // [R,G,B,A, R,G,B,A, ...]

// 修改像素（反色）
for (let i = 0; i < data.length; i += 4) {
  data[i] = 255 - data[i]     // R
  data[i + 1] = 255 - data[i + 1] // G
  data[i + 2] = 255 - data[i + 2] // B
}
ctx.putImageData(imageData, 0, 0)
```
