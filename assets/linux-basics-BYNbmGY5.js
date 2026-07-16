import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/common/linux-basics.html","title":"linux基本知识","lang":"zh-CN","frontmatter":{"title":"linux基本知识","description":"Linux 基本知识 一、Linux 桌面环境安装 1. 安装桌面环境基础 2. 安装桌面环境 3. 安装中文语言支持 4. 切换系统语言 改为英文： 改为中文： 5. 查看当前语言设置 二、APT 包管理器详解 基本语法 常用命令 安装常用软件包 三、Linux 文件系统 目录结构 重要目录说明 查看目录结构 四、有趣的 Linux 命令 终端小游戏...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"linux基本知识\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/common/linux-basics.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"linux基本知识"}],["meta",{"property":"og:description","content":"Linux 基本知识 一、Linux 桌面环境安装 1. 安装桌面环境基础 2. 安装桌面环境 3. 安装中文语言支持 4. 切换系统语言 改为英文： 改为中文： 5. 查看当前语言设置 二、APT 包管理器详解 基本语法 常用命令 安装常用软件包 三、Linux 文件系统 目录结构 重要目录说明 查看目录结构 四、有趣的 Linux 命令 终端小游戏..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1647928670000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":6,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":6,"words":1800},"filePathRelative":"linux-tutor/common/linux-basics.md","autoDesc":true}`),a={name:`linux-basics.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="linux-基本知识" tabindex="-1"><a class="header-anchor" href="#linux-基本知识"><span>Linux 基本知识</span></a></h1><h2 id="一、linux-桌面环境安装" tabindex="-1"><a class="header-anchor" href="#一、linux-桌面环境安装"><span>一、Linux 桌面环境安装</span></a></h2><h3 id="_1-安装桌面环境基础" tabindex="-1"><a class="header-anchor" href="#_1-安装桌面环境基础"><span>1. 安装桌面环境基础</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 X Window 系统（图形界面基础）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> xinit</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装显示管理器（登录界面）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gdm          <span class="token comment"># GNOME 显示管理器</span></span>
<span class="line"><span class="token comment"># 或者</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> lightdm       <span class="token comment"># LightDM 显示管理器</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-安装桌面环境" tabindex="-1"><a class="header-anchor" href="#_2-安装桌面环境"><span>2. 安装桌面环境</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># GNOME 桌面（最常用）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gnome-session-fallback</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gnome-panel</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gnome-tweaks   <span class="token comment"># GNOME 优化工具</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># KDE Plasma 桌面</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> kubuntu-desktop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Cinnamon 桌面（Linux Mint 默认）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> cinnamon</span>
<span class="line"></span>
<span class="line"><span class="token comment"># XFCE 桌面（轻量级）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> xfce4</span>
<span class="line"></span>
<span class="line"><span class="token comment"># MATE 桌面</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> mate-desktop-environment</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Unity 桌面（Ubuntu 经典）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> unity</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-安装中文语言支持" tabindex="-1"><a class="header-anchor" href="#_3-安装中文语言支持"><span>3. 安装中文语言支持</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装中文语言包</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> language-pack-zh-hans*</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> language-pack-gnome-zh-hans*</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> language-pack-kde-zh-hans*</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装中文输入法</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> fcitx fcitx-googlepinyin   <span class="token comment"># 谷歌拼音</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> fcitx fcitx-sunpinyin       <span class="token comment"># 搜狗拼音</span></span>
<span class="line"><span class="token comment"># 或 ibus 输入法</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> ibus ibus-pinyin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行语言支持检查</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token variable"><span class="token variable">$(</span>check-language-support<span class="token variable">)</span></span></span>
<span class="line"></span></code></pre></div><h3 id="_4-切换系统语言" tabindex="-1"><a class="header-anchor" href="#_4-切换系统语言"><span>4. 切换系统语言</span></a></h3><p><strong>改为英文</strong>：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 编辑 locale 配置文件</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vi</span> /etc/default/locale</span>
<span class="line"><span class="token comment"># 修改为：</span></span>
<span class="line"><span class="token comment"># LANG=&quot;en_US.UTF-8&quot;</span></span>
<span class="line"><span class="token comment"># LANGUAGE=&quot;en_US:en&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成本地化设置</span></span>
<span class="line"><span class="token function">sudo</span> locale-gen en_US.UTF-8</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启或注销后生效</span></span>
<span class="line"></span></code></pre></div><p><strong>改为中文</strong>：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 编辑 locale 配置文件</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vi</span> /etc/default/locale</span>
<span class="line"><span class="token comment"># 修改为：</span></span>
<span class="line"><span class="token comment"># LANG=&quot;zh_CN.UTF-8&quot;</span></span>
<span class="line"><span class="token comment"># LANGUAGE=&quot;zh_CN:zh&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成本地化设置</span></span>
<span class="line"><span class="token function">sudo</span> locale-gen zh_CN.UTF-8</span>
<span class="line"></span></code></pre></div><h3 id="_5-查看当前语言设置" tabindex="-1"><a class="header-anchor" href="#_5-查看当前语言设置"><span>5. 查看当前语言设置</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">locale              <span class="token comment"># 列出所有语言设置</span></span>
<span class="line">locale <span class="token parameter variable">-a</span>           <span class="token comment"># 列出所有可用的语言环境</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token environment constant">$LANG</span>          <span class="token comment"># 查看当前语言</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="二、apt-包管理器详解" tabindex="-1"><a class="header-anchor" href="#二、apt-包管理器详解"><span>二、APT 包管理器详解</span></a></h2><h3 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法"><span>基本语法</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">apt</span> <span class="token punctuation">[</span>选项<span class="token punctuation">]</span> 命令</span>
<span class="line"></span></code></pre></div><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h3><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>apt update</code></td><td>更新软件包列表</td></tr><tr><td><code>apt upgrade</code></td><td>升级所有可升级的包</td></tr><tr><td><code>apt install 包名</code></td><td>安装软件包</td></tr><tr><td><code>apt reinstall 包名</code></td><td>重新安装软件包</td></tr><tr><td><code>apt remove 包名</code></td><td>移除软件包（保留配置）</td></tr><tr><td><code>apt purge 包名</code></td><td>彻底移除（删除配置）</td></tr><tr><td><code>apt autoremove</code></td><td>自动移除无用的依赖包</td></tr><tr><td><code>apt search 关键字</code></td><td>搜索软件包</td></tr><tr><td><code>apt show 包名</code></td><td>显示软件包详细信息</td></tr><tr><td><code>apt list --installed</code></td><td>列出已安装的包</td></tr><tr><td><code>apt list --upgradable</code></td><td>列出可升级的包</td></tr><tr><td><code>apt edit-sources</code></td><td>编辑软件源</td></tr><tr><td><code>apt satisfy 依赖</code></td><td>满足依赖关系</td></tr></tbody></table><h3 id="安装常用软件包" tabindex="-1"><a class="header-anchor" href="#安装常用软件包"><span>安装常用软件包</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 系统工具</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> tree               <span class="token comment"># 目录树显示</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> neofetch           <span class="token comment"># 系统信息展示</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">htop</span>               <span class="token comment"># 进程管理增强版</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> screenfetch        <span class="token comment"># 系统信息展示</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> file-roller        <span class="token comment"># 压缩包管理器</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gnome-software     <span class="token comment"># 软件商店</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gnome-system-monitor  <span class="token comment"># 任务管理器</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> software-properties-gtk  <span class="token comment"># 软件源管理</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 开发工具</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> build-essential    <span class="token comment"># 编译工具链</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">git</span>                <span class="token comment"># 版本控制</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">vim</span>                <span class="token comment"># 编辑器</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 网络工具</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">curl</span> <span class="token function">wget</span>          <span class="token comment"># 下载工具</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> net-tools          <span class="token comment"># 网络工具集</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> openssh-server     <span class="token comment"># SSH 服务</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 多媒体</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> vlc                <span class="token comment"># 视频播放器</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> audacity           <span class="token comment"># 音频编辑</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gimp               <span class="token comment"># 图片编辑</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> shutter            <span class="token comment"># 截图工具</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="三、linux-文件系统" tabindex="-1"><a class="header-anchor" href="#三、linux-文件系统"><span>三、Linux 文件系统</span></a></h2><h3 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构"><span>目录结构</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/                    # 根目录</span>
<span class="line">├── bin -&gt; usr/bin   # 用户命令（二进制文件）</span>
<span class="line">├── boot             # 引导加载程序文件</span>
<span class="line">├── dev              # 设备文件</span>
<span class="line">├── etc              # 配置文件</span>
<span class="line">├── home             # 用户家目录</span>
<span class="line">│   ├── user1/</span>
<span class="line">│   └── user2/</span>
<span class="line">├── lib -&gt; usr/lib   # 系统库文件（类似 Windows 的 DLL）</span>
<span class="line">├── media            # 可移动媒体挂载点</span>
<span class="line">├── mnt              # 临时挂载点</span>
<span class="line">├── opt              # 可选软件包</span>
<span class="line">├── proc             # 进程和内核信息（虚拟文件系统）</span>
<span class="line">├── root             # root 用户家目录</span>
<span class="line">├── run              # 运行时变量数据</span>
<span class="line">├── sbin -&gt; usr/sbin # 系统管理命令</span>
<span class="line">├── srv              # 服务数据</span>
<span class="line">├── sys              # 系统设备信息（虚拟文件系统）</span>
<span class="line">├── tmp              # 临时文件</span>
<span class="line">├── usr              # 用户程序和数据</span>
<span class="line">│   ├── bin/         # 用户命令</span>
<span class="line">│   ├── lib/         # 库文件</span>
<span class="line">│   ├── local/       # 本地安装的软件</span>
<span class="line">│   └── share/       # 共享数据</span>
<span class="line">└── var              # 可变数据</span>
<span class="line">    ├── log/         # 日志文件</span>
<span class="line">    ├── cache/       # 缓存</span>
<span class="line">    ├── lib/         # 状态信息</span>
<span class="line">    └── tmp/         # 重启后保留的临时文件</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重要目录说明" tabindex="-1"><a class="header-anchor" href="#重要目录说明"><span>重要目录说明</span></a></h3><table><thead><tr><th>目录</th><th>说明</th></tr></thead><tbody><tr><td><code>/bin</code></td><td>基本用户命令，所有用户都可执行</td></tr><tr><td><code>/sbin</code></td><td>系统管理命令，通常需要 root 权限</td></tr><tr><td><code>/etc</code></td><td>系统配置文件，类似 Windows 注册表</td></tr><tr><td><code>/home</code></td><td>普通用户家目录</td></tr><tr><td><code>/root</code></td><td>超级用户家目录</td></tr><tr><td><code>/var</code></td><td>经常变化的文件（日志、缓存、数据库）</td></tr><tr><td><code>/tmp</code></td><td>临时文件，重启后清空</td></tr><tr><td><code>/dev</code></td><td>设备文件，Linux 中一切皆文件</td></tr><tr><td><code>/proc</code></td><td>内核和进程信息虚拟文件系统</td></tr><tr><td><code>/usr</code></td><td>用户安装的软件和共享数据</td></tr></tbody></table><h3 id="查看目录结构" tabindex="-1"><a class="header-anchor" href="#查看目录结构"><span>查看目录结构</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">tree <span class="token parameter variable">-d</span> <span class="token parameter variable">-L</span> <span class="token number">1</span> /        <span class="token comment"># 显示根目录下的一级子目录（仅目录）</span></span>
<span class="line">tree <span class="token parameter variable">-d</span> <span class="token parameter variable">-L</span> <span class="token number">2</span> /usr     <span class="token comment"># 显示 /usr 下两级子目录</span></span>
<span class="line">tree /home            <span class="token comment"># 显示家目录完整结构</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="四、有趣的-linux-命令" tabindex="-1"><a class="header-anchor" href="#四、有趣的-linux-命令"><span>四、有趣的 Linux 命令</span></a></h2><h3 id="终端小游戏-彩蛋" tabindex="-1"><a class="header-anchor" href="#终端小游戏-彩蛋"><span>终端小游戏/彩蛋</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> oneko         <span class="token comment"># 小猫追鼠标</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> cmatrix       <span class="token comment"># 黑客帝国字符雨</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> sl            <span class="token comment"># 小火车跑过终端</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> cowsay        <span class="token comment"># 奶牛说话</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> fortune       <span class="token comment"># 随机名言</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> figlet        <span class="token comment"># ASCII 艺术字</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> lolcat        <span class="token comment"># 彩虹色输出</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用</span></span>
<span class="line">oneko                          <span class="token comment"># 一只小猫追着鼠标跑</span></span>
<span class="line">cmatrix                        <span class="token comment"># 黑客帝国绿色字符雨（按 Ctrl+C 退出）</span></span>
<span class="line">sl                             <span class="token comment"># 一辆小火车跑过终端</span></span>
<span class="line">cowsay <span class="token string">&quot;Hello Linux&quot;</span>           <span class="token comment"># 奶牛说话</span></span>
<span class="line">fortune                        <span class="token comment"># 显示随机名言</span></span>
<span class="line">fortune <span class="token operator">|</span> cowsay               <span class="token comment"># 奶牛说名言</span></span>
<span class="line">figlet <span class="token string">&quot;Linux&quot;</span>                 <span class="token comment"># 大号 ASCII 艺术字</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello&quot;</span> <span class="token operator">|</span> lolcat          <span class="token comment"># 彩虹色输出</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有趣的系统命令" tabindex="-1"><a class="header-anchor" href="#有趣的系统命令"><span>有趣的系统命令</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 系统信息</span></span>
<span class="line">neofetch                       <span class="token comment"># 漂亮的系统信息展示</span></span>
<span class="line">screenfetch                    <span class="token comment"># 另一种系统信息展示</span></span>
<span class="line">archey3                        <span class="token comment"># 类似 neofetch</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 其他</span></span>
<span class="line"><span class="token function">yes</span> <span class="token string">&quot;Hello&quot;</span>                    <span class="token comment"># 不断输出 Hello（按 Ctrl+C 停止）</span></span>
<span class="line">banner <span class="token string">&quot;Hello&quot;</span>                 <span class="token comment"># 打印横幅</span></span>
<span class="line"><span class="token function">rev</span>                            <span class="token comment"># 反转输入文本（输入后 Ctrl+D）</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="五、搜狗输入法安装" tabindex="-1"><a class="header-anchor" href="#五、搜狗输入法安装"><span>五、搜狗输入法安装</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 下载搜狗输入法 .deb 包</span></span>
<span class="line"><span class="token comment"># 从官网下载：https://pinyin.sogou.com/linux/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 安装 gdebi（用于安装 .deb 包）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gdebi</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 安装搜狗输入法</span></span>
<span class="line"><span class="token function">sudo</span> gdebi sogoupinyin_2.4.0.3469_amd64.deb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 重启系统或注销后重新登录</span></span>
<span class="line"><span class="token comment"># 5. 配置输入法：在系统设置 → 区域与语言 → 输入源中添加搜狗输入法</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="六、安装主题" tabindex="-1"><a class="header-anchor" href="#六、安装主题"><span>六、安装主题</span></a></h2><h3 id="_1-elementary-os-主题" tabindex="-1"><a class="header-anchor" href="#_1-elementary-os-主题"><span>1. Elementary OS 主题</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> add-apt-repository ppa:elementary-os/daily</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> elementary-icon-theme</span>
<span class="line"></span></code></pre></div><h3 id="_2-ukui-主题-优麒麟" tabindex="-1"><a class="header-anchor" href="#_2-ukui-主题-优麒麟"><span>2. UKUI 主题（优麒麟）</span></a></h3><p>访问 <a href="https://www.ukui.org/" target="_blank" rel="noopener noreferrer">www.ukui.org</a> 查看官方安装教程。</p><h3 id="_3-zorin-os-主题" tabindex="-1"><a class="header-anchor" href="#_3-zorin-os-主题"><span>3. Zorin OS 主题</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装主题</span></span>
<span class="line"><span class="token function">sudo</span> add-apt-repository ppa:noobslab/themes</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> zorinos-themes</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装图标</span></span>
<span class="line"><span class="token function">sudo</span> add-apt-repository ppa:noobslab/icons2</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> zorinos-icons</span>
<span class="line"></span></code></pre></div><h3 id="_4-启用主题" tabindex="-1"><a class="header-anchor" href="#_4-启用主题"><span>4. 启用主题</span></a></h3><p>安装后使用以下工具来切换主题：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gnome-tweak-tool          <span class="token comment"># GNOME 调整工具</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> unity-tweak-tool          <span class="token comment"># Unity 调整工具</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> ubuntu-tweak              <span class="token comment"># Ubuntu 调整工具</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="七、常用软件推荐" tabindex="-1"><a class="header-anchor" href="#七、常用软件推荐"><span>七、常用软件推荐</span></a></h2><h3 id="系统工具" tabindex="-1"><a class="header-anchor" href="#系统工具"><span>系统工具</span></a></h3><table><thead><tr><th>软件</th><th>安装命令</th><th>说明</th></tr></thead><tbody><tr><td>GNOME 软件中心</td><td><code>sudo apt install gnome-software</code></td><td>软件商店</td></tr><tr><td>系统监视器</td><td><code>sudo apt install gnome-system-monitor</code></td><td>任务管理器</td></tr><tr><td>软件源管理</td><td><code>sudo apt install software-properties-gtk</code></td><td>管理 PPA 源</td></tr></tbody></table><h3 id="网络工具" tabindex="-1"><a class="header-anchor" href="#网络工具"><span>网络工具</span></a></h3><table><thead><tr><th>软件</th><th>安装命令</th><th>说明</th></tr></thead><tbody><tr><td>FileZilla</td><td><code>sudo apt install filezilla</code></td><td>FTP/SFTP 客户端</td></tr><tr><td>Transmission</td><td><code>sudo apt install transmission</code></td><td>BT 下载工具</td></tr></tbody></table><h3 id="多媒体" tabindex="-1"><a class="header-anchor" href="#多媒体"><span>多媒体</span></a></h3><table><thead><tr><th>软件</th><th>安装命令</th><th>说明</th></tr></thead><tbody><tr><td>VLC</td><td><code>sudo apt install vlc</code></td><td>视频播放器</td></tr><tr><td>Audacity</td><td><code>sudo apt install audacity</code></td><td>音频编辑</td></tr><tr><td>Rhythmbox</td><td><code>sudo apt install rhythmbox</code></td><td>音乐播放器</td></tr><tr><td>GIMP</td><td><code>sudo apt install gimp</code></td><td>图片编辑</td></tr><tr><td>Shutter</td><td><code>sudo apt install shutter</code></td><td>截图工具</td></tr><tr><td>OpenShot</td><td><code>sudo apt install openshot</code></td><td>视频编辑</td></tr><tr><td>Kdenlive</td><td><code>sudo apt install kdenlive</code></td><td>视频编辑</td></tr></tbody></table><h3 id="字体管理" tabindex="-1"><a class="header-anchor" href="#字体管理"><span>字体管理</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gnome-font-viewer    <span class="token comment"># GNOME 字体查看器</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> font-manager         <span class="token comment"># 字体管理器</span></span>
<span class="line"></span></code></pre></div>`,61)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};