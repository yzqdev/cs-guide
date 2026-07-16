---
order: 5
---

# 项目架构

## 一、MVVM 架构模式

MVVM（Model-View-ViewModel）是 Android 官方推荐的架构模式：

```text
UI (Composable) ↔ ViewModel ↔ Repository ↔ Data Sources (API/Database)
```

### 架构分层

```text
┌─────────────────────────────────────┐
│  UI 层                              │
│  ├─ Composable Screen               │
│  ├─ State (collectAsState)          │
│  └─ Event (onClick / onValueChange) │
├─────────────────────────────────────┤
│  ViewModel 层                       │
│  ├─ StateFlow / SharedFlow          │
│  ├─ 业务逻辑                        │
│  └─ 生命周期管理                    │
├─────────────────────────────────────┤
│  Repository 层                      │
│  ├─ 数据聚合（API + DB）           │
│  ├─ 缓存策略                       │
│  └─ 数据转换                        │
├─────────────────────────────────────┤
│  Data 层                            │
│  ├─ Remote (Retrofit)               │
│  ├─ Local (Room / DataStore)        │
│  └─ DTO / Entity                    │
└─────────────────────────────────────┘
```

## 二、完整项目结构

```text
com.example.myapp/
├── App.kt                    # 应用入口
├── MainActivity.kt           # Activity
├── di/                       # 依赖注入
│   ├── AppModule.kt          # 全局依赖
│   ├── NetworkModule.kt      # 网络模块
│   └── DatabaseModule.kt     # 数据库模块
├── data/                     # 数据层
│   ├── remote/               # 网络数据源
│   │   ├── api/              # Retrofit 接口
│   │   ├── dto/              # 网络数据传输对象
│   │   └── interceptor/      # OkHttp 拦截器
│   ├── local/                # 本地数据源
│   │   ├── db/               # Room 数据库
│   │   ├── entity/           # 数据库实体
│   │   └── datastore/        # DataStore
│   └── repository/           # 仓库实现
│       ├── UserRepository.kt
│       └── TaskRepository.kt
├── domain/                   # 领域层（可选）
│   ├── model/                # 领域模型
│   ├── usecase/              # 用例
│   └── repository/           # 仓库接口
├── ui/                       # UI 层
│   ├── theme/                # 主题
│   ├── navigation/           # 导航
│   ├── components/           # 公共组件
│   └── screens/              # 页面
│       ├── home/
│       │   ├── HomeScreen.kt
│       │   ├── HomeViewModel.kt
│       │   └── HomeUiState.kt
│       └── detail/
│           ├── DetailScreen.kt
│           ├── DetailViewModel.kt
│           └── DetailUiState.kt
└── util/                     # 工具类
    ├── NetworkResult.kt
    └── Extensions.kt
```

## 三、UI State 设计

```kotlin
// 方式一：sealed class（推荐）
sealed class HomeUiState {
    object Loading : HomeUiState()
    data class Success(val items: List<Item>) : HomeUiState()
    data class Error(val message: String) : HomeUiState()
}

// 方式二：data class + loading/error 状态
data class HomeScreenState(
    val isLoading: Boolean = false,
    val items: List<Item> = emptyList(),
    val error: String? = null,
)

// ViewModel 中使用
class HomeViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<HomeUiState>(HomeUiState.Loading)
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    init { loadData() }

    fun loadData() {
        viewModelScope.launch {
            _uiState.value = HomeUiState.Loading
            try {
                val items = repository.getItems()
                _uiState.value = HomeUiState.Success(items)
            } catch (e: Exception) {
                _uiState.value = HomeUiState.Error(e.message ?: "未知错误")
            }
        }
    }
}

// Compose 中消费
@Composable
fun HomeScreen(viewModel: HomeViewModel = hiltViewModel()) {
    when (val state = viewModel.uiState.collectAsState().value) {
        is HomeUiState.Loading -> LoadingView()
        is HomeUiState.Success -> ContentView(state.items)
        is HomeUiState.Error -> ErrorView(state.message, viewModel::loadData)
    }
}
```

## 四、Repository 模式

```kotlin
// Repository 接口（domain 层）
interface UserRepository {
    fun getUsers(): Flow<NetworkResult<List<User>>>
    suspend fun getUser(id: Long): NetworkResult<User>
    suspend fun refresh()
}

// Repository 实现（data 层）
class UserRepositoryImpl(
    private val api: UserApi,
    private val dao: UserDao,
) : UserRepository {

    override fun getUsers(): Flow<NetworkResult<List<User>>> = flow {
        // 1. 先发缓存
        val cached = dao.getAllUsers().first()
        if (cached.isNotEmpty()) {
            emit(NetworkResult.Success(cached.map { it.toDomain() }))
        }

        // 2. 再发网络
        try {
            val remote = api.getUsers()
            dao.insertUsers(remote.map { it.toEntity() })
            emit(NetworkResult.Success(remote.map { it.toDomain() }))
        } catch (e: Exception) {
            if (cached.isEmpty()) {
                emit(NetworkResult.Error(e.message ?: "加载失败"))
            }
        }
    }

    override suspend fun getUser(id: Long): NetworkResult<User> = safeApiCall {
        api.getUser(id).toDomain()
    }

    override suspend fun refresh() {
        val remote = api.getUsers()
        dao.deleteAll()
        dao.insertUsers(remote.map { it.toEntity() })
    }
}
```

## 五、UseCase 模式

```kotlin
// UseCase —— 单一职责的业务操作
class GetUserUseCase(private val repository: UserRepository) {
    suspend operator fun invoke(id: Long): NetworkResult<User> {
        return repository.getUser(id)
    }
}

class UpdateUserUseCase(private val repository: UserRepository) {
    suspend operator fun invoke(user: User): NetworkResult<User> {
        // 业务校验
        require(user.name.isNotBlank()) { "用户名不能为空" }
        require(user.email.contains("@")) { "邮箱格式不正确" }

        return repository.updateUser(user)
    }
}

// Hilt 中注入 UseCase
@Module
@InstallIn(SingletonComponent::class)
object UseCaseModule {
    @Provides
    fun provideGetUserUseCase(repository: UserRepository): GetUserUseCase {
        return GetUserUseCase(repository)
    }
}
```

## 六、统一错误处理

```kotlin
sealed class NetworkResult<out T> {
    object Loading : NetworkResult<Nothing>()
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error(val message: String, val throwable: Throwable? = null) : NetworkResult<Nothing>()
}

suspend fun <T> safeApiCall(call: suspend () -> T): NetworkResult<T> {
    return try {
        NetworkResult.Success(call())
    } catch (e: HttpException) {
        val message = when (e.code()) {
            401 -> "登录已过期"
            403 -> "没有权限"
            404 -> "资源不存在"
            500 -> "服务器错误"
            else -> e.message()
        }
        NetworkResult.Error(message, e)
    } catch (e: IOException) {
        NetworkResult.Error("网络连接失败", e)
    } catch (e: Exception) {
        NetworkResult.Error(e.message ?: "未知错误", e)
    }
}
```

## 七、单 Activity 架构

```kotlin
// MainActivity.kt —— 单一 Activity
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme {
                AppNavigation()
            }
        }
    }
}

// App.kt —— 导航入口
@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    Scaffold(
        bottomBar = {
            NavigationBar {
                BottomNavItem.entries.forEach { item ->
                    NavigationBarItem(
                        icon = { Icon(item.icon, contentDescription = item.label) },
                        label = { Text(item.label) },
                        selected = currentRoute == item.route,
                        onClick = {
                            navController.navigate(item.route) {
                                popUpTo(navController.graph.startDestinationId) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                    )
                }
            }
        },
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(padding),
        ) {
            composable("home") { HomeScreen() }
            composable("search") { SearchScreen() }
            composable("profile") { ProfileScreen() }
        }
    }
}
```

## 八、状态管理最佳实践

```kotlin
// 1. 单向数据流
// UI → Event → ViewModel → State → UI

// 2. 状态下沉
// 只在必要时提升状态

// 3. 使用 sealed class 管理多种状态
sealed class UiState<out T> {
    object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String) : UiState<Nothing>()
}

// 4. 一次性事件使用 SharedFlow
private val _events = MutableSharedFlow<UiEvent>()
val events: SharedFlow<UiEvent> = _events.asSharedFlow()

// 5. 使用 StateFlow 替代 LiveData
val uiState: StateFlow<UiState<List<User>>> = ...
```

## 九、测试策略

| 层级 | 测试内容 | 工具 |
|------|---------|------|
| UI | Composable 交互 | Compose UI Test |
| ViewModel | 状态变化 | kotlinx-coroutines-test |
| Repository | 数据聚合 | MockK + Turbine |
| DataSource | API/DB 操作 | MockWebServer + Room |

```kotlin
// ViewModel 测试示例
class HomeViewModelTest {
    private val repository = mock<UserRepository>()
    private val viewModel = HomeViewModel(repository)

    @Test
    fun `loadData emits success state`() = runTest {
        val expected = listOf(User(1, "Alice"))
        `when`(repository.getUsers()).thenReturn(flowOf(NetworkResult.Success(expected)))

        viewModel.loadData()

        val state = viewModel.uiState.first()
        assertTrue(state is UiState.Success)
        assertEquals(expected, (state as UiState.Success).data)
    }
}
```
