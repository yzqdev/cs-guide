import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const o={},r=n(`<h1 id="map-key-value-基于value值排序" tabindex="-1"><a class="header-anchor" href="#map-key-value-基于value值排序"><span><code>Map&lt;Key,Value&gt;</code>基于Value值排序</span></a></h1><h2 id="方法1" tabindex="-1"><a class="header-anchor" href="#方法1"><span>方法1</span></a></h2><p>使用TreeMap，可以参考下面的代码</p><pre><code class="language-java">public class Testing {  
  
    public static void main(String[] args) {  
  
        HashMap&lt;String,Double&gt; map = new HashMap&lt;String,Double&gt;();  
        ValueComparator bvc =  new ValueComparator(map);  
        TreeMap&lt;String,Double&gt; sorted_map = new TreeMap&lt;String,Double&gt;(bvc);  
  
        map.put(&quot;A&quot;,99.5);  
        map.put(&quot;B&quot;,67.4);  
        map.put(&quot;C&quot;,67.4);  
        map.put(&quot;D&quot;,67.3);  
  
        System.out.println(&quot;unsorted map: &quot;+map);  
  
        sorted_map.putAll(map);  
  
        System.out.println(&quot;results: &quot;+sorted_map);  
    }  
}  
  
class ValueComparator implements Comparator&lt;String&gt; {  
  
    Map&lt;String, Double&gt; base;  
    public ValueComparator(Map&lt;String, Double&gt; base) {  
        this.base = base;  
    }  
  
    // Note: this comparator imposes orderings that are inconsistent with equals.      
    public int compare(String a, String b) {  
        if (base.get(a) &gt;= base.get(b)) {  
            return -1;  
        } else {  
            return 1;  
        } // returning 0 would merge keys  
    }  
}  
</code></pre><p>译注：如果不自己写Comparator,treemap默认是用key来排序</p><h3 id="方法2" tabindex="-1"><a class="header-anchor" href="#方法2"><span>方法2</span></a></h3><p>先通过linkedlist排好序，再放到LinkedHashMap中</p><pre><code class="language-java">public class MapUtil  
{  
    public static &lt;K, V extends Comparable&lt;? super V&gt;&gt; Map&lt;K, V&gt;   
        sortByValue( Map&lt;K, V&gt; map )  
    {  
        List&lt;Map.Entry&lt;K, V&gt;&gt; list =  
            new LinkedList&lt;Map.Entry&lt;K, V&gt;&gt;( map.entrySet() );  
        Collections.sort( list, new Comparator&lt;Map.Entry&lt;K, V&gt;&gt;()  
        {  
            public int compare( Map.Entry&lt;K, V&gt; o1, Map.Entry&lt;K, V&gt; o2 )  
            {  
                return (o1.getValue()).compareTo( o2.getValue() );  
            }  
        } );  
  
        Map&lt;K, V&gt; result = new LinkedHashMap&lt;K, V&gt;();  
        for (Map.Entry&lt;K, V&gt; entry : list)  
        {  
            result.put( entry.getKey(), entry.getValue() );  
        }  
        return result;  
    }  
}  
</code></pre><p>译注：这两种方法，我简单测试了下，如果map的size在十万级别以上，两者的耗时都是几百毫秒，第二个方法会快一些。否则，第一个方法快一些。因此，如果你处理的map，都是几十万级别以下的大小，两种方式随意使用，看个人喜欢了。</p><p>stackoverflow链接： <a href="http://stackoverflow.com/questions/109383/how-to-sort-a-mapkey-value-on-the-values-in-java" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/109383/how-to-sort-a-mapkey-value-on-the-values-in-java</a></p>`,10),p=[r];function l(s,i){return a(),t("div",null,p)}const c=e(o,[["render",l],["__file","how-to-sort-a-mapkey-value-on-the-values-in-java.html.vue"]]),m=JSON.parse('{"path":"/cs-tips/java-tip/stackoverflow/how-to-sort-a-mapkey-value-on-the-values-in-java.html","title":"Map<Key,Value>基于Value值排序","lang":"zh-CN","frontmatter":{"description":"Map<Key,Value>基于Value值排序 方法1 使用TreeMap，可以参考下面的代码 译注：如果不自己写Comparator,treemap默认是用key来排序 方法2 先通过linkedlist排好序，再放到LinkedHashMap中 译注：这两种方法，我简单测试了下，如果map的size在十万级别以上，两者的耗时都是几百毫秒，第二个方...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/stackoverflow/how-to-sort-a-mapkey-value-on-the-values-in-java.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Map<Key,Value>基于Value值排序"}],["meta",{"property":"og:description","content":"Map<Key,Value>基于Value值排序 方法1 使用TreeMap，可以参考下面的代码 译注：如果不自己写Comparator,treemap默认是用key来排序 方法2 先通过linkedlist排好序，再放到LinkedHashMap中 译注：这两种方法，我简单测试了下，如果map的size在十万级别以上，两者的耗时都是几百毫秒，第二个方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Map<Key,Value>基于Value值排序\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"方法1","slug":"方法1","link":"#方法1","children":[{"level":3,"title":"方法2","slug":"方法2","link":"#方法2","children":[]}]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.13,"words":339},"filePathRelative":"cs-tips/java-tip/stackoverflow/how-to-sort-a-mapkey-value-on-the-values-in-java.md","localizedDate":"2023年5月25日","autoDesc":true}');export{c as comp,m as data};
