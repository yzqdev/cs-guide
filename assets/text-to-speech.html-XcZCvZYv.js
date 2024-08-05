import{_ as t,c as o,o as e,d as n}from"./app-CbULZrmi.js";const d={},a=n(`<h1 id="文字转语音" tabindex="-1"><a class="header-anchor" href="#文字转语音"><span>文字转语音</span></a></h1><p>Android允许您将文本转换为语音。您不仅可以转换它，还可以用多种不同的语言说文本。Android 为此提供了<strong>TextToSpeech</strong>类。为了使用此类，您需要实例化此类的对象并指定initListener。其语法如下-</p><pre><code class="language-java">  private EditText write;
  ttobj=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
     @Override
     public void onInit(int status) {
     }
  });
</code></pre><p>在此侦听器中，您必须指定<strong>TextToSpeech</strong>对象的属性，例如其语言，音高等。可以通过调用setLanguage()方法来设置语言。其语法如下-</p><pre><code class="language-java">  ttobj.setLanguage(Locale.UK);
</code></pre><p>setLanguage方法将Locale对象作为参数。下面列出了一些可用的语言环境-</p><table><thead><tr><th>语言</th><th>常量</th></tr></thead><tbody><tr><td>美式英语</td><td><strong>US</strong></td></tr><tr><td>加拿大法语</td><td><strong>CANADA_FRENCH</strong></td></tr><tr><td>德语</td><td><strong>GERMANY</strong></td></tr><tr><td>意大利语</td><td><strong>ITALY</strong></td></tr><tr><td>日语</td><td><strong>JAPAN</strong></td></tr><tr><td>汉语</td><td><strong>CHINA</strong></td></tr></tbody></table><p>设置语言后，您可以调用该类的<strong>speak</strong>方法讲文本。其语法如下-</p><pre><code class="language-java">  ttobj.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null);
</code></pre><p>除speak方法外，TextToSpeech类中还有其他一些方法可用。它们在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>addSpeech(String text, String filename)</strong></td><td>此方法在文本字符串和声音文件之间添加映射。</td></tr><tr><td><strong>getLanguage()</strong></td><td>此方法返回描述语言的Locale实例。</td></tr><tr><td><strong>isSpeaking()</strong></td><td>此方法检查TextToSpeech引擎是否正在忙于讲话。</td></tr><tr><td><strong>setPitch(float pitch)</strong></td><td>此方法设置TextToSpeech引擎的语音音调。</td></tr><tr><td><strong>setSpeechRate(float speechRate)</strong></td><td>此方法设置语音速率。</td></tr><tr><td><strong>shutdown()</strong></td><td>此方法释放TextToSpeech引擎使用的资源。</td></tr><tr><td><strong>stop()</strong></td><td>这种方法停止说话。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>下面的示例演示TextToSpeech类的用法。它创建了一个基本应用程序，可让您设置书写文字并说出来。要试验此示例，您需要在实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加TextToSpeech代码。</li><li>修改布局XML文件res/layout/activity_main.xml如果需要，可添加任何GUI组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.speech.tts.TextToSpeech;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.Toast;
  
  import java.util.Locale;
  
  public class MainActivity extends Activity {
      TextToSpeech t1;
      EditText ed1;
      Button b1;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          ed1=(EditText)findViewById(R.id.editText);
          b1=(Button)findViewById(R.id.button);
  
          t1=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
              @Override
              public void onInit(int status) {
                  if(status != TextToSpeech.ERROR) {
                      t1.setLanguage(Locale.UK);
                  }
              }
          });
  
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  String toSpeak = ed1.getText().toString();
                  Toast.makeText(getApplicationContext(), toSpeak,Toast.LENGTH_SHORT).show();
                  t1.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null);
              }
          });
      }
  
      public void onPause(){
          if(t1 !=null){
              t1.stop();
              t1.shutdown();
          }
          super.onPause();
      }
  }
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      xmlns:tools=&quot;http://schemas.android.com/tools&quot;
      android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot;
      tools:context=&quot;.MainActivity&quot;
      android:transitionGroup=&quot;true&quot;&gt;
  
      &lt;TextView android:text=&quot;文字转语音示例&quot;
          android:layout_width=&quot;wrap_content&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:id=&quot;@+id/textview&quot;
          android:textSize=&quot;35sp&quot;
          android:layout_alignParentTop=&quot;true&quot;
          android:layout_centerHorizontal=&quot;true&quot; /&gt;
  
      &lt;TextView
          android:layout_width=&quot;wrap_content&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:text=&quot;蝴蝶教程&quot;
          android:id=&quot;@+id/textView&quot;
          android:layout_below=&quot;@+id/textview&quot;
          android:layout_centerHorizontal=&quot;true&quot;
          android:textColor=&quot;#ff7aff24&quot;
          android:textSize=&quot;35dp&quot; /&gt;
  
      &lt;ImageView
          android:layout_width=&quot;wrap_content&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:id=&quot;@+id/imageView&quot;
          android:src=&quot;@drawable/logo&quot;
          android:background=&quot;#11223300&quot;
          android:layout_below=&quot;@+id/textView&quot;
          android:layout_centerHorizontal=&quot;true&quot;  /&gt;
  
      &lt;EditText
          android:layout_width=&quot;wrap_content&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:id=&quot;@+id/editText&quot;
          android:layout_below=&quot;@+id/imageView&quot;
          android:layout_marginTop=&quot;46dp&quot;
          android:hint=&quot;输入文字&quot;
          android:layout_alignParentRight=&quot;true&quot;
          android:layout_alignParentEnd=&quot;true&quot;
          android:layout_alignParentLeft=&quot;true&quot;
          android:layout_alignParentStart=&quot;true&quot;
          android:textColor=&quot;#ff7aff10&quot;
          android:textColorHint=&quot;#ffff23d1&quot; /&gt;
  
      &lt;Button
          android:id=&quot;@+id/button&quot;
          android:layout_width=&quot;130dp&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:layout_below=&quot;@+id/editText&quot;
          android:layout_centerHorizontal=&quot;true&quot;
          android:layout_marginTop=&quot;46dp&quot;
          android:text=&quot;文字转语音&quot; /&gt;
  
  &lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/texttospeech1.png" alt=""></p><p>输入文字，点击按钮，您将听到声音。</p><p><img src="https://www.jc2182.com/images/android/texttospeech2.png" alt=""></p>`,22),i=[a];function r(u,p){return e(),o("div",null,i)}const s=t(d,[["render",r],["__file","text-to-speech.html.vue"]]),l=JSON.parse('{"path":"/android-tutor/advanced/text-to-speech.html","title":"文字转语音","lang":"zh-CN","frontmatter":{"description":"文字转语音 Android允许您将文本转换为语音。您不仅可以转换它，还可以用多种不同的语言说文本。Android 为此提供了TextToSpeech类。为了使用此类，您需要实例化此类的对象并指定initListener。其语法如下- 在此侦听器中，您必须指定TextToSpeech对象的属性，例如其语言，音高等。可以通过调用setLanguage()方...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/text-to-speech.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"文字转语音"}],["meta",{"property":"og:description","content":"文字转语音 Android允许您将文本转换为语音。您不仅可以转换它，还可以用多种不同的语言说文本。Android 为此提供了TextToSpeech类。为了使用此类，您需要实例化此类的对象并指定initListener。其语法如下- 在此侦听器中，您必须指定TextToSpeech对象的属性，例如其语言，音高等。可以通过调用setLanguage()方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/texttospeech1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"文字转语音\\",\\"image\\":[\\"https://www.jc2182.com/images/android/texttospeech1.png\\",\\"https://www.jc2182.com/images/android/texttospeech2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.19,"words":956},"filePathRelative":"android-tutor/advanced/text-to-speech.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,l as data};
