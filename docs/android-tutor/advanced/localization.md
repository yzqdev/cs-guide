# 本地化
  
  android应用程序可以在许多不同地区的许多设备上运行。为了使您的应用程序更具交互性，您的应用程序应该以适合于将使用您的应用程序的语言环境的方式来处理文本，数字，文件等。将字符串更改为不同语言的方式称为本地化在本章中，我们将说明，如何根据不同的区域来本地化应用程序等。我们将本地化应用程序中使用的字符串，并以相同的方式本地化其他内容。


  
  ## 本地化字符串
  
  为了对应用程序中使用的字符串进行本地化，请在re下创建一个新文件夹，名称为values-local，其中local将替换为该区域。例如，在意大利，values-it文件夹将在res下创建。
  
  创建完该文件夹后，将strings.xml从默认文件夹到您创建的文件夹中。并更改其内容。例如，我更改了hello_world字符串的值。
  
  *意大利，res/values-it/strings.xml*
  
```xml
  <resources>
     <string name="hello_world">Ciao mondo!</string>
  </resources>
```
  
  
  
  *西班牙，res/values-es/strings.xml*
  
```xml
  <resources>
     <string name="hello_world">Hola Mundo!</string>
  </resources>
```
  
  
  
  *法语，res/values-fr/strings.xml*
  
```xml
  <resources>
     <string name="hello_world">Bonjour le monde !</string>
  </resources>
```
  
  
  
  除了这些语言，下表还提供了其他语言的区域代码-
  
  | 语言         | 说明                            |
  | ------------ | ------------------------------- |
  | **非洲语**   | 代码：af 文件夹名称：values-af  |
  | **阿拉伯语** | 代码：ar。文件夹名称：values-ar |
  | **孟加拉语** | 代号：bn。文件夹名称：values-bn |
  | **捷克语**   | 代码：cs 文件夹名称：values-cs  |
  | **中文**     | 代码：zh。文件夹名称：values-zh |
  | **德语**     | 代号：de。文件夹名称：values-de |
  | **法文**     | 代码：fr。文件夹名称：values-fr |
  | **日本**     | 代码：ja。文件夹名称：values-ja |


  
  ## 示例
  
  要试验此示例，可以在实际设备或仿真器中运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改res/layout/activity_main以添加相应的XML组件
  3. 修改res/values/string.xml以添加必要的字符串组件
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
```

  public class MainActivity extends Activity {

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
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
        android:text="本地化示例"
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

  

  以下是res/values/strings.xml文件的内容-

```xml
<resources>
    <string name="app_name">Demo</string>
    <string name="hello_world">Hello world!</string>
    <string name="hindi">तितली ट्यूटोरियल</string>
    <string name="marathi">बटरफ्लाय ट्यूटोरियल</string>
    <string name="arabic">البرنامج التعليمي الفراشة</string>
    <string name="english">Butterfly tutorial</string>
</resources>
```

  

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/localtion1.png)
