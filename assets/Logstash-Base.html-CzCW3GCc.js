import{_ as p,c as o,a as e,b as n,e as a,d as l,w as i,r as c,o as u}from"./app-B6vXTniy.js";const r={};function d(v,s){const t=c("RouteLink");return u(),o("div",null,[s[13]||(s[13]=e('<h1 id="logstash-知识" tabindex="-1"><a class="header-anchor" href="#logstash-知识"><span>Logstash 知识</span></a></h1><h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识"><span>基础知识</span></a></h2><ul><li>基于 ruby 写的</li><li>官网文档：<a href="https://www.elastic.co/guide/en/logstash/5.2/first-event.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/5.2/first-event.html</a></li><li>如果是通过网络来收集，并不需要所有机子都装，但是如果是要通过读取文件来收集，那文件所在的那个机子就的安装</li><li>配置文件的写法格式：<a href="https://www.elastic.co/guide/en/logstash/5.2/configuration-file-structure.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/5.2/configuration-file-structure.html</a></li></ul><h3 id="logstash-5-5-0-安装" tabindex="-1"><a class="header-anchor" href="#logstash-5-5-0-安装"><span>logstash 5.5.0 安装</span></a></h3>',4)),n("ul",null,[n("li",null,[s[1]||(s[1]=a("假设你已经看了 Elasticsearch 专题文，并且设置了仓库地址：",-1)),l(t,{to:"/linux-tutor/server/Elasticsearch-Base.html"},{default:i(()=>[...s[0]||(s[0]=[a("Elasticsearch 相关知识",-1)])]),_:1})]),s[2]||(s[2]=n("li",null,[a("安装："),n("code",null,"yum install -y logstash")],-1))]),s[14]||(s[14]=e(`<h3 id="logstash-2-4-1-安装" tabindex="-1"><a class="header-anchor" href="#logstash-2-4-1-安装"><span>logstash 2.4.1 安装</span></a></h3><ul><li>logstash 基于 ruby，也需要 JDK 环境</li><li>如果是通过网络来收集，并不需要所有机子都装，但是如果是要通过读取文件来收集，那文件所在的那个机子就的安装 logstash</li><li>安装： <ul><li>切换到存放目录：<code>cd /usr/program/elk</code></li><li>解压：<code>tar zxvf logstash-2.4.1.tar.gz</code></li></ul></li><li>切换到 root 用户下，启动 logstash</li><li>带控制台的启动（比较慢）进行最简单的 hello world 测试：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -e &#39;input { stdin { } } output { stdout { codec =&gt; rubydebug} }&#39;</code><ul><li>启动后显示如下内容：</li></ul></li></ul><div class="language-nginx" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line">Settings: Default pipeline workers: 1</span>
<span class="line">Pipeline main started</span>
<span class="line"></span></code></pre></div><ul><li>然后此时的光标是为可输入状态，我们输入：hello world 回车，然后应该会得到这样的结果：</li></ul><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">       <span class="token string">&quot;message&quot;</span> =&gt; <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;@version&quot;</span> =&gt; <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;@timestamp&quot;</span> =&gt; <span class="token string">&quot;2017-03-14T06:56:44.690Z&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string">&quot;host&quot;</span> =&gt; <span class="token string">&quot;youmeeklocalhost&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ul><li>现在进一步加深，把控制台输入的内容放在 elasticsearch 索引中</li><li>记得先切换到 elasticsearch 用户下，然后先启动 elasticsearch。先确保 elasticsearch 集群是启动的。</li><li>带控制台的启动（比较慢）：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -e &#39;input { stdin { } } output { elasticsearch { hosts =&gt; [&quot;192.168.1.127:9200&quot;] } }&#39;</code><ul><li>启动后显示如下内容：</li></ul></li></ul><div class="language-nginx" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line">Settings: Default pipeline workers: 1</span>
<span class="line">Pipeline main started</span>
<span class="line"></span></code></pre></div><ul><li>然后此时的光标是为可输入状态，我们输入任意内容回车，然后访问 elasticsearch 的 head 插件控制台：<code>http://192.168.1.127:9200/_plugin/head/</code></li><li>然后你可以看到有一个类似这样的名称格式的索引：<code>logstash-2017.03.14</code>，这一步必须有，等下 kibana 会用到这个索引</li></ul><h2 id="配置文件中的-filter-讲解" tabindex="-1"><a class="header-anchor" href="#配置文件中的-filter-讲解"><span>配置文件中的 Filter 讲解</span></a></h2><ul><li>grok 比较耗 CPU 能少用就尽量少用</li><li>主要讲解 grok 这个插件，官网资料：<a href="https://www.elastic.co/guide/en/logstash/5.2/plugins-filters-grok.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/5.2/plugins-filters-grok.html</a></li><li>官网给我们整理的 120 个正则表达式变量：<a href="https://github.com/logstash-plugins/logstash-patterns-core/tree/master/patterns" target="_blank" rel="noopener noreferrer">https://github.com/logstash-plugins/logstash-patterns-core/tree/master/patterns</a><ul><li>内置的变量格式为，eg：<code>%{IP}</code></li><li>而这个格式 <code>%{IP:client}</code> 表示把日志中匹配 IP 格式的内容存储到 ES 中的 client 域（字段）中，这样 ES 界面就有单独字段查看，方便。</li></ul></li><li>安装完 logstash 本地也是有这些文件的，路径：<code>/usr/program/elk/logstash-2.4.1/vendor/bundle/jruby/1.9/gems/logstash-patterns-core-2.0.5/patterns</code></li><li>官网简单的日志讲解：</li><li><strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/filter-grok-test.conf</code>：</li></ul><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">stdin</span></span> <span class="token punctuation">{</span></span>
<span class="line">	</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">filter</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">grok</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">match</span> =&gt;</span> <span class="token punctuation">{</span> &quot;message&quot; =&gt; &quot;%<span class="token punctuation">{</span>IP:client<span class="token punctuation">}</span> %<span class="token punctuation">{</span>WORD:method<span class="token punctuation">}</span> %<span class="token punctuation">{</span>URIPATHPARAM:request<span class="token punctuation">}</span> %<span class="token punctuation">{</span>NUMBER:bytes<span class="token punctuation">}</span> %<span class="token punctuation">{</span>NUMBER:duration<span class="token punctuation">}</span>&quot; <span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span> </span>
<span class="line">		hosts =&gt; [&quot;192.168.1.127:9200&quot;]</span>
<span class="line">		index =&gt; &quot;filter-grok-test&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/filter-grok-test.conf</code><ul><li>然后我们在交互界面中分别输入下面内容： <ul><li><code>55.3.244.1 GET /index.html 15824 0.043</code></li><li><code>125.4.234.22 GET /GitNavi.html 124 0.13</code></li></ul></li><li>然后你开始关注 elasticsearch 集群的索引变化。</li></ul></li></ul><h2 id="配置文件中的-multiline-多行内容收集插件讲解" tabindex="-1"><a class="header-anchor" href="#配置文件中的-multiline-多行内容收集插件讲解"><span>配置文件中的 multiline 多行内容收集插件讲解</span></a></h2><ul><li>配置的格式如下：</li><li>在 file 中的：<code>codec =&gt; multiline</code></li></ul><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">file</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">path</span> =&gt; [<span class="token string">&quot;/usr/program/tomcat8/logs/logbackOutFile.log.*.log&quot;</span>]</span>
<span class="line">		type =&gt; <span class="token string">&quot;tomcat-log&quot;</span></span>
<span class="line">		start_position =&gt; <span class="token string">&quot;beginning&quot;</span></span>
<span class="line">		codec =&gt; multiline</span> <span class="token punctuation">{</span></span>
<span class="line">		    pattern =&gt; &quot;^\\[&quot;</span>
<span class="line">		    negate =&gt; true</span>
<span class="line">		    what =&gt; &quot;previous&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">if</span> [type] == <span class="token string">&quot;tomcat-log&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span> </span>
<span class="line">			hosts =&gt; [&quot;192.168.1.127:9200&quot;]</span>
<span class="line">			index =&gt; &quot;tomcat-log-%<span class="token punctuation">{</span>+YYYY.MM.dd<span class="token punctuation">}</span>&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例"><span>案例</span></a></h2><h3 id="测试模式" tabindex="-1"><a class="header-anchor" href="#测试模式"><span>测试模式</span></a></h3><h4 id="自己写正则表达式-匹配后输出到控制台先看下" tabindex="-1"><a class="header-anchor" href="#自己写正则表达式-匹配后输出到控制台先看下"><span>自己写正则表达式，匹配后输出到控制台先看下：</span></a></h4><ul><li>新建目录（如果存在就不用）：<code>mkdir -p /usr/program/elk/logstash-2.4.1/config</code></li><li><strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/regexp-test.conf</code>：</li></ul><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">stdin</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">codec</span> =&gt; multiline</span> <span class="token punctuation">{</span></span>
<span class="line">			pattern =&gt; &quot;^\\[&quot;</span>
<span class="line">			negate =&gt; true</span>
<span class="line">			what =&gt; &quot;previous&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">stdout</span></span> <span class="token punctuation">{</span> </span>
<span class="line">		codec =&gt; &quot;rubydebug&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/regexp-test.conf</code></li></ul><h4 id="读取文件-输出到控制台先看下" tabindex="-1"><a class="header-anchor" href="#读取文件-输出到控制台先看下"><span>读取文件，输出到控制台先看下：</span></a></h4><ul><li>新建目录（如果存在就不用）：<code>mkdir -p /usr/program/elk/logstash-2.4.1/config</code></li><li><strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/file-test.conf</code>：</li></ul><div class="language-nginx" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">file</span></span> <span class="token punctuation">{</span></span>
<span class="line">		path =&gt; [&quot;/var/log/nginx/access.log&quot;]</span>
<span class="line">		type =&gt; &quot;nginx-access-log&quot;</span>
<span class="line">		start_position =&gt; &quot;beginning&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">stdout</span></span> <span class="token punctuation">{</span> </span>
<span class="line">		codec =&gt; &quot;rubydebug&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/regexp-test.conf</code></li></ul><h3 id="nginx-日志收集" tabindex="-1"><a class="header-anchor" href="#nginx-日志收集"><span>Nginx 日志收集</span></a></h3>`,26)),n("ul",null,[s[5]||(s[5]=n("li",null,[a("机子：192.168.1.121 "),n("ul",null,[n("li",null,[a("Nginx 日志位置： "),n("ul",null,[n("li",null,[n("code",null,"/var/log/nginx/access.log")]),n("li",null,[n("code",null,"/var/log/nginx/error.log")])])])])],-1)),n("li",null,[s[4]||(s[4]=a("安装 Logstash 过程请看：",-1)),l(t,{to:"/linux-tutor/server/ELK-Install-And-Settings.html"},{default:i(()=>[...s[3]||(s[3]=[a("ELK 日志收集系统安装和配置",-1)])]),_:1})]),s[6]||(s[6]=n("li",null,[a("新建目录（如果存在就不用）："),n("code",null,"mkdir -p /usr/program/elk/logstash-2.4.1/config")],-1)),s[7]||(s[7]=n("li",null,[n("strong",null,"新建"),a(" 配置文件："),n("code",null,"vim /usr/program/elk/logstash-2.4.1/config/nginx.conf"),a("：")],-1))]),s[15]||(s[15]=e(`<div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">file</span></span> <span class="token punctuation">{</span></span>
<span class="line">		path =&gt; [&quot;/var/log/nginx/access.log&quot;]</span>
<span class="line">		type =&gt; &quot;nginx-access-log&quot;</span>
<span class="line">		start_position =&gt; &quot;beginning&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	</span>
<span class="line">	<span class="token directive"><span class="token keyword">file</span></span> <span class="token punctuation">{</span></span>
<span class="line">		path =&gt; [&quot;/var/log/nginx/error.log&quot;]</span>
<span class="line">		type =&gt; &quot;nginx-error-log&quot;</span>
<span class="line">		start_position =&gt; &quot;beginning&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">if</span> [type] == <span class="token string">&quot;nginx-access-log&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span> </span>
<span class="line">			hosts =&gt; [&quot;192.168.1.127:9200&quot;]</span>
<span class="line">			index =&gt; &quot;nginx-access-log&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	</span>
<span class="line">	<span class="token directive"><span class="token keyword">if</span> [type] == <span class="token string">&quot;nginx-error-log&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span> </span>
<span class="line">			hosts =&gt; [&quot;192.168.1.127:9200&quot;]</span>
<span class="line">			index =&gt; &quot;nginx-error-log&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/nginx.conf</code></li><li>然后你开始访问 nginx，再关注 elasticsearch 集群的索引变化，如果有新增索引那就表示可以了。</li></ul><h4 id="进一步优化-把-nginx-的日志输出格式改为-json" tabindex="-1"><a class="header-anchor" href="#进一步优化-把-nginx-的日志输出格式改为-json"><span>进一步优化：把 nginx 的日志输出格式改为 json</span></a></h4><ul><li>配置 nginx 访问日志的输出格式：<code>vim /usr/local/nginx/conf/nginx.conf</code></li></ul><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">user</span> root</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token directive"><span class="token keyword">log_format</span> json <span class="token string">&#39;{&quot;@timestamp&quot;:&quot;<span class="token variable">$time_iso8601</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;host&quot;:&quot;<span class="token variable">$server_addr</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;clientip&quot;:&quot;<span class="token variable">$remote_addr</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;size&quot;:<span class="token variable">$body_bytes_sent,</span>&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;responsetime&quot;:<span class="token variable">$request_time,</span>&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;upstreamtime&quot;:&quot;<span class="token variable">$upstream_response_time</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;upstreamhost&quot;:&quot;<span class="token variable">$upstream_addr</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;http_host&quot;:&quot;<span class="token variable">$host</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;url&quot;:&quot;<span class="token variable">$uri</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;xff&quot;:&quot;<span class="token variable">$http_x_forwarded_for</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;referer&quot;:&quot;<span class="token variable">$http_referer</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;agent&quot;:&quot;<span class="token variable">$http_user_agent</span>&quot;,&#39;</span></span>
<span class="line">                     <span class="token string">&#39;&quot;status&quot;:&quot;<span class="token variable">$status</span>&quot;}&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line">	<span class="token comment">#全局日志</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">access_log</span> /var/log/nginx/access.log</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">error_log</span> /var/log/nginx/error.log</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span></span>
<span class="line">		</span>
<span class="line">		<span class="token comment"># 针对服务的日志输出</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">access_log</span> /var/log/nginx/access-json.log json</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改 Logstash 的收集</li><li><strong>编辑</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/nginx.conf</code>：</li></ul><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">file</span></span> <span class="token punctuation">{</span></span>
<span class="line">		path =&gt; [&quot;/var/log/nginx/access-json.log&quot;]</span>
<span class="line">		codec =&gt; json</span>
<span class="line">		type =&gt; &quot;nginx-access-json-log&quot;</span>
<span class="line">		start_position =&gt; &quot;beginning&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">if</span> [type] == <span class="token string">&quot;nginx-access-json-log&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span> </span>
<span class="line">			hosts =&gt; [&quot;192.168.1.127:9200&quot;]</span>
<span class="line">			index =&gt; &quot;nginx-access-json-log&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/nginx.conf</code></li><li>然后你开始访问 nginx，再关注 elasticsearch 集群的索引变化，如果有新增索引那就表示可以了。</li></ul><h3 id="tomcat-日志收集" tabindex="-1"><a class="header-anchor" href="#tomcat-日志收集"><span>Tomcat 日志收集</span></a></h3>`,9)),n("ul",null,[s[10]||(s[10]=n("li",null,[a("机子：192.168.1.121 "),n("ul",null,[n("li",null,[a("Tomcat 日志位置："),n("code",null,"/usr/program/tomcat8/logs")])])],-1)),n("li",null,[s[9]||(s[9]=a("安装 Logstash 过程请看：",-1)),l(t,{to:"/linux-tutor/server/ELK-Install-And-Settings.html"},{default:i(()=>[...s[8]||(s[8]=[a("ELK 日志收集系统安装和配置",-1)])]),_:1})]),s[11]||(s[11]=n("li",null,[a("新建目录（如果存在就不用）："),n("code",null,"mkdir -p /usr/program/elk/logstash-2.4.1/config")],-1)),s[12]||(s[12]=n("li",null,[n("strong",null,"新建"),a(" 配置文件："),n("code",null,"vim /usr/program/elk/logstash-2.4.1/config/tomcat.conf"),a("：")],-1))]),s[16]||(s[16]=e(`<div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">file</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">path</span> =&gt; [<span class="token string">&quot;/usr/program/tomcat8/logs/logbackOutFile.log.*.log&quot;</span>]</span>
<span class="line">		type =&gt; <span class="token string">&quot;tomcat-log&quot;</span></span>
<span class="line">		start_position =&gt; <span class="token string">&quot;beginning&quot;</span></span>
<span class="line">		codec =&gt; multiline</span> <span class="token punctuation">{</span></span>
<span class="line">		    pattern =&gt; &quot;^\\[&quot;</span>
<span class="line">		    negate =&gt; true</span>
<span class="line">		    what =&gt; &quot;previous&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">if</span> [type] == <span class="token string">&quot;tomcat-log&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span> </span>
<span class="line">			hosts =&gt; [&quot;192.168.1.127:9200&quot;]</span>
<span class="line">			index =&gt; &quot;tomcat-log-%<span class="token punctuation">{</span>+YYYY.MM.dd<span class="token punctuation">}</span>&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/tomcat.conf</code></li><li>然后你开始访问 nginx，再关注 elasticsearch 集群的索引变化，如果有新增索引那就表示可以了。</li></ul><h3 id="mysql-慢-sql-日志收集" tabindex="-1"><a class="header-anchor" href="#mysql-慢-sql-日志收集"><span>MySQL 慢 SQL 日志收集</span></a></h3><ul><li>其他的细节都跟上面一样不多说了，配置文件这里需要用到 grok 进行正则的拆分</li><li>这里有资料，我觉得别人已经说得很好了（Google 关键字：<code>grok mysql slow</code>）： <ul><li><a href="http://soft.dog/2016/01/30/logstash-mysql-slow-log/" target="_blank" rel="noopener noreferrer">http://soft.dog/2016/01/30/logstash-mysql-slow-log/</a></li><li><a href="https://kibana.logstash.es/content/logstash/examples/mysql-slow.html" target="_blank" rel="noopener noreferrer">https://kibana.logstash.es/content/logstash/examples/mysql-slow.html</a></li><li><a href="https://leejo.github.io/2013/11/21/parsing_mysql_slow_query_log_with_logstash/" target="_blank" rel="noopener noreferrer">https://leejo.github.io/2013/11/21/parsing_mysql_slow_query_log_with_logstash/</a></li><li><a href="https://www.phase2technology.com/blog/adding-mysql-slow-query-logs-to-logstash/" target="_blank" rel="noopener noreferrer">https://www.phase2technology.com/blog/adding-mysql-slow-query-logs-to-logstash/</a></li><li><a href="https://discuss.elastic.co/t/grok-filter-for-mysql-slow-logs-produces-grokparsefailure-but-passes-tests/55799" target="_blank" rel="noopener noreferrer">https://discuss.elastic.co/t/grok-filter-for-mysql-slow-logs-produces-grokparsefailure-but-passes-tests/55799</a></li></ul></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&quot;(?m)^#\\s+User@Host:\\s+%{USER:user}\\[[^\\]]+\\]\\s+@\\s+%{USER:clienthost}\\s+\\[(?:%{IP:clientip})?\\]\\s+Id:\\s+%{NUMBER:id:int}\\n#\\s+Schema:\\s+%{USER:schema}\\s+Last_errno:\\s+%{NUMBER:lasterrorno:int}\\s+Killed:\\s+%{NUMBER:killedno:int}\\n#\\s+Query_time:\\s+%{NUMBER:query_time:float}\\s+Lock_time:\\s+%{NUMBER:lock_time:float}\\s+Rows_sent:\\s+%{NUMBER:rows_sent:int}\\s+Rows_examined:\\s+%{NUMBER:rows_examined:int}\\s+Rows_affected:\\s+%{NUMBER:rows_affected:int}\\n#\\s+Bytes_sent:\\s+%{NUMBER:bytes_sent:int}\\n\\s*(?:use\\s+%{USER:usedatabase};\\s*\\n)?SET\\s+timestamp=%{NUMBER:timestamp};\\n\\s*(?&lt;query&gt;(?&lt;action&gt;\\w+)\\b.*)\\s*(?:\\n#\\s+Time)?.*$&quot;</span>
<span class="line"></span></code></pre></div><h3 id="logstash-不直接写到-es-先写到-redis-再写到-es" tabindex="-1"><a class="header-anchor" href="#logstash-不直接写到-es-先写到-redis-再写到-es"><span>Logstash 不直接写到 ES 先写到 Redis 再写到 ES</span></a></h3><ul><li>官网 Redis 插件使用说明：<a href="https://www.elastic.co/guide/en/logstash/2.4/plugins-inputs-redis.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/2.4/plugins-inputs-redis.html</a></li></ul><h4 id="一台-logstash-把数据写到-redis" tabindex="-1"><a class="header-anchor" href="#一台-logstash-把数据写到-redis"><span>一台 Logstash 把数据写到 Redis</span></a></h4><ul><li>Redis 机器 IP：192.168.1.125</li><li>Logstash 机器 IP：192.168.1.121</li><li>Logstash 机器 <strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/redis-test.conf</code>：</li></ul><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">stdin</span></span> <span class="token punctuation">{</span></span>
<span class="line">		</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">redis</span></span> <span class="token punctuation">{</span></span>
<span class="line">		host =&gt; &quot;192.168.1.125&quot;</span>
<span class="line">		port =&gt; &quot;6379&quot;</span>
<span class="line">		db =&gt; &quot;2&quot;</span>
<span class="line">		data_type =&gt; &quot;list&quot;</span>
<span class="line">		key =&gt; &quot;gitnavi-logstash-info&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/redis-test.conf</code><ul><li>然后我们在交互界面中分别输入下面内容：</li><li><code>hello</code> 回车</li><li><code>world</code> 回车</li></ul></li><li>进入 Redis 机器上的数据： <ul><li>进入 redis 交互端：<code>redis-cli</code></li><li>查询 db2：<code>select 2</code></li><li>查询 db2 下的所有内容：<code>keys *</code>，可以看到有一个：&quot;gitnavi-logstash-info&quot;</li><li>查询该 list 类型的数据：<code>LRANGE gitnavi-logstash-info 0 1</code>，正常可以得到这样的数据</li></ul></li></ul><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token number">1</span>) <span class="token string">&quot;{\\&quot;message\\&quot;:\\&quot;hello\\&quot;,\\&quot;@version\\&quot;:\\&quot;1\\&quot;,\\&quot;@timestamp\\&quot;:\\&quot;2017-03-15T15:23:35.064Z\\&quot;,\\&quot;host\\&quot;:\\&quot;youmeekhost\\&quot;}&quot;</span></span>
<span class="line"><span class="token number">2</span>) <span class="token string">&quot;{\\&quot;message\\&quot;:\\&quot;world\\&quot;,\\&quot;@version\\&quot;:\\&quot;1\\&quot;,\\&quot;@timestamp\\&quot;:\\&quot;2017-03-15T15:23:37.245Z\\&quot;,\\&quot;host\\&quot;:\\&quot;youmeekhost\\&quot;}&quot;</span></span>
<span class="line"></span></code></pre></div><h4 id="一台-logstash-把数据从-redis-读取出来写到-es" tabindex="-1"><a class="header-anchor" href="#一台-logstash-把数据从-redis-读取出来写到-es"><span>一台 Logstash 把数据从 Redis 读取出来写到 ES</span></a></h4><ul><li>Redis 机器 IP：192.168.1.125</li><li>Logstash 机器 IP：192.168.1.125</li><li>Logstash 机器 <strong>新建</strong> 配置文件：<code>vim /usr/program/elk/logstash-2.4.1/config/redis-test.conf</code>：</li></ul><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">redis</span></span> <span class="token punctuation">{</span></span>
<span class="line">		type =&gt; &quot;redis-log&quot;</span>
<span class="line">		host =&gt; &quot;192.168.1.125&quot;</span>
<span class="line">		port =&gt; &quot;6379&quot;</span>
<span class="line">		db =&gt; &quot;2&quot;</span>
<span class="line">		data_type =&gt; &quot;list&quot;</span>
<span class="line">		key =&gt; &quot;gitnavi-logstash-info&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">if</span> [type] == <span class="token string">&quot;redis-log&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span></span>
<span class="line">	        hosts =&gt; [&quot;192.168.1.127:9200&quot;]</span>
<span class="line">	        index =&gt; &quot;redis-log&quot;</span>
<span class="line">	    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 Logstash 并加载该配置文件：<code>/usr/program/elk/logstash-2.4.1/bin/logstash -f /usr/program/elk/logstash-2.4.1/config/redis-test.conf</code></li><li>然后现在在 Logstash 机器 IP：192.168.1.121 上继续输入一些内容，看下 ES 集群是否有对应的索引创建。</li></ul><h3 id="logstash-不直接写到-es-先写到-mq-再写到-es" tabindex="-1"><a class="header-anchor" href="#logstash-不直接写到-es-先写到-mq-再写到-es"><span>Logstash 不直接写到 ES 先写到 MQ 再写到 ES</span></a></h3><ul><li>官网 RabbitMQ 插件使用说明：<a href="https://www.elastic.co/guide/en/logstash/2.4/plugins-inputs-rabbitmq.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/logstash/2.4/plugins-inputs-rabbitmq.html</a></li></ul><h4 id="一台-logstash-把数据写到-rabbitmq" tabindex="-1"><a class="header-anchor" href="#一台-logstash-把数据写到-rabbitmq"><span>一台 Logstash 把数据写到 rabbitMQ</span></a></h4><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">file</span></span> <span class="token punctuation">{</span></span>
<span class="line">		path =&gt; &quot;/usr/local/tomcat/logs/tomcat_json.log&quot;</span>
<span class="line">		codec =&gt; &quot;json&quot;</span>
<span class="line">		type =&gt; &quot;tomcat&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">rabbitmq</span></span> <span class="token punctuation">{</span> </span>
<span class="line">		host =&gt; &quot;RabbitMQ_server&quot;</span>
<span class="line">		port =&gt; &quot;5672&quot;</span>
<span class="line">		vhost =&gt; &quot;elk&quot;</span>
<span class="line">		exchange =&gt; &quot;elk_exchange&quot;</span>
<span class="line">		exchange_type =&gt; &quot;direct&quot;</span>
<span class="line">		key =&gt; &quot;elk_key&quot;</span>
<span class="line">		user =&gt; &quot;liang&quot;</span>
<span class="line">		password =&gt; &quot;liang123&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">stdout</span></span> <span class="token punctuation">{</span> </span>
<span class="line">		codec =&gt; rubydebug </span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="一台-logstash-把数据从-rabbitmq-读取出来写到-es-还未测试" tabindex="-1"><a class="header-anchor" href="#一台-logstash-把数据从-rabbitmq-读取出来写到-es-还未测试"><span>一台 Logstash 把数据从 rabbitMQ 读取出来写到 ES （还未测试）</span></a></h4><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre><code class="language-nginx"><span class="line"><span class="token directive"><span class="token keyword">input</span></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token directive"><span class="token keyword">rabbitmq</span></span> <span class="token punctuation">{</span></span>
<span class="line">		host =&gt; &quot;127.0.0.1&quot;</span>
<span class="line">		subscription_retry_interval_seconds =&gt; &quot;5&quot;</span>
<span class="line">		vhost =&gt; &quot;elk&quot;</span>
<span class="line">		exchange =&gt; &quot;elk_exchange&quot;</span>
<span class="line">		queue =&gt; &quot;elk_queue&quot;</span>
<span class="line">		durable =&gt; &quot;true&quot;</span>
<span class="line">		key =&gt; &quot;elk_key&quot;</span>
<span class="line">		user =&gt; &quot;liang&quot;</span>
<span class="line">		password =&gt; &quot;liang123&quot;</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">output</span></span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">	<span class="token directive"><span class="token keyword">if</span> [type] == <span class="token string">&quot;nginx&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span></span>
<span class="line">			hosts =&gt; &quot;192.168.1.127:9200&quot;</span>
<span class="line">			user =&gt; &quot;logstash&quot;</span>
<span class="line">			password =&gt; &quot;123456&quot;</span>
<span class="line">			index =&gt; &quot;nginx-%<span class="token punctuation">{</span>+YYYY.MM.dd<span class="token punctuation">}</span>&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	</span>
<span class="line">	<span class="token directive"><span class="token keyword">if</span> [type] == <span class="token string">&quot;tomcat&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token directive"><span class="token keyword">elasticsearch</span></span> <span class="token punctuation">{</span></span>
<span class="line">			hosts =&gt; &quot;192.168.1.127:9200&quot;</span>
<span class="line">			user =&gt; &quot;logstash&quot;</span>
<span class="line">			password =&gt; &quot;123456&quot;</span>
<span class="line">			index =&gt; &quot;tomcat-%<span class="token punctuation">{</span>+YYYY.MM.dd<span class="token punctuation">}</span>&quot;</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token directive"><span class="token keyword">stdout</span></span> <span class="token punctuation">{</span> </span>
<span class="line">		codec =&gt; rubydebug </span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="https://liang178.github.io/2016/08/11/elk+rabbitmq/" target="_blank" rel="noopener noreferrer">https://liang178.github.io/2016/08/11/elk+rabbitmq/</a></li></ul>`,24))])}const k=p(r,[["render",d]]),m=JSON.parse('{"path":"/linux-tutor/server/Logstash-Base.html","title":"Logstash 知识","lang":"zh-CN","frontmatter":{"description":"Logstash 知识 基础知识 基于 ruby 写的 官网文档：https://www.elastic.co/guide/en/logstash/5.2/first-event.html 如果是通过网络来收集，并不需要所有机子都装，但是如果是要通过读取文件来收集，那文件所在的那个机子就的安装 配置文件的写法格式：https://www.elastic...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Logstash 知识\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-04T21:01:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Logstash-Base.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Logstash 知识"}],["meta",{"property":"og:description","content":"Logstash 知识 基础知识 基于 ruby 写的 官网文档：https://www.elastic.co/guide/en/logstash/5.2/first-event.html 如果是通过网络来收集，并不需要所有机子都装，但是如果是要通过读取文件来收集，那文件所在的那个机子就的安装 配置文件的写法格式：https://www.elastic..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-04T21:01:43.000Z"}],["meta",{"property":"article:modified_time","content":"2022-06-04T21:01:43.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1654376503000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":7.04,"words":2112},"filePathRelative":"linux-tutor/server/Logstash-Base.md","autoDesc":true}');export{k as comp,m as data};
