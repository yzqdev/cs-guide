import{_ as s,r as i,c as p,b as t,w as a,d as o,a as n,e as r,o as l}from"./app-CbULZrmi.js";const d={},x=o(`<h1 id="css3-奇思妙想" tabindex="-1"><a class="header-anchor" href="#css3-奇思妙想"><span>CSS3 奇思妙想</span></a></h1><p>前几天看了一篇文章 ， 颠覆了我对 <code>CSS</code> 认识，心中无数次蹦出一个念头：&#39;卧槽，卧槽，还能特么这么用，这特么太叼了&#39; ...</p><p>于是我迫不及待想跟你们一起分享分享，以后你也可以在别人面前炫（装）耀（逼）了~</p><p>ps：本文原创不是我，我只是搬运工，看到好东西与大家分享而已，作者 github 主页请戳 <a href="https://csscoco.com/inspiration/#/" target="_blank" rel="noopener noreferrer">这里</a>~</p><h2 id="装逼指南" tabindex="-1"><a class="header-anchor" href="#装逼指南"><span>装逼指南</span></a></h2><p>本文中，所有的图形都是在单个标签内实现的，大量使用了 <code>CSS3</code> 中的 <code>::before</code>、<code>::after</code> 伪元素，<code>transparent</code> 、<code>border</code>，多重线性与径向渐变，多重内外阴影，如果你的效果不尽人意，请尝试在 <code>Chrome</code> 浏览器下预览。</p><h2 id="装逼技巧" tabindex="-1"><a class="header-anchor" href="#装逼技巧"><span>装逼技巧</span></a></h2><p>本文所有图形都会有个容器 <code>&lt;div class=&quot;css-cell&quot;&gt;&lt;/div&gt;</code>包裹，其样式结构如下：</p><pre><code class="language-css">.css-cell{
    position: relative;
    width: 100%;
    height: 300px;
}

</code></pre><p>所有图形都是在容器内实现的，其结构如下：</p><pre><code class="language-html">&lt;!--heart--&gt;
&lt;div class=&quot;css-cell&quot;&gt;
    &lt;div class=&quot;heart&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

</code></pre><p>天气那一块有部分会多一个容器，其结构如下：</p><pre><code class="language-html">&lt;div class=&quot;css-cell &quot;&gt;
    &lt;div class=&quot;breeze-container&quot;&gt;
        &lt;div class=&quot;breeze&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

</code></pre><p>为了方便起见，下面图形的具体实现，我只会贴出对应的类相应的样式代码~</p><h2 id="装逼实战" tabindex="-1"><a class="header-anchor" href="#装逼实战"><span>装逼实战</span></a></h2><h2 id="爱心" tabindex="-1"><a class="header-anchor" href="#爱心"><span>爱心</span></a></h2><p>利用 <code>div</code> 的正方形和伪类的圆型组合而成，具体代码如下：</p>`,17),c=n("pre",null,[n("code",{class:"language-html"},`<div class="css-cell">
    <div class="heart"></div>
</div>
`)],-1),g=n("pre",null,[n("code",{class:"language-css"},`.css-cell{
    height:10rem;
}
/*heart*/
.heart{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%) rotate(45deg);
    background: red;
    width: 100px;
    height: 100px;
}
.heart:before,
.heart:after
{
    content: '';
    position: absolute;
    top: 0;
    left: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: red;
}
.heart:after{
    top: -50px;
    left: 0;
}

`)],-1),h=n("h2",{id:"气泡悬浮框",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#气泡悬浮框"},[n("span",null,"气泡悬浮框")])],-1),b=n("p",null,[r("利用 "),n("code",null,"border"),r(" 结合 "),n("code",null,"transparent"),r(" 特性实现，代码如下：")],-1),u=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'>
    <div class='bubbly'></div>
</div>
`)],-1),f=n("pre",null,[n("code",{class:"language-css"},`/*bubbly*/
.wrap{
    height:10rem;
}
.bubbly{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    background: #00ccbb;
    border-radius: 8px;
    width: 200px;
    padding: 40px 10px;
    text-align: center;
    color: white;
    font-size: 20px;
}
.bubbly:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    border: 34px solid transparent;
    border-top-color: #00ccbb;
    border-bottom: 0;
    border-left: 0;
    margin: 0 0 -34px -17px;
}

`)],-1),m=n("h2",{id:"切角",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#切角"},[n("span",null,"切角")])],-1),w=n("p",null,"利用使用线性渐变实现的，代码如下：",-1),v=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'>
    <div class='notching'></div>
</div>
`)],-1),y=n("pre",null,[n("code",{class:"language-css"},`/*notching*/
.wrap{
    height:10rem;
}
.notching{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 200px;
    padding: 60px 20px;
}
.notching{
    background:
            linear-gradient(135deg, transparent 15px, deeppink 0)
            top left,
            linear-gradient(-135deg, transparent 15px, deeppink 0)
            top right,
            linear-gradient(-45deg, transparent 15px, deeppink 0)
            bottom right,
            linear-gradient(45deg, transparent 15px, deeppink 0)
            bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}

`)],-1),F=n("h2",{id:"弧形切角",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#弧形切角"},[n("span",null,"弧形切角")])],-1),k=n("p",null,"使用径向渐变实现，具体实现如下：",-1),z=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'>
    <div class='arc'></div>
</div>
`)],-1),S=n("pre",null,[n("code",{class:"language-css"},`/*arc*/
.wrap{
    height:10rem;
}
.arc{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 80px;
    padding: 80px;
}
.arc {
    background:
            radial-gradient(circle at top left,
            transparent 15px, yellowgreen 0) top left,
            radial-gradient(circle at top right,
            transparent 15px, yellowgreen 0) top right,
            radial-gradient(circle at bottom right,
            transparent 15px, yellowgreen 0) bottom right,
            radial-gradient(circle at bottom left,
            transparent 15px, yellowgreen 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}

`)],-1),A=n("h2",{id:"梯形",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#梯形"},[n("span",null,"梯形")])],-1),C=n("p",null,"利用伪类加旋转透视实现，具体实现如下：",-1),J=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'>
    <div class='trapezoid'></div>
</div>
`)],-1),E=n("pre",null,[n("code",{class:"language-css"},`.wrap{
height:10rem;
}
/*trapezoid*/
.trapezoid{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 160px;
    padding: 60px;
}
.trapezoid:before{
    content:"";
    position: absolute;
    top: 0; 
    right: 0;
    bottom: 0; 
    left: 0;
    transform:perspective(40px) scaleY(1.3) rotateX(5deg);
    transform-origin: bottom;
    background:dodgerblue;
    z-index:-1;
}

`)],-1),Q=n("h2",{id:"饼图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#饼图"},[n("span",null,"饼图")])],-1),I=n("p",null,"利用伪类、线性渐变、旋转实现，具体代码如下：",-1),D=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'>
    <div class='pie'></div>
</div>
`)],-1),V=n("pre",null,[n("code",{class:"language-css"},`/*pie*/
.wrap{
    height:10rem;
}
.pie{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 200px;
    height:200px;
    border-radius:50%;
    text-align: center;
    background-color:yellowgreen;
    overflow:hidden;
    background-image: linear-gradient(to right, transparent 50%, #655 0);
    cursor:pointer;
}
.pie:before{
    content:"";
    position:absolute;
    top:0;
    left:50%;
    width:50%;
    height:100%;
    background-color: inherit;
    transform-origin: left;
    z-index:-1;
    transform:rotate(.1turn);
}
.pie:hover:before{
    transition:all 1s;
    transform:rotate(.45turn);
}

`)],-1),G=n("h2",{id:"平行四边形",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#平行四边形"},[n("span",null,"平行四边形")])],-1),Z=n("p",null,"利用伪类、拉伸实现，实现过程如下：",-1),_=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'><div class='parallelogram'></div></div>
`)],-1),U=n("pre",null,[n("code",{class:"language-css"},`/*parallelogram*/
.wrap{height:10rem}
.parallelogram{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 200px;
    height:120px;

}
.parallelogram:before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color:#00aabb;
    z-index:-1;
    transform: skew(.08turn);
}

`)],-1),R=n("h2",{id:"折角",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#折角"},[n("span",null,"折角")])],-1),W=n("p",null,"利用切角、伪类、渐变、旋转实现，代码如下：",-1),Y=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='corner'>
          
     </div>
     
 </div>
`)],-1),O=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*corner*/
.corner{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 120px;
    height:120px;
    padding:40px;
    background:linear-gradient(-150deg,transparent 1.5em, yellowgreen  0);
    border-radius:8px;
}
.corner:before{
    content: '';
    position: absolute;
    top: 0; right: 0;
    background: linear-gradient(to left bottom,transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4)) 100% 0 no-repeat;
    width: 1.73em;
    height: 3em;
    transform: translateY(-1.3em) rotate(-30deg);
    transform-origin: bottom right;
    border-bottom-left-radius: inherit;
    box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15);
}

`)],-1),j=n("h2",{id:"纯-css-方案实现背景变暗效果-hover按钮触发",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#纯-css-方案实现背景变暗效果-hover按钮触发"},[n("span",null,"纯 CSS 方案实现背景变暗效果（hover按钮触发）")])],-1),N=n("p",null,"鼠标移入",-1),q=n("p",null,[r("利用 "),n("code",null,"box-shadow"),r(" 实现，具体代码如下：")],-1),M=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'>
    <div class='spectiveBlur'></div>
</div>
`)],-1),K=n("pre",null,[n("code",{class:"language-css"},`/*spectiveBlur*/
.wrap{height:10rem;}
.spectiveBlur{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 220px;
    height:160px;
    transform: translate(-50%, -50%);
    border-radius:10px;
    overflow:hidden;
    background:#E91E63;
    cursor:pointer;
    transition: transform .2s;
}
.spectiveBlur:hover{
    box-shadow:0 0 0 1920px rgba(0,0,0,.7);
    transform: translate(-50%, -50%) scale(1.2);
}

`)],-1),X=n("h2",{id:"条纹背景图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#条纹背景图"},[n("span",null,"条纹背景图")])],-1),H=n("p",null,"主要是利用渐变实现，具体实现如下：",-1),B=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='stripe'>
          
     </div>
     
 </div>
`)],-1),L=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*stripe*/
.stripe{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 200px;
    height:200px;
    background:deeppink;
    border-radius:.5em;
    background:repeating-linear-gradient(45deg,#CC9999, #CC9999 15px, #CCCCCC 0, #CCCCCC 30px)
}

`)],-1),T=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='wave-stripe'>
     </div>
     
 </div>
`)],-1),P=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*wave-stripe*/
.wave-stripe{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 200px;
    height:200px;
    border-radius:.5em;
    background:
            linear-gradient(135deg, deeppink 25%, transparent 25%) -50px 0,
            linear-gradient(225deg, deeppink 25%, transparent 25%) -50px 0,
            linear-gradient(315deg, deeppink 25%, transparent 25%),
            linear-gradient(45deg, deeppink 25%, transparent 25%);
    background-size: 40px 40px;
}

`)],-1),$=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='arrow-stripe'>
       
     </div>
     
 </div>
`)],-1),nn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.arrow-stripe{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 200px;
    height:200px;
    border-radius:.5em;
    background:
            linear-gradient(45deg, #92baac 45px, transparent 45px)64px 64px,
            linear-gradient(45deg, #92baac 45px, transparent 45px,transparent 91px, #e1ebbd 91px, #e1ebbd 135px, transparent 135px),
            linear-gradient(-45deg, #92baac 23px, transparent 23px, transparent 68px,#92baac 68px,#92baac 113px,transparent 113px,transparent 158px,#92baac 158px);
    background-color:#e1ebbd;
    background-size: 128px 128px;
}

`)],-1),en=n("h2",{id:"混合模式背景图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#混合模式背景图"},[n("span",null,"混合模式背景图")])],-1),tn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='colorful-stripe'>
         
     </div>
     
 </div>
`)],-1),an=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.colorful-stripe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    text-align: center;
    color: #fff;
    font-size: 200%;
    border-radius: .5em;
    background:
            linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent);
    background-blend-mode: screen;
}

`)],-1),rn=n("h2",{id:"太阳",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#太阳"},[n("span",null,"太阳")])],-1),on=n("p",null,"利用线性渐变、阴影、旋转实现，具体代码如下：",-1),sn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='sun'>
         
     </div>
     
 </div>
`)],-1),pn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.sun{
    position: absolute;
    top: 50%;
    left: 50%;
    width:200px;
    height:260px;
    transform: translate(-50%, -50%);
    background:#0BF;
    border-radius:5px;
}
.sun:before{
    content:"";
    position: absolute;
    width: 80px;
    height: 80px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius:50%;
    background:rgba(255, 238, 68, 1);
    box-shadow: 0 0 0 15px rgba(255,255,0,0.2),0 0 15px #fff;
    z-index:-10;
}
.sun:after{
    content:"";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 160px;
    width: 160px;
    transform: translate(-50%, -50%) rotate(30deg);
    z-index:-100;
    background-image:
            -webkit-linear-gradient(top,rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%),
            -webkit-linear-gradient(left,rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    background-size: 20px 100%, 100% 20px;
    background-repeat: no-repeat;
    background-position: center center, center center;
    animation:sunRotate 10s linear infinite;
}
@keyframes sunRotate{
    0%{
        transform: translate(-50%, -50%) rotate(30deg);
    }
    100%{
        transform: translate(-50%, -50%) rotate(390deg);
    }
}

`)],-1),ln=n("h2",{id:"多云",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#多云"},[n("span",null,"多云")])],-1),dn=n("p",null,"利用线性渐变、阴影、缩放实现，具体实现如下：",-1),xn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='starry-container'>
         <div class='cloudy'></div>
     </div>
     
 </div>
`)],-1),cn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*cloudy*/
.cloudy{
    position: absolute;
    top: 50%;
    left: 50%;
    width:200px;
    height:260px;
    transform: translate(-50%, -50%);
    background:#2EB5E5;
    border-radius:5px;
}
.cloudy:before {
    content: "";
    text-indent:23px;
    font-size:22px;
    line-height:40px;
    color:#333;
    position: absolute;
    height: 50px;width: 50px;
    background: #FFFFFF;
    left:30%;
    top:45%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow:
            #FFFFFF 65px -15px 0 -5px,
            #FFFFFF 25px -25px,
            #FFFFFF 30px 10px,
            #FFFFFF 60px 15px 0 -10px,
            #FFFFFF 85px 5px 0 -5px,
            #C8C8C8 35px -35px,
            #C8C8C8 66px -27px 0 -5px,
            #C8C8C8 91px -10px 0 -8px;
    animation: cloudy 5s ease-in-out infinite;
}
.cloudy:after{
    content:"";
    position: absolute;
    top: 80%;
    left: 50%;
    height: 15px;
    width: 120px;
    background:rgba(0,0,0,.5);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: cloudy_shadow 5s ease-in-out infinite;
}
@keyframes cloudy {
    50%{
        transform: translate(-50%, -70%);
    }
    100%{
        transform: translate(-50%, -50%);
    }
}
@keyframes cloudy_shadow {
    50%{
        transform: translate(-50%, -50%) scale(0.8);
        background:rgba(0,0,0,.2);
    }
    100%{
        transform: translate(-50%, -50%) scale(1);
        background:rgba(0,0,0,.5);
    }
}

`)],-1),gn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='starry-container'>
         <div class='cloudy2'></div>
     </div>
     
 </div>
`)],-1),hn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*cloudy2*/
.cloudy2{
    position: absolute;
    top: 50%;
    left: 50%;
    width:200px;
    height:260px;
    transform: translate(-50%, -50%);
    background:#2EB5E5;
    border-radius:5px;
}
.cloudy2:before {
    content: "";
    text-indent:23px;
    font-size:22px;
    line-height:40px;
    color:#333;
    position: absolute;
    height: 50px;width: 50px;
    background: #FFFFFF;
    left:30%;
    top:55%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index:100;
    box-shadow:
            #FFFFFF 65px -15px 0 -5px,
            #FFFFFF 25px -25px,
            #FFFFFF 30px 10px,
            #FFFFFF 60px 15px 0 -10px,
            #FFFFFF 85px 5px 0 -5px;
    animation: cloudy2 5s ease-in-out infinite;
}
.cloudy2:after{
    content:"";
    position: absolute;
    top: 45%;left: 63%;
    height: 60px;
    width: 60px;
    z-index:10;
    background:linear-gradient(180deg,#FE9F38 0%, #F46635 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px 4px #FFA563;
    animation: cloudy2 10s ease-in-out infinite;
}
@keyframes cloudy2 {
    50%{
        transform: translate(-50%, -70%);
    }
    100%{
        transform: translate(-50%, -50%);
    }
}

`)],-1),bn=n("h2",{id:"雨",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#雨"},[n("span",null,"雨")])],-1),un=n("p",null,"利用线性渐变、阴影、缩放实现，具体代码如下：",-1),fn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='rainy-container'>
         <div class='rainy'></div>
     </div>
     
 </div>
`)],-1),mn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.rainy {
    position: absolute;
    width: 3px;
    height: 6px;
    top: 30%;
    left: 50%;
    background: #CCCCCC;
    border-radius: 50%;
    animation: rainy_rain .7s infinite linear;
}
.rainy:before {
    content: "";
    color: #333;
    position: absolute;
    height: 50px;
    width: 50px;
    top: 30px;
    left: -40px;
    background: #CCC;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: #CCC 65px -15px 0 -5px, #CCC 25px -25px, #CCC 30px 10px, #CCC 60px 15px 0 -10px, #CCC 85px 5px 0 -5px;
    animation: cloudy 5s ease-in-out infinite;
}
.rainy:after {
    content: "";
    position: absolute;
    top: 120px;
    left: 50%;
    height: 15px;
    width: 120px;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: cloudy_shadow 5s ease-in-out infinite;
}
@keyframes cloudy {
    50% {
        transform: translate(-50%, -70%);
    }
    100% {
        transform: translate(-50%, -50%);
    }
}
@keyframes cloudy_shadow {
    50% {
        transform: translate(-50%, -50%) scale(0.8);
        background: rgba(0, 0, 0, .2);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        background: rgba(0, 0, 0, .5);
    }
}
@keyframes rainy_rain {
    0% {
        box-shadow: rgba(0, 0, 0, 0) -10px 30px, rgba(0, 0, 0, 0) 40px 40px, rgba(0, 0, 0, .3) -50px 75px, rgba(0, 0, 0, .3) 55px 50px, rgba(0, 0, 0, .3) -18px 100px, rgba(0, 0, 0, .3) 12px 95px, rgba(0, 0, 0, .3) -31px 45px, rgba(0, 0, 0, .3) 30px 35px;
    }
    25% {
        box-shadow: rgba(0, 0, 0, .3) -10px 45px, rgba(0, 0, 0, .3) 40px 60px, rgba(0, 0, 0, .3) -50px 90px, rgba(0, 0, 0, .3) 55px 65px, rgba(0, 0, 0, 0) -18px 120px, rgba(0, 0, 0, 0) 12px 120px, rgba(0, 0, 0, .3) -31px 70px, rgba(0, 0, 0, .3) 30px 60px;
    }
    26% {
        box-shadow: rgba(0, 0, 0, .3) -10px 45px, rgba(0, 0, 0, .3) 40px 60px, rgba(0, 0, 0, .3) -50px 90px, rgba(0, 0, 0, .3) 55px 65px, rgba(0, 0, 0, 0) -18px 40px, rgba(0, 0, 0, 0) 12px 20px, rgba(0, 0, 0, .3) -31px 70px, rgba(0, 0, 0, .3) 30px 60px;
    }
    50% {
        box-shadow: rgba(0, 0, 0, .3) -10px 70px, rgba(0, 0, 0, .3) 40px 80px, rgba(0, 0, 0, 0) -50px 100px, rgba(0, 0, 0, .3) 55px 80px, rgba(0, 0, 0, .3) -18px 60px, rgba(0, 0, 0, .3) 12px 45px, rgba(0, 0, 0, .3) -31px 95px, rgba(0, 0, 0, .3) 30px 85px;
    }
    51% {
        box-shadow: rgba(0, 0, 0, .3) -10px 70px, rgba(0, 0, 0, .3) 40px 80px, rgba(0, 0, 0, 0) -50px 45px, rgba(0, 0, 0, .3) 55px 80px, rgba(0, 0, 0, .3) -18px 60px, rgba(0, 0, 0, .3) 12px 45px, rgba(0, 0, 0, .3) -31px 95px, rgba(0, 0, 0, .3) 30px 85px;
    }
    75% {
        box-shadow: rgba(0, 0, 0, .3) -10px 95px, rgba(0, 0, 0, .3) 40px 100px, rgba(0, 0, 0, .3) -50px 60px, rgba(0, 0, 0, 0) 55px 95px, rgba(0, 0, 0, .3) -18px 80px, rgba(0, 0, 0, .3) 12px 70px, rgba(0, 0, 0, 0) -31px 120px, rgba(0, 0, 0, 0) 30px 110px;
    }
    76% {
        box-shadow: rgba(0, 0, 0, .3) -10px 95px, rgba(0, 0, 0, .3) 40px 100px, rgba(0, 0, 0, .3) -50px 60px, rgba(0, 0, 0, 0) 55px 35px, rgba(0, 0, 0, .3) -18px 80px, rgba(0, 0, 0, .3) 12px 70px, rgba(0, 0, 0, 0) -31px 25px, rgba(0, 0, 0, 0) 30px 15px;
    }
    100% {
        box-shadow: rgba(0, 0, 0, 0) -10px 120px, rgba(0, 0, 0, 0) 40px 120px, rgba(0, 0, 0, .3) -50px 75px, rgba(0, 0, 0, .3) 55px 50px, rgba(0, 0, 0, .3) -18px 100px, rgba(0, 0, 0, .3) 12px 95px, rgba(0, 0, 0, .3) -31px 45px, rgba(0, 0, 0, .3) 30px 35px;
    }
}

`)],-1),wn=n("h2",{id:"微风",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#微风"},[n("span",null,"微风")])],-1),vn=n("p",null,[r("利用border、transparent、实现，这个会多一层 "),n("code",null,"div.breeze-container"),r(" 包裹，样式代码如下：")],-1),yn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='breeze-container'>
         <div class='breeze'></div>
     </div>
     
 </div>
`)],-1),Fn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*breeze*/
.breeze-container{
    position: absolute;
    top: 50%;left: 50%;
    width:200px;height:260px;
    transform: translate(-50%, -50%);
    text-align:center;
    font-size:200%;
    color:#fff;
    background:#00BBFF;
    border-radius:5px;
}
.breeze-container:after{
    content:"";
    position:absolute;
    top:58%;
    left:50%;
    transform: translate(-50%, -50%);
    width:6px;
    height:70px;
    background:#fff;
}
.breeze{
    position:absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(1deg);
    border-bottom:60px solid #fff;
    border-left:5px solid transparent;
    border-right:5px solid transparent;
    animation: windmill 12s infinite linear;
    transform-origin:50.5% 62px;
}
.breeze:before{
    position:absolute;
    top: 75px;left: -59px;
    content:"";
    border-right:60px solid #fff;
    border-top:5px solid transparent;
    border-bottom:5px solid transparent;
    transform:rotate(-30deg);
}
.breeze:after{
    position:absolute;
    top: 75px;left: -1px;
    content:"";
    border-left:60px solid #fff;
    border-top:5px solid transparent;
    border-bottom:5px solid transparent;
    transform:rotate(30deg);
}
@keyframes windmill{
    0%{
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100%{
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

`)],-1),kn=n("h2",{id:"彩虹",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#彩虹"},[n("span",null,"彩虹")])],-1),zn=n("p",null,"主要是利用border、box-shadow 实现，具体实现如下：",-1),Sn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='rainbow-container'>
         <div class='rainbow'></div>
     </div>
     
 </div>
`)],-1),An=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*rainbow*/
.rainbow-container{
    position: absolute;
    top: 50%;
    left: 50%;
    width:200px;
    height:260px;
    transform: translate(-50%, -50%);
    background:#F3D166;
    border-radius:5px;
}
.rainbow{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 1px;width: 1px;
}
.rainbow:before{
    content:"";
    position:absolute;
    top: 50%;left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    height: 70px;width: 70px;
    border-radius: 100px 0 0 0;
    box-shadow:
            #F44336 -2px -2px 0 1px,
            #FF9800 -4px -4px 0 3px,
            #FFEB3B -6px -6px 0 5px,
            #8BC34A -8px -8px 0 7px,
            #00BCD4 -10px -10px 0 9px,
            #2196F3 -12px -12px 0 11px,
            #9C27B0 -14px -14px 0 13px;
    animation: rainbow 5s ease-in-out infinite;
}
.rainbow:after{
    content: "";
    position: absolute;
    top: 70px;
    left: 50%;
    height: 15px;
    width: 120px;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: cloudy_shadow 5s ease-in-out infinite;
}
@keyframes rainbow {
    50% {
        transform: translate(-50%, -55%) rotate(30deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(45deg);
    }
}
@keyframes cloudy_shadow {
    50% {
        transform: translate(-50%, -50%) scale(0.8);
        background: rgba(0, 0, 0, .2);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        background: rgba(0, 0, 0, .5);
    }
}

`)],-1),Cn=n("h2",{id:"夜空",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#夜空"},[n("span",null,"夜空")])],-1),Jn=n("p",null,"主要是利用 box-shadow 实现 ， 实现方式如下：",-1),En=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='starry-container'>
         <div class='starry'></div>
     </div>
     
 </div>
`)],-1),Qn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*starry*/
.starry-container{
    position: absolute;
    top: 50%;
    left: 50%;
    width:200px;
    height:260px;
    transform: translate(-50%, -50%);
    background:#222233;
    border-radius:5px;
}
.starry{
    position:absolute;
    top: 30%;left: 40%;
    transform: translate(-50%, -50%);
    height: 4px;width: 4px;
    border-radius:50%;
    box-shadow:
            #FFFFFF -26px 77px 0 -1px,
            rgba(255,255,255,0.1) -36px 59px 0 -1px,
            rgba(255,255,255,0.1) -28px 89px 0 -1px,
            #FFFFFF -35px 20px 0 -1px,
            #FFFFFF 14px 100px,
            rgba(255,255,255,0.1) 41px 60px,
            #FFFFFF 34px 39px,
            rgba(255,255,255,0.1) 14px 45px 0 -1px,
            #FFFFFF 64px 12px 0 -1px,
            rgba(255,255,255,0.1) 32px 96px 0 -1px,
            #FFFFFF 64px 71px,
            rgba(255,255,255,0.1) 60px 18px 0 -1px,
            #FFFFFF 34px 9px,
            rgba(255,255,255,0.1) -26px 55px 0 -1px;
    animation: starry_star 5s ease-in-out infinite;
}
.starry:before{
    content:"";
    position:absolute;
    top: 20%;left: 50%;
    width:100px;height:100px;
    box-shadow: #FFFFFF -25px 0;
    transform: rotate(-5deg);
    border-radius: 50%;
    animation: starry 5s ease-in-out infinite;
}
@keyframes starry {
    50% {
        transform: rotate(10deg);
    }
}
@keyframes starry_star{
    50%{
        box-shadow:
                rgba(255,255,255,0.1) -26px 77px 0 -1px,
                #FFF -36px 59px 0 -1px,
                #FFF -28px 89px 0 -1px,
                rgba(255,255,255,0.1) -35px 20px 0 -1px,
                rgba(255,255,255,0.1) 14px 100px,
                #FFF 41px 60px,
                rgba(255,255,255,0.1) 34px 39px,
                #FFF 14px 45px 0 -1px,
                rgba(255,255,255,0.1) 64px 12px 0 -1px,
                #FFF 32px 96px 0 -1px,
                rgba(255,255,255,0.1) 64px 71px,
                #FFF 60px 18px 0 -1px,
                rgba(255,255,255,0.1) 34px 9px,
                #FFF -26px 55px 0 -1px;
    }
}

`)],-1),In=n("h2",{id:"雷电",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#雷电"},[n("span",null,"雷电")])],-1),Dn=n("p",null,"主要是利用阴影、border实现，代码如下：",-1),Vn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='thunder-container'><div class='thunder'></div></div>
     
 </div>
`)],-1),Gn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:30rem;
}
.thunder-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 260px;
    transform: translate(-50%, -50%);
    background: #444;
    border-radius: 5px;
}
.thunder {
    color: #333;
    position: absolute;
    height: 50px;
    width: 50px;
    top: 40%;
    left: 30%;
    background: #222;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow:
            #222 65px -15px 0 -5px,
            #222 25px -25px,
            #222 30px 10px,
            #222 60px 15px 0 -10px,
            #222 85px 5px 0 -5px;
    animation: cloudy 5s ease-in-out infinite;
}
.thunder:before {
    content: "";
    position: absolute;
    top: 60px;
    left: 60px;
    border-left: 0px solid transparent;
    border-right: 8px solid transparent;
    border-top: 38px solid yellow;
    box-shadow: yellow -7px -32px;
    transform:rotate(30deg);
    transform-origin:center -50px;
    animation:stormy_thunder 2s steps(1, end) infinite;;
}
.thunder:after {
    content: "";
    position: absolute;
    top: 120px;
    left: 64px;
    height: 15px;
    width: 120px;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    z-index:-1;
    transform: translate(-50%, -50%);
    animation: cloudy_shadow 5s ease-in-out infinite;
}
@keyframes cloudy {
    50% {
        transform: translate(-50%, -30px);
    }
}
@keyframes cloudy_shadow {
    50% {
        transform: translate(-50%, 0) scale(0.8);
        background: rgba(0, 0, 0, .2);
    }
}
@keyframes stormy_thunder{
    0%  {  transform: rotate(30deg); opacity:1; }
    5%  {  transform: rotate(-34deg); opacity:1; }
    10% {  transform: rotate(0deg); opacity:1; }
    15% {  transform: rotate(-34deg); opacity:0; }
}

`)],-1),Zn=n("h2",{id:"大雪",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#大雪"},[n("span",null,"大雪")])],-1),_n=n("p",null,"利用阴影实现 ， 代码如下：",-1),Un=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='snowy-container'><div class='snowy'></div></div>
     <div class='cloudy'></div>
     <div class='snowy_rain'></div>
 </div>
`)],-1),Rn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:30rem;
}
/*snow*/
.snowy-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 260px;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 200%;
    color: #fff;
    background: #607D8B;
    border-radius: 5px;
}
.snowy {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius:50%;
    top: 30%;
    left: 50%;
    background: #fff;
    border-radius: 50%;
    animation: snowy_rain 2s infinite linear;
}
.snowy:before {
    content: "";
    color: #333;
    position: absolute;
    height: 50px;
    width: 50px;
    top: 30px;
    left: -40px;
    background: #eee;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow:
            #eee 65px -15px 0 -5px,
            #eee 25px -25px,
            #eee 30px 10px,
            #eee 60px 15px 0 -10px,
            #eee 85px 5px 0 -5px;
    animation: cloudy 5s ease-in-out infinite;
}
.snowy:after {
    content: "";
    position: absolute;
    top: 120px;
    left: 50%;
    height: 15px;
    width: 120px;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: cloudy_shadow 5s ease-in-out infinite;
}
@keyframes cloudy {
    50% {
        transform: translate(-50%, -70%);
    }
    100% {
        transform: translate(-50%, -50%);
    }
}
@keyframes cloudy_shadow {
    50% {
        transform: translate(-50%, -50%) scale(0.8);
        background: rgba(0, 0, 0, .2);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        background: rgba(0, 0, 0, .5);
    }
}
@keyframes snowy_rain {
    0% {
        box-shadow:
                rgba(255, 255, 255, 0) -10px 30px,
                rgba(255, 255, 255, 0) 40px 40px,
                rgba(255, 255, 255, .6) -50px 75px,
                rgba(255, 255, 255, .6) 55px 50px,
                rgba(255, 255, 255, .6) -18px 100px,
                rgba(255, 255, 255, .6) 12px 95px,
                rgba(255, 255, 255, .6) -31px 45px,
                rgba(255, 255, 255, .6) 30px 35px;
    }
    25% {
        box-shadow:
                rgba(255, 255, 255, .6) -10px 45px,
                rgba(255, 255, 255, .6) 40px 60px,
                rgba(255, 255, 255, .6) -50px 90px,
                rgba(255, 255, 255, .6) 55px 65px,
                rgba(255, 255, 255, 0) -18px 120px,
                rgba(255, 255, 255, 0) 12px 120px,
                rgba(255, 255, 255, .6) -31px 70px,
                rgba(255, 255, 255, .6) 30px 60px;
    }
    26% {
        box-shadow:
                rgba(255, 255, 255, .6) -10px 45px,
                rgba(255, 255, 255, .6) 40px 60px,
                rgba(255, 255, 255, .6) -50px 90px,
                rgba(255, 255, 255, .6) 55px 65px,
                rgba(255, 255, 255, 0) -18px 40px,
                rgba(255, 255, 255, 0) 12px 20px,
                rgba(255, 255, 255, .6) -31px 70px,
                rgba(255, 255, 255, .6) 30px 60px;
    }
    50% {
        box-shadow:
                rgba(255, 255, 255, .6) -10px 70px,
                rgba(255, 255, 255, .6) 40px 80px,
                rgba(255, 255, 255, 0) -50px 100px,
                rgba(255, 255, 255, .6) 55px 80px,
                rgba(255, 255, 255, .6) -18px 60px,
                rgba(255, 255, 255, .6) 12px 45px,
                rgba(255, 255, 255, .6) -31px 95px,
                rgba(255, 255, 255, .6) 30px 85px;
    }
    51% {
        box-shadow:
                rgba(255, 255, 255, .6) -10px 70px,
                rgba(255, 255, 255, .6) 40px 80px,
                rgba(255, 255, 255, 0) -50px 45px,
                rgba(255, 255, 255, .6) 55px 80px,
                rgba(255, 255, 255, .6) -18px 60px,
                rgba(255, 255, 255, .6) 12px 45px,
                rgba(255, 255, 255, .6) -31px 95px,
                rgba(255, 255, 255, .6) 30px 85px;
    }
    75% {
        box-shadow:
                rgba(255, 255, 255, .6) -10px 95px,
                rgba(255, 255, 255, .6) 40px 100px,
                rgba(255, 255, 255, .6) -50px 60px,
                rgba(255, 255, 255, 0) 55px 95px,
                rgba(255, 255, 255, .6) -18px 80px,
                rgba(255, 255, 255, .6) 12px 70px,
                rgba(255, 255, 255, 0) -31px 120px,
                rgba(255, 255, 255, 0) 30px 110px;
    }
    76% {
        box-shadow:
                rgba(255, 255, 255, .6) -10px 95px,
                rgba(255, 255, 255, .6) 40px 100px,
                rgba(255, 255, 255, .6) -50px 60px,
                rgba(255, 255, 255, 0) 55px 35px,
                rgba(255, 255, 255, .6) -18px 80px,
                rgba(255, 255, 255, .6) 12px 70px,
                rgba(255, 255, 255, 0) -31px 25px,
                rgba(255, 255, 255, 0) 30px 15px;
    }
    100% {
        box-shadow:
                rgba(255, 255, 255, 0) -10px 120px,
                rgba(255, 255, 255, 0) 40px 120px,
                rgba(255, 255, 255, .6) -50px 75px,
                rgba(255, 255, 255, .6) 55px 50px,
                rgba(255, 255, 255, .6) -18px 100px,
                rgba(255, 255, 255, .6) 12px 95px,
                rgba(255, 255, 255, .6) -31px 45px,
                rgba(255, 255, 255, .6) 30px 35px;
    }
}

`)],-1),Wn=n("h2",{id:"五角星",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#五角星"},[n("span",null,"五角星")])],-1),Yn=n("p",null,"主要是利用border、transparent、旋转实现，代码如下：",-1),On=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='five-star'></div>
 </div>
`)],-1),jn=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:10rem;
}
/*star*/
.five-star{
    position: absolute;
    top: 35%;
    right: 50%;
    transform: translate(-50%, -50%) scale(8);
    width: 0;
    height: 0;
    display: block;
    border-left: 3.04px solid transparent;
    border-right: 3.24px solid transparent;
    border-bottom: 10px solid #98DBE3;
    -webkit-filter: drop-shadow(1px .5px 1px #ccc);
    cursor: pointer;
}
.five-star:before{
    content: "";
    position: absolute;
    top: 8.65px;
    left: -8.82px;
    width: 0;
    height: 0;
    color: #98DBE3;
    display: block;
    border-left: 12.5px solid transparent;
    border-right: 12.5px solid transparent;
    border-bottom: 9.08px solid #98DBE3;
    transform-origin: top center;
    transform: rotate(36deg);
}
.five-star:after{
    content: "";
    position: absolute;
    top: 8.65px;
    left: -15px;
    width: 0;
    height: 0;
    color: #98DBE3;
    display: block;
    border-left: 12.5px solid transparent;
    border-right: 12.5px solid transparent;
    border-bottom: 9.08px solid #98DBE3;
    transform-origin: top center;
    transform: rotate(-36deg);
}

`)],-1),Nn=n("h2",{id:"太极八卦",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#太极八卦"},[n("span",null,"太极八卦")])],-1),qn=n("p",null,"利用 box-shadow 实现 ， 代码很简单：",-1),Mn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='TaiChi'></div>
 </div>
`)],-1),Kn=n("pre",null,[n("code",{class:"language-css"},`/*captainAmerica*/
.wrap{
    height:10rem;
}
/*TaiChi*/
.TaiChi{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
    box-shadow:0 0 2px #ddd;
    border-radius:50%;
    background-image:
            radial-gradient(#000 12.5px, transparent 12.5px),
            radial-gradient(#fff 12.5px, transparent 12.5px),
            radial-gradient(#fff 50px, transparent 50px),
            radial-gradient(#000 50px, transparent 50px),
            linear-gradient(90deg,#000 100px, #fff 100px);
    background-position:center 50px,center -50px,center 50px,center -50px,0 0;
}

`)],-1),Xn=n("h2",{id:"美队盾牌",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#美队盾牌"},[n("span",null,"美队盾牌")])],-1),Hn=n("p",null,"利用 渐变 实现 ， 代码如下：",-1),Bn=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='captainAmerica'></div>
 </div>
`)],-1),Ln=n("pre",null,[n("code",{class:"language-css"},`/*captainAmerica*/
.wrap{
    height:10rem;
}
.captainAmerica{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
    background:
            linear-gradient(45deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 65%),
            linear-gradient(-45deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 65%),
            linear-gradient(to right, rgba(0,0,0,0) 35%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 65%),
            linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 65%),
            radial-gradient(ellipse at center, #0033b0 20%, #ce0021 20%, #ce0021 35%, #eee 35%, #eee 55%, #ce0021 55%);
    border-radius: 50%;
    box-shadow: 0 3px 0 #a20917,0 4px 2px 2px #eee;
}
.captainAmerica::before{
    content: '★';
    position:absolute;
    top: 50%;left: 50%;
    transform: translate(-50%, -50%);
    margin-left:-3px;
    width: 50px;height:50px;
    font-family: simsun,Tahoma,Helvetica,Arial,SimHei,sans-serif;
    line-height: 47px;
    z-index: 1;
    border-radius: 50%;
    font-size: 55px;
    color: #fff;
    text-align:center;
    text-shadow: 2px 1px 2px #777;
}

`)],-1),Tn=n("h2",{id:"纽扣",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#纽扣"},[n("span",null,"纽扣")])],-1),Pn=n("p",null,"利用 渐变、阴影 实现 ， 实现方法如下：",-1),$n=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='button'>
          
     </div>
     
 </div>
`)],-1),ne=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.button{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 180px;
    background: #87ceeb;
    border-radius: 50%;
    box-shadow:
            inset 0 5px 5px #87ceeb,
            inset 0 17px 5px rgba(255,255,255,0.7),
            inset 0 -3px 3px rgba(255,255,255,0.3),
            inset 0 -10px 10px rgba(0,0,0,0.3),
            inset 0 -15px 10px #45b3e0,
            0 7px 10px rgba(0,0,0,0.3);
}
.button::before{
    content: '';
    position:absolute;
    top: 50%;left: 50%;
    width: 110px;height: 106px;
    margin-left: -55px;margin-top: -55px;
    background-image:
            radial-gradient(circle at 38px 38px, #333 10px, transparent 10px),
            radial-gradient(circle at 73px 73px, #333 10px, transparent 10px),
            radial-gradient(circle at 38px 73px, #333 10px, transparent 10px),
            radial-gradient(circle at 73px 38px, #333 10px, transparent 10px);
    border-radius: 50%;
    border-top: 1px solid rgba(0,0,0,0.6);
    border-bottom: 1px solid rgba(255,255,255,0.6);
    box-shadow:
            inset 0 20px 2px rgba(255,255,255,0.3),
            3px -15px 7px -4px rgba(0,0,0,0.3),
            0 -14px 10px 5px #45b3e0,
            0 2px 5px 5px #87ceeb,
            0 10px 5px 5px rgba(255,255,255,0.6);
}
.button::after{
    content: '';
    position:absolute;
    top: 50%;left: 50%;
    width: 50px;height: 50px;
    margin-left: -25px;
    margin-top: -23px;
    background-image:
            linear-gradient(to right, transparent 35%, #000080 35%, #4682b4 40%, #000080 45%, #4682b4 50%, #000080 55%, #4682b4 60%, #000080 65%, transparent 65%),
            linear-gradient(to bottom, transparent 35%, #000080 35%, #4682b4 40%, #000080 45%, #4682b4 50%, #000080 55%, #4682b4 60%, #000080 65%, transparent 65%);
    border-radius: 50%;
    transform: rotate(45deg);
}

`)],-1),ee=n("h2",{id:"chrome",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#chrome"},[n("span",null,"Chrome")])],-1),te=n("p",null,"利用渐变实现 , 具体如下：",-1),ae=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='Chrome'>
          
     </div>
     
 </div>
`)],-1),re=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.Chrome{
    position: absolute;
    top: 50%;left: 50%;
    width: 180px;height: 180px;
    transform: translate(-50%, -50%);
    box-shadow:0 0px 4px #999,0 0 2px #ddd inset;
    border-radius:50%;
    background-image:
            radial-gradient(#4FACF5 0%,#2196F3 28%, transparent 28%),
            radial-gradient(#fff 33%, transparent 33%),
            linear-gradient(-50deg,#FFEB3B 34%, transparent 34%),
            linear-gradient(60deg,#4CAF50 33%, transparent 33%),
            linear-gradient(180deg,#FF756B 0%, #F44336 30%, transparent 30%),
            linear-gradient(-120deg,#FFEB3B 40%, transparent 40%),
            linear-gradient(-60deg,#FFEB3B 30%, transparent 30%),
            linear-gradient(0deg,#4CAF50 45%, transparent 45%),
            linear-gradient(60deg,#4CAF50 30%, transparent 30%),
            linear-gradient(120deg,#F44336 50%, transparent 50%),
            linear-gradient(180deg,#F44336 30%, transparent 30%);
    background-position:0 0;
}

`)],-1),oe=n("h2",{id:"opera",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#opera"},[n("span",null,"Opera")])],-1),se=n("p",null,"利用渐变实现 , 代码如下：",-1),ie=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='Opera'>
          
     </div>
     
 </div>
`)],-1),pe=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.Opera{
    position: absolute;
    top: 50%;left: 50%;
    width: 170px;height: 200px;
    transform: translate(-50%, -50%);
    border-radius:50%;
    box-shadow:0 2px 4px #333;
    background-image:
            linear-gradient(rgb(254, 135, 138) 0%, rgb(231, 22, 22) 50%, rgb(128, 0, 0) 85%, rgb(184, 3, 4) 100%);
}
.Opera:after{
    content:"";
    position: absolute;
    top:50%;left:50%;
    width: 60px;height: 180px;
    transform: translate(-50%, -50%);
    border-radius:50%;
    background:#fff;
}
.Opera:before{
    content:"";
    position: absolute;
    top:50%;left:50%;
    width: 72px;height: 185px;
    transform: translate(-50%, -50%);
    border-radius:50%;
    background:rgba(0,0,0,.4);
}

`)],-1),le=n("h2",{id:"ie",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#ie"},[n("span",null,"IE")])],-1),de=n("p",null,"利用渐变、多重阴影实现 ， 代码实现如下：",-1),xe=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='IE'>
          
     </div>
     
 </div>
`)],-1),ce=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.IE{
    position: absolute;
    top: 50%;
    left: 50%;
    width:200px;
    height:200px;
    transform: translate(-50%, -50%);
    border-radius:50%;
    background-image:
            radial-gradient(#fff 38%, transparent 38%),
            radial-gradient(#09C 0%, #09C 100%);

}
.IE:before{
    content: "";
    width:285px;
    height:122px;
    background:none;
    border-radius:100%;
    position:absolute;
    top:33px;
    left:-45px;
    margin:auto;
    box-shadow:
            inset 0 12px 0 13px  #09c,
            -35px -8px 0 -5px #fff;
    transform: rotate(-35deg);
}
.IE:after {
    content: "";
    width: 120px;
    height: 25px;
    background: #09c;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: 50px 23px 0 -2px #fff
}

`)],-1),ge=n("h2",{id:"safari",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#safari"},[n("span",null,"safari")])],-1),he=n("p",null,"利用渐变、border、旋转实现 ， 具体代码如下：",-1),be=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='safari'>
          
     </div>
     
 </div>
`)],-1),ue=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
.safari{
    position: absolute;
    top: 50%;left: 50%;
    width:200px; height:200px;
    transform: translate(-50%, -50%);
    border-radius:50%;
    border:5px solid #E8E8E8;
    box-shadow:
            -1px 3px 1px 2px #999,
            -1px 3px 1px 2px #999 inset;
    background-image:
            radial-gradient(transparent 30%,#fff 30%,#fff 34%, transparent 34%),
            linear-gradient(rgba(255,255,255,.8) 100%, transparent 100%),
            linear-gradient(rgba(255,255,255,.8) 100%, transparent 100%),
            linear-gradient(rgba(255,255,255,.8) 100%, transparent 100%),
            linear-gradient(rgba(255,255,255,.8) 100%, transparent 100%),
            linear-gradient(#1DE3FF 0%, #1F52EF 100%);
    background-size: 50% 50%,20px 2px,20px 2px,2px 20px,2px 20px,100%,100%;
    background-repeat:no-repeat;
    background-position:center center, 175px center,5px center,center 175px,center 5px,0 0;

}
.safari::before{
    content:"";
    position: absolute;
    top: 10px;left: 50%;
    border-radius:10px;
    border-bottom:100px solid rgba(255,255,255,.9);
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    transform-origin:center 90px;
    z-index:-1;
    transform:translate(-50%, 0%) rotate(40deg);
}
.safari::after{
    content:"";
    position: absolute;
    top: 10px;left: 50%;
    border-radius:10px;
    border-bottom:100px solid rgba(255,0,0,.9);
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    transform-origin:center 90px;
    transform:translate(-50%, 0%) rotate(220deg);
}
.safari:hover::before{
    transition:transform 1s;
    transform:translate(-50%, 0%) rotate(70deg);
}
.safari:hover::after{
    transition:transform 1s;
    transform:translate(-50%, 0%) rotate(250deg);
}

`)],-1),fe=n("h2",{id:"firefox",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#firefox"},[n("span",null,"firefox")])],-1),me=n("p",null,"利用多重阴影实现 , 代码如下：",-1),we=n("pre",null,[n("code",{class:"language-html"},` <div class='wrap'>
     <div class='firefox'>
          
     </div>
     
 </div>
`)],-1),ve=n("pre",null,[n("code",{class:"language-css"},` 
.wrap{
    height:20rem;
}
/*firefox*/
.firefox{
    position: absolute;
    top: 50%;left: 50%;
    width: 200px;height:200px;
    transform: translate(-50%, -50%);
    border:8px solid #eee;
    border-radius:50%;
    overflow:hidden;
    background:#F48D00;
    box-shadow:0 0 2px 0 #999;
}
.firefox::before{
    content: "";
    width: 46px;
    height: 46px;
    background: #A4DFEF;
    border-radius: 100%;
    position: absolute;
    top: 90px;
    left: 50px;
    margin: auto;
    border: 1px solid #A4DFEF;
    box-shadow:
            -10px 0 0 5px rgba(164, 223, 239, .2),
            16px -60px 0 8px rgba(164, 223, 239, .2),
            -30px -50px 0 8px #F48D00,
            25px -38px 0 0px #A4DFEF,
            -30px -30px 0 12px #F48D00,
            15px -60px 0 8px #A4DFEF,
            33px 31px 0 -15px #A4DFEF,
            30px 17px 0 -13px #F48D00,
            20px -10px 0 0px #A4DFEF,
            -8px -0px 0 19px #F48D00,
            30px 17px 0 0px #A4DFEF,
            24px 30px 0 15px #F48D00,
            20px -6px 0 28px #A4DFEF,
            45px 10px 0 35px #F48D00,
            -5px -57px 0 8px #F48D00,
            20px -23px 0 45px #A4DFEF,
            -5px -80px 0 8px #A4DFEF,
            -30px -70px 0 8px #F48D00,
            -5px -57px 0 8px #F48D00,
            43px -11px 0 55px #F48D00,
            22px -39px 0 55px #A4DFEF;
}
.firefox::after{
    content: "";
    width: 0px;
    height: 2px;
    background: linear-gradient(90deg,#F48D00 75% ,#333 30% );
    background-size: 35px 35px;
    position: absolute;
    top: 50px;
    left: 73px;
    margin: auto;
    border: solid;
    border-width: 12px 0 15px 30px;
    border-color: #A4DFEF #fff #A4DFEF transparent;
    box-shadow: inset 0px 0 0 50px #333;
}

`)],-1),ye=n("h2",{id:"搜狗",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#搜狗"},[n("span",null,"搜狗")])],-1),Fe=n("p",null,"利用文字、阴影实现 , 具体代码如下：",-1),ke=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'>
    <div class='sogou'></div>
</div>
`)],-1),ze=n("pre",null,[n("code",{class:"language-css"},`/*sougou*/
.wrap{height:10rem}
.sogou{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;height:200px;
    transform: translate(-50%, -50%);
    border:8px solid #fff;
    box-shadow: 2px 1px 2px 2px #ccc;
    border-radius:50%;
    overflow:hidden;
    background:#4DA0ED;
}
.sogou::before{
    content:"S";
    position: absolute;
    line-height: 185px;
    top:0;
    left:0;
    right:0;
    bottom:0;
    color:#fff;
    font-weight:600;
    font-size:320px;
    text-align:center;
    text-shadow:
            3px 0 0px #337FC4,
            -5px 0px 0px #CDE4F0,
            0px 8px 0px #387FBF;
    transform:rotate(2deg);
    z-index:-10;
    overflow:hidden;
}

`)],-1),Se=n("h2",{id:"利用滤镜实现混合效果",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#利用滤镜实现混合效果"},[n("span",null,"利用滤镜实现混合效果")])],-1),Ae=n("p",null,[r("利用 "),n("code",null,"fliter:blur()"),r(" 、"),n("code",null,"filter:contrast()"),r(" 实现 ， 代码如下：")],-1),Ce=n("pre",null,[n("code",{class:"language-html"},`<div class='wrap'><div class='filter-mix'></div></div>

`)],-1),Je=n("pre",null,[n("code",{class:"language-css"},`/*filter-mix*/
.wrap{
    height:10rem;
}
.filter-mix{
    position: absolute;
    top: 50%;left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;height: 200px;
    -webkit-filter:contrast(20);
    background:#fff;
}
.filter-mix::before{
    content:"";
    position: absolute;
    width:120px;
    height:120px;
    border-radius: 50%;
    background:#333;
    top:40px;
    left:0px;
    z-index:2;
    -webkit-filter:blur(6px);
    box-sizing:border-box;
    animation:filterBallMove 10s ease-out infinite;
    -webkit-animation:filterBallMove 10s ease-out infinite;
}
.filter-mix::after{
    content:"";
    position: absolute;
    width:80px;
    height:80px;
    border-radius: 50%;
    background:#3F51B5;
    top:60px;
    right:0px;
    z-index:2;
    -webkit-filter:blur(6px);
    animation:filterBallMove2 10s ease-out infinite;
    -webkit-animation:filterBallMove2 10s ease-out infinite;

}

@keyframes filterBallMove{
    50%{
        left:200px;
    }
}

@-webkit-keyframes filterBallMove{
    50%{
        left:200px;
    }
}

@keyframes filterBallMove2{
    50%{
        right:200px;
    }
}

@-webkit-keyframes filterBallMove2{
    50%{
        right:200px;
    }
}

`)],-1),Ee=o('<h2 id="装逼总结" tabindex="-1"><a class="header-anchor" href="#装逼总结"><span>装逼总结</span></a></h2><p>怎么样，是不是颠覆了你对 <code>CSS3</code> 的认识？</p><p>实际上 <code>CSS3</code> 带给我们的远不止这些东西，没有做不到，只有想不到，只有你脑洞够大，各种黑科技、酷炫的 <code>CSS</code> 必然也是手到擒来~</p><p>虽然你给不了 <code>CSS3</code> 全部，但它却把全部给了你，骚年，加油吧~</p><p><img src="https://user-gold-cdn.xitu.io/2017/12/29/160a05b024f6d86e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="end"></p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献"><span>参考文献</span></a></h2><p>本文主要来源以下文章：</p><p><a href="https://github.com/chokcoco/magicCss" target="_blank" rel="noopener noreferrer">magicCss</a></p><p><a href="https://github.com/cssmagic/CSS-Secrets" target="_blank" rel="noopener noreferrer">CSS Secrets</a></p>',9);function Qe(Ie,De){const e=i("CodeDemo");return l(),p("div",null,[x,t(e,{id:"code-demo-46",type:"normal",code:"eJyNkd9ugyAUxl+FmCxdG602WW9YtyfhBuWoZAgGjtuSpu++I1LbZskyL4Tz5zv8PjhnPQ4m49lJ6U/WGBnCm8iaEIoGjBHZu7CMvodqD9IjlU4lZanhumb5LKRZ+6v+vKh70F2P/FB5GF6FvQhb7uKQXSnsPu5S5+iCRu0sZ7IOzkwI1D8X0I38WD2lyECLnN1i9NKG1vmBx52RCM8FlfP5t2Xe4Zx5OSrotklSy+aj826yijMPKmW/tMKes0NVjd8pleDXHNEvyLwGOhLyNZYtghc2WWmcRbAk3GzSpD/NserBG4GvBP+Aio6cV+ALL5Wewv3t/LZ68xCZE3HEuD94QZnBSEDve/kBvJyxMA=="},{default:a(()=>[c,g]),_:1}),h,b,t(e,{id:"code-demo-56",type:"normal",code:"eJx1Uu1OwyAUfRVSY6pmOKYzGpx7kv3hqy2RQgO3brrs3b1d6abGtUkL51zOPfeEfdFA6wperLT9IMqJlN7KbRRdud54gs9PXPZSus9yvZojiPz0L2aFSglF5ndjyd184+8Hlf0o0hhbN8AXLJr2deMPyI6Fme9CsmCD50TIFFwPBqsGAkLHn9h13jlTASfnPUThUxViy48rJ8DcUKRnw+c2F0mh3usYeq85uWJMKSknJkRtIo1C2z5x8tLtMrG1GhpOHhg7QZ3Q2vqakyViZHEmwOyACmdrNK+MBxMzoYILkZNtY0/TVMEDTfbLDNpHhXMSXFR4luRAFFaiGCdlORm4FJEMAKHlhF0IaZySk8clGseTVo+5dSJih99RYNw0+/43qr+9Mjy2nMBWxNqiT4YvPXali+dpWrwsh2/MO8bz"},{default:a(()=>[u,f]),_:1}),m,w,t(e,{id:"code-demo-66",type:"normal",code:"eJydktlOwzAQRX/FioS6KCEJEB5M6ZfkxYmnidXEtuwpraj670w2NUgIaP3g5d6r42V8Dmpsm4AHG6k+WNkI798XRyfsYptrRm2ua4NlrXS12G5ikikxjUEYlN4TJl5PoXWc68eOdB5ANaiqRp4mDtq3XF/InaJjwhqvUBnNmSi8aQ4IlOsMNJZnycO4amCHnF3X6IT2O+Na3s8agbCMyA67bjWGjkpizdlTktjTKFkhJW3O2Stp5PTGD8cqRLmvnDloyQdhao3SIFxUOSEVaFymz5mEKhwOZIUjjaWZPYVMAlir9J4lq+8Iull/n/B3cnQn2nVP/hf75WZ0YRBN+y/63fDuVcZCXQsQefUJfe1n9Z/ZDiwI+hzajNOhovQ/L19Wveam"},{default:a(()=>[v,y]),_:1}),F,k,t(e,{id:"code-demo-76",type:"normal",code:"eJydUltugzAQvIqFVOUhKOQjUuWmOQk/C2zAqrEte1PSRrl7DTgNlZpUwh9+7Ox4Rvaco4ZaGfFoV4kPVkpw7m3RWTCLfa6YH9M62HKx36W+4sHrGsVR6Zy/IV17fJ3m6rnnn0d6g6JuiG8yi+1rri4e9V0BNNoJElpxBoXT8kjoW3qAtOHb7CmcJB6Is9uZLCh30Lblw04C4TLxcNxPq9DUiYoazl4ycwoVA1UlVP1TC15YMFNA+V5bfVQVHwvXYaESIJO6X1HRshS2lMiAepuDufg3YXBlwPpmttmaU8w+UUrd1RZRsWx1j/dYyPYPOUfpL+J9qUIT6Xae2gPuv4Jz3nFCDX98+8TEiS8cUjNJzgS2aBB8rJQO2zERPs+XbzCN+MA="},{default:a(()=>[z,S]),_:1}),A,C,t(e,{id:"code-demo-86",type:"normal",code:"eJx9UctuwjAQ/BUrUkVABBK19GAo39FKvjjxklh1bMteHgLx792QhHCqD7Zndmd31r4lDbYm4clO6ROrjIzxa3YO0s/2wjJarzwSD1en1Wy/WxNPKeOZLJMqRqqz6sQ3YRvQdYO8yAO0W2Hvwq4XT/1iLezqiSi76+Rd1Kid5UyW0ZkjAum6ADrPN/nbgAwckLMJUxkbDy60/HEzEiHNKLzstvmQdNYKG86Kz9xfBspLpbStORs4cjhZ4iVQSRicVc4iWOQiEcmo/s8sy7esR+HxCIR7WDpE177E+2HG8DSKhxA9VKhPkH6QvzmLlTTwkxar9zkLDmnK73SjoB4nfGozR001GeubjZ1l9VsHd7SKK6dqCKU5jpavmbYKLjwr+meg37z/ARZVrkI="},{default:a(()=>[J,E]),_:1}),Q,I,t(e,{id:"code-demo-96",type:"normal",code:"eJx1UttygjAQ/ZUMnY7WEcVO7UNq/RJeIqyQaUyYzaK2jv/ejQakteUByDl7O2dzSmramUQmq1LvRWGU9++jA6pmtM6t4GeINxpG69WcESa7bzJNCu+5wnzC/GSe21nIP13Ta9BVTXKRIezecntmlqMi2TivSTsrhdp4Z1oCDgkEuUYus8d4MrAlKW5nQmX91uFOXv6MIhinTE/D6ykGHXRJtRTPWdYcIxRnGUIbhyVgiqrUrR+0JDhSqoyueLYCLAF2Car4qNC1tkwLZxzKTzDGHSoEsDHE7QG3jMlal2WPDhL1TlUghdEWFKZVaM4txuQEhgGnV4GNQkaD7Kl4eF0uRdZJK1r03LlxOg4WXZUbYFc6cwvHrCWZJ3kSE3u//7A7G5p9M+Jq4+3c77NH7hwR2taAmn5vK3UsT7OhoUUkv1JtSzjKdHG3W3QUFjtbUIs2SO9U1sHgn1ovWVGaMWLh/632shyU48t7/gad//uE"},{default:a(()=>[D,V]),_:1}),G,Z,t(e,{id:"code-demo-106",type:"normal",code:"eJx9UVtqwzAQvIpwKU5DnCiBQlEfJ/GPbG9sEXnXSOs61OTulWM1aQhEH0Izs8zOoDFpuLWJSj4q8y1Kq73/TAenu/TrP9Npp60FS7XTbZA2QYt3jskqKb0PHpvlzdxyk+N68hobMHXDaisdtKdA3oyNOYpwOvKGDaESuvBke4b3WWDq1Kt8jsjCnpW4YnYa/Z5cq84vqxkWWZBX0/UShwZTcaPETsruGKm/SLuZyvEulyog+EKMVxIyYFidptHhYWAhI3DnNRdYEDO1VzzXuai6PNSOeqyykiw59SSl1kUR5Z/MYAVHlW3vygt/gGGxlm/cO5xqhzrhZ06/9OGbng=="},{default:a(()=>[_,U]),_:1}),R,W,t(e,{id:"code-demo-116",type:"normal",code:"eJx9UttuozAQ/ZURUpVQATFpo125u/sfK+XF4ClYBRuNnaZV1X/vmEtJWqkgmbkcz5w5w1vShr5LZAJ/tHmGulPe/92cSQ2bf0cL8blM1I4s0mdqfBbYjnFLgj+Ln2RJ7X3scLRFLPw2YVo0TRvkXhD2D0f7frS726n87Y6RkzljB+dNMM5KUJV33Skg34iJ4AZ5EDez1+FjkLD6gZT1j456OVqdCrjNOZ3FI51BZ6NDK6Hci+FlDs3ULkOD0trYRt6voUrVTw25k9WyMxYV5Q0pbdCGbV4ehMYmG9sOijgGZXHAPoNX7Dp3bgiRi4iFROVII+Xx/snL32MPVmRWQVbIU+AsRu1s4IISNpuF3E/ygHgAGudh6xtz+Eo9uFFGZhSC668miMoBNZXaiiy+xT4FcR25T1MohbgBAdblhAOq8EXn4tfduPALoWGNrCubzLiz/6xnwZAUyIVxh3dR3UW7zyu54zkNqzBxn6a+FnjK5HHCRWwwtkUyK/Al963S7iwhL/bYw3Rwf/ZLPi/nLQ+RBW+K//P3D6s4CUI="},{default:a(()=>[Y,O]),_:1}),j,N,q,t(e,{id:"code-demo-129",type:"normal",code:"eJyFUVFuwyAMvQrKNLWr2jTJtE6lXT8m9Rb9IYEGNAKRTZJKUe8+UJIu2k9BAmw/+/mZPpKu0hGNjly1pNAM8WvRAasXp4shfs39WIvCqVZ86wYWp+PWhzxquqN1VCD6UtvVHLjaXkwcKvZSqFI6miYgqsPde+ewfqCrLSqnrKGE5Wh148RhCDhbU/KRvI6mFlc3tzvFnaQky5L6Nromut2fywEzeLVQ0eGpmRPLja+yJuF8G2G5BS5gA4yrBn2/j3zbCrhq21GpOBdmgrPipwTbGE5fzvv0vHsfA0UDaIHWVhknYN7DqPHRD4kz9PH/Q6EyMI6jye1tg5JxT5+QsNN9UEugzNkyWYcdf04SniklWDAtlmmchQzP6//v/gvSnqik"},{default:a(()=>[M,K]),_:1}),X,H,t(e,{id:"code-demo-139",type:"normal",code:"eJxdUNtuwyAM/RWUaepFSZN1y8PY5aW/kRca3ASVADLOWqnqvw9yaab5Ac7xOTbGt6SlTic8YZ9S/bBaC++/VhcUbvVdGRbjr+AJlYOHNMRsy4NvFsI18yRNau/jC5XZxca30dOCalri+wKh+6jMvTL5dmy/zYNzhJPXWa9IWcOZOHqre4JQEQWyjpfF88Q0nIizhRMK408WOz4gLQjWWZDTeGwm00VJajnbF4W7TqnHaEvqKOpzg7Y3kksA55Q5z4pFCZihkKr3fFcOv/lXguBAkDJNppUBgVkT7WBo/VZKaNKnw+E9RMomwF5Kdx1YDFYs8DWMtBm2FTZ7/wUQsIi3"},{default:a(()=>[B,L]),_:1}),t(e,{id:"code-demo-143",type:"normal",code:"eJytUstuwyAQ/BVkKcpDduyQ+EIfX+ILMRsbBQMCnESN8u8Fm9StKrU5hAMwO7Oj0WqvSes6kZAEvTJ+QrWg1r7Nz4bq+XslUTg/CHqCzDrDNUx87gV34J87TtKktjZYV3IdHK+jpgXetI7gwkD3UslbJfPVN99VHuQTjl1aWe64kgTRvVWid+B7A+GUJmUxi0jAwRE0YWeotAdlOjL8BHWwyDydhmsZRWfOXEsQLgp9iaWvkFNprwwDkxnKeG/JuhzSDwStj41RvWQkTiEewSVQkzWhBaRbbLYlgyZFDEBrLo8Il7N0jKip8YpQWCIfTV9Qkf5thvETzbabR8z+Mdk94vFrZpnlH0DQLsQM17gSfn1unyp4zMc="},{default:a(()=>[T,P]),_:1}),t(e,{id:"code-demo-147",type:"normal",code:"eJytUsluwjAQ/RUrVQVICU0CQcVdvoSLEw+JVWNbY1NQEf9eOwtbDr3Uh0neMuOX2KeocTsZ0Yi8c/FNKsms/ZgckJnJ50aRsG4FhqgPiXUoDFwMhAzOF28dWP8YcBRHlbVhk42ah9mnztOAqBtH8xRh97ZRZ6/ebtC7jLbCCa0oYaXVcu/Ae4PgtKFF+twjCVtHyRU7ZMpuNe5o+yaZg2ni5TiUWW86CO4aSvI0NceeuoS6UqVGDpgg42Jv6bxo07YCq75q1HvF6eVftEsKBQyTOrSActNlwaGOydM6LxmryLIwx7hLaBh6Q8vMVktzJKHE/zAtviXWWbA8QQZlyR9Qthj1t9TsjxTJQ4x88ThmzKxePTM03IEsC+a7EGOmuOsIaDjI60kklZYaaf91Y9mKH6Aky31zV7ub52/p+ReSXPOM"},{default:a(()=>[$,nn]),_:1}),en,t(e,{id:"code-demo-154",type:"normal",code:"eJyFkU1uwyAQha+CXFVJJJNaqbIo/TlJNhgGGwWDNeAmbZS7F2xcuc0iLLDnvc+eN3Ap2tCZghXkTepPIgz3/n11Qt6vPg6WpLU0hDMO1WCoD6h7+GXSmvGnyM96fMx1URbC+9TpYLepwWViWtBNG9iuQuheD/Ya3X9dSCZ753XQzjLCa+/MECDyyQiuZ2RfPebSgArLOiC3Xjns2PRqeIA1jX5J0r7J2EnL0DLyXFX9OUs5G9kttADnQLnRTcwhwAbAbIypGXlQSmVFORuo198w/mGOUzuUgBS51INnZLsf5x4dLo4NusFKtjjXNJG2wJE26ZvYcm10Bw0C2HKaqOcY5U15A75UEpqS+ONXbQa4R9OMC4fc/IVvEtLaQNw7J+N0XqQw0+3Fm77+AK8wvsY="},{default:a(()=>[tn,an]),_:1}),rn,on,t(e,{id:"code-demo-164",type:"normal",code:"eJytVN1umzAUfhWLKmqQIHOoUmXej6Zd7AF2zY2BA1gBG9nOkrXqu++YGELCqlZRnYDt8/995yTPQW3bJmAB+VqIPyRvuDHf7g+ad/ffU0ncmirMXo5ytwaTT2gzyHEb7kEU5Ma46KlcuaDPJ5saRFVbllAN7ZdUvqAWI3tlp4ywQklGeGZUs7eAJk5hVcfIhi78tYHSTu8HUdgaY9Lu6CVDmsezyGouTal0y07HhltYxhgkIu4derOM57tKq70s2B39+WuQKl2AjjUvxN6wTR/U184ywKjgIeRKWpCWpUEaeN9XUZ3KJttZ2VPRNdYrKt6L6rL+0X2CVlcZXyabTUSSh21EHvFZn92Psal5oQ6M0P6zRg7I6OIeGtFVEkaj8q4sS+/+FAtZwJHFazrhjZcW9A20vTEMA4frSe8901PRW8QRrawTPdACqoGHCRCH5JLBWLS8Ajb5jeCKD5DthI0bIYHruHIdQKBLBBFd0NdTGBKXfy5fbUOH8H+qkGAtizB6X1pH1ofmnbNgxBMwkiDTvQVOEb77+9xWQwcceyWVP85NzmOQIwDQfosur96PS+xBb40D9rtvIKY35EQDEbIUUvSDhEP4Ywd/S81bMGS09uNIF/5w86RgfLc57LeE+nwVC7/4n/ryDxebsAo="},{default:a(()=>[sn,pn]),_:1}),ln,dn,t(e,{id:"code-demo-174",type:"normal",code:"eJylVY1umzAQfhWLaEpWhYSfkmZeV02buqdAmhwwwSrYyDZLsqrvvjMYQtuQZCpIxj5/vvvuu7N4dnJdFg520H3K/qCkIEp9m+4kqaYPMUfmGW4oTaQ8uIngmjBOZQ96C0wKUaeH6cP9Eoy9p+ECPt3amTuJUoZEzBcm9nOLySnb5hoHnqTl15i/xHx50zq+WQKynVpsJRTTTHCMyEaJotYUTpgNLSqMIu+TXRY008P1jqU6hxBetbeWLurqaNKScJUJWeJ2WhBNZy44mSMzfrawDUmetlLUPMWT4PFH9Bh1G0KmVLqSpKxWOGr8QjY2A7yh4Jsim4kRl3IgGTux0xGge+0ynhp7EPa8MoC6iv2lOAh6YwGFcW0St8ccElEIiSdhGFrDqGL2LIgEh1t92vm7LNHkV/MMtQ17aY3yt1G/ulLDV1INCrURe1flJBU7POg5eCwHtAJdkeub0QOX1X5+Ghc0ODOOAELIFfkwjOybxkBdnDO4tYGM0/m5Ni8KGzpmHAGsVg3fu0uOvvhN/oYc4NZ9vQhnJWkL3fYbihSiRFFoKFfUGjGeMc6a8g+akmSayjctOejI8/dtPXrfuuYy+r26gsgPTvaY3G7IzJubdxFd7JIru+ydJr/b1jovzfcnesgkKanqlLT6gGc7u8Th7sgBHJqP7119eJAAHD5FqEvjv3kZ10glpKAzb7HuopwpRfCxNGws/4pIfdHbnOF38fIPHhb1pA=="},{default:a(()=>[xn,cn]),_:1}),t(e,{id:"code-demo-178",type:"normal",code:"eJyNVO1umzAUfRWLaEpXhYVAYJnXVduk5Cn444BJrIKNbLOQVn33XYMBr22yWImxr4/vx7kHXryjrkoPe+ghZ39QVhKlfsxPktTzx5QjM9wDpYmUZz8TXBPGqRxBb4FZKZr8HM4fH5ZgHV25G3gMe2/hZUqZLFL+xQR/6TFHyg5HjcNA0up7yl9Tvry3nu+XALVri66FYpoJjhHZK1E2msIdc6BFjVEcfLLbkhba3Z9Yro8QJKhbaxniJpNJS8JVIWSF+2VJNL3zwckCmfmzhe1J9nSQouE5noXb3/E2Hg6EzKn0JclZo3Dc+YV6hhLwnoJzimwphmDKIcvUS70hA9pqn/Hc2MNoTKwAqK/YM8VhOBpLaI5vq1hPRWSiFBLPoiiyhouU2bvAElzuCerX78pEs103XHKjkVtDfRyPuxtJ/Icrp1PPXf0tXgXBCG19dSS5OGFHiTBsVigBqpG/MnMAQep28TEu7HBmvgCIoHq0gunCudEKGuJcwW0MZErH1kE4q0jfCasIFCtEiaJQsi8ajRgvGGddg1zdkEJT+UY1jmiuvxNr6Ez/NiTRwPHQeUf7tv+OZWrEe0EY7RHpH0z7IJu71SbI6WEx222/7aINMs2e7dZJEsVA5w1Nv1k0oxKA2qBrFVrDH4j/FSeD4j8gehVcY/rnEz0XklRUjRcs3RDcrv6X5tcpTfBoHqbyGy87NcJl+MH38vUvGwKyXg=="},{default:a(()=>[gn,hn]),_:1}),bn,un,t(e,{id:"code-demo-188",type:"normal",code:"eJzVl41u2jAQgF/FyjS1lQhLyAI066pJew2kyiQGogYb2WGAqr77fGfnhxAX0NZpRZET39nnu+/sS3jxVuW68BKPPGT5L5IWVKnvNztJNzePM07g11ZImvODnwpe6gcm6zG9424eH75oWW2n3dG3qu8NvFQpcGHGh7DyixmzYvlyVSajQLL1txl/1Vo0S6x+I1Re5oInhM6VKLYl06NAscuzcpWQaLO3AmuJjGtJKTZ6QPDZdgu20Oq47s9p+ryUYsuzhHz6ib9KI2TGpC9plm9Vewrl+Zoad9DLJ2jJcKJIzhc5z0tGCo2MynYoyZwthGRVRMCVce3JzJt51m4qCiG1F1EUWYkz7irMOKjjtChaEht53Teh+18bSTf4aqKkXGlv14l5LGjJbn0NYECgvTsHaC72vlrRTOyMWTKON3vih9AG2sRmPzDyEcqhtQLwloS6sf0x9u28lnwKosbcaWLSQmyzA4kVYVQxP+e+2JZ1fo4SQxclk2/lxZkFBByOuoQbEFWaIILjNLVntbMgl3N6GwyIuYbxWdYX5uoEzZNJ0NuEfjyzw0LSNVMVUItJW64ezzkxaZzQFuEWBpfPboWgZ/e5VAVyvWdgm6iUFuw2GE6rZc5kZPSHwdgFwwuXqzfASfSt0mOXP3akfQiPjQZ35izhaRucKqFAYNPVDSM9EwoMmeCRPdXGeC5dU8Mpnm6HOhxp7b3DsB+F4JRDi2Ujag6Zzc0ovpCI8Q7DdqyATKAauZncO7TIBCpgD2qLBIpBjxaJ9CobJBOHFpGAwx0k44+BpG/7VUT+KpBOvbgEiGsFBDLtd9zwcO59BNI3tTk3LtKIxJUjg8R1qBAJvEo7SMJ/iMTl+X9FZHJ9IXGtgESc+8Aw6QtMA0MkzgKJSFzAEElfkiAPSMRVg8wXGYTUQXJ9IXkvJFD43wOJ+S51EDnZI90PgQvevy7mBoizzH2QN7C+9D++19973Njp"},{default:a(()=>[fn,mn]),_:1}),wn,vn,t(e,{id:"code-demo-198",type:"normal",code:"eJzFVO1O2zAUfRUrqOqGCE1bpWwuQxM/eIr8cZKb1sKxI9tdGYh333XspFmoSuEPVZX449yPc85VXqKtrUVEI3Jb8j+kEMyYX9O9Zs30LpPE/YYXuQZ4hrhQ0jIuQfeg48Dp3e0MD/tMww2+un10FRXGuCYyee1qv3jMFvhma+ki0VCvM/maydmlT3w5Q+S4mRDVKMMtV5ISlhsldhYw1l1Y1VCSJpO1gMr6lb/Y89JusUzSPK27miu3CXGaSVMpXVO/FMzCtxjDr4h7fu9g8GRjJvhG0gKkBR3OK+wvNvwZXIWuZKGE0vSiqqpwkLPicaPVTpb0Iknu7x8eugulS9CxZiXfGZq2XaESb9hTVmHNoIE7xR5oFmVRyNPLckSV9EfXVyvNQZkzqXsBV71iQcSbg4ZDep70gcPYt2O2LfuWxua91yLRyrqjeQmbrt+gaa6sVTV1VhMsyUsyNMRjvCA9oC3RMI3ijvxpGZ8CMslr5gdzz2VZcyHIfGEIlxWX3AIRaCPrpqanFStMzSWacp1OyGoxGgCaA6LO0vDGDY+XL05/9tYcmZX/OJ2Up52e99UJSp9CHnwMhsXLJFg2YDsc8rPJzs/g2kK/iuqQ6e9H+FtpVoPpxyTwTSZh8ZGx7zK7GMzuXnP8DH0i03I1yoV//Ha//gO5QQkI"},{default:a(()=>[yn,Fn]),_:1}),kn,zn,t(e,{id:"code-demo-208",type:"normal",code:"eJylVYtu2jAU/ZWrVBOsIuA8gayrNuj4ikiTSQxYDTayzWhV9d9nJ04Ijw5YA7qxnZN7z7kP5c1ZqXXhJA485PQPZAWW8ntnJ/Cm85gyMFf7gcCUzfnOzThTeklEg/oA2Xl8GOjTxld7o2/13uk5mZSGRsr6JvpbhVkRulypxEeCrL+l7D1lg3vr+X6goSd87HsbLqminCWA55IXW0X02+aB4psEIvTFbguyUO39juZqpcOhzYs9qRnE+yMlMJMLLtZJtSywIl1XO+mBsV8tbI6z56XgW5Ynd7PgyYvj+gEXORGuwDndyiQq/WpltZhjCbcpuJKclQWejl6JLpcHRJI50Y6I5WNSTJhKUid1rJOLFG8lB4IrcxRGOVkeUx2aCliu5fpcNsEztQNkfg3gxZUrnGtBrV7V190sDIMgBtfXb5QGmST0jlGz8QghcEODMgZBcA71axJMwI0NyhgEurLHqNFkGoQ/wR0ZlDEIhqcohCbTpxBcz0ipLILxKc73xvEs0IhSQGm1gjMSxlN/ONESvFJDaTVQq7ApwoyucTUvtvYQSSBYEpcyl28VULagjJYVbncIXqhm5uoGgXMdcnYOW1U87pSmP6vx2M8meH6r9vsRA7Gc4y7qQfXvR80YHvbHzZPSyk1W8G3++rtqpn9n6MczeV0IvCayyahNk3ZdLy+yiPYjEaDWSOgA5qZ7/XpfH42X9nXI91Dlf7A2kWSGC9JF/VEd5kK5/M9KqwJ6V4ZruqNSrz9A738BLGsQxw=="},{default:a(()=>[Sn,An]),_:1}),Cn,Jn,t(e,{id:"code-demo-218",type:"normal",code:"eJyVVu1u4jAQfBUr1Ym2IiUfBNq0V92ve4pIJ0MMWAU7ss1BVfXdu44dk0LiUEskcbKenV17RnwEG7XbBnmAXkr6Hy23WMrfo4PA1ei1YEiP9gepsBDv4ZIzhSkjwgV1B45eXybw0iG1J3Br5sE4WEqpSRTsQef+MDEbQtcblSeRILvngn0WbHJvgO8nEHlOxq6quKSKcpYjvJB8u1cE1uoPilc5yqJfdrolK9WeH2ipNpAsqo72TZN/dnqlBGZyxcUuN49brMhtCCBjpK93NmyBl29rwfeszG8SGGnafOCiJCIUuKR7mWc1LtRlazmvoKuAFAgb6lNH/UpWth40hbSm2vqxk5nDXvBjKDe45Ie8tdcwbv7WA4XJrDqi+RwuEQrj6jj+HifWC3ybZNm4+UUP8R0KU70qe/rhquQRFjz2rnKcUmgtSmDf/HEx1I9iveVXpZ8CEtKnoQcu1XApsLsKrU4+1US9HGc1x+RnjUp1/JNu8TD2/FpQXTmK9Q54QesuXNsEc3qyUxfsscOM7rCRsdHGP31DmUQESxJSFvK9QpStKKO1QE4qyhcEtECsmLQ9EKbyIigCi+3VV+L0dW4N9Tl5tiIykwuJtFRRl3QpUMGVUWdJ1s4uvmmvlfiiC/4G/Hkj7yuBd0Q24bYJgNg8dtOJoxYdQOoCq3fgBNjC6/WIoX3vd43mQA0axSlwwBt8XuR3iwEJd/mHY9VnGR7p9piIgxzwDY9+/U7iEgyYx0CCDjtxyAMOMtAUT0/6bMQcZfiL8fkFuwVZdA=="},{default:a(()=>[En,Qn]),_:1}),In,Dn,t(e,{id:"code-demo-228",type:"normal",code:"eJydVY1u2jAQfpVTpgmQCMsPdMjdqj0IUmUSQ6wGO7LNgKG++86J3QRIxiiKTHy/3919B+egMLsyIAH8yPlvyEqq9c/RQdFq9LISYD9dhSn2ImcqzKQwlAumRi89ahR+Q6k7XRj88vdgGmRa26QrMbO5zo1Nwfi2MCSNFNs9r8Q7am8SgrOtpOaGS0GArrUs94ahh1UYWRFYRF/dtWQb070feG4KAkkUVUcncmkheWplRlGhN1LtSPNaUsPGIYaZgj0nzmxNs7etkoiRwJf5fO7FUlnQiuZ8rzF7HbZTji8ik6VU6JmmqfMcLMuDXLQYXSkdSV37/Kr29ON+gTZJkgdrvSqqDSuPoS5oLg/Ezdp9bA54wuohjO0ZYbzqOO0xSmoje/ZpU6wQYjz6lHZo4MMPGS2tvoXggFPBd7TpdlbKfX6ChQZGNQu5COXeABcbLng9g870yJpht1g7RGGYwEavglVwb4z1hDo8a0bUEbguN3JbGrrzvBlMRRUmuhpHQ4vlfcs6ddoanlhZysPtDJ0Cwu92JmnSsxNKGsuRNMrZ1tPjQxtKxMQFyRABUh0p1NNwbdDy9Or3IdGgDav0OJ4CE/mk7fxV6+nGxvx05+PkpvXzm98BS6bLFeu6dZdIbdd0HE2heWaLu6vyB5mVsyMJ48d274apr82w/k3YX2/stFF0x7Tnt2scRvav90DY3fMoMGRfVI/l4eDRBHRGSzaOZkuf406Lk0Esl4xyABAKnC8wXFIXZEUzbk4kfrYRa/hDLmE6H/KJbcl9PoNZYkzzf1mi2gcf/N98/wsAYmBP"},{default:a(()=>[Vn,Gn]),_:1}),Zn,_n,t(e,{id:"code-demo-238",type:"normal",code:"eJztmItumzAUQH/FYpraVSHlUZKUbdU07TMiVQ6YBJXYEXaWdFX/fX4CgZDgtdI6rShywfb1fZzrC+6Ts2Lrwokd8CXNf4KkgJR+vdiVcHNxN8dAXM0Bisnu0U0IZjDHqLy46wzyrmvep9sjSyQF2abVtD4d9yVX0JhkbpyRk1Aq7J3jsTDzSa2wQvlyxeLQK9H68xw/z/H1lVjo6prPa1kNtMyG0JzlBMcALigptgxxSTHAyCYGkfdRPxYoY83nXZ6yVQwCz9vsdZdWD4JJ3cdKiGlGynWsbgvI0KXLlxkB0X4y09CeubDIl9yOBGGGSj2QcXtdmv9CUpVRnpCClDH4kGWZ7lnA5GFZki1OeffEm/6YfTcjpExR6ZYwzbeUeyBN46FRATkbBu3nTcfLuudQQx0iGcGwN4IHJjc8adlbzYc4X0NlY50dIKAgx1mOc4ZAwcFCEbnKvXiBePCR8VLQ59GNwdyZO61YhmGoe3pjYVyPar46PI0e7XX1rNx2b+qeA8cRqhJuWKr0xmdB9i5dwZTsYr2h9CV0gAkHD1xftB5fb7MfHZkUyEmiPTYqnAI+b44NipwHZvm+STMxXpvQBavqAogoQJAiN8cu2bIK8AFZmPFdcgrs6Z3tB21EdSQNZ+HOIeemVBNjuVzAS28E1G8cnYU1EHYnNPeK8OkIfXtAj1kJ14iagOow8ZXN7TkjprURfEXxx+f1Z6h0wwUufcwk44i9ZWJtQBNYoEtvPDNqzhAJXuiMVugPVFclQMf7RunS6g8N6d3F4pJagiga8Z1qGu+T2m9ye7Y23QkZUY9kM1BkPOF6RJkD0255OCUUyT1vqcifyVJjJ+UHXOjWzjo39EUc7IRkIQzr4qBzKoheRlJ5LrnY2SNZigJszfLWTkiyFG+S4XmmUYq6OVxIkrSRqVFO7YQkysb3mkE5eUfZg9KiZhiSfxFk673yApCW9kiQM6tYKY62VU+CtFBU11fLNJMoLdNZobSsyRKl+FRsofT/NZSWwfpvSE5f7UVpaY8kabvBFEuLEHP+EqXtp4hEaclforTIZ5GbkqTlG1md/UTMWyhf7UX5plGKj703i/LIef0syc6ebB+I/vwcYplZCqTtJ8L7SaTvJMJ//D+kz78BggFTCg=="},{default:a(()=>[Un,Rn]),_:1}),Wn,Yn,t(e,{id:"code-demo-248",type:"normal",code:"eJzllN9OwyAUxl+F1JhNI127OlPxz4XRt+gNpdQSGacBdBrju3tYWd1MdLvwzl4QOHx8nPM7pO9J55c6YQm5btQLEZo7dzNZWd5PbitDwre90aoXSZ3ndnJ7PcN40GwmyVkinAtWlUmDw/tg0En12HmWZ1YuryrzUZnZabA4naFuNIziHpzyCgwjvHagn73EI2HDQ89IsTiOS7v2JItsE/CWG9eCXbJhqrmXU4r7ZySMJ8QJruW0PIn6lWp8x0gWlzHJcd0o12v+xkitQTzFYA22kZZq2aKySLPz/pVgkqoZruy5lcbvamOeRTo/QFyD94AF5NmoPbos7+8eiqijK1k/KU9bpb20jDQWeuo63sBqmuOZdIFDmBwJITaVimfrAMU9KIOnhhZ8gWe1RGwy8heAGoMZV0mVRIPfe1KmF3hrjAxoaJmW8zG2h7QAHbLbLXQ//ny+LvYw/IeJN/gv06z8oQHjK6OA1gqRIAMi0GoN9ttDtODDKywuGvkYurHLnbd46E+x51+Rfw+dblPHn9PHJzMvk30="},{default:a(()=>[On,jn]),_:1}),Nn,qn,t(e,{id:"code-demo-258",type:"normal",code:"eJylUktuwyAQvQpyVOUjOyaRsihNI1W9QpfeTAy2UTEgII2lKHcvFBon6iKVwsKez3uPYWZOWed6kZEMbSn/QrUAa1+nRwN6uqskCuc68QH8vePT3bb0wQD4NbI8q631OuWiBu2Ay7eeGV7DoqzkMuidolzHeNs5ssKG9S+VPFeyXETVH2Q0E1Yryx1XkiDYWyUOjnlGSDilCdrgp+QK1rhr/8ip6whaY6yHFErX3sScAWkbZXoSTQGOzQovk6PwnSfYXg2F7YCqI8EIo7Ue0IRSeskaykxhgPKDJWMNe6g/W6MOkha8h5aR1M10Ah5E0YY/k242wRij1Xq50UMeq9FgfCLF5vkdetM0j9I3vjO35BC5Sw2F/48quGRgRuozpqzN48vDWHIUnxHsS/PHNl62ofZkZuKlyfbzGp2/CT+3uGt+Uc/fclXmiA=="},{default:a(()=>[Mn,Kn]),_:1}),Xn,Hn,t(e,{id:"code-demo-268",type:"normal",code:"eJy9VEtu2zAQvQphI7AdUDb9UY2yaYDssm+X3lDSSCJKkQJJx26CLHuHnq8n6VCmXLlN2yyKypDA+fC9IWeen0a1b9SIj8hNIR9IroRz7ycHK9rJ7U6T8AwDuWi9kPquAStzMbm9WWAwJPaLER3lziHe4voy93qx0/OA+3SCrUFWtedLZqF5t9PPGL3cEPNa46SXRnMiMmfU3gNmh4A3LScpu4qmgtIP7YMsfM3JirH2GF2R8sLnrdCuNLbhp6USHqYJwlASvrOYlon8U2XNXhc83kp8lNQgbFJZUUjQfrpJC6gosVUmpqs0pf3LZmSdIuivgflmFsp+ec+b9GpG/8yY/H9Kb4gNVxkBGO1+Q7romq+GROe811FkxnvT/EOOgC3UDw5QSrYOiPAkRxssJWPG1uuM4Ygg4DgHxlbLS6PjHwPAYJV2q5iAxnlqjC3AJoFv74bDmZlj4mpRmAMnjKzbI37HYsXeLreUkQ3aq/gG/BflwXkGOLcQZZIbPIDG4Z58+/plEmnO2vmddH4WzSvV0AhbSZ10uxOs/lJyaVBX1Fq3PkVLrDApRSPVZ06cbNxe04+iNo2g96AewOOh6J3FDtEPsrkHSR1WkDg8bdlrHIck6VW82Z6hHxOpCzhysvzbxXdFOPkI6EzP+3OjjOVkXJY9k4ejT4SSlean0Rj6+86F/iz7Pm2321Of8D/w+TulFYoT"},{default:a(()=>[Bn,Ln]),_:1}),Tn,Pn,t(e,{id:"code-demo-278",type:"normal",code:"eJzFVW2P4iAQ/itEc9FN2j3si5p6d7/EL7TFSq5CQ/E02ex/vxlKXdrYdT+YbE2p8MwMA8888DY7mlM9y2bkVyn+kaJmbft7cdGsWfzZS4KPD+RnY5S8QfbpzX6CXQ/Ap+/PglnRtjjDXr5i4LfO5shFdTRZRDU/7fbyHdAuusMb1QojlMwIy1tVnw0HKwSMajKS0h+uW/OD8ftGM9kelD5l3d+aGb4MAQ8Iti/O7CJKc8zIakubqxtyGQ3Gclb8rbQ6yzIj8+2m4DzvEaVLrkPNSnFu/QRydQ3bIyvVJfO3iRAhW24IJWlzta+LF9y3Wm2cma5ytozSNOhf+rp5mXAKY3DA945TPOm0gvUS21g3GtjfZw6Yl3WYJ2keczoypASTvxdxwHSW5RyY4o7xQknDJRCwWLitvNXAVAmMye9Zxal3Nz7p+sbnielKyLDzC1NYx84N2ZjdyJj6UJxYxUdsIvGsDiv8QtbLQuii5oQZEm+RBGgCMo/j2O5D0BVjwzTY2pHx5k7H2yCh2Dwpns3vifFsfo/X+1g3FrA8rCAiMC7KYf2sR0FyBWUEQh+ZD+vec3ogzAgLNvqienDRnRCw1sPkoXpQN2hlZWH1P6EdzODzMwJOhz7IxAlhF+0rjR0M108XWurrzHbuySz6ENVAbBHs4dfEVgvJmf4oPqOIxkmHZRancMjPKTxb6jrJehvlCUnw+O+RxEfsxdAjqY+sfWSNiD8XDIwJvpNkV6Dfm+Uj3XkXplYGb8skLXnlCggu8Pf/tZZGrw=="},{default:a(()=>[$n,ne]),_:1}),ee,te,t(e,{id:"code-demo-288",type:"normal",code:"eJydVOFumzAQfpUTaGorwUbAZI2zTWqi8RT548QGrIKNbKepVPXdew4kTajUtLEE9vnuPj5/5+MlqF3bBDSAP1w+waZh1v692RnW3fxbKfDj1LGsjW7F0bUfh7BfGHdw4HSwgyjYWOu/sFI/PfBLH1MLWdWOpokR7XylXtHbow/+TlvppFYU2NrqZusERnmH0x2FPPkxb0Tp+lXv2EnuagqT+6R7ng/wgzVkGqZsqU1L+2XDnLiNESAC/74bwtb6ObY143pHE8BsIPiEs9ksQhNSb3DOQSor3DHFcGFiw7jcWvpOac02j5XRW8Vj2bJK0FPhAHw8a+LKz0K525AUD8siB2QUppPZtMggvUd2e7YdMxjjN+6iCzBlWUKWjRJxY5zYSCWYeU9EFbioorAo/i+yBWRkDEEuQkx7BLJ8KPLkKhJYsYHE73y68FpAWBCSZVPIvHEGh1W7dKZJenYoMsbAjYsYw6kOulxB40wWko855N8V9goKRyF6Mff3/hTCt8BXa/NJPT5e/WMrY//0rY6/hdc3wQZIng=="},{default:a(()=>[ae,re]),_:1}),oe,se,t(e,{id:"code-demo-298",type:"normal",code:"eJy1U+1ugyAUfZUbm6WaaIdfq6HbXmEv4B9UVDIFA3Rt0vTdB/VjLkv2q0VBuOd64JwbLk6r+87BDrxW7AvKjij1tj1JMmzfcw62rYGPgUqyILc2Zz2btBkwn3nt+E6plN0g5zvLexlzWsqaVuMISdofcn416I18ggehmGaCYyCFEt1RU5NkAS0GDCl6OnS01uNsBE6s0i2GcI+G82FihwjZ1fSnJFzVQvZ4nHZEUzcwBD7Y0ZvSCiErKgNJKnZU+Ie/EOdAtaQSJ4wgGs6QmL6J43jGSfnZSHHkVcB60lC8NgmgY5wSGTSWl3LtyqZwozTxIYxTO2Qe2JPcwnHoQxTZ7lmBYzSMMh+QeT3I0jmWGYLYh8SDEI0SFiMxqTWVk52l4NrsinMnd6bz/uvwYvAff1/W9obZ/exd7MObuq5/KSmo4aV3l7I3VVxJSR8gxRSJuMi3zy6ZymPuxPUbrpUIkg=="},{default:a(()=>[ie,pe]),_:1}),le,de,t(e,{id:"code-demo-308",type:"normal",code:"eJyFk9tOwzAMhl/FKkKAtEDXMmmEww3ignfoTdambUSbVEnGkBDvjt2m7U7SerEktvPb/pz9RrVvm4hH8FKob8gb4dzrzc6K7uYt00DfvuPzYzL33xjygDGjA5fxHC2i3DlSz/Q9if4OMbVUVe15ElvZPmf6D72fH8HXGae8MpqD2DjTbL3ECHJ403FYxdfh2MjS7593qvA1SsbdT7BMWWaTt0K70tiWD9tGeHnLUGQB9HsXwjbGFtIyKwq1dXzOsRH5V2XNVhdMtaKSfJ8FAMWLhlW0Su1vr8qyhHSN4n2yTli0kuFuceFi/PQOVFS/WcZDZSMovpHYggy8cqM93uGQRVl0yGK9OmaxTJLJNDfDtdEj5cPWKXVwTHM5M5Y0nVT7sbDHOXMrbKXw1tabKcUPc7UozO6In9JOeohhiUXSgqpACPIjXCxFeWDrPorRnkifjtga3883XRWyIoKBnyi9tHCRH9Zx8pggmTvbA9hXeQzq7ANez5LDC47DyQ764zFgg/Pc8N1j1wkBQgKEiwj0DeK/7u8f3XUjyQ=="},{default:a(()=>[xe,ce]),_:1}),ge,he,t(e,{id:"code-demo-318",type:"normal",code:"eJzlVW1vmzAQ/isWUdVEgg5IUBtn26clvyJfnGDAGrGR7TRRq/733fHqwFZ10qRNGsj47HvuufPZZ169wp5Kj3rkcyqeybFkxny5v2hW3X/dS4KPqzAsY1r0qvrpYJ8A1ymg68ae7x2NQQ97+YDErw2m4CIvLI1DzU+bvXwDbcPe6itlhBVKUsIORpVnywGFCqsqSpLwblPyzDZSo7iI1BZAGFbXzUCPo9ZQM2kypU+0EUtm+TwAe5/gd9HCDkqnXAeapeJs6EDfzNOkuhKIR6Rktn3Ct1dfA1OwVF2omx1CgggsltCwj6HN1uu1/wEMEdJw29Gz4/dcq7NMA3FiOR85wWhZGeTYc2nn9QIrpkEmS1jhLMsyR1jBmm8gq7vFKKRSSM70wKjzA5vHSeJ37eFpQaIQs+cy4cx/TzWLvm2Xux1B21m0S+LtrrGbbqYRL7w+xNj8GE4r7r8jYA+DQahDws+UTPOKM0ulaqUpoq+qI8TJNWk6n0SPeK7bkSO2sFrdDVAMSQjkbtlSeuBQXLwt36MCrLR07+29Noz3KzrCQh2X9G0t1pAbxUFZq06gwHQ1VTndxvWosmsnyNVaOLs7cltfIe8i+zslUIAWfV7XQ6gvgZApv9IgmtxD42sITgjRyuLEKkx5joG7GWYZcP8zCQ7h/dvJ/VAu4/gnySzUM9zmt4e25mhS2BOTyPyOr8dfu3J37w94ihPHFfxn334AhFVowA=="},{default:a(()=>[be,ue]),_:1}),fe,me,t(e,{id:"code-demo-328",type:"normal",code:"eJyNVdtu2zAM/RXCQbG2sFv5kqZWtwEDun5FXpRYToQ5ViA7bbCi/z5Skh2ni5P6Qb6QPOQ5lOj3YN1uqoAH8L1Qr7CsRNP8+PZmxPbbz3kNdA0NpTKy1PveZq/O7x4dOwPeuvcgDJZNQynm9R0hvzuftVSrdcsTZuTmaV5/zOv7W49/e4+u/tl7b3WjWqVrDmLR6GrXSowhQ6u3HKbs6qmSZeuenOFNFe2aQ8LYdv/UJ6MXH2hE3ZTabLh7rEQrryOMD4HWG++20KaQhj9u94B5VQETKbvczhYZUahdww+p9as0ZaXf+FoVhaw7b7H8szJ6Vxd88pI9PjPWw+yjZi0KDGDAIMFUDCZ5njtZOiU4X+DNSK/IUtetrJHyPJgHx5yzh56lJz78NKgDJr+y55ffLyf5QMx6Ruflzw+qdl3oP2yEWSmK27X6WFKID5p+KqPXY7jPAKIYcVEbBlO8m9VCXMcPWQhJkuKS5iHcJTfhcUyMxCF6cIHUxa+FRSlF4Ebo43zPPvklVEmUkgPWRW6Oymk4uzKIqcWn8WKLNyj3NF6aoiklARmqQjEjfgQUz7wfBY3QsOV18o7ToIoiTyIfRRtmHQdLMuLgwSyFM6VRF/FojCuSEYInkI6jRVbfqavtTFtt0oQEYw56RBAL93ipXb79s0u76YvVZVRXFLv2T89IR/ssSqlRnV9/0I4GiyhbaS7PlcOp7sYKJjgxVSpVS2GiFQ0ShLrOWSFXoa8RZtMrCCdpmmLzr6Cfs3181Ki/krsm0vKlETSYOG4EzVCjyyPIjp/j6ee52jPqNyZ179hpqSuN4V5OmJRl2b/Yv8lWGGT+/0ADVTeytafCzjF7PFAL1xH8W378AyueChI="},{default:a(()=>[we,ve]),_:1}),ye,Fe,t(e,{id:"code-demo-338",type:"normal",code:"eJx1UutOMyEQfRWyzZd+mmLpRW3wkqi1L+Df/qHA7hIpswHWbmx8d2dvddVIwrIz53CAM3NM8ri3CU9ulXkj0ooQ7sYHL4rx/dYRHMN8gAzK8f3tFHMI92sySWQIqDE9D1Ai5Xy6dRe1yDHXJssjnzGv9x+YbBSOrXIBwUQDjhOxC2DLqG9aIELBySX714VWp3EYH4yKOSdzxorqpjugDbrtXriQgt/z9teKqP9T3D8h9feso+3AK+35qqgInm4UGaVpesIqGnKh4IDnIGGGs17rOZJSfpOgXihTBv51Q3jTPrW4OTdKadezhXzNPJRO8dFy/cCe1wicTOF8p/HSujNHgovaRb5NXrZJJ/CnYdY4TTsnyGx1+WUFOsmGNvaBb7h9tIMYYX8KJVjwfGBHipehh1b/ivW0JhvMu+aL+cB9XUUqrMkcl/gA7Yf5ztM2048FmsoIKpDRYnG9eVpOvuMU39PADeVp/bzcsB+UGqkL2YqsrjePm1/N4CHWjTBXOutb4J0ap3TF6ax/0+/KYYGwwz8+AQ5u+FQ="},{default:a(()=>[ke,ze]),_:1}),Se,Ae,t(e,{id:"code-demo-348",type:"normal",code:"eJytk99ugjAUxl+lYVnmjEzEaZa6LYsXu9sbcFOglcbSkrYo0/juK1CETUmmGxfk9Pz5+p1fYO8kOmUOdJ5jugERQ0q93G0lyu5euxlCmcbSTWlh8mNTsO+AB9wZOZFSRmI8bNuG44A/lDr7gAPzJJiuEg0nnsTpIuAHU22bbU8mFNVUcAhQqATLNTadZUGLDIKZd7tgmOg6sgWJuCJCprAOGdJ44Jr6CJTve9u2pbFOIJh6XlYsrBPgV6e6wd3icE21W1uCkeBGTumB7zUSIYrWKylyHsMbQsjJChCG2BjBdpVSAXMNAydwrELvdrW7id/aaWB1UqGQsblJopjmqouga2w6nXaIPbbTFbf2uHMpj3EB/fPrhyyXg3lWHHcXhavojvIVtDZMxtYQpymq1qqHl4ixD7HBYOIpgJHCrsg1oJxQTo8bN/ddPPyTOSImvBr50wnxTuZ3wN9nk+Wsw3zeCshK8WrofWz8P5Htn67gBvxtjT+JRClW4PukpWw42Oj4XXV/JKNRyzRG/kmuT8Y/q1Ojv8rXpYLO4Qu8Q7hB"},{default:a(()=>[Ce,Je]),_:1}),Ee])}const Ge=s(d,[["render",Qe],["__file","css-hacks.html.vue"]]),Ze=JSON.parse(`{"path":"/frontend/basic-css/css-hacks.html","title":"CSS3 奇思妙想","lang":"zh-CN","frontmatter":{"description":"CSS3 奇思妙想 前几天看了一篇文章 ， 颠覆了我对 CSS 认识，心中无数次蹦出一个念头：'卧槽，卧槽，还能特么这么用，这特么太叼了' ... 于是我迫不及待想跟你们一起分享分享，以后你也可以在别人面前炫（装）耀（逼）了~ ps：本文原创不是我，我只是搬运工，看到好东西与大家分享而已，作者 github 主页请戳 这里~ 装逼指南 本文中，所有的图...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/css-hacks.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"CSS3 奇思妙想"}],["meta",{"property":"og:description","content":"CSS3 奇思妙想 前几天看了一篇文章 ， 颠覆了我对 CSS 认识，心中无数次蹦出一个念头：'卧槽，卧槽，还能特么这么用，这特么太叼了' ... 于是我迫不及待想跟你们一起分享分享，以后你也可以在别人面前炫（装）耀（逼）了~ ps：本文原创不是我，我只是搬运工，看到好东西与大家分享而已，作者 github 主页请戳 这里~ 装逼指南 本文中，所有的图..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://user-gold-cdn.xitu.io/2017/12/29/160a05b024f6d86e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-18T22:16:27.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-18T22:16:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CSS3 奇思妙想\\",\\"image\\":[\\"https://user-gold-cdn.xitu.io/2017/12/29/160a05b024f6d86e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1\\"],\\"dateModified\\":\\"2022-07-18T22:16:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"装逼指南","slug":"装逼指南","link":"#装逼指南","children":[]},{"level":2,"title":"装逼技巧","slug":"装逼技巧","link":"#装逼技巧","children":[]},{"level":2,"title":"装逼实战","slug":"装逼实战","link":"#装逼实战","children":[]},{"level":2,"title":"爱心","slug":"爱心","link":"#爱心","children":[]},{"level":2,"title":"气泡悬浮框","slug":"气泡悬浮框","link":"#气泡悬浮框","children":[]},{"level":2,"title":"切角","slug":"切角","link":"#切角","children":[]},{"level":2,"title":"弧形切角","slug":"弧形切角","link":"#弧形切角","children":[]},{"level":2,"title":"梯形","slug":"梯形","link":"#梯形","children":[]},{"level":2,"title":"饼图","slug":"饼图","link":"#饼图","children":[]},{"level":2,"title":"平行四边形","slug":"平行四边形","link":"#平行四边形","children":[]},{"level":2,"title":"折角","slug":"折角","link":"#折角","children":[]},{"level":2,"title":"纯 CSS 方案实现背景变暗效果（hover按钮触发）","slug":"纯-css-方案实现背景变暗效果-hover按钮触发","link":"#纯-css-方案实现背景变暗效果-hover按钮触发","children":[]},{"level":2,"title":"条纹背景图","slug":"条纹背景图","link":"#条纹背景图","children":[]},{"level":2,"title":"混合模式背景图","slug":"混合模式背景图","link":"#混合模式背景图","children":[]},{"level":2,"title":"太阳","slug":"太阳","link":"#太阳","children":[]},{"level":2,"title":"多云","slug":"多云","link":"#多云","children":[]},{"level":2,"title":"雨","slug":"雨","link":"#雨","children":[]},{"level":2,"title":"微风","slug":"微风","link":"#微风","children":[]},{"level":2,"title":"彩虹","slug":"彩虹","link":"#彩虹","children":[]},{"level":2,"title":"夜空","slug":"夜空","link":"#夜空","children":[]},{"level":2,"title":"雷电","slug":"雷电","link":"#雷电","children":[]},{"level":2,"title":"大雪","slug":"大雪","link":"#大雪","children":[]},{"level":2,"title":"五角星","slug":"五角星","link":"#五角星","children":[]},{"level":2,"title":"太极八卦","slug":"太极八卦","link":"#太极八卦","children":[]},{"level":2,"title":"美队盾牌","slug":"美队盾牌","link":"#美队盾牌","children":[]},{"level":2,"title":"纽扣","slug":"纽扣","link":"#纽扣","children":[]},{"level":2,"title":"Chrome","slug":"chrome","link":"#chrome","children":[]},{"level":2,"title":"Opera","slug":"opera","link":"#opera","children":[]},{"level":2,"title":"IE","slug":"ie","link":"#ie","children":[]},{"level":2,"title":"safari","slug":"safari","link":"#safari","children":[]},{"level":2,"title":"firefox","slug":"firefox","link":"#firefox","children":[]},{"level":2,"title":"搜狗","slug":"搜狗","link":"#搜狗","children":[]},{"level":2,"title":"利用滤镜实现混合效果","slug":"利用滤镜实现混合效果","link":"#利用滤镜实现混合效果","children":[]},{"level":2,"title":"装逼总结","slug":"装逼总结","link":"#装逼总结","children":[]},{"level":2,"title":"参考文献","slug":"参考文献","link":"#参考文献","children":[]}],"git":{"createdTime":1647928670000,"updatedTime":1658182587000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":21.69,"words":6506},"filePathRelative":"frontend/basic-css/css-hacks.md","localizedDate":"2022年3月22日","autoDesc":true}`);export{Ge as comp,Ze as data};
