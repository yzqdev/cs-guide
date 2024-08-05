import{_ as t,c as e,o as n,d as a}from"./app-CbULZrmi.js";const i={},o=a(`<h1 id="listview实例" tabindex="-1"><a class="header-anchor" href="#listview实例"><span>listview实例</span></a></h1><h2 id="homefragment" tabindex="-1"><a class="header-anchor" href="#homefragment"><span>homefragment</span></a></h2><pre><code class="language-kotlin">  
import android.os.Bundle  
import android.view.LayoutInflater  
import android.view.View  
import android.view.ViewGroup  
import android.widget.Toast  
import androidx.fragment.app.Fragment  
import androidx.navigation.fragment.findNavController  
  
class HomeFragment : Fragment() {  
  private var _binding: FragmentHomeBinding? = null  
  private val binding get() = _binding!!  
  override fun onCreateView(  
    inflater: LayoutInflater,  
    container: ViewGroup?,  
    savedInstanceState: Bundle?  
  ): View? {  
    _binding = FragmentHomeBinding.inflate(inflater, container, false)  
    return binding.root  
  }  
  
  override fun onDestroyView() {  
    super.onDestroyView()  
    _binding = null  
  }  
  
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {  
    super.onViewCreated(view, savedInstanceState)  
    //这里跳转fragment  
    val cats = listOf&lt;Cat&gt;(Cat(&quot;tom&quot;, 4), Cat(&quot;jerry&quot;, 3), Cat(&quot;spark&quot;, 5))  
    val navController = findNavController()  
    binding.homeLv.adapter = ListAdapter(requireActivity(),cats)  
    binding.homeLv.setOnItemClickListener { parent, view, position, id -&gt;  
      Toast.makeText(requireContext(), cats[position].toString(), Toast.LENGTH_SHORT).show()  
    }  
  }  
}
</code></pre><h2 id="fragment-home-xml" tabindex="-1"><a class="header-anchor" href="#fragment-home-xml"><span>fragment_home.xml</span></a></h2><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;  
&lt;androidx.constraintlayout.widget.ConstraintLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  
  xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;  
  android:layout_width=&quot;match_parent&quot;  
  android:layout_height=&quot;match_parent&quot;&gt;  
  
  &lt;ListView  
    android:id=&quot;@+id/home_lv&quot;  
    android:layout_width=&quot;match_parent&quot;  
    android:layout_height=&quot;wrap_content&quot;  
    app:layout_constraintStart_toStartOf=&quot;parent&quot;  
    app:layout_constraintTop_toTopOf=&quot;parent&quot; /&gt;  
&lt;/androidx.constraintlayout.widget.ConstraintLayout&gt;
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
</code></pre><h2 id="cat-kt" tabindex="-1"><a class="header-anchor" href="#cat-kt"><span>Cat.kt</span></a></h2><pre><code class="language-kotlin">data class Cat(val name:String,val age:Int)
</code></pre><h2 id="listadapter-kt" tabindex="-1"><a class="header-anchor" href="#listadapter-kt"><span>ListAdapter.kt</span></a></h2><pre><code class="language-kotlin">  
import android.view.LayoutInflater  
import android.view.View  
import android.view.ViewGroup  
import android.widget.BaseAdapter  
import androidx.fragment.app.FragmentActivity  
  
class ListAdapter(val ctx: FragmentActivity, private val data: List&lt;Cat&gt;) : BaseAdapter() {  
  override fun getCount(): Int {  
    return data.size  
  }  
  
  override fun getItem(position: Int): Any {  
    return data[position]  
  }  
  
  override fun getItemId(position: Int): Long {  
    return position.toLong()  
  }  
  
  override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {  
    val binding = ListItemBinding.inflate(  
      LayoutInflater.from(parent?.context),  
      parent,  
      false  
    )  
    val view: View = convertView ?: binding.root  
    binding.listTv.text = data[position].name  
    return view  
  }  
  
}
</code></pre>`,11),r=[o];function d(l,s){return n(),e("div",null,r)}const p=t(i,[["render",d],["__file","listview-sample.html.vue"]]),u=JSON.parse('{"path":"/android-tips/listview-sample.html","title":"listview实例","lang":"zh-CN","frontmatter":{"description":"listview实例 homefragment fragment_home.xml list_item.xml Cat.kt ListAdapter.kt","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/listview-sample.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"listview实例"}],["meta",{"property":"og:description","content":"listview实例 homefragment fragment_home.xml list_item.xml Cat.kt ListAdapter.kt"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"listview实例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"homefragment","slug":"homefragment","link":"#homefragment","children":[]},{"level":2,"title":"fragment_home.xml","slug":"fragment-home-xml","link":"#fragment-home-xml","children":[]},{"level":2,"title":"list_item.xml","slug":"list-item-xml","link":"#list-item-xml","children":[]},{"level":2,"title":"Cat.kt","slug":"cat-kt","link":"#cat-kt","children":[]},{"level":2,"title":"ListAdapter.kt","slug":"listadapter-kt","link":"#listadapter-kt","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.89,"words":267},"filePathRelative":"android-tips/listview-sample.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,u as data};
