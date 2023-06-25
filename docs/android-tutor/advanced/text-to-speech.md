# 文字转语音
  
  Android允许您将文本转换为语音。您不仅可以转换它，还可以用多种不同的语言说文本。Android 为此提供了**TextToSpeech**类。为了使用此类，您需要实例化此类的对象并指定initListener。其语法如下-
  
```java
  private EditText write;
  ttobj=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
     @Override
     public void onInit(int status) {
     }
  });
```
  
  在此侦听器中，您必须指定**TextToSpeech**对象的属性，例如其语言，音高等。可以通过调用setLanguage()方法来设置语言。其语法如下-
  
```java
  ttobj.setLanguage(Locale.UK);
```
  
  setLanguage方法将Locale对象作为参数。下面列出了一些可用的语言环境-
  
  | 语言       | 常量              |
  | ---------- | ----------------- |
  | 美式英语   | **US**            |
  | 加拿大法语 | **CANADA_FRENCH** |
  | 德语       | **GERMANY**       |
  | 意大利语   | **ITALY**         |
  | 日语       | **JAPAN**         |
  | 汉语       | **CHINA**         |
  
  设置语言后，您可以调用该类的**speak**方法讲文本。其语法如下-
  
```java
  ttobj.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null);
```
  
  除speak方法外，TextToSpeech类中还有其他一些方法可用。它们在下面列出-
  
  | 方法                                        | 说明                                         |
  | ------------------------------------------- | -------------------------------------------- |
  | **addSpeech(String text, String filename)** | 此方法在文本字符串和声音文件之间添加映射。   |
  | **getLanguage()**                           | 此方法返回描述语言的Locale实例。             |
  | **isSpeaking()**                            | 此方法检查TextToSpeech引擎是否正在忙于讲话。 |
  | **setPitch(float pitch)**                   | 此方法设置TextToSpeech引擎的语音音调。       |
  | **setSpeechRate(float speechRate)**         | 此方法设置语音速率。                         |
  | **shutdown()**                              | 此方法释放TextToSpeech引擎使用的资源。       |
  | **stop()**                                  | 这种方法停止说话。                           |

## 示例
  
  下面的示例演示TextToSpeech类的用法。它创建了一个基本应用程序，可让您设置书写文字并说出来。要试验此示例，您需要在实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加TextToSpeech代码。
  3. 修改布局XML文件res/layout/activity_main.xml如果需要，可添加任何GUI组件。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.speech.tts.TextToSpeech;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.Toast;
  
  import java.util.Locale;
  
  public class MainActivity extends Activity {
      TextToSpeech t1;
      EditText ed1;
      Button b1;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          ed1=(EditText)findViewById(R.id.editText);
          b1=(Button)findViewById(R.id.button);
  
          t1=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
              @Override
              public void onInit(int status) {
                  if(status != TextToSpeech.ERROR) {
                      t1.setLanguage(Locale.UK);
                  }
              }
          });
  
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  String toSpeak = ed1.getText().toString();
                  Toast.makeText(getApplicationContext(), toSpeak,Toast.LENGTH_SHORT).show();
                  t1.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null);
              }
          });
      }
  
      public void onPause(){
          if(t1 !=null){
              t1.stop();
              t1.shutdown();
          }
          super.onPause();
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
      tools:context=".MainActivity"
      android:transitionGroup="true">
  
      <TextView android:text="文字转语音示例"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:id="@+id/textview"
          android:textSize="35sp"
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
          android:background="#11223300"
          android:layout_below="@+id/textView"
          android:layout_centerHorizontal="true"  />
  
      <EditText
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:id="@+id/editText"
          android:layout_below="@+id/imageView"
          android:layout_marginTop="46dp"
          android:hint="输入文字"
          android:layout_alignParentRight="true"
          android:layout_alignParentEnd="true"
          android:layout_alignParentLeft="true"
          android:layout_alignParentStart="true"
          android:textColor="#ff7aff10"
          android:textColorHint="#ffff23d1" />
  
      <Button
          android:id="@+id/button"
          android:layout_width="130dp"
          android:layout_height="wrap_content"
          android:layout_below="@+id/editText"
          android:layout_centerHorizontal="true"
          android:layout_marginTop="46dp"
          android:text="文字转语音" />
  
  </RelativeLayout>
```
  
  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-
  
  ![](https://www.jc2182.com/images/android/texttospeech1.png)
  
  输入文字，点击按钮，您将听到声音。
  
  ![](https://www.jc2182.com/images/android/texttospeech2.png)
