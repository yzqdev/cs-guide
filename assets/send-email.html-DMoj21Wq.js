import{_ as t,c as n,o as e,d as o}from"./app-CbULZrmi.js";const a={},i=o(`<h1 id="发送电子邮件" tabindex="-1"><a class="header-anchor" href="#发送电子邮件"><span>发送电子邮件</span></a></h1><p>电子邮件是通过电子方式从一个系统用户通过网络分发给一个或多个收件人的消息。</p><p>在开始电子邮件活动之前，您必须了解具有意图的电子邮件功能，意图是将数据从一个组件携带到应用程序内或应用程序外部。要从您的应用程序发送电子邮件，您无需从一开始就实现电子邮件客户端，但是您可以使用现有的电子邮件客户端，例如Android，Gmail，Outlook，K-9Mail等提供的默认电子邮件应用程序。为此为此，我们需要编写一个活动，以使用具有正确操作和数据的隐式Intent启动电子邮件客户端。在此示例中，我们将使用启动现有电子邮件客户端的Intent对象从应用程序发送电子邮件。</p><p>下一节说明了发送电子邮件所需的Intent对象的不同部分。</p><h2 id="indent-对象-发送电子邮件的数据-类型" tabindex="-1"><a class="header-anchor" href="#indent-对象-发送电子邮件的数据-类型"><span>Indent 对象-发送电子邮件的数据/类型</span></a></h2><p>要发送电子邮件，您需要使用setData()方法将mailto：指定为URI，并且使用setType()方法将数据类型转换为text/plain，如下所示-</p><pre><code class="language-java">  emailIntent.setData(Uri.parse(&quot;mailto:&quot;));
  emailIntent.setType(&quot;text/plain&quot;);
</code></pre><h2 id="indent-对象-发送电子邮件的动作-action-send" tabindex="-1"><a class="header-anchor" href="#indent-对象-发送电子邮件的动作-action-send"><span>Indent 对象-发送电子邮件的动作 ACTION_SEND</span></a></h2><p>您将使用<strong>ACTION_SEND</strong>操作启动安装在Android设备上的电子邮件客户端。以下是使用ACTION_SEND操作创建意图的简单语法。</p><pre><code class="language-java">  Intent emailIntent = new Intent(Intent.ACTION_SEND);
</code></pre><h2 id="indent-对象-附加额外数据电子邮件到意图发送" tabindex="-1"><a class="header-anchor" href="#indent-对象-附加额外数据电子邮件到意图发送"><span>Indent 对象-附加额外数据电子邮件到意图发送</span></a></h2><p>Android内置支持添加TO，SUBJECT，CC，TEXT等字段，这些字段可以在将意图发送到目标电子邮件客户端之前附加到该意图。您可以在电子邮件中使用以下额外字段-</p><table><thead><tr><th>额外数据</th><th>说明</th></tr></thead><tbody><tr><td><strong>EXTRA_BCC</strong></td><td>包含电子邮件地址的String[]，该地址应为密件抄写。</td></tr><tr><td><strong>EXTRA_CC</strong></td><td>一个String[]，其中包含应复印的电子邮件地址。</td></tr><tr><td><strong>EXTRA_EMAIL</strong></td><td>一个String[]，用于保存应该发送到的电子邮件地址。</td></tr><tr><td><strong>EXTRA_HTML_TEXT</strong></td><td>与Intent关联的常量String，与ACTION_SEND一起使用，以提供EXTRA_TEXT的替代形式，作为HTML格式的文本。</td></tr><tr><td><strong>EXTRA_SUBJECT</strong></td><td>一个常量字符串，包含消息的所需主题行。</td></tr><tr><td><strong>EXTRA_TEXT</strong></td><td>与Intent关联的常量CharSequence，与ACTION_SEND一起使用以提供要发送的文字数据。</td></tr><tr><td><strong>EXTRA_TITLE</strong></td><td>与ACTION_CHOOSER一起使用时提供给用户的CharSequence对话框标题。</td></tr></tbody></table><p>这是一个示例，向您展示如何为意图分配额外的数据-</p><pre><code class="language-java">  emailIntent.putExtra(Intent.EXTRA_EMAIL  , new String[]{&quot;Recipient&quot;});
  emailIntent.putExtra(Intent.EXTRA_SUBJECT, &quot;subject&quot;);
  emailIntent.putExtra(Intent.EXTRA_TEXT   , &quot;Message Body&quot;);
</code></pre><p>上面代码的输出类似如下图所示</p><p><img src="https://www.jc2182.com/images/android/email1.jpg" alt=""></p><h2 id="发送电子邮件示例" tabindex="-1"><a class="header-anchor" href="#发送电子邮件示例"><span>发送电子邮件示例</span></a></h2><p>下面的示例实际向您展示了如何使用Intent对象启动Email客户端以将电子邮件发送给给定的收件人。</p><blockquote><p>要通过电子邮件发送该示例的实验，您将需要配备最新Android OS的实际移动设备（真机），否则可能会遇到无法正常运行的模拟器的困扰。其次，您需要在设备上安装一个电子邮件客户端，例如GMail（默认情况下，每个Android版本具有Gmail客户端应用）或K9mail。</p></blockquote><ol><li>您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。</li><li>修改src/MainActivity.java文件并添加所需的代码以发送电子邮件。</li><li>修改布局XML文件res/layout/activity_main.xml可添加任何GUI组件。我添加了一个简单的按钮来启动电子邮件客户端。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
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

 
      Button startBtn = (Button) findViewById(R.id.sendEmail);
      startBtn.setOnClickListener(new View.OnClickListener() {
          public void onClick(View view) {
              sendEmail();
          }
      });
  }

  protected void sendEmail() {
      Log.i(&quot;发送邮件&quot;, &quot;&quot;);
      String[] TO = {&quot;&quot;};
      String[] CC = {&quot;&quot;};
      Intent emailIntent = new Intent(Intent.ACTION_SEND);

      emailIntent.setData(Uri.parse(&quot;mailto:&quot;));
      emailIntent.setType(&quot;text/plain&quot;);
      emailIntent.putExtra(Intent.EXTRA_EMAIL, TO);
      emailIntent.putExtra(Intent.EXTRA_CC, CC);
      emailIntent.putExtra(Intent.EXTRA_SUBJECT, &quot;您的标题&quot;);
      emailIntent.putExtra(Intent.EXTRA_TEXT, &quot;这里是邮件消息&quot;);

      try {
          startActivity(Intent.createChooser(emailIntent, &quot;Send mail...&quot;));
          finish();
          Log.i(&quot;邮件发送完成...&quot;, &quot;&quot;);
      } catch (android.content.ActivityNotFoundException ex) {
          Toast.makeText(MainActivity.this, &quot;没有安装电子邮件客户端。&quot;, Toast.LENGTH_SHORT).show();
      }
  }
 

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;fill_parent&quot;
    android:layout_height=&quot;fill_parent&quot;
    android:orientation=&quot;vertical&quot; &gt;

    &lt;TextView
        android:id=&quot;@+id/textView1&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;发送邮件示例&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff87ff09&quot;
        android:textSize=&quot;30dp&quot;
        android:layout_above=&quot;@+id/imageButton&quot;
        android:layout_alignRight=&quot;@+id/imageButton&quot;
        android:layout_alignEnd=&quot;@+id/imageButton&quot; /&gt;

    &lt;ImageButton
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageButton&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/sendEmail&quot;
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;撰写电子邮件&quot;/&gt;

&lt;/LinearLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/email2.png" alt=""></p><p>点击“撰写电子邮件”按钮</p><p><img src="https://www.jc2182.com/images/android/email3.png" alt=""></p><p>选择“Gmail”电子邮件客户端，出现如下界面</p>`,30),d=[i];function r(l,u){return e(),n("div",null,d)}const c=t(a,[["render",r],["__file","send-email.html.vue"]]),s=JSON.parse('{"path":"/android-tutor/advanced/send-email.html","title":"发送电子邮件","lang":"zh-CN","frontmatter":{"description":"发送电子邮件 电子邮件是通过电子方式从一个系统用户通过网络分发给一个或多个收件人的消息。 在开始电子邮件活动之前，您必须了解具有意图的电子邮件功能，意图是将数据从一个组件携带到应用程序内或应用程序外部。要从您的应用程序发送电子邮件，您无需从一开始就实现电子邮件客户端，但是您可以使用现有的电子邮件客户端，例如Android，Gmail，Outlook，K...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/send-email.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"发送电子邮件"}],["meta",{"property":"og:description","content":"发送电子邮件 电子邮件是通过电子方式从一个系统用户通过网络分发给一个或多个收件人的消息。 在开始电子邮件活动之前，您必须了解具有意图的电子邮件功能，意图是将数据从一个组件携带到应用程序内或应用程序外部。要从您的应用程序发送电子邮件，您无需从一开始就实现电子邮件客户端，但是您可以使用现有的电子邮件客户端，例如Android，Gmail，Outlook，K..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/email1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"发送电子邮件\\",\\"image\\":[\\"https://www.jc2182.com/images/android/email1.jpg\\",\\"https://www.jc2182.com/images/android/email2.png\\",\\"https://www.jc2182.com/images/android/email3.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Indent 对象-发送电子邮件的数据/类型","slug":"indent-对象-发送电子邮件的数据-类型","link":"#indent-对象-发送电子邮件的数据-类型","children":[]},{"level":2,"title":"Indent 对象-发送电子邮件的动作 ACTION_SEND","slug":"indent-对象-发送电子邮件的动作-action-send","link":"#indent-对象-发送电子邮件的动作-action-send","children":[]},{"level":2,"title":"Indent 对象-附加额外数据电子邮件到意图发送","slug":"indent-对象-附加额外数据电子邮件到意图发送","link":"#indent-对象-附加额外数据电子邮件到意图发送","children":[]},{"level":2,"title":"发送电子邮件示例","slug":"发送电子邮件示例","link":"#发送电子邮件示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.56,"words":1367},"filePathRelative":"android-tutor/advanced/send-email.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,s as data};
