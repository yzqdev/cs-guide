import{_ as r,c as n,o,d as t}from"./app-CbULZrmi.js";const i={},e=t(`<h1 id="软件配置文件" tabindex="-1"><a class="header-anchor" href="#软件配置文件"><span>软件配置文件</span></a></h1><h2 id="npmrc" tabindex="-1"><a class="header-anchor" href="#npmrc"><span>.npmrc</span></a></h2><blockquote><p>路径 \${userhome}/.npmrc</p></blockquote><pre><code class="language-bash">registry=https://registry.npmmirror.com/
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
strict-ssl=false
auto-install-peers=true
</code></pre><h2 id="yarnrc-同npmrc" tabindex="-1"><a class="header-anchor" href="#yarnrc-同npmrc"><span>yarnrc (同npmrc)</span></a></h2><h2 id="condarc" tabindex="-1"><a class="header-anchor" href="#condarc"><span>.condarc</span></a></h2><pre><code class="language-bash">channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - defaults
show_channel_urls: true
default_channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
changeps1: false
auto_activate_base: false
</code></pre><h2 id="pip-ini" tabindex="-1"><a class="header-anchor" href="#pip-ini"><span>pip.ini</span></a></h2><blockquote><p>\${userhome}/pip/pip.ini</p></blockquote><pre><code class="language-bash">[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
</code></pre><h2 id="pathrc" tabindex="-1"><a class="header-anchor" href="#pathrc"><span>.pathrc</span></a></h2><pre><code class="language-bash">

export NVM_DIR=&quot;$HOME/.nvm&quot;

[ -s &quot;$NVM_DIR/nvm.sh&quot; ] &amp;&amp; \\. &quot;$NVM_DIR/nvm.sh&quot;  # This loads nvm

[ -s &quot;$NVM_DIR/bash_completion&quot; ] &amp;&amp; \\. &quot;$NVM_DIR/bash_completion&quot;  # This loads nvm bash_completion


export DENO_INSTALL=&quot;/home/yzqdev/.deno&quot;

export YARNPKG=&quot;/home/yzqdev/.yarn&quot;

export JAVA_HOME=/home/yzqdev/.jdks/jdk-17.0.2+8

 

export GOMODPATH=/opt/go

export OPENPATH=/usr/local/openresty/nginx

export PATH=&quot;$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$OPENPATH/sbin:$JAVA_HOME/bin:$DENO_INSTALL/bin:$YARNPKG/bin:$PATH&quot;
</code></pre>`,12),s=[e];function a(m,p){return o(),n("div",null,s)}const h=r(i,[["render",a],["__file","program-lang-confs.html.vue"]]),d=JSON.parse('{"path":"/windows-tutor/soft-config/program-lang-confs.html","title":"软件配置文件","lang":"zh-CN","frontmatter":{"description":"软件配置文件 .npmrc 路径 ${userhome}/.npmrc yarnrc (同npmrc) .condarc pip.ini ${userhome}/pip/pip.ini .pathrc","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/soft-config/program-lang-confs.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"软件配置文件"}],["meta",{"property":"og:description","content":"软件配置文件 .npmrc 路径 ${userhome}/.npmrc yarnrc (同npmrc) .condarc pip.ini ${userhome}/pip/pip.ini .pathrc"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-26T03:09:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-02-26T03:09:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"软件配置文件\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-26T03:09:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":".npmrc","slug":"npmrc","link":"#npmrc","children":[]},{"level":2,"title":"yarnrc (同npmrc)","slug":"yarnrc-同npmrc","link":"#yarnrc-同npmrc","children":[]},{"level":2,"title":".condarc","slug":"condarc","link":"#condarc","children":[]},{"level":2,"title":"pip.ini","slug":"pip-ini","link":"#pip-ini","children":[]},{"level":2,"title":".pathrc","slug":"pathrc","link":"#pathrc","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1677380986000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.09,"words":328},"filePathRelative":"windows-tutor/soft-config/program-lang-confs.md","localizedDate":"2022年3月21日","autoDesc":true}');export{h as comp,d as data};
