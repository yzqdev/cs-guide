import{_ as a,c as s,a as n,o}from"./app-B6vXTniy.js";const l={};function i(r,e){return o(),s("div",null,[...e[0]||(e[0]=[n(`<h1 id="zookeeper-安装" tabindex="-1"><a class="header-anchor" href="#zookeeper-安装"><span>Zookeeper 安装</span></a></h1><h2 id="docker-部署-zookeeper" tabindex="-1"><a class="header-anchor" href="#docker-部署-zookeeper"><span>Docker 部署 Zookeeper</span></a></h2><h4 id="单个实例" tabindex="-1"><a class="header-anchor" href="#单个实例"><span>单个实例</span></a></h4><ul><li>官网仓库：<a href="https://hub.docker.com/r/library/zookeeper/" target="_blank" rel="noopener noreferrer">https://hub.docker.com/r/library/zookeeper/</a></li><li>单个实例：<code>docker run -d --restart always --name one-zookeeper -p 2181:2181 -v /etc/localtime:/etc/localtime zookeeper:latest</code><ul><li>默认端口暴露是：<code>This image includes EXPOSE 2181 2888 3888 (the zookeeper client port, follower port, election port respectively)</code></li></ul></li><li>容器中的几个重要目录（有需要挂载的可以指定）： <ul><li><code>/data</code></li><li><code>/datalog</code></li><li><code>/conf</code></li></ul></li></ul><h4 id="单机多个实例-集群" tabindex="-1"><a class="header-anchor" href="#单机多个实例-集群"><span>单机多个实例（集群）</span></a></h4><ul><li>创建 docker compose 文件：<code>vim zookeeper.yml</code></li><li>下面内容来自官网仓库：<a href="https://hub.docker.com/r/library/zookeeper/" target="_blank" rel="noopener noreferrer">https://hub.docker.com/r/library/zookeeper/</a></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">version: &#39;3.1&#39;</span>
<span class="line"></span>
<span class="line">services:</span>
<span class="line">  zoo1:</span>
<span class="line">    image: zookeeper</span>
<span class="line">    restart: always</span>
<span class="line">    hostname: zoo1</span>
<span class="line">    ports:</span>
<span class="line">      - 2181:2181</span>
<span class="line">    environment:</span>
<span class="line">      ZOO_MY_ID: 1</span>
<span class="line">      ZOO_SERVERS: server.1=0.0.0.0:2888:3888 server.2=zoo2:2888:3888 server.3=zoo3:2888:3888</span>
<span class="line"></span>
<span class="line">  zoo2:</span>
<span class="line">    image: zookeeper</span>
<span class="line">    restart: always</span>
<span class="line">    hostname: zoo2</span>
<span class="line">    ports:</span>
<span class="line">      - 2182:2181</span>
<span class="line">    environment:</span>
<span class="line">      ZOO_MY_ID: 2</span>
<span class="line">      ZOO_SERVERS: server.1=zoo1:2888:3888 server.2=0.0.0.0:2888:3888 server.3=zoo3:2888:3888</span>
<span class="line"></span>
<span class="line">  zoo3:</span>
<span class="line">    image: zookeeper</span>
<span class="line">    restart: always</span>
<span class="line">    hostname: zoo3</span>
<span class="line">    ports:</span>
<span class="line">      - 2183:2181</span>
<span class="line">    environment:</span>
<span class="line">      ZOO_MY_ID: 3</span>
<span class="line">      ZOO_SERVERS: server.1=zoo1:2888:3888 server.2=zoo2:2888:3888 server.3=0.0.0.0:2888:3888</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动：<code>docker-compose -f zookeeper.yml -p zk_test up -d</code><ul><li>参数 -p zk_test 表示这个 compose project 的名字，等价于：<code>COMPOSE_PROJECT_NAME=zk_test docker-compose -f zookeeper.yml up -d</code></li><li>不指定项目名称，Docker-Compose 默认以当前文件目录名作为应用的项目名</li><li>报错是正常情况的。</li></ul></li><li>停止：<code>docker-compose -f zookeeper.yml -p zk_test stop</code></li></ul><h4 id="先安装-nc-再来校验-zookeeper-集群情况" tabindex="-1"><a class="header-anchor" href="#先安装-nc-再来校验-zookeeper-集群情况"><span>先安装 nc 再来校验 zookeeper 集群情况</span></a></h4><ul><li>环境：CentOS 7.4</li><li>官网下载：<a href="https://nmap.org/download.html" target="_blank" rel="noopener noreferrer">https://nmap.org/download.html</a>，找到 rpm 包</li><li>当前时间（201803）最新版本下载：<code>wget https://nmap.org/dist/ncat-7.60-1.x86_64.rpm</code></li><li>安装：<code>sudo rpm -i ncat-7.60-1.x86_64.rpm</code></li><li>ln 下：<code>sudo ln -s /usr/bin/ncat /usr/bin/nc</code></li><li>检验：<code>nc --version</code></li></ul><h4 id="校验" tabindex="-1"><a class="header-anchor" href="#校验"><span>校验</span></a></h4><ul><li>命令：<code>echo stat | nc 127.0.0.1 2181</code>，得到如下信息：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Zookeeper version: 3.4.11-37e277162d567b55a07d1755f0b31c32e93c01a0, built on 11/01/2017 18:06 GMT</span>
<span class="line">Clients:</span>
<span class="line"> /172.21.0.1:58872[0](queued=0,recved=1,sent=0)</span>
<span class="line"></span>
<span class="line">Latency min/avg/max: 0/0/0</span>
<span class="line">Received: 1</span>
<span class="line">Sent: 0</span>
<span class="line">Connections: 1</span>
<span class="line">Outstanding: 0</span>
<span class="line">Zxid: 0x100000000</span>
<span class="line">Mode: follower</span>
<span class="line">Node count: 4</span>
<span class="line"></span></code></pre></div><ul><li>命令：<code>echo stat | nc 127.0.0.1 2182</code>，得到如下信息：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Zookeeper version: 3.4.11-37e277162d567b55a07d1755f0b31c32e93c01a0, built on 11/01/2017 18:06 GMT</span>
<span class="line">Clients:</span>
<span class="line"> /172.21.0.1:36190[0](queued=0,recved=1,sent=0)</span>
<span class="line"></span>
<span class="line">Latency min/avg/max: 0/0/0</span>
<span class="line">Received: 1</span>
<span class="line">Sent: 0</span>
<span class="line">Connections: 1</span>
<span class="line">Outstanding: 0</span>
<span class="line">Zxid: 0x500000000</span>
<span class="line">Mode: follower</span>
<span class="line">Node count: 4</span>
<span class="line"></span></code></pre></div><ul><li>命令：<code>echo stat | nc 127.0.0.1 2183</code>，得到如下信息：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Zookeeper version: 3.4.11-37e277162d567b55a07d1755f0b31c32e93c01a0, built on 11/01/2017 18:06 GMT</span>
<span class="line">Clients:</span>
<span class="line"> /172.21.0.1:33344[0](queued=0,recved=1,sent=0)</span>
<span class="line"></span>
<span class="line">Latency min/avg/max: 0/0/0</span>
<span class="line">Received: 1</span>
<span class="line">Sent: 0</span>
<span class="line">Connections: 1</span>
<span class="line">Outstanding: 0</span>
<span class="line">Zxid: 0x500000000</span>
<span class="line">Mode: leader</span>
<span class="line">Node count: 4</span>
<span class="line"></span></code></pre></div><h4 id="多机多个实例-集群" tabindex="-1"><a class="header-anchor" href="#多机多个实例-集群"><span>多机多个实例（集群）</span></a></h4><ul><li>三台机子： <ul><li>内网 ip：<code>172.24.165.129</code>，外网 ip：<code>47.91.22.116</code></li><li>内网 ip：<code>172.24.165.130</code>，外网 ip：<code>47.91.22.124</code></li><li>内网 ip：<code>172.24.165.131</code>，外网 ip：<code>47.74.6.138</code></li></ul></li><li>修改三台机子 hostname： <ul><li>节点 1：<code>hostnamectl --static set-hostname youmeekhost1</code></li><li>节点 2：<code>hostnamectl --static set-hostname youmeekhost2</code></li><li>节点 3：<code>hostnamectl --static set-hostname youmeekhost3</code></li></ul></li><li>三台机子的 hosts 都修改为如下内容：<code>vim /etc/hosts</code></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">172.24.165.129 youmeekhost1</span>
<span class="line">172.24.165.130 youmeekhost2</span>
<span class="line">172.24.165.131 youmeekhost3</span>
<span class="line"></span></code></pre></div><ul><li>节点 1：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -d \\</span>
<span class="line">-v /data/docker/zookeeper/data:/data \\</span>
<span class="line">-v /data/docker/zookeeper/log:/datalog \\</span>
<span class="line">-e ZOO_MY_ID=1 \\</span>
<span class="line">-e &quot;ZOO_SERVERS=server.1=youmeekhost1:2888:3888 server.2=youmeekhost2:2888:3888 server.3=youmeekhost3:2888:3888&quot; \\</span>
<span class="line">--name=zookeeper1 --net=host --restart=always zookeeper</span>
<span class="line"></span></code></pre></div><ul><li>节点 2：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -d \\</span>
<span class="line">-v /data/docker/zookeeper/data:/data \\</span>
<span class="line">-v /data/docker/zookeeper/log:/datalog \\</span>
<span class="line">-e ZOO_MY_ID=2 \\</span>
<span class="line">-e &quot;ZOO_SERVERS=server.1=youmeekhost1:2888:3888 server.2=youmeekhost2:2888:3888 server.3=youmeekhost3:2888:3888&quot; \\</span>
<span class="line">--name=zookeeper2 --net=host --restart=always zookeeper</span>
<span class="line"></span></code></pre></div><ul><li>节点 3：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">docker run -d \\</span>
<span class="line">-v /data/docker/zookeeper/data:/data \\</span>
<span class="line">-v /data/docker/zookeeper/log:/datalog \\</span>
<span class="line">-e ZOO_MY_ID=3 \\</span>
<span class="line">-e &quot;ZOO_SERVERS=server.1=youmeekhost1:2888:3888 server.2=youmeekhost2:2888:3888 server.3=youmeekhost3:2888:3888&quot; \\</span>
<span class="line">--name=zookeeper3 --net=host --restart=always zookeeper</span>
<span class="line"></span></code></pre></div><h2 id="需要环境" tabindex="-1"><a class="header-anchor" href="#需要环境"><span>需要环境</span></a></h2><ul><li>JDK 安装</li></ul><h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装"><span>下载安装</span></a></h2><ul><li>官网：<a href="https://zookeeper.apache.org/" target="_blank" rel="noopener noreferrer">https://zookeeper.apache.org/</a></li><li>此时（201702）最新稳定版本：Release <code>3.4.9</code></li><li>官网下载：<a href="http://www.apache.org/dyn/closer.cgi/zookeeper/" target="_blank" rel="noopener noreferrer">http://www.apache.org/dyn/closer.cgi/zookeeper/</a></li><li>我这里以：<code>zookeeper-3.4.8.tar.gz</code> 为例</li><li>安装过程： <ul><li><code>mkdir -p /usr/program/zookeeper/data</code></li><li><code>cd /opt/setups</code></li><li><code>tar zxvf zookeeper-3.4.8.tar.gz</code></li><li><code>mv /opt/setups/zookeeper-3.4.8 /usr/program/zookeeper</code></li><li><code>cd /usr/program/zookeeper/zookeeper-3.4.8/conf</code></li><li><code>mv zoo_sample.cfg zoo.cfg</code></li><li><code>vim zoo.cfg</code></li></ul></li><li>将配置文件中的这个值： <ul><li>原值：<code>dataDir=/tmp/zookeeper</code></li><li>改为：<code>dataDir=/usr/program/zookeeper/data</code></li></ul></li><li>防火墙开放2181端口 <ul><li><code>iptables -A INPUT -p tcp -m tcp --dport 2181 -j ACCEPT</code></li><li><code>service iptables save</code></li><li><code>service iptables restart</code></li></ul></li><li>启动 zookeeper：<code>sh /usr/program/zookeeper/zookeeper-3.4.8/bin/zkServer.sh start</code></li><li>停止 zookeeper：<code>sh /usr/program/zookeeper/zookeeper-3.4.8/bin/zkServer.sh stop</code></li><li>查看 zookeeper 状态：<code>sh /usr/program/zookeeper/zookeeper-3.4.8/bin/zkServer.sh status</code><ul><li>如果是集群环境，下面几种角色 <ul><li>leader</li><li>follower</li></ul></li></ul></li></ul><h2 id="集群环境搭建" tabindex="-1"><a class="header-anchor" href="#集群环境搭建"><span>集群环境搭建</span></a></h2><h3 id="确定机子环境" tabindex="-1"><a class="header-anchor" href="#确定机子环境"><span>确定机子环境</span></a></h3><ul><li>集群环境最少节点是：3，且节点数必须是奇数，生产环境推荐是：5 个机子节点。</li><li>系统都是 CentOS 6</li><li>机子 1：192.168.1.121</li><li>机子 2：192.168.1.111</li><li>机子 3：192.168.1.112</li></ul><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3><ul><li>在三台机子上都做如上文的流程安装，再补充修改配置文件：<code>vim /usr/program/zookeeper/zookeeper-3.4.8/conf/zoo.cfg</code></li><li>三台机子都增加下面内容：</li></ul><div class="language-nginx" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line">server.1=192.168.1.121:2888:3888</span>
<span class="line">server.2=192.168.1.111:2888:3888</span>
<span class="line">server.3=192.168.1.112:2888:3888</span>
<span class="line"></span></code></pre></div><ul><li>在 机子 1 增加一个该文件：<code>vim /usr/program/zookeeper/data/myid</code>，文件内容填写：<code>1</code></li><li>在 机子 2 增加一个该文件：<code>vim /usr/program/zookeeper/data/myid</code>，文件内容填写：<code>2</code></li><li>在 机子 3 增加一个该文件：<code>vim /usr/program/zookeeper/data/myid</code>，文件内容填写：<code>3</code></li><li>然后在三台机子上都启动 zookeeper：<code>sh /usr/program/zookeeper/zookeeper-3.4.8/bin/zkServer.sh start</code></li><li>分别查看三台机子的状态：<code>sh /usr/program/zookeeper/zookeeper-3.4.8/bin/zkServer.sh status</code>，应该会得到类似这样的结果：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Using config: /usr/program/zookeeper/zookeeper-3.4.8/bin/../conf/zoo.cfg</span>
<span class="line">Mode: follower 或者 Mode: leader</span>
<span class="line"></span></code></pre></div><h2 id="zookeeper-客户端工具" tabindex="-1"><a class="header-anchor" href="#zookeeper-客户端工具"><span>Zookeeper 客户端工具</span></a></h2><h4 id="zooinspector" tabindex="-1"><a class="header-anchor" href="#zooinspector"><span>ZooInspector</span></a></h4><ul><li>下载地址：<a href="https://issues.apache.org/jira/secure/attachment/12436620/ZooInspector.zip" target="_blank" rel="noopener noreferrer">https://issues.apache.org/jira/secure/attachment/12436620/ZooInspector.zip</a></li><li>解压，双击 jar 文件，效果如下：</li></ul><h4 id="zooweb" tabindex="-1"><a class="header-anchor" href="#zooweb"><span>zooweb</span></a></h4><ul><li>下载地址：<a href="https://github.com/zhuhongyu345/zooweb" target="_blank" rel="noopener noreferrer">https://github.com/zhuhongyu345/zooweb</a></li><li>Spring Boot 的 Web 项目，直接：<code>java -jar zooweb-1.0.jar</code> 启动 web 服务，然后访问：<a href="http://127.0.0.1:9345" target="_blank" rel="noopener noreferrer">http://127.0.0.1:9345</a></li></ul><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="https://liwei.io/2017/07/19/zookeeper-cluster-in-docker/" target="_blank" rel="noopener noreferrer">https://liwei.io/2017/07/19/zookeeper-cluster-in-docker/</a></li></ul>`,45)])])}const t=a(l,[["render",i]]),c=JSON.parse('{"path":"/linux-tutor/server/Zookeeper-Install.html","title":"Zookeeper 安装","lang":"zh-CN","frontmatter":{"description":"Zookeeper 安装 Docker 部署 Zookeeper 单个实例 官网仓库：https://hub.docker.com/r/library/zookeeper/ 单个实例：docker run -d --restart always --name one-zookeeper -p 2181:2181 -v /etc/localtime:/e...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Zookeeper 安装\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-26T16:41:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Zookeeper-Install.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Zookeeper 安装"}],["meta",{"property":"og:description","content":"Zookeeper 安装 Docker 部署 Zookeeper 单个实例 官网仓库：https://hub.docker.com/r/library/zookeeper/ 单个实例：docker run -d --restart always --name one-zookeeper -p 2181:2181 -v /etc/localtime:/e..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-26T16:41:58.000Z"}],["meta",{"property":"article:modified_time","content":"2022-07-26T16:41:58.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1658853718000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.74,"words":1121},"filePathRelative":"linux-tutor/server/Zookeeper-Install.md","autoDesc":true}');export{t as comp,c as data};
