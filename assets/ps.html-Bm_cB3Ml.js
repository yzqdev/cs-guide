import{_ as o,c as e,a as i,o as n}from"./app-B6vXTniy.js";const l={};function r(s,t){return n(),e("div",null,[...t[0]||(t[0]=[i(`<h1 id="ps-进程查看器" tabindex="-1"><a class="header-anchor" href="#ps-进程查看器"><span>ps 进程查看器</span></a></h1><p>Linux中的ps命令是Process Status的缩写。ps命令用来列出系统中当前运行的那些进程。ps命令列出的是当前那些进程的快照，就是执行ps命令的那个时刻的那些进程，如果想要动态的显示进程信息，就可以使用top命令。</p><p>要对进程进行监测和控制，首先必须要了解当前进程的情况，也就是需要查看当前进程，而 ps 命令就是最基本同时也是非常强大的进程查看命令。使用该命令可以确定有哪些进程正在运行和运行的状态、进程是否结束、进程有没有僵死、哪些进程占用了过多的资源等等。总之大部分信息都是可以通过执行该命令得到的。</p><p>ps 为我们提供了进程的一次性的查看，它所提供的查看结果并不动态连续的；如果想对进程时间监控，应该用 <code>top</code>{.interpreted-text role=&quot;ref&quot;} 工具。</p><p>注：kill 命令用于杀死进程。</p><p>linux上进程有5种状态:</p><ol><li>运行(正在运行或在运行队列中等待)</li><li>中断(休眠中, 受阻, 在等待某个条件的形成或接受到信号)</li><li>不可中断(收到信号不唤醒和不可运行, 进程必须等待直到有中断发生)</li><li>僵死(进程已终止, 但进程描述符存在, 直到父进程调用wait4()系统调用后释放)</li><li>停止(进程收到SIGSTOP, SIGTSTP, SIGTTIN, SIGTTOU信号后停止运行运行)</li></ol><p>ps工具标识进程的5种状态码:</p><ul><li>D 不可中断 uninterruptible sleep (usually IO)</li><li>R 运行 runnable (on run queue)</li><li>S 中断 sleeping</li><li>T 停止 traced or stopped</li><li>Z 僵死 a defunct (&quot;zombie&quot;) process</li></ul><h2 id="命令参数" tabindex="-1"><a class="header-anchor" href="#命令参数"><span>命令参数</span></a></h2><ul><li>a 显示所有进程</li><li>-a 显示同一终端下的所有程序</li><li>-A 显示所有进程</li><li>c 显示进程的真实名称</li><li>-N 反向选择</li><li>-e 等于&quot;-A&quot;</li><li>e 显示环境变量</li><li>f 显示程序间的关系</li><li>-H 显示树状结构</li><li>r 显示当前终端的进程</li><li>T 显示当前终端的所有程序</li><li>u 指定用户的所有进程</li><li>-au 显示较详细的资讯</li><li>-aux 显示所有包含其他使用者的行程</li><li>-C&lt;命令&gt; 列出指定命令的状况</li><li>--lines&lt;行数&gt; 每页显示的行数</li><li>--width&lt;字符数&gt; 每页显示的字符数</li><li>--help 显示帮助信息</li><li>--version 显示版本显示</li></ul><h2 id="输出列的含义" tabindex="-1"><a class="header-anchor" href="#输出列的含义"><span>输出列的含义</span></a></h2><ul><li>F 代表这个程序的旗标 (flag)， 4 代表使用者为 super user</li><li>S 代表这个程序的状态 (STAT)，关于各 STAT 的意义将在内文介绍</li><li>UID 程序被该 UID 所拥有</li><li>PID 进程的ID</li><li>PPID 则是其上级父程序的ID</li><li>C CPU 使用的资源百分比</li><li>PRI 这个是 Priority (优先执行序) 的缩写，详细后面介绍</li><li>NI 这个是 Nice 值，在下一小节我们会持续介绍</li><li>ADDR 这个是 kernel function，指出该程序在内存的那个部分。如果是个 running的程序，一般就是 &quot;-&quot;</li><li>SZ 使用掉的内存大小</li><li>WCHAN 目前这个程序是否正在运作当中，若为 - 表示正在运作</li><li>TTY 登入者的终端机位置</li><li>TIME 使用掉的 CPU 时间。</li><li>CMD 所下达的指令为何</li></ul><h2 id="使用实例" tabindex="-1"><a class="header-anchor" href="#使用实例"><span>使用实例</span></a></h2><h3 id="实例1-显示所有进程信息" tabindex="-1"><a class="header-anchor" href="#实例1-显示所有进程信息"><span>实例1：显示所有进程信息</span></a></h3><pre><code>[root@localhost test6]# ps -A
PID TTY          TIME CMD
1 ?        00:00:00 init
2 ?        00:00:01 migration/0
3 ?        00:00:00 ksoftirqd/0
4 ?        00:00:01 migration/1
5 ?        00:00:00 ksoftirqd/1
6 ?        00:29:57 events/0
7 ?        00:00:00 events/1
8 ?        00:00:00 khelper
49 ?        00:00:00 kthread
54 ?        00:00:00 kblockd/0
55 ?        00:00:00 kblockd/1
56 ?        00:00:00 kacpid
217 ?        00:00:00 cqueue/0
……省略部分结果
</code></pre><h3 id="实例2-显示指定用户信息" tabindex="-1"><a class="header-anchor" href="#实例2-显示指定用户信息"><span>实例2：显示指定用户信息</span></a></h3><pre><code>[root@localhost test6]# ps -u root
PID TTY          TIME CMD
1 ?        00:00:00 init
2 ?        00:00:01 migration/0
3 ?        00:00:00 ksoftirqd/0
4 ?        00:00:01 migration/1
5 ?        00:00:00 ksoftirqd/1
6 ?        00:29:57 events/0
7 ?        00:00:00 events/1
8 ?        00:00:00 khelper
49 ?        00:00:00 kthread
54 ?        00:00:00 kblockd/0
55 ?        00:00:00 kblockd/1
56 ?        00:00:00 kacpid
……省略部分结果
</code></pre><h3 id="实例3-显示所有进程信息-连同命令行" tabindex="-1"><a class="header-anchor" href="#实例3-显示所有进程信息-连同命令行"><span>实例3：显示所有进程信息，连同命令行</span></a></h3><pre><code>[root@localhost test6]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 Nov02 ?        00:00:00 init [3]
root         2     1  0 Nov02 ?        00:00:01 [migration/0]
root         3     1  0 Nov02 ?        00:00:00 [ksoftirqd/0]
root         4     1  0 Nov02 ?        00:00:01 [migration/1]
root         5     1  0 Nov02 ?        00:00:00 [ksoftirqd/1]
root         6     1  0 Nov02 ?        00:29:57 [events/0]
root         7     1  0 Nov02 ?        00:00:00 [events/1]
root         8     1  0 Nov02 ?        00:00:00 [khelper]
root        49     1  0 Nov02 ?        00:00:00 [kthread]
root        54    49  0 Nov02 ?        00:00:00 [kblockd/0]
root        55    49  0 Nov02 ?        00:00:00 [kblockd/1]
root        56    49  0 Nov02 ?        00:00:00 [kacpid]
</code></pre><h3 id="实例4-ps-与grep-组合使用-查找特定进程" tabindex="-1"><a class="header-anchor" href="#实例4-ps-与grep-组合使用-查找特定进程"><span>实例4： ps 与grep 组合使用，查找特定进程</span></a></h3><pre><code>[root@localhost test6]# ps -ef|grep ssh
root      2720     1  0 Nov02 ?        00:00:00 /usr/sbin/sshd
root     17394  2720  0 14:58 ?        00:00:00 sshd: root@pts/0
root     17465 17398  0 15:57 pts/0    00:00:00 grep ssh
</code></pre><h3 id="实例5-将与这次登入的-pid-与相关信息列示出来" tabindex="-1"><a class="header-anchor" href="#实例5-将与这次登入的-pid-与相关信息列示出来"><span>实例5：将与这次登入的 PID 与相关信息列示出来</span></a></h3><pre><code>[root@localhost test6]# ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S     0 17398 17394  0  75   0 - 16543 wait   pts/0    00:00:00 bash
4 R     0 17469 17398  0  77   0 - 15877 -      pts/0    00:00:00 ps
</code></pre><h3 id="实例6-列出目前所有的正在内存中的程序" tabindex="-1"><a class="header-anchor" href="#实例6-列出目前所有的正在内存中的程序"><span>实例6：列出目前所有的正在内存中的程序</span></a></h3><pre><code>[root@localhost test6]# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0  10368   676 ?        Ss   Nov02   0:00 init [3]
root         2  0.0  0.0      0     0 ?        S&lt;   Nov02   0:01 [migration/0]
root         3  0.0  0.0      0     0 ?        SN   Nov02   0:00 [ksoftirqd/0]
root         4  0.0  0.0      0     0 ?        S&lt;   Nov02   0:01 [migration/1]
root         5  0.0  0.0      0     0 ?        SN   Nov02   0:00 [ksoftirqd/1]
root         6  0.0  0.0      0     0 ?        S&lt;   Nov02  29:57 [events/0]
root         7  0.0  0.0      0     0 ?        S&lt;   Nov02   0:00 [events/1]
root         8  0.0  0.0      0     0 ?        S&lt;   Nov02   0:00 [khelper]
root        49  0.0  0.0      0     0 ?        S&lt;   Nov02   0:00 [kthread]
root        54  0.0  0.0      0     0 ?        S&lt;   Nov02   0:00 [kblockd/0]
root        55  0.0  0.0      0     0 ?        S&lt;   Nov02   0:00 [kblockd/1]
root        56  0.0  0.0      0     0 ?        S&lt;   Nov02   0:00 [kacpid]
</code></pre>`,26)])])}const p=o(l,[["render",r]]),d=JSON.parse('{"path":"/linux-tutor/tool/ps.html","title":"ps 进程查看器","lang":"zh-CN","frontmatter":{"description":"ps 进程查看器 Linux中的ps命令是Process Status的缩写。ps命令用来列出系统中当前运行的那些进程。ps命令列出的是当前那些进程的快照，就是执行ps命令的那个时刻的那些进程，如果想要动态的显示进程信息，就可以使用top命令。 要对进程进行监测和控制，首先必须要了解当前进程的情况，也就是需要查看当前进程，而 ps 命令就是最基本同时也...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ps 进程查看器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/tool/ps.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"ps 进程查看器"}],["meta",{"property":"og:description","content":"ps 进程查看器 Linux中的ps命令是Process Status的缩写。ps命令用来列出系统中当前运行的那些进程。ps命令列出的是当前那些进程的快照，就是执行ps命令的那个时刻的那些进程，如果想要动态的显示进程信息，就可以使用top命令。 要对进程进行监测和控制，首先必须要了解当前进程的情况，也就是需要查看当前进程，而 ps 命令就是最基本同时也..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.85,"words":1454},"filePathRelative":"linux-tutor/tool/ps.md","autoDesc":true}');export{p as comp,d as data};
