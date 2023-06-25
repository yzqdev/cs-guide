# 手势
  
  Android提供了特殊类型的触摸屏事件，例如捏，双击，滚动，长按和退格。这些都称为手势。Android提供了**GestureDetector**类来接收手势事件，并告诉我们这些事件是否与手势相对应。要使用它，您需要创建一个**GestureDetector**对象，然后使用**GestureDetector.SimpleOnGestureListener**扩展另一个类以充当侦听器并重写某些方法。其语法如下
  
```java
  GestureDetector myG;
  myG = new GestureDetector(this,new Gesture());
  
  class Gesture extends GestureDetector.SimpleOnGestureListener{
     public boolean onSingleTapUp(MotionEvent ev) {
     }
  
     public void onLongPress(MotionEvent ev) {
     }
  
     public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
     float distanceY) {
     }
  
     public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
     float velocityY) {
     }
  }
```
  
## 处理捏手势
  
  Android提供了**ScaleGestureDetector**类来处理诸如捏等的手势。要使用它，您需要实例化此类的对象。它的语法如下-
  
```java
  ScaleGestureDetector SGD;
  SGD = new ScaleGestureDetector(this,new ScaleListener());
```
  
  第一个参数是上下文，第二个参数是事件侦听器。我们必须定义事件侦听器，并重写函数OnTouchEvent使其起作用。其语法如下-
  
```java
  public boolean onTouchEvent(MotionEvent ev) {
     SGD.onTouchEvent(ev);
     return true;
  }
  
  private class ScaleListener extends ScaleGestureDetector.SimpleOnScaleGestureListener {
     @Override
     public boolean onScale(ScaleGestureDetector detector) {
        float scale = detector.getScaleFactor();
        return true;
     }
  }
```
  
  除了捏合手势外，还有其他方法可以通知更多有关触摸事件的信息。它们在下面列出-
  
  | 方法                                | 说明                                                                     |
  | ----------------------------------- | ------------------------------------------------------------------------ |
  | **getEventTime()**                  | 此方法获取正在处理的当前事件的事件时间。                                 |
  | **getFocusX()**                     | 此方法获取当前手势的焦点的X坐标。                                        |
  | **getFocusY()**                     | 此方法获取当前手势焦点的Y坐标。                                          |
  | **getTimeDelta()**                  | 此方法返回以前接受的缩放事件和当前缩放事件之间的时间差（以毫秒为单位）。 |
  | **isInProgress()**                  | 如果正在进行缩放手势，则此方法返回true。                                 |
  | **onTouchEvent(MotionEvent event)** | 此方法接受MotionEvents并在适当时调度事件。                               |
  
## 示例
  
  这是一个演示**ScaleGestureDetector**类的用法的示例。它创建了一个基本应用程序，可让您通过捏放大和缩小。 为了试验该示例，您可以在实际设备上或在启用了触摸屏的仿真器中运行此示例。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 从互联网上下载一种字体，并将其放在assets/font文件夹下。
  3. 修改src/MainActivity.java文件添加必要代码。
  4. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  

import android.app.Activity;
 import android.graphics.Matrix;
 import android.os.Bundle;
 import android.view.MotionEvent;
 import android.view.ScaleGestureDetector;
 import android.widget.ImageView;

public class MainActivity extends Activity {
 private ImageView iv;
 private Matrix matrix = new Matrix();
 private float scale = 1f;
 private ScaleGestureDetector SGD;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      iv=(ImageView)findViewById(R.id.imageView);
      SGD = new ScaleGestureDetector(this,new ScaleListener());
  }

  public boolean onTouchEvent(MotionEvent ev) {
      SGD.onTouchEvent(ev);
      return true;
  }

  private class ScaleListener extends ScaleGestureDetector.
          SimpleOnScaleGestureListener {

      @Override
      public boolean onScale(ScaleGestureDetector detector) {
          scale *= detector.getScaleFactor();
          scale = Math.max(0.1f, Math.min(scale, 5.0f));
          matrix.setScale(scale, scale);
          iv.setImageMatrix(matrix);
          return true;
      }
  }

}

```

以下是res/layout/activity_main.xml文件的内容-

```xml

<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity" >

    <TextView android:text="手势例子" android:layout_width="wrap_content"
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
        android:background="#22112200"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:scaleType="matrix"
        android:layout_below="@+id/textView"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_alignParentBottom="true"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true" />

</RelativeLayout>
````

让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/gestures1.png)

现在，将两根手指放在android屏幕上，将它们分开一部分，您将看到android图像正在缩放。如下面的图像所示-
