import{_ as s,c as a,a as e,o as l}from"./app-B6vXTniy.js";const i={};function p(t,n){return l(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="linux基本知识" tabindex="-1"><a class="header-anchor" href="#linux基本知识"><span>linux基本知识</span></a></h1><h2 id="第一章" tabindex="-1"><a class="header-anchor" href="#第一章"><span>第一章</span></a></h2><p>安装桌面环境: login 进入系统之后，开始进行用户界面的安装。首先输入如下命令： <code>sudo apt-get install xinit</code> 上述安装完毕之后，再安装环境管理器。本人亲测安装的是 GNOME。使用如下命令安装： <code>sudo apt-get install gdm</code> 然后，安装桌面环境。</p><p><code>sudo apt-get install kubuntu-desktop</code><code>sudo apt-get install gnome-session-fallback</code></p><p>或者：</p><p><code>sudo apt-get install gnome-panel</code> 。安装时的界面如下所示</p><p>安装中文语言包 <code>sudo apt-get install language-pack-zh-han*</code></p><p>安装 gnome 包 <code>sudo apt-get install language-pack-gnome-zh-han*</code></p><p>安装 kde 包 <code>sudo apt-get install language-pack-kde-zh-han*</code> 到这里就能够查看目录下面的中文字符了。</p><p>最后运行语言支持检查 <code>sudo apt install $(check-language-support)</code> 会更新最新的语言支持包设置语言:改英文: 用 vi(或 nano 等文本编辑器)打开 /etc/default/locale 文件将原来的配置内容修改为 LANG=”en_US.UTF-8″ LANGUAGE=”en_US:en” 再在终端下运行： <code>locale-gen -en_US:en</code> 注销或重启后，即可恢复为英文的语言环境。改为中文: 1、修改／etc/default/locale 如不存在则新建一个如下：</p><blockquote><p>LANG=&#39;en_US&#39; #中文可以用 zh_CN LANGUAGE=&#39;en_US:en&#39; #中文可以用 zh_CN:zh</p></blockquote><p>2、reboot 即可 locale 命令可以列出当前系统所用的所有语言设置</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">Sudo <span class="token function">apt</span> <span class="token function">install</span></span>
<span class="line">Sudo <span class="token function">apt</span> <span class="token function">install</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span></span>
<span class="line"></span></code></pre></div><p>apt 1.4 (amd64) 用法： apt [选项] 命令</p><p>命令行软件包管理器 apt 提供软件包搜索，管理和信息查询等功能。它提供的功能与其他 APT 工具相同（像 apt-get 和 apt-cache），但是默认情况下被设置得更适合交互。</p><p>常用命令：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">└─$ <span class="token function">sudo</span> <span class="token function">apt</span></span>
<span class="line"><span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> yzqde 的密码：</span>
<span class="line"><span class="token function">apt</span> <span class="token number">2.6</span>.0 <span class="token punctuation">(</span>amd64<span class="token punctuation">)</span></span>
<span class="line">用法： <span class="token function">apt</span> <span class="token punctuation">[</span>选项<span class="token punctuation">]</span> 命令</span>
<span class="line"></span>
<span class="line">命令行软件包管理器 <span class="token function">apt</span> 提供软件包搜索，管理和信息查询等功能。</span>
<span class="line">它提供的功能与其他 APT 工具相同（像 <span class="token function">apt-get</span> 和 apt-cache），</span>
<span class="line">但是默认情况下被设置得更适合交互。</span>
<span class="line"></span>
<span class="line">常用命令：</span>
<span class="line">  list - 根据名称列出软件包</span>
<span class="line">  search - 搜索软件包描述</span>
<span class="line">  show - 显示软件包细节</span>
<span class="line">  <span class="token function">install</span> - 安装软件包</span>
<span class="line">  reinstall - 重新安装软件包</span>
<span class="line">  remove - 移除软件包</span>
<span class="line">  autoremove - automatically remove all unused packages</span>
<span class="line">  update - 更新可用软件包列表</span>
<span class="line">  upgrade - 通过 安装/升级 软件来更新系统</span>
<span class="line">  full-upgrade - 通过 卸载/安装/升级 来更新系统</span>
<span class="line">  edit-sources - 编辑软件源信息文件</span>
<span class="line">  satisfy - 使系统满足依赖关系字符串</span>
<span class="line"></span>
<span class="line">参见 apt<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span> 以获取更多关于可用命令的信息。</span>
<span class="line">程序配置选项及语法都已经在 apt.conf<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> 中阐明。</span>
<span class="line">欲知如何配置软件源，请参阅 sources.list<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>。</span>
<span class="line">软件包及其版本偏好可以通过 apt_preferences<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> 来设置。</span>
<span class="line">关于安全方面的细节可以参考 apt-secure<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>.</span>
<span class="line">                                         本 APT 具有超级牛力。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好玩的软件 oneko,cmatrix,</p><p>软件安装,</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>gdebi ,gedit ,cinnamon ,mate,xfce,unity,gnome-fontviewer,或者 font-manager,gnome-ternimal,firefox,screefetch,file-roller(压缩包管理器),tree,transmission(迅雷),gnome-software 软件更新器,gnome-packagekit 软件包 unbuntu-desktop, Software-properties-gtk(软件源,ppa 更新) Gnome-software (软件商店) Gnome-systemmoniter(任务管理器) FTP/SFTP 客户端: 声音视频:audacity,vlc,rhythmbox 图像处理:gimp 抓图工具:shutter gnome-web-photo Mypaint,darktable,inkscape,dia,shotwell, 录屏工具:gek-recordmydesktop 视频后期处理:openshot</p></div><p>搜狗输入法安装,安装 gdebi 进入搜狗输入法目录输入命令行: <code>sudo gdebi sogoupinyin_2.1.0.0086_amd64.deb</code> 安装 cinnamon :<code>sudo apt install cinnamon</code> 然后运行<code>cinnamon –replace</code> 运行图形化命令,gksu Filezilla:<code>sudo aptitude install –y filezilla</code></p><p>安装主题:</p><ol><li>elementary os 的主题</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> add-apt-repository ppa:elementary-os/daily</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> elementary-icon-theme</span>
<span class="line"></span></code></pre></div><ol start="2"><li>ubuntukylin ukui 主题, www.ukui.org 官网教程安装这个就好</li><li>zorinos 主题安装方法，首先打开终端输入以下命令安装主题：</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> add-apt-repository ppa:noobslab/themes</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> zorinos-themes</span>
<span class="line"></span></code></pre></div><p>在终端输入以下命令安装图标主题：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> add-apt-repository ppa:noobslab/icons2</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> zorinos-icons</span>
<span class="line"></span></code></pre></div><p>安装或使用调节工具：如 Unity Tweak Tool、Gnome-tweak-tool 或者 Ubuntu-Tweak 来启用主题和图标。</p><h2 id="第二章-linux-的文件系统" tabindex="-1"><a class="header-anchor" href="#第二章-linux-的文件系统"><span>第二章 linux 的文件系统</span></a></h2><p>Lib 各种动态链接库存放的位置,类似 windows 的 dll 文件,只不过 linux 的是.so 文件,</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">└─$ tree -d -L 1/</span>
<span class="line">.</span>
<span class="line">├── bin -&gt; usr/bin</span>
<span class="line">├── boot</span>
<span class="line">├── dev</span>
<span class="line">├── etc</span>
<span class="line">├── home</span>
<span class="line">├── lib -&gt; usr/lib</span>
<span class="line">├── lib32 -&gt; usr/lib32</span>
<span class="line">├── lib64 -&gt; usr/lib64</span>
<span class="line">├── libx32 -&gt; usr/libx32</span>
<span class="line">├── lost+found</span>
<span class="line">├── media</span>
<span class="line">├── mnt</span>
<span class="line">├── opt</span>
<span class="line">├── proc</span>
<span class="line">├── root</span>
<span class="line">├── run</span>
<span class="line">├── sbin -&gt; usr/sbin</span>
<span class="line">├── srv</span>
<span class="line">├── sys</span>
<span class="line">├── tmp</span>
<span class="line">├── usr</span>
<span class="line">└── var</span>
<span class="line"></span>
<span class="line">23 directories</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32)])])}const o=s(i,[["render",p]]),d=JSON.parse('{"path":"/linux-tutor/common/linux-basics.html","title":"linux基本知识","lang":"zh-CN","frontmatter":{"description":"linux基本知识 第一章 安装桌面环境: login 进入系统之后，开始进行用户界面的安装。首先输入如下命令： sudo apt-get install xinit 上述安装完毕之后，再安装环境管理器。本人亲测安装的是 GNOME。使用如下命令安装： sudo apt-get install gdm 然后，安装桌面环境。 sudo apt-get i...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"linux基本知识\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-28T23:33:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/common/linux-basics.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"linux基本知识"}],["meta",{"property":"og:description","content":"linux基本知识 第一章 安装桌面环境: login 进入系统之后，开始进行用户界面的安装。首先输入如下命令： sudo apt-get install xinit 上述安装完毕之后，再安装环境管理器。本人亲测安装的是 GNOME。使用如下命令安装： sudo apt-get install gdm 然后，安装桌面环境。 sudo apt-get i..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-28T23:33:53.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-28T23:33:53.000Z"}]]},"git":{"createdTime":1647928670000,"updatedTime":1682724833000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":5,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.7,"words":1111},"filePathRelative":"linux-tutor/common/linux-basics.md","autoDesc":true}');export{o as comp,d as data};
