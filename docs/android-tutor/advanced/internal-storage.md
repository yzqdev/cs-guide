# 内部存储
  
  Android为应用程序提供了多种存储方式来存储其数据。这些存储位置是共享首选项，内部和外部存储，SQLite存储以及通过网络连接的存储。在本章中，我们将研究内部存储。内部存储是私有数据在设备存储器上的存储。默认情况下，这些文件是应用程序私有文件，仅当您删除应用程序时，您的应用程序才能访问它们并删除它们。

## 写文件
  
  为了使用内部存储在文件中写入一些数据，请使用文件名和模式调用openFileOutput()方法。该模式可以是private，public等，其语法如下-
  
```java
  FileOutputStream fOut = openFileOutput("file name here",MODE_WORLD_READABLE);
```
  
  方法openFileOutput()返回FileOutputStream的实例。因此，您可以在FileInputStream对象中接收它。之后，您可以调用write方法在文件上写入数据。其语法如下-
  
```java
  String str = "data";
  fOut.write(str.getBytes());
  fOut.close();
```
  
## 读取文件
  
  为了从刚刚创建的文件中读取，请使用文件名调用openFileInput()方法。它返回FileInputStream的实例。其语法如下-
  
```java
  FileInputStream fin = openFileInput(file);
```
  
  之后，您可以调用read方法从文件中一次读取一个字符，然后进行打印。其语法如下-
  
```java
  int c;
  String temp="";
  while( (c = fin.read()) != -1){
     temp = temp + Character.toString((char)c);
  }
  
  //string temp contains all the data of the file.
  fin.close();
```
  
  除了write和close方法外，FileOutputStream类还提供了其他方法来更好地写入和读取文件。这些方法在下面列出-
  
  | 方法                                                    | 说明                                                                    |
  | ------------------------------------------------------- | ----------------------------------------------------------------------- |
  | **FileOutputStream(File file, boolean append)**         | 此方法构造一个新的FileOutputStream写入文件。                            |
  | **getChannel()**                                        | 此方法返回一个只写FileChannel，与该流共享其位置。                       |
  | **getFD()**                                             | 此方法返回基础文件描述符。                                              |
  | **write(byte[] buffer, int byteOffset, int byteCount)** | 此方法从字节数组缓冲区的位置偏移处开始将计数字节写入此流。              |
  | **available()**                                         | 此方法返回估计的字节数，可以读取或跳过这些字节而不会阻塞以获得更多输入  |
  | **getChannel()**                                        | 此方法返回一个只读FileChannel，与该流共享其位置                         |
  | **getFD()**                                             | 此方法返回基础文件描述符                                                |
  | **read(byte[] buffer, int byteOffset, int byteCount)**  | 此方法从此流中读取最大长度的字节，并将其存储在从offset开始的字节数组b中 |

## 示例
  
  这是一个示例，演示了如何使用内部存储来存储和读取文件。它创建一个基本的存储应用程序，使您可以从内部存储读取和写入。要试验该示例，您可以在实际设备或仿真器上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件添加必要代码。
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;

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
      private String file = "mydata";
    
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
                      Toast.makeText(getBaseContext(),"文件保存",Toast.LENGTH_SHORT).show();
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
                      String temp="";
                      while( (c = fin.read()) != -1){
                          temp = temp + (char) c;
                      }
                      tv.setText(temp);
                      Toast.makeText(getBaseContext(),"文件读取",Toast.LENGTH_SHORT).show();
                  }
                  catch(Exception e){
                  }
              }
          });
      }

  }

```

以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView android:text="内部存储示例"
        android:layout_width="wrap_content"
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
        android:layout_marginTop="6dp"
        android:text="蝴蝶教程"
        android:textColor="#ff7aff24"
        android:textSize="35dp" />

    <Button
        android:id="@+id/button"
        android:layout_width="60dp"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/textView"
        android:layout_alignLeft="@+id/textView"
        android:layout_alignParentBottom="true"
        android:layout_marginStart="-67dp"
        android:layout_marginLeft="-67dp"
        android:layout_marginBottom="4dp"
        android:text="保存" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText"
        android:hint="输入文本"
        android:focusable="true"
        android:textColorHighlight="#ff7eff15"
        android:textColorHint="#ffff25e6"
        android:layout_below="@+id/imageView"
        android:layout_alignRight="@+id/textView"
        android:layout_alignEnd="@+id/textView"
        android:layout_marginTop="42dp"
        android:layout_alignLeft="@+id/imageView"
        android:layout_alignStart="@+id/imageView" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:layout_below="@+id/textView"
        android:background="#22552200"
        android:layout_centerHorizontal="true" />

    <Button
        android:id="@+id/button2"
        android:layout_width="51dp"
        android:layout_height="wrap_content"
        android:layout_alignTop="@+id/button"
        android:layout_alignEnd="@+id/editText"
        android:layout_alignRight="@+id/editText"
        android:layout_marginTop="3dp"
        android:text="加载" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="读取"
        android:id="@+id/textView2"
        android:layout_below="@+id/editText"
        android:layout_toLeftOf="@+id/button2"
        android:layout_toStartOf="@+id/button2"
        android:textColor="#ff5bff1f"
        android:textSize="25dp" />

</RelativeLayout>
```

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/internalstorage1.png)

  输入数据，点 保存，然后加载-

  ![](https://www.jc2182.com/images/android/internalstorage2.png)

  出现如下视图-

  ![](https://www.jc2182.com/images/android/internalstorage3.png)
