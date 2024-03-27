import{_ as n,o as e,c as i,a as s}from"./app-BO2oONDQ.js";const t={},a=s(`<h1 id="npm的使用" tabindex="-1"><a class="header-anchor" href="#npm的使用"><span>npm的使用</span></a></h1><h2 id="node使用国内镜像" tabindex="-1"><a class="header-anchor" href="#node使用国内镜像"><span>node使用国内镜像</span></a></h2><p>假设已经安装好了npm,则需要更改代理 <code>npm i -g mirror-config-china</code> 他会在<code>$home</code> 目录生成一个.npmrc文件,配置代理</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token assign-left variable">registry</span><span class="token operator">=</span>https://registry.npmmirror.com
<span class="token assign-left variable">disturl</span><span class="token operator">=</span>https://npmmirror.com/dist
chromedriver-cdnurl<span class="token operator">=</span>https://npmmirror.com/mirrors/chromedriver
couchbase-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/couchbase/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
debug-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/node-inspector
electron-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/electron/
flow-bin-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/flow/v
fse-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/fsevents
fuse-bindings-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/fuse-bindings/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
git4win-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/git-for-windows
gl-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/gl/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
grpc-node-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors
hackrf-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/hackrf/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
leveldown-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/leveldown/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
leveldown-hyper-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/leveldown-hyper/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
mknod-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/mknod/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
node-sqlite3-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors
node-tk5-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/node-tk5/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
nodegit-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/nodegit/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>/
operadriver-cdnurl<span class="token operator">=</span>https://npmmirror.com/mirrors/operadriver
phantomjs-cdnurl<span class="token operator">=</span>https://npmmirror.com/mirrors/phantomjs
profiler-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/node-inspector/
puppeteer-download-host<span class="token operator">=</span>https://npmmirror.com/mirrors
python-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/python
rabin-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/rabin/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
sass-binary-site<span class="token operator">=</span>https://npmmirror.com/mirrors/node-sass
sodium-prebuilt-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/sodium-prebuilt/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
sqlite3-binary-site<span class="token operator">=</span>https://npmmirror.com/mirrors/sqlite3
utf-8-validate-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/utf-8-validate/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
utp-native-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/utp-native/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>
zmq-prebuilt-binary-host-mirror<span class="token operator">=</span>https://npmmirror.com/mirrors/zmq-prebuilt/v<span class="token punctuation">{</span>version<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局包位置" tabindex="-1"><a class="header-anchor" href="#全局包位置"><span>全局包位置</span></a></h2><p>npm全局包位置 <code>AppData\\Roaming\\npm</code></p><h2 id="npm用法" tabindex="-1"><a class="header-anchor" href="#npm用法"><span>npm用法</span></a></h2><h3 id="npm安装包" tabindex="-1"><a class="header-anchor" href="#npm安装包"><span>npm安装包</span></a></h3><ol><li>直接通过用户名安装</li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#   直接利用用户名与仓库名进行安装
npm install RobinCK/vue-ls
#   或者为了提醒自己，加上github前缀进行区分
npm install github:RobinCK/vue-ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>通过git仓库安装</li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#   这样适合安装公司内部的git服务器上的项目
npm install git+https://github.com/RobinCK/vue-ls.git#&lt;branch&gt;
#   或者以ssh的方式
npm install git+ssh://git@github.com:RobinCK/vue-ls.git#&lt;branch&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>安装本地包</li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 本地依赖文件（相对路径）
npm install ./my-test-npm

# 本地依赖文件（相对路径）
npm i ../../../my-test-npm

# 本地依赖文件（绝对路径）
npm i e:\\my-test-npm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看各种路径命令 查看当前npm包的全局安装路径</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>npm prefix -g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看配置列表</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>npm config ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改路径命令 修改npm的包的全局安装路径</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>npm config set prefix &quot;D:\\nodejs\\node_global&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改npm的包的全局cache位置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>npm config set cache &quot;D:/nodejs/npm_cache&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置环境变量</p><p>yarn 的安装路径和缓存路径 查看各种路径命令 查看 yarn 全局bin位置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>yarn global bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 yarn 全局安装位置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>yarn global dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 yarn 全局cache位置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>yarn cache dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改路径命令 改变 yarn 全局bin位置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>yarn config set prefix &quot;E:\\yarn\\Data&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>改变 yarn 全局安装位置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>yarn config set global-folder &quot;E:\\yarn\\Data\\global&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>改变 yarn 全局cache位置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>yarn config set cache-folder &quot;E:\\yarn\\Cache&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>改变 yarn 全局 link 位置</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>yarn config set link-folder &quot;E:\\yarn\\Data\\link&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者直接在<code>~/.yarnrc</code>修改为</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>registry &quot;https://registry.npmmirror.com/&quot;
cache-folder &quot;E:\\\\yarn\\\\Cache&quot;
global-folder &quot;E:\\\\yarn\\\\Data\\\\global&quot;
link-folder &quot;E:\\\\yarn\\\\Data\\\\link&quot;
prefix &quot;E:\\\\yarn\\\\Data&quot;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>yarn global的package.json</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{

  &quot;dependencies&quot;: {

    &quot;@ant-design/pro-cli&quot;: &quot;^3.1.0&quot;,

    &quot;@antfu/ni&quot;: &quot;^0.21.8&quot;,

    &quot;@ionic/cli&quot;: &quot;^7.1.1&quot;,

    &quot;@nestjs/cli&quot;: &quot;^10.1.18&quot;,

    &quot;@nestjs/schematics&quot;: &quot;^10.0.2&quot;,

    &quot;@quasar/cli&quot;: &quot;^2.3.0&quot;,

    &quot;@tarojs/cli&quot;: &quot;^3.6.17&quot;,

    &quot;@vue/cli&quot;: &quot;^5.0.8&quot;,

    &quot;@vue/devtools&quot;: &quot;^6.5.0&quot;,

    &quot;@zhinjs/cli&quot;: &quot;^0.2.33&quot;,

    &quot;alloy&quot;: &quot;^2.0.2&quot;,

    &quot;arco-cli&quot;: &quot;^1.27.5&quot;,

    &quot;bozon&quot;: &quot;^1.3.5&quot;,

    &quot;create-ant-design-pro&quot;: &quot;^0.4.1&quot;,

    &quot;create-astro&quot;: &quot;^4.2.1&quot;,

    &quot;create-docusaurus&quot;: &quot;^2.4.3&quot;,

    &quot;create-electron-app&quot;: &quot;^6.4.2&quot;,

    &quot;create-electron-vite&quot;: &quot;^0.4.0&quot;,

    &quot;create-father&quot;: &quot;^4.3.5&quot;,

    &quot;create-ice&quot;: &quot;^1.9.1&quot;,

    &quot;create-ink-app&quot;: &quot;^3.0.2&quot;,

    &quot;create-midway&quot;: &quot;^1.2.2&quot;,

    &quot;create-monkey&quot;: &quot;^1.35.0&quot;,

    &quot;create-next-app&quot;: &quot;^13.5.3&quot;,

    &quot;create-preact&quot;: &quot;^0.2.1&quot;,

    &quot;create-quasar&quot;: &quot;^1.4.4&quot;,

    &quot;create-remix&quot;: &quot;^2.0.1&quot;,

    &quot;create-solid&quot;: &quot;^0.3.6&quot;,

    &quot;create-storybook&quot;: &quot;^1.0.0&quot;,

    &quot;create-strapi-app&quot;: &quot;^4.13.7&quot;,

    &quot;create-svelte&quot;: &quot;^5.1.0&quot;,

    &quot;create-t3-app&quot;: &quot;^7.20.2&quot;,

    &quot;create-tauri-app&quot;: &quot;^3.7.3&quot;,

    &quot;create-umi&quot;: &quot;^4.0.81&quot;,

    &quot;create-vite&quot;: &quot;^4.4.1&quot;,

    &quot;create-vite-extra&quot;: &quot;^1.1.0&quot;,

    &quot;create-vue&quot;: &quot;^3.7.5&quot;,

    &quot;create-vuepress-theme-hope&quot;: &quot;^2.0.0-beta.238&quot;,

    &quot;fastify-cli&quot;: &quot;^5.8.0&quot;,

    &quot;hexo-cli&quot;: &quot;^4.3.1&quot;,

    &quot;native-run&quot;: &quot;^1.7.3&quot;,

    &quot;npm-home&quot;: &quot;^3.0.1&quot;,

    &quot;pm2&quot;: &quot;^5.3.0&quot;,

    &quot;pnpm&quot;: &quot;^8.9.0&quot;,

    &quot;prettier&quot;: &quot;^3.0.3&quot;,

    &quot;pug&quot;: &quot;^3.0.2&quot;,

    &quot;react-devtools&quot;: &quot;^4.28.0&quot;,

    &quot;sass-migrator&quot;: &quot;^1.7.3&quot;,

    &quot;serve&quot;: &quot;^14.2.1&quot;,

    &quot;stylus&quot;: &quot;^0.60.0&quot;,

    &quot;taze&quot;: &quot;^0.11.2&quot;,

    &quot;titanium&quot;: &quot;^6.1.1&quot;,

    &quot;typescript&quot;: &quot;^5.2.2&quot;,

    &quot;verdaccio&quot;: &quot;^5.26.3&quot;,

    &quot;yrm&quot;: &quot;^1.0.6&quot;

  }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41),r=[a];function o(l,d){return e(),i("div",null,r)}const c=n(t,[["render",o],["__file","npm-conf.html.vue"]]),m=JSON.parse('{"path":"/frontend/package-manager/npm-conf.html","title":"npm的使用","lang":"zh-CN","frontmatter":{"description":"npm的使用 node使用国内镜像 假设已经安装好了npm,则需要更改代理 npm i -g mirror-config-china 他会在$home 目录生成一个.npmrc文件,配置代理 全局包位置 npm全局包位置 AppData\\\\Roaming\\\\npm npm用法 npm安装包 直接通过用户名安装 通过git仓库安装 安装本地包 查看各种路径命...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/npm-conf.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"npm的使用"}],["meta",{"property":"og:description","content":"npm的使用 node使用国内镜像 假设已经安装好了npm,则需要更改代理 npm i -g mirror-config-china 他会在$home 目录生成一个.npmrc文件,配置代理 全局包位置 npm全局包位置 AppData\\\\Roaming\\\\npm npm用法 npm安装包 直接通过用户名安装 通过git仓库安装 安装本地包 查看各种路径命..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-15T03:10:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-10-15T03:10:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"npm的使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-15T03:10:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"node使用国内镜像","slug":"node使用国内镜像","link":"#node使用国内镜像","children":[]},{"level":2,"title":"全局包位置","slug":"全局包位置","link":"#全局包位置","children":[]},{"level":2,"title":"npm用法","slug":"npm用法","link":"#npm用法","children":[{"level":3,"title":"npm安装包","slug":"npm安装包","link":"#npm安装包","children":[]}]}],"git":{"createdTime":1651302457000,"updatedTime":1697339432000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":2.76,"words":829},"filePathRelative":"frontend/package-manager/npm-conf.md","localizedDate":"2022年4月30日","autoDesc":true}');export{c as comp,m as data};
