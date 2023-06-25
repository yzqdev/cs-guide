# XML解析器
  
  [XML](https://www.jc2182.com/xml/xml-jiaocheng.html)表示可扩展标记语言。XML是一种非常流行的格式，通常用于在Internet上共享数据。本章说明如何解析XML文件并从中提取必要的信息。Android提供了三种类型的XML解析器，分别是DOM，SAX和XMLPullParser。在所有这些之中，android推荐**XMLPullParser**，因为它高效且易于使用。因此，我们将使用XMLPullParser来解析XML。第一步是识别XML数据中您感兴趣的字段。例如。在下面给出的XML中，我们仅对获取温度感兴趣。
  
```xml
  <?xml version="1.0"?>
  <current>
  
     <city id="2643743" name="London">
        <coord lon="-0.12574" lat="51.50853"/>
        <country>GB</country>
        <sun rise="2013-10-08T06:13:56" set="2013-10-08T17:21:45"/>
     </city>
  
     <temperature value="289.54" min="289.15" max="290.15" unit="kelvin"/>
     <humidity value="77" unit="%"/>
     <pressure value="1025" unit="hPa"/>
  </current>
```
  
## XML-解析
  
  在下一步中，我们将创建XMLPullParser对象，但是为了创建该对象，我们将首先创建XmlPullParserFactory对象，然后调用其newPullParser()方法创建XMLPullParser。其语法如下-
  
```java
  private XmlPullParserFactory xmlFactoryObject = XmlPullParserFactory.newInstance();
  private XmlPullParser myparser = xmlFactoryObject.newPullParser();
```
  
  下一步涉及为XmlPullParser指定包含XML的文件。它可以是文件，也可以是流。在我们的例子中它是一个流，其语法如下-
  
```java
  myparser.setInput(stream, null);
```
  
  最后一步是解析XML。XML文件包含事件，名称，文本，AttributesValue等，因此XMLPullParser具有用于解析XML文件的每个组件的单独功能。其语法如下-
  
```java
  int event = myParser.getEventType();
  while (event != XmlPullParser.END_DOCUMENT)  {
     String name=myParser.getName();
     switch (event){
        case XmlPullParser.START_TAG:
        break;
  
        case XmlPullParser.END_TAG:
        if(name.equals("temperature")){
           temperature = myParser.getAttributeValue(null,"value");
        }
        break;
     }             
     event = myParser.next();                                     
  }
```
  
  方法getEventType返回发生的事件的类型。例如：Document start，tag start等。getName方法返回标签的名称，并且由于我们只对温度感兴趣，因此我们仅在条件语句中检查是否有温度标签，则调用getAttributeValue方法返回给我们。温度标签的值。除了这些方法之外，此类还提供了其他方法来更好地解析XML文件。这些方法在下面列出-
  
  | 方法                              | 说明                                         |
  | --------------------------------- | -------------------------------------------- |
  | **getAttributeCount()**           | 此方法只返回当前开始标记的属性数。           |
  | **getAttributeName（int index）** | 此方法返回由索引值指定的属性的名称。         |
  | **getColumnNumber()**             | 此方法返回从0开始的当前列号。                |
  | **getDepth()**                    | 此方法返回返回元素的当前深度。               |
  | **getLineNumber()**               | 返回当前行号，从1开始。                      |
  | **getNamespace()**                | 此方法返回当前元素的名称空间URI。            |
  | **getPrefix()**                   | 此方法返回当前元素的前缀。                   |
  | **getName()**                     | 此方法返回标签的名称。                       |
  | **getText()**                     | 此方法返回该特定元素的文本。                 |
  | **isWhitespace()**                | 此方法检查当前的TEXT事件是否仅包含空格字符。 |

## 示例
  
  这是一个演示XML DOM分析器用法的示例。它创建一个基本的应用程序，使您可以解析XML。 要试验该示例，您可以在实际设备或仿真器上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加必要的代码。
  3. 修改res/layout/activity_main以添加相应的XML组件
  4. 在assets/file.xml创建一个新的XML文件
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  
  import android.view.TextureView.SurfaceTextureListener;
  import android.widget.TextView;
  
  import org.w3c.dom.Document;
  import org.w3c.dom.Element;
  import org.w3c.dom.Node;
  import org.w3c.dom.NodeList;
  
  import java.io.InputStream;
  
  import javax.xml.parsers.DocumentBuilder;
  import javax.xml.parsers.DocumentBuilderFactory;
  
  public class MainActivity extends Activity {
      TextView tv1;
  
      @Override
      public void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          tv1=(TextView)findViewById(R.id.textView1);
  
          try {
              InputStream is = getAssets().open("file.xml");
  
              DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
              DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
              Document doc = dBuilder.parse(is);
  
              Element element=doc.getDocumentElement();
              element.normalize();
  
              NodeList nList = doc.getElementsByTagName("employee");
  
              for (int i=0; i < nList.getLength(); i++) {
  
                  Node node = nList.item(i);
                  if (node.getNodeType() == Node.ELEMENT_NODE) {
                      Element element2 = (Element) node;
                      tv1.setText(tv1.getText()+"\nName : " + getValue("name", element2)+"\n");
                      tv1.setText(tv1.getText()+"Surname : " + getValue("surname", element2)+"\n");
                      tv1.setText(tv1.getText()+"-----------------------");
                  }
              }
  
          } catch (Exception e) {e.printStackTrace();}
  
      }
  
      private static String getValue(String tag, Element element) {
          NodeList nodeList = element.getElementsByTagName(tag).item(0).getChildNodes();
          Node node = nodeList.item(0);
          return node.getNodeValue();
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
      tools:context=".MainActivity">
  
      <TextView
          android:id="@+id/textView1"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content" />
  </RelativeLayout>
```
  
  以下是assets/file.xml文件的内容-
  
```xml
  <?xml version="1.0"?>
  <records>
      <employee>
          <name>Sairamkrishna</name>
          <surname>Mammahe</surname>
          <salary>50000</salary>
      </employee>
  
      <employee>
          <name>Gopal </name>
          <surname>Varma</surname>
          <salary>60000</salary>
      </employee>
  
      <employee>
          <name>Raja</name>
          <surname>Hr</surname>
          <salary>70000</salary>
      </employee>
  
  </records>
```
  
  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-
  
  ![](https://www.jc2182.com/images/android/xml.png)
