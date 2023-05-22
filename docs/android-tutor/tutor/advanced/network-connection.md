# 网络连接
  
  Android使您的应用程序连接到Internet或任何其他本地网络，并允许您执行网络操作。设备可以具有各种类型的网络连接。本章重点介绍使用Wi-Fi或移动网络连接。
  
```xml
  android:parentActivityName = "com.example.test.MainActivity" 
```
  
  


  
  ## 检查网络连接
  
  在执行任何网络操作之前​​，必须首先检查是否已连接到该网络或Internet等。为此android提供**ConnectivityManager**类。您需要通过调用**getSystemService()**方法来实例化此类的对象。其语法如下-
  
```java
  ConnectivityManager check = (ConnectivityManager) 
  this.context.getSystemService(Context.CONNECTIVITY_SERVICE); 
```
  
  
  
  实例化**ConnectivityManager**类的对象后，就可以使用**getAllNetworkInfo**方法获取所有网络的信息。此方法返回**NetworkInfo**数组。因此，您必须像这样接收它。
  
```java
  NetworkInfo[] info = check.getAllNetworkInfo();
```
  
  
  
  您需要做的最后一件事是检查网络的连接状态。其语法如下-
  
```java
  for (int i = 0; i < info.length; i++){
     if (info[i].getState() == NetworkInfo.State.CONNECTED){
        Toast.makeText(context, "网络已连接",Toast.LENGTH_SHORT).show();
     }
  }
```
  
  
  
  除了**CONNECTED**连接状态之外，网络还可以实现其他状态。它们在下面列出-
  
  | 状态              | 说明     |
  | ----------------- | -------- |
  | **CONNECTING**    | 正在连接 |
  | **DISCONNECTED**  | 断开     |
  | **DISCONNECTING** | 正在断开 |
  | **SUSPENDED**     | 暂停     |
  | **UNKNOWN**       | 未知     |


  
  ## 执行网络操作
  
  检查您已连接到Internet后，您可以执行任何网络操作。在这里，我们从网址获取网站的html。Android提供**HttpURLConnection**和**URL**类来处理这些操作。您需要通过提供网站链接来实例化URL类的对象。它的语法如下-
  
```java
  String link = "https://www.baidu.com";
  URL url = new URL(link);   
```
  
  
  
  之后，您需要调用URL类的**openConnection**方法并将其接收到**HttpURLConnection**对象中。之后，您需要调用**HttpURLConnection**类的**connect**方法。
  
```java
  HttpURLConnection conn = (HttpURLConnection) url.openConnection();
  conn.connect();  
```
  
  
  
  最后，您需要做的就是从网站获取HTML。为此，您将使用**InputStream**和**BufferedReader**类。其语法如下-
  
```java
  InputStream is = conn.getInputStream();
  BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
  String webPage = "",data="";
  
  while ((data = reader.readLine()) != null){
     webPage += data + "\n";
  }
```
  
  
  
  除了此connect方法之外，**HttpURLConnection**类中还有其他可用的方法。它们在下面列出-
  
  | 方法                                | 说明                                                     |
  | ----------------------------------- | -------------------------------------------------------- |
  | **disconnect()**                    | 此方法释放此连接，以便其资源可以重用或关闭               |
  | **getRequestMethod()**              | 此方法返回请求方法，该方法将用于向远程HTTP服务器发出请求 |
  | **getResponseCode()**               | 此方法返回远程HTTP服务器返回的响应代码                   |
  | **setRequestMethod(String method)** | 此方法设置将发送到远程HTTP服务器的request命令            |
  | **usingProxy()**                    | 此方法返回此连接是否使用代理服务器                       |


  
  ## 示例
  
  下面的示例演示**HttpURLConnection**类的用法。它创建一个基本的应用程序，使您可以从给定的网页下载HTML。要试验此示例，您需要在连接了wifi互联网的实际设备上运行该示例。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加活动代码。
  3. 修改布局XML文件res/layout/activity_main.xml如果需要，可添加任何GUI组件。
  4. 修改AndroidManifest.xml以添加必要的权限。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
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
                  downloadImage("https://www.jc2182.com/wp-content/themes/wiki/images/logo.png");
              }
          });
      }
    
      private void downloadImage(String urlStr) {
          progressDialog = ProgressDialog.show(this, "", "从：" + urlStr + "下载图片");
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
                      b.putParcelable("bitmap", bitmap);
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
                  throw new IOException("URL不是Http URL");
              }
    
              HttpURLConnection httpConn = (HttpURLConnection) urlConn;
              httpConn.setAllowUserInteraction(false);
              httpConn.setInstanceFollowRedirects(true);
              httpConn.setRequestMethod("GET");
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
              img.setImageBitmap((Bitmap) (msg.getData().getParcelable("bitmap")));
              progressDialog.dismiss();
          }
      };
    
      private boolean checkInternetConnection(Context context) {
          try {
              ConnectivityManager connectivity = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
              if (connectivity != null) {
    
                  NetworkInfo info = connectivity.getActiveNetworkInfo();
                  if (info != null) {
                      if (info.getState() == NetworkInfo.State.CONNECTED  && info.getType() == ConnectivityManager.TYPE_WIFI) {
                          Toast.makeText(context,"WIFI 已经连接",Toast.LENGTH_SHORT).show();
                          return true;
                      }
    
                      if (info.getState() == NetworkInfo.State.CONNECTED  && info.getType() == ConnectivityManager.TYPE_MOBILE) {
                          Toast.makeText(context,"移动数据 已经连接",Toast.LENGTH_SHORT).show();
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

```


以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="300dp"
        android:layout_height="68dp"
        android:layout_centerHorizontal="true"
        android:text="网络连接例子"
        android:textSize="25sp" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="311dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView"
        android:layout_alignEnd="@+id/textView"
        android:layout_alignRight="@+id/textView"
        android:layout_marginTop="9dp"
        android:text="蝴蝶教程"
        android:textColor="#ff36ff15"
        android:textIsSelectable="false"
        android:textSize="35dp" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:layout_below="@+id/textView2"
        android:layout_centerHorizontal="true" />

    <Button
        android:id="@+id/button"
        android:layout_width="161dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="9dp"
        android:text="按钮" />

</RelativeLayout>
```

  

  以下是AndroidManifest.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo">
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:usesCleartextTraffic="true"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name=".SecondMain"></activity>

    </application>

</manifest>
```

  

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/network1.png)

  点击按钮，将下载logo图片到我们的界面中。

  ![](https://www.jc2182.com/images/android/network2.png)
