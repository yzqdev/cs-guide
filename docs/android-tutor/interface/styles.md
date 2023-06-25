# Android （安卓）样式和主题


  
  ## 事件
  
:::tip
 一个**样式**资源定义了用户界面的格式和外观。样式可以应用于单个View（从布局文件中）或整个Activity或应用程序（从清单文件中）。
:::  
  与Android事件管理相关的以下三个概念-
  

  
  ## 定义样式
  
  在XML资源中定义了一种样式，该样式与指定布局的XML分开。此XML文件位于项目的res/values/目录下，并将`<resources>`作为根节点，这是样式文件所必需的。XML文件的名称是任意的，但必须使用.xml扩展名。您可以使用`<style>`标签为每个文件定义多种样式，但是每种样式都有其名称，该名称可以唯一地标识样式。Android样式属性使用`<item>`标记设置，如下所示-
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <resources>
     <style name="CustomFontStyle">
        <item name="android:layout_width">fill_parent</item>
        <item name="android:layout_height">wrap_content</item>
        <item name="android:capitalize">characters</item>
        <item name="android:typeface">monospace</item>
        <item name="android:textSize">12pt</item>
        <item name="android:textColor">#00FF00</item>/> 
     </style>
  </resources>
```
  
  
  
  > `<item>`的值可以是关键字字符串，十六进制颜色，对另一种资源类型的引用或其他值，具体取决于style属性。
  

  
  ## 使用样式
  
  定义样式后，可以使用style属性在XML布局文件中使用它，如下所示：
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="fill_parent"
     android:layout_height="fill_parent"
     android:orientation="vertical" >
  
     <TextView
        android:id="@+id/text_id"
        style="@style/CustomFontStyle"
        android:text="@string/hello_world" />
  
  </LinearLayout>
```
  
  
  
  [查看安卓样式示例](https://www.jc2182.com/andriod/andriod-style-example.html)
  

  
  ## 样式继承
  
  Android支持样式继承的方式与网页设计中级联样式表的方式非常相似。您可以使用它继承现有样式的属性，然后仅定义要更改或添加的属性。要实现自定义主题，请创建或编辑MyAndroidApp/res/values/themes.xml并添加以下内容-
  
```xml
  <resources>
     ...
     <style name="MyCustomTheme" parent="android:style/Theme">
     <item name="android:textColor">#ffff0000</item>
     </style>
     ...
  </resources>
```
  
  
  
  在您的AndroidManifest.xml中，将主题应用于您要设置样式的活动-
  
```xml
  <activity
     android:name="com.myapp.MyActivity"
     ...
     android:theme="@style/MyCustomTheme"
     />
```
  
  
  
  您的新主题将应用于您的活动，并且文本现在变为鲜红色。
  
  ![](https://www.jc2182.com/images/android/styleandtheme1.png)
  

  
  ## 将颜色应用于主题属性
  
  然后，可以通过将`<item>`元素添加到自定义主题，将颜色资源应用于某些主题属性，例如窗口背景和主文本颜色。这些属性在styles.xml文件中定义。例如，要将自定义颜色应用于窗口背景，请在MyAndroidApp/res/values/styles.xml文件中定义的自定义主题中添加以下两个`<item>`元素：
  
```xml
  <resources>
     ...
     <style name="MyCustomTheme" ...>
        <item name="android:windowBackground">@color/my_custom_color</item>
        <item name="android:colorBackgroundCacheHint">@color/my_custom_color</item>
     </style>
     ...
  </resources>
```
  
  
  

  
  ## 使用带有按钮的自定义9-Patch
  
  九块可绘制对象是一种特殊的图像，可以在保持视觉完整性的同时在宽度和高度上缩放。9-Patch是指定Android按钮外观的最常用方法，尽管可以使用任何可绘制类型。
  
  创建九个补丁按钮的步骤
  
  1. 将此位图另存为/res/drawable/my_nine_patch.9.png
  2. 定义新样式
  3. 将新按钮样式应用于自定义主题的buttonStyle属性
  
  定义新样式
  
```xml
  <resources>
     ...
        <style name="MyCustomButton" parent="android:Widget.Button">
        <item name="android:background">@drawable/my_nine_patch</item>
        </style>
     ...
  </resources>
```
  
  
  
  套用主题
  
```xml
  <resources>
     ...
        <style name="MyCustomTheme" parent=...>
           ...
           <item name="android:buttonStyle">@style/MyCustomButton</item>
        </style>
     ...
  </resources>
```
  
  
  

  
  ## Android 主题
  
  希望您了解样式的概念，所以现在让我们尝试了解什么是主题。主题不过是应用于整个活动或应用程序而不是单个视图的Android样式。因此，将样式用作主题时，活动或应用程序中的每个视图都将应用其支持的每个样式属性。例如，您可以将相同的CustomFontStyle样式用作Activity的主题，然后该Activity内的所有文本将具有绿色等宽字体。要为应用程序的所有活动设置主题，请打开AndroidManifest.xml文件，然后编辑`<application>`标记，以包含带有样式名称的android:theme属性。例如-
  
```xml
  <application android:theme="@style/CustomFontStyle">
```
  
  
  
  但是，如果要将主题仅应用到应用程序中的一个Activity，则将android：theme属性仅添加到`<activity>`标签。例如-
  
```xml
  <activity android:theme="@style/CustomFontStyle">
```
  
  
  
  Android定义了许多默认主题，您可以直接使用它们，也可以使用parent属性继承它们，如下所示：
  
```xml
  <style name="CustomTheme" parent="android:Theme.Light">
     ...
  </style>
```
  
  
  
  要了解与Android主题相关的概念，可以查看[主题演示示例](https://www.jc2182.com/andriod/andriod-theme-example.html)。
  

  
  ## 样式调色板
  
  布局设计可以基于它们的颜色实现，例如，以下设计基于它们的颜色（蓝色）
  
  ![](https://www.jc2182.com/images/android/styleandtheme4.jpg)
  
  上面的布局是基于style.xml文件设计的，其中放置在res/values/
  
```xml
  <resource>
     <style name="AppTheme" parent="android:Theme.Material">        
        <item name ="android:color/primary">@color/primary</item>
        <item name ="android:color/primaryDark">@color/primary_dark</item>
        <item name ="android:colorAccent/primary">@color/accent</item>
     </style>
  <resource>
```
  
  
  

  
  ## 默认样式和主题
  
  Android平台提供了可在您的应用程序中使用的大量样式和主题。您可以在R.style类中找到所有可用样式的引用。要使用此处列出的样式，请将样式名称中的所有下划线都替换为句点。例如，您可以将Theme_NoTitleBar主题与“@android：style/Theme.NoTitleBar”一起应用。您可以查看以下Android样式和主题的源代码-
  
  - [Android样式（styles.xml）](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/master/core/res/res/values/styles.xml)
  - [Android主题（themes.xml）](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/master/core/res/res/values/themes.xml)