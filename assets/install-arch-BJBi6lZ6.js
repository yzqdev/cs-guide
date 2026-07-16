import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/linux-tips/install-arch.html","title":"Arch Linux 安装教程","lang":"zh-CN","frontmatter":{"description":"Arch Linux 安装教程 虚拟机安装 Arch Linux 的简要步骤 一、准备工作 下载镜像 Arch Linux 镜像：archlinux.org/download 推荐工具：Ventoy（制作启动盘）或直接使用 VMware/虚拟机加载 ISO 创建虚拟机 VMware 创建虚拟机，类型选择 Linux 2.6 内核，一路下一步即可 网络建...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Arch Linux 安装教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/install-arch.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Arch Linux 安装教程"}],["meta",{"property":"og:description","content":"Arch Linux 安装教程 虚拟机安装 Arch Linux 的简要步骤 一、准备工作 下载镜像 Arch Linux 镜像：archlinux.org/download 推荐工具：Ventoy（制作启动盘）或直接使用 VMware/虚拟机加载 ISO 创建虚拟机 VMware 创建虚拟机，类型选择 Linux 2.6 内核，一路下一步即可 网络建..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.59,"words":476},"filePathRelative":"linux-tutor/linux-tips/install-arch.md","autoDesc":true}`),a={name:`install-arch.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="arch-linux-安装教程" tabindex="-1"><a class="header-anchor" href="#arch-linux-安装教程"><span>Arch Linux 安装教程</span></a></h1><blockquote><p>虚拟机安装 Arch Linux 的简要步骤</p></blockquote><h2 id="一、准备工作" tabindex="-1"><a class="header-anchor" href="#一、准备工作"><span>一、准备工作</span></a></h2><h3 id="下载镜像" tabindex="-1"><a class="header-anchor" href="#下载镜像"><span>下载镜像</span></a></h3><ul><li><strong>Arch Linux 镜像</strong>：<a href="https://www.archlinux.org/download/" target="_blank" rel="noopener noreferrer">archlinux.org/download</a></li><li><strong>推荐工具</strong>：Ventoy（制作启动盘）或直接使用 VMware/虚拟机加载 ISO</li></ul><h3 id="创建虚拟机" tabindex="-1"><a class="header-anchor" href="#创建虚拟机"><span>创建虚拟机</span></a></h3><ul><li>VMware 创建虚拟机，类型选择 <strong>Linux 2.6 内核</strong>，一路下一步即可</li><li>网络建议使用 <strong>NAT 模式</strong>，确保安装时可以联网下载</li></ul><h2 id="二、安装步骤" tabindex="-1"><a class="header-anchor" href="#二、安装步骤"><span>二、安装步骤</span></a></h2><h3 id="_1-分区" tabindex="-1"><a class="header-anchor" href="#_1-分区"><span>1. 分区</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看磁盘</span></span>
<span class="line"><span class="token function">fdisk</span> <span class="token parameter variable">-l</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 分区（假设磁盘为 /dev/sda）</span></span>
<span class="line"><span class="token function">fdisk</span> /dev/sda</span>
<span class="line"></span>
<span class="line"><span class="token comment"># fdisk 交互命令</span></span>
<span class="line"><span class="token comment"># n - 创建新分区</span></span>
<span class="line"><span class="token comment"># p - 选择主分区</span></span>
<span class="line"><span class="token comment"># w - 保存并退出</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-格式化分区" tabindex="-1"><a class="header-anchor" href="#_2-格式化分区"><span>2. 格式化分区</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 格式化分区为 ext4</span></span>
<span class="line">mkfs.ext4 /dev/sda1</span>
<span class="line"></span></code></pre></div><h3 id="_3-挂载分区" tabindex="-1"><a class="header-anchor" href="#_3-挂载分区"><span>3. 挂载分区</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">mount</span> /dev/sda1 /mnt</span>
<span class="line"></span></code></pre></div><h3 id="_4-配置镜像源" tabindex="-1"><a class="header-anchor" href="#_4-配置镜像源"><span>4. 配置镜像源</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 编辑镜像源列表，将中国源（如 163、清华）移到最前面</span></span>
<span class="line"><span class="token function">vi</span> /etc/pacman.d/mirrorlist</span>
<span class="line"></span></code></pre></div><h3 id="_5-安装基础系统" tabindex="-1"><a class="header-anchor" href="#_5-安装基础系统"><span>5. 安装基础系统</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pacstrap /mnt base base-devel linux linux-firmware</span>
<span class="line"></span></code></pre></div><h3 id="_6-配置系统" tabindex="-1"><a class="header-anchor" href="#_6-配置系统"><span>6. 配置系统</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 进入新系统</span></span>
<span class="line">arch-chroot /mnt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置时区</span></span>
<span class="line"><span class="token function">ln</span> <span class="token parameter variable">-sf</span> /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置语言</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;en_US.UTF-8 UTF-8&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/locale.gen</span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;zh_CN.UTF-8 UTF-8&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/locale.gen</span>
<span class="line">locale-gen</span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;LANG=en_US.UTF-8&quot;</span> <span class="token operator">&gt;</span> /etc/locale.conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置主机名</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;myarch&quot;</span> <span class="token operator">&gt;</span> /etc/hostname</span>
<span class="line"></span></code></pre></div><h3 id="_7-安装引导程序" tabindex="-1"><a class="header-anchor" href="#_7-安装引导程序"><span>7. 安装引导程序</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 GRUB</span></span>
<span class="line">pacman <span class="token parameter variable">-S</span> grub</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装到磁盘</span></span>
<span class="line">grub-install /dev/sda</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成配置文件</span></span>
<span class="line"><span class="token function">grub-mkconfig</span> <span class="token parameter variable">-o</span> /boot/grub/grub.cfg</span>
<span class="line"></span></code></pre></div><h3 id="_8-设置网络" tabindex="-1"><a class="header-anchor" href="#_8-设置网络"><span>8. 设置网络</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装网络工具</span></span>
<span class="line">pacman <span class="token parameter variable">-S</span> networkmanager</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启用网络服务</span></span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> NetworkManager</span>
<span class="line"></span></code></pre></div><h3 id="_9-设置密码" tabindex="-1"><a class="header-anchor" href="#_9-设置密码"><span>9. 设置密码</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置 root 密码</span></span>
<span class="line"><span class="token function">passwd</span></span>
<span class="line"></span></code></pre></div><h3 id="_10-完成安装" tabindex="-1"><a class="header-anchor" href="#_10-完成安装"><span>10. 完成安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 退出 chroot 环境</span></span>
<span class="line"><span class="token builtin class-name">exit</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载分区</span></span>
<span class="line"><span class="token function">umount</span> <span class="token parameter variable">-R</span> /mnt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启</span></span>
<span class="line"><span class="token function">reboot</span></span>
<span class="line"></span></code></pre></div><h2 id="三、安装后配置" tabindex="-1"><a class="header-anchor" href="#三、安装后配置"><span>三、安装后配置</span></a></h2><h3 id="创建用户" tabindex="-1"><a class="header-anchor" href="#创建用户"><span>创建用户</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">useradd</span> <span class="token parameter variable">-m</span> <span class="token parameter variable">-G</span> wheel <span class="token parameter variable">-s</span> /bin/bash username</span>
<span class="line"><span class="token function">passwd</span> username</span>
<span class="line"></span></code></pre></div><h3 id="安装-yay-aur-助手" tabindex="-1"><a class="header-anchor" href="#安装-yay-aur-助手"><span>安装 yay（AUR 助手）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pacman <span class="token parameter variable">-S</span> <span class="token function">git</span> base-devel</span>
<span class="line"><span class="token function">git</span> clone https://aur.archlinux.org/yay.git</span>
<span class="line"><span class="token builtin class-name">cd</span> yay</span>
<span class="line">makepkg <span class="token parameter variable">-si</span></span>
<span class="line"></span></code></pre></div><h3 id="安装桌面环境" tabindex="-1"><a class="header-anchor" href="#安装桌面环境"><span>安装桌面环境</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># GNOME</span></span>
<span class="line">pacman <span class="token parameter variable">-S</span> gnome gnome-extra</span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> gdm</span>
<span class="line"></span>
<span class="line"><span class="token comment"># KDE Plasma</span></span>
<span class="line">pacman <span class="token parameter variable">-S</span> plasma plasma-desktop</span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> sddm</span>
<span class="line"></span></code></pre></div><h2 id="四、参考资源" tabindex="-1"><a class="header-anchor" href="#四、参考资源"><span>四、参考资源</span></a></h2><ul><li><a href="https://wiki.archlinux.org/title/Main_page_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)" target="_blank" rel="noopener noreferrer">Arch Linux Wiki（中文）</a></li><li><a href="https://archlinuxstudio.github.io/ArchLinuxTutorial/" target="_blank" rel="noopener noreferrer">Arch Linux 初学者安装指南</a></li><li>在线 Linux 命令查询：<a href="https://wangchujiang.com/linux-command/" target="_blank" rel="noopener noreferrer">wangchujiang.com/linux-command</a></li></ul>`,37)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};