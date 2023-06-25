# 发送电子邮件
  
  电子邮件是通过电子方式从一个系统用户通过网络分发给一个或多个收件人的消息。
  
  在开始电子邮件活动之前，您必须了解具有意图的电子邮件功能，意图是将数据从一个组件携带到应用程序内或应用程序外部。要从您的应用程序发送电子邮件，您无需从一开始就实现电子邮件客户端，但是您可以使用现有的电子邮件客户端，例如Android，Gmail，Outlook，K-9Mail等提供的默认电子邮件应用程序。为此为此，我们需要编写一个活动，以使用具有正确操作和数据的隐式Intent启动电子邮件客户端。在此示例中，我们将使用启动现有电子邮件客户端的Intent对象从应用程序发送电子邮件。
  
  下一节说明了发送电子邮件所需的Intent对象的不同部分。
  
## Indent 对象-发送电子邮件的数据/类型
  
  要发送电子邮件，您需要使用setData()方法将mailto：指定为URI，并且使用setType()方法将数据类型转换为text/plain，如下所示-
  
```java
  emailIntent.setData(Uri.parse("mailto:"));
  emailIntent.setType("text/plain");
```
  
## Indent 对象-发送电子邮件的动作 ACTION_SEND
  
  您将使用**ACTION_SEND**操作启动安装在Android设备上的电子邮件客户端。以下是使用ACTION_SEND操作创建意图的简单语法。
  
```java
  Intent emailIntent = new Intent(Intent.ACTION_SEND);
```
  
## Indent 对象-附加额外数据电子邮件到意图发送
  
  Android内置支持添加TO，SUBJECT，CC，TEXT等字段，这些字段可以在将意图发送到目标电子邮件客户端之前附加到该意图。您可以在电子邮件中使用以下额外字段-
  
  | 额外数据            | 说明                                                                                              |
  | ------------------- | ------------------------------------------------------------------------------------------------- |
  | **EXTRA_BCC**       | 包含电子邮件地址的String[]，该地址应为密件抄写。                                                  |
  | **EXTRA_CC**        | 一个String[]，其中包含应复印的电子邮件地址。                                                      |
  | **EXTRA_EMAIL**     | 一个String[]，用于保存应该发送到的电子邮件地址。                                                  |
  | **EXTRA_HTML_TEXT** | 与Intent关联的常量String，与ACTION_SEND一起使用，以提供EXTRA_TEXT的替代形式，作为HTML格式的文本。 |
  | **EXTRA_SUBJECT**   | 一个常量字符串，包含消息的所需主题行。                                                            |
  | **EXTRA_TEXT**      | 与Intent关联的常量CharSequence，与ACTION_SEND一起使用以提供要发送的文字数据。                     |
  | **EXTRA_TITLE**     | 与ACTION_CHOOSER一起使用时提供给用户的CharSequence对话框标题。                                    |
  
  这是一个示例，向您展示如何为意图分配额外的数据-
  
```java
  emailIntent.putExtra(Intent.EXTRA_EMAIL  , new String[]{"Recipient"});
  emailIntent.putExtra(Intent.EXTRA_SUBJECT, "subject");
  emailIntent.putExtra(Intent.EXTRA_TEXT   , "Message Body");
```
  
  上面代码的输出类似如下图所示
  
  ![](https://www.jc2182.com/images/android/email1.jpg)
  
## 发送电子邮件示例
  
  下面的示例实际向您展示了如何使用Intent对象启动Email客户端以将电子邮件发送给给定的收件人。
  
  > 要通过电子邮件发送该示例的实验，您将需要配备最新Android OS的实际移动设备（真机），否则可能会遇到无法正常运行的模拟器的困扰。其次，您需要在设备上安装一个电子邮件客户端，例如GMail（默认情况下，每个Android版本具有Gmail客户端应用）或K9mail。
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。
  2. 修改src/MainActivity.java文件并添加所需的代码以发送电子邮件。
  3. 修改布局XML文件res/layout/activity_main.xml可添加任何GUI组件。我添加了一个简单的按钮来启动电子邮件客户端。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
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

 
      Button startBtn = (Button) findViewById(R.id.sendEmail);
      startBtn.setOnClickListener(new View.OnClickListener() {
          public void onClick(View view) {
              sendEmail();
          }
      });
  }

  protected void sendEmail() {
      Log.i("发送邮件", "");
      String[] TO = {""};
      String[] CC = {""};
      Intent emailIntent = new Intent(Intent.ACTION_SEND);

      emailIntent.setData(Uri.parse("mailto:"));
      emailIntent.setType("text/plain");
      emailIntent.putExtra(Intent.EXTRA_EMAIL, TO);
      emailIntent.putExtra(Intent.EXTRA_CC, CC);
      emailIntent.putExtra(Intent.EXTRA_SUBJECT, "您的标题");
      emailIntent.putExtra(Intent.EXTRA_TEXT, "这里是邮件消息");

      try {
          startActivity(Intent.createChooser(emailIntent, "Send mail..."));
          finish();
          Log.i("邮件发送完成...", "");
      } catch (android.content.ActivityNotFoundException ex) {
          Toast.makeText(MainActivity.this, "没有安装电子邮件客户端。", Toast.LENGTH_SHORT).show();
      }
  }
 

}

```

以下是res/layout/activity_main.xml文件的内容-

```xml

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="发送邮件示例"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:textSize="30dp" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:textColor="#ff87ff09"
        android:textSize="30dp"
        android:layout_above="@+id/imageButton"
        android:layout_alignRight="@+id/imageButton"
        android:layout_alignEnd="@+id/imageButton" />

    <ImageButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageButton"
        android:src="@drawable/logo"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true" />

    <Button
        android:id="@+id/sendEmail"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="撰写电子邮件"/>

</LinearLayout>
```

让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/email2.png)

点击“撰写电子邮件”按钮

![](https://www.jc2182.com/images/android/email3.png)

选择“Gmail”电子邮件客户端，出现如下界面
