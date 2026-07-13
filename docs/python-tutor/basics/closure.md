---
order: 2
---
# 闭包

闭包是 Python 中一个重要的概念，本文通过解决一个具体需求来了解闭包。

需求如下：需要一直记录学习时间，以分钟为单位。例如学习了 2 分钟，返回 2；隔了一段时间后又学习了 10 分钟，返回 12，以此类推，将学习时间不断累加。

面对这个需求，通常会创建一个全局变量来记录时间，然后用一个方法来累加每次的学习时间，通常写成以下形式：

```python
time = 0

def insert_time(min):
    time = time + min
    return  time

print(insert_time(2))
print(insert_time(10))
```

认真想一下，这段代码是否存在问题？

其实，在 Python 中这段代码会报错。错误如下：

```
UnboundLocalError: local variable 'time' referenced before assignment
```

这是因为，在 Python 中，如果一个函数使用了和全局变量相同的名字且改变了该变量的值，那么该变量就会变成局部变量，这样就会造成在函数中没有进行定义就引用，从而引发错误。

如果确实要引用全局变量并在函数中对它进行修改，可以使用 `global` 关键字，具体修改如下：

```python
time = 0


def insert_time(min):
    global  time
    time = time + min
    return  time

print(insert_time(2))
print(insert_time(10))
```

输出结果如下：

```
2
12
```

但是，这里使用了全局变量，在开发中应尽量避免使用全局变量。因为不同模块、不同函数都可以自由访问全局变量，这可能会导致全局变量的不可预知性。例如程序员甲修改了全局变量 `time` 的值，然后程序员乙同时也对 `time` 进行了修改，如果其中有错误，这种错误很难发现和更正。

全局变量降低了函数或模块之间的通用性，不同的函数或模块都要依赖于全局变量。同样，全局变量降低了代码的可读性，阅读者可能并不知道调用的某个变量是全局变量。

那有没有更好的方法呢？这时候可以使用闭包来解决，先直接看代码：

```python
time = 0


def study_time(time):
    def insert_time(min):
        nonlocal  time
        time = time + min
        return time

    return insert_time


f = study_time(time)
print(f(2))
print(time)
print(f(10))
print(time)
```

输出结果如下:

```
2
0
12
0
```

这里最直接的表现就是全局变量 `time` 始终没有修改过，这里使用了 `nonlocal` 关键字，表示在函数或其他作用域中使用外层（非全局）变量。上面那段代码具体的运行流程如下图所示：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-python%20%E9%97%AD%E5%8C%85%E8%A7%A3%E5%86%B3.png)

这种内部函数的局部作用域中可以访问外部函数局部作用域中变量的行为，称为**闭包**。更直接地表达，当某个函数被当成对象返回时，夹带了外部变量，就形成了一个闭包。

闭包避免了使用全局变量，此外，闭包允许将函数与其所操作的某些数据（环境）关连起来。而且使用闭包，可以使代码变得更加优雅。下一篇将要介绍的装饰器，也是基于闭包实现的。

那么如何验证一个函数是否是闭包呢？

有的，所有函数都有一个 `__closure__` 属性，如果函数是闭包的话，那么它返回的是一个由 cell 组成的元组对象。cell 对象的 cell_contents 属性就是存储在闭包中的变量。

可以通过以下代码来验证：

```python
time = 0


def study_time(time):
    def insert_time(min):
        nonlocal  time
        time = time + min
        return time

    return insert_time


f = study_time(time)
print(f.__closure__)
print(f(2))
print(time)
print(f.__closure__[0].cell_contents)
print(f(10))
print(time)
print(f.__closure__[0].cell_contents)
```

打印的结果为：

```
(<cell at 0x0000000000410C48: int object at 0x000000001D6AB420>,)
2
0
2
12
0
12
```

从打印结果可见，传进来的值一直存储在闭包的 cell_contents 中。因此，这就是闭包的最大特点：可以将父函数的变量与其内部定义的函数绑定。就算生成闭包的父函数已经释放，闭包仍然存在。

闭包的过程其实好比类（父函数）生成实例（闭包），不同的是父函数只在调用时执行，执行完毕后其环境就会释放，而类则在文件执行时创建，一般程序执行完毕后作用域才释放，因此对一些需要重用的功能且不足以定义为类的行为，使用闭包会比使用类占用更少的资源，且更轻巧灵活。
