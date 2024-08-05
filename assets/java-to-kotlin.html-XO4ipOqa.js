import{_ as t,c as e,o as a,d as n}from"./app-CbULZrmi.js";const o={},i=n(`<h1 id="java到kotlin的用法" tabindex="-1"><a class="header-anchor" href="#java到kotlin的用法"><span>java到kotlin的用法</span></a></h1><h2 id="接口使用" tabindex="-1"><a class="header-anchor" href="#接口使用"><span>接口使用</span></a></h2><p>java</p><pre><code class="language-java">button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        button.setOnClickListener((v) -&gt; {
            
        });
</code></pre><p>kotlin</p><pre><code class="language-kotlin">
 

button.setOnClickListener(object : View.OnClickListener{
    override fun onClick(v: View?) {

    }
})
     button.setOnClickListener {

     }

</code></pre><h2 id="array" tabindex="-1"><a class="header-anchor" href="#array"><span>array</span></a></h2><pre><code class="language-kotlin">val list = ArrayList&lt;String&gt;() // 非空（构造函数结果）
list.add(&quot;Item&quot;)
val size = list.size // 非空（原生 int）
val item = list[0] // 推断为平台类型（普通 Java 对象）
</code></pre>`,8),r=[i];function l(c,s){return a(),e("div",null,r)}const d=t(o,[["render",l],["__file","java-to-kotlin.html.vue"]]),v=JSON.parse('{"path":"/java-tutor/kt-tips/java-to-kotlin.html","title":"java到kotlin的用法","lang":"zh-CN","frontmatter":{"description":"java到kotlin的用法 接口使用 java kotlin array","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/kt-tips/java-to-kotlin.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java到kotlin的用法"}],["meta",{"property":"og:description","content":"java到kotlin的用法 接口使用 java kotlin array"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-14T11:30:49.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-14T11:30:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java到kotlin的用法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-14T11:30:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"接口使用","slug":"接口使用","link":"#接口使用","children":[]},{"level":2,"title":"array","slug":"array","link":"#array","children":[]}],"git":{"createdTime":1683806306000,"updatedTime":1684063849000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.26,"words":77},"filePathRelative":"java-tutor/kt-tips/java-to-kotlin.md","localizedDate":"2023年5月11日","autoDesc":true}');export{d as comp,v as data};
