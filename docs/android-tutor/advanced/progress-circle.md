# 进度圈
  
  进行进度圈的最简单方法是使用名为**ProgressDialog**的类。加载栏也可以通过该类制作。条形和圆形之间唯一的逻辑区别是，当您知道等待特定任务的总时间时使用前者，而当您不知道等待时间时使用后者。为此，您需要实例化此类的对象。它的语法是。
  
```java
  ProgressDialog progress = new ProgressDialog(this);
```
  
  
  
  现在，您可以设置此对话框的某些属性。例如，其样式，其文字等
  
```java
  progress.setMessage("Downloading Music :) ");
  progress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
  progress.setIndeterminate(true);
```
  
  
  
  除了这些方法外，**ProgressDialog**类还提供其他方法。
  
  | 方法                                                                | 说明                                     |
  | ------------------------------------------------------------------- | ---------------------------------------- |
  | **getMax()**                                                        | 此方法返回进度的最大值                   |
  | **incrementProgressBy(int diff)**                                   | 此方法将进度条增加作为参数传递的值的差   |
  | **setIndeterminate(boolean indeterminate)**                         | 此方法将进度指示器设置为“确定”或“不确定” |
  | **setMax(int max)**                                                 | 此方法设置进度对话框的最大值             |
  | **setProgress(int value)**                                          | 此方法用于使用某些特定值更新进度对话框   |
  | **show(Context context, CharSequence title, CharSequence message)** | 这是一种静态方法，用于显示进度对话框     |


  
  ## 示例
  
  本示例演示了进度对话框的旋转用法。按下按钮时将显示旋转进度对话框。 要尝试使用此示例，您需要在按照以下步骤开发应用程序后，在实际设备上运行此示例。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加进度代码以显示旋转进度对话框。
  3. 修改res/layout/activity_main.xml文件以添加相应的XML代码。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.app.ProgressDialog;
  import android.os.Bundle;
  import android.os.Handler;
  import android.view.View;
  import android.widget.Button;

  public class MainActivity extends Activity {

      Button b1;
      private ProgressDialog progressBar;
      private int progressBarStatus = 0;
      private Handler progressBarbHandler = new Handler();
      private long fileSize = 0;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          b1=(Button)findViewById(R.id.button);
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  progressBar = new ProgressDialog(v.getContext());
                  progressBar.setCancelable(true);
                  progressBar.setMessage("File downloading ...");
                  progressBar.setProgressStyle(ProgressDialog.STYLE_SPINNER);
                  progressBar.setProgress(0);
                  progressBar.setMax(100);
                  progressBar.show();
                  progressBarStatus = 0;
    
                  fileSize = 0;
                  new Thread(new Runnable() {
                      public void run() {
                          while (progressBarStatus < 100) {
                              progressBarStatus = downloadFile();
    
                              try {
                                  Thread.sleep(1000);
                              } catch (InterruptedException e) {
                                  e.printStackTrace();
                              }
    
                              progressBarbHandler.post(new Runnable() {
                                  public void run() {
                                      progressBar.setProgress(progressBarStatus);
                                  }
                              });
                          }
    
                          if (progressBarStatus >= 100) {
                              try {
                                  Thread.sleep(2000);
                              } catch (InterruptedException e) {
                                  e.printStackTrace();
                              }
                              progressBar.dismiss();
                          }
                      }
                  }).start();
              }
          });
      }
    
      public int downloadFile() {
          while (fileSize <= 1000000) {
              fileSize++;
    
              if (fileSize == 100000) {
                  return 10;
              }else if (fileSize == 200000) {
                  return 20;
              }else if (fileSize == 300000) {
                  return 30;
              }else if (fileSize == 400000) {
                  return 40;
              }else if (fileSize == 500000) {
                  return 50;
              }else if (fileSize == 700000) {
                  return 70;
              }else if (fileSize == 800000) {
                  return 80;
              }
          }
          return 100;
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

    <TextView android:text="进度圈示例" android:layout_width="wrap_content"
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

    <Button
        android:id="@+id/button"
        android:layout_width="111dp"
        android:layout_height="79dp"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="112dp"
        android:text="下载" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:background="#22110055"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true" />

</RelativeLayout>
```

  

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/progresscircle1.png)

  尝试点击下载如下：

  ![](https://www.jc2182.com/images/android/progresscircle2.png)
