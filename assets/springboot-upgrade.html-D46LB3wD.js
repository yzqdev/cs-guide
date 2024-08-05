import{_ as t,c as e,o as n,d as i}from"./app-CbULZrmi.js";const r={},o=i(`<h1 id="springboot升级" tabindex="-1"><a class="header-anchor" href="#springboot升级"><span>springboot升级</span></a></h1><h2 id="_1-jpa语法升级" tabindex="-1"><a class="header-anchor" href="#_1-jpa语法升级"><span>1.jpa语法升级</span></a></h2><p>原来需要这样</p><pre><code class="language-java">Sort sort=new Sort();
</code></pre><p>Sort，page改为静态方法使用方法如下：</p><pre><code class="language-java">Sort sort=Sort.by(&quot;age&quot;).ascending();
List&lt;User&gt; userList = userJpaRepository.findAll(example, sort);

Page&lt;User&gt; userPage = userPagingAndSortingRepository.findAll(PageRequest.of(1, 2));
</code></pre><h3 id="jpa查询语法升级" tabindex="-1"><a class="header-anchor" href="#jpa查询语法升级"><span>jpa查询语法升级</span></a></h3><p>1、T findOne(ID id) 已取消，改为 <code>Optional&lt;S&gt; findOne(Example&lt;S&gt; example)和Optional&lt;T&gt; findById(ID id)</code>，返回的都是Optional对象。使用如下</p><pre><code class="language-java">public ActivityEntity get(Integer id) {
 ActivityEntity activity = new ActivityEntity();
 activity.setId(id);
 activity.setUpperLimit(11);
 Example&lt;ActivityEntity&gt; example = Example.of(activity);
 activity = repository.findOne(example).orElse(null);
 return activity;
}
</code></pre><p>findOne(example)方法可以实现多字段匹配查询</p><pre><code class="language-java">public ActivityEntity get(Integer id) {
 return repository.findById(id).orElse(null);
}
</code></pre><h2 id="单元测试语法升级" tabindex="-1"><a class="header-anchor" href="#单元测试语法升级"><span>单元测试语法升级</span></a></h2><pre><code class="language-java">import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)//这里更改为
//@ExtendWith(SpringExtension.class)
public class HttpClientAutoConfigurationTest {
    @Autowired
    private HttpClient httpClient;

    @Test
    public void test() throws ClientProtocolException, IOException {
        HttpEntity httpEntity = httpClient.execute(new HttpGet(&quot;http://www.baidu.com&quot;)).getEntity();
        String content = EntityUtils.toString(httpEntity, &quot;utf-8&quot;);
        System.out.println(content);
        Assert.notNull(content);
        //变为   Assertions.assertNotNull(userResultList);
    }
}

</code></pre><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><p>出现错误解决方案 <a href="https://lotabout.me/2018/Maven-Profile-and-Spring-Profile/" target="_blank" rel="noopener noreferrer">https://lotabout.me/2018/Maven-Profile-and-Spring-Profile/</a> maven配置 在build下添加</p><pre><code class="language-xml">        &lt;resources&gt;
            &lt;resource&gt;
                &lt;directory&gt;src/main/resources&lt;/directory&gt;
                &lt;!--先排除所有的配置文件--&gt;
                &lt;excludes&gt;
                    &lt;exclude&gt;application*.yml&lt;/exclude&gt;
                &lt;/excludes&gt;
            &lt;/resource&gt;
            &lt;resource&gt;
                &lt;directory&gt;src/main/resources&lt;/directory&gt;
                &lt;!--引入所需环境的配置文件--&gt;
                &lt;filtering&gt;true&lt;/filtering&gt;
                &lt;includes&gt;
                    &lt;include&gt;application.yml&lt;/include&gt;
                    &lt;include&gt;application-\${activatedProperties}.yml&lt;/include&gt;
                &lt;/includes&gt;
            &lt;/resource&gt;
        &lt;/resources&gt;

</code></pre><p>然后添加profile</p><pre><code class="language-xml">

&lt;profiles&gt;
        &lt;profile&gt;
            &lt;id&gt;dev&lt;/id&gt;
            &lt;properties&gt;
                &lt;activatedProperties&gt;dev&lt;/activatedProperties&gt;
            &lt;/properties&gt;
            &lt;!-- 这里代表默认使用dev环境配置文件 --&gt;
            &lt;activation&gt;
                &lt;activeByDefault&gt;true&lt;/activeByDefault&gt;
            &lt;/activation&gt;
        &lt;/profile&gt;
        &lt;profile&gt;
            &lt;id&gt;test&lt;/id&gt;
            &lt;properties&gt;
                &lt;activatedProperties&gt;test&lt;/activatedProperties&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
        &lt;profile&gt;
            &lt;id&gt;prod&lt;/id&gt;
            &lt;properties&gt;
                &lt;activatedProperties&gt;prod&lt;/activatedProperties&gt;
            &lt;/properties&gt;
        &lt;/profile&gt;
    &lt;/profiles&gt;
</code></pre><p>application.properties</p><pre><code class="language-java">spring.profiles.active=@activatedProperties@
</code></pre>`,20),a=[o];function p(l,s){return n(),e("div",null,a)}const g=t(r,[["render",p],["__file","springboot-upgrade.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/springboot/upgrade/springboot-upgrade.html","title":"springboot升级","lang":"zh-CN","frontmatter":{"description":"springboot升级 1.jpa语法升级 原来需要这样 Sort，page改为静态方法使用方法如下： jpa查询语法升级 1、T findOne(ID id) 已取消，改为 Optional<S> findOne(Example<S> example)和Optional<T> findById(ID id)，返回的都是Optional对象。使用如下...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/upgrade/springboot-upgrade.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"springboot升级"}],["meta",{"property":"og:description","content":"springboot升级 1.jpa语法升级 原来需要这样 Sort，page改为静态方法使用方法如下： jpa查询语法升级 1、T findOne(ID id) 已取消，改为 Optional<S> findOne(Example<S> example)和Optional<T> findById(ID id)，返回的都是Optional对象。使用如下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-23T15:21:01.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-23T15:21:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"springboot升级\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-23T15:21:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1.jpa语法升级","slug":"_1-jpa语法升级","link":"#_1-jpa语法升级","children":[{"level":3,"title":"jpa查询语法升级","slug":"jpa查询语法升级","link":"#jpa查询语法升级","children":[]}]},{"level":2,"title":"单元测试语法升级","slug":"单元测试语法升级","link":"#单元测试语法升级","children":[]},{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1653319261000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.24,"words":371},"filePathRelative":"java-tutor/springboot/upgrade/springboot-upgrade.md","localizedDate":"2022年3月21日","autoDesc":true}');export{g as comp,d as data};
