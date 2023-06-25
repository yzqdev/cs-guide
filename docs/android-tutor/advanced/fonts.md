# 自定义字体
  
  在android中，您可以为应用程序中的字符串定义自己的自定义字体。您只需要从Internet下载所需的字体，然后将其放在assets/font文件夹中即可，您可以通过Typeface类在Java代码中访问它。首先，获取代码中文本视图的引用。其语法如下-
  
```java
  TextView tx = (TextView)findViewById(R.id.textview1);
```
  
  
  
  您需要做的下一件事是调用**Typeface**类**createFromAsset()**的静态方法以从资产中获取自定义字体。其语法如下-
  
```java
  Typeface custom_font = Typeface.createFromAsset(getAssets(), "fonts/font name.ttf");
```
  
  
  
  您需要做的最后一件事是将此自定义字体对象设置为TextView Typeface属性。您需要调用setTypeface()方法来执行此操作。其语法如下-
  
```java
  tx.setTypeface(custom_font);
```
  
  
  
  除了这些方法之外，Typeface类中还定义了其他方法，可用于更有效地处理字体。
  
  | 方法                                     | 说明                                                          |
  | ---------------------------------------- | ------------------------------------------------------------- |
  | **create(String familyName, int style)** | 创建一个带有姓氏和选项样式信息的Typeface对象                  |
  | **create(Typeface family, int style)**   | 创建一个与指定的现有Typeface和指定的Style最匹配的Typeface对象 |
  | **createFromFile(String path)**          | 从指定的字体文件创建一个新的字样                              |
  | **defaultFromStyle(int style)**          | 根据指定的样式返回默认的Typeface对象之一                      |
  | **getStyle()**                           | 返回字体的固有样式属性                                        |
  

  
  ## 示例
  
  这是一个演示使用**Typeface**处理CustomFont的示例。它创建一个基本应用程序，显示您在字体文件中指定的自定义字体。 要试验该示例，您可以在实际设备或仿真器上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 从互联网上下载一种字体，并将其放在assets/font文件夹下。
  3. 修改src/MainActivity.java文件添加必要代码。
  4. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  输入代码部分之前，请从Windows资源管理器在assests文件夹中添加字体。
  
  ![](https://www.jc2182.com/images/android/fonts1.png)
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  

import android.app.Activity;
 import android.graphics.Typeface;
 import android.os.Bundle;
 import android.widget.TextView;

public class MainActivity extends Activity {
 TextView tv1,tv2;

  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      tv1=(TextView)findViewById(R.id.textView3);
      tv2=(TextView)findViewById(R.id.textView4);

      Typeface face= Typeface.createFromAsset(getAssets(), "font/czssgj.ttf");
      tv1.setTypeface(face);

      Typeface face1= Typeface.createFromAsset(getAssets(), "font/hybjhyt.ttf");
      tv2.setTypeface(face1);
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

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Typeface类"
        android:id="@+id/textView"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
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

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView3"
        android:layout_centerVertical="true"
        android:textSize="45dp"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true" />

    <TextView
        android:id="@+id/textView4"
        android:layout_width="392dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView3"
        android:layout_alignStart="@+id/textView3"
        android:layout_alignLeft="@+id/textView3"
        android:layout_centerHorizontal="true"
        android:layout_marginStart="106dp"
        android:layout_marginLeft="106dp"
        android:layout_marginTop="3dp"
        android:text="蝴蝶教程"
        android:textSize="45dp" />

</RelativeLayout>
````



让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/fonts2.png)

> 注意-使用自定义字体时，需要注意字体支持的大小和字符。