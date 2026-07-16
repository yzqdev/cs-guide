import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/basic/13_system_admin.html","title":"系统管理","lang":"zh-CN","frontmatter":{"order":13,"description":"系统管理 系统信息 查看系统版本 查看硬件信息 服务管理 (systemd) 现代 Linux 发行版大多使用 systemd 管理服务： 创建自己的服务：在 /etc/systemd/system/ 下创建 .service 文件。 日志查看 磁盘管理 查看磁盘空间 查看目录大小 挂载与卸载 压缩与归档 tar 其他压缩工具 时间与日期 系统监控 C...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"系统管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/basic/13_system_admin.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"系统管理"}],["meta",{"property":"og:description","content":"系统管理 系统信息 查看系统版本 查看硬件信息 服务管理 (systemd) 现代 Linux 发行版大多使用 systemd 管理服务： 创建自己的服务：在 /etc/systemd/system/ 下创建 .service 文件。 日志查看 磁盘管理 查看磁盘空间 查看目录大小 挂载与卸载 压缩与归档 tar 其他压缩工具 时间与日期 系统监控 C..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.31,"words":994},"filePathRelative":"linux-tutor/basic/13_system_admin.md","autoDesc":true}`),a={name:`13_system_admin.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="系统管理" tabindex="-1"><a class="header-anchor" href="#系统管理"><span>系统管理</span></a></h1><h2 id="系统信息" tabindex="-1"><a class="header-anchor" href="#系统信息"><span>系统信息</span></a></h2><h3 id="查看系统版本" tabindex="-1"><a class="header-anchor" href="#查看系统版本"><span>查看系统版本</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">uname</span> <span class="token parameter variable">-a</span>                  <span class="token comment"># 完整内核信息</span></span>
<span class="line"><span class="token function">uname</span> <span class="token parameter variable">-r</span>                  <span class="token comment"># 内核版本</span></span>
<span class="line">lsb_release <span class="token parameter variable">-a</span>            <span class="token comment"># 发行版信息</span></span>
<span class="line"><span class="token function">cat</span> /etc/os-release       <span class="token comment"># 发行版详情</span></span>
<span class="line">hostnamectl               <span class="token comment"># 主机名和系统信息</span></span>
<span class="line"></span></code></pre></div><h3 id="查看硬件信息" tabindex="-1"><a class="header-anchor" href="#查看硬件信息"><span>查看硬件信息</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># CPU</span></span>
<span class="line"><span class="token function">cat</span> /proc/cpuinfo</span>
<span class="line">lscpu                     <span class="token comment"># 更友好的 CPU 信息</span></span>
<span class="line">nproc                     <span class="token comment"># 逻辑 CPU 核心数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 内存</span></span>
<span class="line"><span class="token function">cat</span> /proc/meminfo</span>
<span class="line"><span class="token function">free</span> <span class="token parameter variable">-h</span>                   <span class="token comment"># 内存使用情况（-h 人性化显示）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 磁盘</span></span>
<span class="line">lsblk                     <span class="token comment"># 块设备信息</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">fdisk</span> <span class="token parameter variable">-l</span>             <span class="token comment"># 分区表</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 完整硬件信息</span></span>
<span class="line"><span class="token function">sudo</span> lshw                 <span class="token comment"># 需要安装</span></span>
<span class="line">lspci                     <span class="token comment"># PCI 设备</span></span>
<span class="line">lsusb                     <span class="token comment"># USB 设备</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务管理-systemd" tabindex="-1"><a class="header-anchor" href="#服务管理-systemd"><span>服务管理 (systemd)</span></a></h2><p>现代 Linux 发行版大多使用 <code>systemd</code> 管理服务：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">systemctl status nginx     <span class="token comment"># 查看服务状态</span></span>
<span class="line">systemctl start nginx      <span class="token comment"># 启动服务</span></span>
<span class="line">systemctl stop nginx       <span class="token comment"># 停止服务</span></span>
<span class="line">systemctl restart nginx    <span class="token comment"># 重启服务</span></span>
<span class="line">systemctl reload nginx     <span class="token comment"># 重新加载配置（不中断服务）</span></span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> nginx     <span class="token comment"># 开机自启</span></span>
<span class="line">systemctl disable nginx    <span class="token comment"># 禁用开机自启</span></span>
<span class="line">systemctl is-enabled nginx <span class="token comment"># 检查是否开机自启</span></span>
<span class="line"></span></code></pre></div><p><strong>创建自己的服务</strong>：在 <code>/etc/systemd/system/</code> 下创建 <code>.service</code> 文件。</p><h2 id="日志查看" tabindex="-1"><a class="header-anchor" href="#日志查看"><span>日志查看</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 传统日志文件</span></span>
<span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/syslog          <span class="token comment"># 系统日志</span></span>
<span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/auth.log        <span class="token comment"># 认证日志</span></span>
<span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/nginx/access.log  <span class="token comment"># Nginx 访问日志</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># journald 日志</span></span>
<span class="line">journalctl                       <span class="token comment"># 查看所有日志</span></span>
<span class="line">journalctl <span class="token parameter variable">-u</span> nginx              <span class="token comment"># 查看特定服务的日志</span></span>
<span class="line">journalctl <span class="token parameter variable">-u</span> sshd <span class="token parameter variable">--since</span> today <span class="token comment"># 今天以来的日志</span></span>
<span class="line">journalctl <span class="token parameter variable">-f</span>                    <span class="token comment"># 实时追踪日志</span></span>
<span class="line">journalctl <span class="token parameter variable">-p</span> err                <span class="token comment"># 只查看错误级别以上的日志</span></span>
<span class="line"></span></code></pre></div><h2 id="磁盘管理" tabindex="-1"><a class="header-anchor" href="#磁盘管理"><span>磁盘管理</span></a></h2><h3 id="查看磁盘空间" tabindex="-1"><a class="header-anchor" href="#查看磁盘空间"><span>查看磁盘空间</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">df</span> <span class="token parameter variable">-h</span>                     <span class="token comment"># 查看磁盘分区使用情况</span></span>
<span class="line"><span class="token function">df</span> <span class="token parameter variable">-h</span> /home               <span class="token comment"># 查看特定分区的使用情况</span></span>
<span class="line"><span class="token function">df</span> <span class="token parameter variable">-i</span>                     <span class="token comment"># 查看 inode 使用情况</span></span>
<span class="line"></span></code></pre></div><h3 id="查看目录大小" tabindex="-1"><a class="header-anchor" href="#查看目录大小"><span>查看目录大小</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">du</span> <span class="token parameter variable">-sh</span> /var/log           <span class="token comment"># 查看目录总大小</span></span>
<span class="line"><span class="token function">du</span> <span class="token parameter variable">-sh</span> * <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rh</span>       <span class="token comment"># 当前目录下所有子目录大小排序</span></span>
<span class="line"><span class="token function">du</span> <span class="token parameter variable">-h</span> --max-depth<span class="token operator">=</span><span class="token number">1</span>       <span class="token comment"># 显示一级子目录的大小</span></span>
<span class="line"><span class="token function">du</span> <span class="token parameter variable">-sh</span> /var/log/*.log     <span class="token comment"># 查看匹配文件的总大小</span></span>
<span class="line"></span></code></pre></div><h3 id="挂载与卸载" tabindex="-1"><a class="header-anchor" href="#挂载与卸载"><span>挂载与卸载</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">mount</span>                     <span class="token comment"># 查看已挂载的设备</span></span>
<span class="line"><span class="token function">mount</span> /dev/sdb1 /mnt/data <span class="token comment"># 挂载设备</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">umount</span> /mnt/data     <span class="token comment"># 卸载</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">mount</span> <span class="token parameter variable">-o</span> remount,rw /   <span class="token comment"># 重新挂载为读写模式</span></span>
<span class="line"></span></code></pre></div><h2 id="压缩与归档" tabindex="-1"><a class="header-anchor" href="#压缩与归档"><span>压缩与归档</span></a></h2><h3 id="tar" tabindex="-1"><a class="header-anchor" href="#tar"><span>tar</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建归档</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-cvf</span> archive.tar dir/           <span class="token comment"># 打包（不压缩）</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-czvf</span> archive.tar.gz dir/       <span class="token comment"># 打包 + gzip 压缩</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-cjvf</span> archive.tar.bz2 dir/      <span class="token comment"># 打包 + bzip2 压缩</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-cJvf</span> archive.tar.xz dir/       <span class="token comment"># 打包 + xz 压缩</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 解包</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-xvf</span> archive.tar                <span class="token comment"># 解包</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> archive.tar.gz            <span class="token comment"># 解压 .tar.gz</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-xjvf</span> archive.tar.bz2           <span class="token comment"># 解压 .tar.bz2</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> archive.tar.gz <span class="token parameter variable">-C</span> /target <span class="token comment"># 解压到指定目录</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看归档内容</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-tvf</span> archive.tar.gz</span>
<span class="line"></span></code></pre></div><h3 id="其他压缩工具" tabindex="-1"><a class="header-anchor" href="#其他压缩工具"><span>其他压缩工具</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">gzip</span> <span class="token function">file</span>                 <span class="token comment"># 压缩（生成 file.gz）</span></span>
<span class="line">gunzip file.gz            <span class="token comment"># 解压缩</span></span>
<span class="line"><span class="token function">gzip</span> <span class="token parameter variable">-d</span> file.gz           <span class="token comment"># 同上</span></span>
<span class="line"></span>
<span class="line"><span class="token function">bzip2</span> <span class="token function">file</span>                <span class="token comment"># 压缩（生成 file.bz2，压缩率更高）</span></span>
<span class="line">bunzip2 file.bz2          <span class="token comment"># 解压缩</span></span>
<span class="line"></span>
<span class="line"><span class="token function">zip</span> <span class="token parameter variable">-r</span> archive.zip dir/   <span class="token comment"># 创建 zip</span></span>
<span class="line"><span class="token function">unzip</span> archive.zip         <span class="token comment"># 解压 zip</span></span>
<span class="line"></span></code></pre></div><h2 id="时间与日期" tabindex="-1"><a class="header-anchor" href="#时间与日期"><span>时间与日期</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">date</span>                      <span class="token comment"># 当前时间</span></span>
<span class="line"><span class="token function">date</span> +%Y-%m-%d            <span class="token comment"># 格式化: 2025-07-15</span></span>
<span class="line"><span class="token function">date</span> +%Y%m%d_%H%M%S       <span class="token comment"># 适合文件名: 20250715_143022</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置时区</span></span>
<span class="line">timedatectl list-timezones <span class="token operator">|</span> <span class="token function">grep</span> Shanghai</span>
<span class="line"><span class="token function">sudo</span> timedatectl set-timezone Asia/Shanghai</span>
<span class="line"></span>
<span class="line"><span class="token comment"># NTP 时间同步</span></span>
<span class="line"><span class="token function">sudo</span> timedatectl set-ntp <span class="token boolean">true</span></span>
<span class="line"></span></code></pre></div><h2 id="系统监控" tabindex="-1"><a class="header-anchor" href="#系统监控"><span>系统监控</span></a></h2><h3 id="cpu-和内存" tabindex="-1"><a class="header-anchor" href="#cpu-和内存"><span>CPU 和内存</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 综合监控</span></span>
<span class="line"><span class="token function">htop</span>                      <span class="token comment"># 更友好的 top（需安装）</span></span>
<span class="line"><span class="token function">vmstat</span> <span class="token number">2</span>                  <span class="token comment"># 每 2 秒输出系统状态</span></span>
<span class="line">sar <span class="token parameter variable">-u</span> <span class="token number">1</span> <span class="token number">5</span>                <span class="token comment"># CPU 使用率（每秒一次，5 次）</span></span>
<span class="line">sar <span class="token parameter variable">-r</span> <span class="token number">1</span> <span class="token number">5</span>                <span class="token comment"># 内存使用</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 内存详情</span></span>
<span class="line"><span class="token function">free</span> <span class="token parameter variable">-h</span>                   <span class="token comment"># 内存总量/已用/可用</span></span>
<span class="line"><span class="token function">cat</span> /proc/meminfo         <span class="token comment"># 更详细的内存信息</span></span>
<span class="line"></span></code></pre></div><h3 id="磁盘-i-o" tabindex="-1"><a class="header-anchor" href="#磁盘-i-o"><span>磁盘 I/O</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">iostat <span class="token parameter variable">-x</span> <span class="token number">2</span>               <span class="token comment"># 磁盘 I/O 统计（每 2 秒）</span></span>
<span class="line">iotop                     <span class="token comment"># 按进程查看 I/O（需 root）</span></span>
<span class="line"></span></code></pre></div><h3 id="系统负载" tabindex="-1"><a class="header-anchor" href="#系统负载"><span>系统负载</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">uptime</span>                    <span class="token comment"># 系统运行时间 + 平均负载</span></span>
<span class="line"><span class="token function">cat</span> /proc/loadavg         <span class="token comment"># 1/5/15 分钟平均负载</span></span>
<span class="line"></span></code></pre></div><h2 id="进程资源限制" tabindex="-1"><a class="header-anchor" href="#进程资源限制"><span>进程资源限制</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-a</span>                 <span class="token comment"># 查看所有限制</span></span>
<span class="line"><span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span>                 <span class="token comment"># 查看最大打开文件数</span></span>
<span class="line"><span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-u</span>                 <span class="token comment"># 查看最大用户进程数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 临时修改</span></span>
<span class="line"><span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span> <span class="token number">65536</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 永久修改（/etc/security/limits.conf）</span></span>
<span class="line"><span class="token comment"># * soft nofile 65536</span></span>
<span class="line"><span class="token comment"># * hard nofile 65536</span></span>
<span class="line"></span></code></pre></div><h2 id="本章小结" tabindex="-1"><a class="header-anchor" href="#本章小结"><span>本章小结</span></a></h2><table><thead><tr><th>类别</th><th>常用命令</th></tr></thead><tbody><tr><td>系统信息</td><td><code>uname</code>, <code>lsb_release</code>, <code>lscpu</code>, <code>free</code></td></tr><tr><td>服务管理</td><td><code>systemctl</code></td></tr><tr><td>日志</td><td><code>journalctl</code>, <code>tail -f /var/log/</code></td></tr><tr><td>磁盘</td><td><code>df</code>, <code>du</code>, <code>mount</code></td></tr><tr><td>压缩</td><td><code>tar</code>, <code>gzip</code>, <code>zip</code></td></tr><tr><td>时间</td><td><code>date</code>, <code>timedatectl</code></td></tr><tr><td>监控</td><td><code>htop</code>, <code>vmstat</code>, <code>iostat</code></td></tr></tbody></table><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><ol><li>用 <code>df -h</code> 查看各分区的使用情况，找到使用率最高的分区</li><li>用 <code>du -sh</code> 查看 <code>/var/log</code> 的大小</li><li>用 <code>systemctl</code> 查看 <code>sshd</code> 服务的状态</li><li>用 <code>tar</code> 将 <code>~/Documents</code> 打包压缩为 <code>documents.tar.gz</code></li><li>用 <code>free -h</code> 查看内存使用，用 <code>uptime</code> 查看系统运行时间和负载</li></ol>`,39)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};