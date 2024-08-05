import{_ as e,c as n,o as a,d as t}from"./app-CbULZrmi.js";const o={},c=t(`<h1 id="添加注解" tabindex="-1"><a class="header-anchor" href="#添加注解"><span>添加注解</span></a></h1><p><code>Java</code>的注解在实际项目中使用得非常的多，特别是在使用了<code>Spring</code>之后。</p><h2 id="注解的语法" tabindex="-1"><a class="header-anchor" href="#注解的语法"><span>注解的语法</span></a></h2><h3 id="注解的例子" tabindex="-1"><a class="header-anchor" href="#注解的例子"><span>注解的例子</span></a></h3><p>以<code>Junit</code>中的<code>@Test</code>注解为例</p><pre><code class="language-java">@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Test {
    long timeout() default 0L;
}
</code></pre><p>可以看到<code>@Test</code>注解上有<code>@Target()</code>和<code>@Retention()</code>两个注解。 这种注解了注解的注解，称之为<strong>元注解</strong>。 跟声明了数据的数据，称为元数据是一种意思。</p><p>之后的注解的格式是</p><pre><code>修饰符 @interface 注解名 {   
    注解元素的声明1 
    注解元素的声明2   
}
</code></pre><p><strong>注解的元素</strong>声明有两种形式</p><pre><code class="language-java">type elementName();
type elementName() default value;  // 带默认值
</code></pre><h2 id="常见的元注解" tabindex="-1"><a class="header-anchor" href="#常见的元注解"><span>常见的元注解</span></a></h2><h3 id="target注解" tabindex="-1"><a class="header-anchor" href="#target注解"><span><code>@Target</code>注解</span></a></h3><p><code>@Target</code>注解用于限制注解能在哪些项上应用，没有加<code>@Target</code>的注解可以应用于任何项上。</p><p>在<code>java.lang.annotation.ElementType</code>类中可以看到所有<code>@Target</code>接受的项</p><ul><li><code>TYPE</code> 在【类、接口、注解】上使用</li><li><code>FIELD</code> 在【字段、枚举常量】上使用</li><li><code>METHOD</code> 在【方法】上使用</li><li><code>PARAMETER</code> 在【参数】上使用</li><li><code>CONSTRUCTOR</code> 在【构造器】上使用</li><li><code>LOCAL_VARIABLE</code> 在【局部变量】上使用</li><li><code>ANNOTATION_TYPE</code> 在【注解】上使用</li><li><code>PACKAGE</code> 在【包】上使用</li><li><code>TYPE_PARAMETER</code> 在【类型参数】上使用 Java 1.8 引入</li><li><code>TYPE_USE</code> 在【任何声明类型的地方】上使用 Java 1.8 引入</li></ul><p><code>@Test</code>注解只允许在方法上使用。</p><pre><code class="language-java">@Target(ElementType.METHOD)
public @interface Test { ... }
</code></pre><p>如果要支持多项，则传入多个值。</p><pre><code class="language-java">@Target({ElementType.TYPE, ElementType.METHOD})
public @interface MyAnnotation { ... }
</code></pre><p>此外元注解也是注解，也符合注解的语法，如<code>@Target</code>注解。 <code>@Target(ElementType.ANNOTATION_TYPE)</code>表明<code>@Target</code>注解只能使用在注解上。</p><pre><code class="language-java">@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Target {
    ElementType[] value();
}
</code></pre><h3 id="retention注解" tabindex="-1"><a class="header-anchor" href="#retention注解"><span><code>@Retention</code>注解</span></a></h3><p><code>@Retention</code>指定注解应该保留多长时间，默认是<code>RetentionPolicy.CLASS</code>。 在<code>java.lang.annotation.RetentionPolicy</code>可看到所有的项</p><ul><li><code>SOURCE</code> 不包含在类文件中</li><li><code>CLASS</code> 包含在类文件中，不载入虚拟机</li><li><code>RUNTIME</code> 包含在类文件中，由虚拟机载入，可以用反射API获取</li></ul><p><code>@Test</code>注解会载入到虚拟机，可以通过代码获取</p><pre><code class="language-java">@Retention(RetentionPolicy.RUNTIME)
public @interface Test { ... }
</code></pre><h3 id="documented注解" tabindex="-1"><a class="header-anchor" href="#documented注解"><span><code>@Documented</code>注解</span></a></h3><p>主要用于归档工具识别。被注解的元素能被<code>Javadoc</code>或类似的工具文档化。</p><h3 id="inherited注解" tabindex="-1"><a class="header-anchor" href="#inherited注解"><span><code>@Inherited</code>注解</span></a></h3><p>添加了<code>@Inherited</code>注解的注解，所注解的类的子类也将拥有这个注解</p><p>注解</p><pre><code class="language-java">@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface MyAnnotation { ... }
</code></pre><p>父类</p><pre><code>@MyAnnotation 
class Parent { ... }
</code></pre><p>子类<code>Child</code>会把加在<code>Parent</code>上的<code>@MyAnnotation</code>继承下来</p><pre><code class="language-java">class Child extends Parent { ... }
</code></pre><blockquote><p>tip： 在接口上添加注解，然后类实现了接口，类不会拥有接口上的注解。 抽象类添加了注解，并且这个注解是可继承的，那么抽象类的子类拥有抽象类注解。</p></blockquote><h3 id="repeatable注解" tabindex="-1"><a class="header-anchor" href="#repeatable注解"><span><code>@Repeatable</code>注解</span></a></h3><p>Java 1.8 引入的注解，标识注解是可重复使用的。</p><p>注解1</p><pre><code class="language-java">public @interface MyAnnotations {   
    MyAnnotation[] value();   
}
</code></pre><p>注解2</p><pre><code class="language-java">@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {   
    int value();
}
</code></pre><p>有使用<code>@Repeatable()</code>时的使用</p><pre><code class="language-java">@MyAnnotation(1)
@MyAnnotation(2)
@MyAnnotation(3)
public class MyTest { ... }
</code></pre><p>没使用<code>@Repeatable()</code>时的使用，<code>@MyAnnotation</code>去掉<code>@Repeatable</code>元注解</p><pre><code class="language-java">@MyAnnotations({
    @MyAnnotation(1), 
    @MyAnnotation(2),
    @MyAnnotation(3)})
public class MyTest { ... }
</code></pre><p>这个注解还是非常有用的，让我们的代码变得简洁不少， <code>Spring</code>的<code>@ComponentScan</code>，<code>@PropertySource</code>注解也用到这个元注解。</p><h2 id="元素的类型" tabindex="-1"><a class="header-anchor" href="#元素的类型"><span>元素的类型</span></a></h2><h3 id="支持的元素类型" tabindex="-1"><a class="header-anchor" href="#支持的元素类型"><span>支持的元素类型</span></a></h3><ul><li>8种基本数据类型（<code>byte</code>，<code>short</code>，<code>char</code>，<code>int</code>，<code>long</code>，<code>float</code>，<code>double</code>，<code>boolean</code>）</li><li><code>String</code></li><li><code>Class</code></li><li><code>enum</code></li><li>注解类型</li><li>数组（所有上边类型的数组）</li></ul><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h3><p>枚举类</p><pre><code class="language-java">public enum Status {
    GOOD,
    BAD
}
</code></pre><p>注解1</p><pre><code class="language-java">@Target(ElementType.ANNOTATION_TYPE)
public @interface MyAnnotation1 {
    int val();
}
</code></pre><p>注解2</p><pre><code class="language-java">@Target(ElementType.TYPE)
public @interface MyAnnotation2 {
    
    boolean boo() default false;
    
    Class&lt;?&gt; cla() default Void.class;
    
    Status enu() default Status.GOOD;
    
    MyAnnotation1 anno() default @MyAnnotation1(val = 1);
    
    String[] arr();
    
}
</code></pre><p>使用时，无默认值的元素必须传值</p><pre><code class="language-java">@MyAnnotation2(
        cla = String.class,
        enu = Status.BAD,
        anno = @MyAnnotation1(val = 2),
        arr = {&quot;a&quot;, &quot;b&quot;})
public class MyTest { ... }
</code></pre><h2 id="java内置的注解" tabindex="-1"><a class="header-anchor" href="#java内置的注解"><span><code>Java</code>内置的注解</span></a></h2><h3 id="override注解" tabindex="-1"><a class="header-anchor" href="#override注解"><span><code>@Override</code>注解</span></a></h3><p>告诉编译器这个是个覆盖父类的方法。如果父类删除了该方法，则子类会报错。</p><h3 id="deprecated注解" tabindex="-1"><a class="header-anchor" href="#deprecated注解"><span><code>@Deprecated</code>注解</span></a></h3><p>表示被注解的元素已被弃用。</p><h3 id="suppresswarnings注解" tabindex="-1"><a class="header-anchor" href="#suppresswarnings注解"><span><code>@SuppressWarnings</code>注解</span></a></h3><p>告诉编译器忽略警告。</p><h3 id="functionalinterface注解" tabindex="-1"><a class="header-anchor" href="#functionalinterface注解"><span><code>@FunctionalInterface</code>注解</span></a></h3><p>Java 1.8 引入的注解。该注释会强制编译器<code>javac</code>检查一个接口是否符合函数接口的标准。</p><h2 id="特别的注解" tabindex="-1"><a class="header-anchor" href="#特别的注解"><span>特别的注解</span></a></h2><p>有两种比较特别的注解</p><ul><li>标记注解 ： 注解中没有任何元素，使用时直接是 <code>@XxxAnnotation</code>, 不需要加括号</li><li>单值注解 ： 注解只有一个元素，且名字为<code>value</code>，使用时直接传值，不需要指定元素名<code>@XxxAnnotation(100)</code></li></ul><h2 id="利用反射获取注解" tabindex="-1"><a class="header-anchor" href="#利用反射获取注解"><span>利用反射获取注解</span></a></h2><p><code>Java</code>的<code>AnnotatedElement</code>接口中有<code>getAnnotation()</code>等获取注解的方法。 而<code>Method</code>，<code>Field</code>，<code>Class</code>，<code>Package</code>等类均实现了这个接口，因此均有获取注解的能力。</p><h3 id="例子-1" tabindex="-1"><a class="header-anchor" href="#例子-1"><span>例子</span></a></h3><h4 id="注解" tabindex="-1"><a class="header-anchor" href="#注解"><span>注解</span></a></h4><pre><code class="language-java">@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.FIELD, ElementType.METHOD})
public @interface MyAnno {   
    String value();   
}
</code></pre><h4 id="被注解的元素" tabindex="-1"><a class="header-anchor" href="#被注解的元素"><span>被注解的元素</span></a></h4><pre><code class="language-java">@MyAnno(&quot;class&quot;)
public class MyClass {
    
    @MyAnno(&quot;feild&quot;)
    private String str;
    
    @MyAnno(&quot;method&quot;)
    public void method() { }
    
}
</code></pre><h4 id="获取注解" tabindex="-1"><a class="header-anchor" href="#获取注解"><span>获取注解</span></a></h4><pre><code class="language-java">public class Test {
    
    public static void main(String[] args) throws Exception {
    
        MyClass obj = new MyClass();
        Class&lt;?&gt; clazz = obj.getClass();
        
        // 获取对象上的注解
        MyAnno anno = clazz.getAnnotation(MyAnno.class);
        System.out.println(anno.value());
        
        // 获取属性上的注解
        Field field = clazz.getDeclaredField(&quot;str&quot;);
        anno = field.getAnnotation(MyAnno.class);
        System.out.println(anno.value());
        
        // 获取方法上的注解
        Method method = clazz.getMethod(&quot;method&quot;);
        anno = method.getAnnotation(MyAnno.class);
        System.out.println(anno.value());
    }
    
}
</code></pre><h2 id="在spring中使用自定义注解" tabindex="-1"><a class="header-anchor" href="#在spring中使用自定义注解"><span>在<code>Spring</code>中使用自定义注解</span></a></h2><blockquote><p>注解本身不会有任何的作用，需要有其他代码或工具的支持才有用。</p></blockquote><h3 id="需求" tabindex="-1"><a class="header-anchor" href="#需求"><span>需求</span></a></h3><p>设想现有这样的需求，程序需要接收不同的命令<code>CMD</code>， 然后根据命令调用不同的处理类<code>Handler</code>。 很容易就会想到用<code>Map</code>来存储命令和处理类的映射关系。</p><p>由于项目可能是多个成员共同开发，不同成员实现各自负责的命令的处理逻辑。 因此希望开发成员只关注<code>Handler</code>的实现，不需要主动去<code>Map</code>中注册<code>CMD</code>和<code>Handler</code>的映射。</p><h3 id="最终效果" tabindex="-1"><a class="header-anchor" href="#最终效果"><span>最终效果</span></a></h3><p>最终希望看到效果是这样的</p><pre><code class="language-java">@CmdMapping(Cmd.LOGIN)
public class LoginHandler implements ICmdHandler {
    @Override
    public void handle() {
        System.out.println(&quot;handle login request&quot;);
    }
}

@CmdMapping(Cmd.LOGOUT)
public class LogoutHandler implements ICmdHandler {
    @Override
    public void handle() {
        System.out.println(&quot;handle logout request&quot;);
    }
}
</code></pre><p>开发人员增加自己的<code>Handler</code>，只需要创建新的类并注上<code>@CmdMapping(Cmd.Xxx)</code>即可。</p><h3 id="具体做法" tabindex="-1"><a class="header-anchor" href="#具体做法"><span>具体做法</span></a></h3><p>具体的实现是使用<code>Spring</code>和一个自定义的注解 定义<code>@CmdMapping</code>注解</p><pre><code class="language-java">@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component
public @interface CmdMapping {
    int value();   
}
</code></pre><p><code>@CmdMapping</code>中有一个<code>int</code>类型的元素<code>value</code>，用于指定<code>CMD</code>。这里做成一个单值注解。 这里还加了<code>Spring</code>的<code>@Component</code>注解，因此注解了<code>@CmdMapping</code>的类也会被Spring创建实例。</p><p>然后是<code>CMD</code>接口，存储命令。</p><pre><code class="language-java">public interface Cmd {
    int REGISTER = 1;
    int LOGIN    = 2;
    int LOGOUT   = 3;
}
</code></pre><p>之后是处理类接口，现实情况接口会复杂得多，这里简化了。</p><pre><code class="language-java">public interface ICmdHandler { 
    void handle();   
}
</code></pre><p>上边说过，注解本身是不起作用的，需要其他的支持。下边就是让注解生效的部分了。 使用时调用<code>handle()</code>方法即可。</p><pre><code class="language-java">@Component
public class HandlerDispatcherServlet implements 
    InitializingBean, ApplicationContextAware {

    private ApplicationContext context;

    private Map&lt;Integer, ICmdHandler&gt; handlers = new HashMap&lt;&gt;();
    
    public void handle(int cmd) {
        handlers.get(cmd).handle();
    }
    
    public void afterPropertiesSet() {
        
        String[] beanNames = this.context.getBeanNamesForType(Object.class);

        for (String beanName : beanNames) {
            
            if (ScopedProxyUtils.isScopedTarget(beanName)) {
                continue;
            }
            
            Class&lt;?&gt; beanType = this.context.getType(beanName);
            
            if (beanType != null) {
                
                CmdMapping annotation = AnnotatedElementUtils.findMergedAnnotation(
                        beanType, CmdMapping.class);
                
                if(annotation != null) {
                    handlers.put(annotation.value(), (ICmdHandler) context.getBean(beanType));
                }
            }
        }
        
    }

    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {   
        this.context = applicationContext;
    }

}
</code></pre><p>主要工作都是<code>Spring</code>做，这里只是将实例化后的对象<code>put</code>到<code>Map</code>中。</p><p>测试代码</p><pre><code class="language-java">@ComponentScan(&quot;pers.custom.annotation&quot;)
public class Main {

    public static void main(String[] args) {
        
        AnnotationConfigApplicationContext context 
            = new AnnotationConfigApplicationContext(Main.class);
            
        HandlerDispatcherServlet servlet = context.getBean(HandlerDispatcherServlet.class);
        
        servlet.handle(Cmd.REGISTER);
        servlet.handle(Cmd.LOGIN);
        servlet.handle(Cmd.LOGOUT);

        context.close();
    }
}
</code></pre><p><a href="https://github.com/luolanmeet/java-learn/tree/master/spring/spring-annotation" target="_blank" rel="noopener noreferrer">&gt; 完整项目</a></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>可以看到使用注解能够写出很灵活的代码，注解也特别适合做为使用框架的一种方式。 所以学会使用注解还是很有用的，毕竟这对于上手框架或实现自己的框架都是非常重要的知识。</p>`,107),l=[c];function d(i,r){return a(),n("div",null,l)}const s=e(o,[["render",d],["__file","add-annotation.html.vue"]]),h=JSON.parse('{"path":"/java-tutor/springboot/add-annotation.html","title":"添加注解","lang":"zh-CN","frontmatter":{"description":"添加注解 Java的注解在实际项目中使用得非常的多，特别是在使用了Spring之后。 注解的语法 注解的例子 以Junit中的@Test注解为例 可以看到@Test注解上有@Target()和@Retention()两个注解。 这种注解了注解的注解，称之为元注解。 跟声明了数据的数据，称为元数据是一种意思。 之后的注解的格式是 注解的元素声明有两种形式...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/add-annotation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"添加注解"}],["meta",{"property":"og:description","content":"添加注解 Java的注解在实际项目中使用得非常的多，特别是在使用了Spring之后。 注解的语法 注解的例子 以Junit中的@Test注解为例 可以看到@Test注解上有@Target()和@Retention()两个注解。 这种注解了注解的注解，称之为元注解。 跟声明了数据的数据，称为元数据是一种意思。 之后的注解的格式是 注解的元素声明有两种形式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T12:34:23.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T12:34:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"添加注解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T12:34:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"注解的语法","slug":"注解的语法","link":"#注解的语法","children":[{"level":3,"title":"注解的例子","slug":"注解的例子","link":"#注解的例子","children":[]}]},{"level":2,"title":"常见的元注解","slug":"常见的元注解","link":"#常见的元注解","children":[{"level":3,"title":"@Target注解","slug":"target注解","link":"#target注解","children":[]},{"level":3,"title":"@Retention注解","slug":"retention注解","link":"#retention注解","children":[]},{"level":3,"title":"@Documented注解","slug":"documented注解","link":"#documented注解","children":[]},{"level":3,"title":"@Inherited注解","slug":"inherited注解","link":"#inherited注解","children":[]},{"level":3,"title":"@Repeatable注解","slug":"repeatable注解","link":"#repeatable注解","children":[]}]},{"level":2,"title":"元素的类型","slug":"元素的类型","link":"#元素的类型","children":[{"level":3,"title":"支持的元素类型","slug":"支持的元素类型","link":"#支持的元素类型","children":[]},{"level":3,"title":"例子","slug":"例子","link":"#例子","children":[]}]},{"level":2,"title":"Java内置的注解","slug":"java内置的注解","link":"#java内置的注解","children":[{"level":3,"title":"@Override注解","slug":"override注解","link":"#override注解","children":[]},{"level":3,"title":"@Deprecated注解","slug":"deprecated注解","link":"#deprecated注解","children":[]},{"level":3,"title":"@SuppressWarnings注解","slug":"suppresswarnings注解","link":"#suppresswarnings注解","children":[]},{"level":3,"title":"@FunctionalInterface注解","slug":"functionalinterface注解","link":"#functionalinterface注解","children":[]}]},{"level":2,"title":"特别的注解","slug":"特别的注解","link":"#特别的注解","children":[]},{"level":2,"title":"利用反射获取注解","slug":"利用反射获取注解","link":"#利用反射获取注解","children":[{"level":3,"title":"例子","slug":"例子-1","link":"#例子-1","children":[{"level":4,"title":"注解","slug":"注解","link":"#注解","children":[]},{"level":4,"title":"被注解的元素","slug":"被注解的元素","link":"#被注解的元素","children":[]},{"level":4,"title":"获取注解","slug":"获取注解","link":"#获取注解","children":[]}]}]},{"level":2,"title":"在Spring中使用自定义注解","slug":"在spring中使用自定义注解","link":"#在spring中使用自定义注解","children":[{"level":3,"title":"需求","slug":"需求","link":"#需求","children":[]},{"level":3,"title":"最终效果","slug":"最终效果","link":"#最终效果","children":[]},{"level":3,"title":"具体做法","slug":"具体做法","link":"#具体做法","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1711283663000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":6.33,"words":1898},"filePathRelative":"java-tutor/springboot/add-annotation.md","localizedDate":"2022年3月21日","autoDesc":true}');export{s as comp,h as data};
