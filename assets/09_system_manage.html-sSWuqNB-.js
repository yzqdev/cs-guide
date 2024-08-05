import{_ as e,c as a,o as s,d as l}from"./app-CbULZrmi.js";const n={},c=l(`<h1 id="系统管理及ipc资源管理" tabindex="-1"><a class="header-anchor" href="#系统管理及ipc资源管理"><span>系统管理及IPC资源管理</span></a></h1><h2 id="系统管理" tabindex="-1"><a class="header-anchor" href="#系统管理"><span>系统管理</span></a></h2><h3 id="查询系统版本" tabindex="-1"><a class="header-anchor" href="#查询系统版本"><span>查询系统版本</span></a></h3><p>查看Linux系统版本:</p><pre><code class="language-shell">uname -a
lsb_release -a
</code></pre><p>查看Unix系统版本：操作系统版本:</p><pre><code class="language-shell">more /etc/release
</code></pre><h3 id="查询硬件信息" tabindex="-1"><a class="header-anchor" href="#查询硬件信息"><span>查询硬件信息</span></a></h3><p>查看CPU使用情况:</p><pre><code class="language-shell">sar -u 5 10
</code></pre><p>查询CPU信息:</p><pre><code class="language-shell"> cat /proc/cpuinfo
</code></pre><p>查看CPU的核的个数:</p><pre><code class="language-shell">cat /proc/cpuinfo | grep processor | wc -l
</code></pre><p>查看内存信息:</p><pre><code class="language-shell">cat /proc/meminfo
</code></pre><p>显示内存page大小（以KByte为单位）:</p><pre><code class="language-shell">pagesize
</code></pre><p>显示架构:</p><pre><code class="language-shell">arch
</code></pre><h3 id="设置系统时间" tabindex="-1"><a class="header-anchor" href="#设置系统时间"><span>设置系统时间</span></a></h3><p>显示当前系统时间:</p><pre><code class="language-shell">date
</code></pre><p>设置系统日期和时间(格式为2014-09-15 17:05:00):</p><pre><code class="language-shell">date -s 2014-09-15 17:05:00
date -s 2014-09-15
date -s 17:05:00
</code></pre><p>设置时区:</p><pre><code>选择时区信息。命令为：tzselect
根据系统提示，选择相应的时区信息。
</code></pre><p>强制把系统时间写入CMOS（这样，重启后时间也正确了）:</p><pre><code class="language-shell">clock -w
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>设置系统时间需要root用户权限.</p></div><p>格式化输出当前日期时间:</p><pre><code class="language-shell">date +%Y%m%d.%H%M%S
   # &gt;20150512.173821
</code></pre><h2 id="ipc资源管理" tabindex="-1"><a class="header-anchor" href="#ipc资源管理"><span>IPC资源管理</span></a></h2><h3 id="ipc资源查询" tabindex="-1"><a class="header-anchor" href="#ipc资源查询"><span>IPC资源查询</span></a></h3><p>查看系统使用的IPC资源:</p><pre><code class="language-shell">ipcs

    ------ Shared Memory Segments --------
    key        shmid      owner      perms      bytes      nattch     status      

    ------ Semaphore Arrays --------
    key        semid      owner      perms      nsems     
    0x00000000 229376     weber      600        1         

    ------ Message Queues --------
    key        msqid      owner      perms      used-bytes   messages    
</code></pre><p>查看系统使用的IPC共享内存资源:</p><pre><code class="language-shell">ipcs -m
</code></pre><p>查看系统使用的IPC队列资源:</p><pre><code class="language-shell">ipcs -q
</code></pre><p>查看系统使用的IPC信号量资源:</p><pre><code class="language-shell">ipcs -s
</code></pre><p>应用示例：查看IPC资源被谁占用</p><p>有个IPCKEY：51036 ，需要查询其是否被占用；</p><ol><li></li></ol><pre><code>首先通过计算器将其转为十六进制:

:   51036 -\\&gt; c75c
</code></pre><ol start="2"><li>如果知道是被共享内存占用:</li></ol><pre><code class="language-shell">ipcs -m | grep c75c
        # 0x0000c75c 40403197   tdea3    666        536870912  2
</code></pre><ol start="3"><li>如果不确定，则直接查找:</li></ol><pre><code class="language-shell">ipcs | grep c75c
        0x0000c75c 40403197   tdea3    666        536870912  2
        0x0000c75c 5079070    tdea3    666        4
</code></pre><h3 id="检测和设置系统资源限制" tabindex="-1"><a class="header-anchor" href="#检测和设置系统资源限制"><span>检测和设置系统资源限制</span></a></h3><p>显示当前所有的系统资源limit 信息:</p><pre><code class="language-shell">ulimit – a
</code></pre><p>对生成的 core 文件的大小不进行限制:</p><pre><code class="language-shell">ulimit – c unlimited
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>uname sar arch date ipcs ulimit</p>`,57),t=[c];function p(r,o){return s(),a("div",null,t)}const d=e(n,[["render",p],["__file","09_system_manage.html.vue"]]),h=JSON.parse('{"path":"/linux-tutor/base/09_system_manage.html","title":"系统管理及IPC资源管理","lang":"zh-CN","frontmatter":{"order":9,"description":"系统管理及IPC资源管理 系统管理 查询系统版本 查看Linux系统版本: 查看Unix系统版本：操作系统版本: 查询硬件信息 查看CPU使用情况: 查询CPU信息: 查看CPU的核的个数: 查看内存信息: 显示内存page大小（以KByte为单位）: 显示架构: 设置系统时间 显示当前系统时间: 设置系统日期和时间(格式为2014-09-15 17:...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/base/09_system_manage.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"系统管理及IPC资源管理"}],["meta",{"property":"og:description","content":"系统管理及IPC资源管理 系统管理 查询系统版本 查看Linux系统版本: 查看Unix系统版本：操作系统版本: 查询硬件信息 查看CPU使用情况: 查询CPU信息: 查看CPU的核的个数: 查看内存信息: 显示内存page大小（以KByte为单位）: 显示架构: 设置系统时间 显示当前系统时间: 设置系统日期和时间(格式为2014-09-15 17:..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T17:48:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T17:48:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"系统管理及IPC资源管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-26T17:48:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"系统管理","slug":"系统管理","link":"#系统管理","children":[{"level":3,"title":"查询系统版本","slug":"查询系统版本","link":"#查询系统版本","children":[]},{"level":3,"title":"查询硬件信息","slug":"查询硬件信息","link":"#查询硬件信息","children":[]},{"level":3,"title":"设置系统时间","slug":"设置系统时间","link":"#设置系统时间","children":[]}]},{"level":2,"title":"IPC资源管理","slug":"ipc资源管理","link":"#ipc资源管理","children":[{"level":3,"title":"IPC资源查询","slug":"ipc资源查询","link":"#ipc资源查询","children":[]},{"level":3,"title":"检测和设置系统资源限制","slug":"检测和设置系统资源限制","link":"#检测和设置系统资源限制","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1653587337000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.71,"words":512},"filePathRelative":"linux-tutor/base/09_system_manage.md","localizedDate":"2022年5月26日","autoDesc":true}');export{d as comp,h as data};
