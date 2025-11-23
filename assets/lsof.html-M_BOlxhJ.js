import{_ as n,c as o,a as i,o as t}from"./app-B6vXTniy.js";const r={};function l(a,e){return t(),o("div",null,[...e[0]||(e[0]=[i(`<h1 id="lsof-一切皆文件" tabindex="-1"><a class="header-anchor" href="#lsof-一切皆文件"><span>lsof 一切皆文件</span></a></h1><p>lsof（list open files）是一个查看当前系统文件的工具。在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。如传输控制协议 (TCP) 和用户数据报协议 (UDP) 套接字等，系统在后台都为该应用程序分配了一个文件描述符，该文件描述符提供了大量关于这个应用程序本身的信息。</p><p>lsof打开的文件可以是：</p><ol><li>普通文件</li><li>目录</li><li>网络文件系统的文件</li><li>字符或设备文件</li><li>(函数)共享库</li><li>管道，命名管道</li><li>符号链接</li><li>网络文件（例如：NFS file、网络socket，unix域名socket）</li><li>还有其它类型的文件，等等</li></ol><h2 id="命令参数" tabindex="-1"><a class="header-anchor" href="#命令参数"><span>命令参数</span></a></h2><ul><li>-a 列出打开文件存在的进程</li><li>-c&lt;进程名&gt; 列出指定进程所打开的文件</li><li>-g 列出GID号进程详情</li><li>-d&lt;文件号&gt; 列出占用该文件号的进程</li><li>+d&lt;目录&gt; 列出目录下被打开的文件</li><li>+D&lt;目录&gt; 递归列出目录下被打开的文件</li><li>-n&lt;目录&gt; 列出使用NFS的文件</li><li>-i&lt;条件&gt; 列出符合条件的进程。（4、6、协议、:端口、 @ip ）</li><li>-p&lt;进程号&gt; 列出指定进程号所打开的文件</li><li>-u 列出UID号进程详情</li><li>-h 显示帮助信息</li><li>-v 显示版本信息</li></ul><h2 id="使用实例" tabindex="-1"><a class="header-anchor" href="#使用实例"><span>使用实例</span></a></h2><h3 id="实例1-无任何参数" tabindex="-1"><a class="header-anchor" href="#实例1-无任何参数"><span>实例1：无任何参数</span></a></h3><pre><code>$lsof| more
COMMAND     PID      USER   FD      TYPE             DEVICE SIZE/OFF       NODE NAME
init          1      root  cwd       DIR              253,0     4096          2 /
init          1      root  rtd       DIR              253,0     4096          2 /
init          1      root  txt       REG              253,0   150352    1310795 /sbin/init
init          1      root  mem       REG              253,0    65928    5505054 /lib64/libnss_files-2.12.so
init          1      root  mem       REG              253,0  1918016    5521405 /lib64/libc-2.12.so
init          1      root  mem       REG              253,0    93224    5521440 /lib64/libgcc_s-4.4.6-20120305.so.1
init          1      root  mem       REG              253,0    47064    5521407 /lib64/librt-2.12.so
init          1      root  mem       REG              253,0   145720    5521406 /lib64/libpthread-2.12.so
...
</code></pre><p>说明：</p><p>lsof输出各列信息的意义如下：</p><ul><li><p>COMMAND：进程的名称</p></li><li><p>PID：进程标识符</p></li><li><p>PPID：父进程标识符（需要指定-R参数）</p></li><li><p>USER：进程所有者</p></li><li><p>PGID：进程所属组</p></li><li><p>FD：文件描述符，应用程序通过文件描述符识别该文件。如cwd、txt等:</p><pre><code>  （1）cwd：表示current work dirctory，即：应用程序的当前工作目录，这是该应用程序启动的目录，除非它本身对这个目录进行更改
  （2）txt ：该类型的文件是程序代码，如应用程序二进制文件本身或共享库，如上列表中显示的 /sbin/init 程序
  （3）lnn：library references (AIX);
  （4）er：FD information error (see NAME column);
  （5）jld：jail directory (FreeBSD);
  （6）ltx：shared library text (code and data);
  （7）mxx ：hex memory-mapped type number xx.
  （8）m86：DOS Merge mapped file;
  （9）mem：memory-mapped file;
  （10）mmap：memory-mapped device;
  （11）pd：parent directory;
  （12）rtd：root directory;
  （13）tr：kernel trace file (OpenBSD);
  （14）v86  VP/ix mapped file;
  （15）0：表示标准输入
  （16）1：表示标准输出
  （17）2：表示标准错误
  一般在标准输出、标准错误、标准输入后还跟着文件状态模式：r、w、u等
  （1）u：表示该文件被打开并处于读取/写入模式
  （2）r：表示该文件被打开并处于只读模式
  （3）w：表示该文件被打开并处于
  （4）空格：表示该文件的状态模式为unknow，且没有锁定
  （5）-：表示该文件的状态模式为unknow，且被锁定
  同时在文件状态模式后面，还跟着相关的锁
  （1）N：for a Solaris NFS lock of unknown type;
  （2）r：for read lock on part of the file;
  （3）R：for a read lock on the entire file;
  （4）w：for a write lock on part of the file;（文件的部分写锁）
  （5）W：for a write lock on the entire file;（整个文件的写锁）
  （6）u：for a read and write lock of any length;
  （7）U：for a lock of unknown type;
  （8）x：for an SCO OpenServer Xenix lock on part      of the file;
  （9）X：for an SCO OpenServer Xenix lock on the      entire file;
  （10）space：if there is no lock.
</code></pre></li><li><p>TYPE：文件类型，如DIR、REG等，常见的文件类型:</p><pre><code>  （1）DIR：表示目录
  （2）CHR：表示字符类型
  （3）BLK：块设备类型
  （4）UNIX： UNIX 域套接字
  （5）FIFO：先进先出 (FIFO) 队列
  （6）IPv4：网际协议 (IP) 套接字
</code></pre></li><li><p>DEVICE：指定磁盘的名称</p></li><li><p>SIZE：文件的大小</p></li><li><p>NODE：索引节点（文件在磁盘上的标识）</p></li><li><p>NAME：打开文件的确切名称</p></li></ul><h3 id="实例2-查找某个文件相关的进程" tabindex="-1"><a class="header-anchor" href="#实例2-查找某个文件相关的进程"><span>实例2：查找某个文件相关的进程</span></a></h3><pre><code>$lsof /bin/bash
COMMAND     PID USER  FD   TYPE DEVICE SIZE/OFF    NODE NAME
mysqld_sa  2169 root txt    REG  253,0   938736 4587562 /bin/bash
ksmtuned   2334 root txt    REG  253,0   938736 4587562 /bin/bash
bash      20121 root txt    REG  253,0   938736 4587562 /bin/bash
</code></pre><h3 id="实例3-列出某个用户打开的文件信息" tabindex="-1"><a class="header-anchor" href="#实例3-列出某个用户打开的文件信息"><span>实例3：列出某个用户打开的文件信息</span></a></h3><pre><code>$lsof -u username

-u 选项，u是user的缩写
</code></pre><h3 id="实例4-列出某个程序进程所打开的文件信息" tabindex="-1"><a class="header-anchor" href="#实例4-列出某个程序进程所打开的文件信息"><span>实例4：列出某个程序进程所打开的文件信息</span></a></h3><pre><code>$lsof -c mysql
</code></pre><p>-c 选项将会列出所有以mysql这个进程开头的程序的文件，其实你也可以写成 lsof | grep mysql, 但是第一种方法明显比第二种方法要少打几个字符；</p><h3 id="实例5-列出某个用户以及某个进程所打开的文件信息" tabindex="-1"><a class="header-anchor" href="#实例5-列出某个用户以及某个进程所打开的文件信息"><span>实例5：列出某个用户以及某个进程所打开的文件信息</span></a></h3><pre><code>$lsof  -u test -c mysql
</code></pre><h3 id="实例6-通过某个进程号显示该进程打开的文件" tabindex="-1"><a class="header-anchor" href="#实例6-通过某个进程号显示该进程打开的文件"><span>实例6：通过某个进程号显示该进程打开的文件</span></a></h3><pre><code>$lsof -p 11968
</code></pre><h3 id="实例7-列出所有的网络连接" tabindex="-1"><a class="header-anchor" href="#实例7-列出所有的网络连接"><span>实例7：列出所有的网络连接</span></a></h3><pre><code>$lsof -i
</code></pre><h3 id="实例8-列出所有tcp-网络连接信息" tabindex="-1"><a class="header-anchor" href="#实例8-列出所有tcp-网络连接信息"><span>实例8：列出所有tcp 网络连接信息</span></a></h3><pre><code>$lsof -i tcp

$lsof -n -i tcp
COMMAND     PID  USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
svnserve  11552 weber    3u  IPv4 3799399      0t0  TCP *:svn (LISTEN)
redis-ser 25501 weber    4u  IPv4  113150      0t0  TCP 127.0.0.1:6379 (LISTEN)
</code></pre><h3 id="实例9-列出谁在使用某个端口" tabindex="-1"><a class="header-anchor" href="#实例9-列出谁在使用某个端口"><span>实例9：列出谁在使用某个端口</span></a></h3><pre><code>$lsof -i :3306
</code></pre><h3 id="实例10-列出某个用户的所有活跃的网络端口" tabindex="-1"><a class="header-anchor" href="#实例10-列出某个用户的所有活跃的网络端口"><span>实例10：列出某个用户的所有活跃的网络端口</span></a></h3><pre><code>$lsof -a -u test -i
</code></pre><h3 id="实例11-根据文件描述列出对应的文件信息" tabindex="-1"><a class="header-anchor" href="#实例11-根据文件描述列出对应的文件信息"><span>实例11：根据文件描述列出对应的文件信息</span></a></h3><pre><code>$lsof -d description(like 2)
</code></pre><p>示例:</p><pre><code>$lsof -d 3 | grep PARSER1
tail      6499 tde    3r   REG    253,3   4514722     417798 /opt/applog/open/log/HOSTPARSER1_ERROR_141217.log.001
</code></pre><p>说明： 0表示标准输入，1表示标准输出，2表示标准错误，从而可知：所以大多数应用程序所打开的文件的 FD 都是从 3 开始</p><h3 id="实例12-列出被进程号为1234的进程所打开的所有ipv4-network-files" tabindex="-1"><a class="header-anchor" href="#实例12-列出被进程号为1234的进程所打开的所有ipv4-network-files"><span>实例12：列出被进程号为1234的进程所打开的所有IPV4 network files</span></a></h3><pre><code>$lsof -i 4 -a -p 1234
</code></pre><h3 id="实例13-列出目前连接主机nf5260i5-td上端口为-20-21-80相关的所有文件信息-且每隔3秒重复执行" tabindex="-1"><a class="header-anchor" href="#实例13-列出目前连接主机nf5260i5-td上端口为-20-21-80相关的所有文件信息-且每隔3秒重复执行"><span>实例13：列出目前连接主机nf5260i5-td上端口为：20，21，80相关的所有文件信息，且每隔3秒重复执行</span></a></h3><pre><code>lsof -i @nf5260i5-td:20,21,80 -r 3
</code></pre>`,40)])])}const s=n(r,[["render",l]]),d=JSON.parse('{"path":"/linux-tutor/tool/lsof.html","title":"lsof 一切皆文件","lang":"zh-CN","frontmatter":{"description":"lsof 一切皆文件 lsof（list open files）是一个查看当前系统文件的工具。在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。如传输控制协议 (TCP) 和用户数据报协议 (UDP) 套接字等，系统在后台都为该应用程序分配了一个文件描述符，该文件描述符提供了大量关于这个应用程序本...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"lsof 一切皆文件\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/tool/lsof.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"lsof 一切皆文件"}],["meta",{"property":"og:description","content":"lsof 一切皆文件 lsof（list open files）是一个查看当前系统文件的工具。在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。如传输控制协议 (TCP) 和用户数据报协议 (UDP) 套接字等，系统在后台都为该应用程序分配了一个文件描述符，该文件描述符提供了大量关于这个应用程序本..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":5.25,"words":1574},"filePathRelative":"linux-tutor/tool/lsof.md","autoDesc":true}');export{s as comp,d as data};
