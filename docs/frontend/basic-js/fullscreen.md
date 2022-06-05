# 全屏api

::: normal-demo

```html
<div  id="myvideo">
   这是一个div ,点击进去全屏
</div>
```

```js
let elem = document.getElementById("myvideo");
elem.addEventListener('click',function(){
    if (elem.requestFullscreen) {
  elem.requestFullscreen();
}
})

```

:::
