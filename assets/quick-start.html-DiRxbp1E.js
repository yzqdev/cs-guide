import{_ as e,o as n,c as a,a as i}from"./app-BO2oONDQ.js";const s={},t=i(`<h1 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始"><span>快速开始</span></a></h1><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><h2 id="capacitor" tabindex="-1"><a class="header-anchor" href="#capacitor"><span>capacitor</span></a></h2><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token comment">#安装 Capacitor</span>
npm install <span class="token operator">--</span>save @capacitor/core @capacitor/<span class="token function">cli</span>

<span class="token comment">#初始化 Capacitor，会要求输入 App Name、App ID</span>
npx cap init

<span class="token comment">#添加 iOS 或 Android 平台</span>
npx cap add ios 
npx cap add android 

<span class="token comment">#自动打开 Xcode 或 Android Studio 打包工程。</span>
npx cap open ios 
npx cap open android 

<span class="token comment">#拷贝\`www\`目录到iOS或Android工程</span>
 npx cap <span class="token function">copy</span> ios
 npx cap <span class="token function">copy</span> android 
 
<span class="token comment">#安装插件或依赖后更新iOS或Androd工程的依赖</span>
 npx cap update ios 
 npx cap update android 
 
 <span class="token comment">#同步工程包括更新依赖以及拷贝\`www\`目录，相当于\`copy\`+\`update\`</span>
 npx cap sync
 
 <span class="token comment">#打开浏览器测试PWA</span>
 npx cap serve 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># live-reload</span>
ionic capacitor run android <span class="token parameter variable">-l</span> <span class="token parameter variable">--external</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),c=[t];function d(r,l){return n(),a("div",null,c)}const p=e(s,[["render",d],["__file","quick-start.html.vue"]]),m=JSON.parse('{"path":"/android-tips/hybrid/capacitor/quick-start.html","title":"快速开始","lang":"zh-CN","frontmatter":{"description":"快速开始 常用命令 capacitor","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/hybrid/capacitor/quick-start.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"快速开始"}],["meta",{"property":"og:description","content":"快速开始 常用命令 capacitor"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"快速开始\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]},{"level":2,"title":"capacitor","slug":"capacitor","link":"#capacitor","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.53,"words":159},"filePathRelative":"android-tips/hybrid/capacitor/quick-start.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,m as data};
