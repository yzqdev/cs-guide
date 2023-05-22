# 图像切换器
  
  有时，您不希望图像突然出现在屏幕上，而是想在图像从一个图像过渡到另一个图像时对其应用某种动画。这是由Android以**ImageSwitcher**的形式支持的。图像切换器允许您通过图像在屏幕上的显示方式在图像上添加一些过渡效果。为了使用图像切换器，您需要首先定义其XML组件。其语法如下-
  
```xml
  <ImageSwitcher
     android:id="@+id/imageSwitcher1"
     android:layout_width="wrap_content"
     android:layout_height="wrap_content"
     android:layout_centerHorizontal="true"
     android:layout_centerVertical="true" >
  </ImageSwitcher>
```
  
  
  
  现在，我们在java文件中创建一个**ImageSwithcer**实例，并获取此XML组件的引用。其语法如下-
  
```java
  private ImageSwitcher imageSwitcher;
  imageSwitcher = (ImageSwitcher)findViewById(R.id.imageSwitcher1);
```
  
  
  
  接下来，我们需要实现ViewFactory接口并实现未实现的方法，该方法返回imageView。它的语法如下-
  
```java
  imageSwitcher.setImageResource(R.drawable.ic_launcher);
  imageSwitcher.setFactory(new ViewFactory() {
     public View makeView() {
        ImageView myView = new ImageView(getApplicationContext());
        return myView;
     }
  }
```
  
  
  
  您需要做的最后一件事是将**Animation**添加到**ImageSwitcher**。您需要通过调用静态方法loadAnimation通过AnimationUtilities类来定义Animation类的对象。其语法如下-
  
```java
  Animation in = AnimationUtils.loadAnimation(this,android.R.anim.slide_in_left);
  imageSwitcher.setInAnimation(in);
  imageSwitcher.setOutAnimation(out);   
```
  
  
  
  setInAnimaton方法设置对象在屏幕上的外观动画，而setOutAnimation则相反。方法loadAnimation()创建一个动画对象。除了这些方法之外，ImageSwitcher类中还定义了其他方法。它们定义如下-
  
  | 方法                                                               | 说明                                                           |
  | ------------------------------------------------------------------ | -------------------------------------------------------------- |
  | **setImageDrawable(Drawable drawable)**                            | 用图像切换器设置图像。 图像以位图的形式传递                    |
  | **setImageResource(int resid)**                                    | 用图像切换器设置图像。 图片以整数id的形式传递                  |
  | **setImageURI(Uri uri)**                                           | 用图像切换器设置图像。 图片以URI的形式传递                     |
  | **ImageSwitcher(Context context, AttributeSet attrs)**             | 返回一个图像切换器对象，该对象已经设置了在方法中传递的某些属性 |
  | **onInitializeAccessibilityEvent (AccessibilityEvent event)**      | 使用有关此View的信息（事件源）初始化AccessibilityEvent         |
  | **onInitializeAccessibilityNodeInfo (AccessibilityNodeInfo info)** | 使用有关此视图的信息初始化AccessibilityNodeInfy                |


  
  ## 示例
  
  下面的示例演示了位图上的某些图像切换器效果。它创建了一个基本应用程序，可让您查看图像上的动画效果。要试验此示例，您需要在实际设备上运行它。
  
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
 import android.view.ViewGroup;
 import android.widget.Button;
 import android.widget.ImageSwitcher;
 import android.widget.ImageView;
 import android.widget.Toast;
 import android.widget.ViewSwitcher;

public class MainActivity extends Activity {
 private ImageSwitcher sw;
 private Button b1,b2;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      b1 = (Button) findViewById(R.id.button);
      b2 = (Button) findViewById(R.id.button2);

      sw = (ImageSwitcher) findViewById(R.id.imageSwitcher);
      sw.setFactory(new ViewSwitcher.ViewFactory() {
          @Override
          public View makeView() {
              ImageView myView = new ImageView(getApplicationContext());
              myView.setScaleType(ImageView.ScaleType.FIT_CENTER);
              myView.setLayoutParams(new ImageSwitcher.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
              return myView;
          }
      });

      b1.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Toast.makeText(getApplicationContext(), "前一张图片", Toast.LENGTH_LONG).show();
              sw.setImageResource(R.drawable.sample0);
          }
      });

      b2.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Toast.makeText(getApplicationContext(), "下一张图片",
                      Toast.LENGTH_LONG).show();
              sw.setImageResource(R.drawable.sample1);
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

    <TextView android:text="图片切换器示例"
        android:layout_width="wrap_content"
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

    <ImageSwitcher
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageSwitcher"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="168dp" />

    <Button
        android:id="@+id/button"
        android:layout_width="84dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="177dp"
        android:text="上一张" />

    <Button
        android:id="@+id/button2"
        android:layout_width="81dp"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/button"
        android:layout_alignLeft="@+id/button"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginStart="1dp"
        android:layout_marginLeft="1dp"
        android:layout_marginEnd="-1dp"
        android:layout_marginBottom="244dp"
        android:text="下一张" />

</RelativeLayout>
```



让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/imageswitcher1.png)

点击按钮切换上一张下一张图片-

![](https://www.jc2182.com/images/android/imageswitcher2.png)

![](https://www.jc2182.com/images/android/imageswitcher3.png)