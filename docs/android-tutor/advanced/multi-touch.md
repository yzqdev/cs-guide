# 多点触控
  
  当多于一个手指同时触摸屏幕时，就会发生多点触摸手势。Android允许我们检测这些手势。每当多个手指同时触摸屏幕时，Android系统都会生成以下触摸事件。
  
  | 事件                    | 说明                                   |
  | ----------------------- | -------------------------------------- |
  | **ACTION_DOWN**         | 对于触摸屏幕的第一个指针。这开始手势。 |
  | **ACTION_POINTER_DOWN** | 对于进入第一个屏幕之外的其他指针。     |
  | **ACTION_MOVE**         | 按下手势时发生了变化。                 |
  | **ACTION_POINTER_UP**   | 当非主要指针上升时发送。               |
  | **ACTION_UP**           | 当最后一个指针离开屏幕时发送。         |
  
  因此，为了检测上述任何事件，您需要重写onTouchEvent()方法并手动检查这些事件。其语法如下-
  
```java
  public boolean onTouchEvent(MotionEvent ev){
     final int actionPeformed = ev.getAction();
  
     switch(actionPeformed){
        case MotionEvent.ACTION_DOWN:{
           break;
        }
  
        case MotionEvent.ACTION_MOVE:{
           break;
        }
        return true;
     }
  }
```
  
  
  
  在这些情况下，您可以执行任何喜欢的计算。例如缩放，缩小等为了获得X和Y轴的坐标，可以调用getX()和getY()方法。其语法如下-
  
```java
  final float x = ev.getX();
  final float y = ev.getY();
```
  
  
  
  除了这些方法之外，此MotionEvent类还提供了其他方法，可以更好地处理多点触摸。这些方法在下面列出-
  
  | 方法                | 说明                                   |
  | ------------------- | -------------------------------------- |
  | **getAction()**     | 此方法返回正在执行的操作的种类         |
  | **getPressure()**   | 此方法为第一个索引返回此事件的当前压力 |
  | **getRawX()**       | 此方法返回此事件的原始原始X坐标        |
  | **getRawY()**       | 此方法返回此事件的原始原始Y坐标        |
  | **getSize()**       | 此方法返回第一个指针索引的大小         |
  | **getSource()**     | 此方法获取事件的来源                   |
  | **getXPrecision()** | 此方法返回要报告的X坐标的精度          |
  | **getYPrecision()** | 此方法返回报告的Y坐标的精度            |


  
  ## 示例
  
  这是演示使用多点触控的示例。它创建一个基本的Multitouch手势应用程序，使您可以在执行多点触摸时查看坐标。要试验此示例，您需要在实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加多点触控代码。
  3. 修改res/layout/activity_main以添加相应的XML组件。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.view.MotionEvent;
  import android.view.View;
  import android.widget.EditText;
  import android.widget.TextView;

  public class MainActivity extends Activity {

      float xAxis = 0f;
      float yAxis = 0f;
    
      float lastXAxis = 0f;
      float lastYAxis = 0f;
    
      EditText ed1, ed2, ed3, ed4;
      TextView tv1;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          ed1 = (EditText) findViewById(R.id.editText);
          ed2 = (EditText) findViewById(R.id.editText2);
          ed3 = (EditText) findViewById(R.id.editText3);
          ed4 = (EditText) findViewById(R.id.editText4);
    
          tv1=(TextView)findViewById(R.id.textView2);
    
          tv1.setOnTouchListener(new View.OnTouchListener() {
              @Override
              public boolean onTouch(View v, MotionEvent event) {
                  final int actionPeformed = event.getAction();
    
                  switch(actionPeformed){
                      case MotionEvent.ACTION_DOWN:{
                          final float x = event.getX();
                          final float y = event.getY();
    
                          lastXAxis = x;
                          lastYAxis = y;
    
                          ed1.setText(Float.toString(lastXAxis));
                          ed2.setText(Float.toString(lastYAxis));
                          break;
                      }
    
                      case MotionEvent.ACTION_MOVE:{
                          final float x = event.getX();
                          final float y = event.getY();
    
                          final float dx = x - lastXAxis;
                          final float dy = y - lastYAxis;
    
                          xAxis += dx;
                          yAxis += dy;
    
                          ed3.setText(Float.toString(xAxis));
                          ed4.setText(Float.toString(yAxis));
                          break;
                      }
                  }
                  return true;
              }
          });
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

    <TextView
        android:id="@+id/textview"
        android:layout_width="385dp"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="3dp"
        android:text="多点触控示例"
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

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:background="#22FFFF"
        android:theme="@style/Base.TextAppearance.AppCompat" />

    <EditText
        android:id="@+id/editText"
        android:layout_width="351dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_alignStart="@+id/textview"
        android:layout_alignLeft="@+id/textview"
        android:layout_alignEnd="@+id/textview"
        android:layout_alignRight="@+id/textview"
        android:layout_marginStart="-25dp"
        android:layout_marginLeft="-25dp"
        android:layout_marginTop="6dp"
        android:hint="X-坐标"
        android:textColorHint="#ff69ff0e" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText2"
        android:layout_below="@+id/editText"
        android:layout_alignLeft="@+id/editText"
        android:layout_alignStart="@+id/editText"
        android:textColorHint="#ff21ff11"
        android:hint="Y-坐标"
        android:layout_alignRight="@+id/editText"
        android:layout_alignEnd="@+id/editText" />

    <EditText
        android:id="@+id/editText3"
        android:layout_width="390dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/editText2"
        android:layout_alignStart="@+id/editText2"
        android:layout_alignLeft="@+id/editText2"
        android:layout_alignEnd="@+id/editText2"
        android:layout_alignRight="@+id/editText2"
        android:layout_marginStart="-22dp"
        android:layout_marginLeft="-22dp"
        android:layout_marginTop="6dp"
        android:hint="移动 X"
        android:textColorHint="#ff33ff20" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText4"
        android:layout_below="@+id/editText3"
        android:layout_alignLeft="@+id/editText3"
        android:layout_alignStart="@+id/editText3"
        android:textColorHint="#ff31ff07"
        android:hint="移动 Y"
        android:layout_alignRight="@+id/editText3"
        android:layout_alignEnd="@+id/editText3" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="231dp"
        android:layout_height="123dp"
        android:layout_alignStart="@+id/imageView"
        android:layout_alignLeft="@+id/imageView"
        android:layout_alignParentStart="true"
        android:layout_alignParentBottom="true"
        android:layout_marginStart="-6dp"
        android:layout_marginLeft="-59dp"
        android:layout_marginBottom="123dp"
        android:clickable="true"
        android:focusable="true"
        android:text="触摸这里"
        android:textColor="#ff5480ff"
        android:textSize="35dp"
        android:typeface="sans" />

</RelativeLayout>
```

  

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/multitouch1.png)

  尝试触摸屏幕来看效果
