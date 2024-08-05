import{_ as e,c as t,o as a,d as s}from"./app-CbULZrmi.js";const n={},l=s(`<h1 id="基础" tabindex="-1"><a class="header-anchor" href="#基础"><span>基础</span></a></h1><h2 id="连接数据库" tabindex="-1"><a class="header-anchor" href="#连接数据库"><span>连接数据库</span></a></h2><pre><code class="language-sql"># mysql –u用户名 [–h主机名或者IP地址,-P端口号] –p密码
# 例子
 mysql -h127.0.0.1 -P3306 -uroot -prootpassword
</code></pre><h2 id="远程连接" tabindex="-1"><a class="header-anchor" href="#远程连接"><span>远程连接</span></a></h2><pre><code class="language-sql"># 你想root使用123456从&#39;192.168.188.106&#39;主机连接到mysql服务器 wabg库下面所有表的话。
MySQL&gt; grant all PRIVILEGES on wabg.* to  root@&#39;192.168.188.106&#39;  identified by &#39;123456&#39; WITH GRANT OPTION;
# 你想myuser使用mypassword从任何主机连接到mysql服务器的话
MySQL&gt; grant all PRIVILEGES on *.* to  &#39;myuser&#39;@&#39;%&#39;  identified by &#39;mypassword&#39; WITH GRANT OPTION;
#然后
flush privileges;
</code></pre><h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作"><span>数据库操作</span></a></h2><h3 id="查看数据库" tabindex="-1"><a class="header-anchor" href="#查看数据库"><span>查看数据库</span></a></h3><pre><code class="language-sql"># 显示数据库
 SHOW DATABASES;

# 选择数据库
USE test;
# 创建一个不存在的数据库
CREATE DATABASE test;
# 查看定义
SHOW CREATE DATABASE test
# 创建一个不知道是否存在的数据库
 CREATE DATABASE if not  exists test;
</code></pre><h3 id="删除数据库" tabindex="-1"><a class="header-anchor" href="#删除数据库"><span>删除数据库</span></a></h3><pre><code class="language-sql">
DROP DATABASE test2;
# 删除一个不确定的数据库
drop database if exists test2;
</code></pre><h2 id="备份数据库和恢复数据库" tabindex="-1"><a class="header-anchor" href="#备份数据库和恢复数据库"><span>备份数据库和恢复数据库</span></a></h2><ol><li>使用heidisql备份所有</li><li>使用datagrip备份</li></ol><p>3 使用mysql_dump备份</p><pre><code>mysqldump -uroot -p --all-databases &gt; sqlbackup.sql
</code></pre><p>恢复数据库</p><pre><code>mysql -uroot -p   &lt; E:/tmp/sqlbackup.sql
</code></pre>`,16),o=[l];function r(i,d){return a(),t("div",null,o)}const p=e(n,[["render",r],["__file","basic.html.vue"]]),h=JSON.parse('{"path":"/java-tutor/orm-tutor/mysql/basic.html","title":"基础","lang":"zh-CN","frontmatter":{"description":"基础 连接数据库 远程连接 数据库操作 查看数据库 删除数据库 备份数据库和恢复数据库 使用heidisql备份所有 使用datagrip备份 3 使用mysql_dump备份 恢复数据库","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mysql/basic.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"基础"}],["meta",{"property":"og:description","content":"基础 连接数据库 远程连接 数据库操作 查看数据库 删除数据库 备份数据库和恢复数据库 使用heidisql备份所有 使用datagrip备份 3 使用mysql_dump备份 恢复数据库"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-03T11:57:37.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-03T11:57:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-03T11:57:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"连接数据库","slug":"连接数据库","link":"#连接数据库","children":[]},{"level":2,"title":"远程连接","slug":"远程连接","link":"#远程连接","children":[]},{"level":2,"title":"数据库操作","slug":"数据库操作","link":"#数据库操作","children":[{"level":3,"title":"查看数据库","slug":"查看数据库","link":"#查看数据库","children":[]},{"level":3,"title":"删除数据库","slug":"删除数据库","link":"#删除数据库","children":[]}]},{"level":2,"title":"备份数据库和恢复数据库","slug":"备份数据库和恢复数据库","link":"#备份数据库和恢复数据库","children":[]}],"git":{"createdTime":1669218165000,"updatedTime":1717415857000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.87,"words":261},"filePathRelative":"java-tutor/orm-tutor/mysql/basic.md","localizedDate":"2022年11月23日","autoDesc":true}');export{p as comp,h as data};
