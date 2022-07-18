# 动画

:::tip
<https://cssanimation.rocks/>
:::
:::normal-demo

```css
p {
  animation-duration: 3s;
  animation-name: slidein;
}
div
{
 width:100px;
 height:100px;
 background:red;
 animation:myfirst 5s;
 -moz-animation:myfirst 5s; /* Firefox */
 -webkit-animation:myfirst 5s; /* Safari and Chrome */
 -o-animation:myfirst 5s; /* Opera */
}

@keyframes myfirst
{
 0%   {background:red;}
 25%  {background:yellow;}
 50%  {background:blue;}
 100% {background:green;}
}
@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```

```html
<p>The Caterpillar and Alice looked at each other for some time in silence:
at last the Caterpillar took the hookah out of its mouth, and addressed
her in a languid, sleepy voice.</p>

<div >对对对</div>

```

:::
