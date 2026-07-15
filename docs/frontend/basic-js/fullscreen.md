# 全屏 API

Fullscreen API 允许将元素（或整个页面）以全屏模式显示。

## 进入全屏

```js
const elem = document.getElementById('myElement')

// 进入全屏
if (elem.requestFullscreen) {
  elem.requestFullscreen()
}
```

::: normal-demo

```html
<div id="fullscreenDemo" style="padding:40px;background:#e3f2fd;text-align:center;cursor:pointer;border-radius:8px;">
  点击此区域进入全屏
</div>
```

```js
document.getElementById('fullscreenDemo').addEventListener('click', function () {
  if (this.requestFullscreen) {
    this.requestFullscreen()
  }
})
```

:::

## 退出全屏

```js
// 退出全屏（由 document 调用）
if (document.exitFullscreen) {
  document.exitFullscreen()
}
```

## 检测全屏状态

```js
// 返回当前全屏元素，没有则为 null
document.fullscreenElement

// 检测是否处于全屏模式
if (document.fullscreenElement) {
  console.log('当前处于全屏模式')
} else {
  console.log('不在全屏模式')
}
```

## 全屏事件

```js
// 进入全屏时触发
document.addEventListener('fullscreenchange', function () {
  if (document.fullscreenElement) {
    console.log('进入全屏模式')
  } else {
    console.log('退出全屏模式')
  }
})

// 全屏失败时触发
document.addEventListener('fullscreenerror', function () {
  console.error('无法进入全屏模式')
})
```

## CSS 全屏样式

通过 `:fullscreen` 伪类为全屏元素设置特殊样式：

```css
#myElement:fullscreen {
  background: #000;
  width: 100vw;
  height: 100vh;
}
```

## 完整示例

::: normal-demo

```html
<div id="container" style="padding:20px;background:#f5f5f5;text-align:center;border-radius:8px;">
  <p>全屏状态：<span id="status">否</span></p>
  <button id="enterBtn">进入全屏</button>
  <button id="exitBtn">退出全屏</button>
</div>
```

```js
const container = document.getElementById('container')
const status = document.getElementById('status')

document.getElementById('enterBtn').addEventListener('click', () => {
  container.requestFullscreen?.()
})

document.getElementById('exitBtn').addEventListener('click', () => {
  document.exitFullscreen?.()
})

document.addEventListener('fullscreenchange', () => {
  status.textContent = document.fullscreenElement ? '是' : '否'
})
```

:::

## 注意事项

- 必须在用户手势（如点击、按键）中调用，不能自动触发
- 不同浏览器可能有前缀实现（如 `webkitRequestFullscreen`），建议做兼容处理
- 同一时间只有一个元素处于全屏状态
- 出于安全考虑，全屏模式下键盘事件受限（仅保留部分功能键）
