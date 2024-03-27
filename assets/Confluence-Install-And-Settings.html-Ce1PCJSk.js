import{_ as s,r as a,o as c,c as o,d as e,e as n,b as i,a as t}from"./app-BO2oONDQ.js";const d={},r=t(`<h1 id="confluence-安装和配置" tabindex="-1"><a class="header-anchor" href="#confluence-安装和配置"><span>Confluence 安装和配置</span></a></h1><h2 id="confluence-6-15-4" tabindex="-1"><a class="header-anchor" href="#confluence-6-15-4"><span>Confluence 6.15.4</span></a></h2><ul><li>最新 6.15.4 版本时间：2019-05</li></ul><h4 id="数据库" tabindex="-1"><a class="header-anchor" href="#数据库"><span>数据库</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run \\
	--name mysql-confluence \\
	--restart always \\
	-p 3316:3306 \\
	-e MYSQL_ROOT_PASSWORD=adg123456 \\
	-e MYSQL_DATABASE=confluence_db \\
	-e MYSQL_USER=confluence_user \\
	-e MYSQL_PASSWORD=confluence_123456 \\
	-d \\
	mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>连上容器：<code>docker exec -it mysql-confluence /bin/bash</code><ul><li>连上 MySQL：<code>mysql -u root -p</code></li></ul></li><li>设置编码： <ul><li><strong>必须做这一步，不然配置过程会报错，confluence 的 DB 要求是 utf8，还不能是 utf8mb4</strong></li><li><strong>并且排序规则还必须是：utf8_bin</strong></li><li><strong>数据库必须使用&#39;READ-COMMITTED&#39;作为默认隔离级别</strong></li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SET NAMES &#39;utf8&#39;;
alter database confluence_db character set utf8 collate utf8_bin;
SET GLOBAL tx_isolation=&#39;READ-COMMITTED&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h4>`,8),u={href:"https://www.atlassian.com/software/confluence/download",target:"_blank",rel:"noopener noreferrer"},v=e("ul",null,[e("li",null,"选择：linux64 类型下载")],-1),m=e("li",null,[n("授权："),e("code",null,"chmod +x atlassian-confluence-6.15.4-x64.bin")],-1),h=t(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>./atlassian-confluence-6.15.4-x64.bin

开始提示：

Unpacking JRE ...
Starting Installer ...

This will install Confluence 6.9.0 on your computer.
OK [o, Enter], Cancel [c]

&gt;&gt; 输入o或直接回车

Click Next to continue, or Cancel to exit Setup.

Choose the appropriate installation or upgrade option.
Please choose one of the following:
Express Install (uses default settings) [1], 
Custom Install (recommended for advanced users) [2, Enter], 
Upgrade an existing Confluence installation [3]
1
&gt;&gt; 这里输入数字1

See where Confluence will be installed and the settings that will be used.
Installation Directory: /opt/atlassian/confluence 
Home Directory: /var/atlassian/application-data/confluence 
HTTP Port: 8090 
RMI Port: 8000 
Install as service: Yes 
Install [i, Enter], Exit [e]
i

&gt;&gt; 输入i或者直接回车

Extracting files ...

Please wait a few moments while we configure Confluence.

Installation of Confluence 6.9.0 is complete
Start Confluence now?
Yes [y, Enter], No [n]

&gt;&gt; 输入y或者直接回车

Please wait a few moments while Confluence starts up.
Launching Confluence ...

Installation of Confluence 6.9.0 is complete
Your installation of Confluence 6.9.0 is now ready and can be accessed via
your browser.
Confluence 6.9.0 can be accessed at http://localhost:8090
Finishing installation ...

# 安装完成，访问本机的8090端口进行web端安装
# 开放防火墙端口
firewall-cmd --add-port=8090/tcp --permanent
firewall-cmd --add-port=8000/tcp --permanent
firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>默认是安装在 /opt 目录下：<code>/opt/atlassian/confluence/confluence/WEB-INF/lib</code></li><li>启动：<code>sh /opt/atlassian/confluence/bin/start-confluence.sh</code></li><li>停止：<code>sh /opt/atlassian/confluence/bin/stop-confluence.sh</code></li><li>查看 log：<code>tail -300f /opt/atlassian/confluence/logs/catalina.out</code></li><li>卸载：<code>sh /opt/atlassian/confluence/uninstall</code></li><li>设置 MySQL 连接驱动，把 mysql-connector-java-5.1.47.jar 放在目录 <code>/opt/atlassian/confluence/confluence/WEB-INF/lib</code></li></ul><h4 id="首次配置" tabindex="-1"><a class="header-anchor" href="#首次配置"><span>首次配置</span></a></h4>`,3),b={href:"http://localhost:8090",target:"_blank",rel:"noopener noreferrer"},f={href:"https://blog.51cto.com/m51cto/2131964",target:"_blank",rel:"noopener noreferrer"},p={href:"https://www.qinjj.tech/2019/01/04/confluence%20install/",target:"_blank",rel:"noopener noreferrer"},g=e("li",null,"因为步骤一样，所以我就不再截图了。",-1),_=e("h4",{id:"license-过程",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#license-过程"},[e("span",null,"License 过程")])],-1),w=e("ul",null,[e("li",null,"参考自己的为知笔记")],-1),x=e("h2",{id:"反向代理的配置可以参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#反向代理的配置可以参考"},[e("span",null,"反向代理的配置可以参考")])],-1),y={href:"https://blog.51cto.com/m51cto/2131964",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"使用-markdown",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#使用-markdown"},[e("span",null,"使用 markdown")])],-1),k=e("ul",null,[e("li",null,"点击右上角小齿轮 > 管理应用 > 搜索市场应用 > 输入 markdown > 安装")],-1),S=e("h2",{id:"其他资料",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#其他资料"},[e("span",null,"其他资料")])],-1),E={href:"https://www.qinjj.tech/2019/02/26/confluence%20maintain/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.qinjj.tech/2019/02/26/confluence_maintain2/",target:"_blank",rel:"noopener noreferrer"};function I(T,j){const l=a("ExternalLinkIcon");return c(),o("div",null,[r,e("ul",null,[e("li",null,[n("下载："),e("a",u,[n("https://www.atlassian.com/software/confluence/download"),i(l)]),v]),m]),h,e("ul",null,[e("li",null,[n("访问："),e("a",b,[n("http://localhost:8090"),i(l)])]),e("li",null,[n("参考文章："),e("a",f,[n("https://blog.51cto.com/m51cto/2131964"),i(l)])]),e("li",null,[n("参考文章："),e("a",p,[n("https://www.qinjj.tech/2019/01/04/confluence install/"),i(l)])]),g]),_,w,x,e("ul",null,[e("li",null,[e("a",y,[n("https://blog.51cto.com/m51cto/2131964"),i(l)])])]),C,k,S,e("ul",null,[e("li",null,[e("a",E,[n("https://www.qinjj.tech/2019/02/26/confluence maintain/"),i(l)])]),e("li",null,[e("a",q,[n("https://www.qinjj.tech/2019/02/26/confluence_maintain2/"),i(l)])])])])}const L=s(d,[["render",I],["__file","Confluence-Install-And-Settings.html.vue"]]),M=JSON.parse('{"path":"/linux-tutor/server/Confluence-Install-And-Settings.html","title":"Confluence 安装和配置","lang":"zh-CN","frontmatter":{"description":"Confluence 安装和配置 Confluence 6.15.4 最新 6.15.4 版本时间：2019-05 数据库 连上容器：docker exec -it mysql-confluence /bin/bash 连上 MySQL：mysql -u root -p 设置编码： 必须做这一步，不然配置过程会报错，confluence 的 DB 要求...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Confluence-Install-And-Settings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Confluence 安装和配置"}],["meta",{"property":"og:description","content":"Confluence 安装和配置 Confluence 6.15.4 最新 6.15.4 版本时间：2019-05 数据库 连上容器：docker exec -it mysql-confluence /bin/bash 连上 MySQL：mysql -u root -p 设置编码： 必须做这一步，不然配置过程会报错，confluence 的 DB 要求..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Confluence 安装和配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Confluence 6.15.4","slug":"confluence-6-15-4","link":"#confluence-6-15-4","children":[{"level":4,"title":"数据库","slug":"数据库","link":"#数据库","children":[]},{"level":4,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":4,"title":"首次配置","slug":"首次配置","link":"#首次配置","children":[]},{"level":4,"title":"License 过程","slug":"license-过程","link":"#license-过程","children":[]}]},{"level":2,"title":"反向代理的配置可以参考","slug":"反向代理的配置可以参考","link":"#反向代理的配置可以参考","children":[]},{"level":2,"title":"使用 markdown","slug":"使用-markdown","link":"#使用-markdown","children":[]},{"level":2,"title":"其他资料","slug":"其他资料","link":"#其他资料","children":[]}],"git":{"createdTime":1653615455000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.85,"words":555},"filePathRelative":"linux-tutor/server/Confluence-Install-And-Settings.md","localizedDate":"2022年5月27日","autoDesc":true}');export{L as comp,M as data};
