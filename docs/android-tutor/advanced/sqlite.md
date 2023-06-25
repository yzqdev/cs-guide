# SQLite数据库
  
  SQLite是一个开放源代码SQL数据库，可将数据存储到设备上的文本文件中。Android内置了内置的SQLite数据库实现。SQLite支持所有关系数据库功能。为了访问该数据库，您无需为其建立任何类型的连接，例如JDBC，ODBC等
  
  *数据库-包*
  
  主要包是**android.database.sqlite**，其中包含用于管理自己的数据库的类
  
  *数据库-创建*
  
  为了创建数据库，您只需要使用数据库名称和模式作为参数调用openOrCreateDatabase方法。它返回一个SQLite数据库实例，您必须在自己的对象中接收它的语法如下所示
  
```java
  SQLiteDatabase mydatabase = openOrCreateDatabase("your database name",MODE_PRIVATE,null);
```
  
  
  
  除此之外，数据库软件包中还有其他功能可以完成此任务。它们在下面列出
  
  | 方法                                                                                                              | 说明                                                                                      |
  | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
  | **openDatabase(String path, SQLiteDatabase.CursorFactory factory, int flags, DatabaseErrorHandler errorHandler)** | 此方法仅使用适当的标记模式打开现有数据库。 公共标志模式可以是OPEN_READWRITE OPEN_READONLY |
  | **openDatabase(String path, SQLiteDatabase.CursorFactory factory, int flags)**                                    | 它与上述方法类似，因为它也可以打开现有数据库，但是它没有定义任何处理程序来处理数据库错误  |
  | **openOrCreateDatabase(String path, SQLiteDatabase.CursorFactory factory)**                                       | 它不仅会打开，还会创建数据库（如果不存在）。 此方法等效于openDatabase方法。               |
  | **openOrCreateDatabase(File file, SQLiteDatabase.CursorFactory factory)**                                         | 此方法与上述方法类似，但是它使用File对象作为路径而不是字符串。 它等效于file.getPath()     |
  
  *数据库-插入*
  
  我们可以使用SQLiteDatabase类中定义的execSQL方法创建表或将数据插入表中。其语法如下
  
```java
  mydatabase.execSQL("CREATE TABLE IF NOT EXISTS Jc2182(Username VARCHAR,Password VARCHAR);");
  mydatabase.execSQL("INSERT INTO Jc2182 VALUES('admin','admin');");
```
  
  
  
  这会将一些值插入数据库中的表中。下面给出了另一种方法，它也可以完成相同的工作，但是需要一些附加参数
  
  | 方法                                       | 说明                                                                         |
  | ------------------------------------------ | ---------------------------------------------------------------------------- |
  | **execSQL(String sql, Object[] bindArgs)** | 该方法不仅可以插入数据，还可以使用绑定参数来更新或修改数据库中已经存在的数据 |
  
  *数据库-查找*
  
  我们可以使用**Cursor**类的对象从数据库检索任何内容。我们将调用此类的一个名为rawQuery的方法，它将返回一个结果集，其中光标指向该表。我们可以向前移动光标并检索数据。
  
```java
  Cursor resultSet = mydatbase.rawQuery("Select * from Jc2182",null);
  resultSet.moveToFirst();
  String username = resultSet.getString(0);
  String password = resultSet.getString(1);
```
  
  
  
  Cursor类中还有其他可用函数，使我们可以有效地检索数据。包括了
  
  | 方法                                  | 说明                                          |
  | ------------------------------------- | --------------------------------------------- |
  | **getColumnCount()**                  | 此方法返回表的总列数。                        |
  | **getColumnIndex(String columnName)** | 此方法通过指定列名称来返回列的索引号          |
  | **getColumnName(int columnIndex)**    | 此方法通过指定列的索引来返回列的名称          |
  | **getColumnNames()**                  | 此方法返回表的所有列名称的数组。              |
  | **getCount()**                        | 此方法返回游标中的总行数                      |
  | **getPosition()**                     | 此方法返回表中光标的当前位置                  |
  | **isClosed()**                        | 如果关闭游标，则此方法返回true，否则返回false |
  
  *数据库-帮助类*
  
  为了管理与数据库有关的所有操作，已提供了一个帮助程序类，称为**SQLiteOpenHelper**。它自动管理数据库的创建和更新。其语法如下
  
```java
  public class DBHelper extends SQLiteOpenHelper {
     public DBHelper(){
        super(context,DATABASE_NAME,null,1);
     }
     public void onCreate(SQLiteDatabase db) {}
     public void onUpgrade(SQLiteDatabase database, int oldVersion, int newVersion) {}
  }
```
  
  


  
  ## 示例
  
  这是一个演示SQLite数据库用法的示例。它创建了一个基本的联系人应用程序，该应用程序允许插入，删除和修改联系人。要尝试使用此示例，您需要在支持相机的实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以获取所有XML组件的引用，并在listView上填充联系人。
  3. 创建新的src/DBHelper.java来管理数据库工作
  4. 创建一个新的Activity作为DisplayContact.java，它将在屏幕上显示该联系人
  5. 修改res/layout/activity_main以添加相应的XML组件
  6. 修改res/layout/activity_display_contact.xml以添加相应的XML组件
  7. 修改res/values/string.xml以添加必要的字符串组件
  8. 修改res/menu/display_contact.xml以添加必要的菜单组件
  9. 创建一个新菜单为res/menu/mainmenu.xml以添加插入联系人选项
  10. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Intent;
  import android.os.Bundle;
  import android.view.KeyEvent;
  import android.view.Menu;
  import android.view.MenuItem;
  import android.view.View;
  import android.widget.AdapterView;
  import android.widget.ArrayAdapter;
  import android.widget.ListView;
  
  import java.util.ArrayList;

  public class MainActivity extends Activity {
      public final static String EXTRA_MESSAGE = "MESSAGE";
      private ListView obj;
      DBHelper mydb;

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          mydb = new DBHelper(this);
          ArrayList array_list = mydb.getAllCotacts();
          ArrayAdapter arrayAdapter=new ArrayAdapter(this,android.R.layout.simple_list_item_1, array_list);
    
          obj = (ListView)findViewById(R.id.listView1);
          obj.setAdapter(arrayAdapter);
          obj.setOnItemClickListener(new AdapterView.OnItemClickListener(){
              @Override
              public void onItemClick(AdapterView arg0, View arg1, int arg2,long arg3) {
                  // TODO Auto-generated method stub
                  int id_To_Search = arg2 + 1;
    
                  Bundle dataBundle = new Bundle();
                  dataBundle.putInt("id", id_To_Search);
    
                  Intent intent = new Intent(getApplicationContext(),DisplayContact.class);
    
                  intent.putExtras(dataBundle);
                  startActivity(intent);
              }
          });
      }
    
      @Override
      public boolean onCreateOptionsMenu(Menu menu) {
          // Inflate the menu; this adds items to the action bar if it is present.
          getMenuInflater().inflate(R.menu.main_menu, menu);
          return true;
      }
    
      @Override
      public boolean onOptionsItemSelected(MenuItem item){
          super.onOptionsItemSelected(item);
    
          switch(item.getItemId()) {
              case R.id.item1:Bundle dataBundle = new Bundle();
                  dataBundle.putInt("id", 0);
    
                  Intent intent = new Intent(getApplicationContext(),DisplayContact.class);
                  intent.putExtras(dataBundle);
    
                  startActivity(intent);
                  return true;
              default:
                  return super.onOptionsItemSelected(item);
          }
      }
    
      public boolean onKeyDown(int keycode, KeyEvent event) {
          if (keycode == KeyEvent.KEYCODE_BACK) {
              moveTaskToBack(true);
          }
          return super.onKeyDown(keycode, event);
      }

  }

```


以下是修改后的主要活动文件src/com.jc2182.demo/DBHelper.java的内容。

```java

package com.jc2182.demo;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;
import java.util.HashMap;

public class DBHelper extends SQLiteOpenHelper {

    public static final String DATABASE_NAME = "MyDBName.db";
    public static final String CONTACTS_TABLE_NAME = "contacts";
    public static final String CONTACTS_COLUMN_NAME = "name";
    public static final String CONTACTS_COLUMN_EMAIL = "email";
    public static final String CONTACTS_COLUMN_STREET = "street";
    public static final String CONTACTS_COLUMN_CITY = "place";
    public static final String CONTACTS_COLUMN_PHONE = "phone";
    private HashMap hp;

    public DBHelper(Context context) {
        super(context, DATABASE_NAME , null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // TODO Auto-generated method stub
        db.execSQL( "create table contacts " + "(id integer primary key, name text,phone text,email text, street text,place text)"
        );
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // TODO Auto-generated method stub
        db.execSQL("DROP TABLE IF EXISTS contacts");
        onCreate(db);
    }

    public boolean insertContact (String name, String phone, String email, String street,String place) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("name", name);
        contentValues.put("phone", phone);
        contentValues.put("email", email);
        contentValues.put("street", street);
        contentValues.put("place", place);
        db.insert("contacts", null, contentValues);
        return true;
    }

    public Cursor getData(int id) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor res =  db.rawQuery( "select * from contacts where id="+id+"", null );
        return res;
    }

    public int numberOfRows(){
        SQLiteDatabase db = this.getReadableDatabase();
        int numRows = (int) DatabaseUtils.queryNumEntries(db, CONTACTS_TABLE_NAME);
        return numRows;
    }

    public boolean updateContact (Integer id, String name, String phone, String email, String street,String place) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("name", name);
        contentValues.put("phone", phone);
        contentValues.put("email", email);
        contentValues.put("street", street);
        contentValues.put("place", place);
        db.update("contacts", contentValues, "id = ? ", new String[] { Integer.toString(id) } );
        return true;
    }

    public void deleteContact (Integer id) {
        SQLiteDatabase db = this.getWritableDatabase();
        db.delete("contacts",
                "id = ? ",
                new String[]{Integer.toString(id)});
    }

    public ArrayList<String> getAllCotacts() {
        ArrayList<String> array_list = new ArrayList<String>();

        //hp = new HashMap();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor res =  db.rawQuery( "select * from contacts", null );
        res.moveToFirst();

        while(res.isAfterLast() == false){
            array_list.add(res.getString(res.getColumnIndex(CONTACTS_COLUMN_NAME)));
            res.moveToNext();
        }
        return array_list;
    }
}
```

  

  以下是修改后的主要活动文件src/com.jc2182.demo/DisplayContact.java的内容。

```java
package com.jc2182.demo;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class DisplayContact extends Activity {
    private DBHelper mydb;

    TextView name;
    TextView phone;
    TextView email;
    TextView street;
    TextView place;
    int id_To_Update = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_contact);
        name = (TextView) findViewById(R.id.editTextName);
        phone = (TextView) findViewById(R.id.editTextPhone);
        email = (TextView) findViewById(R.id.editTextStreet);
        street = (TextView) findViewById(R.id.editTextEmail);
        place = (TextView) findViewById(R.id.editTextCity);

        mydb = new DBHelper(this);

        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            int Value = extras.getInt("id");

            if (Value > 0) {
                //means this is the view part not the add contact part.
                Cursor rs = mydb.getData(Value);
                id_To_Update = Value;
                rs.moveToFirst();

                String nam = rs.getString(rs.getColumnIndex(DBHelper.CONTACTS_COLUMN_NAME));
                String phon = rs.getString(rs.getColumnIndex(DBHelper.CONTACTS_COLUMN_PHONE));
                String emai = rs.getString(rs.getColumnIndex(DBHelper.CONTACTS_COLUMN_EMAIL));
                String stree = rs.getString(rs.getColumnIndex(DBHelper.CONTACTS_COLUMN_STREET));
                String plac = rs.getString(rs.getColumnIndex(DBHelper.CONTACTS_COLUMN_CITY));

                if (!rs.isClosed()) {
                    rs.close();
                }
                Button b = (Button) findViewById(R.id.button1);
                b.setVisibility(View.INVISIBLE);

                name.setText((CharSequence) nam);
                name.setFocusable(false);
                name.setClickable(false);

                phone.setText((CharSequence) phon);
                phone.setFocusable(false);
                phone.setClickable(false);

                email.setText((CharSequence) emai);
                email.setFocusable(false);
                email.setClickable(false);

                street.setText((CharSequence) stree);
                street.setFocusable(false);
                street.setClickable(false);

                place.setText((CharSequence) plac);
                place.setFocusable(false);
                place.setClickable(false);
            }
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        Bundle extras = getIntent().getExtras();

        if (extras != null) {
            int Value = extras.getInt("id");
            if (Value > 0) {
                getMenuInflater().inflate(R.menu.display_contact, menu);
            } else {
                getMenuInflater().inflate(R.menu.main_menu,menu);
            }
        }
        return true;
    }

    public boolean onOptionsItemSelected(MenuItem item) {
        super.onOptionsItemSelected(item);
        switch (item.getItemId()) {
            case R.id.Edit_Contact:
                Button b = (Button) findViewById(R.id.button1);
                b.setVisibility(View.VISIBLE);
                name.setEnabled(true);
                name.setFocusableInTouchMode(true);
                name.setClickable(true);

                phone.setEnabled(true);
                phone.setFocusableInTouchMode(true);
                phone.setClickable(true);

                email.setEnabled(true);
                email.setFocusableInTouchMode(true);
                email.setClickable(true);

                street.setEnabled(true);
                street.setFocusableInTouchMode(true);
                street.setClickable(true);

                place.setEnabled(true);
                place.setFocusableInTouchMode(true);
                place.setClickable(true);

                return true;
            case R.id.Delete_Contact:

                AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setMessage(R.string.deleteContact)
                        .setPositiveButton(R.string.yes, new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                mydb.deleteContact(id_To_Update);
                                Toast.makeText(getApplicationContext(), "Deleted Successfully", Toast.LENGTH_SHORT).show();
                                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                                startActivity(intent);
                            }
                        }).setNegativeButton(R.string.no, new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                // User cancelled the dialog
                            }
                        });

                AlertDialog d = builder.create();
                d.setTitle("Are you sure");
                d.show();

                return true;
            default:
                return super.onOptionsItemSelected(item);

        }
    }

    public void run(View view) {
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            int Value = extras.getInt("id");
            if (Value > 0) {
                if (mydb.updateContact(id_To_Update, name.getText().toString(),
                        phone.getText().toString(), email.getText().toString(),
                        street.getText().toString(), place.getText().toString())) {
                    Toast.makeText(getApplicationContext(), "Updated", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                    startActivity(intent);
                } else {
                    Toast.makeText(getApplicationContext(), "not Updated", Toast.LENGTH_SHORT).show();
                }
            } else {
                if (mydb.insertContact(
                        name.getText().toString(),
                        phone.getText().toString(),
                        email.getText().toString(),
                        street.getText().toString(),
                        place.getText().toString())) {
                    Toast.makeText(
                            getApplicationContext(),
                            "done",
                            Toast.LENGTH_SHORT)
                            .show();
                } else {
                    Toast.makeText(
                            getApplicationContext(),
                            "not done",
                            Toast.LENGTH_SHORT)
                            .show();
                }
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
            }
        }
    }
}
```

  

  以下是res/layout/activity_main.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/textView"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:textSize="30dp"
        android:text="数据库操作示例" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView2"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:textSize="35dp"
        android:textColor="#ff16ff01" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:layout_below="@+id/textView2"
        android:layout_centerHorizontal="true"
        android:background="#112233ee"
        android:src="@drawable/logo"/>

    <ScrollView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/scrollView"
        android:layout_below="@+id/imageView"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_alignParentBottom="true"
        android:layout_alignParentRight="true"
        android:layout_alignParentEnd="true">

        <ListView
            android:id="@+id/listView1"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerHorizontal="true"
            android:layout_centerVertical="true" >
        </ListView>

    </ScrollView>

</RelativeLayout>
```

  

  以下是res/layout/activity_display_contact.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/scrollView1"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".DisplayContact" >

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="00dp">

    <EditText
        android:id="@+id/editTextName"
        android:layout_width="280dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="5dp"
        android:layout_toEndOf="@+id/textView1"
        android:ems="10"
        android:inputType="text" />

    <TextView
        android:id="@+id/textView1"
        android:layout_width="83dp"
        android:layout_height="49dp"
        android:text="@string/name"
        android:textAppearance="?android:attr/textAppearanceMedium" />

    <TextView
        android:id="@+id/textView5"
        android:layout_width="83dp"
        android:layout_height="49dp"
        android:layout_below="@+id/textView1"
        android:text="@string/phone"
        android:textAppearance="?android:attr/textAppearanceMedium" />

    <EditText
        android:id="@+id/editTextPhone"
        android:layout_width="274dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/editTextName"
        android:layout_toEndOf="@+id/textView5"
        android:layout_marginTop="10dp"
        android:ems="10"
        android:inputType="phone|text" />

    <TextView
        android:id="@+id/textView4"
        android:layout_width="83dp"
        android:layout_height="49dp"
        android:layout_below="@+id/textView5"
        android:text="@string/street"
        android:textAppearance="?android:attr/textAppearanceMedium" />

    <EditText
        android:id="@+id/editTextStreet"
        android:layout_width="278dp"
        android:layout_height="wrap_content"
        android:layout_below="@id/editTextPhone"
        android:layout_toEndOf="@+id/textView4"
        android:layout_marginTop="9dp"
        android:ems="10"
        android:inputType="text" />


    <TextView
        android:id="@+id/textView2"
        android:layout_width="76dp"
        android:layout_height="41dp"
        android:layout_alignLeft="@+id/textView1"
        android:layout_alignBottom="@+id/editTextEmail"
        android:text="@string/email"
        android:textAppearance="?android:attr/textAppearanceMedium" />


    <EditText
        android:id="@+id/editTextEmail"
        android:layout_width="276dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/editTextStreet"
        android:layout_alignStart="@+id/editTextStreet"
        android:layout_marginTop="9dp"
        android:ems="10"
        android:inputType="textEmailAddress" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="104dp"
        android:layout_height="26dp"
        android:layout_alignBaseline="@+id/editTextCity"
        android:layout_alignParentLeft="true"
        android:layout_marginLeft="0dp"
        android:layout_toLeftOf="@+id/editTextEmail"
        android:text="@string/country"
        android:textAppearance="?android:attr/textAppearanceMedium" />

    <EditText
        android:id="@+id/editTextCity"
        android:layout_width="274dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/editTextEmail"
        android:layout_alignEnd="@+id/editTextName"
        android:layout_marginTop="30dp"
        android:ems="10"
        android:inputType="text" />

        <Button
            android:id="@+id/button1"
            android:layout_width="104dp"
            android:layout_height="62dp"
            android:layout_alignStart="@+id/editTextCity"
            android:layout_alignParentBottom="true"
            android:layout_below="@+id/editTextCity"
            android:layout_marginLeft="-5dp"
            android:layout_marginBottom="2dp"
            android:onClick="run"
            android:text="@string/save" />
    </RelativeLayout>

</ScrollView>
```

  

  以下是res/value/string.xml的内容

```xml
<resources>
    <string name="app_name">Demo</string>
    <string name="Add_New">添加新的</string>
    <string name="edit">编辑联系人</string>
    <string name="delete">删除联系人</string>
    <string name="title_activity_display_contact">显示联系人</string>
    <string name="name">姓名</string>
    <string name="phone">电话</string>
    <string name="email">邮箱</string>
    <string name="street">街道</string>
    <string name="country">城市/省份/国家</string>
    <string name="save">保存联系人</string>
    <string name="deleteContact">您确定要删除他/她？</string>
    <string name="yes">是</string>
    <string name="no">否</string>
</resources>
```

  

  以下是res/menu/main_menu.xml的内容

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android" >

    <item android:id="@+id/item1"
        android:icon="@drawable/ic_launcher"
        android:title="@string/Add_New" >
    </item>

</menu>
```

  

  以下是AndroidManifest.xml的内容

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo"
    android:installLocation="auto">
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

        <activity android:name=".DisplayContact"/>
    </application>

</manifest>
```

  

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/db1.png)

  按munu键出现

  ![](https://www.jc2182.com/images/android/db2.png)

  点击联系人，返回到第一张页面

  ![](https://www.jc2182.com/images/android/db3.png)

  ![](https://www.jc2182.com/images/android/db4.png)
