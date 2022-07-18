# 边框

<CssDemo :css-list='cssList' />

<script setup>
    import { h, ref } from 'vue'
    let cssList= ref([
  {border:'2px solid red'},
  {border:'2px dashed cyan'},
  {border:'1rem solid yellow'},
  {border:'2px solid yellow'},
  {border: 'thick double rgb(50, 161, 206)'},
  {border:'4mm ridge rgba(211,220,50,.6)'},
])
</script>
Borders vs. outlines
边界border和轮廓outline很相似。然而轮廓在以下方面与边界不同

- 轮廓不占据空间，他们在元素内容之外绘制
- 根据规范，轮廓不必为矩形，尽管通常是矩形。

语法

```css
/* style */
border: solid;

/* width | style */
border: 2px dotted;

/* style | color */
border: outset #f33;

/* width | style | color */
border: medium dashed green;

/* Global values */
border: inherit;
border: initial;
border: unset;

```

:::normal-demo

```html
<div>I have a border, an outline, AND a box shadow! Amazing, isn't it?</div>
```

```css
div {
  border: 0.5rem outset pink;
  outline: 0.5rem solid khaki;
  box-shadow: 0 0 0 2rem skyblue;
  border-radius: 12px;
  font: bold 1rem sans-serif;
  margin: 2rem;
  padding: 1rem;
  outline-offset: 0.5rem;
}
```

:::
