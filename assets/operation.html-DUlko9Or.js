import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const r={},o=n(`<h1 id="一些java技巧" tabindex="-1"><a class="header-anchor" href="#一些java技巧"><span>一些java技巧</span></a></h1><h2 id="在java中声明数组" tabindex="-1"><a class="header-anchor" href="#在java中声明数组"><span>在java中声明数组</span></a></h2><h3 id="回答" tabindex="-1"><a class="header-anchor" href="#回答"><span>回答</span></a></h3><p>你可以直接用数组声明，或者通过数组的字面常量（array literal ）声明</p><p>对于原始类型（primitive types）：</p><pre><code class="language-java">int[] myIntArray = new int[3];
int[] myIntArray = {1, 2, 3};
int[] myIntArray = new int[]{1, 2, 3};
</code></pre><p>对于其他类，比如String类，也是相同的：</p><pre><code class="language-java">String[] myStringArray = new String[3];
String[] myStringArray = {&quot;a&quot;, &quot;b&quot;,&quot;c&quot;};
String[] myStringArray = new String[]{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;};
</code></pre><p><a href="http://stackoverflow.com/questions/1200621/declare-array-in-java" target="_blank" rel="noopener noreferrer">stackoverflow链接：Declare array in Java?</a></p><h2 id="将数组转换为list" tabindex="-1"><a class="header-anchor" href="#将数组转换为list"><span>将数组转换为List</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>假设有数组</p><pre><code class="language-java">Element[] array = {new Element(1),new Element(2),new Element(3)};
</code></pre><p>如何将其转换为<code>ArrayList&lt;Element&gt; arraylist = ？？？</code></p></div><pre><code class="language-java">new ArrayList&lt;Element&gt;(Arrays.asList(array))
</code></pre><h3 id="回答2" tabindex="-1"><a class="header-anchor" href="#回答2"><span>回答2</span></a></h3><p>Arrays.asList(array)或者Arrays.asList(new Element(1),new Element(2),new Element(3))</p><p>不过，这样做有些坑要注意：</p><ol><li>这样做生成的list，是定长的。也就是说，如果你对它做add或者remove，都会抛UnsupportedOperationException。</li><li>如果修改数组的值，list中的对应值也会改变！</li></ol><p><strong>Arrays.asList() 返回的是Arrays内部静态类，而不是Java.util.ArrayList的类。这个java.util.Arrays.ArrayList有set(),get(),contains()方法，但是没有任何add() 方法，所以它是固定大小的</strong></p><p>如果希望避免这两个坑，请改用这个方式</p><pre><code class="language-java">Collections.addAll(arraylist, array);
</code></pre><p>stackoverflow原址： <a href="http://stackoverflow.com/questions/157944/how-to-create-arraylist-arraylistt-from-array-t" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/157944/how-to-create-arraylist-arraylistt-from-array-t</a></p><h2 id="如何用一行代码初始化一个arraylist" tabindex="-1"><a class="header-anchor" href="#如何用一行代码初始化一个arraylist"><span>如何用一行代码初始化一个ArrayList</span></a></h2><h3 id="匿名内部类" tabindex="-1"><a class="header-anchor" href="#匿名内部类"><span>匿名内部类</span></a></h3><p>当然，还有其他方式，例如,写一个匿名内部类，然后在其中做初始化（也被称为 brace initialization）：</p><pre><code class="language-java">ArrayList&lt;String&gt; list = new ArrayList&lt;String&gt;() {{
    add(&quot;A&quot;);
    add(&quot;B&quot;);
    add(&quot;C&quot;);
}};
</code></pre><p>但是，我不喜欢这个方式。只是为了做个初始化，却要在<code>ArrayList</code>的同一行后面加这么一坨代码。</p><h3 id="arrays-aslist" tabindex="-1"><a class="header-anchor" href="#arrays-aslist"><span>Arrays.asList</span></a></h3><pre><code class="language-java">List&lt;String&gt; places = Arrays.asList(&quot;Buenos Aires&quot;, &quot;Córdoba&quot;, &quot;La Plata&quot;);
</code></pre><h3 id="collections-singletonlist" tabindex="-1"><a class="header-anchor" href="#collections-singletonlist"><span>Collections.singletonList</span></a></h3><pre><code class="language-java">List&lt;String&gt; places = Collections.singletonList(&quot;Buenos Aires&quot;);
</code></pre><p>注意：后面的这两种方式，得到的是一个定长的<code>List</code>(如果add操作会抛异常）。如果你需要一个不定长的<code>List</code>,可以这样做：</p><pre><code class="language-java">ArrayList&lt;String&gt; places = new ArrayList&lt;&gt;(Arrays.asList(&quot;Buenos Aires&quot;, &quot;Córdoba&quot;, &quot;La Plata&quot;));

</code></pre><p>stackoverflow链接： <a href="http://stackoverflow.com/questions/1005073/initialization-of-an-arraylist-in-one-line" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/1005073/initialization-of-an-arraylist-in-one-line</a></p><h2 id="如何将string转换为enum" tabindex="-1"><a class="header-anchor" href="#如何将string转换为enum"><span>如何将String转换为enum</span></a></h2><p>假设定义了如下的enum（枚举）：</p><pre><code class="language-java">public enum Blah {
    A, B, C, D
}
</code></pre><p>已知枚举对应的String值，希望得到对应的枚举值。例如，已知&quot;A&quot;，希望得到对应的枚举——Blah.A，应该怎么做？<br> Enum.valueOf()是否能实现以上目的，如果是，那我如何使用？</p><h3 id="答案" tabindex="-1"><a class="header-anchor" href="#答案"><span>答案</span></a></h3><p>是的，Blah.valueOf(&quot;A&quot;) 将会得到 Blah.A</p><p>静态方法valueOf() 和 values() 不存在于源码中，而是在编译时创建，我们也可以在JavaDoc查看到它们，比如 <a href="http://docs.oracle.com/javase/7/docs/api/java/awt/Dialog.ModalityType.html" target="_blank" rel="noopener noreferrer">Dialog.ModalityTyp</a> 就中出现这两个方法。</p><h3 id="其他答案" tabindex="-1"><a class="header-anchor" href="#其他答案"><span>其他答案</span></a></h3><p>当文本和枚举值不同时，可以采用这种方式：</p><pre><code class="language-java">public enum Blah {
  A(&quot;text1&quot;),
  B(&quot;text2&quot;),
  C(&quot;text3&quot;),
  D(&quot;text4&quot;);

  private String text;

  Blah(String text) {
    this.text = text;
  }

  public String getText() {
    return this.text;
  }

  public static Blah fromString(String text) {
    for (Blah b : Blah.values()) {
      if (b.text.equalsIgnoreCase(text)) {
        return b;
      }
    }
    return null;
  }
}
</code></pre><p>fromString方法中，throw new IllegalArgumentException(&quot;No constant with text &quot; + text + &quot; found&quot;) 会比直接返回null更优秀.</p><h3 id="其他答案-1" tabindex="-1"><a class="header-anchor" href="#其他答案-1"><span>其他答案</span></a></h3><p>我有一个挺赞的工具方法：</p><pre><code class="language-java">/**
 * A common method for all enums since they can&#39;t have another base class
 * @param &lt;T&gt; Enum type
 * @param c enum type. All enums must be all caps.
 * @param string case insensitive
 * @return corresponding enum, or null
 */
public static &lt;T extends Enum&lt;T&gt;&gt; T getEnumFromString(Class&lt;T&gt; c, String string) {
    if( c != null &amp;&amp; string != null ) {
        try {
            return Enum.valueOf(c, string.trim().toUpperCase());
        } catch(IllegalArgumentException ex) {
        }
    }
    return null;
}
</code></pre><p>你可以这么使用：</p><pre><code class="language-java">public static MyEnum fromString(String name) {
    return getEnumFromString(MyEnum.class, name);
}
</code></pre><p>stackoverflow链接：<a href="http://stackoverflow.com/questions/604424/convert-a-string-to-an-enum-in-java" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/604424/convert-a-string-to-an-enum-in-java</a></p><h2 id="如何将string转换为int" tabindex="-1"><a class="header-anchor" href="#如何将string转换为int"><span>如何将String转换为Int</span></a></h2><pre><code class="language-java">Integer x = Integer.valueOf(str);
// or
int y = Integer.parseInt(str);
</code></pre><p>这两种方式有一点点不同：</p><ul><li><code>valueOf</code>返回的是<code>java.lang.Integer</code>的实例</li><li><code>parseInt</code>返回的是基本数据类型 int</li></ul><p><code>Short.valueOf/parseShort</code>,<code>Long.valueOf/parseLong</code>等也是有类似差别。</p><p>另外还需注意的是，在做int类型转换时，可能会抛出NumberFormatException，因此要做好异常捕获</p><pre><code class="language-java">int foo;
String StringThatCouldBeANumberOrNot = &quot;26263Hello&quot;; //will throw exception
String StringThatCouldBeANumberOrNot2 = &quot;26263&quot;; //will not throw exception
try {
      foo = Integer.parseInt(StringThatCouldBeANumberOrNot);
} catch (NumberFormatException e) {
      //Will Throw exception!
      //do something! anything to handle the exception.
}

try {
      foo = Integer.parseInt(StringThatCouldBeANumberOrNot2);
} catch (NumberFormatException e) {
      //No problem this time but still it is good practice to care about exceptions.
      //Never trust user input :)
      //do something! anything to handle the exception.
}
</code></pre><p>stackoverflow链接：<a href="http://stackoverflow.com/questions/5585779/converting-string-to-int-in-java" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/5585779/converting-string-to-int-in-java</a></p><h2 id="如何计算md5值" tabindex="-1"><a class="header-anchor" href="#如何计算md5值"><span>如何计算MD5值</span></a></h2><p>你可以用 <code>MessageDigest</code> 的MD5实例来计算String的MD5值。</p><p>使用 <code>MessageDigest</code> 和 String 时，一定要显式声明你的数据编码类型。如果你使用无参的 <code>String.getBytes()</code> , 它会以当前平台的默认编码来转换数据。不同平台的默认编码可能是不同的，这可能会导致你的数据不一致。</p><pre><code class="language-java">import java.security.*;

..

byte[] bytesOfMessage = yourString.getBytes(&quot;UTF-8&quot;);
MessageDigest md = MessageDigest.getInstance(&quot;MD5&quot;);
byte[] thedigest = md.digest(bytesOfMessage);
</code></pre><p>如果你的要计算的数据量很大，你可以循环使用 <code>.update(byte[])</code> 方法来加载数据。加载完毕后用 <code>.digest()</code> 方法来得到计算出的MD5值。</p><p>stackoverflow链接 <a href="http://stackoverflow.com/questions/415953/how-can-i-generate-an-md5-hash" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/415953/how-can-i-generate-an-md5-hash</a></p><h2 id="输出-java-数组最简单的方式" tabindex="-1"><a class="header-anchor" href="#输出-java-数组最简单的方式"><span>输出 Java 数组最简单的方式</span></a></h2><p>因为 Java 数组中没有 toString() 方法，所以我如果直接调用数组toStrign()方法的话，只会得到它的内存地址。像这样，显得并不人性化:</p><pre><code class="language-java">int[] intArray = new int[] {1, 2, 3, 4, 5};
System.out.println(intArray);     // 有时候会输出 &#39;[I@3343c8b3&#39;
</code></pre><p>所以输出一个数组最简单的方法是什么？我想要的效果是</p><pre><code class="language-java">// 数字数组:
int[] intArray = new int[] {1, 2, 3, 4, 5};
//输出: [1, 2, 3, 4, 5]

// 对象数组:
String[] strArray = new String[] {&quot;John&quot;, &quot;Mary&quot;, &quot;Bob&quot;};
//输出: [John, Mary, Bob]
</code></pre><p>在 Java 5+ 以上中使用 Arrays.toString(arr) 或 Arrays.deepToString(arr)来打印（输出）数组。</p><p>不要忘了引入import java.util.Arrays;</p><pre><code class="language-java">package packageName;
import java.util.Arrays;
</code></pre><pre><code class="language-java">int[] intArray = new int[] {1, 2, 3, 4, 5};
System.out.println(Arrays.toString(intArray));
//输出: [1, 2, 3, 4, 5]

String[] strArray = new String[] {&quot;John&quot;, &quot;Mary&quot;, &quot;Bob&quot;};
System.out.println(Arrays.deepToString(strArray));
*//输出: [John, Mary, Bob]
</code></pre><p>Arrays.deepToString与Arrays.toString不同之处在于，Arrays.deepToString更适合打印多维数组 比如：</p><pre><code class="language-java">String[][] b = new String[3][4];
  for (int i = 0; i &lt; 3; i++)
  {
   for (int j = 0; j &lt; 4; j++)
   {
    b[i][j] = &quot;A&quot; + j;
   }
  } 
  System.out.println(Arrays.toString(b));
  //输出[[Ljava.lang.String;@55e6cb2a, [Ljava.lang.String;@23245e75, [Ljava.lang.String;@28b56559]
  System.out.println(Arrays.deepToString(b));
  //输出[[A0, A1, A2, A3], [A0, A1, A2, A3], [A0, A1, A2, A3]]
  
</code></pre><p>stackoverflow链接： <a href="http://stackoverflow.com/questions/409784/whats-the-simplest-way-to-print-a-java-array" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/409784/whats-the-simplest-way-to-print-a-java-array</a></p><h2 id="在java中如何对比-compare-string" tabindex="-1"><a class="header-anchor" href="#在java中如何对比-compare-string"><span>在java中如何对比（compare）string</span></a></h2><ul><li><code>==</code>对应的是指针相等，也就是他们是否为同一个对象</li><li><code>.equals()</code>对应的是值相等，也就是逻辑相等</li></ul><p>因此，如果你想检查两个字符串是否为相同值，那么应该用<code>.equals()</code>方法</p><pre><code class="language-java">//值是相等的
new String(&quot;test&quot;).equals(&quot;test&quot;) // --&gt; true 

// ... 值相等，但不是同个对象(指向不同的地址空间）
new String(&quot;test&quot;) == &quot;test&quot; // --&gt; false 

// ... 同上
new String(&quot;test&quot;) == new String(&quot;test&quot;) // --&gt; false 

// 这个返回true，是因为这种写法属于字符串字面量，编译器会维护一个常量池，相同的字面量，都会指向相同的一个对象
&quot;test&quot; == &quot;test&quot; // --&gt; true 

</code></pre><p>因此， 值的对比，一般都是用equals方法。字符串字面量之间的对比，也可以用==（大家知其所以然即可，但没必要用==）</p><p>下面多举个字符串字面量的例子,下面代码中，前四个对比，返回true，最后一个返回false。</p><pre><code class="language-java"> public static final String test1 = &quot;test&quot;;
 public static final String test2 = &quot;test&quot;;

 @Test
 public void test() {

  String test3 = &quot;test&quot;;
  String test = &quot;test&quot;;

  System.out.println(test3.equals(test));
  System.out.println(test3 == test);
  System.out.println(test1.equals(test2));
  System.out.println(test1 == test2);
  System.out.println(test1 == new String(&quot;test&quot;));
 }
</code></pre><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h3><ul><li>如果你重写了equal方法，记得相对应地修改hashcode方法，否则将会违反这两个方法的对等关系，如果两个对象是相等（equal）的，那么两个对象调用hashCode必须产生相同的整数结果，即：equal为true，hashCode必须为true，equal为false，hashCode也必须为false</li><li>如果要忽略大小写进行对比，可以用equalsIgnoreCase()方法</li></ul><h2 id="java的foreach循环是如何工作的" tabindex="-1"><a class="header-anchor" href="#java的foreach循环是如何工作的"><span>Java的foreach循环是如何工作的？</span></a></h2><pre><code class="language-java">List&lt;String&gt; someList = new ArrayList&lt;String&gt;();
// add &quot;monkey&quot;, &quot;donkey&quot;, &quot;skeleton key&quot; to someList
for (String item : someList) {
    System.out.println(item);
}
</code></pre><p>如果不用for each语法，等价的循环语句是什么样的？</p><h3 id="回答-1" tabindex="-1"><a class="header-anchor" href="#回答-1"><span>回答</span></a></h3><pre><code class="language-java">for(Iterator&lt;String&gt; i = someList.iterator(); i.hasNext(); ) {
    String item = i.next();
    System.out.println(item);
}
</code></pre><p>记住，如果需要在循环中使用i.remove;或者以某种方式获取实际的iterator，你不能使用for(:)语法，因为实际的Iterator很难被推断出来。 正如Denis Bueno写的那样，这种代码对任何实现了Iterable接口的对象都奏效。 此外，如果for(:)句法中右侧是一个数组而不是一个可迭代对象，那么内部代码用一个int型的计数器来防止数组越界。详见Java Language Specification: <a href="http://docs.oracle.com/javase/specs/jls/se8/html/jls-14.html#jls-14.14.2" target="_blank" rel="noopener noreferrer">http://docs.oracle.com/javase/specs/jls/se8/html/jls-14.html#jls-14.14.2</a></p><p>stackoverflow链接：<a href="http://stackoverflow.com/questions/85190/how-does-the-java-for-each-loop-work" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/85190/how-does-the-java-for-each-loop-work</a></p><h2 id="如何测试一个数组是否包含指定的值" tabindex="-1"><a class="header-anchor" href="#如何测试一个数组是否包含指定的值"><span>如何测试一个数组是否包含指定的值</span></a></h2><p>指定数组，如:</p><pre><code class="language-java">public static final String[] VALUES = new String[] {&quot;AB&quot;,&quot;BC&quot;,&quot;CD&quot;,&quot;AE&quot;};
</code></pre><p>现在制定一个值 s，有哪些比较好的方式，判断这个数组 VALUES 是否包含值 s？</p><h2 id="简单且优雅的方法" tabindex="-1"><a class="header-anchor" href="#简单且优雅的方法"><span>简单且优雅的方法</span></a></h2><ol><li><p>Arrays.asList(...).contains(...)</p></li><li><p>使用 Apache Commons Lang包中的ArrayUtils.contains</p></li></ol><pre><code class="language-java">String[] fieldsToInclude = { &quot;id&quot;, &quot;name&quot;, &quot;location&quot; };

if ( ArrayUtils.contains( fieldsToInclude, &quot;id&quot; ) ) {
    // Do some stuff.
}
</code></pre><h2 id="自己写逻辑" tabindex="-1"><a class="header-anchor" href="#自己写逻辑"><span>自己写逻辑</span></a></h2><p>问题的本质，其实是一个查找的问题，即查找一个数组是否包含某个值。对于原始类型，若是无序的数组，可以直接写一个 for 循环:</p><pre><code class="language-java">public static boolean useLoop(String[] arr, String targetValue) {
    for(String s: arr){
        if(s.equals(targetValue))
            return true;
    }
    return false;
}
</code></pre><p>若是有序的数组，可以考虑二分查找或者其他查找算法:</p><pre><code class="language-java">public static boolean useArraysBinarySearch(String[] arr, String targetValue) { 
    int a =  Arrays.binarySearch(arr, targetValue);
    if(a &gt;= 0)
        return true;
    else
        return false;
}
</code></pre><p>若数组里包含的是一个个对象，实际上比较就是引用是否相等(String 类型是判断 值是否相等)，本质就是比较 hashcode 和 equal 方法，可以考虑使用 List 或者 Set，如下</p><pre><code class="language-java">public static boolean useList(String[] arr, String targetValue) {
    return Arrays.asList(arr).contains(targetValue);
}
</code></pre><pre><code class="language-java">public static boolean useLoop(String[] arr, String targetValue) {
    for(String s: arr){
        if(s.equals(targetValue))
            return true;
    }
    return false;
}
</code></pre><p>stackoverflow原址:<a href="http://stackoverflow.com/questions/1128723/how-can-i-test-if-an-array-contains-a-certain-value" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/1128723/how-can-i-test-if-an-array-contains-a-certain-value</a></p><h2 id="便捷地将两个数组合到一起" tabindex="-1"><a class="header-anchor" href="#便捷地将两个数组合到一起"><span>便捷地将两个数组合到一起</span></a></h2><h3 id="一行代码搞定" tabindex="-1"><a class="header-anchor" href="#一行代码搞定"><span>一行代码搞定</span></a></h3><p>Apache Commons Lang library <a href="http://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/ArrayUtils.html#addAll%28T%5B%5D,%20T...%29" target="_blank" rel="noopener noreferrer"><code>ArrayUtils.addAll(T[], T...)</code></a>就是专门干这事的</p><p>代码：</p><pre><code class="language-java">String[] both = ArrayUtils.addAll(first, second);
</code></pre><h3 id="不借助依赖包" tabindex="-1"><a class="header-anchor" href="#不借助依赖包"><span>不借助依赖包</span></a></h3><h4 id="非泛型" tabindex="-1"><a class="header-anchor" href="#非泛型"><span>非泛型</span></a></h4><p>把下面的<code>Foo</code>替换成你自己的类名</p><pre><code class="language-java">public Foo[] concat(Foo[] a, Foo[] b) {
   int aLen = a.length;
   int bLen = b.length;
   Foo[] c= new Foo[aLen+bLen];
   System.arraycopy(a, 0, c, 0, aLen);
   System.arraycopy(b, 0, c, aLen, bLen);
   return c;
}
</code></pre><h4 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型"><span>泛型</span></a></h4><pre><code class="language-java">public &lt;T&gt; T[] concatenate (T[] a, T[] b) {
    int aLen = a.length;
    int bLen = b.length;

    @SuppressWarnings(&quot;unchecked&quot;)
    T[] c = (T[]) Array.newInstance(a.getClass().getComponentType(), aLen+bLen);
    System.arraycopy(a, 0, c, 0, aLen);
    System.arraycopy(b, 0, c, aLen, bLen);

    return c;
}
</code></pre><p>注意，泛型的方案不适用于基本数据类型（int，boolean……)</p><h2 id="java修饰符-public-protected-private-不加修饰符。有什么区别呢" tabindex="-1"><a class="header-anchor" href="#java修饰符-public-protected-private-不加修饰符。有什么区别呢"><span>Java修饰符：public，protected，private，不加修饰符。有什么区别呢？</span></a></h2><p>如下表所示,Y表示能访问(可见性），N表示不能访问，例如第一行的第3个Y，表示类的变量/方法如果是用public修饰，它的子类能访问这个变量/方法</p><table><thead><tr><th>修饰符</th><th>类内部</th><th>同个包（package）</th><th>子类</th><th>其他范围</th></tr></thead><tbody><tr><td>public</td><td>Y</td><td>Y</td><td>Y</td><td>Y</td></tr><tr><td>protected</td><td>Y</td><td>Y</td><td>Y</td><td>N</td></tr><tr><td>无修饰符</td><td>Y</td><td>Y</td><td>N or Y(见说明）</td><td>N</td></tr><tr><td>private</td><td>Y</td><td>N</td><td>N</td><td>N</td></tr></tbody></table><p>说明： 需要特别说明“无修饰符”这个情况，子类能否访问父类中无修饰符的变量/方法，取决于子类的位置。如果子类和父类在同一个包中，那么子类可以访问父类中的无修饰符的变量/方法，否则不行。</p>`,123),s=[o];function i(l,c){return a(),t("div",null,s)}const u=e(r,[["render",i],["__file","operation.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/java-tips/operation.html","title":"一些java技巧","lang":"zh-CN","frontmatter":{"description":"一些java技巧 在java中声明数组 回答 你可以直接用数组声明，或者通过数组的字面常量（array literal ）声明 对于原始类型（primitive types）： 对于其他类，比如String类，也是相同的： stackoverflow链接：Declare array in Java? 将数组转换为List 提示 假设有数组 如何将其转换...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"一些java技巧"}],["meta",{"property":"og:description","content":"一些java技巧 在java中声明数组 回答 你可以直接用数组声明，或者通过数组的字面常量（array literal ）声明 对于原始类型（primitive types）： 对于其他类，比如String类，也是相同的： stackoverflow链接：Declare array in Java? 将数组转换为List 提示 假设有数组 如何将其转换..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-18T06:54:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-18T06:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一些java技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-18T06:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"在java中声明数组","slug":"在java中声明数组","link":"#在java中声明数组","children":[{"level":3,"title":"回答","slug":"回答","link":"#回答","children":[]}]},{"level":2,"title":"将数组转换为List","slug":"将数组转换为list","link":"#将数组转换为list","children":[{"level":3,"title":"回答2","slug":"回答2","link":"#回答2","children":[]}]},{"level":2,"title":"如何用一行代码初始化一个ArrayList","slug":"如何用一行代码初始化一个arraylist","link":"#如何用一行代码初始化一个arraylist","children":[{"level":3,"title":"匿名内部类","slug":"匿名内部类","link":"#匿名内部类","children":[]},{"level":3,"title":"Arrays.asList","slug":"arrays-aslist","link":"#arrays-aslist","children":[]},{"level":3,"title":"Collections.singletonList","slug":"collections-singletonlist","link":"#collections-singletonlist","children":[]}]},{"level":2,"title":"如何将String转换为enum","slug":"如何将string转换为enum","link":"#如何将string转换为enum","children":[{"level":3,"title":"答案","slug":"答案","link":"#答案","children":[]},{"level":3,"title":"其他答案","slug":"其他答案","link":"#其他答案","children":[]},{"level":3,"title":"其他答案","slug":"其他答案-1","link":"#其他答案-1","children":[]}]},{"level":2,"title":"如何将String转换为Int","slug":"如何将string转换为int","link":"#如何将string转换为int","children":[]},{"level":2,"title":"如何计算MD5值","slug":"如何计算md5值","link":"#如何计算md5值","children":[]},{"level":2,"title":"输出 Java 数组最简单的方式","slug":"输出-java-数组最简单的方式","link":"#输出-java-数组最简单的方式","children":[]},{"level":2,"title":"在java中如何对比（compare）string","slug":"在java中如何对比-compare-string","link":"#在java中如何对比-compare-string","children":[{"level":3,"title":"其他","slug":"其他","link":"#其他","children":[]}]},{"level":2,"title":"Java的foreach循环是如何工作的？","slug":"java的foreach循环是如何工作的","link":"#java的foreach循环是如何工作的","children":[{"level":3,"title":"回答","slug":"回答-1","link":"#回答-1","children":[]}]},{"level":2,"title":"如何测试一个数组是否包含指定的值","slug":"如何测试一个数组是否包含指定的值","link":"#如何测试一个数组是否包含指定的值","children":[]},{"level":2,"title":"简单且优雅的方法","slug":"简单且优雅的方法","link":"#简单且优雅的方法","children":[]},{"level":2,"title":"自己写逻辑","slug":"自己写逻辑","link":"#自己写逻辑","children":[]},{"level":2,"title":"便捷地将两个数组合到一起","slug":"便捷地将两个数组合到一起","link":"#便捷地将两个数组合到一起","children":[{"level":3,"title":"一行代码搞定","slug":"一行代码搞定","link":"#一行代码搞定","children":[]},{"level":3,"title":"不借助依赖包","slug":"不借助依赖包","link":"#不借助依赖包","children":[{"level":4,"title":"非泛型","slug":"非泛型","link":"#非泛型","children":[]},{"level":4,"title":"泛型","slug":"泛型","link":"#泛型","children":[]}]}]},{"level":2,"title":"Java修饰符：public，protected，private，不加修饰符。有什么区别呢？","slug":"java修饰符-public-protected-private-不加修饰符。有什么区别呢","link":"#java修饰符-public-protected-private-不加修饰符。有什么区别呢","children":[]}],"git":{"createdTime":1655535285000,"updatedTime":1655535285000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":9.31,"words":2793},"filePathRelative":"java-tutor/java-tips/operation.md","localizedDate":"2022年6月18日","autoDesc":true}');export{u as comp,d as data};
