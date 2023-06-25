# 剪贴板
  
  Android提供了剪贴板框架，用于和粘贴不同类型的数据。数据可以是文本，图像，二进制流数据或其他复杂的数据类型。Android提供了**ClipboardManager**库，ClipData库和ClipData.item库来使用和粘贴框架。要使用剪贴板框架，需要将数据放入clip对象，然后将该对象放入系统范围的剪贴板。为了使用剪贴板，您需要通过调用getSystemService()方法实例化ClipboardManager的对象。其语法如下-
  
```java
  ClipboardManager myClipboard;
  myClipboard = (ClipboardManager)getSystemService(CLIPBOARD_SERVICE);
```
  
## 数据
  
  您需要做的下一件事是通过调用ClipData类的相应数据方法类型来实例化ClipData对象。对于文本数据，将调用**newPlainText**方法。之后，您必须将该数据设置为Clipboard Manager对象的剪辑，其语法如下所示-
  
```java
  ClipData myClip;
  String text = "hello world";
  myClip = ClipData.newPlainText("text", text);
  myClipboard.setPrimaryClip(myClip);
```
  
  ClipData对象可以采用这三种形式，以下函数用于创建这些形式。
  
  | 形式 | 方法                             | 说明                                                                |
  | ---- | -------------------------------- | ------------------------------------------------------------------- |
  | 文本 | **newPlainText(label, text)**    | 返回一个ClipData对象，该对象的单个ClipData.Item对象包含文本字符串。 |
  | URI  | **newUri(resolver, label, URI)** | 返回一个ClipData对象，该对象的单个ClipData.Item对象包含一个URI。    |
  | 意图 | **newIntent(label, intent)**     | 返回一个ClipData对象，其单个ClipData.Item对象包含一个Intent。       |
  
## 粘贴数据
  
  为了粘贴数据，我们将首先通过调用getPrimaryClip()方法获取剪贴板。然后从该单击中，我们将在ClipData.Item对象中获得该项目。然后从对象中获取数据。其语法如下-
  
```java
  ClipData abc = myClipboard.getPrimaryClip();
  ClipData.Item item = abc.getItemAt(0);
  String text = item.getText().toString();
```
  
  除了这些方法之外，ClipboardManager类还提供了其他方法来管理剪贴板框架。这些方法在下面列出-
  
  | 方法                              | 说明                                                       |
  | --------------------------------- | ---------------------------------------------------------- |
  | **getPrimaryClip()**              | 此方法仅返回剪贴板上的当前主剪辑                           |
  | **getPrimaryClipDescription()**   | 此方法返回剪贴板上当前主剪辑的描述，但不返回其数据的副本。 |
  | **hasPrimaryClip()**              | 如果剪贴板上当前有一个主剪辑，则此方法返回true             |
  | **setPrimaryClip(ClipData clip)** | 此方法在剪贴板上设置当前的主剪辑                           |
  | **setText(CharSequence text)**    | 此方法可以直接用于将文本到剪贴板                           |
  | **getText()**                     | 此方法可以直接用于从剪贴板获取的文本                       |
  
## 示例
  
  这是一个演示**ClipboardManager**类的用法的示例。它创建一个基本的粘贴应用程序，该应用程序允许您文本，然后通过剪贴板将其粘贴。要试验此示例，可以在实际设备或仿真器中运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件添加必要代码。
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
package com.jc2182.demo;
 
  

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

              myClip = ClipData.newPlainText("text", text);
              myClipboard.setPrimaryClip(myClip);

              Toast.makeText(getApplicationContext(), "文本已", Toast.LENGTH_SHORT).show();
          }
      });

      b2.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              ClipData abc = myClipboard.getPrimaryClip();
              ClipData.Item item = abc.getItemAt(0);

              String text = item.getText().toString();
              ed2.setText(text);

              Toast.makeText(getApplicationContext(), "文本已粘贴",
                      Toast.LENGTH_SHORT).show();
          }
      });
  }

}

```

以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView android:text="剪贴板示例" android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/textview"
        android:textSize="35dp"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView"
        android:layout_below="@+id/textview"
        android:layout_centerHorizontal="true"
        android:textColor="#ff7aff24"
        android:textSize="35dp" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:layout_below="@+id/textView"
        android:background="#22221100"
        android:layout_centerHorizontal="true" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true"
        android:hint="文本"
        android:layout_below="@+id/imageView"
        android:layout_alignLeft="@+id/imageView"
        android:layout_alignStart="@+id/imageView" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText2"
        android:layout_alignLeft="@+id/editText"
        android:layout_alignStart="@+id/editText"
        android:hint="粘贴文本"
        android:layout_below="@+id/editText"
        android:layout_alignRight="@+id/editText"
        android:layout_alignEnd="@+id/editText" />

    <Button
        android:id="@+id/button"
        android:layout_width="76dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/editText2"
        android:layout_alignStart="@+id/editText2"
        android:layout_alignLeft="@+id/editText2"
        android:text="文本" />

    <Button
        android:id="@+id/button2"
        android:layout_width="73dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/editText2"
        android:layout_alignEnd="@+id/editText2"
        android:layout_alignRight="@+id/editText2"
        android:text="粘贴文本" />

</RelativeLayout>
````

让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/clipboard1.png)

> 在demo中尝试输入，点击按钮测试功能。
