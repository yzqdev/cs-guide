import{_ as t,c as n,o,d as e}from"./app-CbULZrmi.js";const i={},a=e(`<h1 id="网络连接" tabindex="-1"><a class="header-anchor" href="#网络连接"><span>网络连接</span></a></h1><p>Android使您的应用程序连接到Internet或任何其他本地网络，并允许您执行网络操作。设备可以具有各种类型的网络连接。本章重点介绍使用Wi-Fi或移动网络连接。</p><pre><code class="language-xml">  android:parentActivityName = &quot;com.example.test.MainActivity&quot; 
</code></pre><h2 id="检查网络连接" tabindex="-1"><a class="header-anchor" href="#检查网络连接"><span>检查网络连接</span></a></h2><p>在执行任何网络操作之前​​，必须首先检查是否已连接到该网络或Internet等。为此android提供<strong>ConnectivityManager</strong>类。您需要通过调用**getSystemService()**方法来实例化此类的对象。其语法如下-</p><pre><code class="language-java">  ConnectivityManager check = (ConnectivityManager) 
  this.context.getSystemService(Context.CONNECTIVITY_SERVICE); 
</code></pre><p>实例化<strong>ConnectivityManager</strong>类的对象后，就可以使用<strong>getAllNetworkInfo</strong>方法获取所有网络的信息。此方法返回<strong>NetworkInfo</strong>数组。因此，您必须像这样接收它。</p><pre><code class="language-java">  NetworkInfo[] info = check.getAllNetworkInfo();
</code></pre><p>您需要做的最后一件事是检查网络的连接状态。其语法如下-</p><pre><code class="language-java">  for (int i = 0; i &lt; info.length; i++){
     if (info[i].getState() == NetworkInfo.State.CONNECTED){
        Toast.makeText(context, &quot;网络已连接&quot;,Toast.LENGTH_SHORT).show();
     }
  }
</code></pre><p>除了<strong>CONNECTED</strong>连接状态之外，网络还可以实现其他状态。它们在下面列出-</p><table><thead><tr><th>状态</th><th>说明</th></tr></thead><tbody><tr><td><strong>CONNECTING</strong></td><td>正在连接</td></tr><tr><td><strong>DISCONNECTED</strong></td><td>断开</td></tr><tr><td><strong>DISCONNECTING</strong></td><td>正在断开</td></tr><tr><td><strong>SUSPENDED</strong></td><td>暂停</td></tr><tr><td><strong>UNKNOWN</strong></td><td>未知</td></tr></tbody></table><h2 id="执行网络操作" tabindex="-1"><a class="header-anchor" href="#执行网络操作"><span>执行网络操作</span></a></h2><p>检查您已连接到Internet后，您可以执行任何网络操作。在这里，我们从网址获取网站的html。Android提供<strong>HttpURLConnection</strong>和<strong>URL</strong>类来处理这些操作。您需要通过提供网站链接来实例化URL类的对象。它的语法如下-</p><pre><code class="language-java">  String link = &quot;https://www.baidu.com&quot;;
  URL url = new URL(link);   
</code></pre><p>之后，您需要调用URL类的<strong>openConnection</strong>方法并将其接收到<strong>HttpURLConnection</strong>对象中。之后，您需要调用<strong>HttpURLConnection</strong>类的<strong>connect</strong>方法。</p><pre><code class="language-java">  HttpURLConnection conn = (HttpURLConnection) url.openConnection();
  conn.connect();  
</code></pre><p>最后，您需要做的就是从网站获取HTML。为此，您将使用<strong>InputStream</strong>和<strong>BufferedReader</strong>类。其语法如下-</p><pre><code class="language-java">  InputStream is = conn.getInputStream();
  BufferedReader reader = new BufferedReader(new InputStreamReader(is, &quot;UTF-8&quot;));
  String webPage = &quot;&quot;,data=&quot;&quot;;
  
  while ((data = reader.readLine()) != null){
     webPage += data + &quot;\\n&quot;;
  }
</code></pre><p>除了此connect方法之外，<strong>HttpURLConnection</strong>类中还有其他可用的方法。它们在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>disconnect()</strong></td><td>此方法释放此连接，以便其资源可以重用或关闭</td></tr><tr><td><strong>getRequestMethod()</strong></td><td>此方法返回请求方法，该方法将用于向远程HTTP服务器发出请求</td></tr><tr><td><strong>getResponseCode()</strong></td><td>此方法返回远程HTTP服务器返回的响应代码</td></tr><tr><td><strong>setRequestMethod(String method)</strong></td><td>此方法设置将发送到远程HTTP服务器的request命令</td></tr><tr><td><strong>usingProxy()</strong></td><td>此方法返回此连接是否使用代理服务器</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>下面的示例演示<strong>HttpURLConnection</strong>类的用法。它创建一个基本的应用程序，使您可以从给定的网页下载HTML。要试验此示例，您需要在连接了wifi互联网的实际设备上运行该示例。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加活动代码。</li><li>修改布局XML文件res/layout/activity_main.xml如果需要，可添加任何GUI组件。</li><li>修改AndroidManifest.xml以添加必要的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.app.ProgressDialog;
  import android.content.Context;
  import android.graphics.Bitmap;
  import android.graphics.BitmapFactory;
  import android.net.ConnectivityManager;
  import android.net.NetworkInfo;
  import android.os.Bundle;
  import android.os.Handler;
  import android.os.Message;
  import android.view.View;
  import android.widget.Button;
  import android.widget.ImageView;
  import android.widget.Toast;
  
  import java.io.IOException;
  import java.io.InputStream;
  import java.net.HttpURLConnection;
  import java.net.MalformedURLException;
  import java.net.URL;
  import java.net.URLConnection;

  public class MainActivity extends Activity {

      private ProgressDialog progressDialog;
      private Bitmap bitmap = null;
      Button b1;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          b1 = (Button) findViewById(R.id.button);
          boolean isConnect = checkInternetConnection(this);
          if (!isConnect){
              // todo
          }
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  downloadImage(&quot;https://www.jc2182.com/wp-content/themes/wiki/images/logo.png&quot;);
              }
          });
      }
    
      private void downloadImage(String urlStr) {
          progressDialog = ProgressDialog.show(this, &quot;&quot;, &quot;从：&quot; + urlStr + &quot;下载图片&quot;);
          final String url = urlStr;
    
          new Thread() {
              public void run() {
                  InputStream in = null;
    
                  Message msg = Message.obtain();
                  msg.what = 1;
    
                  try {
                      in = openHttpConnection(url);
                      bitmap = BitmapFactory.decodeStream(in);
                      Bundle b = new Bundle();
                      b.putParcelable(&quot;bitmap&quot;, bitmap);
                      msg.setData(b);
                      in.close();
                  }catch (IOException e1) {
                      e1.printStackTrace();
                  }
                  messageHandler.sendMessage(msg);
              }
          }.start();
      }
    
      private InputStream openHttpConnection(String urlStr) {
          InputStream in = null;
          int resCode = -1;
    
          try {
              URL url = new URL(urlStr);
              URLConnection urlConn = url.openConnection();
    
              if (!(urlConn instanceof HttpURLConnection)) {
                  throw new IOException(&quot;URL不是Http URL&quot;);
              }
    
              HttpURLConnection httpConn = (HttpURLConnection) urlConn;
              httpConn.setAllowUserInteraction(false);
              httpConn.setInstanceFollowRedirects(true);
              httpConn.setRequestMethod(&quot;GET&quot;);
              httpConn.connect();
              resCode = httpConn.getResponseCode();
    
              if (resCode == HttpURLConnection.HTTP_OK) {
                  in = httpConn.getInputStream();
              }
          }catch (MalformedURLException e) {
              e.printStackTrace();
          }catch (IOException e) {
              e.printStackTrace();
          }
          return in;
      }
    
      private Handler messageHandler = new Handler() {
          public void handleMessage(Message msg) {
              super.handleMessage(msg);
              ImageView img = (ImageView) findViewById(R.id.imageView);
              img.setImageBitmap((Bitmap) (msg.getData().getParcelable(&quot;bitmap&quot;)));
              progressDialog.dismiss();
          }
      };
    
      private boolean checkInternetConnection(Context context) {
          try {
              ConnectivityManager connectivity = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
              if (connectivity != null) {
    
                  NetworkInfo info = connectivity.getActiveNetworkInfo();
                  if (info != null) {
                      if (info.getState() == NetworkInfo.State.CONNECTED  &amp;&amp; info.getType() == ConnectivityManager.TYPE_WIFI) {
                          Toast.makeText(context,&quot;WIFI 已经连接&quot;,Toast.LENGTH_SHORT).show();
                          return true;
                      }
    
                      if (info.getState() == NetworkInfo.State.CONNECTED  &amp;&amp; info.getType() == ConnectivityManager.TYPE_MOBILE) {
                          Toast.makeText(context,&quot;移动数据 已经连接&quot;,Toast.LENGTH_SHORT).show();
                          return true;
                      }
    
                  }
              }
          } catch (Exception e) {
              return false;
          }
          return false;
    
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
        android:id=&quot;@+id/textView&quot;
        android:layout_width=&quot;300dp&quot;
        android:layout_height=&quot;68dp&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:text=&quot;网络连接例子&quot;
        android:textSize=&quot;25sp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;311dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_alignEnd=&quot;@+id/textView&quot;
        android:layout_alignRight=&quot;@+id/textView&quot;
        android:layout_marginTop=&quot;9dp&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff36ff15&quot;
        android:textIsSelectable=&quot;false&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;161dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;9dp&quot;
        android:text=&quot;按钮&quot; /&gt;

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
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/network1.png" alt=""></p><p>点击按钮，将下载logo图片到我们的界面中。</p><p><img src="https://www.jc2182.com/images/android/network2.png" alt=""></p>`,34),r=[a];function d(s,c){return o(),n("div",null,r)}const p=t(i,[["render",d],["__file","network-connection.html.vue"]]),l=JSON.parse('{"path":"/android-tutor/advanced/network-connection.html","title":"网络连接","lang":"zh-CN","frontmatter":{"description":"网络连接 Android使您的应用程序连接到Internet或任何其他本地网络，并允许您执行网络操作。设备可以具有各种类型的网络连接。本章重点介绍使用Wi-Fi或移动网络连接。 检查网络连接 在执行任何网络操作之前​​，必须首先检查是否已连接到该网络或Internet等。为此android提供ConnectivityManager类。您需要通过调用**...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/network-connection.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"网络连接"}],["meta",{"property":"og:description","content":"网络连接 Android使您的应用程序连接到Internet或任何其他本地网络，并允许您执行网络操作。设备可以具有各种类型的网络连接。本章重点介绍使用Wi-Fi或移动网络连接。 检查网络连接 在执行任何网络操作之前​​，必须首先检查是否已连接到该网络或Internet等。为此android提供ConnectivityManager类。您需要通过调用**..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/network1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络连接\\",\\"image\\":[\\"https://www.jc2182.com/images/android/network1.png\\",\\"https://www.jc2182.com/images/android/network2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"检查网络连接","slug":"检查网络连接","link":"#检查网络连接","children":[]},{"level":2,"title":"执行网络操作","slug":"执行网络操作","link":"#执行网络操作","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.91,"words":1472},"filePathRelative":"android-tutor/advanced/network-connection.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,l as data};
