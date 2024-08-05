import{_ as a,r as i,c as r,b as o,w as e,a as n,o as s}from"./app-CbULZrmi.js";const c={},d=n("h1",{id:"transition",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#transition"},[n("span",null,"transition")])],-1),l=n("pre",null,[n("code",{class:"language-css"},`//写法
div {
    transition: <property> <duration> <timing-function> <delay>;
}
`)],-1),p=n("pre",null,[n("code",{class:"language-html"},`<body>
    <p>盒子的多个属性一起动画：width, height, background-color, transform. 将光标悬停在盒子上查看动画。</p>
    <div class="box"></div>
</body>
`)],-1),u=n("pre",null,[n("code",{class:"language-css"},`.box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 100px;
    height: 100px;
    background-color: #0000FF;
    -webkit-transition:width 2s, height 2s,
        background-color 2s, -webkit-transform 2s;
    transition:width 2s, height 2s, background-color 2s, transform 2s;
}
.box:hover {
    background-color: #FFCCCC;
    width:200px;
    height:200px;
    -webkit-transform:rotate(180deg);
    transform:rotate(180deg);
}
`)],-1),m=n("pre",null,[n("code",{class:"language-html"},`<div id='delay1'>使用delay</div>

<div class="sidebar">
  <p><a class="menuButton" href="home">Home</a></p>
  <p><a class="menuButton" href="about">About</a></p>
  <p><a class="menuButton" href="contact">Contact Us</a></p>
  <p><a class="menuButton" href="links">Links</a></p>
</div>
`)],-1),h=n("pre",null,[n("code",{class:"language-css"},`#delay1 {
  position: relative;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
  font-size: 14px;
}

#delay1:hover {
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
  font-size: 36px;
}

.menuButton {
  position: relative;
  transition-property: background-color, color;
  transition-duration: 1s;
  transition-timing-function: ease-out;
  text-align: left;
  background-color: grey;
  left: 5px;
  top: 5px;
  height: 26px;
  color: white;
  border-color: black;
  font-family: sans-serif;
  font-size: 20px;
  text-decoration: none;
  box-shadow: 2px 2px 1px black;
  padding: 2px 4px;
  border: solid 1px black;
}

.menuButton:hover {
  position: relative;
  transition-property: background-color, color;
  transition-duration: 1s;
  transition-timing-function: ease-out;
  background-color:white;
  color:black;
  box-shadow: 2px 2px 1px black;
}

`)],-1);function g(b,f){const t=i("CodeDemo");return s(),r("div",null,[d,l,o(t,{id:"code-demo-4",type:"normal",code:"eJyFUM1Kw0AYfJUlXhSaNu1JYuxFyFPkkmRjszTNht21P5RCLf5gvYh4qkU9KBZR0INY0Lexm3jzFdwmaWnagt9pmW92vplpSy6reZIqaRaGrbLhAzFaUI6uL/nLRTQ44veDyfiJv92E3cfJuPvz/sH7o+jq8/dr0ECQuTngOqjishywTLtaIfjAh7KNPUxygBHTp/uY1PKAv57w47Pw7jTsPfPDIR+OkguTcT+8fYiG54nqd7enFYKZDYjqwPZMSncNycJNQyprBYGJtVZI7Uo5yaZU+M8LAmgnHy1MoENkylqeowKKPQR3MpvYuQqKQTPFIaKBZ7ZUYHnYrqbgjKUoc16SNYst51bBhiJG19O93HCsKmJy3AZiCPtqrAxKdFbe9JmQ1wnGxIzKtFOBpgf+EV6vt6TTMfxpg6qL6w6Z97iaTNf3xGQKKq32switGFcJZiZzNovbCnQqW4sh1q+FN6nzB5mm/JU="},{default:e(()=>[p,u]),_:1}),o(t,{id:"code-demo-8",type:"normal",code:"eJzNUkGO1DAQ/IplDnvZMMywcDDZkYALB67ccnHiTmKt47ZsZ3aG1f6CR/AJxGeQ+AbtmGxgRgjmgvYQOe7q6q6u9h3v42C44KXSO6bV9YUCIw/ri+23L1+/f/o83coVgdvKVnbKaowM4briQSuopa84QYyVblvKB2wAO74ZY0RbcdZ7aCnW4wCU/I6OciW35cr9I1HWOEZivk7nedQGbZRNIr/Nf+xDOK+C0fYmEP99Ohfq7Am/5E0IZOCTbBy7S2UdBh01WsE8RaPewasUjl7aDBTOowMfD4K1JKwI+uNJiho9UVORq3CCpWaCbTLwUEKw9ZXbU+w+beunJNHjDnwW9h8UPH+5KHi6OHq+MbVsbjqPo1VFgwb9JZuOP4tcn4iMetC2K9rRNjkFZICCXlFOhH0spNEdAQbaHDzuKljn4TBBKUewF9N4xEa3XHrQXU/gJg/PslTBbnsd84g1egV+rlkbarM418pBGxo5kPIigNftsaubZ3PbJFpBg/PUFu3cYV+EXiq8pXS3n741fUsvJ5UiPzKcH8osjHqj0eo3wvEKf31Ij2qRJztbbM/3xYK/mTTNzO9/AJPNzV0="},{default:e(()=>[m,h]),_:1})])}const x=a(c,[["render",g],["__file","transition.html.vue"]]),w=JSON.parse('{"path":"/frontend/basic-css/transition.html","title":"transition","lang":"zh-CN","frontmatter":{"description":"transition","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/transition.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"transition"}],["meta",{"property":"og:description","content":"transition"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-18T14:53:49.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-18T14:53:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"transition\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-18T14:53:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1658156029000,"updatedTime":1658156029000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.91,"words":274},"filePathRelative":"frontend/basic-css/transition.md","localizedDate":"2022年7月18日","autoDesc":true}');export{x as comp,w as data};
