import{_ as a,r as i,c as r,a as t,e,b as l,w as n,d as o,o as u}from"./app-CbULZrmi.js";const g={},c=o('<h1 id="logstash-知识" tabindex="-1"><a class="header-anchor" href="#logstash-知识"><span>Logstash 知识</span></a></h1><h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识"><span>基础知识</span></a></h2><ul><li>基于 ruby 写的</li><li>官网文档：<a href="https://www.elastic.co/guide/en/logstash/5.2/first-event.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/5.2/first-event.html</a></li><li>如果是通过网络来收集，并不需要所有机子都装，但是如果是要通过读取文件来收集，那文件所在的那个机子就的安装</li><li>配置文件的写法格式：<a href="https://www.elastic.co/guide/en/logstash/5.2/configuration-file-structure.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/5.2/configuration-file-structure.html</a></li></ul><h3 id="logstash-5-5-0-安装" tabindex="-1"><a class="header-anchor" href="#logstash-5-5-0-安装"><span>logstash 5.5.0 安装</span></a></h3>',4),h=t("li",null,[e("安装："),t("code",null,"yum install -y logstash")],-1),d=o(`<h3 id="logstash-2-4-1-安装" tabindex="-1"><a class="header-anchor" href="#logstash-2-4-1-安装"><span>logstash 2.4.1 安装</span></a></h3><ul><li>logstash 基于 ruby，也需要 JDK 环境</li><li>如果是通过网络来收集，并不需要所有机子都装，但是如果是要通过读取文件来收集，那文件所在的那个机子就的安装 logstash</li><li>安装： <ul><li>切换到存放目录：<code>cd /usr/program/elk</code></li><li>解压：<code>tar zxvf logstash-2.4.1.tar.gz</code></li></ul></li><li>切换到 root 用户下，启动 logstash</li><li>带控制台的启动（比较慢）进行最简单的 hello world 测试：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -e &#39;input { stdin { } } output { stdout { codec =&gt; rubydebug} }&#39;</code><ul><li>启动后显示如下内容：</li></ul></li></ul><pre><code class="language-nginx">Settings: Default pipeline workers: 1
Pipeline main started
</code></pre><ul><li>然后此时的光标是为可输入状态，我们输入：hello world 回车，然后应该会得到这样的结果：</li></ul><pre><code class="language-json">{
       &quot;message&quot; =&gt; &quot;hello world&quot;,
      &quot;@version&quot; =&gt; &quot;1&quot;,
    &quot;@timestamp&quot; =&gt; &quot;2017-03-14T06:56:44.690Z&quot;,
          &quot;host&quot; =&gt; &quot;youmeeklocalhost&quot;
}
</code></pre><ul><li>现在进一步加深，把控制台输入的内容放在 elasticsearch 索引中</li><li>记得先切换到 elasticsearch 用户下，然后先启动 elasticsearch。先确保 elasticsearch 集群是启动的。</li><li>带控制台的启动（比较慢）：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -e &#39;input { stdin { } } output { elasticsearch { hosts =&gt; [&quot;192.168.1.127:9200&quot;] } }&#39;</code><ul><li>启动后显示如下内容：</li></ul></li></ul><pre><code class="language-nginx">Settings: Default pipeline workers: 1
Pipeline main started
</code></pre><ul><li>然后此时的光标是为可输入状态，我们输入任意内容回车，然后访问 elasticsearch 的 head 插件控制台：<code>http://192.168.1.127:9200/_plugin/head/</code></li><li>然后你可以看到有一个类似这样的名称格式的索引：<code>logstash-2017.03.14</code>，这一步必须有，等下 kibana 会用到这个索引</li></ul><h2 id="配置文件中的-filter-讲解" tabindex="-1"><a class="header-anchor" href="#配置文件中的-filter-讲解"><span>配置文件中的 Filter 讲解</span></a></h2><ul><li>grok 比较耗 CPU 能少用就尽量少用</li><li>主要讲解 grok 这个插件，官网资料：<a href="https://www.elastic.co/guide/en/logstash/5.2/plugins-filters-grok.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/5.2/plugins-filters-grok.html</a></li><li>官网给我们整理的 120 个正则表达式变量：<a href="https://github.com/logstash-plugins/logstash-patterns-core/tree/master/patterns" target="_blank" rel="noopener noreferrer">https://github.com/logstash-plugins/logstash-patterns-core/tree/master/patterns</a><ul><li>内置的变量格式为，eg：<code>%{IP}</code></li><li>而这个格式 <code>%{IP:client}</code> 表示把日志中匹配 IP 格式的内容存储到 ES 中的 client 域（字段）中，这样 ES 界面就有单独字段查看，方便。</li></ul></li><li>安装完 logstash 本地也是有这些文件的，路径：<code>/usr/program/elk/logstash-2.4.1/vendor/bundle/jruby/1.9/gems/logstash-patterns-core-2.0.5/patterns</code></li><li>官网简单的日志讲解：</li><li><strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/filter-grok-test.conf</code>：</li></ul><pre><code class="language-nginx">input {
	stdin {
	
	}
}

filter {
	grok {
		match =&gt; { &quot;message&quot; =&gt; &quot;%{IP:client} %{WORD:method} %{URIPATHPARAM:request} %{NUMBER:bytes} %{NUMBER:duration}&quot; }
	}
}

output {
	elasticsearch { 
		hosts =&gt; [&quot;192.168.1.127:9200&quot;]
		index =&gt; &quot;filter-grok-test&quot;
	}
}
</code></pre><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/filter-grok-test.conf</code><ul><li>然后我们在交互界面中分别输入下面内容： <ul><li><code>55.3.244.1 GET /index.html 15824 0.043</code></li><li><code>125.4.234.22 GET /GitNavi.html 124 0.13</code></li></ul></li><li>然后你开始关注 elasticsearch 集群的索引变化。</li></ul></li></ul><h2 id="配置文件中的-multiline-多行内容收集插件讲解" tabindex="-1"><a class="header-anchor" href="#配置文件中的-multiline-多行内容收集插件讲解"><span>配置文件中的 multiline 多行内容收集插件讲解</span></a></h2><ul><li>配置的格式如下：</li><li>在 file 中的：<code>codec =&gt; multiline</code></li></ul><pre><code class="language-nginx">input {
	file {
		path =&gt; [&quot;/usr/program/tomcat8/logs/logbackOutFile.log.*.log&quot;]
		type =&gt; &quot;tomcat-log&quot;
		start_position =&gt; &quot;beginning&quot;
		codec =&gt; multiline {
		    pattern =&gt; &quot;^\\[&quot;
		    negate =&gt; true
		    what =&gt; &quot;previous&quot;
		}
	}
}

output {
	if [type] == &quot;tomcat-log&quot; {
		elasticsearch { 
			hosts =&gt; [&quot;192.168.1.127:9200&quot;]
			index =&gt; &quot;tomcat-log-%{+YYYY.MM.dd}&quot;
		}
	}
}
</code></pre><h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例"><span>案例</span></a></h2><h3 id="测试模式" tabindex="-1"><a class="header-anchor" href="#测试模式"><span>测试模式</span></a></h3><h4 id="自己写正则表达式-匹配后输出到控制台先看下" tabindex="-1"><a class="header-anchor" href="#自己写正则表达式-匹配后输出到控制台先看下"><span>自己写正则表达式，匹配后输出到控制台先看下：</span></a></h4><ul><li>新建目录（如果存在就不用）：<code>mkdir -p /usr/program/elk/logstash-2.4.1/config</code></li><li><strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/regexp-test.conf</code>：</li></ul><pre><code class="language-nginx">input {
	stdin {
		codec =&gt; multiline {
			pattern =&gt; &quot;^\\[&quot;
			negate =&gt; true
			what =&gt; &quot;previous&quot;
		}
	}
}

output {
	stdout { 
		codec =&gt; &quot;rubydebug&quot;
	}
}
</code></pre><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/regexp-test.conf</code></li></ul><h4 id="读取文件-输出到控制台先看下" tabindex="-1"><a class="header-anchor" href="#读取文件-输出到控制台先看下"><span>读取文件，输出到控制台先看下：</span></a></h4><ul><li>新建目录（如果存在就不用）：<code>mkdir -p /usr/program/elk/logstash-2.4.1/config</code></li><li><strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/file-test.conf</code>：</li></ul><pre><code class="language-nginx">input {
	file {
		path =&gt; [&quot;/var/log/nginx/access.log&quot;]
		type =&gt; &quot;nginx-access-log&quot;
		start_position =&gt; &quot;beginning&quot;
	}
}

output {
	stdout { 
		codec =&gt; &quot;rubydebug&quot;
	}
}
</code></pre><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/regexp-test.conf</code></li></ul><h3 id="nginx-日志收集" tabindex="-1"><a class="header-anchor" href="#nginx-日志收集"><span>Nginx 日志收集</span></a></h3>`,26),q=t("li",null,[e("机子：192.168.1.121 "),t("ul",null,[t("li",null,[e("Nginx 日志位置： "),t("ul",null,[t("li",null,[t("code",null,"/var/log/nginx/access.log")]),t("li",null,[t("code",null,"/var/log/nginx/error.log")])])])])],-1),p=t("li",null,[e("新建目录（如果存在就不用）："),t("code",null,"mkdir -p /usr/program/elk/logstash-2.4.1/config")],-1),m=t("li",null,[t("strong",null,"新建"),e(" 配置文件："),t("code",null,"vim /usr/program/elk/logstash-2.4.1/config/nginx.conf"),e("：")],-1),f=o(`<pre><code class="language-nginx">input {
	file {
		path =&gt; [&quot;/var/log/nginx/access.log&quot;]
		type =&gt; &quot;nginx-access-log&quot;
		start_position =&gt; &quot;beginning&quot;
	}
	
	file {
		path =&gt; [&quot;/var/log/nginx/error.log&quot;]
		type =&gt; &quot;nginx-error-log&quot;
		start_position =&gt; &quot;beginning&quot;
	}
}

output {
	if [type] == &quot;nginx-access-log&quot; {
		elasticsearch { 
			hosts =&gt; [&quot;192.168.1.127:9200&quot;]
			index =&gt; &quot;nginx-access-log&quot;
		}
	}
	
	if [type] == &quot;nginx-error-log&quot; {
		elasticsearch { 
			hosts =&gt; [&quot;192.168.1.127:9200&quot;]
			index =&gt; &quot;nginx-error-log&quot;
		}
	}
}
</code></pre><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/nginx.conf</code></li><li>然后你开始访问 nginx，再关注 elasticsearch 集群的索引变化，如果有新增索引那就表示可以了。</li></ul><h4 id="进一步优化-把-nginx-的日志输出格式改为-json" tabindex="-1"><a class="header-anchor" href="#进一步优化-把-nginx-的日志输出格式改为-json"><span>进一步优化：把 nginx 的日志输出格式改为 json</span></a></h4><ul><li>配置 nginx 访问日志的输出格式：<code>vim /usr/local/nginx/conf/nginx.conf</code></li></ul><pre><code class="language-nginx">user root;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;
    
    log_format json &#39;{&quot;@timestamp&quot;:&quot;$time_iso8601&quot;,&#39;
                     &#39;&quot;host&quot;:&quot;$server_addr&quot;,&#39;
                     &#39;&quot;clientip&quot;:&quot;$remote_addr&quot;,&#39;
                     &#39;&quot;size&quot;:$body_bytes_sent,&#39;
                     &#39;&quot;responsetime&quot;:$request_time,&#39;
                     &#39;&quot;upstreamtime&quot;:&quot;$upstream_response_time&quot;,&#39;
                     &#39;&quot;upstreamhost&quot;:&quot;$upstream_addr&quot;,&#39;
                     &#39;&quot;http_host&quot;:&quot;$host&quot;,&#39;
                     &#39;&quot;url&quot;:&quot;$uri&quot;,&#39;
                     &#39;&quot;xff&quot;:&quot;$http_x_forwarded_for&quot;,&#39;
                     &#39;&quot;referer&quot;:&quot;$http_referer&quot;,&#39;
                     &#39;&quot;agent&quot;:&quot;$http_user_agent&quot;,&#39;
                     &#39;&quot;status&quot;:&quot;$status&quot;}&#39;;
	#全局日志
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    server {
        listen       80;
        server_name  localhost;
		
		# 针对服务的日志输出
		access_log /var/log/nginx/access-json.log json;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
</code></pre><ul><li>修改 Logstash 的收集</li><li><strong>编辑</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/nginx.conf</code>：</li></ul><pre><code class="language-nginx">input {
	file {
		path =&gt; [&quot;/var/log/nginx/access-json.log&quot;]
		codec =&gt; json
		type =&gt; &quot;nginx-access-json-log&quot;
		start_position =&gt; &quot;beginning&quot;
	}

}

output {
	if [type] == &quot;nginx-access-json-log&quot; {
		elasticsearch { 
			hosts =&gt; [&quot;192.168.1.127:9200&quot;]
			index =&gt; &quot;nginx-access-json-log&quot;
		}
	}
}
</code></pre><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/nginx.conf</code></li><li>然后你开始访问 nginx，再关注 elasticsearch 集群的索引变化，如果有新增索引那就表示可以了。</li></ul><h3 id="tomcat-日志收集" tabindex="-1"><a class="header-anchor" href="#tomcat-日志收集"><span>Tomcat 日志收集</span></a></h3>`,9),b=t("li",null,[e("机子：192.168.1.121 "),t("ul",null,[t("li",null,[e("Tomcat 日志位置："),t("code",null,"/usr/program/tomcat8/logs")])])],-1),_=t("li",null,[e("新建目录（如果存在就不用）："),t("code",null,"mkdir -p /usr/program/elk/logstash-2.4.1/config")],-1),x=t("li",null,[t("strong",null,"新建"),e(" 配置文件："),t("code",null,"vim /usr/program/elk/logstash-2.4.1/config/tomcat.conf"),e("：")],-1),k=o(`<pre><code class="language-nginx">input {
	file {
		path =&gt; [&quot;/usr/program/tomcat8/logs/logbackOutFile.log.*.log&quot;]
		type =&gt; &quot;tomcat-log&quot;
		start_position =&gt; &quot;beginning&quot;
		codec =&gt; multiline {
		    pattern =&gt; &quot;^\\[&quot;
		    negate =&gt; true
		    what =&gt; &quot;previous&quot;
		}
	}
}

output {
	if [type] == &quot;tomcat-log&quot; {
		elasticsearch { 
			hosts =&gt; [&quot;192.168.1.127:9200&quot;]
			index =&gt; &quot;tomcat-log-%{+YYYY.MM.dd}&quot;
		}
	}
}
</code></pre><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/tomcat.conf</code></li><li>然后你开始访问 nginx，再关注 elasticsearch 集群的索引变化，如果有新增索引那就表示可以了。</li></ul><h3 id="mysql-慢-sql-日志收集" tabindex="-1"><a class="header-anchor" href="#mysql-慢-sql-日志收集"><span>MySQL 慢 SQL 日志收集</span></a></h3><ul><li>其他的细节都跟上面一样不多说了，配置文件这里需要用到 grok 进行正则的拆分</li><li>这里有资料，我觉得别人已经说得很好了（Google 关键字：<code>grok mysql slow</code>）： <ul><li><a href="http://soft.dog/2016/01/30/logstash-mysql-slow-log/" target="_blank" rel="noopener noreferrer">http://soft.dog/2016/01/30/logstash-mysql-slow-log/</a></li><li><a href="https://kibana.logstash.es/content/logstash/examples/mysql-slow.html" target="_blank" rel="noopener noreferrer">https://kibana.logstash.es/content/logstash/examples/mysql-slow.html</a></li><li><a href="https://leejo.github.io/2013/11/21/parsing_mysql_slow_query_log_with_logstash/" target="_blank" rel="noopener noreferrer">https://leejo.github.io/2013/11/21/parsing_mysql_slow_query_log_with_logstash/</a></li><li><a href="https://www.phase2technology.com/blog/adding-mysql-slow-query-logs-to-logstash/" target="_blank" rel="noopener noreferrer">https://www.phase2technology.com/blog/adding-mysql-slow-query-logs-to-logstash/</a></li><li><a href="https://discuss.elastic.co/t/grok-filter-for-mysql-slow-logs-produces-grokparsefailure-but-passes-tests/55799" target="_blank" rel="noopener noreferrer">https://discuss.elastic.co/t/grok-filter-for-mysql-slow-logs-produces-grokparsefailure-but-passes-tests/55799</a></li></ul></li></ul><pre><code>&quot;(?m)^#\\s+User@Host:\\s+%{USER:user}\\[[^\\]]+\\]\\s+@\\s+%{USER:clienthost}\\s+\\[(?:%{IP:clientip})?\\]\\s+Id:\\s+%{NUMBER:id:int}\\n#\\s+Schema:\\s+%{USER:schema}\\s+Last_errno:\\s+%{NUMBER:lasterrorno:int}\\s+Killed:\\s+%{NUMBER:killedno:int}\\n#\\s+Query_time:\\s+%{NUMBER:query_time:float}\\s+Lock_time:\\s+%{NUMBER:lock_time:float}\\s+Rows_sent:\\s+%{NUMBER:rows_sent:int}\\s+Rows_examined:\\s+%{NUMBER:rows_examined:int}\\s+Rows_affected:\\s+%{NUMBER:rows_affected:int}\\n#\\s+Bytes_sent:\\s+%{NUMBER:bytes_sent:int}\\n\\s*(?:use\\s+%{USER:usedatabase};\\s*\\n)?SET\\s+timestamp=%{NUMBER:timestamp};\\n\\s*(?&lt;query&gt;(?&lt;action&gt;\\w+)\\b.*)\\s*(?:\\n#\\s+Time)?.*$&quot;
</code></pre><h3 id="logstash-不直接写到-es-先写到-redis-再写到-es" tabindex="-1"><a class="header-anchor" href="#logstash-不直接写到-es-先写到-redis-再写到-es"><span>Logstash 不直接写到 ES 先写到 Redis 再写到 ES</span></a></h3><ul><li>官网 Redis 插件使用说明：<a href="https://www.elastic.co/guide/en/logstash/2.4/plugins-inputs-redis.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/2.4/plugins-inputs-redis.html</a></li></ul><h4 id="一台-logstash-把数据写到-redis" tabindex="-1"><a class="header-anchor" href="#一台-logstash-把数据写到-redis"><span>一台 Logstash 把数据写到 Redis</span></a></h4><ul><li>Redis 机器 IP：192.168.1.125</li><li>Logstash 机器 IP：192.168.1.121</li><li>Logstash 机器 <strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/redis-test.conf</code>：</li></ul><pre><code class="language-nginx">input {
	stdin {
		
	}
}

output {
	redis {
		host =&gt; &quot;192.168.1.125&quot;
		port =&gt; &quot;6379&quot;
		db =&gt; &quot;2&quot;
		data_type =&gt; &quot;list&quot;
		key =&gt; &quot;gitnavi-logstash-info&quot;
	}
}
</code></pre><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/redis-test.conf</code><ul><li>然后我们在交互界面中分别输入下面内容：</li><li><code>hello</code> 回车</li><li><code>world</code> 回车</li></ul></li><li>进入 Redis 机器上的数据： <ul><li>进入 redis 交互端：<code>redis-cli</code></li><li>查询 db2：<code>select 2</code></li><li>查询 db2 下的所有内容：<code>keys *</code>，可以看到有一个：&quot;gitnavi-logstash-info&quot;</li><li>查询该 list 类型的数据：<code>LRANGE gitnavi-logstash-info 0 1</code>，正常可以得到这样的数据</li></ul></li></ul><pre><code class="language-json">1) &quot;{\\&quot;message\\&quot;:\\&quot;hello\\&quot;,\\&quot;@version\\&quot;:\\&quot;1\\&quot;,\\&quot;@timestamp\\&quot;:\\&quot;2017-03-15T15:23:35.064Z\\&quot;,\\&quot;host\\&quot;:\\&quot;youmeekhost\\&quot;}&quot;
2) &quot;{\\&quot;message\\&quot;:\\&quot;world\\&quot;,\\&quot;@version\\&quot;:\\&quot;1\\&quot;,\\&quot;@timestamp\\&quot;:\\&quot;2017-03-15T15:23:37.245Z\\&quot;,\\&quot;host\\&quot;:\\&quot;youmeekhost\\&quot;}&quot;
</code></pre><h4 id="一台-logstash-把数据从-redis-读取出来写到-es" tabindex="-1"><a class="header-anchor" href="#一台-logstash-把数据从-redis-读取出来写到-es"><span>一台 Logstash 把数据从 Redis 读取出来写到 ES</span></a></h4><ul><li>Redis 机器 IP：192.168.1.125</li><li>Logstash 机器 IP：192.168.1.125</li><li>Logstash 机器 <strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/redis-test.conf</code>：</li></ul><pre><code class="language-nginx">input {
	redis {
		type =&gt; &quot;redis-log&quot;
		host =&gt; &quot;192.168.1.125&quot;
		port =&gt; &quot;6379&quot;
		db =&gt; &quot;2&quot;
		data_type =&gt; &quot;list&quot;
		key =&gt; &quot;gitnavi-logstash-info&quot;
	}
}

output {
	if [type] == &quot;redis-log&quot; {
		elasticsearch {
	        hosts =&gt; [&quot;192.168.1.127:9200&quot;]
	        index =&gt; &quot;redis-log&quot;
	    }
    }
}
</code></pre><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/redis-test.conf</code></li><li>然后现在在 Logstash 机器 IP：192.168.1.121 上继续输入一些内容，看下 ES 集群是否有对应的索引创建。</li></ul><h3 id="logstash-不直接写到-es-先写到-mq-再写到-es" tabindex="-1"><a class="header-anchor" href="#logstash-不直接写到-es-先写到-mq-再写到-es"><span>Logstash 不直接写到 ES 先写到 MQ 再写到 ES</span></a></h3><ul><li>官网 RabbitMQ 插件使用说明：<a href="https://www.elastic.co/guide/en/logstash/2.4/plugins-inputs-rabbitmq.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/2.4/plugins-inputs-rabbitmq.html</a></li></ul><h4 id="一台-logstash-把数据写到-rabbitmq" tabindex="-1"><a class="header-anchor" href="#一台-logstash-把数据写到-rabbitmq"><span>一台 Logstash 把数据写到 rabbitMQ</span></a></h4><pre><code class="language-nginx">input {
	file {
		path =&gt; &quot;/usr/local/tomcat/logs/tomcat_json.log&quot;
		codec =&gt; &quot;json&quot;
		type =&gt; &quot;tomcat&quot;
	}
}

output {
	rabbitmq { 
		host =&gt; &quot;RabbitMQ_server&quot;
		port =&gt; &quot;5672&quot;
		vhost =&gt; &quot;elk&quot;
		exchange =&gt; &quot;elk_exchange&quot;
		exchange_type =&gt; &quot;direct&quot;
		key =&gt; &quot;elk_key&quot;
		user =&gt; &quot;liang&quot;
		password =&gt; &quot;liang123&quot;
	}
	stdout { 
		codec =&gt; rubydebug 
	}
}
</code></pre><h4 id="一台-logstash-把数据从-rabbitmq-读取出来写到-es-还未测试" tabindex="-1"><a class="header-anchor" href="#一台-logstash-把数据从-rabbitmq-读取出来写到-es-还未测试"><span>一台 Logstash 把数据从 rabbitMQ 读取出来写到 ES （还未测试）</span></a></h4><pre><code class="language-nginx">input {
	rabbitmq {
		host =&gt; &quot;127.0.0.1&quot;
		subscription_retry_interval_seconds =&gt; &quot;5&quot;
		vhost =&gt; &quot;elk&quot;
		exchange =&gt; &quot;elk_exchange&quot;
		queue =&gt; &quot;elk_queue&quot;
		durable =&gt; &quot;true&quot;
		key =&gt; &quot;elk_key&quot;
		user =&gt; &quot;liang&quot;
		password =&gt; &quot;liang123&quot;
	}
}

output {

	if [type] == &quot;nginx&quot; {
		elasticsearch {
			hosts =&gt; &quot;192.168.1.127:9200&quot;
			user =&gt; &quot;logstash&quot;
			password =&gt; &quot;123456&quot;
			index =&gt; &quot;nginx-%{+YYYY.MM.dd}&quot;
		}
	}
	
	if [type] == &quot;tomcat&quot; {
		elasticsearch {
			hosts =&gt; &quot;192.168.1.127:9200&quot;
			user =&gt; &quot;logstash&quot;
			password =&gt; &quot;123456&quot;
			index =&gt; &quot;tomcat-%{+YYYY.MM.dd}&quot;
		}
	}

	stdout { 
		codec =&gt; rubydebug 
	}
}
</code></pre><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="https://liang178.github.io/2016/08/11/elk+rabbitmq/" target="_blank" rel="noopener noreferrer">https://liang178.github.io/2016/08/11/elk+rabbitmq/</a></li></ul>`,24);function y(w,v){const s=i("RouteLink");return u(),r("div",null,[c,t("ul",null,[t("li",null,[e("假设你已经看了 Elasticsearch 专题文，并且设置了仓库地址："),l(s,{to:"/linux-tutor/server/Elasticsearch-Base.html"},{default:n(()=>[e("Elasticsearch 相关知识")]),_:1})]),h]),d,t("ul",null,[q,t("li",null,[e("安装 Logstash 过程请看："),l(s,{to:"/linux-tutor/server/ELK-Install-And-Settings.html"},{default:n(()=>[e("ELK 日志收集系统安装和配置")]),_:1})]),p,m]),f,t("ul",null,[b,t("li",null,[e("安装 Logstash 过程请看："),l(s,{to:"/linux-tutor/server/ELK-Install-And-Settings.html"},{default:n(()=>[e("ELK 日志收集系统安装和配置")]),_:1})]),_,x]),k])}const E=a(g,[["render",y],["__file","Logstash-Base.html.vue"]]),R=JSON.parse('{"path":"/linux-tutor/server/Logstash-Base.html","title":"Logstash 知识","lang":"zh-CN","frontmatter":{"description":"Logstash 知识 基础知识 基于 ruby 写的 官网文档：https://www.elastic.co/guide/en/logstash/5.2/first-event.html 如果是通过网络来收集，并不需要所有机子都装，但是如果是要通过读取文件来收集，那文件所在的那个机子就的安装 配置文件的写法格式：https://www.elastic...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Logstash-Base.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Logstash 知识"}],["meta",{"property":"og:description","content":"Logstash 知识 基础知识 基于 ruby 写的 官网文档：https://www.elastic.co/guide/en/logstash/5.2/first-event.html 如果是通过网络来收集，并不需要所有机子都装，但是如果是要通过读取文件来收集，那文件所在的那个机子就的安装 配置文件的写法格式：https://www.elastic..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-04T21:01:43.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-04T21:01:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Logstash 知识\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-04T21:01:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"基础知识","slug":"基础知识","link":"#基础知识","children":[{"level":3,"title":"logstash 5.5.0 安装","slug":"logstash-5-5-0-安装","link":"#logstash-5-5-0-安装","children":[]},{"level":3,"title":"logstash 2.4.1 安装","slug":"logstash-2-4-1-安装","link":"#logstash-2-4-1-安装","children":[]}]},{"level":2,"title":"配置文件中的 Filter 讲解","slug":"配置文件中的-filter-讲解","link":"#配置文件中的-filter-讲解","children":[]},{"level":2,"title":"配置文件中的 multiline 多行内容收集插件讲解","slug":"配置文件中的-multiline-多行内容收集插件讲解","link":"#配置文件中的-multiline-多行内容收集插件讲解","children":[]},{"level":2,"title":"案例","slug":"案例","link":"#案例","children":[{"level":3,"title":"测试模式","slug":"测试模式","link":"#测试模式","children":[{"level":4,"title":"自己写正则表达式，匹配后输出到控制台先看下：","slug":"自己写正则表达式-匹配后输出到控制台先看下","link":"#自己写正则表达式-匹配后输出到控制台先看下","children":[]},{"level":4,"title":"读取文件，输出到控制台先看下：","slug":"读取文件-输出到控制台先看下","link":"#读取文件-输出到控制台先看下","children":[]}]},{"level":3,"title":"Nginx 日志收集","slug":"nginx-日志收集","link":"#nginx-日志收集","children":[{"level":4,"title":"进一步优化：把 nginx 的日志输出格式改为 json","slug":"进一步优化-把-nginx-的日志输出格式改为-json","link":"#进一步优化-把-nginx-的日志输出格式改为-json","children":[]}]},{"level":3,"title":"Tomcat 日志收集","slug":"tomcat-日志收集","link":"#tomcat-日志收集","children":[]},{"level":3,"title":"MySQL 慢 SQL 日志收集","slug":"mysql-慢-sql-日志收集","link":"#mysql-慢-sql-日志收集","children":[]},{"level":3,"title":"Logstash 不直接写到 ES 先写到 Redis 再写到 ES","slug":"logstash-不直接写到-es-先写到-redis-再写到-es","link":"#logstash-不直接写到-es-先写到-redis-再写到-es","children":[{"level":4,"title":"一台 Logstash 把数据写到 Redis","slug":"一台-logstash-把数据写到-redis","link":"#一台-logstash-把数据写到-redis","children":[]},{"level":4,"title":"一台 Logstash 把数据从 Redis 读取出来写到 ES","slug":"一台-logstash-把数据从-redis-读取出来写到-es","link":"#一台-logstash-把数据从-redis-读取出来写到-es","children":[]}]},{"level":3,"title":"Logstash 不直接写到 ES 先写到 MQ 再写到 ES","slug":"logstash-不直接写到-es-先写到-mq-再写到-es","link":"#logstash-不直接写到-es-先写到-mq-再写到-es","children":[{"level":4,"title":"一台 Logstash 把数据写到 rabbitMQ","slug":"一台-logstash-把数据写到-rabbitmq","link":"#一台-logstash-把数据写到-rabbitmq","children":[]},{"level":4,"title":"一台 Logstash 把数据从 rabbitMQ 读取出来写到 ES （还未测试）","slug":"一台-logstash-把数据从-rabbitmq-读取出来写到-es-还未测试","link":"#一台-logstash-把数据从-rabbitmq-读取出来写到-es-还未测试","children":[]}]}]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1654376503000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":7.04,"words":2112},"filePathRelative":"linux-tutor/server/Logstash-Base.md","localizedDate":"2022年5月26日","autoDesc":true}');export{E as comp,R as data};
