import{_ as r,c as n,o,d as e}from"./app-CbULZrmi.js";const t={},i=e(`<h1 id="npm的使用" tabindex="-1"><a class="header-anchor" href="#npm的使用"><span>npm的使用</span></a></h1><h2 id="node使用国内镜像" tabindex="-1"><a class="header-anchor" href="#node使用国内镜像"><span>node使用国内镜像</span></a></h2><p>假设已经安装好了npm,则需要更改代理 <code>npm i -g mirror-config-china</code> 他会在<code>$home</code> 目录生成一个.npmrc文件,配置代理</p><pre><code class="language-bash">registry=https://registry.npmmirror.com
disturl=https://npmmirror.com/dist
chromedriver-cdnurl=https://npmmirror.com/mirrors/chromedriver
couchbase-binary-host-mirror=https://npmmirror.com/mirrors/couchbase/v{version}
debug-binary-host-mirror=https://npmmirror.com/mirrors/node-inspector
electron-mirror=https://npmmirror.com/mirrors/electron/
flow-bin-binary-host-mirror=https://npmmirror.com/mirrors/flow/v
fse-binary-host-mirror=https://npmmirror.com/mirrors/fsevents
fuse-bindings-binary-host-mirror=https://npmmirror.com/mirrors/fuse-bindings/v{version}
git4win-mirror=https://npmmirror.com/mirrors/git-for-windows
gl-binary-host-mirror=https://npmmirror.com/mirrors/gl/v{version}
grpc-node-binary-host-mirror=https://npmmirror.com/mirrors
hackrf-binary-host-mirror=https://npmmirror.com/mirrors/hackrf/v{version}
leveldown-binary-host-mirror=https://npmmirror.com/mirrors/leveldown/v{version}
leveldown-hyper-binary-host-mirror=https://npmmirror.com/mirrors/leveldown-hyper/v{version}
mknod-binary-host-mirror=https://npmmirror.com/mirrors/mknod/v{version}
node-sqlite3-binary-host-mirror=https://npmmirror.com/mirrors
node-tk5-binary-host-mirror=https://npmmirror.com/mirrors/node-tk5/v{version}
nodegit-binary-host-mirror=https://npmmirror.com/mirrors/nodegit/v{version}/
operadriver-cdnurl=https://npmmirror.com/mirrors/operadriver
phantomjs-cdnurl=https://npmmirror.com/mirrors/phantomjs
profiler-binary-host-mirror=https://npmmirror.com/mirrors/node-inspector/
puppeteer-download-host=https://npmmirror.com/mirrors
python-mirror=https://npmmirror.com/mirrors/python
rabin-binary-host-mirror=https://npmmirror.com/mirrors/rabin/v{version}
sass-binary-site=https://npmmirror.com/mirrors/node-sass
sodium-prebuilt-binary-host-mirror=https://npmmirror.com/mirrors/sodium-prebuilt/v{version}
sqlite3-binary-site=https://npmmirror.com/mirrors/sqlite3
utf-8-validate-binary-host-mirror=https://npmmirror.com/mirrors/utf-8-validate/v{version}
utp-native-binary-host-mirror=https://npmmirror.com/mirrors/utp-native/v{version}
zmq-prebuilt-binary-host-mirror=https://npmmirror.com/mirrors/zmq-prebuilt/v{version}

</code></pre><h2 id="全局包位置" tabindex="-1"><a class="header-anchor" href="#全局包位置"><span>全局包位置</span></a></h2><p>npm全局包位置 <code>AppData\\Roaming\\npm</code></p><h2 id="npm用法" tabindex="-1"><a class="header-anchor" href="#npm用法"><span>npm用法</span></a></h2><h3 id="npm安装包" tabindex="-1"><a class="header-anchor" href="#npm安装包"><span>npm安装包</span></a></h3><ol><li>直接通过用户名安装</li></ol><pre><code>#   直接利用用户名与仓库名进行安装
npm install RobinCK/vue-ls
#   或者为了提醒自己，加上github前缀进行区分
npm install github:RobinCK/vue-ls
</code></pre><ol start="2"><li>通过git仓库安装</li></ol><pre><code>#   这样适合安装公司内部的git服务器上的项目
npm install git+https://github.com/RobinCK/vue-ls.git#&lt;branch&gt;
#   或者以ssh的方式
npm install git+ssh://git@github.com:RobinCK/vue-ls.git#&lt;branch&gt;
</code></pre><ol start="3"><li>安装本地包</li></ol><pre><code># 本地依赖文件（相对路径）
npm install ./my-test-npm

# 本地依赖文件（相对路径）
npm i ../../../my-test-npm

# 本地依赖文件（绝对路径）
npm i e:\\my-test-npm
</code></pre><p>查看各种路径命令 查看当前npm包的全局安装路径</p><pre><code>npm prefix -g
</code></pre><p>查看配置列表</p><pre><code>npm config ls
</code></pre><p>修改路径命令 修改npm的包的全局安装路径</p><pre><code>npm config set prefix &quot;D:\\nodejs\\node_global&quot;
</code></pre><p>修改npm的包的全局cache位置</p><pre><code>npm config set cache &quot;D:/nodejs/npm_cache&quot;
</code></pre><p>配置环境变量</p><p>yarn 的安装路径和缓存路径 查看各种路径命令 查看 yarn 全局bin位置</p><pre><code>yarn global bin
</code></pre><p>查看 yarn 全局安装位置</p><pre><code>yarn global dir
</code></pre><p>查看 yarn 全局cache位置</p><pre><code>yarn cache dir
</code></pre><p>修改路径命令 改变 yarn 全局bin位置</p><pre><code>yarn config set prefix &quot;E:\\yarn\\Data&quot;
</code></pre><p>改变 yarn 全局安装位置</p><pre><code>yarn config set global-folder &quot;E:\\yarn\\Data\\global&quot;
</code></pre><p>改变 yarn 全局cache位置</p><pre><code>yarn config set cache-folder &quot;E:\\yarn\\Cache&quot;
</code></pre><p>改变 yarn 全局 link 位置</p><pre><code>yarn config set link-folder &quot;E:\\yarn\\Data\\link&quot;
</code></pre><p>或者直接在<code>~/.yarnrc</code>修改为</p><pre><code>registry &quot;https://registry.npmmirror.com/&quot;
cache-folder &quot;E:\\\\yarn\\\\Cache&quot;
global-folder &quot;E:\\\\yarn\\\\Data\\\\global&quot;
link-folder &quot;E:\\\\yarn\\\\Data\\\\link&quot;
prefix &quot;E:\\\\yarn\\\\Data&quot;

</code></pre>`,39),m=[i];function p(a,s){return o(),n("div",null,m)}const d=r(t,[["render",p],["__file","npm-conf.html.vue"]]),l=JSON.parse('{"path":"/frontend/package-manager/npm-conf.html","title":"npm的使用","lang":"zh-CN","frontmatter":{"description":"npm的使用 node使用国内镜像 假设已经安装好了npm,则需要更改代理 npm i -g mirror-config-china 他会在$home 目录生成一个.npmrc文件,配置代理 全局包位置 npm全局包位置 AppData\\\\Roaming\\\\npm npm用法 npm安装包 直接通过用户名安装 通过git仓库安装 安装本地包 查看各种路径命...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/npm-conf.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"npm的使用"}],["meta",{"property":"og:description","content":"npm的使用 node使用国内镜像 假设已经安装好了npm,则需要更改代理 npm i -g mirror-config-china 他会在$home 目录生成一个.npmrc文件,配置代理 全局包位置 npm全局包位置 AppData\\\\Roaming\\\\npm npm用法 npm安装包 直接通过用户名安装 通过git仓库安装 安装本地包 查看各种路径命..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-11T11:40:56.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-05-11T11:40:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"npm的使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-11T11:40:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"node使用国内镜像","slug":"node使用国内镜像","link":"#node使用国内镜像","children":[]},{"level":2,"title":"全局包位置","slug":"全局包位置","link":"#全局包位置","children":[]},{"level":2,"title":"npm用法","slug":"npm用法","link":"#npm用法","children":[{"level":3,"title":"npm安装包","slug":"npm安装包","link":"#npm安装包","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1715427656000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":5}]},"readingTime":{"minutes":2.22,"words":667},"filePathRelative":"frontend/package-manager/npm-conf.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,l as data};
