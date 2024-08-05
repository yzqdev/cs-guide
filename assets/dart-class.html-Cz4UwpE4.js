import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const o="/cs-guide/assets/2bc3bfa15c-B-ssQXfh.jpeg",r={},d=a(`<h1 id="dart基础2" tabindex="-1"><a class="header-anchor" href="#dart基础2"><span>dart基础2</span></a></h1><h2 id="类和对象" tabindex="-1"><a class="header-anchor" href="#类和对象"><span>类和对象</span></a></h2><h3 id="类的定义" tabindex="-1"><a class="header-anchor" href="#类的定义"><span>类的定义</span></a></h3><pre><code class="language-dart">// Dart中定义一个类
class Person {
  String name;
  int age;

  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
}
</code></pre><p>Dart中的类与Java中的相似，不同的是，Dart中没有<code>private</code>、<code>public</code>这些成员访问修饰符。如果是类私有的成员，不希望外面访问，只需要在成员变量之前加上一个下划线<code>_</code>变为私有即可。</p><p>以上代码，在Dart中还有一种简化写法，可以自动在构造方法中对成员变量初始化。</p><pre><code class="language-dart">// Dart中定义一个类
class  Person {
    String name;
    int age;

    // 在构造方法中初始化成员变量时，可使用如下写法简化
    Person(this.name, this.age);

    // 如需处理其他变量时，也可单独对其操作
    // Person(this.name, this.age, String address){
    //     print(address);
    // }
    // 注意，构造方法不能重载，以上注释掉
}
</code></pre><p>另外还需要注意一点，Dart中没有构造方法的重载，不能写两个同名的构造方法。</p><h3 id="getters-和-setters方法" tabindex="-1"><a class="header-anchor" href="#getters-和-setters方法"><span>Getters 和 Setters方法</span></a></h3><p>在Java中，一般不会直接在类的外部去访问类成员，通常使用setter和getter方法来操作类的成员变量。而在Dart语言中，所有类中都包含隐式的getter方法，对于非<code>final</code>修饰的成员，类中还包含隐式的setter方法。这就意味着，在Dart中，你可以直接在类外部通过<code>.</code>操作符访问类成员。这一特点使得Dart语法更加简洁，不会写出满屏的setXXX、getXXX方法。</p><p>当然，很多时候我们调用setter和getter方法并不仅仅是为了赋值和访问，而是为了一些额外的处理，这时候我们只需要使用<code>set</code>与<code>get</code>关键字实现setter和getter方法即可。</p><pre><code class="language-dart">class  Person {
    String userName;

    Person(this.userName);

    // 方法名前加get关键字
    String get name{
        return  &quot;user:&quot;  +  this.userName;
    }

    // 方法名前加set关键字
    set name(String name){
        // do something
        this.userName = name;
    }
}

void  main() {
    var p = new Person(&quot;zhangsan&quot;);
    print(p.name);   // user:zhangsan
    p.name = &quot;Jack&quot;;
    print(p.name);   // user:Jack
}
</code></pre><p>要注意，在创建对象时，<code>new</code>关键字并不是必须的，可以省略不写。在写Flutter界面时，不建议写<code>new</code>关键字实例化对象，因为Flutter框架中没有类似的xml语言来描述UI界面，界面也是使用Dart语言来写，在使用Dart写UI时，要保持代码的简洁和结构化，省略<code>new</code>会更友好。</p><h3 id="构造方法" tabindex="-1"><a class="header-anchor" href="#构造方法"><span>构造方法</span></a></h3><blockquote><p>如果没有定义构造方法，则会有一个默认的无参构造方法，并且会调用超类的无参构造方法。</p></blockquote><h4 id="命名构造方法" tabindex="-1"><a class="header-anchor" href="#命名构造方法"><span>命名构造方法</span></a></h4><p>上面已经说过，Dart类中两个同名构造方法不能重载，但是Dart语言为类新增了一种称为<code>命名构造方法</code>的东西。</p><pre><code class="language-dart">class  Person {
    String userName;
    int age;

    Person(this.userName, this.age);

    // 命名构造方法
    Person.fromData(Map data) {
        this.userName = data[&#39;name&#39;];
        this.age = data[&#39;age&#39;];
    }
}

void  main() {
    // 使用命名构造方法创建对象
    var p = new Person.fromData({
        &quot;name&quot;:&quot;Bob&quot;,
        &quot;age&quot;:19
    });
    print(p.userName);
}
</code></pre><p>注意，使用命名构造方法可以为一个类实现多个构造方法，也可以更清晰的表明意图。</p><h4 id="常量构造方法" tabindex="-1"><a class="header-anchor" href="#常量构造方法"><span>常量构造方法</span></a></h4><blockquote><p>如果想提供一个状态永远不变的对像，在Dart中，我们可以创建一个编译时常量对象，节省开销。</p></blockquote><pre><code class="language-dart">class  ConstPoint {
    final num x;
    final num y;

    // 使用const修构造方法
    const ConstPoint(this.x, this.y);

    // 编译时常量对象，需使用const来创建对象
    static final ConstPoint origin = const  ConstPoint(0, 0);
}

void  main() {
    print(ConstPoint.origin.x);
    print(ConstPoint.origin.y);
}
</code></pre><h4 id="工厂构造方法" tabindex="-1"><a class="header-anchor" href="#工厂构造方法"><span>工厂构造方法</span></a></h4><p>当我们需要创建一个新的对象或者从缓存中取一个对象时，工厂构造方法就派上了用场。</p><pre><code class="language-dart">class  Logger {
    final String name;

    // 创建一个静态Map做为缓存
    static final Map&lt;String, Logger&gt; _cache =  &lt;String, Logger&gt;{};

    // 定义一个命名构造方法，用下划线&quot;_&quot;修饰，将构造方法私有化
    Logger._internal(this.name);

    // 使用关键字factory修饰类同名构造方法
    factory Logger(String name) {
        if (_cache.containsKey(name)) {
            return _cache[name];
        } else {
            // 调用命名构造方法创建新对象
            final logger= new  Logger._internal(name);
            _cache[name] = logger; // 存入缓存
            return logger;
        }
    }
}

void  main() {
    var uiLog = new Logger(&#39;UI&#39;);
    var eventLog = new Logger(&#39;event&#39;);
}
</code></pre><h4 id="构造方法重定向" tabindex="-1"><a class="header-anchor" href="#构造方法重定向"><span>构造方法重定向</span></a></h4><p>有时候一个构造方法会调动类中的其他构造方法来实例化，这时候可以使用构造方法重定向，</p><pre><code class="language-dart">class Point {
  num x;
  num y;

  // 同名构造方法
  Point(this.x, this.y);

  // 命名构造方法重定向到同名构造方法，中间使用一个冒号
  Point.alongXAxis(num x) : this(x, 0);
}
</code></pre><h3 id="类的初始化列表" tabindex="-1"><a class="header-anchor" href="#类的初始化列表"><span>类的初始化列表</span></a></h3><p>熟悉C++的朋友应该对初始化列表很了解了，Java中是没有这个特性的。</p><pre><code class="language-dart">class  Point {
    final  num x;
    final  num y;
    final  num distance;

    Point(x, y)
        : x = x,
          y = y,
          distance =  sqrt(x * x + y * y){
             print(&quot;这是构造方法&quot;);
          }
}

void  main() {
    var p =  new  Point(2, 3);
    print(p.distance);
}
</code></pre><p><img src="`+o+`" alt="9ff924c46f"></p><ul><li>初始化列表位于构造方法的小括号与大括号之间，在初始化列表之前需添加一个冒号。</li><li>初始化列表是由逗号分隔的一些赋值语句组成。</li><li>它适合用来初始化 <code>final</code>修饰的变量</li><li>初始化列表的调用是在构造方法之前，也就是在类完成实例化之前，因此初始化列表中是不能访问 <code>this</code>的</li></ul><h3 id="运算符重载" tabindex="-1"><a class="header-anchor" href="#运算符重载"><span>运算符重载</span></a></h3><p>这个特性，又很类似于C++中的运算符重载，在Java中是没用这种概念的。</p><pre><code class="language-dart">class Point {
  int x;
  int y;

  Point(this.x, this.y);

  // 使用operator关键字，为该类重载&quot;+&quot;运算符
  Point operator +(Point p) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  // 为该类重载&quot;-&quot;运算符
  Point operator -(Point p) {
    return new Point(this.x - p.x, this.y - p.y);
  }
}

void main(){
   var p1 = new Point(1,5);
   var p2 = new Point(7,10);

   // 重载运算符后，类可以使用“+”、“-” 运算符操作
   var p3 = p1 + p2;
   var p4 = p2 - p1;

   print(&quot;\${p3.x}, \${p3.y}&quot;);
   print(&quot;\${p4.x}, \${p4.y}&quot;);
}
</code></pre><p>打印结果：</p><pre><code>8, 15
6, 5
</code></pre><p>Dart中允许重载的运算符如下：</p><table><thead><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td><code>+</code></td><td><code>–</code></td><td><code>*</code></td><td><code>~/</code></td><td><code>/</code></td><td><code>%</code></td><td><code>^</code></td></tr><tr><td><code>&lt;</code></td><td><code>&gt;</code></td><td><code>&lt;=</code></td><td><code>&gt;=</code></td><td><code>==</code></td><td><code>[]</code></td><td><code>[]=</code></td></tr><tr><td><code>&amp;</code></td><td><code>~</code></td><td><code>&lt;&lt;</code></td><td><code>&gt;&gt;</code></td><td>|</td><td></td><td></td></tr></tbody></table><h3 id="类的继承" tabindex="-1"><a class="header-anchor" href="#类的继承"><span>类的继承</span></a></h3><p>Dart中的继承，与Java中相似，可以使用关键字<code>extends</code>继承父类，使用关键字<code>super</code>引用父类</p><pre><code class="language-dart">class Father {
    myFunction(){
        // do something
    }
}

class Son extends Father {

    @override
    myFunction(){
        super.myFunction();
        // do something
    }
}
</code></pre><p>我们知道，Java中的类仅支持单继承，而Dart中的类也只支持单继承。但是Dart可以使用一种被称为混入的方式来达到多继承的效果，这需要使用<code>with</code>关键字。</p><pre><code class="language-dart">// 首先定义三个父类
class Father1 {
    a(){
      print(&quot;this is a func&quot;);
    }

    common(){
        print(&quot;common Father1&quot;);
    }
}

class Father2 {
    b(){
      print(&quot;this is b func&quot;);
    }

    common(){
        print(&quot;common Father2&quot;);
    }
}

class Father3 {
    c(){
      print(&quot;this is c func&quot;);
    }

    common(){
        print(&quot;common Father3&quot;);
    }
}

//定义子类
class Son extends Father1 with Father2,Father3{

}

void main() {
  var obj = new Son();
  obj.common();
  obj.a();
  obj.b();
  obj.c();
}
</code></pre><p>打印结果：</p><pre><code>common Father3
this is a func
this is b func
this is c func
</code></pre><p>要注意，以上继承写法中，也可以直接使用<code>with</code>，等价于如下写法</p><pre><code class="language-dart">class Son with Father1,Father2,Father3{

}
</code></pre><h3 id="接口抽象" tabindex="-1"><a class="header-anchor" href="#接口抽象"><span>接口抽象</span></a></h3><h4 id="抽象类" tabindex="-1"><a class="header-anchor" href="#抽象类"><span>抽象类</span></a></h4><blockquote><p>Dart语言没有提供<code>interface</code>关键字来定义接口，但是Dart语言中保留了抽象类，同Java，使用<code>abstract</code>关键字来修饰抽象类。而Dart中的抽象类，实际上就相当于Java中的接口。</p></blockquote><pre><code class="language-dart">abstract class Base {
    // 省略函数体即可定义抽象方法，不需加关键字
    func1();
    func2();
}
</code></pre><p>注意，抽象类是不能被实例化的，子类继承抽象类时，必须实现全部抽象方法。</p><h4 id="隐式接口" tabindex="-1"><a class="header-anchor" href="#隐式接口"><span>隐式接口</span></a></h4><blockquote><p>实际上在Dart中，每个类都隐式的定义了一个包含所有实例成员的接口， 并且该类实现了这个接口。</p></blockquote><p>因此，如果我们想实现某个接口，但有又不想继承，则可以使用这种隐式接口机制。我们需要用到关键字<code>implements</code></p><pre><code class="language-dart">class People {
  void greet(){
    print(&quot;Hello&quot;);
  }
}

class Student implements People{
  @override
  void greet(){
    print(&quot;Hi,I&#39;m Alice.&quot;);
  }
}

greet(People p){
  p.greet();
}

void main() {
  greet(new Student());
}
</code></pre><h2 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型"><span>泛型</span></a></h2><p>Dart中也支持泛型，用法与Java中类似。</p><pre><code class="language-dart">// 泛型
var names = new List&lt;String&gt;();
names.add(&quot;zhangsan&quot;)

var maps = new Map&lt;int, String&gt;();
maps[1]=&quot;value&quot;;

// 字面量写法
var infos = &lt;String&gt;[&#39;Seth&#39;, &#39;Kathy&#39;, &#39;Lars&#39;];

var pages = &lt;String, String&gt;{
  &#39;index.html&#39;: &#39;Homepage&#39;,
  &#39;robots.txt&#39;: &#39;Hints for web robots&#39;
};
</code></pre><h2 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理"><span>异常处理</span></a></h2><p>如果关心具体异常，针对不同异常进行不同处理，可以使用<code>try...on</code>处理异常，<code>finally</code>是可选的，用于最后的处理。</p><pre><code class="language-dart">  try {
      // 使除数为0
      print(11~/0);
  } on IntegerDivisionByZeroException {
      print(&quot;除数为0&quot;);
  }on Exception{
      print(&quot;Exception&quot;);
  }finally {
      print(&quot;finally&quot;);
  }
</code></pre><p>不关心具体异常，只想捕获，避免异常继续传递，则可以使用<code>try...catch</code>处理</p><pre><code class="language-dart">  try {
      print(11~/0);
  } catch(e){
      // 打印报错信息
      print(e);
  }finally {
      print(&quot;finally&quot;);
  }
</code></pre><p>如果想获取更多异常信息，可以使用两个参数的<code>catch</code>，第二个参数是异常的调用栈信息</p><pre><code class="language-dart">  try {
      print(11~/0);
  } catch(e,s){
      print(s);
  }
</code></pre><p>如果你既想针对不同异常进行不同处理，还想打印调用栈信息，那就将两种结合起来使用</p><pre><code class="language-dart">  try {
      print(11~/0);
  } on IntegerDivisionByZeroException catch(e,s){
      print(s);
  } on Exception catch(e,s){
      print(s);
  }
</code></pre><h2 id="库与导入" tabindex="-1"><a class="header-anchor" href="#库与导入"><span>库与导入</span></a></h2><p>Dart使用<code>import</code>语句用来导入一个库，后面跟一个字符串形式的Uri来指定表示要引用的库。</p><pre><code class="language-dart">// 指定dart:前缀，表示导入标准库，如dart:io
import &#39;dart:math&#39;;

// 也可以用相对路径或绝对路径来引用dart文件
import &#39;lib/student/student.dart&#39;;

// 指定package:前缀，表示导入包管理系统中的库
import &#39;package:utils/utils.dart&#39;;
</code></pre><p>导入库时，可以使用<code>as</code>关键字来给库起别名，避免命名空间冲突。</p><pre><code class="language-dart">import &#39;package:lib1/lib1.dart&#39;;
import &#39;package:lib2/lib2.dart&#39; as lib2;

// 使用lib1中的Element
Element element1 = new Element();
// 使用lib2中的Element
lib2.Element element2 = new lib2.Element(); 
</code></pre><p>使用<code>show</code>和<code>hide</code>关键字控制库中成员的可见性</p><pre><code class="language-dart">// 仅导入foo，屏蔽库中其他成员
import &#39;package:lib1/lib1.dart&#39; show foo;

// 屏蔽foo，库中其他成员都可见
import &#39;package:lib2/lib2.dart&#39; hide foo;
</code></pre><p>为了减少 APP 的启动时间，加载很少使用的功能，我们还可以延迟导入库。使用 <code>deferred as</code>关键字延迟导入</p><pre><code class="language-dart">import &#39;package:deferred/hello.dart&#39; deferred as hello;

// 当需要使用时，再通过库标识符调用 loadLibrary函数加载
hello.loadLibrary();
</code></pre><h2 id="异步编程" tabindex="-1"><a class="header-anchor" href="#异步编程"><span>异步编程</span></a></h2><p>Dart与JavaScript一样，是一个单线程模型。但这并不意味着Dart中不能进行异步编程，只是这种异步编程区别于传统的多线程异步方式。</p><p>Dart中的所有代码都只在一个线程上运行，但Dart代码可以运行在多个<strong>isolate</strong>上。<strong>isolate</strong>可以看做一个微小的线程，<strong>isolate</strong>由虚拟机调度，<strong>isolate</strong>之间没有共享内存，因此它们之间没有竞争，不需要锁，不用担心死锁，因此开销小，性能高。由于没有共享内存，所以它们之间唯一的通信只能通过Port进行，而且Dart中的消息传递也总是异步的。</p><p>Dart中两种方式可以使用<code>Future</code>对象来进行异步编程</p><ul><li>使用 <code>async</code> 和 <code>await</code>关键字</li><li>使用 Future API</li></ul><p>使用<code>async</code>和<code>await</code>编写代码非常简单，而且编写的代码看起来有点像同步代码，实际上是异步的。</p><pre><code class="language-dart">// 导入io库，调用sleep函数
import &#39;dart:io&#39;;

// 模拟耗时操作，调用sleep函数睡眠2秒
doTask() async{
  await sleep(const Duration(seconds:2));
  return &quot;Ok&quot;;
}

// 定义一个函数用于包装
test() async {
  var r = await doTask();
  print(r);
}

void main(){
  print(&quot;main start&quot;);
  test();
  print(&quot;main end&quot;);
}
</code></pre><p>运行结果：</p><pre><code>main start
main end
Ok
</code></pre><p>在函数签名中加入<code>async</code>关键字，表示该函数异步执行，<code>await</code>表示等待异步结果执行完成返回<code>Future</code>对象。但有一点需要注意，<code>await</code>只能在<code>async</code>函数中出现，因此往往需要再定义一个<code>async</code>函数，用于包装。上述代码中<code>test</code>函数就是用于包装。</p>`,89),c=[d];function s(i,l){return t(),n("div",null,c)}const h=e(r,[["render",s],["__file","dart-class.html.vue"]]),u=JSON.parse('{"path":"/flutter-tutor/dart/dart-class.html","title":"dart基础2","lang":"zh-CN","frontmatter":{"order":2,"description":"dart基础2 类和对象 类的定义 Dart中的类与Java中的相似，不同的是，Dart中没有private、public这些成员访问修饰符。如果是类私有的成员，不希望外面访问，只需要在成员变量之前加上一个下划线_变为私有即可。 以上代码，在Dart中还有一种简化写法，可以自动在构造方法中对成员变量初始化。 另外还需要注意一点，Dart中没有构造方法的...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/dart/dart-class.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"dart基础2"}],["meta",{"property":"og:description","content":"dart基础2 类和对象 类的定义 Dart中的类与Java中的相似，不同的是，Dart中没有private、public这些成员访问修饰符。如果是类私有的成员，不希望外面访问，只需要在成员变量之前加上一个下划线_变为私有即可。 以上代码，在Dart中还有一种简化写法，可以自动在构造方法中对成员变量初始化。 另外还需要注意一点，Dart中没有构造方法的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"dart基础2\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"类和对象","slug":"类和对象","link":"#类和对象","children":[{"level":3,"title":"类的定义","slug":"类的定义","link":"#类的定义","children":[]},{"level":3,"title":"Getters 和 Setters方法","slug":"getters-和-setters方法","link":"#getters-和-setters方法","children":[]},{"level":3,"title":"构造方法","slug":"构造方法","link":"#构造方法","children":[{"level":4,"title":"命名构造方法","slug":"命名构造方法","link":"#命名构造方法","children":[]},{"level":4,"title":"常量构造方法","slug":"常量构造方法","link":"#常量构造方法","children":[]},{"level":4,"title":"工厂构造方法","slug":"工厂构造方法","link":"#工厂构造方法","children":[]},{"level":4,"title":"构造方法重定向","slug":"构造方法重定向","link":"#构造方法重定向","children":[]}]},{"level":3,"title":"类的初始化列表","slug":"类的初始化列表","link":"#类的初始化列表","children":[]},{"level":3,"title":"运算符重载","slug":"运算符重载","link":"#运算符重载","children":[]},{"level":3,"title":"类的继承","slug":"类的继承","link":"#类的继承","children":[]},{"level":3,"title":"接口抽象","slug":"接口抽象","link":"#接口抽象","children":[{"level":4,"title":"抽象类","slug":"抽象类","link":"#抽象类","children":[]},{"level":4,"title":"隐式接口","slug":"隐式接口","link":"#隐式接口","children":[]}]}]},{"level":2,"title":"泛型","slug":"泛型","link":"#泛型","children":[]},{"level":2,"title":"异常处理","slug":"异常处理","link":"#异常处理","children":[]},{"level":2,"title":"库与导入","slug":"库与导入","link":"#库与导入","children":[]},{"level":2,"title":"异步编程","slug":"异步编程","link":"#异步编程","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":9.83,"words":2948},"filePathRelative":"flutter-tutor/dart/dart-class.md","localizedDate":"2023年5月22日","autoDesc":true}');export{h as comp,u as data};
