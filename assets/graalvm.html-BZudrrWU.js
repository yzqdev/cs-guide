import{_ as e,c as t,o as a,d as r}from"./app-CbULZrmi.js";const n={},l=r(`<h1 id="使用graalvm" tabindex="-1"><a class="header-anchor" href="#使用graalvm"><span>使用graalvm</span></a></h1><h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装"><span>下载安装</span></a></h2><p>下载地址<a href="https://github.com/graalvm/graalvm-ce-builds/releases" target="_blank" rel="noopener noreferrer">https://github.com/graalvm/graalvm-ce-builds/releases</a></p><p>解压后直接配置<code>JAVA_HOME</code>为<code>C:\\Users\\yanni\\.jdks\\graalvm-ce-java17-22.1.0</code> 再配置<code>GRAALVM_HOME</code>为<code>C:\\Users\\yanni\\.jdks\\graalvm-ce-java17-22.1.0</code> 安装 GraalVM Native Image，运行命令：</p><pre><code class="language-shell">gu install native-image
</code></pre><p>通过上述步骤，已经安装好了 GraalVM 的基础组件，如果需要额外支持 Python、R 等语言，需要使用 gu 组件。</p><pre><code class="language-shell">gu install ruby
gu install r
gu install python
gu install wasm
</code></pre><h3 id="配置好springboot项目" tabindex="-1"><a class="header-anchor" href="#配置好springboot项目"><span>配置好springboot项目</span></a></h3><p>可以再<a href="https://start.spring.io/" target="_blank" rel="noopener noreferrer">https://start.spring.io/</a>查看spring-native配置</p><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h2><p>该插件在 Maven 中央仓库不存在，需要指定 pluginRepositories 和 repositories： 先在<code>$userhome/.m2</code>文件夹把settings.xml里面的mirror改一下</p><pre><code class="language-xml">&lt;mirror&gt;
      &lt;id&gt;aliyunmaven&lt;/id&gt;
      &lt;mirrorOf&gt;*,!papermc-repo,!spigotmc-repo,!placeholderapi,!citizens-repo,!jitpack.io,!dmulloy2-repo,!spring-releases&lt;/mirrorOf&gt;
      &lt;name&gt;阿里云公共仓库&lt;/name&gt;

      &lt;url&gt;https://maven.aliyun.com/repository/public&lt;/url&gt;
    &lt;/mirror&gt;
</code></pre><p>添加源</p><pre><code class="language-xml">&lt;repositories&gt;
    &lt;repository&gt;
        &lt;id&gt;spring-milestones&lt;/id&gt;
        &lt;name&gt;Spring Milestones&lt;/name&gt;
        &lt;url&gt;&lt;https://repo.spring.io/milestone&gt;&lt;/url&gt;
    &lt;/repository&gt;
&lt;/repositories&gt;
&lt;pluginRepositories&gt;
    &lt;pluginRepository&gt;
        &lt;id&gt;spring-milestones&lt;/id&gt;
        &lt;name&gt;Spring Milestones&lt;/name&gt;
        &lt;url&gt;&lt;https://repo.spring.io/milestone&gt;&lt;/url&gt;
    &lt;/pluginRepository&gt;
&lt;/pluginRepositories&gt;
</code></pre><h3 id="打包" tabindex="-1"><a class="header-anchor" href="#打包"><span>打包</span></a></h3><pre><code class="language-shell">
mvn -Pnative -DskipTests package
</code></pre><p><a href="https://juejin.cn/post/6847902225012883469" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/6847902225012883469</a></p>`,17),o=[l];function s(i,p){return a(),t("div",null,o)}const c=e(n,[["render",s],["__file","graalvm.html.vue"]]),m=JSON.parse('{"path":"/java-tutor/springboot/graalvm.html","title":"使用graalvm","lang":"zh-CN","frontmatter":{"description":"使用graalvm 下载安装 下载地址https://github.com/graalvm/graalvm-ce-builds/releases 解压后直接配置JAVA_HOME为C:\\\\Users\\\\yanni\\\\.jdks\\\\graalvm-ce-java17-22.1.0 再配置GRAALVM_HOME为C:\\\\Users\\\\yanni\\\\.jdks\\\\graa...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/graalvm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"使用graalvm"}],["meta",{"property":"og:description","content":"使用graalvm 下载安装 下载地址https://github.com/graalvm/graalvm-ce-builds/releases 解压后直接配置JAVA_HOME为C:\\\\Users\\\\yanni\\\\.jdks\\\\graalvm-ce-java17-22.1.0 再配置GRAALVM_HOME为C:\\\\Users\\\\yanni\\\\.jdks\\\\graa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-18T06:54:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-18T06:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用graalvm\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-18T06:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"下载安装","slug":"下载安装","link":"#下载安装","children":[{"level":3,"title":"配置好springboot项目","slug":"配置好springboot项目","link":"#配置好springboot项目","children":[]}]},{"level":2,"title":"注意事项","slug":"注意事项","link":"#注意事项","children":[{"level":3,"title":"打包","slug":"打包","link":"#打包","children":[]}]}],"git":{"createdTime":1655535285000,"updatedTime":1655535285000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.83,"words":249},"filePathRelative":"java-tutor/springboot/graalvm.md","localizedDate":"2022年6月18日","autoDesc":true}');export{c as comp,m as data};
