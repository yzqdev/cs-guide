import{_ as o,r as n,c as p,b as a,w as c,d as i,a as t,o as d}from"./app-CbULZrmi.js";const s={},r=i(`<h1 id="零基础入门前端开发工程师-应当提前掌握-div-css-布局规范" tabindex="-1"><a class="header-anchor" href="#零基础入门前端开发工程师-应当提前掌握-div-css-布局规范"><span>零基础入门前端开发工程师，应当提前掌握 DIV+CSS 布局规范</span></a></h1><p><strong>样式命名规范</strong></p><p><img src="https://p26.toutiaoimg.com/large/470e000043a2bccf221e" alt="零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范"></p><p>id 选择器常用命名规范</p><p><img src="https://p26.toutiaoimg.com/large/470b0001f6a133c60835" alt="零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范"></p><p>类选择器常用命名规范</p><p><img src="https://p26.toutiaoimg.com/large/470b0001f9d5cf732b27" alt="零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范"></p><p><strong>全局样式设置</strong></p><p>1.全局样式置顶，并用注释标注为/<em>全局样式</em>/</p><p>2.用一内容定义的样式写在一起，并用注释标注</p><p>3.一个样式里面，多个属性的定义建议写在一行，属性定义之间用&quot;；&quot;隔开</p><p>4.样式中类或者 id 选择器的命名建议使用样式命名规范来书写</p><p>5.自定义选择器名称建议都用小写、尽量使用英文单词，少用拼音，名称中建议少用&quot;-&quot;或者&quot;_&quot;,尽量少用英文缩写。</p><p>/<em>全局样式部分</em>/</p><pre><code class="language-css">* {
 padding: 0;
 margin: 0;
 font-size: 12px;
 font-family: &quot;宋体&quot;;
}

ul,
li,
dl,
dt,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
form,
p {
 padding: 0;
 margin: 0;
}

ul {
 list-style: none;
}

img {
 border: 0px;
}

a {
 text-decoration: none;
}

.clearfloat {
 clear: both;
 height: 0px;
 font-size: 1px;
 line-height: 0px;
}
</code></pre><p>html 文档书写规范</p><p>1.html 标签代码书写应遵循 xhtml 规范：</p><p>a.Html 标签要全部小写</p><p>b.标签嵌套要对应</p><p>c.成对标签必须关闭，单个标签也需要关闭，如&quot;&lt;..../&gt;&quot;</p><p>d.标签属性需要用引号，且不能简写，如:</p><p>规范写法：<code>&lt;input type=&quot;checkbox&quot; checked=&quot;checked&quot; /&gt;</code></p><p>不规范写法：<code>&lt;input type=&quot;checkbox&quot; checked /&gt;</code></p><p>2.同一模块的 html 代码用注释包含,如：</p><pre><code class="language-html">&lt;div id=&quot;logobar&quot;&gt;

.....

&lt;/div&gt;
</code></pre><p>3.Html 通过首行缩进来体现代码结构，如：</p>`,26),l=t("pre",null,[t("code",{class:"language-html"},`<div id="main_nav">
  <ul>
   <li>
    <a href="#">首 页</a>
   </li>
   <li>
    <a href="#">企业招聘</a>
   </li>
  </ul>
 </div>
`)],-1),m=t("p",null,'4.Img 标签需加上"alt"属性',-1);function h(g,u){const e=n("CodeDemo");return d(),p("div",null,[r,a(e,{id:"code-demo-77",type:"normal",code:"eJyrVsooyc1RslKyScksU8hMsY1Ryk3MzIvPSyyLUbKLyVNQsCnNAdMKNjmZEIaCTaJCRlFqGlCtMlDRy2XTFF4u3GqjnwhVpw9TiEvHkz2NT3bMetY9+0XjDExtNvoQG230gU4CMpRqAXKhNv8="},{default:c(()=>[l]),_:1}),m])}const y=o(s,[["render",h],["__file","div-and-css.html.vue"]]),f=JSON.parse('{"path":"/cs-tips/frontend/others/div-and-css.html","title":"零基础入门前端开发工程师，应当提前掌握 DIV+CSS 布局规范","lang":"zh-CN","frontmatter":{"description":"零基础入门前端开发工程师，应当提前掌握 DIV+CSS 布局规范 样式命名规范 零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范 id 选择器常用命名规范 零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范 类选择器常用命名规范 零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范 全局样式设置 1.全局样式置顶，并用注释...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/others/div-and-css.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"零基础入门前端开发工程师，应当提前掌握 DIV+CSS 布局规范"}],["meta",{"property":"og:description","content":"零基础入门前端开发工程师，应当提前掌握 DIV+CSS 布局规范 样式命名规范 零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范 id 选择器常用命名规范 零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范 类选择器常用命名规范 零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范 全局样式设置 1.全局样式置顶，并用注释..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://p26.toutiaoimg.com/large/470e000043a2bccf221e"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"零基础入门前端开发工程师，应当提前掌握 DIV+CSS 布局规范\\",\\"image\\":[\\"https://p26.toutiaoimg.com/large/470e000043a2bccf221e\\",\\"https://p26.toutiaoimg.com/large/470b0001f6a133c60835\\",\\"https://p26.toutiaoimg.com/large/470b0001f9d5cf732b27\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.7,"words":509},"filePathRelative":"cs-tips/frontend/others/div-and-css.md","localizedDate":"2023年5月25日","autoDesc":true}');export{y as comp,f as data};
