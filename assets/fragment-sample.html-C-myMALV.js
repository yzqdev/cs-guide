import{_ as t,c as n,o as a,d as o}from"./app-CbULZrmi.js";const e={},i=o(`<h1 id="fragment-路由实例" tabindex="-1"><a class="header-anchor" href="#fragment-路由实例"><span>fragment 路由实例</span></a></h1><h2 id="mainactivity" tabindex="-1"><a class="header-anchor" href="#mainactivity"><span>MainActivity</span></a></h2><pre><code class="language-kotlin">import android.os.Bundle  
import androidx.appcompat.app.AppCompatActivity  
import androidx.navigation.findNavController  
import androidx.navigation.fragment.NavHostFragment  
import androidx.navigation.ui.AppBarConfiguration  
import androidx.navigation.ui.navigateUp  
import androidx.navigation.ui.setupActionBarWithNavController

class MainActivity : AppCompatActivity()  {  
   private lateinit var binding: ActivityMainBinding  
    private lateinit var appBarConfiguration: AppBarConfiguration  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        binding = ActivityMainBinding.inflate(  layoutInflater  )  
        setContentView(binding.root)  
        setSupportActionBar(binding.toolbar)  
         val navHostFragment =  
            supportFragmentManager.findFragmentById(R.id.nav_host_fragment)  
                    as NavHostFragment  
         val navController = navHostFragment.navController  
        appBarConfiguration = AppBarConfiguration(navController.graph)  
        setupActionBarWithNavController(navController, appBarConfiguration)  
  
    }  
    override fun onSupportNavigateUp(): Boolean {  
        val navController = findNavController(R.id.nav_host_fragment)  
        return navController.navigateUp(appBarConfiguration)  
                || super.onSupportNavigateUp()  
    }  
  
}
</code></pre><h2 id="activity-main-xml" tabindex="-1"><a class="header-anchor" href="#activity-main-xml"><span>activity_main.xml</span></a></h2><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;  
  
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  
    xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;  
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;  
    android:id=&quot;@+id/main_container&quot;  
    android:layout_width=&quot;match_parent&quot;  
    android:layout_height=&quot;match_parent&quot;  
    android:orientation=&quot;vertical&quot;  
    tools:context=&quot;ab.yzq.recycler.MainActivity&quot;&gt;  
  
    &lt;androidx.appcompat.widget.Toolbar  
        android:id=&quot;@+id/toolbar&quot;  
        android:layout_width=&quot;match_parent&quot;  
        android:layout_height=&quot;?attr/actionBarSize&quot;  
        android:background=&quot;?attr/colorPrimary&quot;  
        android:theme=&quot;@style/ThemeOverlay.AppCompat.Dark.ActionBar&quot;  
        app:popupTheme=&quot;@style/ThemeOverlay.AppCompat.Light&quot; /&gt;  
  
    &lt;androidx.fragment.app.FragmentContainerView        android:id=&quot;@+id/nav_host_fragment&quot;  
        android:name=&quot;androidx.navigation.fragment.NavHostFragment&quot;  
        android:layout_width=&quot;match_parent&quot;  
        android:layout_height=&quot;match_parent&quot;  
        app:layout_constraintLeft_toLeftOf=&quot;parent&quot;  
        app:layout_constraintRight_toRightOf=&quot;parent&quot;  
        app:layout_constraintTop_toTopOf=&quot;parent&quot;  
        app:layout_constraintBottom_toBottomOf=&quot;parent&quot;  
  
        app:defaultNavHost=&quot;true&quot;  
        app:navGraph=&quot;@navigation/home_list_nav&quot; /&gt;  
  
&lt;/LinearLayout&gt;
</code></pre><h2 id="res-navigation-home-nav-xml" tabindex="-1"><a class="header-anchor" href="#res-navigation-home-nav-xml"><span><code>res/navigation/home_nav.xml</code></span></a></h2><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;  
&lt;navigation xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  
  xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;  
  xmlns:tools=&quot;http://schemas.android.com/tools&quot;  
  android:id=&quot;@+id/home_nav&quot;  
  app:startDestination=&quot;@id/homeFragment&quot;&gt;  
  
  &lt;fragment  
    android:id=&quot;@+id/blankFragment&quot;  
    android:name=&quot;ab.yzq.tutor.customview.ui.main.BlankFragment&quot;  
    android:label=&quot;fragment_blank&quot;  
    tools:layout=&quot;@layout/fragment_blank&quot; /&gt;  
  &lt;fragment    android:id=&quot;@+id/homeFragment&quot;  
    android:name=&quot;ab.yzq.tutor.customview.ui.main.HomeFragment&quot;  
    android:label=&quot;HomeFragment&quot; /&gt;  
  &lt;fragment    android:id=&quot;@+id/mainFragment&quot;  
    android:name=&quot;ab.yzq.tutor.customview.ui.main.MainFragment&quot;  
    android:label=&quot;fragment_main&quot;  
    tools:layout=&quot;@layout/fragment_main&quot; /&gt;  
&lt;/navigation&gt;
</code></pre><h2 id="homefragment" tabindex="-1"><a class="header-anchor" href="#homefragment"><span>HomeFragment</span></a></h2><pre><code class="language-kotlin">  
import android.os.Bundle  
import android.view.LayoutInflater  
import android.view.View  
import android.view.ViewGroup  
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
    val navController = findNavController()  
    binding.homeTv.setOnClickListener {  
      navController.navigate(R.id.mainFragment)  
    }  
  }  
}
</code></pre>`,9),r=[i];function d(m,l){return a(),n("div",null,r)}const u=t(e,[["render",d],["__file","fragment-sample.html.vue"]]),s=JSON.parse('{"path":"/android-tips/fragment-sample.html","title":"fragment 路由实例","lang":"zh-CN","frontmatter":{"description":"fragment 路由实例 MainActivity activity_main.xml res/navigation/home_nav.xml HomeFragment","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/fragment-sample.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"fragment 路由实例"}],["meta",{"property":"og:description","content":"fragment 路由实例 MainActivity activity_main.xml res/navigation/home_nav.xml HomeFragment"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-05T07:30:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-05T07:30:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"fragment 路由实例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-05T07:30:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"MainActivity","slug":"mainactivity","link":"#mainactivity","children":[]},{"level":2,"title":"activity_main.xml","slug":"activity-main-xml","link":"#activity-main-xml","children":[]},{"level":2,"title":"res/navigation/home_nav.xml","slug":"res-navigation-home-nav-xml","link":"#res-navigation-home-nav-xml","children":[]},{"level":2,"title":"HomeFragment","slug":"homefragment","link":"#homefragment","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1712302235000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.04,"words":312},"filePathRelative":"android-tips/fragment-sample.md","localizedDate":"2023年6月25日","autoDesc":true}');export{u as comp,s as data};
