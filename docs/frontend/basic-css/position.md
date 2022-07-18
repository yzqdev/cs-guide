# position

:::normal-demo

```html
<div class="box" id="one">One</div>
<div class="box" id="two">Two</div>
<div class="box" id="three">Three</div>
<div class="box" id="four">Four</div>

```

```css

.box {
  display: inline-block;
  width: 100px;
  height: 100px;
  background: red;
  color: white;
}

#two {
  position: relative;
  top: 20px;
  left: 20px;
  background: blue;
}

```

:::

## absolute

:::normal-demo

```html
<div class="box" id="one">One</div>
<div class="box" id="two">Two</div>
<div class="box" id="three">Three</div>
<div class="box" id="four">Four</div>
```

```css
.box {
   display: inline-block;
   background: red;
   width: 100px;
   height: 100px;
   float: left;
   margin: 20px;
   color: white;
}

#three {
   position: absolute;
   top: 20px;
   left: 20px;
}

```

:::

## fixed

## sticky
