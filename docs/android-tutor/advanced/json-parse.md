# JSON解析器
  
  [JSON](https://www.jc2182.com/json/javascript-json-intro.html)代表JavaScript Object Notation，它是一种独立的数据交换格式，是[XML](https://www.jc2182.com/xml/xml-jiaocheng.html)的最佳替代方案。本章介绍如何解析JSON文件并从中提取必要的信息。Android提供了四个不同的类来处理JSON数据。这些类是JSONArray，JSONObject，JSONStringer和JSONTokenizer。第一步是识别JSON数据中您感兴趣的字段。例如。在下面给出的JSON中，我们只想获取温度。
  
```json
  {
     "sys":
     {
        "country":"GB",
        "sunrise":1381107633,
        "sunset":1381149604
     },
     "weather":[
        {
           "id":711,
           "main":"Smoke",
           "description":"smoke",
           "icon":"50n"
        }
     ],
  
    "main":
     {
        "temp":304.15,
        "pressure":1009,
     }
  }
```
  
## JSON-解析
  
  为了解析JSON对象，我们将创建一个**JSONObject**类的对象，并指定一个包含JSON数据的字符串。它的语法是-
  
```java
  JSONObject sys  = reader.getJSONObject("sys");
  country = sys.getString("country");
  
  JSONObject main  = reader.getJSONObject("main");
  temperature = main.getString("temp");
```
  
  方法getJSONObject返回JSON对象。方法getString返回指定键的字符串值。 除了这些方法之外，此类还提供了其他方法来更好地解析JSON文件。这些方法在下面列出-
  
  | 方法                        | 说明                                       |
  | --------------------------- | ------------------------------------------ |
  | **get(String name)**        | 此方法只返回值，但以对象类型的形式         |
  | **getBoolean(String name)** | 此方法返回键指定的布尔值                   |
  | **getDouble(String name)**  | 此方法返回键指定的双精度值                 |
  | **getInt(String name)**     | 此方法返回键指定的整数值                   |
  | **getLong(String name)**    | 此方法返回键指定的长值                     |
  | **length()**                | 此方法返回此对象中名称/值映射的数量。      |
  | **names()**                 | 此方法返回一个包含此对象中字符串名称的数组 |

## 示例
  
  要试验该示例，您可以在实际设备或仿真器上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件添加必要代码。
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 新建src/HttpHandler.java HTTP网络请求类。
  5. 新建res/xml/network-security-config.xml 网络安全配置文件。
  6. 修改AndroidManifest.xml 配置网络权限和网络安全选项。
  7. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
   

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

      ArrayList<HashMap<String, String>> contactList;
    
      @TargetApi(Build.VERSION_CODES.CUPCAKE)
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          contactList = new ArrayList<>();
          lv = (ListView) findViewById(R.id.list);
    
          new GetContacts().execute();
      }
    
      @TargetApi(Build.VERSION_CODES.CUPCAKE)
      private class GetContacts extends AsyncTask<Void, Void, Void> {
          @Override
          protected void onPreExecute() {
              super.onPreExecute();
              Toast.makeText(MainActivity.this,"Json Data is downloading",Toast.LENGTH_LONG).show();
    
          }
    
          @Override
          protected Void doInBackground(Void... arg0) {
              HttpHandler sh = new HttpHandler();
              // Making a request to url and getting response
              String url = "http://api.androidhive.info/contacts/";
              String jsonStr = sh.makeServiceCall(url);
    
              Log.e(TAG, "Response from url: " + jsonStr);
              if (jsonStr != null) {
                  try {
                      JSONObject jsonObj = new JSONObject(jsonStr);
    
                      // Getting JSON Array node
                      JSONArray contacts = jsonObj.getJSONArray("contacts");
    
                      // looping through All Contacts
                      for (int i = 0; i < contacts.length(); i++) {
                          JSONObject c = contacts.getJSONObject(i);
                          String id = c.getString("id");
                          String name = c.getString("name");
                          String email = c.getString("email");
                          String address = c.getString("address");
                          String gender = c.getString("gender");
    
                          // Phone node is JSON Object
                          JSONObject phone = c.getJSONObject("phone");
                          String mobile = phone.getString("mobile");
                          String home = phone.getString("home");
                          String office = phone.getString("office");
    
                          // tmp hash map for single contact
                          HashMap<String, String> contact = new HashMap<>();
    
                          // adding each child node to HashMap key => value
                          contact.put("id", id);
                          contact.put("name", name);
                          contact.put("email", email);
                          contact.put("mobile", mobile);
    
                          // adding contact to contact list
                          contactList.add(contact);
                      }
                  } catch (final Exception e) {
                      Log.e(TAG, "Json parsing error: " + e.getMessage());
                      runOnUiThread(new Runnable() {
                          @Override
                          public void run() {
                              Toast.makeText(getApplicationContext(), "Json parsing error: " + e.getMessage(),
                                      Toast.LENGTH_LONG).show();
                          }
                      });
    
                  }
    
              } else {
                  Log.e(TAG, "Couldn't get json from server.");
                  runOnUiThread(new Runnable() {
                      @Override
                      public void run() {
                          Toast.makeText(getApplicationContext(), "Couldn't get json from server. Check LogCat for possible errors!", Toast.LENGTH_LONG).show();
                      }
                  });
              }
    
              return null;
          }
    
          @Override
          protected void onPostExecute(Void result) {
              super.onPostExecute(result);
              ListAdapter adapter = new SimpleAdapter(MainActivity.this, contactList, R.layout.list_item, new String[]{ "email","mobile"}, new int[]{R.id.email, R.id.mobile});
              lv.setAdapter(adapter);
          }
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
    tools:context="com.jc2182.demo.MainActivity">

    <ListView
        android:id="@+id/list"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />
</RelativeLayout>
```

  以下是res/xml/network-security-config.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

  以下是res/layout/list_item.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical" >
    <TextView
        android:id="@+id/email"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:paddingBottom="2dip"
        android:textColor="@color/colorAccent" />

    <TextView
        android:id="@+id/mobile"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="#5d5d5d"
        android:textStyle="bold" />
</LinearLayout>
```

  以下是AndroidManifest.xml文件-

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo">
    <uses-permission android:name="android.permission.INTERNET"/>
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:networkSecurityConfig="@xml/network_security_config"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/json1.png)
