# filter

<CssDemo :css-list='cssList' :image='image' />

<script setup>
    import { h, ref } from 'vue'
    let cssList= ref([
  {filter:'blur(5px)'},
  {filter:'contrast(200%)'},
  {filter:'grayscale(80%)'},
  {filter:'hue-rotate(90deg)'},
  {filter: 'drop-shadow(30px 10px 4px #4444dd)'},
  {filter:'drop-shadow(16px 16px 20px red) invert(75%)'},
  {filter:'drop-shadow(0 0 0.75rem crimson)'},
])
let image= ref('https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg')

</script>
语法

```css
/* URL to SVG filter */
filter: url("filters.svg#filter-id");

/* <filter-function> values */
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);

/* Multiple filters */
filter: contrast(175%) brightness(3%);

/* Use no filter */
filter: none;

/* Global values */
filter: inherit;
filter: initial;
filter: revert;
filter: revert-layer;
filter: unset;

```

`<filter-function>` 数据类型由下列过滤器函数之一指定的。每个函数需要一个参数，如果参数无效，结果不会被改变，如同没有使用过滤器一样。

- `blur()`

  模糊图像

- `brightness()`

  让图像更明亮或更暗淡

- `contrast()`

  增加或减少图像的对比度

- `drop-shadow()`

  在图像后方应用投影

- `grayscale()`

  将图像转为灰度图

- `hue-rotate()`

  改变图像的整体色调

- `invert()`

  反转图像颜色

- `opacity()`

  改变图像透明度

- `saturate()`

  超饱和或去饱和输入的图像

- `sepia()`

  将图像转为棕褐色
