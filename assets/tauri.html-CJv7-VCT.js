import{_ as t,c as o,o as u,d as e}from"./app-CbULZrmi.js";const n={},a=e(`<h1 id="tauri教程" tabindex="-1"><a class="header-anchor" href="#tauri教程"><span>tauri教程</span></a></h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p><a href="https://tauri.app/" target="_blank" rel="noopener noreferrer">https://tauri.app/</a></p><h2 id="使用nsis" tabindex="-1"><a class="header-anchor" href="#使用nsis"><span>使用nsis</span></a></h2><pre><code class="language-json">{
  &quot;build&quot;: {
    &quot;beforeDevCommand&quot;: &quot;yarn dev&quot;,
    &quot;beforeBuildCommand&quot;: &quot;yarn build&quot;,
    &quot;devPath&quot;: &quot;http://localhost:1420&quot;,
    &quot;distDir&quot;: &quot;../dist&quot;,
    &quot;withGlobalTauri&quot;: false
  },
  &quot;package&quot;: {
    &quot;productName&quot;: &quot;tauri-nsis&quot;,
    &quot;version&quot;: &quot;0.0.0&quot;
  },
  &quot;tauri&quot;: {
    &quot;allowlist&quot;: {
      &quot;all&quot;: false,
      &quot;shell&quot;: {
        &quot;all&quot;: false,
        &quot;open&quot;: true
      }
    },
    &quot;bundle&quot;: {
      &quot;active&quot;: true,
      &quot;icon&quot;: [
        &quot;icons/32x32.png&quot;,
        &quot;icons/128x128.png&quot;,
        &quot;icons/128x128@2x.png&quot;,
        &quot;icons/icon.icns&quot;,
        &quot;icons/icon.ico&quot;
      ],
      &quot;identifier&quot;: &quot;ab.yzq.tauri-nsis&quot;,
      &quot;targets&quot;: [&quot;nsis&quot;],
      &quot;windows&quot;: {
        &quot;allowDowngrades&quot;: true,
        &quot;certificateThumbprint&quot;: null,
        &quot;digestAlgorithm&quot;: null,
        &quot;nsis&quot;:{
          &quot;languages&quot;: [&quot;SimpChinese&quot;,&quot;English&quot;],
          &quot;displayLanguageSelector&quot;: true
        },
        &quot;timestampUrl&quot;: null,
        &quot;tsp&quot;: false,
        &quot;webviewFixedRuntimePath&quot;: null,
        &quot;webviewInstallMode&quot;: {
           &quot;type&quot;: &quot;skip&quot; 
        },
        &quot;wix&quot;: null
      }
    },
    &quot;security&quot;: {
      &quot;csp&quot;: null
    },
    &quot;updater&quot;: {
      &quot;active&quot;: false
    },
    &quot;windows&quot;: [
      {
        &quot;fullscreen&quot;: false,
        &quot;resizable&quot;: true,
        &quot;title&quot;: &quot;tauri-nsis&quot;,
        &quot;width&quot;: 800,
        &quot;height&quot;: 600 
        
      }
    ]
  }
}

</code></pre>`,5),i=[a];function r(q,s){return u(),o("div",null,i)}const c=t(n,[["render",r],["__file","tauri.html.vue"]]),p=JSON.parse('{"path":"/go-tutor/rust-tutor/tauri.html","title":"tauri教程","lang":"zh-CN","frontmatter":{"description":"tauri教程 安装 https://tauri.app/ 使用nsis","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/rust-tutor/tauri.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"tauri教程"}],["meta",{"property":"og:description","content":"tauri教程 安装 https://tauri.app/ 使用nsis"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"tauri教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"使用nsis","slug":"使用nsis","link":"#使用nsis","children":[]}],"git":{"createdTime":1683806306000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.32,"words":97},"filePathRelative":"go-tutor/rust-tutor/tauri.md","localizedDate":"2023年5月11日","autoDesc":true}');export{c as comp,p as data};
