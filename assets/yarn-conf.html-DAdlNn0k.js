import{_ as e,c as r,o as t,d as a}from"./app-CbULZrmi.js";const n={},o=a(`<h1 id="yarn配置" tabindex="-1"><a class="header-anchor" href="#yarn配置"><span>yarn配置</span></a></h1><h2 id="从-create-包创建一个模板" tabindex="-1"><a class="header-anchor" href="#从-create-包创建一个模板"><span>从 <code>create-*</code> 包创建一个模板</span></a></h2><p>这个命令让你做两件事情:</p><ul><li>全局安装<code>create-&lt;starter-kit-package&gt;</code>  , 或者把这个包更新到最新版本(如果存在的话)</li><li>Run the executable located in the <code>bin</code> field of the starter kits <code>package.json</code>, forwarding any <code>&lt;args&gt;</code> to it 例如, <code>yarn create react-app my-app</code>等价于:</li></ul><pre><code class="language-bash">yarn add create-react-app
create-react-app my-app
yarn remove create-react-app
</code></pre><pre><code class="language-text">## 全局包位置

C:\\Users\\yanni\\AppData\\Local\\Yarn  (bin目录是可执行文件目录)
npm全局包位置
C:\\Users\\yanni\\AppData\\Roaming\\npm

</code></pre><p>如果使用yarn 安装node-sass失败 出现node-gyp error就在根目录下新建一个<code>.yarnrc</code> 文件 然后写入,这样就可以下载node-sass了</p><pre><code class="language-bash">
phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs
sass_binary_site https://npmmirror.com/mirrors/node-sass/
registry https://registry.npmmirror.com

</code></pre><p>其实node-sass已经弃用了,建议使用dart-sass , 命令<code>yarn add sass</code> ​</p><pre><code class="language-shell">yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/ -g
yarn config set chromedriver_cdnurl https://npmmirror.com/dist/chromedriver -g
yarn config set operadriver_cdnurl https://npmmirror.com/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npmmirror.com/mirrors/fsevents -g
</code></pre>`,10),c=[o];function s(i,p){return t(),r("div",null,c)}const m=e(n,[["render",s],["__file","yarn-conf.html.vue"]]),l=JSON.parse('{"path":"/frontend/package-manager/yarn-conf.html","title":"yarn配置","lang":"zh-CN","frontmatter":{"description":"yarn配置 从 create-* 包创建一个模板 这个命令让你做两件事情: 全局安装create-<starter-kit-package> , 或者把这个包更新到最新版本(如果存在的话) Run the executable located in the bin field of the starter kits package.json, for...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/yarn-conf.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"yarn配置"}],["meta",{"property":"og:description","content":"yarn配置 从 create-* 包创建一个模板 这个命令让你做两件事情: 全局安装create-<starter-kit-package> , 或者把这个包更新到最新版本(如果存在的话) Run the executable located in the bin field of the starter kits package.json, for..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-20T15:31:26.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-20T15:31:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"yarn配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-20T15:31:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"从 create-* 包创建一个模板","slug":"从-create-包创建一个模板","link":"#从-create-包创建一个模板","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1658331086000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":0.85,"words":255},"filePathRelative":"frontend/package-manager/yarn-conf.md","localizedDate":"2022年3月21日","autoDesc":true}');export{m as comp,l as data};
