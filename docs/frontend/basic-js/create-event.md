# 创建自定义事件

## 基本事件

::: normal-demo

```html
<button id='btn'>点击我</button>
<div id='div1'>这是一个div</div>
```

```js

let ev = new Event("look", {"bubbles":true, "cancelable":false});
document.getElementById('div1').addEventListener("look", e => {
 alert(`look事件触发了! `);
});
document.getElementById("btn").addEventListener(
  "click", function () {
    // 派发事件
  document.getElementById('div1').dispatchEvent(ev);
  }
)
```

:::

## customEvent

::: normal-demo

```html
<button id='btn'>点击我</button>
```

```js
// 创建事件
let myEvent = new CustomEvent("pingan", {
 detail: { name: "wangpingan" }
});

// 添加适当的事件监听器
window.addEventListener("pingan", e => {
 alert(`pingan事件触发，是 ${e.detail.name} 触发。`);
});
document.getElementById("btn").addEventListener(
  "click", function () {
    // 派发事件
  window.dispatchEvent(myEvent);
  }
)
```

:::
