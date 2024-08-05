import{_ as c,f as n,r as a,c as l,b as x,w as h,h as m,a as e,o as b}from"./app-CbULZrmi.js";const u={__name:"box-shadow.html",setup(r,{expose:s}){s();let t=n([{"box-shadow":"red 10px 5px 5px "},{"box-shadow":"teal 60px -16px"},{"box-shadow":"rgba(0, 0, 255, .2) 12px 12px 2px 1px"},{"box-shadow":"rgba(149, 157, 165, 0.2) 0px 8px 24px"},{"box-shadow":"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"},{"box-shadow":`rgba(0, 0, 0, 0.25) 0px 54px 55px,
   rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
   rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px`},{"box-shadow":"rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px"},{"box-shadow":"rgb(38, 57, 77) 0px 20px 30px -10px"}]);const o={get cssList(){return t},set cssList(p){t=p},h:m,ref:n};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}},g=e("h1",{id:"box-shadow",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#box-shadow"},[e("span",null,"box-shadow")])],-1),w=e("p",null,"语法",-1),y=e("pre",null,[e("code",{class:"language-css"},`/* x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
`)],-1),_=e("pre",null,[e("code",{class:"language-html"},`
<div class='demo first'> </div>
<div class='demo second'> </div>
<div class='demo'> </div>
<div class='demo'> </div>
<blockquote><q>You may shoot me with your words,<br/>
You may cut me with your eyes,<br/>
You may kill me with your hatefulness,<br/>
But still, like air, I'll rise.</q>
<p>&mdash; Maya Angelou</p>
</blockquote>
`)],-1),f=e("pre",null,[e("code",{class:"language-css"},`.demo{

    margin: 1rem 0;
    width:100%;
    height:1.5rem;
}
.first{
box-shadow: blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px,
   rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px,
    rgb(255, 217, 19) 20px -20px,
     rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px,
      rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px;
}
blockquote {
  padding: 20px;
  box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
}
`)],-1);function v(r,s,t,o,p,q){const d=a("CssDemo"),i=a("CodeDemo");return b(),l("div",null,[g,x(d,{"css-list":o.cssList},null,8,["css-list"]),w,y,x(i,{id:"code-demo-10",type:"normal",code:"eJyNkeFumzAQx1/lhLSlkVzAYVk7ypC2b/uwB5jEFwMuWDE2sc2SqOq71zYhJS2qanMn5Pv5f+e7p6A1HQ/SoBBZzf5DxYnWP1c17SQ8MqXNKocsspF8AdC0kqL+gPhkqOSy2u0HaWie7fN/coCOnEC3UhroKByYaeEkBwUHqWqNslJF9trEVcMbip7oO2jHOL+mWmLo48AF1Rf4t1XSxpIIONtRIEwh+LOyNxXTNMyivau2z792NdHtA/wlJwK/REO5HLKod8Fo9pZCBCiotLbdDd2TnwpRCLCrI6phIgWsaAfxw3h4YLVpUxzHX84HLWVNa1Icbi1mz54LEfqRWJ1SHm91S2p5SKHkA4W4P15sY40JTQ0C1ZQ3m+0WweTWgB1y673/S/oj8gkdm2AE+Edi0bs5uSi08WHvr4VmML5zenP2jCwJJqPMleArh7ffEdxfYZPWktg3T3m/IHbvbU6NDX6dHtguA/SkrploUv8AP5dZ56fsY7MhtknsPJ3ZPOQmRn6HeH2p87xiu+3n5jRVdLb3aOj0Ro/fKifrserg+QWyLB01"},{default:h(()=>[_,f]),_:1})])}const C=c(u,[["render",v],["__file","box-shadow.html.vue"]]),L=JSON.parse('{"path":"/frontend/basic-css/box-shadow.html","title":"box-shadow","lang":"zh-CN","frontmatter":{"description":"box-shadow","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/box-shadow.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"box-shadow"}],["meta",{"property":"og:description","content":"box-shadow"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-18T15:55:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-18T15:55:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"box-shadow\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-18T15:55:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1658156029000,"updatedTime":1658159745000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.49,"words":446},"filePathRelative":"frontend/basic-css/box-shadow.md","localizedDate":"2022年7月18日","autoDesc":true}');export{C as comp,L as data};
