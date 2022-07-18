# box-shadow

<CssDemo :css-list='cssList' />

<script setup>
    import { h, ref } from  'vue'
    let cssList= ref([
{'box-shadow': `red 10px 5px 5px `},
        {'box-shadow': `teal 60px -16px`},
        {'box-shadow': `rgba(0, 0, 255, .2) 12px 12px 2px 1px`},
  {'box-shadow': `rgba(149, 157, 165, 0.2) 0px 8px 24px` },
  {'box-shadow': `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`},
  {'box-shadow': `rgba(0, 0, 0, 0.25) 0px 54px 55px,
   rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
   rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px`},
  {'box-shadow': `rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px`},
  {'box-shadow': `rgb(38, 57, 77) 0px 20px 30px -10px`},
])
</script>
语法

```css
/* x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
```

:::normal-demo

```html

<div class='demo first'> </div>
<div class='demo second'> </div>
<div class='demo'> </div>
<div class='demo'> </div>
<blockquote><q>You may shoot me with your words,<br/>
You may cut me with your eyes,<br/>
You may kill me with your hatefulness,<br/>
But still, like air, I'll rise.</q>
<p>&mdash; Maya Angelou</p>
</blockquote>
```

```css
.demo{

    margin: 1rem 0;
    width:100%;
    height:1.5rem;
}
.first{
box-shadow: blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px,
   rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px,
    rgb(255, 217, 19) 20px -20px,
     rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px,
      rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px;
}
blockquote {
  padding: 20px;
  box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
}
```

:::
