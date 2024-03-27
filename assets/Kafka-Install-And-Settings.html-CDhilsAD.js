import{_ as l,r as t,o,c as r,d as e,e as n,b as i,a as s}from"./app-BO2oONDQ.js";const d={},c=e("h1",{id:"kafka-安装和配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kafka-安装和配置"},[e("span",null,"Kafka 安装和配置")])],-1),u=e("h2",{id:"对于版本",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#对于版本"},[e("span",null,"对于版本")])],-1),v=e("li",null,"由于 Kafka 经常会被连接到各个地方去，所以对于 Kafka 的版本，一般不能用太新的，要看你用在什么地方。",-1),p={href:"https://ci.apache.org/projects/flink/flink-docs-release-1.6/dev/connectors/kafka.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://spark.apache.org/docs/latest/streaming-kafka-integration.html",target:"_blank",rel:"noopener noreferrer"},m={href:"http://projects.spring.io/spring-kafka/",target:"_blank",rel:"noopener noreferrer"},h=s('<h2 id="消息系统的好处" tabindex="-1"><a class="header-anchor" href="#消息系统的好处"><span>消息系统的好处</span></a></h2><ul><li>解耦（各个业务系统各自为政，有各自新需求，各自系统自行修改，只通过消息来通信）</li><li>大系统层面的扩展性（不用改旧业务系统代码，增加新系统，接收新消息）</li><li>异步通信（一个消息，多个业务系统来消费。某些场景可以堆积到一定程度再去消费）</li><li>缓冲（解耦某些需要长时间处理业务）</li></ul><h2 id="kafka-介绍" tabindex="-1"><a class="header-anchor" href="#kafka-介绍"><span>Kafka 介绍</span></a></h2><blockquote><p>A distributed streaming platform</p></blockquote>',4),b={href:"https://kafka.apache.org/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/apache/kafka",target:"_blank",rel:"noopener noreferrer"},g=e("ul",null,[e("li",null,"主要是由 Java 和 Scala 开发")],-1),_={href:"https://kafka.apache.org/downloads",target:"_blank",rel:"noopener noreferrer"},A=e("li",null,[n("当前最新稳定版本（201803）："),e("strong",null,"1.0.1")],-1),y={href:"https://kafka.apache.org/quickstart",target:"_blank",rel:"noopener noreferrer"},w=e("li",null,"运行的机子不要小于 2G 内存",-1),T=e("li",null,[n("Kafka 流行的主要原因： "),e("ul",null,[e("li",null,"支持常见的发布订阅功能"),e("li",null,"分布式"),e("li",null,"高吞吐量（听说：普通单机也支持每秒 100000 条消息的传输）"),e("li",null,"磁盘数据持久化，消费者 down 后，重新 up 的时候可以继续接收前面未接收到的消息"),e("li",null,"支持流数据处理，常见于大数据")])],-1),E=e("li",null,"Producer：生产者（业务系统），负责发布消息到 broker",-1),x=e("li",null,"Consumer：消费者（业务系统），向 broker 读取消息的客户端",-1),K=e("li",null,"Broker：可以理解为：存放消息的管道（kafka 软件节点本身）",-1),O=e("li",null,"Topic：可以理解为：消息主题、消息标签、消息通道、消息队列（物理上不同 Topic 的消息分开存储，根据 Partition 参数决定一个 Topic 的消息保存于一个或多个 broker 上。作为使用者，不用关心 Topic 实际物理存储地方。）",-1),S=e("li",null,"Partition：是物理上的概念，每个 Topic 包含一个或多个 Partition。一般有几个 Broker，填写分区最好是等于大于节点值。分区目的主要是数据分片，解决水平扩展、高吞吐量。当 Producer 生产消息的时候，消息会被算法计算后分配到对应的分区，Consumer 读取的时候算法也会帮我们找到消息所在分区，这是内部实现的，应用层面不用管。",-1),I=e("li",null,[n("Replication-factor：副本。假设有 3 个 Broker 的情况下，当副本为 3 的时候每个 Partition 会在每个 Broker 都会存有一份，目的主要是容错。 "),e("ul",null,[e("li",null,"其中有一个 Leader。"),e("li",null,"如果你只有一个 Broker，但是创建 Topic 的时候指定 Replication-factor 为 3，则会报错")])],-1),R=e("li",null,"Consumer Group 信息存储在 zookeeper 中，需要通过 zookeeper 的客户端来查看和设置",-1),N=e("li",null,"如果某 Consumer Group 中 consumer 数量少于 partition 数量，则至少有一个 consumer 会消费多个 partition 的数据",-1),z=e("li",null,"如果 consumer 的数量与 partition 数量相同，则正好一个 consumer 消费一个 partition 的数据",-1),L=e("li",null,"如果 consumer 的数量多于 partition 的数量时，会有部分 consumer 无法消费该 topic 下任何一条消息。",-1),P={href:"http://www.jasongj.com/2015/01/02/Kafka%E6%B7%B1%E5%BA%A6%E8%A7%A3%E6%9E%90/",target:"_blank",rel:"noopener noreferrer"},C=e("li",null,"Record：消息数据本身，由一个 key、value、timestamp 组成",-1),D={href:"https://github.com/wurstmeister/kafka-docker/",target:"_blank",rel:"noopener noreferrer"},q={href:"http://projects.spring.io/spring-kafka/",target:"_blank",rel:"noopener noreferrer"},F=e("ul",null,[e("li",null,"目前（201803）"),e("li",null,"spring boot 2.0 以上基础框架版本，kafka 版本 1.0.x，推荐使用：spring-kafka 2.1.4.RELEASE"),e("li",null,"spring boot 2.0 以下基础框架版本，kafka 版本 0.11.0.x, 1.0.x，推荐使用：spring-kafka 1.3.3.RELEASE")],-1),M={href:"https://kafka.apache.org/quickstart",target:"_blank",rel:"noopener noreferrer"},B=s("<li>wurstmeister/kafka-docker 容器中 kafka home：<code>cd /opt/kafka</code></li><li>假设我的 zookeeper 地址：<code>10.135.157.34:2181</code>，如果你有多个节点用逗号隔开</li><li>列出所有 topic：<code>bin/kafka-topics.sh --list --zookeeper 10.135.157.34:2181</code></li><li>创建 topic：<code>bin/kafka-topics.sh --create --topic kafka-test-topic-1 --partitions 3 --replication-factor 1 --zookeeper 10.135.157.34:2181</code><ul><li>创建名为 kafka-test-topic-1 的 topic，3个分区分别存放数据，数据备份总共 2 份</li></ul></li><li>查看特定 topic 的详情：<code>bin/kafka-topics.sh --describe --topic kafka-test-topic-1 --zookeeper 10.135.157.34:2181</code></li><li>删除 topic：<code>bin/kafka-topics.sh --delete --topic kafka-test-topic-1 --zookeeper 10.135.157.34:2181</code></li>",6),G={href:"http://orchome.com/454",target:"_blank",rel:"noopener noreferrer"},U=s("<li>假设 topic 详情的返回信息如下： <ul><li><code>PartitionCount:6</code>：分区为 6 个</li><li><code>ReplicationFactor:3</code>：副本为 3 个</li><li><code>Partition: 0 Leader: 3</code>：Partition 下标为 0 的主节点是 broker.id=3 <ul><li>当 Leader down 掉之后，其他节点会选举中一个新 Leader</li></ul></li><li><code>Replicas: 3,1,2</code>：在 <code>Partition: 0</code> 下共有 3 个副本，broker.id 分别为 3,1,2</li><li><code>Isr: 3,1,2</code>：在 <code>Partition: 0</code> 下目前存活的 broker.id 分别为 3,1,2</li></ul></li>",1),Z=s(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Topic:kafka-all    PartitionCount:6    ReplicationFactor:3    Configs:
    Topic: kafka-all    Partition: 0    Leader: 3    Replicas: 3,1,2    Isr: 3,1,2
    Topic: kafka-all    Partition: 1    Leader: 1    Replicas: 1,2,3    Isr: 1,2,3
    Topic: kafka-all    Partition: 2    Leader: 2    Replicas: 2,3,1    Isr: 2,3,1
    Topic: kafka-all    Partition: 3    Leader: 3    Replicas: 3,2,1    Isr: 3,2,1
    Topic: kafka-all    Partition: 4    Leader: 1    Replicas: 1,3,2    Isr: 1,3,2
    Topic: kafka-all    Partition: 5    Leader: 2    Replicas: 2,1,3    Isr: 2,1,3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="docker-单个实例部署-1-0-1" tabindex="-1"><a class="header-anchor" href="#docker-单个实例部署-1-0-1"><span>Docker 单个实例部署（1.0.1）</span></a></h2>`,3),X={href:"https://github.com/wurstmeister/kafka-docker",target:"_blank",rel:"noopener noreferrer"},j=e("li",null,[n("我的服务器外网 ip："),e("code",null,"182.61.19.177"),n("，hostname 为："),e("code",null,"instance-3v0pbt5d")],-1),H=e("li",null,"在我的开发机上上配置 host：",-1),V=e("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[e("pre",{class:"language-text"},[e("code",null,`182.61.19.177 instance-3v0pbt5d
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),Y=e("li",null,"部署 kafka：",-1),J={href:"https://github.com/wurstmeister/kafka-docker",target:"_blank",rel:"noopener noreferrer"},W=e("li",null,[n("新建文件："),e("code",null,"vim docker-compose.yml")],-1),Q=e("li",null,"这里的 kafka 对外网暴露端口是 9094，内网端口是 9092",-1),$=s(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>version: &#39;3.2&#39;
services:
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - &quot;2181:2181&quot;
  kafka:
    image: wurstmeister/kafka:latest
    ports:
      - target: 9094
        published: 9094
        protocol: tcp
        mode: host
    environment:
      HOSTNAME_COMMAND: &quot;docker info | grep ^Name: | cut -d&#39; &#39; -f 2&quot;
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: INSIDE:PLAINTEXT,OUTSIDE:PLAINTEXT
      KAFKA_ADVERTISED_PROTOCOL_NAME: OUTSIDE
      KAFKA_ADVERTISED_PORT: 9094
      KAFKA_PROTOCOL_NAME: INSIDE
      KAFKA_PORT: 9092
      KAFKA_LOG_DIRS: /data/docker/kafka/logs
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: &#39;true&#39;
      KAFKA_LOG_RETENTION_HOURS: 168
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /data/docker/kafka/logs:/data/docker/kafka/logs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动：<code>docker-compose up -d</code></li><li>停止：<code>docker-compose stop</code></li><li>测试： <ul><li>进入 kafka 容器：<code>docker exec -it kafkadocker_kafka_1 /bin/bash</code></li><li>根据官网 Dockerfile 说明，kafka home 应该是：<code>cd /opt/kafka</code></li><li>创建 topic 命令：<code>bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic my-topic-test</code></li><li>查看 topic 命令：<code>bin/kafka-topics.sh --list --zookeeper zookeeper:2181</code></li><li>删除 topic：<code>bin/kafka-topics.sh --delete --topic my-topic-test --zookeeper zookeeper:2181</code></li><li>给 topic 发送消息命令：<code>bin/kafka-console-producer.sh --broker-list localhost:9092 --topic my-topic-test</code>，然后在出现交互输入框的时候输入你要发送的内容</li><li>再开一个终端，进入 kafka 容器，接受消息：<code>bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic my-topic-test --from-beginning</code><ul><li>其中 <code>--from-beginning</code> 参数表示在启动该客户端的时候接受前面 kafka 的所有记录。不加这个参数，则旧数据不会收到，生产者新生产的消息才会接收到。</li></ul></li><li>此时发送的终端输入一个内容回车，接受消息的终端就可以收到。</li></ul></li></ul><hr><h2 id="docker-多机多实例部署-外网无法访问" tabindex="-1"><a class="header-anchor" href="#docker-多机多实例部署-外网无法访问"><span>Docker 多机多实例部署（外网无法访问）</span></a></h2><ul><li>三台机子： <ul><li>内网 ip：<code>172.24.165.129</code>，外网 ip：<code>47.91.22.116</code></li><li>内网 ip：<code>172.24.165.130</code>，外网 ip：<code>47.91.22.124</code></li><li>内网 ip：<code>172.24.165.131</code>，外网 ip：<code>47.74.6.138</code></li></ul></li><li>修改三台机子 hostname： <ul><li>节点 1：<code>hostnamectl --static set-hostname youmeekhost1</code></li><li>节点 2：<code>hostnamectl --static set-hostname youmeekhost2</code></li><li>节点 3：<code>hostnamectl --static set-hostname youmeekhost3</code></li></ul></li><li>三台机子的 hosts 都修改为如下内容：<code>vim /etc/hosts</code></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>172.24.165.129 youmeekhost1
172.24.165.130 youmeekhost2
172.24.165.131 youmeekhost3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>开发机设置 hosts：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>47.91.22.116 youmeekhost1
47.91.22.124 youmeekhost2
47.74.6.138 youmeekhost3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="zookeeper-集群" tabindex="-1"><a class="header-anchor" href="#zookeeper-集群"><span>Zookeeper 集群</span></a></h4><ul><li>节点 1：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d --name=zookeeper1 --net=host --restart=always \\
-v /data/docker/zookeeper/data:/data \\
-v /data/docker/zookeeper/log:/datalog \\
-v /etc/hosts:/etc/hosts \\
-e ZOO_MY_ID=1 \\
-e &quot;ZOO_SERVERS=server.1=youmeekhost1:2888:3888 server.2=youmeekhost2:2888:3888 server.3=youmeekhost3:2888:3888&quot; \\
zookeeper:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>节点 2：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d --name=zookeeper2 --net=host --restart=always \\
-v /data/docker/zookeeper/data:/data \\
-v /data/docker/zookeeper/log:/datalog \\
-v /etc/hosts:/etc/hosts \\
-e ZOO_MY_ID=2 \\
-e &quot;ZOO_SERVERS=server.1=youmeekhost1:2888:3888 server.2=youmeekhost2:2888:3888 server.3=youmeekhost3:2888:3888&quot; \\
zookeeper:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>节点 3：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d --name=zookeeper3 --net=host --restart=always \\
-v /data/docker/zookeeper/data:/data \\
-v /data/docker/zookeeper/log:/datalog \\
-v /etc/hosts:/etc/hosts \\
-e ZOO_MY_ID=3 \\
-e &quot;ZOO_SERVERS=server.1=youmeekhost1:2888:3888 server.2=youmeekhost2:2888:3888 server.3=youmeekhost3:2888:3888&quot; \\
zookeeper:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="先安装-nc-再来校验-zookeeper-集群情况" tabindex="-1"><a class="header-anchor" href="#先安装-nc-再来校验-zookeeper-集群情况"><span>先安装 nc 再来校验 zookeeper 集群情况</span></a></h4>`,16),ee=e("li",null,"环境：CentOS 7.4",-1),ne={href:"https://nmap.org/download.html",target:"_blank",rel:"noopener noreferrer"},ae=e("li",null,[n("当前时间（201803）最新版本下载："),e("code",null,"wget https://nmap.org/dist/ncat-7.60-1.x86_64.rpm")],-1),ie=e("li",null,[n("安装并 ln："),e("code",null,"sudo rpm -i ncat-7.60-1.x86_64.rpm && ln -s /usr/bin/ncat /usr/bin/nc")],-1),se=e("li",null,[n("检验："),e("code",null,"nc --version")],-1),le=s(`<h4 id="zookeeper-集群测试" tabindex="-1"><a class="header-anchor" href="#zookeeper-集群测试"><span>zookeeper 集群测试</span></a></h4><ul><li>节点 1 执行命令：<code>echo stat | nc youmeekhost1 2181</code>，能得到如下信息：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Zookeeper version: 3.4.11-37e277162d567b55a07d1755f0b31c32e93c01a0, built on 11/01/2017 18:06 GMT
Clients:
 /172.31.154.16:35336[0](queued=0,recved=1,sent=0)

Latency min/avg/max: 0/0/0
Received: 1
Sent: 0
Connections: 1
Outstanding: 0
Zxid: 0x0
Mode: follower
Node count: 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>节点 2 执行命令：<code>echo stat | nc youmeekhost2 2181</code>，能得到如下信息：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Zookeeper version: 3.4.11-37e277162d567b55a07d1755f0b31c32e93c01a0, built on 11/01/2017 18:06 GMT
Clients:
 /172.31.154.17:55236[0](queued=0,recved=1,sent=0)

Latency min/avg/max: 0/0/0
Received: 1
Sent: 0
Connections: 1
Outstanding: 0
Zxid: 0x100000000
Mode: leader
Node count: 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>节点 3 执行命令：<code>echo stat | nc youmeekhost3 2181</code>，能得到如下信息：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Zookeeper version: 3.4.11-37e277162d567b55a07d1755f0b31c32e93c01a0, built on 11/01/2017 18:06 GMT
Clients:
 /172.31.65.88:41840[0](queued=0,recved=1,sent=0)

Latency min/avg/max: 0/0/0
Received: 1
Sent: 0
Connections: 1
Outstanding: 0
Zxid: 0x100000000
Mode: follower
Node count: 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kafka-集群" tabindex="-1"><a class="header-anchor" href="#kafka-集群"><span>Kafka 集群</span></a></h5><ul><li>节点 1 执行：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d --net=host --name=kafka1 \\
--restart=always \\
--env KAFKA_BROKER_ID=1 \\
--env KAFKA_ZOOKEEPER_CONNECT=youmeekhost1:2181,youmeekhost2:2181,youmeekhost3:2181 \\
--env KAFKA_LOG_DIRS=/data/docker/kafka/logs \\
--env HOSTNAME_COMMAND=&quot;docker info | grep ^Name: | cut -d&#39; &#39; -f 2&quot; \\
--env KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=INSIDE:PLAINTEXT,OUTSIDE:PLAINTEXT \\
--env KAFKA_ADVERTISED_PROTOCOL_NAME=OUTSIDE \\
--env KAFKA_ADVERTISED_PORT=9094 \\
--env KAFKA_PROTOCOL_NAME=INSIDE \\
--env KAFKA_PORT=9092 \\
--env KAFKA_AUTO_CREATE_TOPICS_ENABLE=true \\
--env KAFKA_LOG_RETENTION_HOURS=168 \\
--env KAFKA_HEAP_OPTS=&quot;-Xmx1G -Xms1G&quot; \\
-v /var/run/docker.sock:/var/run/docker.sock \\
-v /etc/localtime:/etc/localtime \\
-v /data/docker/kafka/logs:/data/docker/kafka/logs \\
-v /etc/hosts:/etc/hosts \\
wurstmeister/kafka:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>节点 2 执行：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d --net=host --name=kafka2 \\
--restart=always \\
--env KAFKA_BROKER_ID=2 \\
--env KAFKA_ZOOKEEPER_CONNECT=youmeekhost1:2181,youmeekhost2:2181,youmeekhost3:2181 \\
--env KAFKA_LOG_DIRS=/data/docker/kafka/logs \\
--env HOSTNAME_COMMAND=&quot;docker info | grep ^Name: | cut -d&#39; &#39; -f 2&quot; \\
--env KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=INSIDE:PLAINTEXT,OUTSIDE:PLAINTEXT \\
--env KAFKA_ADVERTISED_PROTOCOL_NAME=OUTSIDE \\
--env KAFKA_ADVERTISED_PORT=9094 \\
--env KAFKA_PROTOCOL_NAME=INSIDE \\
--env KAFKA_PORT=9092 \\
--env KAFKA_AUTO_CREATE_TOPICS_ENABLE=true \\
--env KAFKA_LOG_RETENTION_HOURS=168 \\
--env KAFKA_HEAP_OPTS=&quot;-Xmx1G -Xms1G&quot; \\
-v /var/run/docker.sock:/var/run/docker.sock \\
-v /etc/localtime:/etc/localtime \\
-v /data/docker/kafka/logs:/data/docker/kafka/logs \\
-v /etc/hosts:/etc/hosts \\
wurstmeister/kafka:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>节点 3 执行：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d --net=host --name=kafka3 \\
--restart=always \\
--env KAFKA_BROKER_ID=3 \\
--env KAFKA_ZOOKEEPER_CONNECT=youmeekhost1:2181,youmeekhost2:2181,youmeekhost3:2181 \\
--env KAFKA_LOG_DIRS=/data/docker/kafka/logs \\
--env HOSTNAME_COMMAND=&quot;docker info | grep ^Name: | cut -d&#39; &#39; -f 2&quot; \\
--env KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=INSIDE:PLAINTEXT,OUTSIDE:PLAINTEXT \\
--env KAFKA_ADVERTISED_PROTOCOL_NAME=OUTSIDE \\
--env KAFKA_ADVERTISED_PORT=9094 \\
--env KAFKA_PROTOCOL_NAME=INSIDE \\
--env KAFKA_PORT=9092 \\
--env KAFKA_AUTO_CREATE_TOPICS_ENABLE=true \\
--env KAFKA_LOG_RETENTION_HOURS=168 \\
--env KAFKA_HEAP_OPTS=&quot;-Xmx1G -Xms1G&quot; \\
-v /var/run/docker.sock:/var/run/docker.sock \\
-v /etc/localtime:/etc/localtime \\
-v /data/docker/kafka/logs:/data/docker/kafka/logs \\
-v /etc/hosts:/etc/hosts \\
wurstmeister/kafka:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="kafka-集群测试" tabindex="-1"><a class="header-anchor" href="#kafka-集群测试"><span>Kafka 集群测试</span></a></h4><ul><li>在 kafka1 上测试： <ul><li>进入 kafka1 容器：<code>docker exec -it kafka1 /bin/bash</code></li><li>根据官网 Dockerfile 说明，kafka home 应该是：<code>cd /opt/kafka</code></li><li>创建 topic 命令：<code>bin/kafka-topics.sh --create --zookeeper youmeekhost1:2181,youmeekhost2:2181,youmeekhost3:2181 --replication-factor 3 --partitions 3 --topic my-topic-test</code></li><li>查看 topic 命令：<code>bin/kafka-topics.sh --list --zookeeper youmeekhost1:2181,youmeekhost2:2181,youmeekhost3:2181</code></li><li>给 topic 发送消息命令：<code>bin/kafka-console-producer.sh --broker-list youmeekhost1:9092 --topic my-topic-test</code>，然后在出现交互输入框的时候输入你要发送的内容</li></ul></li><li>在 kafka2 上测试： <ul><li>进入 kafka2 容器：<code>docker exec -it kafka2 /bin/bash</code></li><li>接受消息：<code>cd /opt/kafka &amp;&amp; bin/kafka-console-consumer.sh --bootstrap-server youmeekhost2:9092 --topic my-topic-test --from-beginning</code></li></ul></li><li>在 kafka3 上测试： <ul><li>进入 kafka3 容器：<code>docker exec -it kafka3 /bin/bash</code></li><li>接受消息：<code>cd /opt/kafka &amp;&amp; bin/kafka-console-consumer.sh --bootstrap-server youmeekhost3:9092 --topic my-topic-test --from-beginning</code></li></ul></li><li>如果 kafka1 输入的消息，kafka2 和 kafka3 能收到，则表示已经成功。</li></ul><h4 id="kafka-认证配置" tabindex="-1"><a class="header-anchor" href="#kafka-认证配置"><span>Kafka 认证配置</span></a></h4>`,17),te={href:"http://www.2bowl.info/kafka%e7%9a%84saslplain%e8%ae%a4%e8%af%81%e9%85%8d%e7%bd%ae%e8%af%b4%e6%98%8e/",target:"_blank",rel:"noopener noreferrer"},oe=e("h4",{id:"kafka-单纯监控-kafkaoffsetmonitor",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kafka-单纯监控-kafkaoffsetmonitor"},[e("span",null,"Kafka 单纯监控 KafkaOffsetMonitor")])],-1),re={href:"https://github.com/quantifind/KafkaOffsetMonitor",target:"_blank",rel:"noopener noreferrer"},de=e("ul",null,[e("li",null,"README 带了下载地址和运行命令"),e("li",null,"只是已经很久不更新了")],-1),ce=e("h4",{id:"部署-kafka-manager",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#部署-kafka-manager"},[e("span",null,"部署 kafka-manager")])],-1),ue={href:"https://github.com/yahoo/kafka-manager",target:"_blank",rel:"noopener noreferrer"},ve=e("ul",null,[e("li",null,"注意官网说明的版本支持")],-1),pe=e("li",null,[n("节点 1（没成功）："),e("code",null,'docker run -d --name=kafka-manager1 --restart=always -p 9000:9000 -e ZK_HOSTS="youmeekhost1:2181,youmeekhost2:2181,youmeekhost3:2181" sheepkiller/kafka-manager:latest')],-1),ke={href:"http://www.2bowl.info/kafka%e7%9b%91%e6%8e%a7%e5%b7%a5%e5%85%b7-kafka-manager/",target:"_blank",rel:"noopener noreferrer"},me=e("li",null,"Kafka manager 是一款管理 + 监控的工具，比较重",-1),he=e("hr",null,null,-1),be=e("h2",{id:"kafka-1-0-1-源码安装-也支持-1-0-2、0-11-0-3、0-10-2-2",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kafka-1-0-1-源码安装-也支持-1-0-2、0-11-0-3、0-10-2-2"},[e("span",null,"Kafka 1.0.1 源码安装（也支持 1.0.2、0.11.0.3、0.10.2.2）")])],-1),fe=e("li",null,"测试环境：2G 内存足够",-1),ge=e("li",null,"一台机子：CentOS 7.4，根据文章最开头，已经修改了 hosts",-1),_e=e("li",null,"确保本机安装有 JDK8（JDK 版本不能随便挑选）",-1),Ae=e("li",null,[n("先用上面的 docker 方式部署一个 zookeeper，我这里的 zookeeper IP 地址为："),e("code",null,"172.16.0.2"),e("ul",null,[e("li",null,[e("strong",null,"如果该 zookeeper 前面已经用过了，最好重新删除，重新 run，因为 zookeeper 上保留的旧的 topic 配置")])])],-1),ye={href:"https://kafka.apache.org/downloads",target:"_blank",rel:"noopener noreferrer"},we=s("<li>当前（201803）最新版本为：<strong>1.0.1，同时推荐 Scala 版本为 2.11</strong>，这里要特别注意：kafka_2.11-1.0.1.tgz 中的 2.11 指的是 Scala 版本 <ul><li>找到：<code>Binary downloads</code> 下面的链接</li><li>下载：<code>wget http://mirrors.shu.edu.cn/apache/kafka/1.0.1/kafka_2.11-1.0.1.tgz</code></li></ul></li><li>解压：<code>tar zxvf kafka_2.11-1.0.1.tgz</code>，假设当前目录为：<code>/usr/local/kafka_2.11-1.0.1</code></li><li>为了方便，修改目录名字：<code>mv /usr/local/kafka_2.11-1.0.1 /usr/local/kafka</code></li><li>创建 log 输出目录：<code>mkdir -p /data/kafka/logs</code></li><li>修改 kafka-server 的配置文件：<code>vim /usr/local/kafka/config/server.properties</code></li><li>找到下面两个参数内容，修改成如下：</li>",6),Te=s(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 唯一ID（kafka 集群环境下，该值必须唯一，默认从 0 开始），和 zookeeper 的配置文件中的 myid 类似道理（单节点多 broker 的情况下该参数必改）
broker.id=1
# 监听地址（单节点多 broker 的情况下该参数必改）
listeners=PLAINTEXT://0.0.0.0:9092
# 向 Zookeeper 注册的地址。这里可以直接填写外网IP地址，但是不建议这样做，而是通过配置 hosts 的方式来设置。不然填写外网 IP 地址会导致所有流量都走外网（单节点多 broker 的情况下该参数必改）
advertised.listeners=PLAINTEXT://youmeekhost:9092
# zookeeper，存储了 broker 的元信息
zookeeper.connect=youmeekhost:2181
# 日志数据目录，可以通过逗号来指定多个目录（单节点多 broker 的情况下该参数必改）
log.dirs=/data/kafka/logs
# 创建新 topic 的时候默认 1 个分区。需要特别注意的是：已经创建好的 topic 的 partition 的个数只可以被增加，不能被减少。
# 如果对消息有高吞吐量的要求，可以增加分区数来分摊压力
num.partitions=1
# 允许删除topic
delete.topic.enable=false
# 允许自动创建topic（默认是 true）
auto.create.topics.enable=true
# 磁盘IO不足的时候，可以适当调大该值 ( 当内存足够时 )
#log.flush.interval.messages=10000
#log.flush.interval.ms=1000
# kafka 数据保留时间 默认 168 小时 == 7 天
log.retention.hours=168


# 其余都使用默认配置，但是顺便解释下：
# borker 进行网络处理的线程数
num.network.threads=3

# borker 进行 I/O 处理的线程数
num.io.threads=8

# 发送缓冲区 buffer 大小，数据不是一下子就发送的，先回存储到缓冲区了到达一定的大小后在发送，能提高性能
socket.send.buffer.bytes=102400

# 接收缓冲区大小，当数据到达一定大小后在序列化到磁盘
socket.receive.buffer.bytes=102400

# 这个参数是向 kafka 请求消息或者向 kafka 发送消息的请请求的最大数，这个值不能超过 java 的堆栈大小
socket.request.max.bytes=104857600
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 kafka 服务（必须制定配置文件）：<code>cd /usr/local/kafka &amp;&amp; bin/kafka-server-start.sh config/server.properties</code><ul><li>后台方式运行 kafka 服务：<code>cd /usr/local/kafka &amp;&amp; bin/kafka-server-start.sh -daemon config/server.properties</code></li><li>停止 kafka 服务：<code>cd /usr/local/kafka &amp;&amp; bin/kafka-server-stop.sh</code></li></ul></li><li>再开一个终端测试： <ul><li>创建 topic 命令：<code>cd /usr/local/kafka &amp;&amp; bin/kafka-topics.sh --create --zookeeper youmeekhost:2181 --replication-factor 1 --partitions 1 --topic my-topic-test</code></li><li>查看 topic 命令：<code>cd /usr/local/kafka &amp;&amp; bin/kafka-topics.sh --list --zookeeper youmeekhost:2181</code></li><li>删除 topic：<code>cd /usr/local/kafka &amp;&amp; bin/kafka-topics.sh --delete --topic my-topic-test --zookeeper youmeekhost:2181</code></li><li>给 topic 发送消息命令：<code>cd /usr/local/kafka &amp;&amp; bin/kafka-console-producer.sh --broker-list youmeekhost:9092 --topic my-topic-test</code>，然后在出现交互输入框的时候输入你要发送的内容</li><li>再开一个终端，进入 kafka 容器，接受消息：<code>cd /usr/local/kafka &amp;&amp; bin/kafka-console-consumer.sh --bootstrap-server youmeekhost:9092 --topic my-topic-test --from-beginning</code></li><li>此时发送的终端输入一个内容回车，接受消息的终端就可以收到。</li></ul></li><li>Spring Boot 依赖：</li></ul><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.3.3.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>kafka-clients<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>kafka-streams<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>项目配置文件：bootstrap-servers 地址：<code>instance-3v0pbt5d:9092</code>（这里端口是 9092 别弄错了）</li></ul><hr><h2 id="kafka-1-0-1-默认配置文件内容" tabindex="-1"><a class="header-anchor" href="#kafka-1-0-1-默认配置文件内容"><span>kafka 1.0.1 默认配置文件内容</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the &quot;License&quot;); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# see kafka.server.KafkaConfig for additional details and defaults

############################# Server Basics #############################

# The id of the broker. This must be set to a unique integer for each broker.
broker.id=0

############################# Socket Server Settings #############################

# The address the socket server listens on. It will get the value returned from 
# java.net.InetAddress.getCanonicalHostName() if not configured.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
#listeners=PLAINTEXT://:9092

# Hostname and port the broker will advertise to producers and consumers. If not set, 
# it uses the value for &quot;listeners&quot; if configured.  Otherwise, it will use the value
# returned from java.net.InetAddress.getCanonicalHostName().
#advertised.listeners=PLAINTEXT://your.host.name:9092

# Maps listener names to security protocols, the default is for them to be the same. See the config documentation for more details
#listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL

# The number of threads that the server uses for receiving requests from the network and sending responses to the network
num.network.threads=3

# The number of threads that the server uses for processing requests, which may include disk I/O
num.io.threads=8

# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


############################# Log Basics #############################

# A comma seperated list of directories under which to store log files
log.dirs=/tmp/kafka-logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=1

# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

############################# Internal Topic Settings  #############################
# The replication factor for the group metadata internal topics &quot;__consumer_offsets&quot; and &quot;__transaction_state&quot;
# For anything other than development testing, a value greater than 1 is recommended for to ensure availability such as 3.
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1

############################# Log Flush Policy #############################

# Messages are immediately written to the filesystem but by default we only fsync() to sync
# the OS cache lazily. The following configurations control the flush of data to disk.
# There are a few important trade-offs here:
#    1. Durability: Unflushed data may be lost if you are not using replication.
#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to exceessive seeks.
# The settings below allow one to configure the flush policy to flush data after a period of time or
# every N messages (or both). This can be done globally and overridden on a per-topic basis.

# The number of messages to accept before forcing a flush of data to disk
#log.flush.interval.messages=10000

# The maximum amount of time a message can sit in a log before we force a flush
#log.flush.interval.ms=1000

############################# Log Retention Policy #############################

# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.

# The minimum age of a log file to be eligible for deletion due to age
log.retention.hours=168

# A size-based retention policy for logs. Segments are pruned from the log unless the remaining
# segments drop below log.retention.bytes. Functions independently of log.retention.hours.
#log.retention.bytes=1073741824

# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824

# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000

############################# Zookeeper #############################

# Zookeeper connection string (see zookeeper docs for details).
# This is a comma separated host:port pairs, each corresponding to a zk
# server. e.g. &quot;127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002&quot;.
# You can also append an optional chroot string to the urls to specify the
# root directory for all kafka znodes.
zookeeper.connect=localhost:2181

# Timeout in ms for connecting to zookeeper
zookeeper.connection.timeout.ms=6000


############################# Group Coordinator Settings #############################

# The following configuration specifies the time, in milliseconds, that the GroupCoordinator will delay the initial consumer rebalance.
# The rebalance will be further delayed by the value of group.initial.rebalance.delay.ms as new members join the group, up to a maximum of max.poll.interval.ms.
# The default value for this is 3 seconds.
# We override this to 0 here as it makes for a better out-of-the-box experience for development and testing.
# However, in production environments the default value of 3 seconds is more suitable as this will help to avoid unnecessary, and potentially expensive, rebalances during application startup.
group.initial.rebalance.delay.ms=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="其他资料" tabindex="-1"><a class="header-anchor" href="#其他资料"><span>其他资料</span></a></h2>`,9),Ee={href:"http://lsr1991.github.io/2016/01/03/kafka-consumer-group-management/",target:"_blank",rel:"noopener noreferrer"},xe={href:"http://blog.xiaoxiaomo.com/2016/05/14/Kafka-Consumer%E6%B6%88%E8%B4%B9%E8%80%85/",target:"_blank",rel:"noopener noreferrer"},Ke={href:"http://www.ituring.com.cn/article/499268",target:"_blank",rel:"noopener noreferrer"},Oe={href:"http://orchome.com/kafka/index",target:"_blank",rel:"noopener noreferrer"},Se={href:"https://www.jianshu.com/p/263164fdcac7",target:"_blank",rel:"noopener noreferrer"},Ie={href:"https://www.cnblogs.com/wangxiaoqiangs/p/7831990.html",target:"_blank",rel:"noopener noreferrer"},Re={href:"http://www.bijishequ.com/detail/536308",target:"_blank",rel:"noopener noreferrer"},Ne={href:"http://lanxinglan.cn/2017/10/18/%E5%9C%A8Docker%E7%8E%AF%E5%A2%83%E4%B8%8B%E9%83%A8%E7%BD%B2Kafka/",target:"_blank",rel:"noopener noreferrer"},ze={href:"https://www.cnblogs.com/ding2016/p/8282907.html",target:"_blank",rel:"noopener noreferrer"},Le={href:"http://blog.csdn.net/fuyuwei2015/article/details/73379055",target:"_blank",rel:"noopener noreferrer"},Pe={href:"https://segmentfault.com/a/1190000012990954",target:"_blank",rel:"noopener noreferrer"},Ce={href:"http://www.54tianzhisheng.cn/2018/01/04/Kafka/",target:"_blank",rel:"noopener noreferrer"},De={href:"https://renwole.com/archives/442",target:"_blank",rel:"noopener noreferrer"},qe={href:"http://www.bijishequ.com/detail/542646?p=85",target:"_blank",rel:"noopener noreferrer"},Fe={href:"http://blog.csdn.net/zhbr_f1/article/details/73732299",target:"_blank",rel:"noopener noreferrer"},Me={href:"http://wangzs.leanote.com/post/kafka-manager%E5%AE%89%E8%A3%85",target:"_blank",rel:"noopener noreferrer"},Be={href:"https://cloud.tencent.com/developer/article/1013313",target:"_blank",rel:"noopener noreferrer"},Ge={href:"http://blog.csdn.net/boling_cavalry/article/details/78309050",target:"_blank",rel:"noopener noreferrer"},Ue={href:"https://www.jianshu.com/p/d77149efa59f",target:"_blank",rel:"noopener noreferrer"},Ze={href:"http://www.bijishequ.com/detail/536308",target:"_blank",rel:"noopener noreferrer"},Xe={href:"http://blog.51cto.com/13323775/2063420",target:"_blank",rel:"noopener noreferrer"},je={href:"http://lanxinglan.cn/2017/10/18/%E5%9C%A8Docker%E7%8E%AF%E5%A2%83%E4%B8%8B%E9%83%A8%E7%BD%B2Kafka/",target:"_blank",rel:"noopener noreferrer"},He={href:"http://www.cnblogs.com/huxi2b/p/7929690.html",target:"_blank",rel:"noopener noreferrer"},Ve={href:"http://blog.csdn.net/HG_Harvey/article/details/79198496",target:"_blank",rel:"noopener noreferrer"},Ye={href:"http://blog.csdn.net/vtopqx/article/details/78638996",target:"_blank",rel:"noopener noreferrer"},Je={href:"http://www.weduoo.com/archives/2047",target:"_blank",rel:"noopener noreferrer"},We={href:"https://blog.52itstyle.com/archives/2358/",target:"_blank",rel:"noopener noreferrer"};function Qe($e,en){const a=t("ExternalLinkIcon");return o(),r("div",null,[c,u,e("ul",null,[v,e("li",null,[e("a",p,[n("Flink 的要求"),i(a)])]),e("li",null,[e("a",k,[n("Spark 的要求"),i(a)])]),e("li",null,[e("a",m,[n("Spring 的要求"),i(a)])])]),h,e("ul",null,[e("li",null,[n("官网："),e("a",b,[n("https://kafka.apache.org/"),i(a)])]),e("li",null,[n("Github："),e("a",f,[n("https://github.com/apache/kafka"),i(a)]),g]),e("li",null,[n("官网下载："),e("a",_,[n("https://kafka.apache.org/downloads"),i(a)])]),A,e("li",null,[n("官网 quickstart："),e("a",y,[n("https://kafka.apache.org/quickstart"),i(a)])]),w,T,e("li",null,[n("核心概念： "),e("ul",null,[E,x,K,O,S,I,e("li",null,[n("Consumer Group：每个 Consumer 属于一个特定的 Consumer Group（可为每个 Consumer 指定 group name，若不指定 group name 则属于默认的 group）一般一个业务系统集群指定同一个一个 group id，然后一个业务系统集群只能一个节点来消费同一个消息。 "),e("ul",null,[R,N,z,L,e("li",null,[n("具体实验可以看这篇文章："),e("a",P,[n("Kafka深度解析"),i(a)])])])]),C])]),e("li",null,[n("业界常用的 docker 镜像： "),e("ul",null,[e("li",null,[e("a",D,[n("wurstmeister/kafka-docker（不断更新，优先）"),i(a)])]),e("li",null,[n("Spring 项目选用依赖包的时候，对于版本之间的关系可以看这里："),e("a",q,[n("http://projects.spring.io/spring-kafka/"),i(a)]),F])])]),e("li",null,[n("官网 quickstart 指导："),e("a",M,[n("https://kafka.apache.org/quickstart"),i(a)])]),e("li",null,[n("常用命令： "),e("ul",null,[B,e("li",null,[n("更多命令可以看："),e("a",G,[n("http://orchome.com/454"),i(a)])])])]),U]),Z,e("ul",null,[e("li",null,[n("目前 latest 用的时候 kafka 1.0.1，要指定版本可以去作者 "),e("a",X,[n("github"),i(a)]),n(" 看下 tag 目录，切换不同 tag，然后看下 Dockerfile 里面的 kafka 版本号")]),j,H]),V,e("ul",null,[Y,e("li",null,[n("目前 latest 用的时候 kafka 1.0.1，要指定版本可以去作者 "),e("a",J,[n("github"),i(a)]),n(" 看下 tag 目录，切换不同 tag，然后看下 Dockerfile 里面的 kafka 版本号")]),W,Q]),$,e("ul",null,[ee,e("li",null,[n("官网下载："),e("a",ne,[n("https://nmap.org/download.html"),i(a)]),n("，找到 rpm 包")]),ae,ie,se]),le,e("ul",null,[e("li",null,[n("可以参考："),e("a",te,[n("Kafka的SASL/PLAIN认证配置说明"),i(a)])])]),oe,e("ul",null,[e("li",null,[n("Github 官网："),e("a",re,[n("https://github.com/quantifind/KafkaOffsetMonitor"),i(a)]),de])]),ce,e("ul",null,[e("li",null,[n("Github 官网："),e("a",ue,[n("https://github.com/yahoo/kafka-manager"),i(a)]),ve]),pe,e("li",null,[n("源码类安装可以看："),e("a",ke,[n("Kafka监控工具—Kafka Manager"),i(a)])]),me]),he,be,e("ul",null,[fe,ge,_e,Ae,e("li",null,[n("官网下载："),e("a",ye,[n("https://kafka.apache.org/downloads"),i(a)])]),we]),Te,e("ul",null,[e("li",null,[e("a",Ee,[n("管理Kafka的Consumer-Group信息"),i(a)])]),e("li",null,[e("a",xe,[n("Kafka--Consumer消费者"),i(a)])]),e("li",null,[e("a",Ke,[n("http://www.ituring.com.cn/article/499268"),i(a)])]),e("li",null,[e("a",Oe,[n("http://orchome.com/kafka/index"),i(a)])]),e("li",null,[e("a",Se,[n("https://www.jianshu.com/p/263164fdcac7"),i(a)])]),e("li",null,[e("a",Ie,[n("https://www.cnblogs.com/wangxiaoqiangs/p/7831990.html"),i(a)])]),e("li",null,[e("a",Re,[n("http://www.bijishequ.com/detail/536308"),i(a)])]),e("li",null,[e("a",Ne,[n("http://lanxinglan.cn/2017/10/18/在Docker环境下部署Kafka/"),i(a)])]),e("li",null,[e("a",ze,[n("https://www.cnblogs.com/ding2016/p/8282907.html"),i(a)])]),e("li",null,[e("a",Le,[n("http://blog.csdn.net/fuyuwei2015/article/details/73379055"),i(a)])]),e("li",null,[e("a",Pe,[n("https://segmentfault.com/a/1190000012990954"),i(a)])]),e("li",null,[e("a",Ce,[n("http://www.54tianzhisheng.cn/2018/01/04/Kafka/"),i(a)])]),e("li",null,[e("a",De,[n("https://renwole.com/archives/442"),i(a)])]),e("li",null,[e("a",qe,[n("http://www.bijishequ.com/detail/542646?p=85"),i(a)])]),e("li",null,[e("a",Fe,[n("http://blog.csdn.net/zhbr_f1/article/details/73732299"),i(a)])]),e("li",null,[e("a",Me,[n("http://wangzs.leanote.com/post/kafka-manager安装"),i(a)])]),e("li",null,[e("a",Be,[n("https://cloud.tencent.com/developer/article/1013313"),i(a)])]),e("li",null,[e("a",Ge,[n("http://blog.csdn.net/boling_cavalry/article/details/78309050"),i(a)])]),e("li",null,[e("a",Ue,[n("https://www.jianshu.com/p/d77149efa59f"),i(a)])]),e("li",null,[e("a",Ze,[n("http://www.bijishequ.com/detail/536308"),i(a)])]),e("li",null,[e("a",Xe,[n("http://blog.51cto.com/13323775/2063420"),i(a)])]),e("li",null,[e("a",je,[n("http://lanxinglan.cn/2017/10/18/在Docker环境下部署Kafka/"),i(a)])]),e("li",null,[e("a",He,[n("http://www.cnblogs.com/huxi2b/p/7929690.html"),i(a)])]),e("li",null,[e("a",Ve,[n("http://blog.csdn.net/HG_Harvey/article/details/79198496"),i(a)])]),e("li",null,[e("a",Ye,[n("http://blog.csdn.net/vtopqx/article/details/78638996"),i(a)])]),e("li",null,[e("a",Je,[n("http://www.weduoo.com/archives/2047"),i(a)])]),e("li",null,[e("a",We,[n("https://blog.52itstyle.com/archives/2358/"),i(a)])])])])}const an=l(d,[["render",Qe],["__file","Kafka-Install-And-Settings.html.vue"]]),sn=JSON.parse('{"path":"/linux-tutor/server/Kafka-Install-And-Settings.html","title":"Kafka 安装和配置","lang":"zh-CN","frontmatter":{"description":"Kafka 安装和配置 对于版本 由于 Kafka 经常会被连接到各个地方去，所以对于 Kafka 的版本，一般不能用太新的，要看你用在什么地方。 Flink 的要求 Spark 的要求 Spring 的要求 消息系统的好处 解耦（各个业务系统各自为政，有各自新需求，各自系统自行修改，只通过消息来通信） 大系统层面的扩展性（不用改旧业务系统代码，增加新...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Kafka-Install-And-Settings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Kafka 安装和配置"}],["meta",{"property":"og:description","content":"Kafka 安装和配置 对于版本 由于 Kafka 经常会被连接到各个地方去，所以对于 Kafka 的版本，一般不能用太新的，要看你用在什么地方。 Flink 的要求 Spark 的要求 Spring 的要求 消息系统的好处 解耦（各个业务系统各自为政，有各自新需求，各自系统自行修改，只通过消息来通信） 大系统层面的扩展性（不用改旧业务系统代码，增加新..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka 安装和配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"对于版本","slug":"对于版本","link":"#对于版本","children":[]},{"level":2,"title":"消息系统的好处","slug":"消息系统的好处","link":"#消息系统的好处","children":[]},{"level":2,"title":"Kafka 介绍","slug":"kafka-介绍","link":"#kafka-介绍","children":[]},{"level":2,"title":"Docker 单个实例部署（1.0.1）","slug":"docker-单个实例部署-1-0-1","link":"#docker-单个实例部署-1-0-1","children":[]},{"level":2,"title":"Docker 多机多实例部署（外网无法访问）","slug":"docker-多机多实例部署-外网无法访问","link":"#docker-多机多实例部署-外网无法访问","children":[{"level":4,"title":"Zookeeper 集群","slug":"zookeeper-集群","link":"#zookeeper-集群","children":[]},{"level":4,"title":"先安装 nc 再来校验 zookeeper 集群情况","slug":"先安装-nc-再来校验-zookeeper-集群情况","link":"#先安装-nc-再来校验-zookeeper-集群情况","children":[]},{"level":4,"title":"zookeeper 集群测试","slug":"zookeeper-集群测试","link":"#zookeeper-集群测试","children":[{"level":5,"title":"Kafka 集群","slug":"kafka-集群","link":"#kafka-集群","children":[]}]},{"level":4,"title":"Kafka 集群测试","slug":"kafka-集群测试","link":"#kafka-集群测试","children":[]},{"level":4,"title":"Kafka 认证配置","slug":"kafka-认证配置","link":"#kafka-认证配置","children":[]},{"level":4,"title":"Kafka 单纯监控 KafkaOffsetMonitor","slug":"kafka-单纯监控-kafkaoffsetmonitor","link":"#kafka-单纯监控-kafkaoffsetmonitor","children":[]},{"level":4,"title":"部署 kafka-manager","slug":"部署-kafka-manager","link":"#部署-kafka-manager","children":[]}]},{"level":2,"title":"Kafka 1.0.1 源码安装（也支持 1.0.2、0.11.0.3、0.10.2.2）","slug":"kafka-1-0-1-源码安装-也支持-1-0-2、0-11-0-3、0-10-2-2","link":"#kafka-1-0-1-源码安装-也支持-1-0-2、0-11-0-3、0-10-2-2","children":[]},{"level":2,"title":"kafka 1.0.1 默认配置文件内容","slug":"kafka-1-0-1-默认配置文件内容","link":"#kafka-1-0-1-默认配置文件内容","children":[]},{"level":2,"title":"其他资料","slug":"其他资料","link":"#其他资料","children":[]}],"git":{"createdTime":1653615455000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":16.39,"words":4916},"filePathRelative":"linux-tutor/server/Kafka-Install-And-Settings.md","localizedDate":"2022年5月27日","autoDesc":true}');export{an as comp,sn as data};
