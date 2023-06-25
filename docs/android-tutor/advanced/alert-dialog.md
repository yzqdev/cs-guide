# 对话框


- 对话框是一个小窗口，提示用户做出决定或输入其他信息。在您的应用程序中，有时候，如果您想让用户根据用户采取的任何特定操作，在是或否之间做出决定，方法是保留在同一活动中而不更改屏幕，则可以使用“警告对话框”。为了创建警报对话框，您需要创建一个**AlertDialogBu​​ilder**对象，该对象是**AlertDialog**的内部类。其语法如下
  
```java
  AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
```
  
  
  
  现在，您必须使用AlertDialogBu​​ilder类的对象设置正（是）或负（否）按钮。它的语法是
  
```java
  alertDialogBuilder.setPositiveButton(CharSequence text, 
     DialogInterface.OnClickListener listener)
  alertDialogBuilder.setNegativeButton(CharSequence text, 
     DialogInterface.OnClickListener listener)
```
  
  
  
  除此之外，您还可以使用builder类提供的其他功能来自定义警报对话框。这些在下面列出
  
  | 分发流程                                                                                                                   | 说明                                                                    |
  | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
  | **setIcon(Drawable icon)**                                                                                                 | 此方法设置警报对话框的图标。                                            |
  | **setCancelable(boolean cancel able)**                                                                                     | 此方法设置对话框是否可以取消的属性                                      |
  | **setMessage(CharSequence message)**                                                                                       | 此方法设置要在警报对话框中显示的消息                                    |
  | **setMultiChoiceItems(CharSequence[] items, boolean[] checkedItems, DialogInterface.OnMultiChoiceClickListener listener)** | 此方法将要在对话框中显示的项目列表设置为内容。 选定的选项将由侦听器通知 |
  | **setOnCancelListener(DialogInterface.OnCancelListener onCancelListener)**                                                 | 此方法设置在取消对话框时将调用的回调。                                  |
  | **setTitle(CharSequence title)**                                                                                           | 此方法设置标题显示在对话框。                                            |
  
  创建并设置对话框构建器之后，您将通过调用构建器类的create()方法来创建警报对话框。它的语法是
  
```java
  AlertDialog alertDialog = alertDialogBuilder.create();
  alertDialog.show();
```
  
  
  
  这将创建警报对话框，并将其显示在屏幕上。
  

  
  ## 对话片段
  
  在进入示例之前，我们需要了解对话框片段。对话框片段是可以在对话框中显示片段的片段
  
```java
  public class DialogFragment extends DialogFragment {
     @Override
     public Dialog onCreateDialog(Bundle savedInstanceState) {
        // 使用Builder类进行便捷的对话框构建
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setPositiveButton(R.string.fire, new DialogInterface.OnClickListener() {
           public void onClick(DialogInterface dialog, int id) {
              toast.makeText(this,"enter a text here",Toast.LENTH_SHORT).show();
           }
        })
        .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
           public void onClick(DialogInterface dialog, int id) {
              finish();
           });
           // 创建AlertDialog对象并返回它
           return builder.create();
        }
     }
  }
```
  
  
  

  
  ## 列表对话框
  
  它用于在对话框中显示项目列表。假设用户需要选择一个项目列表，或者需要从多个项目列表中单击一个项目，在这种情况下，我们可以使用列表对话框。
  
```java
  public Dialog onCreateDialog(Bundle savedInstanceState) {
     AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
     builder.setTitle(Pick a Color).setItems(R.array.colors_array, new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dialog, int which) {
           // which参数包含所选项目的索引位置
        }
     });
     return builder.create();
  }
```
  
  
  

  
  ## 单选列表对话框
  
  它曾经用来在对话框中添加单选列表。我们可以根据用户的选择进行选择或取消选择。
  
```java
  public Dialog onCreateDialog(Bundle savedInstanceState) {
     mSelectedItems = new ArrayList();
     AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
  
     builder.setTitle("This is list choice dialog box");
     .setMultiChoiceItems(R.array.toppings, null,
        new DialogInterface.OnMultiChoiceClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which, boolean isChecked) {
  
           if (isChecked) {
              // 如果用户选中了该项目，则将其添加到所选项目中
              mSelectedItems.add(which);
           }
  
           else if (mSelectedItems.contains(which)) {
              // 否则，如果该项目已经在数组中，请将其删除
              mSelectedItems.remove(Integer.valueOf(which));
           }
        }
     })
  
     // 设置动作按钮
     .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int id) {
           // User clicked OK, so save the mSelectedItems results somewhere
           // or return them to the component that opened the dialog
           ...
        }
     })
  
     .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int id) {
           ...
        }
     });
     return builder.create();
  }
```
  
  
  

  
  ## 示例
  
  以下示例演示了在Android中使用AlertDialog的方法。要试验该示例，您需要在仿真器或实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加警报对话框代码以启动对话框。
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.app.AlertDialog;
  import android.content.DialogInterface;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Toast;
 
  

public class MainActivity extends Activity {
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);
 }

 
  public void open(View view){
      AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
      alertDialogBuilder.setMessage("您确定吗?");
              alertDialogBuilder.setPositiveButton("是", new DialogInterface.OnClickListener() {
                          @Override
                          public void onClick(DialogInterface arg0, int arg1) {
                              Toast.makeText(MainActivity.this,"您点击了‘是’按钮", Toast.LENGTH_LONG).show();
                          }
                      });

      alertDialogBuilder.setNegativeButton("否",new DialogInterface.OnClickListener() {
          @Override
          public void onClick(DialogInterface dialog, int which) {
              finish();
          }
      });

      AlertDialog alertDialog = alertDialogBuilder.create();
      alertDialog.show();
  }
 

}

```


以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="警告框示例"
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
        android:layout_width="198dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView2"
        android:layout_alignLeft="@+id/textView"
        android:layout_alignRight="@+id/textView2"
        android:layout_marginRight="-43dp"
        android:background="#22332266"
        android:src="@drawable/logo" />
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="警告框"
        android:id="@+id/button"
        android:layout_below="@+id/imageView"
        android:layout_alignRight="@+id/textView2"
        android:layout_alignEnd="@+id/textView2"
        android:layout_marginTop="42dp"
        android:onClick="open"
        android:layout_alignLeft="@+id/imageView"
        android:layout_alignStart="@+id/imageView" />

</RelativeLayout>
````



让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/alertdialog1.png)

点击“警告框”按钮，如下界面

![](https://www.jc2182.com/images/android/alertdialog2.png)

点击“是”按钮，如下界面