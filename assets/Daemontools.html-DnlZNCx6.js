import{_ as t,r as l,o,c as r,d as s,e as n,b as a,a as i}from"./app-BO2oONDQ.js";const c={},p=s("h1",{id:"daemontools-工具",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#daemontools-工具"},[s("span",null,"daemontools 工具")])],-1),d=s("h2",{id:"supervisord",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#supervisord"},[s("span",null,"supervisord")])],-1),u=s("li",null,[s("p",null,"注意：Supervisor 能管理非 daemon 的进程，也就是说 Supervisor 不能管理守护进程。否则提示 Exited too quickly (process log may have details) 异常。")],-1),v={href:"http://www.cnblogs.com/alex-xia/p/6062741.html",target:"_blank",rel:"noopener noreferrer"},m={href:"http://supervisord.org/installing.html",target:"_blank",rel:"noopener noreferrer"},h=s("li",null,[s("p",null,"安装过程："),s("ul",null,[s("li",null,"解释：easy_install 是 setuptools 包里带的一个命令，使用 easy_install 实际上是在调用 setuptools 来完成安装模块的工作,所以安装 setuptools 即可。")])],-1),k=s("li",null,[s("p",null,"安装方案：")],-1),b=i(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#第一种（推荐）
yum install python-setuptools
easy_install supervisor

#第二种
yum install python-setuptools
easy_install pip
pip install supervisor

#第三种
yum install -y epel-release
yum install -y supervisor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),g=s("li",null,"如果以上还不能安装，或是安装过程出现各种问题，或是安装完成后使用出现问题，应该就是环境有问题。至少我在京东云上发现会有这个问题。环境是 centos 6.8，python 2.6.6",-1),y=s("li",null,"如果你遇到这种问题需要源码安装。",-1),f={href:"http://pan.baidu.com/s/1hsGhNkK",target:"_blank",rel:"noopener noreferrer"},_=i(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>tar zxvf setuptools-36.6.0.tar.gz
cd setuptools-36.6.0
python bootstrap.py install
python setup.py install

tar zxvf meld3.tar.gz
cd meld3
python setup.py install

tar zxvf elementtree-1.2.6-20050316.tar.gz
cd elementtree-1.2.6-20050316
python setup.py install

tar zxvf supervisor-3.3.3.tar.gz
cd supervisor-3.3.3
python setup.py  install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>生成配置文件：<code>echo_supervisord_conf &gt; /etc/supervisord.conf</code></li><li>创建专门的程序配置文件目录、日志目录： <ul><li><code>mkdir -p /var/log/supervisor</code></li><li><code>mkdir -p /etc/supervisor/conf.d/</code></li><li><code>echo -e &quot;[include]\\nfiles = /etc/supervisor/conf.d/*.conf&quot;&gt;&gt;/etc/supervisord.conf</code></li></ul></li><li>安装完成的内容介绍：supervisor 安装完成后会生成三个执行程序： <ul><li>supervisortd：supervisor 的守护进程服务（用于接收进程管理命令）</li><li>supervisorctl：客户端（用于和守护进程通信，发送管理进程的指令）</li><li>echo_supervisord_conf：生成初始配置文件程序。</li></ul></li><li>程序位置：<code>/usr/bin/supervisord</code></li><li>配置文件位置：<code>/etc/supervisord.conf</code></li></ul><h3 id="logstash-进程进行守护" tabindex="-1"><a class="header-anchor" href="#logstash-进程进行守护"><span>Logstash 进程进行守护</span></a></h3><ul><li>默认安装完 Supervisor 是已经启动的，所以在加入新配置之前，需要先停止程序：<code>ps -ef | grep supervisord</code>，kill 对应的 pid</li><li>创建配置文件：<code>vim /etc/supervisor/conf.d/logstash.conf</code></li></ul><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code>[program:gitnavi-logstash]
command=/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/logstash.conf
stdout_logfile=/var/log/supervisor/supervisord-logstash.log
stderr_logfile=/var/log/supervisor/supervisord-logstash-err.log
user=root
autostart=true
autorestart=false
startsecs=5
priority=1
stopasgroup=true
killasgroup=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),x={href:"http://liyangliang.me/posts/2015/06/using-supervisor/",target:"_blank",rel:"noopener noreferrer"},w=i("<li>启动程序（默认会启动所有子任务）：<code>/usr/bin/supervisord -c /etc/supervisord.conf</code></li><li>管理子任务的命令： <ul><li>子任务状态：<code>/usr/bin/supervisorctl status</code></li><li>启动所有子任务：<code>/usr/bin/supervisorctl start all</code></li><li>结束所有子任务：<code>/usr/bin/supervisorctl stop all</code></li><li>启动指定子任务：<code>/usr/bin/supervisorctl start gitnavi-logstash</code></li><li>结束指定子任务：<code>/usr/bin/supervisorctl stop gitnavi-logstash</code></li><li>重启指定子任务：<code>/usr/bin/supervisorctl restart gitnavi-logstash</code></li><li>只载入最新的配置文件, 并不重启任何进程：<code>/usr/bin/supervisorctl reread</code></li><li>载入最新的配置文件，停止原来的所有进程并按新的配置启动管理所有进程：<code>/usr/bin/supervisorctl reload</code></li><li>根据最新的配置文件，启动新配置或有改动的进程，配置没有改动的进程不会受影响而重启：<code>/usr/bin/supervisorctl update</code></li><li>查看所有子任务状态，如果没有运行的子任务则是没有任何反馈信息：<code>/usr/bin/supervisorctl status</code></li></ul></li><li>管理所有子任务也可以用交互方式，输入命令：<code>supervisorctl</code>，会进入 supervisord 的交互模式下，如果当前有启动的任务，还可以看到对应的任务情况。 <ul><li>在该交互下可以停止指定名称的子任务，比如 logstash 任务：<code>stop gitnavi-logstash</code></li><li>也可以停止所有子任务：<code>stop all</code></li><li>也可以启动所有子任务：<code>start all</code></li><li>更多命令可以输入：<code>help</code></li></ul></li>",3),S=i(`<h3 id="设置-supervisord-开启自启动" tabindex="-1"><a class="header-anchor" href="#设置-supervisord-开启自启动"><span>设置 supervisord 开启自启动</span></a></h3><h4 id="centos-6" tabindex="-1"><a class="header-anchor" href="#centos-6"><span>CentOS 6</span></a></h4><ul><li>创建文件：<code>vim /etc/init.d/supervisord</code></li></ul><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code><span class="token comment">#!/bin/sh</span>
<span class="token comment">#</span>
<span class="token comment"># Supervisor is a client/server system that</span>
<span class="token comment"># allows its users to monitor and control a</span>
<span class="token comment"># number of processes on UNIX-like operating</span>
<span class="token comment"># systems.</span>
<span class="token comment">#</span>
<span class="token comment"># chkconfig: - 64 36</span>
<span class="token comment"># description: Supervisor Server</span>
<span class="token comment"># processname: supervisord</span>
<span class="token comment"># Source init functions</span>
. /etc/init.d/functions
<span class="token directive"><span class="token keyword">RETVAL=0</span>
prog=<span class="token string">&quot;supervisord&quot;</span>
pidfile=<span class="token string">&quot;/tmp/supervisord.pid&quot;</span>
lockfile=<span class="token string">&quot;/var/lock/subsys/supervisord&quot;</span>
start()</span>
<span class="token punctuation">{</span>
<span class="token directive"><span class="token keyword">echo</span> -n $<span class="token string">&quot;Starting <span class="token variable">$prog</span>: &quot;</span>
daemon --pidfile <span class="token variable">$pidfile</span> supervisord -c /etc/supervisord.conf
RETVAL=$?
echo
[ <span class="token variable">$RETVAL</span> -eq <span class="token number">0</span> ] &amp;&amp; touch $</span><span class="token punctuation">{</span>lockfile<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">stop()</span></span>
<span class="token punctuation">{</span>
<span class="token directive"><span class="token keyword">echo</span> -n $<span class="token string">&quot;Shutting down <span class="token variable">$prog</span>: &quot;</span>
killproc -p $</span><span class="token punctuation">{</span>pidfile<span class="token punctuation">}</span> /usr/bin/supervisord
<span class="token directive"><span class="token keyword">RETVAL=$?</span>
echo
if [ <span class="token variable">$RETVAL</span> -eq <span class="token number">0</span> ]</span> <span class="token punctuation">;</span> <span class="token directive"><span class="token keyword">then</span>
rm -f $</span><span class="token punctuation">{</span>lockfile<span class="token punctuation">}</span> $<span class="token punctuation">{</span>pidfile<span class="token punctuation">}</span>
fi
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> in
start)
start</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">stop)</span> stop</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">status)</span>
status <span class="token variable">$prog</span></span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">restart)</span>
stop
start</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
*)
<span class="token directive"><span class="token keyword">echo</span> <span class="token string">&quot;Usage: <span class="token variable">$0</span> {start|stop|restart|status}&quot;</span></span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
esac
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>chmod 755 /etc/init.d/supervisord</code></li><li><code>chkconfig supervisord on</code></li><li>以后启动可以用：<code>service supervisord start</code></li><li>以后停止可以用：<code>service supervisord stop</code></li></ul><h4 id="centos-7" tabindex="-1"><a class="header-anchor" href="#centos-7"><span>CentOS 7</span></a></h4><ul><li>创建文件：<code>vim /lib/systemd/system/supervisor.service</code></li></ul><div class="language-ini line-numbers-mode" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">supervisor</span>
<span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">network.target</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">forking</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/supervisord -c /etc/supervisord.conf</span>
<span class="token key attr-name">ExecStop</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/supervisorctl $OPTIONS shutdown</span>
<span class="token key attr-name">ExecReload</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/supervisorctl $OPTIONS reload</span>
<span class="token key attr-name">KillMode</span><span class="token punctuation">=</span><span class="token value attr-value">process</span>
<span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">on-failure</span>
<span class="token key attr-name">RestartSec</span><span class="token punctuation">=</span><span class="token value attr-value">42s</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>chmod 766 /lib/systemd/system/supervisor.service</code></li><li><code>systemctl enable supervisor.service</code></li><li><code>systemctl daemon-reload</code></li></ul><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2>`,10),q={href:"http://blog.csdn.net/xyang81/article/details/51555473",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.fangc.xyz/detail/centos6pei-zhi-supervisorkai-j/",target:"_blank",rel:"noopener noreferrer"},E={href:"http://cpper.info/2016/04/14/supervisor-usage.html",target:"_blank",rel:"noopener noreferrer"},$={href:"https://luckymrwang.github.io/2016/12/23/Supervisor%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8/",target:"_blank",rel:"noopener noreferrer"},T={href:"http://www.aichengxu.com/linux/24569479.htm",target:"_blank",rel:"noopener noreferrer"},N={href:"http://www.tianfeiyu.com/?p=2450",target:"_blank",rel:"noopener noreferrer"};function A(D,L){const e=l("ExternalLinkIcon");return o(),r("div",null,[p,d,s("ul",null,[u,s("li",null,[s("p",null,[n("Supervisor 不支持 python 3，安装 python 2 方法："),s("a",v,[n("http://www.cnblogs.com/alex-xia/p/6062741.html"),a(e)])])]),s("li",null,[s("p",null,[n("官网："),s("a",m,[n("http://supervisord.org/installing.html"),a(e)])])]),h,k]),b,s("ul",null,[g,y,s("li",null,[n("源码和各个依赖的源码下载地址（密码：j797）："),s("a",f,[n("http://pan.baidu.com/s/1hsGhNkK"),a(e)])])]),_,s("ul",null,[s("li",null,[n("该配置的具体说明可以参考："),s("a",x,[n("使用 supervisor 管理进程"),a(e)])]),w]),S,s("ul",null,[s("li",null,[s("a",q,[n("http://blog.csdn.net/xyang81/article/details/51555473"),a(e)])]),s("li",null,[s("a",z,[n("https://www.fangc.xyz/detail/centos6pei-zhi-supervisorkai-j/"),a(e)])]),s("li",null,[s("a",E,[n("http://cpper.info/2016/04/14/supervisor-usage.html"),a(e)])]),s("li",null,[s("a",$,[n("https://luckymrwang.github.io/2016/12/23/Supervisor安装使用/"),a(e)])]),s("li",null,[s("a",T,[n("http://www.aichengxu.com/linux/24569479.htm"),a(e)])]),s("li",null,[s("a",N,[n("http://www.tianfeiyu.com/?p=2450"),a(e)])])])])}const R=t(c,[["render",A],["__file","Daemontools.html.vue"]]),V=JSON.parse('{"path":"/linux-tutor/server/Daemontools.html","title":"daemontools 工具","lang":"zh-CN","frontmatter":{"description":"daemontools 工具 supervisord 注意：Supervisor 能管理非 daemon 的进程，也就是说 Supervisor 不能管理守护进程。否则提示 Exited too quickly (process log may have details) 异常。 Supervisor 不支持 python 3，安装 python 2 ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Daemontools.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"daemontools 工具"}],["meta",{"property":"og:description","content":"daemontools 工具 supervisord 注意：Supervisor 能管理非 daemon 的进程，也就是说 Supervisor 不能管理守护进程。否则提示 Exited too quickly (process log may have details) 异常。 Supervisor 不支持 python 3，安装 python 2 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"daemontools 工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"supervisord","slug":"supervisord","link":"#supervisord","children":[{"level":3,"title":"Logstash 进程进行守护","slug":"logstash-进程进行守护","link":"#logstash-进程进行守护","children":[]},{"level":3,"title":"设置 supervisord 开启自启动","slug":"设置-supervisord-开启自启动","link":"#设置-supervisord-开启自启动","children":[{"level":4,"title":"CentOS 6","slug":"centos-6","link":"#centos-6","children":[]},{"level":4,"title":"CentOS 7","slug":"centos-7","link":"#centos-7","children":[]}]}]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1653615455000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.56,"words":1069},"filePathRelative":"linux-tutor/server/Daemontools.md","localizedDate":"2022年5月27日","autoDesc":true}');export{R as comp,V as data};
