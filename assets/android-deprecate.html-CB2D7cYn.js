import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const r={},i=a(`<h1 id="安卓已经弃用的" tabindex="-1"><a class="header-anchor" href="#安卓已经弃用的"><span>安卓已经弃用的</span></a></h1><h2 id="getdrawable-int-id" tabindex="-1"><a class="header-anchor" href="#getdrawable-int-id"><span><code>getDrawable(int id)</code></span></a></h2><p>虽然getDrawable(int id)已经废弃了，但是依旧还是可以用的。</p><p>如果你的Android版本比较高，那就按照官方的提示，可以使用<code>getDrawable(int, Theme)</code>替代。 使用drawable资源但不为其设置theme主题</p><pre><code class="language-java">ResourcesCompat.getDrawable(getResources(), R.drawable.name, null);
</code></pre><p>使用默认的activity主题</p><pre><code class="language-java">ContextCompat.getDrawable(getActivity(), R.drawable.name);
</code></pre><p>使用自定义主题</p><pre><code class="language-java">
ResourcesCompat.getDrawable(getResources(), R.drawable.name, anotherTheme);
</code></pre><p>为了兼容,可以使用</p><pre><code class="language-java">if (Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.LOLLIPOP) {
    return resources.getDrawable(id, context.getTheme());
} else {
    return resources.getDrawable(id);
}

</code></pre><h2 id="onbackpress" tabindex="-1"><a class="header-anchor" href="#onbackpress"><span>onBackPress</span></a></h2><pre><code class="language-kotlin">  @Deprecated(&quot;Deprecated in Java&quot;)
    override fun onBackPressed() {
        if (mTag != &quot;activity_constraint&quot;) {
            mTag = &quot;activity_constraint&quot;
            setContentView(mTag)
        } else {
            super.onBackPressed()
        }
    }

</code></pre><p>替代</p><pre><code class="language-kotlin">
# 在onCreate里面
onBackPressedDispatcher.addCallback(object: OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (mTag != &quot;activity_constraint&quot;) {
                    mTag = &quot;activity_constraint&quot;
                    setContentView(mTag)
                } else {
                    
                }
            }

        })

</code></pre><h2 id="创建menu" tabindex="-1"><a class="header-anchor" href="#创建menu"><span>创建menu</span></a></h2><pre><code class="language-kotlin">class Activity{
override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {  
    super.onCreateOptionsMenu(menu, inflater)  
    inflater.inflate(R.menu.menu, menu)  
}  
  
@Deprecated(&quot;Deprecated in Java&quot;)  
override fun onOptionsItemSelected(item: MenuItem): Boolean {  
    when (item.itemId) {  
        R.id.get -&gt; GET()  
    
    }  
    return super.onOptionsItemSelected(item)  
}
}
</code></pre><p>替代为</p><pre><code class="language-kotlin">class Fragment{
   fun onViewCreated(){


   requireActivity().addMenuProvider(object :MenuProvider{  
    override fun onCreateMenu(menu: Menu, menuInflater: MenuInflater) {  
       menuInflater.inflate(R.menu.menu_request_method, menu)  
    }  
  
    override fun onMenuItemSelected(menuItem: MenuItem): Boolean {  
        when (menuItem.itemId) {  
            R.id.get -&gt; GET()  
            R.id.post -&gt; POST()  
            R.id.head -&gt; HEAD()  
            R.id.trace -&gt; TRACE()  
            R.id.options -&gt; OPTIONS()  
            R.id.delete -&gt; DELETE()  
            R.id.put -&gt; PUT()  
            R.id.patch -&gt; PATCH()  
            R.id.json -&gt; JSON()  
        }  
        return true  
    }  
 //下面表示只在当前fragment生效,关闭fragment menu消失
}, viewLifecycleOwner, Lifecycle.State.RESUMED)
 


   }

}
</code></pre><h2 id="handler-被弃用" tabindex="-1"><a class="header-anchor" href="#handler-被弃用"><span>handler()被弃用</span></a></h2><h3 id="使用java" tabindex="-1"><a class="header-anchor" href="#使用java"><span>使用java</span></a></h3><pre><code class="language-java"> 
new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
    @Override
    public void run() {
        // Your Code
    }
}, 3000);
 
</code></pre><h3 id="使用kotlin" tabindex="-1"><a class="header-anchor" href="#使用kotlin"><span>使用kotlin</span></a></h3><pre><code class="language-kotlin">\`\`\`scss
Handler(Looper.getMainLooper()).postDelayed({
    // Your Code
}, 3000)
</code></pre><pre><code></code></pre>`,25),o=[i];function d(l,c){return t(),n("div",null,o)}const p=e(r,[["render",d],["__file","android-deprecate.html.vue"]]),u=JSON.parse('{"path":"/android-tips/android-deprecate.html","title":"安卓已经弃用的","lang":"zh-CN","frontmatter":{"description":"安卓已经弃用的 getDrawable(int id) 虽然getDrawable(int id)已经废弃了，但是依旧还是可以用的。 如果你的Android版本比较高，那就按照官方的提示，可以使用getDrawable(int, Theme)替代。 使用drawable资源但不为其设置theme主题 使用默认的activity主题 使用自定义主题 为了...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/android-deprecate.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"安卓已经弃用的"}],["meta",{"property":"og:description","content":"安卓已经弃用的 getDrawable(int id) 虽然getDrawable(int id)已经废弃了，但是依旧还是可以用的。 如果你的Android版本比较高，那就按照官方的提示，可以使用getDrawable(int, Theme)替代。 使用drawable资源但不为其设置theme主题 使用默认的activity主题 使用自定义主题 为了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"安卓已经弃用的\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"getDrawable(int id)","slug":"getdrawable-int-id","link":"#getdrawable-int-id","children":[]},{"level":2,"title":"onBackPress","slug":"onbackpress","link":"#onbackpress","children":[]},{"level":2,"title":"创建menu","slug":"创建menu","link":"#创建menu","children":[]},{"level":2,"title":"handler()被弃用","slug":"handler-被弃用","link":"#handler-被弃用","children":[{"level":3,"title":"使用java","slug":"使用java","link":"#使用java","children":[]},{"level":3,"title":"使用kotlin","slug":"使用kotlin","link":"#使用kotlin","children":[]}]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1,"words":301},"filePathRelative":"android-tips/android-deprecate.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,u as data};
