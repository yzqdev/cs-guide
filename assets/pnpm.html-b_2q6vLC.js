import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const p={},a=n(`<h1 id="pnpm教程" tabindex="-1"><a class="header-anchor" href="#pnpm教程"><span>pnpm教程</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>注意,建议不要配置store-dir,这样他会在每个磁盘的根目录创建.pnpm-store文件夹来存储缓存</p><p>原因:包存储应与安装的位置处于同一驱动器和文件系统上，否则，包将被复制，而不是被链接。 这是由于硬链接的工作方式带来的一个限制，因为一个文件系统上的文件无法寻址另一个文件系统中的位置</p></div><pre><code class="language-bash">pnpm config set store-dir /path/to/.pnpm-store

并且设置自动安装peerdependencies
pnpm config set auto-install-peers true
</code></pre><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>全称performant npm(高性能的npm)，见名知意，就是一个npm的替代品，至于为什么高性能，用什么样的方式解决了依赖包体积趋近于黑洞的问题,解决了什么问题呢?可以参考大佬的说明<a href="https://juejin.cn/post/6932046455733485575" target="_blank" rel="noopener noreferrer">掘金</a>,<a href="https://pnpm.io/zh/motivation" target="_blank" rel="noopener noreferrer">官网</a></p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>注意: pnpm在固态硬盘上性能最好,机械硬盘上安装时间可能需要半小时, 推荐在固态硬盘使用pnpm,在机械硬盘使用yarn</p></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>nodejs v16.13.0之后的版本内置了实验性的工具corepack，就是nodejs内置的一个管理包管理器的一个东西,<a href="https://github.com/nodejs/corepack/blob/main/README.md" target="_blank" rel="noopener noreferrer">文档</a></p><p>这个corepack就是版本之后默认自带的一个工具，专门用来管理这些安装依赖的这些个工具，自带npm,yarn,pnpm,不用我们手动安装</p><p>切换到指定版本，接着按照pnpm官网的文档，先把实验性的corepack开启</p><pre><code class="language-shell">corepack enable
</code></pre><p>通常corepack中的包管理器版本都不是最新的所以我们要升级到最新，关于最新的pnpm版本号，<a href="https://www.npmjs.com/package/pnpm" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/v/pnpm.svg" alt="npm version"></a>可以去npmjs官网去看</p><p>yarn版本<a href="https://www.npmjs.com/package/yarn" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/v/yarn.svg" alt="npm version"></a></p><pre><code class="language-shell">
corepack prepare pnpm@* --activate
</code></pre><p>或者使用npm安装</p><pre><code class="language-bash">npm i -g pnpm


pnpm安装包
pnpm install

</code></pre><h3 id="安装全局包" tabindex="-1"><a class="header-anchor" href="#安装全局包"><span>安装全局包</span></a></h3><pre><code class="language-shell">pnpm add -g serve
</code></pre><p>workspace用于lerna项目,不需要在子项目做install的操作 pnpm-workspace.yaml</p><pre><code class="language-bash">packages:
  # all packages in subdirs of packages/ and components/
  - &#39;packages/**&#39;
  - &#39;components/**&#39;
  # exclude packages that are inside test directories
  - &#39;!**/test/**&#39;
</code></pre><p>硬链接的优点：</p><ul><li>兼容性好</li><li>盘符被更改也不会受影响</li><li>无需管理员的权限</li></ul><p>硬链接的缺点：</p><ul><li>必须在同一个分区</li><li>仅支持本地驱动器</li><li>不支持为文件夹创建硬链接</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>全局安装的包</p><pre><code class="language-json">{
  &quot;dependencies&quot;: {
    &quot;@antfu/ni&quot;: &quot;^0.17.2&quot;,
    &quot;@nestjs/cli&quot;: &quot;^9.0.0&quot;,
    &quot;@neutralinojs/neu&quot;: &quot;^9.3.1&quot;,
    &quot;@quasar/cli&quot;: &quot;^1.3.2&quot;,
    &quot;@vue/cli&quot;: &quot;^5.0.8&quot;,
    &quot;@vue/devtools&quot;: &quot;^6.1.4&quot;,
    &quot;create-quasar&quot;: &quot;^1.0.28&quot;,
    &quot;create-vite&quot;: &quot;^3.0.0&quot;,
    &quot;electron&quot;: &quot;^19.0.7&quot;,
    &quot;esno&quot;: &quot;^0.16.3&quot;,
    &quot;fkill-cli&quot;: &quot;^7.1.0&quot;,
    &quot;gulp-cli&quot;: &quot;^2.3.0&quot;,
    &quot;hexo-cli&quot;: &quot;^4.3.0&quot;,
    &quot;hugo-installer&quot;: &quot;^3.1.0&quot;,
    &quot;increase-memory-limit-fixbug&quot;: &quot;^1.0.0&quot;,
    &quot;iroiro&quot;: &quot;^0.2.0&quot;,
    &quot;json-server&quot;: &quot;^0.17.0&quot;,
    &quot;lerna&quot;: &quot;^5.1.6&quot;,
    &quot;less&quot;: &quot;^4.1.2&quot;,
    &quot;local-web-server&quot;: &quot;^5.2.0&quot;,
    &quot;nativefier&quot;: &quot;^47.2.0&quot;,
    &quot;npkill&quot;: &quot;^0.8.3&quot;,
    &quot;npm-check-updates&quot;: &quot;^14.0.1&quot;,
    &quot;npm-home&quot;: &quot;^2.0.0&quot;,
    &quot;nrm&quot;: &quot;^1.2.5&quot;,
    &quot;pkg&quot;: &quot;^5.7.0&quot;,
    &quot;pm2&quot;: &quot;^5.2.0&quot;,
    &quot;pm2-windows-service&quot;: &quot;^0.2.1&quot;,
    &quot;pnpm&quot;: &quot;^7.5.2&quot;,
    &quot;prettier&quot;: &quot;^2.7.1&quot;,
    &quot;pug-cli&quot;: &quot;^1.0.0-alpha6&quot;,
    &quot;rimraf&quot;: &quot;^3.0.2&quot;,
    &quot;rollup&quot;: &quot;^2.70.2&quot;,
    &quot;sass&quot;: &quot;^1.51.0&quot;,
    &quot;stylus&quot;: &quot;^0.57.0&quot;,
    &quot;taze&quot;: &quot;^0.7.6&quot;,
    &quot;typeorm&quot;: &quot;^0.3.6&quot;,
    &quot;typescript&quot;: &quot;^4.6.3&quot;,
    &quot;vercel&quot;: &quot;^27.0.2&quot;
  }
}

</code></pre></div><h2 id="清理" tabindex="-1"><a class="header-anchor" href="#清理"><span>清理</span></a></h2><pre><code>pnpm remove axios
但是node_modules/.pnpm下面的文件还在怎么办

pnpm prune
清理没有引用的依赖

</code></pre><h2 id="想引用依赖的依赖怎么办" tabindex="-1"><a class="header-anchor" href="#想引用依赖的依赖怎么办"><span>想引用依赖的依赖怎么办</span></a></h2><p>添加一个.npmrc</p><pre><code class="language-ini">hoist=true
public-hoist-pattern[]=vue-router
//这是想要提升到node_modules文件夹的依赖

</code></pre>`,30),r=[a];function u(s,i){return o(),e("div",null,r)}const q=t(p,[["render",u],["__file","pnpm.html.vue"]]),c=JSON.parse('{"path":"/frontend/package-manager/pnpm.html","title":"pnpm教程","lang":"zh-CN","frontmatter":{"description":"pnpm教程 提示 注意,建议不要配置store-dir,这样他会在每个磁盘的根目录创建.pnpm-store文件夹来存储缓存 原因:包存储应与安装的位置处于同一驱动器和文件系统上，否则，包将被复制，而不是被链接。 这是由于硬链接的工作方式带来的一个限制，因为一个文件系统上的文件无法寻址另一个文件系统中的位置 介绍 全称performant npm(高...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/pnpm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"pnpm教程"}],["meta",{"property":"og:description","content":"pnpm教程 提示 注意,建议不要配置store-dir,这样他会在每个磁盘的根目录创建.pnpm-store文件夹来存储缓存 原因:包存储应与安装的位置处于同一驱动器和文件系统上，否则，包将被复制，而不是被链接。 这是由于硬链接的工作方式带来的一个限制，因为一个文件系统上的文件无法寻址另一个文件系统中的位置 介绍 全称performant npm(高..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img.shields.io/npm/v/pnpm.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-11T11:40:56.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-05-11T11:40:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"pnpm教程\\",\\"image\\":[\\"https://img.shields.io/npm/v/pnpm.svg\\",\\"https://img.shields.io/npm/v/yarn.svg\\"],\\"dateModified\\":\\"2024-05-11T11:40:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[{"level":3,"title":"安装全局包","slug":"安装全局包","link":"#安装全局包","children":[]}]},{"level":2,"title":"清理","slug":"清理","link":"#清理","children":[]},{"level":2,"title":"想引用依赖的依赖怎么办","slug":"想引用依赖的依赖怎么办","link":"#想引用依赖的依赖怎么办","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1715427656000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":8}]},"readingTime":{"minutes":2.55,"words":764},"filePathRelative":"frontend/package-manager/pnpm.md","localizedDate":"2022年3月21日","autoDesc":true}');export{q as comp,c as data};
