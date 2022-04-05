# java抽象类

我们从我们实际设计场景中来切入这个话题

先来举一个简单的例子：

狗都具有 eat() 、sleep() 方法，我们分别通过抽象类和接口定义这个抽象概念

```java
  //通过抽象类定义
  public abstract class Dog {
      public abstract void eat();
      public abstract void sleep();  
  }
  
  //通过接口定义
  public interface Dog {
      public abstract void eat();
      public abstract void sleep();
  }
```

但是我们现在如果需要让狗拥有一项特殊的技能——钻火圈 DrillFireCircle()，如何增加这个行为呢？

思考：

1. 将钻火圈方法与前面两个方法一同写入抽象类中，但是这样的话，但凡继承这个抽象类狗都具有了钻火圈技能，明显不合适
1. 将钻火圈方法与前面两个方法一同写入接口中，当需要使用钻火圈功能的时候，就必须实现 接口中的eat() 、sleep() 方法（重写该接口中所有的方法）显然也不合适

那么该如何解决呢 ? 我们可以仔细想一想,eat和sleep都是狗本身所应该具有的一种行为,而钻火圈这种行为则是后天训练出来的,只能算是对狗类的一种附加或者延伸, 两者不应该在同一个范畴内,所以我们考虑将这个单独的行为,独立的设计一个接口,其中包含DrillFireCircle()方法, Dog设计为一个抽象类, 其中又包括eat() 、sleep() 方法.

一个SpecialDog即可继承Dog类并且实现DrillFireCircle()接口

下面给出代码:

```java
  //定义接口，含有钻火圈方法
  public interface DrillFireCircle() {
      public abstract void drillFireCircle();
  }
  
  //定义抽象类狗类
  public abstract class Dog {
      public abstract void eat();
      public abstract void sleep();
  }
   
  //继承抽象类且实现接口
  class SpecialDog extends Dog implements drillFireCircle {
      public void eat() {
        //....
      }
      public void sleep() {
        //....
      }
      public void drillFireCircle() () {
        //....
      }
  }
```

## **总结：**

继承是一个 "是不是"的关系，而 接口 实现则是 "有没有"的关系。如果一个类继承了某个抽象类，则子类必定是抽象类的种类，而接口实现则是有没有、具备不具备的关系，比如狗是否能钻火圈，能则可以实现这个接口，不能就不实现这个接口。
