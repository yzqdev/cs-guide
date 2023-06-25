# 图像效果
  
  Android允许您通过在图像上添加不同种类的效果来操纵图像。您可以轻松地应用图像处理技术在图像上添加某些种类的效果。效果可能是亮度，暗度，灰度转换等，Android提供了**Bitmap**类来处理图像。可以在android.graphics.bitmap下找到。您可以通过多种方式实例化位图。我们正在从imageView创建图像的位图。
  
```java
  private Bitmap bmp;
  private ImageView img;
  img = (ImageView)findViewById(R.id.imageView1);
  BitmapDrawable  abmp = (BitmapDrawable)img.getDrawable();
```
  
  
  
  现在，我们将通过调用**BitmapDrawable**类的**getBitmap()**函数来创建位图。其语法如下-
  
```java
  bmp = abmp.getBitmap();
```
  
  
  
  图像不过是二维矩阵。用同样的方式处理位图。图像由像素组成。因此，您将从该位图中获取像素并对其进行处理。它的语法如下-
  
```java
  for(int i=0; i < bmp.getWidth(); i++){
     for(int j=0; j < bmp.getHeight(); j++){
        int p = bmp.getPixel(i, j);
     }
  }
```
  
  
  
  getWidth()和getHeight()函数返回矩阵的高度和宽度。getPixel()方法返回指定索引处的像素。一旦获得像素，就可以根据需要轻松地对其进行操作。除了这些方法之外，还有其他方法可以帮助我们更好地处理图像。
  
   
  
  | 方法                                                                                  | 说明                                                |
  | ------------------------------------------------------------------------------------- | --------------------------------------------------- |
  | **copy(Bitmap.Config config, boolean isMutable)**                                     | 此方法将此位图的像素到新的位图中                    |
  | **createBitmap(DisplayMetrics display, int width, int height, Bitmap.Config config)** | 返回具有指定宽度和高度的可变位图                    |
  | **createBitmap(int width, int height, Bitmap.Config config)**                         | 返回具有指定宽度和高度的可变位图                    |
  | **createBitmap(Bitmap src)**                                                          | 从源位图返回一个不变的位图                          |
  | **extractAlpha()**                                                                    | 返回捕获原始图像的Alpha值的新位图                   |
  | **getConfig()**                                                                       | 此方法将返回该配置，否则返回null                    |
  | **getDensity()**                                                                      | 返回此位图的密度                                    |
  | **getRowBytes()**                                                                     | 返回位图像素中行之间的字节数                        |
  | **setPixel(int x, int y, int color)**                                                 | W假设指定的颜色在x，y坐标处是可变的，则将其放入位图 |
  | **setDensity(int density)**                                                           | 此方法指定此位图的密度                              |
  

  
  ## 示例
  
  下面的示例演示了位图上的某些图像效果。它创建了一个基本应用程序，可让您将图片转换为灰度图等等。要试验此示例，您需要在实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件添加必要代码。
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  

import android.app.Activity;
 import android.graphics.Bitmap;
 import android.graphics.Color;
 import android.graphics.drawable.BitmapDrawable;
 import android.os.Bundle;
 import android.view.View;
 import android.widget.Button;
 import android.widget.ImageView;

public class MainActivity extends Activity {
 Button b1, b2, b3;
 ImageView im;

  private Bitmap bmp;
  private Bitmap operation;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      b1 = (Button) findViewById(R.id.button);
      b2 = (Button) findViewById(R.id.button2);
      b3 = (Button) findViewById(R.id.button3);
      im = (ImageView) findViewById(R.id.imageView);

      BitmapDrawable abmp = (BitmapDrawable) im.getDrawable();
      bmp = abmp.getBitmap();
  }

  public void gray(View view) {
      operation = Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(), bmp.getConfig());
      double red = 0.33;
      double green = 0.59;
      double blue = 0.11;

      for (int i = 0; i < bmp.getWidth(); i++) {
          for (int j = 0; j < bmp.getHeight(); j++) {
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);

              r = (int) red * r;
              g = (int) green * g;
              b = (int) blue * b;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void bright(View view){
      operation= Bitmap.createBitmap(bmp.getWidth(), bmp.getHeight(),bmp.getConfig());

      for(int i=0; i< bmp.getWidth(); i++){
          for(int j=0; j< bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r = 100  +  r;
              g = 100  + g;
              b = 100  + b;
              alpha = 100 + alpha;
              operation.setPixel(i, j, Color.argb(alpha, r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void dark(View view){
      operation= Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(),bmp.getConfig());

      for(int i=0; i < bmp.getWidth(); i++){
          for(int j=0; j < bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r =  r - 50;
              g =  g - 50;
              b =  b - 50;
              alpha = alpha -50;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void gama(View view) {
      operation = Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(),bmp.getConfig());

      for(int i=0; i < bmp.getWidth(); i++){
          for(int j=0; j < bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r =  r + 150;
              g =  0;
              b =  0;
              alpha = 0;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void green(View view){
      operation = Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(), bmp.getConfig());

      for(int i=0; i < bmp.getWidth(); i++){
          for(int j=0; j < bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r =  0;
              g =  g+150;
              b =  0;
              alpha = 0;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void blue(View view){
      operation = Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(), bmp.getConfig());

      for(int i=0; i < bmp.getWidth(); i++){
          for(int j=0; j < bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r =  0;
              g =  0;
              b =  b+150;
              alpha = 0;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
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
    tools:context="com.jc2182.demo.MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="110dp"
        android:paddingTop="50dp"
        android:text="图像效果"
        android:textSize="30dp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView2"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:textSize="35dp"
        android:textColor="#ff16ff01" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="353dp"
        android:layout_height="112dp"
        android:layout_below="@+id/textView2"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="70dp"
        android:src="@drawable/logo" />

    <Button
        android:id="@+id/button"
        android:layout_width="134dp"
        android:layout_height="wrap_content"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentBottom="true"
        android:layout_centerInParent="true"
        android:layout_marginStart="10dp"
        android:layout_marginLeft="10dp"
        android:layout_marginBottom="117dp"
        android:onClick="gray"
        android:text="灰暗" />

    <Button
        android:id="@+id/button2"
        android:layout_width="135dp"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@+id/button"
        android:layout_alignParentEnd="true"
        android:layout_alignParentRight="true"
        android:onClick="dark"
        android:text="黑暗" />

    <Button
        android:id="@+id/button3"
        android:layout_width="117dp"
        android:layout_height="wrap_content"
        android:layout_alignTop="@+id/button2"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="3dp"
        android:layout_marginBottom="20dp"
        android:onClick="bright"
        android:text="明亮" />

    <Button
        android:id="@+id/button4"
        android:layout_width="127dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button3"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:layout_marginTop="9dp"
        android:layout_marginBottom="20dp"
        android:onClick="gama"
        android:paddingBottom="50dp"
        android:text="殷红" />

    <Button
        android:id="@+id/button5"
        android:layout_width="111dp"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/button3"
        android:layout_alignLeft="@+id/button3"
        android:layout_alignTop="@+id/button4"
        android:layout_marginStart="0dp"
        android:layout_marginLeft="0dp"
        android:layout_marginTop="3dp"
        android:layout_marginBottom="20dp"
        android:onClick="green"
        android:paddingBottom="50dp"
        android:text="翠绿" />

    <Button
        android:id="@+id/button6"
        android:layout_width="93dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button2"
        android:layout_alignParentEnd="true"
        android:layout_marginStart="49dp"
        android:layout_marginLeft="49dp"
        android:layout_marginTop="6dp"
        android:layout_marginEnd="0dp"
        android:layout_toEndOf="@+id/textView"
        android:layout_toRightOf="@+id/textView"
        android:onClick="blue"
        android:paddingBottom="50dp"
        android:text="天蓝" />

</RelativeLayout>
````



让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/imageeffects1.png)

点击按钮展示各种图片效果-