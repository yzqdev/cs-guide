import{_ as a,c as s,a as t,o as p}from"./app-C8DxhDIZ.js";const e={};function o(l,n){return p(),s("div",null,n[0]||(n[0]=[t(`<h1 id="recyclerview实例" tabindex="-1"><a class="header-anchor" href="#recyclerview实例"><span>recyclerview实例</span></a></h1><h2 id="blankfragment-kt" tabindex="-1"><a class="header-anchor" href="#blankfragment-kt"><span>BlankFragment.kt</span></a></h2><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">import</span> android<span class="token punctuation">.</span>os<span class="token punctuation">.</span>Bundle  </span>
<span class="line"><span class="token keyword">import</span> android<span class="token punctuation">.</span>view<span class="token punctuation">.</span>LayoutInflater  </span>
<span class="line"><span class="token keyword">import</span> android<span class="token punctuation">.</span>view<span class="token punctuation">.</span>View  </span>
<span class="line"><span class="token keyword">import</span> android<span class="token punctuation">.</span>view<span class="token punctuation">.</span>ViewGroup  </span>
<span class="line"><span class="token keyword">import</span> androidx<span class="token punctuation">.</span>fragment<span class="token punctuation">.</span>app<span class="token punctuation">.</span>Fragment  </span>
<span class="line">  </span>
<span class="line"><span class="token keyword">class</span> BlankFragment <span class="token operator">:</span> <span class="token function">Fragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  </span>
<span class="line">  <span class="token keyword">private</span> <span class="token keyword">var</span> _binding<span class="token operator">:</span> FragmentBlankBinding<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>  </span>
<span class="line">  <span class="token keyword">val</span> binding <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> _binding<span class="token operator">!!</span>  </span>
<span class="line">  </span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreateView</span><span class="token punctuation">(</span>  </span>
<span class="line">    inflater<span class="token operator">:</span> LayoutInflater<span class="token punctuation">,</span> container<span class="token operator">:</span> ViewGroup<span class="token operator">?</span><span class="token punctuation">,</span>  </span>
<span class="line">    savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span>  </span>
<span class="line">  <span class="token punctuation">)</span><span class="token operator">:</span> View<span class="token operator">?</span> <span class="token punctuation">{</span>  </span>
<span class="line">    _binding <span class="token operator">=</span> FragmentBlankBinding<span class="token punctuation">.</span><span class="token function">inflate</span><span class="token punctuation">(</span>inflater<span class="token punctuation">,</span> container<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>  </span>
<span class="line">    <span class="token keyword">return</span> binding<span class="token punctuation">.</span>root  </span>
<span class="line">  <span class="token punctuation">}</span>  </span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onViewCreated</span><span class="token punctuation">(</span>view<span class="token operator">:</span> View<span class="token punctuation">,</span> savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onViewCreated</span><span class="token punctuation">(</span>view<span class="token punctuation">,</span> savedInstanceState<span class="token punctuation">)</span>  </span>
<span class="line">    <span class="token keyword">val</span> cats <span class="token operator">=</span> listOf<span class="token operator">&lt;</span>Cat<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token function">Cat</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;tom&quot;</span></span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Cat</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;jerry&quot;</span></span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Cat</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;spark&quot;</span></span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  </span>
<span class="line">    binding<span class="token punctuation">.</span>rcView<span class="token punctuation">.</span>adapter <span class="token operator">=</span> <span class="token function">RecyclerAdapter</span><span class="token punctuation">(</span><span class="token function">requireActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> cats<span class="token punctuation">)</span>  </span>
<span class="line">  <span class="token punctuation">}</span>  </span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onDestroyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onDestroyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  </span>
<span class="line">    _binding <span class="token operator">=</span> <span class="token keyword">null</span>  </span>
<span class="line">  <span class="token punctuation">}</span>  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="fragment-blank-xml" tabindex="-1"><a class="header-anchor" href="#fragment-blank-xml"><span>fragment_blank.xml</span></a></h2><div class="language-xml" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>  </span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LinearLayout</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">  <span class="token attr-name"><span class="token namespace">xmlns:</span>app</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res-auto<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">  <span class="token attr-name"><span class="token namespace">xmlns:</span>tools</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/tools<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">  <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">  <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">  <span class="token attr-name"><span class="token namespace">tools:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>.ui.main.BlankFragment<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>  </span>
<span class="line">  </span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>androidx.recyclerview.widget.RecyclerView</span>  </span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/rc_view<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">    <span class="token attr-name"><span class="token namespace">app:</span>layoutManager</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>androidx.recyclerview.widget.LinearLayoutManager<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>  </span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>LinearLayout</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><h2 id="cat-kt" tabindex="-1"><a class="header-anchor" href="#cat-kt"><span>Cat.kt</span></a></h2><div class="language-kotlin" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Cat</span><span class="token punctuation">(</span><span class="token keyword">val</span> name<span class="token operator">:</span>String<span class="token punctuation">,</span><span class="token keyword">val</span> age<span class="token operator">:</span>Int<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="list-item-xml" tabindex="-1"><a class="header-anchor" href="#list-item-xml"><span>list_item.xml</span></a></h2><div class="language-xml" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>  </span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LinearLayout</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">  <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">  <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>  </span>
<span class="line">  </span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextView</span>  </span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/list_tv<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span>  </span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>layout_margin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>20dp<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>  </span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>LinearLayout</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><h2 id="recycleradapter-kt" tabindex="-1"><a class="header-anchor" href="#recycleradapter-kt"><span>RecyclerAdapter.kt</span></a></h2><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">import</span> android<span class="token punctuation">.</span>view<span class="token punctuation">.</span>LayoutInflater  </span>
<span class="line"><span class="token keyword">import</span> android<span class="token punctuation">.</span>view<span class="token punctuation">.</span>ViewGroup  </span>
<span class="line"><span class="token keyword">import</span> android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span>TextView  </span>
<span class="line"><span class="token keyword">import</span> android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span>Toast  </span>
<span class="line"><span class="token keyword">import</span> androidx<span class="token punctuation">.</span>fragment<span class="token punctuation">.</span>app<span class="token punctuation">.</span>FragmentActivity  </span>
<span class="line"><span class="token keyword">import</span> androidx<span class="token punctuation">.</span>recyclerview<span class="token punctuation">.</span>widget<span class="token punctuation">.</span>RecyclerView  </span>
<span class="line">  </span>
<span class="line"><span class="token keyword">class</span> <span class="token function">RecyclerAdapter</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> ctx<span class="token operator">:</span> FragmentActivity<span class="token punctuation">,</span> <span class="token keyword">private</span> <span class="token keyword">val</span> <span class="token keyword">data</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>Cat<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">:</span>  </span>
<span class="line">  RecyclerView<span class="token punctuation">.</span>Adapter<span class="token operator">&lt;</span>RecyclerAdapter<span class="token punctuation">.</span>MyViewHolder<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  </span>
<span class="line">  <span class="token keyword">class</span> <span class="token function">MyViewHolder</span><span class="token punctuation">(</span>view<span class="token operator">:</span> ListItemBinding<span class="token punctuation">)</span> <span class="token operator">:</span> RecyclerView<span class="token punctuation">.</span><span class="token function">ViewHolder</span><span class="token punctuation">(</span>view<span class="token punctuation">.</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token keyword">val</span> tv<span class="token operator">:</span> TextView <span class="token operator">=</span> view<span class="token punctuation">.</span>listTv  </span>
<span class="line">  </span>
<span class="line">  <span class="token punctuation">}</span>  </span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreateViewHolder</span><span class="token punctuation">(</span>parent<span class="token operator">:</span> ViewGroup<span class="token punctuation">,</span> viewType<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> MyViewHolder <span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token keyword">val</span> view <span class="token operator">=</span> ListItemBinding<span class="token punctuation">.</span><span class="token function">inflate</span><span class="token punctuation">(</span>LayoutInflater<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>parent<span class="token punctuation">.</span>context<span class="token punctuation">)</span><span class="token punctuation">,</span> parent<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>  </span>
<span class="line">    <span class="token keyword">return</span> <span class="token function">MyViewHolder</span><span class="token punctuation">(</span>view<span class="token punctuation">)</span>  </span>
<span class="line">  <span class="token punctuation">}</span>  </span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">getItemCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">data</span><span class="token punctuation">.</span>size  </span>
<span class="line">  <span class="token punctuation">}</span>  </span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onBindViewHolder</span><span class="token punctuation">(</span>holder<span class="token operator">:</span> MyViewHolder<span class="token punctuation">,</span> position<span class="token operator">:</span> Int<span class="token punctuation">)</span> <span class="token punctuation">{</span>  </span>
<span class="line">    holder<span class="token punctuation">.</span>tv<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token keyword">data</span><span class="token punctuation">[</span>position<span class="token punctuation">]</span><span class="token punctuation">.</span>name  </span>
<span class="line">    holder<span class="token punctuation">.</span>itemView<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>  </span>
<span class="line">      Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token keyword">data</span><span class="token punctuation">[</span>position<span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  </span>
<span class="line">    <span class="token punctuation">}</span>  </span>
<span class="line">  <span class="token punctuation">}</span>  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11)]))}const i=a(e,[["render",o]]),u=JSON.parse('{"path":"/android-tips/recycler-sample.html","title":"recyclerview实例","lang":"zh-CN","frontmatter":{"description":"recyclerview实例 BlankFragment.kt fragment_blank.xml Cat.kt list_item.xml RecyclerAdapter.kt","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/recycler-sample.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"recyclerview实例"}],["meta",{"property":"og:description","content":"recyclerview实例 BlankFragment.kt fragment_blank.xml Cat.kt list_item.xml RecyclerAdapter.kt"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"recyclerview实例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"BlankFragment.kt","slug":"blankfragment-kt","link":"#blankfragment-kt","children":[]},{"level":2,"title":"fragment_blank.xml","slug":"fragment-blank-xml","link":"#fragment-blank-xml","children":[]},{"level":2,"title":"Cat.kt","slug":"cat-kt","link":"#cat-kt","children":[]},{"level":2,"title":"list_item.xml","slug":"list-item-xml","link":"#list-item-xml","children":[]},{"level":2,"title":"RecyclerAdapter.kt","slug":"recycleradapter-kt","link":"#recycleradapter-kt","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.83,"words":250},"filePathRelative":"android-tips/recycler-sample.md","localizedDate":"2023年6月25日","autoDesc":true}');export{i as comp,u as data};
