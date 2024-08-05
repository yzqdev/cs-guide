import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const o={},r=n(`<h1 id="java-是否支持默认的参数值" tabindex="-1"><a class="header-anchor" href="#java-是否支持默认的参数值"><span>Java 是否支持默认的参数值？</span></a></h1><p>在 c++ 中，常见到如下的方法定义(param3 默认为 false)：</p><pre><code class="language-cpp">void MyParameterizedFunction(String param1, int param2, bool param3=false);
</code></pre><p>那在 java 中，是否也支持这样的定义方式？</p><p>答案是否定的，不过我们可以通过多种方式处理这种参数默认值的情况。</p><h3 id="创建者模式" tabindex="-1"><a class="header-anchor" href="#创建者模式"><span><a href="http://en.wikipedia.org/wiki/Builder_pattern" target="_blank" rel="noopener noreferrer">创建者模式</a></span></a></h3><p>使用创建者模式，你可以设定部分参数是有默认值，部分参数是可选的。如：</p><pre><code class="language-java">Student s1 = new StudentBuilder().name(&quot;Eli&quot;).buildStudent();
Student s2 = new StudentBuilder()
                 .name(&quot;Spicoli&quot;)
                 .age(16)
                 .motto(&quot;Aloha, Mr Hand&quot;)
                 .buildStudent();
</code></pre><h3 id="方法-构造函数-重载" tabindex="-1"><a class="header-anchor" href="#方法-构造函数-重载"><span>方法（构造函数）重载</span></a></h3><p>如:</p><pre><code class="language-java">void foo(String a, Integer b) {
    //...
}

void foo(String a) {
    foo(a, 0); // here, 0 is a default value for b
}

foo(&quot;a&quot;, 2);
foo(&quot;a&quot;);
</code></pre><p>构造函数重载，对于参数比较少的情况下，比较适合；当参数相对多的时候，可以考虑使用静态工厂方法，或添加一个参数辅助对象。</p><p>如果是常规方法重载，可以考虑使用 参数辅助对象，或者重命名多种情况（比如说，有多个开银行卡的重载方法，可以根据需要重命名为 开交行卡，开招行卡 等多种方法）。</p><h3 id="null-的传递" tabindex="-1"><a class="header-anchor" href="#null-的传递"><span>null 的传递</span></a></h3><p>当有多个默认参数时，可以考虑传递 null，当参数为 null 时，将参数设为 默认值。如：</p><pre><code class="language-java">void foo(String a, Integer b, Integer c) {
    b = b != null ? b : 0;
    c = c != null ? c : 0;
    //...
}

foo(&quot;a&quot;, null, 2);
</code></pre><h3 id="多参数方式" tabindex="-1"><a class="header-anchor" href="#多参数方式"><span>多参数方式</span></a></h3><p>当有多个参数，且某些参数可以忽略不设置的情况下，可以考虑使用多参数方式。</p><ul><li>可选的参数类型的一致</li></ul><pre><code class="language-java">void foo(String a, Integer... b) {
    Integer b1 = b.length &gt; 0 ? b[0] : 0;
    Integer b2 = b.length &gt; 1 ? b[1] : 0;
    //...
}

foo(&quot;a&quot;);
foo(&quot;a&quot;, 1, 2);
</code></pre><ul><li>可选参数类型不一致</li></ul><pre><code class="language-java">void foo(String a, Object... b) {
    Integer b1 = 0;
    String b2 = &quot;&quot;;
    if (b.length &gt; 0) {
      if (!(b[0] instanceof Integer)) { 
          throw new IllegalArgumentException(&quot;...&quot;);
      }
      b1 = (Integer)b[0];
    }
    if (b.length &gt; 1) {
        if (!(b[1] instanceof String)) { 
            throw new IllegalArgumentException(&quot;...&quot;);
        }
        b2 = (String)b[1];
        //...
    }
    //...
}

foo(&quot;a&quot;);
foo(&quot;a&quot;, 1);
foo(&quot;a&quot;, 1, &quot;b2&quot;);
</code></pre><h3 id="使用-map-作为方法中的参数" tabindex="-1"><a class="header-anchor" href="#使用-map-作为方法中的参数"><span>使用 Map 作为方法中的参数</span></a></h3><p>当参数很多，且大部分参数都会使用默认值的情况，可以使用 Map 作为方法中的参数。</p><pre><code class="language-java">void foo(Map&lt;String, Object&gt; parameters) {
    String a = &quot;&quot;; 
    Integer b = 0;
    if (parameters.containsKey(&quot;a&quot;)) { 
        if (!(parameters.get(&quot;a&quot;) instanceof Integer)) { 
            throw new IllegalArgumentException(&quot;...&quot;);
        }
        a = (String)parameters.get(&quot;a&quot;);
    }
    if (parameters.containsKey(&quot;b&quot;)) { 
        //... 
    }
    //...
}

foo(ImmutableMap.&lt;String, Object&gt;of(
    &quot;a&quot;, &quot;a&quot;,
    &quot;b&quot;, 2, 
    &quot;d&quot;, &quot;value&quot;)); 
</code></pre><p>stackoverflow原址：<a href="https://stackoverflow.com/questions/997482/does-java-support-default-parameter-values" target="_blank" rel="noopener noreferrer">https://stackoverflow.com/questions/997482/does-java-support-default-parameter-values</a></p>`,26),l=[r];function u(i,p){return a(),t("div",null,l)}const c=e(o,[["render",u],["__file","default-parameter-values.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/java-tips/default-parameter-values.html","title":"Java 是否支持默认的参数值？","lang":"zh-CN","frontmatter":{"description":"Java 是否支持默认的参数值？ 在 c++ 中，常见到如下的方法定义(param3 默认为 false)： 那在 java 中，是否也支持这样的定义方式？ 答案是否定的，不过我们可以通过多种方式处理这种参数默认值的情况。 创建者模式 使用创建者模式，你可以设定部分参数是有默认值，部分参数是可选的。如： 方法（构造函数）重载 如: 构造函数重载，对于参...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/default-parameter-values.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Java 是否支持默认的参数值？"}],["meta",{"property":"og:description","content":"Java 是否支持默认的参数值？ 在 c++ 中，常见到如下的方法定义(param3 默认为 false)： 那在 java 中，是否也支持这样的定义方式？ 答案是否定的，不过我们可以通过多种方式处理这种参数默认值的情况。 创建者模式 使用创建者模式，你可以设定部分参数是有默认值，部分参数是可选的。如： 方法（构造函数）重载 如: 构造函数重载，对于参..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-18T06:54:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-18T06:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 是否支持默认的参数值？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-18T06:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":3,"title":"创建者模式","slug":"创建者模式","link":"#创建者模式","children":[]},{"level":3,"title":"方法（构造函数）重载","slug":"方法-构造函数-重载","link":"#方法-构造函数-重载","children":[]},{"level":3,"title":"null 的传递","slug":"null-的传递","link":"#null-的传递","children":[]},{"level":3,"title":"多参数方式","slug":"多参数方式","link":"#多参数方式","children":[]},{"level":3,"title":"使用 Map 作为方法中的参数","slug":"使用-map-作为方法中的参数","link":"#使用-map-作为方法中的参数","children":[]}],"git":{"createdTime":1647947241000,"updatedTime":1655535285000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2,"words":600},"filePathRelative":"java-tutor/java-tips/default-parameter-values.md","localizedDate":"2022年3月22日","autoDesc":true}');export{c as comp,d as data};
