import{_ as t,c as n,o,d as i}from"./app-CbULZrmi.js";const e={},d=i(`<h1 id="android-indent-意图" tabindex="-1"><a class="header-anchor" href="#android-indent-意图"><span>Android Indent（意图）</span></a></h1><p>Android Intent(意图)是要执行的操作的抽象描述。它可以与startActivity一起使用来启动一个Activity，可以将broadcastIntent发送到任何感兴趣的BroadcastReceiver组件，也可以与**startService（Intent）<strong>或</strong>bindService（Intent，ServiceConnection，int）**一起与后台Service通信。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>意图本身（一个<strong>Indent</strong>对象）是一个被动数据结构，其中包含要执行的操作的抽象描述。</p></div><p>例如，假设您有一个Activity，该Activity需要启动电子邮件客户端并使用Android设备发送电子邮件。为此，您的“Activity”会将ACTION_SEND和相应的选择器一起发送到Android Intent解析器。指定的选择器为用户提供适当的界面，以选择如何发送您的电子邮件数据。</p><pre><code class="language-java">  Intent email = new Intent(Intent.ACTION_SEND, Uri.parse(&quot;mailto:&quot;));
  email.putExtra(Intent.EXTRA_EMAIL, recipients);
  email.putExtra(Intent.EXTRA_SUBJECT, subject.getText().toString());
  email.putExtra(Intent.EXTRA_TEXT, body.getText().toString());
  startActivity(Intent.createChooser(email, &quot;Choose an email client from...&quot;));
</code></pre><p>上面的语法正在调用startActivity方法来启动电子邮件activity，结果应如下所示-</p><p><img src="https://www.jc2182.com/images/android/indent1.jpg" alt="indent"></p><p>例如，假设您有一个Activity，需要在Android设备上的网络浏览器中打开URL。为此，您的“Activity”会将ACTION_WEB_SEARCH Intent发送到Android Intent Resolver，以在网络浏览器中打开给定的URL。Intent解析器将解析一系列活动，然后选择与您的Intent最匹配的Activity（在本例中为Web Browser Activity）。然后，Intent Resolver将您的网页传递到Web浏览器并启动Web浏览器活动。</p><pre><code class="language-java">  String q = &quot;蝴蝶教程&quot;;
  Intent intent = new Intent(Intent.ACTION_WEB_SEARCH );
  intent.putExtra(SearchManager.QUERY, q);
  startActivity(intent);
</code></pre><p>上面的示例将在android搜索引擎上搜索为“蝴蝶教程”，并在您的活动中提供了“蝴蝶教程”的结果</p><p>有向每种类型的组件（活动(Activity)，服务(Service)和广播接收器(Broadcast Receivers)）传递意图（Indent）的单独机制。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>Context.startActivity()</strong></td><td>Intent对象将传递给此方法以启动新活动或获取现有活动以执行新操作。</td></tr><tr><td><strong>Context.startService()</strong></td><td>Intent对象将传递给此方法以启动服务或将新指令传递给正在进行的服务。</td></tr><tr><td><strong>Context.sendBroadcast()</strong></td><td>Intent对象将传递给此方法，以将消息传递给所有感兴趣的广播接收者。</td></tr></tbody></table><h2 id="indent-对象" tabindex="-1"><a class="header-anchor" href="#indent-对象"><span>Indent 对象</span></a></h2><p><strong>Intent</strong> 对象是一组信息，由接收Intent的组件使用，也包括Android系统使用的信息。</p><p>一个Intent对象可以基于其正在通信或将要执行的内容包含以下组件-</p><p><em>执行动作（Action）</em></p><p>这是 Intent 对象的必需部分，并且是一个字符串，用于命名要执行的动作-或在广播意图的情况下，是已发生并要报告的动作。动作很大程度上决定了其余意图对象的结构。Intent类定义了许多与不同intent对应的动作常量。这是Android Intent<a href="https://developer.android.google.cn/reference/android/content/Intent#constants_1" target="_blank" rel="noopener noreferrer">标准操作</a>的列表</p><p>可以通过**setAction()<strong>方法设置Intent对象中的动作，并通过</strong>getAction()**读取该动作。</p><p><em>数据(Data)</em></p><p>将数据规范添加到意图过滤器。规范可以只是数据类型（mimeType属性），只是URI，或者既是数据类型又是URI。URI由其每个部分的单独属性指定-</p><p>这些指定URL格式的属性是可选的，但也相互依赖-</p><ul><li><p>如果未为意图过滤器指定方案，则将忽略所有其他URI属性。</p></li><li><p>如果未为过滤器指定主机，则将忽略端口属性和所有路径属性。</p><p>**setData()**方法仅将数据指定为URI，**setType()**仅将数据指定为MIME类型，**setDataAndType()<strong>将其指定为URI和MIME类型。URI由</strong>getData()<strong>读取，类型由</strong>getType()**读取。</p><p>动作/数据对的一些例子是-</p><table><thead><tr><th>action/data</th><th>说明</th></tr></thead><tbody><tr><td><strong>ACTION_VIEW</strong> content://contacts/people/1</td><td>显示标识符为“1”的人员的信息。</td></tr><tr><td><strong>ACTION_DIAL</strong> content://contacts/people/1</td><td>显示所填写的人的电话拨号器。</td></tr><tr><td><strong>ACTION_VIEW</strong> tel:123</td><td>显示电话拨号器与给定的号码填写。</td></tr><tr><td><strong>ACTION_DIAL</strong> tel:123</td><td>显示电话拨号器与给定的号码填写。</td></tr><tr><td><strong>ACTION_EDIT</strong> content://contacts/people/1</td><td>编辑标识符为“1”的人员的信息。</td></tr><tr><td><strong>ACTION_VIEW</strong> content://contacts/people/</td><td>显示用户可以浏览的人员列表。</td></tr><tr><td><strong>ACTION_SET_WALLPAPER</strong></td><td>显示选择壁纸的设置</td></tr><tr><td><strong>ACTION_SYNC</strong></td><td>它会同步数据，常数值是android.intent.action.sync</td></tr><tr><td><strong>ACTION_SYSTEM_TUTORIAL</strong></td><td>它将启动平台定义的教程(默认教程或启动教程)</td></tr><tr><td><strong>ACTION_TIMEZONE_CHANGED</strong></td><td>当时区改变时就会调起</td></tr><tr><td><strong>ACTION_UNINSTALL_PACKAGE</strong></td><td>它用于运行默认的卸载程序</td></tr></tbody></table><p><em>类别(Category)</em></p><p>类别是Intent对象的可选部分，它是一个字符串，其中包含有关应处理该意图的组件类型的其他信息。**addCategory()**方法将类别放置在Intent对象中，**removeCategory()<strong>删除先前添加的类别，并且</strong>getCategories()**获取对象中当前所有类别的集合。这是<a href="https://developer.android.google.cn/reference/android/content/Intent#CATEGORY_HOME" target="_blank" rel="noopener noreferrer">Android Intent标准类别</a>的列表。</p><p>附加功能(Extra)</p><p>这将在键值对中提供附加信息，这些附加信息应传递给处理该意图的组件。可以分别使用**putExtras()<strong>和</strong>getExtras()**方法设置和读取附加功能。这是<a href="https://developer.android.google.cn/reference/android/content/Intent#EXTRA_ALARM_COUNT" target="_blank" rel="noopener noreferrer">Android Intent标准附加数据</a>的列表</p><p><em>标志(Flag)</em></p><p>这些标志是Intent对象的可选部分，用于指示Android系统如何启动活动以及在启动活动(Activity)后如何对其进行处理等。<a href="https://developer.android.google.cn/reference/android/content/Intent#FLAG_ACTIVITY_BROUGHT_TO_FRONT" target="_blank" rel="noopener noreferrer">参考手册</a></p><p>下表是一些常用的标志</p><table><thead><tr><th>标志</th><th>说明</th></tr></thead><tbody><tr><td><strong>FLAG_ACTIVITY_CLEAR_TASK</strong></td><td>如果在传递给Context.startActivity() 的Intent中进行设置，则此标志将导致在活动开始之前清除与该活动相关联的所有现有任务。也就是说，该活动成为原本空的任务的新根，并且所有旧活动都已完成。只能与FLAG_ACTIVITY_NEW_TASK结合使用。</td></tr><tr><td><strong>FLAG_ACTIVITY_CLEAR_TOP</strong></td><td>如果已设置，并且正在启动的活动已在当前任务中运行，那么与其启动该活动的新实例，不如关闭该活动之上的所有其他活动，并将此Intent传递给（现在顶部）将旧活动作为新的Intent。</td></tr><tr><td><strong>FLAG_ACTIVITY_NEW_TASK</strong></td><td>想要呈现“启动程序”样式行为的活动通常使用此标志：它们为用户提供了可以完成的单独操作的列表，否则这些操作完全独立于启动它们的活动。</td></tr></tbody></table><p><em>组件名称(component)</em></p><p>这个可选字段是一个android ComponentName对象，代表Activity，Service或BroadcastReceiver类。如果已设置，则将Intent对象传递到指定类的实例，否则Android使用Intent对象中的其他信息来定位合适的目标。组件名称由setComponent()，setClass()或setClassName()设置，并由getComponent()读取。</p></li></ul><h2 id="indent-类型" tabindex="-1"><a class="header-anchor" href="#indent-类型"><span>Indent 类型</span></a></h2><p>Android支持以下两种类型的意图</p><p><img src="https://www.jc2182.com/images/android/indent2.jpg" alt="indent"></p><p><em>Explicit Intents(显示意图)</em></p><p>显式意图将被连接到应用程序的内部世界，假设您想将一个活动(activity)连接到另一个活动(activity)，我们可以通过显式意图进行引用，下图是通过单击按钮将第一个活动连接到第二个活动。</p><p><img src="https://www.jc2182.com/images/android/indent3.jpg" alt="indent"></p><p>这些意图通过名称来指定目标组件，它们通常用于应用程序内部消息-例如启动下属服务或启动同级活动的活动。例如-</p><pre><code class="language-java">  // 通过指定其类名来显式意图
  Intent i = new Intent(FirstActivity.this, SecondActivity.class);
  
  // 启动目标 Activity
  startActivity(i);
</code></pre><p><em>Implicit Intents(隐示意图)</em></p><p>这些意图不会命名目标，并且组件名称的字段保留为空白。隐式意图通常用于激活其他应用程序中的组件。例如-</p><pre><code class="language-java">  Intent read1=new Intent();
  read1.setAction(android.content.Intent.ACTION_VIEW);
  read1.setData(ContactsContract.Contacts.CONTENT_URI);
  startActivity(read1);
</code></pre><p>上面的代码将给出如下所示的结果调出联系人列表:</p><p><img src="https://www.jc2182.com/images/android/indent1.png" alt="indent"></p><p>接收到意图的目标组件可以使用**getExtras()**方法获取源组件发送的额外数据。例如-</p><pre><code class="language-java">  // 在代码中的适当位置获取包对象
  Bundle extras = getIntent().getExtras();
  
  // 使用传递的key提取数据
  String value1 = extras.getString(&quot;Key1&quot;);
  String value2 = extras.getString(&quot;Key2&quot;);
</code></pre><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>以下示例显示了用于启动各种Android内置应用程序的Android Intent的功能。</p><ol><li>您将使用Android Studio IDE创建一个Android应用程序，并在com.jc2182.helloworld包下将其命名为HelloWorld。</li><li>修改src/main/java/MainActivity.java文件并添加代码以定义对应于两个按钮的两个侦听器。启动浏览器并启动电话。</li><li>修改布局XML文件res/layout/activity_main.xml，以在线性布局中添加三个按钮。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.helloworld/MainActivity.java的内容。</p><pre><code class="language-java">  
  
  import android.app.Activity;
  import android.content.Intent;
  import android.net.Uri;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
 
  

public class MainActivity extends Activity {
 
  Button b1,b2;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      b1=(Button)findViewById(R.id.button);
      b1.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              Intent i = new Intent(android.content.Intent.ACTION_VIEW, Uri.parse(&quot;http://www.jc2182.com&quot;));
              startActivity(i);
          }
      });

      b2=(Button)findViewById(R.id.button2);
      b2.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Intent i = new Intent(android.content.Intent.ACTION_VIEW,
                      Uri.parse(&quot;tel:9510300000&quot;));
              startActivity(i);
          }
      });
  }
 

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:orientation=&quot;vertical&quot; &gt;

    &lt;TextView
        android:id=&quot;@+id/textView1&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;65dp&quot;
        android:text=&quot;Intent（意图）示例&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView1&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;41dp&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff87ff09&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;ImageButton
        android:id=&quot;@+id/imageButton&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;60dp&quot;
        android:layout_marginEnd=&quot;45dp&quot;
        android:src=&quot;@drawable/logo&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText&quot;
        android:layout_below=&quot;@+id/imageButton&quot;
        android:layout_alignRight=&quot;@+id/imageButton&quot;
        android:layout_alignEnd=&quot;@+id/imageButton&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignStart=&quot;@+id/imageButton&quot;
        android:layout_alignLeft=&quot;@+id/imageButton&quot;
        android:layout_alignTop=&quot;@+id/editText&quot;
        android:layout_alignEnd=&quot;@+id/textView1&quot;
        android:layout_alignRight=&quot;@+id/textView1&quot;
        android:layout_marginStart=&quot;28dp&quot;
        android:layout_marginLeft=&quot;28dp&quot;
        android:layout_marginTop=&quot;40dp&quot;
        android:layout_marginEnd=&quot;-27dp&quot;
        android:layout_marginRight=&quot;-27dp&quot;
        android:text=&quot;启动浏览器&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button&quot;
        android:layout_alignStart=&quot;@+id/button&quot;
        android:layout_alignLeft=&quot;@+id/button&quot;
        android:layout_alignEnd=&quot;@+id/textView2&quot;
        android:layout_alignRight=&quot;@+id/textView2&quot;
        android:layout_marginStart=&quot;48dp&quot;
        android:layout_marginLeft=&quot;48dp&quot;
        android:layout_marginTop=&quot;43dp&quot;
        android:layout_marginEnd=&quot;-48dp&quot;
        android:layout_marginRight=&quot;-48dp&quot;
        android:text=&quot;启动电话&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是AndroidManifest.xml的默认内容 -</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.helloworld&quot;&gt;

    &lt;application
        android:allowBackup=&quot;true&quot;
        android:icon=&quot;@mipmap/ic_launcher&quot;
        android:label=&quot;@string/app_name&quot;
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
</code></pre><p>让我们尝试运行您的“我的应用程序”应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用程序，请打开项目的活动文件之一，然后运行图标从工具栏中单击“运行” 图标。AndroidStudio会将其安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在模拟器上窗口-</p><p><img src="https://www.jc2182.com/images/android/indent2.png" alt="indent"></p><p>现在单击“启动浏览器”按钮选择Chrome浏览器，这将启动配置的浏览器并显示<a href="https://www.jc2182.com" target="_blank" rel="noopener noreferrer">https://www.jc2182.com</a>，如下所示-</p><p><img src="https://www.jc2182.com/images/android/indent3.png" alt="indent"></p><p>单击“启动电话”按钮，出现如下界面。</p><p><img src="https://www.jc2182.com/images/android/indent4.png" alt="indent"></p><h2 id="意图过滤器" tabindex="-1"><a class="header-anchor" href="#意图过滤器"><span>意图过滤器</span></a></h2><p>您已经了解了如何使用Intent调用另一个活动(activity)。Android OS使用过滤器来确定活动，服务和广播接收器的集合，这些接收器可以在指定的一组动作，类别和与Intent相关的数据方案的帮助下处理Intent。您将在清单文件中使用<code>&lt;intent-filter&gt;</code>元素列出与任何活动，服务或广播接收者关联的动作，类别和数据类型。以下是AndroidManifest.xml文件的一部分示例，用于指定活动com.jc2182.helloworld.CustomActivity，可以通过上述两个操作（一个类别和一个数据）之一来调用该活动-</p><pre><code class="language-xml">  &lt;activity android:name=&quot;.MainActivity&quot;&gt;
      &lt;intent-filter tools:ignore=&quot;AppLinkUrlError&quot;&gt;
          &lt;action android:name=&quot;android.intent.action.VIEW&quot; /&gt;
          &lt;action android:name=&quot;com.jc2182.helloworld.LAUNCH&quot; /&gt;
          &lt;category android:name=&quot;android.intent.category.DEFAULT&quot; /&gt;
          &lt;data android:scheme=&quot;https&quot; /&gt;
      &lt;/intent-filter&gt;
  &lt;/activity&gt;
</code></pre><p>当活动被上面的过滤器所定义，其他活动就可以通过下面的方式来调用这个活动。使用 <strong>android.intent.action.VIEW</strong>，使用 <strong>com.jc2182.helloworld.LAUNCH</strong> 动作，并提供<strong>android.intent.category.DEFAULT</strong>类别。元素指定要被调用的活动所期望的数据类型。上面的实例中，自定义活动期望的数据由&quot;https://&quot;开头。有这样的情况，通过过滤器，意图将被传递到多个的活动或者服务，用户将被询问启动哪个组件。如果没有找到目标组件，将发生一个异常。在调用活动之前，有一系列的 Android 检查测试：</p><ul><li><p>过滤器 <code>&lt;intent-filter&gt;</code> 需要列出一个或者多个的动作，不能为空；过滤器至少包含一个 元素，否则将阻塞所有的意图。如果多个动作被提到，Android 在调用活动前尝试匹配其中提到的一个动作。</p></li><li><p>过滤器 <code>&lt;intent-filter&gt;</code> 可能列出0个，1个或者多个类别。如果没有类别被提到，Android 通过这个测试，如果有多个类别被提及，意图通过类型测试，每个意图对象的分类必须匹配过滤器中的一个分类。</p></li><li><p>每个 元素可以指定一个 URI 和一个数据类型(元媒体类型)。这里有独立的属性，如 URI 中的每个部分：模式，主机，端口和路径。意图包含有 URI 和类型，只有它的类型匹配了过滤器中列出的某个类型，则通过数据类型部分的测试。</p><p><em>意图过滤器示例</em></p><p>下面的实例是上面实例的一些修改。这里我们将看到如果一个意图调用定义的两个活动，Android 如何来解决冲突；如何使用过滤器来调用自定义活动；如果没有为意图定义合适的活动，则会出现异常。</p><ol><li>使用Android Studio IDE创建Android应用程序，并命名为Intent filter，包名为com.jc2182.helloworld。当创建项目时，确保目标 SDK 和用最新版本的 Android SDK 进行编译使用高级的API。</li><li>修改 src/com.jc2182.helloworld/MainActivity.java 文件，添加代码来定义三个监听器来对应布局文件中定义的三个按钮。</li><li>添加 src/com.jc2182.helloworld/CustomActivity.java 文件来包含一个活动，可以被不同的意图调用。</li><li>修改 res/layout/activity_main.xml 文件在线性布局中添加三个按钮。</li><li>添加 res/lauout/custom_view.xml 布局文件，添加简单地 来显示通过 intent 传递的数据。</li><li>修改 AndroidManifest.xml 文件，添加 <code>&lt;intent-filter&gt;</code> 定义意图的规则来调用自定义活动。</li><li>启动 Android 模拟器来运行应用程序，并验证应用程序所做改变的结果。</li></ol><p>以下是修改后的主要活动文件src/MainActivity.java的内容。</p></li></ul><pre><code class="language-java">  
  
  import android.app.Activity;
  import android.content.Intent;
  import android.net.Uri;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  

public class MainActivity extends Activity {

  Button b1,b2,b3;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      b1=(Button)findViewById(R.id.button);
      b1.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              Intent i = new Intent(android.content.Intent.ACTION_VIEW,
                      Uri.parse(&quot;https://www.jc2182.com&quot;));
              startActivity(i);
          }
      });

      b2 = (Button)findViewById(R.id.button2);
      b2.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Intent i = new Intent(&quot;com.jc2182.helloworld.LAUNCH&quot;,Uri.parse(&quot;https://www.jc2182.com&quot;));
              startActivity(i);
          }
      });

      b3 = (Button)findViewById(R.id.button3);
      b3.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Intent i = new Intent(&quot;com.jc2182.helloworld.LAUNCH&quot;,
                      Uri.parse(&quot;http://www.jc2182.com&quot;));
              startActivity(i);
          }
      });
  }

}

</code></pre><p>以下是修改后的主要活动文件src/com.jc2182.helloworld/CustomActivity.java的内容。</p><pre><code class="language-java">


import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.widget.TextView;

public class CustomActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.custom_view);
        TextView label = (TextView) findViewById(R.id.show_data);
        Uri url = getIntent().getData();
        label.setText(url.toString());
    }
}
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:orientation=&quot;vertical&quot; &gt;

    &lt;TextView
        android:id=&quot;@+id/textView1&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;67dp&quot;
        android:text=&quot;意图|过滤器示例&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView1&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;32dp&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff87ff09&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;ImageButton
        android:id=&quot;@+id/imageButton&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;42dp&quot;
        android:src=&quot;@drawable/logo&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText&quot;
        android:layout_below=&quot;@+id/imageButton&quot;
        android:layout_alignRight=&quot;@+id/imageButton&quot;
        android:layout_alignEnd=&quot;@+id/imageButton&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignStart=&quot;@+id/imageButton&quot;
        android:layout_alignLeft=&quot;@+id/imageButton&quot;
        android:layout_alignTop=&quot;@+id/editText&quot;
        android:layout_alignEnd=&quot;@+id/imageButton&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginStart=&quot;3dp&quot;
        android:layout_marginLeft=&quot;3dp&quot;
        android:layout_marginTop=&quot;32dp&quot;
        android:layout_marginEnd=&quot;-2dp&quot;
        android:text=&quot;启动浏览器&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button&quot;
        android:layout_alignStart=&quot;@+id/button&quot;
        android:layout_alignLeft=&quot;@+id/button&quot;
        android:layout_alignEnd=&quot;@+id/button&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginStart=&quot;2dp&quot;
        android:layout_marginLeft=&quot;2dp&quot;
        android:layout_marginTop=&quot;20dp&quot;
        android:layout_marginEnd=&quot;-1dp&quot;
        android:text=&quot;动过LAUNCH启动浏览&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button3&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button2&quot;
        android:layout_alignStart=&quot;@+id/button2&quot;
        android:layout_alignLeft=&quot;@+id/button2&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginStart=&quot;-17dp&quot;
        android:layout_marginLeft=&quot;-17dp&quot;
        android:layout_marginTop=&quot;29dp&quot;
        android:layout_marginEnd=&quot;16dp&quot;
        android:layout_toStartOf=&quot;@+id/editText&quot;
        android:text=&quot;异常条件测试&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下将是res/layout/custom_view.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:orientation=&quot;vertical&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;&gt;
    &lt;TextView android:id=&quot;@+id/show_data&quot;
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;400dp&quot;/&gt;
&lt;/LinearLayout&gt;
</code></pre><p>以下将是AndroidManifest.xml的内容</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    package=&quot;com.jc2182.helloworld&quot;&gt;

    &lt;application
        android:allowBackup = &quot;true&quot;
        android:icon = &quot;@mipmap/ic_launcher&quot;
        android:label = &quot;@string/app_name&quot;
        android:supportsRtl = &quot;true&quot;
        android:theme = &quot;@style/AppTheme&quot;&gt;
        &lt;activity android:name = &quot;.MainActivity&quot;&gt;
            &lt;intent-filter&gt;
                &lt;action android:name = &quot;android.intent.action.MAIN&quot; /&gt;
                &lt;category android:name = &quot;android.intent.category.LAUNCHER&quot; /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

        &lt;activity android:name=&quot;com.jc2182.helloworld.CustomActivity&quot;&gt;

            &lt;intent-filter tools:ignore=&quot;AppLinkUrlError&quot;&gt;
                &lt;action android:name = &quot;android.intent.action.VIEW&quot; /&gt;
                &lt;action android:name = &quot;com.jc2182.helloworld.LAUNCH&quot; /&gt;
                &lt;category android:name = &quot;android.intent.category.DEFAULT&quot; /&gt;
                &lt;data android:scheme = &quot;https&quot; /&gt;
            &lt;/intent-filter&gt;

        &lt;/activity&gt;
    &lt;/application&gt;

&lt;/manifest&gt;
</code></pre><p>运行应用程序::</p><p>让我们尝试运行我们刚刚创建的HelloWorld应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的Activity文件之一，然后运行图标从工具栏中单击运行图标。Android在您的AVD上安装该应用程序并启动它，如果您的设置和应用程序一切正常，它将在“模拟器”窗口中显示-</p><p><img src="https://www.jc2182.com/images/android/indentfilter1.png" alt="fragment"></p><p>现在让我们从第一个按钮“使用VIEW Action启动浏览器”开始。在这里，我们使用过滤器“android.intent.action.VIEW”定义了自定义活动，并且已经有一个针对Android定义的VIEW活动的默认活动，该活动正在启动网络浏览器，因此android显示以下两个选项来选择您需要的活动要启动。</p><p><img src="https://www.jc2182.com/images/android/indentfilter2.png" alt="fragment"></p><p>现在，如果您选择浏览器，则Android将启动Web浏览器并打开jc2182.com网站，但是如果您选择My Indernt2 Application选项，则Android将启动CustomActivity，它仅捕获捕获的数据并在文本视图中显示，如下所示-</p><p><img src="https://www.jc2182.com/images/android/indentfilter3.png" alt="fragment"></p><p>现在使用后退按钮返回并单击“通过LAUNCH Action启动浏览器”按钮，此处Android应用过滤器选择定义活动，它只是启动您的自定义活动再次，使用“后退”按钮返回并单击“异常条件”按钮，此处Android尝试为给定的意图找到有效的过滤器，但未找到定义的有效活动，因为这一次我们将数据用作http而不是https尽管我们采取了正确的措施，所以Android引发了异常并显示以下屏幕-</p>`,74),a=[d];function r(u,l){return o(),n("div",null,a)}const p=t(e,[["render",r],["__file","intent-filter.html.vue"]]),s=JSON.parse('{"path":"/android-tutor/basic/intent-filter.html","title":"Android Indent（意图）","lang":"zh-CN","frontmatter":{"description":"Android Indent（意图） Android Intent(意图)是要执行的操作的抽象描述。它可以与startActivity一起使用来启动一个Activity，可以将broadcastIntent发送到任何感兴趣的BroadcastReceiver组件，也可以与**startService（Intent）或bindService（Intent...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/basic/intent-filter.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Android Indent（意图）"}],["meta",{"property":"og:description","content":"Android Indent（意图） Android Intent(意图)是要执行的操作的抽象描述。它可以与startActivity一起使用来启动一个Activity，可以将broadcastIntent发送到任何感兴趣的BroadcastReceiver组件，也可以与**startService（Intent）或bindService（Intent..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/indent1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Android Indent（意图）\\",\\"image\\":[\\"https://www.jc2182.com/images/android/indent1.jpg\\",\\"https://www.jc2182.com/images/android/indent2.jpg\\",\\"https://www.jc2182.com/images/android/indent3.jpg\\",\\"https://www.jc2182.com/images/android/indent1.png\\",\\"https://www.jc2182.com/images/android/indent2.png\\",\\"https://www.jc2182.com/images/android/indent3.png\\",\\"https://www.jc2182.com/images/android/indent4.png\\",\\"https://www.jc2182.com/images/android/indentfilter1.png\\",\\"https://www.jc2182.com/images/android/indentfilter2.png\\",\\"https://www.jc2182.com/images/android/indentfilter3.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Indent 对象","slug":"indent-对象","link":"#indent-对象","children":[]},{"level":2,"title":"Indent 类型","slug":"indent-类型","link":"#indent-类型","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]},{"level":2,"title":"意图过滤器","slug":"意图过滤器","link":"#意图过滤器","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":15.43,"words":4629},"filePathRelative":"android-tutor/basic/intent-filter.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,s as data};
