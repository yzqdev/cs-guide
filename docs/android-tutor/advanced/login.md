# 登录界面
  
  登录应用程序是询问您的凭据以登录某些特定应用程序的屏幕。登录微信，QQ，淘宝等时，您可能已经看到了本章介绍了如何创建登录屏幕以及在进行错误尝试时如何管理安全性。首先，您必须定义两个TextView询问用户名和用户密码。密码TextView必须将inputType设置为password。其语法如下-
  
```xml
  <EditText
     android:id = "@+id/editText2"
     android:layout_width = "wrap_content"
     android:layout_height = "wrap_content"
     android:inputType = "textPassword" />
  
  <EditText
     android:id = "@+id/editText1"
     android:layout_width = "wrap_content"
     android:layout_height = "wrap_content"
  />
```
  
  定义一个带有登录文本的按钮并设置其onClick属性。之后，定义java文件中onClick属性中提到的函数。
  
```xml
  <Button
     android:id = "@+id/button1"
     android:layout_width = "wrap_content"
     android:layout_height = "wrap_content"
     android:onClick = "login"
     android:text = "@string/Login" 
  />
```
  
  在java文件中，在onClick方法内部，使用getText()和toString()方法获取用户名和密码文本，并使用equals()函数将其与文本匹配。
  
```java
  EditText username = (EditText)findViewById(R.id.editText1);
  EditText password = (EditText)findViewById(R.id.editText2);             
  
  public void login(View view){
     if(username.getText().toString().equals("admin") && password.getText().toString().equals("admin")){
  
     //验证成功 登录
     }else{
     //验证错误处理
  }       
```
  
  您需要做的最后一件事是提供一种安全机制，以便避免不必要的尝试。为此，初始化变量，并在每次错误尝试时将其减小。当它达到0时，禁用登录按钮。
  
```java
  int counter = 3;
  counter--;
  
  if(counter==0){
     //关闭按钮，关闭应用程序
  }
```
  
## 示例
  
  这是演示登录应用程序的示例。它创建一个基本的应用程序，仅给您三种尝试登录应用程序的机会。 要试验该示例，您可以在实际设备或仿真器上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加必要的代码。
  3. 修改res/layout/activity_main以添加相应的XML组件
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.graphics.Color;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.TextView;
  import android.widget.Toast;

  public class MainActivity extends Activity {

      Button b1,b2;
      EditText ed1,ed2;
    
      TextView tx1;
      int counter = 3;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1 = (Button)findViewById(R.id.button);
          ed1 = (EditText)findViewById(R.id.editText);
          ed2 = (EditText)findViewById(R.id.editText2);
    
          b2 = (Button)findViewById(R.id.button2);
          tx1 = (TextView)findViewById(R.id.textView3);
          tx1.setVisibility(View.GONE);
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  if(ed1.getText().toString().equals("admin") &&
                          ed2.getText().toString().equals("admin")) {
                      Toast.makeText(getApplicationContext(), "登录成功跳转...",Toast.LENGTH_SHORT).show();
                  }else{
                      Toast.makeText(getApplicationContext(), "登录验证失败",Toast.LENGTH_SHORT).show();
                      tx1.setVisibility(View.VISIBLE);
                      tx1.setBackgroundColor(Color.RED);
                      counter--;
                      tx1.setText(Integer.toString(counter));
    
                      if (counter == 0) {
                          b1.setEnabled(false);
                      }
                  }
              }
          });
    
          b2.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  finish();
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

    <TextView
        android:text="登录界面示例"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/textview"
        android:textSize="35dp"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="198dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textview"
        android:layout_centerHorizontal="true"
        android:text="蝴蝶教程"
        android:textColor="#ff7aff24"
        android:textSize="35dp" />

    <Button
        android:id="@+id/button"
        android:layout_width="94dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_centerHorizontal="true"
        android:text="下载" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:background="#11EE22bb"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true" />

    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleLarge"
        android:layout_width="272dp"
        android:layout_height="362dp"
        android:layout_below="@+id/button"
        android:layout_alignStart="@+id/textview"
        android:layout_alignLeft="@+id/textview"
        android:layout_alignEnd="@+id/textView"
        android:layout_alignRight="@+id/textView"
        android:layout_alignParentBottom="true"
        android:layout_marginEnd="-30dp"
        android:layout_marginRight="-30dp"
        android:layout_marginBottom="7dp"
        android:progressDrawable="@drawable/circular_progress_bar" />

</RelativeLayout>
```

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/login1.png)

  尝试去登录 去尝试，去试错，查看效果
