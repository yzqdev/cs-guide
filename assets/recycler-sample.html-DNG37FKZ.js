import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const r={},i=a(`<h1 id="recyclerview实例" tabindex="-1"><a class="header-anchor" href="#recyclerview实例"><span>recyclerview实例</span></a></h1><h2 id="blankfragment-kt" tabindex="-1"><a class="header-anchor" href="#blankfragment-kt"><span>BlankFragment.kt</span></a></h2><pre><code class="language-kotlin">import android.os.Bundle  
import android.view.LayoutInflater  
import android.view.View  
import android.view.ViewGroup  
import androidx.fragment.app.Fragment  
  
class BlankFragment : Fragment() {  
  private var _binding: FragmentBlankBinding? = null  
  val binding get() = _binding!!  
  
  
  override fun onCreateView(  
    inflater: LayoutInflater, container: ViewGroup?,  
    savedInstanceState: Bundle?  
  ): View? {  
    _binding = FragmentBlankBinding.inflate(inflater, container, false)  
    return binding.root  
  }  
  
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {  
    super.onViewCreated(view, savedInstanceState)  
    val cats = listOf&lt;Cat&gt;(Cat(&quot;tom&quot;, 4), Cat(&quot;jerry&quot;, 3), Cat(&quot;spark&quot;, 5))  
    binding.rcView.adapter = RecyclerAdapter(requireActivity(), cats)  
  }  
  
  override fun onDestroyView() {  
    super.onDestroyView()  
    _binding = null  
  }  
}
</code></pre><h2 id="fragment-blank-xml" tabindex="-1"><a class="header-anchor" href="#fragment-blank-xml"><span>fragment_blank.xml</span></a></h2><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;  
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  
  xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;  
  xmlns:tools=&quot;http://schemas.android.com/tools&quot;  
  android:layout_width=&quot;match_parent&quot;  
  android:layout_height=&quot;match_parent&quot;  
  tools:context=&quot;.ui.main.BlankFragment&quot;&gt;  
  
  &lt;androidx.recyclerview.widget.RecyclerView  
    android:id=&quot;@+id/rc_view&quot;  
    android:layout_width=&quot;match_parent&quot;  
    android:layout_height=&quot;match_parent&quot;  
    app:layoutManager=&quot;androidx.recyclerview.widget.LinearLayoutManager&quot; /&gt;  
&lt;/LinearLayout&gt;
</code></pre><h2 id="cat-kt" tabindex="-1"><a class="header-anchor" href="#cat-kt"><span>Cat.kt</span></a></h2><pre><code class="language-kotlin">data class Cat(val name:String,val age:Int)
</code></pre><h2 id="list-item-xml" tabindex="-1"><a class="header-anchor" href="#list-item-xml"><span>list_item.xml</span></a></h2><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;  
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  
  android:layout_width=&quot;match_parent&quot;  
  android:layout_height=&quot;wrap_content&quot;&gt;  
  
  &lt;TextView  
    android:id=&quot;@+id/list_tv&quot;  
    android:layout_width=&quot;match_parent&quot;  
    android:layout_height=&quot;wrap_content&quot;  
    android:layout_margin=&quot;20dp&quot; /&gt;  
&lt;/LinearLayout&gt;
</code></pre><h2 id="recycleradapter-kt" tabindex="-1"><a class="header-anchor" href="#recycleradapter-kt"><span>RecyclerAdapter.kt</span></a></h2><pre><code class="language-kotlin">import android.view.LayoutInflater  
import android.view.ViewGroup  
import android.widget.TextView  
import android.widget.Toast  
import androidx.fragment.app.FragmentActivity  
import androidx.recyclerview.widget.RecyclerView  
  
class RecyclerAdapter(private val ctx: FragmentActivity, private val data: List&lt;Cat&gt;) :  
  RecyclerView.Adapter&lt;RecyclerAdapter.MyViewHolder&gt;() {  
  class MyViewHolder(view: ListItemBinding) : RecyclerView.ViewHolder(view.root) {  
    val tv: TextView = view.listTv  
  
  }  
  
  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {  
    val view = ListItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)  
    return MyViewHolder(view)  
  }  
  
  override fun getItemCount(): Int {  
    return data.size  
  }  
  
  override fun onBindViewHolder(holder: MyViewHolder, position: Int) {  
    holder.tv.text = data[position].name  
    holder.itemView.setOnClickListener {  
      Toast.makeText(ctx, data[position].name, Toast.LENGTH_SHORT).show()  
    }  
  }  
}
</code></pre>`,11),o=[i];function l(d,c){return n(),t("div",null,o)}const m=e(r,[["render",l],["__file","recycler-sample.html.vue"]]),p=JSON.parse('{"path":"/android-tips/recycler-sample.html","title":"recyclerview实例","lang":"zh-CN","frontmatter":{"description":"recyclerview实例 BlankFragment.kt fragment_blank.xml Cat.kt list_item.xml RecyclerAdapter.kt","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/recycler-sample.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"recyclerview实例"}],["meta",{"property":"og:description","content":"recyclerview实例 BlankFragment.kt fragment_blank.xml Cat.kt list_item.xml RecyclerAdapter.kt"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"recyclerview实例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"BlankFragment.kt","slug":"blankfragment-kt","link":"#blankfragment-kt","children":[]},{"level":2,"title":"fragment_blank.xml","slug":"fragment-blank-xml","link":"#fragment-blank-xml","children":[]},{"level":2,"title":"Cat.kt","slug":"cat-kt","link":"#cat-kt","children":[]},{"level":2,"title":"list_item.xml","slug":"list-item-xml","link":"#list-item-xml","children":[]},{"level":2,"title":"RecyclerAdapter.kt","slug":"recycleradapter-kt","link":"#recycleradapter-kt","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.83,"words":250},"filePathRelative":"android-tips/recycler-sample.md","localizedDate":"2023年6月25日","autoDesc":true}');export{m as comp,p as data};
