# 注入方式

## 一、前言

 Spring框架对Java开发的重要性不言而喻，其核心特性就是IOC（Inversion of Control， 控制反转）和AOP，平时使用最多的就是其中的IOC，我们通过将组件交由Spring的IOC容器管理，将对象的依赖关系由Spring控制，避免硬编码所造成的过度程序耦合。前几天的时候，笔者的同事问我为什么要使用构造器的注入方式，我回答说因为Spring文档推荐这种，而说不出为什么 T^T，后面抽时间了解了一下，下面就是笔者要讨论的就是其注入方式。

## 二、常见的三种注入方式

### 2.1 field注入

```java
@Controller
public class FooController {
  @Autowired
  //@Inject
  private FooService fooService;
  
  //简单的使用例子，下同
  public List<Foo> listFoo() {
      return fooService.list();
  }
}
```

这种注入方式应该是笔者目前为止开发中见到的最常见的注入方式。原因很简单：

1. 注入方式非常简单：加入要注入的字段，附上`@Autowired`，即可完成。

2. 使得整体代码简洁明了，看起来美观大方。

### 2.2 构造器注入

```java
@Controller
public class FooController {
  
  private final FooService fooService;
  
  @Autowired
  public FooController(FooService fooService) {
      this.fooService = fooService;
  }
  
  //使用方式上同，略
}
```

 在Spring4.x版本中推荐的注入方式就是这种，相较于上面的field注入方式而言，就显得有点难看，特别是当注入的依赖很多（5个以上）的时候，就会明显的发现代码显得很臃肿。对于从field注入转过来+有强迫症的园友 来说，简直可以说是石乐志  (`Д´*)9。对于这一点我们后面再来讨论，别急。

### 2.3 setter注入

```java
@Controller
public class FooController {
  
  private FooService fooService;
  
  //使用方式上同，略
  @Autowired
  public void setFooService(FooService fooService) {
      this.fooService = fooService;
  }
}
```

### getbean

其实还有一种方法,就是getbean
通过context获取bean,并可以在各个地方使用

```java
public class LoginContextHolder {

    public static LoginContext me() {
        return SpringUtil.getBean(LoginContext.class);
    }

}
```

## 三、构造器注入的好处

 先来看看Spring在文档里怎么说：

> The Spring team generally advocates constructor injection as it enables one to implement application components as *immutable objects* and to ensure that required dependencies are not `null`. Furthermore constructor-injected components are always returned to client (calling) code in a fully initialized state.

 咳咳，再来简单的翻译一下：这个构造器注入的方式啊，能够保证注入的**组件不可变**，并且确保需要的**依赖不为空**。此外，构造器注入的依赖总是能够在返回客户端（组件）代码的时候保证**完全初始化的状态**。

下面来简单的解释一下：

- 依赖不可变：其实说的就是final关键字，这里不再多解释了。不明白的园友可以回去看看Java语法。
- 依赖不为空（省去了我们对其检查）：当要实例化FooController的时候，由于自己实现了有参数的构造函数，所以不会调用默认构造函数，那么就需要Spring容器传入所需要的参数，所以就两种情况：1、有该类型的参数->传入，OK 。2：无该类型的参数->报错。所以保证不会为空，Spring总不至于传一个null进去吧 😦
- 完全初始化的状态：这个可以跟上面的依赖不为空结合起来，向构造器传参之前，要确保注入的内容不为空，那么肯定要调用依赖组件的构造方法完成实例化。而在Java类加载实例化的过程中，构造方法是最后一步（之前如果有父类先初始化父类，然后自己的成员变量，最后才是构造方法，这里不详细展开。）。所以返回来的都是初始化之后的状态。

等等，比较完了setter注入与构造器注入的优缺点，你还没用说使用field注入与构造器的比较呢！那么我们再回头看一看使用最多的field注入方式：

```java
//承接上面field注入的代码，假如客户端代码使用下面的调用(或者再Junit测试中使用)
//这里只是模拟一下，正常来说我们只会暴露接口给客户端，不会暴露实现。
FooController fooController = new FooController();
fooController.listFoo(); // -> NullPointerException
```

如果使用field注入，缺点显而易见，**对于IOC容器以外的环境，除了使用反射来提供它需要的依赖之外，无法复用该实现类**。而且将一直是个潜在的隐患，因为你不调用将一直无法发现NPE的存在。

还值得一提另外一点是：使用field注入可能会导致循环依赖，即A里面注入B，B里面又注入A：

```java
public class A {
    @Autowired
    private B b;
}

public class B {
    @Autowired
    private A a;
}
```

**如果使用构造器注入，在spring项目启动的时候，就会抛出：BeanCurrentlyInCreationException：Requested bean is currently in creation: Is there an unresolvable circular reference？从而提醒你避免循环依赖，如果是field注入的话，启动的时候不会报错，在使用那个bean的时候才会报错**。

## 四、答疑

 好了，相信已经园友们知道了构造器注入的好处，那么回到了在前面提到的问题：

**Q1：跟3.x里说的一样，我要是有大量的依赖要注入，构造方法不会显得很臃肿吗？**

对于这个问题，说明你的类当中有太多的责任，那么你要好好想一想是不是自己违反了类的**单一性职责原则**，从而导致有这么多的依赖要注入。

**Q2：是不是其他的注入方式都不适合用了呢？**

当然不是，存在即是合理！setter的方式既然一开始被Spring推荐肯定是有它的道理，像之前提到的setter的方式能用让类在之后重新配置或者重新注入，就是其优点之一。除此之外，如果一个依赖有多种实现方式，我们可以使用`@Qualifier`，在构造方法里选择对应的名字注入，也可以使用field或者setter的方式来手动配置要注入的实现。

## 五、总结

 使用构造器注入的好处：

1. 保证依赖不可变（final关键字）
2. 保证依赖不为空（省去了我们对其检查）
3. 保证返回客户端（调用）的代码的时候是完全初始化的状态
4. 避免了循环依赖
5. 提升了代码的可复用性

另外，当有一个依赖有多个实现的使用，推荐使用field注入或者setter注入的方式来指定注入的类型。这是spring官方博客对[setter注入方式和构造器注入的比较](https://spring.io/blog/2007/07/11/setter-injection-versus-constructor-injection-and-the-use-of-required/)。

## autowired和resource对比

## 差异

1. @Autowired和@Resource都可以用来装配bean，都可以写在字段上，或者方法上。

2. @Autowired属于Spring的；@Resource为JSR-250标准的注释，属于J2EE的。

3. @Autowired默认按类型装配，默认情况下必须要求依赖对象必须存在，如果要允许null值，可以设置它的required属性为false，例如：@Autowired(required=false) ，如果我们想使用名称装配可以结合@Qualifier注解进行使用，如下：

```java
@Autowired()
@Qualifier("baseDao")
private BaseDao baseDao;
```

4. @Resource，默认安装名称进行装配，名称可以通过name属性进行指定，如果没有指定name属性，当注解写在字段上时，默认取字段名进行安装名称查找，如果注解写在setter方法上默认取属性名进行装配。当找不到与名称匹配的bean时才按照类型进行装配。但是需要注意的是，如果name属性一旦指定，就只会按照名称进行装配。

 例如：

```java
@Resource(name="baseDao")
private BaseDao baseDao;
```

:::tip
 推荐使用：@Resource注解在字段上，这样就不用写setter方法了，并且这个注解是属于J2EE的，减少了与spring的耦合。这样代码看起就比较优雅。
:::
