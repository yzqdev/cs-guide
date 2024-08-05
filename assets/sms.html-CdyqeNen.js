import{_ as t,c as n,o,d as e}from"./app-CbULZrmi.js";const i={},a=e(`<h1 id="发送短信" tabindex="-1"><a class="header-anchor" href="#发送短信"><span>发送短信</span></a></h1><p>在Android中，您可以使用SmsManager API或设备内置的SMS应用程序来发送SMS。在本教程中，我们向您展示了两个发送SMS消息的基本示例-</p><p><strong>SmsManager API</strong></p><pre><code class="language-java">  SmsManager smsManager = SmsManager.getDefault();
  smsManager.sendTextMessage(&quot;phoneNo&quot;, null, &quot;sms message&quot;, null, null);
</code></pre><p><em>内置短信应用</em></p><pre><code class="language-java">  Intent sendIntent = new Intent(Intent.ACTION_VIEW);
  sendIntent.putExtra(&quot;短信体&quot;, &quot;默认内容&quot;); 
  sendIntent.setType(&quot;vnd.android-dir/mms-sms&quot;);
  startActivity(sendIntent);
</code></pre><p>当然，两者都需要<strong>SEND_SMS</strong>权限。</p><pre><code class="language-xml">  &lt;uses-permission android:name=&quot;android.permission.SEND_SMS&quot; /&gt;
</code></pre><p>除了上述方法外，SmsManager类中还有一些其他重要函数可用。这些方法在下面列出-</p><table><thead><tr><th>函数</th><th>说明</th></tr></thead><tbody><tr><td><strong><code>ArrayList &lt;String&gt; divideMessage(String text)</code></strong></td><td>此方法将消息文本分为几个片段，最大不超过最大<b><strong>SMS</strong></b>消息大小。</td></tr><tr><td><strong>static SmsManager getDefault()</strong></td><td>此方法用于获取SmsManager的默认实例</td></tr><tr><td><strong>void sendDataMessage(String destinationAddress, String scAddress, short destinationPort, byte[] data, PendingIntent sentIntent, PendingIntent deliveryIntent)</strong></td><td>此方法用于将基于数据的SMS发送到特定的应用程序端口。</td></tr><tr><td><strong>void sendMultipartTextMessage(String destinationAddress, String scAddress, ArrayList<code>&lt;String&gt;</code> parts, ArrayList<code>&lt;PendingIntent&gt;</code> sentIntents, ArrayList<code>&lt;PendingIntent&gt;</code> deliveryIntents)</strong></td><td>发送基于文本的多部分短信。</td></tr><tr><td><strong>void sendTextMessage(String destinationAddress, String scAddress, String text, PendingIntent sentIntent, PendingIntent deliveryIntent)</strong></td><td>发送基于文本的SMS。</td></tr></tbody></table><h2 id="发送短信示例" tabindex="-1"><a class="header-anchor" href="#发送短信示例"><span>发送短信示例</span></a></h2><p>以下示例向您实际展示如何使用<strong>SmsManager</strong>对象将SMS发送到给定的手机号码。</p><blockquote><p>要尝试此示例，您将需要配备最新Android OS的实际移动设备，否则，您将不得不使用可能无法工作的仿真器。</p></blockquote><ol><li>您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。</li><li>修改src/MainActivity.java文件并添加所需的代码以发送短信。</li><li>修改布局XML文件res/layout/activity_main.xml可添加任何GUI组件。我添加了一个简单的GUI来接收手机号码和SMS文本，以及一个简单的按钮来发送SMS。</li><li>如下所示修改 AndroidManifest.xml,以获得发送短信的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.Manifest;
  import android.app.Activity;
  import android.content.pm.PackageManager;
  import android.os.Bundle;
  import android.telephony.SmsManager;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.Toast;
  
  import androidx.core.app.ActivityCompat;
  import androidx.core.content.ContextCompat;
   
  

public class MainActivity extends Activity {
 private static final int MY_PERMISSIONS_REQUEST_SEND_SMS =0 ;
 Button sendBtn;
 EditText txtphoneNo;
 EditText txtMessage;
 String phoneNo;
 String message;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      sendBtn = (Button) findViewById(R.id.btnSendSMS);
      txtphoneNo = (EditText) findViewById(R.id.editText);
      txtMessage = (EditText) findViewById(R.id.editText2);

      sendBtn.setOnClickListener(new View.OnClickListener() {
          public void onClick(View view) {
              sendSMSMessage();
          }
      });
  }

  protected void sendSMSMessage() {
      phoneNo = txtphoneNo.getText().toString();
      message = txtMessage.getText().toString();

      if (ContextCompat.checkSelfPermission(this,
              Manifest.permission.SEND_SMS)
              != PackageManager.PERMISSION_GRANTED) {
          if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                  Manifest.permission.SEND_SMS)) {
          } else {
              ActivityCompat.requestPermissions(this,
                      new String[]{Manifest.permission.SEND_SMS},
                      MY_PERMISSIONS_REQUEST_SEND_SMS);
          }
      }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode,String permissions[], int[] grantResults) {
      switch (requestCode) {
          case MY_PERMISSIONS_REQUEST_SEND_SMS: {
              if (grantResults.length &gt; 0
                      &amp;&amp; grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                  SmsManager smsManager = SmsManager.getDefault();
                  smsManager.sendTextMessage(phoneNo, null, message, null, null);
                  Toast.makeText(getApplicationContext(), &quot;SMS sent.&quot;,
                          Toast.LENGTH_LONG).show();
              } else {
                  Toast.makeText(getApplicationContext(),
                          &quot;SMS faild, please try again.&quot;, Toast.LENGTH_LONG).show();
                  return;
              }
          }
      }

  }


}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;MainActivity&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/textView1&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;91dp&quot;
        android:text=&quot;发送短信示例&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;278dp&quot;
        android:layout_height=&quot;53dp&quot;
        android:layout_below=&quot;@+id/textView1&quot;
        android:layout_alignEnd=&quot;@+id/imageButton&quot;
        android:layout_alignRight=&quot;@+id/imageButton&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;10dp&quot;
        android:layout_marginEnd=&quot;37dp&quot;
        android:layout_marginRight=&quot;37dp&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff87ff09&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;ImageButton
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageButton&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;EditText
        android:id=&quot;@+id/editText&quot;
        android:layout_width=&quot;160dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageButton&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:hint=&quot;输入您的电话号码&quot;
        android:phoneNumber=&quot;true&quot;
        android:textColorHint=&quot;@color/abc_primary_text_material_dark&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText2&quot;
        android:layout_below=&quot;@+id/editText&quot;
        android:layout_alignLeft=&quot;@+id/editText&quot;
        android:layout_alignStart=&quot;@+id/editText&quot;
        android:textColorHint=&quot;@color/abc_primary_text_material_dark&quot;
        android:layout_alignRight=&quot;@+id/imageButton&quot;
        android:layout_alignEnd=&quot;@+id/imageButton&quot;
        android:hint=&quot;输入您的短信&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/btnSendSMS&quot;
        android:layout_width=&quot;108dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/editText2&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;48dp&quot;
        android:text=&quot;发送短信&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是AndroidManifest.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.demo&quot;&gt;

    &lt;uses-permission android:name=&quot;android.permission.SEND_SMS&quot; /&gt;

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
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/sms1.png" alt=""></p><p>现在，您可以输入所需的手机号码，并在该号码上发送短信。最后，点击发送短信按钮发送您的短信。确保您的GSM/CDMA连接正常，可以将SMS传送给接收者。您可以用逗号分隔多个SMS，然后在程序内部将它们解析为数组字符串，最后可以使用循环将消息发送给所有给定数字。这样便可以编写自己的SMS客户端。下一节将向您展示如何使用现有的SMS客户端发送SMS。</p><h2 id="使用内置意图发送短信" tabindex="-1"><a class="header-anchor" href="#使用内置意图发送短信"><span>使用内置意图发送短信</span></a></h2><p>您可以通过调用Android的内置SMS功能，使用Android Intent发送SMS。下一节说明了发送SMS所需的Intent对象的不同部分。</p><p><em>意图对象-发送短信的动作</em></p><p>您将使用 ACTION_VIEW 操作启动安装在Android设备上的SMS客户端。以下是使用 ACTION_VIEW 操作创建意图的简单语法。</p><pre><code class="language-java">  Intent smsIntent = new Intent(Intent.ACTION_VIEW);
</code></pre><p><em>意图对象-发送短信的数据/类型</em></p><p>要发送短信，您需要使用setData() 方法将smsto ：指定为URI，并且使用setType() 方法将数据类型设置为vnd.android-dir/mms-sms，如下所示-</p><pre><code class="language-java">  smsIntent.setData(Uri.parse(&quot;smsto:&quot;));
  smsIntent.setType(&quot;vnd.android-dir/mms-sms&quot;);
</code></pre><p><em>意图对象-附加数据发送短信</em></p><p>Android内置支持添加电话号码和短信以发送短信，如下所示：</p><pre><code class="language-java">  smsIntent.putExtra(&quot;address&quot;  , new String(&quot;0123456789;3393993300&quot;));
  smsIntent.putExtra(&quot;sms_body&quot;  , &quot;Test SMS to Angilla&quot;);
</code></pre><blockquote><p>这里的address和sms_body区分大小写，并且只能以小写字母指定。您可以在单个字符串中指定多个数字，但以分号（;）分隔。</p></blockquote><p><em>示例：：：</em></p><p>下面的示例向您实际展示如何使用Intent对象启动SMS客户端，以将SMS发送给给定的收件人。</p><blockquote><p>要尝试此示例，您将需要配备最新Android OS的实际移动设备，否则，您将不得不使用可能无法工作的仿真器。</p></blockquote><ol><li>您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。</li><li>修改src/MainActivity.java文件并添加所需的代码以发送SMS。</li><li>修改布局XML文件res/layout/activity_main.xml可添加任何GUI组件。我添加了一个简单的按钮来启动SMS客户端。</li><li>如下所示修改 AndroidManifest.xml,以获得发送短信的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Intent;
  import android.net.Uri;
  import android.os.Bundle;
  import android.util.Log;
  import android.view.View;
  import android.widget.Button;
  import android.widget.Toast;
  
  

public class MainActivity extends Activity {
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);


      Button startBtn = (Button) findViewById(R.id.button);
      startBtn.setOnClickListener(new View.OnClickListener() {
          public void onClick(View view) {
              sendSMS();
          }
      });
  }

  protected void sendSMS() {
      Log.i(&quot;发送短信&quot;, &quot;&quot;);
      Intent smsIntent = new Intent(Intent.ACTION_VIEW);

      smsIntent.setData(Uri.parse(&quot;smsto:&quot;));
      smsIntent.setType(&quot;vnd.android-dir/mms-sms&quot;);
      smsIntent.putExtra(&quot;address&quot;  , new String (&quot;01234&quot;));
      smsIntent.putExtra(&quot;sms_body&quot;  , &quot;Test &quot;);

      try {
          startActivity(smsIntent);
          finish();
          Log.i(&quot;完成短信发送...&quot;, &quot;&quot;);
      } catch (android.content.ActivityNotFoundException ex) {
          Toast.makeText(MainActivity.this,
                  &quot;SMS faild, please try again later.&quot;, Toast.LENGTH_SHORT).show();
      }
  }


}
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;发送短信示例&quot;
        android:id=&quot;@+id/textView&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程 &quot;
        android:id=&quot;@+id/textView2&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;30dp&quot;
        android:textColor=&quot;#ff14be3c&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_marginTop=&quot;48dp&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:background=&quot;#002233&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;285dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignStart=&quot;@+id/imageView&quot;
        android:layout_alignLeft=&quot;@+id/imageView&quot;
        android:layout_alignRight=&quot;@+id/textView2&quot;
        android:layout_marginStart=&quot;36dp&quot;
        android:layout_marginLeft=&quot;36dp&quot;
        android:layout_marginTop=&quot;6dp&quot;
        android:layout_marginRight=&quot;-70dp&quot;
        android:text=&quot;撰写短信&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是AndroidManifest.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.demo&quot;&gt;

    &lt;uses-permission android:name=&quot;android.permission.SEND_SMS&quot; /&gt;

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
</code></pre><blockquote><p>您可以在真实设备上测试此例！</p></blockquote>`,46),d=[a];function r(u,s){return o(),n("div",null,d)}const q=t(i,[["render",r],["__file","sms.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/sms.html","title":"发送短信","lang":"zh-CN","frontmatter":{"description":"发送短信 在Android中，您可以使用SmsManager API或设备内置的SMS应用程序来发送SMS。在本教程中，我们向您展示了两个发送SMS消息的基本示例- SmsManager API 内置短信应用 当然，两者都需要SEND_SMS权限。 除了上述方法外，SmsManager类中还有一些其他重要函数可用。这些方法在下面列出- 发送短信示例 以...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/sms.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"发送短信"}],["meta",{"property":"og:description","content":"发送短信 在Android中，您可以使用SmsManager API或设备内置的SMS应用程序来发送SMS。在本教程中，我们向您展示了两个发送SMS消息的基本示例- SmsManager API 内置短信应用 当然，两者都需要SEND_SMS权限。 除了上述方法外，SmsManager类中还有一些其他重要函数可用。这些方法在下面列出- 发送短信示例 以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/sms1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"发送短信\\",\\"image\\":[\\"https://www.jc2182.com/images/android/sms1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"发送短信示例","slug":"发送短信示例","link":"#发送短信示例","children":[]},{"level":2,"title":"使用内置意图发送短信","slug":"使用内置意图发送短信","link":"#使用内置意图发送短信","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":7.04,"words":2111},"filePathRelative":"android-tutor/advanced/sms.md","localizedDate":"2023年5月22日","autoDesc":true}');export{q as comp,p as data};
