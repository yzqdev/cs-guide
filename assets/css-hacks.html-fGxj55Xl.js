import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const r={},o=a(`<h1 id="css-hack" tabindex="-1"><a class="header-anchor" href="#css-hack"><span>css hack</span></a></h1><h2 id="透明度问题" tabindex="-1"><a class="header-anchor" href="#透明度问题"><span>透明度问题</span></a></h2><blockquote><p>如果我们给父元素添加opacity:0.4后，子元素的red颜色也变成了0.4的透明度</p></blockquote><p>解决方法： 父元素的透明度用rgba的方法 ,子集可以用opacity了</p><pre><code class="language-css">background:rgba(0,0,0,0.4);
# 或者使用hex
background:#ffffff67;
</code></pre><p>透明度对照表见: <a href="https://blog.csdn.net/ezconn/article/details/90052114?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_baidulandingword-1&amp;spm=1001.2101.3001.4242" target="_blank" rel="noopener noreferrer">链接</a> ​</p><h2 id="活用less-遍历生成margin-padding-fontsize等类名" tabindex="-1"><a class="header-anchor" href="#活用less-遍历生成margin-padding-fontsize等类名"><span>活用less：遍历生成margin/padding/fontSize等类名</span></a></h2><p>起因： 之前项目里写margin/padding之类的样式都是用的穷举的方式，实在觉得冗余又繁琐。下面直接贴代码，解放你的双手</p><pre><code class="language-less">/*
    margin padding fontSize width 通用样式表
    免去你每次重写样式的烦恼
    marked by Jacky
*/
.loopStyle(@counter) when (@counter &gt; 0) {
    .p-@{counter} {
      padding: (1vw * @counter);
    }
    .p-t-@{counter} {
      padding-top: (1vw * @counter);
    }
    .p-r-@{counter} {
      padding-right: (1vw * @counter);
    }
    .p-b-@{counter} {
      padding-bottom: (1vw * @counter);
    }
    .p-l-@{counter} {
      padding-left: (1vw * @counter);
    }
    .m-@{counter} {
      margin: (1vw * @counter);
    }
    .m-t-@{counter} {
      margin-top: (1vw * @counter);
    }
    .m-r-@{counter} {
      margin-right: (1vw * @counter);
    }
    .m-b-@{counter} {
      margin-bottom: (1vw * @counter);
    }
    .m-l-@{counter} {
      margin-left: (1vw * @counter);
    }
    .fz-@{counter} {
      font-size: (1vw * @counter);
    }
    .width@{counter}{
      width: 1% * @counter;
    }
    .loopStyle((@counter - 1));    // 递归调用自身
}
   

.loopStyle(100);

@selectors: range(100);

each(@selectors, .(@v, @k) {
  each(@selectors {
    .m-@{v}-@{value} {
      margin: 1px*@v 1px*@value;
    }
  })
});
</code></pre><p>使用:</p><pre><code class="language-less">&lt;div className=&quot;m-t-10&quot;&gt;&lt;/div&gt; // 对应less样式 marginTop: 10vw
</code></pre><p>使用scss</p><pre><code class="language-less">@for $i from 1 through 200 {
  .m-#{$i} { margin: ($i/100)+rem; }
  .m-t-#{$i} { margin-top: ($i/100)+rem; }
  .m-b-#{$i} { margin-bottom: ($i/100)+rem; }
  .m-l-#{$i} { margin-left: ($i/100)+rem; }
  .m-r-#{$i} { margin-right: ($i/100)+rem; }
 
  .p-#{$i} { padding: ($i/100)+rem; }
  .p-t-#{$i} { padding-top: ($i/100)+rem; }
  .p-b-#{$i} { padding-bottom: ($i/100)+rem; }
  .p-l-#{$i} { padding-left: ($i/100)+rem; }
  .p-r-#{$i} { padding-right: ($i/100)+rem; }
 
  .fz-#{$i} { font-size: ($i/100)+rem; }
}
</code></pre>`,13),i=[o];function c(s,d){return t(),n("div",null,i)}const l=e(r,[["render",c],["__file","css-hacks.html.vue"]]),m=JSON.parse('{"path":"/frontend/frontend-tips/css-hacks.html","title":"css hack","lang":"zh-CN","frontmatter":{"description":"css hack 透明度问题 如果我们给父元素添加opacity:0.4后，子元素的red颜色也变成了0.4的透明度 解决方法： 父元素的透明度用rgba的方法 ,子集可以用opacity了 透明度对照表见: 链接 ​ 活用less：遍历生成margin/padding/fontSize等类名 起因： 之前项目里写margin/padding之类的样式...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/frontend-tips/css-hacks.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"css hack"}],["meta",{"property":"og:description","content":"css hack 透明度问题 如果我们给父元素添加opacity:0.4后，子元素的red颜色也变成了0.4的透明度 解决方法： 父元素的透明度用rgba的方法 ,子集可以用opacity了 透明度对照表见: 链接 ​ 活用less：遍历生成margin/padding/fontSize等类名 起因： 之前项目里写margin/padding之类的样式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:35:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:35:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"css hack\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:35:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"透明度问题","slug":"透明度问题","link":"#透明度问题","children":[]},{"level":2,"title":"活用less：遍历生成margin/padding/fontSize等类名","slug":"活用less-遍历生成margin-padding-fontsize等类名","link":"#活用less-遍历生成margin-padding-fontsize等类名","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649172938000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.33,"words":399},"filePathRelative":"frontend/frontend-tips/css-hacks.md","localizedDate":"2022年3月21日","autoDesc":true}');export{l as comp,m as data};
