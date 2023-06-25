  # 拖放
  
  Android拖放框架允许您的用户使用图形化的拖放手势将数据从当前布局中的一个视图移动到另一视图。从API 11开始，支持将视图拖放到其他视图或视图组上。该框架包括以下三个重要组件以支持拖放功能-
  
  - DragEvent类.
  - Drag 监听.
  - Helper 方法和类.

  
  ## 拖放过程
  
  拖放过程中基本上有四个步骤或状态-
  
  - **已开始** -当您开始在布局中拖动项目时，此事件发生，您的应用程序调用**startDrag()**方法来告诉系统开始拖动。**startDrag()**方法内的参数提供要拖动的数据，该数据的元数据，以及用于绘制拖动阴影的回调。 系统首先通过回呼您的应用程序来获得拖动阴影作为响应。然后，它将在设备上显示拖动阴影。接下来，系统将动作类型为**ACTION_DRAG_STARTED**的拖动事件发送到当前布局中所有View对象的已注册拖动事件侦听器。 要继续接收拖动事件（包括可能的放置事件），拖动事件侦听器必须返回true，如果拖动事件侦听器返回false，则它将不接收当前操作的拖动事件，直到系统发送具有操作类型的拖动事件为止**ACTION_DRAG_ENDED**。
  - **继续中** -用户继续拖动。系统将**ACTION_DRAG_ENTERED**操作，然后是**ACTION_DRAG_LOCATION**操作，发送到已注册的拖动事件侦听器，以供输入拖动点的View使用。侦听器可以选择响应事件而更改其View对象的外观，也可以通过突出显示其View做出反应。用户将拖动阴影移到视图的边界框之外之后，拖动事件侦听器将收到**ACTION_DRAG_EXITED**动作。
  - **已放下** -用户释放一个视图的边框内拖曳的项目。系统向View对象的侦听器发送操作类型为**ACTION_DROP**的拖动事件。
  - **已结束** -在动作类型**ACTION_DROP**之后，系统会发出动作类型为**ACTION_DRAG_ENDED**的拖动事件，以指示拖动操作已结束。

  
  ## DragEvent类
  
  **dragEvent**表示被一个拖放操作期间在不同的时间发送出由系统中的事件。此类提供了一些常量和在拖放过程中使用的重要方法。
  
  *常量*
  
  以下是可作为DragEvent类的一部分使用的所有常量整数。
  
  | 常量                     | 说明                                                                          |
  | ------------------------ | ----------------------------------------------------------------------------- |
  | **ACTION_DRAG_STARTED**  | 指示开始拖放操作。                                                            |
  | **ACTION_DRAG_ENTERED**  | 向视图发出信号，指示拖动点已进入视图的边界框。                                |
  | **ACTION_DRAG_LOCATION** | 如果拖动阴影仍在View对象的边界框内，则在**ACTION_DRAG_ENTERED**之后发送给View |
  | **ACTION_DRAG_EXITED**   | 表示用户已将拖动阴影移到视图的边界框之外。                                    |
  | **ACTION_DROP**          | 向视图发出信号，表明用户已释放拖动阴影，并且拖动点在视图的边界框内。          |
  | **ACTION_DRAG_ENDED**    | 向View发出拖放操作已完成的信号。                                              |
  
  *方法*
  
  以下是可作为DragEvent类的一部分使用的一些重要且最常用的方法。
  
  | 方法                                     | 说明                                                      |
  | ---------------------------------------- | --------------------------------------------------------- |
  | **int getAction()**                      | 检查此事件的操作值。                                      |
  | **ClipData getClipData()**               | 返回作为startDrag()调用的一部分发送到系统的ClipData对象。 |
  | **ClipDescription getClipDescription()** | 返回ClipData中包含的ClipDescription对象。                 |
  | **boolean getResult()**                  | 返回拖放操作结果的指示。                                  |
  | **float getX()**                         | 获取拖动点的X坐标。                                       |
  | **float getY()**                         | 获取拖动点的Y坐标。                                       |
  | **String toString()**                    | 返回此DragEvent对象的字符串表示形式。                     |
  

  
  ## 监听拖放事件
  
  如果您希望布局中的任何视图都应响应Drag事件，则您的视图可以实现**View.OnDragListener**或设置**onDragEvent(DragEvent)**回调方法。当系统调用方法或侦听器时，系统会将上述的**DragEvent**对象传递给他们。您可以同时具有View对象的侦听器和回调方法。如果发生这种情况，系统将首先调用侦听器，然后在侦听器返回true时定义回调。所述的组合**onDragEvent(dragEvent)方法和**View.OnDragListener类似于的组合的**onTouchEvent()**和**View.OnTouchListener**与旧版本的Android触摸事件使用。
  
- ******
  
  ## **开始拖动事件**
  
  **首先，为要移动的数据创建一个ClipData和ClipData.Item。作为ClipData对象的一部分，提供存储在ClipData中的ClipDescription对象中的元数据。对于不代表数据移动的拖放操作，您可能需要使用null而不是实际对象。接下来，您可以扩展extend View.DragShadowBuilder以创建用于拖动视图的拖动阴影，或者可以简单地使用View.DragShadowBuilder(View)来创建默认的拖动阴影，该拖动阴影的大小与传递给它的View参数的大小相同，点位于拖动阴影的中心。**
  

  
  ## 拖放示例演示
  
  以下示例显示使用**View.setOnLongClickListener()**，**View.setOnTouchListener()**和**View.OnDragEventListener()**进行简单拖放的功能。
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。
  2. 修改src/MainActivity.java文件并添加代码以定义事件侦听器，以及示例中使用的徽标图像的回调方法。
  3. 将图像logo.png到res/drawable-*文件夹中。如果要为不同的设备提供图像，则可以使用不同分辨率的图像。
  4. 修改布局XML文件res/layout / activity_main.xml来定义徽标图像的默认视图。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  

import android.annotation.SuppressLint;
 import android.app.Activity;
 import android.content.ClipData;
 import android.content.ClipDescription;
 import android.os.Bundle;
 import android.util.Log;
 import android.view.DragEvent;
 import android.view.MotionEvent;
 import android.view.View;
 import android.widget.ImageView;
 import android.widget.RelativeLayout;

public class MainActivity extends Activity {
 ImageView img;
 String msg;

  private android.widget.RelativeLayout.LayoutParams layoutParams;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      img=(ImageView)findViewById(R.id.imageView);

      img.setOnLongClickListener(new View.OnLongClickListener() {
          @Override
          public boolean onLongClick(View v) {
              ClipData.Item item = new ClipData.Item((CharSequence)v.getTag());
              String[] mimeTypes = {ClipDescription.MIMETYPE_TEXT_PLAIN};

              ClipData dragData = new ClipData(v.getTag().toString(),mimeTypes, item);
              View.DragShadowBuilder myShadow = new View.DragShadowBuilder(img);

              v.startDrag(dragData,myShadow,null,0);
              return true;
          }
      });


      img.setOnDragListener(new View.OnDragListener() {
          @SuppressLint("NewApi")
          @Override
          public boolean onDrag(View v, DragEvent event) {
              switch(event.getAction()) {
                  case DragEvent.ACTION_DRAG_STARTED:
                      layoutParams = (RelativeLayout.LayoutParams)v.getLayoutParams();
                      Log.d(msg, "操作是：： DragEvent.ACTION_DRAG_STARTED");

                      // Do nothing
                      return  true;

                  case DragEvent.ACTION_DRAG_ENTERED:
                      Log.d(msg, "操作是：： DragEvent.ACTION_DRAG_ENTERED");
                      int x_cord = (int) event.getX();
                      int y_cord = (int) event.getY();
                      return  true;

                  case DragEvent.ACTION_DRAG_EXITED :
                      Log.d(msg, "操作是：： DragEvent.ACTION_DRAG_EXITED");
                      x_cord = (int) event.getX();
                      y_cord = (int) event.getY();
                      layoutParams.leftMargin = x_cord;
                      layoutParams.topMargin = y_cord;
                      v.setLayoutParams(layoutParams);
                      return  true;

                  case DragEvent.ACTION_DRAG_LOCATION  :
                      Log.d(msg, "操作是：： DragEvent.ACTION_DRAG_LOCATION");
                      x_cord = (int) event.getX();
                      y_cord = (int) event.getY();
                      return  true;

                  case DragEvent.ACTION_DRAG_ENDED   :
                      img.setVisibility(View.VISIBLE);
                      Log.d(msg, "操作是：： DragEvent.ACTION_DRAG_ENDED");
                      // Do nothing
                      return  true;

                  case DragEvent.ACTION_DROP:
                      x_cord = (int) event.getX();
                      y_cord = (int) event.getY();
                      layoutParams.leftMargin = x_cord;
                      layoutParams.topMargin = y_cord;

                      img.setLayoutParams(layoutParams);

                      Log.d(msg, "ACTION_DROP 事件");
                      return  true;

                  default:
                      break;
              }
              return true;
          }
      });

      img.setOnTouchListener(new View.OnTouchListener() {
          @Override
          public boolean onTouch(View v, MotionEvent event) {
              if (event.getAction() == MotionEvent.ACTION_DOWN) {
                  ClipData data = ClipData.newPlainText("", "");
                  View.DragShadowBuilder shadowBuilder = new View.DragShadowBuilder(img);

                  img.startDrag(data, shadowBuilder, img, 0);
                  img.setVisibility(View.INVISIBLE);
                  return true;
              } else {
                  return false;
              }
          }
      });

  }


}

```


以下是res/layout/activity_main.xml文件的内容-
```xml

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="50dp"
        android:text="拖放示例"
        android:textSize="30dp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView2"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:textSize="30dp"
        android:textColor="#ff14be3c" />


    <ImageView
        android:id="@+id/imageView"
        android:layout_width="219dp"
        android:layout_height="108dp"
        android:layout_below="@+id/textView2"
        android:layout_alignStart="@+id/textView2"
        android:layout_alignLeft="@+id/textView2"
        android:layout_alignEnd="@+id/textView2"
        android:layout_alignRight="@+id/textView2"
        android:layout_centerHorizontal="true"
        android:layout_marginStart="-102dp"
        android:layout_marginLeft="-102dp"
        android:layout_marginTop="-8dp"
        android:layout_marginEnd="6dp"
        android:layout_marginRight="6dp"
        android:background="#88005522"
        android:src="@drawable/logo" />

</RelativeLayout>
```



让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/drop1.png)

尝试去拖放图片，并观察控制台日志输出。