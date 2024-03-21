# 监听器 listener

## **Spring Boot 启动事件顺序**

**1、ApplicationStartingEvent**

这个事件在 Spring Boot 应用运行开始时，且进行任何处理之前发送（除了监听器和初始化器注册之外）。

**2、ApplicationEnvironmentPreparedEvent**

这个事件在当已知要在上下文中使用 Spring 环境（Environment）时，在 Spring 上下文（context）创建之前发送。

**3、ApplicationContextInitializedEvent**

这个事件在当  Spring 应用上下文（ApplicationContext）准备好了，并且应用初始化器（ApplicationContextInitializers）已经被调用，在 bean 的定义（bean definitions）被加载之前发送。

**4、ApplicationPreparedEvent**

这个事件是在  Spring 上下文（context）刷新之前，且在 bean 的定义（bean definitions）被加载之后发送。

**5、ApplicationStartedEvent**

这个事件是在  Spring 上下文（context）刷新之后，且在 [**application/ command-line runners**](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484366&idx=1&sn=7dc94038861fe9e10cdf132ffc83092f&scene=21#wechat_redirect) 被调用之前发送。

**6、AvailabilityChangeEvent**

这个事件紧随上个事件之后发送，状态：ReadinessState.CORRECT，表示应用已处于活动状态。

**7、ApplicationReadyEvent**

这个事件在任何 [**application/ command-line runners**](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484366&idx=1&sn=7dc94038861fe9e10cdf132ffc83092f&scene=21#wechat_redirect) 调用之后发送。

**8、AvailabilityChangeEvent**

这个事件紧随上个事件之后发送，状态：ReadinessState.ACCEPTING_TRAFFIC，表示应用可以开始准备接收请求了。

**9、ApplicationFailedEvent**

这个事件在应用启动异常时进行发送。

------

上面所介绍的这些事件列表仅包括绑定到 SpringApplication 的 SpringApplicationEvents 事件，除了这些事件以外，以下事件也会在 ApplicationPreparedEvent 之后和 ApplicationStartedEvent 之前发送：

- **WebServerInitializedEvent** 这个 Web [服务器](https://cloud.tencent.com/product/cvm?from=10680)初始化事件在 WebServer 启动之后发送，对应的还有 ServletWebServerInitializedEvent（Servlet Web 服务器初始化事件）、ReactiveWebServerInitializedEvent（响应式 Web 服务器初始化事件）。
- **ContextRefreshedEvent** 这个上下文刷新事件是在 Spring 应用上下文（ApplicationContext）刷新之后发送。

------

## **自定义启动事件监听器**

既然我们知道了 Spring Boot 在启动过程中的各个事件，那么我们就可以在每个环节来处理一些我们想做的事情，只需要自定义一个监听器来监听某个事件就可以了。

比如我们想在上面的第 8 步，即应用启动完成可以接收请求了，我们简单输出一个成功标识。

Spring Boot 基础的构建这里就不介绍了，如果你对 Spring Boot 还不是很熟悉，或者只是会简单的使用，那还是建议你深入学习下吧，推荐这个 Spring Boot 学习仓库，欢迎 Star 关注：

> <https://github.com/javastacks/spring-boot-best-practice>

#### **1、新建监听器**

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.availability.AvailabilityChangeEvent;
import org.springframework.boot.availability.ReadinessState;
import org.springframework.context.ApplicationListener;

/**
 * 来源微信公众号：Java技术栈
 */
@Slf4j
public class JavastackListener implements ApplicationListener<AvailabilityChangeEvent> {

    @Override
    public void onApplicationEvent(AvailabilityChangeEvent event) {
        log.info("监听到事件：" + event);
        if (ReadinessState.ACCEPTING_TRAFFIC == event.getState()){
            log.info("应用启动完成，可以请求了……");
        }
    }

}
```

复制

新建一个自定义监听器，实现了 ApplicationListener 接口，泛型 AvailabilityChangeEvent 表示仅仅监听 AvailabilityChangeEvent 事件。

因第 8 步的事件和第 6 步的事件同名，我们可以根据事件的状态来区分到底是哪一个环节的事件 。

#### **2、注册监听器**

**注册监听器有两种方式：**

1、在资源目录中的 META-INF/spring.factories 文件中自动注册：

```java
org.springframework.context.ApplicationListener=\
cn.javastack.springboot.features.listener.JavastackListener
```

复制

2、如果是监听 Spring 应用上下文（ApplicationContext）创建之后的事件，可以直接在监听器上使用 @Component 注解即可，否则需要使用第一种方法的自动注册，因为 ApplicationContext 并未创建，这时的 Bean 是不能被加载的。

#### **3、应用启动**

下面来看下启动日志：

![img](https://ask.qcloudimg.com/http-save/yehe-1344757/6b5tu95qiz.png?imageView2/2/w/1620)

可以看到同时输出了第 6 步和 8 步的监听日志，但只输出第 8 步的启动完成日志，自定义监听实现成功。

## **总结**

了解了 Spring Boot 启动过程中的各个事件及监听机制，大家可以依葫芦画瓢实现 Spring Boot 启动过程中的各个自定义操作，比如说在启动过程上实现动态注册、移除 Bean 等。

一般来说，不建议使用事件和监听器来实现比较耗时和繁重的任务，这样会影响应用程序的正常启动，考虑使用 Spring Boot 的 [**application/ command-line runners**](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484366&idx=1&sn=7dc94038861fe9e10cdf132ffc83092f&scene=21#wechat_redirect) 来进行实现。
