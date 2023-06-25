# 拨打电话
  
  Android提供了内置的电话应用程序，在某些情况下，我们可能需要通过我们的应用程序拨打电话。通过将隐式Intent与适当的操作配合使用，可以轻松完成此操作。另外，我们可以使用**PhoneStateListener**和**TelephonyManager**类，以监视设备上某些电话状态的变化。本章列出了创建可用于拨打电话的应用程序的所有简单步骤。您可以通过调用Android的内置“电话呼叫”功能来使用Android Intent拨打电话。以下部分说明了进行调用所需的Intent对象的不同部分。
  
  **意图对象-拨打电话的动作**
  
  您将使用**ACTION_CALL**操作来触发Android设备中可用的内置电话功能。以下是使用**ACTION_CALL**动作创建意图的简单语法
  
```java
  Intent phoneIntent = new Intent(Intent.ACTION_CALL);
```
  
  
  
  您可以使用**ACTION_DIAL**动作，在这种情况下，您可以选择在拨打电话之前修改硬编码的电话号码，而不是直接拨打电话。
  
  **意图对象-拨打电话的数据/类型**
  
  要拨打给定号码91-000-000-0000的电话，您需要使用setData()方法将tel：指定为URI，如下所示-
  
```java
  phoneIntent.setData(Uri.parse("tel:91-000-000-0000"));
```
  
  
  
  有趣的一点是，要拨打电话，您无需指定任何其他数据或数据类型。
  

  
  ## 拨打电话示例
  
  以下示例向您实际展示了如何使用Android Intent拨打给定手机号码的电话。
  
  > 要尝试此示例，您将需要配备最新Android OS的实际移动设备，否则，您将不得不使用可能无法工作的仿真器。
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。
  2. 修改src/MainActivity.java文件并添加所需的代码以进行调用。
  3. 修改布局XML文件res/layout/activity_main.xml可添加任何GUI组件。我在电话号码91-000-000-0000中添加了一个简单的按钮
  4. 如下所示修改 AndroidManifest.xml,以获得拨打电话的权限。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.Manifest;
  import android.app.Activity;
  import android.content.Intent;
  import android.content.pm.PackageManager;
  import android.net.Uri;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  
  import androidx.core.app.ActivityCompat;
  
  

public class MainActivity extends Activity {
 private Button button;

  public static final int REQUEST_CALL_NUM = 10111; //拨号请求码
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      button = (Button) findViewById(R.id.buttonCall);

      button.setOnClickListener(new View.OnClickListener() {
          public void onClick(View arg0) {
              call(Manifest.permission.CALL_PHONE);
          }
      });



  }

  private void call(String string_permission){
      Intent callIntent = new Intent(Intent.ACTION_CALL);
      callIntent.setData(Uri.parse("tel:" + REQUEST_CALL_NUM));

      if (ActivityCompat.checkSelfPermission(MainActivity.this,Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
          // 安卓6.0 需要动态授权
          ActivityCompat.requestPermissions(this, new String[]{string_permission},REQUEST_CALL_NUM);
      }
      startActivity(callIntent);
  }


}
```


以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <Button
        android:id="@+id/buttonCall"
        android:layout_width="159dp"
        android:layout_height="wrap_content"
        android:text="呼叫" />

</LinearLayout>
````



以下是AndroidManifest.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo">
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```



让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/call1.png)

现在使用按钮拨打电话，如下所示，选择'ALLOW'进行动态的授权，回到DEMO的界面，重新点击按钮拨打电话：