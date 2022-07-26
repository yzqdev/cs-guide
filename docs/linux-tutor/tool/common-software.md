# 常用软件

## Alfresco 介绍

- 官网：<https://www.alfresco.com>
- 开源社区版下载：<https://www.alfresco.com/alfresco-community-download>
- 官网文档说明：<http://docs.alfresco.com/>
- 开源社区版本安装说明：<http://docs.alfresco.com/community/concepts/master-ch-install.html>
- Linux 版本安装说明：<http://docs.alfresco.com/community/tasks/simpleinstall-community-lin.html>
- 用来管理公司发布的文档，比如：Word、Excel、记事本等这类，该系统支持在线预览文件。

## Dubbo

## Nginx 说明

- Nginx 是一个很强大的高性能 Web 和反向代理服务器，常被我们用作负载均衡服务器，也可以作为邮件代理服务器
- Nginx WIKI：<https://zh.wikipedia.org/zh/Nginx>
- Nginx 百科：<http://baike.baidu.com/item/nginx>
- Nginx 官网：<http://nginx.org/en/>
- Nginx 官网下载：<http://nginx.org/en/download.html>
  - 源码包方式下载：<http://nginx.org/en/download.html>，注意该页面的：`Stable version`，这个表示稳定版本，2016-03-22 最新版本是：`nginx-1.8.1`，这是一个  **tar.gz** 的文件链接。
  - 构建包方式下载：<http://nginx.org/en/linux_packages.html#stable>
- Nginx 文档：
  - 优先：<https://www.nginx.com/resources/wiki/>
  - 次要：<http://nginx.org/en/docs/>
- Nginx 模块地址：<https://www.nginx.com/resources/wiki/modules/>

## SonarQube 基本概念

- 官网：<https://www.sonarqube.org/>
- 官网下载：<https://www.sonarqube.org/downloads/>
- Github 主页（主要是用 Java 开发）：<https://github.com/SonarSource/sonarqube>
- 主要支持的语言项目有：

```
C/C++
JavaScript
C#
Java
COBOL
TypeScript
PL/SQL
PL/I
PHP
ABAP
T-SQL
VB.NET
VB6
Python
RPG
Flex
Objective-C
Swift
Web（HTML and JSF/JSP）
XML
```

## GoAccess 安装和配置

- 一般用于  Apache, Nginx 的 Log 分析
- 官网：<https://goaccess.io/>
- 官网下载（201807 最新版本 1.2）：<https://goaccess.io/download>
- 官网 Github：<https://github.com/allinurl/goaccess>
- 国内中文站：<https://goaccess.cc/>

## Harbor 安装和配置

## OpenAPM 相关

- 目前市场工具一览：<https://openapm.io/landscape>
- 目前最活跃的标准：[OpenTracing](https://opentracing.io/)
- 现在比较活跃的应该是：
  - [Jaeger](https://www.jaegertracing.io/)
  - [SkyWalking](https://skywalking.apache.org/)

## 官网资料

- 当前时间：2019-05，最新版本：6.1
- 官网：<https://skywalking.apache.org/>
- 官网 Github：<https://github.com/apache/skywalking>
- 官网文档：<https://github.com/apache/skywalking/blob/master/docs/README.md>
- 官网下载：<http://skywalking.apache.org/downloads/>
  - 该网页显示：官网目前推荐的是通过源码构建出包，docker 镜像推荐
  - 源码构建方法：<https://github.com/apache/skywalking/blob/master/docs/en/guides/How-to-build.md>

## RabbitMQ 说明

- MQ 全称为 Message Queue, 消息队列（MQ）是一种应用程序对应用程序的通信方法。应用程序通过读写出入队列的消息（针对应用程序的数据）来通信，而无需专用连接来链接它们。
  - RabbitMQ 是一个在 AMQP 基础上完整的，可复用的企业消息系统。他遵循 Mozilla Public License 开源协议。
- RabbitMQ WIKI：<https://zh.wikipedia.org/zh/RabbitMQ>
- RabbitMQ 百科：<http://baike.baidu.com/view/4095865.htm>
- RabbitMQ 官网：<http://www.rabbitmq.com/>
- RabbitMQ 官网下载：<http://www.rabbitmq.com/download.html>
- RabbitMQ 官网安装文档：<http://www.rabbitmq.com/install-rpm.html>
- RabbitMQ 文档：
  - 优先：<http://www.rabbitmq.com/getstarted.html>
  - 次要：<http://www.rabbitmq.com/documentation.html>

## shodoc

<https://www.showdoc.com.cn/>

### 安装 Kibana

- 官网文档：<https://www.elastic.co/guide/en/kibana/current/getting-started.html>

- 至少需要 500M 内存
- 官网文档：<https://www.elastic.co/guide/en/kibana/current/install.html>
- 官网文档 CentOS：<https://www.elastic.co/guide/en/kibana/current/rpm.html>

## JMeter 介绍

- JMeter 用 Java 开发，需要 JDK 环境，当前最新版至少需要 JDK 8
- 官网：<https://jmeter.apache.org/>
- 官网下载：<https://jmeter.apache.org/download_jmeter.cgi>
- 官网插件库：<https://jmeter-plugins.org/wiki/Start/>
- 官网 Github 源码：<https://github.com/apache/jmeter>

## Spark 安装和配置

- 官网：<https://spark.apache.org/>
- 官网文档：<https://spark.apache.org/documentation.html>
- 官网下载：<https://spark.apache.org/downloads.html>
- 官网 Github：<https://github.com/apache/spark>

## FastDFS 介绍

- FastDFS 介绍：<http://www.oschina.net/p/fastdfs>
- 官网下载 1：<https://github.com/happyfish100/fastdfs/releases>
- 官网下载 2：<https://sourceforge.net/projects/fastdfs/files/>
- 官网下载 3：<http://code.google.com/p/fastdfs/downloads/list>
- 主要场景：
  - 小图片
  - 音频、小视频
  - 其他类型小文件
- 更加复杂的文件存储场景可以选择：[Ceph](https://ceph.com/)
  - 支持对象存储、块存储和文件存储
  - 高性能、高可靠性和高扩展

# Prometheus 安装和配置

- 不错的发展史说明：<https://caicloud.io/blog/5a5db4203255f5063f2bd462>
- 特别说明：一般这类环境要尽可能保证所有服务器时间一致
- Prometheus 本地存储不适合存长久数据，一般存储一个月就够了。要永久存储需要用到远端存储，远端存储可以用 OpenTSDB
- Prometheus 也不适合做日志存储，日志存储还是推荐 ELK 方案

## [solr](https://solr.apache.org/)

## [percona](https://www.percona.com/)

## Flink 安装和配置

- 官网：<https://flink.apache.org/>
- 官网 Github：<https://github.com/apache/flink>

## LDAP 基本概念

- <https://segmentfault.com/a/1190000002607140>
- <http://www.itdadao.com/articles/c15a1348510p0.html>
- <http://blog.csdn.net/reblue520/article/details/51804162>

## keepalived

- 官网：<http://www.keepalived.org/>
- 官网下载：<http://www.keepalived.org/download.html>
- 官网文档：<http://www.keepalived.org/documentation.html>

## Hadoop 说明

- Hadoop 官网：<https://hadoop.apache.org/>
- Hadoop 官网下载：<https://hadoop.apache.org/releases.html>

## Rap 说明

- 官网：<https://github.com/thx/RAP>
- 在线版：<http://rap.taobao.org/>
- 官网 Wiki：<https://github.com/thx/RAP/wiki/home_cn>
- 官网部署手册：<https://github.com/thx/RAP/wiki/deploy_manual_cn>
- 用户手册：<https://github.com/thx/RAP/wiki/user_manual_cn>

## Zabbix 说明

- Zabbix 是一个企业级的分布式开源监控方案，也是目前 Linux 最主流的监控方案。
- Zabbix 官网：<https://www.zabbix.com>
- Zabbix 官网的中文文档：<https://www.zabbix.com/documentation/3.4/zh/manual/introduction/about>

## wrk 说明

- wrk 相对于 ab 来说最大的优点是它支持多线程，可以有更大的并发量
- 官网说明：<https://github.com/wg/wrk/wiki/Installing-Wrk-on-Linux>
