import{_ as r,r as a,c as l,b as t,w as o,d as i,a as e,e as s,o as c}from"./app-CbULZrmi.js";const d={},p=i('<h1 id="伪元素" tabindex="-1"><a class="header-anchor" href="#伪元素"><span>伪元素</span></a></h1><h2 id="标准伪元素索引" tabindex="-1"><a class="header-anchor" href="#标准伪元素索引"><span><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements#%E6%A0%87%E5%87%86%E4%BC%AA%E5%85%83%E7%B4%A0%E7%B4%A2%E5%BC%95" target="_blank" rel="noopener noreferrer">标准伪元素索引</a></span></a></h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after" target="_blank" rel="noopener noreferrer"><code>::after (:after)</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::backdrop" target="_blank" rel="noopener noreferrer"><code>::backdrop</code></a> Experimental</li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before" target="_blank" rel="noopener noreferrer"><code>::before (:before)</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::cue" target="_blank" rel="noopener noreferrer"><code>::cue (:cue)</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter" target="_blank" rel="noopener noreferrer"><code>::first-letter (:first-letter)</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line" target="_blank" rel="noopener noreferrer"><code>::first-line (:first-line)</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::grammar-error" target="_blank" rel="noopener noreferrer"><code>::grammar-error</code></a> Experimental</li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::marker" target="_blank" rel="noopener noreferrer"><code>::marker</code></a> Experimental</li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::placeholder" target="_blank" rel="noopener noreferrer"><code>::placeholder</code></a> Experimental</li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection" target="_blank" rel="noopener noreferrer"><code>::selection</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::slotted" target="_blank" rel="noopener noreferrer"><code>::slotted()</code></a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/::spelling-error" target="_blank" rel="noopener noreferrer"><code>::spelling-error</code></a> Experimental</li></ul>',3),m=e("pre",null,[e("code",{class:"language-html"},`
<q>一些引用</q>, 他说，<q>比没有好。</q>.

`)],-1),h=e("pre",null,[e("code",{class:"language-css"},`q::before {
  content: "«";
  color: blue;
}
q::after {
  content: "»";
  color: red;
}
`)],-1),f=e("p",null,"一个todo",-1),u=e("pre",null,[e("code",{class:"language-html"},`<ul>
 <li>Buy milk</li>
 <li>Take the dog for a walk</li>
 <li>Exercise</li>
 <li>Write code</li>
 <li>Play music</li>
 <li>Relax</li>
</ul>
`)],-1),g=e("pre",null,[e("code",{class:"language-css"},`li {
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
`)],-1),b=e("pre",null,[e("code",{class:"language-js"},`var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if( ev.target.tagName === 'LI') {
     ev.target.classList.toggle('done');
  }
}, false);

`)],-1),y=e("p",null,"一个按钮",-1),v=e("pre",null,[e("code",{class:"language-html"},`<button class='anima'>按钮</button>
`)],-1),z=e("pre",null,[e("code",{class:"language-css"},`.anima{
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
`)],-1),k=e("p",null,[s("非常好的资料 "),e("a",{href:"https://css-tricks.com/animating-the-content-property/",target:"_blank",rel:"noopener noreferrer"},"https://css-tricks.com/animating-the-content-property/")],-1),S=e("pre",null,[e("code",{class:"language-html"},`<div class='element'></div>
`)],-1),x=e("pre",null,[e("code",{class:"language-css"},`@keyframes changeLetter {
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
`)],-1),C=e("p",null,"hover效果",-1),_=e("pre",null,[e("code",{class:"language-html"},`<button class='hover-1'>按钮</button>
`)],-1),N=e("pre",null,[e("code",{class:"language-css"},`.hover-1 {
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

`)],-1),W=e("pre",null,[e("code",{class:"language-html"},`<div id="menu">
 <ul>
  <li><a href="#">Link #1</a></li>
  <li><a href="#">Link #2</a></li>
  <li><a href="#">Link #3</a></li>
  <li><a href="#">Link #4</a></li>
 </ul>
</div>
`)],-1),E=e("pre",null,[e("code",{class:"language-css"},`*{
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
`)],-1);function w(A,J){const n=a("CodeDemo");return c(),l("div",null,[p,t(n,{id:"code-demo-68",type:"normal",code:"eJyrVsooyc1RslKKybMptHuyo+HJrtlP90x9PmWFjX6hnY7Ck93TXqzf8n5PD1D22fopzzYtfDan8+nSvY8bmkAK9GLyYvKUdJSSi4uBZhRaWSWlpuUXpSpUx+QpKCTn55Wk5pVYKcQoHVodo2QNEcvJL7JSSMopTQXya2PygHoS00pSizC17EbVUpSaAtGhVAsA4SVKow=="},{default:o(()=>[m,h]),_:1}),f,t(n,{id:"code-demo-75",type:"normal",code:"eJxdUsFu2zAM/RXCO9gFajdL1gHxkh5WtMCAYhi2Abvkosi0rEWWMkl2YxT591GytzrNIQYfn8n3Hv2SNL5VSZlsOnW307BR8u5zN0Ar1WFzQ8WE/WQHBN8gVEZAbSwweGaXlIcTWi4dzrFfVnoEbqoL9JtitKFzks/R76jYaQI2N1FOcp1w50idkvBCNFDS+dz5QWHuhyOWoI3GT6FzNE56aXQJluZ42Y9wy6yQBC6Pp5HGqkpqUcKiuMX24n+JbaTsGT8IazpdlbRPNF5YHGKnNtrnNaNshhIc0y53aGVNvfNO77SSRUVyRqXzKe/u7x8f1+s3vLLcIyU58TnNRu1LSNM3ftjeGdX50c/e2Aptzo0ylgYvFuv1ajXvxHBInVGymuPPsvIN2Sazq2h5GZ1HSoPBZgnvpwS8OVIReLFUWFNzUXyc6jHTPLLy/+9YyoPstHQA45nH7MNtheIqNv8tDzmPKdBlf4fD9szGo8KWvizetRRB8adDO/xAhdwbm6WdSsOUwCroeg89cZ6oQI3U5UryQ3oNdad5yCvD/mpMVNYZYF94UoueHuIraxG22y2kT1/SiUS/Vw5XzLkwuvBGCIVZGu4UtwOQ6DOtYcphAMjC+S8a+RRm"},{default:o(()=>[u,g,b]),_:1}),y,t(n,{id:"code-demo-83",type:"normal",code:"eJyNUlFu1DAQvcooqOqulJRk21BqyopzoPw4yTix6tirsdMC1R4AiS8OwrGQuAUTO4u2SEhESaR58zzz5o2fszFMJhPZfTuH4Cx0Rnr//lJaPcnL/c9vX399/3H/OiX3jc3yrPOe+VeR8dxYkMaI2XoM7zhoZfcwkJttL+AV1rJ7iwsMnTOOGFJKxVg5Gwqvv6CA6ubwKWKtox6pINnr2Qsor2qcYuIg+17bgSGoTpDzOmhnBRAaGfRjauMekZRxTwJG3fdoI2i0xWJEPYxBwPUudgsk7VqB9XOva8/osbFpLjEulZbp+Olm8iz+4LQNSC9oUjGSaInLgzLJBtFkTfaXUtl6Z+aQlAZ3EFDU5UWMKIn7E7eO/Z7OAIPqRf7M5mU8ScWw+MadN8Gtx3OgoZWb3e4uh+p2x78b/pXbE17X+eljr7fAxf91ZJs0L6YpRyyMXJABP27elD0O25ThPeCm4KXlcLvsbjl0ZF/OLRXJshxWULmOd51AWP0+83C/X12M7GSjHxEtVJ7vED1J6tfFfXjAz4rkhH5lxGpVWV6c6v6PfL5fORR3STwA1+U3O/4GZbQIQQ=="},{default:o(()=>[v,z]),_:1}),k,t(n,{id:"code-demo-90",type:"normal",code:"eJxtkN1KAzEQhV9lCEhvXK2IILEW9dpH2JuYnWzGZmdLEq1r6bs7+2O7hUJIyJnDN2dmr3xugtJqVdE32GBSel5gwAY5L9arW1HXJatrZVMS18sGOxdNgwmsN1zjO+aMEfYlAyyvxhfAtpwFoKFUr6V66sVDfz3MLaGNGnaeMp4Md8uLkLcTRM7NlG80VpS2wXQaXMCfwWUC1VwIt0karBgxDvrnV8rkuuIIntV2VGWv+/bDFzxS7cUiynaknrXWxh3HloZMjcnUsiDnW7lPEIjRRCB2xJJIskmBzTTzLP1HaO1mEi+sD8CJWCT6RQ2P/5kkkTr8AZI6k/4="},{default:o(()=>[S,x]),_:1}),C,t(n,{id:"code-demo-97",type:"normal",code:"eJyNUUtqwzAQvcqgUJxCnMilWVRNfRJvFFl2RB2NGcmBEnKAQlc9SI9V6C068QfqrCqEPvN5783MWRzisRFK7PZdjOjBNDqEl+SAJ0tpluTfH+8/n1+7zeDOCy9WwoTAGesxBs6FB16mo4CkWnQ+WnoejK0uS+drlZE9wgMfvX2vzWtN2PlSQeO81ZTWpEtnfVwuMvm0NRlIkPdw0rRM03Z1fW9mP48p2dbq2ANG0j646NArkOvHsPpDkbY4uEAGDr4UflKu+nvQz7gKMinvejyDDZcCi6qqBsFIJWdcNXahL+YGSe1thWTHVgC22rj4puTYhrnC0ctKtwGsDnaKMsit81FBIQoxMADvud4brokqG0H+QzTxJHmesIVpeK6XX7MtrJ0="},{default:o(()=>[_,N]),_:1}),t(n,{id:"code-demo-101",type:"normal",code:"eJy1UsuOmzAU/ZUrZ1eVhsx0RpVLWXXZT2Bzg024irGRbfLoaP69F2oyEFXtbAoLy/ccOA/7RbSxM0KKQtEJSH2rRKftUImyslAMZlygMFQWCK3XDeMbBn+QPcJmV2yxLLaM/o318C7W47tYn5esYjv5K7ZsnVfxUdQhcJQPL+MvADr0B7IS8q+/9z0qRfbwNoj6EjOla+cxkmOmdVYnrHE2Zg12ZK4S0BOaJRDop5awe+4vPH2tLCbJ2hnnJWzy6UmYbN1J+zvGl+eJMY4m1mas/c747qm/AA7R3Qd4yCfhcXYmFVsJj/nbaI/18eDdYBXrfJ+ehCTceaV95lHRECSwyPyhu2ShReXO3BG/o/wqymQSBpN8GgpcRbwa7iJVtyAxnHi9CzQV7LXhpk8roiG5143zehU+83RoIyf1ukvuai5eW55VohKrQNGjTQrgeqwpXiH/9BRAY5jPMzvr/ZFi9i/u0hc2cXFuN/WyvOnfkuE+ODPEWc3oJsr5miWZ2/7/mp4u28r6rL/7I3NV/tIqU8XrLzc5UHQ="},{default:o(()=>[W,E]),_:1})])}const R=r(d,[["render",w],["__file","pseudo-elements.html.vue"]]),L=JSON.parse('{"path":"/frontend/basic-css/pseudo-elements.html","title":"伪元素","lang":"zh-CN","frontmatter":{"description":"伪元素 标准伪元素索引 ::after (:after) ::backdrop Experimental ::before (:before) ::cue (:cue) ::first-letter (:first-letter) ::first-line (:first-line) ::grammar-error Experimental ::mar...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/pseudo-elements.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"伪元素"}],["meta",{"property":"og:description","content":"伪元素 标准伪元素索引 ::after (:after) ::backdrop Experimental ::before (:before) ::cue (:cue) ::first-letter (:first-letter) ::first-line (:first-line) ::grammar-error Experimental ::mar..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-18T22:16:27.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-18T22:16:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"伪元素\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-18T22:16:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"标准伪元素索引","slug":"标准伪元素索引","link":"#标准伪元素索引","children":[]}],"git":{"createdTime":1658156029000,"updatedTime":1658182587000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":2.01,"words":603},"filePathRelative":"frontend/basic-css/pseudo-elements.md","localizedDate":"2022年7月18日","autoDesc":true}');export{R as comp,L as data};
