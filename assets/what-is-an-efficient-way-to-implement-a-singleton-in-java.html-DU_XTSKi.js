import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const o={},i=a(`<h1 id="如何创建单例" tabindex="-1"><a class="header-anchor" href="#如何创建单例"><span>如何创建单例 ？</span></a></h1><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2><p>Java 创建单例有哪些方式 ?</p><h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答"><span>解答</span></a></h2><p>实现单例，从加载方式来看，有两种:</p><ul><li>预加载</li><li>懒加载</li></ul><p>先看一下实现单例最简单的方式(预加载):</p><pre><code class="language-java">public class Foo {

    private static final Foo INSTANCE = new Foo();

    private Foo() {
        if (INSTANCE != null) {
            throw new IllegalStateException(&quot;Already instantiated&quot;);
        }
    }

    public static Foo getInstance() {
        return INSTANCE;
    }
}
</code></pre><p>再来看一下懒加载的方式:</p><pre><code class="language-java">class Foo {

    private static Foo INSTANCE = null;

    private Foo() {
        if (INSTANCE != null) {
            throw new IllegalStateException(&quot;Already instantiated&quot;);
        }
    }

    public static Foo getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new Foo();
        }
        return INSTANCE;
    }
}
</code></pre><p>以上方式在单线程的情况可以很好的满足需要，换言之，若是在多线程，还需要作一定的改进,如下所示:</p><pre><code class="language-java">class Foo {
 // 请注意 volatile 关键字的使用
    private static volatile Foo INSTANCE = null;

    private Foo() {
        if (INSTANCE != null) {
            throw new IllegalStateException(&quot;Already instantiated&quot;);
        }
    }

    public static Foo getInstance() {
        if (INSTANCE == null) { // Check 1
            synchronized (Foo.class) {
                if (INSTANCE == null) { // Check 2
                    INSTANCE = new Foo();
                }
            }
        }
        return INSTANCE;
    }
}
</code></pre><p>上述代码运用了 <a href="http://www.cs.umd.edu/~pugh/java/memoryModel/DoubleCheckedLocking.html" target="_blank" rel="noopener noreferrer">Double-Checked Locking idiom</a>。</p><p>解决了多线程环境下的单例，可以进一步思考如何实现可序列化的单例 ? 反序列化可以不通过构造函数直接生成一个对象，所以反序列化时，我们需要保证其不再创建新的对象。</p><pre><code class="language-java">class Foo implements Serializable {

    private static final long serialVersionUID = 1L;

    private static volatile Foo INSTANCE = null;

    private Foo() {
        if (INSTANCE != null) {
            throw new IllegalStateException(&quot;Already instantiated&quot;);
        }
    }

    public static Foo getInstance() {
        if (INSTANCE == null) { // Check 1
            synchronized (Foo.class) {
                if (INSTANCE == null) { // Check 2
                    INSTANCE = new Foo();
                }
            }
        }
        return INSTANCE;
    }

    @SuppressWarnings(&quot;unused&quot;)
    private Foo readResolve() {
        return INSTANCE;
    }
}
</code></pre><p>readResolve 方法可以保证，即使程序在上一次运行时序列化过此单例，也只会返回全局唯一的单例。对于 Java 对象序列化机制，可参考<a href="#appendix">附录拓展</a>。</p><p>java 创建单例的方法基本实现了，不过我们还可以作进一步的改进 —— 代码重构:</p><pre><code class="language-java">public final class Foo implements Serializable {

    private static final long serialVersionUID = 1L;

    // 使用内部静态 class 实现懒加载
    private static class FooLoader {
        // 保证在多线程环境下无差错运行
        private static final Foo INSTANCE = new Foo();
    }

     private Foo() {
        if (INSTANCE != null) {
            throw new IllegalStateException(&quot;Already instantiated&quot;);
        }
    }

    public static Foo getInstance() {
        return FooLoader.INSTANCE;
    }

    @SuppressWarnings(&quot;unused&quot;)
    private Foo readResolve() {
        return FooLoader.INSTANCE;
    }
}
</code></pre><p>好了，现在已经很完美实现了单例的创建，是不是很高兴。单例实线的基本原理，我们已经基本清楚里，最后提供一种更加简洁方法,如下:</p><pre><code class="language-java">public enum Foo {
   INSTANCE;
}
</code></pre><p>08 年 google 开发者年会中，Joshua Bloch Joshua Bloch 在 <a href="http://sites.google.com/site/io/effective-java-reloaded" target="_blank" rel="noopener noreferrer">高效 Java 话题中</a> 解释了这种方法，视频请戳 <a href="http://www.youtube.com/watch?v=pi_I7oD_uGI#t=28m50s" target="_blank" rel="noopener noreferrer">这里</a>.在 他<a href="https://14b1424d-a-62cb3a1a-s-sites.googlegroups.com/site/io/effective-java-reloaded/effective_java_reloaded.pdf?attachauth=ANoY7crKCOet2NEUGW7RV1XfM-Jn4z8YJhs0qJM11OhLRnFW_JbExkJtvJ3UJvTE40dhAciyWcRIeGJ-n3FLGnMOapHShHINh8IY05YViOJoZWzaohMtM-s4HCi5kjREagi8awWtcYD0_6G7GhKr2BndToeqLk5sBhZcQfcYIyAE5A4lGNosDCjODcBAkJn8EuO6572t2wU1LMSEUgjvqcf4I-Fp6VDhDvih_XUEmL9nuVJQynd2DRpxyuNH1SpJspEIdbLw-WWZ&amp;attredirects=0" target="_blank" rel="noopener noreferrer">演讲的ppt</a> 30-32 页提到：</p><pre><code>实现单例正确的方式如下:
</code></pre><pre><code class="language-java">    public enum Elvis {
        INSTANCE;
        private final String[] favoriteSongs =
            { &quot;Hound Dog&quot;, &quot;Heartbreak Hotel&quot; };
        public void printFavorites() {
            System.out.println(Arrays.toString(favoriteSongs));
        }
    }
</code></pre><p>在 <a href="http://www.ddj.com/java/208403883?pgno=3" target="_blank" rel="noopener noreferrer">高效 Java 线上部分</a> 有说到:</p><pre><code>上述实现单例的方式，其实等同于，将 INSTANCE 设置为 public static final 的方式，不同之处在于，使用枚举的方式显得更为简洁，且默认提供了序列化机制，也保证了多线程访问的安全。虽然这种单例的实现方式还未被广泛使用，可实现单例的最好方式就是使用一个单元素的枚举。
</code></pre><p>为什么可以这么简洁？因为 Java 中每一个枚举类型都默认继承了 java.lang.Enum ，而 Enum 实现了 Serializable 接口，所以枚举类型对象都是默认可以被序列化的。通过反编译，也可以知道枚举常量本质上就是一个</p><pre><code class="language-java">public static final xxx
</code></pre><p>stackoverflow原址：<a href="http://stackoverflow.com/questions/70689/what-is-an-efficient-way-to-implement-a-singleton-pattern-in-java" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/70689/what-is-an-efficient-way-to-implement-a-singleton-pattern-in-java</a></p>`,28),r=[i];function l(c,s){return t(),n("div",null,r)}const d=e(o,[["render",l],["__file","what-is-an-efficient-way-to-implement-a-singleton-in-java.html.vue"]]),u=JSON.parse('{"path":"/cs-tips/java-tip/stackoverflow/what-is-an-efficient-way-to-implement-a-singleton-in-java.html","title":"如何创建单例 ？","lang":"zh-CN","frontmatter":{"description":"如何创建单例 ？ 问题 Java 创建单例有哪些方式 ? 解答 实现单例，从加载方式来看，有两种: 预加载 懒加载 先看一下实现单例最简单的方式(预加载): 再来看一下懒加载的方式: 以上方式在单线程的情况可以很好的满足需要，换言之，若是在多线程，还需要作一定的改进,如下所示: 上述代码运用了 Double-Checked Locking idiom。...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/stackoverflow/what-is-an-efficient-way-to-implement-a-singleton-in-java.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"如何创建单例 ？"}],["meta",{"property":"og:description","content":"如何创建单例 ？ 问题 Java 创建单例有哪些方式 ? 解答 实现单例，从加载方式来看，有两种: 预加载 懒加载 先看一下实现单例最简单的方式(预加载): 再来看一下懒加载的方式: 以上方式在单线程的情况可以很好的满足需要，换言之，若是在多线程，还需要作一定的改进,如下所示: 上述代码运用了 Double-Checked Locking idiom。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何创建单例 ？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":2,"title":"解答","slug":"解答","link":"#解答","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.02,"words":905},"filePathRelative":"cs-tips/java-tip/stackoverflow/what-is-an-efficient-way-to-implement-a-singleton-in-java.md","localizedDate":"2023年5月25日","autoDesc":true}');export{d as comp,u as data};
