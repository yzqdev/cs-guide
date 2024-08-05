import{_ as e,c as t,o as a,d as i}from"./app-CbULZrmi.js";const r={},l=i(`<h1 id="java抽象类" tabindex="-1"><a class="header-anchor" href="#java抽象类"><span>java抽象类</span></a></h1><p>我们从我们实际设计场景中来切入这个话题</p><p>先来举一个简单的例子：</p><p>狗都具有 eat() 、sleep() 方法，我们分别通过抽象类和接口定义这个抽象概念</p><pre><code class="language-java">  //通过抽象类定义
  public abstract class Dog {
      public abstract void eat();
      public abstract void sleep();  
  }
  
  //通过接口定义
  public interface Dog {
      public abstract void eat();
      public abstract void sleep();
  }
</code></pre><p>但是我们现在如果需要让狗拥有一项特殊的技能——钻火圈 DrillFireCircle()，如何增加这个行为呢？</p><p>思考：</p><ol><li>将钻火圈方法与前面两个方法一同写入抽象类中，但是这样的话，但凡继承这个抽象类狗都具有了钻火圈技能，明显不合适</li><li>将钻火圈方法与前面两个方法一同写入接口中，当需要使用钻火圈功能的时候，就必须实现 接口中的eat() 、sleep() 方法（重写该接口中所有的方法）显然也不合适</li></ol><p>那么该如何解决呢 ? 我们可以仔细想一想,eat和sleep都是狗本身所应该具有的一种行为,而钻火圈这种行为则是后天训练出来的,只能算是对狗类的一种附加或者延伸, 两者不应该在同一个范畴内,所以我们考虑将这个单独的行为,独立的设计一个接口,其中包含DrillFireCircle()方法, Dog设计为一个抽象类, 其中又包括eat() 、sleep() 方法.</p><p>一个SpecialDog即可继承Dog类并且实现DrillFireCircle()接口</p><p>下面给出代码:</p><pre><code class="language-java">  //定义接口，含有钻火圈方法
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
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span><strong>总结：</strong></span></a></h2><p>继承是一个 &quot;是不是&quot;的关系，而 接口 实现则是 &quot;有没有&quot;的关系。如果一个类继承了某个抽象类，则子类必定是抽象类的种类，而接口实现则是有没有、具备不具备的关系，比如狗是否能钻火圈，能则可以实现这个接口，不能就不实现这个接口。</p>`,14),c=[l];function o(n,p){return a(),t("div",null,c)}const d=e(r,[["render",o],["__file","abstract-class.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/java-tips/abstract-class.html","title":"java抽象类","lang":"zh-CN","frontmatter":{"description":"java抽象类 我们从我们实际设计场景中来切入这个话题 先来举一个简单的例子： 狗都具有 eat() 、sleep() 方法，我们分别通过抽象类和接口定义这个抽象概念 但是我们现在如果需要让狗拥有一项特殊的技能——钻火圈 DrillFireCircle()，如何增加这个行为呢？ 思考： 将钻火圈方法与前面两个方法一同写入抽象类中，但是这样的话，但凡继承...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/abstract-class.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java抽象类"}],["meta",{"property":"og:description","content":"java抽象类 我们从我们实际设计场景中来切入这个话题 先来举一个简单的例子： 狗都具有 eat() 、sleep() 方法，我们分别通过抽象类和接口定义这个抽象概念 但是我们现在如果需要让狗拥有一项特殊的技能——钻火圈 DrillFireCircle()，如何增加这个行为呢？ 思考： 将钻火圈方法与前面两个方法一同写入抽象类中，但是这样的话，但凡继承..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java抽象类\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"总结：","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.9,"words":570},"filePathRelative":"java-tutor/java-tips/abstract-class.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,u as data};
