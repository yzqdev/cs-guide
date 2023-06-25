# 常用注解解析

## 1. 有这么一个故事，从xml配置文件的bean说起

Spring用xml配置文件的时候（不知道阅读这篇文章的你用没用过，我用过一段时间，那是黑暗伤痛的回忆QQQ），一个xml配置文件里面有很多个bean。类似这样：

```
<bean id="helloWorld" class="com.test.spring.beans.HelloWorld">
        <property name="name" value="Spring"></property>
</bean>
```

每个bean都对应着一个class，可能是controller，可能是service，可能是dao，xml配置文件就是告诉Spring，我这里有哪些bean，他们都叫啥名字（例如helloworld），他们的class文件在哪（com.test.spring.beans.HelloWorld），他们都有哪些属性。这样，当项目启动时，Spring就回去管理这些类了。

## 2. 进入@Configuration时代

你现在使用`@Service`、`@Repository`、`@Component`这些注解放在java的类上用来告诉Spring：“我标注的这些类请你来管理”。在以前就是要在xml配置文件里写上面这样的bean，有一个类写一个bean（实在是太麻烦了。。。。。，不方便码代码，不方便阅读，不方便修改），一个xml配置文件写好多bean。
**总结一下：**

- `@Configuration`注解就相当于xml配置文件，告诉Spring我这里有好多bean要交给你管理
- `@Bean`注解就相当于xml配置文件里面的bean，告诉Spring这个被注解的类就交给你管理了
到这里，Spring发展史中注解替换xml配置文件的故事就讲完了，是不是很简单！

=十万个为什么的分割线=======
那，既然问题都解决了，有@Component啥事？？？
年轻人，sometimes naive

## 3. @Component粉墨登场

无名子曰过，偷懒是人类创造力的源泉。我都把class类写好了，还要再写个`@Configuration`注解的class去告诉Spring（除了通知Spring，这个class不产生其他价值），虽然这个class相比于xml配置文件写起来方便又好阅读，但是，这个时候总有但是，我为啥不直接就告诉Spring呢？？？
  `@Controller`、`@Service`、`@Repository`都是`@Component`的更具体一点的实现（这里如果说错了，求大佬轻喷）。写完class加上这些注解，其实就是加上`@Component`注解，Spring就懂了，奥奥，你小子太懒了，这么多类全部是让我来管理的，不过话说回来谁让我是你baba呢！
  是不是这就完事了呢，是的，没有但是，真的就完事了。

## 4. “但是”又回来了

是的，这里又有但是了。可能有人想到了，既然`@Component`跟Spring已经把问题解决了，那，`@Bean`这个注解为啥还没退休啊，还在这站着地儿，咋不见新版Spring给加个`@Deprecated`？？？
  年轻人，有想法！！！
  假设这么一种情况，有几个class，我自己也不是不能写，但是写了周末就没时间去外滩闲逛了，就在这个时候，我发现alimama的老铁们已经写好了同样功能的class，我在maven里import一下就完了，开心三秒，又有问题了，他们写的时候没用Spring：

- 1）打好的jar包，我不能在class上面加`@Component`注解；
- 2）我没有他们的源码，也不能把他们的代码复制过来，假装自己重写了一遍QQQ

这时候`@Bean`的作用就体现出来了，请看：

```java
@Configuration
public class MyClass {
  // class1和class2就是jar包里写好的
  @Bean
  public Class1 getClass1() {
    return new Class1();
  }
  @Bean
  public Class2 getClass1() {
    return new Class2();
  }
  .....
}
```

虽然又回到了`@Component出场`之前的`@Configuration`时代。但是你也不需要经常使用这个对吧

## 4. 让我们以一点小干货结束今天的故事

Spring管理的Bean我们需要通过`@Autowired`或者`@Resource`导入来使用，这两的区别啥的你可以自己去搜索一下，这里只说一个问题。`@Autowired`是按照类型装配的，`@Resource`是按照名称装配的，加入同一类型有多个bean，只是名字不一样，`@Autowired`直接导入会报错。这时候课题通过`@Resource(name="name")`或者`@Autowired@Qualifier("name")`来按名称装配，解决问题。
