import{_ as s,c as a,a as e,o as l}from"./app-B6vXTniy.js";const i={};function c(t,n){return l(),a("div",null,[...n[0]||(n[0]=[e(`<h2 id="安装-centos-7-4" tabindex="-1"><a class="header-anchor" href="#安装-centos-7-4"><span>安装（CentOS 7.4）</span></a></h2><ul><li><p>注意，如果是在 CentOS 6 下安装会碰到一些问题，可以参考：<a href="https://www.jianshu.com/p/7cacc1d20588" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/7cacc1d20588</a></p></li><li><ol><li>安装依赖包</li></ol></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">yum install -y ncurses-devel</span>
<span class="line">wget http://geolite.maxmind.com/download/geoip/api/c/GeoIP.tar.gz</span>
<span class="line">tar -zxvf GeoIP.tar.gz</span>
<span class="line">cd GeoIP-1.4.8/</span>
<span class="line">./configure</span>
<span class="line">make &amp;&amp; make install</span>
<span class="line"></span></code></pre></div><ul><li><ol start="2"><li>安装 GoAccess</li></ol></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">wget http://tar.goaccess.io/goaccess-1.2.tar.gz</span>
<span class="line">tar -xzvf goaccess-1.2.tar.gz</span>
<span class="line">cd goaccess-1.2/ </span>
<span class="line">./configure --enable-utf8 --enable-geoip=legacy</span>
<span class="line">make &amp;&amp; make install</span>
<span class="line"></span></code></pre></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2><ul><li>假设你 nginx 安装在：<code>/usr/local/nginx</code></li><li>假设你 nginx 的 log 输出到：<code>/var/log/nginx</code></li><li>修改 <code>vim /usr/local/nginx/conf/nginx.conf</code> 指定 nginx 的日志格式</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line">http {</span>
<span class="line">	charset  utf8;</span>
<span class="line"></span>
<span class="line">	log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
<span class="line">	                &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
<span class="line">	                &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; &quot;$request_time&quot;&#39;;</span>
<span class="line"></span>
<span class="line">	access_log /var/log/nginx/access.log main;</span>
<span class="line">	error_log /var/log/nginx/error.log;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><ul><li>停止 nginx：<code>/usr/local/nginx/sbin/nginx -s stop</code></li><li>备份旧的 nginx log 文件：<code>mv /var/log/nginx/access.log /var/log/nginx/access.log.20180702back</code></li><li>启动 nginx：<code>/usr/local/nginx/sbin/nginx</code></li><li>创建 GoAccess 配置文件：<code>vim /etc/goaccess_log_conf_nginx.conf</code></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">time-format %T</span>
<span class="line">date-format %d/%b/%Y</span>
<span class="line">log_format %h - %^ [%d:%t %^] &quot;%r&quot; %s %b &quot;%R&quot; &quot;%u&quot; &quot;%^&quot; %^ %^ %^ %T</span>
<span class="line"></span></code></pre></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><h4 id="在终端上展示数据" tabindex="-1"><a class="header-anchor" href="#在终端上展示数据"><span>在终端上展示数据</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">goaccess -a -d -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf</span>
<span class="line"></span></code></pre></div><h4 id="手动生成当前统计页面" tabindex="-1"><a class="header-anchor" href="#手动生成当前统计页面"><span>手动生成当前统计页面</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">goaccess -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf -o /usr/local/nginx/report/index.html</span>
<span class="line"></span></code></pre></div><ul><li>更多参数用法：</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">时间分布图上：按小时展示数据：</span>
<span class="line">goaccess -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf -o /usr/local/nginx/report/index.html --ignore-crawlers --hour-spec=min</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">时间分布图上：按分钟展示数据：</span>
<span class="line">goaccess -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf -o /usr/local/nginx/report/index.html --ignore-crawlers --hour-spec=hour</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">不显示指定的面板</span>
<span class="line">goaccess -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf -o /usr/local/nginx/report/index.html --ignore-crawlers --hour-spec=min \\</span>
<span class="line">	--ignore-panel=VISITORS \\</span>
<span class="line">	--ignore-panel=REQUESTS \\</span>
<span class="line">	--ignore-panel=REQUESTS_STATIC \\</span>
<span class="line">	--ignore-panel=NOT_FOUND \\</span>
<span class="line">	--ignore-panel=HOSTS \\</span>
<span class="line">	--ignore-panel=OS \\</span>
<span class="line">	--ignore-panel=BROWSERS \\</span>
<span class="line">	--ignore-panel=VIRTUAL_HOSTS \\</span>
<span class="line">	--ignore-panel=REFERRERS \\</span>
<span class="line">	--ignore-panel=REFERRING_SITES \\</span>
<span class="line">	--ignore-panel=KEYPHRASES \\</span>
<span class="line">	--ignore-panel=STATUS_CODES \\</span>
<span class="line">	--ignore-panel=REMOTE_USER \\</span>
<span class="line">	--ignore-panel=GEO_LOCATION</span>
<span class="line"></span>
<span class="line">我一般只留下几个面板（排除掉不想看的面板，因为使用 --enable-panel 参数无法达到这个目的）</span>
<span class="line">goaccess -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf -o /usr/local/nginx/report/index.html --ignore-crawlers --hour-spec=min \\</span>
<span class="line">	--ignore-panel=VISITORS \\</span>
<span class="line">	--ignore-panel=REQUESTS_STATIC \\</span>
<span class="line">	--ignore-panel=NOT_FOUND \\</span>
<span class="line">	--ignore-panel=OS \\</span>
<span class="line">	--ignore-panel=VIRTUAL_HOSTS \\</span>
<span class="line">	--ignore-panel=REFERRERS \\</span>
<span class="line">	--ignore-panel=KEYPHRASES \\</span>
<span class="line">	--ignore-panel=REMOTE_USER \\</span>
<span class="line">	--ignore-panel=GEO_LOCATION</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方便执行命令创建脚本" tabindex="-1"><a class="header-anchor" href="#方便执行命令创建脚本"><span>方便执行命令创建脚本</span></a></h4><ul><li><code>vim goaccess_report_by_min.sh</code></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">goaccess -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf -o /usr/local/nginx/report/index.html --ignore-crawlers --hour-spec=min \\</span>
<span class="line">	--ignore-panel=VISITORS \\</span>
<span class="line">	--ignore-panel=REQUESTS_STATIC \\</span>
<span class="line">	--ignore-panel=NOT_FOUND \\</span>
<span class="line">	--ignore-panel=OS \\</span>
<span class="line">	--ignore-panel=VIRTUAL_HOSTS \\</span>
<span class="line">	--ignore-panel=REFERRERS \\</span>
<span class="line">	--ignore-panel=KEYPHRASES \\</span>
<span class="line">	--ignore-panel=REMOTE_USER \\</span>
<span class="line">	--ignore-panel=GEO_LOCATION</span>
<span class="line"></span></code></pre></div><ul><li><code>vim goaccess_report_by_hour.sh</code></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">goaccess -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf -o /usr/local/nginx/report/index.html --ignore-crawlers --hour-spec=hour \\</span>
<span class="line">	--ignore-panel=VISITORS \\</span>
<span class="line">	--ignore-panel=REQUESTS_STATIC \\</span>
<span class="line">	--ignore-panel=NOT_FOUND \\</span>
<span class="line">	--ignore-panel=OS \\</span>
<span class="line">	--ignore-panel=VIRTUAL_HOSTS \\</span>
<span class="line">	--ignore-panel=REFERRERS \\</span>
<span class="line">	--ignore-panel=KEYPHRASES \\</span>
<span class="line">	--ignore-panel=REMOTE_USER \\</span>
<span class="line">	--ignore-panel=GEO_LOCATION</span>
<span class="line"></span></code></pre></div><h4 id="实时生成统计页面" tabindex="-1"><a class="header-anchor" href="#实时生成统计页面"><span>实时生成统计页面</span></a></h4><ul><li>我个人看法是：一般没必要浪费这个性能，需要的时候执行下脚本就行了。</li><li>官网文档：<a href="https://goaccess.io/man#examples" target="_blank" rel="noopener noreferrer">https://goaccess.io/man#examples</a>，查询关键字：<strong>REAL TIME HTML OUTPUT</strong></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">goaccess -f /var/log/nginx/access.log -p /etc/goaccess_log_conf_nginx.conf -o /usr/local/nginx/report/index.html --real-time-html --daemonize </span>
<span class="line"></span></code></pre></div><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="https://www.fanhaobai.com/2017/06/go-access.html" target="_blank" rel="noopener noreferrer">https://www.fanhaobai.com/2017/06/go-access.html</a></li><li><a href="https://www.imydl.tech/lnmp/32.html" target="_blank" rel="noopener noreferrer">https://www.imydl.tech/lnmp/32.html</a></li></ul>`,27)])])}const p=s(i,[["render",c]]),r=JSON.parse('{"path":"/linux-tutor/server/GoAccess-Install-And-Settings.html","title":"","lang":"zh-CN","frontmatter":{"description":"安装（CentOS 7.4） 注意，如果是在 CentOS 6 下安装会碰到一些问题，可以参考：https://www.jianshu.com/p/7cacc1d20588 安装依赖包 安装 GoAccess 配置 假设你 nginx 安装在：/usr/local/nginx 假设你 nginx 的 log 输出到：/var/log/nginx 修改 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-26T16:41:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/GoAccess-Install-And-Settings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:description","content":"安装（CentOS 7.4） 注意，如果是在 CentOS 6 下安装会碰到一些问题，可以参考：https://www.jianshu.com/p/7cacc1d20588 安装依赖包 安装 GoAccess 配置 假设你 nginx 安装在：/usr/local/nginx 假设你 nginx 的 log 输出到：/var/log/nginx 修改 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-26T16:41:58.000Z"}],["meta",{"property":"article:modified_time","content":"2022-07-26T16:41:58.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1658853718000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.89,"words":566},"filePathRelative":"linux-tutor/server/GoAccess-Install-And-Settings.md","autoDesc":true}');export{p as comp,r as data};
