import{_ as t,c as o,o as e,d as n}from"./app-CbULZrmi.js";const a={},u=n(`<h1 id="布局" tabindex="-1"><a class="header-anchor" href="#布局"><span>布局</span></a></h1><h2 id="linearlayout" tabindex="-1"><a class="header-anchor" href="#linearlayout"><span>linearlayout</span></a></h2><p>竖向<code>android:orientation=&quot;vertical&quot;</code><br> 根据<code>android:layout_weight</code>确定长宽比例</p><h2 id="relativelayout" tabindex="-1"><a class="header-anchor" href="#relativelayout"><span>relativelayout</span></a></h2><p>添加<code>android:layout_centerVertical=&quot;true&quot;</code></p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;400dp&quot;
    tools:context=&quot;.RelativeLayoutActivity&quot;&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:text=&quot;中间&quot;
        android:textSize=&quot;20sp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/tv_center_vertical&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:text=&quot;下面&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/tv_center_center&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:text=&quot;中间中间&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignBottom=&quot;@+id/tv_center_center&quot;
        android:layout_toStartOf=&quot;@+id/tv_center_center&quot;
        android:text=&quot;中间的左边&quot; /&gt;    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/tv_center_center&quot;
        android:layout_toLeftOf=&quot;@+id/tv_center_center&quot;
        android:text=&quot;中间的下面&quot; /&gt;
&lt;/RelativeLayout&gt;

</code></pre><h2 id="gridlayout" tabindex="-1"><a class="header-anchor" href="#gridlayout"><span>gridlayout</span></a></h2><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;GridLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:columnCount=&quot;2&quot;
    android:rowCount=&quot;2&quot;
    tools:context=&quot;.GridLayoutActivity&quot;&gt;

    &lt;TextView
        android:layout_columnWeight=&quot;1&quot;
        android:layout_height=&quot;60dp&quot;
        android:background=&quot;#555555&quot;
        android:text=&quot;左上&quot;
        android:textSize=&quot;20sp&quot; /&gt;

    &lt;TextView
      
        android:layout_height=&quot;60dp&quot;
        android:layout_columnWeight=&quot;1&quot;
        android:background=&quot;#009688&quot;
        android:text=&quot;右上&quot;
        android:textSize=&quot;20sp&quot; /&gt;

    &lt;TextView
        android:layout_columnWeight=&quot;1&quot;
        android:layout_height=&quot;60dp&quot;
        android:background=&quot;#9C27B0&quot;
        android:text=&quot;左下&quot;
        android:textSize=&quot;20sp&quot; /&gt;

    &lt;TextView
        android:layout_columnWeight=&quot;1&quot;
        android:layout_height=&quot;60dp&quot;
        android:background=&quot;#FFEB3B&quot;
        android:text=&quot;右下&quot;
        android:textSize=&quot;20sp&quot; /&gt;
&lt;/GridLayout&gt;

</code></pre>`,8),d=[u];function i(r,l){return e(),o("div",null,d)}const q=t(a,[["render",i],["__file","layout.html.vue"]]),s=JSON.parse('{"path":"/android-tips/notes/layout.html","title":"布局","lang":"zh-CN","frontmatter":{"description":"布局 linearlayout 竖向android:orientation=\\"vertical\\" 根据android:layout_weight确定长宽比例 relativelayout 添加android:layout_centerVertical=\\"true\\" gridlayout","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/notes/layout.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"布局"}],["meta",{"property":"og:description","content":"布局 linearlayout 竖向android:orientation=\\"vertical\\" 根据android:layout_weight确定长宽比例 relativelayout 添加android:layout_centerVertical=\\"true\\" gridlayout"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"布局\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"linearlayout","slug":"linearlayout","link":"#linearlayout","children":[]},{"level":2,"title":"relativelayout","slug":"relativelayout","link":"#relativelayout","children":[]},{"level":2,"title":"gridlayout","slug":"gridlayout","link":"#gridlayout","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.91,"words":272},"filePathRelative":"android-tips/notes/layout.md","localizedDate":"2023年5月22日","autoDesc":true}');export{q as comp,s as data};
