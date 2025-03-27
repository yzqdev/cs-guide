import{_ as e,c as n,a as s,o as t}from"./app-C8DxhDIZ.js";const r={};function l(c,a){return t(),n("div",null,a[0]||(a[0]=[s(`<h1 id="crontab-定时任务" tabindex="-1"><a class="header-anchor" href="#crontab-定时任务"><span>crontab 定时任务</span></a></h1><p>通过crontab 命令，我们可以在固定的间隔时间执行指定的系统指令或 shell script脚本。时间间隔的单位可以是分钟、小时、日、月、周及以上的任意组合。这个命令非常适合周期性的日志分析或数据备份等工作。</p><h2 id="命令格式" tabindex="-1"><a class="header-anchor" href="#命令格式"><span>命令格式</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>crontab [-u user] file</p><p>crontab [-u user] { -e | -l | -r }</p></div><h2 id="命令参数" tabindex="-1"><a class="header-anchor" href="#命令参数"><span>命令参数</span></a></h2><ul><li>-u user：用来设定某个用户的crontab服务；</li><li>file：file是命令文件的名字,表示将file做为crontab的任务列表文件并载入crontab。如果在命令行中没有指定这个文件，crontab命令将接受标准输入（键盘）上键入的命令，并将它们载入crontab。</li><li>-e：编辑某个用户的crontab文件内容。如果不指定用户，则表示编辑当前用户的crontab文件。</li><li>-l：显示某个用户的crontab文件内容，如果不指定用户，则表示显示当前用户的crontab文件内容。</li><li>-r：从/var/spool/cron目录中删除某个用户的crontab文件，如果不指定用户，则默认删除当前用户的crontab文件。</li><li>-i：在删除用户的crontab文件时给确认提示。</li></ul><h2 id="crontab-的文件格式" tabindex="-1"><a class="header-anchor" href="#crontab-的文件格式"><span>crontab 的文件格式</span></a></h2><p>分 时 日 月 星期 要运行的命令</p><ul><li>第1列分钟0～59</li><li>第2列小时0～23（0表示子夜）</li><li>第3列日1～31</li><li>第4列月1～12</li><li>第5列星期0～7（0和7表示星期天）</li><li>第6列要运行的命令</li></ul><p>为了便于大家记忆，可以看下面这张图：</p><h2 id="常用方法" tabindex="-1"><a class="header-anchor" href="#常用方法"><span>常用方法</span></a></h2><h3 id="创建一个新的-crontab-文件" tabindex="-1"><a class="header-anchor" href="#创建一个新的-crontab-文件"><span>创建一个新的 crontab 文件</span></a></h3><p>向cron进程提交一个crontab文件之前，首先要设置环境变量EDITOR。cron进程根据它来确定使用哪个编辑器编辑crontab文件。9 9 %的UNIX和LINUX用户都使用vi，如果你也是这样，那么你就编辑$HOME目录下的. profile文件，在其中加入这样一行:</p><pre><code>EDITOR=vi; export EDITOR
</code></pre><p>然后保存并退出。不妨创建一个名<code>&lt;user&gt;</code> cron的文件，其中<code>&lt;user&gt;</code>是用户名，例如， davecron。在该文件中加入如下的内容。 :</p><pre><code># (put your own initials here)echo the date to the console every
# 15minutes between 6pm and 6am
0,15,30,45 18-06 * * * /bin/echo &#39;date&#39; &gt; /dev/console
</code></pre><p>保存并退出。注意前面5个域用空格分隔。</p><p>在上面的例子中，系统将每隔1 5分钟向控制台输出一次当前时间。如果系统崩溃或挂起，从最后所显示的时间就可以一眼看出系统是什么时间停止工作的。在有些系统中，用tty1来表示控制台，可以根据实际情况对上面的例子进行相应的修改。为了提交你刚刚创建的crontab文件，可以把这个新创建的文件作为cron命令的参数:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">crontab</span> davecron</span>
<span class="line"></span></code></pre></div><p>现在该文件已经提交给cron进程，它将每隔1 5分钟运行一次。同时，新创建文件的一个副本已经被放在/var/spool/cron目录中，文件名就是用户名(即dave)。</p><h3 id="列出crontab文件" tabindex="-1"><a class="header-anchor" href="#列出crontab文件"><span>列出crontab文件</span></a></h3><p>使用-l参数列出crontab文件:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">crontab</span> <span class="token parameter variable">-l</span></span>
<span class="line"><span class="token number">0,15</span>,30,45 <span class="token number">18</span>-06 * * * /bin/echo <span class="token variable"><span class="token variable">\`</span><span class="token function">date</span><span class="token variable">\`</span></span> <span class="token operator">&gt;</span> dev/tty1</span>
<span class="line"></span></code></pre></div><p>可以使用这种方法在$HOME目录中对crontab文件做一备份:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">crontab</span> <span class="token parameter variable">-l</span> <span class="token operator">&gt;</span> <span class="token environment constant">$HOME</span>/mycron</span>
<span class="line"></span></code></pre></div><p>这样，一旦不小心误删了crontab文件，可以用上一节所讲述的方法迅速恢复。</p><h3 id="编辑crontab文件" tabindex="-1"><a class="header-anchor" href="#编辑crontab文件"><span>编辑crontab文件</span></a></h3><p>如果希望添加、删除或编辑crontab文件中的条目，而EDITOR环境变量又设置为vi，那么就可以用vi来编辑crontab文件:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">crontab</span> <span class="token parameter variable">-e</span></span>
<span class="line"></span></code></pre></div><p>可以像使用vi编辑其他任何文件那样修改crontab文件并退出。如果修改了某些条目或添加了新的条目，那么在保存该文件时， cron会对其进行必要的完整性检查。如果其中的某个域出现了超出允许范围的值，它会提示你。 我们在编辑crontab文件时，没准会加入新的条目。例如，加入下面的一条： :</p><pre><code># DT:delete core files,at 3.30am on 1,7,14,21,26,26 days of each month
30 3 1,7,14,21,26 * * /bin/find -name &#39;core&#39; -exec rm {} \\;
</code></pre><p>保存并退出。</p><div class="hint-container note"><p class="hint-container-title">注</p><p>最好在crontab文件的每一个条目之上加入一条注释，这样就可以知道它的功能、运行时间，更为重要的是，知道这是哪位用户的定时作业。</p></div><h3 id="删除crontab文件" tabindex="-1"><a class="header-anchor" href="#删除crontab文件"><span>删除crontab文件</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">crontab</span> <span class="token parameter variable">-r</span></span>
<span class="line"></span></code></pre></div><h2 id="使用实例" tabindex="-1"><a class="header-anchor" href="#使用实例"><span>使用实例</span></a></h2><h3 id="实例1-每1分钟执行一次mycommand" tabindex="-1"><a class="header-anchor" href="#实例1-每1分钟执行一次mycommand"><span>实例1：每1分钟执行一次myCommand</span></a></h3><pre><code>* * * * * myCommand
</code></pre><h3 id="实例2-每小时的第3和第15分钟执行" tabindex="-1"><a class="header-anchor" href="#实例2-每小时的第3和第15分钟执行"><span>实例2：每小时的第3和第15分钟执行</span></a></h3><pre><code>3,15 * * * * myCommand
</code></pre><h3 id="实例3-在上午8点到11点的第3和第15分钟执行" tabindex="-1"><a class="header-anchor" href="#实例3-在上午8点到11点的第3和第15分钟执行"><span>实例3：在上午8点到11点的第3和第15分钟执行</span></a></h3><pre><code>3,15 8-11 * * * myCommand
</code></pre><h3 id="实例4-每隔两天的上午8点到11点的第3和第15分钟执行" tabindex="-1"><a class="header-anchor" href="#实例4-每隔两天的上午8点到11点的第3和第15分钟执行"><span>实例4：每隔两天的上午8点到11点的第3和第15分钟执行</span></a></h3><pre><code>3,15 8-11 */2  *  * myCommand
</code></pre><h3 id="实例5-每周一上午8点到11点的第3和第15分钟执行" tabindex="-1"><a class="header-anchor" href="#实例5-每周一上午8点到11点的第3和第15分钟执行"><span>实例5：每周一上午8点到11点的第3和第15分钟执行</span></a></h3><pre><code>3,15 8-11 * * 1 myCommand
</code></pre><h3 id="实例6-每晚的21-30重启smb" tabindex="-1"><a class="header-anchor" href="#实例6-每晚的21-30重启smb"><span>实例6：每晚的21:30重启smb</span></a></h3><pre><code>30 21 * * * /etc/init.d/smb restart
</code></pre><h3 id="实例7-每月1、10、22日的4-45重启smb" tabindex="-1"><a class="header-anchor" href="#实例7-每月1、10、22日的4-45重启smb"><span>实例7：每月1、10、22日的4 : 45重启smb</span></a></h3><pre><code>45 4 1,10,22 * * /etc/init.d/smb restart
</code></pre><h3 id="实例8-每周六、周日的1-10重启smb" tabindex="-1"><a class="header-anchor" href="#实例8-每周六、周日的1-10重启smb"><span>实例8：每周六、周日的1 : 10重启smb</span></a></h3><pre><code>10 1 * * 6,0 /etc/init.d/smb restart
</code></pre><h3 id="实例9-每天18-00至23-00之间每隔30分钟重启smb" tabindex="-1"><a class="header-anchor" href="#实例9-每天18-00至23-00之间每隔30分钟重启smb"><span>实例9：每天18 : 00至23 : 00之间每隔30分钟重启smb</span></a></h3><pre><code>0,30 18-23 * * * /etc/init.d/smb restart
</code></pre><h3 id="实例10-每星期六的晚上11-00-pm重启smb" tabindex="-1"><a class="header-anchor" href="#实例10-每星期六的晚上11-00-pm重启smb"><span>实例10：每星期六的晚上11 : 00 pm重启smb</span></a></h3><pre><code>0 23 * * 6 /etc/init.d/smb restart
</code></pre><h3 id="实例11-每一小时重启smb" tabindex="-1"><a class="header-anchor" href="#实例11-每一小时重启smb"><span>实例11：每一小时重启smb</span></a></h3><pre><code>0 */1 * * * /etc/init.d/smb restart
</code></pre><h3 id="实例12-晚上11点到早上7点之间-每隔一小时重启smb" tabindex="-1"><a class="header-anchor" href="#实例12-晚上11点到早上7点之间-每隔一小时重启smb"><span>实例12：晚上11点到早上7点之间，每隔一小时重启smb</span></a></h3><pre><code>0 23-7 * * * /etc/init.d/smb restart
</code></pre><h2 id="使用注意事项" tabindex="-1"><a class="header-anchor" href="#使用注意事项"><span>使用注意事项</span></a></h2><h3 id="注意环境变量问题" tabindex="-1"><a class="header-anchor" href="#注意环境变量问题"><span>注意环境变量问题</span></a></h3><p>有时我们创建了一个crontab，但是这个任务却无法自动执行，而手动执行这个任务却没有问题，这种情况一般是由于在crontab文件中没有配置环境变量引起的。</p><p>在crontab文件中定义多个调度任务时，需要特别注环境变量的设置，因为我们手动执行某个任务时，是在当前shell环境下进行的，程序当然能找到环境变量，而系统自动执行任务调度时，是不会加载任何环境变量的，因此，就需要在crontab文件中指定任务运行所需的所有环境变量，这样，系统执行任务调度时就没有问题了。</p><p>不要假定cron知道所需要的特殊环境，它其实并不知道。所以你要保证在shelll脚本中提供所有必要的路径和环境变量，除了一些自动设置的全局变量。所以注意如下3点：</p><ol><li><p>脚本中涉及文件路径时写全局路径；</p></li><li><p>脚本执行要用到java或其他环境变量时，通过source命令引入环境变量，如:</p></li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">cat</span> start_cbp.sh</span>
<span class="line"><span class="token operator">!</span>/bin/sh</span>
<span class="line"><span class="token builtin class-name">source</span> /etc/profile</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">RUN_CONF</span><span class="token operator">=</span>/home/d139/conf/platform/cbp/cbp_jboss.conf</span>
<span class="line">/usr/local/jboss-4.0.5/bin/run.sh <span class="token parameter variable">-c</span> mev <span class="token operator">&amp;</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li><p>当手动执行脚本OK，但是crontab死活不执行时,很可能是环境变量惹的祸，可尝试在crontab中直接引入环境变量解决问题。如:</p><pre><code> 0 * * * * . /etc/profile;/bin/sh /var/www/java/audit_no_count/bin/restart_audit.sh
</code></pre></li></ol><h3 id="注意清理系统用户的邮件日志" tabindex="-1"><a class="header-anchor" href="#注意清理系统用户的邮件日志"><span>注意清理系统用户的邮件日志</span></a></h3><p>每条任务调度执行完毕，系统都会将任务输出信息通过电子邮件的形式发送给当前系统用户，这样日积月累，日志信息会非常大，可能会影响系统的正常运行，因此，将每条任务进行重定向处理非常重要。 例如，可以在crontab文件中设置如下形式，忽略日志输出:</p><pre><code>0 */3 * * * /usr/local/apache2/apachectl restart &gt;/dev/null 2&gt;&amp;1
</code></pre><p><code>&gt;/dev/null 2&gt;&amp;1</code>表示先将标准输出重定向到/dev/null，然后将标准错误重定向到标准输出，由于标准输出已经重定向到了/dev/null，因此标准错误也会重定向到/dev/null，这样日志输出问题就解决了。</p><h3 id="系统级任务调度与用户级任务调度" tabindex="-1"><a class="header-anchor" href="#系统级任务调度与用户级任务调度"><span>系统级任务调度与用户级任务调度</span></a></h3><p>系统级任务调度主要完成系统的一些维护操作，用户级任务调度主要完成用户自定义的一些任务，可以将用户级任务调度放到系统级任务调度来完成（不建议这么做），但是反过来却不行，root用户的任务调度操作可以通过&quot;crontab --uroot --e&quot;来设置，也可以将调度任务直接写入/etc/crontab文件，需要注意的是，如果要定义一个定时重启系统的任务，就必须将任务放到/etc/crontab文件，即使在root用户下创建一个定时重启系统的任务也是无效的。</p><h3 id="其他注意事项" tabindex="-1"><a class="header-anchor" href="#其他注意事项"><span>其他注意事项</span></a></h3><p>新创建的cron job，不会马上执行，至少要过2分钟才执行。如果重启cron则马上执行。</p><p>当crontab失效时，可以尝试<code>/etc/init.d/crond</code> restart解决问题。或者查看日志看某个job有没有执行/报错<code>tail -f</code><code>/var/log/cron</code>。</p><p>千万别乱运行crontab -r。它从Crontab目录（<code>/var/spool/cron</code>）中删除用户的Crontab文件。删除了该用户的所有crontab都没了。</p><p>在crontab中%是有特殊含义的，表示换行的意思。如果要用的话必须进行转义%，如经常用的date &#39;+%Y%m%d&#39;在crontab里是不会执行的，应该换成date &#39;+%Y%m%d&#39;。</p><p>更新系统时间时区后需要重启cron,在ubuntu中服务名为cron:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">service</span> <span class="token function">cron</span> restart</span>
<span class="line"></span></code></pre></div><p>ubuntu下启动、停止与重启cron:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> /etc/init.d/cron start</span>
<span class="line"><span class="token function">sudo</span> /etc/init.d/cron stop</span>
<span class="line"><span class="token function">sudo</span> /etc/init.d/cron restart</span>
<span class="line"></span></code></pre></div>`,83)]))}const i=e(r,[["render",l]]),p=JSON.parse('{"path":"/linux-tutor/tool/crontab.html","title":"crontab 定时任务","lang":"zh-CN","frontmatter":{"description":"crontab 定时任务 通过crontab 命令，我们可以在固定的间隔时间执行指定的系统指令或 shell script脚本。时间间隔的单位可以是分钟、小时、日、月、周及以上的任意组合。这个命令非常适合周期性的日志分析或数据备份等工作。 命令格式 提示 crontab [-u user] file crontab [-u user] { -e | -...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/tool/crontab.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"crontab 定时任务"}],["meta",{"property":"og:description","content":"crontab 定时任务 通过crontab 命令，我们可以在固定的间隔时间执行指定的系统指令或 shell script脚本。时间间隔的单位可以是分钟、小时、日、月、周及以上的任意组合。这个命令非常适合周期性的日志分析或数据备份等工作。 命令格式 提示 crontab [-u user] file crontab [-u user] { -e | -..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-26T16:41:58.000Z"}],["meta",{"property":"article:modified_time","content":"2022-07-26T16:41:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"crontab 定时任务\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-26T16:41:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"命令格式","slug":"命令格式","link":"#命令格式","children":[]},{"level":2,"title":"命令参数","slug":"命令参数","link":"#命令参数","children":[]},{"level":2,"title":"crontab 的文件格式","slug":"crontab-的文件格式","link":"#crontab-的文件格式","children":[]},{"level":2,"title":"常用方法","slug":"常用方法","link":"#常用方法","children":[{"level":3,"title":"创建一个新的 crontab 文件","slug":"创建一个新的-crontab-文件","link":"#创建一个新的-crontab-文件","children":[]},{"level":3,"title":"列出crontab文件","slug":"列出crontab文件","link":"#列出crontab文件","children":[]},{"level":3,"title":"编辑crontab文件","slug":"编辑crontab文件","link":"#编辑crontab文件","children":[]},{"level":3,"title":"删除crontab文件","slug":"删除crontab文件","link":"#删除crontab文件","children":[]}]},{"level":2,"title":"使用实例","slug":"使用实例","link":"#使用实例","children":[{"level":3,"title":"实例1：每1分钟执行一次myCommand","slug":"实例1-每1分钟执行一次mycommand","link":"#实例1-每1分钟执行一次mycommand","children":[]},{"level":3,"title":"实例2：每小时的第3和第15分钟执行","slug":"实例2-每小时的第3和第15分钟执行","link":"#实例2-每小时的第3和第15分钟执行","children":[]},{"level":3,"title":"实例3：在上午8点到11点的第3和第15分钟执行","slug":"实例3-在上午8点到11点的第3和第15分钟执行","link":"#实例3-在上午8点到11点的第3和第15分钟执行","children":[]},{"level":3,"title":"实例4：每隔两天的上午8点到11点的第3和第15分钟执行","slug":"实例4-每隔两天的上午8点到11点的第3和第15分钟执行","link":"#实例4-每隔两天的上午8点到11点的第3和第15分钟执行","children":[]},{"level":3,"title":"实例5：每周一上午8点到11点的第3和第15分钟执行","slug":"实例5-每周一上午8点到11点的第3和第15分钟执行","link":"#实例5-每周一上午8点到11点的第3和第15分钟执行","children":[]},{"level":3,"title":"实例6：每晚的21:30重启smb","slug":"实例6-每晚的21-30重启smb","link":"#实例6-每晚的21-30重启smb","children":[]},{"level":3,"title":"实例7：每月1、10、22日的4 : 45重启smb","slug":"实例7-每月1、10、22日的4-45重启smb","link":"#实例7-每月1、10、22日的4-45重启smb","children":[]},{"level":3,"title":"实例8：每周六、周日的1 : 10重启smb","slug":"实例8-每周六、周日的1-10重启smb","link":"#实例8-每周六、周日的1-10重启smb","children":[]},{"level":3,"title":"实例9：每天18 : 00至23 : 00之间每隔30分钟重启smb","slug":"实例9-每天18-00至23-00之间每隔30分钟重启smb","link":"#实例9-每天18-00至23-00之间每隔30分钟重启smb","children":[]},{"level":3,"title":"实例10：每星期六的晚上11 : 00 pm重启smb","slug":"实例10-每星期六的晚上11-00-pm重启smb","link":"#实例10-每星期六的晚上11-00-pm重启smb","children":[]},{"level":3,"title":"实例11：每一小时重启smb","slug":"实例11-每一小时重启smb","link":"#实例11-每一小时重启smb","children":[]},{"level":3,"title":"实例12：晚上11点到早上7点之间，每隔一小时重启smb","slug":"实例12-晚上11点到早上7点之间-每隔一小时重启smb","link":"#实例12-晚上11点到早上7点之间-每隔一小时重启smb","children":[]}]},{"level":2,"title":"使用注意事项","slug":"使用注意事项","link":"#使用注意事项","children":[{"level":3,"title":"注意环境变量问题","slug":"注意环境变量问题","link":"#注意环境变量问题","children":[]},{"level":3,"title":"注意清理系统用户的邮件日志","slug":"注意清理系统用户的邮件日志","link":"#注意清理系统用户的邮件日志","children":[]},{"level":3,"title":"系统级任务调度与用户级任务调度","slug":"系统级任务调度与用户级任务调度","link":"#系统级任务调度与用户级任务调度","children":[]},{"level":3,"title":"其他注意事项","slug":"其他注意事项","link":"#其他注意事项","children":[]}]}],"git":{"createdTime":1653565176000,"updatedTime":1658853718000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":7.85,"words":2356},"filePathRelative":"linux-tutor/tool/crontab.md","localizedDate":"2022年5月26日","autoDesc":true}');export{i as comp,p as data};
