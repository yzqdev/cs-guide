# 事件
  
  > **事件**是一种收集有关用户与应用程序的交互式组件进行交互的数据的有用方法。像按下按钮或触摸屏幕等。Android框架将事件队列保持为先进先出（FIFO）的基础。您可以在程序中捕获这些事件，并根据要求采取适当的措施。
  
  与Android事件管理相关的以下三个概念-
  
  - **事件监听器** - 事件监听器是View类中的一个接口，其中包含一个回调方法。当用户与UI中的项目进行交互触发了已注册侦听器的View时，Android框架将调用这些方法。
  - **事件侦听器注册** - 事件注册是事件处理程序向事件侦听器注册的过程，以便在事件侦听器触发事件​​时调用该处理程序。
  - **事件处理程序** - 当事件发生并且我们已经为该事件注册了一个事件侦听器时，该事件侦听器将调用事件处理程序，这是实际处理该事件的方法。

  
  ## 事件监听器和事件处理程序
  
  | 事件处理                  | 事件监听器                        | 描述                                                                                                                                            |
  | ------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
  | **onClick()**             | OnClickListener()                 | 当用户单击或触摸或聚焦于任何小部件（如按钮，文本，图像等）时，将调用此方法。您将使用onClick()事件处理程序来处理此类事件。                       |
  | **onLongClick()**         | OnLongClickListener()             | 当用户单击或触摸或聚焦在任何小部件（如按钮，文本，图像等）上一秒钟或更长时间时，将调用此方法。您将使用onLongClick()事件处理程序来处理此类事件。 |
  | **onFocusChange()**       | OnFocusChangeListener()           | 当小部件失去焦点时即调用此方法。用户离开视图项。您将使用onFocusChange()事件处理程序来处理此类事件。                                             |
  | **onKey()**               | OnFocusChangeListener()           | 当用户专注于该项目并按下或释放设备上的硬件键时，将调用此方法。您将使用onKey()事件处理程序来处理此类事件。                                       |
  | **onTouch()**             | OnTouchListener()                 | 当用户按下键，释放键或屏幕上的任何移动手势时，将调用此方法。您将使用onTouch()事件处理程序来处理此类事件。                                       |
  | **onMenuItemClick()**     | OnMenuItemClickListener()         | 用户选择菜单项时调用此方法。您将使用onMenuItemClick()事件处理程序来处理此类事件。                                                               |
  | **onCreateContextMenu()** | onCreateContextMenuItemListener() | 在构建上下文菜单时调用（持续的“长按”结果）                                                                                                      |
  
  作为**View**类的一部分，可能还有更多事件侦听器，例如OnHoverListener，OnDragListener等，它们可能是您的应用程序所需要的。因此，如果您要开发复杂的应用程序，建议您参考Android应用程序开发的官方文档。
  

  
  ## 事件监听器注册
  
  事件注册是事件处理程序向事件监听器注册的过程，以便在事件监听器触发事件​​时调用该处理程序。尽管有几种技巧可以为任何事件注册事件侦听器，但是我将仅列出前三种方式，您可以根据情况使用其中三种方式。
  
  - 使用匿名内部类
  - Activity类实现Listener接口。
  - 使用布局文件activity_main.xml直接指定事件处理程序。
  
  以下部分将为您提供有关这三种情况的详细示例-
  

  
  ## 触控模式
  
  用户可以使用硬件键或按钮或触摸屏幕与设备进行交互。触摸屏幕可使设备进入触摸模式。然后，用户可以通过触摸屏幕上的虚拟按钮，图像等与之交互。您可以通过调用View类的isInTouchMode()方法来检查设备是否处于触摸模式。
  

  
  ## 焦点
  
  视图或窗口小部件通常在突出显示时会突出显示或显示闪烁的光标。这表明已准备好接受用户的输入。
  
  - **isFocusable()** - 返回true或false
  - **isFocusableInTouchMode()** -检查在触摸模式下视图是否可聚焦。（使用硬件键时，视图可能是可聚焦的，但设备处于触摸模式时则不能。）
  
```xml
  android:foucsUp="@=id/button_l"
```
  
  
  
  *onTouchEvent()*
  
```java
  public boolean onTouchEvent(motionEvent event){
     switch(event.getAction()){
        case TOUCH_DOWN:
        Toast.makeText(this,"you have clicked down Touch button",Toast.LENTH_LONG).show();
        break();
  
        case TOUCH_UP:
        Toast.makeText(this,"you have clicked up touch button",Toast.LENTH_LONG).show();
        break;
  
        case TOUCH_MOVE:
        Toast.makeText(this,"you have clicked move touch button"Toast.LENTH_LONG).show();
        break;
     }
     return super.onTouchEvent(event) ;
  }
```
  
  
  

  
  ## 事件处理示例
  
  使用匿名内部类注册事件侦听器 在这里，您将创建侦听器的匿名实现，如果每个类仅应用于单个控件，并且您具有将参数传递给事件处理程序的优势，则将很有用。在这种方法中，事件处理程序方法可以访问Activity的私有数据。无需引用即可调用“活动”。但是，如果将处理程序应用于多个控件，则必须剪切并粘贴该处理程序的代码，如果该处理程序的代码很长，则会使代码难以维护。以下是简单的步骤，以展示我们将如何利用单独的Listener类注册和捕获click事件。您可以类似的方式为任何其他必需的事件类型实现侦听器。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件创建一个简单的列TableView，其中包含显示为微调器项目的项目。
  3. 修改res/layout/activity_main.xml文件的默认内容以包括创建一个简单的列表视图。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.app.ProgressDialog;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.TextView;
```
  

public class MainActivity extends Activity {
 private ProgressDialog progress;
 Button b1,b2;

```
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      progress = new ProgressDialog(this);

      b1=(Button)findViewById(R.id.button);
      b2=(Button)findViewById(R.id.button2);
      b1.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              TextView txtView = (TextView) findViewById(R.id.textView);
              txtView.setTextSize(25);
          }
      });

      b2.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              TextView txtView = (TextView) findViewById(R.id.textView);
              txtView.setTextSize(55);
          }
      });
  }
```

}

````


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
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="事件处理示例 "
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:textSize="30dp"/>

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程 "
        android:textColor="#ff87ff09"
        android:textSize="30dp"
        android:layout_above="@+id/imageButton"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="40dp" />

    <ImageButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageButton"
        android:src="@drawable/logo"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="小字体"
        android:id="@+id/button"
        android:layout_below="@+id/imageButton"
        android:layout_centerHorizontal="true" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="大字体"
        android:id="@+id/button2"
        android:layout_below="@+id/button"
        android:layout_alignRight="@+id/button"
        android:layout_alignEnd="@+id/button" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        android:id="@+id/textView"
        android:layout_below="@+id/button2"
        android:layout_centerHorizontal="true"
        android:textSize="25dp" />

</RelativeLayout>
````



让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/event1.png)

点击“大字体”按钮，如下界面

![](https://www.jc2182.com/images/android/event2.png)

> 我建议尝试为不同的事件类型编写不同的事件处理程序，并了解不同事件类型及其处理方式的确切区别。与菜单，微调器，选择器小部件相关的事件几乎没有什么不同，但它们也基于与上述相同的概念。