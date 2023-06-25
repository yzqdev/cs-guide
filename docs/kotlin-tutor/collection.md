# 集合

<https://kotlinlang.org/docs/collections-overview.html>

## ranges

```kotlin
 for (i in 1..4) print(i)//1234
//倒序
for (i in 4 downTo 1) print(i) //4321
//step 
for (i in 1..8 step 2) print(i)//1357
//不包括10
for (i in 1 until 10) {       // i in 1 until 10, excluding 10
    print(i)
}
```

## group

```kotlin
val numbers = listOf("one", "two", "three", "four", "five")

println(numbers.groupBy { it.first().uppercase() })
println(numbers.groupBy(keySelector = { it.first() }, valueTransform = { it.uppercase() }))
```
