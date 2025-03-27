import{_ as t,c as l,a as n,o as i}from"./app-C8DxhDIZ.js";const o={};function r(s,e){return i(),l("div",null,e[0]||(e[0]=[n('<h1 id="nfs-network-filesystem-介绍" tabindex="-1"><a class="header-anchor" href="#nfs-network-filesystem-介绍"><span>NFS（Network FileSystem）介绍</span></a></h1><h2 id="nfs-安装" tabindex="-1"><a class="header-anchor" href="#nfs-安装"><span>NFS 安装</span></a></h2><ul><li><p>查看是否已安装：</p></li><li><p>CentOS：<code>rpm -qa | grep nfs-*</code></p></li><li><p>Ubuntu：<code>dpkg -l | grep nfs-*</code></p></li><li><p>安装：</p></li><li><p>CentOS 5：<code>sudo yum install -y nfs-utils portmap</code></p></li><li><p>CentOS 6：<code>sudo yum install -y nfs-utils rpcbind</code></p></li><li><p>Ubuntu：<code>sudo apt-get install -y nfs-common nfs-kernel-server</code></p></li></ul><h2 id="nfs-服务器配置文件常用参数" tabindex="-1"><a class="header-anchor" href="#nfs-服务器配置文件常用参数"><span>NFS 服务器配置文件常用参数</span></a></h2><ul><li><p>配置文件介绍（记得先备份）：<code>sudo vim /etc/exports</code></p></li><li><p>默认配置文件里面是没啥内容的，我们需要自己加上配置内容，一行表示共享一个目录。为了方便使用，共享的目录最好将权限设置为 777（<code>chmod 777 folderName</code>）。</p></li><li><p>假设在配置文件里面加上：<code>/opt/mytest 192.168.0.0/55(rw,sync,all_squash,anonuid=501,anongid=501,no_subtree_check)</code></p></li><li><p>该配置解释：</p><ul><li>/opt/mytest 表示我们要共享的目录</li><li>192.168.0.0/55 表示内网中这个网段区间的IP是可以进行访问的，如果要任意网段都可以访问，可以用 <code>*</code> 号表示</li><li>(rw,sync,all_squash,anonuid=501,anongid=501,no_subtree_check) 表示权限 <ul><li>rw：是可读写（ro是只读）</li><li>sync：同步模式，表示内存中的数据时时刻刻写入磁盘（async：非同步模式，内存中数据定期存入磁盘）</li><li>all_squash：表示不管使用NFS的用户是谁，其身份都会被限定为一个指定的普通用户身份。（no_root_squash：其他客户端主机的root用户对该目录有至高权限控制。root_squash：表示其他客户端主机的root用户对该目录有普通用户权限控制）</li><li>anonuid/anongid：要和root_squash或all_squash选项一同使用，表示指定使用NFS的用户被限定后的uid和gid，前提是本图片服务器的/etc/passwd中存在这一的uid和gid</li><li>no_subtree_check：不检查父目录的权限</li></ul></li></ul></li><li><p>启动服务：</p></li><li><p><code>/etc/init.d/rpcbind restart</code></p></li><li><p><code>/etc/init.d/nfs-kernel-server restart</code></p></li></ul><h2 id="nfs-客户端访问" tabindex="-1"><a class="header-anchor" href="#nfs-客户端访问"><span>NFS 客户端访问</span></a></h2><ul><li>客户端要访问服务端的共享目录需要对其共享的目录进行挂载，在挂载之前先检查下：<code>showmount -e 192.168.1.25</code>（这个 IP 是 NFS 的服务器端 IP）</li><li>如果显示：/opt/mytest 相关信息表示成功了。</li><li>现在开始对其进行挂载：<code>mount -t nfs 192.168.1.25:/opt/mytest/ /mytest/</code></li><li>在客户端机器上输入命令：<code>df -h</code> 可以看到多了一个 mytest 分区。然后我们可以再创建一个软链接，把软链接放在 war 包的目录下，这样上传的图片都会跑到另外一台服务器上了。软链接相关内容请自行搜索。</li></ul><h2 id="nfs-资料" tabindex="-1"><a class="header-anchor" href="#nfs-资料"><span>NFS 资料</span></a></h2><ul><li><a href="http://wiki.jikexueyuan.com/project/linux/nfs.html" target="_blank" rel="noopener noreferrer">http://wiki.jikexueyuan.com/project/linux/nfs.html</a></li><li><a href="http://www.jb51.net/os/RedHat/77993.html" target="_blank" rel="noopener noreferrer">http://www.jb51.net/os/RedHat/77993.html</a></li><li><a href="http://www.cnblogs.com/Charles-Zhang-Blog/archive/2013/02/05/2892879.html" target="_blank" rel="noopener noreferrer">http://www.cnblogs.com/Charles-Zhang-Blog/archive/2013/02/05/2892879.html</a></li><li><a href="http://www.linuxidc.com/Linux/2013-08/89154.htm" target="_blank" rel="noopener noreferrer">http://www.linuxidc.com/Linux/2013-08/89154.htm</a></li><li><a href="http://www.centoscn.com/image-text/config/2015/0111/4475.html" target="_blank" rel="noopener noreferrer">http://www.centoscn.com/image-text/config/2015/0111/4475.html</a></li></ul>',9)]))}const c=t(o,[["render",r]]),p=JSON.parse('{"path":"/linux-tutor/server/NFS.html","title":"NFS（Network FileSystem）介绍","lang":"zh-CN","frontmatter":{"description":"NFS（Network FileSystem）介绍 NFS 安装 查看是否已安装： CentOS：rpm -qa | grep nfs-* Ubuntu：dpkg -l | grep nfs-* 安装： CentOS 5：sudo yum install -y nfs-utils portmap CentOS 6：sudo yum install -y...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/NFS.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"NFS（Network FileSystem）介绍"}],["meta",{"property":"og:description","content":"NFS（Network FileSystem）介绍 NFS 安装 查看是否已安装： CentOS：rpm -qa | grep nfs-* Ubuntu：dpkg -l | grep nfs-* 安装： CentOS 5：sudo yum install -y nfs-utils portmap CentOS 6：sudo yum install -y..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NFS（Network FileSystem）介绍\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"NFS 安装","slug":"nfs-安装","link":"#nfs-安装","children":[]},{"level":2,"title":"NFS 服务器配置文件常用参数","slug":"nfs-服务器配置文件常用参数","link":"#nfs-服务器配置文件常用参数","children":[]},{"level":2,"title":"NFS 客户端访问","slug":"nfs-客户端访问","link":"#nfs-客户端访问","children":[]},{"level":2,"title":"NFS 资料","slug":"nfs-资料","link":"#nfs-资料","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.05,"words":615},"filePathRelative":"linux-tutor/server/NFS.md","localizedDate":"2022年5月26日","autoDesc":true}');export{c as comp,p as data};
