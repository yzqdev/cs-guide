import{_ as n,c as e,o as t,d as a}from"./app-CbULZrmi.js";const i={},r=a(`<h1 id="匿名类教程" tabindex="-1"><a class="header-anchor" href="#匿名类教程"><span>匿名类教程</span></a></h1><p>匿名内部类也就是没有名字的内部类</p><p>正因为没有名字，所以匿名内部类只能使用一次，它通常用来简化代码编写</p><p>但使用匿名内部类还有个前提条件：必须继承一个父类或实现一个接口</p><h2 id="解读" tabindex="-1"><a class="header-anchor" href="#解读"><span>解读</span></a></h2><h3 id="实例1-不使用匿名内部类来实现抽象方法" tabindex="-1"><a class="header-anchor" href="#实例1-不使用匿名内部类来实现抽象方法"><span>实例1:不使用匿名内部类来实现抽象方法</span></a></h3><pre><code class="language-java">abstract class Person {
    public abstract void eat();
}
 
class Child extends Person {
    public void eat() {
        System.out.println(&quot;eat something&quot;);
    }
}
 
public class Demo {
    public static void main(String[] args) {
        Person p = new Child();
        p.eat();
    }
}
</code></pre><p>**运行结果：**eat something</p><p>可以看到，我们用Child继承了Person类，然后实现了Child的一个实例，将其向上转型为Person类的引用</p><p>但是，如果此处的Child类只使用一次，那么将其编写为独立的一个类岂不是很麻烦？</p><p>这个时候就引入了匿名内部类</p><p><strong>实例2：匿名内部类的基本实现</strong></p><pre><code class="language-java">abstract class Person {
    public abstract void eat();
}
 
public class Demo {
    public static void main(String[] args) {
        Person p = new Person() {
            public void eat() {
                System.out.println(&quot;eat something&quot;);
            }
        };
        p.eat();
    }
}
</code></pre><p>**运行结果：**eat something</p><p>可以看到，我们直接将抽象类Person中的方法在大括号中实现了</p><p>这样便可以省略一个类的书写</p><p>并且，匿名内部类还能用于接口上</p><h3 id="实例3-在接口上使用匿名内部类" tabindex="-1"><a class="header-anchor" href="#实例3-在接口上使用匿名内部类"><span>实例3：在接口上使用匿名内部类</span></a></h3><pre><code class="language-java">interface Person {
    public void eat();
}
 
public class Demo {
    public static void main(String[] args) {
        Person p = new Person() {
            public void eat() {
                System.out.println(&quot;eat something&quot;);
            }
        };
        p.eat();
    }
}
</code></pre><p>**运行结果：**eat something</p><p>由上面的例子可以看出，只要一个类是抽象的或是一个接口，那么其子类中的方法都可以使用匿名内部类来实现</p><p>最常用的情况就是在多线程的实现上，因为要实现多线程必须继承Thread类或是继承Runnable接口</p><h3 id="实例4-thread类的匿名内部类实现" tabindex="-1"><a class="header-anchor" href="#实例4-thread类的匿名内部类实现"><span>实例4：Thread类的匿名内部类实现</span></a></h3><pre><code class="language-java">
public class Demo {
    public static void main(String[] args) {
        Thread t = new Thread() {
            public void run() {
                for (int i = 1; i &lt;= 5; i++) {
                    System.out.print(i + &quot; &quot;);
                }
            }
        };
        t.start();
    }
}
</code></pre><p>**运行结果：**1 2 3 4 5</p><h3 id="实例5-runnable接口的匿名内部类实现" tabindex="-1"><a class="header-anchor" href="#实例5-runnable接口的匿名内部类实现"><span>实例5：Runnable接口的匿名内部类实现</span></a></h3><pre><code class="language-java">public class Demo {
    public static void main(String[] args) {
        Runnable r = new Runnable() {
            public void run() {
                for (int i = 1; i &lt;= 5; i++) {
                    System.out.print(i + &quot; &quot;);
                }
            }
        };
        Thread t = new Thread(r);
        t.start();
    }
}
</code></pre><p>**运行结果：**1 2 3 4 5</p><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h2><pre><code class="language-java">package com.site.blog.util;

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
    interface Predicte&lt;String&gt; {
        Boolean test(String s);
    }

    public static List&lt;String&gt; filter(List&lt;String&gt; fruit, Predicte&lt;String&gt; predicte) {
        List&lt;String&gt; f = new ArrayList&lt;&gt;();
        for (String s : fruit) {
            if (predicte.test(s)) {

                f.add(s);
            }
        }
        return f;
    }

    public static void main(String[] args) {
        List&lt;String&gt; fruit= Arrays.asList(&quot;香蕉&quot;,&quot;苹果&quot;,&quot;火龙果&quot;,&quot;落落莓&quot;,&quot;鸣草&quot;);
        List&lt;String &gt; newFruit=filter(fruit, new Predicte&lt;String&gt;() {
            @Override
            public Boolean test(String s) {
                return s.length()==2;
            }
        });
        //List&lt;String&gt; newFruit=filter(fruit,s-&gt;s.length()==2)
    }
}

</code></pre><h2 id="例子-1" tabindex="-1"><a class="header-anchor" href="#例子-1"><span>例子</span></a></h2><p>首先我们来看一个代码，计算一个方法执行了多少秒! 其实大多数人都会写。像这样：</p><pre><code class="language-java">public static void test() {
    long start = System.currentTimeMillis();
    //执行打印的业务逻辑
    for (int i = 0; i &lt; 10; i++) {
        System.out.println(i);
    }
    long end = System.currentTimeMillis();
    System.out.println(end - start);
}
</code></pre><p>这只是打印的业务逻辑，然而我们也想要统计其它方法的执行时间，那么也需要把除去业务的那几行代码一一复制过去吗？那样太傻了，实际情况中除去业务代码可能非常的长，并且会要是遇到需求变更或者那几行代码出错了都得重新再复制一遍。那样不是得不偿失吗！ 能不能将业务代码直接抽取成一段参数呢？很遗憾做不到！ 不过可以将这段代码抽取成一个类，或者一个接口的方法。像这样：</p><pre><code class="language-java">public static void test(MyService myService) {
    long start = System.currentTimeMillis();
    //执行打印的业务逻辑
    myService.invoke();
    long end = System.currentTimeMillis();
    System.out.println(end - start);
}
</code></pre><p>看到没有，我将这段代码抽取成了MyService的invoke()方法，MyService长这样：</p><pre><code class="language-java">public interface MyService {
    public void invoke();
}
</code></pre><p>那么调用的时候就可以这样写了：</p><pre><code class="language-java">public static void main(String[] args) {
     test(new MyService() {
         @Override
         public void invoke() {
             for (int i = 0; i &lt; 10; i++) {
                 System.out.println(i);
             }
         }
     });
}
</code></pre><p>这样只要在调用的时候将MyService的invoke方法重写，就能实现各种业务逻辑并统计执行的时间啦。并且我们也不用再写前后那一段统计时间的重复代码了，因为它已经封装进test方法里面了！ 有人会问这样有必要吗？只是实现了一个计时功能， 假设这段代码不是计时，而是其它更长更复杂但是不会变动的代码，那么你会觉得这么写是值得的。 然而有人会质问这样写起来是不是太丑了！java8中可以用lambda替换匿名内部类，所以你要是用的java8的话可以还这么写：</p><pre><code class="language-java">public static void main(String[] args) {
     test(() -&gt; {
         for (int i = 0; i &lt; 10; i++) {
             System.out.println(i);
         }
     });
}
</code></pre><p>这样是不是简单得多了呢！是的，不过请注意：<strong>lambda表达只能替换</strong><strong>只有一个抽象方法的接口,只有一个抽象方法的接口,只有一个抽象方法的接口</strong>，重要的事情说三遍：如果我在MyService中又添加了一个抽象方法invoke2()，那么编译是不通过的.但是如果我想添加一个<strong>default</strong>修饰符的方法，又可以了，具体原因我就不多解释了，有兴趣的自己可以百度一下 （java8还有一些内置的函数接口可以直接拿来用，这样就可以不用自己再写一些多余的接口了）。 其实说白了，如果你觉得需要将一段非常长的方法中抽取出一个或者多个可能会变动的代码片段，你就可以重构为接口的一个个方法，待调用的时候用匿名内部类重写方法就可以了。 其实jdbc的获取连接以及关闭资源这一块是所有方法通用的，大家不妨尝试用我的方法练练手如何将这两个步骤省略掉，只留下核心的业务逻辑。</p>`,42),s=[r];function o(l,c){return t(),e("div",null,s)}const d=n(i,[["render",o],["__file","anonymous-inner-class.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/java-tips/anonymous-inner-class.html","title":"匿名类教程","lang":"zh-CN","frontmatter":{"description":"匿名类教程 匿名内部类也就是没有名字的内部类 正因为没有名字，所以匿名内部类只能使用一次，它通常用来简化代码编写 但使用匿名内部类还有个前提条件：必须继承一个父类或实现一个接口 解读 实例1:不使用匿名内部类来实现抽象方法 **运行结果：**eat something 可以看到，我们用Child继承了Person类，然后实现了Child的一个实例，将其...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/anonymous-inner-class.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"匿名类教程"}],["meta",{"property":"og:description","content":"匿名类教程 匿名内部类也就是没有名字的内部类 正因为没有名字，所以匿名内部类只能使用一次，它通常用来简化代码编写 但使用匿名内部类还有个前提条件：必须继承一个父类或实现一个接口 解读 实例1:不使用匿名内部类来实现抽象方法 **运行结果：**eat something 可以看到，我们用Child继承了Person类，然后实现了Child的一个实例，将其..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"匿名类教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"解读","slug":"解读","link":"#解读","children":[{"level":3,"title":"实例1:不使用匿名内部类来实现抽象方法","slug":"实例1-不使用匿名内部类来实现抽象方法","link":"#实例1-不使用匿名内部类来实现抽象方法","children":[]},{"level":3,"title":"实例3：在接口上使用匿名内部类","slug":"实例3-在接口上使用匿名内部类","link":"#实例3-在接口上使用匿名内部类","children":[]},{"level":3,"title":"实例4：Thread类的匿名内部类实现","slug":"实例4-thread类的匿名内部类实现","link":"#实例4-thread类的匿名内部类实现","children":[]},{"level":3,"title":"实例5：Runnable接口的匿名内部类实现","slug":"实例5-runnable接口的匿名内部类实现","link":"#实例5-runnable接口的匿名内部类实现","children":[]}]},{"level":2,"title":"例子","slug":"例子","link":"#例子","children":[]},{"level":2,"title":"例子","slug":"例子-1","link":"#例子-1","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5,"words":1501},"filePathRelative":"java-tutor/java-tips/anonymous-inner-class.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,u as data};
