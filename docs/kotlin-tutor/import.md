# 引入包

Kotlin 的包引入机制与 Java 类似，但更加灵活——不仅可以导入类，还可以导入顶层函数、属性和枚举常量。

## 引入类

```kotlin
import org.example.Message

// 引入包中所有的（包括类和顶层函数）
import org.example.*
```

## 更多导入方式

Kotlin 不仅可以导入类，还可以导入：

- **导入顶层函数和属性**

```kotlin
import org.example.myFunction   // 导入顶层函数
import org.example.myProperty   // 导入顶层属性
```

- **导入 object 中的方法和属性**

```kotlin
import org.example.MyObject.myMethod
import org.example.MyObject.myProperty
```

- **导入 enum 和常量**

```kotlin
import org.example.MyEnum.VALUE1
import org.example.MyConstants.MAX_COUNT
```

- **别名导入（解决命名冲突）**

```kotlin
import org.example.Message as Msg1
import org.other.Message as Msg2
```

## 导入对比（Java vs Kotlin）

| 特性 | Java | Kotlin |
|------|------|--------|
| 导入类 | ✅ | ✅ |
| 导入静态方法 | ✅ `import static` | ✅ 直接导入 |
| 导入顶层函数 | ❌ | ✅ |
| 导入扩展函数 | ❌ | ✅ |
| 别名 | ❌ | ✅ `as` |
| `import *` | ❌（IDE 建议展开） | ✅ |
