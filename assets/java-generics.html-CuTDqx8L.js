import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const r={},i=a(`<h1 id="java泛型" tabindex="-1"><a class="header-anchor" href="#java泛型"><span>java泛型</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>泛型，即“参数化类型”。一提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。那么参数化类型怎么理解呢？顾名思义，就是将类型由原来的具体的类型参数化，类似于方法中的变量参数，此时类型也定义成参数形式（可以称之为类型形参），然后在使用/调用时传入具体的类型（类型实参）。</p><p>泛型的本质是为了参数化类型（在不创建新的类型的情况下，通过泛型指定的不同类型来控制形参具体限制的类型）。也就是说在泛型使用过程中，操作的数据类型被指定为一个参数，这种参数类型可以用在类、接口和方法中，分别被称为泛型类、泛型接口、泛型方法。</p></div><h2 id="_2-一个栗子" tabindex="-1"><a class="header-anchor" href="#_2-一个栗子"><span>2. 一个栗子</span></a></h2><p>一个被举了无数次的例子：</p><pre><code class="language-java">List arrayList = new ArrayList();
arrayList.add(&quot;aaaa&quot;);
arrayList.add(100);

for(int i = 0; i&lt; arrayList.size();i++){
    String item = (String)arrayList.get(i);
    Log.d(&quot;泛型测试&quot;,&quot;item = &quot; + item);
}
</code></pre><p>毫无疑问，程序的运行结果会以崩溃结束：</p><pre><code class="language-java">java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String
</code></pre><p>ArrayList可以存放任意类型，例子中添加了一个String类型，添加了一个Integer类型，再使用时都以String的方式使用，因此程序崩溃了。为了解决类似这样的问题（在编译阶段就可以解决），泛型应运而生。 我们将第一行声明初始化list的代码更改一下，编译器会在编译阶段就能够帮我们发现类似这样的问题。</p><pre><code class="language-java">List&lt;String&gt; arrayList = new ArrayList&lt;String&gt;();
...
//arrayList.add(100); 在编译阶段，编译器就会报错
</code></pre><h2 id="_3-特性" tabindex="-1"><a class="header-anchor" href="#_3-特性"><span>3. 特性</span></a></h2><p>泛型只在编译阶段有效。看下面的代码：</p><pre><code class="language-java">List&lt;String&gt; stringArrayList = new ArrayList&lt;String&gt;();
List&lt;Integer&gt; integerArrayList = new ArrayList&lt;Integer&gt;();

Class classStringArrayList = stringArrayList.getClass();
Class classIntegerArrayList = integerArrayList.getClass();

if(classStringArrayList.equals(classIntegerArrayList)){
    Log.d(&quot;泛型测试&quot;,&quot;类型相同&quot;);
}
</code></pre><p>输出结果：D/泛型测试: 类型相同。 通过上面的例子可以证明，在编译之后程序会采取去泛型化的措施。也就是说Java中的泛型，只在编译阶段有效。在编译过程中，正确检验泛型结果后，会将泛型的相关信息擦出，并且在对象进入和离开方法的边界处添加类型检查和类型转换的方法。也就是说，泛型信息不会进入到运行时阶段。 对此总结成一句话：泛型类型在逻辑上看以看成是多个不同的类型，实际上都是相同的基本类型。</p><h2 id="_4-泛型的使用" tabindex="-1"><a class="header-anchor" href="#_4-泛型的使用"><span>4. 泛型的使用</span></a></h2><p>泛型有三种使用方式，分别为：泛型类、泛型接口、泛型方法</p><h3 id="_4-3-泛型类" tabindex="-1"><a class="header-anchor" href="#_4-3-泛型类"><span>4.3 泛型类</span></a></h3><p>泛型类型用于类的定义中，被称为泛型类。通过泛型可以完成对一组类的操作对外开放相同的接口。最典型的就是各种容器类，如：List、Set、Map。 泛型类的最基本写法（这么看可能会有点晕，会在下面的例子中详解）：</p><pre><code class="language-java">class 类名称 &lt;泛型标识：可以随便写任意标识号，标识指定的泛型的类型&gt;{
  private 泛型标识 /*（成员变量类型）*/ var; 
  .....

  }
}
</code></pre><p>一个普通的泛型类:</p><pre><code class="language-java">//此处T可以随便写为任意标识，常见的如T、E、K、V等形式的参数常用于表示泛型
//在实例化泛型类时，必须指定T的具体类型
public class Generic&lt;T&gt;{ 
    //key这个成员变量的类型为T,T的类型由外部指定  
    private T key;

    public Generic(T key) { //泛型构造方法形参key的类型也为T，T的类型由外部指定
        this.key = key;
    }

    public T getKey(){ //泛型方法getKey的返回值类型为T，T的类型由外部指定
        return key;
    }
}




//泛型的类型参数只能是类类型（包括自定义类），不能是简单类型
//传入的实参类型需与泛型的类型参数类型相同，即为Integer.
Generic&lt;Integer&gt; genericInteger = new Generic&lt;Integer&gt;(123456);

//传入的实参类型需与泛型的类型参数类型相同，即为String.
Generic&lt;String&gt; genericString = new Generic&lt;String&gt;(&quot;key_vlaue&quot;);
Log.d(&quot;泛型测试&quot;,&quot;key is &quot; + genericInteger.getKey());
Log.d(&quot;泛型测试&quot;,&quot;key is &quot; + genericString.getKey());
</code></pre><pre><code class="language-java">12-27 09:20:04.432 13063-13063/? D/泛型测试: key is 123456
12-27 09:20:04.432 13063-13063/? D/泛型测试: key is key_vlaue
</code></pre><p>定义的泛型类，就一定要传入泛型类型实参么？并不是这样，在使用泛型的时候如果传入泛型实参，则会根据传入的泛型实参做相应的限制，此时泛型才会起到本应起到的限制作用。如果不传入泛型类型实参的话，在泛型类中使用泛型的方法或成员变量定义的类型可以为任何的类型。 看一个例子：</p><pre><code class="language-java">Generic generic = new Generic(&quot;111111&quot;);
Generic generic1 = new Generic(4444);
Generic generic2 = new Generic(55.55);
Generic generic3 = new Generic(false);

Log.d(&quot;泛型测试&quot;,&quot;key is &quot; + generic.getKey());
Log.d(&quot;泛型测试&quot;,&quot;key is &quot; + generic1.getKey());
Log.d(&quot;泛型测试&quot;,&quot;key is &quot; + generic2.getKey());
Log.d(&quot;泛型测试&quot;,&quot;key is &quot; + generic3.getKey());



D/泛型测试: key is 111111
D/泛型测试: key is 4444
D/泛型测试: key is 55.55
D/泛型测试: key is false
</code></pre><p><strong>注意：</strong></p><ul><li>泛型的类型参数只能是类类型，不能是简单类型。</li><li>不能对确切的泛型类型使用instanceof操作。如下面的操作是非法的，编译时会出错。</li></ul><p><code>if(ex_num instanceof Generic&lt;Number&gt;){ }</code></p><h3 id="_4-4-泛型接口" tabindex="-1"><a class="header-anchor" href="#_4-4-泛型接口"><span>4.4 泛型接口</span></a></h3><p>泛型接口与泛型类的定义及使用基本相同。泛型接口常被用在各种类的生产器中，可以看一个例子：</p><pre><code class="language-java">//定义一个泛型接口
public interface Generator&lt;T&gt; {
    public T next();
}
</code></pre><p>当实现泛型接口的类，未传入泛型实参时：</p><pre><code class="language-java">/**
 * 未传入泛型实参时，与泛型类的定义相同，在声明类的时候，需将泛型的声明也一起加到类中
 * 即：class FruitGenerator&lt;T&gt; implements Generator&lt;T&gt;{
 * 如果不声明泛型，如：class FruitGenerator implements Generator&lt;T&gt;，编译器会报错：&quot;Unknown class&quot;
 */
class FruitGenerator&lt;T&gt; implements Generator&lt;T&gt;{
    @Override
    public T next() {
        return null;
    }
}
</code></pre><p>当实现泛型接口的类，传入泛型实参时：</p><pre><code class="language-java">/**
 * 传入泛型实参时：
 * 定义一个生产器实现这个接口,虽然我们只创建了一个泛型接口Generator&lt;T&gt;
 * 但是我们可以为T传入无数个实参，形成无数种类型的Generator接口。
 * 在实现类实现泛型接口时，如已将泛型类型传入实参类型，则所有使用泛型的地方都要替换成传入的实参类型
 * 即：Generator&lt;T&gt;，public T next();中的的T都要替换成传入的String类型。
 */
public class FruitGenerator implements Generator&lt;String&gt; {

    private String[] fruits = new String[]{&quot;Apple&quot;, &quot;Banana&quot;, &quot;Pear&quot;};

    @Override
    public String next() {
        Random rand = new Random();
        return fruits[rand.nextInt(3)];
    }
}
</code></pre><h3 id="_4-5-泛型通配符" tabindex="-1"><a class="header-anchor" href="#_4-5-泛型通配符"><span>4.5 泛型通配符</span></a></h3><p>我们知道Ingeter是Number的一个子类，同时在特性章节中我们也验证过<code>Generic&lt;Ingeter&gt;</code>与<code>Generic&lt;Number&gt;</code>实际上是相同的一种基本类型。那么问题来了，在使用<code>Generic&lt;Number&gt;</code>作为形参的方法中，能否使用<code>Generic&lt;Ingeter&gt;</code>的实例传入呢？在逻辑上类似于<code>Generic&lt;Number&gt;和Generic&lt;Ingeter&gt;</code>是否可以看成具有父子关系的泛型类型呢？ 为了弄清楚这个问题，我们使用<code>Generic&lt;T&gt;</code>这个泛型类继续看下面的例子：</p><pre><code class="language-java">public void showKeyValue1(Generic&lt;Number&gt; obj){
    Log.d(&quot;泛型测试&quot;,&quot;key value is &quot; + obj.getKey());
}
</code></pre><pre><code class="language-java">Generic&lt;Integer&gt; gInteger = new Generic&lt;Integer&gt;(123);
Generic&lt;Number&gt; gNumber = new Generic&lt;Number&gt;(456);

showKeyValue(gNumber);

// showKeyValue这个方法编译器会为我们报错：Generic&lt;java.lang.Integer&gt; 
// cannot be applied to Generic&lt;java.lang.Number&gt;
// showKeyValue(gInteger);
</code></pre><p>通过提示信息我们可以看到<code>Generic&lt;Integer&gt;</code>不能被看作为<code>Generic&lt;Number&gt;</code>的子类。由此可以看出:同一种泛型可以对应多个版本（因为参数类型是不确定的），不同版本的泛型类实例是不兼容的。 回到上面的例子，如何解决上面的问题？总不能为了定义一个新的方法来处理<code>Generic&lt;Integer&gt;</code>类型的类，这显然与java中的多台理念相违背。因此我们需要一个在逻辑上可以表示同时是<code>Generic&lt;Integer&gt;</code>和<code>Generic&lt;Number&gt;</code>父类的引用类型。由此类型通配符应运而生。 我们可以将上面的方法改一下：</p><pre><code class="language-java">public void showKeyValue1(Generic&lt;?&gt; obj){
    Log.d(&quot;泛型测试&quot;,&quot;key value is &quot; + obj.getKey());
}
</code></pre><p>类型通配符一般是使用？代替具体的类型实参，注意了，此处’？’是类型实参，而不是类型形参 。重要说三遍！此处’？’是类型实参，而不是类型形参 ！ 此处’？’是类型实参，而不是类型形参 ！再直白点的意思就是，此处的？和Number、String、Integer一样都是一种实际的类型，可以把？看成所有类型的父类。是一种真实的类型。 可以解决当具体类型不确定的时候，这个通配符就是 ? ；当操作类型时，不需要使用类型的具体功能时，只使用Object类中的功能。那么可以用 ? 通配符来表未知类型。</p><h3 id="_4-6-泛型方法" tabindex="-1"><a class="header-anchor" href="#_4-6-泛型方法"><span>4.6 泛型方法</span></a></h3><p>在java中,泛型类的定义非常简单，但是泛型方法就比较复杂了。</p><blockquote><p>尤其是我们见到的大多数泛型类中的成员方法也都使用了泛型，有的甚至泛型类中也包含着泛型方法，这样在初学者中非常容易将泛型方法理解错了。</p></blockquote><p>泛型类，是在实例化类的时候指明泛型的具体类型；泛型方法，是在调用方法的时候指明泛型的具体类型 。</p><pre><code class="language-java">/**
 * 泛型方法的基本介绍
 * @param tClass 传入的泛型实参
 * @return T 返回值为T类型
 * 说明：
 *     1）public 与 返回值中间&lt;T&gt;非常重要，可以理解为声明此方法为泛型方法。
 *     2）只有声明了&lt;T&gt;的方法才是泛型方法，泛型类中的使用了泛型的成员方法并不是泛型方法。
 *     3）&lt;T&gt;表明该方法将使用泛型类型T，此时才可以在方法中使用泛型类型T。
 *     4）与泛型类的定义一样，此处T可以随便写为任意标识，常见的如T、E、K、V等形式的参数常用于表示泛型。
 */
public &lt;T&gt; T genericMethod(Class&lt;T&gt; tClass)throws InstantiationException ,
  IllegalAccessException{
        T instance = tClass.newInstance();
        return instance;
}


Object obj = genericMethod(Class.forName(&quot;com.test.test&quot;));
</code></pre><h4 id="_4-6-1-泛型方法的基本用法" tabindex="-1"><a class="header-anchor" href="#_4-6-1-泛型方法的基本用法"><span>4.6.1 泛型方法的基本用法</span></a></h4><p>光看上面的例子有的同学可能依然会非常迷糊，我们再通过一个例子，把我泛型方法再总结一下。</p><pre><code class="language-java">public class GenericTest {
   //这个类是个泛型类，在上面已经介绍过
   public class Generic&lt;T&gt;{     
        private T key;

        public Generic(T key) {
            this.key = key;
        }

        //我想说的其实是这个，虽然在方法中使用了泛型，但是这并不是一个泛型方法。
        //这只是类中一个普通的成员方法，只不过他的返回值是在声明泛型类已经声明过的泛型。
        //所以在这个方法中才可以继续使用 T 这个泛型。
        public T getKey(){
            return key;
        }

        /**
         * 这个方法显然是有问题的，在编译器会给我们提示这样的错误信息&quot;cannot reslove symbol E&quot;
         * 因为在类的声明中并未声明泛型E，所以在使用E做形参和返回值类型时，编译器会无法识别。
        public E setKey(E key){
             this.key = keu
        }
        */
    }

    /** 
     * 这才是一个真正的泛型方法。
     * 首先在public与返回值之间的&lt;T&gt;必不可少，这表明这是一个泛型方法，并且声明了一个泛型T
     * 这个T可以出现在这个泛型方法的任意位置.
     * 泛型的数量也可以为任意多个 
     *    如：public &lt;T,K&gt; K showKeyName(Generic&lt;T&gt; container){
     *        ...
     *        }
     */
    public &lt;T&gt; T showKeyName(Generic&lt;T&gt; container){
        System.out.println(&quot;container key :&quot; + container.getKey());
        //当然这个例子举的不太合适，只是为了说明泛型方法的特性。
        T test = container.getKey();
        return test;
    }

    //这也不是一个泛型方法，这就是一个普通的方法，只是使用了Generic&lt;Number&gt;这个泛型类做形参而已。
    public void showKeyValue1(Generic&lt;Number&gt; obj){
        Log.d(&quot;泛型测试&quot;,&quot;key value is &quot; + obj.getKey());
    }

    //这也不是一个泛型方法，这也是一个普通的方法，只不过使用了泛型通配符?
    //同时这也印证了泛型通配符章节所描述的，?是一种类型实参，可以看做为Number等所有类的父类
    public void showKeyValue2(Generic&lt;?&gt; obj){
        Log.d(&quot;泛型测试&quot;,&quot;key value is &quot; + obj.getKey());
    }

     /**
     * 这个方法是有问题的，编译器会为我们提示错误信息：&quot;UnKnown class &#39;E&#39; &quot;
     * 虽然我们声明了&lt;T&gt;,也表明了这是一个可以处理泛型的类型的泛型方法。
     * 但是只声明了泛型类型T，并未声明泛型类型E，因此编译器并不知道该如何处理E这个类型。
    public &lt;T&gt; T showKeyName(Generic&lt;E&gt; container){
        ...
    }  
    */

    /**
     * 这个方法也是有问题的，编译器会为我们提示错误信息：&quot;UnKnown class &#39;T&#39; &quot;
     * 对于编译器来说T这个类型并未项目中声明过，因此编译也不知道该如何编译这个类。
     * 所以这也不是一个正确的泛型方法声明。
    public void showkey(T genericObj){

    }
    */

    public static void main(String[] args) {


    }
}
</code></pre><h4 id="_4-6-2-类中的泛型方法" tabindex="-1"><a class="header-anchor" href="#_4-6-2-类中的泛型方法"><span>4.6.2 类中的泛型方法</span></a></h4><p>当然这并不是泛型方法的全部，泛型方法可以出现杂任何地方和任何场景中使用。但是有一种情况是非常特殊的，当泛型方法出现在泛型类中时，我们再通过一个例子看一下</p><pre><code class="language-java">public class GenericFruit {
    class Fruit{
        @Override
        public String toString() {
            return &quot;fruit&quot;;
        }
    }

    class Apple extends Fruit{
        @Override
        public String toString() {
            return &quot;apple&quot;;
        }
    }

    class Person{
        @Override
        public String toString() {
            return &quot;Person&quot;;
        }
    }

    class GenerateTest&lt;T&gt;{
        public void show_1(T t){
            System.out.println(t.toString());
        }

        //在泛型类中声明了一个泛型方法，使用泛型E，这种泛型E可以为任意类型。可以类型与T相同，也可以不同。
        //由于泛型方法在声明的时候会声明泛型&lt;E&gt;，因此即使在泛型类中并未声明泛型，编译器也能够正确识别泛型方法中识别的泛型。
        public &lt;E&gt; void show_3(E t){
            System.out.println(t.toString());
        }

        //在泛型类中声明了一个泛型方法，使用泛型T，注意这个T是一种全新的类型，可以与泛型类中声明的T不是同一种类型。
        public &lt;T&gt; void show_2(T t){
            System.out.println(t.toString());
        }
    }

    public static void main(String[] args) {
        Apple apple = new Apple();
        Person person = new Person();

        GenerateTest&lt;Fruit&gt; generateTest = new GenerateTest&lt;Fruit&gt;();
        //apple是Fruit的子类，所以这里可以
        generateTest.show_1(apple);
        //编译器会报错，因为泛型类型实参指定的是Fruit，而传入的实参类是Person
        //generateTest.show_1(person);

        //使用这两个方法都可以成功
        generateTest.show_2(apple);
        generateTest.show_2(person);

        //使用这两个方法也都可以成功
        generateTest.show_3(apple);
        generateTest.show_3(person);
    }
}
</code></pre><h4 id="_4-6-3-泛型方法与可变参数" tabindex="-1"><a class="header-anchor" href="#_4-6-3-泛型方法与可变参数"><span>4.6.3 泛型方法与可变参数</span></a></h4><p>再看一个泛型方法和可变参数的例子：</p><pre><code class="language-java">public &lt;T&gt; void printMsg( T... args){
    for(T t : args){
        Log.d(&quot;泛型测试&quot;,&quot;t is &quot; + t);
    }
}
printMsg(&quot;111&quot;,222,&quot;aaaa&quot;,&quot;2323.4&quot;,55.55);
</code></pre><h4 id="_4-6-4-静态方法与泛型" tabindex="-1"><a class="header-anchor" href="#_4-6-4-静态方法与泛型"><span>4.6.4 静态方法与泛型</span></a></h4><p>静态方法有一种情况需要注意一下，那就是在类中的静态方法使用泛型：静态方法无法访问类上定义的泛型；如果静态方法操作的引用数据类型不确定的时候，必须要将泛型定义在方法上。 即：如果静态方法要使用泛型的话，必须将静态方法也定义成泛型方法 。</p><pre><code class="language-java">public class StaticGenerator&lt;T&gt; {
    ....
    ....
    /**
     * 如果在类中定义使用泛型的静态方法，需要添加额外的泛型声明（将这个方法定义成泛型方法）
     * 即使静态方法要使用泛型类中已经声明过的泛型也不可以。
     * 如：public static void show(T t){..},此时编译器会提示错误信息：
          &quot;StaticGenerator cannot be refrenced from static context&quot;
     */
    public static &lt;T&gt; void show(T t){

    }
}
</code></pre><h4 id="_4-6-5-泛型方法总结" tabindex="-1"><a class="header-anchor" href="#_4-6-5-泛型方法总结"><span>4.6.5 泛型方法总结</span></a></h4><p>泛型方法能使方法独立于类而产生变化，以下是一个基本的指导原则：</p><blockquote><p>无论何时，如果你能做到，你就该尽量使用泛型方法。也就是说，如果使用泛型方法将整个类泛型化，</p></blockquote><p>那么就应该使用泛型方法。另外对于一个static的方法而已，无法访问泛型类型的参数。</p><p>所以如果static方法要使用泛型能力，就必须使其成为泛型方法。</p><h3 id="_4-6-泛型上下边界" tabindex="-1"><a class="header-anchor" href="#_4-6-泛型上下边界"><span>4.6 泛型上下边界</span></a></h3><p>在使用泛型的时候，我们还可以为传入的泛型类型实参进行上下边界的限制，如：类型实参只准传入某种类型的父类或某种类型的子类。 为泛型添加上边界，即传入的类型实参必须是指定类型的子类型</p><pre><code class="language-java">public void showKeyValue1(Generic&lt;? extends Number&gt; obj){
    Log.d(&quot;泛型测试&quot;,&quot;key value is &quot; + obj.getKey());
}

Generic&lt;String&gt; generic1 = new Generic&lt;String&gt;(&quot;11111&quot;);
Generic&lt;Integer&gt; generic2 = new Generic&lt;Integer&gt;(2222);
Generic&lt;Float&gt; generic3 = new Generic&lt;Float&gt;(2.4f);
Generic&lt;Double&gt; generic4 = new Generic&lt;Double&gt;(2.56);

//这一行代码编译器会提示错误，因为String类型并不是Number类型的子类
//showKeyValue1(generic1);

showKeyValue1(generic2);
showKeyValue1(generic3);
showKeyValue1(generic4);
</code></pre><p>如果我们把泛型类的定义也改一下:</p><pre><code class="language-java">public class Generic&lt;T extends Number&gt;{
    private T key;

    public Generic(T key) {
        this.key = key;
    }

    public T getKey(){
        return key;
    }
}




//这一行代码也会报错，因为String不是Number的子类
Generic&lt;String&gt; generic1 = new Generic&lt;String&gt;(&quot;11111&quot;);
</code></pre><p>再来一个泛型方法的例子：</p><pre><code class="language-java">//在泛型方法中添加上下边界限制的时候，必须在权限声明与返回值之间的&lt;T&gt;上添加上下边界，即在泛型声明的时候添加
//public &lt;T&gt; T showKeyName(Generic&lt;T extends Number&gt; container)，编译器会报错：&quot;Unexpected bound&quot;
public &lt;T extends Number&gt; T showKeyName(Generic&lt;T&gt; container){
    System.out.println(&quot;container key :&quot; + container.getKey());
    T test = container.getKey();
    return test;
}
</code></pre><p>通过上面的两个例子可以看出：泛型的上下边界添加，必须与泛型的声明在一起</p><h3 id="_4-7-关于泛型数组要提一下" tabindex="-1"><a class="header-anchor" href="#_4-7-关于泛型数组要提一下"><span>4.7 关于泛型数组要提一下</span></a></h3><p>看到了很多文章中都会提起泛型数组，经过查看sun的说明文档，在java中是”不能创建一个确切的泛型类型的数组”的。 也就是说下面的这个例子是不可以的： <code>List&lt;String&gt;[] ls = new ArrayList&lt;String&gt;[10];</code> 而使用通配符创建泛型数组是可以的，如下面这个例子： <code>List&lt;?&gt;[] ls = new ArrayList&lt;?&gt;[10];</code> 这样也是可以的： <code>List&lt;String&gt;[] ls = new ArrayList[10];</code> 下面使用<a href="http://docs.oracle.com/javase/tutorial/extra/generics/fineprint.html" target="_blank" rel="noopener noreferrer">Sun</a><a href="http://docs.oracle.com/javase/tutorial/extra/generics/fineprint.html" target="_blank" rel="noopener noreferrer">的一篇文档</a>的一个例子来说明这个问题：</p><pre><code class="language-java">List&lt;String&gt;[] lsa = new List&lt;String&gt;[10]; // Not really allowed.    
Object o = lsa;    
Object[] oa = (Object[]) o;    
List&lt;Integer&gt; li = new ArrayList&lt;Integer&gt;();    
li.add(new Integer(3));    
oa[1] = li; // Unsound, but passes run time store check    
String s = lsa[1].get(0); // Run-time error: ClassCastException.

这种情况下，由于JVM泛型的擦除机制，在运行时JVM是不知道泛型信息的，所以可以给oa[1]赋上一个ArrayList而不会出现异常，但是在取出数据的时候却要做一次类型转换，所以就会出现ClassCastException，如果可以进行泛型数组的声明，上面说的这种情况在编译期将不会出现任何的警告和错误，只有在运行时才会出错。

而对泛型数组的声明进行限制，对于这样的情况，可以在编译期提示代码有类型安全问题，比没有任何提示要强很多。
</code></pre><p>​</p><p>下面采用通配符的方式是被允许的:数组的类型不可以是类型变量，除非是采用通配符的方式，因为对于通配符的方式，最后取出数据是要做显式的类型转换的。</p><pre><code class="language-java">List&lt;?&gt;[] lsa = new List&lt;?&gt;[10]; // OK, array of unbounded wildcard type.    
Object o = lsa;    
Object[] oa = (Object[]) o;    
List&lt;Integer&gt; li = new ArrayList&lt;Integer&gt;();    
li.add(new Integer(3));    
oa[1] = li; // Correct.    
Integer i = (Integer) lsa[1].get(0); // OK
</code></pre>`,76),o=[i];function l(s,c){return t(),n("div",null,o)}const u=e(r,[["render",l],["__file","java-generics.html.vue"]]),p=JSON.parse('{"path":"/java-tutor/java-tips/java-generics.html","title":"java泛型","lang":"zh-CN","frontmatter":{"description":"java泛型 提示 泛型，即“参数化类型”。一提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。那么参数化类型怎么理解呢？顾名思义，就是将类型由原来的具体的类型参数化，类似于方法中的变量参数，此时类型也定义成参数形式（可以称之为类型形参），然后在使用/调用时传入具体的类型（类型实参）。 泛型的本质是为了参数化类型（在不创建新的类型的情况...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/java-generics.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java泛型"}],["meta",{"property":"og:description","content":"java泛型 提示 泛型，即“参数化类型”。一提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。那么参数化类型怎么理解呢？顾名思义，就是将类型由原来的具体的类型参数化，类似于方法中的变量参数，此时类型也定义成参数形式（可以称之为类型形参），然后在使用/调用时传入具体的类型（类型实参）。 泛型的本质是为了参数化类型（在不创建新的类型的情况..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java泛型\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"2. 一个栗子","slug":"_2-一个栗子","link":"#_2-一个栗子","children":[]},{"level":2,"title":"3. 特性","slug":"_3-特性","link":"#_3-特性","children":[]},{"level":2,"title":"4. 泛型的使用","slug":"_4-泛型的使用","link":"#_4-泛型的使用","children":[{"level":3,"title":"4.3 泛型类","slug":"_4-3-泛型类","link":"#_4-3-泛型类","children":[]},{"level":3,"title":"4.4 泛型接口","slug":"_4-4-泛型接口","link":"#_4-4-泛型接口","children":[]},{"level":3,"title":"4.5 泛型通配符","slug":"_4-5-泛型通配符","link":"#_4-5-泛型通配符","children":[]},{"level":3,"title":"4.6 泛型方法","slug":"_4-6-泛型方法","link":"#_4-6-泛型方法","children":[{"level":4,"title":"4.6.1 泛型方法的基本用法","slug":"_4-6-1-泛型方法的基本用法","link":"#_4-6-1-泛型方法的基本用法","children":[]},{"level":4,"title":"4.6.2 类中的泛型方法","slug":"_4-6-2-类中的泛型方法","link":"#_4-6-2-类中的泛型方法","children":[]},{"level":4,"title":"4.6.3 泛型方法与可变参数","slug":"_4-6-3-泛型方法与可变参数","link":"#_4-6-3-泛型方法与可变参数","children":[]},{"level":4,"title":"4.6.4 静态方法与泛型","slug":"_4-6-4-静态方法与泛型","link":"#_4-6-4-静态方法与泛型","children":[]},{"level":4,"title":"4.6.5 泛型方法总结","slug":"_4-6-5-泛型方法总结","link":"#_4-6-5-泛型方法总结","children":[]}]},{"level":3,"title":"4.6 泛型上下边界","slug":"_4-6-泛型上下边界","link":"#_4-6-泛型上下边界","children":[]},{"level":3,"title":"4.7 关于泛型数组要提一下","slug":"_4-7-关于泛型数组要提一下","link":"#_4-7-关于泛型数组要提一下","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":16.6,"words":4981},"filePathRelative":"java-tutor/java-tips/java-generics.md","localizedDate":"2022年3月21日","autoDesc":true}');export{u as comp,p as data};
