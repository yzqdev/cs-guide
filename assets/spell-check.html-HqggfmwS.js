import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const i={},d=o(`<h1 id="拼写检查器" tabindex="-1"><a class="header-anchor" href="#拼写检查器"><span>拼写检查器</span></a></h1><p>Android平台提供了拼写检查器框架，可让您在应用程序中实施和访问拼写检查。为了使用拼写检查器，您需要实现<strong>SpellCheckerSessionListener</strong>接口并覆盖其方法。其语法如下-</p><pre><code class="language-java">  public class HelloSpellCheckerActivity extends Activity implements SpellCheckerSessionListener {
     @Override
     public void onGetSuggestions(final SuggestionsInfo[] arg0) {
        // TODO Auto-generated method stub
     }
  
     @Override
     public void onGetSentenceSuggestions(SentenceSuggestionsInfo[] arg0) {
        // TODO Auto-generated method stub
     }
  }
</code></pre><p>接下来，您需要创建一个<strong>SpellCheckerSession</strong>类的对象。可以通过调用<strong>TextServicesManager</strong>类的<strong>newSpellCheckerSession</strong>方法来实例化此对象。此类处理应用程序和文本服务之间的交互。您需要请求系统服务以实例化它。其语法如下-</p><pre><code class="language-java">  private SpellCheckerSession mScs;
  final TextServicesManager tsm = (TextServicesManager) getSystemService(
  Context.TEXT_SERVICES_MANAGER_SERVICE);
  mScs = tsm.newSpellCheckerSession(null, null, this, true);   
</code></pre><p>您需要做的最后一件事是调用<strong>getSuggestions</strong>方法以获取您想要的任何文本的建议。这些建议将传递到<strong>onGetSuggestions</strong>方法上，您可以在其中执行任何所需的操作。</p><pre><code class="language-java">  mScs.getSuggestions(new TextInfo(editText1.getText().toString()), 3);  
</code></pre><p>此方法有两个参数。第一个参数是文本信息对象形式的字符串，第二个参数是用于区分建议的cookie编号。除了这些方法外，SpellCheckerSession类还提供了其他方法，可以更好地处理建议。这些方法在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>cancel()</strong></td><td>取消待处理且正在运行的拼写检查任务</td></tr><tr><td><strong>close()</strong></td><td>完成此会话，并允许TextServicesManagerService断开绑定的拼写检查器</td></tr><tr><td><strong>getSentenceSuggestions(TextInfo[] textInfos, int suggestionsLimit)</strong></td><td>从指定的句子中获取建议</td></tr><tr><td><strong>getSpellChecker()</strong></td><td>获取此拼写检查器会话具有的拼写检查器服务信息。</td></tr><tr><td><strong>isSessionDisconnected()</strong></td><td>如果与该会话的文本服务的连接已断开并且未激活，则为True。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是演示拼写检查器用法的示例。它创建了一个基本的拼写检查应用程序，使您可以编写文本并获得建议。要试验此示例，可以在实际设备或仿真器中运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加必要的代码。</li><li>修改res/layout/main以添加相应的XML组件</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Context;
  import android.os.Bundle;
  import android.view.View;
  import android.view.textservice.SentenceSuggestionsInfo;
  import android.view.textservice.SpellCheckerSession;
  import android.view.textservice.SuggestionsInfo;
  import android.view.textservice.TextInfo;
  import android.view.textservice.TextServicesManager;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.TextView;
  import android.widget.Toast;

  public class MainActivity extends Activity implements SpellCheckerSession.SpellCheckerSessionListener {
      Button b1;
      TextView tv1;
      EditText ed1;
      private SpellCheckerSession mScs;

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1=(Button)findViewById(R.id.button);
          tv1=(TextView)findViewById(R.id.textView3);
    
          ed1=(EditText)findViewById(R.id.editText);
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  Toast.makeText(getApplicationContext(), ed1.getText().toString(),Toast.LENGTH_SHORT).show();
                  TextInfo item =  new TextInfo(ed1.getText().toString());
                  //TextInfo[] ti = {item};
                  mScs.getSuggestions(item, 3);
              }
          });
      }
    
      public void onResume() {
          super.onResume();
          final TextServicesManager tsm = (TextServicesManager) getSystemService(Context.TEXT_SERVICES_MANAGER_SERVICE);
          mScs = tsm.newSpellCheckerSession(null, null, this, true);
      }
    
      public void onPause() {
          super.onPause();
          if (mScs != null) {
              mScs.close();
          }
      }
    
      public void onGetSuggestions(final SuggestionsInfo[] arg0) {
          final StringBuilder sb = new StringBuilder();
    
          for (int i = 0; i &lt; arg0.length; ++i) {
              // Returned suggestions are contained in SuggestionsInfo
              final int len = arg0[i].getSuggestionsCount();
              sb.append(&#39;\\n&#39;);
    
              for (int j = 0; j &lt; len; ++j) {
                  sb.append(&quot;,&quot; + arg0[i].getSuggestionAt(j));
              }
    
              sb.append(&quot; (&quot; + len + &quot;)&quot;);
          }
    
          runOnUiThread(new Runnable() {
              public void run() {
                  tv1.append(sb.toString());
              }
          });
      }
    
      @Override
      public void onGetSentenceSuggestions(SentenceSuggestionsInfo[] arg0) {
    
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/textview&quot;
        android:layout_width=&quot;343dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;3dp&quot;
        android:text=&quot;拼写检查示例 &quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;108dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginBottom=&quot;4dp&quot;
        android:text=&quot;建议&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText&quot;
        android:hint=&quot;Enter Text&quot;
        android:layout_above=&quot;@+id/button&quot;
        android:layout_marginBottom=&quot;56dp&quot;
        android:focusable=&quot;true&quot;
        android:textColorHighlight=&quot;#ff7eff15&quot;
        android:textColorHint=&quot;#ffff25e6&quot;
        android:layout_alignRight=&quot;@+id/textview&quot;
        android:layout_alignEnd=&quot;@+id/textview&quot;
        android:layout_alignLeft=&quot;@+id/textview&quot;
        android:layout_alignStart=&quot;@+id/textview&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:background=&quot;#22113322&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView3&quot;
        android:gravity=&quot;start&quot;
        android:layout_width=&quot;325dp&quot;
        android:layout_height=&quot;308dp&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignLeft=&quot;@+id/imageView&quot;
        android:layout_marginLeft=&quot;-11dp&quot;
        android:layout_marginTop=&quot;8dp&quot;
        android:text=&quot;建议&quot;
        android:textSize=&quot;25sp&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/spellingchecker1.png" alt=""></p><p>尝试多次输入，点击建议</p><p><img src="https://www.jc2182.com/images/android/spellingchecker2.png" alt=""></p>`,20),r=[d];function a(u,s){return n(),e("div",null,r)}const c=t(i,[["render",a],["__file","spell-check.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/spell-check.html","title":"拼写检查器","lang":"zh-CN","frontmatter":{"description":"拼写检查器 Android平台提供了拼写检查器框架，可让您在应用程序中实施和访问拼写检查。为了使用拼写检查器，您需要实现SpellCheckerSessionListener接口并覆盖其方法。其语法如下- 接下来，您需要创建一个SpellCheckerSession类的对象。可以通过调用TextServicesManager类的newSpellChec...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/spell-check.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"拼写检查器"}],["meta",{"property":"og:description","content":"拼写检查器 Android平台提供了拼写检查器框架，可让您在应用程序中实施和访问拼写检查。为了使用拼写检查器，您需要实现SpellCheckerSessionListener接口并覆盖其方法。其语法如下- 接下来，您需要创建一个SpellCheckerSession类的对象。可以通过调用TextServicesManager类的newSpellChec..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/spellingchecker1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"拼写检查器\\",\\"image\\":[\\"https://www.jc2182.com/images/android/spellingchecker1.png\\",\\"https://www.jc2182.com/images/android/spellingchecker2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.84,"words":1152},"filePathRelative":"android-tutor/advanced/spell-check.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,p as data};
