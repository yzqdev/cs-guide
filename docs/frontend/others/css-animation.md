---
title: 程序员开发 css3 动画-实现自己的代码库
category:
  - 工具
  - css
  - 前端
tag:
  - Windows
  - Config
  - 前端
translate_title: computer-skills
date: 2017-01-30 09:17:00
description:
---



1.前言

在月初的时候，发了 CSS3 热身实战--过渡与动画（实现炫酷下拉，手风琴，无缝滚动）。js 的代码库也发过两次，两篇文章。之前也写了 css3 的热身实战，既然热身完了，是时候开始封装 css3 的代码库了，相比起 js 的代码库，css3 的代码库的逻辑性就更加简单了！可以说只要打上注释和一张效果图就可以让大家明白了其中的原理了！

我写代码库的时候，动画效果主要是参考了三个开源项目，nec，hover.css，animate.css 这三个项目的质量非常的高，建议大家去了解。

声明

1.下面将会看到很多个

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320f0002a71d3f30d344)

类似这样的举行，都是 span 标签，样式都是给出的 css

```css
span{ cursor: pointer; height: 40px; line-height: 40px; text-align: center; display: inline-block; color: #333; background: #ccc; min-width: 80px; padding: 0 10px; margin: 10px;
```

2.关于 class 命名方式，l 代表 left，r 代表 right，t 代表 top，b 代表 bottom，c 代表 center，m 代表 middle。切记

> 文章比较长，但是说得就是两点，大家看得也应该会很快
>
> 1.写出一些 hover 动画和预设动画的运行效果，并且贴出代码
>
> 2.发现几个动画组合，和加上无限动画，反向动画，会有不一样的效果，并且继续研究，看下能不能研究出不一样的东西！

2.hover 动画

说了那么多，是时候进入正文了，

首先是 hover 动画，关于这个概念，我解释下，就是鼠标移上去触发的动画，就是触发了鼠标的 hover 事件时能看到的动画！下面，按照类型，一个一个的写！

2-1.简单动画

2-1-1 大小变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32140002c6011423e743)

html

```html
<span class="ech-big">big</span><span class="ech-small">small</span>
```

css

```css
.ech-big,.ech-small { transition: all .4s;
```

2-1-2 形状变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/321200009430a3950910)

html

```html
<span class="ech-skew-l">skew-l</span><span class="ech-skew-r">skew-r</span><span class="ech-skew-l-t">skew-l-t</span><span class="ech-skew-r-t">skew-r-t</span><span class="ech-skew-l-b">skew-l-b</span><span class="ech-skew-r-b">skew-r-b</span>
```

css

```css
.ech-skew-l, .ech-skew-r, .ech-skew-l-t, .ech-skew-r-b, .ech-skew-l-b, .ech-skew-r-t{ transition: all .4s;
```

2-1-3 旋转角度变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32110004d5a36cfcdc56)

html

```htm
<span class="ech-grow-rotate-l">grow-rotate-l</span><span class="ech-grow-rotate-r">grow-rotate-r</span><span class="ech-rotate5">rotate5</span><span class="ech-rotate15">rotate15</span><span class="ech-rotate30">rotate30</span><span class="ech-rotate60">rotate60</span><span class="ech-rotate90">rotate90</span><span class="ech-rotate180">rotate180</span><span class="ech-rotate360">rotate360</span><span class="ech-rotate-5">rotate-5</span><span class="ech-rotate-15">rotate-15</span><span class="ech-rotate-30">rotate-30</span><span class="ech-rotate-60">rotate-60</span><span class="ech-rotate-90">rotate-90</span><span class="ech-rotate-180">rotate-180</span>
```

css

```css
.ech-grow-rotate-l,.ech-grow-rotate-r, .ech-rotate5, .ech-rotate15, .ech-rotate30, .ech-rotate60, .ech-rotate90, .ech-rotate180, .ech-rotate360, .ech-rotate-5,.ech-rotate-15, .ech-rotate-30, .ech-rotate-60, .ech-rotate-90, .ech-rotate-180{transition: all .4s;
```

2-1-4 位移变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32140002c602c8db7856)

html

```html
<span class="ech-t">up</span>
```

css

```css
.ech-t,.ech-bottom,.ech-top,.ech-right{ transition: all .4s;
```

2-1-5 边框变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320a0001e3c21c7f03b9)

html

```html
<span class="ech-border">border</span>
```

css

```css
.ech-border,.ech-border-in{ transition: all .4s;
```

2-1-6 阴影变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320f0002a71f373cd680)

(gif 图看得效果太难看了，大家可以去 github 下载看)

html

```html
<span class="ech-shadow">shadow</span>
```

css

```css
.ech-shadow,.ech-shadow-in,.ech-shadow-write,.ech-shadow-big{ transition: all .4s;
```

2-1-7 透明度变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32120000942fa98cf879)

html

```html
<span class="ech-fade-out">fade-out</span>
```

css

```css
.ech-fade-out,.ech-fade-in{ transition: all .4s;
```

2-1-8 圆角变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320a0001e3c41db58188)

html

```html
<span class="ech-rectangle">rectangle</span><span class="ech-radius">radius</span>
```

css

```css
.ech-radius,.ech-rectangle{ transition: all .4s;
```

2-2.颜色动画效果

这部分的动画主要是利用:before 和:after 进行实现的，所以，大家如果使用的时候，切记:before 和:after 没有被占用，否则会显示不正常

2-2-1.颜色块变化

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32110004d5a0af60fd98)

因为这块内容很像，我就一大块一起说，大家看代码的时候要留神注意。看代码看不明白，直接在 github 下载，然后运行文件，边调试边看效果！这样大家就很容易明白了！

html

```html
<span class="ech-fade">fade</span>
```

css

```css
/*当前元素设置相对定位*/.ech-fade, .ech-fade-t, .ech-fade-b, .ech-fade-l, .ech-fade-r, .ech-fade-c-in, .ech-fade-m-in, .ech-fade-m-out, .ech-fade-c-out, .ech-bounce-t, .ech-bounce-b, .ech-bounce-r, .ech-bounce-l { position: relative; transition: all .3s; z-index: 1;
```

2-2-2.颜色上下划线变化

这里也是一大块一起说，看代码可能会更乱，所以大家看代码的时候要更加留神注意。看代码看不明白，直接在 github 下载，然后运行文件，边调试边看效果！这样大家就很容易明白了！

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320f0002a71e4ea99694)

html

```html
<span class="ech-overline-l">overline-l</span>
```

css

```css
/*上划线和下划线变化 当前元素样式设置相对定位*/.ech-overline-r, .ech-overline-l, .ech-underline-r, .ech-underline-l, .ech-underline-c, .ech-overline-c, .ech-underline-c-out, .ech-overline-c-out{ position: relative; transition: all .3s; z-index: 1;
```

2-2-3 箭头动画

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/322b0000516e097769bd)

html

```
<span class="ech-arrow-l">arrow-l</span><span class="ech-arrow-r">arrow-r</span><span class="ech-arrow-t">arrow-t</span><span class="ech-arrow-b">arrow-b</span><span class="ech-arrow-l-move">arrow-l</span><span class="ech-arrow-r-move">arrow-r</span><span class="ech-arrow-t-move">arrow-t</span><span class="ech-arrow-b-move">arrow-b</span>
```

css

```
.ech-arrow-l, .ech-arrow-r, .ech-arrow-t, .ech-arrow-b, .ech-arrow-l-move, .ech-arrow-r-move, .ech-arrow-t-move, .ech-arrow-b-move{ position: relative; transition: all .3s; z-index: 1;
```

2-3 较复杂动画

2-1 和 2-2 的内容，都是利用过渡实现效果，那么这一块就是利用动画来实现效果！区别就是 hover 的写法是增加一个动画，动画的封装，难度就在于创意。

2-3-1 闪烁效果

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/31fc0001f0dde8c2a102)

html

```
<span class="ech-flash">flash</span>
```

css

```
.ech-flash:hover { animation: flash .5s ease;
```

2-3-2 闹钟振铃效果

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/322b0000516f09796a2d)

html

```
<span class="ech-shake-time">shake-time</span>
```

css

```
/*仿闹钟振铃效果*/.ech-shake-time:hover { animation: shake-time 1s ease;
```

2-3-3 摇摆效果

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/31fc0001f0decf6202fa)

html

```
<span class="ech-wobble-c">wobble-c</span><span class="ech-wobble-t">wobble-t</span><span class="ech-wobble-b">wobble-b</span>
```

css

```
.ech-wobble-t, .ech-skew-r-t, .ech-skew-l-t { transform-origin: 0 100%;
```

2-3-4 摇晃效果

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320a0001e3c576ce518a)

html

```
<span class="ech-swing">swing</span>
```

css

```
.ech-swing:hover { animation: swing .5s ease alternate;
```

2-3-5 抖动效果

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320a0001e3c657f855aa)

html

```
<span class="ech-shake">shake</span>
```

css

```
.ech-shake:hover { animation: shake .5s ease;
```

2-3-6 弹跳效果

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320f0002a72226cd81e4)

html

```
<span class="ech-bounce">bounce</span>
```

css

```
.ech-bounce:hover { animation: bounce 1s ease;
```

3.预设动画

受限于篇幅的长度，我也不想分开两篇文章写。关于这个预设动画，我就简单的说一下，写一下，我直接给一个大概的操作演示，和完整的代码！反正写法这个也是比较单一，无非就是改一个类名而已。难的是动画的一些编写，这个需要创意，大家可以上网参考。

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/322b000051713f40367c)

（不知道为什么，gif 截大图放不上来，就放了张小的，大家结果下面的 jpg 一起看把，就是通过下面的按钮，展示动画，大家也可以在 github 下面下载代码看下）

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320f0002a720ffaa5b81)

**（完整代码比较多，这里贴出，但是建议大家稍微看一下，过一下就好，因为这个只看代码是会懵逼的，要在浏览器打开文件，一看调试一边看，这样会很简单，很容易的明白）**

html 代码

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32140002c915d3b1499c)

代码过长需要文档版源码来我的前端群 657137906，源码已经上传了！

css

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32110004d7dcc47a2b1b)

代码过长需要文档版源码来我的前端群 657137906，源码已经上传了！

4.未知探索

好了，说完了 hover 动画和预设动画，我开发的时候，发现了这样一些好玩的东西，我也准备继续研究，也建议大家玩下，说不定哪天做出了了不起的东西！如下面的栗子！

> 下面说的动画，不分 hover 动画和预设动画，大家注意

4-1.无限执行动画

一个普通的动画，加上无限执行，一般会出现很友好的效果，

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32140002c603d42b8528)

但是有些时候的效果差强人意

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320f0002a7231d5b31e1)

4-2.反向动画

在 4-1 的基础上，加上方向执行动画，也会有不一样的效果

没加反向动画效果

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/321200009432d00a970c)

加上反向动画效果

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/320f0002a72197d51805)

4-3.组合效果

阴影效果和其它效果的组合，(gif 看不出阴影效果，哎。。)

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/322b0000517082ead70b)

上面的几个的栗子

css 代码不变，区别是 html 代码，多加了一些类名

![程序员开发css3动画-实现自己的代码库](https://p26.toutiaoimg.com/large/32110004d5a28160f9b0)

上面几个是我在开发时候发现的栗子，这个我会继续研究，也希望大家能研究，研究出什么好玩的效果，或者动画写法，欢迎分享！

5.鸡肋选择

**在写 css3 代码库的时候，我也发现封装 css3 的一个鸡肋情况。**

1.css3 的效果太过于灵活，多样，封装非常容易出现众口难调的情况，以及每个项目的效果可能出现效果差不多，但就是不一样，这样就是说封装的库并不适合用在项目上。

2.还有一点在于，css3 效果基本上每一个项目都是有用到，并且是常用，但是平常项目要用到的 css3 效果最多也就 10 个，而且也不难，手写很快可以实现，根本没必要去引一个插件或者库。

**但是最后我还是坚持写下去了，原因如下**

1.如果项目开发，对动画效果的要求基本不会达到非常的严格的地步，我完全可以多引一个文件，增加我的开发效率，压缩过后的文件可能只有 10K 左右，可以接受。

2.就算在项目用不上，我也可以当作是练手，学习的作用。如果以后项目需要动画效果，即使动画效果跟我封装的不一样，我也可以看着来进行修改。

3.就算开发的时候没使用上这个库，万一有些动画，我写过，但是忘了怎么写，也可以回头看怎么实现！

4.如果开发的时候，不知道放什么效果好，这个库，也能起到一定的参考作用！

5.现在多写几个，说不定起到一个发散思维的作用，写了这些效果，想到了另一些效果怎么写，或者想到还有什么效果可以写，这个也是非常好的一个结果和收获！

6.小结

好了，css3 的代码库封装到这里就差不多了，如果你能看完全篇，你已经是勇士了，证明你很有耐心，看完马上掌握，这个对于大家来说问题不大，毕竟不是什么逻辑性强的代码。我想要的效果虽然都实现了，不过以后肯定也是要修改完善的(至少看源码的话，我自己看得都有点乱，但是一时之间又不知道该如果整理，就先放上去了)。话说回来，通过以上的案例，希望能帮到大家，最理想就是能起到发散思维的作用，就是通过我的案例，能让大家知道其它的一些动画怎么做，或者想到有什么好看动画效果。web 前端这一行，最重要的就是多练，大家除了看别人的项目，博客之外，一定要多练，多写，这样进步才会更快，知识才会记得更牢。
