import{_ as a,r as t,c,b as o,w as r,a as n,d as s,o as l}from"./app-CbULZrmi.js";const h={},i=n("h1",{id:"css3动画",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#css3动画"},[n("span",null,"css3动画")])],-1),d=n("p",null,"1.前言",-1),p=n("p",null,"在月初的时候，发了 CSS3 热身实战--过渡与动画（实现炫酷下拉，手风琴，无缝滚动）。js 的代码库也发过两次，两篇文章。之前也写了 css3 的热身实战，既然热身完了，是时候开始封装 css3 的代码库了，相比起 js 的代码库，css3 的代码库的逻辑性就更加简单了！可以说只要打上注释和一张效果图就可以让大家明白了其中的原理了！",-1),m=n("p",null,"我写代码库的时候，动画效果主要是参考了三个开源项目，nec，hover.css，animate.css 这三个项目的质量非常的高，建议大家去了解。",-1),g=n("p",null,"声明",-1),u=n("p",null,"1.下面将会看到很多个",-1),f=n("p",null,"类似这样的举行，都是 span 标签，样式都是给出的 css",-1),b=n("pre",null,[n("code",{class:"language-html"},`<span> demo</span>
`)],-1),w=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),v=s('<p>2.关于 class 命名方式，l 代表 left，r 代表 right，t 代表 top，b 代表 bottom，c 代表 center，m 代表 middle。切记</p><blockquote><p>文章比较长，但是说得就是两点，大家看得也应该会很快</p><p>1.写出一些 hover 动画和预设动画的运行效果，并且贴出代码</p><p>2.发现几个动画组合，和加上无限动画，反向动画，会有不一样的效果，并且继续研究，看下能不能研究出不一样的东西！</p></blockquote><p>2.hover 动画</p><p>说了那么多，是时候进入正文了，</p><p>首先是 hover 动画，关于这个概念，我解释下，就是鼠标移上去触发的动画，就是触发了鼠标的 hover 事件时能看到的动画！下面，按照类型，一个一个的写！</p><h2 id="_2-1-简单动画" tabindex="-1"><a class="header-anchor" href="#_2-1-简单动画"><span>2-1.简单动画</span></a></h2><h2 id="_2-1-1-大小变化" tabindex="-1"><a class="header-anchor" href="#_2-1-1-大小变化"><span>2-1-1 大小变化</span></a></h2>',7),x=n("p",null,"html",-1),_=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-big">big</span><span class="ech-small">small</span>
`)],-1),k=n("p",null,"css",-1),y=n("pre",null,[n("code",{class:"language-css"},`span {
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


`)],-1),X=n("h2",{id:"_2-1-2-形状变化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-2-形状变化"},[n("span",null,"2-1-2 形状变化")])],-1),I=n("p",null,"html",-1),q=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-skew-l">skew-l</span><span class="ech-skew-r">skew-r</span><span class="ech-skew-l-t">skew-l-t</span><span class="ech-skew-r-t">skew-r-t</span><span class="ech-skew-l-b">skew-l-b</span><span class="ech-skew-r-b">skew-r-b</span>
`)],-1),z=n("p",null,"css",-1),J=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),S=n("h2",{id:"_2-1-3-旋转角度变化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-3-旋转角度变化"},[n("span",null,"2-1-3 旋转角度变化")])],-1),D=n("p",null,"html",-1),A=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-grow-rotate-l">grow-rotate-l</span><span class="ech-grow-rotate-r">grow-rotate-r</span><span class="ech-rotate5">rotate5</span><span class="ech-rotate15">rotate15</span><span class="ech-rotate30">rotate30</span><span class="ech-rotate60">rotate60</span><span class="ech-rotate90">rotate90</span><span class="ech-rotate180">rotate180</span><span class="ech-rotate360">rotate360</span><span class="ech-rotate-5">rotate-5</span><span class="ech-rotate-15">rotate-15</span><span class="ech-rotate-30">rotate-30</span><span class="ech-rotate-60">rotate-60</span><span class="ech-rotate-90">rotate-90</span><span class="ech-rotate-180">rotate-180</span>
`)],-1),Q=n("p",null,"css",-1),j=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),N=n("h2",{id:"_2-1-4-位移变化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-4-位移变化"},[n("span",null,"2-1-4 位移变化")])],-1),U=n("p",null,"html",-1),O=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-t">up</span>
<span class="ech-b">up</span>
<span class="ech-l">up</span>
<span class="ech-r">up</span>
`)],-1),E=n("p",null,"css",-1),Z=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),C=n("h2",{id:"_2-1-5-边框变化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-5-边框变化"},[n("span",null,"2-1-5 边框变化")])],-1),W=n("p",null,"html",-1),B=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-border">border</span>
<span class="ech-border-in">border</span>
`)],-1),F=n("p",null,"css",-1),G=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),T=n("h2",{id:"_2-1-6-阴影变化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-6-阴影变化"},[n("span",null,"2-1-6 阴影变化")])],-1),R=n("p",null,"(gif 图看得效果太难看了，大家可以去 github 下载看)",-1),L=n("p",null,"html",-1),P=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-shadow">shadow</span>
<span class="ech-shadow-in">shadow</span>
<span class="ech-shadow-write">shadow</span>
<span class="ech-shadow-big">shadow</span>
`)],-1),Y=n("p",null,"css",-1),V=n("pre",null,[n("code",{class:"language-css"},`span{ cursor: pointer; height: 40px; line-height: 40px; text-align: center; display: inline-block; color: #333; background: #ccc; min-width: 80px; padding: 0 10px; margin: 10px;}
 
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
`)],-1),K=n("h2",{id:"_2-1-7-透明度变化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-7-透明度变化"},[n("span",null,"2-1-7 透明度变化")])],-1),H=n("p",null,"html",-1),M=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-fade-out">fade-out</span>
<span class="ech-fade-in">fade-in</span>
`)],-1),$=n("p",null,"css",-1),nn=n("pre",null,[n("code",{class:"language-css"},`span{ cursor: pointer; height: 40px; line-height: 40px; text-align: center; display: inline-block; color: #333; background: #ccc; min-width: 80px; padding: 0 10px; margin: 10px;}
 
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

`)],-1),en=n("h2",{id:"_2-1-8-圆角变化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-8-圆角变化"},[n("span",null,"2-1-8 圆角变化")])],-1),on=n("p",null,"html",-1),rn=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-rectangle">rectangle</span><span class="ech-radius">radius</span>
`)],-1),sn=n("p",null,"css",-1),an=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),tn=n("h2",{id:"_2-2-2-颜色上下划线变化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-2-2-颜色上下划线变化"},[n("span",null,"2-2-2.颜色上下划线变化")])],-1),cn=n("p",null,"这里也是一大块一起说，看代码可能会更乱，所以大家看代码的时候要更加留神注意。看代码看不明白，直接在 github 下载，然后运行文件，边调试边看效果！这样大家就很容易明白了！",-1),ln=n("p",null,"html",-1),hn=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-overline-l">overline-l</span>
<span class="ech-overline-r">overline-l</span>
<span class="ech-overline-c">overline-l</span>
<span class="ech-underline-r">overline-l</span>
<span class="ech-underline-c">overline-l</span>
<span class="ech-underline-l">overline-l</span>
<span class="ech-underline-c-out">overline-l</span>
<span class="ech-underline-l">overline-l</span>
<span class="ech-fade-c-in">overline-l</span>
`)],-1),dn=n("p",null,"css",-1),pn=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),mn=n("h2",{id:"_2-2-3-箭头动画",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-2-3-箭头动画"},[n("span",null,"2-2-3 箭头动画")])],-1),gn=n("p",null,"html",-1),un=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-arrow-l">arrow-l</span><span class="ech-arrow-r">arrow-r</span><span class="ech-arrow-t">arrow-t</span><span class="ech-arrow-b">arrow-b</span><span class="ech-arrow-l-move">arrow-l</span><span class="ech-arrow-r-move">arrow-r</span><span class="ech-arrow-t-move">arrow-t</span><span class="ech-arrow-b-move">arrow-b</span>
`)],-1),fn=n("p",null,"css",-1),bn=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),wn=s('<h2 id="_2-3-较复杂动画" tabindex="-1"><a class="header-anchor" href="#_2-3-较复杂动画"><span>2-3 较复杂动画</span></a></h2><h2 id="_2-1-和-2-2-的内容-都是利用过渡实现效果-那么这一块就是利用动画来实现效果-区别就是-hover-的写法是增加一个动画-动画的封装-难度就在于创意" tabindex="-1"><a class="header-anchor" href="#_2-1-和-2-2-的内容-都是利用过渡实现效果-那么这一块就是利用动画来实现效果-区别就是-hover-的写法是增加一个动画-动画的封装-难度就在于创意"><span>2-1 和 2-2 的内容，都是利用过渡实现效果，那么这一块就是利用动画来实现效果！区别就是 hover 的写法是增加一个动画，动画的封装，难度就在于创意</span></a></h2><h2 id="_2-3-1-闪烁效果" tabindex="-1"><a class="header-anchor" href="#_2-3-1-闪烁效果"><span>2-3-1 闪烁效果</span></a></h2>',3),vn=n("p",null,"html",-1),xn=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-flash">flash</span>
`)],-1),_n=n("p",null,"css",-1),kn=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),yn=n("h2",{id:"_2-3-2-闹钟振铃效果",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-3-2-闹钟振铃效果"},[n("span",null,"2-3-2 闹钟振铃效果")])],-1),Xn=n("p",null,"html",-1),In=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-shake-time">shake-time</span>
`)],-1),qn=n("p",null,"css",-1),zn=n("pre",null,[n("code",{class:"language-css"},`/*仿闹钟振铃效果*/
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


`)],-1),Jn=n("h2",{id:"_2-3-3-摇摆效果",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-3-3-摇摆效果"},[n("span",null,"2-3-3 摇摆效果")])],-1),Sn=n("p",null,"html",-1),Dn=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-wobble-c">wobble-c</span><span class="ech-wobble-t">wobble-t</span><span class="ech-wobble-b">wobble-b</span>
`)],-1),An=n("p",null,"css",-1),Qn=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1),jn=n("h2",{id:"_2-3-4-摇晃效果",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-3-4-摇晃效果"},[n("span",null,"2-3-4 摇晃效果")])],-1),Nn=n("p",null,"html",-1),Un=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-swing">swing</span>
`)],-1),On=n("p",null,"css",-1),En=n("pre",null,[n("code",{class:"language-css"},`.ech-swing:hover {
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

`)],-1),Zn=n("h2",{id:"_2-3-5-抖动效果",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-3-5-抖动效果"},[n("span",null,"2-3-5 抖动效果")])],-1),Cn=n("p",null,"html",-1),Wn=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-shake">shake</span>
`)],-1),Bn=n("p",null,"css",-1),Fn=n("pre",null,[n("code",{class:"language-css"},`.ech-shake:hover {
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
`)],-1),Gn=n("h2",{id:"_2-3-6-弹跳效果",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-3-6-弹跳效果"},[n("span",null,"2-3-6 弹跳效果")])],-1),Tn=n("p",null,"html",-1),Rn=n("pre",null,[n("code",{class:"language-html"},`<span class="ech-bounce">bounce</span>
`)],-1),Ln=n("p",null,"css",-1),Pn=n("pre",null,[n("code",{class:"language-css"},`span {
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

`)],-1);function Yn(Vn,Kn){const e=t("CodeDemo");return l(),c("div",null,[i,d,p,m,g,u,f,o(e,{id:"code-demo-21",type:"normal",code:"eJxlj0EKwjAQRa8yxK1FpS4kiifpJp2EdGg6CUmKldK72wbrxt389/k8ZhZdHpyQ4pGC4idoM/jHqdwNi6PAlNZyyzA3DIBjTD5KCJ44m3jfWGfIdlnC9RymAhyxqf5oNlOulCPLEtD81ppScOotgbjsWuexLw16t6kOdV2X3CrsbfQj6xUiYoEDcfUinTsJt90UlNbEVsIZLjsbVLS0mr9gaXj9b/kAlU1Uow=="},{default:r(()=>[b,w]),_:1}),v,o(e,{id:"code-demo-54",type:"normal",code:"eJx9kN1OwzAMhV/FCjcgtaVVd8HC2JP0JnVDYy11qiSDoWnvTho6NDQJRcrP53N85JyFiZMVUuzCrBjQqhDeOqHRlD2Nndinffe81Pb3ijApa5Mmn6uqY1EIDCG1zPpzxwB49MF5CbMjjtq/LsxoGk2UsKnnUwaWWJd3NOpTLJWlkSWg/nUPFGarviQQZ19vHR5yBZ1doh7ats3vXuFh9O7IQ4KImOFEXH7SEI2El2vSrIaBeJRQQ3Nlk/IjpeQVXDqu1q8p1mue/WfK6BUHiuSSYYF1tQl/TdK4D+1v1O/OTxICKqsfm6opIG1PN57c/V9XXW2LlLRdXcsSl2/iMp2r"},{default:r(()=>[x,_,k,y]),_:1}),X,o(e,{id:"code-demo-67",type:"normal",code:"eJydUd1ugyAUfhXCbrakdDZ2ycK6Pok3iAyICAbo2qXpuw+xal2jZr075zvfD5xzhsJXCmK4czXRgCri3GcGGRXIleyIVAb3bbF7bRj7CZ7teHaep5DvHZFf8By4oVzyzQfffMm354byys00XEHqXFhFVJ0zDQA9WGcsBrWR2jP70WCCSS48BtukPkVASc3QHerZySOiJNcYUNarC+lqRX4wkDrqcmVoGSfUqCbqKU3T2OeEltyagy4CSCmNYCU1OsrCCwzeu6SaFIXUHIMEbDqsIpbLkHwFLpleD6ta3XZ21IWbjKco/zMf9+Eu7aa8JdpJL00IJUqBZL11d8FYmG9mbwRfxlYYNMNntHkrGH9pNaOIOdWUKPzjsbB53XRc/ogsbPcfr4SXXzUJQ4s="},{default:r(()=>[I,q,z,J]),_:1}),S,o(e,{id:"code-demo-80",type:"normal",code:"eJyNk9FO5CAUhl+FdG80kdmSjs2UdX2S3iBlWyIDDeCqMb67tDO1FAePd+f8/X8O/YC3YvBHVdDizo1MI66Yc3/bQvAB99Y8Y2s88wKrtrjf9He/J//99ymbpGw2dTLcBv+5ApxktRLIW5Wf3qoEvPXqrSFvs3obyEsOqznU0I6jbYQacOOVBYZY4AhcqCF3hC7UkDvadaghd4Qv1OC+I4BTc/a3urgpuHPhAs/Jt1YjxJ+sM5ai0Ujthf0zaYOQ/eAp2pfjyywoqQX+onrx4jFTstcUcfGZ7qQbFXulSOo596AMf5y/cKOmUb+qqpr7B8Yfw5V/0l0QOeezeJQaP8vODxQdlkkj6zqpe4pKRBbtyGwvw+Sz8N7q3ZeHeHNBtIt4fjzbliR9VW77OumbpA+0kwXSBE4mhJuVCOnMcD8SIZ06HfLpOL1l2kkvTSDDlELlbu9ydOhg/gsb5f4Ze6TIcabEFdmRa3RyXu070V9nVrE/XgWnyyw8MisssdvLMQLlSBRMAQPRqsxFayhaZ6MNFG2y0XC80M8eonB8vb/PXWYLoc2ShcBmuUJYs1QhqFmmININ0fRJA7+53W7x/gHwbteD"},{default:r(()=>[D,A,Q,j]),_:1}),N,o(e,{id:"code-demo-93",type:"normal",code:"eJyNkMFuwyAQRH9lRS+tZKeunENF03yJLxioQVkDAtymivLvtXGoEjlSfBtm5zGwJ6Jij4SSXXDMAEcWwmdDJFdlbMh+cLvXabBvzDLQPgrgo4C/DZCC8BDGx6TgqTEAfPDBegrOahOl/5g8JXWnIoVt5Y7JQG1kuXCjPMaSoe4MBS7/aaGDQ/ZLQZvEtWj5IU24xanqqa7rdG4ZP3TeDkaMJuc8mb025Y8WUVF4z02OCaFNR6GCt+z1zHd6bL4Y58Zs0lKLi2izwCz8/OPomQk6ajvCDBGqzTZcX0CV/ZbX2S/rezpLZFHW4rkqoJx6C6heZjSXroPvsriCza0L2K+A77Dk/Ae1IuGH"},{default:r(()=>[U,O,E,Z]),_:1}),C,o(e,{id:"code-demo-106",type:"normal",code:"eJyVkMFuwyAQRH8FkatJHdmHlqb5El8wULMKXhCQxlWUfy/GTavWyiHiwjx2ZsReqEmjpZzuoxdIpBUxvnVUS8N6F5QOHT0sl/3TPHHo8N4kA1wP04rKGHN+MV06JESeQnSBE+8Akw6vMzMaBpM4aWs/FWABNVvRpKfEhIUBOZH6x60geis+OQEsvt46eSwv0tm5atM0TdG9kMchuBOqDKWUBY6A7AwqGU6eb01eKAU4cFKT3Y2NIgyQm7/BtcPt7++rPyrvYvlsCgIjJHDZJ6wl9baNKy837kOHxdC7iUUjlDvP3fNp/UQ29ct7VdQuqxLqRcgbWLL+d98LBIw6PRJLr19cFbca"},{default:r(()=>[W,B,F,G]),_:1}),T,R,o(e,{id:"code-demo-122",type:"normal",code:"eJyVUGFPgzAQ/SuX+mUmAzc3E1PmfglfSilwWbmStnMYsv9uKRpHdOoIaXqv7717dwNrfKsZZzvXCQKphXMvOVOySVwjSnPK2X667B5Gxj6na8wE6QbyyaJXN/ALrL+z2ZJJ50L6sR5AHq0zlkNnkLyyGTQK68Zz2K66PgONpJI55FXvE6GxJg5STaISXafFGwekqCi0kYcMpNGj991ms8mgEPJQW3OkMiBSygxapOSEpW84PEfrTpQlUs1hBesItMLWGPrE6pwT5JR+Dbi8uIdNzsq4qxkStjGAt4IcejTBVGgN6daNvhc83phXZWEIzcJXmP4TD6GmWNM8OQXdTBkiXBcjOeX/toix/+PyGF2qqvrJJYz62xgxQTySeNq6EIvVEj7+9Ok+mI6yuK3K2JaDk0KrxTpdj2+hITu/A3SzBTA="},{default:r(()=>[L,P,Y,V]),_:1}),K,o(e,{id:"code-demo-135",type:"normal",code:"eJx1kFFuwyAQRK+yor9xmshpVUGak/BDgJpV8IIAt6ms3L3YldtEbfhiRm9mYUfmSu8ZZ/scFYH2KudXyax2zZsytglDkeywXPePE3WQdIdGWmCkH5atmM65jpj0CHpIOSQOMSAVmwQ4i50rHHabeBbgkWxzaxV7Lo3y2BEHbb9DBnP06pMD0pw4+qBPAnTwU/dD27YCjkqfuhQGMtXRWgvokZoPNMVxeJmrozIGqeOwge1s9Cp1WOfM6iIJJK2vl7H6VVg/U5KijAVDjSjvYb3LU+omwl14twnGWlZPiEpjqQ9fPwtJlb2mkf5iT/9hdzq3C8suX1XQoII="},{default:r(()=>[H,M,$,nn]),_:1}),en,o(e,{id:"code-demo-148",type:"normal",code:"eJx9kUFuwyAQRa+C6DZOUzmLiqY5iTfjAcEoeLAAt6mi3L02sROpSbODx/v6DJyky52XSu5SDyzQQ0qfjTToqmgwA1tvGrm/rnevk7d/YIOmIU1qWcxew3IlMaWxoCRODQuBQ0whKtEH4mzix8ScIeuyEttNfyzAE5vqjmZzzBV4sqwEmmtaU+o9/ChBXHKtD3goJxj8VPVS13XZt4AHG8PAeoSIWGBHXH2Tzk6J96WpB62JrRIb8bawDqKlsXkG54bXt9FXy255qsuwOQInyhTGHHgvNuttuste1DZEbeKM/mlRLnyZ+ND/oy/XeJK4NYz/dP4FBIe0+g=="},{default:r(()=>[on,rn,sn,an]),_:1}),tn,cn,o(e,{id:"code-demo-164",type:"normal",code:"eJztVt1q1EAUfpUhIq2l6aasBY21z6GwN9nZ7G5odmZJZmu19EqKf62FCiIWoTd6Z0UUulZrX2bT7WM4SWaT+d1NC14I3iXn5Px83/nmZLasLumFlmutxn0PARh6cXy/Yfmwa+MNPwoD5Nthw1orX1Zr6ZdrDTQlIrpyBKwaMUCtqxYpQ65RpTJ4roqNB+QvVmp7rbRIgPQB1qIF45iONAvcaiAA4CCKceSCPg4Q8aN7qa3rB50uccFtp7+ZGbI0ipX4m8T2wqCDXAD9IroVxP3Qe+yCAGVxzRDD9cwDcZiWulGv17P3pgfXOxGmOKkRQpgZewGyHwUt0nXBnUmlvtdqBajjAgcsT2w9L+oEtDIzbDdQbWE0fJk8PxifnicHu6PhK/a8/y7ZfQuSszfJi71k5+n4+9HF0Unya//y+Pf47Hh8OEy+/EiO34/O9hZqDbQkynVRtoQTCyc31aT5CiqpCoskEPXD1JrPq4/jgASYAo/80CPBhp/PIvLQxOGFIXCW6nHmeELF0PI3KU85SRI8t+m3ceSrKCUHh8zokZNxqExlZAcf4rWpojQRgl1izliHc8o8es0YhwMyg0eIqcARlf/cnKjyUt6CnJ27bZF/Ox0Ad7aYjJnUlx3nZtkAbbPnghh6of9g3rn1f3L/9uSE1QSSk0/J/rfk2enFh4+ahSNgJbhPl16+g/02LZ4/F6VsHAVsCzo3wUrWSVZQrwklKY1OIZmyOnzKFANbqXoMqp7yek1MCKasXBuHKmFd4llYhLy1BW4iHK6vO6Ph58vzwxSXOpyJ6BUeZ1CnPQgVksxgQ2xHZKNKR8qZrZZoutamLQa+3VIHZoqMyyVPwU1cOWXFTO18plSryeufQDNTZcEYDp2gr8ntwxsQbOJUSWw+CNVyZ7c74nbT3iWWM1fT7KLTo83o3E269qApljnFSMaStO4ezi8X666om8cJnbBcusYFW6ixRRpbetvVmHsmc8GDlEWxi9j1dElWqT9mZUjYfZvdgdvt9C8jzbZsWj/DwssvEGUOztKKZhQcUbrknNf0+67iNZ99TbTqniYw+j/VA2P86lCxgegBzzgR+rTipM2XsKlufTT/m5vunxVvxiatvSqsl5Rb238Ap8/dNg=="},{default:r(()=>[ln,hn,dn,pn]),_:1}),mn,o(e,{id:"code-demo-177",type:"normal",code:"eJytVcFu3CAQ/RXkHtJKcbrV9lDRNN/RSnvBmNgoGCxgk02j/Hsxxl7GgbVT5WIxwwzz5vHGvBSt7USBi1vTE4moIMb8OhSMtiXRWj2V4lDchdXt1yHmLhep50i9EmnnSLsSWc2R1UqkKDv1yLaDheGriGH4KmwYPmE/yOK6oMY4un3iy0EiRI/aKI1Rr7i0TP8cfC3jTWsx+r7rT94huGTlG69lJ1sSwRuJEWVzds1NL8gzRlz6vEoo+uB3qBJDqU/7/d7bFaEPjVZHWTsnpdQ7Oy7LJ17bFqMfU6We1DWXDUY79G3ydUQ33FUOjteDvImu4xqYGpoWmhU0x6tcHJDwjZeyOMr7RmZ7ZbjlykHUTBDLH9nImiZy2iBCoN3N3viNvyWXNTu5jt62gyt2r/QSVNJrk94q6R1bTR+e3xobT5eJt5Y0kMoocbQrNFDllCSdzq6uoJzOOpqZKgeqnI6UrpkujX0WDCNXhNdAIuRolXcEXe2AygfL0b2BcEDX2J1g9+EI15Lqp2WlrFXd2fL4QvVBsNEHhIQJ8eT0RDse/GAAR7ROIE+LAtzmiFyfu38f9HEGz4OYh55bh1lfQk8rF6jtIumgIwg8wvxe4Ev+E8DTw5WYhRg45PkC9kgqOeyXNLKC/aP+dvE8+7XrupumOl0Ut+6jo/QhJWS7Hyb7/Xlo90tK5Bvzy9wBQVQrB/zJAgh3u5qfBRAzkP7XgL3/ajJmKfOAbK2xhcfMa7StxAWqYq4zb9vWGqBE8foPP8qxAA=="},{default:r(()=>[gn,un,fn,bn]),_:1}),wn,o(e,{id:"code-demo-196",type:"normal",code:"eJxlUE1OAjEUvspLjRvCQBEnmorEg3RTOmXa0HmdtEUhhIVxa+JOPYP3IsZb2OkAG1Zf+/28r687omNjCSOz0AoEaUUIj5woqYtlOmtO5hln406fcyRDIkNIgezfcQSQax+cZ9A6g1H5h47TytQ6Mril7SYT1qAqLtioNrEQ1tTIQKpzujKhtWLLwGDOLayTq6xIZ7uqq+l0mu8LIVe1d2usEimlzGRjsHgxVdQM7k9NragqgzUDCpMT1whfm9R8JPYcx4O/r5/ft9fDx/fh/XMw5jg6fwXT7ln5fmWBphHRuBTOGtBRGUCJoPo5HJ9Warv0olHh6Mg5ej3soDzihNLrXgBwrZAmpp0n+W1pCMBN2fvuyksbPdlyHdn/A5DBmMY="},{default:r(()=>[vn,xn,_n,kn]),_:1}),yn,o(e,{id:"code-demo-209",type:"normal",code:"eJyNkt9KwzAUxl/lUBG2sW6t9d/qHD5Ib7I0a0PTpCSZboxdeeOFV4p4I/oIXosXvowM9hZmMW5zQhEKH/l6ft9JcjLzcl0yL/b6qkIcMENKnScewbmvclQQX9OSJN5gs+h3V5WDhHttDytl0G7r8/1j+fi2vHtZ3L4u768XDzeL56dWN+Gd30FxLi6JhFnCARCnJdJU8Bg2BRAqIEiRs4TPE57wi4JMRxKVRG0XWT7Y/1YALRFXIyFLk4QRI42waXgAkwAQBvvtlR7U1AedXhOk0EiThh+lJNviI8cfOT1x2qvr3wnXeTtxhw4/dnr6z5jdbYVB7fl/sGCNmK9mTnb4Ng6PpRIyhkpQrom0eE5oluvYbL6aWINRTvw/riYT7SNGMzNSTNZ0SlXF0DQGyi03ZAIX9g8WbNVqL4oiux4iXGRSjHlqTIyxNUvK/Sua6jw2l+U6VShNKc9iCMxFOK9EMqOmszPs8zGPdP4FeNz7JA=="},{default:r(()=>[Xn,In,qn,zn]),_:1}),Jn,o(e,{id:"code-demo-222",type:"normal",code:"eJztks1u1DAQx1/FCqoEVZ1NmmXVhlLxILnYjptYcezI9rJbVb1QIQGiXOgVxIFDuSAO3Ph4m7DceAUSJ2mWZT966am9ef7zn9/M2D5xUpNzJ3QOdIEEIBxp/ThyKEnhRGLMKSSRc9gdDwa163Cl1/Res8mLey9uvZFwdhyidTWOrTqJBABkrLRUISgkE4aqR7WWUpakJgRDr5hagTNB4X+qoVMDEWeJCAGhV9Ux0wVHxyFgwtZhLklmM0TyutW9IAhsjBHJEiXHIq5EQogVcybghMUmDcFe16lAccxEEgIP+J2WI5WwqnMrnEbCnb+qnTbWGZ1AtRBzaJrtjUJCH0mVQ6mYxdUdvK0GGInBduXaBuWPt+XL8/L52ezrB/D751n58fzXu2flq8vZxbc/31+XLz7NLi6bsPz8fvbmS101uJGJ5pF4AflvzCFehayBwFuGJGEqn1LVgbrZl6q4UZsmSLAcGSYrepueAl8DijSF1YvKsenaPcno8ZFCOdW90yL8kTt6uNWcAYATijNm4NX0IajXug/93ZgmD+wfmNttSbbqBkAQuMFGpu+tQc4lLXG47+5fY8zRuin7pEWOqs03EodrgH3O8vYCd/caI669yIV7tF9mA9BbBWsTFWj5D7h7/1v1/s7pX1taYlY="},{default:r(()=>[Sn,Dn,An,Qn]),_:1}),jn,o(e,{id:"code-demo-235",type:"normal",code:"eJx9UNtOAjEQ/ZVJjYkmrnZFDKlI/JC+DN1ht6E73bRFIIR/t1QgEZN9anvmXHrmILrUO6HEPA7IYBzG+KkFma6KW8utFotyzl9O84Vm8SRMjFnwfOWozn9TgINmAGTbY7KeFZQZyOdpBMJIgC5RYEz0ofmoueQVjdmE6IOCwVvOlDwG6Mi2XVLwJoddAZxlqv6hiXapQmfbnGfoqm5sHBzuFVguuqXzZl0mxrtT1N1kMinvJZp1G/yGmwwaYwrYW662tkmdgtklacCmOXUFCfUF6zG0NiefgVxK89ea9quAPcXzAkrFV3n/e8lfDshx5UOvIPiU1/FQTxtqH4tjtoDcboRc1fIv+32MfeM8G3W+IddyjC2vzFJbHH8AX/7BAw=="},{default:r(()=>[Nn,Un,On,En]),_:1}),Zn,o(e,{id:"code-demo-248",type:"normal",code:"eJyNj9FuwjAMRX/FyjRpkygrK2wsZWifsYe+mDS0UVOnSsIGQvz74sImjSei6CaxfU/so2hjb4UUqzAggbIYwnsltGqz0GKnK7Eez9UT59cViYlQISTD9K9Gtu5LezhWBGkhmR6jcSRhzMJ0EUBj0GVFp4oYcwS188F5CYMzFLUvodWmaaOEeT7sS7CGdPY/FPU+ZmhNk7hKn021CYPFgwRDo2NjnepKUM4y+64oihI2qLrGux3VKaKUKqE3lH2bOrYSliN6wLo21EjIYTYGevSNSf+Mr9TzR6cPW4+9DpeRLqPm95NUk9//vnlFjxS2zvfyfLUY9edD/pim53Si8TFja8GyYHllebsFlHFPV7Bnds9ZXliWt3CuMGmL0w/yZqMX"},{default:r(()=>[Cn,Wn,Bn,Fn]),_:1}),Gn,o(e,{id:"code-demo-261",type:"normal",code:"eJyFkNFOwzAMRX/FCpoE0gotZWgKY+I3kPripV4bLXWqJINN0/6dNO1gEg97cnJ9j+zrk2hDZ4QUK98jgzLo/XslSLXZxu5ZUSXW42P1NDjWFYu5UN5HJBGnigHU3nnrJPRWcyD3Nmgt6aYNEl7y/pAEo5myf2qgQ8jQ6IYlKPqla+17g0cJmhO3MVbtUkdZM4y6K8sy/Teodo2LK9ZRVEolsdOcfes6tBKWl0k91rXmRkIOxUXr0DU6Tp6Ec8WPf9Fla7/IjQmRdYdB2+gdm1B4IPQ0UhV/7Oi4ddiRvxgSl8/mQ3me6mKqy6kWeT4bjfESDtlvrevk+DQY6PM+f0iLxhkQj3bDnJUxxxXwehMoFldACiLOPzuOrf4="},{default:r(()=>[Tn,Rn,Ln,Pn]),_:1})])}const Mn=a(h,[["render",Yn],["__file","css-animation.html.vue"]]),$n=JSON.parse('{"path":"/frontend/basic-css/css-animation.html","title":"css3动画","lang":"zh-CN","frontmatter":{"description":"css3动画 1.前言 在月初的时候，发了 CSS3 热身实战--过渡与动画（实现炫酷下拉，手风琴，无缝滚动）。js 的代码库也发过两次，两篇文章。之前也写了 css3 的热身实战，既然热身完了，是时候开始封装 css3 的代码库了，相比起 js 的代码库，css3 的代码库的逻辑性就更加简单了！可以说只要打上注释和一张效果图就可以让大家明白了其中的原...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/css-animation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"css3动画"}],["meta",{"property":"og:description","content":"css3动画 1.前言 在月初的时候，发了 CSS3 热身实战--过渡与动画（实现炫酷下拉，手风琴，无缝滚动）。js 的代码库也发过两次，两篇文章。之前也写了 css3 的热身实战，既然热身完了，是时候开始封装 css3 的代码库了，相比起 js 的代码库，css3 的代码库的逻辑性就更加简单了！可以说只要打上注释和一张效果图就可以让大家明白了其中的原..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-19T05:41:21.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-19T05:41:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"css3动画\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-19T05:41:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"2-1.简单动画","slug":"_2-1-简单动画","link":"#_2-1-简单动画","children":[]},{"level":2,"title":"2-1-1 大小变化","slug":"_2-1-1-大小变化","link":"#_2-1-1-大小变化","children":[]},{"level":2,"title":"2-1-2 形状变化","slug":"_2-1-2-形状变化","link":"#_2-1-2-形状变化","children":[]},{"level":2,"title":"2-1-3 旋转角度变化","slug":"_2-1-3-旋转角度变化","link":"#_2-1-3-旋转角度变化","children":[]},{"level":2,"title":"2-1-4 位移变化","slug":"_2-1-4-位移变化","link":"#_2-1-4-位移变化","children":[]},{"level":2,"title":"2-1-5 边框变化","slug":"_2-1-5-边框变化","link":"#_2-1-5-边框变化","children":[]},{"level":2,"title":"2-1-6 阴影变化","slug":"_2-1-6-阴影变化","link":"#_2-1-6-阴影变化","children":[]},{"level":2,"title":"2-1-7 透明度变化","slug":"_2-1-7-透明度变化","link":"#_2-1-7-透明度变化","children":[]},{"level":2,"title":"2-1-8 圆角变化","slug":"_2-1-8-圆角变化","link":"#_2-1-8-圆角变化","children":[]},{"level":2,"title":"2-2-2.颜色上下划线变化","slug":"_2-2-2-颜色上下划线变化","link":"#_2-2-2-颜色上下划线变化","children":[]},{"level":2,"title":"2-2-3 箭头动画","slug":"_2-2-3-箭头动画","link":"#_2-2-3-箭头动画","children":[]},{"level":2,"title":"2-3 较复杂动画","slug":"_2-3-较复杂动画","link":"#_2-3-较复杂动画","children":[]},{"level":2,"title":"2-1 和  2-2 的内容，都是利用过渡实现效果，那么这一块就是利用动画来实现效果！区别就是 hover 的写法是增加一个动画，动画的封装，难度就在于创意","slug":"_2-1-和-2-2-的内容-都是利用过渡实现效果-那么这一块就是利用动画来实现效果-区别就是-hover-的写法是增加一个动画-动画的封装-难度就在于创意","link":"#_2-1-和-2-2-的内容-都是利用过渡实现效果-那么这一块就是利用动画来实现效果-区别就是-hover-的写法是增加一个动画-动画的封装-难度就在于创意","children":[]},{"level":2,"title":"2-3-1 闪烁效果","slug":"_2-3-1-闪烁效果","link":"#_2-3-1-闪烁效果","children":[]},{"level":2,"title":"2-3-2 闹钟振铃效果","slug":"_2-3-2-闹钟振铃效果","link":"#_2-3-2-闹钟振铃效果","children":[]},{"level":2,"title":"2-3-3 摇摆效果","slug":"_2-3-3-摇摆效果","link":"#_2-3-3-摇摆效果","children":[]},{"level":2,"title":"2-3-4 摇晃效果","slug":"_2-3-4-摇晃效果","link":"#_2-3-4-摇晃效果","children":[]},{"level":2,"title":"2-3-5 抖动效果","slug":"_2-3-5-抖动效果","link":"#_2-3-5-抖动效果","children":[]},{"level":2,"title":"2-3-6 弹跳效果","slug":"_2-3-6-弹跳效果","link":"#_2-3-6-弹跳效果","children":[]}],"git":{"createdTime":1647928670000,"updatedTime":1658209281000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":11.21,"words":3362},"filePathRelative":"frontend/basic-css/css-animation.md","localizedDate":"2022年3月22日","autoDesc":true}');export{Mn as comp,$n as data};
