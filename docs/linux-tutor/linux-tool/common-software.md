# 常用软件/工具索引

> 各类服务器软件、开发工具、中间件的官网链接索引。

## 代码质量管理

### SonarQube

- **官网**：<https://www.sonarqube.org/>
- **下载**：<https://www.sonarqube.org/downloads/>
- **GitHub**：<https://github.com/SonarSource/sonarqube>
- **支持语言**：Java, C/C++, C#, JavaScript, TypeScript, Python, PHP, Go, Swift 等 20+ 语言

### JMeter

- **官网**：<https://jmeter.apache.org/>
- **下载**：<https://jmeter.apache.org/download_jmeter.cgi>
- **插件库**：<https://jmeter-plugins.org/>
- **说明**：Java 开发，需要 JDK 8+

## 监控与可观测性

### Prometheus

- **官网**：<https://prometheus.io/>
- **说明**：本地存储建议只存一个月，长期存储需搭配远端存储（如 OpenTSDB）
- **注意**：不适合日志存储（推荐 ELK），集群各服务器时间需同步

### Grafana

- **官网**：<https://grafana.com/>

### 链路追踪

- **OpenTracing**：<https://opentracing.io/>
- **Jaeger**：<https://www.jaegertracing.io/>
- **SkyWalking**：<https://skywalking.apache.org/>（当前活跃度最高）

### Zabbix

- **官网**：<https://www.zabbix.com>
- **说明**：企业级分布式开源监控方案，Linux 最主流的监控方案

### GoAccess

- **官网**：<https://goaccess.io/>
- **GitHub**：<https://github.com/allinurl/goaccess>
- **说明**：Apache/Nginx 日志实时分析

## 消息队列

### RabbitMQ

- **官网**：<http://www.rabbitmq.com/>
- **安装文档**：<http://www.rabbitmq.com/install-rpm.html>
- **入门教程**：<http://www.rabbitmq.com/getstarted.html>

### Kafka

- **官网**：<https://kafka.apache.org/>

## 大数据

### Hadoop

- **官网**：<https://hadoop.apache.org/>
- **下载**：<https://hadoop.apache.org/releases.html>

### Spark

- **官网**：<https://spark.apache.org/>
- **文档**：<https://spark.apache.org/documentation.html>

### Flink

- **官网**：<https://flink.apache.org/>
- **GitHub**：<https://github.com/apache/flink>

## 搜索引擎

### Elasticsearch

- **官网**：<https://www.elastic.co/cn/elasticsearch/>

### Kibana

- **官网**：<https://www.elastic.co/cn/kibana>
- **说明**：至少需要 500M 内存，与 Elasticsearch 配合使用

### Solr

- **官网**：<https://solr.apache.org/>

## 存储

### FastDFS

- **GitHub**：<https://github.com/happyfish100/fastdfs>
- **场景**：小图片、音频、小视频等小文件存储
- **复杂场景**：推荐 [Ceph](https://ceph.com/)（支持对象/块/文件存储）

### Harbor

- **官网**：<https://goharbor.io/>
- **说明**：企业级容器镜像仓库

## 微服务

### Dubbo

- **官网**：<https://dubbo.apache.org/>

### SkyWalking

- **官网**：<https://skywalking.apache.org/>
- **GitHub**：<https://github.com/apache/skywalking>

## 文档管理

### Alfresco

- **官网**：<https://www.alfresco.com>
- **社区版**：<https://www.alfresco.com/alfresco-community-download>
- **说明**：企业文档管理系统，支持 Word/Excel/PDF 在线预览

### ShowDoc

- **官网**：<https://www.showdoc.com.cn/>
- **说明**：在线 API 文档、技术文档工具

## 其他

### Nginx

- **官网**：<http://nginx.org/en/>
- **Wiki**：<https://www.nginx.com/resources/wiki/>
- **模块**：<https://www.nginx.com/resources/wiki/modules/>

### Keepalived

- **官网**：<http://www.keepalived.org/>
- **下载**：<http://www.keepalived.org/download.html>

### Percona

- **官网**：<https://www.percona.com/>
- **说明**：MySQL 性能优化工具

### LDAP

- **参考**：<https://segmentfault.com/a/1190000002607140>

### wrk

- **GitHub**：<https://github.com/wg/wrk>
- **说明**：HTTP 压测工具，支持多线程，比 ab 有更大并发量

### RAP

- **GitHub**：<https://github.com/thx/RAP>
- **说明**：接口文档管理工具