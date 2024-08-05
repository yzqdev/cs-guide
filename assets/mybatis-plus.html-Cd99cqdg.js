import{_ as t,c as e,o as n,d as a}from"./app-CbULZrmi.js";const r={},o=a(`<h1 id="mp自动生成代码" tabindex="-1"><a class="header-anchor" href="#mp自动生成代码"><span>mp自动生成代码</span></a></h1><ul><li><a href="https://www.cnblogs.com/diffx/p/10611082.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/diffx/p/10611082.html</a></li><li><a href="https://pengshiyu.blog.csdn.net/article/details/107307390" target="_blank" rel="noopener noreferrer">https://pengshiyu.blog.csdn.net/article/details/107307390</a></li><li><a href="https://gitee.com/best_handsome/mybatis-plus-join" target="_blank" rel="noopener noreferrer">https://gitee.com/best_handsome/mybatis-plus-join</a> 自动生成代码 需要安装依赖</li></ul><pre><code class="language-xml">  &lt;dependency&gt;
                &lt;groupId&gt;org.apache.velocity&lt;/groupId&gt;
                &lt;artifactId&gt;velocity-engine-core&lt;/artifactId&gt;
                &lt;version&gt;2.3&lt;/version&gt;
            &lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;com.baomidou&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-plus-generator&lt;/artifactId&gt;
    &lt;version&gt;3.5.5&lt;/version&gt;
&lt;/dependency&gt;

</code></pre><pre><code class="language-java">package com.yzq;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.fill.Column;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author yanni
 * @date time 2022/1/18 18:48
 * @modified By:
 */
public class CodeGen {
    static String url = &quot;jdbc:mysql://localhost:3306/spring_simple?autoReconnect=true&amp;useUnicode=true&amp;characterEncoding=utf8&amp;zeroDateTimeBehavior=CONVERT_TO_NULL&amp;useSSL=false&amp;serverTimezone=Asia/Shanghai&quot;;
static  String path=&quot;d://tmp//yzq&quot;;
    @Test
    public void generateCode() {
        FastAutoGenerator.create(url, &quot;root&quot;, &quot;123456&quot;)
                .globalConfig(builder -&gt; builder.outputDir(path))
                .packageConfig(builder -&gt; {
                    builder.parent(&quot;com.yzq&quot;) // 设置父包名
                            .moduleName(&quot;&quot;) // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, path+&quot;//mapper&quot;)); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -&gt; builder.addInclude(&quot;teacher&quot;))

                .execute();
    }

    public static void main(String[] args) {
        FastAutoGenerator.create(url, &quot;root&quot;, &quot;123456&quot;)
                .globalConfig(builder -&gt; builder.outputDir(path))
                // 全局配置
                .globalConfig((scanner, builder) -&gt; builder.author(scanner.apply(&quot;请输入作者名称？&quot;)).fileOverride())
                // 包配置
                .packageConfig((scanner, builder) -&gt; builder.parent(scanner.apply(&quot;请输入包名？&quot;)))
                // 策略配置
                .strategyConfig((scanner, builder) -&gt; builder.addInclude(getTables(scanner.apply(&quot;请输入表名，多个英文逗号分隔？所有输入 all&quot;)))
                        .controllerBuilder().enableRestStyle().enableHyphenStyle()
                        .entityBuilder().enableLombok().build())
                /*
                    模板引擎配置，默认 Velocity 可选模板引擎 Beetl 或 Freemarker
                   .templateEngine(new BeetlTemplateEngine())
                   .templateEngine(new FreemarkerTemplateEngine())
                 */
                .execute();


// 处理 all 情况

    }
    protected static List&lt;String&gt; getTables(String tables) {
        return &quot;all&quot;.equals(tables) ? Collections.emptyList() : Arrays.asList(tables.split(&quot;,&quot;));
    }
}

</code></pre><h2 id="使用kotlin" tabindex="-1"><a class="header-anchor" href="#使用kotlin"><span>使用kotlin</span></a></h2><pre><code class="language-kotlin">blogConfigMapper.exists(KtQueryWrapper(BlogConfig::class.java).eq(BlogConfig::configCode,&quot;init&quot;))

</code></pre><p><a href="https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus-extension/src/test/kotlin/com/baomidou/mybatisplus/test/kotlin/WrapperTest.kt" target="_blank" rel="noopener noreferrer">例子</a></p><h2 id="mybatis把xml放在java文件夹的方法" tabindex="-1"><a class="header-anchor" href="#mybatis把xml放在java文件夹的方法"><span>mybatis把xml放在java文件夹的方法</span></a></h2><pre><code class="language-xml">&lt;build&gt;
  &lt;resources&gt;
      &lt;resource&gt;
          &lt;!-- xml放在java目录下--&gt;
          &lt;directory&gt;src/main/java&lt;/directory&gt;
          &lt;includes&gt;
              &lt;include&gt;**/*.xml&lt;/include&gt;
          &lt;/includes&gt;
      &lt;/resource&gt;
      &lt;!--指定资源的位置（xml放在resources下，可以不用指定）--&gt;
      &lt;resource&gt;
          &lt;directory&gt;src/main/resources&lt;/directory&gt;
      &lt;/resource&gt;
  &lt;/resources&gt;
&lt;/build&gt;

</code></pre><p>application.properties配置</p><pre><code>mybatis-plus.mapper-locations=classpath*:**/*.xml
</code></pre><h2 id="postgres使用mybatis-plus自增主键" tabindex="-1"><a class="header-anchor" href="#postgres使用mybatis-plus自增主键"><span>postgres使用mybatis-plus自增主键</span></a></h2><p>实体类上添加</p><pre><code class="language-java">@Getter  
@Setter  
@RequiredArgsConstructor  
@AllArgsConstructor  
@KeySequence(value = &quot;company_seq&quot;, dbType = DbType.POSTGRE_SQL)  
public class Company implements Serializable {  
  @Serial  
  private static final long serialVersionUID=1L;  
  @TableId(  type = IdType.INPUT)  
  
  private Long id;  
  private String name;  
  private Integer age;  
  private String address;  
  private Integer salary;  
  private String description;  
  
}
</code></pre><p>然后再配置文件中加入<code>keyGenerator</code></p><pre><code class="language-java">
  
@Configuration  
@MapperScan(&quot;com.learn.pgbatis.mapper&quot;)  
public class MybatisPlusConfig {  
  @Bean  
  public IKeyGenerator keyGenerator() {  
    return new PostgreKeyGenerator();  
  }  
    /**  
     * 添加分页插件  
     */  
    @Bean  
    public MybatisPlusInterceptor mybatisPlusInterceptor() {  
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();  
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));//如果配置多个插件,切记分页最后添加  
        //interceptor.addInnerInterceptor(new PaginationInnerInterceptor()); 如果有多数据源可以不配具体类型 否则都建议配上具体的DbType  
        return interceptor;  
    }  
}
</code></pre>`,16),i=[o];function l(s,p){return n(),e("div",null,i)}const u=t(r,[["render",l],["__file","mybatis-plus.html.vue"]]),m=JSON.parse('{"path":"/java-tutor/orm-tutor/mybatis-plus.html","title":"mp自动生成代码","lang":"zh-CN","frontmatter":{"description":"mp自动生成代码 https://www.cnblogs.com/diffx/p/10611082.html https://pengshiyu.blog.csdn.net/article/details/107307390 https://gitee.com/best_handsome/mybatis-plus-join 自动生成代码 需要安装依赖 ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mybatis-plus.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"mp自动生成代码"}],["meta",{"property":"og:description","content":"mp自动生成代码 https://www.cnblogs.com/diffx/p/10611082.html https://pengshiyu.blog.csdn.net/article/details/107307390 https://gitee.com/best_handsome/mybatis-plus-join 自动生成代码 需要安装依赖 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T08:24:01.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T08:24:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mp自动生成代码\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T08:24:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用kotlin","slug":"使用kotlin","link":"#使用kotlin","children":[]},{"level":2,"title":"mybatis把xml放在java文件夹的方法","slug":"mybatis把xml放在java文件夹的方法","link":"#mybatis把xml放在java文件夹的方法","children":[]},{"level":2,"title":"postgres使用mybatis-plus自增主键","slug":"postgres使用mybatis-plus自增主键","link":"#postgres使用mybatis-plus自增主键","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1711268641000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":7}]},"readingTime":{"minutes":1.78,"words":533},"filePathRelative":"java-tutor/orm-tutor/mybatis-plus.md","localizedDate":"2022年3月21日","autoDesc":true}');export{u as comp,m as data};
