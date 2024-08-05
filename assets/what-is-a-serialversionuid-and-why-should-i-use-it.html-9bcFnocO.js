import{_ as e,c as a,o as n,d as i}from"./app-CbULZrmi.js";const r={},s=i(`<h1 id="serialversionuid-有什么作用-该如何使用" tabindex="-1"><a class="header-anchor" href="#serialversionuid-有什么作用-该如何使用"><span>serialVersionUID 有什么作用？该如何使用？</span></a></h1><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2><p>当一个对象实现 Serializable 接口时，多数 ide 会提示声明一个静态常量 serialVersionUID(版本标识），那 serialVersionUID 到底有什么作用呢？应该如何使用 serialVersionUID ？</p><h2 id="回答" tabindex="-1"><a class="header-anchor" href="#回答"><span>回答</span></a></h2><p>serialVersionUID 是实现 Serializable 接口而来的，而 Serializable 则是应用于Java 对象序列化/反序列化。对象的序列化主要有两种用途:</p><ul><li>把对象序列化成字节码，保存到指定介质上(如磁盘等)</li><li>用于网络传输</li></ul><p>现在反过来说就是，serialVersionUID 会影响到上述所提到的两种行为。那到底会造成什么影响呢？</p><p><a href="http://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html" target="_blank" rel="noopener noreferrer">java.io.Serializable</a> doc 文档，给出了一个相对详细解释:</p><p>serialVersionUID 是 Java 为每个序列化类产生的版本标识，可用来保证在反序列时，发送方发送的和接受方接收的是可兼容的对象。如果接收方接收的类的 serialVersionUID 与发送方发送的 serialVersionUID 不一致，进行反序列时会抛出 InvalidClassException。序列化的类可显式声明 serialVersionUID 的值，如下:</p><pre><code>ANY-ACCESS-MODIFIER static final long serialVersionUID = 1L;
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>当显式定义 serialVersionUID 的值时，Java 根据类的多个方面(具体可参考 Java 序列化规范)动态生成一个默认的 serialVersionUID 。尽管这样，还是议你在每一个序列化的类中显式指定 serialVersionUID 的值，因为不同的 jdk 编译很可能会生成不同的 serialVersionUID 默认值，进而导致在反序列化时出 InvalidClassExceptions 异常。所以，为了保证在不同的 jdk 编译实现中，其 serialVersionUID 的值也一致，可序列化的类必须显式指定serialVersionUID 的值。另外，serialVersionUID 的修饰符最好是 private，因为 serialVersionUID 不能被继承，所以建议使用 private 修饰serialVersionUID。</p></div><p>举例说明如下: 现在尝试通过将一个类 Person 序列化到磁盘和反序列化来说明 serialVersionUID 的作用: Person 类如下:</p><pre><code class="language-java">public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;
    private Integer age;
    private String address;

    public Person() {
    }

    public Person(String name, Integer age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }


    @Override
    public String toString() {
        return &quot;Person{&quot; +
                &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
                &quot;, age=&quot; + age +
                &quot;, address=&#39;&quot; + address + &#39;\\&#39;&#39; +
                &#39;}&#39;;
    }
}
</code></pre><p>简单的测试一下：</p><pre><code class="language-java">@Test
public void testversion1L() throws Exception {
    File file = new File(&quot;person.out&quot;);
    // 序列化
    ObjectOutputStream oout = new ObjectOutputStream(new FileOutputStream(file));
    Person person = new Person(&quot;John&quot;, 21, &quot;广州&quot;);
    oout.writeObject(person);
    oout.close();
    // 反序列化
    ObjectInputStream oin = new ObjectInputStream(new FileInputStream(file));
    Object newPerson = oin.readObject(); 
    oin.close();
    System.out.println(newPerson);
}
</code></pre><p>测试发现没有什么问题。有一天，因发展需要， 需要在 Person 中增加了一个字段 email，如下:</p><pre><code class="language-java">public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;
    private Integer age;
    private String address;
    private String email;

    public Person() {
    }

     public Person(String name, Integer age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    public Person(String name, Integer age, String address,String email) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.email = email;
    }

    @Override
    public String toString() {
        return &quot;Person{&quot; +
                &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
                &quot;, age=&quot; + age +
                &quot;, address=&#39;&quot; + address + &#39;\\&#39;&#39; +
                &quot;, email=&#39;&quot; + email + &#39;\\&#39;&#39; +
                &#39;}&#39;;
    }
}
</code></pre><p>这时我们假设和之前序列化到磁盘的 Person 类是兼容的，便不修改版本标识 serialVersionUID。再次测试如下</p><pre><code class="language-java">@Test
public void testversion1LWithExtraEmail() throws Exception {
    File file = new File(&quot;person.out&quot;);
    ObjectInputStream oin = new ObjectInputStream(new FileInputStream(file));
    Object newPerson = oin.readObject(); 
    oin.close();
    System.out.println(newPerson);
}
</code></pre><p>将以前序列化到磁盘的旧 Person 反序列化到新 Person 类时，没有任何问题。</p><p>可当我们增加 email 字段后，不作向后兼容。即放弃原来序列化到磁盘的 Person 类，这时我们可以将版本标识提高，如下:</p><pre><code class="language-java">private static final long serialVersionUID = 2L;
</code></pre><p>再次进行反序列化，则会报错，如下:</p><pre><code class="language-java">java.io.InvalidClassException:Person local class incompatible: stream classdesc serialVersionUID = 1, local class serialVersionUID = 2
</code></pre><p>谈到这里，我们大概可以清楚，serialVersionUID 就是控制版本是否兼容的，若我们认为修改的 Person 是向后兼容的，则不修改 serialVersionUID；反之，则提高 serialVersionUID的值。再回到一开始的问题，为什么 ide 会提示声明 serialVersionUID 的值呢？</p><p>因为若不显式定义 serialVersionUID 的值，Java 会根据类细节自动生成 serialVersionUID 的值，如果对类的源代码作了修改，再重新编译，新生成的类文件的serialVersionUID的取值有可能也会发生变化。类的serialVersionUID的默认值完全依赖于Java编译器的实现，对于同一个类，用不同的Java编译器编译，也有可能会导致不同的serialVersionUID。所以 ide 才会提示声明 serialVersionUID 的值。</p><p>附录拓展:</p><ul><li><a href="http://developer.51cto.com/art/201202/317181.htm" target="_blank" rel="noopener noreferrer">深入理解 Java 对象序列化</a></li><li><a href="http://www.blogjava.net/lingy/archive/2008/10/10/233630.html" target="_blank" rel="noopener noreferrer">对象的序列化和反序列化</a></li></ul><p>stackoverflow原址：<a href="http://stackoverflow.com/questions/285793/what-is-a-serialversionuid-and-why-should-i-use-it" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/285793/what-is-a-serialversionuid-and-why-should-i-use-it</a></p>`,29),t=[s];function o(l,p){return n(),a("div",null,t)}const d=e(r,[["render",o],["__file","what-is-a-serialversionuid-and-why-should-i-use-it.html.vue"]]),u=JSON.parse('{"path":"/cs-tips/java-tip/stackoverflow/what-is-a-serialversionuid-and-why-should-i-use-it.html","title":"serialVersionUID 有什么作用？该如何使用？","lang":"zh-CN","frontmatter":{"description":"serialVersionUID 有什么作用？该如何使用？ 问题 当一个对象实现 Serializable 接口时，多数 ide 会提示声明一个静态常量 serialVersionUID(版本标识），那 serialVersionUID 到底有什么作用呢？应该如何使用 serialVersionUID ？ 回答 serialVersionUID 是实现...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/stackoverflow/what-is-a-serialversionuid-and-why-should-i-use-it.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"serialVersionUID 有什么作用？该如何使用？"}],["meta",{"property":"og:description","content":"serialVersionUID 有什么作用？该如何使用？ 问题 当一个对象实现 Serializable 接口时，多数 ide 会提示声明一个静态常量 serialVersionUID(版本标识），那 serialVersionUID 到底有什么作用呢？应该如何使用 serialVersionUID ？ 回答 serialVersionUID 是实现..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"serialVersionUID 有什么作用？该如何使用？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":2,"title":"回答","slug":"回答","link":"#回答","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.7,"words":1110},"filePathRelative":"cs-tips/java-tip/stackoverflow/what-is-a-serialversionuid-and-why-should-i-use-it.md","localizedDate":"2023年5月25日","autoDesc":true}');export{d as comp,u as data};
