# 加载进度条
  
  您可以通过加载进度条在android中显示任务的进度。进度条有两种形状。加载栏和加载微调器。在本章中，我们将讨论微调器。微调框用于显示总完成时间未知的那些任务的进度。为了使用它，您只需要像这样在xml中定义它。
  
```xml
  <ProgressBar
     android:id="@+id/progressBar1"
     style="?android:attr/progressBarStyleLarge"
     android:layout_width="wrap_content"
     android:layout_height="wrap_content"
     android:layout_centerHorizontal="true" />
```
  
  在xml中定义它之后，您必须通过ProgressBar类在java文件中获取它的引用。其语法如下-
  
```java
  private ProgressBar spinner;
  spinner = (ProgressBar)findViewById(R.id.progressBar1);
```
  
  之后，您可以使其消失，并在需要时通过setVisibility方法将其恢复。其语法如下-
  
```java
  spinner.setVisibility(View.GONE);
  spinner.setVisibility(View.VISIBLE);
```
  
  除了这些方法外，ProgressBar类中还定义了其他方法，可用于更有效地处理微调器。
  
  | 方法                                        | 说明                                     |
  | ------------------------------------------- | ---------------------------------------- |
  | **isIndeterminate()**                       | 指示此进度条是否处于不确定模式           |
  | **postInvalidate()**                        | 在事件循环的后续周期中导致无效事件发生   |
  | **setIndeterminate(boolean indeterminate)** | 更改此进度条的不确定模式                 |
  | **invalidateDrawable(Drawable dr)**         | 使指定的Drawable无效                     |
  | **incrementSecondaryProgressBy(int diff)**  | 将进度条的辅助进度增加指定的数量         |
  | **getProgressDrawable()**                   | 获取用于在进度模式下绘制进度条的drawable |

## 示例
  
  这是一个演示使用ProgressBar处理微调器的示例。它创建了一个基本应用程序，可让您在单击按钮时打开微调器。要试验此示例，可以在实际设备或仿真器中运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件添加必要代码。
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 需要在drawable文件夹中创建一个xml文件。它包含形状和旋转进度栏信息
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;

  import android.app.Activity;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.ProgressBar;

  public class MainActivity extends Activity {
      Button b1;

      private ProgressBar spinner;
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1=(Button)findViewById(R.id.button);
          spinner=(ProgressBar)findViewById(R.id.progressBar);
          spinner.setVisibility(View.GONE);
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  spinner.setVisibility(View.VISIBLE);
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
        android:text="加载进度条示例"
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

  以下是res/xml/circular_progress_bar.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<rotate
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:fromDegrees="90"
    android:pivotX="50%"
    android:pivotY="50%"
    android:toDegrees="360">

    <shape
        android:innerRadiusRatio="3"
        android:shape="ring"
        android:thicknessRatio="7.0">

        <gradient
            android:centerColor="#007DD6"
            android:endColor="#007DD6"
            android:startColor="#007DD6"
            android:angle="0"
            android:type="sweep"
            android:useLevel="false" />
    </shape>

</rotate>
```

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/loadingspinner1.png)

  点击下载，进度条在转动

  ![](https://www.jc2182.com/images/android/loadingspinner2.png)
