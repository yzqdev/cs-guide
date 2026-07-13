# Compose 主题与样式

## 一、Material 3 主题

```kotlin
// 自定义主题
private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF1976D2),
    onPrimary = Color.White,
    primaryContainer = Color(0xFFBBDEFB),
    secondary = Color(0xFF26A69A),
    onSecondary = Color.White,
    background = Color(0xFFF5F5F5),
    surface = Color.White,
    error = Color(0xFFD32F2F),
)

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF90CAF9),
    onPrimary = Color(0xFF0D47A1),
    primaryContainer = Color(0xFF1565C0),
    secondary = Color(0xFF80CBC4),
    background = Color(0xFF121212),
    surface = Color(0xFF1E1E1E),
    error = Color(0xFFEF9A9A),
)

@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = AppTypography,
        shapes = AppShapes,
        content = content,
    )
}
```

## 二、字体

```kotlin
// 定义字体
val AppTypography = Typography(
    displayLarge = TextStyle(
        fontWeight = FontWeight.Bold,
        fontSize = 57.sp,
        lineHeight = 64.sp,
    ),
    headlineLarge = TextStyle(
        fontWeight = FontWeight.Bold,
        fontSize = 32.sp,
        lineHeight = 40.sp,
    ),
    titleLarge = TextStyle(
        fontWeight = FontWeight.SemiBold,
        fontSize = 22.sp,
        lineHeight = 28.sp,
    ),
    titleMedium = TextStyle(
        fontWeight = FontWeight.Medium,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.15.sp,
    ),
    bodyLarge = TextStyle(
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
    ),
    bodyMedium = TextStyle(
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
    ),
    labelLarge = TextStyle(
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
    ),
)
```

## 三、形状

```kotlin
// 定义形状
val AppShapes = Shapes(
    extraSmall = RoundedCornerShape(4.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(24.dp),
)
```

## 四、使用主题

```kotlin
@Composable
fun UsageExample() {
    // 使用主题中的颜色
    val color = MaterialTheme.colorScheme.primary
    val bgColor = MaterialTheme.colorScheme.background
    val surfaceColor = MaterialTheme.colorScheme.surface

    // 使用主题中的字体样式
    Text(
        text = "标题",
        style = MaterialTheme.typography.headlineLarge,
    )

    // 使用主题中的形状
    Surface(
        shape = MaterialTheme.shapes.medium,
        color = MaterialTheme.colorScheme.primaryContainer,
    ) {
        Text("卡片", modifier = Modifier.padding(16.dp))
    }

    // 使用主题中的间距
    Spacer(Modifier.height(MaterialTheme.spacing.medium))
}

// 自定义间距
data class AppSpacing(
    val extraSmall: Dp = 4.dp,
    val small: Dp = 8.dp,
    val medium: Dp = 16.dp,
    val large: Dp = 24.dp,
    val extraLarge: Dp = 32.dp,
)

val LocalSpacing = staticCompositionLocalOf { AppSpacing() }

val MaterialTheme.spacing: AppSpacing
    get() = LocalSpacing.current
```

## 五、动态颜色（Android 12+）

```kotlin
@Composable
fun DynamicTheme(content: @Composable () -> Unit) {
    val context = LocalContext.current
    val colorScheme = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        val dynamicColor = dynamicLightColorScheme(context)
        if (isSystemInDarkTheme()) dynamicDarkColorScheme(context)
        else dynamicColor
    } else {
        LightColorScheme  // 备用方案
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = AppTypography,
        shapes = AppShapes,
        content = content,
    )
}
```

## 六、Modifier 常用样式

```kotlin
@Composable
fun StylesExample() {
    Column(modifier = Modifier.padding(16.dp)) {
        // 阴影
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shadowElevation = 8.dp,
            shape = RoundedCornerShape(12.dp),
        ) {
            Text("带阴影的卡片", modifier = Modifier.padding(16.dp))
        }

        Spacer(Modifier.height(16.dp))

        // 渐变背景
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp)
                .background(
                    brush = Brush.horizontalGradient(
                        colors = listOf(Color(0xFF667eea), Color(0xFF764ba2)),
                    ),
                    shape = RoundedCornerShape(12.dp),
                ),
            contentAlignment = Alignment.Center,
        ) {
            Text("渐变背景", color = Color.White)
        }

        Spacer(Modifier.height(16.dp))

        // 圆角 + 边框
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(8.dp),
            border = BorderStroke(1.dp, Color.Gray),
        ) {
            Text("带边框的卡片", modifier = Modifier.padding(16.dp))
        }
    }
}
```

## 七、深色模式适配

```kotlin
@Composable
fun DarkModeAwareExample() {
    val isDarkTheme = isSystemInDarkTheme()

    // 根据主题选择颜色
    val customColor = if (isDarkTheme) {
        Color(0xFFBB86FC)  // 深色模式颜色
    } else {
        Color(0xFF6200EE)  // 浅色模式颜色
    }

    // 使用主题颜色（自动适配）
    Surface(
        color = MaterialTheme.colorScheme.surface,
        contentColor = MaterialTheme.colorScheme.onSurface,
    ) {
        Text("自动适配深色模式")
    }

    // 手动设置深色模式
    var useDarkTheme by remember { mutableStateOf(false) }

    AppTheme(darkTheme = useDarkTheme) {
        // 内容
    }
}
```

## 八、主题切换完整示例

```kotlin
@Composable
fun ThemeSwitcher() {
    var isDarkTheme by remember { mutableStateOf(false) }

    AppTheme(darkTheme = isDarkTheme) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("主题切换") },
                    actions = {
                        IconButton(onClick = { isDarkTheme = !isDarkTheme }) {
                            Icon(
                                if (isDarkTheme) Icons.Default.LightMode
                                else Icons.Default.DarkMode,
                                contentDescription = "切换主题",
                            )
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
                Text(
                    text = if (isDarkTheme) "深色模式" else "浅色模式",
                    style = MaterialTheme.typography.headlineLarge,
                )
                Spacer(Modifier.height(16.dp))
                Button(
                    onClick = { isDarkTheme = !isDarkTheme },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.primary,
                    ),
                ) {
                    Text("切换主题")
                }
            }
        }
    }
}
```
