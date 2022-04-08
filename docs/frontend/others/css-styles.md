
# 偏门却又实用的css样式

很早之前我们推荐大家看《推荐大家使用的CSS书写规范、顺序》，里面提到css的一些常用命名、规范等等，而今天主要是说一些偏门一点的css样式、技巧。

什么是偏门，就是有些片段很少使用，时间久了就记不起来，但用的时候又要去找，所以这里为大家整理一些少用但又实用的css样式，
<!--more-->

部分由小编及网友提供，感谢你们~ 持续更新哦。

::-Webkit-Input-Placeholder

input 的 H5 `placeholder` 属性，很好用，但不能直接改这个文字颜色，所以目前的解决方法就是用`::input-placeholder`属性来改。

小Tips: 配合 opacity 属性使用效果更佳哦！

```css
::-webkit-input-placeholder { /* Chrome/Opera/Safari */color: pink;}::-moz-placeholder { /* Firefox 19+ */color: pink;}:-ms-input-placeholder { /* IE 10+ */color: pink;}:-moz-placeholder { /* Firefox 18- */color: pink;}
```

@Impor 嵌套样式表文件

使用它可以在样式表再次内嵌套样式表文件，比如一些组件 CSS可以使用，但不太推荐使用这个，因为加载时有可能会被漏掉。

```css
@import url("reset.css");@import url("global.css"); @import url("font.css");
```

Outline 当点击Input元素时显示的当前状态线（外发光）

这个状态线是用来提示用户当前状态指示作用，但因为效果很美观，建议去掉，或自己改个样式

```css
div {outline: none; //移动浏览器默认的状态线// outline: 5px dotted red; 也可以设置样式}
```

Contenteditable 设置Element是否可编辑

```css
<p contenteditable="true">可编辑</p>
```

Webkit-Playsinline

手机video 都可以在页面中播放，而不是全屏播放了。
tml
`<video id="myvideo" src="test.mp4" webkit-playsinline="true"></video>`

```

Position: Absolute， 让Margin有效的

设置left:0, right:0 就可以。原因是2边都是0不存在边距，element就可以得出距离，并居中。

```css
div {position: absolute;left: 0;right: 0;margin: 0 auto;}
```

使用 Clearfix 清楚浮动，解决父类高度崩塌。

```css
.clearfix {zoom: 1;}.clearfix:after {visibility: hidden;display: block;font-size: 0;content: " ";clear: both;height: 0;}
```

User-Select 禁止用户选中文本

```css
div {user-select: none; /* Standard syntax */}
```

清除手机Tap事件后Element 时候出现的一个高亮

```css
*{-webkit-tap-highlight-color: rgba(0,0,0,0);}
```

::-Webkit-Scrollbar-Thumb

可以修改谷歌的滚动条样式，safari好像也可以

-Webkit-Appearance:none

1. To apply platform specific styling to an element that doesn’t have it by default
2. To remove platform specific styling to an element that does have it by default

移除浏览器默认的样式，比如chrome的input默认样式

```
input, button, textarea, select {*font-size: 100%;-webkit-appearance:none;}
```

CSS开启硬件加速

<http://www.cnblogs.com/rubylouvre/p/3471490.html>

```
-webkit-transform: translateZ(0);
```

使用CSS Transforms 或者 Animations时可能会有页面闪烁的Bug

```
-webkit-backface-visibility: hidden;
```

-Webkit-Touch-Callout 禁止长按链接与图片弹出菜单

```
-webkit-touch-callout: none;
```

Transform-Style: Preserve-3d 让元素支持3d

```
div {-webkit-transform: rotateY(60deg); /* Chrome, Safari, Opera */-webkit-transform-style: preserve-3d; /* Chrome, Safari, Opera */transform: rotateY(60deg);transform-style: preserve-3d;}
```

Perspective 透视

这个属性的存在决定你看到的元素是2d还是3d。一般设置在包裹元素的父类上。

```
.div-box {perspective: 400px;}
```

Css实现不换行、自动换行、强制换行

```
//不换行white-space:nowrap;//自动换行word-wrap: break-word;word-break: normal;//强制换行word-break:break-all;
```

Box-Sizing 让元素的宽度、高度包含Border和Padding

```
{box-sizing: border-box;}
```

Calc() Function, 计算属性值

<https://www.w3schools.com/cssref/func_calc.asp>

```
div {width: calc(100% - 100px);}
```

上面的例子就是让宽度为100%减去100px的值，项目中很适用，要IE9以上兼容。

Css3 Linear-Gradient 线性渐变

默认开始在top, 也可以自定义方向。

```
div {linear-gradient(red, yellow)}background: linear-gradient(direction, color-stop1, color-stop2, ...);
```

常用的选择器 :Nth-Child() Selector

以下代码是选择父类下第一个子节点，p元素，建议学习这个样式属性的使用，很实用的。

```
p:nth-child(1) {...}
```

就介绍到这里，以后会不断更新，如果有好的css代码，欢迎在留言处提交给我们，一起收录进来！
