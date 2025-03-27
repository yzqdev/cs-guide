import{_ as s,c as n,a as r,o as t}from"./app-C8DxhDIZ.js";const i={};function p(a,e){return t(),n("div",null,e[0]||(e[0]=[r(`<h1 id="ipcs-查询进程间通信状态" tabindex="-1"><a class="header-anchor" href="#ipcs-查询进程间通信状态"><span>ipcs 查询进程间通信状态</span></a></h1><p>ipcs是Linux下显示进程间通信设施状态的工具。可以显示消息队列、共享内存和信号量的信息。对于程序员非常有用，普通的系统管理员一般用不到此指令。</p><h2 id="ipc资源查询" tabindex="-1"><a class="header-anchor" href="#ipc资源查询"><span>IPC资源查询</span></a></h2><h3 id="查看系统使用的ipc资源" tabindex="-1"><a class="header-anchor" href="#查看系统使用的ipc资源"><span>查看系统使用的IPC资源</span></a></h3><pre><code>$ipcs

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      

------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 229376     weber      600        1         

------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
</code></pre><p>分别查询IPC资源:</p><pre><code>$ipcs -m 查看系统使用的IPC共享内存资源
$ipcs -q 查看系统使用的IPC队列资源
$ipcs -s 查看系统使用的IPC信号量资源
</code></pre><h3 id="查看ipc资源被谁占用" tabindex="-1"><a class="header-anchor" href="#查看ipc资源被谁占用"><span>查看IPC资源被谁占用</span></a></h3><p>示例：有个IPCKEY(51036)，需要查询其是否被占用；</p><ol><li><p>首先通过计算器将其转为十六进制:</p><pre><code> 51036 -&gt; c75c
</code></pre></li><li><p>如果知道是被共享内存占用:</p><pre><code> $ipcs -m | grep c75c
 0x0000c75c 40403197   tdea3    666        536870912  2
</code></pre></li><li><p>如果不确定，则直接查找:</p><pre><code> $ipcs | grep c75c
 0x0000c75c 40403197   tdea3    666        536870912  2
 0x0000c75c 5079070    tdea3    666        4
</code></pre></li></ol><h2 id="系统ipc参数查询" tabindex="-1"><a class="header-anchor" href="#系统ipc参数查询"><span>系统IPC参数查询</span></a></h2><pre><code>ipcs -l

------ Shared Memory Limits --------
max number of segments = 4096
max seg size (kbytes) = 4194303
max total shared memory (kbytes) = 1073741824
min seg size (bytes) = 1

------ Semaphore Limits --------
max number of arrays = 128
max semaphores per array = 250
max semaphores system wide = 32000
max ops per semop call = 32
semaphore max value = 32767

------ Messages: Limits --------
max queues system wide = 2048
max size of message (bytes) = 524288
default max size of queue (bytes) = 5242880
</code></pre><p>以上输出显示，目前这个系统的允许的最大内存为1073741824kb；最大可使用128个信号量，每个消息的最大长度为524288bytes；</p><h2 id="修改ipc系统参数" tabindex="-1"><a class="header-anchor" href="#修改ipc系统参数"><span>修改IPC系统参数</span></a></h2><p>以linux系统为例，在root用户下修改/etc/sysctl.conf 文件，保存后使用sysctl -p生效:</p><pre><code>$cat /etc/sysctl.conf
# 一个消息的最大长度
kernel.msgmax = 524288

# 一个消息队列上的最大字节数
# 524288*10
kernel.msgmnb = 5242880

#最大消息队列的个数
kernel.msgmni=2048

#一个共享内存区的最大字节数
kernel.shmmax = 17179869184

#系统范围内最大共享内存标识数
kernel.shmmni=4096

#每个信号灯集的最大信号灯数 系统范围内最大信号灯数 每个信号灯支持的最大操作数 系统范围内最大信号灯集数
#此参数为系统默认，可以不用修改
#kernel.sem = &lt;semmsl&gt; &lt;semmni&gt;*&lt;semmsl&gt; &lt;semopm&gt; &lt;semmni&gt;
kernel.sem = 250 32000 32 128
</code></pre><p>显示输入不带标志的 ipcs：的输出:</p><pre><code>$ipcs
IPC status from /dev/mem as of Mon Aug 14 15:03:46 1989
T    ID         KEY        MODE       OWNER     GROUP
Message Queues:
q       0    0x00010381 -Rrw-rw-rw-   root      system
q   65537    0x00010307 -Rrw-rw-rw-   root      system
q   65538    0x00010311 -Rrw-rw-rw-   root      system
q   65539    0x0001032f -Rrw-rw-rw-   root      system
q   65540    0x0001031b -Rrw-rw-rw-   root      system
q   65541    0x00010339--rw-rw-rw-    root      system
q       6    0x0002fe03 -Rrw-rw-rw-   root      system
Shared Memory:
m   65537    0x00000000 DCrw-------   root      system
m  720898    0x00010300 -Crw-rw-rw-   root      system
m   65539    0x00000000 DCrw-------   root      system
Semaphores:
s  131072    0x4d02086a --ra-ra----   root      system
s   65537    0x00000000 --ra-------   root      system
s 1310722    0x000133d0 --ra-------   7003      30720
</code></pre><h2 id="清除ipc资源" tabindex="-1"><a class="header-anchor" href="#清除ipc资源"><span>清除IPC资源</span></a></h2><p>使用ipcrm 命令来清除IPC资源：这个命令同时会将与ipc对象相关联的数据也一起移除。当然，只有root用户，或者ipc对象的创建者才有这项权利；</p><p>ipcrm用法:</p><pre><code>ipcrm -M shmkey  移除用shmkey创建的共享内存段
ipcrm -m shmid    移除用shmid标识的共享内存段
ipcrm -Q msgkey  移除用msqkey创建的消息队列
ipcrm -q msqid  移除用msqid标识的消息队列
ipcrm -S semkey  移除用semkey创建的信号
ipcrm -s semid  移除用semid标识的信号
</code></pre><p>清除当前用户创建的所有的IPC资源:</p><pre><code>ipcs -q | awk &#39;{ print &quot;ipcrm -q &quot;$2}&#39; | sh &gt; /dev/null 2&gt;&amp;1;
ipcs -m | awk &#39;{ print &quot;ipcrm -m &quot;$2}&#39; | sh &gt; /dev/null 2&gt;&amp;1;
ipcs -s | awk &#39;{ print &quot;ipcrm -s &quot;$2}&#39; | sh &gt; /dev/null 2&gt;&amp;1;
</code></pre><h2 id="综合应用" tabindex="-1"><a class="header-anchor" href="#综合应用"><span>综合应用</span></a></h2><h3 id="查询user1用户环境上是否存在积queue现象" tabindex="-1"><a class="header-anchor" href="#查询user1用户环境上是否存在积queue现象"><span>查询user1用户环境上是否存在积Queue现象</span></a></h3><ol><li><p>查询队列Queue:</p><pre><code> $ipcs -q

 ------ Message Queues --------
 key        msqid      owner      perms      used-bytes   messages    
 0x49060005 58261504   user1    660        0            0           
 0x4f060005 58294273   user1    660        0            0          
 ...
</code></pre></li><li><p>找出第6列大于0的服务:</p><pre><code> $ ipcs -q |grep user1 |awk &#39;{if($5&gt;0) print $0}&#39;
 0x00000000 1071579324 user1       644        1954530      4826        
 0x00000000 1071644862 user1       644        1961820      4844        
 0x00000000 1071677631 user1       644        1944810      4802        
 0x00000000 1071710400 user1       644        1961820      4844   
</code></pre></li></ol>`,27)]))}const o=s(i,[["render",p]]),m=JSON.parse('{"path":"/linux-tutor/tool/ipcs.html","title":"ipcs 查询进程间通信状态","lang":"zh-CN","frontmatter":{"description":"ipcs 查询进程间通信状态 ipcs是Linux下显示进程间通信设施状态的工具。可以显示消息队列、共享内存和信号量的信息。对于程序员非常有用，普通的系统管理员一般用不到此指令。 IPC资源查询 查看系统使用的IPC资源 分别查询IPC资源: 查看IPC资源被谁占用 示例：有个IPCKEY(51036)，需要查询其是否被占用； 首先通过计算器将其转为十...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/tool/ipcs.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"ipcs 查询进程间通信状态"}],["meta",{"property":"og:description","content":"ipcs 查询进程间通信状态 ipcs是Linux下显示进程间通信设施状态的工具。可以显示消息队列、共享内存和信号量的信息。对于程序员非常有用，普通的系统管理员一般用不到此指令。 IPC资源查询 查看系统使用的IPC资源 分别查询IPC资源: 查看IPC资源被谁占用 示例：有个IPCKEY(51036)，需要查询其是否被占用； 首先通过计算器将其转为十..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ipcs 查询进程间通信状态\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"IPC资源查询","slug":"ipc资源查询","link":"#ipc资源查询","children":[{"level":3,"title":"查看系统使用的IPC资源","slug":"查看系统使用的ipc资源","link":"#查看系统使用的ipc资源","children":[]},{"level":3,"title":"查看IPC资源被谁占用","slug":"查看ipc资源被谁占用","link":"#查看ipc资源被谁占用","children":[]}]},{"level":2,"title":"系统IPC参数查询","slug":"系统ipc参数查询","link":"#系统ipc参数查询","children":[]},{"level":2,"title":"修改IPC系统参数","slug":"修改ipc系统参数","link":"#修改ipc系统参数","children":[]},{"level":2,"title":"清除IPC资源","slug":"清除ipc资源","link":"#清除ipc资源","children":[]},{"level":2,"title":"综合应用","slug":"综合应用","link":"#综合应用","children":[{"level":3,"title":"查询user1用户环境上是否存在积Queue现象","slug":"查询user1用户环境上是否存在积queue现象","link":"#查询user1用户环境上是否存在积queue现象","children":[]}]}],"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.29,"words":986},"filePathRelative":"linux-tutor/tool/ipcs.md","localizedDate":"2022年5月26日","autoDesc":true}');export{o as comp,m as data};
