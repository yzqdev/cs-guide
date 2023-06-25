# 发送短信
  
  在Android中，您可以使用SmsManager API或设备内置的SMS应用程序来发送SMS。在本教程中，我们向您展示了两个发送SMS消息的基本示例-
  
  **SmsManager API**
  
```java
  SmsManager smsManager = SmsManager.getDefault();
  smsManager.sendTextMessage("phoneNo", null, "sms message", null, null);
```
  
  *内置短信应用*
  
```java
  Intent sendIntent = new Intent(Intent.ACTION_VIEW);
  sendIntent.putExtra("短信体", "默认内容"); 
  sendIntent.setType("vnd.android-dir/mms-sms");
  startActivity(sendIntent);
```
  
  当然，两者都需要**SEND_SMS**权限。
  
```xml
  <uses-permission android:name="android.permission.SEND_SMS" />
```
  
  除了上述方法外，SmsManager类中还有一些其他重要函数可用。这些方法在下面列出-
  
  | 函数                                                                                                                                                                                          | 说明                                                                 |
  | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
  | **`ArrayList <String>  divideMessage(String text)`**                                                                                                                                          | 此方法将消息文本分为几个片段，最大不超过最大<b>**SMS**</b>消息大小。 |
  | **static SmsManager getDefault()**                                                                                                                                                            | 此方法用于获取SmsManager的默认实例                                   |
  | **void sendDataMessage(String destinationAddress, String scAddress, short destinationPort, byte[] data, PendingIntent sentIntent, PendingIntent deliveryIntent)**                             | 此方法用于将基于数据的SMS发送到特定的应用程序端口。                  |
  | **void sendMultipartTextMessage(String destinationAddress, String scAddress, ArrayList`<String>` parts, ArrayList`<PendingIntent>` sentIntents, ArrayList`<PendingIntent>` deliveryIntents)** | 发送基于文本的多部分短信。                                           |
  | **void sendTextMessage(String destinationAddress, String scAddress, String text, PendingIntent sentIntent, PendingIntent deliveryIntent)**                                                    | 发送基于文本的SMS。                                                  |
  
## 发送短信示例
  
  以下示例向您实际展示如何使用**SmsManager**对象将SMS发送到给定的手机号码。
  
  > 要尝试此示例，您将需要配备最新Android OS的实际移动设备，否则，您将不得不使用可能无法工作的仿真器。
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。
  2. 修改src/MainActivity.java文件并添加所需的代码以发送短信。
  3. 修改布局XML文件res/layout/activity_main.xml可添加任何GUI组件。我添加了一个简单的GUI来接收手机号码和SMS文本，以及一个简单的按钮来发送SMS。
  4. 如下所示修改 AndroidManifest.xml,以获得发送短信的权限。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.Manifest;
  import android.app.Activity;
  import android.content.pm.PackageManager;
  import android.os.Bundle;
  import android.telephony.SmsManager;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.Toast;
  
  import androidx.core.app.ActivityCompat;
  import androidx.core.content.ContextCompat;
   
  

public class MainActivity extends Activity {
 private static final int MY_PERMISSIONS_REQUEST_SEND_SMS =0 ;
 Button sendBtn;
 EditText txtphoneNo;
 EditText txtMessage;
 String phoneNo;
 String message;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      sendBtn = (Button) findViewById(R.id.btnSendSMS);
      txtphoneNo = (EditText) findViewById(R.id.editText);
      txtMessage = (EditText) findViewById(R.id.editText2);

      sendBtn.setOnClickListener(new View.OnClickListener() {
          public void onClick(View view) {
              sendSMSMessage();
          }
      });
  }

  protected void sendSMSMessage() {
      phoneNo = txtphoneNo.getText().toString();
      message = txtMessage.getText().toString();

      if (ContextCompat.checkSelfPermission(this,
              Manifest.permission.SEND_SMS)
              != PackageManager.PERMISSION_GRANTED) {
          if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                  Manifest.permission.SEND_SMS)) {
          } else {
              ActivityCompat.requestPermissions(this,
                      new String[]{Manifest.permission.SEND_SMS},
                      MY_PERMISSIONS_REQUEST_SEND_SMS);
          }
      }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode,String permissions[], int[] grantResults) {
      switch (requestCode) {
          case MY_PERMISSIONS_REQUEST_SEND_SMS: {
              if (grantResults.length > 0
                      && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                  SmsManager smsManager = SmsManager.getDefault();
                  smsManager.sendTextMessage(phoneNo, null, message, null, null);
                  Toast.makeText(getApplicationContext(), "SMS sent.",
                          Toast.LENGTH_LONG).show();
              } else {
                  Toast.makeText(getApplicationContext(),
                          "SMS faild, please try again.", Toast.LENGTH_LONG).show();
                  return;
              }
          }
      }

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
    tools:context="MainActivity">

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="91dp"
        android:text="发送短信示例"
        android:textSize="30dp" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="278dp"
        android:layout_height="53dp"
        android:layout_below="@+id/textView1"
        android:layout_alignEnd="@+id/imageButton"
        android:layout_alignRight="@+id/imageButton"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="10dp"
        android:layout_marginEnd="37dp"
        android:layout_marginRight="37dp"
        android:text="蝴蝶教程"
        android:textColor="#ff87ff09"
        android:textSize="30dp" />

    <ImageButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageButton"
        android:src="@drawable/logo"
        android:layout_below="@+id/textView2"
        android:layout_centerHorizontal="true" />

    <EditText
        android:id="@+id/editText"
        android:layout_width="160dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageButton"
        android:layout_centerHorizontal="true"
        android:hint="输入您的电话号码"
        android:phoneNumber="true"
        android:textColorHint="@color/abc_primary_text_material_dark" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText2"
        android:layout_below="@+id/editText"
        android:layout_alignLeft="@+id/editText"
        android:layout_alignStart="@+id/editText"
        android:textColorHint="@color/abc_primary_text_material_dark"
        android:layout_alignRight="@+id/imageButton"
        android:layout_alignEnd="@+id/imageButton"
        android:hint="输入您的短信" />

    <Button
        android:id="@+id/btnSendSMS"
        android:layout_width="108dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/editText2"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="48dp"
        android:text="发送短信" />

</RelativeLayout>
```

以下是AndroidManifest.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo">

    <uses-permission android:name="android.permission.SEND_SMS" />

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

![](https://www.jc2182.com/images/android/sms1.png)

现在，您可以输入所需的手机号码，并在该号码上发送短信。最后，点击发送短信按钮发送您的短信。确保您的GSM/CDMA连接正常，可以将SMS传送给接收者。您可以用逗号分隔多个SMS，然后在程序内部将它们解析为数组字符串，最后可以使用循环将消息发送给所有给定数字。这样便可以编写自己的SMS客户端。下一节将向您展示如何使用现有的SMS客户端发送SMS。

## 使用内置意图发送短信
  
  您可以通过调用Android的内置SMS功能，使用Android Intent发送SMS。下一节说明了发送SMS所需的Intent对象的不同部分。
  
  *意图对象-发送短信的动作*
  
  您将使用 ACTION_VIEW 操作启动安装在Android设备上的SMS客户端。以下是使用 ACTION_VIEW 操作创建意图的简单语法。
  
```java
  Intent smsIntent = new Intent(Intent.ACTION_VIEW);
```
  
  *意图对象-发送短信的数据/类型*
  
  要发送短信，您需要使用setData() 方法将smsto ：指定为URI，并且使用setType() 方法将数据类型设置为vnd.android-dir/mms-sms，如下所示-
  
```java
  smsIntent.setData(Uri.parse("smsto:"));
  smsIntent.setType("vnd.android-dir/mms-sms");
```
  
  *意图对象-附加数据发送短信*
  
  Android内置支持添加电话号码和短信以发送短信，如下所示：
  
```java
  smsIntent.putExtra("address"  , new String("0123456789;3393993300"));
  smsIntent.putExtra("sms_body"  , "Test SMS to Angilla");
```
  
  > 这里的address和sms_body区分大小写，并且只能以小写字母指定。您可以在单个字符串中指定多个数字，但以分号（;）分隔。
  
  *示例：：：*
  
  下面的示例向您实际展示如何使用Intent对象启动SMS客户端，以将SMS发送给给定的收件人。
  
  > 要尝试此示例，您将需要配备最新Android OS的实际移动设备，否则，您将不得不使用可能无法工作的仿真器。
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。
  2. 修改src/MainActivity.java文件并添加所需的代码以发送SMS。
  3. 修改布局XML文件res/layout/activity_main.xml可添加任何GUI组件。我添加了一个简单的按钮来启动SMS客户端。
  4. 如下所示修改 AndroidManifest.xml,以获得发送短信的权限。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
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


      Button startBtn = (Button) findViewById(R.id.button);
      startBtn.setOnClickListener(new View.OnClickListener() {
          public void onClick(View view) {
              sendSMS();
          }
      });
  }

  protected void sendSMS() {
      Log.i("发送短信", "");
      Intent smsIntent = new Intent(Intent.ACTION_VIEW);

      smsIntent.setData(Uri.parse("smsto:"));
      smsIntent.setType("vnd.android-dir/mms-sms");
      smsIntent.putExtra("address"  , new String ("01234"));
      smsIntent.putExtra("sms_body"  , "Test ");

      try {
          startActivity(smsIntent);
          finish();
          Log.i("完成短信发送...", "");
      } catch (android.content.ActivityNotFoundException ex) {
          Toast.makeText(MainActivity.this,
                  "SMS faild, please try again later.", Toast.LENGTH_SHORT).show();
      }
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
        android:text="发送短信示例"
        android:id="@+id/textView"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:textSize="30dp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程 "
        android:id="@+id/textView2"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:textSize="30dp"
        android:textColor="#ff14be3c" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:layout_marginTop="48dp"
        android:layout_below="@+id/textView2"
        android:background="#002233"
        android:layout_centerHorizontal="true" />

    <Button
        android:id="@+id/button"
        android:layout_width="285dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_alignStart="@+id/imageView"
        android:layout_alignLeft="@+id/imageView"
        android:layout_alignRight="@+id/textView2"
        android:layout_marginStart="36dp"
        android:layout_marginLeft="36dp"
        android:layout_marginTop="6dp"
        android:layout_marginRight="-70dp"
        android:text="撰写短信" />

</RelativeLayout>
```

以下是AndroidManifest.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo">

    <uses-permission android:name="android.permission.SEND_SMS" />

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

> 您可以在真实设备上测试此例！
