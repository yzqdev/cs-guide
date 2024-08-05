import{_ as e,c as t,o as n,d as r}from"./app-CbULZrmi.js";const l={},o=r(`<h1 id="influxdb-安装和配置" tabindex="-1"><a class="header-anchor" href="#influxdb-安装和配置"><span>Influxdb 安装和配置</span></a></h1><h2 id="influxdb-docker-安装" tabindex="-1"><a class="header-anchor" href="#influxdb-docker-安装"><span>Influxdb Docker 安装</span></a></h2><ul><li>官网库：<a href="https://docs.docker.com/samples/library/influxdb" target="_blank" rel="noopener noreferrer">https://docs.docker.com/samples/library/influxdb</a></li></ul><pre><code class="language-shell">docker run -d --name influxdb \\
-p 8086:8086 -p 8083:8083 \\
-e INFLUXDB_HTTP_AUTH_ENABLED=true \\
-e INFLUXDB_ADMIN_ENABLED=true -e INFLUXDB_ADMIN_USER=admin -e INFLUXDB_ADMIN_PASSWORD=123456 \\
-e INFLUXDB_DB=mydb1 \\
-v /Users/gitnavi/docker_data/influxdb/data:/var/lib/influxdb influxdb
</code></pre><ul><li>进入终端交互：</li></ul><pre><code class="language-shell">docker exec -it influxdb /bin/bash

输入：influx，开始终端交互

auth admin 123456
show databases;

use springboot
show measurements

show series from &quot;jvm_buffer_total_capacity&quot;

select * from &quot;jvm_buffer_total_capacity&quot;


如果你要再额外创建数据库：
create database demo

如果你要再创建用户：
create user &quot;myuser&quot; with password &#39;123456&#39; with all privileges
</code></pre><h2 id="其他资料" tabindex="-1"><a class="header-anchor" href="#其他资料"><span>其他资料</span></a></h2><ul><li><a href="https://www.cnblogs.com/woshimrf/p/docker-influxdb.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/woshimrf/p/docker-influxdb.html</a></li></ul>`,8),a=[o];function d(i,s){return n(),t("div",null,a)}const u=e(l,[["render",d],["__file","Influxdb-Install-And-Settings.html.vue"]]),p=JSON.parse('{"path":"/linux-tutor/server/Influxdb-Install-And-Settings.html","title":"Influxdb 安装和配置","lang":"zh-CN","frontmatter":{"description":"Influxdb 安装和配置 Influxdb Docker 安装 官网库：https://docs.docker.com/samples/library/influxdb 进入终端交互： 其他资料 https://www.cnblogs.com/woshimrf/p/docker-influxdb.html","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Influxdb-Install-And-Settings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Influxdb 安装和配置"}],["meta",{"property":"og:description","content":"Influxdb 安装和配置 Influxdb Docker 安装 官网库：https://docs.docker.com/samples/library/influxdb 进入终端交互： 其他资料 https://www.cnblogs.com/woshimrf/p/docker-influxdb.html"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-04T21:01:43.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-04T21:01:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Influxdb 安装和配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-04T21:01:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Influxdb Docker 安装","slug":"influxdb-docker-安装","link":"#influxdb-docker-安装","children":[]},{"level":2,"title":"其他资料","slug":"其他资料","link":"#其他资料","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1654376503000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.41,"words":123},"filePathRelative":"linux-tutor/server/Influxdb-Install-And-Settings.md","localizedDate":"2022年5月26日","autoDesc":true}');export{u as comp,p as data};
