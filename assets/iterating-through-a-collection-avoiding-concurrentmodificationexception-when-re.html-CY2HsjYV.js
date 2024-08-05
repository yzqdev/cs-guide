import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const i={},r=o(`<h1 id="遍历集合时移除元素-怎样避免concurrentmodificationexception异常抛出" tabindex="-1"><a class="header-anchor" href="#遍历集合时移除元素-怎样避免concurrentmodificationexception异常抛出"><span>遍历集合时移除元素，怎样避免ConcurrentModificationException异常抛出</span></a></h1><h4 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h4><p>在遍历集合的过程中，不会总出现<code>ConcurrentModificationException</code>异常的抛出，但是在下面的代码块中：</p><pre><code class="language-java">public static void main(String[] args) {
    Collection&lt;Integer&gt; l = new ArrayList&lt;Integer&gt;();

    for (int i=0; i &lt; 10; ++i) {
        l.add(new Integer(4));
        l.add(new Integer(5));
        l.add(new Integer(6));
    }

    //遍历的过程中移除部分集合元素
    for (Integer i : l) {
        if (i.intValue() == 5) {
            l.remove(i);
        }
    }

    System.out.println(l);
}
</code></pre><p>运行之后，结果显而易见，总是会抛出异常：</p><pre><code class="language-java">Exception in thread &quot;main&quot; java.util.ConcurrentModificationException
</code></pre><p>所以，遍历集合时移除元素，怎样避免ConcurrentModificationException异常的产生？有什么好的解决办法？</p><h4 id="回答" tabindex="-1"><a class="header-anchor" href="#回答"><span>回答</span></a></h4><p><code>Iterator.remove()</code>是线程安全的，所以你的代码可以这样写：</p><pre><code class="language-java">List&lt;String&gt; list = new ArrayList&lt;&gt;();

for (Iterator&lt;String&gt; iterator = list.iterator(); iterator.hasNext();) {
    String string = iterator.next();
    if (string.isEmpty()) {
    
        // 从迭代器中移除集合元素，集合中相应的集合元素也会安全地被移除
        // 在这里，如果继续调用的是list.remove(string)，那么仍会抛出异常
        iterator.remove();
    }
}
</code></pre><p>在遍历集合时修改集合的结构或内容的情况中，<code>Iterator.remove()</code>是唯一线程安全的方法。</p><h4 id="问题原因" tabindex="-1"><a class="header-anchor" href="#问题原因"><span>问题原因</span></a></h4><p>fail-fast, 快速失败机制，是java集合类的一种错误检查机制。当有多个线程同时对集合进行遍历以及内容或者结构的修改时，就有可能产生fail-fast机制。这意味着，当它们发现容器在迭代的过程中被修改时，就会抛出一个ConcurrentModificationException异常。</p><p>迭代器的快速失败行为无法得到保证，它不能保证一定会出现该错误，但是快速失败操作会尽最大努力抛出ConcurrentModificationException异常，这个异常仅用于检测bug。这种迭代器并不是完备的处理机制，而只是作为并发问题的一个预警指示器。</p><h4 id="拓展阅读" tabindex="-1"><a class="header-anchor" href="#拓展阅读"><span>拓展阅读</span></a></h4><p><a href="https://github.com/AcceptedBoy/backstage-vacation-plan/blob/master/chapter1/concurrency/fail-fast.md" target="_blank" rel="noopener noreferrer">fail-fast机制的原理解析</a></p><h4 id="stackoverflow地址" tabindex="-1"><a class="header-anchor" href="#stackoverflow地址"><span>StackOverFlow地址</span></a></h4><p><a href="http://stackoverflow.com/questions/223918/iterating-through-a-collection-avoiding-concurrentmodificationexception-when-re" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/223918/iterating-through-a-collection-avoiding-concurrentmodificationexception-when-re</a></p>`,18),a=[r];function c(l,p){return n(),t("div",null,a)}const s=e(i,[["render",c],["__file","iterating-through-a-collection-avoiding-concurrentmodificationexception-when-re.html.vue"]]),h=JSON.parse('{"path":"/cs-tips/java-tip/stackoverflow/iterating-through-a-collection-avoiding-concurrentmodificationexception-when-re.html","title":"遍历集合时移除元素，怎样避免ConcurrentModificationException异常抛出","lang":"zh-CN","frontmatter":{"description":"遍历集合时移除元素，怎样避免ConcurrentModificationException异常抛出 问题 在遍历集合的过程中，不会总出现ConcurrentModificationException异常的抛出，但是在下面的代码块中： 运行之后，结果显而易见，总是会抛出异常： 所以，遍历集合时移除元素，怎样避免ConcurrentModification...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/stackoverflow/iterating-through-a-collection-avoiding-concurrentmodificationexception-when-re.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"遍历集合时移除元素，怎样避免ConcurrentModificationException异常抛出"}],["meta",{"property":"og:description","content":"遍历集合时移除元素，怎样避免ConcurrentModificationException异常抛出 问题 在遍历集合的过程中，不会总出现ConcurrentModificationException异常的抛出，但是在下面的代码块中： 运行之后，结果显而易见，总是会抛出异常： 所以，遍历集合时移除元素，怎样避免ConcurrentModification..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"遍历集合时移除元素，怎样避免ConcurrentModificationException异常抛出\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":4,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":4,"title":"回答","slug":"回答","link":"#回答","children":[]},{"level":4,"title":"问题原因","slug":"问题原因","link":"#问题原因","children":[]},{"level":4,"title":"拓展阅读","slug":"拓展阅读","link":"#拓展阅读","children":[]},{"level":4,"title":"StackOverFlow地址","slug":"stackoverflow地址","link":"#stackoverflow地址","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.68,"words":505},"filePathRelative":"cs-tips/java-tip/stackoverflow/iterating-through-a-collection-avoiding-concurrentmodificationexception-when-re.md","localizedDate":"2023年5月25日","autoDesc":true}');export{s as comp,h as data};
