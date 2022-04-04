# 一些在控制台好用的js脚本

## 在iconfont批量添加图标

[https://www.iconfont.cn/collections](https://www.iconfont.cn/collections)

```js
// 先选择最外层的ul
let ul=document.querySelectorAll('.block-icon-list.clearfix')[1].children
// 然后遍历子类li
for (let li of ul){
    li.querySelectorAll('.cover-item.iconfont.cover-item-line.icon-gouwuche1')[0].click()
}


```

或者

```js
[...document.querySelectorAll('.cover-item.iconfont.cover-item-line.icon-gouwuche1')].forEach(i=>i.click())
//获取所有的iconname
let arr=[];
[...document.querySelectorAll('.icon-name')].forEach(i=>arr.push(i.innerText))
```

## 抖音获取喜欢的列表

```js
let arr=[];
[...document.querySelectorAll('.B3AsdZT9.chmb2GX8.UwG3qaZV')].forEach(i=>{
    console.log(i.href);arr.push(i.href)
    })
```
