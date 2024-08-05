import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const i={},a=e(`<h1 id="内部存储" tabindex="-1"><a class="header-anchor" href="#内部存储"><span>内部存储</span></a></h1><p>Android为应用程序提供了多种存储方式来存储其数据。这些存储位置是共享首选项，内部和外部存储，SQLite存储以及通过网络连接的存储。在本章中，我们将研究内部存储。内部存储是私有数据在设备存储器上的存储。默认情况下，这些文件是应用程序私有文件，仅当您删除应用程序时，您的应用程序才能访问它们并删除它们。</p><h2 id="写文件" tabindex="-1"><a class="header-anchor" href="#写文件"><span>写文件</span></a></h2><p>为了使用内部存储在文件中写入一些数据，请使用文件名和模式调用openFileOutput()方法。该模式可以是private，public等，其语法如下-</p><pre><code class="language-java">  FileOutputStream fOut = openFileOutput(&quot;file name here&quot;,MODE_WORLD_READABLE);
</code></pre><p>方法openFileOutput()返回FileOutputStream的实例。因此，您可以在FileInputStream对象中接收它。之后，您可以调用write方法在文件上写入数据。其语法如下-</p><pre><code class="language-java">  String str = &quot;data&quot;;
  fOut.write(str.getBytes());
  fOut.close();
</code></pre><h2 id="读取文件" tabindex="-1"><a class="header-anchor" href="#读取文件"><span>读取文件</span></a></h2><p>为了从刚刚创建的文件中读取，请使用文件名调用openFileInput()方法。它返回FileInputStream的实例。其语法如下-</p><pre><code class="language-java">  FileInputStream fin = openFileInput(file);
</code></pre><p>之后，您可以调用read方法从文件中一次读取一个字符，然后进行打印。其语法如下-</p><pre><code class="language-java">  int c;
  String temp=&quot;&quot;;
  while( (c = fin.read()) != -1){
     temp = temp + Character.toString((char)c);
  }
  
  //string temp contains all the data of the file.
  fin.close();
</code></pre><p>除了write和close方法外，FileOutputStream类还提供了其他方法来更好地写入和读取文件。这些方法在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>FileOutputStream(File file, boolean append)</strong></td><td>此方法构造一个新的FileOutputStream写入文件。</td></tr><tr><td><strong>getChannel()</strong></td><td>此方法返回一个只写FileChannel，与该流共享其位置。</td></tr><tr><td><strong>getFD()</strong></td><td>此方法返回基础文件描述符。</td></tr><tr><td><strong>write(byte[] buffer, int byteOffset, int byteCount)</strong></td><td>此方法从字节数组缓冲区的位置偏移处开始将计数字节写入此流。</td></tr><tr><td><strong>available()</strong></td><td>此方法返回估计的字节数，可以读取或跳过这些字节而不会阻塞以获得更多输入</td></tr><tr><td><strong>getChannel()</strong></td><td>此方法返回一个只读FileChannel，与该流共享其位置</td></tr><tr><td><strong>getFD()</strong></td><td>此方法返回基础文件描述符</td></tr><tr><td><strong>read(byte[] buffer, int byteOffset, int byteCount)</strong></td><td>此方法从此流中读取最大长度的字节，并将其存储在从offset开始的字节数组b中</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是一个示例，演示了如何使用内部存储来存储和读取文件。它创建一个基本的存储应用程序，使您可以从内部存储读取和写入。要试验该示例，您可以在实际设备或仿真器上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件添加必要代码。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;

  import android.app.Activity;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.TextView;
  import android.widget.Toast;

  import java.io.FileInputStream;
  import java.io.FileOutputStream;

  public class MainActivity extends Activity {
      Button b1,b2;
      TextView tv;
      EditText ed1;

      String data;
      private String file = &quot;mydata&quot;;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1=(Button)findViewById(R.id.button);
          b2=(Button)findViewById(R.id.button2);
    
          ed1=(EditText)findViewById(R.id.editText);
          tv=(TextView)findViewById(R.id.textView2);
          b1.setOnClickListener(new View.OnClickListener() {
    
              @Override
              public void onClick(View v) {
                  data=ed1.getText().toString();
                  try {
                      FileOutputStream fOut = openFileOutput(file,MODE_PRIVATE);
                      fOut.write(data.getBytes());
                      fOut.close();
                      Toast.makeText(getBaseContext(),&quot;文件保存&quot;,Toast.LENGTH_SHORT).show();
                  }
                  catch (Exception e) {
                      // TODO Auto-generated catch block
                      e.printStackTrace();
                  }
              }
          });
    
          b2.setOnClickListener(new View.OnClickListener() {
    
              @Override
              public void onClick(View v) {
                  try {
                      FileInputStream fin = openFileInput(file);
                      int c;
                      String temp=&quot;&quot;;
                      while( (c = fin.read()) != -1){
                          temp = temp + (char) c;
                      }
                      tv.setText(temp);
                      Toast.makeText(getBaseContext(),&quot;文件读取&quot;,Toast.LENGTH_SHORT).show();
                  }
                  catch(Exception e){
                  }
              }
          });
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView android:text=&quot;内部存储示例&quot;
        android:layout_width=&quot;wrap_content&quot;
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
        android:layout_marginTop=&quot;6dp&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;60dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignStart=&quot;@+id/textView&quot;
        android:layout_alignLeft=&quot;@+id/textView&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_marginStart=&quot;-67dp&quot;
        android:layout_marginLeft=&quot;-67dp&quot;
        android:layout_marginBottom=&quot;4dp&quot;
        android:text=&quot;保存&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText&quot;
        android:hint=&quot;输入文本&quot;
        android:focusable=&quot;true&quot;
        android:textColorHighlight=&quot;#ff7eff15&quot;
        android:textColorHint=&quot;#ffff25e6&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignRight=&quot;@+id/textView&quot;
        android:layout_alignEnd=&quot;@+id/textView&quot;
        android:layout_marginTop=&quot;42dp&quot;
        android:layout_alignLeft=&quot;@+id/imageView&quot;
        android:layout_alignStart=&quot;@+id/imageView&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:background=&quot;#22552200&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;51dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignTop=&quot;@+id/button&quot;
        android:layout_alignEnd=&quot;@+id/editText&quot;
        android:layout_alignRight=&quot;@+id/editText&quot;
        android:layout_marginTop=&quot;3dp&quot;
        android:text=&quot;加载&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;读取&quot;
        android:id=&quot;@+id/textView2&quot;
        android:layout_below=&quot;@+id/editText&quot;
        android:layout_toLeftOf=&quot;@+id/button2&quot;
        android:layout_toStartOf=&quot;@+id/button2&quot;
        android:textColor=&quot;#ff5bff1f&quot;
        android:textSize=&quot;25dp&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/internalstorage1.png" alt=""></p><p>输入数据，点 保存，然后加载-</p><p><img src="https://www.jc2182.com/images/android/internalstorage2.png" alt=""></p><p>出现如下视图-</p><p><img src="https://www.jc2182.com/images/android/internalstorage3.png" alt=""></p>`,27),d=[a];function r(u,l){return n(),o("div",null,d)}const c=t(i,[["render",r],["__file","internal-storage.html.vue"]]),s=JSON.parse('{"path":"/android-tutor/advanced/internal-storage.html","title":"内部存储","lang":"zh-CN","frontmatter":{"description":"内部存储 Android为应用程序提供了多种存储方式来存储其数据。这些存储位置是共享首选项，内部和外部存储，SQLite存储以及通过网络连接的存储。在本章中，我们将研究内部存储。内部存储是私有数据在设备存储器上的存储。默认情况下，这些文件是应用程序私有文件，仅当您删除应用程序时，您的应用程序才能访问它们并删除它们。 写文件 为了使用内部存储在文件中写入...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/internal-storage.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"内部存储"}],["meta",{"property":"og:description","content":"内部存储 Android为应用程序提供了多种存储方式来存储其数据。这些存储位置是共享首选项，内部和外部存储，SQLite存储以及通过网络连接的存储。在本章中，我们将研究内部存储。内部存储是私有数据在设备存储器上的存储。默认情况下，这些文件是应用程序私有文件，仅当您删除应用程序时，您的应用程序才能访问它们并删除它们。 写文件 为了使用内部存储在文件中写入..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/internalstorage1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内部存储\\",\\"image\\":[\\"https://www.jc2182.com/images/android/internalstorage1.png\\",\\"https://www.jc2182.com/images/android/internalstorage2.png\\",\\"https://www.jc2182.com/images/android/internalstorage3.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"写文件","slug":"写文件","link":"#写文件","children":[]},{"level":2,"title":"读取文件","slug":"读取文件","link":"#读取文件","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.49,"words":1346},"filePathRelative":"android-tutor/advanced/internal-storage.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,s as data};
