---
order: 4
---
# 面向对象

# 目录  

# 一、面向对象的概念  

## 1、面向对象的两个基本概念  

编程语言中，一般有两种编程思维：面向过程和面向对象。

面向过程，看重的是解决问题的过程。这好比解决日常生活问题，分析解决问题的步骤，然后一步一步地解决。

而面向对象是一种抽象，抽象是指用分类的眼光去看世界的一种方法。

Python 就是一门面向对象的语言。如果学过 Java，就知道 Java 的编程思想是：万事万物皆对象。Python 也不例外，在解决实际问题的过程中，可以把构成问题事务分解成各个对象。

面向对象有两个基本的概念，分别是类和对象。

* **类**

用来描述具有相同的属性和方法的对象的集合。它定义了该集合中每个对象所共有的属性和方法。对象是类的实例。

* **对象**

通过类定义的数据结构实例

## 2、面向对象的三大特性  

面向对象的编程语言，也有三大特性，继承，多态和封装性。

* **继承**

即一个派生类（derived class）继承基类（base class）的字段和方法。继承也允许把一个派生类的对象作为一个基类对象对待。

例如：一个 Dog 类型的对象派生自 Animal 类，这是模拟"是一个（is-a）"关系（例图，Dog 是一个 Animal ）。

* **多态**

它是指对不同类型的变量进行相同的操作，它会根据对象（或类）类型的不同而表现出不同的行为。

* **封装性**

“封装”就是将抽象得到的数据和行为（或功能）相结合，形成一个有机的整体（即类）；封装的目的是增强安全性和简化编程，使用者不必了解具体的实现细节，而只是要通过外部接口，一特定的访问权限来使用类的成员。

如果你是初次接触面向对象的编程语言，看到这里还不理解，这是正常的。下面会通过大量例子逐步了解 Python 的面向对象知识。

# 二、类的定义和调用 

## 1、怎么理解类？

理解类最简单的方式是：类是一个变量和函数的集合。

可以看下下面的这张图。

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2020-03-09-014706.jpg)

这张图很好地诠释了类，就是把变量和函数包装在一起。当然包装也不是毫无目的地包装，会把同性质的包装在一个类里，方便重复使用。

所以学到现在，会发现很多编程的设计，都是为了方便重复使用。

## 2、怎么定义类

知道了类是什么样子，接下来学习怎么定义类。

类定义语法格式如下：

```python
class ClassName():
    <statement-1>
    .
    .
    .
    <statement-N>
```

可以看到，使用 `class` 语句来自定义一个类，这就好像使用 `def` 语句来定义一个函数一样。

既然说类是变量和方法的集合包，那么来创建一个类。

```python
class ClassA():
    var1 = 100
    var2 = 0.01
    var3 = '两点水'

    def fun1():
        print('我是 fun1')

    def fun2():
        print('我是 fun1')

    def fun3():
        print('我是 fun1')
```

你看，上面我们就定义了一个类，类名叫做 `ClassA` , 类里面的变量我们称之为属性，那么就是这个类里面有 3 个属性，分别是 `var1` , `var2` 和 `var3` 。除此之外，类里面还有 3 个类方法 `fun1()` , `fun2()` 和 `fun3()` 。

## 3、怎么调用类属性和类方法  

定义了类之后，怎么调用类里面的属性和方法呢？直接看下图：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2020-03-09-014728.jpg)

这里就不文字解释了。

知道了怎么调用之后，尝试一下：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2020-03-09-014742.jpg)

# 三、类方法  

## 1、类方法如何调用类属性  

通过上面已经会定义类了，这里讲一下在同一个类里，类方法如何调用类属性。

直接看个例子：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-08-110451.png)

注意看，在类方法上面多了个 `@classmethod`，这是干嘛用的呢？这是用于声明下面的函数是类方法。其实从名字就很好理解了。class 就是类，method 就是方法。

那是不是一定需要注明这个呢？答案是肯定的。如果没使用，是会报错的。

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-08-110822.png)

如果没有声明是类方法，方法参数中就没有 `cls` , 就没法通过 `cls` 获取到类属性。

因此类方法想要调用类属性，需要以下步骤：

* 在方法上面，用 `@classmethod` 声明该方法是类方法。只有声明了是类方法，才能使用类属性。
* 类方法想要使用类属性，在第一个参数中，需要写上 `cls`，cls 是 class 的缩写，意思就是把这个类作为参数传给自己，这样就可以使用类属性了。
* 类属性的使用方式就是 `cls.变量名`。

记住，无论是 `@classmethod` 还是 `cls`，都不能省去。省了都会报错。

## 2、类方法传参 

上面学习了类方法如何调用类属性，那么类方法如何传参呢？其实很简单，跟普通的函数一样，直接增加参数就好了。这个就直接上例子了：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-08-113458.png)

# 四、修改和增加类属性  

## 1、从内部增加和修改类属性 

先来温习一下类的结构。

看着这个结构，提一个问题：如何修改类属性，也就是类里面的变量？从类结构来看，可以猜测从类方法来修改，也就是从类内部来修改和增加类属性。

看下具体的实例：

这里还是强调一下，例子要自己多写，不要只看，自己运行看效果。

## 2、从外部增加和修改类属性 

刚刚看了通过类方法来修改类的属性，现在看下从外部如何修改和增加类属性。

例子如下：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-08-121135.png)

# 五、类和对象 

## 1、类和对象之间的关系 

这部分内容主要讲类和对象，先来说说类和对象之间的关系。

**类是对象的模板。**得先有了类，才能制作出对象。类相当于工厂里面的模具，对象就是根据模具制造出来的产品。

**从模具变成产品的过程，就称为类的实例化。**

**类实例化之后，就变成对象了，也就相当于例子中的产品。**

## 2、类的实例化  

这里强调一下，类的实例化和直接使用类的格式是不一样的。之前学过，直接使用类格式是这样的：

```python
class ClassA():
    var1 = '两点水'

    @classmethod
    def fun1(cls):
        print('var1 值为：' + cls.var1)


ClassA.fun1()
```

而类的实例化是怎样的呢？可以仔细对比一下，类的实例化和直接使用类的格式有什么不同？

主要的不同点有：

* 类方法里面没有了 `@classmethod` 声明，不用声明是类方法。
* 类方法里面的参数 `cls` 改为 `self`。
* 类的使用，变成了先通过 `实例名 = 类()` 的方式实例化对象，为类创建一个实例，然后再使用 `实例名.函数()` 的方式调用对应的方法，使用 `实例名.变量名` 的方法调用类的属性。

这里说明一下，类方法的参数为什么 `cls` 改为 `self`？其实并不是说一定要写这个，改为任何字母、任何名字都可以。不妨试一下：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-09-032030.png)

你看，把 `self` 改为 `aaaaaaaa` 还是可以一样运行的。

只不过使用 `cls` 和 `self` 是编程习惯，也是编程规范。因为 cls 是 class 的缩写，代表这类，而 self 代表对象的意思。

所以实例化对象的时候，就使用 `self`。**而且 `self` 是所有类方法位于首位、默认的特殊参数。**

除此之外，还要强调一个概念：当把类实例化之后，里面的属性和方法就不叫类属性和类方法了，改为叫实例属性和实例方法，也可以叫对象属性和对象方法。

为什么要这样强调呢？**因为一个类是可以创建出多个实例对象的。**

你看下面的例子：不仅能通过这个类创建 a 对象，还能创建 b 对象。

## 3、实例属性和类属性

一个类可以实例化多个对象出来。根据这个，探究一下实例对象的属性和类属性之间有什么关系。

**先提出第一个问题：如果类属性改变了，实例属性会不会跟着改变呢？**

还是跟以前一样，用程序来验证。看程序：

从程序运行的结果来看，**类属性改变了，实例属性会跟着改变。**这很好理解，因为实例对象就是根据类来复制出来的，类属性改变了，实例对象的属性也会跟着改变。

**那么相反，如果实例属性改变了，类属性会改变吗？**答案当然是不能，因为每个实例都是单独的个体，不能影响到类。具体做下实验：

可以看到，**不管实例对象怎么修改属性值，对类的属性还是没有影响的。**

## 4、实例方法和类方法  

那这里跟上面一样，还是提出同样的问题。

**如果类方法改变了，实例方法会不会跟着改变呢？**看下下面的例子：

这里建议例子都要仔细看一下，自己重新敲一遍。

回归正题，从运行的结果来看，类方法改变了，实例方法也是会跟着改变的。在这个例子中，需要改变类方法，就用到了**类的重写**。使用了 `类.原始函数 = 新函数` 就完成了类的重写。要注意的是，这里的赋值是在替换方法，并不是调用函数，所以是不能加上括号的，也就是 `类.原始函数() = 新函数()` 这个写法是不对的。

**那么如果实例方法改变了，类方法会改变吗？**如果需要验证，是不是要重写实例的方法，然后观察结果，看看类方法有没有改变，这样就能得出结论。可是不能重写实例方法，会直接报错。

# 六、初始化函数  

## 1、什么是初始化函数  

初始化函数的意思是，当创建一个实例的时候，这个函数就会被调用。比如：

当代码在执行 `a = ClassA()` 语句时，就自动调用了 `__init__(self)` 函数。**而这个 `__init__(self)` 函数就是初始化函数，也叫构造函数。**

初始化函数的写法是固定的格式：中间是 `init`，意思是初始化，然后前后都要有【两个下划线】，然后 `__init__()` 的括号中，第一个参数一定要写上 `self`，不然会报错。

构造函数（初始化函数）格式如下：

```python
def __init__(self,[...):
```

初始化函数一样可以传递参数的，例如：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-09-073421.png)

## 2、析构函数  

既然在创建的时候会调用构造函数，那么理所当然，当一个类销毁的时候，就会调用析构函数。

析构函数语法如下：

```python
def __del__(self,[...):
```

看下具体的示例：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-09-084417.png)

## 3、Python 定义类的历史遗留问题

Python 在版本迭代中，有一个关于类的历史遗留问题，就是新式类和旧式类的问题，具体先看以下的代码：

```python
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# 旧式类
class OldClass:
    pass

# 新式类
class NewClass(object):
    pass

```

可以看到，这里使用了两者中不同的方式定义类，可以看到最大的不同就是，新式类继承了`object` 类，在 Python2 中，我们定义类的时候最好定义新式类，当然在 Python3 中不存在这个问题了，因为 Python3 中所有类都是新式类。

那么新式类和旧式类有什么区别呢？

运行下下面的那段代码：

```python
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# 旧式类
class OldClass:
    def __init__(self, account, name):
        self.account = account
        self.name = name


# 新式类
class NewClass(object):
    def __init__(self, account, name):
        self.account = account
        self.name = name


if __name__ == '__main__':
    old_class = OldClass(111111, 'OldClass')
    print(old_class)
    print(type(old_class))
    print(dir(old_class))
    print('\n')
    new_class = NewClass(222222, 'NewClass')
    print(new_class)
    print(type(new_class))
    print(dir(new_class))

```

这是 python 2.7 运行的结果：

```
/Users/twowater/dev/python/test/venv/bin/python /Users/twowater/dev/python/test/com/twowater/test.py
<__main__.OldClass instance at 0x109a50560>
<type 'instance'>
['__doc__', '__init__', '__module__', 'account', 'name']


<__main__.NewClass object at 0x109a4b150>
<class '__main__.NewClass'>
['__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'account', 'name']

Process finished with exit code 0

```

这是 Python 3.6 运行的结果：

```
/usr/local/bin/python3.6 /Users/twowater/dev/python/test/com/twowater/test.py
<__main__.OldClass object at 0x1038ba630>
<class '__main__.OldClass'>
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'account', 'name']


<__main__.NewClass object at 0x103e3c9e8>
<class '__main__.NewClass'>
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'account', 'name']

Process finished with exit code 0

```

仔细观察输出的结果，对比一下，就能观察出来。注意，Python 3 中输出的结果是一模一样的，因为 Python 3 中没有新式类和旧式类的问题。

# 七、类的继承  

## 1、定义类的继承 

说到继承，联想到继承家产之类的。类的继承也是一样。比如有一个旧类，是可以算平均数的。然后这时候有一个新类，也要用到算平均数，那么就可以使用继承的方式。新类继承旧类，这样新类也就有这个功能了。

通常情况下，叫旧类为父类，新类为子类。

首先来看类的继承的基本语法：

```python
class ClassName(BaseClassName):
    <statement-1>
    .
    .
    .
    <statement-N>
```

在定义类的时候，可以在括号里写继承的类，如果不用继承类的时候，也要写继承 object 类，因为在 Python 中 object 类是一切类的父类。

当然上面的是单继承，Python 也是支持多继承的，具体的语法如下：

```python
class ClassName(Base1,Base2,Base3):
    <statement-1>
    .
    .
    .
    <statement-N>
```

多继承有一点需要注意：若是父类中有相同的方法名，而在子类使用时未指定，Python 在圆括号中父类的顺序，从左至右搜索，即方法在子类中未找到时，从左到右查找父类中是否包含方法。

那么继承的子类可以干什么呢？继承的子类有以下好处：

* 会继承父类的属性和方法。
* 可以自己定义，覆盖父类的属性和方法。

## 2、调用父类的方法  

一个类继承了父类后，可以直接调用父类的方法。比如下面的例子，`UserInfo2` 继承自父类 `UserInfo`，可以直接调用父类的 `get_account` 方法。

```python
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

class UserInfo(object):
    lv = 5

    def __init__(self, name, age, account):
        self.name = name
        self._age = age
        self.__account = account

    def get_account(self):
        return self.__account


class UserInfo2(UserInfo):
    pass


if __name__ == '__main__':
    userInfo2 = UserInfo2('两点水', 23, 347073565);
    print(userInfo2.get_account())

```

## 3、父类方法的重写  

当然，也可以重写父类的方法。

示例：

```python
#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

class UserInfo(object):
    lv = 5

    def __init__(self, name, age, account):
        self.name = name
        self._age = age
        self.__account = account

    def get_account(self):
        return self.__account

    @classmethod
    def get_name(cls):
        return cls.lv

    @property
    def get_age(self):
        return self._age


class UserInfo2(UserInfo):
    def __init__(self, name, age, account, sex):
        super(UserInfo2, self).__init__(name, age, account)
        self.sex = sex;


if __name__ == '__main__':
    userInfo2 = UserInfo2('两点水', 23, 347073565, '男');
    # 打印所有属性
    print(dir(userInfo2))
    # 打印构造函数中的属性
    print(userInfo2.__dict__)
    print(UserInfo2.get_name())

```

最后打印的结果：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-09-Python%20%E7%B1%BB%E7%9A%84%E7%BB%A7%E6%89%BF.png)

这里就是重写了父类的构造函数。

## 4、子类的类型判断  

对于 class 的继承关系来说，有些时候我们需要判断 class 的类型，该怎么办呢？

可以使用 `isinstance()` 函数,

一个例子就能看懂 `isinstance()` 函数的用法了。

```python
#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

class User1(object):
    pass


class User2(User1):
    pass


class User3(User2):
    pass


if __name__ == '__main__':
    user1 = User1()
    user2 = User2()
    user3 = User3()
    # isinstance()就可以告诉我们，一个对象是否是某种类型
    print(isinstance(user3, User2))
    print(isinstance(user3, User1))
    print(isinstance(user3, User3))
    # 基本类型也可以用isinstance()判断
    print(isinstance('两点水', str))
    print(isinstance(347073565, int))
    print(isinstance(347073565, str))

```

输出的结果如下：

```txt
True
True
True
True
True
False
```

可以看到 `isinstance()` 不仅可以告诉我们，一个对象是否是某种类型，也可以用于基本类型的判断。

# 八、类的多态  

多态的概念其实不难理解，它是指对不同类型的变量进行相同的操作，它会根据对象（或类）类型的不同而表现出不同的行为。

事实上，我们经常用到多态的性质，比如：

```
>>> 1 + 2
3
>>> 'a' + 'b'
'ab'
```

可以看到，我们对两个整数进行 + 操作，会返回它们的和，对两个字符进行相同的 + 操作，会返回拼接后的字符串。

也就是说，不同类型的对象对同一消息会作出不同的响应。

看下面的实例，来了解多态：

```python
#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

class User(object):
    def __init__(self, name):
        self.name = name

    def printUser(self):
        print('Hello !' + self.name)


class UserVip(User):
    def printUser(self):
        print('Hello ! 尊敬的Vip用户：' + self.name)


class UserGeneral(User):
    def printUser(self):
        print('Hello ! 尊敬的用户：' + self.name)


def printUserInfo(user):
    user.printUser()


if __name__ == '__main__':
    userVip = UserVip('两点水')
    printUserInfo(userVip)
    userGeneral = UserGeneral('水水水')
    printUserInfo(userGeneral)

```

输出的结果:

```txt
Hello ! 尊敬的Vip用户：两点水
Hello ! 尊敬的用户：水水水
```

可以看到，userVip 和 userGeneral 是两个不同的对象，对它们调用 printUserInfo 方法，它们会自动调用实际类型的 printUser 方法，作出不同的响应。这就是多态的魅力。

注意，有了继承，才有了多态，才会有不同类的对象对同一消息作出不同的响应。

最后，本章的所有代码都可以在 [https://github.com/TwoWater/Python](https://github.com/TwoWater/Python) 上找到。

# 九、类的访问控制  

## 1、类属性的访问控制  

在 Java 中，有 public（公共）属性和 private（私有）属性，这可以对属性进行访问控制。那么在 Python 中有没有属性的访问控制呢？

一般情况下，使用 `__private_attrs` 两个下划线开头，声明该属性为私有，不能在类外部被使用或直接访问。在类内部的方法中使用时 `self.__private_attrs`。

为什么说一般情况下呢？因为实际上，Python 中是没有提供私有属性等功能的。Python 对属性的访问控制是靠程序员自觉的。为什么这么说呢？

看看下面的示例：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-09-Python%20%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6.png)

仔细看图片，为什么说双下划线不是真正的私有属性呢？我们看下下面的例子，用下面的例子来验证：

```python

#!/usr/bin/env python
# -*- coding: UTF-8 -*-

class UserInfo(object):
    def __init__(self, name, age, account):
        self.name = name
        self._age = age
        self.__account = account

    def get_account(self):
        return self.__account


if __name__ == '__main__':
    userInfo = UserInfo('两点水', 23, 347073565);
    # 打印所有属性
    print(dir(userInfo))
    # 打印构造函数中的属性
    print(userInfo.__dict__)
    print(userInfo.get_account())
    # 用于验证双下划线是否是真正的私有属性
    print(userInfo._UserInfo__account)


```

输出的结果如下图：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-09-Python%E5%8F%8C%E4%B8%8B%E5%88%92%E7%BA%BF%E5%B1%9E%E6%80%A7.png)

## 2、类专有的方法  

一个类创建的时候，就会包含一些方法，主要有以下方法：

类的专有方法：

| 方法          | 说明                       |
| ------------- | -------------------------- |
| `__init__`    | 构造函数，在生成对象时调用 |
| `__del__`     | 析构函数，释放对象时使用   |
| `__repr__`    | 打印，转换                 |
| `__setitem__` | 按照索引赋值               |
| `__getitem__` | 按照索引获取值             |
| `__len__`     | 获得长度                   |
| `__cmp__`     | 比较运算                   |
| `__call__`    | 函数调用                   |
| `__add__`     | 加运算                     |
| `__sub__`     | 减运算                     |
| `__mul__`     | 乘运算                     |
| `__div__`     | 除运算                     |
| `__mod__`     | 求余运算                   |
| `__pow__`     | 乘方                       |

当然有些时候我们需要获取类的相关信息，我们可以使用如下的方法：

* `type(obj)`：来获取对象的相应类型；
* `isinstance(obj, type)`：判断对象是否为指定的 type 类型的实例；
* `hasattr(obj, attr)`：判断对象是否具有指定属性/方法；
* `getattr(obj, attr[, default])` 获取属性/方法的值, 要是没有对应的属性则返回 default 值（前提是设置了 default），否则会抛出 AttributeError 异常；
* `setattr(obj, attr, value)`：设定该属性/方法的值，类似于 obj.attr=value；
* `dir(obj)`：可以获取相应对象的所有属性和方法名的列表：

## 3、方法的访问控制  

其实我们也可以把方法看成是类的属性的，那么方法的访问控制也是跟属性是一样的，也是没有实质上的私有方法。一切都是靠程序员自觉遵守 Python 的编程规范。

示例如下，具体规则也是跟属性一样的，

```python
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

class User(object):
    def upgrade(self):
        pass

    def _buy_equipment(self):
        pass

    def __pk(self):
        pass

```
