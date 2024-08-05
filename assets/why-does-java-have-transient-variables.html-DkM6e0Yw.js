import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const r={},o=n(`<h1 id="transient-关键字的作用" tabindex="-1"><a class="header-anchor" href="#transient-关键字的作用"><span>transient 关键字的作用?</span></a></h1><p><a href="http://docs.oracle.com/javase/specs/jls/se7/html/jls-8.html#jls-8.3.1.3" target="_blank" rel="noopener noreferrer">Java 语言规范</a>中提到,transient 关键字用来说明指定属性不进行序列化.</p><p>若要理解 transient 关键字的作用,自然需要对序列化有一定的认识.</p><p><strong>序列化</strong></p><p>序列化是用来持久化对象的状态 -- 将对象转化为字节码保存到指定的文件中.类似地,可以通过反序列化,将字节码还原为对象原有的状态.序列化是 Java 中一个比较重要的概念,因为在网络编程中会经常用到序列化与反序列化机制.一个相对若想在网络中传输,就必须转化为字节的形式.而 Serializable 接口就是用来标识某个类或接口可以转化为字节码,Serializable 可以认为是一个标识符,因为它没有任何的方法.</p><p>Serializable 允许我们将一个类转化为字节码,进而在网络传输.可是,一个类中可能存在某些敏感的信息,我们是不想在网络中传输的,这时候我们就需要借助 transient 关键字了.被 transient 关键字标识的 field,不会进行序列化.</p><p>下面通过一个例子说明 transient 关键字的作用.现假设我们需要在网络中传输 Person 类:</p><pre><code class="language-java">public class Person implements Serializable{

    private static final long serialVersionUID = 1L;

    private String name;
    private String certNo; // 身份证号码
    private int age;

    public Person(String name, String certNo, int age) {
        this.name = name;
        this.certNo = certNo;
        this.age = age;
    }

    @Override
    public String toString() {
        return &quot;Person{&quot; +
                &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
                &quot;, certNo=&#39;&quot; + certNo + &#39;\\&#39;&#39; +
                &quot;, age=&quot; + age +
                &#39;}&#39;;
    }
}
</code></pre><p>若不使用 transient 关键字,反序列化时输出的信息是 :</p><pre><code>Person{name=&#39;tianya&#39;, certNo=&#39;12314&#39;, age=23}
</code></pre><p>我们知道,身份证号码属于敏感信息,并不想在网络中传输,这时我们就可以借助 transient 关键字,如下:</p><pre><code> private transient String certNo;
</code></pre><p>这个时候,通过反序列化获取的 Person 信息如下 :</p><pre><code>Person{name=&#39;tianya&#39;, certNo=&#39;null&#39;, age=23}
</code></pre><p>stackoverflow原址：<a href="http://stackoverflow.com/questions/910374/why-does-java-have-transient-variables" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/910374/why-does-java-have-transient-variables</a></p>`,15),i=[o];function s(p,c){return a(),t("div",null,i)}const d=e(r,[["render",s],["__file","why-does-java-have-transient-variables.html.vue"]]),v=JSON.parse('{"path":"/cs-tips/java-tip/stackoverflow/why-does-java-have-transient-variables.html","title":"transient 关键字的作用?","lang":"zh-CN","frontmatter":{"description":"transient 关键字的作用? Java 语言规范中提到,transient 关键字用来说明指定属性不进行序列化. 若要理解 transient 关键字的作用,自然需要对序列化有一定的认识. 序列化 序列化是用来持久化对象的状态 -- 将对象转化为字节码保存到指定的文件中.类似地,可以通过反序列化,将字节码还原为对象原有的状态.序列化是 Java ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/stackoverflow/why-does-java-have-transient-variables.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"transient 关键字的作用?"}],["meta",{"property":"og:description","content":"transient 关键字的作用? Java 语言规范中提到,transient 关键字用来说明指定属性不进行序列化. 若要理解 transient 关键字的作用,自然需要对序列化有一定的认识. 序列化 序列化是用来持久化对象的状态 -- 将对象转化为字节码保存到指定的文件中.类似地,可以通过反序列化,将字节码还原为对象原有的状态.序列化是 Java ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"transient 关键字的作用?\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.7,"words":511},"filePathRelative":"cs-tips/java-tip/stackoverflow/why-does-java-have-transient-variables.md","localizedDate":"2023年5月25日","autoDesc":true}');export{d as comp,v as data};
