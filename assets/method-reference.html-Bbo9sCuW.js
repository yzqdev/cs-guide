import{_ as t,c as e,o as a,d as n}from"./app-CbULZrmi.js";const r={},s=n(`<h1 id="java方法引用" tabindex="-1"><a class="header-anchor" href="#java方法引用"><span>java方法引用</span></a></h1><h2 id="一、简介" tabindex="-1"><a class="header-anchor" href="#一、简介"><span>一、简介</span></a></h2><p>方法引用是java8的新特性之一， 可以直接引用已有Java类或对象的方法或构造器。方法引用与<a href="https://www.jianshu.com/p/8d7f98116693" target="_blank" rel="noopener noreferrer">lambda表达式</a>结合使用，可以进一步简化代码。 来看一段简单代码：</p><pre><code class="language-java">    public static void main(String[] args) {
        List&lt;String&gt; strList = Arrays.asList(new String[] { &quot;a&quot;, &quot;c&quot;, &quot;b&quot; });

        strList.stream().sorted((s1, s2) -&gt; s1.compareToIgnoreCase(s2)).forEach(s -&gt; System.out.println(s));
    }
</code></pre><p>上述程序生成一个Stream流，对流中的字符串进行排序并遍历打印。程序中采用lambda表达式的方式代替匿名类简化了代码，然而代码中两处lambda表达式都仅仅调用的是一个已存在的方法：String.compareToIgnoreCase、System.out.println，这种情况可以用方法引用来简化：</p><pre><code class="language-java">    public static void main(String[] args) {

        List&lt;String&gt; strList = Arrays.asList(new String[] { &quot;a&quot;, &quot;c&quot;, &quot;b&quot; });

        strList.stream().sorted(String::compareToIgnoreCase).forEach(System.out::println);
    }
</code></pre><p>对比一下可以看到，上述程序分别采用了<strong>类的任意对象的实例方法引用</strong>和<strong>特定对象的实例方法引用</strong>两种方法引用形式（下一章会讲述），采用方法引用的方式可以简化lambda表达式的写法。</p><h2 id="二、方法引用的具体使用" tabindex="-1"><a class="header-anchor" href="#二、方法引用的具体使用"><span>二、方法引用的具体使用</span></a></h2><p>java8方法引用有四种形式：</p><ul><li>静态方法引用　　　　　　　：　 　ClassName :: staticMethodName</li><li>构造器引用　　　　　　　　：　 　ClassName :: new</li><li>类的任意对象的实例方法引用：　 　ClassName :: instanceMethodName</li><li>特定对象的实例方法引用　　：　 　object :: instanceMethodName</li></ul><p>lambda表达式可用方法引用代替的<strong>场景</strong>可以简要概括为：<strong>lambda表达式的主体仅包含一个表达式，且该表达式仅调用了一个已经存在的方法</strong>。方法引用的<strong>通用特性</strong>：<strong>方法引用所使用方法的入参和返回值与lambda表达式实现的函数式接口的入参和返回值一致</strong>。</p><h2 id="_2-1-静态方法引用" tabindex="-1"><a class="header-anchor" href="#_2-1-静态方法引用"><span>2.1 静态方法引用</span></a></h2><p>静态方法引用的语法格式为： <strong>类名::静态方法名</strong> ，如 System.out::println 等价于lambda表达式 s -&gt; System.out.println(s) ，代码示例：</p><pre><code class="language-java">public class Test
{
    public static void main(String[] args)
    {
        //lambda表达式使用：
        Arrays.asList(new String[] {&quot;a&quot;, &quot;c&quot;, &quot;b&quot;}).stream().forEach(s -&gt; Test.println(s));
        //静态方法引用：
        Arrays.asList(new String[] {&quot;a&quot;, &quot;c&quot;, &quot;b&quot;}).stream().forEach(Test::println);
    }
    
    public static void println(String s)
    {
        System.out.println(s);
    }
}
</code></pre><p><strong>静态方法引用适用于lambda表达式主体中仅仅调用了某个类的静态方法的情形</strong>。</p><h2 id="_2-2-构造器引用" tabindex="-1"><a class="header-anchor" href="#_2-2-构造器引用"><span>2.2 构造器引用</span></a></h2><p>&amp;nbsp构造器引用的语法格式为： <strong>类名::new</strong> ，如<code>() -&gt; new ArrayList&lt;String&gt;() 等价于 ArrayList&lt;String&gt;::new</code>，代码示例：</p><pre><code class="language-java">Supplier&lt;List&lt;String&gt;&gt; supplier1= () -&gt; new  ArrayList&lt;String&gt;();
</code></pre><p>等价于</p><pre><code class="language-java">Supplier&lt;List&lt;String&gt;&gt; supplier = ArrayList&lt;String&gt;::new;
</code></pre><p><strong>构造器引用适用于lambda表达式主体中仅仅调用了某个类的构造函数返回实例的场景</strong>。</p><h2 id="_2-3-类的任意对象的实例方法引用" tabindex="-1"><a class="header-anchor" href="#_2-3-类的任意对象的实例方法引用"><span>2.3 类的任意对象的实例方法引用</span></a></h2><p>&amp;nbsp类的任意对象的实例方法引用的语法格式为： <strong>类名::实例方法名</strong> ， 这种方法引用相对比较复杂，我们来看示例：</p><p>一、示例1</p><pre><code class="language-java">  Arrays.sort(strs,(s1,s2)-&gt;s1.compareToIgnoreCase(s2));
</code></pre><p>等价于</p><pre><code class="language-java">  Arrays.sort(strs, String::compareToIgnoreCase);
</code></pre><p>上述示例中，strs为一个String数组，lambda表达式(s1,s2)-&gt;s1.compareToIgnoreCase(s2)实现函数式接口的是Comparator接口, 我们看下jdk8中Comparator接口的源码（截取部分）：</p><pre><code class="language-java">  @FunctionalInterface
  public interface Comparator&lt;T&gt; {
      int compare(T o1, T o2);
  }
</code></pre><p>而String类的compareToIgnoreCase方法源码为：</p><pre><code class="language-java">    public int compareToIgnoreCase(String str) {
        return CASE_INSENSITIVE_ORDER.compare(this, str);
    }
</code></pre><p>可以发现函数式接口<code>Comparator&lt;String&gt;的compare</code>方法比String类的compareToIgnoreCase方法多了一个String类型的入参。看到这里对类的任意对象的实例方法引用的使用可能似懂非懂，下面我们看一个自己实现一个类的任意对象的实例方法引用的示例（示例2）。</p><p>二、示例2</p><pre><code class="language-java">public class Student
{
    
    private String name;
    
    private Integer score;
    
    public void setNameAndScore(String name, Integer score)
    {
        this.name = name;
        this.score = score;
        System.out.println(&quot;Student &quot;+  name +&quot;&#39;s score is &quot; + score);
    }
    public static void main(String[] args)
    {
        /*lambda表达式的用法：
        TestInterface testInterface = (student, name, score) -&gt; student.setNameAndScore(name, score);*/
        //类的任意对象的实例方法引用的用法:
        TestInterface testInterface = Student::setNameAndScore;
        testInterface.set(new Student(), &quot;DoubleBin&quot;, 100);
    }
    
    @FunctionalInterface
    interface TestInterface
    {
        // 注意：入参比Student类的setNameAndScore方法多1个Student对象，除第一个外其它入参类型一致
        public void set(Student d, String name, Integer score);
    }
}
</code></pre><p>看完上述代码，我们可以总结出<strong>类的任意对象的实例方法引用的特性</strong>为：</p><ul><li>1、方法引用的<strong>通用特性</strong>：方法引用所使用方法的入参和返回值与lambda表达式实现的函数式接口的入参和返回值一致；</li><li>2、<strong>lambda表达式的第一个入参为实例方法的调用者，后面的入参与实例方法的入参一致</strong>。</li></ul><h2 id="_2-4-特定对象的实例方法引用" tabindex="-1"><a class="header-anchor" href="#_2-4-特定对象的实例方法引用"><span>2.4 特定对象的实例方法引用</span></a></h2><p>&amp;nbsp特定对象的实例方法引用的语法格式为： <strong>对象::实例方法名</strong> ， 示例代码：</p><pre><code class="language-java">public class Test
{
    public static void main(String[] args)
    {
        Test test = new Test();
        // lambda表达式使用：
        Arrays.asList(new String[] {&quot;a&quot;, &quot;c&quot;, &quot;b&quot;}).stream().forEach(s -&gt; test.println(s));
        // 特定对象的实例方法引用：
        Arrays.asList(new String[] {&quot;a&quot;, &quot;c&quot;, &quot;b&quot;}).stream().forEach(test::println);
    }
    
    public void println(String s)
    {
        System.out.println(s);
    }
}
</code></pre><p><strong>特定对象的实例方法引用适用于lambda表达式的主体中仅仅调用了某个对象的某个实例方法的场景</strong>。</p><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结"><span>三、总结</span></a></h2><p>方法引用使用运算符::连接类(或对象)与方法名称(或new)实现在特定场景下lambda表达式的简化表示，使用时要注意方法引用的使用场景及各种方法引用的特性。使用方法引用的好处是能够更进一步简化代码编写，使代码更简洁。 <strong>然而作者认为，方法引用代替lambda表达式对代码的简化程度远远没有lambda表达式代替匿名类的简化程度大， 有时反而增加了代码的理解难度(如2.3节：类的任意对象的实例方法引用)，且使用场景的局限性不利于增加或修改代码，个人认为有时没有必要刻意使用方法引用~</strong></p>`,42),o=[s];function i(l,c){return a(),e("div",null,o)}const d=t(r,[["render",i],["__file","method-reference.html.vue"]]),g=JSON.parse('{"path":"/java-tutor/java-tips/method-reference.html","title":"java方法引用","lang":"zh-CN","frontmatter":{"description":"java方法引用 一、简介 方法引用是java8的新特性之一， 可以直接引用已有Java类或对象的方法或构造器。方法引用与lambda表达式结合使用，可以进一步简化代码。 来看一段简单代码： 上述程序生成一个Stream流，对流中的字符串进行排序并遍历打印。程序中采用lambda表达式的方式代替匿名类简化了代码，然而代码中两处lambda表达式都仅仅调...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/method-reference.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java方法引用"}],["meta",{"property":"og:description","content":"java方法引用 一、简介 方法引用是java8的新特性之一， 可以直接引用已有Java类或对象的方法或构造器。方法引用与lambda表达式结合使用，可以进一步简化代码。 来看一段简单代码： 上述程序生成一个Stream流，对流中的字符串进行排序并遍历打印。程序中采用lambda表达式的方式代替匿名类简化了代码，然而代码中两处lambda表达式都仅仅调..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T12:34:23.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T12:34:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java方法引用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T12:34:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"一、简介","slug":"一、简介","link":"#一、简介","children":[]},{"level":2,"title":"二、方法引用的具体使用","slug":"二、方法引用的具体使用","link":"#二、方法引用的具体使用","children":[]},{"level":2,"title":"2.1 静态方法引用","slug":"_2-1-静态方法引用","link":"#_2-1-静态方法引用","children":[]},{"level":2,"title":"2.2 构造器引用","slug":"_2-2-构造器引用","link":"#_2-2-构造器引用","children":[]},{"level":2,"title":"2.3 类的任意对象的实例方法引用","slug":"_2-3-类的任意对象的实例方法引用","link":"#_2-3-类的任意对象的实例方法引用","children":[]},{"level":2,"title":"2.4 特定对象的实例方法引用","slug":"_2-4-特定对象的实例方法引用","link":"#_2-4-特定对象的实例方法引用","children":[]},{"level":2,"title":"三、总结","slug":"三、总结","link":"#三、总结","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1711283663000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":5.01,"words":1502},"filePathRelative":"java-tutor/java-tips/method-reference.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,g as data};
