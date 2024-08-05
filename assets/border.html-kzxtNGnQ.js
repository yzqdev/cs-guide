import{_ as p,f as s,r as d,c as m,b as a,w as u,h,a as e,o as _}from"./app-CbULZrmi.js";const b={__name:"border.html",setup(i,{expose:r}){r();let o=s([{border:"2px solid red"},{border:"2px dashed cyan"},{border:"1rem solid yellow"},{border:"2px solid yellow"},{border:"thick double rgb(50, 161, 206)"},{border:"4mm ridge rgba(211,220,50,.6)"}]);const t={get cssList(){return o},set cssList(n){o=n},h,ref:s};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}},y=e("h1",{id:"边框",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#边框"},[e("span",null,"边框")])],-1),g=e("p",null,"Borders vs. outlines 边界border和轮廓outline很相似。然而轮廓在以下方面与边界不同",-1),f=e("ul",null,[e("li",null,"轮廓不占据空间，他们在元素内容之外绘制"),e("li",null,"根据规范，轮廓不必为矩形，尽管通常是矩形。")],-1),w=e("p",null,"语法",-1),v=e("pre",null,[e("code",{class:"language-css"},`/* style */
border: solid;

/* width | style */
border: 2px dotted;

/* style | color */
border: outset #f33;

/* width | style | color */
border: medium dashed green;

/* Global values */
border: inherit;
border: initial;
border: unset;

`)],-1),x=e("pre",null,[e("code",{class:"language-html"},`<div>I have a border, an outline, AND a box shadow! Amazing, isn't it?</div>
`)],-1),z=e("pre",null,[e("code",{class:"language-css"},`div {
  border: 0.5rem outset pink;
  outline: 0.5rem solid khaki;
  box-shadow: 0 0 0 2rem skyblue;
  border-radius: 12px;
  font: bold 1rem sans-serif;
  margin: 2rem;
  padding: 1rem;
  outline-offset: 0.5rem;
}
`)],-1);function T(i,r,o,t,n,C){const l=d("CssDemo"),c=d("CodeDemo");return _(),m("div",null,[y,a(l,{"css-list":t.cssList},null,8,["css-list"]),g,f,w,v,a(c,{id:"code-demo-25",type:"normal",code:"eJw9j71uwzAMhF+F1dLFbpsAXdSgRYAuXfoEWZhKjgnLlCHJaX6Qdw/NOIEm8TveHc+mLX0w1qwc7T9/oMW9B4RtTM6nCpAhjiUQ+wrWv99KDpBbdPH/CdY9noh3FVDm5wJUvlavk82GTWX+chZb+cJ5wzA7Wnh7eU++n1yzLzAQdx8TnlMePMdADroWO1IusfUtViT6lirrjtsw+lkyJdQJHY3ZwmI5HHTeRC5WaHCw0B3kXGefqFHcY9oRW/XTwYDOyVXicJ/M5erYNFL63lHQRS69XAFyQGuD"},{default:u(()=>[x,z]),_:1})])}const k=p(b,[["render",T],["__file","border.html.vue"]]),A=JSON.parse('{"path":"/frontend/basic-css/border.html","title":"边框","lang":"zh-CN","frontmatter":{"description":"边框","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/border.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"边框"}],["meta",{"property":"og:description","content":"边框"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-18T14:53:49.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-18T14:53:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"边框\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-18T14:53:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1658156029000,"updatedTime":1658156029000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.68,"words":204},"filePathRelative":"frontend/basic-css/border.md","localizedDate":"2022年7月18日","autoDesc":true}');export{k as comp,A as data};
