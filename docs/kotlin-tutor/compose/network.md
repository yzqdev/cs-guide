# 网络请求与图片加载

## 一、Retrofit + OkHttp

### 添加依赖

```kotlin
// build.gradle.kts
dependencies {
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")
    implementation("com.google.code.gson:gson:2.10.1")
}
```

### 定义 API 接口

```kotlin
import retrofit2.http.*

data class UserResponse(
    val id: Long,
    val name: String,
    val email: String,
    val avatar: String,
    val createdAt: String,
)

data class CreateUserRequest(
    val name: String,
    val email: String,
)

interface UserApi {
    @GET("users")
    suspend fun getUsers(
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20,
    ): List<UserResponse>

    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: Long): UserResponse

    @POST("users")
    suspend fun createUser(@Body request: CreateUserRequest): UserResponse

    @PUT("users/{id}")
    suspend fun updateUser(@Path("id") id: Long, @Body request: CreateUserRequest): UserResponse

    @DELETE("users/{id}")
    suspend fun deleteUser(@Path("id") id: Long)
}
```

### 创建 Retrofit 实例

```kotlin
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object RetrofitClient {
    private const val BASE_URL = "https://api.example.com/"

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = if (BuildConfig.DEBUG) {
            HttpLoggingInterceptor.Level.BODY
        } else {
            HttpLoggingInterceptor.Level.NONE
        }
    }

    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .addInterceptor { chain ->
            // 添加公共请求头
            val request = chain.request().newBuilder()
                .addHeader("Authorization", "Bearer ${getToken()}")
                .addHeader("Accept", "application/json")
                .build()
            chain.proceed(request)
        }
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()

    val instance: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    inline fun <reified T> create(): T = instance.create(T::class.java)
}
```

### 在使用处注入

```kotlin
// 简单工厂（非 Hilt）
class UserRepository {
    private val api = RetrofitClient.create<UserApi>()

    suspend fun getUsers(): List<UserResponse> = api.getUsers()
    suspend fun getUser(id: Long): UserResponse = api.getUser(id)
}

// Hilt 注入（推荐）
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides @Singleton
    fun provideUserApi(): UserApi = RetrofitClient.create()
}
```

## 二、封装网络状态

```kotlin
// 统一网络响应封装
sealed class NetworkResult<out T> {
    object Loading : NetworkResult<Nothing>()
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error(val message: String, val code: Int = -1) : NetworkResult<Nothing>()
}

// 安全调用封装
suspend fun <T> safeApiCall(call: suspend () -> T): NetworkResult<T> {
    return try {
        NetworkResult.Success(call())
    } catch (e: HttpException) {
        NetworkResult.Error(e.message(), e.code())
    } catch (e: IOException) {
        NetworkResult.Error("网络连接失败，请检查网络")
    } catch (e: Exception) {
        NetworkResult.Error(e.message ?: "未知错误")
    }
}

// 使用
class SafeUserRepository(private val api: UserApi) {
    suspend fun getUsers(): NetworkResult<List<UserResponse>> = safeApiCall {
        api.getUsers()
    }

    suspend fun getUser(id: Long): NetworkResult<UserResponse> = safeApiCall {
        api.getUser(id)
    }
}

// ViewModel 中使用
@HiltViewModel
class SafeUserViewModel @Inject constructor(
    private val repository: SafeUserRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<NetworkResult<List<UserResponse>>>(NetworkResult.Loading)
    val uiState: StateFlow<NetworkResult<List<UserResponse>>> = _uiState.asStateFlow()

    init { loadUsers() }

    fun loadUsers() {
        viewModelScope.launch {
            _uiState.value = NetworkResult.Loading
            _uiState.value = repository.getUsers()
        }
    }
}

@Composable
fun SafeUserScreen(viewModel: SafeUserViewModel = hiltViewModel()) {
    val state by viewModel.uiState.collectAsState()

    when (val s = state) {
        is NetworkResult.Loading -> Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
        is NetworkResult.Success -> LazyColumn {
            items(s.data) { user -> Text(user.name, modifier = Modifier.padding(16.dp)) }
        }
        is NetworkResult.Error -> Column(
            Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text("错误：${s.message}", color = Color.Red)
            Spacer(Modifier.height(16.dp))
            Button(onClick = viewModel::loadUsers) { Text("重试") }
        }
    }
}
```

## 三、Coil 图片加载

### 添加依赖

```kotlin
// build.gradle.kts
implementation("io.coil-kt:coil-compose:2.5.0")
```

### 基本用法

```kotlin
import coil.compose.AsyncImage
import coil.request.ImageRequest

@Composable
fun BasicImage() {
    // 最简单用法
    AsyncImage(
        model = "https://example.com/image.jpg",
        contentDescription = "图片描述",
    )

    // 带占位图和错误图
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data("https://example.com/image.jpg")
            .crossfade(true)               // 淡入效果
            .placeholder(R.drawable.placeholder)  // 占位图
            .error(R.drawable.error)              // 错误图
            .size(500, 500)                       // 缩放尺寸
            .build(),
        contentDescription = "带配置的图片",
        modifier = Modifier
            .size(200.dp)
            .clip(CircleShape)              // 圆形裁剪
            .background(Color.Gray),
        contentScale = ContentScale.Crop,
    )
}
```

### 自定义 ImageLoader

```kotlin
import coil.ImageLoader
import coil.decode.SvgDecoder
import coil.memory.MemoryCache

@Composable
fun rememberImageLoader(): ImageLoader {
    val context = LocalContext.current
    return remember {
        ImageLoader.Builder(context)
            .memoryCachePolicy(CachePolicy.ENABLED)
            .memoryCache {
                MemoryCache.Builder(context)
                    .maxSizePercent(0.25)  // 最多使用 25% 内存
                    .build()
            }
            .crossfade(true)
            .okHttpClient {
                OkHttpClient.Builder()
                    .addInterceptor(HttpLoggingInterceptor().apply {
                        level = HttpLoggingInterceptor.Level.HEADERS
                    })
                    .build()
            }
            .components {
                add(SvgDecoder(context))  // 支持 SVG
            }
            .build()
    }
}

@Composable
fun CustomImageLoaderDemo() {
    val imageLoader = rememberImageLoader()

    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data("https://example.com/image.svg")
            .build(),
        imageLoader = imageLoader,
        contentDescription = "SVG 图片",
    )
}
```

### 列表中的图片

```kotlin
@Composable
fun ImageList(items: List<Item>) {
    LazyColumn {
        items(items, key = { it.id }) { item ->
            AsyncImage(
                model = item.imageUrl,
                contentDescription = item.title,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp),
                contentScale = ContentScale.Crop,
            )
        }
    }
}
```

## 四、完整示例：用户列表加载

```kotlin
// 数据层
data class UserDto(
    val id: Long,
    val name: String,
    val email: String,
    val avatar: String,
)

interface ApiService {
    @GET("users")
    suspend fun getUsers(): List<UserDto>
}

// ViewModel
@HiltViewModel
class UserListViewModel @Inject constructor(
    private val api: ApiService,
) : ViewModel() {

    private val _users = MutableStateFlow<List<UserDto>>(emptyList())
    val users: StateFlow<List<UserDto>> = _users.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    init { loadUsers() }

    fun loadUsers() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                _users.value = api.getUsers()
            } catch (e: Exception) {
                _error.value = e.message ?: "加载失败"
            } finally {
                _isLoading.value = false
            }
        }
    }
}

// Compose UI
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UserListScreen(viewModel: UserListViewModel = hiltViewModel()) {
    val users by viewModel.users.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState()

    Scaffold(
        topBar = { TopAppBar(title = { Text("用户列表") }) },
    ) { padding ->
        Box(Modifier.fillMaxSize().padding(padding)) {
            when {
                isLoading -> CircularProgressIndicator(Modifier.align(Alignment.Center))
                error != null -> Column(Modifier.align(Alignment.Center)) {
                    Text("错误：$error", color = Color.Red)
                    Spacer(Modifier.height(16.dp))
                    Button(onClick = viewModel::loadUsers) { Text("重试") }
                }
                else -> LazyColumn {
                    items(users, key = { it.id }) { user ->
                        ListItem(
                            leadingContent = {
                                AsyncImage(
                                    model = user.avatar,
                                    contentDescription = null,
                                    modifier = Modifier
                                        .size(48.dp)
                                        .clip(CircleShape),
                                    contentScale = ContentScale.Crop,
                                )
                            },
                            headlineContent = { Text(user.name) },
                            supportingContent = { Text(user.email) },
                        )
                    }
                }
            }
        }
    }
}
```
