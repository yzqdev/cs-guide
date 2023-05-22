
# 资源的组织和访问
  
  您还可以使用许多其他项来构建良好的Android应用程序。除了为应用程序编码之外，您还需要处理各种其他资源，例如代码使用的静态内容，例如位图，颜色，布局定义，用户界面字符串，动画指令等。这些资源始终在项目的res/目录下的各个子目录中分别维护。本教程将向您说明如何组织应用程序资源，指定替代资源并在应用程序中访问它们。
  
## 在Android Studio中整理资源
  
```t4
  MyProject/
     app/
        manifest/
           AndroidManifest.xml
     java/
        MyActivity.java  
        res/
           drawable/  
              icon.png  
           layout/  
              activity_main.xml
              info.xml
           values/  
              strings.xml 
```
  
  | 文件夹    | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
  | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | anim/     | 定义属性动画的XML文件。它们保存在res/anim/文件夹中，并可以从**R.anim**类访问。                                                                                                                                                                                                                                                                                                                                                                                                  |
  | color/    | 定义颜色状态列表的XML文件。它们保存在res/color/中，并可以从**R.color**类访问。                                                                                                                                                                                                                                                                                                                                                                                                  |
  | drawable/ | 图像文件（如.png，.jpg，.gif或XML文件）被编译为位图，状态列表，形状，可绘制动画的文件。它们保存在res/drawable/中，并可以从R.drawable类访问。                                                                                                                                                                                                                                                                                                                                    |
  | layout/   | 定义用户界面布局的XML文件。它们保存在res/layout/中，并可以从R.layout类访问。                                                                                                                                                                                                                                                                                                                                                                                                    |
  | menu/     | 定义应用程序菜单的XML文件，例如选项菜单，上下文菜单或子菜单。它们保存在res/menu/中，并可以从R.menu类访问。                                                                                                                                                                                                                                                                                                                                                                      |
  | raw/      | 以原始格式保存的任意文件。您需要使用资源ID（即R.raw.filename）调用Resources.openRawResource()来打开此类原始文件。                                                                                                                                                                                                                                                                                                                                                               |
  | values/   |  包含简单值（例如字符串，整数和颜色）的XML文件。例如，以下是您可以在此目录中创建的资源的一些文件名约定   用于资源数组的arrays.xml，可从R.array类访问。   用于资源整数的integers.xml，可从R.integer类访问。   用于布尔值资源的bools.xml，并从R.bool类进行访问。   colors.xml获取颜色值，并从R.color类访问。   尺寸值的dimens.xml，可从R.dimen类访问。  strings.xml获取字符串值，并从R.string类进行访问。   用于样式的styles.xml，可从R.style类访问 。 |
  | xml/      | 可以在运行时通过调用Resources.getXML()读取任意XML文件。 您可以在此处保存各种配置文件，这些文件将在运行时使用。                                                                                                                                                                                                                                                                                                                                                                  |
  
## 替代资源
  
  您的应用程序应提供替代资源以支持特定的设备配置。例如，您应该包括用于不同屏幕分辨率的备用可绘制资源（即images）和用于不同语言的备用字符串资源。在运行时，Android将检测当前的设备配置并为您的应用程序加载适当的资源。要为一组资源指定特定于配置的替代方案，请遵循以下步骤：在res/中以格式`<resources_name>-<config_qualifier>`命名新目录。在这里resources_name将是上表中提到的任何资源，例如layout，drawable等。限定符将指定要使用这些资源的单个配置。您可以查看官方文档以获取针对不同类型资源的限定词的完整列表。将相应的备用资源保存在此新目录中。如以下示例所示，资源文件的名称必须与默认资源文件的名称完全相同，但是这些文件将具有特定于备用文件的内容。例如，尽管图像文件名相同，但对于高分辨率屏幕，其分辨率将很高。以下是为默认屏幕指定图像和为高分辨率屏幕指定替代图像的示例。
  
```t4
  MyProject/
     app/
        manifest/
           AndroidManifest.xml
     java/
        MyActivity.java   
        res/
           drawable/  
              icon.png
              background.png
           drawable-hdpi/  
              icon.png
              background.png  
           layout/  
              activity_main.xml
              info.xml
           values/  
              strings.xml 
```
  
  下面是另一个示例，该示例指定默认语言的布局和阿拉伯语的替代布局。
  
```t4
  MyProject/
     app/
        manifest/
           AndroidManifest.xml
     java/
        MyActivity.java   
        res/
           drawable/  
              icon.png
              background.png
           drawable-hdpi/  
              icon.png
              background.png  
           layout/  
              activity_main.xml
              info.xml
           layout-ar/
              main.xml
           values/  
              strings.xml 
```
  
## 访问资源
  
  在应用程序开发期间，您将需要访问代码中或布局XML文件中的已定义资源。以下部分说明了如何在两种情况下访问资源-
  
  *用代码访问资源*
  
  编译Android应用程序时，将生成R类，其中包含res/目录中所有可用资源的资源ID 。您可以使用R类通过子目录和资源名称或直接使用资源ID来访问该资源。
  
  例如要访问res/drawable/myimage.png并设置ImageView，您将使用以下代码-
  
```java
  ImageView imageView = (ImageView) findViewById(R.id.myimageview);
  imageView.setImageResource(R.drawable.myimage);
```
  
  在这里，代码的第一行使用**R.id.myimageview**来获取在布局文件中以id myimageview定义的ImageView 。第二行代码使用**R.drawable.myimage**获取名称为myimage的图像，该图像位于/res下的drawable子目录中。
  
  考虑下一个示例，其中res/values/strings.xml具有以下定义-
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <resources>
     <string  name="hello">Hello, World!</string>
  </resources>
```
  
  现在您可以使用资源ID在ID为msg的TextView对象上设置文本，如下所示-
  
```java
  TextView msgTextView = (TextView) findViewById(R.id.msg);
  msgTextView.setText(R.string.hello);
```
  
  考虑具有以下定义的布局res/layout/activity_main.xml-
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="fill_parent"    
     android:layout_height="fill_parent"    
     android:orientation="vertical" >
  
     <TextView android:id="@+id/text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello, I am a TextView" />
  
     <Button android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello, I am a Button" />
  
  </LinearLayout>
```
  
  此应用程序代码将在onCreate()方法中为Activity加载此布局，如下所示：
  
```java
  public void onCreate(Bundle savedInstanceState) {
     super.onCreate(savedInstanceState);
     setContentView(R.layout.activity_main);
  }
```
  
  *访问XML资源*
  
  考虑以下资源XML res/values/strings.xml文件，其中包括颜色资源和字符串资源-
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <resources>
     <color name="opaque_red">#f00</color>
     <string name="hello">Hello!</string>
  </resources>
```
  
  现在，您可以在以下布局文件中使用这些资源来设置文本颜色和文本字符串，如下所示：
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <EditText xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="fill_parent"
     android:layout_height="fill_parent"
     android:textColor="@color/opaque_red"
     android:text="@string/hello" />
```
  
  现在，如果您再次浏览上一章，我将向您解释Hello World！例如，我相信您将对本章介绍的所有概念有更好的理解。因此，我强烈建议您查看上一章中的工作示例，并从基本的角度检查我如何使用各种资源。
