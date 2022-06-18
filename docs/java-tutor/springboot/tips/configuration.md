# @Configuration、@Bean注解的使用详解

## 1，基本介绍

`Spring Boot`推荐使用 `java` 配置完全代替 `XML` 配置，java 配置是通过 `@Configration` 和`@Bean` 注解实现的。二者作用如下：

- @Configration 注解：声明当前类是一个配置类，相当于 `Spring` 中的一个 `XML` 文件
- @Bean 注解：作用在方法上，声明当前方法的返回值是一个 `Bean`

# 2，简单样例

（1）首先创建一个自定义的配置类 MyConfigration：

- 使用 @Configration 注解将该类声明为一个配置类。
- 在 hello() 方法上添加 @Bean 注解则会往 Spring 容器中添加一个名为 hello 的 Bean，该 Bean 即为方法的返回值。

```java
package com.example.demo.component;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
@Configuration
public class MyConfigration {
    @Bean
    public String hello() {
        return "welcome to hangge.com";
    }
}
```

（2）下面我们在一个 Controller 中获取并使用这个 Bean，代码如下：

```java

package com.example.demo.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
public class HelloController {
 
    @Autowired
    String hello;
 
    @GetMapping("/test")
    public String test() {
        return hello;
    }
}
```

(3)访问这个 Controller，结果如下:

![tu](https://www.hangge.com/blog_uploads/201907/2019071218422865712.png)

## 二、@Bean 注解详解

### 1，使用说明

- @Bean 注解作用在方法上
- @Bean 指示一个方法返回一个 Spring 容器管理的 Bean
- @Bean 方法名与返回类名一致，首字母小写
- @Bean 一般和 @Component 或者 @Configuration 一起使用
- @Bean 注解默认作用域为单例 singleton 作用域，可通过 @Scope(“prototype”) 设置为原型作用域

### 2，Bean 名称

（1）默认情况下 Bean 名称就是方法名，比如下面 Bean 名称便是 myBean：

```java
@Bean
public MyBean myBean() {
    return new MyBean();
}
```

（2）**@Bean** 注解支持设置别名。比如下面除了主名称 **myBean** 外，还有个别名 **myBean1**（两个都可以使用）

```java
@Bean("myBean1")
public MyBean myBean() {
    return new MyBean();
}
```

（3）**@Bean** 注解可以接受一个 **String** 数组设置多个别名。比如下面除了主名称 **myBean** 外，还有别名 **myBean1**、**myBean2**（三个都可以使用）

```java
@Bean({"myBean1", "myBean2"})
public MyBean myBean() {
    return new MyBean();
}
```

### 3，@Bean 与其他注解一起使用

（1）**@Bean** 注解常常与 **@Scope**、**@Lazy**，**@DependsOn** 和 **@link Primary** 注解一起使用：

- **@Profile** 注解：为在不同环境下使用不同的配置提供了支持，如开发环境和生产环境的数据库配置是不同的
- **@Scope** 注解：将 **Bean** 的作用域从单例改变为指定的作用域
- **@Lazy** 注解：只有在默认单例作用域的情况下才有实际效果
- **@DependsOn** 注解：表示在当前 **Bean** 创建之前需要先创建特定的其他 **Bean**

（2）比如下面样例，**Bean** 的作用域默认是单例的，我们配合 **@Scope** 注解将其改成 **prototype** 原型模式（每次获取 **Bean** 的时候会有一个新的实例）

```java
@Bean()
@Scope("prototype")
public MyBean myBean() {
    return new MyBean();
}
```

### 4，Bean 初始化和销毁时调用相应的方法

（1）实际开发中，经常会遇到在 **Bean** 使用之前或使用之后做些必要的操作，**Spring** 对 **Bean** 的生命周期的操作提供了支持：我们可以通过 **@Bean** 注解的 **initMethod** 和 **destrodMethod** 进行指定 **Bean** 在初始化和销毁时需要调用相应的方法。

（2）下面是一个简单的样例：

```java
public class MyBean {
    public void init() {
        System.out.println("MyBean开始初始化...");
    }
 
    public void destroy() {
        System.out.println("MyBean销毁...");
    }
 
    public String get() {
        return "MyBean使用...";
    }
}
@Bean(initMethod="init", destroyMethod="destroy")
public MyBean myBean() {
    return new MyBean();
}
```

## 三、@Configration 注解详解

### 1，使用说明

- **@Configration** 注解作用在类、接口（包含注解）上
- **@Configuration** 用于定义配置类，可替换 **xml** 配置文件
- **@Configration** 注解类中可以声明一个或多个 **@Bean** 方法
- **@Configration** 注解作用的类不能是 **final** 类型
- 嵌套的 **@Configration** 类必须是 **static** 的

### 2，声明一个 @Bean 方法

（1）假设我们定义一个如下的 **Bean**：

```java
package com.example.demo.bean;
 
public class MyBean {
    private String port;
 
    public void init() {
        System.out.println("MyBean开始初始化...");
    }
 
    public void destroy() {
        System.out.println("MyBean销毁...");
    }
 
    public String get() {
        return "端口号： " + getPort();
    }
 
    public String getPort() {
        return port;
    }
 
    public void setPort(String port) {
        this.port = port;
    }
}
```

（2）然后在 **Configuration** 中进行声明：

```java
@Configuration
public class MyConfigration {
    @Bean(initMethod="init", destroyMethod="destroy")
    public MyBean myBean() {
        MyBean myBean = new MyBean();
        myBean.setPort("8080");
        return myBean;
    }
}
```

（3）最后进行测试，我们获取这个 **Bean** 并输出其内容：

```java
@SpringBootApplication
public class DemoApplication {
 
    public static void main(String[] args) {
        ConfigurableApplicationContext context
                = SpringApplication.run(DemoApplication.class, args);
        MyBean myBean = (MyBean) context.getBean("myBean");
        System.out.println(myBean.get());
    }
}
```

### 3，声明多个 @Bean 方法

（1）**@Configration** 注解类中可以声明多个 **@Bean** 方法，并且 **bean** 与 **bean** 之间是可以有依赖关系的。如果一个 **bean** 的定义依赖其他 **bean**，则直接调用对应的 **JavaConfig** 类中依赖 **bean** 的创建方法就可以了。
（2）下面是一个简单的样例，一共声明了 **country** 和 **userInfo** 两个 **Bean**。

**注意**：**@Configuration** 注解的 **bean** 都已经变成了增强的类。因此上面的 **country** 这个 **Bean** 和下面直接调用 **country()** 方法返回的是同一个实例

```java
@Configuration
public class MyBeanConfig {
  
    @Bean
    public Country country(){
        return new Country();
    }
  
    @Bean
    public UserInfo userInfo(){
        return new UserInfo(country());
    }
}
```

[原文:SpringBoot - @Configuration、@Bean注解的使用详解（配置类的实现）](https://www.hangge.com/blog/cache/detail_2506.html#)
由yzqdev重新整理

推荐浏览[https://www.hangge.com/](https://www.hangge.com/)
