import{_ as e,c as t,o,d as s}from"./app-CbULZrmi.js";const r={},p=s(`<h1 id="postgres-操作" tabindex="-1"><a class="header-anchor" href="#postgres-操作"><span>postgres 操作</span></a></h1><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量"><span>环境变量</span></a></h2><ul><li>PG_HOME</li><li>PGDATA</li><li>PGPASSWORD 密码</li></ul><h2 id="删除所有数据" tabindex="-1"><a class="header-anchor" href="#删除所有数据"><span>删除所有数据</span></a></h2><p>先进入数据库</p><pre><code>psql -U postgres

然后选择所有的名字

SELECT datname FROM pg_database;
</code></pre><h2 id="备份数据" tabindex="-1"><a class="header-anchor" href="#备份数据"><span>备份数据</span></a></h2><p>备份恢复单个数据库</p><pre><code>$env:PGPASSWORD=&#39;123456&#39;
pg_dump.exe -U postgres blog_ssm &gt; blog_ssm_pg.sql

# 恢复单个数据库
 $env:PGPASSWORD=&#39;123456&#39;
psql -U postgres -d kuang_bbs -f .\\kuang_pg.sql
 
</code></pre><p>使用pg_dumpall备份所有</p><pre><code>$env:PGPASSWORD=&#39;123456&#39;
pg_dumpall.exe -U postgres -E UTF8 -f pg_backup.sql
</code></pre><p>使用psql -f恢复所有数据</p><pre><code>$env:PGPASSWORD=&#39;123456&#39;
psql -f ./pg_backup.sql -U postgres
</code></pre><p>使用powershell配置密码</p><pre><code>$env:PGPASSWORD=&#39;123456&#39;
pg_dumpall.exe  -U postgres -w -E UTF8 -f pg_backup.sql
</code></pre><h2 id="postgres升级" tabindex="-1"><a class="header-anchor" href="#postgres升级"><span>postgres升级</span></a></h2><p>1，使用pg_dumpall和psql -f的方式</p><p>这种方式当数据量大的时候性能较低，执行时间长</p><p>2，pg_upgrade</p><pre><code class="language-powershell">$env:PGPASSWORD = &#39;123456&#39;
pg_upgrade -b &quot;D:\\Program Files\\PostgreSQL\\15\\bin&quot; -B &quot;D:\\Program Files\\PostgreSQL\\16\\bin&quot; -d &quot;D:\\Program Files\\PostgreSQL\\15\\data&quot; -D &quot;D:\\Program Files\\PostgreSQL\\16\\data&quot; -U postgres
</code></pre><p>例子</p><pre><code class="language-powershell">$env:PGPASSWORD = &#39;123456&#39;
pg_upgrade -b &quot;D:\\Program Files\\PostgreSQL\\15\\bin&quot; -B &quot;D:\\Program Files\\PostgreSQL\\16\\bin&quot; -d &quot;D:\\Program Files\\PostgreSQL\\15\\data&quot; -D &quot;D:\\Program Files\\PostgreSQL\\16\\data&quot; -U postgres
</code></pre><p>带空格的命令</p><pre><code class="language-powershell">&amp; pg_upgrade -b &quot;D:\\Program Files\\PostgreSQL\\15\\bin&quot; -B &quot;D:\\Program Files\\PostgreSQL\\16\\bin&quot; -d &quot;D:\\Program Files\\PostgreSQL\\15\\data&quot; -D &quot;D:\\Program Files\\PostgreSQL\\16\\data&quot; -U postgres
</code></pre><h2 id="windows出问题" tabindex="-1"><a class="header-anchor" href="#windows出问题"><span>windows出问题</span></a></h2><p>见 https://www.postgresql.org/docs/current/pgupgrade.html</p><p>如果文件夹不显示安全选项卡 就命令行<code>gpedit.msc</code>,点击【用户配置】-【管理模版】-【Windows组件】-【Windows资源管理器】-右侧找到【删除&quot;安全&quot;选项卡,设置为禁用</p><p>要先创建postgres的data</p><pre><code class="language-powershell"> net user postgres 123456 /add

RUNAS /USER:postgres &quot;CMD.EXE&quot;
SET PATH=%PATH%;d:\\Program Files\\PostgreSQL\\15\\bin;

initdb -D &quot;D:\\Program Files\\PostgreSQL\\15\\data&quot; -U postgres
</code></pre>`,29),a=[p];function l(n,g){return o(),t("div",null,a)}const i=e(r,[["render",l],["__file","pg-operation.html.vue"]]),c=JSON.parse('{"path":"/java-tutor/orm-tutor/pgsql/pg-operation.html","title":"postgres 操作","lang":"zh-CN","frontmatter":{"description":"postgres 操作 环境变量 PG_HOME PGDATA PGPASSWORD 密码 删除所有数据 先进入数据库 备份数据 备份恢复单个数据库 使用pg_dumpall备份所有 使用psql -f恢复所有数据 使用powershell配置密码 postgres升级 1，使用pg_dumpall和psql -f的方式 这种方式当数据量大的时候性能较...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/pgsql/pg-operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"postgres 操作"}],["meta",{"property":"og:description","content":"postgres 操作 环境变量 PG_HOME PGDATA PGPASSWORD 密码 删除所有数据 先进入数据库 备份数据 备份恢复单个数据库 使用pg_dumpall备份所有 使用psql -f恢复所有数据 使用powershell配置密码 postgres升级 1，使用pg_dumpall和psql -f的方式 这种方式当数据量大的时候性能较..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T22:53:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-24T22:53:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"postgres 操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-24T22:53:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"环境变量","slug":"环境变量","link":"#环境变量","children":[]},{"level":2,"title":"删除所有数据","slug":"删除所有数据","link":"#删除所有数据","children":[]},{"level":2,"title":"备份数据","slug":"备份数据","link":"#备份数据","children":[]},{"level":2,"title":"postgres升级","slug":"postgres升级","link":"#postgres升级","children":[]},{"level":2,"title":"windows出问题","slug":"windows出问题","link":"#windows出问题","children":[]}],"git":{"createdTime":1695234758000,"updatedTime":1719269626000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":5}]},"readingTime":{"minutes":1.25,"words":374},"filePathRelative":"java-tutor/orm-tutor/pgsql/pg-operation.md","localizedDate":"2023年9月20日","autoDesc":true}');export{i as comp,c as data};
