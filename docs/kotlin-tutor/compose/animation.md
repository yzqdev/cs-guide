# Compose 动画

## 一、简单值动画

### 1. animateFloatAsState

```kotlin
@Composable
fun FadeInDemo() {
    var visible by remember { mutableStateOf(false) }
    val alpha by animateFloatAsState(
        targetValue = if (visible) 1f else 0f,
        animationSpec = tween(
            durationMillis = 500,
            easing = FastOutSlowInEasing,
        ),
        label = "alpha",
    )

    Column(Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
        Button(onClick = { visible = !visible }) {
            Text(if (visible) "隐藏" else "显示")
        }
        Box(
            modifier = Modifier
                .size(100.dp)
                .graphicsLayer(alpha = alpha)
                .background(Color.Blue),
        )
    }
}
```

### 2. animateColorAsState

```kotlin
@Composable
fun ColorAnimationDemo() {
    var isRed by remember { mutableStateOf(true) }
    val color by animateColorAsState(
        targetValue = if (isRed) Color.Red else Color.Blue,
        animationSpec = tween(1000),
        label = "color",
    )

    Column(Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
        Button(onClick = { isRed = !isRed }) { Text("切换颜色") }
        Box(
            modifier = Modifier
                .size(100.dp)
                .background(color, shape = CircleShape),
        )
    }
}
```

### 3. animateDpAsState

```kotlin
@Composable
fun SizeAnimationDemo() {
    var expanded by remember { mutableStateOf(false) }
    val size by animateDpAsState(
        targetValue = if (expanded) 200.dp else 100.dp,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow,
        ),
        label = "size",
    )

    Box(
        modifier = Modifier
            .size(size)
            .background(Color.Green)
            .clickable { expanded = !expanded },
    )
}
```

## 二、AnimatedVisibility

### 1. 基本用法

```kotlin
@Composable
fun VisibilityDemo() {
    var visible by remember { mutableStateOf(true) }

    Column(Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
        Button(onClick = { visible = !visible }) {
            Text(if (visible) "隐藏" else "显示")
        }

        AnimatedVisibility(
            visible = visible,
            enter = fadeIn() + slideInVertically(),
            exit = fadeOut() + slideOutVertically(),
        ) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.Yellow),
            ) {
                Text("动画内容", modifier = Modifier.padding(24.dp))
            }
        }
    }
}
```

### 2. 入场/出场动画

```kotlin
@Composable
fun EnterExitAnimation() {
    var visible by remember { mutableStateOf(true) }

    AnimatedVisibility(
        visible = visible,
        enter = slideInHorizontally { it } + fadeIn() + scaleIn(),
        exit = slideOutHorizontally { -it } + fadeOut() + scaleOut(),
    ) {
        Text("多种动画组合", fontSize = 24.sp)
    }
}
```

### 3. expand/shrink

```kotlin
@Composable
fun ExpandShrinkDemo() {
    var expanded by remember { mutableStateOf(false) }

    Column {
        Button(onClick = { expanded = !expanded }) {
            Text(if (expanded) "收起" else "展开")
        }

        AnimatedVisibility(
            visible = expanded,
            enter = expandVertically(expandFrom = Alignment.Top) + fadeIn(),
            exit = shrinkVertically(shrinkTowards = Alignment.Top) + fadeOut(),
        ) {
            Column(Modifier.background(Color.LightGray)) {
                Text("展开的内容", modifier = Modifier.padding(16.dp))
                Text("更多内容", modifier = Modifier.padding(16.dp))
            }
        }
    }
}
```

## 三、AnimatedContent

```kotlin
@Composable
fun AnimatedContentDemo() {
    var count by remember { mutableIntStateOf(0) }

    Column(Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
        Button(onClick = { count++ }) { Text("增加") }

        AnimatedContent(
            targetState = count,
            transitionSpec = {
                if (targetState > initialState) {
                    slideInHorizontally { it } + fadeIn() togetherWith
                    slideOutHorizontally { -it } + fadeOut()
                } else {
                    slideInHorizontally { -it } + fadeIn() togetherWith
                    slideOutHorizontally { it } + fadeOut()
                }
            },
            label = "counter",
        ) { targetCount ->
            Text("$targetCount", fontSize = 48.sp, fontWeight = FontWeight.Bold)
        }
    }
}
```

## 四、Animatable

```kotlin
@Composable
fun AnimatableDemo() {
    val animatedValue = remember { Animatable(0f) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .clickable {
                runBlocking {
                    animatedValue.animateTo(
                        targetValue = if (animatedValue.value == 0f) 1f else 0f,
                        animationSpec = tween(1000),
                    )
                }
            },
        contentAlignment = Alignment.Center,
    ) {
        Box(
            modifier = Modifier
                .size(100.dp)
                .graphicsLayer {
                    scaleX = animatedValue.value
                    scaleY = animatedValue.value
                    rotationZ = animatedValue.value * 360
                }
                .background(Color.Magenta, CircleShape),
        )
    }
}
```

## 五、InfiniteTransition

```kotlin
@Composable
fun InfiniteAnimationDemo() {
    val infiniteTransition = rememberInfiniteTransition(label = "infinite")

    val alpha by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000),
            repeatMode = RepeatMode.Reverse,
        ),
        label = "alpha",
    )

    val rotation by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(2000, easing = LinearEasing),
        ),
        label = "rotation",
    )

    Box(
        modifier = Modifier
            .size(100.dp)
            .graphicsLayer {
                this.alpha = alpha
                rotationZ = rotation
            }
            .background(Color.Cyan, RoundedCornerShape(16.dp)),
    )
}
```

## 六、关键帧动画

```kotlin
@Composable
fun KeyframeDemo() {
    val animatable = remember { Animatable(0f) }

    LaunchedEffect(Unit) {
        animatable.animateTo(
            targetValue = 1f,
            animationSpec = keyframes {
                durationMillis = 2000
                0.0f at 0
                0.5f at 500 with LinearEasing
                1.0f at 1000
                0.8f at 1500
                1.0f at 2000
            },
        )
    }

    Box(
        modifier = Modifier
            .graphicsLayer {
                translationX = animatable.value * 300.dp.toPx()
            }
            .size(50.dp)
            .background(Color.Red),
    )
}
```

## 七、更新动画（updateTransition）

```kotlin
enum class BoxState { Small, Medium, Large }

@Composable
fun UpdateTransitionDemo() {
    var currentState by remember { mutableStateOf(BoxState.Small) }
    val transition = updateTransition(currentState, label = "box")

    val size by transition.animateDp(label = "size") { state ->
        when (state) {
            BoxState.Small -> 50.dp
            BoxState.Medium -> 100.dp
            BoxState.Large -> 150.dp
        }
    }

    val color by transition.animateColor(label = "color") { state ->
        when (state) {
            BoxState.Small -> Color.Red
            BoxState.Medium -> Color.Green
            BoxState.Large -> Color.Blue
        }
    }

    Column(Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { currentState = BoxState.Small }) { Text("小") }
            Button(onClick = { currentState = BoxState.Medium }) { Text("中") }
            Button(onClick = { currentState = BoxState.Large }) { Text("大") }
        }
        Box(
            modifier = Modifier
                .size(size)
                .background(color, RoundedCornerShape(16.dp)),
        )
    }
}
```

## 八、手势动画

```kotlin
@Composable
fun SwipeToDismissDemo() {
    var offsetX by remember { mutableFloatStateOf(0f) }

    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.roundToInt(), 0) }
            .size(300.dp, 100.dp)
            .background(Color.LightGray)
            .pointerInput(Unit) {
                detectHorizontalDragGestures(
                    onDragEnd = {
                        // 回弹动画
                        animate(offsetX to 0f) { value, _ -> offsetX = value }
                    },
                ) { change, dragAmount ->
                    change.consume()
                    offsetX += dragAmount
                }
            },
        contentAlignment = Alignment.Center,
    ) {
        Text("拖动我")
    }
}
```

## 九、动画规格速查

```kotlin
// 时长曲线
tween(durationMillis = 500, easing = FastOutSlowInEasing)

// 弹簧效果
spring(dampingRatio = Spring.DampingRatioMediumBouncy, stiffness = Spring.StiffnessLow)

// 重复
infiniteRepeatable(animation = tween(1000), repeatMode = RepeatMode.Reverse)

// 关键帧
keyframes { durationMillis = 2000; 0.0f at 0; 1.0f at 1000 }

// 线性
LinearEasing

// 缓动函数
FastOutSlowInEasing   // 快速开始，慢速结束（默认）
FastOutLinearInEasing // 快速开始，线性结束
LinearOutSlowInEasing // 线性开始，慢速结束
```
