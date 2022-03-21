# 依赖注入的简单理解


所谓依赖，举个例子说明，一个类Person，另一个类Car，如果Person的某个方法比如说drive，需要引用Car，则称Person类依赖于 Car类，延伸到对象，这种依赖关系依然成立，比如说Person类的对象boy依赖于Car类的对象toyota。再讲讲这个drive方法的实现，假定代码如下：


```
Public Person{
...
public void drive(){
  Car toyota=new Car("TOYOTA");
  toyota.挂档;
  toyota.踩油门;
  toyota.打方向;
}
}
```


这其中的依赖关系，就导致了对象boy需要负责对象toyota的创建，甚至是整个生命周期的管理，而这样显然会带来耦合度高，不易维护等缺点，比如说要让这个男孩驾驶一辆Audi，则还需要修改类Person的代码。
因此在java的设计理论中就提出了一条非常著名的原则，依赖倒转原则（Dependence Inversion），其核心思想就是要将这种具体类之间的依赖，尽量转换成抽象依赖，也就是说类Person应该依赖于抽象类ICar，而不是具体的类 Car，这里java就大力推荐了抽象和接口的使用，至于抽象和接口之间的区别，任何一本JAVA书籍都有介绍，这里就不再说了。


这个依赖倒转原则在设计模式也体现得非常多，比如说工厂模式和构建模式，个人认为控制反转IoC，其实也可以认为是实现这个原则的一种设计模式。控制反转，其中的控制这个词一直不太理解是什么意思，不过控制反转的另外一种说法也就是依赖注入（dependence injection），个人觉得更易于理解。还是以上文的boy与toyota为例，其核心就是要将boy依赖的对象toyota注入到boy中去，而无需boy自己去引用toyota，这个注入的过程，通常是由一个控制程序来完成的，无需对象去关心，举例如下：


```java
Public Person{
private ICar car;
public Person(ICar onecar){
  car=onecar;
}
public void drive(){
  car.挂档;
  car.踩油门;
  car.打方向;
}
}
```


这个时候，进行注入并且调用的过程，就很简单了，如下：


```java
Toyota toyota=new Toyota();
Person boy=new Person(toyota);
boy.drive();
```


注：这里我们假定，Toyota类是ICar接口类的一个具体实现。
这个例子就演示一个最简单的注入方式的例子，也就是构造子方式注入，通过将依赖对象注入到对象的构造子中来实现。另外还有一种常用的注入方式，就是属性方式注入，意思就是通过将依赖对象注入到对象的属性中来实现，还是以boy和toyota的例子说明，如下：


```java
Public Person{
private ICar car;
public Person(){
}
public void drive(){
  car.挂档;
  car.踩油门;
  car.打方向;
}
public ICar getCar(){
  return this.car;
}
public void setCar(ICar onecar){
  car=onecar;
}
}
```


这个时候，进行注入并且调用的过程，就变成如下所示：


```java
Toyota toyota=new Toyota();
Person boy=new Person();
boy.setCar(toyota);
boy.drive();
```


至此依赖注入的概念应该比较清楚了，再来看看在Spring中如何实现IoC的，看看Spring如何作为一个成熟的IoC容器，Spring中其实主要通过两个概念来实现IoC，首先通过XML配置文件，将对象和依赖对象都配置到某个XML文件中，当然该XML文件需要符合Spring指定的规范，然后通过架构中的BeanFactroy类，来自动实现上文所述注入过程，还是以boy与toyota为例，如下：
首先，Person类还是一样的，
然后xml配置文件增加点东西-（假定为bean.xml）：


```xml
<?xml version="1.0" encoding="GBK"?>
<!DOCTYPE beans PUBLIC "-//SPRING/DTD BEAN/EN"
    "http://www.springframework.org/dtd/spring-beans.dtd">
<beans>
   <bean id="oneCar" class="Toyota"> <!-- Toyota类是ICar的一个实现-->
   </bean>
   <bean id="onePerson" class="Person"> <!--本例以属性方式注入为例 -->
       <property name="car"> 
           <ref bean="oneCar"></ref>
       </property>
   </bean>
</beans>
```


最后，调用的过程，就变成如下：


```java
BeanFactory factory=new XmlBeanFactory("bean.xml");
Person boy=(Person )factory.getBean("onePerson");
boy.drive();
```
