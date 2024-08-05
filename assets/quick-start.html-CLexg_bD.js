import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const o={},c=n(`<h1 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始"><span>快速开始</span></a></h1><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><h2 id="capacitor" tabindex="-1"><a class="header-anchor" href="#capacitor"><span>capacitor</span></a></h2><pre><code class="language-powershell">#安装 Capacitor
npm install --save @capacitor/core @capacitor/cli

#初始化 Capacitor，会要求输入 App Name、App ID
npx cap init

#添加 iOS 或 Android 平台
npx cap add ios 
npx cap add android 

#自动打开 Xcode 或 Android Studio 打包工程。
npx cap open ios 
npx cap open android 

#拷贝\`www\`目录到iOS或Android工程
 npx cap copy ios
 npx cap copy android 
 
#安装插件或依赖后更新iOS或Androd工程的依赖
 npx cap update ios 
 npx cap update android 
 
 #同步工程包括更新依赖以及拷贝\`www\`目录，相当于\`copy\`+\`update\`
 npx cap sync
 
 #打开浏览器测试PWA
 npx cap serve 

</code></pre><pre><code class="language-shell"># live-reload
ionic capacitor run android -l --external

</code></pre>`,5),i=[c];function r(p,d){return a(),t("div",null,i)}const l=e(o,[["render",r],["__file","quick-start.html.vue"]]),h=JSON.parse('{"path":"/android-tips/hybrid/capacitor/quick-start.html","title":"快速开始","lang":"zh-CN","frontmatter":{"description":"快速开始 常用命令 capacitor","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/hybrid/capacitor/quick-start.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"快速开始"}],["meta",{"property":"og:description","content":"快速开始 常用命令 capacitor"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"快速开始\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]},{"level":2,"title":"capacitor","slug":"capacitor","link":"#capacitor","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.53,"words":159},"filePathRelative":"android-tips/hybrid/capacitor/quick-start.md","localizedDate":"2023年5月22日","autoDesc":true}');export{l as comp,h as data};
