import{_ as t,c as n,o as e,d as o}from"./app-CbULZrmi.js";const i={},r=o(`<h1 id="会话管理" tabindex="-1"><a class="header-anchor" href="#会话管理"><span>会话管理</span></a></h1><p>当希望在应用程序外部存储用户数据时，Session可以帮助您，以便下次用户下次使用您的应用程序时，您可以轻松地获取其详细信息并相应地执行操作。这可以通过许多方式来完成。但是，最简单，最好的方法是通过“SharedPreferences”。</p><h2 id="sharedpreferences" tabindex="-1"><a class="header-anchor" href="#sharedpreferences"><span>SharedPreferences</span></a></h2><p><strong>SharedPreferences</strong>允许您以键，值对的形式保存和检索数据。为了使用共享首选项，您必须调用方法<strong>getSharedPreferences()</strong>，该方法返回一个<strong>SharedPreference</strong>实例，该实例指向包含首选项值的文件。</p><pre><code class="language-java">  SharedPreferences sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);        
</code></pre><p>您可以使用<strong>SharedPreferences.Editor</strong>类将某些内容保存在<strong>sharedpreferences</strong>中。您将调用<strong>SharedPreference</strong>实例的<strong>edit</strong>方法，并将其在Editor对象中接收。它的语法是-</p><pre><code class="language-java">  Editor editor = sharedpreferences.edit();
  editor.putString(&quot;key&quot;, &quot;value&quot;);
  editor.apply();
</code></pre><p>除了<strong>putString</strong>方法外，编辑器类中还有一些可用的方法，这些方法允许在共享首选项内操作数据。它们列出如下-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>apply()</strong></td><td>这是一种抽象方法。 它将您的更改从编辑器提交回您要调用的sharedPreference对象</td></tr><tr><td><strong>clear()</strong></td><td>它将从编辑器中删除所有值</td></tr><tr><td><strong>remove(String key)</strong></td><td>它将删除其键已作为参数传递的值</td></tr><tr><td><strong>putLong(String key, long value)</strong></td><td>它将在首选项编辑器中保存一个长值</td></tr><tr><td><strong>putInt(String key, int value)</strong></td><td>它将在首选项编辑器中保存一个整数值</td></tr><tr><td><strong>putFloat(String key, float value)</strong></td><td>它将浮点值保存在首选项编辑器</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>为了从共享首选项执行会话管理，我们需要检查<strong>onResume</strong>方法中共享首选项中存储的值或数据。如果没有数据，则将从新安装的应用程序开始重新启动。但是，如果我们得到了数据，我们将从用户离开的地方开始。在下面的示例中进行了演示-</p><p>下面的示例演示了会话管理的用法。它创建一个基本的应用程序，使您可以首次登录。然后，当您退出应用程序而未注销时，如果再次启动该应用程序，您将被带回到同一位置。但是，如果您从应用程序注销，则将返回到主登录屏幕。要试验该示例，您需要在实际设备或仿真器上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加进度代码以添加会话代码。</li><li>创建新的Activity，并将其名称命名为SecondMain.java。编辑此文件以添加进度代码以添加会话代码。</li><li>编辑res/layout/activity_main.xml文件以添加相应的XML代码。</li><li>编辑res/layout/second_main.xml文件以添加相应的XML代码。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Context;
  import android.content.Intent;
  import android.content.SharedPreferences;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;

  public class MainActivity extends Activity {
      EditText ed1,ed2,ed3;
      Button b1;
      Intent in;

      public static final String MyPREFERENCES = &quot;MyPrefs&quot; ;
      public static final String Name = &quot;nameKey&quot;;
      public static final String Phone = &quot;phoneKey&quot;;
      public static final String Email = &quot;emailKey&quot;;
      SharedPreferences sharedpreferences;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          ed1=(EditText)findViewById(R.id.editText);
          ed2=(EditText)findViewById(R.id.editText2);
          ed3=(EditText)findViewById(R.id.editText3);
    
          b1=(Button)findViewById(R.id.button);
          sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  String n  = ed1.getText().toString();
                  String ph  = ed2.getText().toString();
                  String e  = ed3.getText().toString();
    
                  SharedPreferences.Editor editor = sharedpreferences.edit();
    
                  editor.putString(Name, n);
                  editor.putString(Phone, ph);
                  editor.putString(Email, e);
                  editor.apply();
    
                  in = new Intent(MainActivity.this,SecondMain.class);
                  startActivity(in);
              }
          });
      }

  }

</code></pre><p>以下是修改后的主要活动文件src/com.jc2182.demo/SecondMain.java的内容。</p><pre><code class="language-java">
package com.jc2182.demo;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class SecondMain extends Activity {
    Button bu=null;
    Button bu2=null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second_main);

        bu=(Button)findViewById(R.id.button2);
        bu2=(Button)findViewById(R.id.button3);
    }

    public  void logout(View view){
        SharedPreferences sharedpreferences = getSharedPreferences(MainActivity.MyPREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.clear();
        editor.apply();
    }

    public void close(View view){
        finish();
    }
}
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;SharedPreference(共享首选项)&quot;
        android:id=&quot;@+id/textView&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView2&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;35dp&quot;
        android:textColor=&quot;#ff16ff01&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_marginTop=&quot;67dp&quot;
        android:hint=&quot;用户名&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText2&quot;
        android:layout_below=&quot;@+id/editText&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:hint=&quot;密码&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText3&quot;
        android:layout_below=&quot;@+id/editText2&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:hint=&quot;邮箱&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;80dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/editText3&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;50dp&quot;
        android:text=&quot;登录&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是res/layout/second_main.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:orientation=&quot;vertical&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;134dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_gravity=&quot;center_horizontal&quot;
        android:layout_marginTop=&quot;262dp&quot;
        android:onClick=&quot;logout&quot;
        android:text=&quot;注销&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button3&quot;
        android:layout_width=&quot;124dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button2&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;69dp&quot;
        android:onClick=&quot;close&quot;
        android:text=&quot;关闭&quot; /&gt;

&lt;/RelativeLayout&gt;
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
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/session1.png" alt=""></p><p>输入用户名，密码，邮箱登录</p><p><img src="https://www.jc2182.com/images/android/session2.png" alt=""></p><p>点击关闭回到第一个登录页面会话数据存储在安卓系统中，登录界面会把第一次输入的当着首选项来填入表单，想要用Android Studio 查看系统文件，可以遵循如下步骤。（如果点击注销会把刚刚提交的会话数据清除掉）</p><p><img src="https://www.jc2182.com/images/android/session3.png" alt=""></p>`,29),d=[r];function a(u,s){return e(),n("div",null,d)}const c=t(i,[["render",a],["__file","session.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/session.html","title":"会话管理","lang":"zh-CN","frontmatter":{"description":"会话管理 当希望在应用程序外部存储用户数据时，Session可以帮助您，以便下次用户下次使用您的应用程序时，您可以轻松地获取其详细信息并相应地执行操作。这可以通过许多方式来完成。但是，最简单，最好的方法是通过“SharedPreferences”。 SharedPreferences SharedPreferences允许您以键，值对的形式保存和检索数...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/session.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"会话管理"}],["meta",{"property":"og:description","content":"会话管理 当希望在应用程序外部存储用户数据时，Session可以帮助您，以便下次用户下次使用您的应用程序时，您可以轻松地获取其详细信息并相应地执行操作。这可以通过许多方式来完成。但是，最简单，最好的方法是通过“SharedPreferences”。 SharedPreferences SharedPreferences允许您以键，值对的形式保存和检索数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/session1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"会话管理\\",\\"image\\":[\\"https://www.jc2182.com/images/android/session1.png\\",\\"https://www.jc2182.com/images/android/session2.png\\",\\"https://www.jc2182.com/images/android/session3.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"SharedPreferences","slug":"sharedpreferences","link":"#sharedpreferences","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.29,"words":1587},"filePathRelative":"android-tutor/advanced/session.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,p as data};
