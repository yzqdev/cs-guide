import{_ as t,c as e,o,d as l}from"./app-CbULZrmi.js";const i={},n=l(`<h1 id="ssr-ubuntu-客户端" tabindex="-1"><a class="header-anchor" href="#ssr-ubuntu-客户端"><span>SSR Ubuntu 客户端</span></a></h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><ul><li>因为某些原因，这个东西不做过多解释</li></ul><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><ul><li>需要 Git 环境： <code>sudo apt-get install git</code>&gt;\`</li><li>需要 Python 2 环境：<code>sudo apt-get install python</code></li><li>官网脚本： https://github.com/the0demiurge/CharlesScripts/blob/master/charles/bin/ssr</li><li>我们这里使用别人提供的文件，如果该文件被屏蔽，就自行用上面官网的文件。</li></ul><pre><code>wget http://www.djangoz.com/ssr

sudo mv ssr /usr/local/bin

sudo chmod 766 /usr/local/bin/ssr

ssr install
</code></pre><ul><li>配置：<code>ssr config</code><ul><li>这是一个 vim 的配置界面，也可以直接编辑其源文件：</li></ul></li><li>主要修改如下内容：</li></ul><pre><code>&quot;server&quot;:&quot;12.26.68.99&quot;,        //服务器ip
&quot;server_port&quot;:9191,        //端口
&quot;password&quot;:&quot;123456&quot;,       //密码
&quot;protocol&quot;:&quot;auth_sha1_v4&quot;, //协议插件
&quot;obfs&quot;:&quot;http_simple&quot;,      //混淆插件
&quot;method&quot;:&quot;aes-256-cfb&quot;,    //加密方式
</code></pre><ul><li>启动：<code>ssr start</code></li><li>其他常用命令： <ul><li><code>ssr stop</code></li><li><code>ssr help</code></li></ul></li><li>然后就可以用 Chrome 的 SwitchyOmega</li><li>AutoProxy：https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt</li></ul><h2 id="配置终端代理-polipo" tabindex="-1"><a class="header-anchor" href="#配置终端代理-polipo"><span>配置终端代理 polipo</span></a></h2><ul><li>安装：<code>sudo apt-get install polipo</code></li><li>修改配置（一般不要变动，直接复制上去即可）：<code>sudo vim /etc/polipo/config</code></li></ul><pre><code># This file only needs to list configuration variables that deviate  
# from the default values.  See /usr/share/doc/polipo/examples/config.sample  
# and &quot;polipo -v&quot; for variables you can tweak and further information.  
  
logSyslog = true  
logFile = /var/log/polipo/polipo.log  
  
proxyAddress = &quot;0.0.0.0&quot;  
  
socksParentProxy = &quot;127.0.0.1:1080&quot;  
socksProxyType = socks5  
  
chunkHighMark = 50331648  
objectHighMark = 16384  
  
serverMaxSlots = 64  
serverSlots = 16  
serverSlots1 = 32  
</code></pre><ul><li>重启：<code>sudo service polipo restart</code></li></ul><h4 id="开始测试-polipo" tabindex="-1"><a class="header-anchor" href="#开始测试-polipo"><span>开始测试 polipo</span></a></h4><ul><li><p>获取自己当前 IP：<code>curl ip.gs</code></p><ul><li>这时候应该是国内 IP</li></ul></li><li><p><strong>开始使用代理</strong>：<code>export http_proxy=http://127.0.0.1:8123</code></p></li><li><p>获取自己当前 IP：<code>curl ip.gs</code></p><ul><li>这时候应该是国外 IP</li></ul></li><li><p><strong>取消代理</strong>：<code>unset http_proxy</code></p></li><li><p>获取自己当前 IP：<code>curl ip.gs</code></p><ul><li>这时候应该是国内 IP</li></ul></li><li><p>另外：在浏览器中输入 <a href="http://127.0.0.1:8123/" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8123/</a> 便可以进入到 Polipo 的使用说明和配置界面。</p></li></ul><h2 id="材料" tabindex="-1"><a class="header-anchor" href="#材料"><span>材料</span></a></h2><ul><li><a href="https://www.jianshu.com/p/a0f3268bfa33" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/a0f3268bfa33</a></li></ul>`,17),r=[n];function s(a,p){return o(),e("div",null,r)}const c=t(i,[["render",s],["__file","SSR-Client-Ubuntu.html.vue"]]),d=JSON.parse('{"path":"/linux-tutor/server/SSR-Client-Ubuntu.html","title":"SSR Ubuntu 客户端","lang":"zh-CN","frontmatter":{"description":"SSR Ubuntu 客户端 介绍 因为某些原因，这个东西不做过多解释 安装 需要 Git 环境： sudo apt-get install git>` 需要 Python 2 环境：sudo apt-get install python 官网脚本： https://github.com/the0demiurge/CharlesScripts/blob...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/SSR-Client-Ubuntu.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"SSR Ubuntu 客户端"}],["meta",{"property":"og:description","content":"SSR Ubuntu 客户端 介绍 因为某些原因，这个东西不做过多解释 安装 需要 Git 环境： sudo apt-get install git>` 需要 Python 2 环境：sudo apt-get install python 官网脚本： https://github.com/the0demiurge/CharlesScripts/blob..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SSR Ubuntu 客户端\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"配置终端代理 polipo","slug":"配置终端代理-polipo","link":"#配置终端代理-polipo","children":[{"level":4,"title":"开始测试 polipo","slug":"开始测试-polipo","link":"#开始测试-polipo","children":[]}]},{"level":2,"title":"材料","slug":"材料","link":"#材料","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.31,"words":394},"filePathRelative":"linux-tutor/server/SSR-Client-Ubuntu.md","localizedDate":"2022年5月26日","autoDesc":true}');export{c as comp,d as data};
