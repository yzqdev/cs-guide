# Android UI
  
  用户界面的基本构建块是从**View**类创建的**View**对象，它占据屏幕上的一个矩形区域，负责绘制和事件处理。View是widget的基类，用于创建交互式UI组件，如按钮、文本字段等。**ViewGroup**是**View**的一个子类，提供了不可见的容器，用于保存其他视图或其他视图组并定义它们的布局属性。
  
  第三层面上我们有不同的布局ViewGroup子类的类和一个典型的布局定义了一个Android用户界面的视觉结构在运行时,可以创建使用视图ViewGroup对象或你可以声明使用简单的XML文件布局文件夹位于您的项目res/layout文件夹下。
  
  本教程更多关于基于XML文件中定义的布局创建GUI。布局可以包含任何类型的小部件，例如按钮，标签，文本框等。以下是具有**LinearLayout**的XML文件的简单示例-
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="fill_parent"
     android:layout_height="fill_parent"
     android:orientation="vertical" >
  
     <TextView android:id="@+id/text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="This is a TextView" />
  
     <Button android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="This is a Button" />
  
     <!-- More GUI components go here  -->
  
  </LinearLayout>
```
  
  
  
  创建布局后，您可以在Activity.onCreate()回调实现中从应用程序代码加载布局资源，如下所示-
  
```java
  public void onCreate(Bundle savedInstanceState) {
     super.onCreate(savedInstanceState);
     setContentView(R.layout.activity_main);  // activity_main 为布局文件的文件名
  }
```
  
  
  

  
  ## Android 布局类型
  
  Android提供了许多版式，您几乎可以在所有Android应用程序中使用它们来提供不同的视图，外观。
  
  | 布局                                                                        | 说明                                                                       |
  | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
  | [线性布局](https://www.jc2182.com/android/android-linearlayout-show.html)   | **LinearLayout**是一个视图组，该视图组在单个方向上垂直或水平对齐所有子级。 |
  | [相对布局](https://www.jc2182.com/android/android-relativelayout-show.html) | **RelativeLayout**是一个视图组，在相对位置显示子视图。                     |
  | [表格布局](https://www.jc2182.com/android/android-tablelayout-show.html)    | **TableLayout**是将视图分为行和列的视图。                                  |
  | [绝对布局](https://www.jc2182.com/android/android-absolutelayout-show.html) | **AbsoluteLayout**使您可以指定其子级的确切位置。                           |
  | [框架布局](https://www.jc2182.com/android/android-frameLayout-show.html)    | **FrameLayout**是屏幕上的占位符，可用于显示单个视图。                      |
  | [列表视图](https://www.jc2182.com/android/android-listview-show.html)       | **ListView**是一个视图组，显示可滚动项的列表。                             |
  | [网格视图](https://www.jc2182.com/android/android-gridview-show.html)       | **GridView**是一个**ViewGroup**，它在二维可滚动网格中显示项目。            |
  

  
  ## 布局属性
  
  每个布局都有一组属性，这些属性定义该布局的视觉属性。在所有布局中，只有很少的公共属性，而其他属性是特定布局所特有的。以下是常见的属性，它们将应用于所有布局：
  
  | 属性                            | 说明                                     |
  | ------------------------------- | ---------------------------------------- |
  | **android:id**                  | 这是唯一标识视图的ID。                   |
  | **android:layout_width**        | 这是布局的宽度。                         |
  | **android:layout_height**       | 这是布局的高度                           |
  | **android:layout_marginTop**    | 这是布局顶部的额外空间。                 |
  | **android:layout_marginBottom** | 这是布局底部的额外空间。                 |
  | **android:layout_marginLeft**   | 这是布局左侧的额外空间。                 |
  | **android:layout_marginRight**  | 这是布局右侧的额外空间。                 |
  | **android:layout_gravity**      | 这指定子视图的放置方式。                 |
  | **android:layout_weight**       | 这指定应将布局中多少额外空间分配给视图。 |
  | **android:layout_x**            | 这指定布局的x坐标。                      |
  | **android:layout_y**            | 这指定布局的y坐标。                      |
  | **android:layout_width**        | 这是布局的宽度。                         |
  | **android:paddingLeft**         | 这是为布局填充的左侧填充。               |
  | **android:paddingRight**        | 这是为布局填充的正确填充。               |
  | **android:paddingTop**          | 这是为布局填充的顶部填充。               |
  | **android:paddingBottom**       | 这是为布局填充的底部填充。               |
  
  此处的width和height是layout/view的尺寸，可以根据dp（与密度无关的像素），sp（与比例无关的像素），pt（为1/72英寸的点），px（像素），mm（毫米），最后以英寸为单位。您可以使用精确的测量来指定宽度和高度，但是更常见的是，您将使用以下常量之一来设置宽度或高度-
  
  - **android:layout_width** = wrap_content 告诉您将视图调整为其内容所需的尺寸。
  - **android:layout_width** = fill_parent 告诉您视图变得与其父视图一样大。
  
  gravity属性在定位视图对象中起着重要作用，它可以采用以下一个或多个（用“|”分隔）以下常量值。
  
  | 常量                  | 值         | 描述                                                                                                                                                       |
  | --------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **top**               | 0x30       | 将对象推到其容器的顶部，而不改变其大小。                                                                                                                   |
  | **bottom**            | 0x50       | 将对象推到其容器的底部，而不改变其大小。                                                                                                                   |
  | **left**              | 0x03       | 将对象推到其容器的左侧，不改变其大小。                                                                                                                     |
  | **right**             | 0x05       | 将对象推到其容器的右侧，而不改变其大小。                                                                                                                   |
  | **center_vertical**   | 0x10       | 将对象放置在其容器的垂直中心，不改变其大小。                                                                                                               |
  | **fill_vertical**     | 0x70       | 如果需要，增大对象的垂直大小，使其完全填满其容器。                                                                                                         |
  | **center_horizontal** | 0x01       | 将对象放置在其容器的水平中心，不改变其大小。                                                                                                               |
  | **fill_horizontal**   | 0x07       | 如果需要，增大对象的水平大小，以完全填充其容器。                                                                                                           |
  | **center**            | 0x11       | 将对象放在其容器的垂直和水平轴的中心，不改变其大小。                                                                                                       |
  | **fill**              | 0x77       | 如果需要，增大对象的水平和垂直大小，使其完全填满其容器。                                                                                                   |
  | **clip_vertical**     | 0x80       | 可以设置将子元素的顶部和/或底部边缘剪切到其容器边界的附加选项。剪辑将基于垂直重力:顶部重力将剪辑底部边缘，底部重力将剪辑顶部边缘，两者都不会剪辑两个边缘。 |
  | **clip_horizontal**   | 0x08       | 可以设置为将子元素的左边缘和/或右边缘剪切到其容器边界的附加选项。剪辑将基于水平重力:左重力将剪辑右边缘，右重力将剪辑左边缘，两者都不会剪辑。               |
  | **start**             | 0x00800003 | 将object推到其容器的开头，但不改变其大小。                                                                                                                 |
  | **end**               | 0x00800005 | 将对象推到其容器的末端，而不改变其大小。                                                                                                                   |
  

  
  ## 视图标识符
  
  **View** 对象可能具有分配给它的唯一ID，该ID将在树中唯一标识视图。XML标记内的ID的语法是-
  
```xml
  android:id="@+id/my_button"
```
  
  
  
  以下是@和+符号的简要说明-
  
  - 字符串开头的符号（@）表示XML解析器应解析并扩展ID字符串的其余部分，并将其标识为ID资源。
  - 加号（+）表示这是必须创建并添加到我们资源中的新资源名称。要创建视图对象的实例并从布局中捕获它，请使用以下命令：
  
```java
  Button myButton = (Button) findViewById(R.id.my_button);
```