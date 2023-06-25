# 类

## Kotlin 扩展

```kotlin
open class Shape

class Rectangle: Shape()

fun Shape.getName() = "Shape"

fun Rectangle.getName() = "Rectangle"

fun printClassName(s: Shape) {
    println(s.getName())
}    

printClassName(Rectangle())
fun main(arg:Array<String>){
    var rect=Rectangle()
    rect.getName()
}
```

像compose中的`18.dp`就是拓展

```kotlin
val Float.dp
  get() = TypedValue.applyDimension(
    TypedValue.COMPLEX_UNIT_DIP,
    this,
    Resources.getSystem().displayMetrics
  )

...

val RADIUS = 200f.dp
```
