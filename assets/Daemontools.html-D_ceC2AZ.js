import{_ as e,c as o,o as s,d as r}from"./app-CbULZrmi.js";const t={},i=r(`<h1 id="daemontools-工具" tabindex="-1"><a class="header-anchor" href="#daemontools-工具"><span>daemontools 工具</span></a></h1><h2 id="supervisord" tabindex="-1"><a class="header-anchor" href="#supervisord"><span>supervisord</span></a></h2><ul><li><p>注意：Supervisor 能管理非 daemon 的进程，也就是说 Supervisor 不能管理守护进程。否则提示 Exited too quickly (process log may have details) 异常。</p></li><li><p>Supervisor 不支持 python 3，安装 python 2 方法：<a href="http://www.cnblogs.com/alex-xia/p/6062741.html" target="_blank" rel="noopener noreferrer">http://www.cnblogs.com/alex-xia/p/6062741.html</a></p></li><li><p>官网：<a href="http://supervisord.org/installing.html" target="_blank" rel="noopener noreferrer">http://supervisord.org/installing.html</a></p></li><li><p>安装过程：</p><ul><li>解释：easy_install 是 setuptools 包里带的一个命令，使用 easy_install 实际上是在调用 setuptools 来完成安装模块的工作,所以安装 setuptools 即可。</li></ul></li><li><p>安装方案：</p></li></ul><pre><code>#第一种（推荐）
yum install python-setuptools
easy_install supervisor

#第二种
yum install python-setuptools
easy_install pip
pip install supervisor

#第三种
yum install -y epel-release
yum install -y supervisor
</code></pre><ul><li>如果以上还不能安装，或是安装过程出现各种问题，或是安装完成后使用出现问题，应该就是环境有问题。至少我在京东云上发现会有这个问题。环境是 centos 6.8，python 2.6.6</li><li>如果你遇到这种问题需要源码安装。</li><li>源码和各个依赖的源码下载地址（密码：j797）：<a href="http://pan.baidu.com/s/1hsGhNkK" target="_blank" rel="noopener noreferrer">http://pan.baidu.com/s/1hsGhNkK</a></li></ul><pre><code>tar zxvf setuptools-36.6.0.tar.gz
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
</code></pre><ul><li>生成配置文件：<code>echo_supervisord_conf &gt; /etc/supervisord.conf</code></li><li>创建专门的程序配置文件目录、日志目录： <ul><li><code>mkdir -p /var/log/supervisor</code></li><li><code>mkdir -p /etc/supervisor/conf.d/</code></li><li><code>echo -e &quot;[include]\\nfiles = /etc/supervisor/conf.d/*.conf&quot;&gt;&gt;/etc/supervisord.conf</code></li></ul></li><li>安装完成的内容介绍：supervisor 安装完成后会生成三个执行程序： <ul><li>supervisortd：supervisor 的守护进程服务（用于接收进程管理命令）</li><li>supervisorctl：客户端（用于和守护进程通信，发送管理进程的指令）</li><li>echo_supervisord_conf：生成初始配置文件程序。</li></ul></li><li>程序位置：<code>/usr/bin/supervisord</code></li><li>配置文件位置：<code>/etc/supervisord.conf</code></li></ul><h3 id="logstash-进程进行守护" tabindex="-1"><a class="header-anchor" href="#logstash-进程进行守护"><span>Logstash 进程进行守护</span></a></h3><ul><li>默认安装完 Supervisor 是已经启动的，所以在加入新配置之前，需要先停止程序：<code>ps -ef | grep supervisord</code>，kill 对应的 pid</li><li>创建配置文件：<code>vim /etc/supervisor/conf.d/logstash.conf</code></li></ul><pre><code class="language-nginx">[program:gitnavi-logstash]
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
</code></pre><ul><li>该配置的具体说明可以参考：<a href="http://liyangliang.me/posts/2015/06/using-supervisor/" target="_blank" rel="noopener noreferrer">使用 supervisor 管理进程</a></li><li>启动程序（默认会启动所有子任务）：<code>/usr/bin/supervisord -c /etc/supervisord.conf</code></li><li>管理子任务的命令： <ul><li>子任务状态：<code>/usr/bin/supervisorctl status</code></li><li>启动所有子任务：<code>/usr/bin/supervisorctl start all</code></li><li>结束所有子任务：<code>/usr/bin/supervisorctl stop all</code></li><li>启动指定子任务：<code>/usr/bin/supervisorctl start gitnavi-logstash</code></li><li>结束指定子任务：<code>/usr/bin/supervisorctl stop gitnavi-logstash</code></li><li>重启指定子任务：<code>/usr/bin/supervisorctl restart gitnavi-logstash</code></li><li>只载入最新的配置文件, 并不重启任何进程：<code>/usr/bin/supervisorctl reread</code></li><li>载入最新的配置文件，停止原来的所有进程并按新的配置启动管理所有进程：<code>/usr/bin/supervisorctl reload</code></li><li>根据最新的配置文件，启动新配置或有改动的进程，配置没有改动的进程不会受影响而重启：<code>/usr/bin/supervisorctl update</code></li><li>查看所有子任务状态，如果没有运行的子任务则是没有任何反馈信息：<code>/usr/bin/supervisorctl status</code></li></ul></li><li>管理所有子任务也可以用交互方式，输入命令：<code>supervisorctl</code>，会进入 supervisord 的交互模式下，如果当前有启动的任务，还可以看到对应的任务情况。 <ul><li>在该交互下可以停止指定名称的子任务，比如 logstash 任务：<code>stop gitnavi-logstash</code></li><li>也可以停止所有子任务：<code>stop all</code></li><li>也可以启动所有子任务：<code>start all</code></li><li>更多命令可以输入：<code>help</code></li></ul></li></ul><h3 id="设置-supervisord-开启自启动" tabindex="-1"><a class="header-anchor" href="#设置-supervisord-开启自启动"><span>设置 supervisord 开启自启动</span></a></h3><h4 id="centos-6" tabindex="-1"><a class="header-anchor" href="#centos-6"><span>CentOS 6</span></a></h4><ul><li>创建文件：<code>vim /etc/init.d/supervisord</code></li></ul><pre><code class="language-nginx">#!/bin/sh
#
# Supervisor is a client/server system that
# allows its users to monitor and control a
# number of processes on UNIX-like operating
# systems.
#
# chkconfig: - 64 36
# description: Supervisor Server
# processname: supervisord
# Source init functions
. /etc/init.d/functions
RETVAL=0
prog=&quot;supervisord&quot;
pidfile=&quot;/tmp/supervisord.pid&quot;
lockfile=&quot;/var/lock/subsys/supervisord&quot;
start()
{
echo -n $&quot;Starting $prog: &quot;
daemon --pidfile $pidfile supervisord -c /etc/supervisord.conf
RETVAL=$?
echo
[ $RETVAL -eq 0 ] &amp;&amp; touch \${lockfile}
}
stop()
{
echo -n $&quot;Shutting down $prog: &quot;
killproc -p \${pidfile} /usr/bin/supervisord
RETVAL=$?
echo
if [ $RETVAL -eq 0 ] ; then
rm -f \${lockfile} \${pidfile}
fi
}
case &quot;$1&quot; in
start)
start ;;
stop) stop ;;
status)
status $prog ;;
restart)
stop
start ;;
*)
echo &quot;Usage: $0 {start|stop|restart|status}&quot; ;;
esac
</code></pre><ul><li><code>chmod 755 /etc/init.d/supervisord</code></li><li><code>chkconfig supervisord on</code></li><li>以后启动可以用：<code>service supervisord start</code></li><li>以后停止可以用：<code>service supervisord stop</code></li></ul><h4 id="centos-7" tabindex="-1"><a class="header-anchor" href="#centos-7"><span>CentOS 7</span></a></h4><ul><li>创建文件：<code>vim /lib/systemd/system/supervisor.service</code></li></ul><pre><code class="language-ini">[Unit]
Description=supervisor
After=network.target

[Service]
Type=forking
ExecStart=/usr/bin/supervisord -c /etc/supervisord.conf
ExecStop=/usr/bin/supervisorctl $OPTIONS shutdown
ExecReload=/usr/bin/supervisorctl $OPTIONS reload
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target
</code></pre><ul><li><code>chmod 766 /lib/systemd/system/supervisor.service</code></li><li><code>systemctl enable supervisor.service</code></li><li><code>systemctl daemon-reload</code></li></ul><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="http://blog.csdn.net/xyang81/article/details/51555473" target="_blank" rel="noopener noreferrer">http://blog.csdn.net/xyang81/article/details/51555473</a></li><li><a href="https://www.fangc.xyz/detail/centos6pei-zhi-supervisorkai-j/" target="_blank" rel="noopener noreferrer">https://www.fangc.xyz/detail/centos6pei-zhi-supervisorkai-j/</a></li><li><a href="http://cpper.info/2016/04/14/supervisor-usage.html" target="_blank" rel="noopener noreferrer">http://cpper.info/2016/04/14/supervisor-usage.html</a></li><li><a href="https://luckymrwang.github.io/2016/12/23/Supervisor%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8/" target="_blank" rel="noopener noreferrer">https://luckymrwang.github.io/2016/12/23/Supervisor安装使用/</a></li><li><a href="http://www.aichengxu.com/linux/24569479.htm" target="_blank" rel="noopener noreferrer">http://www.aichengxu.com/linux/24569479.htm</a></li><li><a href="http://www.tianfeiyu.com/?p=2450" target="_blank" rel="noopener noreferrer">http://www.tianfeiyu.com/?p=2450</a></li></ul>`,22),l=[i];function n(a,p){return s(),o("div",null,l)}const u=e(t,[["render",n],["__file","Daemontools.html.vue"]]),d=JSON.parse('{"path":"/linux-tutor/server/Daemontools.html","title":"daemontools 工具","lang":"zh-CN","frontmatter":{"description":"daemontools 工具 supervisord 注意：Supervisor 能管理非 daemon 的进程，也就是说 Supervisor 不能管理守护进程。否则提示 Exited too quickly (process log may have details) 异常。 Supervisor 不支持 python 3，安装 python 2 ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Daemontools.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"daemontools 工具"}],["meta",{"property":"og:description","content":"daemontools 工具 supervisord 注意：Supervisor 能管理非 daemon 的进程，也就是说 Supervisor 不能管理守护进程。否则提示 Exited too quickly (process log may have details) 异常。 Supervisor 不支持 python 3，安装 python 2 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"daemontools 工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"supervisord","slug":"supervisord","link":"#supervisord","children":[{"level":3,"title":"Logstash 进程进行守护","slug":"logstash-进程进行守护","link":"#logstash-进程进行守护","children":[]},{"level":3,"title":"设置 supervisord 开启自启动","slug":"设置-supervisord-开启自启动","link":"#设置-supervisord-开启自启动","children":[{"level":4,"title":"CentOS 6","slug":"centos-6","link":"#centos-6","children":[]},{"level":4,"title":"CentOS 7","slug":"centos-7","link":"#centos-7","children":[]}]}]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.56,"words":1069},"filePathRelative":"linux-tutor/server/Daemontools.md","localizedDate":"2022年5月26日","autoDesc":true}');export{u as comp,d as data};
