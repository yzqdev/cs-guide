# 全屏api

:::demo

```html
<div  id="myvideo">
   这是一个div ,点击进去全屏
</div>
```

```js
var elem = document.getElementById("myvideo");
elem.addEventListener('click',function(){
    if (elem.requestFullscreen) {
  elem.requestFullscreen();
}
})

```

:::
