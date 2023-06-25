# PHP/MySQL
  
  在本章中，我们将说明如何将PHP和MYSQL与您的android应用程序集成。如果您有网络服务器，并且想在Android应用程序上访问其数据，这将非常有用。MYSQL用作Web服务器上的数据库，PHP用于从数据库中获取数据。我们的应用程序将使用必要的参数与PHP页面进行通信，PHP将联系MYSQL数据库并获取结果并将结果返回给我们。
  
  > 如果您不熟悉[MySQL](https://www.jc2182.com/mysql/mysql-jiaocheng.html)，[PHP](https://www.jc2182.com/php/php-jiaocheng.html)，请到我们的教程学习。
  
  *创建数据库*
  
  使用此简单脚本可以轻松创建MYSQL数据库。用**CREATE DATABASE**语句创建数据库。
  
```php
  <?php
     $con=mysqli_connect("example.com","username","password");
     $sql="CREATE DATABASE my_db";
     if (mysqli_query($con,$sql)) {
        echo "数据库 my_db 建立成功";
     }
  ?>
```
  
  *创建表*
  
  创建数据库后，就该在数据库中创建一些表了。用**CREATE TABLE**语句创建表。
  
```php
  <?php
    $con=mysqli_connect("example.com","username","password","my_db");
     $sql="CREATE TABLE table1(Username CHAR(30),Password CHAR(30),Role CHAR(30))";
     if (mysqli_query($con,$sql)) {
        echo "表已成功创建";
     }
  ?>
```
  
  *在表格中插入值*
  
  创建数据库和表时。现在是时候在表中插入一些数据了。用**INSERT INTO**语句创建数据库。
  
```php
  <?php
     $con=mysqli_connect("example.com","username","password","my_db");
     $sql="INSERT INTO table1 (Username, Password, Role) VALUES ('admin', 'admin','adminstrator')";
     if (mysqli_query($con,$sql)) {
        echo "值已成功插入";
     }
  ?>
```
  
  *PHP-GET和POST方法*
  
  创建记录后，PHP还可用于从mysql数据库中获取记录。为了获取记录，必须将一些有关要获取的记录的信息传递到PHP页面。第一种传递信息的方法是通过使用$ _GET命令的GET方法。变量在url中传递，并获取记录。其语法如下-
  
```php
  <?php
     $con=mysqli_connect("example.com","username","password","database name");
  
     if (mysqli_connect_errno($con)) {
        echo "无法连接到MySQL: " . mysqli_connect_error();
     }
  
     $username = $_GET['username'];
     $password = $_GET['password'];
     $result = mysqli_query($con,"SELECT Role FROM table1 where Username='$username' AND Password='$password'");
     $row = mysqli_fetch_array($result);
     $data = $row[0];
  
     if($data){
        echo $data;
     }
     mysqli_close($con);
  ?>
```
  
  第二种方法是使用POST方法。上面脚本中的唯一更改是将$_GET替换为$_POST。在Post方法中，变量不通过URL传递。

## Android-连接PHP接口获取MySQL数据
  
  我们将使用开源项目**OKHttp**类进行网络连接。下面看下导入OKHttp环境
  
  *第一步*打开FILE > Project Structure
  
  ![](https://www.jc2182.com/images/android/okhttp1.png)
  
  *第二步*打开依赖 > App > 点加号 选择Library 依赖
  
  ![](https://www.jc2182.com/images/android/okhttp2.png)
  
  *第三步*按照下面的步骤添加两个库
  
  ![](https://www.jc2182.com/images/android/okhttp3.png)
  
  ![](https://www.jc2182.com/images/android/okhttp4.png)
  
  *第四步*选择应用
  
  ![](https://www.jc2182.com/images/android/okhttp5.png)
  
  到此，导入okhttp步骤完毕
  
  *通过Get方法连接*
  
  有两种方法可以通过PHP页面连接到MYSQL。第一个称为Get方法。他们的语法如下-
  
```java
  OkHttpClient client = new OkHttpClient();
  Request request = new Request.Builder()
          .url(path)
          .get()  // 默认get 不显式调用也可以
          .build();
  Call call = client.newCall(request);
```
  
  之后，您需要调用**Call**类的execute方法并将其接收到**Response**对象中。之后，接收数据。
  
```java
  Response response = call.execute();
  String returnMsg = response.body().string();
```
  
  *通过Post方法连接*
  
  在Post方法中，将使用**OkHttpClient**，**RequestBody**类。它的语法在下面给出-
  
```java
  OkHttpClient okHttpClient = new OkHttpClient();
  RequestBody requestBody = new FormBody.Builder()
          .add("username", username)
          .add("password",password)
          .build();
  Request request = new Request.Builder()
          .url(path)
          .post(requestBody)
          .build();
  
  Call call = okHttpClient.newCall(request);
```
  
  您需要接收响应的数据。
  
```java
  Response response = call.execute();
  String returnMsg = response.body().string();
```
  
## 示例
  
  以下示例是通过PHP页面将android应用程序与MYSQL数据库连接的完整示例。它创建一个基本的应用程序，允许您使用GET和POST方法登录。
  
  *PHP-MYSQL部分*
  
  在此示例中，已在000webhost.com中创建了名称为temp的数据库。在该数据库中，已创建一个名为table1的表。该表具有三个字段。（Username, Password, Role）。该表只有一条记录（“admin”，“admin”，“administrator”）。下面给出了php页面，该页面通过post方法获取参数。
  
```php
  <?php
     $con=mysqli_connect("example.com","username","password","db_name");
  
     if (mysqli_connect_errno($con)) {
        echo " MySQL链接失败: " . mysqli_connect_error();
     }
             $username = $_REQUEST['username'];
     $password = $_REQUEST['password'];
     $result = mysqli_query($con,"SELECT Role FROM table1 where    Username='$username' and Password='$password'");
     $row = mysqli_fetch_array($result);
     $data = $row[0];
  
     if($data){
        echo $data;
     }
             mysqli_close($con);
  ?>
```
  
  *Android 部分*
  
  要尝试使用此示例，您需要在连接了wifi互联网的实际设备上运行此示例。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加活动代码。
  3. 创建src/DoRequest.java文件以添加HTTP请求代码。
  4. 修改布局XML文件res/layout/activity_main.xml如果需要，可添加任何GUI组件。
  5. 修改res/values/string.xml文件并添加必要的字符串组件。
  6. 修改AndroidManifest.xml以添加必要的权限。
  7. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.os.Looper;
  import android.os.Message;
  import android.view.View;
  import android.widget.EditText;
  import android.widget.TextView;
  
  import java.io.IOException;
```

  public class MainActivity extends Activity {

      private EditText usernameField,passwordField;
      private TextView status,role,method;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          usernameField = (EditText)findViewById(R.id.editText1);
          passwordField = (EditText)findViewById(R.id.editText2);
    
          status = (TextView)findViewById(R.id.textView6);
          role = (TextView)findViewById(R.id.textView7);
          method = (TextView)findViewById(R.id.textView9);
      }
    
      public void showMsg(String msg){
          role.setText(msg);
          status.setText("登录成功");
      }
    
      public void login(View view) throws IOException {
          new Thread(new Runnable() {
              @Override
              public void run() {
                  Looper.prepare();
                  String username = usernameField.getText().toString();
                  String password = passwordField.getText().toString();
                  Message message = Message.obtain();
                  try {
                      DoRequest dr = new DoRequest();
                      dr.doInBackground(username,password,1);
                      String res = dr.getReturnMsg();
                      showMsg(res);
                      method.setText("Get 方法");
                  } catch (IOException e) {
                      e.printStackTrace();
                  }
                  Looper.loop();
              }
          }).start();
      }
    
      public void loginPost(View view) throws IOException {
    
          new Thread(new Runnable() {
              @Override
              public void run() {
                  Looper.prepare();
                  String username = usernameField.getText().toString();
                  String password = passwordField.getText().toString();
                  Message message = Message.obtain();
                  try {
                      DoRequest dr = new DoRequest();
                      dr.doInBackground(username,password,1);
                      String res = dr.getReturnMsg();
                      showMsg(res);
                      method.setText("Post 方法");
                  } catch (IOException e) {
                      e.printStackTrace();
                  }
                  Looper.loop();//增加部分
              }
          }).start();
    
    
      }

  }

```


以下是修改后的主要活动文件src/com.jc2182.demo/DoRequest.java的内容。

```java

package com.jc2182.demo;

import android.util.Log;
import java.io.IOException;
import okhttp3.Call;
import okhttp3.FormBody;
import okhttp3.Headers;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class DoRequest  {

    /**     * 返回消息     */
    protected String returnMsg;

    public String getReturnMsg(){
        return  this.returnMsg;
    }

    public void doInBackground(String username,String password,int byGetOrPost) throws IOException {

        if(byGetOrPost == 0) {
            //get的方式提交就是url拼接的方式
            String path = "http://192.168.61.201:9090/login.php?username=" + username + "&password=" + password;
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(path)
                    .get()  // 默认get 不显式调用也可以
                    .build();
            Call call = client.newCall(request);
            Response response = call.execute();

            //第四步，解析响应结果
            Headers headers = response.headers();
            for (int i = 0; i < headers.size(); i++) {
                Log.d("GET返回头", headers.name(i) + ":" + headers.value(i));
            }
            this.returnMsg = response.body().string();

        }else {
            String path = "http://192.168.61.201:9090/login.php";

            OkHttpClient okHttpClient = new OkHttpClient();
            RequestBody requestBody = new FormBody.Builder()
                    .add("username", username)
                    .add("password",password)
                    .build();
            Request request = new Request.Builder()
                    .url(path)
                    .post(requestBody)
                    .build();

            Call call = okHttpClient.newCall(request);

            Response response = call.execute();

            Headers headers = response.headers();
            for (int i = 0; i < headers.size(); i++) {
                Log.d("POST返回头", headers.name(i) + ":" + headers.value(i));
            }
            this.returnMsg = response.body().string();
        }
    }

}
```

  以下是res/layout/activity_main.xml文件的内容-

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    tools:context=".MainActivity">


    <TextView
        android:id="@+id/textView3"
        android:layout_width="79dp"
        android:layout_height="55dp"
        android:layout_alignParentTop="true"
        android:layout_marginTop="117dp"
        android:text="@string/App"
        android:textAppearance="?android:attr/textAppearanceLarge" />

    <TextView
        android:id="@+id/textView1"
        android:layout_width="68dp"
        android:layout_height="27dp"
        android:layout_below="@+id/textView3"
        android:layout_marginTop="73dp"
        android:text="@string/Username" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="64dp"
        android:layout_height="35dp"
        android:layout_below="@+id/textView1"
        android:layout_alignParentStart="true"
        android:layout_marginStart="3dp"
        android:layout_marginTop="28dp"
        android:layout_marginBottom="-56dp"
        android:text="@string/Password" />

    <EditText
        android:id="@+id/editText1"
        android:layout_width="326dp"
        android:layout_height="30dp"
        android:layout_below="@+id/textView3"
        android:layout_alignParentEnd="true"
        android:layout_marginTop="31dp"
        android:layout_marginEnd="3dp">
        <requestFocus android:layout_width="wrap_content" />

    </EditText>


    <EditText
        android:id="@+id/editText2"
        android:layout_width="278dp"
        android:layout_height="29dp"
        android:layout_below="@+id/editText1"
        android:layout_alignEnd="@+id/editText1"
        android:layout_marginStart="5dp"
        android:layout_marginTop="96dp"
        android:layout_marginEnd="4dp"
        android:layout_toEndOf="@+id/textView2"
        android:ems="10"
        android:inputType="textPassword" />

    <Button
        android:id="@+id/button1"
        android:layout_width="121dp"
        android:layout_height="wrap_content"
        android:layout_alignBaseline="@+id/button2"
        android:layout_alignStart="@+id/textView2"
        android:layout_alignBottom="@+id/button2"
        android:layout_alignParentStart="true"
        android:layout_marginStart="-3dp"
        android:layout_marginBottom="45dp"
        android:onClick="login"
        android:text="@string/LoginGet" />

    <Button
        android:id="@+id/button2"
        android:layout_width="119dp"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:layout_marginStart="1dp"
        android:layout_toEndOf="@+id/textView6"
        android:onClick="loginPost"
        android:text="@string/LoginPost" />

    <TextView
        android:id="@+id/textView8"
        android:layout_width="63dp"
        android:layout_height="28dp"
        android:layout_below="@+id/button1"
        android:layout_alignStart="@+id/textView5"
        android:layout_marginStart="-2dp"
        android:layout_marginBottom="-20dp"
        android:text="@string/method" />

    <TextView
        android:id="@+id/textView4"
        android:layout_width="66dp"
        android:layout_height="28dp"
        android:layout_below="@+id/textView8"
        android:layout_marginStart="23dp"
        android:layout_marginTop="13dp"
        android:text="@string/LoginStatus" />

    <TextView
        android:id="@+id/textView5"
        android:layout_width="70dp"
        android:layout_height="30dp"
        android:layout_below="@+id/textView4"
        android:layout_marginTop="43dp"
        android:layout_marginEnd="7dp"
        android:layout_toStartOf="@+id/editText1"
        android:text="@string/LoginRole" />

    <TextView
        android:id="@+id/textView7"
        android:layout_width="116dp"
        android:layout_height="25dp"
        android:layout_alignBottom="@+id/textView5"
        android:layout_marginBottom="0dp"
        android:layout_toRightOf="@+id/textView5"
        android:text="@string/Role"
        android:textAppearance="?android:attr/textAppearanceMedium"
        android:textSize="10sp"
        tools:ignore="SmallSp" />


    <TextView
        android:id="@+id/textView6"
        android:layout_width="100dp"
        android:layout_height="32dp"
        android:layout_alignTop="@+id/textView4"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="0dp"
        android:layout_toEndOf="@+id/textView4"
        android:text="@string/Status"
        android:textAppearance="?android:attr/textAppearanceMedium"
        android:textSize="10sp"
        tools:ignore="SmallSp" />

    <TextView
        android:id="@+id/textView9"
        android:layout_width="96dp"
        android:layout_height="29dp"
        android:layout_below="@+id/button2"
        android:layout_alignStart="@+id/textView6"
        android:layout_alignBottom="@+id/textView8"
        android:layout_marginStart="56dp"
        android:layout_marginTop="11dp"
        android:layout_marginBottom="-1dp"
        android:text="@string/Choose"
        android:textAppearance="?android:attr/textAppearanceMedium"
        android:textSize="10sp"
        tools:ignore="SmallSp" />


</RelativeLayout>
```

  以下是AndroidManifest.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo">
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:usesCleartextTraffic="true"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name=".SecondMain"></activity>

    </application>

</manifest>
```

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/phpmysql1.png)

  尝试POST , GET 请求 分别如下：

  ![](https://www.jc2182.com/images/android/phpmysql2.png)

  ![](https://www.jc2182.com/images/android/phpmysql3.png)
