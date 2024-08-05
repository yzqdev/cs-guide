import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const r={},a=o(`<h1 id="xml解析器" tabindex="-1"><a class="header-anchor" href="#xml解析器"><span>XML解析器</span></a></h1><p><a href="https://www.jc2182.com/xml/xml-jiaocheng.html" target="_blank" rel="noopener noreferrer">XML</a>表示可扩展标记语言。XML是一种非常流行的格式，通常用于在Internet上共享数据。本章说明如何解析XML文件并从中提取必要的信息。Android提供了三种类型的XML解析器，分别是DOM，SAX和XMLPullParser。在所有这些之中，android推荐<strong>XMLPullParser</strong>，因为它高效且易于使用。因此，我们将使用XMLPullParser来解析XML。第一步是识别XML数据中您感兴趣的字段。例如。在下面给出的XML中，我们仅对获取温度感兴趣。</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot;?&gt;
  &lt;current&gt;
  
     &lt;city id=&quot;2643743&quot; name=&quot;London&quot;&gt;
        &lt;coord lon=&quot;-0.12574&quot; lat=&quot;51.50853&quot;/&gt;
        &lt;country&gt;GB&lt;/country&gt;
        &lt;sun rise=&quot;2013-10-08T06:13:56&quot; set=&quot;2013-10-08T17:21:45&quot;/&gt;
     &lt;/city&gt;
  
     &lt;temperature value=&quot;289.54&quot; min=&quot;289.15&quot; max=&quot;290.15&quot; unit=&quot;kelvin&quot;/&gt;
     &lt;humidity value=&quot;77&quot; unit=&quot;%&quot;/&gt;
     &lt;pressure value=&quot;1025&quot; unit=&quot;hPa&quot;/&gt;
  &lt;/current&gt;
</code></pre><h2 id="xml-解析" tabindex="-1"><a class="header-anchor" href="#xml-解析"><span>XML-解析</span></a></h2><p>在下一步中，我们将创建XMLPullParser对象，但是为了创建该对象，我们将首先创建XmlPullParserFactory对象，然后调用其newPullParser()方法创建XMLPullParser。其语法如下-</p><pre><code class="language-java">  private XmlPullParserFactory xmlFactoryObject = XmlPullParserFactory.newInstance();
  private XmlPullParser myparser = xmlFactoryObject.newPullParser();
</code></pre><p>下一步涉及为XmlPullParser指定包含XML的文件。它可以是文件，也可以是流。在我们的例子中它是一个流，其语法如下-</p><pre><code class="language-java">  myparser.setInput(stream, null);
</code></pre><p>最后一步是解析XML。XML文件包含事件，名称，文本，AttributesValue等，因此XMLPullParser具有用于解析XML文件的每个组件的单独功能。其语法如下-</p><pre><code class="language-java">  int event = myParser.getEventType();
  while (event != XmlPullParser.END_DOCUMENT)  {
     String name=myParser.getName();
     switch (event){
        case XmlPullParser.START_TAG:
        break;
  
        case XmlPullParser.END_TAG:
        if(name.equals(&quot;temperature&quot;)){
           temperature = myParser.getAttributeValue(null,&quot;value&quot;);
        }
        break;
     }             
     event = myParser.next();                                     
  }
</code></pre><p>方法getEventType返回发生的事件的类型。例如：Document start，tag start等。getName方法返回标签的名称，并且由于我们只对温度感兴趣，因此我们仅在条件语句中检查是否有温度标签，则调用getAttributeValue方法返回给我们。温度标签的值。除了这些方法之外，此类还提供了其他方法来更好地解析XML文件。这些方法在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>getAttributeCount()</strong></td><td>此方法只返回当前开始标记的属性数。</td></tr><tr><td><strong>getAttributeName（int index）</strong></td><td>此方法返回由索引值指定的属性的名称。</td></tr><tr><td><strong>getColumnNumber()</strong></td><td>此方法返回从0开始的当前列号。</td></tr><tr><td><strong>getDepth()</strong></td><td>此方法返回返回元素的当前深度。</td></tr><tr><td><strong>getLineNumber()</strong></td><td>返回当前行号，从1开始。</td></tr><tr><td><strong>getNamespace()</strong></td><td>此方法返回当前元素的名称空间URI。</td></tr><tr><td><strong>getPrefix()</strong></td><td>此方法返回当前元素的前缀。</td></tr><tr><td><strong>getName()</strong></td><td>此方法返回标签的名称。</td></tr><tr><td><strong>getText()</strong></td><td>此方法返回该特定元素的文本。</td></tr><tr><td><strong>isWhitespace()</strong></td><td>此方法检查当前的TEXT事件是否仅包含空格字符。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是一个演示XML DOM分析器用法的示例。它创建一个基本的应用程序，使您可以解析XML。 要试验该示例，您可以在实际设备或仿真器上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加必要的代码。</li><li>修改res/layout/activity_main以添加相应的XML组件</li><li>在assets/file.xml创建一个新的XML文件</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
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
              InputStream is = getAssets().open(&quot;file.xml&quot;);
  
              DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
              DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
              Document doc = dBuilder.parse(is);
  
              Element element=doc.getDocumentElement();
              element.normalize();
  
              NodeList nList = doc.getElementsByTagName(&quot;employee&quot;);
  
              for (int i=0; i &lt; nList.getLength(); i++) {
  
                  Node node = nList.item(i);
                  if (node.getNodeType() == Node.ELEMENT_NODE) {
                      Element element2 = (Element) node;
                      tv1.setText(tv1.getText()+&quot;\\nName : &quot; + getValue(&quot;name&quot;, element2)+&quot;\\n&quot;);
                      tv1.setText(tv1.getText()+&quot;Surname : &quot; + getValue(&quot;surname&quot;, element2)+&quot;\\n&quot;);
                      tv1.setText(tv1.getText()+&quot;-----------------------&quot;);
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
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      xmlns:tools=&quot;http://schemas.android.com/tools&quot;
      android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot;
      tools:context=&quot;.MainActivity&quot;&gt;
  
      &lt;TextView
          android:id=&quot;@+id/textView1&quot;
          android:layout_width=&quot;wrap_content&quot;
          android:layout_height=&quot;wrap_content&quot; /&gt;
  &lt;/RelativeLayout&gt;
</code></pre><p>以下是assets/file.xml文件的内容-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot;?&gt;
  &lt;records&gt;
      &lt;employee&gt;
          &lt;name&gt;Sairamkrishna&lt;/name&gt;
          &lt;surname&gt;Mammahe&lt;/surname&gt;
          &lt;salary&gt;50000&lt;/salary&gt;
      &lt;/employee&gt;
  
      &lt;employee&gt;
          &lt;name&gt;Gopal &lt;/name&gt;
          &lt;surname&gt;Varma&lt;/surname&gt;
          &lt;salary&gt;60000&lt;/salary&gt;
      &lt;/employee&gt;
  
      &lt;employee&gt;
          &lt;name&gt;Raja&lt;/name&gt;
          &lt;surname&gt;Hr&lt;/surname&gt;
          &lt;salary&gt;70000&lt;/salary&gt;
      &lt;/employee&gt;
  
  &lt;/records&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/xml.png" alt=""></p>`,23),l=[a];function i(d,s){return n(),e("div",null,l)}const m=t(r,[["render",i],["__file","xml.html.vue"]]),c=JSON.parse('{"path":"/android-tutor/advanced/xml.html","title":"XML解析器","lang":"zh-CN","frontmatter":{"description":"XML解析器 XML表示可扩展标记语言。XML是一种非常流行的格式，通常用于在Internet上共享数据。本章说明如何解析XML文件并从中提取必要的信息。Android提供了三种类型的XML解析器，分别是DOM，SAX和XMLPullParser。在所有这些之中，android推荐XMLPullParser，因为它高效且易于使用。因此，我们将使用XML...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/xml.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"XML解析器"}],["meta",{"property":"og:description","content":"XML解析器 XML表示可扩展标记语言。XML是一种非常流行的格式，通常用于在Internet上共享数据。本章说明如何解析XML文件并从中提取必要的信息。Android提供了三种类型的XML解析器，分别是DOM，SAX和XMLPullParser。在所有这些之中，android推荐XMLPullParser，因为它高效且易于使用。因此，我们将使用XML..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/xml.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"XML解析器\\",\\"image\\":[\\"https://www.jc2182.com/images/android/xml.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"XML-解析","slug":"xml-解析","link":"#xml-解析","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.96,"words":1187},"filePathRelative":"android-tutor/advanced/xml.md","localizedDate":"2023年5月22日","autoDesc":true}');export{m as comp,c as data};
