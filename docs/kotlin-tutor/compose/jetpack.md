# Jetpack 全家桶

## 一、Room 数据库

### 添加依赖

```kotlin
// build.gradle.kts
plugins {
    id("com.google.devtools.ksp") version "1.9.22-1.0.17"  // 替代 kapt
}

android {
    // 启用 KSP
}

dependencies {
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")
}
```

### 定义实体

```kotlin
import androidx.room.*

@Entity(tableName = "users")
data class User(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "user_name") val name: String,
    val email: String,
    val age: Int,
    val createdAt: Long = System.currentTimeMillis(),
)

@Entity(tableName = "tasks")
data class Task(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val description: String = "",
    val isCompleted: Boolean = false,
    val userId: Long,
    @ForeignKey(
        entity = User::class,
        parentColumns = ["id"],
        childColumns = ["userId"],
        onDelete = ForeignKey.CASCADE,
    )
    val createdAt: Long = System.currentTimeMillis(),
)
```

### 定义 DAO

```kotlin
import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {
    @Query("SELECT * FROM users ORDER BY createdAt DESC")
    fun getAllUsers(): Flow<List<User>>

    @Query("SELECT * FROM users WHERE id = :id")
    suspend fun getUserById(id: Long): User?

    @Query("SELECT * FROM users WHERE name LIKE :query")
    fun searchUsers(query: String): Flow<List<User>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: User): Long

    @Insert
    suspend fun insertUsers(users: List<User>)

    @Update
    suspend fun updateUser(user: User)

    @Delete
    suspend fun deleteUser(user: User)

    @Query("DELETE FROM users")
    suspend fun deleteAll()
}
```

### 定义 Database

```kotlin
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [User::class, Task::class],
    version = 1,
    exportSchema = false,
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun taskDao(): TaskDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "my_app_database",
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
```

### 在 Compose 中使用

```kotlin
class UserViewModel(private val userDao: UserDao) : ViewModel() {
    val allUsers: StateFlow<List<User>> = userDao.getAllUsers()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun addUser(name: String, email: String, age: Int) {
        viewModelScope.launch(Dispatchers.IO) {
            userDao.insertUser(User(name = name, email = email, age = age))
        }
    }
}

@Composable
fun UserListScreen(viewModel: UserViewModel = viewModel()) {
    val users by viewModel.allUsers.collectAsState()

    LazyColumn {
        items(users) { user ->
            ListItem(
                headlineContent = { Text(user.name) },
                supportingContent = { Text(user.email) },
            )
        }
    }
}
```

## 二、Hilt 依赖注入

### 添加依赖

```kotlin
// build.gradle.kts
plugins {
    id("com.google.dagger.hilt.android") version "2.50"
    id("kotlin-kapt")  // Hilt 需要 kapt
}

dependencies {
    implementation("com.google.dagger:hilt-android:2.50")
    kapt("com.google.dagger:hilt-compiler:2.50")
    implementation("androidx.hilt:hilt-navigation-compose:1.1.0")
}
```

### 配置 Application

```kotlin
import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MyApplication : Application()
```

### 定义模块

```kotlin
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase {
        return AppDatabase.getInstance(context)
    }

    @Provides
    fun provideUserDao(database: AppDatabase): UserDao {
        return database.userDao()
    }

    @Provides
    @Singleton
    fun provideUserRepository(userDao: UserDao): UserRepository {
        return UserRepository(userDao)
    }
}

// 也可以使用 @Binds
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    @Singleton
    abstract fun bindUserRepository(impl: UserRepositoryImpl): UserRepository
}
```

### 在 ViewModel 中注入

```kotlin
import androidx.hilt.navigation.compose.hiltViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class HiltUserViewModel @Inject constructor(
    private val userRepository: UserRepository,
    private val savedStateHandle: SavedStateHandle,
) : ViewModel() {

    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()

    init {
        loadUsers()
    }

    private fun loadUsers() {
        viewModelScope.launch {
            userRepository.getUsers().collect { _users.value = it }
        }
    }
}

@Composable
fun HiltUserScreen(viewModel: HiltUserViewModel = hiltViewModel()) {
    val users by viewModel.users.collectAsState()
    LazyColumn {
        items(users) { user ->
            Text(user.name, modifier = Modifier.padding(16.dp))
        }
    }
}
```

## 三、DataStore

DataStore 是 SharedPreferences 的替代方案，支持键值对（Preferences DataStore）和类型化对象（Proto DataStore）。

### 1. Preferences DataStore

```kotlin
// build.gradle.kts
implementation("androidx.datastore:datastore-preferences:1.0.0")
```

```kotlin
import android.content.Context
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

// 扩展属性
val Context.dataStore by preferencesDataStore(name = "settings")

class SettingsManager(private val context: Context) {

    companion object {
        val IS_DARK_MODE = booleanPreferencesKey("is_dark_mode")
        val USERNAME = stringPreferencesKey("username")
        val FONT_SIZE = floatPreferencesKey("font_size")
        val NOTIFICATIONS_ENABLED = booleanPreferencesKey("notifications_enabled")
    }

    val isDarkMode: Flow<Boolean> = context.dataStore.data.map { prefs ->
        prefs[IS_DARK_MODE] ?: false
    }

    val username: Flow<String> = context.dataStore.data.map { prefs ->
        prefs[USERNAME] ?: ""
    }

    suspend fun setDarkMode(enabled: Boolean) {
        context.dataStore.edit { prefs -> prefs[IS_DARK_MODE] = enabled }
    }

    suspend fun setUsername(name: String) {
        context.dataStore.edit { prefs -> prefs[USERNAME] = name }
    }

    suspend fun clearAll() {
        context.dataStore.edit { it.clear() }
    }
}
```

### 2. 在 Compose 中使用

```kotlin
@Composable
fun SettingsScreen(settingsManager: SettingsManager) {
    val isDarkMode by settingsManager.isDarkMode.collectAsState(initial = false)
    val username by settingsManager.username.collectAsState(initial = "")
    val scope = rememberCoroutineScope()

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("设置", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text("深色模式")
            Switch(
                checked = isDarkMode,
                onCheckedChange = {
                    scope.launch { settingsManager.setDarkMode(it) }
                },
            )
        }

        Spacer(Modifier.height(16.dp))
        OutlinedTextField(
            value = username,
            onValueChange = { scope.launch { settingsManager.setUsername(it) } },
            label = { Text("用户名") },
            modifier = Modifier.fillMaxWidth(),
        )
    }
}
```

## 四、WorkManager

### 添加依赖

```kotlin
implementation("androidx.work:work-runtime-ktx:2.9.0")
```

### 定义 Worker

```kotlin
import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters

class SyncWorker(
    appContext: Context,
    params: WorkerParameters,
) : CoroutineWorker(appContext, params) {

    override suspend fun doWork(): Result {
        return try {
            // 执行后台同步任务
            val data = fetchDataFromApi()
            saveToDatabase(data)
            Result.success()
        } catch (e: Exception) {
            if (runAttemptCount < 3) Result.retry() else Result.failure()
        }
    }
}
```

### 调度任务

```kotlin
import androidx.work.*
import java.util.concurrent.TimeUnit

class WorkManagerHelper(private val context: Context) {

    fun scheduleSync() {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)  // 需要网络
            .setRequiresBatteryNotLow(true)                 // 电量充足
            .build()

        val syncRequest = PeriodicWorkRequestBuilder<SyncWorker>(
            15, TimeUnit.MINUTES  // 每 15 分钟执行一次
        )
            .setConstraints(constraints)
            .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30, TimeUnit.SECONDS)
            .build()

        WorkManager.getInstance(context).enqueueUniquePeriodicWork(
            "sync_work",
            ExistingPeriodicWorkPolicy.KEEP,
            syncRequest,
        )
    }

    fun cancelSync() {
        WorkManager.getInstance(context).cancelUniqueWork("sync_work")
    }
}
```

### 观察状态

```kotlin
@Composable
fun WorkStatusScreen() {
    val workInfos by WorkManager.getInstance(LocalContext.current)
        .getWorkInfosForUniqueWorkLiveData("sync_work")
        .observeAsState()

    workInfos?.forEach { info ->
        Text("状态：${info.state.name}")
    }
}
```

## 五、Paging 3

### 添加依赖

```kotlin
implementation("androidx.paging:paging-runtime-ktx:3.2.1")
implementation("androidx.paging:paging-compose:3.2.1")
```

### 定义 PagingSource

```kotlin
import androidx.paging.PagingSource
import androidx.paging.PagingState

class UserPagingSource(
    private val api: UserApi,
) : PagingSource<Int, User>() {

    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, User> {
        return try {
            val page = params.key ?: 1
            val response = api.getUsers(page, params.loadSize)
            LoadResult.Page(
                data = response.users,
                prevKey = if (page > 1) page - 1 else null,
                nextKey = if (response.users.isNotEmpty()) page + 1 else null,
            )
        } catch (e: Exception) {
            LoadResult.Error(e)
        }
    }

    override fun getRefreshKey(state: PagingState<Int, User>): Int? {
        return state.anchorPosition?.let { anchor ->
            state.closestPageToPosition(anchor)?.prevKey?.plus(1)
                ?: state.closestPageToPosition(anchor)?.nextKey?.minus(1)
        }
    }
}
```

### 在 ViewModel 中使用

```kotlin
class PagingViewModel : ViewModel() {
    val pager = Pager(PagingConfig(pageSize = 20)) {
        UserPagingSource(UserApi())
    }.flow.cachedIn(viewModelScope)
}
```

### 在 Compose 中使用

```kotlin
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.paging.compose.collectAsLazyPagingItems

@Composable
fun PagingUserScreen(viewModel: PagingViewModel = viewModel()) {
    val users = viewModel.pager.collectAsLazyPagingItems()

    LazyColumn {
        items(users) { user ->
            user?.let {
                ListItem(
                    headlineContent = { Text(it.name) },
                    supportingContent = { Text(it.email) },
                )
            }
        }

        // 加载中/加载失败指示器
        when (users.loadState.refresh) {
            is LoadState.Loading -> item { CircularProgressIndicator() }
            is LoadState.Error -> item {
                Text("加载失败，点击重试",
                    modifier = Modifier.clickable { users.retry() })
            }
            else -> {}
        }
    }
}
```

## 六、Navigation Compose

```kotlin
// 参见 navigation.md 详细教程
// 这里补充 Navigation + ViewModel 的作用域管理

@Composable
fun ScopedNavigation() {
    val navController = rememberNavController()

    NavHost(navController, startDestination = "home") {
        // 方式一：不指定 ViewModelStoreOwner
        // ViewModel 与 Activity 绑定
        composable("home") {
            val vm: SharedViewModel = viewModel()  // Activity 作用域
            HomeScreen(vm)
        }

        // 方式二：指定 NavBackStackEntry 为 owner
        // ViewModel 与 NavBackStackEntry 绑定
        composable("detail/{id}") { backStackEntry ->
            val vm: DetailViewModel = viewModel(backStackEntry)  // 页面作用域
            DetailScreen(vm)
        }
    }
}
```

## 七、完整的 Jetpack 项目依赖

```kotlin
// build.gradle.kts —— Jetpack 全家桶
dependencies {
    // Core
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.7.0")

    // Compose
    val composeBom = platform("androidx.compose:compose-bom:2024.02.00")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.activity:activity-compose:1.8.2")
    implementation("androidx.navigation:navigation-compose:2.7.6")

    // Room
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")

    // Hilt
    implementation("com.google.dagger:hilt-android:2.50")
    kapt("com.google.dagger:hilt-compiler:2.50")
    implementation("androidx.hilt:hilt-navigation-compose:1.1.0")

    // DataStore
    implementation("androidx.datastore:datastore-preferences:1.0.0")

    // WorkManager
    implementation("androidx.work:work-runtime-ktx:2.9.0")

    // Paging
    implementation("androidx.paging:paging-runtime-ktx:3.2.1")
    implementation("androidx.paging:paging-compose:3.2.1")

    // Network
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")
    implementation("io.coil-kt:coil-compose:2.5.0")

    // Testing
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}
```
