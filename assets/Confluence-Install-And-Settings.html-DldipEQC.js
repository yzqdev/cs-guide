import{_ as e,c as s,a,o as l}from"./app-B6vXTniy.js";const i={};function c(t,n){return l(),s("div",null,[...n[0]||(n[0]=[a(`<h1 id="confluence-安装和配置" tabindex="-1"><a class="header-anchor" href="#confluence-安装和配置"><span>Confluence 安装和配置</span></a></h1><h2 id="confluence-6-15-4" tabindex="-1"><a class="header-anchor" href="#confluence-6-15-4"><span>Confluence 6.15.4</span></a></h2><ul><li>最新 6.15.4 版本时间：2019-05</li></ul><h4 id="数据库" tabindex="-1"><a class="header-anchor" href="#数据库"><span>数据库</span></a></h4><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run \\</span>
<span class="line">	--name mysql-confluence \\</span>
<span class="line">	--restart always \\</span>
<span class="line">	-p 3316:3306 \\</span>
<span class="line">	-e MYSQL_ROOT_PASSWORD=adg123456 \\</span>
<span class="line">	-e MYSQL_DATABASE=confluence_db \\</span>
<span class="line">	-e MYSQL_USER=confluence_user \\</span>
<span class="line">	-e MYSQL_PASSWORD=confluence_123456 \\</span>
<span class="line">	-d \\</span>
<span class="line">	mysql:5.7</span>
<span class="line"></span></code></pre></div><ul><li>连上容器：<code>docker exec -it mysql-confluence /bin/bash</code><ul><li>连上 MySQL：<code>mysql -u root -p</code></li></ul></li><li>设置编码： <ul><li><strong>必须做这一步，不然配置过程会报错，confluence 的 DB 要求是 utf8，还不能是 utf8mb4</strong></li><li><strong>并且排序规则还必须是：utf8_bin</strong></li><li><strong>数据库必须使用&#39;READ-COMMITTED&#39;作为默认隔离级别</strong></li></ul></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">SET NAMES &#39;utf8&#39;;</span>
<span class="line">alter database confluence_db character set utf8 collate utf8_bin;</span>
<span class="line">SET GLOBAL tx_isolation=&#39;READ-COMMITTED&#39;;</span>
<span class="line"></span></code></pre></div><h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h4><ul><li>下载：<a href="https://www.atlassian.com/software/confluence/download" target="_blank" rel="noopener noreferrer">https://www.atlassian.com/software/confluence/download</a><ul><li>选择：linux64 类型下载</li></ul></li><li>授权：<code>chmod +x atlassian-confluence-6.15.4-x64.bin</code></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">./atlassian-confluence-6.15.4-x64.bin</span>
<span class="line"></span>
<span class="line">开始提示：</span>
<span class="line"></span>
<span class="line">Unpacking JRE ...</span>
<span class="line">Starting Installer ...</span>
<span class="line"></span>
<span class="line">This will install Confluence 6.9.0 on your computer.</span>
<span class="line">OK [o, Enter], Cancel [c]</span>
<span class="line"></span>
<span class="line">&gt;&gt; 输入o或直接回车</span>
<span class="line"></span>
<span class="line">Click Next to continue, or Cancel to exit Setup.</span>
<span class="line"></span>
<span class="line">Choose the appropriate installation or upgrade option.</span>
<span class="line">Please choose one of the following:</span>
<span class="line">Express Install (uses default settings) [1], </span>
<span class="line">Custom Install (recommended for advanced users) [2, Enter], </span>
<span class="line">Upgrade an existing Confluence installation [3]</span>
<span class="line">1</span>
<span class="line">&gt;&gt; 这里输入数字1</span>
<span class="line"></span>
<span class="line">See where Confluence will be installed and the settings that will be used.</span>
<span class="line">Installation Directory: /opt/atlassian/confluence </span>
<span class="line">Home Directory: /var/atlassian/application-data/confluence </span>
<span class="line">HTTP Port: 8090 </span>
<span class="line">RMI Port: 8000 </span>
<span class="line">Install as service: Yes </span>
<span class="line">Install [i, Enter], Exit [e]</span>
<span class="line">i</span>
<span class="line"></span>
<span class="line">&gt;&gt; 输入i或者直接回车</span>
<span class="line"></span>
<span class="line">Extracting files ...</span>
<span class="line"></span>
<span class="line">Please wait a few moments while we configure Confluence.</span>
<span class="line"></span>
<span class="line">Installation of Confluence 6.9.0 is complete</span>
<span class="line">Start Confluence now?</span>
<span class="line">Yes [y, Enter], No [n]</span>
<span class="line"></span>
<span class="line">&gt;&gt; 输入y或者直接回车</span>
<span class="line"></span>
<span class="line">Please wait a few moments while Confluence starts up.</span>
<span class="line">Launching Confluence ...</span>
<span class="line"></span>
<span class="line">Installation of Confluence 6.9.0 is complete</span>
<span class="line">Your installation of Confluence 6.9.0 is now ready and can be accessed via</span>
<span class="line">your browser.</span>
<span class="line">Confluence 6.9.0 can be accessed at http://localhost:8090</span>
<span class="line">Finishing installation ...</span>
<span class="line"></span>
<span class="line"># 安装完成，访问本机的8090端口进行web端安装</span>
<span class="line"># 开放防火墙端口</span>
<span class="line">firewall-cmd --add-port=8090/tcp --permanent</span>
<span class="line">firewall-cmd --add-port=8000/tcp --permanent</span>
<span class="line">firewall-cmd --reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>默认是安装在 /opt 目录下：<code>/opt/atlassian/confluence/confluence/WEB-INF/lib</code></li><li>启动：<code>sh /opt/atlassian/confluence/bin/start-confluence.sh</code></li><li>停止：<code>sh /opt/atlassian/confluence/bin/stop-confluence.sh</code></li><li>查看 log：<code>tail -300f /opt/atlassian/confluence/logs/catalina.out</code></li><li>卸载：<code>sh /opt/atlassian/confluence/uninstall</code></li><li>设置 MySQL 连接驱动，把 mysql-connector-java-5.1.47.jar 放在目录 <code>/opt/atlassian/confluence/confluence/WEB-INF/lib</code></li></ul><h4 id="首次配置" tabindex="-1"><a class="header-anchor" href="#首次配置"><span>首次配置</span></a></h4><ul><li>访问：<a href="http://localhost:8090" target="_blank" rel="noopener noreferrer">http://localhost:8090</a></li><li>参考文章：<a href="https://blog.51cto.com/m51cto/2131964" target="_blank" rel="noopener noreferrer">https://blog.51cto.com/m51cto/2131964</a></li><li>参考文章：<a href="https://www.qinjj.tech/2019/01/04/confluence%20install/" target="_blank" rel="noopener noreferrer">https://www.qinjj.tech/2019/01/04/confluence install/</a></li><li>因为步骤一样，所以我就不再截图了。</li></ul><h4 id="license-过程" tabindex="-1"><a class="header-anchor" href="#license-过程"><span>License 过程</span></a></h4><ul><li>参考自己的为知笔记</li></ul><h2 id="反向代理的配置可以参考" tabindex="-1"><a class="header-anchor" href="#反向代理的配置可以参考"><span>反向代理的配置可以参考</span></a></h2><ul><li><a href="https://blog.51cto.com/m51cto/2131964" target="_blank" rel="noopener noreferrer">https://blog.51cto.com/m51cto/2131964</a></li></ul><h2 id="使用-markdown" tabindex="-1"><a class="header-anchor" href="#使用-markdown"><span>使用 markdown</span></a></h2><ul><li>点击右上角小齿轮 &gt; 管理应用 &gt; 搜索市场应用 &gt; 输入 markdown &gt; 安装</li></ul><h2 id="其他资料" tabindex="-1"><a class="header-anchor" href="#其他资料"><span>其他资料</span></a></h2><ul><li><a href="https://www.qinjj.tech/2019/02/26/confluence%20maintain/" target="_blank" rel="noopener noreferrer">https://www.qinjj.tech/2019/02/26/confluence maintain/</a></li><li><a href="https://www.qinjj.tech/2019/02/26/confluence_maintain2/" target="_blank" rel="noopener noreferrer">https://www.qinjj.tech/2019/02/26/confluence_maintain2/</a></li></ul>`,21)])])}const r=e(i,[["render",c]]),p=JSON.parse('{"path":"/linux-tutor/server/Confluence-Install-And-Settings.html","title":"Confluence 安装和配置","lang":"zh-CN","frontmatter":{"description":"Confluence 安装和配置 Confluence 6.15.4 最新 6.15.4 版本时间：2019-05 数据库 连上容器：docker exec -it mysql-confluence /bin/bash 连上 MySQL：mysql -u root -p 设置编码： 必须做这一步，不然配置过程会报错，confluence 的 DB 要求...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Confluence 安装和配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Confluence-Install-And-Settings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Confluence 安装和配置"}],["meta",{"property":"og:description","content":"Confluence 安装和配置 Confluence 6.15.4 最新 6.15.4 版本时间：2019-05 数据库 连上容器：docker exec -it mysql-confluence /bin/bash 连上 MySQL：mysql -u root -p 设置编码： 必须做这一步，不然配置过程会报错，confluence 的 DB 要求..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.85,"words":555},"filePathRelative":"linux-tutor/server/Confluence-Install-And-Settings.md","autoDesc":true}');export{r as comp,p as data};
