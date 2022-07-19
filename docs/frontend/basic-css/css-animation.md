# css3动画

1.前言

在月初的时候，发了 CSS3 热身实战--过渡与动画（实现炫酷下拉，手风琴，无缝滚动）。js 的代码库也发过两次，两篇文章。之前也写了 css3 的热身实战，既然热身完了，是时候开始封装 css3 的代码库了，相比起 js 的代码库，css3 的代码库的逻辑性就更加简单了！可以说只要打上注释和一张效果图就可以让大家明白了其中的原理了！

我写代码库的时候，动画效果主要是参考了三个开源项目，nec，hover.css，animate.css 这三个项目的质量非常的高，建议大家去了解。

声明

1.下面将会看到很多个

类似这样的举行，都是 span 标签，样式都是给出的 css

::: normal-demo

```html
<span> demo</span>
```

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}

```

:::
2.关于 class 命名方式，l 代表 left，r 代表 right，t 代表 top，b 代表 bottom，c 代表 center，m 代表 middle。切记

> 文章比较长，但是说得就是两点，大家看得也应该会很快
>
> 1.写出一些 hover 动画和预设动画的运行效果，并且贴出代码
>
> 2.发现几个动画组合，和加上无限动画，反向动画，会有不一样的效果，并且继续研究，看下能不能研究出不一样的东西！

2.hover 动画

说了那么多，是时候进入正文了，

首先是 hover 动画，关于这个概念，我解释下，就是鼠标移上去触发的动画，就是触发了鼠标的 hover 事件时能看到的动画！下面，按照类型，一个一个的写！

## 2-1.简单动画

## 2-1-1 大小变化

::: normal-demo
html

```html
<span class="ech-big">big</span><span class="ech-small">small</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-big,
.ech-small {
  transition: all 0.4s;
}
.ech-big:hover {
  transform: scale(1.1, 1.1);
}
.ech-small:hover {
  transform: scale(0.9, 0.9);
}


```

:::

## 2-1-2 形状变化

::: normal-demo
html

```html
<span class="ech-skew-l">skew-l</span><span class="ech-skew-r">skew-r</span><span class="ech-skew-l-t">skew-l-t</span><span class="ech-skew-r-t">skew-r-t</span><span class="ech-skew-l-b">skew-l-b</span><span class="ech-skew-r-b">skew-r-b</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-skew-l,
.ech-skew-r,
.ech-skew-l-t,
.ech-skew-r-b,
.ech-skew-l-b,
.ech-skew-r-t {
  transition: all 0.4s;
}
.ech-skew-l:hover {
  transform: skew(-15deg);
}

.ech-skew-r:hover {
  transform: skew(15deg);
}

.ech-skew-l-t:hover {
  transform: skew(-15deg);
}

.ech-skew-r-t:hover {
  transform: skew(15deg);
}

.ech-skew-l-b:hover {
  transform: skew(15deg);
}

.ech-skew-r-b:hover {
  transform: skew(-15deg);
}

```

:::

## 2-1-3 旋转角度变化

::: normal-demo
html

```html
<span class="ech-grow-rotate-l">grow-rotate-l</span><span class="ech-grow-rotate-r">grow-rotate-r</span><span class="ech-rotate5">rotate5</span><span class="ech-rotate15">rotate15</span><span class="ech-rotate30">rotate30</span><span class="ech-rotate60">rotate60</span><span class="ech-rotate90">rotate90</span><span class="ech-rotate180">rotate180</span><span class="ech-rotate360">rotate360</span><span class="ech-rotate-5">rotate-5</span><span class="ech-rotate-15">rotate-15</span><span class="ech-rotate-30">rotate-30</span><span class="ech-rotate-60">rotate-60</span><span class="ech-rotate-90">rotate-90</span><span class="ech-rotate-180">rotate-180</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-grow-rotate-l,
.ech-grow-rotate-r,
.ech-rotate5,
.ech-rotate15,
.ech-rotate30,
.ech-rotate60,
.ech-rotate90,
.ech-rotate180,
.ech-rotate360,
.ech-rotate-5,
.ech-rotate-15,
.ech-rotate-30,
.ech-rotate-60,
.ech-rotate-90,
.ech-rotate-180 {
  transition: all 0.4s;
}
.ech-grow-rotate-l:hover {
  transform: scale(1.1) rotate(4deg);
}
.ech-grow-rotate-r:hover {
  transform: scale(1.1) rotate(-4deg);
}
.ech-rotate-5:hover {
  transform: rotate(-5deg);
}
.ech-rotate-15:hover {
  transform: rotate(-15deg);
}

.ech-rotate-30:hover {
  transform: rotate(-30deg);
}

.ech-rotate-60:hover {
  transform: rotate(-60deg);
}

.ech-rotate-90:hover {
  transform: rotate(-90deg);
}

.ech-rotate-180:hover {
  transform: rotate(-180deg);
}
.ech-rotate5:hover {
  transform: rotate(5deg);
}
.ech-rotate15:hover {
  transform: rotate(15deg);
}

.ech-rotate30:hover {
  transform: rotate(30deg);
}

.ech-rotate60:hover {
  transform: rotate(60deg);
}

.ech-rotate90:hover {
  transform: rotate(90deg);
}

.ech-rotate180:hover {
  transform: rotate(180deg);
}

.ech-rotate360:hover {
  transform: rotate(360deg);
}

```

:::

## 2-1-4 位移变化

::: normal-demo
html

```html
<span class="ech-t">up</span>
<span class="ech-b">up</span>
<span class="ech-l">up</span>
<span class="ech-r">up</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-t,
.ech-b,
.ech-l,
.ech-r {
  transition: all 0.4s;
}
.ech-t:hover {
  transform: translate3d(0, -10px, 0);
}

.ech-b:hover {
  transform: translate3d(0, 10px, 0);
}

.ech-l:hover {
  transform: translate3d(-10px, 0, 0);
}

.ech-r:hover {
  transform: translate3d(10px, 0, 0);
}

```

:::

## 2-1-5 边框变化

::: normal-demo
html

```html
<span class="ech-border">border</span>
<span class="ech-border-in">border</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-border,
.ech-border-in {
  transition: all 0.4s;
}
.ech-border:hover {
  box-shadow: 0 0 0 4px #09f, 0 0 1px transparent;
}

.ech-border-in:hover {
  box-shadow: inset 0 0 0 4px #09f, 0 0 1px transparent;
}

```

:::

## 2-1-6 阴影变化

(gif 图看得效果太难看了，大家可以去 github 下载看)
::: normal-demo
html

```html
<span class="ech-shadow">shadow</span>
<span class="ech-shadow-in">shadow</span>
<span class="ech-shadow-write">shadow</span>
<span class="ech-shadow-big">shadow</span>
```

css

```css
span{ cursor: pointer; height: 40px; line-height: 40px; text-align: center; display: inline-block; color: #333; background: #ccc; min-width: 80px; padding: 0 10px; margin: 10px;}
 
.ech-shadow,.ech-shadow-in,.ech-shadow-write,.ech-shadow-big{ transition: all .4s;}
.ech-shadow:hover {
    box-shadow: 0 0 10px #333;
}

.ech-shadow-in:hover {
    box-shadow: inset 0 0 10px #333;
}

.ech-shadow-write:hover {
    box-shadow: inset 0 0 20px #fff;
}

.ech-shadow-big:hover {
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
}
```

:::

## 2-1-7 透明度变化

::: normal-demo
html

```html
<span class="ech-fade-out">fade-out</span>
<span class="ech-fade-in">fade-in</span>
```

css

```css
span{ cursor: pointer; height: 40px; line-height: 40px; text-align: center; display: inline-block; color: #333; background: #ccc; min-width: 80px; padding: 0 10px; margin: 10px;}
 
.ech-fade-out,.ech-fade-in{ transition: all .4s;}
.ech-fade-out:hover {
    opacity: .6;
}

.ech-fade-in {
    opacity: .5;
}

.ech-fade-in:hover {
    opacity: 1;
}

```

:::

## 2-1-8 圆角变化

::: normal-demo
html

```html
<span class="ech-rectangle">rectangle</span><span class="ech-radius">radius</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-radius,
.ech-rectangle {
  transition: all 0.4s;
}
.ech-radius {
  border-radius: 10px;
}
.ech-radius:hover {
  border-radius: 0px;
}
.ech-rectangle:hover {
  border-radius: 10px;
}

```

:::

## 2-2-2.颜色上下划线变化

这里也是一大块一起说，看代码可能会更乱，所以大家看代码的时候要更加留神注意。看代码看不明白，直接在 github 下载，然后运行文件，边调试边看效果！这样大家就很容易明白了！

::: normal-demo
html

```html
<span class="ech-overline-l">overline-l</span>
<span class="ech-overline-r">overline-l</span>
<span class="ech-overline-c">overline-l</span>
<span class="ech-underline-r">overline-l</span>
<span class="ech-underline-c">overline-l</span>
<span class="ech-underline-l">overline-l</span>
<span class="ech-underline-c-out">overline-l</span>
<span class="ech-underline-l">overline-l</span>
<span class="ech-fade-c-in">overline-l</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
/*上划线和下划线变化 当前元素样式设置相对定位*/
.ech-overline-r,
.ech-overline-l,
.ech-underline-r,
.ech-underline-l,
.ech-underline-c,
.ech-overline-c,
.ech-underline-c-out,
.ech-overline-c-out {
  position: relative;
  transition: all 0.3s;
  z-index: 1;
}
.ech-overline-r:before,
.ech-overline-l:before,
.ech-underline-l:before,
.ech-underline-r:before,
.ech-underline-c:before,
.ech-overline-c:before,
.ech-underline-c:after,
.ech-overline-c:after,
.ech-underline-c-out:before,
.ech-overline-c-out:before {
  position: absolute;
  transition: all 0.3s;
  content: '';
  display: block;
  background: #09f;
  z-index: -1;
  height: 4px;
  width: 100%;
  transform: scaleX(0);
}
.ech-overline-r:before,
.ech-overline-l:before,
.ech-underline-l:before,
.ech-underline-r:before,
.ech-underline-c:before,
.ech-overline-c:before,
.ech-underline-c:after,
.ech-overline-c:after,
.ech-underline-c-out:before,
.ech-overline-c-out:before {
  position: absolute;
  transition: all 0.3s;
  content: '';
  display: block;
  background: #09f;
  z-index: -1;
  height: 4px;
  width: 100%;
  transform: scaleX(0);
}

/*上划线 左右出来*/
.ech-overline-r:before {
  top: 0;
  left: 0;
  transform-origin: 100% 50%;
}

.ech-overline-l:before {
  top: 0;
  right: 0;
  transform-origin: 0 50%;
}

/*下划线 左右出来*/
.ech-underline-r:before {
  bottom: 0;
  left: 0;
  transform-origin: 100% 50%;
}

.ech-underline-l:before {
  bottom: 0;
  right: 0;
  transform-origin: 0% 50%;
}

/**上划线 下划线 居中进来**/
.ech-overline-c:before {
  top: 0;
  transform-origin: 0 50%;
}

.ech-overline-c:after {
  top: 0;
  transform-origin: 100% 50%;
}

.ech-underline-c:before {
  bottom: 0;
  transform-origin: 0 50%;
}

.ech-underline-c:after {
  bottom: 0;
  transform-origin: 100% 50%;
}

.ech-overline-c:before,
.ech-underline-c:before {
  left: 0;
}

.ech-overline-c:after,
.ech-underline-c:after {
  right: 0;
}

/*上划线 下划线-居中出去 */
.ech-overline-c-out:before {
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.ech-underline-c-out:before {
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.ech-fade-t:hover:before,
.ech-fade-b:hover:before,
.ech-fade-m-out:hover:before,
.ech-bounce-b:hover:before,
.ech-bounce-t:hover:before {
  transform: scaleY(1);
}

.ech-fade:hover,
.ech-fade-t:hover,
.ech-fade-b:hover,
.ech-fade-l:hover,
.ech-fade-r:hover,
.ech-fade-c-in:hover,
.ech-fade-m-in:hover,
.ech-fade-m-out:hover,
.ech-fade-c-out:hover,
.ech-bounce-t:hover,
.ech-bounce-b:hover,
.ech-bounce-r:hover,
.ech-bounce-l:hover {
  color: #fff;
}

.ech-fade-m-in:hover:before,
.ech-fade-m-in:hover:after {
  transform: scaleY(0.51);
}

.ech-fade-c-in:hover:before,
.ech-fade-c-in:hover:after,
.ech-overline-c:hover:after,
.ech-overline-c:hover:before,
.ech-underline-c:hover:after,
.ech-underline-c:hover:before {
  transform: scaleX(0.51);
}

.ech-fade-l:hover:before,
.ech-fade-r:hover:before,
.ech-fade-c-out:hover:before,
.ech-bounce-l:hover:before,
.ech-bounce-r:hover:before,
.ech-overline-l:hover:before,
.ech-overline-r:hover:before,
.ech-underline-l:hover:before,
.ech-underline-r:hover:before,
.ech-underline-c-out:hover:before,
.ech-overline-c-out:hover:before {
  transform: scaleX(1);
}

```

:::

## 2-2-3 箭头动画

::: normal-demo
html

```html
<span class="ech-arrow-l">arrow-l</span><span class="ech-arrow-r">arrow-r</span><span class="ech-arrow-t">arrow-t</span><span class="ech-arrow-b">arrow-b</span><span class="ech-arrow-l-move">arrow-l</span><span class="ech-arrow-r-move">arrow-r</span><span class="ech-arrow-t-move">arrow-t</span><span class="ech-arrow-b-move">arrow-b</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-arrow-l,
.ech-arrow-r,
.ech-arrow-t,
.ech-arrow-b,
.ech-arrow-l-move,
.ech-arrow-r-move,
.ech-arrow-t-move,
.ech-arrow-b-move {
  position: relative;
  transition: all 0.3s;
  z-index: 1;
}
.ech-arrow-l:before,
.ech-arrow-r:before,
.ech-arrow-t:before,
.ech-arrow-b:before,
.ech-arrow-l-move:before,
.ech-arrow-r-move:before,
.ech-arrow-t-move:before,
.ech-arrow-b-move:before {
  position: absolute;
  transition: all 0.3s;
  content: '';
  display: block;
  z-index: -1;
  border-style: solid;
  margin: auto;
  width: 0;
  height: 0;
}

.ech-arrow-l:before,
.ech-arrow-l-move:before {
  left: 0;
  top: 0;
  bottom: 0;
  border-width: 10px 10px 10px 0;
  border-color: transparent #ccc transparent transparent;
}

.ech-arrow-r:before,
.ech-arrow-r-move:before {
  right: 0;
  top: 0;
  bottom: 0;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #ccc;
}

.ech-arrow-t:before,
.ech-arrow-t-move:before {
  left: 0;
  top: 0;
  right: 0;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #ccc transparent;
}

.ech-arrow-b:before,
.ech-arrow-b-move:before {
  left: 0;
  bottom: 0;
  right: 0;
  border-width: 10px 10px 0 10px;
  border-color: #ccc transparent transparent transparent;
}

.ech-arrow-l-move,
.ech-arrow-r-move,
.ech-arrow-t-move,
.ech-arrow-b-move {
  transition: transform 0.3s;
}

.ech-arrow-l-move:hover {
  transform: translateX(10px);
}

.ech-arrow-r-move:hover {
  transform: translateX(-10px);
}

.ech-arrow-t-move:hover {
  transform: translateY(10px);
}

.ech-arrow-b-move:hover {
  transform: translateY(-10px);
}

.ech-arrow-l-move:hover:before,
.ech-arrow-l:hover:before {
  transform: translateX(-10px);
}

.ech-arrow-r-move:hover:before,
.ech-arrow-r:hover:before {
  transform: translateX(10px);
}

.ech-arrow-t-move:hover:before,
.ech-arrow-t:hover:before {
  transform: translateY(-10px);
}

.ech-arrow-b-move:hover:before,
.ech-arrow-b:hover:before {
  transform: translateY(10px);
}

```

:::

## 2-3 较复杂动画

## 2-1 和  2-2 的内容，都是利用过渡实现效果，那么这一块就是利用动画来实现效果！区别就是 hover 的写法是增加一个动画，动画的封装，难度就在于创意

## 2-3-1 闪烁效果

::: normal-demo
html

```html
<span class="ech-flash">flash</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
/*闪烁变化*/
.ech-flash:hover {
  animation: flash 0.5s ease;
}

@keyframes flash {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}

```

:::

## 2-3-2 闹钟振铃效果

::: normal-demo
html

```html
<span class="ech-shake-time">shake-time</span>
```

css

```css
/*仿闹钟振铃效果*/
.ech-shake-time:hover {
  animation: shake-time 1s ease;
}

@keyframes shake-time {
  0% {
    transform: scale(1);
  }
  10%,
  20% {
    transform: scale(0.9) rotate(-3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(3deg);
  }
  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}
/*仿闹钟振铃效果*/
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}


```

:::

## 2-3-3 摇摆效果

::: normal-demo
html

```html
<span class="ech-wobble-c">wobble-c</span><span class="ech-wobble-t">wobble-t</span><span class="ech-wobble-b">wobble-b</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-wobble-t,
.ech-skew-r-t,
.ech-skew-l-t {
  transform-origin: 0 100%;
}

/*
 * 当前元素 较复杂动画，利用动画实现
 */
.ech-wobble-t,
.ech-skew-r-t,
.ech-skew-l-t {
  transform-origin: 0 100%;
}

.ech-wobble-b,
.ech-skew-r-b,
.ech-skew-l-b {
  transform-origin: 100% 0;
}

.ech-wobble-c:hover,
.ech-wobble-t:hover,
.ech-wobble-b:hover {
  animation: wobble-x 1s ease-in-out;
}

@keyframes wobble-x {
  16.65% {
    -webkit-transform: skew(-12deg);
    transform: skew(-12deg);
  }
  33.3% {
    -webkit-transform: skew(10deg);
    transform: skew(10deg);
  }
  49.95% {
    -webkit-transform: skew(-6deg);
    transform: skew(-6deg);
  }
  66.6% {
    -webkit-transform: skew(4deg);
    transform: skew(4deg);
  }
  83.25% {
    -webkit-transform: skew(-2deg);
    transform: skew(-2deg);
  }
  100% {
    -webkit-transform: skew(0);
    transform: skew(0);
  }
}

@keyframes wobble {
  16.65% {
    -webkit-transform: skew(-12deg);
    transform: skew(-12deg);
  }
  33.3% {
    -webkit-transform: skew(10deg);
    transform: skew(10deg);
  }
  49.95% {
    -webkit-transform: skew(-6deg);
    transform: skew(-6deg);
  }
  66.6% {
    -webkit-transform: skew(4deg);
    transform: skew(4deg);
  }
  83.25% {
    -webkit-transform: skew(-2deg);
    transform: skew(-2deg);
  }
  100% {
    -webkit-transform: skew(0);
    transform: skew(0);
  }
}

```

:::

## 2-3-4 摇晃效果

::: normal-demo
html

```html
<span class="ech-swing">swing</span>
```

css

```css
.ech-swing:hover {
  animation: swing 0.5s ease alternate;
}
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}

@keyframes swing {
  20% {
    transform: rotate(15deg);
  }
  40% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0);
  }
}

```

:::

## 2-3-5 抖动效果

::: normal-demo
html

```html
<span class="ech-shake">shake</span>
```

css

```css
.ech-shake:hover {
    animation: shake .5s ease;
}
span{ cursor: pointer; height: 40px; line-height: 40px; text-align: center; display: inline-block; color: #333; background: #ccc; min-width: 80px; padding: 0 10px; margin: 10px;}
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(10px);
    }
}
```

:::

## 2-3-6 弹跳效果

::: normal-demo
html

```html
<span class="ech-bounce">bounce</span>
```

css

```css
span {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  background: #ccc;
  min-width: 80px;
  padding: 0 10px;
  margin: 10px;
}
.ech-bounce:hover {
  animation: bounce 1s ease;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

```
