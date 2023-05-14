# java到kotlin的用法

## 接口使用

java

```java
button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        button.setOnClickListener((v) -> {
            
        });
```

kotlin

```kotlin

 

button.setOnClickListener(object : View.OnClickListener{
    override fun onClick(v: View?) {

    }
})
     button.setOnClickListener {

     }

```

## array

```kotlin
val list = ArrayList<String>() // 非空（构造函数结果）
list.add("Item")
val size = list.size // 非空（原生 int）
val item = list[0] // 推断为平台类型（普通 Java 对象）
```
