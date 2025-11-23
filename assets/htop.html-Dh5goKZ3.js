import{_ as a,c as n,a as e,o as p}from"./app-B6vXTniy.js";const t={};function i(l,s){return p(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="htop工具" tabindex="-1"><a class="header-anchor" href="#htop工具"><span>htop工具</span></a></h1><p>top命令是Linux下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况，类似于Windows的任务管理器。top是一个动态显示过程,即可以通过用户按键来不断刷新当前状态.如果在前台执行该命令,它将独占前台,直到用户终止该程序为止.比较准确的说,top命令提供了实时的对系统处理器的状态监视.它将显示系统中CPU最“敏感”的任务列表.该命令可以按CPU使用.内存使用和执行时间对任务进行排序；而且该命令的很多特性都可以通过交互式命令或者在个人定制文件中进行设定。<br> 常在linux系统下玩，这是必须掌握的命令之一； 下面详细说说这个命令：</p><p>敲入top进入：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">top - 09:14:56 up 264 days, 20:56,  1 user,  load average: 0.02, 0.04, 0.00</span>
<span class="line">Tasks:  87 total,   1 running,  86 sleeping,   0 stopped,   0 zombie</span>
<span class="line">Cpu(s):  0.0%us,  0.2%sy,  0.0%ni, 99.7%id,  0.0%wa,  0.0%hi,  0.0%si,  0.2%st</span>
<span class="line">Mem:    377672k total,   322332k used,    55340k free,    32592k buffers</span>
<span class="line">Swap:   397308k total,    67192k used,   330116k free,    71900k cached</span>
<span class="line">  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND                                        </span>
<span class="line">    1 root      20   0  2856  656  388 S  0.0  0.2   0:49.40 init                                            </span>
<span class="line">    2 root      20   0     0    0    0 S  0.0  0.0   0:00.00 kthreadd                                        </span>
<span class="line">    3 root      20   0     0    0    0 S  0.0  0.0   7:15.20 ksoftirqd/0                                     </span>
<span class="line">    4 root      RT   0     0    0    0 S  0.0  0.0   0:00.00 migration/0                          </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="第一行" tabindex="-1"><a class="header-anchor" href="#第一行"><span>第一行</span></a></h2><p>09:14:56 ： 系统当前时间 264 days, 20:56 ： 系统开机到现在经过了多少时间 1 users ： 当前2用户在线 load average: 0.02, 0.04, 0.00： 系统1分钟、5分钟、15分钟的CPU负载信息</p><h2 id="第二行" tabindex="-1"><a class="header-anchor" href="#第二行"><span>第二行</span></a></h2><p>Tasks：任务; 87 total：很好理解，就是当前有87个任务，也就是87个进程。 1 running：1个进程正在运行 86 sleeping：86个进程睡眠 0 stopped：停止的进程数 0 zombie：僵死的进程数</p><h2 id="第三行" tabindex="-1"><a class="header-anchor" href="#第三行"><span>第三行</span></a></h2><p>Cpu(s)：表示这一行显示CPU总体信息 0.0%us：用户态进程占用CPU时间百分比，不包含renice值为负的任务占用的CPU的时间。 0.7%sy：内核占用CPU时间百分比 0.0%ni：改变过优先级的进程占用CPU的百分比 99.3%id：空闲CPU时间百分比 0.0%wa：等待I/O的CPU时间百分比 0.0%hi：CPU硬中断时间百分比 0.0%si：CPU软中断时间百分比 注：这里显示数据是所有cpu的平均值，如果想看每一个cpu的处理情况，按1即可；折叠，再次按1；</p><h2 id="第四行" tabindex="-1"><a class="header-anchor" href="#第四行"><span>第四行</span></a></h2><p>Men：内存的意思 8175320kk total：物理内存总量 8058868k used：使用的物理内存量 116452k free：空闲的物理内存量 283084k buffers：用作内核缓存的物理内存量</p><h2 id="第五行" tabindex="-1"><a class="header-anchor" href="#第五行"><span>第五行</span></a></h2><p>Swap：交换空间 6881272k total：交换区总量 4010444k used：使用的交换区量 2870828k free：空闲的交换区量 4336992k cached：缓冲交换区总量</p><h2 id="进程信息" tabindex="-1"><a class="header-anchor" href="#进程信息"><span>进程信息</span></a></h2><p>再下面就是进程信息： PID：进程的ID USER：进程所有者 PR：进程的优先级别，越小越优先被执行 NInice：值 VIRT：进程占用的虚拟内存 RES：进程占用的物理内存 SHR：进程使用的共享内存 S：进程的状态。S表示休眠，R表示正在运行，Z表示僵死状态，N表示该进程优先值为负数 %CPU：进程占用CPU的使用率 %MEM：进程使用的物理内存和总内存的百分比 TIME+：该进程启动后占用的总的CPU时间，即占用CPU使用时间的累加值。 COMMAND：进程启动命令名称</p><h2 id="top命令交互操作指令" tabindex="-1"><a class="header-anchor" href="#top命令交互操作指令"><span>top命令交互操作指令</span></a></h2><p>下面列出一些常用的 top命令操作指令</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">q：退出top命令</span>
<span class="line">&lt;Space&gt;：立即刷新</span>
<span class="line">s：设置刷新时间间隔</span>
<span class="line">c：显示命令完全模式</span>
<span class="line">t:：显示或隐藏进程和CPU状态信息</span>
<span class="line">m：显示或隐藏内存状态信息</span>
<span class="line">l：显示或隐藏uptime信息</span>
<span class="line">f：增加或减少进程显示标志</span>
<span class="line">S：累计模式，会把已完成或退出的子进程占用的CPU时间累计到父进程的MITE+</span>
<span class="line">P：按%CPU使用率排行</span>
<span class="line">T：按MITE+排行</span>
<span class="line">M：按%MEM排行</span>
<span class="line">u：指定显示用户进程</span>
<span class="line">r：修改进程renice值</span>
<span class="line">kkill：进程</span>
<span class="line">i：只显示正在运行的进程</span>
<span class="line">W：保存对top的设置到文件~/.toprc，下次启动将自动调用toprc文件的设置。</span>
<span class="line">h：帮助命令。</span>
<span class="line">q：退出</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：强调一下，使用频率最高的是P、T、M，因为通常使用top，我们就想看看是哪些进程最耗cpu资源、占用的内存最多； 注：通过”shift + &gt;”或”shift + &lt;”可以向右或左改变排序列 如果只需要查看内存：可用free命令。只查看uptime信息（第一行），可用uptime命令；</p><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例"><span>实例</span></a></h2><h3 id="实例1-多u多核cpu监控" tabindex="-1"><a class="header-anchor" href="#实例1-多u多核cpu监控"><span>实例1：多U多核CPU监控</span></a></h3><p>在top基本视图中，按键盘数字“1”，可监控每个逻辑CPU的状况；</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[rdtfr@bl685cb4-t ~]$ top</span>
<span class="line">top - 09:10:44 up 20 days, 16:51,  4 users,  load average: 3.82, 4.40, 4.40</span>
<span class="line">Tasks: 1201 total,  10 running, 1189 sleeping,   0 stopped,   2 zombie</span>
<span class="line">Cpu0  :  1.3%us,  2.3%sy,  0.0%ni, 96.4%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st</span>
<span class="line">Cpu1  :  1.3%us,  2.6%sy,  0.0%ni, 96.1%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st</span>
<span class="line">Cpu2  :  1.0%us,  2.0%sy,  0.0%ni, 92.5%id,  0.0%wa,  0.0%hi,  4.6%si,  0.0%st</span>
<span class="line">Cpu3  :  3.9%us,  7.8%sy,  0.0%ni, 83.2%id,  0.0%wa,  0.0%hi,  5.2%si,  0.0%st</span>
<span class="line">Cpu4  :  4.2%us, 10.4%sy,  0.0%ni, 63.8%id,  0.0%wa,  0.0%hi, 21.5%si,  0.0%st</span>
<span class="line">Cpu5  :  6.8%us, 12.7%sy,  0.0%ni, 80.5%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st</span>
<span class="line">Cpu6  :  2.9%us,  7.2%sy,  0.0%ni, 85.3%id,  0.0%wa,  0.0%hi,  4.6%si,  0.0%st</span>
<span class="line">Cpu7  :  6.2%us, 13.0%sy,  0.0%ni, 75.3%id,  0.0%wa,  0.0%hi,  5.5%si,  0.0%st</span>
<span class="line">Mem:  32943888k total, 32834216k used,   109672k free,   642704k buffers</span>
<span class="line">Swap: 35651576k total,  5761928k used, 29889648k free, 16611500k cached</span>
<span class="line"></span></code></pre></div><h3 id="实例2-高亮显示当前运行进程" tabindex="-1"><a class="header-anchor" href="#实例2-高亮显示当前运行进程"><span>实例2：高亮显示当前运行进程</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">在top基本视图中,按键盘“b”（打开/关闭加亮效果）；</span>
<span class="line"></span></code></pre></div><h3 id="实例3-显示完整的程序命令" tabindex="-1"><a class="header-anchor" href="#实例3-显示完整的程序命令"><span>实例3：显示完整的程序命令</span></a></h3><p>命令：top -c</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[rdtfr@bl685cb4-t ~]$ top -c</span>
<span class="line">top - 09:14:35 up 20 days, 16:55,  4 users,  load average: 5.77, 5.01, 4.64</span>
<span class="line">Tasks: 1200 total,   5 running, 1192 sleeping,   0 stopped,   3 zombie</span>
<span class="line">Cpu(s):  4.4%us,  6.0%sy,  0.0%ni, 83.8%id,  0.2%wa,  0.0%hi,  5.5%si,  0.0%st</span>
<span class="line">Mem:  32943888k total, 32842896k used,   100992k free,   591484k buffers</span>
<span class="line">Swap: 35651576k total,  5761808k used, 29889768k free, 16918824k cached</span>
<span class="line">  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND                                       </span>
<span class="line"> 2013 apache    18   0  403m  88m 5304 S 25.0  0.3   6:37.44 /usr/sbin/httpd                                </span>
<span class="line">18335 pubtest   22   0 65576  996  728 R  7.8  0.0   0:00.24 netstat -naltp                            </span>
<span class="line">16499 rdtfare   15   0 13672 2080  824 R  2.6  0.0   0:00.38 top -c                                         </span>
<span class="line">29684 rdtfare   15   0 1164m 837m  14m S  2.3  2.6 148:47.54 ./autodata data1.txt                     </span>
<span class="line">12976 pubtest   18   0  238m 9000 1932 S  1.6  0.0 439:28.44 tscagent -s TOEV_P </span>
<span class="line"></span></code></pre></div><h3 id="实例4-显示指定的进程信息" tabindex="-1"><a class="header-anchor" href="#实例4-显示指定的进程信息"><span>实例4：显示指定的进程信息</span></a></h3><p>命令：top -p pidid</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/opt/app/tdv1/config#top -p 17265</span>
<span class="line">top - 09:17:34 up 455 days, 17:55,  2 users,  load average: 3.76, 4.56, 4.46</span>
<span class="line">Tasks:   1 total,   0 running,   1 sleeping,   0 stopped,   0 zombie</span>
<span class="line">Cpu(s):  7.8%us,  1.9%sy,  0.0%ni, 89.2%id,  0.0%wa,  0.1%hi,  1.0%si,  0.0%st</span>
<span class="line">Mem:   8175452k total,  8103988k used,    71464k free,   268716k buffers</span>
<span class="line">Swap:  6881272k total,  4275424k used,  2605848k free,  6338184k cached</span>
<span class="line">  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND                   </span>
<span class="line">17265 tdv1      15   0 56504  828  632 S  0.0  0.0 195:53.25 redis-server                                   </span>
<span class="line"></span></code></pre></div><p>Posted by: 大CC | 14JUL,2014 博客：<a href="http://blog.me115.com" target="_blank" rel="noopener noreferrer">blog.me115.com</a> [<a href="http://feed.feedsky.com/me115" target="_blank" rel="noopener noreferrer">订阅</a>] 微博：<a href="http://weibo.com/bigcc115" target="_blank" rel="noopener noreferrer">新浪微博</a></p>`,33)])])}const c=a(t,[["render",i]]),d=JSON.parse('{"path":"/linux-tutor/tool/htop.html","title":"htop工具","lang":"zh-CN","frontmatter":{"description":"htop工具 top命令是Linux下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况，类似于Windows的任务管理器。top是一个动态显示过程,即可以通过用户按键来不断刷新当前状态.如果在前台执行该命令,它将独占前台,直到用户终止该程序为止.比较准确的说,top命令提供了实时的对系统处理器的状态监视.它将显示系统中CPU最“敏感”的任务...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"htop工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/tool/htop.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"htop工具"}],["meta",{"property":"og:description","content":"htop工具 top命令是Linux下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况，类似于Windows的任务管理器。top是一个动态显示过程,即可以通过用户按键来不断刷新当前状态.如果在前台执行该命令,它将独占前台,直到用户终止该程序为止.比较准确的说,top命令提供了实时的对系统处理器的状态监视.它将显示系统中CPU最“敏感”的任务..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":5.92,"words":1776},"filePathRelative":"linux-tutor/tool/htop.md","autoDesc":true}');export{c as comp,d as data};
