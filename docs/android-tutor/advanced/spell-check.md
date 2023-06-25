# 拼写检查器
  
  Android平台提供了拼写检查器框架，可让您在应用程序中实施和访问拼写检查。为了使用拼写检查器，您需要实现**SpellCheckerSessionListener**接口并覆盖其方法。其语法如下-
  
```java
  public class HelloSpellCheckerActivity extends Activity implements SpellCheckerSessionListener {
     @Override
     public void onGetSuggestions(final SuggestionsInfo[] arg0) {
        // TODO Auto-generated method stub
     }
  
     @Override
     public void onGetSentenceSuggestions(SentenceSuggestionsInfo[] arg0) {
        // TODO Auto-generated method stub
     }
  }
```
  
  
  
  接下来，您需要创建一个**SpellCheckerSession**类的对象。可以通过调用**TextServicesManager**类的**newSpellCheckerSession**方法来实例化此对象。此类处理应用程序和文本服务之间的交互。您需要请求系统服务以实例化它。其语法如下-
  
```java
  private SpellCheckerSession mScs;
  final TextServicesManager tsm = (TextServicesManager) getSystemService(
  Context.TEXT_SERVICES_MANAGER_SERVICE);
  mScs = tsm.newSpellCheckerSession(null, null, this, true);   
```
  
  
  
  您需要做的最后一件事是调用**getSuggestions**方法以获取您想要的任何文本的建议。这些建议将传递到**onGetSuggestions**方法上，您可以在其中执行任何所需的操作。
  
```java
  mScs.getSuggestions(new TextInfo(editText1.getText().toString()), 3);  
```
  
  
  
  此方法有两个参数。第一个参数是文本信息对象形式的字符串，第二个参数是用于区分建议的cookie编号。除了这些方法外，SpellCheckerSession类还提供了其他方法，可以更好地处理建议。这些方法在下面列出-
  
  | 方法                                                                   | 说明                                                             |
  | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
  | **cancel()**                                                           | 取消待处理且正在运行的拼写检查任务                               |
  | **close()**                                                            | 完成此会话，并允许TextServicesManagerService断开绑定的拼写检查器 |
  | **getSentenceSuggestions(TextInfo[] textInfos, int suggestionsLimit)** | 从指定的句子中获取建议                                           |
  | **getSpellChecker()**                                                  | 获取此拼写检查器会话具有的拼写检查器服务信息。                   |
  | **isSessionDisconnected()**                                            | 如果与该会话的文本服务的连接已断开并且未激活，则为True。         |


  
  ## 示例
  
  这是演示拼写检查器用法的示例。它创建了一个基本的拼写检查应用程序，使您可以编写文本并获得建议。要试验此示例，可以在实际设备或仿真器中运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加必要的代码。
  3. 修改res/layout/main以添加相应的XML组件
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Context;
  import android.os.Bundle;
  import android.view.View;
  import android.view.textservice.SentenceSuggestionsInfo;
  import android.view.textservice.SpellCheckerSession;
  import android.view.textservice.SuggestionsInfo;
  import android.view.textservice.TextInfo;
  import android.view.textservice.TextServicesManager;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.TextView;
  import android.widget.Toast;

  public class MainActivity extends Activity implements SpellCheckerSession.SpellCheckerSessionListener {
      Button b1;
      TextView tv1;
      EditText ed1;
      private SpellCheckerSession mScs;

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1=(Button)findViewById(R.id.button);
          tv1=(TextView)findViewById(R.id.textView3);
    
          ed1=(EditText)findViewById(R.id.editText);
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  Toast.makeText(getApplicationContext(), ed1.getText().toString(),Toast.LENGTH_SHORT).show();
                  TextInfo item =  new TextInfo(ed1.getText().toString());
                  //TextInfo[] ti = {item};
                  mScs.getSuggestions(item, 3);
              }
          });
      }
    
      public void onResume() {
          super.onResume();
          final TextServicesManager tsm = (TextServicesManager) getSystemService(Context.TEXT_SERVICES_MANAGER_SERVICE);
          mScs = tsm.newSpellCheckerSession(null, null, this, true);
      }
    
      public void onPause() {
          super.onPause();
          if (mScs != null) {
              mScs.close();
          }
      }
    
      public void onGetSuggestions(final SuggestionsInfo[] arg0) {
          final StringBuilder sb = new StringBuilder();
    
          for (int i = 0; i < arg0.length; ++i) {
              // Returned suggestions are contained in SuggestionsInfo
              final int len = arg0[i].getSuggestionsCount();
              sb.append('\n');
    
              for (int j = 0; j < len; ++j) {
                  sb.append("," + arg0[i].getSuggestionAt(j));
              }
    
              sb.append(" (" + len + ")");
          }
    
          runOnUiThread(new Runnable() {
              public void run() {
                  tv1.append(sb.toString());
              }
          });
      }
    
      @Override
      public void onGetSentenceSuggestions(SentenceSuggestionsInfo[] arg0) {
    
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
        android:id="@+id/textview"
        android:layout_width="343dp"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="3dp"
        android:text="拼写检查示例 "
        android:textSize="35dp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView"
        android:layout_below="@+id/textview"
        android:layout_centerHorizontal="true"
        android:textColor="#ff7aff24"
        android:textSize="35dp" />

    <Button
        android:id="@+id/button"
        android:layout_width="108dp"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="4dp"
        android:text="建议" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText"
        android:hint="Enter Text"
        android:layout_above="@+id/button"
        android:layout_marginBottom="56dp"
        android:focusable="true"
        android:textColorHighlight="#ff7eff15"
        android:textColorHint="#ffff25e6"
        android:layout_alignRight="@+id/textview"
        android:layout_alignEnd="@+id/textview"
        android:layout_alignLeft="@+id/textview"
        android:layout_alignStart="@+id/textview" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:layout_below="@+id/textView"
        android:background="#22113322"
        android:layout_centerHorizontal="true" />

    <TextView
        android:id="@+id/textView3"
        android:gravity="start"
        android:layout_width="325dp"
        android:layout_height="308dp"
        android:layout_below="@+id/imageView"
        android:layout_alignLeft="@+id/imageView"
        android:layout_marginLeft="-11dp"
        android:layout_marginTop="8dp"
        android:text="建议"
        android:textSize="25sp" />

</RelativeLayout>
```

  

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/spellingchecker1.png)

  尝试多次输入，点击建议

  ![](https://www.jc2182.com/images/android/spellingchecker2.png)
