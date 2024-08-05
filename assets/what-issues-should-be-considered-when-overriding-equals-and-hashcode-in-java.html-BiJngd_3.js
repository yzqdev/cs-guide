import{_ as e,c as a,o,d as r}from"./app-CbULZrmi.js";const n={},s=r(`<h1 id="重写-override-equals和hashcode方法时应考虑的问题" tabindex="-1"><a class="header-anchor" href="#重写-override-equals和hashcode方法时应考虑的问题"><span>重写（Override）equals和hashCode方法时应考虑的问题</span></a></h1><h3 id="理论上讲-编程语言、数学层面" tabindex="-1"><a class="header-anchor" href="#理论上讲-编程语言、数学层面"><span>理论上讲（编程语言、数学层面）</span></a></h3><p>equals() 定义了对象的相等关系（自反性、对称性、传递性）（有点抽象，更详细说明，请参考<a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#equals(java.lang.Object)" target="_blank" rel="noopener noreferrer">javadoc</a>) 。 另外，它还具有一致性（也就是说，如果一个对象没有修改，那么对象的equals方法，应总是返回相同的值），此外，o.equals(null)应当总是返回false。 hashCode()（<a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#hashCode()" target="_blank" rel="noopener noreferrer">javadoc</a>)也必须具备一致性的（也就是说，如果equal的结果没有变，那么hashcode()也应总是返回相同的值）</p><p>总的来说，这两个方法的关系：</p><p><strong>假如a.equals(b)，那么a.hashCode() 应等于b.hashCode()</strong></p><h3 id="实践上讲" tabindex="-1"><a class="header-anchor" href="#实践上讲"><span>实践上讲</span></a></h3><p><strong>如果你重写了其中一个方法，那么务必重写另外一个方法</strong></p><p>equals()和hashCode()所计算的属性集（set of fields）应当是一样的 如何更快地重写这两个方法呢？</p><ol><li>使用<a href="http://commons.apache.org/lang/" target="_blank" rel="noopener noreferrer">Apache Commons Lang library</a>中的<a href="http://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/builder/EqualsBuilder.html" target="_blank" rel="noopener noreferrer">EqualsBuilder</a>、<a href="http://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/builder/HashCodeBuilder.html" target="_blank" rel="noopener noreferrer">HashCodeBuilder</a></li></ol><pre><code class="language-java">public class Person {
    private String name;
    private int age;
    // ...

    public int hashCode() {
        return new HashCodeBuilder(17, 31). // two randomly chosen prime numbers
            // if deriving: appendSuper(super.hashCode()).
            append(name).
            append(age).
            toHashCode();
    }

    public boolean equals(Object obj) {
       if (!(obj instanceof Person))
            return false;
        if (obj == this)
            return true;

        Person rhs = (Person) obj;
        return new EqualsBuilder().
            // if deriving: appendSuper(super.equals(obj)).
            append(name, rhs.name).
            append(age, rhs.age).
            isEquals();
    }
}
</code></pre><ol start="2"><li>如果你是用eclipse，可以在代码编辑区右键，然后选择 Source &gt; Generate hashCode() and equals()</li></ol><p><strong>另外请记得</strong></p><p>当你使用一些基于Hash的 Collection 、 Map，例如HashSet, LinkedHashSet, HashMap, Hashtable, 、WeakHashMap等。在键值对被放到集合中之后，请确保其key值所对应的hashCode()是保持不变的。比较可靠的一个办法，是保持这些key是不可变的，这也能带来不少好处</p><p>stackoverflow链接： <a href="http://stackoverflow.com/questions/27581/what-issues-should-be-considered-when-overriding-equals-and-hashcode-in-java" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/27581/what-issues-should-be-considered-when-overriding-equals-and-hashcode-in-java</a></p>`,14),t=[s];function l(d,i){return o(),a("div",null,t)}const c=e(n,[["render",l],["__file","what-issues-should-be-considered-when-overriding-equals-and-hashcode-in-java.html.vue"]]),p=JSON.parse('{"path":"/cs-tips/java-tip/stackoverflow/what-issues-should-be-considered-when-overriding-equals-and-hashcode-in-java.html","title":"重写（Override）equals和hashCode方法时应考虑的问题","lang":"zh-CN","frontmatter":{"description":"重写（Override）equals和hashCode方法时应考虑的问题 理论上讲（编程语言、数学层面） equals() 定义了对象的相等关系（自反性、对称性、传递性）（有点抽象，更详细说明，请参考javadoc) 。 另外，它还具有一致性（也就是说，如果一个对象没有修改，那么对象的equals方法，应总是返回相同的值），此外，o.equals(nu...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/stackoverflow/what-issues-should-be-considered-when-overriding-equals-and-hashcode-in-java.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"重写（Override）equals和hashCode方法时应考虑的问题"}],["meta",{"property":"og:description","content":"重写（Override）equals和hashCode方法时应考虑的问题 理论上讲（编程语言、数学层面） equals() 定义了对象的相等关系（自反性、对称性、传递性）（有点抽象，更详细说明，请参考javadoc) 。 另外，它还具有一致性（也就是说，如果一个对象没有修改，那么对象的equals方法，应总是返回相同的值），此外，o.equals(nu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"重写（Override）equals和hashCode方法时应考虑的问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":3,"title":"理论上讲（编程语言、数学层面）","slug":"理论上讲-编程语言、数学层面","link":"#理论上讲-编程语言、数学层面","children":[]},{"level":3,"title":"实践上讲","slug":"实践上讲","link":"#实践上讲","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.54,"words":462},"filePathRelative":"cs-tips/java-tip/stackoverflow/what-issues-should-be-considered-when-overriding-equals-and-hashcode-in-java.md","localizedDate":"2023年5月25日","autoDesc":true}');export{c as comp,p as data};
