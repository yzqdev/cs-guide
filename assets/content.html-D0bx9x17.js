import{_ as t,c as n,o,d as e}from"./app-CbULZrmi.js";const i={},r=e(`<h1 id="内容提供者" tabindex="-1"><a class="header-anchor" href="#内容提供者"><span>内容提供者</span></a></h1><h2 id="android-内容提供者-content-providers" tabindex="-1"><a class="header-anchor" href="#android-内容提供者-content-providers"><span>Android 内容提供者（Content Providers）</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>内容提供者(Content Providers)</code>组件应要求将数据从一个应用程序提供给其他应用程序。此类请求由ContentResolver类的方法处理。内容提供者可以使用不同的方式来存储其数据，并且数据可以存储在数据库中，文件中，甚至可以通过网络存储。</p></div><p><img src="https://www.jc2182.com/images/android/contentproviders.jpg" alt="service"></p><p>有时需要跨应用程序共享数据。这是内容提供者（Content Providers）组件变得非常有用的地方。</p><p>内容提供者（Content Providers）可让您将内容集中在一个地方，并有许多不同的应用程序根据需要对其进行访问。内容提供者的行为与数据库非常相似，您可以在其中查询，编辑其内容以及使用insert()，update()，delete()和query()方法添加或删除内容。在大多数情况下，此数据存储在SQlite数据库中。内容提供程序作为<strong>ContentProvider</strong>类的子类实现，并且必须实现一组标准的API，这些API可使其他应用程序执行事务。</p><pre><code class="language-java">  public class My Application extends  ContentProvider {
  }
</code></pre><h2 id="内容uri" tabindex="-1"><a class="header-anchor" href="#内容uri"><span>内容URI</span></a></h2><p>要查询内容提供者，您可以以URI的形式指定查询字符串，其格式如下：</p><pre><code class="language-xml">  &lt;prefix&gt;://&lt;authority&gt;/&lt;data_type&gt;/&lt;id&gt;
</code></pre><p>这是URI各个部分的详细信息-</p><table><thead><tr><th>部分</th><th>说明</th></tr></thead><tbody><tr><td><strong>prefix</strong></td><td>始终设置为content://</td></tr><tr><td><strong>authority</strong></td><td>这指定了内容提供者的应用名称，例如联系人，浏览器等。对于第三方内容提供者，这可以是标准名称，例如com.jc2182.statusprovider</td></tr><tr><td><strong>data_type</strong></td><td>这表明该特定提供程序提供的数据类型。 例如，如果您要从“联系人”内容提供者获取所有联系人，则数据路径将为“people”，而URI看起来应为 content://contacts/people</td></tr><tr><td><strong>id</strong></td><td>这指定了请求的特定记录。 例如，如果您要在“联系人”内容提供者中查找联系人号码5，则URI看起来应类似于此 content://contacts/people/5</td></tr></tbody></table><h2 id="创建内容提供者" tabindex="-1"><a class="header-anchor" href="#创建内容提供者"><span>创建内容提供者</span></a></h2><p>这涉及创建您自己的内容提供程序的简单步骤。</p><ol><li>首先，您需要创建一个扩展ContentProviderbaseclass的Content Provider类。</li><li>其次，您需要定义将用于访问内容的内容提供商URI地址。</li><li>接下来，您将需要创建自己的数据库以保留内容。通常，Android使用SQLite数据库，并且需要重写onCreate()方法，该方法将使用SQLite Open Helper方法创建或打开提供程序的数据库。启动应用程序时，将在主应用程序线程上调用其每个内容提供程序的onCreate()处理程序。</li><li>接下来，您将必须实施Content Provider查询以执行不同的数据库特定操作。</li><li>最后，使用<code>&lt;provider&gt;</code>标签将您的内容提供者注册到您的activity文件中。</li></ol><p>这是您需要在Content Provider类中重写的方法列表，以使Content Provider工作-</p><ul><li><strong>onCreate()</strong> - 在提供程序启动时调用此方法。</li><li><strong>query()</strong> - 此方法从客户端接收请求。结果作为Cursor对象返回。</li><li><strong>insert()</strong> - 此方法将新记录插入到内容提供程序中。</li><li><strong>delete()</strong> - 此方法从内容提供者删除现有记录。</li><li><strong>update()</strong> - 此方法更新内容提供者提供的现有记录。</li><li><strong>getType()</strong> - 此方法返回给定URI处数据的MIME类型。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>本示例将向您说明如何创建自己的ContentProvider(内容提供者)。因此，让我们按照以下步骤进行操作，类似于创建<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World 例子</a>时遵循的步骤-</p><ol><li>您将使用Android StudioIDE创建一个Android应用程序，并在com.example.helloworld包下将其命名为HelloWrold，Activity为空。</li><li>修改主activity文件MainActivity.java以添加两个新方法onClickAddName()和onClickRetrieveStudents()。</li><li>在com.example.helloworld包下创建一个名为StudentsProvider.java的新Java文件， 以定义您的实际提供程序和相关方法。</li><li>使用<code>&lt;provider ... /&gt;</code>标记在AndroidManifest.xml文件中注册内容提供者</li><li>修改res/layout/activity_main.xml文件的默认内容，以包括一个小的GUI图形界面以添加学生记录。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主activity文件src/com.jc2182.helloworld/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。我们添加了两个新方法onClickAddName()和onClickRetrieveStudents()来处理用户与应用程序的交互。</p><pre><code class="language-java">  
  
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
          String URL = &quot;content://com.jc2182.helloworld.StudentsProvider&quot;;
  
          Uri students = Uri.parse(URL);
          Cursor c = managedQuery(students, null, null, null, &quot;name&quot;);
  
          if (c.moveToFirst()) {
              do{
                  Toast.makeText(this,
                          c.getString(c.getColumnIndex(StudentsProvider._ID)) +
                                  &quot;, &quot; +  c.getString(c.getColumnIndex( StudentsProvider.NAME)) +
                                  &quot;, &quot; + c.getString(c.getColumnIndex( StudentsProvider.GRADE)),
                          Toast.LENGTH_SHORT).show();
              } while (c.moveToNext());
          }
      }
  }
</code></pre><p>在com.jc2182.helloworld包下创建新文件StudentsProvider.java ，以下是src/com.jc2182.helloworld/StudentsProvider.java的内容 -</p><pre><code class="language-java">  
  
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
      static final String PROVIDER_NAME = &quot;com.jc2182.helloworld.StudentsProvider&quot;;
      static final String URL = &quot;content://&quot; + PROVIDER_NAME + &quot;/students&quot;;
      static final Uri CONTENT_URI = Uri.parse(URL);
  
      static final String _ID = &quot;_id&quot;;
      static final String NAME = &quot;name&quot;;
      static final String GRADE = &quot;grade&quot;;
  
      private static HashMap&lt;string, string&gt; STUDENTS_PROJECTION_MAP;
  
      static final int STUDENTS = 1;
      static final int STUDENT_ID = 2;
  
      static final UriMatcher uriMatcher;
      static{
          uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
          uriMatcher.addURI(PROVIDER_NAME, &quot;students&quot;, STUDENTS);
          uriMatcher.addURI(PROVIDER_NAME, &quot;students/#&quot;, STUDENT_ID);
      }
  
      /**     * 数据库特定的常量声明     */
  
      private SQLiteDatabase db;
      static final String DATABASE_NAME = &quot;College&quot;;
      static final String STUDENTS_TABLE_NAME = &quot;students&quot;;
      static final int DATABASE_VERSION = 1;
      static final String CREATE_DB_TABLE =
              &quot; CREATE TABLE &quot; + STUDENTS_TABLE_NAME +
                      &quot; (_id INTEGER PRIMARY KEY AUTOINCREMENT, &quot; +
                      &quot; name TEXT NOT NULL, &quot; +
                      &quot; grade TEXT NOT NULL);&quot;;
  
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
              db.execSQL(&quot;DROP TABLE IF EXISTS &quot; +  STUDENTS_TABLE_NAME);
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
          long rowID = db.insert( STUDENTS_TABLE_NAME, &quot;&quot;, values);
  
          /**         * 如果记录添加成功         */
          if (rowID &gt; 0) {
              Uri _uri = ContentUris.withAppendedId(CONTENT_URI, rowID);
              getContext().getContentResolver().notifyChange(_uri, null);
              return _uri;
          }
  
          throw new SQLException(&quot;无法将记录添加到 &quot; + uri);
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
                  qb.appendWhere( _ID + &quot;=&quot; + uri.getPathSegments().get(1));
                  break;
  
              default:
          }
  
          if (sortOrder == null || sortOrder == &quot;&quot;){
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
                  count = db.delete( STUDENTS_TABLE_NAME, _ID +  &quot; = &quot; + id +
                                  (!TextUtils.isEmpty(selection) ? &quot;  AND (&quot; + selection + &#39;)&#39; : &quot;&quot;), selectionArgs);
                  break;
              default:
                  throw new IllegalArgumentException(&quot;Unknown URI &quot; + uri);
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
                          _ID + &quot; = &quot; + uri.getPathSegments().get(1) +
                                  (!TextUtils.isEmpty(selection) ? &quot;  AND (&quot; +selection + &#39;)&#39; : &quot;&quot;), selectionArgs);
                  break;
              default:
                  throw new IllegalArgumentException(&quot;Unknown URI &quot; + uri );
          }
  
          getContext().getContentResolver().notifyChange(uri, null);
          return count;
      }
  
      @Override
      public String getType(Uri uri) {
          switch (uriMatcher.match(uri)){
              /**             *获取所有学生记录             */
              case STUDENTS:
                  return &quot;vnd.android.cursor.dir/vnd.example.students&quot;;
              /**             * 找一个指定的学生             */
              case STUDENT_ID:
                  return &quot;vnd.android.cursor.item/vnd.example.students&quot;;
              default:
                  throw new IllegalArgumentException(&quot;Unsupported URI: &quot; + uri);
          }
      }
  }
</code></pre><p>以下将修改AndroidManifest.xml文件的内容 。在这里，我们添加了&lt;provider ... /&gt;标签以包括我们的内容提供者：</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      package=&quot;com.jc2182.helloworld&quot;&gt;
  
      &lt;application
          android:allowBackup=&quot;true&quot;
          android:icon=&quot;@mipmap/ic_launcher&quot;
          android:label=&quot;@string/app_name&quot;
          android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
          android:supportsRtl=&quot;true&quot;
          android:theme=&quot;@style/AppTheme&quot;&gt;
          &lt;activity android:name=&quot;.MainActivity&quot;&gt;
              &lt;intent-filter&gt;
                  &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;
  
                  &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;
              &lt;/intent-filter&gt;
          &lt;/activity&gt;
  
          &lt;provider android:name=&quot;StudentsProvider&quot;
              android:authorities=&quot;com.jc2182.helloworld.StudentsProvider&quot;/&gt;
  
      &lt;/application&gt;
  
  &lt;/manifest&gt;
</code></pre><p>以下是res/layout/activity_main.xml文件的内容 -</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      xmlns:tools=&quot;http://schemas.android.com/tools&quot;
      android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot;
      android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;
      android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;
      android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
      android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;
      tools:context=&quot;.MainActivity&quot;&gt;
 
  &lt;TextView
      android:id=&quot;@+id/textView1&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:text=&quot;内容提供者例子&quot;
      android:layout_alignParentTop=&quot;true&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:textSize=&quot;30dp&quot; /&gt;

  &lt;TextView
      android:id=&quot;@+id/textView2&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:text=&quot;蝴蝶教程&quot;
      android:textColor=&quot;#ff87ff09&quot;
      android:textSize=&quot;30dp&quot;
      android:layout_below=&quot;@+id/textView1&quot;
      android:layout_centerHorizontal=&quot;true&quot; /&gt;

  &lt;ImageButton
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:id=&quot;@+id/imageButton&quot;
      android:src=&quot;@drawable/logo&quot;
      android:layout_below=&quot;@+id/textView2&quot;
      android:layout_centerHorizontal=&quot;true&quot; /&gt;

  &lt;Button
      android:id=&quot;@+id/button2&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_below=&quot;@+id/editText3&quot;
      android:layout_alignStart=&quot;@+id/textView2&quot;
      android:layout_alignLeft=&quot;@+id/textView2&quot;
      android:layout_alignEnd=&quot;@+id/textView2&quot;
      android:layout_alignRight=&quot;@+id/textView2&quot;
      android:layout_centerVertical=&quot;true&quot;
      android:layout_marginStart=&quot;3dp&quot;
      android:layout_marginLeft=&quot;3dp&quot;
      android:layout_marginTop=&quot;37dp&quot;
      android:layout_marginEnd=&quot;-3dp&quot;
      android:layout_marginRight=&quot;-3dp&quot;
      android:onClick=&quot;onClickAddName&quot;
      android:text=&quot;添加学生&quot; /&gt;

  &lt;EditText
      android:id=&quot;@+id/editText&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_below=&quot;@+id/imageButton&quot;
      android:layout_alignEnd=&quot;@+id/imageButton&quot;
      android:layout_alignRight=&quot;@+id/imageButton&quot;
      android:layout_marginTop=&quot;24dp&quot;
      android:layout_marginEnd=&quot;15dp&quot;
      android:layout_marginRight=&quot;15dp&quot; /&gt;

  &lt;EditText
      android:id=&quot;@+id/editText2&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_alignStart=&quot;@+id/textView1&quot;
      android:layout_alignLeft=&quot;@+id/textView1&quot;
      android:layout_alignTop=&quot;@+id/editText&quot;
      android:layout_alignEnd=&quot;@+id/textView1&quot;
      android:layout_alignRight=&quot;@+id/textView1&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:layout_marginStart=&quot;-25dp&quot;
      android:layout_marginLeft=&quot;-25dp&quot;
      android:layout_marginTop=&quot;1dp&quot;
      android:layout_marginEnd=&quot;25dp&quot;
      android:layout_marginRight=&quot;25dp&quot;
      android:hint=&quot;姓名&quot;
      android:textColorHint=&quot;@android:color/holo_blue_light&quot; /&gt;

  &lt;EditText
      android:id=&quot;@+id/editText3&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_below=&quot;@+id/editText&quot;
      android:layout_alignStart=&quot;@+id/editText2&quot;
      android:layout_alignLeft=&quot;@+id/editText2&quot;
      android:layout_alignEnd=&quot;@+id/editText2&quot;
      android:layout_alignRight=&quot;@+id/editText2&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:layout_marginStart=&quot;0dp&quot;
      android:layout_marginLeft=&quot;0dp&quot;
      android:layout_marginTop=&quot;20dp&quot;
      android:layout_marginEnd=&quot;0dp&quot;
      android:layout_marginRight=&quot;0dp&quot;
      android:hint=&quot;年级&quot;
      android:textColorHint=&quot;@android:color/holo_blue_bright&quot; /&gt;

  &lt;Button
      android:id=&quot;@+id/button&quot;
      android:layout_width=&quot;117dp&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_below=&quot;@+id/button2&quot;
      android:layout_alignStart=&quot;@+id/button2&quot;
      android:layout_alignLeft=&quot;@+id/button2&quot;
      android:layout_alignEnd=&quot;@+id/editText3&quot;
      android:layout_alignRight=&quot;@+id/editText3&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:layout_marginStart=&quot;0dp&quot;
      android:layout_marginLeft=&quot;0dp&quot;
      android:layout_marginTop=&quot;58dp&quot;
      android:layout_marginEnd=&quot;19dp&quot;
      android:layout_marginRight=&quot;19dp&quot;
      android:onClick=&quot;onClickRetrieveStudents&quot;
      android:text=&quot;检索学生&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行修改后的Hello World！我们刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后点击Android StudioRun图标工具栏中的“运行” 图标。Android Studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/contentproviders1.png" alt="service"></p><p>现在启动内容提供者，让我们单击“添加学生”按钮，这将保存一条记录到数据库，如下所示：</p><p><img src="https://www.jc2182.com/images/android/contentproviders2.png" alt="service"></p><p>点击“检索学生”按钮，将保存所有记录的学生打印出来，如下所示：</p>`,33),d=[r];function a(u,l){return o(),n("div",null,d)}const c=t(i,[["render",a],["__file","content.html.vue"]]),q=JSON.parse('{"path":"/android-tutor/basic/content.html","title":"内容提供者","lang":"zh-CN","frontmatter":{"description":"内容提供者 Android 内容提供者（Content Providers） 提示 内容提供者(Content Providers)组件应要求将数据从一个应用程序提供给其他应用程序。此类请求由ContentResolver类的方法处理。内容提供者可以使用不同的方式来存储其数据，并且数据可以存储在数据库中，文件中，甚至可以通过网络存储。 service ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/basic/content.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"内容提供者"}],["meta",{"property":"og:description","content":"内容提供者 Android 内容提供者（Content Providers） 提示 内容提供者(Content Providers)组件应要求将数据从一个应用程序提供给其他应用程序。此类请求由ContentResolver类的方法处理。内容提供者可以使用不同的方式来存储其数据，并且数据可以存储在数据库中，文件中，甚至可以通过网络存储。 service ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/contentproviders.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内容提供者\\",\\"image\\":[\\"https://www.jc2182.com/images/android/contentproviders.jpg\\",\\"https://www.jc2182.com/images/android/contentproviders1.png\\",\\"https://www.jc2182.com/images/android/contentproviders2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Android 内容提供者（Content Providers）","slug":"android-内容提供者-content-providers","link":"#android-内容提供者-content-providers","children":[]},{"level":2,"title":"内容URI","slug":"内容uri","link":"#内容uri","children":[]},{"level":2,"title":"创建内容提供者","slug":"创建内容提供者","link":"#创建内容提供者","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":8.39,"words":2516},"filePathRelative":"android-tutor/basic/content.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,q as data};
