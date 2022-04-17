# 剪切板api

:::tip

`document.execCommand`已经废弃了  
推荐用[clipboard](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API)
:::

:::demo

```html
<button onclick='run()'>点击我(会把剪切板的内容复制到下面的div里面)</button>
<div id='editor'>#editor</div>
```

```js
function run (){
    navigator.clipboard.readText().then(
  clipText => document.querySelector("#editor").innerText += clipText);
}

```

:::

## 写入剪切板

:::demo

```html
<button onclick='run()'>点击我(会把下面的div里面复制到剪切板的)</button>
<div id='editor'>复制我12345678</div>
```

```js
function run (){
    navigator.clipboard.writeText(document.querySelector("#editor").innerText).then(function() {
  /*clipboard successfully set*/
  alert('复制成功')
}, function() {
     alert('复制失败')
  /*clipboard write failed*/
});
}


```

:::
