import{_ as a,c as r,a as t,o as n}from"./app-B6vXTniy.js";const o={};function p(s,e){return n(),r("div",null,[...e[0]||(e[0]=[t(`<h1 id="性能监控" tabindex="-1"><a class="header-anchor" href="#性能监控"><span>性能监控</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在使用操作系统的过程中，我们经常需要查看当前的性能如何，需要了解CPU、内存和硬盘的使用情况； 本节介绍的这几个工具能满足日常工作要求；</p></div><h2 id="监控cpu" tabindex="-1"><a class="header-anchor" href="#监控cpu"><span>监控CPU</span></a></h2><p>查看CPU使用率 :</p><pre><code>$sar -u

eg:
$sar -u 1 2
[/home/weber#]sar -u 1 2
Linux 2.6.35-22-generic-pae (MyVPS)     06/28/2014  _i686_  (1 CPU)

09:03:59 AM     CPU     %user     %nice   %system   %iowait    %steal     %idle
09:04:00 AM     all      0.00      0.00      0.50      0.00      0.00     99.50
09:04:01 AM     all      0.00      0.00      0.00      0.00      0.00    100.00
</code></pre><p>后面的两个参数表示监控的频率，比如例子中的1和2，表示每秒采样一次，总共采样2次；</p><p>查看CPU平均负载 :</p><pre><code>$sar -q 1 2
</code></pre><p>sar指定-q后，就能查看运行队列中的进程数、系统上的进程大小、平均负载等；</p><h2 id="查询内存" tabindex="-1"><a class="header-anchor" href="#查询内存"><span>查询内存</span></a></h2><p>查看内存使用状况 sar指定-r之后，可查看内存使用状况; :</p><pre><code>$sar -r 1 2
09:08:48 AM kbmemfree kbmemused  %memused kbbuffers  kbcached  kbcommit   %commit  kbactive   kbinact
09:08:49 AM     17888    359784     95.26     37796     73272    507004     65.42    137400    150764
09:08:50 AM     17888    359784     95.26     37796     73272    507004     65.42    137400    150764
Average:        17888    359784     95.26     37796     73272    507004     65.42    137400    150764
</code></pre><p>查看内存使用量 :</p><pre><code>$free -m
</code></pre><h2 id="查询页面交换" tabindex="-1"><a class="header-anchor" href="#查询页面交换"><span>查询页面交换</span></a></h2><p>查看页面交换发生状况 页面发生交换时，服务器的吞吐量会大幅下降；服务器状况不良时，如果怀疑因为内存不足而导致了页面交换的发生，可以使用sar -W这个命令来确认是否发生了大量的交换； :</p><pre><code>$sar -W 1 3
</code></pre><h2 id="查询硬盘使用" tabindex="-1"><a class="header-anchor" href="#查询硬盘使用"><span>查询硬盘使用</span></a></h2><p>查看磁盘空间利用情况 :</p><pre><code>$df -h
</code></pre><p>查询当前目录下空间使用情况 :</p><pre><code>du -sh  -h是人性化显示 s是递归整个目录的大小
</code></pre><p>查看该目录下所有文件夹的排序后的大小 :</p><pre><code>for i in \`ls\`; do du -sh $i; done | sort
或者
du -sh \`ls\`
</code></pre><h2 id="综合应用" tabindex="-1"><a class="header-anchor" href="#综合应用"><span>综合应用</span></a></h2><p>当系统中sar不可用时，可以使用以下工具替代：linux下有 vmstat、Unix系统有prstat</p><p>eg： 查看cpu、内存、使用情况： vmstat n m （n 为监控频率、m为监控次数） :</p><pre><code>[/home/weber#]vmstat 1 3
procs -----------memory---------- ---swap-- -----io---- -system-- ----cpu----
r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa
0  0  86560  42300   9752  63556    0    1     1     1    0    0  0  0 99  0
1  0  86560  39936   9764  63544    0    0     0    52   66   95  5  0 95  0
0  0  86560  42168   9772  63556    0    0     0    20  127  231 13  2 84  0
</code></pre><p>使用watch 工具监控变化 当需要持续的监控应用的某个数据变化时，watch工具能满足要求； 执行watch命令后，会进入到一个界面，输出当前被监控的数据，一旦数据变化，便会高亮显示变化情况；</p><p>eg：操作redis时，监控内存变化： :</p><pre><code>$watch -d -n 1 &#39;./redis-cli info | grep memory&#39;
(以下为watch工具中的界面内容，一旦内存变化，即实时高亮显示变化）
Every 1.0s: ./redis-cli info | grep memory                                                                  Mon Apr 28 16:10:36 2014

used_memory:45157376
used_memory_human:43.07M
used_memory_rss:47628288
used_memory_peak:49686080
used_memory_peak_human:47.38M
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>top / sar / free / watch</p><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录"><span>附录</span></a></h2><p>关于sar的使用详解参考：<code>sar</code>{.interpreted-text role=&quot;ref&quot;}</p>`,35)])])}const d=a(o,[["render",p]]),i=JSON.parse('{"path":"/linux-tutor/base/06_monitor.html","title":"性能监控","lang":"zh-CN","frontmatter":{"description":"性能监控 提示 在使用操作系统的过程中，我们经常需要查看当前的性能如何，需要了解CPU、内存和硬盘的使用情况； 本节介绍的这几个工具能满足日常工作要求； 监控CPU 查看CPU使用率 : 后面的两个参数表示监控的频率，比如例子中的1和2，表示每秒采样一次，总共采样2次； 查看CPU平均负载 : sar指定-q后，就能查看运行队列中的进程数、系统上的进程...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"性能监控\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-26T11:39:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/base/06_monitor.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"性能监控"}],["meta",{"property":"og:description","content":"性能监控 提示 在使用操作系统的过程中，我们经常需要查看当前的性能如何，需要了解CPU、内存和硬盘的使用情况； 本节介绍的这几个工具能满足日常工作要求； 监控CPU 查看CPU使用率 : 后面的两个参数表示监控的频率，比如例子中的1和2，表示每秒采样一次，总共采样2次； 查看CPU平均负载 : sar指定-q后，就能查看运行队列中的进程数、系统上的进程..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T11:39:36.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-26T11:39:36.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1653565176000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.59,"words":777},"filePathRelative":"linux-tutor/base/06_monitor.md","autoDesc":true}');export{d as comp,i as data};
