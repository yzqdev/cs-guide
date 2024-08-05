import{_ as l,f as s,r as c,c as d,b as p,h as f,a as t,o as u}from"./app-CbULZrmi.js";const g={__name:"transform.html",setup(m,{expose:o}){o();let n=s([{transform:"matrix(1, 2, 3, 4, 5, 6)"},{transform:" translate(120px, 50%)"},{transform:"scale(2, 0.5)"},{transform:"rotate(0.5turn)"},{transform:"rotateX(10deg)"},{transform:"skew(30deg, 20deg)"},{transform:"scale(0.5) translate(-100%, -100%)"},{transform:"translate3d(12px, 50%, 3em)"}]),e=s("https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg");const a={get cssList(){return n},set cssList(r){n=r},get image(){return e},set image(r){e=r},h:f,ref:s};return Object.defineProperty(a,"__isScriptSetup",{enumerable:!1,value:!0}),a}},h=t("h1",{id:"变形",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#变形"},[t("span",null,"变形")])],-1),_=t("h2",{id:"尝试一下",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#尝试一下"},[t("span",null,"尝试一下")])],-1),x=t("p",null,"语法",-1),y=t("pre",null,[t("code",{class:"language-css"},`/* Keyword values */
transform: none;

/* Function values */
transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
transform: translate(12px, 50%);
transform: translateX(2em);
transform: translateY(3in);
transform: scale(2, 0.5);
transform: scaleX(2);
transform: scaleY(0.5);
transform: rotate(0.5turn);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);
transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: perspective(17px);

/* Multiple function values */
transform: translateX(10px) rotate(10deg) translateY(5px);

/* Global values */
transform: inherit;
transform: initial;
transform: unset;

`)],-1);function v(m,o,n,e,a,r){const i=c("CssDemo");return u(),d("div",null,[h,_,p(i,{"css-list":e.cssList,image:e.image},null,8,["css-list","image"]),x,y])}const z=l(g,[["render",v],["__file","transform.html.vue"]]),w=JSON.parse('{"path":"/frontend/basic-css/transform.html","title":"变形","lang":"zh-CN","frontmatter":{"description":"变形 尝试一下","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/transform.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"变形"}],["meta",{"property":"og:description","content":"变形 尝试一下"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-18T20:12:43.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-18T20:12:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"变形\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-18T20:12:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"尝试一下","slug":"尝试一下","link":"#尝试一下","children":[]}],"git":{"createdTime":1658156029000,"updatedTime":1658175163000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.65,"words":196},"filePathRelative":"frontend/basic-css/transform.md","localizedDate":"2022年7月18日","autoDesc":true}');export{z as comp,w as data};
