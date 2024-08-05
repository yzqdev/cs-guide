import{_ as t,c as o,o as e,d as u}from"./app-CbULZrmi.js";const q={},n=u(`<h1 id="yarn4用法" tabindex="-1"><a class="header-anchor" href="#yarn4用法"><span>yarn4用法</span></a></h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>需要用到corepack,先启用corepack</p><p>每次都会自动添加packageManager,推荐设置环境变量COREPACK_ENABLE_STRICT=0和COREPACK_ENABLE_AUTO_PIN=0</p><p>https://github.com/nodejs/corepack</p><pre><code>corepack enable
# 然后安装yarn
corepack prepare yarn@stable --activate
# 看一下yarn版本

yarn -v

</code></pre><p>安装完成后,因为yarn默认使用pnp模式,没有node_modules,所以需要更改nodeLinker 在<code>~/.yarnrc.yml</code>中添加</p><pre><code class="language-yml">npmRegistryServer: &quot;https://registry.npmmirror.com/&quot;
nodeLinker: &quot;node-modules&quot;
</code></pre><p>这样就是全局生效的了</p><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><pre><code class="language-powershell">yarn dlx create-vite


# yarn global 命令被移除了,所以推荐 使用pnpm安装全局包,开发cli命令行


</code></pre><p>全局包</p><pre><code class="language-json">{
 &quot;dependencies&quot;: {
 
  &quot;pm2&quot;: &quot;^5.3.0&quot;,
  &quot;taze&quot;: &quot;^0.12.0&quot;,
  &quot;@ant-design/pro-cli&quot;: &quot;^3.1.0&quot;,
    &quot;@antfu/ni&quot;: &quot;^0.21.8&quot;,
    &quot;@ionic/cli&quot;: &quot;^7.1.1&quot;,
    &quot;@nestjs/cli&quot;: &quot;^10.1.18&quot;,
    &quot;@nestjs/schematics&quot;: &quot;^10.0.2&quot;,
    &quot;@quasar/cli&quot;: &quot;^2.3.0&quot;,
    &quot;@tarojs/cli&quot;: &quot;^3.6.17&quot;,
    &quot;@vue/cli&quot;: &quot;^5.0.8&quot;,
   
    &quot;@zhinjs/cli&quot;: &quot;^0.2.33&quot;,
    &quot;alloy&quot;: &quot;^2.0.2&quot;,
    &quot;arco-cli&quot;: &quot;^1.27.5&quot;,
     
    &quot;create-ant-design-pro&quot;: &quot;^0.4.1&quot;,
    &quot;create-astro&quot;: &quot;^4.2.1&quot;,
    &quot;create-docusaurus&quot;: &quot;^3.0.0-rc.1&quot;,
    &quot;create-electron-app&quot;: &quot;^6.4.2&quot;,
    &quot;create-electron-vite&quot;: &quot;^0.4.0&quot;,
    &quot;create-father&quot;: &quot;^4.3.5&quot;,
    &quot;create-ice&quot;: &quot;^1.9.1&quot;,
    &quot;create-ink-app&quot;: &quot;^3.0.2&quot;,
    &quot;create-midway&quot;: &quot;^1.2.3&quot;,
    &quot;create-monkey&quot;: &quot;^1.35.0&quot;,
    &quot;create-next-app&quot;: &quot;^14.0.0&quot;,
    &quot;create-preact&quot;: &quot;^0.2.2&quot;,
    &quot;create-quasar&quot;: &quot;^1.4.4&quot;,
    &quot;create-remix&quot;: &quot;^2.0.1&quot;,
    &quot;create-solid&quot;: &quot;^0.3.6&quot;,
    &quot;create-storybook&quot;: &quot;^1.0.0&quot;,
    &quot;create-strapi-app&quot;: &quot;^4.14.4&quot;,
    &quot;create-svelte&quot;: &quot;^5.1.1&quot;,
    &quot;create-t3-app&quot;: &quot;^7.21.0&quot;,
    &quot;create-tauri-app&quot;: &quot;^3.9.0&quot;,
    &quot;create-umi&quot;: &quot;^4.0.86&quot;,
    &quot;create-vite&quot;: &quot;^4.4.1&quot;,
    &quot;create-vite-extra&quot;: &quot;^1.1.0&quot;,
    &quot;create-vuepress-theme-hope&quot;: &quot;^2.0.0-beta.239&quot;,
    &quot;dotenv-cli&quot;: &quot;^7.3.0&quot;,
    &quot;fastify-cli&quot;: &quot;^5.8.0&quot;,
    &quot;hexo-cli&quot;: &quot;^4.3.1&quot;,
    &quot;native-run&quot;: &quot;^1.7.3&quot;,
    &quot;node-gyp&quot;: &quot;^9.4.1&quot;,
    &quot;npkill&quot;: &quot;^0.11.3&quot;,
    &quot;npm-home&quot;: &quot;^3.0.1&quot;,
    
    &quot;prettier&quot;: &quot;^3.0.3&quot;,
    &quot;pug&quot;: &quot;^3.0.2&quot;,
   
    &quot;react-native&quot;: &quot;^0.72.6&quot;,
    &quot;rimraf&quot;: &quot;^5.0.5&quot;,
    &quot;sass-migrator&quot;: &quot;^1.7.3&quot;,
    &quot;serve&quot;: &quot;^14.2.1&quot;,
    &quot;stylus&quot;: &quot;^0.60.0&quot;,
    
    &quot;titanium&quot;: &quot;^6.1.1&quot;,
    &quot;typescript&quot;: &quot;^5.2.2&quot;,
    &quot;verdaccio&quot;: &quot;^5.27.0&quot;,
    &quot;yrm&quot;: &quot;^1.0.6&quot;
 }
}

</code></pre>`,13),a=[n];function r(c,p){return e(),o("div",null,a)}const s=t(q,[["render",r],["__file","yarn-berry.html.vue"]]),l=JSON.parse('{"path":"/frontend/package-manager/yarn-berry.html","title":"yarn4用法","lang":"zh-CN","frontmatter":{"description":"yarn4用法 安装 需要用到corepack,先启用corepack 每次都会自动添加packageManager,推荐设置环境变量COREPACK_ENABLE_STRICT=0和COREPACK_ENABLE_AUTO_PIN=0 https://github.com/nodejs/corepack 安装完成后,因为yarn默认使用pnp模式,没...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/yarn-berry.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"yarn4用法"}],["meta",{"property":"og:description","content":"yarn4用法 安装 需要用到corepack,先启用corepack 每次都会自动添加packageManager,推荐设置环境变量COREPACK_ENABLE_STRICT=0和COREPACK_ENABLE_AUTO_PIN=0 https://github.com/nodejs/corepack 安装完成后,因为yarn默认使用pnp模式,没..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-26T05:15:13.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-26T05:15:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"yarn4用法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-26T05:15:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]}],"git":{"createdTime":1699125957000,"updatedTime":1714108513000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.01,"words":303},"filePathRelative":"frontend/package-manager/yarn-berry.md","localizedDate":"2023年11月4日","autoDesc":true}');export{s as comp,l as data};
