# 变形

## 尝试一下

<CssDemo :css-list='cssList' :image='image' />

<script setup>
    import { h, ref } from 'vue'
    let cssList= ref([
  {transform: 'matrix(1, 2, 3, 4, 5, 6)'},
  {transform:' translate(120px, 50%)'},
  {transform: 'scale(2, 0.5)'},
  {transform: 'rotate(0.5turn)'},
  {transform: 'rotateX(10deg)'},
  {transform: 'skew(30deg, 20deg)'},
  {transform: 'scale(0.5) translate(-100%, -100%)'},
  {transform: 'translate3d(12px, 50%, 3em)'},

])
let image= ref('https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg')

</script>
语法

```css
/* Keyword values */
transform: none;

/* Function values */
transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
transform: translate(12px, 50%);
transform: translateX(2em);
transform: translateY(3in);
transform: scale(2, 0.5);
transform: scaleX(2);
transform: scaleY(0.5);
transform: rotate(0.5turn);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);
transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: perspective(17px);

/* Multiple function values */
transform: translateX(10px) rotate(10deg) translateY(5px);

/* Global values */
transform: inherit;
transform: initial;
transform: unset;

```
