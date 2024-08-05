import{_ as e,c as t,o as a,d as l}from"./app-CbULZrmi.js";const o={},i=l(`<h1 id="elasticsearch-知识" tabindex="-1"><a class="header-anchor" href="#elasticsearch-知识"><span>Elasticsearch 知识</span></a></h1><h2 id="docker-单节点部署" tabindex="-1"><a class="header-anchor" href="#docker-单节点部署"><span>Docker 单节点部署</span></a></h2><ul><li>官网：<a href="https://hub.docker.com/_/elasticsearch" target="_blank" rel="noopener noreferrer">https://hub.docker.com/_/elasticsearch</a></li><li>官网列表：<a href="https://www.docker.elastic.co/" target="_blank" rel="noopener noreferrer">https://www.docker.elastic.co/</a></li><li>阿里云支持版本：<a href="https://data.aliyun.com/product/elasticsearch" target="_blank" rel="noopener noreferrer">https://data.aliyun.com/product/elasticsearch</a><ul><li>阿里云有一个 <code>插件配置</code> 功能，常用的 Elasticsearch 插件都带了，勾选下即可安装。也支持上传安装。</li></ul></li><li>注意：docker 版本下 client.transport.sniff = true 是无效的。</li></ul><h4 id="_5-6-x" tabindex="-1"><a class="header-anchor" href="#_5-6-x"><span>5.6.x</span></a></h4><ul><li><code>vim ~/elasticsearch-5.6.8-docker.yml</code></li><li>启动：<code>docker-compose -f ~/elasticsearch-5.6.8-docker.yml -p elasticsearch_5.6.8 up -d</code></li></ul><pre><code class="language-yml">version: &#39;3&#39;
services:
  elasticsearch1:
    image: docker.elastic.co/elasticsearch/elasticsearch:5.6.8
    container_name: elasticsearch-5.6.8
    environment:
      - &quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;
      - &quot;cluster.name=elasticsearch&quot;
      - &quot;network.host=0.0.0.0&quot;
      - &quot;http.host=0.0.0.0&quot;
      - &quot;xpack.security.enabled=false&quot;
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    ports:
      - 9200:9200
      - 9300:9300
    volumes:
      - /data/docker/elasticsearch/data:/usr/share/elasticsearch/data

</code></pre><h4 id="_6-7-x-带-ik-分词" tabindex="-1"><a class="header-anchor" href="#_6-7-x-带-ik-分词"><span>6.7.x（带 ik 分词）</span></a></h4><ul><li><code>vim ~/elasticsearch-6.7.2-docker.yml</code></li><li>启动：<code>docker-compose -f ~/elasticsearch-6.7.2-docker.yml -p elasticsearch_6.7.2 up -d</code></li><li><code>mkdir -p /data/docker/elasticsearch-6.7.2/data</code></li><li>如果官网镜像比较慢可以换成阿里云：<code>registry.cn-hangzhou.aliyuncs.com/elasticsearch/elasticsearch:6.7.2</code></li><li>下载 ik 分词（版本必须和 Elasticsearch 版本对应，包括小版本号）：<a href="https://github.com/medcl/elasticsearch-analysis-ik" target="_blank" rel="noopener noreferrer">https://github.com/medcl/elasticsearch-analysis-ik</a></li></ul><pre><code class="language-yml">version: &#39;3&#39;
services:
  elasticsearch1:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.7.2
    container_name: elasticsearch-6.7.2
    environment:
      - &quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;
      - &quot;cluster.name=elasticsearch&quot;
      - &quot;network.host=0.0.0.0&quot;
      - &quot;http.host=0.0.0.0&quot;
      - &quot;xpack.security.enabled=false&quot;
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    ports:
      - 9200:9200
      - 9300:9300
    volumes:
      - /data/docker/elasticsearch-6.7.2/data:/usr/share/elasticsearch/data
      - /data/docker/ik:/usr/share/elasticsearch/plugins/ik
</code></pre><ul><li>Elasticsearch Head 插件地址：<a href="https://chrome.google.com/webstore/detail/ffmkiejjmecolpfloofpjologoblkegm" target="_blank" rel="noopener noreferrer">https://chrome.google.com/webstore/detail/ffmkiejjmecolpfloofpjologoblkegm</a></li><li>测试：</li></ul><pre><code>http://localhost:9200/
_analyze?pretty   POST


{&quot;analyzer&quot;:&quot;ik_smart&quot;,&quot;text&quot;:&quot;安徽省长江流域&quot;}
</code></pre><ul><li>ik_max_word 和 ik_smart 什么区别?</li></ul><pre><code>ik_max_word: 会将文本做最细粒度的拆分，比如会将“中华人民共和国国歌”拆分为“中华人民共和国,中华人民,中华,华人,人民共和国,人民,人,民,共和国,共和,和,国国,国歌”，会穷尽各种可能的组合，适合 Term Query；
ik_smart: 会做最粗粒度的拆分，比如会将“中华人民共和国国歌”拆分为“中华人民共和国,国歌”，适合 Phrase 查询。
</code></pre><hr><h2 id="elasticsearch-6-5-x-安装-适配与-5-5-x-6-6-x" tabindex="-1"><a class="header-anchor" href="#elasticsearch-6-5-x-安装-适配与-5-5-x-6-6-x"><span>Elasticsearch 6.5.x 安装（适配与 5.5.x，6.6.x）</span></a></h2><h4 id="环境" tabindex="-1"><a class="header-anchor" href="#环境"><span>环境</span></a></h4><ul><li>CentOS 7.x</li><li>至少需要 2G 内存</li><li>root 用户</li><li>JDK 版本：1.8（最低要求），主推：JDK 1.8.0_121 以上</li><li>关闭 firewall <ul><li><code>systemctl stop firewalld.service</code> #停止firewall</li><li><code>systemctl disable firewalld.service</code> #禁止firewall开机启动</li></ul></li></ul><h4 id="先配置部分系统变量" tabindex="-1"><a class="header-anchor" href="#先配置部分系统变量"><span>先配置部分系统变量</span></a></h4><ul><li>更多系统层面的配置可以看官网：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/system-config.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/current/system-config.html</a></li><li>配置系统最大打开文件描述符数：<code>vim /etc/sysctl.conf</code></li></ul><pre><code>fs.file-max=65535
vm.max_map_count=262144
</code></pre><ul><li>配置进程最大打开文件描述符：<code>vim /etc/security/limits.conf</code></li></ul><pre><code>elasticsearch soft memlock unlimited
elasticsearch hard memlock unlimited
* soft nofile 262144
* hard nofile 262144
</code></pre><h4 id="开始安装" tabindex="-1"><a class="header-anchor" href="#开始安装"><span>开始安装</span></a></h4><ul><li>检查：<code>rpm -qa | grep elastic</code></li><li>卸载：<code>rpm -e --nodeps elasticsearch</code></li><li>官网 RPM 安装流程（重要，以下资料都是对官网的总结）：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html</a></li><li>导入 KEY：<code>rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch</code></li><li>新建文件：<code>vim /etc/yum.repos.d/elasticsearch.repo</code></li><li>内容如下（6.x）：</li></ul><pre><code class="language-toml">[elasticsearch-6.x]
name=Elasticsearch repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
</code></pre><ul><li>内容如下（5.x）：</li></ul><pre><code class="language-ini">[elasticsearch-5.x]
name=Elasticsearch repository for 5.x packages
baseurl=https://artifacts.elastic.co/packages/5.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
</code></pre><ul><li>开始安装：<code>yum install -y elasticsearch</code>，预计文件有 108M 左右，国内网络安装可能会很慢，慢慢等 <ul><li>安装完后会多了一个：elasticsearch 用户和组</li></ul></li><li>设置 java 软链接：<code>ln -s /usr/local/jdk1.8.0_181/jre/bin/java /usr/local/sbin/java</code></li><li>启动和停止软件（默认是不启动的）： <ul><li>启动：<code>systemctl start elasticsearch.service</code></li><li>状态：<code>systemctl status elasticsearch.service</code></li><li>停止：<code>systemctl stop elasticsearch.service</code></li><li>重新启动：<code>systemctl restart elasticsearch.service</code></li></ul></li><li>安装完成后，增加系统自启动： <ul><li><code>/bin/systemctl daemon-reload</code></li><li><code>/bin/systemctl enable elasticsearch.service</code></li></ul></li><li>检查：<code>curl -X GET &quot;localhost:9200/&quot;</code></li></ul><h4 id="rpm-安装后的一些配置位置说明" tabindex="-1"><a class="header-anchor" href="#rpm-安装后的一些配置位置说明"><span>RPM 安装后的一些配置位置说明</span></a></h4><ul><li>更多说明可以看官网：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html#rpm-configuring" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html#rpm-configuring</a></li><li>更加详细的配置可以看：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html</a></li><li>默认系统生成了一个 elasticsearch 用户，下面的目录权限属于该用户</li><li>Elasticsearch 安装后位置：<code>/usr/share/elasticsearch</code></li><li>Elasticsearch 的软件环境、堆栈的设置：<code>/etc/sysconfig/elasticsearch</code></li><li>Elasticsearch 的集群设置：<code>/etc/elasticsearch/elasticsearch.yml</code></li><li>Log 位置：<code>/var/log/elasticsearch/</code></li><li>索引数据位置：<code>/var/lib/elasticsearch</code></li><li>插件位置：<code>/usr/share/elasticsearch/plugins</code></li><li>脚本文件位置：<code>/etc/elasticsearch/scripts</code></li></ul><h4 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h4><ul><li>编辑配置文件：<code>vim /etc/elasticsearch/elasticsearch.yml</code></li><li>默认只能 localhost 访问，修改成支持外网访问</li></ul><pre><code>打开这个注释：#cluster.name: my-application
集群名称最好是自己给定，不然有些 client 端会连不上，或者要求填写

打开这个注释：#network.host: 192.168.0.1
改为：network.host: 0.0.0.0
</code></pre><h4 id="安装-x-pack-6-5-x-默认带了-x-pack" tabindex="-1"><a class="header-anchor" href="#安装-x-pack-6-5-x-默认带了-x-pack"><span>安装 X-Pack（6.5.x 默认带了 x-pack）</span></a></h4><ul><li><code>cd /usr/share/elasticsearch &amp;&amp; bin/elasticsearch-plugin install x-pack</code></li></ul><h4 id="gui-客户端工具" tabindex="-1"><a class="header-anchor" href="#gui-客户端工具"><span>GUI 客户端工具</span></a></h4><ul><li>优先推荐：<a href="https://www.elastic-kaizen.com/download.html" target="_blank" rel="noopener noreferrer">https://www.elastic-kaizen.com/download.html</a></li><li><a href="https://github.com/ElasticHQ/elasticsearch-HQ" target="_blank" rel="noopener noreferrer">https://github.com/ElasticHQ/elasticsearch-HQ</a></li></ul><h4 id="安装-chrome-扩展的-head" tabindex="-1"><a class="header-anchor" href="#安装-chrome-扩展的-head"><span>安装 Chrome 扩展的 Head</span></a></h4><ul><li>下载地址：<a href="https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm/" target="_blank" rel="noopener noreferrer">https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm/</a></li></ul><h4 id="其他细节" tabindex="-1"><a class="header-anchor" href="#其他细节"><span>其他细节</span></a></h4><ul><li>如果就单个节点测试，新建索引的时候副本数记得填 0。</li></ul><h4 id="创建索引并设置-mapping" tabindex="-1"><a class="header-anchor" href="#创建索引并设置-mapping"><span>创建索引并设置 mapping</span></a></h4><ul><li>官网类型说明：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html</a></li></ul><pre><code class="language-json">curl -XPUT &#39;http://127.0.0.1:9200/grafanadb&#39; -H &#39;Content-Type: application/json&#39; -d&#39;
{
  &quot;settings&quot;: {
    &quot;refresh_interval&quot;: &quot;5s&quot;,
    &quot;number_of_shards&quot;: 5,
    &quot;number_of_replicas&quot;: 0
  },
  &quot;mappings&quot;: {
    &quot;radar&quot;: {
      &quot;properties&quot;: {
        &quot;request_num&quot;: {
          &quot;type&quot;: &quot;long&quot;
        },
        &quot;post_date&quot;: {
          &quot;type&quot;: &quot;date&quot;,
          &quot;format&quot;: &quot;yyyy-MM-dd HH:mm:ss||epoch_millis&quot;
        }
      }
    }
  }
}
&#39;
</code></pre><h4 id="批量增加-删除测试数据" tabindex="-1"><a class="header-anchor" href="#批量增加-删除测试数据"><span>批量增加 / 删除测试数据</span></a></h4><ul><li>官网文档：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html</a></li><li>批量增加，cURL 格式：</li></ul><pre><code class="language-shell">curl -X POST &quot;http://127.0.0.1:9200/_bulk&quot; -H &#39;Content-Type: application/json&#39; -d&#39;
{ &quot;index&quot; : { &quot;_index&quot; : &quot;grafanadb&quot;, &quot;_type&quot; : &quot;radar&quot;, &quot;_id&quot; : &quot;100001&quot; } }
{ &quot;post_date&quot; : &quot;2018-12-01 10:00:00&quot;, &quot;request_num&quot; :  1 }
{ &quot;index&quot; : { &quot;_index&quot; : &quot;grafanadb&quot;, &quot;_type&quot; : &quot;radar&quot;, &quot;_id&quot; : &quot;100002&quot; } }
{ &quot;post_date&quot; : &quot;2018-12-01 10:00:05&quot;, &quot;request_num&quot; :  2 }
{ &quot;index&quot; : { &quot;_index&quot; : &quot;grafanadb&quot;, &quot;_type&quot; : &quot;radar&quot;, &quot;_id&quot; : &quot;100003&quot; } }
{ &quot;post_date&quot; : &quot;2018-12-01 10:00:10&quot;, &quot;request_num&quot; :  3 }
{ &quot;index&quot; : { &quot;_index&quot; : &quot;grafanadb&quot;, &quot;_type&quot; : &quot;radar&quot;, &quot;_id&quot; : &quot;100004&quot; } }
{ &quot;post_date&quot; : &quot;2018-12-01 10:00:15&quot;, &quot;request_num&quot; :  4 }
{ &quot;index&quot; : { &quot;_index&quot; : &quot;grafanadb&quot;, &quot;_type&quot; : &quot;radar&quot;, &quot;_id&quot; : &quot;100005&quot; } }
{ &quot;post_date&quot; : &quot;2018-12-01 10:00:20&quot;, &quot;request_num&quot; :  5 }
&#39;
</code></pre><ul><li>批量删除，cURL 格式：</li></ul><pre><code>curl -X POST &quot;http://127.0.0.1:9200/_bulk&quot; -H &#39;Content-Type: application/json&#39; -d&#39;
{ &quot;delete&quot;: { &quot;_index&quot;: &quot;grafanadb&quot;, &quot;_type&quot;: &quot;radar&quot;, &quot;_id&quot;: &quot;100001&quot; } }
{ &quot;delete&quot;: { &quot;_index&quot;: &quot;grafanadb&quot;, &quot;_type&quot;: &quot;radar&quot;, &quot;_id&quot;: &quot;100002&quot; } }
&#39;
</code></pre><ul><li>清空索引所有数据，分成5个切片去执行删除，cURL 格式：</li></ul><pre><code>curl -X POST &quot;http://127.0.0.1:9200/索引名称/类型名称/_delete_by_query?refresh&amp;slices=5&amp;pretty&quot; -H &#39;Content-Type: application/json&#39; -d&#39;
{
  &quot;query&quot;: {
    &quot;match_all&quot;: {}
  }
}
&#39;
</code></pre><h2 id="elasticsearch-5-2-0-安装" tabindex="-1"><a class="header-anchor" href="#elasticsearch-5-2-0-安装"><span>Elasticsearch 5.2.0 安装</span></a></h2><ul><li>官网下载地址：<a href="https://www.elastic.co/cn/downloads/elasticsearch" target="_blank" rel="noopener noreferrer">https://www.elastic.co/cn/downloads/elasticsearch</a></li><li>Elasticsearch 5.2.0 版本下载地址（32M）：<a href="https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.2.0.zip" target="_blank" rel="noopener noreferrer">https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.2.0.zip</a></li></ul><h3 id="环境-1" tabindex="-1"><a class="header-anchor" href="#环境-1"><span>环境</span></a></h3><ul><li>机子 IP：192.168.1.127</li><li>CentOS 7.3</li><li>JDK 版本：1.8（最低要求），主推：JDK 1.8.0_121 以上</li><li>Elasticsearch 版本：5.2.0</li><li>关闭 firewall <ul><li><code>systemctl stop firewalld.service</code> #停止firewall</li><li><code>systemctl disable firewalld.service</code> #禁止firewall开机启动</li></ul></li></ul><h3 id="zip-解压安装" tabindex="-1"><a class="header-anchor" href="#zip-解压安装"><span>zip 解压安装</span></a></h3><ul><li>官网总的安装文档：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/5.x/zip-targz.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/5.x/zip-targz.html</a></li><li>我的解压目录：<code>/usr/program</code>，解压包名：<code>elasticsearch-5.2.0.zip</code></li><li>解压：<code>cd /usr/program ; unzip elasticsearch-5.2.0.zip</code></li><li>删除掉压缩包：<code>rm -rf elasticsearch-5.2.0.zip</code></li><li>添加组和用户 <ul><li>该版本不能使用 root 用户进行使用</li><li><code>useradd elasticsearch -p 123456</code>，添加一个名为 elasticsearch 的用户，还有一个同名的组</li></ul></li><li>添加数据目录：<code>mkdir -p /opt/elasticsearch/data /opt/elasticsearch/log</code></li><li>赋权限： <ul><li><code>chown -R elasticsearch:elasticsearch /usr/program/elasticsearch-5.2.0 /opt/elasticsearch</code></li></ul></li><li>编辑配置文件：<code>vim /usr/program/elasticsearch-5.2.0/config/elasticsearch.yml</code>，打开下面注释，并修改</li></ul><pre><code class="language-nginx">cluster.name: youmeek-cluster
node.name: youmeek-node-1
path.data: /opt/elasticsearch/data
path.logs: /opt/elasticsearch/log
bootstrap.memory_lock: true
network.host: 0.0.0.0 # 也可以是本机 IP
http.port: 9200
discovery.zen.ping.unicast.hosts: [&quot;192.168.1.127&quot;]  #如果有多个机子集群，这里就写上这些机子的 IP，格式：[&quot;192.168.1.127&quot;,&quot;192.168.1.126&quot;]
</code></pre><ul><li>重点说明：Elasticsearch 的集群环境，主要就是上面这段配置文件内容的差别。如果有其他机子：node.name、discovery.zen.ping.unicast.hosts 需要改下。集群中所有机子的配置文件中 discovery.zen.ping.unicast.hosts 都要有所有机子的 IP 地址。</li><li>修改这个配置文件，不然无法锁内存：<code>vim /etc/security/limits.conf</code></li><li>在文件最尾部增加下面内容：</li></ul><pre><code class="language-nginx"># allow user &#39;elasticsearch&#39; mlockall
elasticsearch soft memlock unlimited
elasticsearch hard memlock unlimited
* soft nofile 262144
* hard nofile 262144
</code></pre><ul><li>修改：<code>vim /etc/sysctl.conf</code>，添加下面配置</li></ul><pre><code class="language-ini">vm.max_map_count=262144
</code></pre><ul><li>重启机子：<code>reboot</code>。</li><li>切换用户：<code>su elasticsearch</code></li><li>控制台运行（启动比较慢）：<code>cd /usr/program/elasticsearch-5.2.0 ; ./bin/elasticsearch</code></li><li>后台运行：<code>cd /usr/program/elasticsearch-5.2.0 ; ./bin/elasticsearch -d -p 自定义pid值</code></li><li>在本机终端输入该命令：<code>curl -XGET &#39;http://192.168.1.127:9200&#39;</code>，（也可以用浏览器访问：<a href="http://192.168.1.127:9200/" target="_blank" rel="noopener noreferrer">http://192.168.1.127:9200/</a>）如果能得到如下结果，则表示启动成功：</li></ul><pre><code class="language-json">{
  &quot;name&quot; : &quot;youmeek-node-1&quot;,
  &quot;cluster_name&quot; : &quot;youmeek-cluster&quot;,
  &quot;cluster_uuid&quot; : &quot;c8RxQdOHQJq-Tg8rrPi_UA&quot;,
  &quot;version&quot; : {
    &quot;number&quot; : &quot;5.2.0&quot;,
    &quot;build_hash&quot; : &quot;24e05b9&quot;,
    &quot;build_date&quot; : &quot;2017-01-24T19:52:35.800Z&quot;,
    &quot;build_snapshot&quot; : false,
    &quot;lucene_version&quot; : &quot;6.4.0&quot;
  },
  &quot;tagline&quot; : &quot;You Know, for Search&quot;
}
</code></pre><h2 id="安装-kibana-5-2-0" tabindex="-1"><a class="header-anchor" href="#安装-kibana-5-2-0"><span>安装 Kibana 5.2.0</span></a></h2><ul><li>官网下载地址：<a href="https://www.elastic.co/cn/downloads/kibana" target="_blank" rel="noopener noreferrer">https://www.elastic.co/cn/downloads/kibana</a></li><li>Kibana 5.2.0 版本下载地址（36M）：<a href="https://artifacts.elastic.co/downloads/kibana/kibana-5.2.0-linux-x86_64.tar.gz" target="_blank" rel="noopener noreferrer">https://artifacts.elastic.co/downloads/kibana/kibana-5.2.0-linux-x86_64.tar.gz</a></li><li>Kibana 5.2.0 官网文档：<a href="https://www.elastic.co/guide/en/kibana/5.2/index.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/kibana/5.2/index.html</a></li><li>Kibana 5.2.0 官网安装文档：<a href="https://www.elastic.co/guide/en/kibana/5.2/targz.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/kibana/5.2/targz.html</a></li></ul><h3 id="tar-gz-解压安装" tabindex="-1"><a class="header-anchor" href="#tar-gz-解压安装"><span>tar.gz 解压安装</span></a></h3><ul><li>安装目录：/usr/program</li><li>解压：<code>cd /usr/program ; tar zxvf kibana-5.2.0-linux-x86_64.tar.gz</code></li><li>删除压缩包：<code>rm -rf kibana-5.2.0-linux-x86_64.tar.gz</code></li><li>修改解压后的目录名称：<code>mv kibana-5.2.0-linux-x86_64 kibana-5.2.0</code></li><li>修改配置：<code>vim /usr/program/kibana-5.2.0/config/kibana.yml</code>，默认配置都是注释的，我们这里打开这些注释：</li></ul><pre><code class="language-nginx">server.port: 5601
server.host: &quot;0.0.0.0&quot; # 请将这里改为 0.0.0.0 或是当前本机 IP，不然可能会访问不了
erver.name: &quot;youmeek-kibana&quot;
elasticsearch.url: &quot;http://192.168.1.127:9200&quot;
elasticsearch.username: &quot;elasticsearch&quot;
elasticsearch.password: &quot;123456&quot;
</code></pre><ul><li>运行：<code>cd /usr/program/kibana-5.2.0 ; ./bin/kibana</code></li><li>浏览器访问：<a href="http://192.168.1.127:5601" target="_blank" rel="noopener noreferrer">http://192.168.1.127:5601</a>，可以看到 Kibana <code>Configure an index pattern</code> 界面</li><li>访问 Dev Tools 工具，后面写 DSL 语句会常使用该功能：<a href="http://192.168.1.127:5601/app/kibana#/dev_tools/console?_g=()" target="_blank" rel="noopener noreferrer">http://192.168.1.127:5601/app/kibana#/dev_tools/console?_g=()</a></li></ul><h2 id="beats" tabindex="-1"><a class="header-anchor" href="#beats"><span>Beats</span></a></h2><h3 id="beats-资料" tabindex="-1"><a class="header-anchor" href="#beats-资料"><span>Beats 资料</span></a></h3><ul><li>Beats 官网：<a href="https://www.elastic.co/cn/products/beats" target="_blank" rel="noopener noreferrer">https://www.elastic.co/cn/products/beats</a></li><li>Beats 简单介绍：日志数据搜集器。一般安装在需要收集日志的服务器上，然后把收集的数据发送到 Elasticsearch 或是先发送到 logstash 清洗整理（解析过滤）后再发送到 Elasticsearch。 <ul><li>logstash 也有收集日志的功能，只是它相对 Beats 更加消耗 CPU 和内存，所以一般使用 Beats 收集日志。</li></ul></li><li>目前常见的 Beats 类型： <ul><li>Filebeat（搜集文件数据）；</li><li>Packetbeat（搜集网络流量数据）；</li><li>Metricbeat（搜集系统、进程和文件系统级别的 CPU 和内存使用情况等数据）；</li><li>Winlogbeat（搜集 Windows 事件日志数据）。</li><li>Heartbeat（主动探测服务是否可用）。</li></ul></li></ul><h2 id="安装-x-pack-或是其他插件" tabindex="-1"><a class="header-anchor" href="#安装-x-pack-或是其他插件"><span>安装 X-Pack 或是其他插件</span></a></h2><ul><li>X-Pack 是官网提供的管理增强工具，但是全部功能收费，有一个月使用，有部分功能免费。其他免费的插件。 <ul><li>licence 的用法可以看这篇文章： <ul><li><a href="http://blog.csdn.net/abcd_d_/article/details/53178798" target="_blank" rel="noopener noreferrer">http://blog.csdn.net/abcd_d_/article/details/53178798</a></li><li><a href="http://blog.csdn.net/AbnerSunYH/article/details/53436212" target="_blank" rel="noopener noreferrer">http://blog.csdn.net/AbnerSunYH/article/details/53436212</a></li><li>破解：<a href="http://www.lofter.com/lpost/33be15_d4fd028" target="_blank" rel="noopener noreferrer">http://www.lofter.com/lpost/33be15_d4fd028</a></li></ul></li><li>免费插件：</li><li>head - 节点数据查看管理：<a href="https://github.com/mobz/elasticsearch-head" target="_blank" rel="noopener noreferrer">https://github.com/mobz/elasticsearch-head</a></li><li>kopf - 集群管理：<a href="https://github.com/lmenezes/elasticsearch-kopf" target="_blank" rel="noopener noreferrer">https://github.com/lmenezes/elasticsearch-kopf</a></li></ul></li><li>官网说明：<a href="https://www.elastic.co/guide/en/x-pack/5.2/installing-xpack.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/x-pack/5.2/installing-xpack.html</a></li><li>安装（过程比较慢）：<code>/usr/share/elasticsearch/bin/elasticsearch-plugin install x-pack</code></li><li>如果线上安装速度太慢，那就离线安装： <ul><li>下载，我放在 /opt 目录下（119M）：<code>wget https://artifacts.elastic.co/downloads/packs/x-pack/x-pack-5.2.2.zip</code></li><li>安装：<code>/usr/share/elasticsearch/bin/elasticsearch-plugin install file:///opt/x-pack-5.2.2.zip</code></li></ul></li><li>卸载：<code>/usr/share/elasticsearch/bin/elasticsearch-plugin remove x-pack</code></li><li>安装后重启服务，重启后访问你会发现需要用户和密码，我们可以关掉这个，在 elasticsearch.yml 中添加：<code>xpack.security.enabled: false</code></li><li>其他 5.2 资料： <ul><li><a href="https://blog.yourtion.com/install-x-pack-for-elasticsearch-and-kibana.html" target="_blank" rel="noopener noreferrer">https://blog.yourtion.com/install-x-pack-for-elasticsearch-and-kibana.html</a></li><li><a href="https://www.ko178.cn/?p=353" target="_blank" rel="noopener noreferrer">https://www.ko178.cn/?p=353</a></li><li><a href="https://my.oschina.net/HeAlvin/blog/828639" target="_blank" rel="noopener noreferrer">https://my.oschina.net/HeAlvin/blog/828639</a></li><li><a href="http://www.jianshu.com/p/004765d2238b" target="_blank" rel="noopener noreferrer">http://www.jianshu.com/p/004765d2238b</a></li><li><a href="http://www.cnblogs.com/delgyd/p/elk.html" target="_blank" rel="noopener noreferrer">http://www.cnblogs.com/delgyd/p/elk.html</a></li><li><a href="http://www.itdadao.com/articles/c15a1135185p0.html" target="_blank" rel="noopener noreferrer">http://www.itdadao.com/articles/c15a1135185p0.html</a></li><li><a href="http://www.busyboy.cn/?p=920" target="_blank" rel="noopener noreferrer">http://www.busyboy.cn/?p=920</a></li><li><a href="http://nosmoking.blog.51cto.com/3263888/1897989" target="_blank" rel="noopener noreferrer">http://nosmoking.blog.51cto.com/3263888/1897989</a></li><li><a href="http://www.freebuf.com/sectool/139687.html" target="_blank" rel="noopener noreferrer">http://www.freebuf.com/sectool/139687.html</a></li></ul></li></ul><h2 id="_2-4-x" tabindex="-1"><a class="header-anchor" href="#_2-4-x"><span>2.4.X</span></a></h2><h3 id="安装-elasticsearch-集群" tabindex="-1"><a class="header-anchor" href="#安装-elasticsearch-集群"><span>安装 elasticsearch 集群</span></a></h3><h3 id="下载" tabindex="-1"><a class="header-anchor" href="#下载"><span>下载</span></a></h3><ul><li>下载在我个人习惯的子自己创建的目录下：/usr/program/elk</li><li>elasticsearch 2.4.1（26 M）：<code>wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-2.4.1.tar.gz</code></li><li>logstash 2.4.0（80 M）：<code>wget https://download.elastic.co/logstash/logstash/logstash-2.4.1.tar.gz</code></li><li>kibana 4.6.1（32 M）：<code>wget https://download.elastic.co/kibana/kibana/kibana-4.6.1-linux-x86_64.tar.gz</code></li></ul><h3 id="tar-解压安装" tabindex="-1"><a class="header-anchor" href="#tar-解压安装"><span>tar 解压安装</span></a></h3><ul><li><strong>确保系统安装有 JDK</strong></li><li>官网文档：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/5.2/zip-targz.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/5.2/zip-targz.html</a></li><li>添加日志存放目录、数据存放目录：<code>mkdir -p /opt/elasticsearch/data /opt/elasticsearch/log</code></li><li>添加组和用户 <ul><li>该版本不能使用 root 用户进行使用</li><li><code>useradd elasticsearch -p 123456</code>，添加一个名为 elasticsearch 的用户，还有一个同名的组</li></ul></li><li>解压下载的文件 <ul><li><code>cd /usr/program/elk</code></li><li><code>tar zxvf elasticsearch-2.4.1.tar.gz</code></li></ul></li><li>赋权限： <ul><li><code>chown -R elasticsearch:elasticsearch /usr/program/elk /opt/elasticsearch</code></li></ul></li><li>我 tar 安装后一些路径说明： <ul><li>home：<code>/usr/program/elk/elasticsearch-2.4.1</code></li><li>bin：<code>/usr/program/elk/elasticsearch-2.4.1/bin</code></li><li>配置文件：<code>/usr/program/elk/elasticsearch-2.4.1/config/elasticsearch.yml</code></li><li>plugins：<code>/usr/program/elk/elasticsearch-2.4.1/plugins</code></li><li>script：<code>/usr/program/elk/elasticsearch-2.4.1/scripts</code></li><li>data：<code>/opt/elasticsearch/data</code></li><li>log：<code>/opt/elasticsearch/log/集群名称.log</code></li></ul></li><li>编辑配置文件：<code>vim /usr/program/elk/elasticsearch-2.4.1/config/elasticsearch.yml</code>，打开下面注释，并修改</li></ul><pre><code class="language-nginx">cluster.name: gitnavi-cluster
node.name: gitnavi-node-1
path.data: /opt/elasticsearch/data
path.logs: /opt/elasticsearch/log
bootstrap.memory_lock: true
network.host: 0.0.0.0 # 也可以是本机 IP
http.port: 9200
discovery.zen.ping.multicast.enabled: false
discovery.zen.ping.unicast.hosts: [&quot;192.168.1.127&quot;, &quot;192.168.1.126&quot;]  #这个为两台机子的 IP 地址
</code></pre><ul><li>修改这个配置文件，不然无法锁内存：<code>vim /etc/security/limits.conf</code></li><li>在文件最尾部增加下面内容：</li></ul><pre><code class="language-nginx"># allow user &#39;elasticsearch&#39; mlockall
elasticsearch soft memlock unlimited
elasticsearch hard memlock unlimited
* soft nofile 262144
* hard nofile 262144
</code></pre><ul><li><p>关闭 firewall</p><ul><li><code>systemctl stop firewalld.service</code> #停止firewall</li><li><code>systemctl disable firewalld.service</code> #禁止firewall开机启动</li></ul></li><li><p>切换到 elasticsearch 用户下：<code>su elasticsearch</code></p></li><li><p>带控制台的启动（比较慢）：<code>/usr/program/elk/elasticsearch-2.4.1/bin/elasticsearch</code></p><ul><li>控制台会输出类似这样的信息：</li></ul></li></ul><pre><code>[2017-03-13 18:42:51,170][INFO ][node                     ] [gitnavi-node-1] version[2.4.1], pid[21156], build[c67dc32/2016-09-27T18:57:55Z]
[2017-03-13 18:42:51,177][INFO ][node                     ] [gitnavi-node-1] initializing ...
[2017-03-13 18:42:51,821][INFO ][plugins                  ] [gitnavi-node-1] modules [reindex, lang-expression, lang-groovy], plugins [head, kopf], sites [head, kopf]
[2017-03-13 18:42:51,852][INFO ][env                      ] [gitnavi-node-1] using [1] data paths, mounts [[/ (rootfs)]], net usable_space [12.4gb], net total_space [17.4gb], spins? [unknown], types [rootfs]
[2017-03-13 18:42:51,852][INFO ][env                      ] [gitnavi-node-1] heap size [1015.6mb], compressed ordinary object pointers [true]
[2017-03-13 18:42:54,094][INFO ][node                     ] [gitnavi-node-1] initialized
[2017-03-13 18:42:54,094][INFO ][node                     ] [gitnavi-node-1] starting ...
[2017-03-13 18:42:54,175][INFO ][transport                ] [gitnavi-node-1] publish_address {192.168.1.127:9300}, bound_addresses {[::]:9300}
[2017-03-13 18:42:54,178][INFO ][discovery                ] [gitnavi-node-1] gitnavi-cluster/-XywT60EScO-9lgzjfnsgg
[2017-03-13 18:42:57,344][INFO ][cluster.service          ] [gitnavi-node-1] new_master {gitnavi-node-1}{-XywT60EScO-9lgzjfnsgg}{192.168.1.127}{192.168.1.127:9300}, reason: zen-disco-join(elected_as_master, [0] joins received)
[2017-03-13 18:42:57,410][INFO ][gateway                  ] [gitnavi-node-1] recovered [0] indices into cluster_state
[2017-03-13 18:42:57,414][INFO ][http                     ] [gitnavi-node-1] publish_address {192.168.1.127:9200}, bound_addresses {[::]:9200}
[2017-03-13 18:42:57,414][INFO ][node                     ] [gitnavi-node-1] started
</code></pre><ul><li>守护进程方式启动：<code>/usr/program/elk/elasticsearch-2.4.1/bin/elasticsearch -d</code></li><li>守护进程方式停止：<code>ps -ef|grep elasticsearc</code>，只能通过 kill pid 来结束</li><li>访问：<code>http://192.168.1.127:9200/</code>，可以看到如下内容：</li></ul><pre><code class="language-json">{
  &quot;name&quot; : &quot;gitnavi-node-1&quot;,
  &quot;cluster_name&quot; : &quot;gitnavi-cluster&quot;,
  &quot;cluster_uuid&quot; : &quot;0b66dYpnTd-hh7x4Phfm1A&quot;,
  &quot;version&quot; : {
    &quot;number&quot; : &quot;2.4.1&quot;,
    &quot;build_hash&quot; : &quot;c67dc32e24162035d18d6fe1e952c4cbcbe79d16&quot;,
    &quot;build_timestamp&quot; : &quot;2016-09-27T18:57:55Z&quot;,
    &quot;build_snapshot&quot; : false,
    &quot;lucene_version&quot; : &quot;5.5.2&quot;
  },
  &quot;tagline&quot; : &quot;You Know, for Search&quot;
}
</code></pre><ul><li>插件（插件的迭代很容易跟不上官网的版本，所以请牢记关注插件官网的说明） <ul><li>head，节点数据查看管理：<a href="https://github.com/mobz/elasticsearch-head" target="_blank" rel="noopener noreferrer">https://github.com/mobz/elasticsearch-head</a></li><li>kopf，集群管理：<a href="https://github.com/lmenezes/elasticsearch-kopf" target="_blank" rel="noopener noreferrer">https://github.com/lmenezes/elasticsearch-kopf</a></li><li>Bigdesk，监控查看CPU内存索引数据搜索情况http连接数：<a href="https://github.com/hlstudio/bigdesk" target="_blank" rel="noopener noreferrer">https://github.com/hlstudio/bigdesk</a></li></ul></li><li>安装（过程比较慢） <ul><li>head：<code>/usr/program/elk/elasticsearch-2.4.1/bin/plugin install mobz/elasticsearch-head</code><ul><li>安装完的访问地址：<code>http://192.168.1.127:9200/_plugin/head</code></li></ul></li><li>kopf：<code>/usr/program/elk/elasticsearch-2.4.1/bin/plugin install lmenezes/elasticsearch-kopf</code><ul><li>安装完的访问地址：<code>http://192.168.1.127:9200/_plugin/kopf</code></li></ul></li><li>Bigdesk：<code>/usr/program/elk/elasticsearch-2.4.1/bin/plugin install hlstudio/bigdesk</code><ul><li>安装完的访问地址：<code>http://192.168.1.127:9200/_plugin/bigdesk</code></li></ul></li><li>卸载：<code>/usr/share/elasticsearch/bin/elasticsearch-plugin remove 插件名称</code></li></ul></li><li>IK 分词插件的安装（<strong>重点：所有节点都需要安装此插件</strong>） <ul><li>IK 分词官网：<a href="https://github.com/medcl/elasticsearch-analysis-ik" target="_blank" rel="noopener noreferrer">https://github.com/medcl/elasticsearch-analysis-ik</a></li><li>官网首页已经有一个表格说明 ES 版本和 IK 插件的版本对应，我们可以看到：ES 2.4.1 对应 IK 分词 1.10.1，下载地址：<a href="https://github.com/medcl/elasticsearch-analysis-ik/releases/tag/v1.10.1" target="_blank" rel="noopener noreferrer">https://github.com/medcl/elasticsearch-analysis-ik/releases/tag/v1.10.1</a></li><li>进入 ES 插件目录：<code>cd /usr/program/elk/elasticsearch-2.4.1/plugins</code></li><li>创建 ik 目录：<code>mkdir ik</code></li><li>把下载的 elasticsearch-analysis-ik-1.10.1.zip 上传到刚新建的 ik 目录下</li><li>解压：<code>unzip elasticsearch-analysis-ik-1.10.1.zip</code></li><li>删除压缩包：<code>rm -rf elasticsearch-analysis-ik-1.10.1.zip</code></li><li>编辑 ES 配置文件：<code>vim /usr/program/elk/elasticsearch-2.4.1/config/elasticsearch.yml</code><ul><li>在文件底部添加如下内容：</li></ul></li></ul></li></ul><pre><code class="language-ini">index.analysis.analyzer.default.tokenizer : &quot;ik_max_word&quot;
index.analysis.analyzer.default.type: &quot;ik&quot;
</code></pre><ul><li>重启 ES ： /usr/program/elk/elasticsearch-2.4.1/bin/elasticsearch</li><li>验证 ik 插件，浏览器访问：<a href="http://192.168.1.127:9200/_analyze?analyzer=ik&amp;pretty=true&amp;text=%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E9%92%88%E5%AF%B9%E7%A8%8B%E5%BA%8F%E5%91%98%E4%BC%98%E5%8C%96%E7%9A%84%E5%AF%BC%E8%88%AAGitNavi.com" target="_blank" rel="noopener noreferrer">http://192.168.1.127:9200/_analyze?analyzer=ik&amp;pretty=true&amp;text=这是一个针对程序员优化的导航GitNavi.com</a>，能得到如下结果就表示成功：</li></ul><pre><code class="language-json">[
  {
    &quot;token&quot;: &quot;这是&quot;,
    &quot;start_offset&quot;: 0,
    &quot;end_offset&quot;: 2,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 0
  },
  {
    &quot;token&quot;: &quot;一个&quot;,
    &quot;start_offset&quot;: 2,
    &quot;end_offset&quot;: 4,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 1
  },
  {
    &quot;token&quot;: &quot;一&quot;,
    &quot;start_offset&quot;: 2,
    &quot;end_offset&quot;: 3,
    &quot;type&quot;: &quot;TYPE_CNUM&quot;,
    &quot;position&quot;: 2
  },
  {
    &quot;token&quot;: &quot;个&quot;,
    &quot;start_offset&quot;: 3,
    &quot;end_offset&quot;: 4,
    &quot;type&quot;: &quot;COUNT&quot;,
    &quot;position&quot;: 3
  },
  {
    &quot;token&quot;: &quot;针对&quot;,
    &quot;start_offset&quot;: 4,
    &quot;end_offset&quot;: 6,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 4
  },
  {
    &quot;token&quot;: &quot;程序员&quot;,
    &quot;start_offset&quot;: 6,
    &quot;end_offset&quot;: 9,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 5
  },
  {
    &quot;token&quot;: &quot;程序&quot;,
    &quot;start_offset&quot;: 6,
    &quot;end_offset&quot;: 8,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 6
  },
  {
    &quot;token&quot;: &quot;序&quot;,
    &quot;start_offset&quot;: 7,
    &quot;end_offset&quot;: 8,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 7
  },
  {
    &quot;token&quot;: &quot;员&quot;,
    &quot;start_offset&quot;: 8,
    &quot;end_offset&quot;: 9,
    &quot;type&quot;: &quot;CN_CHAR&quot;,
    &quot;position&quot;: 8
  },
  {
    &quot;token&quot;: &quot;优化&quot;,
    &quot;start_offset&quot;: 9,
    &quot;end_offset&quot;: 11,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 9
  },
  {
    &quot;token&quot;: &quot;导航&quot;,
    &quot;start_offset&quot;: 12,
    &quot;end_offset&quot;: 14,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 10
  },
  {
    &quot;token&quot;: &quot;航&quot;,
    &quot;start_offset&quot;: 13,
    &quot;end_offset&quot;: 14,
    &quot;type&quot;: &quot;CN_WORD&quot;,
    &quot;position&quot;: 11
  },
  {
    &quot;token&quot;: &quot;gitnavi.com&quot;,
    &quot;start_offset&quot;: 14,
    &quot;end_offset&quot;: 25,
    &quot;type&quot;: &quot;LETTER&quot;,
    &quot;position&quot;: 12
  },
  {
    &quot;token&quot;: &quot;gitnavi&quot;,
    &quot;start_offset&quot;: 14,
    &quot;end_offset&quot;: 21,
    &quot;type&quot;: &quot;ENGLISH&quot;,
    &quot;position&quot;: 13
  },
  {
    &quot;token&quot;: &quot;com&quot;,
    &quot;start_offset&quot;: 22,
    &quot;end_offset&quot;: 25,
    &quot;type&quot;: &quot;ENGLISH&quot;,
    &quot;position&quot;: 14
  }
]
</code></pre><ul><li>Elasticsearch 5.x 版本之后，就不需要再修改这个配置文件了 <code>/usr/program/elk/elasticsearch-2.4.1/config/elasticsearch.yml</code>，直接解压 zip 后，直接可以启动使用。</li><li>其他一些配置文件： <ul><li>main.dic，内置中文词库文件是，差不多有 27W 条记录。</li><li>stopword.dic，英文停用词，一般不会被分词，不会存放在倒排索引中。</li><li>quantifier.dic，用来存放一些量词。</li><li>suffix.dic，用来存放后缀词。</li><li>surname.dic，姓氏。</li></ul></li><li>自定义分词词库： <ul><li>修改配置文件：IKAnalyzer.cfg.xml</li><li>在 ext_dict 标签中指定我们自己新增的 dic 文件（给的 demo 路径是 custom 目录下）。</li><li>修改完重启下 Elasticsearch 集群</li></ul></li><li>自定义停用词库： <ul><li>修改配置文件：IKAnalyzer.cfg.xml</li><li>在 ext_stopwords 标签中指定我们自己新增的 dic 文件（给的 demo 路径是 custom 目录下）。</li><li>修改完重启下 Elasticsearch 集群</li></ul></li></ul><h3 id="构建-elasticsearch-集群" tabindex="-1"><a class="header-anchor" href="#构建-elasticsearch-集群"><span>构建 elasticsearch 集群</span></a></h3><ul><li>另外一台机子也同样这样安装，但是有几个地方有差别： <ul><li>特别注意：集群的关键点是配置文件中的：cluster.name，这个一样就表示在一个集群中</li><li>配置文件：<code>/usr/program/elk/elasticsearch-2.4.1/config/elasticsearch.yml</code><ul><li>node 名称改为不一样的，比如我这边改为 2：node.name: gitnavi-node-2</li></ul></li><li>插件不用安装，有一台机子安装即可</li><li>先启动装有 head 的机子，然后再启动另外一台，这样好辨别</li></ul></li></ul>`,95),r=[i];function s(c,n){return a(),t("div",null,r)}const d=e(o,[["render",s],["__file","Elasticsearch-Base.html.vue"]]),h=JSON.parse('{"path":"/linux-tutor/server/Elasticsearch-Base.html","title":"Elasticsearch 知识","lang":"zh-CN","frontmatter":{"description":"Elasticsearch 知识 Docker 单节点部署 官网：https://hub.docker.com/_/elasticsearch 官网列表：https://www.docker.elastic.co/ 阿里云支持版本：https://data.aliyun.com/product/elasticsearch 阿里云有一个 插件配置 功能，...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Elasticsearch-Base.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Elasticsearch 知识"}],["meta",{"property":"og:description","content":"Elasticsearch 知识 Docker 单节点部署 官网：https://hub.docker.com/_/elasticsearch 官网列表：https://www.docker.elastic.co/ 阿里云支持版本：https://data.aliyun.com/product/elasticsearch 阿里云有一个 插件配置 功能，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-04T21:01:43.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-04T21:01:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Elasticsearch 知识\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-04T21:01:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Docker 单节点部署","slug":"docker-单节点部署","link":"#docker-单节点部署","children":[{"level":4,"title":"5.6.x","slug":"_5-6-x","link":"#_5-6-x","children":[]},{"level":4,"title":"6.7.x（带 ik 分词）","slug":"_6-7-x-带-ik-分词","link":"#_6-7-x-带-ik-分词","children":[]}]},{"level":2,"title":"Elasticsearch 6.5.x 安装（适配与 5.5.x，6.6.x）","slug":"elasticsearch-6-5-x-安装-适配与-5-5-x-6-6-x","link":"#elasticsearch-6-5-x-安装-适配与-5-5-x-6-6-x","children":[{"level":4,"title":"环境","slug":"环境","link":"#环境","children":[]},{"level":4,"title":"先配置部分系统变量","slug":"先配置部分系统变量","link":"#先配置部分系统变量","children":[]},{"level":4,"title":"开始安装","slug":"开始安装","link":"#开始安装","children":[]},{"level":4,"title":"RPM 安装后的一些配置位置说明","slug":"rpm-安装后的一些配置位置说明","link":"#rpm-安装后的一些配置位置说明","children":[]},{"level":4,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":4,"title":"安装 X-Pack（6.5.x 默认带了 x-pack）","slug":"安装-x-pack-6-5-x-默认带了-x-pack","link":"#安装-x-pack-6-5-x-默认带了-x-pack","children":[]},{"level":4,"title":"GUI 客户端工具","slug":"gui-客户端工具","link":"#gui-客户端工具","children":[]},{"level":4,"title":"安装 Chrome 扩展的 Head","slug":"安装-chrome-扩展的-head","link":"#安装-chrome-扩展的-head","children":[]},{"level":4,"title":"其他细节","slug":"其他细节","link":"#其他细节","children":[]},{"level":4,"title":"创建索引并设置 mapping","slug":"创建索引并设置-mapping","link":"#创建索引并设置-mapping","children":[]},{"level":4,"title":"批量增加 / 删除测试数据","slug":"批量增加-删除测试数据","link":"#批量增加-删除测试数据","children":[]}]},{"level":2,"title":"Elasticsearch 5.2.0 安装","slug":"elasticsearch-5-2-0-安装","link":"#elasticsearch-5-2-0-安装","children":[{"level":3,"title":"环境","slug":"环境-1","link":"#环境-1","children":[]},{"level":3,"title":"zip 解压安装","slug":"zip-解压安装","link":"#zip-解压安装","children":[]}]},{"level":2,"title":"安装 Kibana 5.2.0","slug":"安装-kibana-5-2-0","link":"#安装-kibana-5-2-0","children":[{"level":3,"title":"tar.gz 解压安装","slug":"tar-gz-解压安装","link":"#tar-gz-解压安装","children":[]}]},{"level":2,"title":"Beats","slug":"beats","link":"#beats","children":[{"level":3,"title":"Beats 资料","slug":"beats-资料","link":"#beats-资料","children":[]}]},{"level":2,"title":"安装 X-Pack 或是其他插件","slug":"安装-x-pack-或是其他插件","link":"#安装-x-pack-或是其他插件","children":[]},{"level":2,"title":"2.4.X","slug":"_2-4-x","link":"#_2-4-x","children":[{"level":3,"title":"安装 elasticsearch 集群","slug":"安装-elasticsearch-集群","link":"#安装-elasticsearch-集群","children":[]},{"level":3,"title":"下载","slug":"下载","link":"#下载","children":[]},{"level":3,"title":"tar 解压安装","slug":"tar-解压安装","link":"#tar-解压安装","children":[]},{"level":3,"title":"构建 elasticsearch 集群","slug":"构建-elasticsearch-集群","link":"#构建-elasticsearch-集群","children":[]}]}],"git":{"createdTime":1653565176000,"updatedTime":1654376503000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":12.94,"words":3883},"filePathRelative":"linux-tutor/server/Elasticsearch-Base.md","localizedDate":"2022年5月26日","autoDesc":true}');export{d as comp,h as data};
