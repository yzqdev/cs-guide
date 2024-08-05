import{_ as t,c as e,o as a,d as r}from"./app-CbULZrmi.js";const o={},s=r(`<h1 id="通过对象属性对常规对象的arraylist进行排序" tabindex="-1"><a class="header-anchor" href="#通过对象属性对常规对象的arraylist进行排序"><span>通过对象属性对常规对象的ArrayList进行排序</span></a></h1><h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h3><p>我读过使用Comparator对常规类的ArrayList进行排序的示例，但是它们大多数使用comparedTo(),据我了解这是一个对字符串进行操作的方法。 我想要对一个由常规对象构成的ArrayList，通过它的属性(一个Date对象,getStartDate())对ArrayList进行排序。通常情况下我这样比较它们：</p><pre><code class="language-java">item1.getStartDate().before(item2.getStartDate())
</code></pre><p>所以我能不能像下面一样：</p><pre><code class="language-java">public class CustomComparator {
    public boolean compare(Object object1, Object object2) {
        return object1.getStartDate().before(object2.getStartDate());
    }
}

public class RandomName {
    ...
    Collections.sort(Database.arrayList, new CustomComparator);
    ...
}
</code></pre><h3 id="回答" tabindex="-1"><a class="header-anchor" href="#回答"><span>回答</span></a></h3><p>以前Date声明了Comparable,它有一个像处理字符串操作那样的compareTo方法。因此你可以这样：</p><pre><code class="language-java">public class CustomComparator implements Comparator&lt;MyObject&gt; {
    @Override
    public int compare(MyObject o1, MyObject o2) {
        return o1.getStartDate().compareTo(o2.getStartDate());
    }
}
</code></pre><p>这儿的compare()方法必须返回int，所以不能像你预期那样直接返回boolean. 你的代码看起来应该是这样：</p><pre><code class="language-java">Collections.sort(Database.arrayList, new CustomComparator());
</code></pre><p>如果你不需要重复使用comparetor的话，一种简单的方法是，把它写成一个内部类的样子：</p><pre><code class="language-java">Collections.sort(Database.arrayList, new Comparator&lt;MyObject&gt;() {
    @Override
    public int compare(MyObject o1, MyObject o2) {
        return o1.getStartDate().compareTo(o2.getStartDate());
    }
});
</code></pre><p>自java8 开始，你可以使用lambda表达式一种简洁的方式来写Comparator()</p><pre><code class="language-java">Collections.sort(Database.arrayList, 
                        (o1, o2) -&gt; o1.getStartDate().compareTo(o2.getStartDate()));
</code></pre><p>并且List有一个sort(Comparator)方法，所以你可以进一步简化它</p><pre><code class="language-java">
Database.arrayList.sort((o1, o2) -&gt; o1.getStartDate().compareTo(o2.getStartDate()));
</code></pre><p>这是一种司空见惯的方法，使用Comparable为一个类创建一个Comprator</p><pre><code class="language-java">Database.arrayList.sort(Comparator.comparing(MyObject::getStartDate));
All of these are equivalent forms.
</code></pre><p>stackoverflow原地址：<a href="http://stackoverflow.com/questions/2784514/sort-arraylist-of-custom-objects-by-property" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/2784514/sort-arraylist-of-custom-objects-by-property</a></p>`,20),c=[s];function p(n,i){return a(),e("div",null,c)}const m=t(o,[["render",p],["__file","sort-arraylist-of-custom-objects-by-property.html.vue"]]),d=JSON.parse('{"path":"/cs-tips/java-tip/stackoverflow/sort-arraylist-of-custom-objects-by-property.html","title":"通过对象属性对常规对象的ArrayList进行排序","lang":"zh-CN","frontmatter":{"description":"通过对象属性对常规对象的ArrayList进行排序 问题 我读过使用Comparator对常规类的ArrayList进行排序的示例，但是它们大多数使用comparedTo(),据我了解这是一个对字符串进行操作的方法。 我想要对一个由常规对象构成的ArrayList，通过它的属性(一个Date对象,getStartDate())对ArrayList进行排...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/stackoverflow/sort-arraylist-of-custom-objects-by-property.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"通过对象属性对常规对象的ArrayList进行排序"}],["meta",{"property":"og:description","content":"通过对象属性对常规对象的ArrayList进行排序 问题 我读过使用Comparator对常规类的ArrayList进行排序的示例，但是它们大多数使用comparedTo(),据我了解这是一个对字符串进行操作的方法。 我想要对一个由常规对象构成的ArrayList，通过它的属性(一个Date对象,getStartDate())对ArrayList进行排..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"通过对象属性对常规对象的ArrayList进行排序\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":3,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":3,"title":"回答","slug":"回答","link":"#回答","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.34,"words":403},"filePathRelative":"cs-tips/java-tip/stackoverflow/sort-arraylist-of-custom-objects-by-property.md","localizedDate":"2023年5月25日","autoDesc":true}');export{m as comp,d as data};
