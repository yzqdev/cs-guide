# 动画
  
  动画是创造运动和形状变化的过程，Android中的动画可以通过多种方式实现。在本章中，我们将讨论一种简单且广泛使用的动画制作方法，称为补间动画。
  

  
  ## 补间动画
  
  补间动画采用一些参数，例如开始值，结束值，大小，持续时间，旋转角度等，并对该对象执行所需的动画。它可以应用于任何类型的对象。因此，为了使用此功能，Android为我们提供了一个名为Animation的类。为了在Android中执行动画，我们将调用AnimationUtils类的静态函数loadAnimation()。我们将在Animation 对象的实例中接收结果。它的语法如下-
  
```java
  Animation animation = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.myanimation);
```
  
  
  
  注意第二个参数。这是我们的动画xml文件的名称。您必须在res目录下创建一个名为anim的新文件夹，并在anim文件夹下创建一个xml文件。这个动画类具有许多有用的功能，在下面列出-
  
  | 方法                           | 说明                               |
  | ------------------------------ | ---------------------------------- |
  | **start()**                    | 此方法开始动画。                   |
  | **setDuration(long duration)** | 此方法设置动画的持续时间。         |
  | **getDuration()**              | 此方法获取由上述方法设置的持续时间 |
  | **end()**                      | 此方法结束动画。                   |
  | **cancel()**                   | 此方法取消动画。                   |
  
  为了将此动画应用于对象，我们将只调用对象的**startAnimation()**方法。它的语法是-
  
```java
  ImageView image1 = (ImageView)findViewById(R.id.imageView1);
  image.startAnimation(animation);
```
  
  
  

  
  ## 示例
  
  以下示例演示了在Android中使用Animation的方法。您将能够从菜单中选择不同类型的动画，并且所选的动画将应用于屏幕上的imageView上。要试验该示例，您需要在仿真器或实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加动画代码
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 在res目录下创建一个新文件夹，并将其命名为anim。通过访问res/anim对其进行确认
  5. 右键单击anim，然后单击新建，然后选择Android XML文件。您必须创建下面列出的其他文件。 创建文件myanimation.xml，clockwise.xml，fade.xml，move.xml，blink.xml，slide.xml并添加XML代码。
  6. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.view.View;
  import android.view.animation.Animation;
  import android.view.animation.AnimationUtils;
  import android.widget.ImageView;
  

public class MainActivity extends Activity {
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);
 }

  public void clockwise(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.myanimation);
      image.startAnimation(animation);
  }

  public void zoom(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.clockwise);
      image.startAnimation(animation1);
  }

  public void fade(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.fade);
      image.startAnimation(animation1);
  }

  public void blink(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 =  AnimationUtils.loadAnimation(getApplicationContext(), R.anim.blink);
      image.startAnimation(animation1);
  }

  public void move(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.move);
      image.startAnimation(animation1);
  }

  public void slide(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.slide);
      image.startAnimation(animation1);
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
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="动画示例"
        android:id="@+id/textView"
        android:textSize="35dp"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView2"
        android:textColor="#ff3eff0f"
        android:textSize="35dp"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="189dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView2"
        android:layout_alignLeft="@+id/textView"
        android:layout_alignRight="@+id/textView2"
        android:layout_centerVertical="true"
        android:layout_marginLeft="-65dp"
        android:layout_marginTop="8dp"
        android:layout_marginRight="-52dp"
        android:background="#22334455"
        android:src="@drawable/logo" />

    <Button
        android:id="@+id/button"
        android:layout_width="112dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:layout_marginTop="8dp"
        android:onClick="clockwise"
        android:text="放大" />

    <Button
        android:id="@+id/button2"
        android:layout_width="75dp"
        android:layout_height="wrap_content"
        android:layout_alignTop="@+id/button"
        android:layout_centerHorizontal="true"
        android:onClick="zoom"
        android:text="顺时针" />

    <Button
        android:id="@+id/button3"
        android:layout_width="123dp"
        android:layout_height="wrap_content"
        android:layout_alignTop="@+id/button2"
        android:layout_alignParentEnd="true"
        android:layout_alignParentRight="true"
        android:layout_marginTop="2dp"
        android:layout_marginEnd="46dp"
        android:layout_marginRight="46dp"
        android:onClick="fade"
        android:text="淡出" />

    <Button
        android:id="@+id/button4"
        android:layout_width="110dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:onClick="blink"
        android:text="闪烁" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="移动"
        android:onClick="move"
        android:id="@+id/button5"
        android:layout_below="@+id/button2"
        android:layout_alignRight="@+id/button2"
        android:layout_alignEnd="@+id/button2"
        android:layout_alignLeft="@+id/button2"
        android:layout_alignStart="@+id/button2" />

    <Button
        android:id="@+id/button6"
        android:layout_width="81dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button3"
        android:layout_alignParentEnd="true"
        android:layout_marginLeft="48dp"
        android:layout_marginTop="10dp"
        android:layout_marginEnd="-9dp"
        android:layout_toRightOf="@+id/textView"
        android:onClick="slide"
        android:text="滑动" />

</RelativeLayout>
````



这是res/anim/myanimation.xml的代码。

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">

    <scale xmlns:android="http://schemas.android.com/apk/res/android"
        android:fromXScale="0.5"
        android:toXScale="3.0"
        android:fromYScale="0.5"
        android:toYScale="3.0"
        android:duration="5000"
        android:pivotX="50%"
        android:pivotY="50%" >
    </scale>

    <scale xmlns:android="http://schemas.android.com/apk/res/android"
        android:startOffset="5000"
        android:fromXScale="3.0"
        android:toXScale="0.5"
        android:fromYScale="3.0"
        android:toYScale="0.5"
        android:duration="5000"
        android:pivotX="50%"
        android:pivotY="50%" >
    </scale>

</set>
```



这是res/anim/clockwise.xml的代码。

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">

    <rotate xmlns:android="http://schemas.android.com/apk/res/android"
        android:fromDegrees="0"
        android:toDegrees="360"
        android:pivotX="50%"
        android:pivotY="50%"
        android:duration="5000" >
    </rotate>

    <rotate xmlns:android="http://schemas.android.com/apk/res/android"
        android:startOffset="5000"
        android:fromDegrees="360"
        android:toDegrees="0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:duration="5000" >
    </rotate>

</set>
```



这是res/anim/fade.xml的代码。

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/accelerate_interpolator" >

    <alpha
        android:fromAlpha="0"
        android:toAlpha="1"
        android:duration="2000" >
    </alpha>

    <alpha
        android:startOffset="2000"
        android:fromAlpha="1"
        android:toAlpha="0"
        android:duration="2000" >
    </alpha>

</set>
```



这是res/anim/blink.xml的代码。

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha android:fromAlpha="0.0"
        android:toAlpha="1.0"
        android:interpolator="@android:anim/accelerate_interpolator"
        android:duration="600"
        android:repeatMode="reverse"
        android:repeatCount="infinite"/>
</set>
```



这是res/anim/move.xml的代码。

```xml
<?xml version="1.0" encoding="utf-8"?>
<set
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/linear_interpolator"
    android:fillAfter="true">

    <translate
        android:fromXDelta="0%p"
        android:toXDelta="75%p"
        android:duration="800" />
</set>
```



这是res/anim/slide.xml的代码。

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true" >

    <scale
        android:duration="500"
        android:fromXScale="1.0"
        android:fromYScale="1.0"
        android:interpolator="@android:anim/linear_interpolator"
        android:toXScale="1.0"
        android:toYScale="0.0" />
</set>
```



让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/animation1.png)

您可以依次点击各个按钮来展示各种动画效果。