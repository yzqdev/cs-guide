import{_ as t,c as n,o as e,d as o}from"./app-CbULZrmi.js";const i={},a=o(`<h1 id="拨打电话" tabindex="-1"><a class="header-anchor" href="#拨打电话"><span>拨打电话</span></a></h1><p>Android提供了内置的电话应用程序，在某些情况下，我们可能需要通过我们的应用程序拨打电话。通过将隐式Intent与适当的操作配合使用，可以轻松完成此操作。另外，我们可以使用<strong>PhoneStateListener</strong>和<strong>TelephonyManager</strong>类，以监视设备上某些电话状态的变化。本章列出了创建可用于拨打电话的应用程序的所有简单步骤。您可以通过调用Android的内置“电话呼叫”功能来使用Android Intent拨打电话。以下部分说明了进行调用所需的Intent对象的不同部分。</p><p><strong>意图对象-拨打电话的动作</strong></p><p>您将使用<strong>ACTION_CALL</strong>操作来触发Android设备中可用的内置电话功能。以下是使用<strong>ACTION_CALL</strong>动作创建意图的简单语法</p><pre><code class="language-java">  Intent phoneIntent = new Intent(Intent.ACTION_CALL);
</code></pre><p>您可以使用<strong>ACTION_DIAL</strong>动作，在这种情况下，您可以选择在拨打电话之前修改硬编码的电话号码，而不是直接拨打电话。</p><p><strong>意图对象-拨打电话的数据/类型</strong></p><p>要拨打给定号码91-000-000-0000的电话，您需要使用setData()方法将tel：指定为URI，如下所示-</p><pre><code class="language-java">  phoneIntent.setData(Uri.parse(&quot;tel:91-000-000-0000&quot;));
</code></pre><p>有趣的一点是，要拨打电话，您无需指定任何其他数据或数据类型。</p><h2 id="拨打电话示例" tabindex="-1"><a class="header-anchor" href="#拨打电话示例"><span>拨打电话示例</span></a></h2><p>以下示例向您实际展示了如何使用Android Intent拨打给定手机号码的电话。</p><blockquote><p>要尝试此示例，您将需要配备最新Android OS的实际移动设备，否则，您将不得不使用可能无法工作的仿真器。</p></blockquote><ol><li>您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。</li><li>修改src/MainActivity.java文件并添加所需的代码以进行调用。</li><li>修改布局XML文件res/layout/activity_main.xml可添加任何GUI组件。我在电话号码91-000-000-0000中添加了一个简单的按钮</li><li>如下所示修改 AndroidManifest.xml,以获得拨打电话的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.Manifest;
  import android.app.Activity;
  import android.content.Intent;
  import android.content.pm.PackageManager;
  import android.net.Uri;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  
  import androidx.core.app.ActivityCompat;
  
  

public class MainActivity extends Activity {
 private Button button;

  public static final int REQUEST_CALL_NUM = 10111; //拨号请求码
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      button = (Button) findViewById(R.id.buttonCall);

      button.setOnClickListener(new View.OnClickListener() {
          public void onClick(View arg0) {
              call(Manifest.permission.CALL_PHONE);
          }
      });



  }

  private void call(String string_permission){
      Intent callIntent = new Intent(Intent.ACTION_CALL);
      callIntent.setData(Uri.parse(&quot;tel:&quot; + REQUEST_CALL_NUM));

      if (ActivityCompat.checkSelfPermission(MainActivity.this,Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
          // 安卓6.0 需要动态授权
          ActivityCompat.requestPermissions(this, new String[]{string_permission},REQUEST_CALL_NUM);
      }
      startActivity(callIntent);
  }


}
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;fill_parent&quot;
    android:layout_height=&quot;fill_parent&quot;
    android:orientation=&quot;vertical&quot; &gt;

    &lt;Button
        android:id=&quot;@+id/buttonCall&quot;
        android:layout_width=&quot;159dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;呼叫&quot; /&gt;

&lt;/LinearLayout&gt;
</code></pre><p>以下是AndroidManifest.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.demo&quot;&gt;
    &lt;uses-permission android:name=&quot;android.permission.CALL_PHONE&quot; /&gt;
    &lt;application
        android:allowBackup=&quot;true&quot;
        android:icon=&quot;@mipmap/ic_launcher&quot;
        android:label=&quot;@string/app_name&quot;
        android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
        android:supportsRtl=&quot;true&quot;
        android:theme=&quot;@style/AppTheme&quot;&gt;
        &lt;activity android:name=&quot;.MainActivity&quot;&gt;
            &lt;intent-filter&gt;
                &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;

                &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

    &lt;/application&gt;

&lt;/manifest&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/call1.png" alt=""></p><p>现在使用按钮拨打电话，如下所示，选择&#39;ALLOW&#39;进行动态的授权，回到DEMO的界面，重新点击按钮拨打电话：</p>`,23),r=[a];function d(l,p){return e(),n("div",null,r)}const s=t(i,[["render",d],["__file","phone-call.html.vue"]]),u=JSON.parse('{"path":"/android-tutor/advanced/phone-call.html","title":"拨打电话","lang":"zh-CN","frontmatter":{"description":"拨打电话 Android提供了内置的电话应用程序，在某些情况下，我们可能需要通过我们的应用程序拨打电话。通过将隐式Intent与适当的操作配合使用，可以轻松完成此操作。另外，我们可以使用PhoneStateListener和TelephonyManager类，以监视设备上某些电话状态的变化。本章列出了创建可用于拨打电话的应用程序的所有简单步骤。您可以通...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/phone-call.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"拨打电话"}],["meta",{"property":"og:description","content":"拨打电话 Android提供了内置的电话应用程序，在某些情况下，我们可能需要通过我们的应用程序拨打电话。通过将隐式Intent与适当的操作配合使用，可以轻松完成此操作。另外，我们可以使用PhoneStateListener和TelephonyManager类，以监视设备上某些电话状态的变化。本章列出了创建可用于拨打电话的应用程序的所有简单步骤。您可以通..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/call1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"拨打电话\\",\\"image\\":[\\"https://www.jc2182.com/images/android/call1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"拨打电话示例","slug":"拨打电话示例","link":"#拨打电话示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.22,"words":966},"filePathRelative":"android-tutor/advanced/phone-call.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,u as data};
