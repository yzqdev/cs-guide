# 滚动条美化

:::normal-demo

```html
<div class='scroll-div' style="height:300px;width:100%"></div>

```

```css
scroll-div::-webkit-scrollbar {
  width: 7px;
  height: 5px;
  border-radius:15px;
  -webkit-border-radius:  15px;
}
scroll-div::-webkit-scrollbar-track-piece {
  background-color: #fff;
  border-radius:15px;
  -webkit-border-radius:  15px;
}
scroll-div::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: rgba(144, 147, 153, 0.5);
  border-radius: 15px;
  -webkit-border-radius:  15px;
}
scroll-div::-webkit-scrollbar-thumb:horizontal {
  width: 7px;
  background-color: rgba(144, 147, 153, 0.5);
  border-radius:  15px;  
  -webkit-border-radius: 15px;
}

```

:::
