import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const a={},i=e(`<h1 id="剪贴板" tabindex="-1"><a class="header-anchor" href="#剪贴板"><span>剪贴板</span></a></h1><p>Android提供了剪贴板框架，用于和粘贴不同类型的数据。数据可以是文本，图像，二进制流数据或其他复杂的数据类型。Android提供了<strong>ClipboardManager</strong>库，ClipData库和ClipData.item库来使用和粘贴框架。要使用剪贴板框架，需要将数据放入clip对象，然后将该对象放入系统范围的剪贴板。为了使用剪贴板，您需要通过调用getSystemService()方法实例化ClipboardManager的对象。其语法如下-</p><pre><code class="language-java">  ClipboardManager myClipboard;
  myClipboard = (ClipboardManager)getSystemService(CLIPBOARD_SERVICE);
</code></pre><h2 id="数据" tabindex="-1"><a class="header-anchor" href="#数据"><span>数据</span></a></h2><p>您需要做的下一件事是通过调用ClipData类的相应数据方法类型来实例化ClipData对象。对于文本数据，将调用<strong>newPlainText</strong>方法。之后，您必须将该数据设置为Clipboard Manager对象的剪辑，其语法如下所示-</p><pre><code class="language-java">  ClipData myClip;
  String text = &quot;hello world&quot;;
  myClip = ClipData.newPlainText(&quot;text&quot;, text);
  myClipboard.setPrimaryClip(myClip);
</code></pre><p>ClipData对象可以采用这三种形式，以下函数用于创建这些形式。</p><table><thead><tr><th>形式</th><th>方法</th><th>说明</th></tr></thead><tbody><tr><td>文本</td><td><strong>newPlainText(label, text)</strong></td><td>返回一个ClipData对象，该对象的单个ClipData.Item对象包含文本字符串。</td></tr><tr><td>URI</td><td><strong>newUri(resolver, label, URI)</strong></td><td>返回一个ClipData对象，该对象的单个ClipData.Item对象包含一个URI。</td></tr><tr><td>意图</td><td><strong>newIntent(label, intent)</strong></td><td>返回一个ClipData对象，其单个ClipData.Item对象包含一个Intent。</td></tr></tbody></table><h2 id="粘贴数据" tabindex="-1"><a class="header-anchor" href="#粘贴数据"><span>粘贴数据</span></a></h2><p>为了粘贴数据，我们将首先通过调用getPrimaryClip()方法获取剪贴板。然后从该单击中，我们将在ClipData.Item对象中获得该项目。然后从对象中获取数据。其语法如下-</p><pre><code class="language-java">  ClipData abc = myClipboard.getPrimaryClip();
  ClipData.Item item = abc.getItemAt(0);
  String text = item.getText().toString();
</code></pre><p>除了这些方法之外，ClipboardManager类还提供了其他方法来管理剪贴板框架。这些方法在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>getPrimaryClip()</strong></td><td>此方法仅返回剪贴板上的当前主剪辑</td></tr><tr><td><strong>getPrimaryClipDescription()</strong></td><td>此方法返回剪贴板上当前主剪辑的描述，但不返回其数据的副本。</td></tr><tr><td><strong>hasPrimaryClip()</strong></td><td>如果剪贴板上当前有一个主剪辑，则此方法返回true</td></tr><tr><td><strong>setPrimaryClip(ClipData clip)</strong></td><td>此方法在剪贴板上设置当前的主剪辑</td></tr><tr><td><strong>setText(CharSequence text)</strong></td><td>此方法可以直接用于将文本到剪贴板</td></tr><tr><td><strong>getText()</strong></td><td>此方法可以直接用于从剪贴板获取的文本</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是一个演示<strong>ClipboardManager</strong>类的用法的示例。它创建一个基本的粘贴应用程序，该应用程序允许您文本，然后通过剪贴板将其粘贴。要试验此示例，可以在实际设备或仿真器中运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件添加必要代码。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">package com.jc2182.demo;
 
  

import android.app.Activity;
 import android.content.ClipData;
 import android.content.ClipboardManager;
 import android.os.Bundle;
 import android.view.View;
 import android.widget.Button;
 import android.widget.EditText;
 import android.widget.Toast;

public class MainActivity extends Activity {
 EditText ed1, ed2;
 Button b1, b2;

  private ClipboardManager myClipboard;
  private ClipData myClip;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      ed1 = (EditText) findViewById(R.id.editText);
      ed2 = (EditText) findViewById(R.id.editText2);

      b1 = (Button) findViewById(R.id.button);
      b2 = (Button) findViewById(R.id.button2);

      myClipboard = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);

      b1.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              String text;
              text = ed1.getText().toString();

              myClip = ClipData.newPlainText(&quot;text&quot;, text);
              myClipboard.setPrimaryClip(myClip);

              Toast.makeText(getApplicationContext(), &quot;文本已&quot;, Toast.LENGTH_SHORT).show();
          }
      });

      b2.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              ClipData abc = myClipboard.getPrimaryClip();
              ClipData.Item item = abc.getItemAt(0);

              String text = item.getText().toString();
              ed2.setText(text);

              Toast.makeText(getApplicationContext(), &quot;文本已粘贴&quot;,
                      Toast.LENGTH_SHORT).show();
          }
      });
  }

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView android:text=&quot;剪贴板示例&quot; android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textview&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:background=&quot;#22221100&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:hint=&quot;文本&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignLeft=&quot;@+id/imageView&quot;
        android:layout_alignStart=&quot;@+id/imageView&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText2&quot;
        android:layout_alignLeft=&quot;@+id/editText&quot;
        android:layout_alignStart=&quot;@+id/editText&quot;
        android:hint=&quot;粘贴文本&quot;
        android:layout_below=&quot;@+id/editText&quot;
        android:layout_alignRight=&quot;@+id/editText&quot;
        android:layout_alignEnd=&quot;@+id/editText&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;76dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/editText2&quot;
        android:layout_alignStart=&quot;@+id/editText2&quot;
        android:layout_alignLeft=&quot;@+id/editText2&quot;
        android:text=&quot;文本&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;73dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/editText2&quot;
        android:layout_alignEnd=&quot;@+id/editText2&quot;
        android:layout_alignRight=&quot;@+id/editText2&quot;
        android:text=&quot;粘贴文本&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/clipboard1.png" alt=""></p><blockquote><p>在demo中尝试输入，点击按钮测试功能。</p></blockquote>`,23),d=[i];function r(l,u){return n(),o("div",null,d)}const c=t(a,[["render",r],["__file","clipboard.html.vue"]]),s=JSON.parse('{"path":"/android-tutor/advanced/clipboard.html","title":"剪贴板","lang":"zh-CN","frontmatter":{"description":"剪贴板 Android提供了剪贴板框架，用于和粘贴不同类型的数据。数据可以是文本，图像，二进制流数据或其他复杂的数据类型。Android提供了ClipboardManager库，ClipData库和ClipData.item库来使用和粘贴框架。要使用剪贴板框架，需要将数据放入clip对象，然后将该对象放入系统范围的剪贴板。为了使用剪贴板，您需要通过调用...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/clipboard.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"剪贴板"}],["meta",{"property":"og:description","content":"剪贴板 Android提供了剪贴板框架，用于和粘贴不同类型的数据。数据可以是文本，图像，二进制流数据或其他复杂的数据类型。Android提供了ClipboardManager库，ClipData库和ClipData.item库来使用和粘贴框架。要使用剪贴板框架，需要将数据放入clip对象，然后将该对象放入系统范围的剪贴板。为了使用剪贴板，您需要通过调用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/clipboard1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"剪贴板\\",\\"image\\":[\\"https://www.jc2182.com/images/android/clipboard1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"数据","slug":"数据","link":"#数据","children":[]},{"level":2,"title":"粘贴数据","slug":"粘贴数据","link":"#粘贴数据","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.26,"words":1277},"filePathRelative":"android-tutor/advanced/clipboard.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,s as data};
