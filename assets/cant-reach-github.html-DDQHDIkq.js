import{_ as n,c as e,a,o as t}from"./app-C8DxhDIZ.js";const i="/cs-guide/assets/dns-CLShZ9yi.png",l="/cs-guide/assets/ipaddress-hq-U8f35.png",r="/cs-guide/assets/hosts-CWPwzTyJ.png",p={};function c(o,s){return t(),e("div",null,s[0]||(s[0]=[a('<h1 id="github无法访问" tabindex="-1"><a class="header-anchor" href="#github无法访问"><span>github无法访问</span></a></h1><p>首先添加谷歌的dns服务 在windows上打开<code>控制面板\\网络和 Internet\\网络连接</code> 在dns添加<code>8.8.8.8</code>和<code>8.8.4.4</code><br><img src="'+i+`" alt="dns"></p><h2 id="最好的方案fastgithub" tabindex="-1"><a class="header-anchor" href="#最好的方案fastgithub"><span>最好的方案fastgithub</span></a></h2><p><a href="https://github.com/dotnetcore/FastGithub" target="_blank" rel="noopener noreferrer">https://github.com/dotnetcore/FastGithub</a></p><h3 id="linux-x64终端" tabindex="-1"><a class="header-anchor" href="#linux-x64终端"><span>linux-x64终端</span></a></h3><ul><li><code>sudo ./fastgithub</code></li><li>设置系统自动代理为<code>http://127.0.0.1:38457</code>，或手动代理http/https为<code>127.0.0.1:38457</code></li></ul><h3 id="linux-x64服务" tabindex="-1"><a class="header-anchor" href="#linux-x64服务"><span>linux-x64服务</span></a></h3><ul><li><code>sudo ./fastgithub start</code> // 以systemd服务安装并启动</li><li><code>sudo ./fastgithub stop</code> // 以systemd服务卸载并删除</li><li>设置系统自动代理为<code>http://127.0.0.1:38457</code>，或手动代理http/https为<code>127.0.0.1:38457</code></li></ul><p>可以自己写一个脚本来启动fastgithub</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">nohup</span> /opt/fastgithub_linux-x64/fastgithub <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>    <span class="token comment">#将程序挂载后台运行且不输出日志文件</span></span>
<span class="line"><span class="token comment"># 配置自动代理</span></span>
<span class="line"><span class="token comment"># 编辑 /etc/profile ,加上下面的内容</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:38457</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>http://127.0.0.1:38457</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="使用steam-加速" tabindex="-1"><a class="header-anchor" href="#使用steam-加速"><span>使用steam++加速</span></a></h2><p>地址在这里<br><a href="https://steampp.net/" target="_blank" rel="noopener noreferrer">https://steampp.net/</a></p><h2 id="使用hellogithub生成" tabindex="-1"><a class="header-anchor" href="#使用hellogithub生成"><span>使用hellogithub生成</span></a></h2><p><a href="https://github.com/521xueweihan/GitHub520" target="_blank" rel="noopener noreferrer">https://github.com/521xueweihan/GitHub520</a></p><h2 id="手动设置ip" tabindex="-1"><a class="header-anchor" href="#手动设置ip"><span>手动设置ip</span></a></h2><p>反复打开这几个地址: <a href="https://github.com.ipaddress.com/" target="_blank" rel="noopener noreferrer">https://github.com.ipaddress.com/</a><br><a href="https://fastly.net.ipaddress.com/github.global.ssl.fastly.net" target="_blank" rel="noopener noreferrer">https://fastly.net.ipaddress.com/github.global.ssl.fastly.net</a><br> 添加到hosts<br> 然后<code>ipconfig /flushdns</code></p><ol><li>打开域名解析网站</li></ol><p>点击打开<a href="https://www.ipaddress.com/" target="_blank" rel="noopener noreferrer">https://www.ipaddress.com/</a></p><ol start="2"><li>在上图箭头所指区域的输入框中分别输入两个网站：</li></ol><p>github.com github.global.ssl.fastly.net <a href="https://assets-cdn.github.com/" target="_blank" rel="noopener noreferrer">assets-cdn.github.com/</a><br><img src="`+l+'" alt="image.png"></p><ol start="3"><li>将响应出的两个对应IP地址复制下来，打开 <code>C:\\Windows\\System32\\drivers\\etc</code>中的host文件</li></ol><p><img src="'+r+`" alt="image.png"></p><p>重新访问有关github的网址，就可以打开了</p><p>github下载太慢</p><p>都是基于加速通道来解决的，这里罗列一下加速通道地址： <a href="https://github.com.cnpmjs.org/" target="_blank" rel="noopener noreferrer">https://github.com.cnpmjs.org/</a></p><ul><li><a href="https://link.zhihu.com/?target=http%3A//CNPMJS.ORG" target="_blank" rel="noopener noreferrer">http://CNPMJS.ORG</a></li><li><a href="https://link.zhihu.com/?target=http%3A//FastGit.ORG" target="_blank" rel="noopener noreferrer">http://FastGit.ORG</a></li><li>Cloudflare Workers</li><li><a href="https://link.zhihu.com/?target=http%3A//github.zhlh6.cn" target="_blank" rel="noopener noreferrer">http://github.zhlh6.cn</a></li><li><a href="https://git.sdut.me/" target="_blank" rel="noopener noreferrer">https://git.sdut.me/</a></li><li><a href="https://shrill-pond-3e81.hunsh.workers.dev/" target="_blank" rel="noopener noreferrer">https://shrill-pond-3e81.hunsh.workers.dev/</a></li><li><a href="http://gitd.cc/" target="_blank" rel="noopener noreferrer">http://gitd.cc/</a></li><li><a href="https://gitclone.com/" target="_blank" rel="noopener noreferrer">https://gitclone.com/</a></li></ul><p>这里，给大家分享两款基于这些加速通道加速的插件和脚本（插件下载地址见文末）</p><h2 id="chrome插件" tabindex="-1"><a class="header-anchor" href="#chrome插件"><span>Chrome插件</span></a></h2><p>这是一款基于Chrome插件的解决方案，界面设计完全与Github融合，简直完美~ 官方地址：<a href="https://link.zhihu.com/?target=https%3A//chrome.google.com/webstore/detail/github%25E5%258A%25A0%25E9%2580%259F/mfnkflidjnladnkldfonnaicljppahpg" target="_blank" rel="noopener noreferrer">https://chrome.google.com/webstore/detail/github%E5%8A%A0%E9%80%9F/mfnkflidjnladnkldfonnaicljppahpg</a> 是不是这个按钮挺漂亮的<sup>_</sup> 如何使用SSH通道? 配置用户配置文件 (~/.ssh/config)</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Host github.com</span>
<span class="line">HostName github.com</span>
<span class="line">User git</span>
<span class="line">IdentityFile 指定密钥认证使用的私钥文件路径</span>
<span class="line"># 新增如下内容</span>
<span class="line">Host git.zhlh6.cn</span>
<span class="line">HostName git.zhlh6.cn</span>
<span class="line">User git</span>
<span class="line">IdentityFile 使用github.com的秘钥</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"> 测试连接</span>
<span class="line"> ssh -T git@git.zhlh6.cn</span>
<span class="line"></span></code></pre></div><p>经常要clone github中的一些项目，无奈如果不爬梯子的话速度实在是龟速，经常1k/s，于是搜了下解决方法，改HOSTS大法。 Windows下在C:/Windows/system32/drivers/etc/hosts(打开火绒-&gt;更多工具-&gt;修改host文件) Ubuntu等linux系一般在/etc/hosts 在hosts中添加如下内容：(需要自己更新)</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># Github Hosts</span>
<span class="line"># Update 20210606</span>
<span class="line">140.82.114.4 github.com</span>
<span class="line">140.82.112.3 github.com</span>
<span class="line">140.82.114.9 nodeload.github.com</span>
<span class="line"></span>
<span class="line">140.82.112.5 api.github.com</span>
<span class="line">140.82.112.10 codeload.github.com</span>
<span class="line">185.199.108.133 raw.github.com</span>
<span class="line">185.199.108.153 training.github.com</span>
<span class="line"></span>
<span class="line">185.199.108.153 assets-cdn.github.com</span>
<span class="line">185.199.109.153 assets-cdn.github.com</span>
<span class="line">185.199.108.153 assets-cdn.github.com</span>
<span class="line">185.199.110.153 assets-cdn.github.com</span>
<span class="line">185.199.111.153 documentcloud.github.com</span>
<span class="line"></span>
<span class="line">185.199.108.154 help.github.com</span>
<span class="line"></span>
<span class="line">185.199.108.153 githubstatus.com</span>
<span class="line">199.232.69.194 github.global.ssl.fastly.net</span>
<span class="line"></span>
<span class="line">185.199.108.133 raw.githubusercontent.com</span>
<span class="line">185.199.108.133 cloud.githubusercontent.com</span>
<span class="line">185.199.108.133 gist.githubusercontent.com</span>
<span class="line">185.199.108.133 marketplace-screenshots.githubusercontent.com</span>
<span class="line">185.199.108.133 repository-images.githubusercontent.com</span>
<span class="line">185.199.108.133 user-images.githubusercontent.com</span>
<span class="line">185.199.108.133 desktop.githubusercontent.com</span>
<span class="line"></span>
<span class="line">185.199.108.133 avatars.githubusercontent.com</span>
<span class="line">185.199.109.133 avatars.githubusercontent.com</span>
<span class="line">185.199.110.133 avatars.githubusercontent.com</span>
<span class="line">185.199.111.133 avatars.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars0.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars1.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars2.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars3.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars4.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars5.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars6.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars7.githubusercontent.com</span>
<span class="line">185.199.108.133 avatars8.githubusercontent.com</span>
<span class="line"># End of the section</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改完之后立刻刷新， Windows：ipconfig /flushdns Ubuntu：sudo systemctl restart nscd Mac：sudo killall -HUP mDNSResponder</p><h2 id="一些dns服务推荐" tabindex="-1"><a class="header-anchor" href="#一些dns服务推荐"><span>一些dns服务推荐</span></a></h2><p>如下整理一些好用的DNS，设置DNS后可以加速哦</p><h3 id="centos设置dns方法" tabindex="-1"><a class="header-anchor" href="#centos设置dns方法"><span>Centos设置DNS方法</span></a></h3><p>vi /etc/resolv.conf 这个文件包含了DNS的地址信息，可以自己在这里添加，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># Generated by NetworkManager</span>
<span class="line">nameserver 8.8.8.8</span>
<span class="line">nameserver 114.114.114.114</span>
<span class="line"></span></code></pre></div><hr><h3 id="_1、阿里dns" tabindex="-1"><a class="header-anchor" href="#_1、阿里dns"><span>1、阿里DNS</span></a></h3><p>223.5.5.5 223.6.6.6</p><h3 id="_2、google-dns" tabindex="-1"><a class="header-anchor" href="#_2、google-dns"><span>2、Google DNS</span></a></h3><p>8.8.8.8 8.8.4.4</p><h3 id="_3、cloudflare的快速、保护隐私的dns" tabindex="-1"><a class="header-anchor" href="#_3、cloudflare的快速、保护隐私的dns"><span>3、Cloudflare的快速、保护隐私的DNS</span></a></h3><p>1.1.1.1 1.0.0.1（推荐）</p><h3 id="_4、老牌的114dns-全国三网通用高速-纯净无劫持" tabindex="-1"><a class="header-anchor" href="#_4、老牌的114dns-全国三网通用高速-纯净无劫持"><span>4、老牌的114DNS，全国三网通用高速，纯净无劫持</span></a></h3><p>114.114.114.144 114.114.115.115</p><h3 id="_5、拦截钓鱼、病毒、木马-高度安全" tabindex="-1"><a class="header-anchor" href="#_5、拦截钓鱼、病毒、木马-高度安全"><span>5、拦截钓鱼、病毒、木马，高度安全</span></a></h3><p>114.114.114.119 114.114.115.119</p><h3 id="_6、拦截色情不良网站" tabindex="-1"><a class="header-anchor" href="#_6、拦截色情不良网站"><span>6、拦截色情不良网站</span></a></h3><p>114.114.114.110 114.114.115.110</p><h3 id="_7、sdns-中国互联网络信息中心与国内外运营商推迟的-高速、安全、智能无劫持" tabindex="-1"><a class="header-anchor" href="#_7、sdns-中国互联网络信息中心与国内外运营商推迟的-高速、安全、智能无劫持"><span>7、SDNS,中国互联网络信息中心与国内外运营商推迟的，高速、安全、智能无劫持</span></a></h3><p>1.2.4.8 210.2.4.8（推荐）</p><h3 id="_8、opendns" tabindex="-1"><a class="header-anchor" href="#_8、opendns"><span>8、openDNS</span></a></h3><p>208.67.222.222 208.67.220.220</p><hr><p>the End.</p>`,57)]))}const h=n(p,[["render",c]]),u=JSON.parse('{"path":"/git-tutor/github/cant-reach-github.html","title":"github无法访问","lang":"zh-CN","frontmatter":{"description":"github无法访问 首先添加谷歌的dns服务 在windows上打开控制面板\\\\网络和 Internet\\\\网络连接 在dns添加8.8.8.8和8.8.4.4 dns 最好的方案fastgithub https://github.com/dotnetcore/FastGithub linux-x64终端 sudo ./fastgithub 设置系统自动...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/github/cant-reach-github.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"github无法访问"}],["meta",{"property":"og:description","content":"github无法访问 首先添加谷歌的dns服务 在windows上打开控制面板\\\\网络和 Internet\\\\网络连接 在dns添加8.8.8.8和8.8.4.4 dns 最好的方案fastgithub https://github.com/dotnetcore/FastGithub linux-x64终端 sudo ./fastgithub 设置系统自动..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"github无法访问\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"最好的方案fastgithub","slug":"最好的方案fastgithub","link":"#最好的方案fastgithub","children":[{"level":3,"title":"linux-x64终端","slug":"linux-x64终端","link":"#linux-x64终端","children":[]},{"level":3,"title":"linux-x64服务","slug":"linux-x64服务","link":"#linux-x64服务","children":[]}]},{"level":2,"title":"使用steam++加速","slug":"使用steam-加速","link":"#使用steam-加速","children":[]},{"level":2,"title":"使用hellogithub生成","slug":"使用hellogithub生成","link":"#使用hellogithub生成","children":[]},{"level":2,"title":"手动设置ip","slug":"手动设置ip","link":"#手动设置ip","children":[]},{"level":2,"title":"Chrome插件","slug":"chrome插件","link":"#chrome插件","children":[]},{"level":2,"title":"一些dns服务推荐","slug":"一些dns服务推荐","link":"#一些dns服务推荐","children":[{"level":3,"title":"Centos设置DNS方法","slug":"centos设置dns方法","link":"#centos设置dns方法","children":[]},{"level":3,"title":"1、阿里DNS","slug":"_1、阿里dns","link":"#_1、阿里dns","children":[]},{"level":3,"title":"2、Google DNS","slug":"_2、google-dns","link":"#_2、google-dns","children":[]},{"level":3,"title":"3、Cloudflare的快速、保护隐私的DNS","slug":"_3、cloudflare的快速、保护隐私的dns","link":"#_3、cloudflare的快速、保护隐私的dns","children":[]},{"level":3,"title":"4、老牌的114DNS，全国三网通用高速，纯净无劫持","slug":"_4、老牌的114dns-全国三网通用高速-纯净无劫持","link":"#_4、老牌的114dns-全国三网通用高速-纯净无劫持","children":[]},{"level":3,"title":"5、拦截钓鱼、病毒、木马，高度安全","slug":"_5、拦截钓鱼、病毒、木马-高度安全","link":"#_5、拦截钓鱼、病毒、木马-高度安全","children":[]},{"level":3,"title":"6、拦截色情不良网站","slug":"_6、拦截色情不良网站","link":"#_6、拦截色情不良网站","children":[]},{"level":3,"title":"7、SDNS,中国互联网络信息中心与国内外运营商推迟的，高速、安全、智能无劫持","slug":"_7、sdns-中国互联网络信息中心与国内外运营商推迟的-高速、安全、智能无劫持","link":"#_7、sdns-中国互联网络信息中心与国内外运营商推迟的-高速、安全、智能无劫持","children":[]},{"level":3,"title":"8、openDNS","slug":"_8、opendns","link":"#_8、opendns","children":[]}]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.17,"words":952},"filePathRelative":"git-tutor/github/cant-reach-github.md","localizedDate":"2023年6月25日","autoDesc":true}');export{h as comp,u as data};
