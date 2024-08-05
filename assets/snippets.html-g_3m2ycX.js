import{_ as n,c as e,o as t,d as a}from"./app-CbULZrmi.js";const o={},i=a(`<h1 id="代码片段" tabindex="-1"><a class="header-anchor" href="#代码片段"><span>代码片段</span></a></h1><h1 id="安卓代码片段" tabindex="-1"><a class="header-anchor" href="#安卓代码片段"><span>安卓代码片段</span></a></h1><h2 id="获取navhost" tabindex="-1"><a class="header-anchor" href="#获取navhost"><span>获取navhost</span></a></h2><p>标签使用<code>androidx.fragment.app.FragmentContainerView</code>会闪退,因为oncreated生命周期还未初始化 下面的代码可以解决 android文档原文-&gt;<a href="https://developer.android.google.cn/guide/navigation/navigation-getting-started?hl=zh-cn#java" target="_blank" rel="noopener noreferrer">链接</a></p><pre><code class="language-java">
NavHostFragment navHostFragment = (NavHostFragment) getSupportFragmentManager().findFragmentById(R.id.nav_host_fragment_activity_main);
NavController navController = navHostFragment.getNavController();
</code></pre><h2 id="fragment实例添加argument" tabindex="-1"><a class="header-anchor" href="#fragment实例添加argument"><span>fragment实例添加argument</span></a></h2><pre><code class="language-kotlin">    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment RequestFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            RequestFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
</code></pre><h2 id="fragment添加menu" tabindex="-1"><a class="header-anchor" href="#fragment添加menu"><span>fragment添加menu</span></a></h2><pre><code class="language-kotlin">val menuHost = requireActivity()
        menuHost.addMenuProvider(object : MenuProvider {
            override fun onCreateMenu(menu: Menu, menuInflater: MenuInflater) {
                menuInflater.inflate(R.menu.menu_main, menu)
            }

            override fun onMenuItemSelected(menuItem: MenuItem): Boolean {
                when (menuItem.itemId) {
                    R.id.action_settings -&gt; {
                        Toaster.show(&quot;menu&quot;)
                        return true
                    }

                    else -&gt; return false
                }
            }

        })

</code></pre><h1 id="如何获取android设备唯一id" tabindex="-1"><a class="header-anchor" href="#如何获取android设备唯一id"><span>如何获取Android设备唯一ID？</span></a></h1><h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h3><p>每一个android设备都有唯一ID吗？如果有？怎么用java最简单取得呢？</p><h3 id="回答1-最佳" tabindex="-1"><a class="header-anchor" href="#回答1-最佳"><span>回答1（最佳）</span></a></h3><p>如何取得android唯一码？</p><p>好处：</p><ul><li>1.不需要特定权限.</li><li>2.在99.5% Android装置（包括root过的）上，即API =&gt; 9，保证唯一性.</li><li>3.重装app之后仍能取得相同唯一值.</li></ul><p>伪代码：</p><pre><code>if API =&gt; 9/10: (99.5% of devices)

return unique ID containing serial id (rooted devices may be different)

else

return unique ID of build information (may overlap data - API &lt; 9)
</code></pre><p>代码:</p><pre><code class="language-java">
/**
 * Return pseudo unique ID
 * @return ID
 */public static String getUniquePsuedoID() {
    // If all else fails, if the user does have lower than API 9 (lower
    // than Gingerbread), has reset their device or &#39;Secure.ANDROID_ID&#39;
    // returns &#39;null&#39;, then simply the ID returned will be solely based
    // off their Android device information. This is where the collisions
    // can happen.
    // Thanks http://www.pocketmagic.net/?p=1662!
    // Try not to use DISPLAY, HOST or ID - these items could change.
    // If there are collisions, there will be overlapping data
    String m_szDevIDShort = &quot;35&quot; + (Build.BOARD.length() % 10) + (Build.BRAND.length() % 10) + (Build.CPU_ABI.length() % 10) + (Build.DEVICE.length() % 10) + (Build.MANUFACTURER.length() % 10) + (Build.MODEL.length() % 10) + (Build.PRODUCT.length() % 10);

    // Thanks to @Roman SL!
    // http://stackoverflow.com/a/4789483/950427
    // Only devices with API &gt;= 9 have android.os.Build.SERIAL
    // http://developer.android.com/reference/android/os/Build.html#SERIAL
    // If a user upgrades software or roots their device, there will be a duplicate entry
    String serial = null;
    try {
        serial = android.os.Build.class.getField(&quot;SERIAL&quot;).get(null).toString();

        // Go ahead and return the serial for api =&gt; 9
        return new UUID(m_szDevIDShort.hashCode(), serial.hashCode()).toString();
    } catch (Exception exception) {
        // String needs to be initialized
        serial = &quot;serial&quot;; // some value
    }

    // Thanks @Joe!
    // http://stackoverflow.com/a/2853253/950427
    // Finally, combine the values we have found by using the UUID class to create a unique identifier
    return new UUID(m_szDevIDShort.hashCode(), serial.hashCode()).toString();}
</code></pre><h3 id="回答2" tabindex="-1"><a class="header-anchor" href="#回答2"><span>回答2</span></a></h3><p>好处：</p><ul><li>1.不需要特定权限.</li><li>2.在100% Android装置（包括root过的）上，保证唯一性.</li></ul><p>坏处</p><ul><li>1.重装app之后不能取得相同唯一值.</li></ul><pre><code class="language-java">private static String uniqueID = null;
private static final String PREF_UNIQUE_ID = &quot;PREF_UNIQUE_ID&quot;;

public synchronized static String id(Context context) {
    if (uniqueID == null) {
        SharedPreferences sharedPrefs = context.getSharedPreferences(
                PREF_UNIQUE_ID, Context.MODE_PRIVATE);
        uniqueID = sharedPrefs.getString(PREF_UNIQUE_ID, null);
        if (uniqueID == null) {
            uniqueID = UUID.randomUUID().toString();
            Editor editor = sharedPrefs.edit();
            editor.putString(PREF_UNIQUE_ID, uniqueID);
            editor.commit();
        }
    }
    return uniqueID;
}
</code></pre><h3 id="回答3-需要有电话卡" tabindex="-1"><a class="header-anchor" href="#回答3-需要有电话卡"><span>回答3（需要有电话卡）</span></a></h3><p>好处： 1.重装app之后仍能取得相同唯一值.</p><p>代码：</p><pre><code class="language-java">    final TelephonyManager tm = (TelephonyManager) getBaseContext().getSystemService(Context.TELEPHONY_SERVICE);
    final String tmDevice, tmSerial, androidId;
    tmDevice = &quot;&quot; + tm.getDeviceId();
    tmSerial = &quot;&quot; + tm.getSimSerialNumber();
    androidId = &quot;&quot; + android.provider.Settings.Secure.getString(getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
    UUID deviceUuid = new UUID(androidId.hashCode(), ((long)tmDevice.hashCode() &lt;&lt; 32) | tmSerial.hashCode());
    String deviceId = deviceUuid.toString();
</code></pre><p>谨记：要取得以下权限</p><pre><code>&lt;uses-permission android:name=&quot;android.permission.READ_PHONE_STATE&quot; /&gt;
</code></pre><p>stackoverflow链接： <a href="http://stackoverflow.com/questions/2785485/is-there-a-unique-android-device-id" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/2785485/is-there-a-unique-android-device-id</a></p><h2 id="activity显示返回按钮" tabindex="-1"><a class="header-anchor" href="#activity显示返回按钮"><span>activity显示返回按钮</span></a></h2><pre><code>oncreated中
  ActionBar actionBar = this.getSupportActionBar();
        actionBar.setTitle(&quot;搜索功能&quot;);
        actionBar.setDisplayHomeAsUpEnabled(true);
        
        
        然后
       @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if(item.getItemId() == android.R.id.home)
        {
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }     
    
    
    
</code></pre><h2 id="显示返回键" tabindex="-1"><a class="header-anchor" href="#显示返回键"><span>显示返回键</span></a></h2><pre><code>
 //不要使用navController.getGraph() 不然会出现返回键
        appBarConfiguration = AppBarConfiguration.Builder(
           navController.graph
        )
            .build()
        setupActionBarWithNavController(this, navController, appBarConfiguration)
</code></pre><h2 id="kotlin用法" tabindex="-1"><a class="header-anchor" href="#kotlin用法"><span>kotlin用法</span></a></h2><h3 id="接口实现" tabindex="-1"><a class="header-anchor" href="#接口实现"><span>接口实现</span></a></h3><p>java</p><pre><code class="language-java">button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        button.setOnClickListener((v) -&gt; {
            
        });

</code></pre><p>kotlin</p><pre><code class="language-kotlin">button.setOnClickListener(object : View.OnClickListener{
    override fun onClick(v: View?) {
       
    }
})
     button.setOnClickListener {
     
     }

</code></pre><h2 id="使用代码实现view布局" tabindex="-1"><a class="header-anchor" href="#使用代码实现view布局"><span>使用代码实现view布局</span></a></h2><pre><code class="language-kotlin">  override fun onCreateView(  
    inflater: LayoutInflater,  
    container: ViewGroup?,  
    savedInstanceState: Bundle?  
  ): View? {  
  
    val lvRoot = LinearLayout(requireContext()).apply {  
      orientation = LinearLayout.VERTICAL  
      layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)  
      addView(Button(requireContext()).apply {  
        text = &quot;thi is button&quot;  
        layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)  
      })  
    }  
    val tv1 = TextView(requireContext()).apply {  
      text = &quot;thi is text&quot;  
      layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)  
    }  
    val tv2 = TextView(requireContext()).apply {  
      text = &quot;thi is text3333322222222&quot;  
      layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)  
    }  
  
    lvRoot.addView(tv1)  
    lvRoot.addView(tv2)  
//    _binding = FragmentLineLayoutBinding.inflate(inflater, container, false)  
//    return binding.root  
    return lvRoot.rootView  
  }
</code></pre><h1 id="kotlin-compose" tabindex="-1"><a class="header-anchor" href="#kotlin-compose"><span>kotlin compose</span></a></h1><pre><code class="language-kotlin">import android.content.Intent  
import android.os.Bundle  
import androidx.activity.ComponentActivity  
import androidx.activity.compose.setContent  
import androidx.compose.foundation.clickable  
import androidx.compose.foundation.layout.Box  
import androidx.compose.foundation.layout.Column  
import androidx.compose.foundation.layout.fillMaxWidth  
import androidx.compose.foundation.layout.padding  
import androidx.compose.foundation.lazy.LazyColumn  
import androidx.compose.foundation.lazy.items  
import androidx.compose.material3.ExperimentalMaterial3Api  
import androidx.compose.material3.MaterialTheme  
import androidx.compose.material3.Scaffold  
import androidx.compose.material3.Text  
import androidx.compose.material3.TopAppBar  
import androidx.compose.ui.Modifier  
import androidx.compose.ui.draw.drawBehind  
import androidx.compose.ui.geometry.Offset  
import androidx.compose.ui.graphics.Color  
import androidx.compose.ui.platform.LocalContext  
import androidx.compose.ui.unit.dp  
import cn.yzq.simpleKt.simple.ui.cat.CatActivity  
  
  
class HomeListActivity : ComponentActivity() {  
  
  @OptIn(ExperimentalMaterial3Api::class)  
  override fun onCreate(savedInstanceState: Bundle?) {  
    super.onCreate(savedInstanceState)  
    setContent {  
      val ctx = LocalContext.current  
      MaterialTheme {  
        val btns = listOf(  
          MyIntent(  
            &quot;main&quot;, &quot;main desc&quot;,  
          ) {  
            ctx.startActivity(  
              Intent(  
                ctx,  
                MainActivity::class.java  
              )  
            )  
          },  
          MyIntent(  
            &quot;cat activity&quot;, &quot;cat desc&quot;,  
          ) {  
            ctx.startActivity(  
              Intent(  
                ctx,  
                CatActivity::class.java  
              )  
            )  
          },  
  
          )  
        Scaffold(topBar = {  
          TopAppBar(title = {  
            Text(  
              &quot;首页&quot;,  
              color = Color.White,  
              modifier = Modifier.padding(horizontal = 10.dp)  
            )  
          })  
        }) {  
          Box(modifier = Modifier.padding(it)) {  
            LazyColumn(content = {  
  
              items(btns) { col -&gt;  
                Column(modifier = Modifier  
                  .drawBehind {  
  
                    val strokeWidth = 1 * density  
                    val y = size.height - strokeWidth / 2  
  
                    drawLine(  
                      Color.LightGray,  
                      Offset(0f, y),  
                      Offset(size.width, y),  
                      strokeWidth  
                    )  
                  }  
                  .padding(10.dp)  
                  .fillMaxWidth()  
                  .clickable {  
                    col.intent()  
                  }) {  
                  Text(text = col.title)  
                  Text(text = col.description, color = Color.LightGray)  
                }  
  
              }  
            })  
          }        }  
  
  
      }  
    }  
  
  }  
}  
  
class MyIntent(val title: String, val description: String, val intent: () -&gt; Unit)
</code></pre><p>获取权限</p><pre><code class="language-kotlin">package ab.yzq.img.screen

import ab.yzq.img.ScaffoldView
import android.Manifest
import android.content.pm.PackageManager
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat
import androidx.navigation.NavHostController
import com.elvishew.xlog.XLog
import com.hjq.toast.Toaster

@Composable
fun HomeScreen(navHostController: NavHostController) {
    val ctx= LocalContext.current
    val requestPermissionLauncher =
        rememberLauncherForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { isGranted: Boolean -&gt;
            if (isGranted) {
                // Permission is granted. Continue the action or workflow in your
                // app.
                Toaster.show(&quot;获取权限\${Manifest.permission.READ_EXTERNAL_STORAGE}成功&quot;)
            } else {
                Toaster.show(&quot;获取权限\${Manifest.permission.READ_EXTERNAL_STORAGE}失败&quot;)
                // Explain to the user that the feature is unavailable because the
                // feature requires a permission that the user has denied. At the
                // same time, respect the user&#39;s decision. Don&#39;t link to system
                // settings in an effort to convince the user to change their
                // decision.
            }
        }

    ScaffoldView(title = &quot;首页&quot;, navController = navHostController) {
        LazyColumn(content = {
            item {
                Button(onClick = {

                    when (PackageManager.PERMISSION_GRANTED) {
                        ContextCompat.checkSelfPermission(
                            ctx,
                            Manifest.permission.READ_EXTERNAL_STORAGE
                        ) -&gt; {

                            // Some works that require permission
                            XLog.enableBorder().d(&quot;权限已经获取了&quot;)
                        }
                        else -&gt; {
                            // Asking for permission
                           requestPermissionLauncher.launch(Manifest.permission.READ_EXTERNAL_STORAGE)
                        }
                    }
                }) {
                    Text(text = &quot;hhh&quot;)
                }
            }
        })
    }
}
</code></pre><h1 id="安卓用法" tabindex="-1"><a class="header-anchor" href="#安卓用法"><span>安卓用法</span></a></h1><p>在其他Fragment中取得PreferenceFragmentCompat组件的设定值(设置界面的配置信息)</p><pre><code>SharedPreferences preferences= PreferenceManager.getDefaultSharedPreferences(getContext());
        boolean flag=preferences.getBoolean(&quot;english&quot;,true);
        String random=preferences.getString(&quot;randomNum&quot;,&quot;0000&quot;);
        Set&lt;String&gt; s=preferences.getStringSet(&quot;multi_select_list_preference&quot;,null);
        Log.i(&quot;lee&quot;, &quot;onCreateView: &quot;+flag+random+s);
</code></pre><p>关闭lint和test</p><p>kotlin</p><pre><code class="language-kotlin">
tasks.configureEach { task -&gt;
    if (task.name.equals(&quot;lint&quot;)) {
        //this is for speed up build
        task.enabled = false
    }
    if (task.name.contains(&quot;Test&quot;)) {
        //this is what you need
        task.enabled = false
    }
}
</code></pre><p>groovy</p><pre><code class="language-groovy">
gradle.taskGraph.whenReady {
    tasks.each { task -&gt;
        if (task.name.contains(&quot;test&quot;))
        {
            task.enabled = false
        }
    }
}

或者
tasks.configureEach { task -&gt;
    if (task.name.equals(&quot;lint&quot;)) {
        //this is for speed up build
        task.enabled = false
    }
    if (task.name.contains(&quot;Test&quot;)) {
        //this is what you need
        task.enabled = false
    }
}
</code></pre><h2 id="compose实现下边框" tabindex="-1"><a class="header-anchor" href="#compose实现下边框"><span>compose实现下边框</span></a></h2><pre><code>
 .drawBehind {

                        val strokeWidth = 1 * density
                        val y = size.height - strokeWidth / 2

                        drawLine(
                            Color.LightGray,
                            Offset(0f, y),
                            Offset(size.width, y),
                            strokeWidth
                        )
                    }
</code></pre><h2 id="动态添加组件" tabindex="-1"><a class="header-anchor" href="#动态添加组件"><span>动态添加组件</span></a></h2><h3 id="flowlayout" tabindex="-1"><a class="header-anchor" href="#flowlayout"><span>flowlayout</span></a></h3><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:id=&quot;@+id/constraintLayout&quot;
    xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;wrap_content&quot;
    &gt;

  &lt;androidx.constraintlayout.helper.widget.Flow
      android:id=&quot;@+id/flow&quot;
      android:layout_width=&quot;0dp&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:orientation=&quot;horizontal&quot;
      app:flow_wrapMode=&quot;chain&quot;
      app:layout_constraintBottom_toBottomOf=&quot;parent&quot;
      app:layout_constraintEnd_toEndOf=&quot;parent&quot;
      app:layout_constraintStart_toStartOf=&quot;parent&quot;
      /&gt;
&lt;/androidx.constraintlayout.widget.ConstraintLayout&gt;
</code></pre><p>kotlin</p><pre><code class="language-kotlin">   onCreated()
        val btns = listOf(
            NavIntent(&quot;打电话&quot;,&quot;&quot;){
                val intent = Intent().apply {
                    action = Intent.ACTION_DIAL
                    data = Uri.parse(&quot;tel:18856967709&quot;)
                }
                startActivity(intent)
            },
            NavIntent(&quot;share&quot;, &quot;des&quot;) {
            val sendIntent: Intent = Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, &quot;This is my text to send.&quot;)
                type = &quot;text/plain&quot;
            }

            val shareIntent = Intent.createChooser(sendIntent, null)
            startActivity(shareIntent)
        }, NavIntent(&quot;分享富文本&quot;, &quot;&quot;) {
            val contentUri = &quot;hhttt&quot;
            val share = Intent.createChooser(Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, &quot;https://developer.android.com/training/sharing/&quot;)

                // (Optional) Here you&#39;re setting the title of the content
                putExtra(Intent.EXTRA_TITLE, &quot;Introducing content previews&quot;)

                // (Optional) Here you&#39;re passing a content URI to an image to be displayed
                data = Uri.parse(contentUri)
                flags = Intent.FLAG_GRANT_READ_URI_PERMISSION
            }, null)
            startActivity(share)
        },
        NavIntent(&quot;get share appas&quot;,&quot;&quot;){
          val apps=  FileUtil.getShareApps(requireContext())
            apps.forEach {
                XLog.enableBorder().d(it)
            }
        })
        btns.forEachIndexed { index, i -&gt;
            val btn = Button(requireContext())
            btn.apply {
                text = i.title
                isAllCaps = false
                id=View.generateViewId()
            }
            btn.setOnClickListener { i.evt() }
            activityIntentBinding.intentBtnGroup.addView(btn,index)
            activityIntentBinding.intentFlow.addView(btn)
        }

</code></pre>`,64),r=[i];function s(l,d){return t(),e("div",null,r)}const p=n(o,[["render",s],["__file","snippets.html.vue"]]),c=JSON.parse('{"path":"/android-tips/snippets.html","title":"代码片段","lang":"zh-CN","frontmatter":{"description":"代码片段 安卓代码片段 获取navhost 标签使用androidx.fragment.app.FragmentContainerView会闪退,因为oncreated生命周期还未初始化 下面的代码可以解决 android文档原文->链接 fragment实例添加argument fragment添加menu 如何获取Android设备唯一ID？ 问题...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"代码片段"}],["meta",{"property":"og:description","content":"代码片段 安卓代码片段 获取navhost 标签使用androidx.fragment.app.FragmentContainerView会闪退,因为oncreated生命周期还未初始化 下面的代码可以解决 android文档原文->链接 fragment实例添加argument fragment添加menu 如何获取Android设备唯一ID？ 问题..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"代码片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"获取navhost","slug":"获取navhost","link":"#获取navhost","children":[]},{"level":2,"title":"fragment实例添加argument","slug":"fragment实例添加argument","link":"#fragment实例添加argument","children":[]},{"level":2,"title":"fragment添加menu","slug":"fragment添加menu","link":"#fragment添加menu","children":[{"level":3,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":3,"title":"回答1（最佳）","slug":"回答1-最佳","link":"#回答1-最佳","children":[]},{"level":3,"title":"回答2","slug":"回答2","link":"#回答2","children":[]},{"level":3,"title":"回答3（需要有电话卡）","slug":"回答3-需要有电话卡","link":"#回答3-需要有电话卡","children":[]}]},{"level":2,"title":"activity显示返回按钮","slug":"activity显示返回按钮","link":"#activity显示返回按钮","children":[]},{"level":2,"title":"显示返回键","slug":"显示返回键","link":"#显示返回键","children":[]},{"level":2,"title":"kotlin用法","slug":"kotlin用法","link":"#kotlin用法","children":[{"level":3,"title":"接口实现","slug":"接口实现","link":"#接口实现","children":[]}]},{"level":2,"title":"使用代码实现view布局","slug":"使用代码实现view布局","link":"#使用代码实现view布局","children":[]},{"level":2,"title":"compose实现下边框","slug":"compose实现下边框","link":"#compose实现下边框","children":[]},{"level":2,"title":"动态添加组件","slug":"动态添加组件","link":"#动态添加组件","children":[{"level":3,"title":"flowlayout","slug":"flowlayout","link":"#flowlayout","children":[]}]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.2,"words":1560},"filePathRelative":"android-tips/snippets.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,c as data};
