# 匿名类教程

匿名内部类也就是没有名字的内部类

正因为没有名字，所以匿名内部类只能使用一次，它通常用来简化代码编写

但使用匿名内部类还有个前提条件：必须继承一个父类或实现一个接口

## 解读

### 实例1:不使用匿名内部类来实现抽象方法

```java
abstract class Person {
    public abstract void eat();
}
 
class Child extends Person {
    public void eat() {
        System.out.println("eat something");
    }
}
 
public class Demo {
    public static void main(String[] args) {
        Person p = new Child();
        p.eat();
    }
}
```

**运行结果：**eat something

可以看到，我们用Child继承了Person类，然后实现了Child的一个实例，将其向上转型为Person类的引用

但是，如果此处的Child类只使用一次，那么将其编写为独立的一个类岂不是很麻烦？

这个时候就引入了匿名内部类

**实例2：匿名内部类的基本实现**

```java
abstract class Person {
    public abstract void eat();
}
 
public class Demo {
    public static void main(String[] args) {
        Person p = new Person() {
            public void eat() {
                System.out.println("eat something");
            }
        };
        p.eat();
    }
}
```

**运行结果：**eat something

可以看到，我们直接将抽象类Person中的方法在大括号中实现了

这样便可以省略一个类的书写

并且，匿名内部类还能用于接口上

### 实例3：在接口上使用匿名内部类

```java
interface Person {
    public void eat();
}
 
public class Demo {
    public static void main(String[] args) {
        Person p = new Person() {
            public void eat() {
                System.out.println("eat something");
            }
        };
        p.eat();
    }
}
```

**运行结果：**eat something

由上面的例子可以看出，只要一个类是抽象的或是一个接口，那么其子类中的方法都可以使用匿名内部类来实现

最常用的情况就是在多线程的实现上，因为要实现多线程必须继承Thread类或是继承Runnable接口

### 实例4：Thread类的匿名内部类实现

```java

public class Demo {
    public static void main(String[] args) {
        Thread t = new Thread() {
            public void run() {
                for (int i = 1; i <= 5; i++) {
                    System.out.print(i + " ");
                }
            }
        };
        t.start();
    }
}
```

**运行结果：**1 2 3 4 5

### 实例5：Runnable接口的匿名内部类实现

```java
public class Demo {
    public static void main(String[] args) {
        Runnable r = new Runnable() {
            public void run() {
                for (int i = 1; i <= 5; i++) {
                    System.out.print(i + " ");
                }
            }
        };
        Thread t = new Thread(r);
        t.start();
    }
}
```

**运行结果：**1 2 3 4 5

## 例子

```java
package com.site.blog.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author Yangzhengqian
 * @description
 * @date:Created time 2021/8/13 14:13
 * @modified By:
 */
public class NewFeatureUtils {
    interface Predicte<String> {
        Boolean test(String s);
    }

    public static List<String> filter(List<String> fruit, Predicte<String> predicte) {
        List<String> f = new ArrayList<>();
        for (String s : fruit) {
            if (predicte.test(s)) {

                f.add(s);
            }
        }
        return f;
    }

    public static void main(String[] args) {
        List<String> fruit= Arrays.asList("香蕉","苹果","火龙果","落落莓","鸣草");
        List<String > newFruit=filter(fruit, new Predicte<String>() {
            @Override
            public Boolean test(String s) {
                return s.length()==2;
            }
        });
        //List<String> newFruit=filter(fruit,s->s.length()==2)
    }
}

```

## 例子

首先我们来看一个代码，计算一个方法执行了多少秒! 其实大多数人都会写。像这样：

```java
public static void test() {
    long start = System.currentTimeMillis();
    //执行打印的业务逻辑
    for (int i = 0; i < 10; i++) {
        System.out.println(i);
    }
    long end = System.currentTimeMillis();
    System.out.println(end - start);
}
```

这只是打印的业务逻辑，然而我们也想要统计其它方法的执行时间，那么也需要把除去业务的那几行代码一一复制过去吗？那样太傻了，实际情况中除去业务代码可能非常的长，并且会要是遇到需求变更或者那几行代码出错了都得重新再复制一遍。那样不是得不偿失吗！
能不能将业务代码直接抽取成一段参数呢？很遗憾做不到！
不过可以将这段代码抽取成一个类，或者一个接口的方法。像这样：

```java
public static void test(MyService myService) {
    long start = System.currentTimeMillis();
    //执行打印的业务逻辑
    myService.invoke();
    long end = System.currentTimeMillis();
    System.out.println(end - start);
}
```

看到没有，我将这段代码抽取成了MyService的invoke()方法，MyService长这样：

```java
public interface MyService {
    public void invoke();
}
```

那么调用的时候就可以这样写了：

```java
public static void main(String[] args) {
     test(new MyService() {
         @Override
         public void invoke() {
             for (int i = 0; i < 10; i++) {
                 System.out.println(i);
             }
         }
     });
}
```

这样只要在调用的时候将MyService的invoke方法重写，就能实现各种业务逻辑并统计执行的时间啦。并且我们也不用再写前后那一段统计时间的重复代码了，因为它已经封装进test方法里面了！
有人会问这样有必要吗？只是实现了一个计时功能， 假设这段代码不是计时，而是其它更长更复杂但是不会变动的代码，那么你会觉得这么写是值得的。
然而有人会质问这样写起来是不是太丑了！java8中可以用lambda替换匿名内部类，所以你要是用的java8的话可以还这么写：

```java
public static void main(String[] args) {
     test(() -> {
         for (int i = 0; i < 10; i++) {
             System.out.println(i);
         }
     });
}
```

这样是不是简单得多了呢！是的，不过请注意：**lambda表达只能替换**
**只有一个抽象方法的接口,只有一个抽象方法的接口,只有一个抽象方法的接口**，重要的事情说三遍：如果我在MyService中又添加了一个抽象方法invoke2()，那么编译是不通过的.但是如果我想添加一个**default**修饰符的方法，又可以了，具体原因我就不多解释了，有兴趣的自己可以百度一下 （java8还有一些内置的函数接口可以直接拿来用，这样就可以不用自己再写一些多余的接口了）。
其实说白了，如果你觉得需要将一段非常长的方法中抽取出一个或者多个可能会变动的代码片段，你就可以重构为接口的一个个方法，待调用的时候用匿名内部类重写方法就可以了。
其实jdbc的获取连接以及关闭资源这一块是所有方法通用的，大家不妨尝试用我的方法练练手如何将这两个步骤省略掉，只留下核心的业务逻辑。
