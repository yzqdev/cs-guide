import{_ as o,c as t,o as e,d as n}from"./app-CbULZrmi.js";const a={},r=n(`<h1 id="依赖注入的简单理解" tabindex="-1"><a class="header-anchor" href="#依赖注入的简单理解"><span>依赖注入的简单理解</span></a></h1><p>所谓依赖，举个例子说明，一个类Person，另一个类Car，如果Person的某个方法比如说drive，需要引用Car，则称Person类依赖于 Car类，延伸到对象，这种依赖关系依然成立，比如说Person类的对象boy依赖于Car类的对象toyota。再讲讲这个drive方法的实现，假定代码如下：</p><pre><code class="language-java">Public Person{
...
public void drive(){
  Car toyota=new Car(&quot;TOYOTA&quot;);
  toyota.挂档;
  toyota.踩油门;
  toyota.打方向;
}
}
</code></pre><p>这其中的依赖关系，就导致了对象boy需要负责对象toyota的创建，甚至是整个生命周期的管理，而这样显然会带来耦合度高，不易维护等缺点，比如说要让这个男孩驾驶一辆Audi，则还需要修改类Person的代码。 因此在java的设计理论中就提出了一条非常著名的原则，依赖倒转原则（Dependence Inversion），其核心思想就是要将这种具体类之间的依赖，尽量转换成抽象依赖，也就是说类Person应该依赖于抽象类ICar，而不是具体的类 Car，这里java就大力推荐了抽象和接口的使用，至于抽象和接口之间的区别，任何一本JAVA书籍都有介绍，这里就不再说了。</p><p>这个依赖倒转原则在设计模式也体现得非常多，比如说工厂模式和构建模式，个人认为控制反转IoC，其实也可以认为是实现这个原则的一种设计模式。控制反转，其中的控制这个词一直不太理解是什么意思，不过控制反转的另外一种说法也就是依赖注入（dependence injection），个人觉得更易于理解。还是以上文的boy与toyota为例，其核心就是要将boy依赖的对象toyota注入到boy中去，而无需boy自己去引用toyota，这个注入的过程，通常是由一个控制程序来完成的，无需对象去关心，举例如下：</p><pre><code class="language-java">Public Person{
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
</code></pre><p>这个时候，进行注入并且调用的过程，就很简单了，如下：</p><pre><code class="language-java">Toyota toyota=new Toyota();
Person boy=new Person(toyota);
boy.drive();
</code></pre><p>注：这里我们假定，Toyota类是ICar接口类的一个具体实现。 这个例子就演示一个最简单的注入方式的例子，也就是构造子方式注入，通过将依赖对象注入到对象的构造子中来实现。另外还有一种常用的注入方式，就是属性方式注入，意思就是通过将依赖对象注入到对象的属性中来实现，还是以boy和toyota的例子说明，如下：</p><pre><code class="language-java">Public Person{
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
</code></pre><p>这个时候，进行注入并且调用的过程，就变成如下所示：</p><pre><code class="language-java">Toyota toyota=new Toyota();
Person boy=new Person();
boy.setCar(toyota);
boy.drive();
</code></pre><p>至此依赖注入的概念应该比较清楚了，再来看看在Spring中如何实现IoC的，看看Spring如何作为一个成熟的IoC容器，Spring中其实主要通过两个概念来实现IoC，首先通过XML配置文件，将对象和依赖对象都配置到某个XML文件中，当然该XML文件需要符合Spring指定的规范，然后通过架构中的BeanFactroy类，来自动实现上文所述注入过程，还是以boy与toyota为例，如下： 首先，Person类还是一样的， 然后xml配置文件增加点东西-（假定为bean.xml）：</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;GBK&quot;?&gt;
&lt;!DOCTYPE beans PUBLIC &quot;-//SPRING/DTD BEAN/EN&quot;
    &quot;http://www.springframework.org/dtd/spring-beans.dtd&quot;&gt;
&lt;beans&gt;
   &lt;bean id=&quot;oneCar&quot; class=&quot;Toyota&quot;&gt; &lt;!-- Toyota类是ICar的一个实现--&gt;
   &lt;/bean&gt;
   &lt;bean id=&quot;onePerson&quot; class=&quot;Person&quot;&gt; &lt;!--本例以属性方式注入为例 --&gt;
       &lt;property name=&quot;car&quot;&gt; 
           &lt;ref bean=&quot;oneCar&quot;&gt;&lt;/ref&gt;
       &lt;/property&gt;
   &lt;/bean&gt;
&lt;/beans&gt;
</code></pre><p>最后，调用的过程，就变成如下：</p><pre><code class="language-java">BeanFactory factory=new XmlBeanFactory(&quot;bean.xml&quot;);
Person boy=(Person )factory.getBean(&quot;onePerson&quot;);
boy.drive();
</code></pre>`,16),c=[r];function i(s,p){return e(),t("div",null,c)}const l=o(a,[["render",i],["__file","ioc-tutor.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/springboot/spring-why/ioc-tutor.html","title":"依赖注入的简单理解","lang":"zh-CN","frontmatter":{"description":"依赖注入的简单理解 所谓依赖，举个例子说明，一个类Person，另一个类Car，如果Person的某个方法比如说drive，需要引用Car，则称Person类依赖于 Car类，延伸到对象，这种依赖关系依然成立，比如说Person类的对象boy依赖于Car类的对象toyota。再讲讲这个drive方法的实现，假定代码如下： 这其中的依赖关系，就导致了对象...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/spring-why/ioc-tutor.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"依赖注入的简单理解"}],["meta",{"property":"og:description","content":"依赖注入的简单理解 所谓依赖，举个例子说明，一个类Person，另一个类Car，如果Person的某个方法比如说drive，需要引用Car，则称Person类依赖于 Car类，延伸到对象，这种依赖关系依然成立，比如说Person类的对象boy依赖于Car类的对象toyota。再讲讲这个drive方法的实现，假定代码如下： 这其中的依赖关系，就导致了对象..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-29T06:47:23.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-29T06:47:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"依赖注入的简单理解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-29T06:47:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1711694843000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":3.41,"words":1022},"filePathRelative":"java-tutor/springboot/spring-why/ioc-tutor.md","localizedDate":"2022年3月21日","autoDesc":true}');export{l as comp,u as data};
