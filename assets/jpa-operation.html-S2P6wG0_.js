import{_ as e,c as a,o as t,d as r}from"./app-CbULZrmi.js";const o={},s=r(`<h1 id="jpa操作" tabindex="-1"><a class="header-anchor" href="#jpa操作"><span>jpa操作</span></a></h1><h2 id="更新-update" tabindex="-1"><a class="header-anchor" href="#更新-update"><span>更新(update)</span></a></h2><pre><code class="language-java">@Modifying
@Query(&quot;update User u set u.firstname = ?1, u.lastname = ?2 where u.id = ?3&quot;)
void setUserInfoById(String firstname, String lastname, Integer userId);

</code></pre><p>或者使用save,但是必须带有id</p><pre><code class="language-java">public void updateUser(Userinfos u) {
    User userFromDb = userRepository.findById(u.getid());
    // crush the variables of the object found
    userFromDb.setFirstname(&quot;john&quot;); 
    userFromDb.setLastname(&quot;dew&quot;);
    userFromDb.setAge(16);
    userRepository.save(userFromDb);
}
</code></pre><h2 id="jpa的dialect" tabindex="-1"><a class="header-anchor" href="#jpa的dialect"><span>jpa的dialect</span></a></h2><p>只有sqlite需要community dialect,其他的hibernate-core包含了</p><h3 id="sqlite" tabindex="-1"><a class="header-anchor" href="#sqlite"><span>sqlite</span></a></h3><pre><code class="language-kotlin"> 

implementation(&quot;org.xerial:sqlite-jdbc&quot;)
implementation(&quot;org.hibernate.orm:hibernate-community-dialects&quot;)
</code></pre><p>下面需要依赖<code>org.hibernate.orm:hibernate-community-dialects</code></p><pre><code class="language-propeties">spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  
#org.hibernate.community.dialect  
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect  
spring.datasource.url=jdbc:sqlite:./demo-sqlite.db  
#spring.datasource.url=jdbc:sqlite:\${user.home}/demo-sqlite.db  
spring.datasource.username=  
spring.datasource.password=  
spring.datasource.driver-class-name=org.sqlite.JDBC
</code></pre><h3 id="postgres" tabindex="-1"><a class="header-anchor" href="#postgres"><span>postgres</span></a></h3><pre><code>驱动
runtimeOnly(&quot;org.postgresql:postgresql&quot;)
</code></pre><pre><code class="language-properties">spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  
#org.hibernate.community.dialect  
spring.datasource.username=postgres  
spring.datasource.password=123456  
spring.datasource.driver-class-name=org.postgresql.Driver  
spring.datasource.url=jdbc:postgresql://localhost:5432/rose?serverTimezone=Asia/Shanghai&amp;useUnicode=true&amp;characterEncoding=utf8&amp;characterSetResults=utf8&amp;useSSL=false
</code></pre><h3 id="mariadb" tabindex="-1"><a class="header-anchor" href="#mariadb"><span>mariadb</span></a></h3><pre><code>驱动
runtimeOnly(&quot;org.mariadb.jdbc:mariadb-java-client&quot;)
</code></pre><pre><code>spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  
#org.hibernate.community.dialect  
spring.jpa.database-platform=org.hibernate.dialect.MariaDBDialect  
spring.datasource.username=postgres  
spring.datasource.password=123456  
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver  
spring.datasource.url=jdbc:mariadb://localhost:3307/rose?serverTimezone=Asia/Shanghai&amp;useUnicode=true&amp;characterEncoding=utf8&amp;characterSetResults=utf8&amp;useSSL=false
</code></pre>`,17),i=[s];function n(d,p){return t(),a("div",null,i)}const l=e(o,[["render",n],["__file","jpa-operation.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/orm-tutor/jpa-operation.html","title":"jpa操作","lang":"zh-CN","frontmatter":{"description":"jpa操作 更新(update) 或者使用save,但是必须带有id jpa的dialect 只有sqlite需要community dialect,其他的hibernate-core包含了 sqlite 下面需要依赖org.hibernate.orm:hibernate-community-dialects postgres mariadb","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/jpa-operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"jpa操作"}],["meta",{"property":"og:description","content":"jpa操作 更新(update) 或者使用save,但是必须带有id jpa的dialect 只有sqlite需要community dialect,其他的hibernate-core包含了 sqlite 下面需要依赖org.hibernate.orm:hibernate-community-dialects postgres mariadb"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T08:24:01.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T08:24:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"jpa操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T08:24:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"更新(update)","slug":"更新-update","link":"#更新-update","children":[]},{"level":2,"title":"jpa的dialect","slug":"jpa的dialect","link":"#jpa的dialect","children":[{"level":3,"title":"sqlite","slug":"sqlite","link":"#sqlite","children":[]},{"level":3,"title":"postgres","slug":"postgres","link":"#postgres","children":[]},{"level":3,"title":"mariadb","slug":"mariadb","link":"#mariadb","children":[]}]}],"git":{"createdTime":1665903460000,"updatedTime":1711268641000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.7,"words":211},"filePathRelative":"java-tutor/orm-tutor/jpa-operation.md","localizedDate":"2022年10月16日","autoDesc":true}');export{l as comp,u as data};
