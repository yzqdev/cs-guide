# 代码片段

## contentAlpha

The "Emphasis and content alpha" section in the Migrate from Material 2 to Material 3 in Compose details the API changes.

material2

```kotlin

import androidx.compose.material.ContentAlpha
import androidx.compose.material.LocalContentAlpha

// High emphasis
CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.high) {
    Icon(…)
}
// Medium emphasis
CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.medium) {
    Icon(…)
}
// Disabled emphasis
CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.disabled) {
    Icon(…)
}
```

material3

```kotlin
import androidx.compose.material3.LocalContentColor

// High emphasis
CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onSurface) {
    Icon(…)
}
// Medium emphasis
CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onSurfaceVariant) {
    Icon(…)
}
// Disabled emphasis
CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onSurface.copy(alpha = 0.38f)) {
    Icon(…)
}
```
