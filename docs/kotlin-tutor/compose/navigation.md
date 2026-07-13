# Compose 导航

## 一、添加依赖

```kotlin
// build.gradle.kts
dependencies {
    implementation("androidx.navigation:navigation-compose:2.7.6")
}
```

## 二、定义路由

```kotlin
// 定义导航路由
sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Detail : Screen("detail/{itemId}") {
        fun createRoute(itemId: Int) = "detail/$itemId"
    }
    object Profile : Screen("profile/{userId}") {
        fun createRoute(userId: String) = "profile/$userId"
    }
}
```

## 三、NavHost

```kotlin
@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Screen.Home.route,
    ) {
        composable(Screen.Home.route) {
            HomeScreen(
                onNavigateToDetail = { itemId ->
                    navController.navigate(Screen.Detail.createRoute(itemId))
                },
            )
        }

        composable(
            route = Screen.Detail.route,
            arguments = listOf(navArgument("itemId") { type = NavType.IntType }),
        ) { backStackEntry ->
            val itemId = backStackEntry.arguments?.getInt("itemId") ?: 0
            DetailScreen(
                itemId = itemId,
                onBack = { navController.popBackStack() },
            )
        }

        composable(
            route = Screen.Profile.route,
            arguments = listOf(navArgument("userId") { type = NavType.StringType }),
        ) { backStackEntry ->
            val userId = backStackEntry.arguments?.getString("userId") ?: ""
            ProfileScreen(userId = userId)
        }
    }
}
```

## 四、页面间导航

```kotlin
// 首页
@Composable
fun HomeScreen(onNavigateToDetail: (Int) -> Unit) {
    val items = listOf(1, 2, 3, 4, 5)

    LazyColumn {
        items(items) { id ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp)
                    .clickable { onNavigateToDetail(id) },
            ) {
                Text(
                    text = "Item $id",
                    modifier = Modifier.padding(16.dp),
                )
            }
        }
    }
}

// 详情页
@Composable
fun DetailScreen(itemId: Int, onBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("详情 $itemId") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "返回")
                    }
                },
            )
        },
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text("Item ID: $itemId", fontSize = 24.sp)
        }
    }
}
```

## 五、传递复杂数据

```kotlin
// 方式一：使用 JSON 序列化（推荐 Kotlinx Serialization）
// 添加依赖：implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.2")

data class User(val id: Int, val name: String, val email: String)

// 导航时序列化
composable("user/{userJson}") { backStackEntry ->
    val userJson = backStackEntry.arguments?.getString("userJson") ?: return@composable
    val user = Json.decodeFromString<User>(userJson)
    UserProfileScreen(user = user)
}

// 发起导航
navController.navigate("user/${Uri.encode(Json.encodeToString(user))}")
```

## 六、底部导航

```kotlin
data class BottomNavItem(
    val label: String,
    val icon: ImageVector,
    val route: String,
)

val bottomNavItems = listOf(
    BottomNavItem("首页", Icons.Default.Home, Screen.Home.route),
    BottomNavItem("搜索", Icons.Default.Search, "search"),
    BottomNavItem("消息", Icons.Default.Notifications, "notifications"),
    BottomNavItem("我的", Icons.Default.Person, Screen.Profile.createRoute("me")),
)

@Composable
fun MainScreen() {
    val navController = rememberNavController()

    Scaffold(
        bottomBar = {
            NavigationBar {
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                bottomNavItems.forEach { item ->
                    NavigationBarItem(
                        icon = { Icon(item.icon, contentDescription = item.label) },
                        label = { Text(item.label) },
                        selected = currentRoute == item.route,
                        onClick = {
                            navController.navigate(item.route) {
                                popUpTo(navController.graph.startDestinationId) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                    )
                }
            }
        },
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(paddingValues),
        ) {
            composable(Screen.Home.route) { HomeScreen { } }
            composable("search") { SearchScreen() }
            composable("notifications") { NotificationsScreen() }
            composable(Screen.Profile.createRoute("me")) { ProfileScreen("me") }
        }
    }
}
```

## 七、深层链接

```kotlin
// AndroidManifest.xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:scheme="myapp"
        android:host="detail" />
</intent-filter>
```

```kotlin
// NavHost 中配置
NavHost(
    navController = navController,
    startDestination = Screen.Home.route,
) {
    composable(
        route = "detail/{itemId}",
        arguments = listOf(navArgument("itemId") { type = NavType.IntType }),
        deepLinks = listOf(navDeepLink { uriPattern = "myapp://detail/{itemId}" }),
    ) {
        // ...
    }
}
```

## 八、导航动画

```kotlin
// 使用 AnimatedNavHost
AnimatedNavHost(
    navController = navController,
    startDestination = Screen.Home.route,
) {
    composable(
        Screen.Home.route,
        enterTransition = { fadeIn() },
        exitTransition = { fadeOut() },
    ) { HomeScreen { } }

    composable(
        Screen.Detail.route,
        enterTransition = { slideInHorizontally { it } },
        exitTransition = { slideOutHorizontally { -it } },
    ) { DetailScreen(0) { } }
}
```
