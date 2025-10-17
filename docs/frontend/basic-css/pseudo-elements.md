# 伪元素

## [标准伪元素索引](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements#标准伪元素索引)

- [`::after (:after)`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)
- [`::backdrop`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::backdrop) Experimental
- [`::before (:before)`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)
- [`::cue (:cue)`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::cue)
- [`::first-letter (:first-letter)`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter)
- [`::first-line (:first-line)`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line)
- [`::grammar-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::grammar-error) Experimental
- [`::marker`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::marker) Experimental
- [`::placeholder`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::placeholder) Experimental
- [`::selection`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection)
- [`::slotted()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::slotted)
- [`::spelling-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::spelling-error) Experimental

:::normal-demo

```html

<q>一些引用</q>, 他说，<q>比没有好。</q>.

```

```css
q::before {
  content: "«";
  color: blue;
}
q::after {
  content: "»";
  color: red;
}
```

:::
 一个todo

:::normal-demo

```html
 <ul>
  <li>Buy milk</li>
  <li>Take the dog for a walk</li>
  <li>Exercise</li>
  <li>Write code</li>
  <li>Play music</li>
  <li>Relax</li>
</ul>
```

```css
li {
  list-style-type: none;
  position: relative;
  margin: 2px;
  padding: 0.5em 0.5em 0.5em 2em;
  background: lightgrey;
  font-family: sans-serif;
}

li.done {
  background: #CCFF99;
}

li.done::before {
  content: '';
  position: absolute;
  border-color: #009933;
  border-style: solid;
  border-width: 0 0.3em 0.25em 0;
  height: 1em;
  top: 1.3em;
  left: 0.6em;
  margin-top: -1em;
  transform: rotate(45deg);
  width: 0.5em;
}
```

```js
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if( ev.target.tagName === 'LI') {
     ev.target.classList.toggle('done');
  }
}, false);

```

:::

一个按钮

:::normal-demo

```html
<button class='anima'>按钮</button>
```

```css
.anima{
 all:unset;
 background: #e5ac8e;
  color: #fff;
  font-size: 14px;
  border-radius: 0.5em;
  padding: 0 1em;
  position: relative;
  overflow: hidden;
  line-height: 32px;
transition:all 0.3s;
}
.anima:hover{
    cursor:pointer;
}
.anima:after{
   
     content:"";
  position: absolute;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  background: linear-gradient(to bottom, rgba(229, 172, 142, 0), rgba(255,255,255,0.5) 50%, rgba(229, 172, 142, 0));
  transform: rotateZ(60deg) translate(-5em, 7.5em);
} 
.anima:hover::after, .anima:focus::after {
     content:">>";
  animation: sheen 1s forwards;
}
@keyframes sheen {
  100% {
    transform: rotateZ(60deg) translate(1em, -9em);
  }
}
```

:::

非常好的资料
<https://css-tricks.com/animating-the-content-property/>
:::normal-demo

```html
<div class='element'></div>
```

```css
@keyframes changeLetter {
  0% {
    content: "A";
  }
  50% {
    color: white;
  }
  100% {
    content: "B";
  }
}
.element {
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
   height: 100px;
  
}
.element:after {
    animation: changeLetter 3s linear infinite alternate;
    display: block;
    content: "A";
    font-size: 80px;
  }
```

:::

hover效果

:::normal-demo

```html
<button class='hover-1'>按钮</button>
```

```css
.hover-1 {
    cursor:pointer;
    padding:1rem 2rem;
  background: linear-gradient(#1095c1 0 0) var(--p, 0) / var(--p, 0) no-repeat;
  transition: 0.4s, background-position 0s;
}
.hover-1:hover {
  --p: 100%;
  color: #fff;
  border-radius:1rem;
}
.hover-1::before{
     opacity:0;
      transition: opacity 0.5s ease;
     content: "";
}
 
 .hover-1:hover::before{
    opacity:1;
    transition: opacity 0.5s ease;
    content:'>>'
 }

```

:::

:::normal-demo

```html
<div id="menu">
 <ul>
  <li><a href="#">Link #1</a></li>
  <li><a href="#">Link #2</a></li>
  <li><a href="#">Link #3</a></li>
  <li><a href="#">Link #4</a></li>
 </ul>
</div>
```

```css
*{
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-family: arial;
    font-size: 16px;
}
a{
    color: #000000;
}
a:hover{
    color: #860000;    
}
#menu{
    margin: 15px auto;
    padding: 20px;
    width: 300px;
    background: #DDDDDD;
    
    border-radius: 5px;
    box-shadow: 0 0 5px #000000;
}
#menu ul{
    list-style: none;
}
#menu ul li{
    position:relative;
}
#menu li:before{
    margin-right: 2rem;
    content: "";
    
    transition: opacity 0.5s ease;
    -webkit-transition: opacity 0.5s ease;
}
#menu li:after{
    content: ">>";
    position:absolute;
    left:0;
    opacity:0;
    
    transition: opacity 0.5s ease;
    -webkit-transition: opacity 0.5s ease;
}
#menu li:hover:after{
    opacity:1;
}
#menu li:hover:before{
    opacity:0;
}
```

:::
