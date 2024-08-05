import{_ as r,c as n,o,d as e}from"./app-CbULZrmi.js";const a={},s=e(`<h1 id="linux的node配置" tabindex="-1"><a class="header-anchor" href="#linux的node配置"><span>linux的node配置</span></a></h1><p>问题 usr/bin/env: &quot;node&quot;: 没有那个文件或目录</p><p>手动创建软连接</p><pre><code class="language-bash">sudo ln -s \`which node\` /usr/bin/node
</code></pre><p>或者:</p><pre><code class="language-bash">sudo ln -s /usr/bin/nodejs /usr/bin/node
</code></pre><p>cli常用命令</p><p><strong>yarn add 添加依赖包</strong></p><pre><code class="language-bash">yarn add webpack  安装 latest   最新版本
yarn add package-name@1.2.3    从 registry 里安装这个包的指定版本。
yarn add package-name@tag      安装某个 “tag” 标识的版本（比如 beta、next 或者 latest）
</code></pre><p><strong>yarn cache 全局缓冲</strong></p><pre><code class="language-bash">yarn cache list 列出已缓存的每个包
yarn cache dir  当前的 yarn 全局缓存在哪里
yarn cache clean  运行此命令将清除全局缓存
yarn config set cache-folder &lt;path&gt; 配置缓存目录。
</code></pre><p><strong>yarn config 配置文件</strong></p><pre><code class="language-bash">yarn config 查看配置
 yarn config get bin-links   查看某一项配置
true
yarn config set registry &#39;https://registry.npm.taobao.org&#39;  转成淘宝镜像
</code></pre><p><strong>yarn global 全局安装</strong></p><pre><code class="language-bash">// yarn 默认是不建议全局安装的，因为全局安装的包无法通过.lock来捕获到，当你的项目移到别的地方运行的时候就可能出现问题
yarn global add webpack
yarn global upgrade webpack
yarn global remove webpack
</code></pre><p><strong>yarn info 查看包的信息</strong></p><pre><code class="language-bash">yarn info react 
yarn info react --json json化一下
yarn info react@15.3.0  查看指定版本
</code></pre><p><strong>yarn install 安装全部依赖</strong></p><pre><code>yarn install
或者
yarn
</code></pre><p><strong>yarn remove 移除依赖</strong></p><pre><code>yarn remove webpack
</code></pre><p><strong>yarn run 运行一个定义好的脚本</strong></p><pre><code class="language-json">{
  &quot;name&quot;: &quot;my-package&quot;,
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;babel src -d lib&quot;,
    &quot;test&quot;: &quot;jest&quot;
  }
}
</code></pre><p><strong>yarn upgrade 更新</strong></p><pre><code class="language-bash">yarn upgrade
yarn upgrade left-pad
yarn upgrade left-pad@^1.0.0
</code></pre><p><strong>yarn why 显示一个包为何要安装</strong></p><pre><code class="language-bash">yarn why jest
</code></pre><p><strong>yarn publish 发布自己的包</strong></p><p><strong>yarn init 初始化一个项目</strong> 在系统<code>System.getProperty(&quot;user.home&quot;)</code>目录新建.npmrc文件,写入下面的内容</p><pre><code class="language-bash">registry=https://registry.npmmirror.com
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

</code></pre><pre><code class="language-bash">yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://npmmirror.com/dist/chromedriver -g
yarn config set operadriver_cdnurl https://npmmirror.com/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npmmirror.com/mirrors/fsevents -g
</code></pre><p>如果需要更改镜像可以全局安装nrm nvm yrm mirror-config-china等包 npm查找全局安装包: <code>npm root -g</code> 查看安装的所有全局包: <code>npm ls -g</code> 仅查看一级目录:<code>npm ls -g --depth 0 | grep packageName --depth 0</code> yarn查找全局安装包: <code>yarn global dir</code> 配置文件位置 :<code>c:\\Users\\用户名\\</code>  名称: <code>.npmrc .yarnrc</code> 问题描述： npm 和  yarn 的一些缓存和全局安装的包，默认都会在C盘存储，这个对于C盘的宝贵空间来说，实在是不能忍啊。 于是乎，百度了如何改变npm默认的缓存位置 在CMD命令行中执行</p><h1 id="_1-改变npm-全局安装位置" tabindex="-1"><a class="header-anchor" href="#_1-改变npm-全局安装位置"><span>1.改变npm 全局安装位置</span></a></h1><pre><code class="language-bash">npm config set prefix &quot;你的磁盘路径&quot;
</code></pre><h1 id="这里是我的路径" tabindex="-1"><a class="header-anchor" href="#这里是我的路径"><span>这里是我的路径</span></a></h1><pre><code class="language-bash">npm config set prefix &quot;D:\\appCache\\nodejs\\node_global&quot;
</code></pre><h1 id="_2-改变-npm-缓存位置" tabindex="-1"><a class="header-anchor" href="#_2-改变-npm-缓存位置"><span>2. 改变 npm 缓存位置</span></a></h1><pre><code class="language-bash">npm config set cache &quot;你的磁盘路径&quot;
</code></pre><h1 id="这里是我的路径-1" tabindex="-1"><a class="header-anchor" href="#这里是我的路径-1"><span>这里是我的路径</span></a></h1><pre><code class="language-bash">npm config set cache &quot;D:\\appCache\\nodejs\\node_cache&quot;
</code></pre><p>然后配置一下系统环境变量 将 <code>D:\\appCache\\nodejs\\node_global</code>和 <code>D:\\appCache\\nodejs\\node_global\\node_modules</code>这两个添加到你的系统环境变量中。 Yarn 的安装： 在官网下载 安装包。 修改全局安装位置 和 缓存位置 在CMD命令行中执行</p><h1 id="_1-改变-yarn-全局安装位置" tabindex="-1"><a class="header-anchor" href="#_1-改变-yarn-全局安装位置"><span>1.改变 yarn 全局安装位置</span></a></h1><pre><code class="language-bash">yarn config  set global-folder &quot;你的磁盘路径&quot;
</code></pre><h1 id="_2-然后你会在你的用户目录找到-yarnrc-的文件-打开它-找到-global-folder-改为-global-folder" tabindex="-1"><a class="header-anchor" href="#_2-然后你会在你的用户目录找到-yarnrc-的文件-打开它-找到-global-folder-改为-global-folder"><span>2.然后你会在你的用户目录找到 <code>.yarnrc</code> 的文件，打开它，找到 <code>global-folder</code> ，改为 <code>--global-folder</code></span></a></h1><h1 id="这里是我的路径-2" tabindex="-1"><a class="header-anchor" href="#这里是我的路径-2"><span>这里是我的路径</span></a></h1><pre><code class="language-bash">yarn config set global-folder &quot;D:\\appCache\\yarn\\global&quot;
</code></pre><h1 id="_2-改变-yarn-缓存位置" tabindex="-1"><a class="header-anchor" href="#_2-改变-yarn-缓存位置"><span>2. 改变 yarn 缓存位置</span></a></h1><pre><code class="language-bash">yarn config cache-folder &quot;你的磁盘路径&quot;
</code></pre><h1 id="这里是我的路径-3" tabindex="-1"><a class="header-anchor" href="#这里是我的路径-3"><span>这里是我的路径</span></a></h1><pre><code class="language-bash">yarn config cache-folder &quot;D:\\appCache\\yarn\\cache&quot;
</code></pre><p>在我们使用 全局安装 包的时候，会在 <code>“D:\\appCache\\yarn\\global”</code>下 生成 node_modules.bin 目录 我们需要将<code>D:\\appCache\\yarn\\global\\node_modules\\.bin</code>整个目录 添加到系统环境变量中去，否则通过yarn 添加的全局包 在cmd 中是找不到的。 检查当前yarn 的 bin的 位置</p><pre><code class="language-bash">yarn global bin
</code></pre><p>检查当前 yarn 的 全局安装位置</p><pre><code class="language-bash">yarn global dir
</code></pre><p>nvm设置镜像</p><pre><code class="language-bash">nvm 设置淘宝镜像
windows版本
设置npm_mirror:
nvm npm_mirror https://npmmirror.com/mirrors/npm/

设置node_mirror:
nvm node_mirror https://npmmirror.com/mirrors/node/
</code></pre><pre><code>linux版本
在.bashrc中添加下面的内容
export NVM_NODEJS_ORG_MIRROR=http://npmmirror.com/mirrors/node
</code></pre>`,57),t=[s];function i(p,c){return o(),n("div",null,t)}const d=r(a,[["render",i],["__file","linux-nodejs.html.vue"]]),l=JSON.parse('{"path":"/linux-tutor/linux-tips/linux-nodejs.html","title":"linux的node配置","lang":"zh-CN","frontmatter":{"description":"linux的node配置 问题 usr/bin/env: \\"node\\": 没有那个文件或目录 手动创建软连接 或者: cli常用命令 yarn add 添加依赖包 yarn cache 全局缓冲 yarn config 配置文件 yarn global 全局安装 yarn info 查看包的信息 yarn install 安装全部依赖 yarn rem...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/linux-nodejs.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"linux的node配置"}],["meta",{"property":"og:description","content":"linux的node配置 问题 usr/bin/env: \\"node\\": 没有那个文件或目录 手动创建软连接 或者: cli常用命令 yarn add 添加依赖包 yarn cache 全局缓冲 yarn config 配置文件 yarn global 全局安装 yarn info 查看包的信息 yarn install 安装全部依赖 yarn rem..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-26T13:49:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-26T13:49:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"linux的node配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-26T13:49:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1701006586000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":4.11,"words":1232},"filePathRelative":"linux-tutor/linux-tips/linux-nodejs.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,l as data};
