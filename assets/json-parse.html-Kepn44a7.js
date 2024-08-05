import{_ as t,c as n,o,d as e}from"./app-CbULZrmi.js";const i={},r=e(`<h1 id="json解析器" tabindex="-1"><a class="header-anchor" href="#json解析器"><span>JSON解析器</span></a></h1><p><a href="https://www.jc2182.com/json/javascript-json-intro.html" target="_blank" rel="noopener noreferrer">JSON</a>代表JavaScript Object Notation，它是一种独立的数据交换格式，是<a href="https://www.jc2182.com/xml/xml-jiaocheng.html" target="_blank" rel="noopener noreferrer">XML</a>的最佳替代方案。本章介绍如何解析JSON文件并从中提取必要的信息。Android提供了四个不同的类来处理JSON数据。这些类是JSONArray，JSONObject，JSONStringer和JSONTokenizer。第一步是识别JSON数据中您感兴趣的字段。例如。在下面给出的JSON中，我们只想获取温度。</p><pre><code class="language-json">  {
     &quot;sys&quot;:
     {
        &quot;country&quot;:&quot;GB&quot;,
        &quot;sunrise&quot;:1381107633,
        &quot;sunset&quot;:1381149604
     },
     &quot;weather&quot;:[
        {
           &quot;id&quot;:711,
           &quot;main&quot;:&quot;Smoke&quot;,
           &quot;description&quot;:&quot;smoke&quot;,
           &quot;icon&quot;:&quot;50n&quot;
        }
     ],
  
    &quot;main&quot;:
     {
        &quot;temp&quot;:304.15,
        &quot;pressure&quot;:1009,
     }
  }
</code></pre><h2 id="json-解析" tabindex="-1"><a class="header-anchor" href="#json-解析"><span>JSON-解析</span></a></h2><p>为了解析JSON对象，我们将创建一个<strong>JSONObject</strong>类的对象，并指定一个包含JSON数据的字符串。它的语法是-</p><pre><code class="language-java">  JSONObject sys  = reader.getJSONObject(&quot;sys&quot;);
  country = sys.getString(&quot;country&quot;);
  
  JSONObject main  = reader.getJSONObject(&quot;main&quot;);
  temperature = main.getString(&quot;temp&quot;);
</code></pre><p>方法getJSONObject返回JSON对象。方法getString返回指定键的字符串值。 除了这些方法之外，此类还提供了其他方法来更好地解析JSON文件。这些方法在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>get(String name)</strong></td><td>此方法只返回值，但以对象类型的形式</td></tr><tr><td><strong>getBoolean(String name)</strong></td><td>此方法返回键指定的布尔值</td></tr><tr><td><strong>getDouble(String name)</strong></td><td>此方法返回键指定的双精度值</td></tr><tr><td><strong>getInt(String name)</strong></td><td>此方法返回键指定的整数值</td></tr><tr><td><strong>getLong(String name)</strong></td><td>此方法返回键指定的长值</td></tr><tr><td><strong>length()</strong></td><td>此方法返回此对象中名称/值映射的数量。</td></tr><tr><td><strong>names()</strong></td><td>此方法返回一个包含此对象中字符串名称的数组</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>要试验该示例，您可以在实际设备或仿真器上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件添加必要代码。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>新建src/HttpHandler.java HTTP网络请求类。</li><li>新建res/xml/network-security-config.xml 网络安全配置文件。</li><li>修改AndroidManifest.xml 配置网络权限和网络安全选项。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
   

  import android.annotation.TargetApi;
  import android.app.Activity;
  import android.os.AsyncTask;
  import android.os.Build;
  import android.os.Bundle;
  import android.util.Log;
  import android.widget.ListAdapter;
  import android.widget.ListView;
  import android.widget.SimpleAdapter;
  import android.widget.Toast;

  import org.json.JSONArray;
  import org.json.JSONObject;

  import java.util.ArrayList;
  import java.util.HashMap;

  public class MainActivity extends Activity {
      private String TAG = MainActivity.class.getSimpleName();
      private ListView lv;

      ArrayList&lt;HashMap&lt;String, String&gt;&gt; contactList;
    
      @TargetApi(Build.VERSION_CODES.CUPCAKE)
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          contactList = new ArrayList&lt;&gt;();
          lv = (ListView) findViewById(R.id.list);
    
          new GetContacts().execute();
      }
    
      @TargetApi(Build.VERSION_CODES.CUPCAKE)
      private class GetContacts extends AsyncTask&lt;Void, Void, Void&gt; {
          @Override
          protected void onPreExecute() {
              super.onPreExecute();
              Toast.makeText(MainActivity.this,&quot;Json Data is downloading&quot;,Toast.LENGTH_LONG).show();
    
          }
    
          @Override
          protected Void doInBackground(Void... arg0) {
              HttpHandler sh = new HttpHandler();
              // Making a request to url and getting response
              String url = &quot;http://api.androidhive.info/contacts/&quot;;
              String jsonStr = sh.makeServiceCall(url);
    
              Log.e(TAG, &quot;Response from url: &quot; + jsonStr);
              if (jsonStr != null) {
                  try {
                      JSONObject jsonObj = new JSONObject(jsonStr);
    
                      // Getting JSON Array node
                      JSONArray contacts = jsonObj.getJSONArray(&quot;contacts&quot;);
    
                      // looping through All Contacts
                      for (int i = 0; i &lt; contacts.length(); i++) {
                          JSONObject c = contacts.getJSONObject(i);
                          String id = c.getString(&quot;id&quot;);
                          String name = c.getString(&quot;name&quot;);
                          String email = c.getString(&quot;email&quot;);
                          String address = c.getString(&quot;address&quot;);
                          String gender = c.getString(&quot;gender&quot;);
    
                          // Phone node is JSON Object
                          JSONObject phone = c.getJSONObject(&quot;phone&quot;);
                          String mobile = phone.getString(&quot;mobile&quot;);
                          String home = phone.getString(&quot;home&quot;);
                          String office = phone.getString(&quot;office&quot;);
    
                          // tmp hash map for single contact
                          HashMap&lt;String, String&gt; contact = new HashMap&lt;&gt;();
    
                          // adding each child node to HashMap key =&gt; value
                          contact.put(&quot;id&quot;, id);
                          contact.put(&quot;name&quot;, name);
                          contact.put(&quot;email&quot;, email);
                          contact.put(&quot;mobile&quot;, mobile);
    
                          // adding contact to contact list
                          contactList.add(contact);
                      }
                  } catch (final Exception e) {
                      Log.e(TAG, &quot;Json parsing error: &quot; + e.getMessage());
                      runOnUiThread(new Runnable() {
                          @Override
                          public void run() {
                              Toast.makeText(getApplicationContext(), &quot;Json parsing error: &quot; + e.getMessage(),
                                      Toast.LENGTH_LONG).show();
                          }
                      });
    
                  }
    
              } else {
                  Log.e(TAG, &quot;Couldn&#39;t get json from server.&quot;);
                  runOnUiThread(new Runnable() {
                      @Override
                      public void run() {
                          Toast.makeText(getApplicationContext(), &quot;Couldn&#39;t get json from server. Check LogCat for possible errors!&quot;, Toast.LENGTH_LONG).show();
                      }
                  });
              }
    
              return null;
          }
    
          @Override
          protected void onPostExecute(Void result) {
              super.onPostExecute(result);
              ListAdapter adapter = new SimpleAdapter(MainActivity.this, contactList, R.layout.list_item, new String[]{ &quot;email&quot;,&quot;mobile&quot;}, new int[]{R.id.email, R.id.mobile});
              lv.setAdapter(adapter);
          }
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;com.jc2182.demo.MainActivity&quot;&gt;

    &lt;ListView
        android:id=&quot;@+id/list&quot;
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot; /&gt;
&lt;/RelativeLayout&gt;
</code></pre><p>以下是res/xml/network-security-config.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;network-security-config&gt;
    &lt;base-config cleartextTrafficPermitted=&quot;true&quot; /&gt;
&lt;/network-security-config&gt;
</code></pre><p>以下是res/layout/list_item.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;fill_parent&quot;
    android:layout_height=&quot;wrap_content&quot;
    android:orientation=&quot;vertical&quot; &gt;
    &lt;TextView
        android:id=&quot;@+id/email&quot;
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:paddingBottom=&quot;2dip&quot;
        android:textColor=&quot;@color/colorAccent&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/mobile&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:textColor=&quot;#5d5d5d&quot;
        android:textStyle=&quot;bold&quot; /&gt;
&lt;/LinearLayout&gt;
</code></pre><p>以下是AndroidManifest.xml文件-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.demo&quot;&gt;
    &lt;uses-permission android:name=&quot;android.permission.INTERNET&quot;/&gt;
    &lt;application
        android:allowBackup=&quot;true&quot;
        android:icon=&quot;@mipmap/ic_launcher&quot;
        android:label=&quot;@string/app_name&quot;
        android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
        android:networkSecurityConfig=&quot;@xml/network_security_config&quot;
        android:supportsRtl=&quot;true&quot;
        android:theme=&quot;@style/AppTheme&quot;&gt;
        &lt;activity android:name=&quot;.MainActivity&quot;&gt;
            &lt;intent-filter&gt;
                &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;

                &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

    &lt;/application&gt;

&lt;/manifest&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/json1.png" alt=""></p>`,23),a=[r];function d(u,s){return o(),n("div",null,a)}const l=t(i,[["render",d],["__file","json-parse.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/json-parse.html","title":"JSON解析器","lang":"zh-CN","frontmatter":{"description":"JSON解析器 JSON代表JavaScript Object Notation，它是一种独立的数据交换格式，是XML的最佳替代方案。本章介绍如何解析JSON文件并从中提取必要的信息。Android提供了四个不同的类来处理JSON数据。这些类是JSONArray，JSONObject，JSONStringer和JSONTokenizer。第一步是识别J...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/json-parse.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"JSON解析器"}],["meta",{"property":"og:description","content":"JSON解析器 JSON代表JavaScript Object Notation，它是一种独立的数据交换格式，是XML的最佳替代方案。本章介绍如何解析JSON文件并从中提取必要的信息。Android提供了四个不同的类来处理JSON数据。这些类是JSONArray，JSONObject，JSONStringer和JSONTokenizer。第一步是识别J..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/json1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JSON解析器\\",\\"image\\":[\\"https://www.jc2182.com/images/android/json1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"JSON-解析","slug":"json-解析","link":"#json-解析","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1233},"filePathRelative":"android-tutor/advanced/json-parse.md","localizedDate":"2023年5月22日","autoDesc":true}');export{l as comp,p as data};
