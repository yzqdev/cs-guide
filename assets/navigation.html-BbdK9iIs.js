import{_ as t,c as n,o,d as e}from"./app-CbULZrmi.js";const a={},i=e(`<h1 id="导航" tabindex="-1"><a class="header-anchor" href="#导航"><span>导航</span></a></h1><p>在本章中，我们将看到如何在应用程序之间进行向前和向后导航。我们将首先研究如何在应用程序中提供导航。</p><p>向上导航将使我们的应用程序可以从下一个活动移至上一个活动。可以这样做。要实现向上导航，第一步是声明哪个活动是每个活动的适当父项。您可以通过在活动中指定<strong>parentActivityName</strong>属性来实现。其语法如下-</p><pre><code class="language-xml">  android:parentActivityName = &quot;com.example.test.MainActivity&quot; 
</code></pre><p>之后，您需要在活动的onCreate方法中调用getActionBar()的<strong>setDisplayHomeAsUpEnabled</strong>方法。这将启用顶部操作栏中的后退按钮。</p><pre><code class="language-java">  getActionBar().setDisplayHomeAsUpEnabled(true);
</code></pre><p>您需要做的最后一件事是重写<strong>onOptionsItemSelected</strong>方法。当用户按下它时，您的活动将收到对**onOptionsItemSelected()**的调用。该操作的ID为android.R.id.home，其语法如下-</p><pre><code class="language-java">  public boolean onOptionsItemSelected(MenuItem item) {
  
     switch (item.getItemId()) {
        case android.R.id.home:
        NavUtils.navigateUpFromSameTask(this);
        return true;
     }    
  }
</code></pre><h2 id="处理设备后退按钮" tabindex="-1"><a class="header-anchor" href="#处理设备后退按钮"><span>处理设备后退按钮</span></a></h2><p>由于已启用后退按钮在应用程序中导航，因此您可能希望将应用程序关闭功能置于设备的后退按钮中。</p><p>可以通过重写<strong>onBackPressed</strong>，然后调用moveTaskToBack和finish方法来完成。其语法如下-</p><pre><code class="language-java">  @Override
  public void onBackPressed() {
     moveTaskToBack(true); 
     MainActivity2.this.finish();
  }
</code></pre><p>除了此<strong>setDisplayHomeAsUpEnabled</strong>方法之外，ActionBar API类中还提供了其他方法。它们在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>addTab(ActionBar.Tab tab, boolean setSelected)</strong></td><td>此方法添加一个选项卡以用于选项卡式导航模式</td></tr><tr><td><strong>getSelectedTab()</strong></td><td>如果处于选项卡式导航模式并且存在至少一个选项卡，则此方法返回当前选择的选项卡</td></tr><tr><td><strong>hide()</strong></td><td>如果当前正在显示，则此方法隐藏ActionBar</td></tr><tr><td><strong>removeAllTabs()</strong></td><td>此方法从操作栏中删除所有标签，然后取消选择当前标签</td></tr><tr><td><strong>selectTab(ActionBar.Tab tab)</strong></td><td>此方法选择指定的选项卡</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>下面的示例演示了导航的用法。它创建了一个基本应用程序，使您可以在应用程序中导航。要试验该示例，您需要在实际设备或仿真器上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加活动代码。</li><li>创建一个名为SecondMain.java的新活动，并对其进行编辑以添加活动代码。</li><li>修改布局XML文件res/layout/activity_main.xml如果需要，可添加任何GUI组件。</li><li>修改布局XML文件res/layout/activity_main_activity2.xml（如果需要）添加任何GUI组件。</li><li>修改AndroidManifest.xml以添加必要的代码。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Intent;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  

  public class MainActivity extends Activity {

      Button b1;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1 = (Button) findViewById(R.id.button);
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  Intent in=new Intent(MainActivity.this,SecondMain.class);
                  startActivity(in);
              }
          });
      }

  }

</code></pre><p>这是src/SecondMain.java的内容。</p><pre><code class="language-java">
package com.jc2182.demo;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class SecondMain extends Activity{

    WebView wv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_activity2);

        wv = (WebView) findViewById(R.id.webView);
        wv.setWebViewClient(new MyBrowser());
        wv.getSettings().setLoadsImagesAutomatically(true);
        wv.getSettings().setJavaScriptEnabled(true);
        wv.loadUrl(&quot;https://www.jc2182.com&quot;);
    }

    private class MyBrowser extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
    }
}
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;
    android:transitionGroup=&quot;true&quot;&gt;

    &lt;TextView android:text=&quot;导航示例&quot; android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textview&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView&quot;
        android:layout_width=&quot;273dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;7dp&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:background=&quot;#550000&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:theme=&quot;@style/Base.TextAppearance.AppCompat&quot; /&gt;

    &lt;Button
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;第一个页面&quot;
        android:id=&quot;@+id/button&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignRight=&quot;@+id/textView&quot;
        android:layout_alignEnd=&quot;@+id/textView&quot;
        android:layout_marginTop=&quot;61dp&quot;
        android:layout_alignLeft=&quot;@+id/imageView&quot;
        android:layout_alignStart=&quot;@+id/imageView&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是res/layout/activity_main_activity2.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:orientation=&quot;vertical&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:weightSum=&quot;1&quot;&gt;

    &lt;WebView
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/webView&quot;
        android:layout_gravity=&quot;center_horizontal&quot;
        android:layout_weight=&quot;1.03&quot; /&gt;

&lt;/LinearLayout&gt;
</code></pre><p>以下是AndroidManifest.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.demo&quot;&gt;
    &lt;uses-permission android:name=&quot;android.permission.INTERNET&quot;&gt;&lt;/uses-permission&gt;
    &lt;uses-permission android:name=&quot;android.permission.ACCESS_NETWORK_STATE&quot;&gt;&lt;/uses-permission&gt;
    &lt;application
        android:allowBackup=&quot;true&quot;
        android:icon=&quot;@mipmap/ic_launcher&quot;
        android:label=&quot;@string/app_name&quot;
        android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
        android:usesCleartextTraffic=&quot;true&quot;
        android:supportsRtl=&quot;true&quot;
        android:theme=&quot;@style/AppTheme&quot;&gt;
        &lt;activity android:name=&quot;.MainActivity&quot;&gt;
            &lt;intent-filter&gt;
                &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;

                &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

        &lt;activity android:name=&quot;.SecondMain&quot;&gt;&lt;/activity&gt;

    &lt;/application&gt;

&lt;/manifest&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/nav1.png" alt=""></p><p>点击按钮，将出现下面的内容，我们蝴蝶教程的主页。</p><p><img src="https://www.jc2182.com/images/android/nav2.png" alt=""></p>`,31),d=[i];function r(u,l){return o(),n("div",null,d)}const s=t(a,[["render",r],["__file","navigation.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/navigation.html","title":"导航","lang":"zh-CN","frontmatter":{"description":"导航 在本章中，我们将看到如何在应用程序之间进行向前和向后导航。我们将首先研究如何在应用程序中提供导航。 向上导航将使我们的应用程序可以从下一个活动移至上一个活动。可以这样做。要实现向上导航，第一步是声明哪个活动是每个活动的适当父项。您可以通过在活动中指定parentActivityName属性来实现。其语法如下- 之后，您需要在活动的onCreate...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/navigation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"导航"}],["meta",{"property":"og:description","content":"导航 在本章中，我们将看到如何在应用程序之间进行向前和向后导航。我们将首先研究如何在应用程序中提供导航。 向上导航将使我们的应用程序可以从下一个活动移至上一个活动。可以这样做。要实现向上导航，第一步是声明哪个活动是每个活动的适当父项。您可以通过在活动中指定parentActivityName属性来实现。其语法如下- 之后，您需要在活动的onCreate..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/nav1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"导航\\",\\"image\\":[\\"https://www.jc2182.com/images/android/nav1.png\\",\\"https://www.jc2182.com/images/android/nav2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"处理设备后退按钮","slug":"处理设备后退按钮","link":"#处理设备后退按钮","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.23,"words":1270},"filePathRelative":"android-tutor/advanced/navigation.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,p as data};
