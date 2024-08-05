import{_ as a,r as c,c as d,b as n,w as o,a as e,o as l}from"./app-CbULZrmi.js";const i={},s=e("h1",{id:"创建自定义事件",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#创建自定义事件"},[e("span",null,"创建自定义事件")])],-1),r=e("h2",{id:"基本事件",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#基本事件"},[e("span",null,"基本事件")])],-1),m=e("pre",null,[e("code",{class:"language-html"},`<button id='btn'>点击我</button>
<div id='div1'>这是一个div</div>
`)],-1),p=e("pre",null,[e("code",{class:"language-js"},`
let ev = new Event("look", {"bubbles":true, "cancelable":false});
document.getElementById('div1').addEventListener("look", e => {
 alert(\`look事件触发了! \`);
});
document.getElementById("btn").addEventListener(
  "click", function () {
    // 派发事件
  document.getElementById('div1').dispatchEvent(ev);
  }
)
`)],-1),u=e("h2",{id:"customevent",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#customevent"},[e("span",null,"customEvent")])],-1),h=e("pre",null,[e("code",{class:"language-html"},`<button id='btn'>点击我</button>
`)],-1),v=e("pre",null,[e("code",{class:"language-js"},`// 创建事件
let myEvent = new CustomEvent("pingan", {
 detail: { name: "wangpingan" }
});

// 添加适当的事件监听器
window.addEventListener("pingan", e => {
 alert(\`pingan事件触发，是 \${e.detail.name} 触发。\`);
});
document.getElementById("btn").addEventListener(
  "click", function () {
    // 派发事件
  window.dispatchEvent(myEvent);
  }
)
`)],-1);function g(y,f){const t=c("CodeDemo");return l(),d("div",null,[s,r,n(t,{id:"code-demo-6",type:"normal",code:"eJyFkMFKw0AQhl9l3EsTKA1ea5qD0IPgI+yhSXZqo9uJNJuIlIB4UMGD9KYvoODFi0htQV8mjX0MZ5OLB9E97C7/zs73zz8XEzPVoi/8KDcmJUjUoBMZ6gRfl++b63V9s/C99imQ5KukaCr43O0E28+H+v6lWl5Uy2dWfI83rhJdcZxxS0kaDWABAyA8g2GBZBwpdJqeSNGFuRRRHkUaMyn6ZpZjF6SIQ4pRh6yyOA51hqW7J0mlcT7l770jNEON9rp/fqCc1ojbC5Vq2h8mmUHC2Q8MwiBgFkGocWackdWr1W21fts+PW7uFtXqagdGFvInic0akuI3FIE1rpO44Y1zik3CSTpug+XleVC/fjQsy7XifwOpJDsNTTxpQ8PCWgMoJbmcb/kNhA+mgA=="},{default:o(()=>[m,p]),_:1}),u,n(t,{id:"code-demo-13",type:"normal",code:"eJxtkcFKw0AQhl9lWIQ2UNJ7bXtQehB8hD00za7tajIpzcZQQqAUwaKCFi9qL57Ug+BFFBv1Zey2evIV3CTtQeielp1hv2/+iUhHug6pkGorkNJDEKxWaEks1BfDN3WczEfjajkv1SmSEtn3dXO5DGo0Ucl0Nj2dJS8UHS7B7TcOOUqoAfIQtgNfem72UqSkK7BtISUliCgC49ISTgUiQMvlFaAktLC96oGYYmxsUqSoOfPXRJ3c/gyG6uNycXOUAxeTsbp4VNcPFEOBzAtNi7GMtSt8yZH3/jE51OoZ2HJ4TxabeSX/6vv+Tp2Pf9/P5ldPsBFxM5czU7MY8urXYNhMhTIr5tmBq0lmm8uGw9PrVn+HaaCOjRJjjQqCHtF2hH2Q2uwFaEuhoy4amZQ+6ZzPn5q0yhNgORcTfteSdicPchlxqgFpTIZeSfwHB0a7qQ=="},{default:o(()=>[h,v]),_:1})])}const _=a(i,[["render",g],["__file","create-event.html.vue"]]),b=JSON.parse('{"path":"/frontend/basic-js/create-event.html","title":"创建自定义事件","lang":"zh-CN","frontmatter":{"description":"创建自定义事件 基本事件 customEvent","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/create-event.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"创建自定义事件"}],["meta",{"property":"og:description","content":"创建自定义事件 基本事件 customEvent"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-24T22:42:20.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-24T22:42:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"创建自定义事件\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-24T22:42:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"基本事件","slug":"基本事件","link":"#基本事件","children":[]},{"level":2,"title":"customEvent","slug":"customevent","link":"#customevent","children":[]}],"git":{"createdTime":1650201329000,"updatedTime":1653432140000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.42,"words":127},"filePathRelative":"frontend/basic-js/create-event.md","localizedDate":"2022年4月17日","autoDesc":true}');export{_ as comp,b as data};
