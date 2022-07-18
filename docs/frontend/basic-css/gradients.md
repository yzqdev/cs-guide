# 渐变

:::normal-demo

```css
div{
   width:400px;
    padding:1rem;
    
}
.linear-gradient {
   
  background: linear-gradient(to right,
      red, orange, yellow, green, blue, indigo, violet);
}
.radial-gradient {
  background: radial-gradient(red, yellow, rgb(30, 144, 255));
}
.linear-repeat {
  background: repeating-linear-gradient(to top left,
      lightpink, lightpink 5px, white 5px, white 10px);
}

.radial-repeat {
  background: repeating-radial-gradient(powderblue, powderblue 8px, white 8px, white 16px);
}
```

```html
<section>
  <div class='linear-gradient'>1</div>
<br />
<div class='radial-gradient'>2</div><br />
<div class='linear-repeat'>3</div><br />
<div class='radial-repeat'>4</div>
</section>
```

:::
