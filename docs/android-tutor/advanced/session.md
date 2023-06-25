# 会话管理
  
  当希望在应用程序外部存储用户数据时，Session可以帮助您，以便下次用户下次使用您的应用程序时，您可以轻松地获取其详细信息并相应地执行操作。这可以通过许多方式来完成。但是，最简单，最好的方法是通过“SharedPreferences”。


  
  ## SharedPreferences
  
  **SharedPreferences**允许您以键，值对的形式保存和检索数据。为了使用共享首选项，您必须调用方法**getSharedPreferences()**，该方法返回一个**SharedPreference**实例，该实例指向包含首选项值的文件。
  
```java
  SharedPreferences sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);        
```
  
  
  
  您可以使用**SharedPreferences.Editor**类将某些内容保存在**sharedpreferences**中。您将调用**SharedPreference**实例的**edit**方法，并将其在Editor对象中接收。它的语法是-
  
```java
  Editor editor = sharedpreferences.edit();
  editor.putString("key", "value");
  editor.apply();
```
  
  
  
  除了**putString**方法外，编辑器类中还有一些可用的方法，这些方法允许在共享首选项内操作数据。它们列出如下-
  
  | 方法                                  | 说明                                                                        |
  | ------------------------------------- | --------------------------------------------------------------------------- |
  | **apply()**                           | 这是一种抽象方法。 它将您的更改从编辑器提交回您要调用的sharedPreference对象 |
  | **clear()**                           | 它将从编辑器中删除所有值                                                    |
  | **remove(String key)**                | 它将删除其键已作为参数传递的值                                              |
  | **putLong(String key, long value)**   | 它将在首选项编辑器中保存一个长值                                            |
  | **putInt(String key, int value)**     | 它将在首选项编辑器中保存一个整数值                                          |
  | **putFloat(String key, float value)** | 它将浮点值保存在首选项编辑器                                                |


  
  ## 示例
  
  为了从共享首选项执行会话管理，我们需要检查**onResume**方法中共享首选项中存储的值或数据。如果没有数据，则将从新安装的应用程序开始重新启动。但是，如果我们得到了数据，我们将从用户离开的地方开始。在下面的示例中进行了演示-
  
  下面的示例演示了会话管理的用法。它创建一个基本的应用程序，使您可以首次登录。然后，当您退出应用程序而未注销时，如果再次启动该应用程序，您将被带回到同一位置。但是，如果您从应用程序注销，则将返回到主登录屏幕。要试验该示例，您需要在实际设备或仿真器上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加进度代码以添加会话代码。
  3. 创建新的Activity，并将其名称命名为SecondMain.java。编辑此文件以添加进度代码以添加会话代码。
  4. 编辑res/layout/activity_main.xml文件以添加相应的XML代码。
  5. 编辑res/layout/second_main.xml文件以添加相应的XML代码。
  6. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Context;
  import android.content.Intent;
  import android.content.SharedPreferences;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;

  public class MainActivity extends Activity {
      EditText ed1,ed2,ed3;
      Button b1;
      Intent in;

      public static final String MyPREFERENCES = "MyPrefs" ;
      public static final String Name = "nameKey";
      public static final String Phone = "phoneKey";
      public static final String Email = "emailKey";
      SharedPreferences sharedpreferences;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          ed1=(EditText)findViewById(R.id.editText);
          ed2=(EditText)findViewById(R.id.editText2);
          ed3=(EditText)findViewById(R.id.editText3);
    
          b1=(Button)findViewById(R.id.button);
          sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  String n  = ed1.getText().toString();
                  String ph  = ed2.getText().toString();
                  String e  = ed3.getText().toString();
    
                  SharedPreferences.Editor editor = sharedpreferences.edit();
    
                  editor.putString(Name, n);
                  editor.putString(Phone, ph);
                  editor.putString(Email, e);
                  editor.apply();
    
                  in = new Intent(MainActivity.this,SecondMain.class);
                  startActivity(in);
              }
          });
      }

  }

```


以下是修改后的主要活动文件src/com.jc2182.demo/SecondMain.java的内容。

```java

package com.jc2182.demo;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class SecondMain extends Activity {
    Button bu=null;
    Button bu2=null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second_main);

        bu=(Button)findViewById(R.id.button2);
        bu2=(Button)findViewById(R.id.button3);
    }

    public  void logout(View view){
        SharedPreferences sharedpreferences = getSharedPreferences(MainActivity.MyPREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.clear();
        editor.apply();
    }

    public void close(View view){
        finish();
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
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="SharedPreference(共享首选项)"
        android:id="@+id/textView"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:textSize="35dp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView2"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:textSize="35dp"
        android:textColor="#ff16ff01" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText"
        android:layout_below="@+id/textView2"
        android:layout_marginTop="67dp"
        android:hint="用户名"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText2"
        android:layout_below="@+id/editText"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true"
        android:hint="密码" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText3"
        android:layout_below="@+id/editText2"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true"
        android:hint="邮箱" />

    <Button
        android:id="@+id/button"
        android:layout_width="80dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/editText3"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="50dp"
        android:text="登录" />

</RelativeLayout>
```

  

  以下是res/layout/second_main.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button2"
        android:layout_width="134dp"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="262dp"
        android:onClick="logout"
        android:text="注销" />

    <Button
        android:id="@+id/button3"
        android:layout_width="124dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button2"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="69dp"
        android:onClick="close"
        android:text="关闭" />

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

  ![](https://www.jc2182.com/images/android/session1.png)

  输入用户名，密码，邮箱登录

  ![](https://www.jc2182.com/images/android/session2.png)

  点击关闭回到第一个登录页面会话数据存储在安卓系统中，登录界面会把第一次输入的当着首选项来填入表单，想要用Android Studio 查看系统文件，可以遵循如下步骤。（如果点击注销会把刚刚提交的会话数据清除掉）

  ![](https://www.jc2182.com/images/android/session3.png)
