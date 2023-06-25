# 类关键字

## sealed

可阻止其他类继承自该类,类似java 的final关键字

如下面,类 `B` 继承自类 `A`，但没有类可以继承自类 `B`

```csharp
class A {} sealed class B : A {}
```

## virtual

`virtual` 关键字用于修改方法、属性、索引器或事件声明，并使它们可以在派生类中被重写
只有声明了方法为virtual,该方法才能被继承