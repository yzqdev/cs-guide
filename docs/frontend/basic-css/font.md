# 字体

:::normal-demo

```html
<section>
<div class='normal'>这是普通字体</div>
<div class='bigger'>这是两倍字体</div>
<div class='bold'>这是bold字体</div>
<div class='family'>This is Consolas</div>
</section>
```

```css
div{
    height:auto;
    width:100%;
}
.bigger{
    font-size:2rem;
}
.family{
    font: italic 1.2em "Consolas", serif;
}
.bold{
    font-weight:bold;
}
```

:::
