import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const a={},d=e(`<h1 id="php-mysql" tabindex="-1"><a class="header-anchor" href="#php-mysql"><span>PHP/MySQL</span></a></h1><p>在本章中，我们将说明如何将PHP和MYSQL与您的android应用程序集成。如果您有网络服务器，并且想在Android应用程序上访问其数据，这将非常有用。MYSQL用作Web服务器上的数据库，PHP用于从数据库中获取数据。我们的应用程序将使用必要的参数与PHP页面进行通信，PHP将联系MYSQL数据库并获取结果并将结果返回给我们。</p><blockquote><p>如果您不熟悉<a href="https://www.jc2182.com/mysql/mysql-jiaocheng.html" target="_blank" rel="noopener noreferrer">MySQL</a>，<a href="https://www.jc2182.com/php/php-jiaocheng.html" target="_blank" rel="noopener noreferrer">PHP</a>，请到我们的教程学习。</p></blockquote><p><em>创建数据库</em></p><p>使用此简单脚本可以轻松创建MYSQL数据库。用<strong>CREATE DATABASE</strong>语句创建数据库。</p><pre><code class="language-php">  &lt;?php
     $con=mysqli_connect(&quot;example.com&quot;,&quot;username&quot;,&quot;password&quot;);
     $sql=&quot;CREATE DATABASE my_db&quot;;
     if (mysqli_query($con,$sql)) {
        echo &quot;数据库 my_db 建立成功&quot;;
     }
  ?&gt;
</code></pre><p><em>创建表</em></p><p>创建数据库后，就该在数据库中创建一些表了。用<strong>CREATE TABLE</strong>语句创建表。</p><pre><code class="language-php">  &lt;?php
    $con=mysqli_connect(&quot;example.com&quot;,&quot;username&quot;,&quot;password&quot;,&quot;my_db&quot;);
     $sql=&quot;CREATE TABLE table1(Username CHAR(30),Password CHAR(30),Role CHAR(30))&quot;;
     if (mysqli_query($con,$sql)) {
        echo &quot;表已成功创建&quot;;
     }
  ?&gt;
</code></pre><p><em>在表格中插入值</em></p><p>创建数据库和表时。现在是时候在表中插入一些数据了。用<strong>INSERT INTO</strong>语句创建数据库。</p><pre><code class="language-php">  &lt;?php
     $con=mysqli_connect(&quot;example.com&quot;,&quot;username&quot;,&quot;password&quot;,&quot;my_db&quot;);
     $sql=&quot;INSERT INTO table1 (Username, Password, Role) VALUES (&#39;admin&#39;, &#39;admin&#39;,&#39;adminstrator&#39;)&quot;;
     if (mysqli_query($con,$sql)) {
        echo &quot;值已成功插入&quot;;
     }
  ?&gt;
</code></pre><p><em>PHP-GET和POST方法</em></p><p>创建记录后，PHP还可用于从mysql数据库中获取记录。为了获取记录，必须将一些有关要获取的记录的信息传递到PHP页面。第一种传递信息的方法是通过使用$ _GET命令的GET方法。变量在url中传递，并获取记录。其语法如下-</p><pre><code class="language-php">  &lt;?php
     $con=mysqli_connect(&quot;example.com&quot;,&quot;username&quot;,&quot;password&quot;,&quot;database name&quot;);
  
     if (mysqli_connect_errno($con)) {
        echo &quot;无法连接到MySQL: &quot; . mysqli_connect_error();
     }
  
     $username = $_GET[&#39;username&#39;];
     $password = $_GET[&#39;password&#39;];
     $result = mysqli_query($con,&quot;SELECT Role FROM table1 where Username=&#39;$username&#39; AND Password=&#39;$password&#39;&quot;);
     $row = mysqli_fetch_array($result);
     $data = $row[0];
  
     if($data){
        echo $data;
     }
     mysqli_close($con);
  ?&gt;
</code></pre><p>第二种方法是使用POST方法。上面脚本中的唯一更改是将$_GET替换为$_POST。在Post方法中，变量不通过URL传递。</p><h2 id="android-连接php接口获取mysql数据" tabindex="-1"><a class="header-anchor" href="#android-连接php接口获取mysql数据"><span>Android-连接PHP接口获取MySQL数据</span></a></h2><p>我们将使用开源项目<strong>OKHttp</strong>类进行网络连接。下面看下导入OKHttp环境</p><p><em>第一步</em>打开FILE &gt; Project Structure</p><p><img src="https://www.jc2182.com/images/android/okhttp1.png" alt=""></p><p><em>第二步</em>打开依赖 &gt; App &gt; 点加号 选择Library 依赖</p><p><img src="https://www.jc2182.com/images/android/okhttp2.png" alt=""></p><p><em>第三步</em>按照下面的步骤添加两个库</p><p><img src="https://www.jc2182.com/images/android/okhttp3.png" alt=""></p><p><img src="https://www.jc2182.com/images/android/okhttp4.png" alt=""></p><p><em>第四步</em>选择应用</p><p><img src="https://www.jc2182.com/images/android/okhttp5.png" alt=""></p><p>到此，导入okhttp步骤完毕</p><p><em>通过Get方法连接</em></p><p>有两种方法可以通过PHP页面连接到MYSQL。第一个称为Get方法。他们的语法如下-</p><pre><code class="language-java">  OkHttpClient client = new OkHttpClient();
  Request request = new Request.Builder()
          .url(path)
          .get()  // 默认get 不显式调用也可以
          .build();
  Call call = client.newCall(request);
</code></pre><p>之后，您需要调用<strong>Call</strong>类的execute方法并将其接收到<strong>Response</strong>对象中。之后，接收数据。</p><pre><code class="language-java">  Response response = call.execute();
  String returnMsg = response.body().string();
</code></pre><p><em>通过Post方法连接</em></p><p>在Post方法中，将使用<strong>OkHttpClient</strong>，<strong>RequestBody</strong>类。它的语法在下面给出-</p><pre><code class="language-java">  OkHttpClient okHttpClient = new OkHttpClient();
  RequestBody requestBody = new FormBody.Builder()
          .add(&quot;username&quot;, username)
          .add(&quot;password&quot;,password)
          .build();
  Request request = new Request.Builder()
          .url(path)
          .post(requestBody)
          .build();
  
  Call call = okHttpClient.newCall(request);
</code></pre><p>您需要接收响应的数据。</p><pre><code class="language-java">  Response response = call.execute();
  String returnMsg = response.body().string();
</code></pre><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>以下示例是通过PHP页面将android应用程序与MYSQL数据库连接的完整示例。它创建一个基本的应用程序，允许您使用GET和POST方法登录。</p><p><em>PHP-MYSQL部分</em></p><p>在此示例中，已在000webhost.com中创建了名称为temp的数据库。在该数据库中，已创建一个名为table1的表。该表具有三个字段。（Username, Password, Role）。该表只有一条记录（“admin”，“admin”，“administrator”）。下面给出了php页面，该页面通过post方法获取参数。</p><pre><code class="language-php">  &lt;?php
     $con=mysqli_connect(&quot;example.com&quot;,&quot;username&quot;,&quot;password&quot;,&quot;db_name&quot;);
  
     if (mysqli_connect_errno($con)) {
        echo &quot; MySQL链接失败: &quot; . mysqli_connect_error();
     }
             $username = $_REQUEST[&#39;username&#39;];
     $password = $_REQUEST[&#39;password&#39;];
     $result = mysqli_query($con,&quot;SELECT Role FROM table1 where    Username=&#39;$username&#39; and Password=&#39;$password&#39;&quot;);
     $row = mysqli_fetch_array($result);
     $data = $row[0];
  
     if($data){
        echo $data;
     }
             mysqli_close($con);
  ?&gt;
</code></pre><p><em>Android 部分</em></p><p>要尝试使用此示例，您需要在连接了wifi互联网的实际设备上运行此示例。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加活动代码。</li><li>创建src/DoRequest.java文件以添加HTTP请求代码。</li><li>修改布局XML文件res/layout/activity_main.xml如果需要，可添加任何GUI组件。</li><li>修改res/values/string.xml文件并添加必要的字符串组件。</li><li>修改AndroidManifest.xml以添加必要的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.os.Looper;
  import android.os.Message;
  import android.view.View;
  import android.widget.EditText;
  import android.widget.TextView;
  
  import java.io.IOException;
</code></pre><p>public class MainActivity extends Activity {</p><pre><code>  private EditText usernameField,passwordField;
  private TextView status,role,method;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      usernameField = (EditText)findViewById(R.id.editText1);
      passwordField = (EditText)findViewById(R.id.editText2);

      status = (TextView)findViewById(R.id.textView6);
      role = (TextView)findViewById(R.id.textView7);
      method = (TextView)findViewById(R.id.textView9);
  }

  public void showMsg(String msg){
      role.setText(msg);
      status.setText(&quot;登录成功&quot;);
  }

  public void login(View view) throws IOException {
      new Thread(new Runnable() {
          @Override
          public void run() {
              Looper.prepare();
              String username = usernameField.getText().toString();
              String password = passwordField.getText().toString();
              Message message = Message.obtain();
              try {
                  DoRequest dr = new DoRequest();
                  dr.doInBackground(username,password,1);
                  String res = dr.getReturnMsg();
                  showMsg(res);
                  method.setText(&quot;Get 方法&quot;);
              } catch (IOException e) {
                  e.printStackTrace();
              }
              Looper.loop();
          }
      }).start();
  }

  public void loginPost(View view) throws IOException {

      new Thread(new Runnable() {
          @Override
          public void run() {
              Looper.prepare();
              String username = usernameField.getText().toString();
              String password = passwordField.getText().toString();
              Message message = Message.obtain();
              try {
                  DoRequest dr = new DoRequest();
                  dr.doInBackground(username,password,1);
                  String res = dr.getReturnMsg();
                  showMsg(res);
                  method.setText(&quot;Post 方法&quot;);
              } catch (IOException e) {
                  e.printStackTrace();
              }
              Looper.loop();//增加部分
          }
      }).start();


  }
</code></pre><p>}</p><pre><code>

以下是修改后的主要活动文件src/com.jc2182.demo/DoRequest.java的内容。

\`\`\`java

package com.jc2182.demo;

import android.util.Log;
import java.io.IOException;
import okhttp3.Call;
import okhttp3.FormBody;
import okhttp3.Headers;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class DoRequest  {

    /**     * 返回消息     */
    protected String returnMsg;

    public String getReturnMsg(){
        return  this.returnMsg;
    }

    public void doInBackground(String username,String password,int byGetOrPost) throws IOException {

        if(byGetOrPost == 0) {
            //get的方式提交就是url拼接的方式
            String path = &quot;http://192.168.61.201:9090/login.php?username=&quot; + username + &quot;&amp;password=&quot; + password;
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(path)
                    .get()  // 默认get 不显式调用也可以
                    .build();
            Call call = client.newCall(request);
            Response response = call.execute();

            //第四步，解析响应结果
            Headers headers = response.headers();
            for (int i = 0; i &lt; headers.size(); i++) {
                Log.d(&quot;GET返回头&quot;, headers.name(i) + &quot;:&quot; + headers.value(i));
            }
            this.returnMsg = response.body().string();

        }else {
            String path = &quot;http://192.168.61.201:9090/login.php&quot;;

            OkHttpClient okHttpClient = new OkHttpClient();
            RequestBody requestBody = new FormBody.Builder()
                    .add(&quot;username&quot;, username)
                    .add(&quot;password&quot;,password)
                    .build();
            Request request = new Request.Builder()
                    .url(path)
                    .post(requestBody)
                    .build();

            Call call = okHttpClient.newCall(request);

            Response response = call.execute();

            Headers headers = response.headers();
            for (int i = 0; i &lt; headers.size(); i++) {
                Log.d(&quot;POST返回头&quot;, headers.name(i) + &quot;:&quot; + headers.value(i));
            }
            this.returnMsg = response.body().string();
        }
    }

}
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;fill_parent&quot;
    android:layout_height=&quot;fill_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;


    &lt;TextView
        android:id=&quot;@+id/textView3&quot;
        android:layout_width=&quot;79dp&quot;
        android:layout_height=&quot;55dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_marginTop=&quot;117dp&quot;
        android:text=&quot;@string/App&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceLarge&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView1&quot;
        android:layout_width=&quot;68dp&quot;
        android:layout_height=&quot;27dp&quot;
        android:layout_below=&quot;@+id/textView3&quot;
        android:layout_marginTop=&quot;73dp&quot;
        android:text=&quot;@string/Username&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;64dp&quot;
        android:layout_height=&quot;35dp&quot;
        android:layout_below=&quot;@+id/textView1&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_marginStart=&quot;3dp&quot;
        android:layout_marginTop=&quot;28dp&quot;
        android:layout_marginBottom=&quot;-56dp&quot;
        android:text=&quot;@string/Password&quot; /&gt;

    &lt;EditText
        android:id=&quot;@+id/editText1&quot;
        android:layout_width=&quot;326dp&quot;
        android:layout_height=&quot;30dp&quot;
        android:layout_below=&quot;@+id/textView3&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_marginTop=&quot;31dp&quot;
        android:layout_marginEnd=&quot;3dp&quot;&gt;
        &lt;requestFocus android:layout_width=&quot;wrap_content&quot; /&gt;

    &lt;/EditText&gt;


    &lt;EditText
        android:id=&quot;@+id/editText2&quot;
        android:layout_width=&quot;278dp&quot;
        android:layout_height=&quot;29dp&quot;
        android:layout_below=&quot;@+id/editText1&quot;
        android:layout_alignEnd=&quot;@+id/editText1&quot;
        android:layout_marginStart=&quot;5dp&quot;
        android:layout_marginTop=&quot;96dp&quot;
        android:layout_marginEnd=&quot;4dp&quot;
        android:layout_toEndOf=&quot;@+id/textView2&quot;
        android:ems=&quot;10&quot;
        android:inputType=&quot;textPassword&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button1&quot;
        android:layout_width=&quot;121dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignBaseline=&quot;@+id/button2&quot;
        android:layout_alignStart=&quot;@+id/textView2&quot;
        android:layout_alignBottom=&quot;@+id/button2&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_marginStart=&quot;-3dp&quot;
        android:layout_marginBottom=&quot;45dp&quot;
        android:onClick=&quot;login&quot;
        android:text=&quot;@string/LoginGet&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;119dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:layout_marginStart=&quot;1dp&quot;
        android:layout_toEndOf=&quot;@+id/textView6&quot;
        android:onClick=&quot;loginPost&quot;
        android:text=&quot;@string/LoginPost&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView8&quot;
        android:layout_width=&quot;63dp&quot;
        android:layout_height=&quot;28dp&quot;
        android:layout_below=&quot;@+id/button1&quot;
        android:layout_alignStart=&quot;@+id/textView5&quot;
        android:layout_marginStart=&quot;-2dp&quot;
        android:layout_marginBottom=&quot;-20dp&quot;
        android:text=&quot;@string/method&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView4&quot;
        android:layout_width=&quot;66dp&quot;
        android:layout_height=&quot;28dp&quot;
        android:layout_below=&quot;@+id/textView8&quot;
        android:layout_marginStart=&quot;23dp&quot;
        android:layout_marginTop=&quot;13dp&quot;
        android:text=&quot;@string/LoginStatus&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView5&quot;
        android:layout_width=&quot;70dp&quot;
        android:layout_height=&quot;30dp&quot;
        android:layout_below=&quot;@+id/textView4&quot;
        android:layout_marginTop=&quot;43dp&quot;
        android:layout_marginEnd=&quot;7dp&quot;
        android:layout_toStartOf=&quot;@+id/editText1&quot;
        android:text=&quot;@string/LoginRole&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView7&quot;
        android:layout_width=&quot;116dp&quot;
        android:layout_height=&quot;25dp&quot;
        android:layout_alignBottom=&quot;@+id/textView5&quot;
        android:layout_marginBottom=&quot;0dp&quot;
        android:layout_toRightOf=&quot;@+id/textView5&quot;
        android:text=&quot;@string/Role&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot;
        android:textSize=&quot;10sp&quot;
        tools:ignore=&quot;SmallSp&quot; /&gt;


    &lt;TextView
        android:id=&quot;@+id/textView6&quot;
        android:layout_width=&quot;100dp&quot;
        android:layout_height=&quot;32dp&quot;
        android:layout_alignTop=&quot;@+id/textView4&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;0dp&quot;
        android:layout_toEndOf=&quot;@+id/textView4&quot;
        android:text=&quot;@string/Status&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot;
        android:textSize=&quot;10sp&quot;
        tools:ignore=&quot;SmallSp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView9&quot;
        android:layout_width=&quot;96dp&quot;
        android:layout_height=&quot;29dp&quot;
        android:layout_below=&quot;@+id/button2&quot;
        android:layout_alignStart=&quot;@+id/textView6&quot;
        android:layout_alignBottom=&quot;@+id/textView8&quot;
        android:layout_marginStart=&quot;56dp&quot;
        android:layout_marginTop=&quot;11dp&quot;
        android:layout_marginBottom=&quot;-1dp&quot;
        android:text=&quot;@string/Choose&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot;
        android:textSize=&quot;10sp&quot;
        tools:ignore=&quot;SmallSp&quot; /&gt;


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
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/phpmysql1.png" alt=""></p><p>尝试POST , GET 请求 分别如下：</p><p><img src="https://www.jc2182.com/images/android/phpmysql2.png" alt=""></p><p><img src="https://www.jc2182.com/images/android/phpmysql3.png" alt=""></p>`,61),i=[d];function r(u,p){return n(),o("div",null,i)}const l=t(a,[["render",r],["__file","php-mysql.html.vue"]]),q=JSON.parse('{"path":"/android-tutor/advanced/php-mysql.html","title":"PHP/MySQL","lang":"zh-CN","frontmatter":{"description":"PHP/MySQL 在本章中，我们将说明如何将PHP和MYSQL与您的android应用程序集成。如果您有网络服务器，并且想在Android应用程序上访问其数据，这将非常有用。MYSQL用作Web服务器上的数据库，PHP用于从数据库中获取数据。我们的应用程序将使用必要的参数与PHP页面进行通信，PHP将联系MYSQL数据库并获取结果并将结果返回给我们。...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/php-mysql.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"PHP/MySQL"}],["meta",{"property":"og:description","content":"PHP/MySQL 在本章中，我们将说明如何将PHP和MYSQL与您的android应用程序集成。如果您有网络服务器，并且想在Android应用程序上访问其数据，这将非常有用。MYSQL用作Web服务器上的数据库，PHP用于从数据库中获取数据。我们的应用程序将使用必要的参数与PHP页面进行通信，PHP将联系MYSQL数据库并获取结果并将结果返回给我们。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/okhttp1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PHP/MySQL\\",\\"image\\":[\\"https://www.jc2182.com/images/android/okhttp1.png\\",\\"https://www.jc2182.com/images/android/okhttp2.png\\",\\"https://www.jc2182.com/images/android/okhttp3.png\\",\\"https://www.jc2182.com/images/android/okhttp4.png\\",\\"https://www.jc2182.com/images/android/okhttp5.png\\",\\"https://www.jc2182.com/images/android/phpmysql1.png\\",\\"https://www.jc2182.com/images/android/phpmysql2.png\\",\\"https://www.jc2182.com/images/android/phpmysql3.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Android-连接PHP接口获取MySQL数据","slug":"android-连接php接口获取mysql数据","link":"#android-连接php接口获取mysql数据","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":7.48,"words":2243},"filePathRelative":"android-tutor/advanced/php-mysql.md","localizedDate":"2023年5月22日","autoDesc":true}');export{l as comp,q as data};
