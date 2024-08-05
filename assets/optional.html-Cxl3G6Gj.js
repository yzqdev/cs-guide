import{_ as t,c as e,o as n,d as a}from"./app-CbULZrmi.js";const l={},o=a(`<h1 id="java的optional类用法" tabindex="-1"><a class="header-anchor" href="#java的optional类用法"><span>java的optional类用法</span></a></h1><ol><li>简介 本文简要介绍一下Java 8 引入的 Optional 类。引入Optional 类的主要目的是为使用可选值代替 null 提供类型级解决方案。如果，你想知道为什么需要更深入的了解和使用 Optional 类，可以参考甲骨文官方文章。</li></ol><p>查找另一个教程 <a href="https://blog.csdn.net/weixin_30905133/article/details/96832342" target="_blank" rel="noopener noreferrer">链接</a> Optional 是 java.util.package 的一部分，为了能够使用，需要导入Optional：</p><pre><code class="language-java">import java.util.Optional;
</code></pre><ol start="2"><li>创建 Optional 对象 有多种方式可以创建 Optional 对象，可以使用下面的方法创建一个空的 Optianal对象:</li></ol><pre><code class="language-java">    @Test
    public void test_createsEmptyOptionalObject() throws Exception {
        Optional&lt;Object&gt; empty = Optional.empty();
        assertFalse(empty.isPresent());
    }
</code></pre><ol start="3"><li>可以使用 isPresent API 来检查 Optional 对象是否有封装的值，当且仅当 <em>Optional</em> 封装了非 null 值时，API才返回 true。</li></ol><p>还可以使用 Optional 提供了静态方法创建 Optional 对象：</p><pre><code class="language-java">@Test
public void test_createOptionalObjectWithStaticMethod() throws Exception {
    String val = &quot;not null&quot;;
    Optional&lt;String&gt; hasVal = Optional.of(val);
    assertTrue(hasVal.isPresent());
}
</code></pre><p>如果 Optional 对象有封装的值（非 null ），可以对封装的值进行处理：</p><pre><code class="language-java">@Test
public void test_processOptionalValue() throws Exception {
    String val = &quot;not null&quot;;
    Optional&lt;String&gt; hasVal = Optional.of(val);
    System.out.println(hasVal.toString());
    assertEquals(&quot;Optional[not null]&quot;, hasVal.toString());
}
</code></pre><p>当使用 Optional 提供的静态方法 of 创建 Optional 对象时，方法的参数不能null，否则，方法会抛出 NullPointerException：</p><pre><code class="language-java">@Test(expected = NullPointerException.class)
public void test_throwNullPointerException() throws Exception {
    String val = null;
    Optional&lt;String&gt; hasVal = Optional.of(val);
}
</code></pre><p>如果构建 Optional 对象时可以传入 null 参数，可以使用 ofNullable 方法代替of ：</p><pre><code class="language-java">@Test
public void test_passNullParamNoException() throws Exception {
    String val = null;
    Optional&lt;String&gt; hasVal = Optional.ofNullable(val);
    assertFalse(hasVal.isPresent());
}
</code></pre><p>使用 ofNullable 方法创建 Optional 对象时，如果传入一个 null 参数，方法不会抛出异常，而是返回一个空的 Optional 对象，和使用 Optional.empty API 创建的一样。</p><ol start="3"><li>检查值是否存在 当得到一个从其他方法返回或自己创建的 Optional 对象后，可以使用isPresent API 检查 Optional 对象是否有封装值：</li></ol><pre><code class="language-java">@Test  
public void test_checkValuePresentOrNot() throws Exception {
Optional opt = Optional.of(&quot;has value&quot;);
assertTrue(opt.isPresent()); 
}
</code></pre><ol start="4"><li>当且仅当Optional 对象封装一个非空值时，isPresent API才返回true。</li></ol><pre><code class="language-java"> opt = Optional.ofNullable(null);
 assertFalse(opt.isPresent());
</code></pre><p>在Java 11 中可以使用 isEmpty API 完成相反的工作:</p><pre><code class="language-java">@Test
public void test_checkValuePresentOrNotJava11() throws Exception {
    Optional&lt;String&gt; opt = Optional.of(&quot;has value&quot;);
    assertFalse(opt.isEmpty());

    opt = Optional.ofNullable(null);
    assertTrue(opt.isEmpty());
}
</code></pre><p>当且仅当 Optional 对象封装的值为 null 时，isEmpty 返回true，其他情况返回false。</p><ol start="4"><li>使用 ifPresent() 进行条件处理 ifPresent API 允许我们在 Optional 对象封装的值非空时执行一些代码，在没有Optional 之前，最常用的方法是使用 if 语句进行判断，结果为真时执行代码逻辑：</li></ol><pre><code class="language-java">if(name != null){
System.out.println(name.length);
}
</code></pre><ol start="5"><li>这段代码在执行其他代码之前先检查 name 变量是否为 null。冗长并不是这种方法的唯一问题一，这种方法固有很多潜在的bug。</li></ol><p>在习惯了这种方法之后，很容易忘记在代码的某些部分执行空检查。如果 null 值进入该代码，可能会在运行时导致 NullPointerException 异常。 当程序因输入问题而失败时，通常是编码不够健壮导致，也是代码实践不好的结果。 作为强制执行良好编程实践的一种方式，Optional 可以明确地处理 null。 在典型的函数式编程风格中，我们可以对实际存在的对象执行操作，使用Java 8重构上面的代码如下：</p><pre><code class="language-java">@Test
public void doSomeThingWhenExist()  throws Exception {
    Optional&lt;String&gt; opt = Optional.of(&quot;baeldung&quot;);
    opt.ifPresent(name -&gt; System.out.println(name.length()));
}
</code></pre><ol start="5"><li>使用 orElse 获取封装的值 orElse API 用于从 Optional 实例中获取封装的值，orElse 的唯一参数作为Optional 无封装值时的默认值，这点类似 System.getProperty API。如果，Optional 有封装值 orElse API返回 Optional 封装的值，否则返回参数的值。</li></ol><pre><code class="language-java">    @Test
    public void test_getValueUseorElse() throws Exception {
        Optional hasVal = Optional.of(&quot;Hello&quot;);
        String val = hasVal.orElse(&quot;no value&quot;);
        assertEquals(&quot;Hello&quot;, val);
    }
</code></pre><pre><code class="language-java"> Optional&lt;String&gt; noVal = Optional.empty();
 String defaultVal = noVal.orElse(&quot;default&quot;);
 assertEquals(&quot;default&quot;, defaultVal);
</code></pre><ol start="6"><li>使用 orElseGet 获封装的值 orElseGet API 功能和 orElse 类似，两者的不同之处在于 orElseGet 的参数为一个 Supplier 实例，当 Optional 对象无封装值时，orElseGet 调用 Supplier 实例的 get 方法，并将返回值作为 orElseGet 的返回值。</li></ol><pre><code class="language-java">    @Test
    public void test_getValueUseorElseget() throws Exception {
        Optional&lt;String&gt; hasVal = Optional.of(&quot;Hello&quot;);
        String val = hasVal.orElseGet(() -&gt; &quot;no value&quot;);
        assertEquals(&quot;Hello&quot;, val);
    }


 Optional&lt;String&gt; noVal = Optional.empty();
 String defaultVal = noVal.orElseGet(() -&gt; &quot;default&quot;);
 assertEquals(&quot;default&quot;, defaultVal);
</code></pre><ol start="7"><li>orElse 和 orElseGet 的区别 在 Optional 对象无封装值时，orElse 和 orElseGet 并无本质上的区别，两个API 都返回各自的默认值。但是，当 Optional 对象有封装值时两者有很大的区别，而且两者在性能上的差异也十分明显。一句话总结两者的差异就是：orElse 会触发获取默认值的动作，尽管并不需要。为了更加形象的说明，这里提供一个方法用于获取默认值，方法中使用 sleep 模拟这是一个耗时的操作：</li></ol><pre><code class="language-java">    private String getDefaultValue() {
        System.out.println(&quot;enter method get default value&quot;);
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return &quot;default value&quot;;
    }
</code></pre><ol start="8"><li>创建一个非空的 Optional 对象，分别调用 orElse 和 orElseGet 方法，观察两者行为上的差异：</li></ol><pre><code class="language-java">    @Test
    public void test_differenceorElseAndorElseGet() throws Exception {
        Optional&lt;String&gt; hasVal = Optional.of(&quot;value&quot;);
        System.out.println(&quot;enter orElse method&quot;);
        String var0 = hasVal.orElse(getDefaultValue());
    }
</code></pre><ol start="9"><li>上面代码的输出结果如下：</li></ol><pre><code class="language-java">System.out.println(&quot;enter orElseGet method&quot;);
String var1 = hasVal.orElseGet(this::getDefaultValue);
</code></pre><pre><code class="language-java">@Test(expected  = IllegalArgumentException.class) 
public void test_throwsExecption() {
String nullName = null;
String name = Optional.ofNullable(nullName).orElseThrow(
IllegalArgumentException::new);
} 
</code></pre><p>enter orElse method enter method get default value enter orElseGet method 从输出结果可以非常清晰的看出两个API之间的差异，为了更好的性能，在编码中优先使用 orElseGet API 获取 Optional 的值。。</p><ol start="8"><li><p>使用 orElseThrow 抛出异常 orElseThrow 与 orElse 和 orElseGet API类似，orElseThrow 提供了一种在Optional 为空时的处理方法-抛异常而不是返回默认值。</p></li><li><p>使用 get() 获取值 get 是获取 <em>Optional</em> 值的最后方法（不是一个好方法）：</p></li></ol><pre><code class="language-java">@Test  
public void test_getValueUseGet() {
Optional opt = Optional.of(&quot;value&quot;);
String name = opt.get();
assertEquals(&quot;value&quot;, name);
}
</code></pre><ol start="10"><li>和上面三种获取值的方法不同，<em>get</em> 方法只能返回 Optional 封装的值，如果Optional 为空，方法会抛出 NoSuchElementException 异常。</li></ol><pre><code class="language-java">@Test(expected  = NoSuchElementException.class) 
public void test_throwsNoSuchElementException() {
String nullName = null;
String name = Optional.ofNullable(nullName).get();
}
</code></pre><ol start="11"><li>抛出异常是 get API 的最大缺陷，Optional 应该帮助我们尽可能屏蔽这些不可见异常，因此 get API 和 <em>Optional</em> 目标相背而驰，该方法将来可能被废弃。应该尽可能的使用其他方法获取值。</li><li>使用 filter() 进行过滤 filter API 被用于对 Optional 封装的值进行一个内联测试，filter API 使用一个谓词作为参数并返回一个Optional 对象。如果，被封装的值通过测试则返回Optional 本身，否则返回一个空的 Optional 对象。</li></ol><pre><code class="language-java">@Test  
public void test_filter() throws Exception {
Optional passTest = Optional.of(101);
assertTrue(passTest.filter(integer -&gt; integer.intValue() &gt; 100).isPresent());
Optional notPassTest = Optional.of(99);
assertFalse(notPassTest.filter(integer -&gt; integer.intValue() &gt; 100).isPresent());
}
</code></pre><ol start="13"><li>filter API 的工作套路：根据某个预定义的规则拒绝 Optional 对象封装的值，可以用于拒绝格式错误的邮箱地址或强度不够的密码。</li></ol><p>接下来看一个更有趣的例子（有些场景下不使用 Optional 为了安全的操作，我们通常需要进行多次 null 检查）。假设，我们打算购买一部手机并且只关心手机的价格。我们从手机购买网站得到手机价格的推送消息，手机价格被封装在一个对象中，数据结构定义如下：</p><pre><code class="language-java">public class Phone {
private Double price;
public Phone(Double price) {
    this.price = price;
}

//standard getters and setters
</code></pre><p>} 当把网址的推送数据传递给检查手机价格是否满足我们的预算要求的函数时（假设能接受的手机价格为3000-5000），如果不使用 <em>Optional</em> 一种可能的代码实现如下：</p><pre><code class="language-java">public boolean checkPriceWithoutOptional(Phone phone) {
    boolean isInRange = false;

    if (phone != null &amp;&amp; phone.getPrice() != null
            &amp;&amp; (phone.getPrice() &gt;= 3000
            &amp;&amp; phone.getPrice() &lt;= 5000)) {

        isInRange = true;
    }
    return isInRange;
}
</code></pre><p>为了实现上面的功能我们写了很多代码，尤其在 if 的条件表达式中，函数真正的核心代码仅仅是检查价格范围，其他多余的检查对于实现功能来说都是不必要的。代码冗余可能并不是最严重的问题，忘记 null 检查可能更加糟糕，而这不会引发任何编译错误（代码静态检查工具可以发现并上报告警）。</p><p>使用 Optional 的 filter API 可以以一种优雅的方式实现同样的功能：</p><pre><code class="language-java">public boolean checkPriceWithOptional(Phone phone) {
    return Optional.ofNullable(phone)
            .map(Phone::getPrice)
            .filter(p -&gt; p &gt;= 3000)
            .filter(p -&gt; p &lt;= 5000)
            .isPresent();
}
</code></pre><p>使用 Optional 让代码在以下两点优于使用 if 语句检查：</p><p>给函数出入一个 null 对象，不会触发任何错误。 代码更加聚焦业务实现（价格检查），其他的事情由 Optional 负责。 11. 使用 map() 进行值变换 在之前的章节，我们已经看到如何使用过滤器接受或拒绝 Optional 封装的值。相同的语法可以用于 map API 对 Optional 封装的值进行变换。</p><pre><code class="language-java">@Test
public void test_mapList2ListSize() {
    List&lt;String&gt; companyNames = Arrays.asList(
            &quot;Java&quot;, &quot;C++&quot;, &quot;&quot;, &quot;C&quot;, &quot;&quot;, &quot;Python&quot;);
    Optional&lt;List&lt;String&gt;&gt; listOptional = Optional.of(companyNames);

    int size = listOptional
            .map(List::size)
            .orElse(0);
    assertEquals(6, size);
}
</code></pre><p>在上面的例子中，我们使用 Optional 封装了一个字符串列表，并使用 map API 对 字符串列表进行变换，上面例子中执行的变化是获取字符串列表的长度。</p><p>map API 返回对 Optional 封装对象的计算结果，最后需要调用合适的API来获取Optional 对象的值（变换后的值）。</p><p>注意：filter API 值检查 Optional 对象封装的值并返回一个boolean类型的结果,相反 map API 对 Optional 对象封装的值进行计算并返回计算结果。</p><pre><code class="language-java">@Test
public void test_mapString2StringSize() {
    String name = &quot;Hello World&quot;;
    Optional&lt;String&gt; nameOptional = Optional.of(name);

    int len = nameOptional
            .map(String::length)
            .orElse(0);
    assertEquals(11, len);
}
</code></pre><p>我们可以链式调用 map 和 filter API 来做一些更有意义的事情。假设，我们有一段代码需要检查用户输入的密码是否正确，我们可以使用 map 对密码进行变换，使用 filter 判断密码是否正确：</p><pre><code class="language-java">@Test
public void test_checkPassword() {
    String password = &quot; password &quot;;
    Optional&lt;String&gt; passOpt = Optional.of(password);
    boolean correctPassword = passOpt.filter(
        pass -&gt; pass.equals(&quot;password&quot;)).isPresent();
    assertFalse(correctPassword);

    correctPassword = passOpt
        .map(String::trim)
        .filter(pass -&gt; pass.equals(&quot;password&quot;))
        .isPresent();
    assertTrue(correctPassword);
}
}
</code></pre><ol start="12"><li>使用 flatMap() 对值进行变换 和 map API 一样，我们也可以使用 flatMap API 作为一个替代方法对值进行变换。两者的主要区别是：map 值对未封装的值进行转换，flatMap 在处理值之前先进行“去封装”操作，然后再执行变换操作。 为了更清晰的解释两者的区别，我们假设有一个Person对象，对象有三个基本属性：名字、年龄和密码。</li></ol><pre><code class="language-java">public class Person {
private String name;
private int age;
private String password;
public Person() {
}

public Person(String name, int age, String password) {
    this.name = name;
    this.age = age;
    this.password = password;
}

public Optional&lt;String&gt; getName() {
    return Optional.ofNullable(name);
}

public Optional&lt;Integer&gt; getAge() {
    return Optional.ofNullable(age);
}

public Optional&lt;String&gt; getPassword() {
    return Optional.ofNullable(password);
}

// normal constructors and setters
</code></pre><p>} 我们创建一个Person对象，并使用 Optional 封装创建的Person对象：</p><pre><code class="language-java">    Person person = new Person(&quot;john&quot;, 26, &quot;pwd&quot;);
    Optional&lt;Person&gt; personOptional = Optional.of(person);
</code></pre><p>分别使用 map 和 flatMap API 获取名字的代码如下，从中可以看到使用 flatMap API 的代码量较使用 map 更短小，也更加容易理解。</p><pre><code class="language-java">@Test
public void test_flatMap() {
    Person person = new Person(&quot;ct&quot;, 26,&quot;pwd&quot;);
    Optional&lt;Person&gt; personOptional = Optional.of(person);

    Optional&lt;Optional&lt;String&gt;&gt; nameOptionalWrapper
        = personOptional.map(Person::getName);
    Optional&lt;String&gt; nameOptional
        = nameOptionalWrapper.orElseThrow(IllegalArgumentException::new);
    String name1 = nameOptional.orElse(&quot;&quot;);
    assertEquals(&quot;ct&quot;, name1);

    String name = personOptional
        .flatMap(Person::getName)
        .orElse(&quot;&quot;);
    assertEquals(&quot;ct&quot;, name);
}
</code></pre><ol start="13"><li>总结 本文简要介绍了Java 8 Optional 类的大部分重要特性，与此同时，我们也简单阐述了为什么我们选择使用Optional 代替显示的 null 检查和参数检查。最后，讲解了 orElse 和 orElseGet 之间微妙但重要的区别，关于该主题可以从拓展阅读获取更多内容。</li></ol><p>文中的样例代码可以从 GitHub.获取。</p>`,72),p=[o];function i(s,r){return n(),e("div",null,p)}const c=t(l,[["render",i],["__file","optional.html.vue"]]),g=JSON.parse('{"path":"/java-tutor/java-tips/optional.html","title":"java的optional类用法","lang":"zh-CN","frontmatter":{"description":"java的optional类用法 简介 本文简要介绍一下Java 8 引入的 Optional 类。引入Optional 类的主要目的是为使用可选值代替 null 提供类型级解决方案。如果，你想知道为什么需要更深入的了解和使用 Optional 类，可以参考甲骨文官方文章。 查找另一个教程 链接 Optional 是 java.util.package...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/optional.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java的optional类用法"}],["meta",{"property":"og:description","content":"java的optional类用法 简介 本文简要介绍一下Java 8 引入的 Optional 类。引入Optional 类的主要目的是为使用可选值代替 null 提供类型级解决方案。如果，你想知道为什么需要更深入的了解和使用 Optional 类，可以参考甲骨文官方文章。 查找另一个教程 链接 Optional 是 java.util.package..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java的optional类用法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":9.8,"words":2940},"filePathRelative":"java-tutor/java-tips/optional.md","localizedDate":"2022年3月21日","autoDesc":true}');export{c as comp,g as data};
