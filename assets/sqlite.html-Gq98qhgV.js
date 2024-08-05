import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const a={},i=o(`<h1 id="sqlite数据库" tabindex="-1"><a class="header-anchor" href="#sqlite数据库"><span>SQLite数据库</span></a></h1><p>SQLite是一个开放源代码SQL数据库，可将数据存储到设备上的文本文件中。Android内置了内置的SQLite数据库实现。SQLite支持所有关系数据库功能。为了访问该数据库，您无需为其建立任何类型的连接，例如JDBC，ODBC等</p><p><em>数据库-包</em></p><p>主要包是<strong>android.database.sqlite</strong>，其中包含用于管理自己的数据库的类</p><p><em>数据库-创建</em></p><p>为了创建数据库，您只需要使用数据库名称和模式作为参数调用openOrCreateDatabase方法。它返回一个SQLite数据库实例，您必须在自己的对象中接收它的语法如下所示</p><pre><code class="language-java">  SQLiteDatabase mydatabase = openOrCreateDatabase(&quot;your database name&quot;,MODE_PRIVATE,null);
</code></pre><p>除此之外，数据库软件包中还有其他功能可以完成此任务。它们在下面列出</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>openDatabase(String path, SQLiteDatabase.CursorFactory factory, int flags, DatabaseErrorHandler errorHandler)</strong></td><td>此方法仅使用适当的标记模式打开现有数据库。 公共标志模式可以是OPEN_READWRITE OPEN_READONLY</td></tr><tr><td><strong>openDatabase(String path, SQLiteDatabase.CursorFactory factory, int flags)</strong></td><td>它与上述方法类似，因为它也可以打开现有数据库，但是它没有定义任何处理程序来处理数据库错误</td></tr><tr><td><strong>openOrCreateDatabase(String path, SQLiteDatabase.CursorFactory factory)</strong></td><td>它不仅会打开，还会创建数据库（如果不存在）。 此方法等效于openDatabase方法。</td></tr><tr><td><strong>openOrCreateDatabase(File file, SQLiteDatabase.CursorFactory factory)</strong></td><td>此方法与上述方法类似，但是它使用File对象作为路径而不是字符串。 它等效于file.getPath()</td></tr></tbody></table><p><em>数据库-插入</em></p><p>我们可以使用SQLiteDatabase类中定义的execSQL方法创建表或将数据插入表中。其语法如下</p><pre><code class="language-java">  mydatabase.execSQL(&quot;CREATE TABLE IF NOT EXISTS Jc2182(Username VARCHAR,Password VARCHAR);&quot;);
  mydatabase.execSQL(&quot;INSERT INTO Jc2182 VALUES(&#39;admin&#39;,&#39;admin&#39;);&quot;);
</code></pre><p>这会将一些值插入数据库中的表中。下面给出了另一种方法，它也可以完成相同的工作，但是需要一些附加参数</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>execSQL(String sql, Object[] bindArgs)</strong></td><td>该方法不仅可以插入数据，还可以使用绑定参数来更新或修改数据库中已经存在的数据</td></tr></tbody></table><p><em>数据库-查找</em></p><p>我们可以使用<strong>Cursor</strong>类的对象从数据库检索任何内容。我们将调用此类的一个名为rawQuery的方法，它将返回一个结果集，其中光标指向该表。我们可以向前移动光标并检索数据。</p><pre><code class="language-java">  Cursor resultSet = mydatbase.rawQuery(&quot;Select * from Jc2182&quot;,null);
  resultSet.moveToFirst();
  String username = resultSet.getString(0);
  String password = resultSet.getString(1);
</code></pre><p>Cursor类中还有其他可用函数，使我们可以有效地检索数据。包括了</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>getColumnCount()</strong></td><td>此方法返回表的总列数。</td></tr><tr><td><strong>getColumnIndex(String columnName)</strong></td><td>此方法通过指定列名称来返回列的索引号</td></tr><tr><td><strong>getColumnName(int columnIndex)</strong></td><td>此方法通过指定列的索引来返回列的名称</td></tr><tr><td><strong>getColumnNames()</strong></td><td>此方法返回表的所有列名称的数组。</td></tr><tr><td><strong>getCount()</strong></td><td>此方法返回游标中的总行数</td></tr><tr><td><strong>getPosition()</strong></td><td>此方法返回表中光标的当前位置</td></tr><tr><td><strong>isClosed()</strong></td><td>如果关闭游标，则此方法返回true，否则返回false</td></tr></tbody></table><p><em>数据库-帮助类</em></p><p>为了管理与数据库有关的所有操作，已提供了一个帮助程序类，称为<strong>SQLiteOpenHelper</strong>。它自动管理数据库的创建和更新。其语法如下</p><pre><code class="language-java">  public class DBHelper extends SQLiteOpenHelper {
     public DBHelper(){
        super(context,DATABASE_NAME,null,1);
     }
     public void onCreate(SQLiteDatabase db) {}
     public void onUpgrade(SQLiteDatabase database, int oldVersion, int newVersion) {}
  }
</code></pre><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是一个演示SQLite数据库用法的示例。它创建了一个基本的联系人应用程序，该应用程序允许插入，删除和修改联系人。要尝试使用此示例，您需要在支持相机的实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以获取所有XML组件的引用，并在listView上填充联系人。</li><li>创建新的src/DBHelper.java来管理数据库工作</li><li>创建一个新的Activity作为DisplayContact.java，它将在屏幕上显示该联系人</li><li>修改res/layout/activity_main以添加相应的XML组件</li><li>修改res/layout/activity_display_contact.xml以添加相应的XML组件</li><li>修改res/values/string.xml以添加必要的字符串组件</li><li>修改res/menu/display_contact.xml以添加必要的菜单组件</li><li>创建一个新菜单为res/menu/mainmenu.xml以添加插入联系人选项</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
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
      public final static String EXTRA_MESSAGE = &quot;MESSAGE&quot;;
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
                  dataBundle.putInt(&quot;id&quot;, id_To_Search);
    
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
                  dataBundle.putInt(&quot;id&quot;, 0);
    
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

</code></pre><p>以下是修改后的主要活动文件src/com.jc2182.demo/DBHelper.java的内容。</p><pre><code class="language-java">
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

    public static final String DATABASE_NAME = &quot;MyDBName.db&quot;;
    public static final String CONTACTS_TABLE_NAME = &quot;contacts&quot;;
    public static final String CONTACTS_COLUMN_NAME = &quot;name&quot;;
    public static final String CONTACTS_COLUMN_EMAIL = &quot;email&quot;;
    public static final String CONTACTS_COLUMN_STREET = &quot;street&quot;;
    public static final String CONTACTS_COLUMN_CITY = &quot;place&quot;;
    public static final String CONTACTS_COLUMN_PHONE = &quot;phone&quot;;
    private HashMap hp;

    public DBHelper(Context context) {
        super(context, DATABASE_NAME , null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // TODO Auto-generated method stub
        db.execSQL( &quot;create table contacts &quot; + &quot;(id integer primary key, name text,phone text,email text, street text,place text)&quot;
        );
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // TODO Auto-generated method stub
        db.execSQL(&quot;DROP TABLE IF EXISTS contacts&quot;);
        onCreate(db);
    }

    public boolean insertContact (String name, String phone, String email, String street,String place) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(&quot;name&quot;, name);
        contentValues.put(&quot;phone&quot;, phone);
        contentValues.put(&quot;email&quot;, email);
        contentValues.put(&quot;street&quot;, street);
        contentValues.put(&quot;place&quot;, place);
        db.insert(&quot;contacts&quot;, null, contentValues);
        return true;
    }

    public Cursor getData(int id) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor res =  db.rawQuery( &quot;select * from contacts where id=&quot;+id+&quot;&quot;, null );
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
        contentValues.put(&quot;name&quot;, name);
        contentValues.put(&quot;phone&quot;, phone);
        contentValues.put(&quot;email&quot;, email);
        contentValues.put(&quot;street&quot;, street);
        contentValues.put(&quot;place&quot;, place);
        db.update(&quot;contacts&quot;, contentValues, &quot;id = ? &quot;, new String[] { Integer.toString(id) } );
        return true;
    }

    public void deleteContact (Integer id) {
        SQLiteDatabase db = this.getWritableDatabase();
        db.delete(&quot;contacts&quot;,
                &quot;id = ? &quot;,
                new String[]{Integer.toString(id)});
    }

    public ArrayList&lt;String&gt; getAllCotacts() {
        ArrayList&lt;String&gt; array_list = new ArrayList&lt;String&gt;();

        //hp = new HashMap();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor res =  db.rawQuery( &quot;select * from contacts&quot;, null );
        res.moveToFirst();

        while(res.isAfterLast() == false){
            array_list.add(res.getString(res.getColumnIndex(CONTACTS_COLUMN_NAME)));
            res.moveToNext();
        }
        return array_list;
    }
}
</code></pre><p>以下是修改后的主要活动文件src/com.jc2182.demo/DisplayContact.java的内容。</p><pre><code class="language-java">package com.jc2182.demo;

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
            int Value = extras.getInt(&quot;id&quot;);

            if (Value &gt; 0) {
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
            int Value = extras.getInt(&quot;id&quot;);
            if (Value &gt; 0) {
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
                                Toast.makeText(getApplicationContext(), &quot;Deleted Successfully&quot;, Toast.LENGTH_SHORT).show();
                                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                                startActivity(intent);
                            }
                        }).setNegativeButton(R.string.no, new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                // User cancelled the dialog
                            }
                        });

                AlertDialog d = builder.create();
                d.setTitle(&quot;Are you sure&quot;);
                d.show();

                return true;
            default:
                return super.onOptionsItemSelected(item);

        }
    }

    public void run(View view) {
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            int Value = extras.getInt(&quot;id&quot;);
            if (Value &gt; 0) {
                if (mydb.updateContact(id_To_Update, name.getText().toString(),
                        phone.getText().toString(), email.getText().toString(),
                        street.getText().toString(), place.getText().toString())) {
                    Toast.makeText(getApplicationContext(), &quot;Updated&quot;, Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                    startActivity(intent);
                } else {
                    Toast.makeText(getApplicationContext(), &quot;not Updated&quot;, Toast.LENGTH_SHORT).show();
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
                            &quot;done&quot;,
                            Toast.LENGTH_SHORT)
                            .show();
                } else {
                    Toast.makeText(
                            getApplicationContext(),
                            &quot;not done&quot;,
                            Toast.LENGTH_SHORT)
                            .show();
                }
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
            }
        }
    }
}
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textView&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;30dp&quot;
        android:text=&quot;数据库操作示例&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView2&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;35dp&quot;
        android:textColor=&quot;#ff16ff01&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:background=&quot;#112233ee&quot;
        android:src=&quot;@drawable/logo&quot;/&gt;

    &lt;ScrollView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/scrollView&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_alignParentEnd=&quot;true&quot;&gt;

        &lt;ListView
            android:id=&quot;@+id/listView1&quot;
            android:layout_width=&quot;match_parent&quot;
            android:layout_height=&quot;wrap_content&quot;
            android:layout_centerHorizontal=&quot;true&quot;
            android:layout_centerVertical=&quot;true&quot; &gt;
        &lt;/ListView&gt;

    &lt;/ScrollView&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是res/layout/activity_display_contact.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;ScrollView xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:id=&quot;@+id/scrollView1&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.DisplayContact&quot; &gt;

    &lt;RelativeLayout
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;00dp&quot;&gt;

    &lt;EditText
        android:id=&quot;@+id/editTextName&quot;
        android:layout_width=&quot;280dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_marginTop=&quot;5dp&quot;
        android:layout_toEndOf=&quot;@+id/textView1&quot;
        android:ems=&quot;10&quot;
        android:inputType=&quot;text&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView1&quot;
        android:layout_width=&quot;83dp&quot;
        android:layout_height=&quot;49dp&quot;
        android:text=&quot;@string/name&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView5&quot;
        android:layout_width=&quot;83dp&quot;
        android:layout_height=&quot;49dp&quot;
        android:layout_below=&quot;@+id/textView1&quot;
        android:text=&quot;@string/phone&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot; /&gt;

    &lt;EditText
        android:id=&quot;@+id/editTextPhone&quot;
        android:layout_width=&quot;274dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/editTextName&quot;
        android:layout_toEndOf=&quot;@+id/textView5&quot;
        android:layout_marginTop=&quot;10dp&quot;
        android:ems=&quot;10&quot;
        android:inputType=&quot;phone|text&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView4&quot;
        android:layout_width=&quot;83dp&quot;
        android:layout_height=&quot;49dp&quot;
        android:layout_below=&quot;@+id/textView5&quot;
        android:text=&quot;@string/street&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot; /&gt;

    &lt;EditText
        android:id=&quot;@+id/editTextStreet&quot;
        android:layout_width=&quot;278dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@id/editTextPhone&quot;
        android:layout_toEndOf=&quot;@+id/textView4&quot;
        android:layout_marginTop=&quot;9dp&quot;
        android:ems=&quot;10&quot;
        android:inputType=&quot;text&quot; /&gt;


    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;76dp&quot;
        android:layout_height=&quot;41dp&quot;
        android:layout_alignLeft=&quot;@+id/textView1&quot;
        android:layout_alignBottom=&quot;@+id/editTextEmail&quot;
        android:text=&quot;@string/email&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot; /&gt;


    &lt;EditText
        android:id=&quot;@+id/editTextEmail&quot;
        android:layout_width=&quot;276dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/editTextStreet&quot;
        android:layout_alignStart=&quot;@+id/editTextStreet&quot;
        android:layout_marginTop=&quot;9dp&quot;
        android:ems=&quot;10&quot;
        android:inputType=&quot;textEmailAddress&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView3&quot;
        android:layout_width=&quot;104dp&quot;
        android:layout_height=&quot;26dp&quot;
        android:layout_alignBaseline=&quot;@+id/editTextCity&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_marginLeft=&quot;0dp&quot;
        android:layout_toLeftOf=&quot;@+id/editTextEmail&quot;
        android:text=&quot;@string/country&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot; /&gt;

    &lt;EditText
        android:id=&quot;@+id/editTextCity&quot;
        android:layout_width=&quot;274dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/editTextEmail&quot;
        android:layout_alignEnd=&quot;@+id/editTextName&quot;
        android:layout_marginTop=&quot;30dp&quot;
        android:ems=&quot;10&quot;
        android:inputType=&quot;text&quot; /&gt;

        &lt;Button
            android:id=&quot;@+id/button1&quot;
            android:layout_width=&quot;104dp&quot;
            android:layout_height=&quot;62dp&quot;
            android:layout_alignStart=&quot;@+id/editTextCity&quot;
            android:layout_alignParentBottom=&quot;true&quot;
            android:layout_below=&quot;@+id/editTextCity&quot;
            android:layout_marginLeft=&quot;-5dp&quot;
            android:layout_marginBottom=&quot;2dp&quot;
            android:onClick=&quot;run&quot;
            android:text=&quot;@string/save&quot; /&gt;
    &lt;/RelativeLayout&gt;

&lt;/ScrollView&gt;
</code></pre><p>以下是res/value/string.xml的内容</p><pre><code class="language-xml">&lt;resources&gt;
    &lt;string name=&quot;app_name&quot;&gt;Demo&lt;/string&gt;
    &lt;string name=&quot;Add_New&quot;&gt;添加新的&lt;/string&gt;
    &lt;string name=&quot;edit&quot;&gt;编辑联系人&lt;/string&gt;
    &lt;string name=&quot;delete&quot;&gt;删除联系人&lt;/string&gt;
    &lt;string name=&quot;title_activity_display_contact&quot;&gt;显示联系人&lt;/string&gt;
    &lt;string name=&quot;name&quot;&gt;姓名&lt;/string&gt;
    &lt;string name=&quot;phone&quot;&gt;电话&lt;/string&gt;
    &lt;string name=&quot;email&quot;&gt;邮箱&lt;/string&gt;
    &lt;string name=&quot;street&quot;&gt;街道&lt;/string&gt;
    &lt;string name=&quot;country&quot;&gt;城市/省份/国家&lt;/string&gt;
    &lt;string name=&quot;save&quot;&gt;保存联系人&lt;/string&gt;
    &lt;string name=&quot;deleteContact&quot;&gt;您确定要删除他/她？&lt;/string&gt;
    &lt;string name=&quot;yes&quot;&gt;是&lt;/string&gt;
    &lt;string name=&quot;no&quot;&gt;否&lt;/string&gt;
&lt;/resources&gt;
</code></pre><p>以下是res/menu/main_menu.xml的内容</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;menu xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot; &gt;

    &lt;item android:id=&quot;@+id/item1&quot;
        android:icon=&quot;@drawable/ic_launcher&quot;
        android:title=&quot;@string/Add_New&quot; &gt;
    &lt;/item&gt;

&lt;/menu&gt;
</code></pre><p>以下是AndroidManifest.xml的内容</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.demo&quot;
    android:installLocation=&quot;auto&quot;&gt;
    &lt;application
        android:allowBackup=&quot;true&quot;
        android:icon=&quot;@mipmap/ic_launcher&quot;
        android:label=&quot;@string/app_name&quot;
        android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
        android:usesCleartextTraffic=&quot;true&quot;
        android:supportsRtl=&quot;true&quot;
        android:theme=&quot;@style/AppTheme&quot;&gt;
        &lt;activity android:name=&quot;.MainActivity&quot;&gt;
            &lt;intent-filter&gt;
                &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;

                &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

        &lt;activity android:name=&quot;.DisplayContact&quot;/&gt;
    &lt;/application&gt;

&lt;/manifest&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/db1.png" alt=""></p><p>按munu键出现</p><p><img src="https://www.jc2182.com/images/android/db2.png" alt=""></p><p>点击联系人，返回到第一张页面</p><p><img src="https://www.jc2182.com/images/android/db3.png" alt=""></p><p><img src="https://www.jc2182.com/images/android/db4.png" alt=""></p>`,48),d=[i];function r(u,l){return n(),e("div",null,d)}const p=t(a,[["render",r],["__file","sqlite.html.vue"]]),c=JSON.parse('{"path":"/android-tutor/advanced/sqlite.html","title":"SQLite数据库","lang":"zh-CN","frontmatter":{"description":"SQLite数据库 SQLite是一个开放源代码SQL数据库，可将数据存储到设备上的文本文件中。Android内置了内置的SQLite数据库实现。SQLite支持所有关系数据库功能。为了访问该数据库，您无需为其建立任何类型的连接，例如JDBC，ODBC等 数据库-包 主要包是android.database.sqlite，其中包含用于管理自己的数据库的...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/sqlite.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"SQLite数据库"}],["meta",{"property":"og:description","content":"SQLite数据库 SQLite是一个开放源代码SQL数据库，可将数据存储到设备上的文本文件中。Android内置了内置的SQLite数据库实现。SQLite支持所有关系数据库功能。为了访问该数据库，您无需为其建立任何类型的连接，例如JDBC，ODBC等 数据库-包 主要包是android.database.sqlite，其中包含用于管理自己的数据库的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/db1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SQLite数据库\\",\\"image\\":[\\"https://www.jc2182.com/images/android/db1.png\\",\\"https://www.jc2182.com/images/android/db2.png\\",\\"https://www.jc2182.com/images/android/db3.png\\",\\"https://www.jc2182.com/images/android/db4.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":9.94,"words":2983},"filePathRelative":"android-tutor/advanced/sqlite.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,c as data};
