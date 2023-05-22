# Android UI 控件
  
  输入控件是应用程序用户界面中的交互式组件。Android提供了可在您的UI中使用的各种控件，例如按钮，文本字段，搜索栏，复选框，缩放按钮，切换按钮等等。
  
  View是一个对象，它在屏幕上绘制一些用户可以交互的东西，ViewGroup是一个对象，它保存其他View(和ViewGroup)对象，以定义用户界面的布局。在XML文件中定义布局，XML文件为布局提供了可读的结构，类似于HTML。例如，一个简单的带有文本视图和按钮的垂直布局是这样的
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="fill_parent"
     android:layout_height="fill_parent"
     android:orientation="vertical" >
  
     <TextView android:id="@+id/text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="I am a TextView" />
  
     <Button android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="I am a Button" />
  </LinearLayout>
```
  
  
  
  Android提供了许多UI控件，可让您为应用程序构建图形用户界面。
  
  | 控件                                                                                          | 说明                                                                                                                          |
  | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
  | [TextView](https://www.jc2182.com/andriod/android-textview-show.html)                         | 此控件用于向用户显示文本。                                                                                                    |
  | [EditText](https://www.jc2182.com/andriod/android-edittext-show.html)                         | EditText是TextView的预定义子类，其中包含丰富的编辑功能。                                                                      |
  | [AutoCompleteTextView](https://www.jc2182.com/andriod/android-autocompletetextview-show.html) | AutoCompleteTextView是一个类似于EditText的视图，只是它在用户键入时自动显示完成建议列表。                                      |
  | [Button](https://www.jc2182.com/andriod/android-button-show.html)                             | 用户可以按下或单击以执行操作的按钮。                                                                                          |
  | [ImageButton](https://www.jc2182.com/andriod/android-imagebutton-show.html)                   | ImageButton是一个AbsoluteLayout，可让您指定其子级的确切位置。这显示了带有图像（而不是文本）的按钮，用户可以按下或单击该按钮。 |
  | [CheckBox](https://www.jc2182.com/andriod/android-checkbox-show.html)                         | 用户可以切换的开/关开关。为用户提供一组互不排斥的可选选项时，应使用复选框。                                                   |
  | [ToggleButton](https://www.jc2182.com/andriod/android-togglebutton-show.html)                 | 带指示灯的开/关按钮。                                                                                                         |
  | [RadioButton](https://www.jc2182.com/andriod/android-radiobutton-show.html)                   | RadioButton有两种状态：选中或未选中。                                                                                         |
  | [RadioGroup](https://www.jc2182.com/andriod/android-radiogroup-show.html)                     | RadioGroup用于将一个或多个RadioButton组合在一起。                                                                             |
  | [ProgressBar](https://www.jc2182.com/andriod/android-progressbar-show.html)                   | ProgressBar视图提供有关某些正在进行的任务的视觉反馈，例如在后台执行任务时。                                                   |
  | [Spinner](https://www.jc2182.com/andriod/android-spinner-show.html)                           | 允许用户从一组中选择一个值的下拉列表。                                                                                        |
  | [TimePicker](https://www.jc2182.com/andriod/android-timepicker-show.html)                     | 通过TimePicker视图，用户可以选择24小时模式或AM/PM模式中的一天中的某个时间。                                                   |
  | [DatePicker](https://www.jc2182.com/andriod/android-datepicker-show.html)                     | DatePicker视图使用户可以选择一天中的日期。                                                                                    |
  

  
  ## 创建UI控件
  
  输入控件是应用程序用户界面中的交互式组件。Android提供了可在您的UI中使用的各种控件，例如按钮，文本字段，搜索栏，复选框，缩放按钮，切换按钮等等。如上一章所述，视图对象可能具有分配给它的唯一ID，该ID将在树中唯一标识视图。XML标记内的ID的语法是-
  
```t4
  android:id="@+id/text_id"
```
  
  
  
  要创建UI控件/视图/小部件，您将必须在布局文件中定义视图/小部件并为其分配唯一的ID，如下所示：
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="fill_parent"    android:layout_height="fill_parent"
     android:orientation="vertical" >
  
     <TextView android:id="@+id/text_id"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="I am a TextView" />
  </LinearLayout>
```
  
  
  
  然后最终创建控制对象的实例并从布局中捕获它，请使用以下命令-
  
```java
  TextView myText = (TextView) findViewById(R.id.text_id);
```
  
  