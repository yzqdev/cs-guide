# 导航
  
  在本章中，我们将看到如何在应用程序之间进行向前和向后导航。我们将首先研究如何在应用程序中提供导航。
  
  向上导航将使我们的应用程序可以从下一个活动移至上一个活动。可以这样做。要实现向上导航，第一步是声明哪个活动是每个活动的适当父项。您可以通过在活动中指定**parentActivityName**属性来实现。其语法如下-
  
```xml
  android:parentActivityName = "com.example.test.MainActivity" 
```
  
  之后，您需要在活动的onCreate方法中调用getActionBar()的**setDisplayHomeAsUpEnabled**方法。这将启用顶部操作栏中的后退按钮。
  
```java
  getActionBar().setDisplayHomeAsUpEnabled(true);
```
  
  您需要做的最后一件事是重写**onOptionsItemSelected**方法。当用户按下它时，您的活动将收到对**onOptionsItemSelected()**的调用。该操作的ID为android.R.id.home，其语法如下-
  
```java
  public boolean onOptionsItemSelected(MenuItem item) {
  
     switch (item.getItemId()) {
        case android.R.id.home:
        NavUtils.navigateUpFromSameTask(this);
        return true;
     }    
  }
```
  
## 处理设备后退按钮
  
  由于已启用后退按钮在应用程序中导航，因此您可能希望将应用程序关闭功能置于设备的后退按钮中。
  
  可以通过重写**onBackPressed**，然后调用moveTaskToBack和finish方法来完成。其语法如下-
  
```java
  @Override
  public void onBackPressed() {
     moveTaskToBack(true); 
     MainActivity2.this.finish();
  }
```
  
  除了此**setDisplayHomeAsUpEnabled**方法之外，ActionBar API类中还提供了其他方法。它们在下面列出-
  
  | 方法                                               | 说明                                                                         |
  | -------------------------------------------------- | ---------------------------------------------------------------------------- |
  | **addTab(ActionBar.Tab tab, boolean setSelected)** | 此方法添加一个选项卡以用于选项卡式导航模式                                   |
  | **getSelectedTab()**                               | 如果处于选项卡式导航模式并且存在至少一个选项卡，则此方法返回当前选择的选项卡 |
  | **hide()**                                         | 如果当前正在显示，则此方法隐藏ActionBar                                      |
  | **removeAllTabs()**                                | 此方法从操作栏中删除所有标签，然后取消选择当前标签                           |
  | **selectTab(ActionBar.Tab tab)**                   | 此方法选择指定的选项卡                                                       |

## 示例
  
  下面的示例演示了导航的用法。它创建了一个基本应用程序，使您可以在应用程序中导航。要试验该示例，您需要在实际设备或仿真器上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加活动代码。
  3. 创建一个名为SecondMain.java的新活动，并对其进行编辑以添加活动代码。
  4. 修改布局XML文件res/layout/activity_main.xml如果需要，可添加任何GUI组件。
  5. 修改布局XML文件res/layout/activity_main_activity2.xml（如果需要）添加任何GUI组件。
  6. 修改AndroidManifest.xml以添加必要的代码。
  7. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Intent;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  

  public class MainActivity extends Activity {

      Button b1;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1 = (Button) findViewById(R.id.button);
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  Intent in=new Intent(MainActivity.this,SecondMain.class);
                  startActivity(in);
              }
          });
      }

  }

```

这是src/SecondMain.java的内容。

```java

package com.jc2182.demo;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class SecondMain extends Activity{

    WebView wv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_activity2);

        wv = (WebView) findViewById(R.id.webView);
        wv.setWebViewClient(new MyBrowser());
        wv.getSettings().setLoadsImagesAutomatically(true);
        wv.getSettings().setJavaScriptEnabled(true);
        wv.loadUrl("https://www.jc2182.com");
    }

    private class MyBrowser extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
    }
}
```

  以下是res/layout/activity_main.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:transitionGroup="true">

    <TextView android:text="导航示例" android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/textview"
        android:textSize="35dp"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="273dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textview"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="7dp"
        android:text="蝴蝶教程"
        android:textColor="#ff7aff24"
        android:textSize="35dp" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:background="#550000"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:theme="@style/Base.TextAppearance.AppCompat" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="第一个页面"
        android:id="@+id/button"
        android:layout_below="@+id/imageView"
        android:layout_alignRight="@+id/textView"
        android:layout_alignEnd="@+id/textView"
        android:layout_marginTop="61dp"
        android:layout_alignLeft="@+id/imageView"
        android:layout_alignStart="@+id/imageView" />

</RelativeLayout>
```

  以下是res/layout/activity_main_activity2.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:weightSum="1">

    <WebView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/webView"
        android:layout_gravity="center_horizontal"
        android:layout_weight="1.03" />

</LinearLayout>
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

  ![](https://www.jc2182.com/images/android/nav1.png)

  点击按钮，将出现下面的内容，我们蝴蝶教程的主页。

  ![](https://www.jc2182.com/images/android/nav2.png)
