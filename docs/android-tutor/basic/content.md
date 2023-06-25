# 内容提供者

## Android 内容提供者（Content Providers）

:::tip
`内容提供者(Content Providers)`组件应要求将数据从一个应用程序提供给其他应用程序。此类请求由ContentResolver类的方法处理。内容提供者可以使用不同的方式来存储其数据，并且数据可以存储在数据库中，文件中，甚至可以通过网络存储。
:::
  ![service](https://www.jc2182.com/images/android/contentproviders.jpg)
  
  有时需要跨应用程序共享数据。这是内容提供者（Content Providers）组件变得非常有用的地方。

  内容提供者（Content Providers）可让您将内容集中在一个地方，并有许多不同的应用程序根据需要对其进行访问。内容提供者的行为与数据库非常相似，您可以在其中查询，编辑其内容以及使用insert()，update()，delete()和query()方法添加或删除内容。在大多数情况下，此数据存储在SQlite数据库中。内容提供程序作为**ContentProvider**类的子类实现，并且必须实现一组标准的API，这些API可使其他应用程序执行事务。
  
```java
  public class My Application extends  ContentProvider {
  }
```
  
## 内容URI
  
  要查询内容提供者，您可以以URI的形式指定查询字符串，其格式如下：
  
```xml
  <prefix>://<authority>/<data_type>/<id>
```
  
  这是URI各个部分的详细信息-
  
  | 部分          | 说明                                                                                                                                                     |
  | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **prefix**    | 始终设置为content://                                                                                                                                     |
  | **authority** | 这指定了内容提供者的应用名称，例如联系人，浏览器等。对于第三方内容提供者，这可以是标准名称，例如com.jc2182.statusprovider                                |
  | **data_type** | 这表明该特定提供程序提供的数据类型。 例如，如果您要从“联系人”内容提供者获取所有联系人，则数据路径将为“people”，而URI看起来应为 content://contacts/people |
  | **id**        | 这指定了请求的特定记录。 例如，如果您要在“联系人”内容提供者中查找联系人号码5，则URI看起来应类似于此 content://contacts/people/5                          |
  
## 创建内容提供者
  
  这涉及创建您自己的内容提供程序的简单步骤。
  
  1. 首先，您需要创建一个扩展ContentProviderbaseclass的Content Provider类。
  2. 其次，您需要定义将用于访问内容的内容提供商URI地址。
  3. 接下来，您将需要创建自己的数据库以保留内容。通常，Android使用SQLite数据库，并且需要重写onCreate()方法，该方法将使用SQLite Open Helper方法创建或打开提供程序的数据库。启动应用程序时，将在主应用程序线程上调用其每个内容提供程序的onCreate()处理程序。
  4. 接下来，您将必须实施Content Provider查询以执行不同的数据库特定操作。
  5. 最后，使用`<provider>`标签将您的内容提供者注册到您的activity文件中。
  
  这是您需要在Content Provider类中重写的方法列表，以使Content Provider工作-
  
- **onCreate()** - 在提供程序启动时调用此方法。
- **query()** - 此方法从客户端接收请求。结果作为Cursor对象返回。
- **insert()** - 此方法将新记录插入到内容提供程序中。
- **delete()** - 此方法从内容提供者删除现有记录。
- **update()** - 此方法更新内容提供者提供的现有记录。
- **getType()** - 此方法返回给定URI处数据的MIME类型。

## 示例
  
  本示例将向您说明如何创建自己的ContentProvider(内容提供者)。因此，让我们按照以下步骤进行操作，类似于创建[Hello World 例子](https://www.jc2182.com/andriod/android-hello-world.html)时遵循的步骤-
  
  1. 您将使用Android StudioIDE创建一个Android应用程序，并在com.example.helloworld包下将其命名为HelloWrold，Activity为空。
  2. 修改主activity文件MainActivity.java以添加两个新方法onClickAddName()和onClickRetrieveStudents()。
  3. 在com.example.helloworld包下创建一个名为StudentsProvider.java的新Java文件， 以定义您的实际提供程序和相关方法。
  4. 使用`<provider ... />`标记在AndroidManifest.xml文件中注册内容提供者
  5. 修改res/layout/activity_main.xml文件的默认内容，以包括一个小的GUI图形界面以添加学生记录。
  6. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主activity文件src/com.jc2182.helloworld/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。我们添加了两个新方法onClickAddName()和onClickRetrieveStudents()来处理用户与应用程序的交互。
  
```java
  
  
  import androidx.appcompat.app.AppCompatActivity;
  
  import android.content.ContentValues;
  import android.database.Cursor;
  import android.net.Uri;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.EditText;
  import android.widget.Toast;
  
  public class MainActivity extends AppCompatActivity {
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
      }
  
      public void onClickAddName(View view) {
          // 添加一条学生新记录
          ContentValues values = new ContentValues();
          values.put(StudentsProvider.NAME, ((EditText)findViewById(R.id.editText2)).getText().toString());
  
          values.put(StudentsProvider.GRADE, ((EditText)findViewById(R.id.editText3)).getText().toString());
  
          Uri uri = getContentResolver().insert( StudentsProvider.CONTENT_URI, values);
  
          Toast.makeText(getBaseContext(),  uri.toString(), Toast.LENGTH_LONG).show();
      }
  
      public void onClickRetrieveStudents(View view) {
          // 检索学生记录
          String URL = "content://com.jc2182.helloworld.StudentsProvider";
  
          Uri students = Uri.parse(URL);
          Cursor c = managedQuery(students, null, null, null, "name");
  
          if (c.moveToFirst()) {
              do{
                  Toast.makeText(this,
                          c.getString(c.getColumnIndex(StudentsProvider._ID)) +
                                  ", " +  c.getString(c.getColumnIndex( StudentsProvider.NAME)) +
                                  ", " + c.getString(c.getColumnIndex( StudentsProvider.GRADE)),
                          Toast.LENGTH_SHORT).show();
              } while (c.moveToNext());
          }
      }
  }
 ```
  
  在com.jc2182.helloworld包下创建新文件StudentsProvider.java ，以下是src/com.jc2182.helloworld/StudentsProvider.java的内容 -
  
```java
  
  
  import android.content.ContentProvider;
  import android.content.ContentUris;
  import android.content.ContentValues;
  import android.content.Context;
  import android.content.UriMatcher;
  import android.database.Cursor;
  import android.database.SQLException;
  import android.database.sqlite.SQLiteDatabase;
  import android.database.sqlite.SQLiteOpenHelper;
  import android.database.sqlite.SQLiteQueryBuilder;
  import android.net.Uri;
  import android.text.TextUtils;
  
  import java.util.HashMap;
  
  public class StudentsProvider extends ContentProvider {
      static final String PROVIDER_NAME = "com.jc2182.helloworld.StudentsProvider";
      static final String URL = "content://" + PROVIDER_NAME + "/students";
      static final Uri CONTENT_URI = Uri.parse(URL);
  
      static final String _ID = "_id";
      static final String NAME = "name";
      static final String GRADE = "grade";
  
      private static HashMap<string, string> STUDENTS_PROJECTION_MAP;
  
      static final int STUDENTS = 1;
      static final int STUDENT_ID = 2;
  
      static final UriMatcher uriMatcher;
      static{
          uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
          uriMatcher.addURI(PROVIDER_NAME, "students", STUDENTS);
          uriMatcher.addURI(PROVIDER_NAME, "students/#", STUDENT_ID);
      }
  
      /**     * 数据库特定的常量声明     */
  
      private SQLiteDatabase db;
      static final String DATABASE_NAME = "College";
      static final String STUDENTS_TABLE_NAME = "students";
      static final int DATABASE_VERSION = 1;
      static final String CREATE_DB_TABLE =
              " CREATE TABLE " + STUDENTS_TABLE_NAME +
                      " (_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                      " name TEXT NOT NULL, " +
                      " grade TEXT NOT NULL);";
  
      /**     * 实际创建和管理提供程序的基础数据存储库的Helper类。     */
  
      private static class DatabaseHelper extends SQLiteOpenHelper {
          DatabaseHelper(Context context){
              super(context, DATABASE_NAME, null, DATABASE_VERSION);
          }
  
          @Override
          public void onCreate(SQLiteDatabase db) {
              db.execSQL(CREATE_DB_TABLE);
          }
  
          @Override
          public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
              db.execSQL("DROP TABLE IF EXISTS " +  STUDENTS_TABLE_NAME);
              onCreate(db);
          }
      }
  
      @Override
      public boolean onCreate() {
          Context context = getContext();
          DatabaseHelper dbHelper = new DatabaseHelper(context);
  
          /**         * 创建一个可写数据库，如果该数据库尚不存在，它将触发其创建。         */
  
          db = dbHelper.getWritableDatabase();
          return (db == null) ? false : true;
      }
  
      @Override
      public Uri insert(Uri uri, ContentValues values) {
          /**             * 添加新的学生记录         */
          long rowID = db.insert( STUDENTS_TABLE_NAME, "", values);
  
          /**         * 如果记录添加成功         */
          if (rowID > 0) {
              Uri _uri = ContentUris.withAppendedId(CONTENT_URI, rowID);
              getContext().getContentResolver().notifyChange(_uri, null);
              return _uri;
          }
  
          throw new SQLException("无法将记录添加到 " + uri);
      }
  
      @Override
      public Cursor query(Uri uri, String[] projection,
                          String selection, String[] selectionArgs, String sortOrder) {
          SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
          qb.setTables(STUDENTS_TABLE_NAME);
  
          switch (uriMatcher.match(uri)) {
              case STUDENTS:
                  qb.setProjectionMap(STUDENTS_PROJECTION_MAP);
                  break;
  
              case STUDENT_ID:
                  qb.appendWhere( _ID + "=" + uri.getPathSegments().get(1));
                  break;
  
              default:
          }
  
          if (sortOrder == null || sortOrder == ""){
              /**             * 默认情况下，按学生姓名排序             */
              sortOrder = NAME;
          }
  
          Cursor c = qb.query(db, projection, selection,
                  selectionArgs,null, null, sortOrder);
          /**         * 注册以观看内容URI的更改         */
          c.setNotificationUri(getContext().getContentResolver(), uri);
          return c;
      }
  
      @Override
      public int delete(Uri uri, String selection, String[] selectionArgs) {
          int count = 0;
          switch (uriMatcher.match(uri)){
              case STUDENTS:
                  count = db.delete(STUDENTS_TABLE_NAME, selection, selectionArgs);
                  break;
  
              case STUDENT_ID:
                  String id = uri.getPathSegments().get(1);
                  count = db.delete( STUDENTS_TABLE_NAME, _ID +  " = " + id +
                                  (!TextUtils.isEmpty(selection) ? "  AND (" + selection + ')' : ""), selectionArgs);
                  break;
              default:
                  throw new IllegalArgumentException("Unknown URI " + uri);
          }
  
          getContext().getContentResolver().notifyChange(uri, null);
          return count;
      }
  
      @Override
      public int update(Uri uri, ContentValues values,
                        String selection, String[] selectionArgs) {
          int count = 0;
          switch (uriMatcher.match(uri)) {
              case STUDENTS:
                  count = db.update(STUDENTS_TABLE_NAME, values, selection, selectionArgs);
                  break;
  
              case STUDENT_ID:
                  count = db.update(STUDENTS_TABLE_NAME, values,
                          _ID + " = " + uri.getPathSegments().get(1) +
                                  (!TextUtils.isEmpty(selection) ? "  AND (" +selection + ')' : ""), selectionArgs);
                  break;
              default:
                  throw new IllegalArgumentException("Unknown URI " + uri );
          }
  
          getContext().getContentResolver().notifyChange(uri, null);
          return count;
      }
  
      @Override
      public String getType(Uri uri) {
          switch (uriMatcher.match(uri)){
              /**             *获取所有学生记录             */
              case STUDENTS:
                  return "vnd.android.cursor.dir/vnd.example.students";
              /**             * 找一个指定的学生             */
              case STUDENT_ID:
                  return "vnd.android.cursor.item/vnd.example.students";
              default:
                  throw new IllegalArgumentException("Unsupported URI: " + uri);
          }
      }
  }
```
  
  以下将修改AndroidManifest.xml文件的内容 。在这里，我们添加了<provider ... />标签以包括我们的内容提供者：
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.jc2182.helloworld">
  
      <application
          android:allowBackup="true"
          android:icon="@mipmap/ic_launcher"
          android:label="@string/app_name"
          android:roundIcon="@mipmap/ic_launcher_round"
          android:supportsRtl="true"
          android:theme="@style/AppTheme">
          <activity android:name=".MainActivity">
              <intent-filter>
                  <action android:name="android.intent.action.MAIN" />
  
                  <category android:name="android.intent.category.LAUNCHER" />
              </intent-filter>
          </activity>
  
          <provider android:name="StudentsProvider"
              android:authorities="com.jc2182.helloworld.StudentsProvider"/>
  
      </application>
  
  </manifest>
```
  
  以下是res/layout/activity_main.xml文件的内容 -
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:paddingLeft="@dimen/activity_horizontal_margin"
      android:paddingRight="@dimen/activity_horizontal_margin"
      android:paddingTop="@dimen/activity_vertical_margin"
      android:paddingBottom="@dimen/activity_vertical_margin"
      tools:context=".MainActivity">
 
  <TextView
      android:id="@+id/textView1"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="内容提供者例子"
      android:layout_alignParentTop="true"
      android:layout_centerHorizontal="true"
      android:textSize="30dp" />

  <TextView
      android:id="@+id/textView2"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="蝴蝶教程"
      android:textColor="#ff87ff09"
      android:textSize="30dp"
      android:layout_below="@+id/textView1"
      android:layout_centerHorizontal="true" />

  <ImageButton
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/imageButton"
      android:src="@drawable/logo"
      android:layout_below="@+id/textView2"
      android:layout_centerHorizontal="true" />

  <Button
      android:id="@+id/button2"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_below="@+id/editText3"
      android:layout_alignStart="@+id/textView2"
      android:layout_alignLeft="@+id/textView2"
      android:layout_alignEnd="@+id/textView2"
      android:layout_alignRight="@+id/textView2"
      android:layout_centerVertical="true"
      android:layout_marginStart="3dp"
      android:layout_marginLeft="3dp"
      android:layout_marginTop="37dp"
      android:layout_marginEnd="-3dp"
      android:layout_marginRight="-3dp"
      android:onClick="onClickAddName"
      android:text="添加学生" />

  <EditText
      android:id="@+id/editText"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_below="@+id/imageButton"
      android:layout_alignEnd="@+id/imageButton"
      android:layout_alignRight="@+id/imageButton"
      android:layout_marginTop="24dp"
      android:layout_marginEnd="15dp"
      android:layout_marginRight="15dp" />

  <EditText
      android:id="@+id/editText2"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_alignStart="@+id/textView1"
      android:layout_alignLeft="@+id/textView1"
      android:layout_alignTop="@+id/editText"
      android:layout_alignEnd="@+id/textView1"
      android:layout_alignRight="@+id/textView1"
      android:layout_centerHorizontal="true"
      android:layout_marginStart="-25dp"
      android:layout_marginLeft="-25dp"
      android:layout_marginTop="1dp"
      android:layout_marginEnd="25dp"
      android:layout_marginRight="25dp"
      android:hint="姓名"
      android:textColorHint="@android:color/holo_blue_light" />

  <EditText
      android:id="@+id/editText3"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_below="@+id/editText"
      android:layout_alignStart="@+id/editText2"
      android:layout_alignLeft="@+id/editText2"
      android:layout_alignEnd="@+id/editText2"
      android:layout_alignRight="@+id/editText2"
      android:layout_centerHorizontal="true"
      android:layout_marginStart="0dp"
      android:layout_marginLeft="0dp"
      android:layout_marginTop="20dp"
      android:layout_marginEnd="0dp"
      android:layout_marginRight="0dp"
      android:hint="年级"
      android:textColorHint="@android:color/holo_blue_bright" />

  <Button
      android:id="@+id/button"
      android:layout_width="117dp"
      android:layout_height="wrap_content"
      android:layout_below="@+id/button2"
      android:layout_alignStart="@+id/button2"
      android:layout_alignLeft="@+id/button2"
      android:layout_alignEnd="@+id/editText3"
      android:layout_alignRight="@+id/editText3"
      android:layout_centerHorizontal="true"
      android:layout_marginStart="0dp"
      android:layout_marginLeft="0dp"
      android:layout_marginTop="58dp"
      android:layout_marginEnd="19dp"
      android:layout_marginRight="19dp"
      android:onClick="onClickRetrieveStudents"
      android:text="检索学生" />

</RelativeLayout>
```

让我们尝试运行修改后的Hello World！我们刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后点击Android StudioRun图标工具栏中的“运行” 图标。Android Studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![service](https://www.jc2182.com/images/android/contentproviders1.png)

现在启动内容提供者，让我们单击“添加学生”按钮，这将保存一条记录到数据库，如下所示：

![service](https://www.jc2182.com/images/android/contentproviders2.png)

点击“检索学生”按钮，将保存所有记录的学生打印出来，如下所示：
