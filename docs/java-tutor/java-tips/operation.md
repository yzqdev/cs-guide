# 一些java技巧

## 在java中声明数组

### 回答

你可以直接用数组声明，或者通过数组的字面常量（array literal ）声明

对于原始类型（primitive types）：

```java
int[] myIntArray = new int[3];
int[] myIntArray = {1, 2, 3};
int[] myIntArray = new int[]{1, 2, 3};
```

对于其他类，比如String类，也是相同的：

```java
String[] myStringArray = new String[3];
String[] myStringArray = {"a", "b","c"};
String[] myStringArray = new String[]{"a", "b", "c"};
```

[stackoverflow链接：Declare array in Java?](http://stackoverflow.com/questions/1200621/declare-array-in-java)

## 将数组转换为List

:::tip

假设有数组

```java
Element[] array = {new Element(1),new Element(2),new Element(3)};
```

如何将其转换为`ArrayList<Element> arraylist = ？？？`
:::

```java
new ArrayList<Element>(Arrays.asList(array))
```

### 回答2

Arrays.asList(array)或者Arrays.asList(new Element(1),new Element(2),new Element(3))

不过，这样做有些坑要注意：

1. 这样做生成的list，是定长的。也就是说，如果你对它做add或者remove，都会抛UnsupportedOperationException。
2. 如果修改数组的值，list中的对应值也会改变！

**Arrays.asList() 返回的是Arrays内部静态类，而不是Java.util.ArrayList的类。这个java.util.Arrays.ArrayList有set(),get(),contains()方法，但是没有任何add() 方法，所以它是固定大小的**

如果希望避免这两个坑，请改用这个方式

```java
Collections.addAll(arraylist, array);
```

stackoverflow原址：
<http://stackoverflow.com/questions/157944/how-to-create-arraylist-arraylistt-from-array-t>

## 如何用一行代码初始化一个ArrayList

### 匿名内部类

当然，还有其他方式，例如,写一个匿名内部类，然后在其中做初始化（也被称为 brace initialization）：

```java
ArrayList<String> list = new ArrayList<String>() {{
    add("A");
    add("B");
    add("C");
}};
```

但是，我不喜欢这个方式。只是为了做个初始化，却要在`ArrayList`的同一行后面加这么一坨代码。

### Arrays.asList

```java
List<String> places = Arrays.asList("Buenos Aires", "Córdoba", "La Plata");
```

### Collections.singletonList

```java
List<String> places = Collections.singletonList("Buenos Aires");
```

注意：后面的这两种方式，得到的是一个定长的`List`(如果add操作会抛异常）。如果你需要一个不定长的`List`,可以这样做：

```java
ArrayList<String> places = new ArrayList<>(Arrays.asList("Buenos Aires", "Córdoba", "La Plata"));

```

stackoverflow链接：
<http://stackoverflow.com/questions/1005073/initialization-of-an-arraylist-in-one-line>

## 如何将String转换为enum

假设定义了如下的enum（枚举）：

```java
public enum Blah {
    A, B, C, D
}
```

已知枚举对应的String值，希望得到对应的枚举值。例如，已知"A"，希望得到对应的枚举——Blah.A，应该怎么做？  
Enum.valueOf()是否能实现以上目的，如果是，那我如何使用？

### 答案

是的，Blah.valueOf("A") 将会得到 Blah.A

静态方法valueOf() 和 values() 不存在于源码中，而是在编译时创建，我们也可以在JavaDoc查看到它们，比如 [Dialog.ModalityTyp](http://docs.oracle.com/javase/7/docs/api/java/awt/Dialog.ModalityType.html) 就中出现这两个方法。

### 其他答案

当文本和枚举值不同时，可以采用这种方式：

```java
public enum Blah {
  A("text1"),
  B("text2"),
  C("text3"),
  D("text4");

  private String text;

  Blah(String text) {
    this.text = text;
  }

  public String getText() {
    return this.text;
  }

  public static Blah fromString(String text) {
    for (Blah b : Blah.values()) {
      if (b.text.equalsIgnoreCase(text)) {
        return b;
      }
    }
    return null;
  }
}
```

fromString方法中，throw new IllegalArgumentException("No constant with text " + text + " found") 会比直接返回null更优秀.

### 其他答案

我有一个挺赞的工具方法：

```java
/**
 * A common method for all enums since they can't have another base class
 * @param <T> Enum type
 * @param c enum type. All enums must be all caps.
 * @param string case insensitive
 * @return corresponding enum, or null
 */
public static <T extends Enum<T>> T getEnumFromString(Class<T> c, String string) {
    if( c != null && string != null ) {
        try {
            return Enum.valueOf(c, string.trim().toUpperCase());
        } catch(IllegalArgumentException ex) {
        }
    }
    return null;
}
```

你可以这么使用：

```java
public static MyEnum fromString(String name) {
    return getEnumFromString(MyEnum.class, name);
}
```

stackoverflow链接：<http://stackoverflow.com/questions/604424/convert-a-string-to-an-enum-in-java>

## 如何将String转换为Int

```java
Integer x = Integer.valueOf(str);
// or
int y = Integer.parseInt(str);
```

这两种方式有一点点不同：

- `valueOf`返回的是`java.lang.Integer`的实例
- `parseInt`返回的是基本数据类型 int

`Short.valueOf/parseShort`,`Long.valueOf/parseLong`等也是有类似差别。

另外还需注意的是，在做int类型转换时，可能会抛出NumberFormatException，因此要做好异常捕获

```java
int foo;
String StringThatCouldBeANumberOrNot = "26263Hello"; //will throw exception
String StringThatCouldBeANumberOrNot2 = "26263"; //will not throw exception
try {
      foo = Integer.parseInt(StringThatCouldBeANumberOrNot);
} catch (NumberFormatException e) {
      //Will Throw exception!
      //do something! anything to handle the exception.
}

try {
      foo = Integer.parseInt(StringThatCouldBeANumberOrNot2);
} catch (NumberFormatException e) {
      //No problem this time but still it is good practice to care about exceptions.
      //Never trust user input :)
      //do something! anything to handle the exception.
}
```

stackoverflow链接：<http://stackoverflow.com/questions/5585779/converting-string-to-int-in-java>

## 如何计算MD5值

你可以用 ```MessageDigest``` 的MD5实例来计算String的MD5值。

使用 ```MessageDigest``` 和 String 时，一定要显式声明你的数据编码类型。如果你使用无参的 ```String.getBytes()``` , 它会以当前平台的默认编码来转换数据。不同平台的默认编码可能是不同的，这可能会导致你的数据不一致。

``` java
import java.security.*;

..

byte[] bytesOfMessage = yourString.getBytes("UTF-8");
MessageDigest md = MessageDigest.getInstance("MD5");
byte[] thedigest = md.digest(bytesOfMessage);
```

如果你的要计算的数据量很大，你可以循环使用 ```.update(byte[])``` 方法来加载数据。加载完毕后用 ```.digest()``` 方法来得到计算出的MD5值。

stackoverflow链接
<http://stackoverflow.com/questions/415953/how-can-i-generate-an-md5-hash>

## 输出 Java 数组最简单的方式

因为 Java 数组中没有 toString() 方法，所以我如果直接调用数组toStrign()方法的话，只会得到它的内存地址。像这样，显得并不人性化:

```java
int[] intArray = new int[] {1, 2, 3, 4, 5};
System.out.println(intArray);     // 有时候会输出 '[I@3343c8b3'
```

所以输出一个数组最简单的方法是什么？我想要的效果是

```java
// 数字数组:
int[] intArray = new int[] {1, 2, 3, 4, 5};
//输出: [1, 2, 3, 4, 5]

// 对象数组:
String[] strArray = new String[] {"John", "Mary", "Bob"};
//输出: [John, Mary, Bob]
```

在 Java 5+ 以上中使用 Arrays.toString(arr) 或 Arrays.deepToString(arr)来打印（输出）数组。

不要忘了引入import java.util.Arrays;

```java
package packageName;
import java.util.Arrays;
```

```java
int[] intArray = new int[] {1, 2, 3, 4, 5};
System.out.println(Arrays.toString(intArray));
//输出: [1, 2, 3, 4, 5]

String[] strArray = new String[] {"John", "Mary", "Bob"};
System.out.println(Arrays.deepToString(strArray));
*//输出: [John, Mary, Bob]
```

Arrays.deepToString与Arrays.toString不同之处在于，Arrays.deepToString更适合打印多维数组
比如：  

```java
String[][] b = new String[3][4];
  for (int i = 0; i < 3; i++)
  {
   for (int j = 0; j < 4; j++)
   {
    b[i][j] = "A" + j;
   }
  } 
  System.out.println(Arrays.toString(b));
  //输出[[Ljava.lang.String;@55e6cb2a, [Ljava.lang.String;@23245e75, [Ljava.lang.String;@28b56559]
  System.out.println(Arrays.deepToString(b));
  //输出[[A0, A1, A2, A3], [A0, A1, A2, A3], [A0, A1, A2, A3]]
  
```

stackoverflow链接： <http://stackoverflow.com/questions/409784/whats-the-simplest-way-to-print-a-java-array>

## 在java中如何对比（compare）string

- `==`对应的是指针相等，也就是他们是否为同一个对象
- `.equals()`对应的是值相等，也就是逻辑相等

因此，如果你想检查两个字符串是否为相同值，那么应该用`.equals()`方法

```java
//值是相等的
new String("test").equals("test") // --> true 

// ... 值相等，但不是同个对象(指向不同的地址空间）
new String("test") == "test" // --> false 

// ... 同上
new String("test") == new String("test") // --> false 

// 这个返回true，是因为这种写法属于字符串字面量，编译器会维护一个常量池，相同的字面量，都会指向相同的一个对象
"test" == "test" // --> true 

```

因此， 值的对比，一般都是用equals方法。字符串字面量之间的对比，也可以用==（大家知其所以然即可，但没必要用==）

下面多举个字符串字面量的例子,下面代码中，前四个对比，返回true，最后一个返回false。

``` java
 public static final String test1 = "test";
 public static final String test2 = "test";

 @Test
 public void test() {

  String test3 = "test";
  String test = "test";

  System.out.println(test3.equals(test));
  System.out.println(test3 == test);
  System.out.println(test1.equals(test2));
  System.out.println(test1 == test2);
  System.out.println(test1 == new String("test"));
 }
```

### 其他

- 如果你重写了equal方法，记得相对应地修改hashcode方法，否则将会违反这两个方法的对等关系，如果两个对象是相等（equal）的，那么两个对象调用hashCode必须产生相同的整数结果，即：equal为true，hashCode必须为true，equal为false，hashCode也必须为false
- 如果要忽略大小写进行对比，可以用equalsIgnoreCase()方法

## Java的foreach循环是如何工作的？

````java
List<String> someList = new ArrayList<String>();
// add "monkey", "donkey", "skeleton key" to someList
for (String item : someList) {
    System.out.println(item);
}
````

如果不用for each语法，等价的循环语句是什么样的？

### 回答

````java
for(Iterator<String> i = someList.iterator(); i.hasNext(); ) {
    String item = i.next();
    System.out.println(item);
}
````

记住，如果需要在循环中使用i.remove;或者以某种方式获取实际的iterator，你不能使用for(:)语法，因为实际的Iterator很难被推断出来。
正如Denis Bueno写的那样，这种代码对任何实现了Iterable接口的对象都奏效。
此外，如果for(:)句法中右侧是一个数组而不是一个可迭代对象，那么内部代码用一个int型的计数器来防止数组越界。详见Java Language Specification:
<http://docs.oracle.com/javase/specs/jls/se8/html/jls-14.html#jls-14.14.2>

stackoverflow链接：<http://stackoverflow.com/questions/85190/how-does-the-java-for-each-loop-work>

## 如何测试一个数组是否包含指定的值

指定数组，如:

```java
public static final String[] VALUES = new String[] {"AB","BC","CD","AE"};
```

现在制定一个值 s，有哪些比较好的方式，判断这个数组 VALUES 是否包含值 s？

## 简单且优雅的方法

1. Arrays.asList(...).contains(...)

2. 使用 Apache Commons Lang包中的ArrayUtils.contains

```java
String[] fieldsToInclude = { "id", "name", "location" };

if ( ArrayUtils.contains( fieldsToInclude, "id" ) ) {
    // Do some stuff.
}
```

## 自己写逻辑

问题的本质，其实是一个查找的问题，即查找一个数组是否包含某个值。对于原始类型，若是无序的数组，可以直接写一个 for 循环:

```java
public static boolean useLoop(String[] arr, String targetValue) {
    for(String s: arr){
        if(s.equals(targetValue))
            return true;
    }
    return false;
}
```

若是有序的数组，可以考虑二分查找或者其他查找算法:

```java
public static boolean useArraysBinarySearch(String[] arr, String targetValue) { 
    int a =  Arrays.binarySearch(arr, targetValue);
    if(a >= 0)
        return true;
    else
        return false;
}
```

若数组里包含的是一个个对象，实际上比较就是引用是否相等(String 类型是判断 值是否相等)，本质就是比较 hashcode 和 equal 方法，可以考虑使用 List 或者 Set，如下

```java
public static boolean useList(String[] arr, String targetValue) {
    return Arrays.asList(arr).contains(targetValue);
}
```

```java
public static boolean useLoop(String[] arr, String targetValue) {
    for(String s: arr){
        if(s.equals(targetValue))
            return true;
    }
    return false;
}
```

stackoverflow原址:<http://stackoverflow.com/questions/1128723/how-can-i-test-if-an-array-contains-a-certain-value>

## 便捷地将两个数组合到一起

### 一行代码搞定

Apache Commons Lang library [`ArrayUtils.addAll(T[], T...)`](http://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/ArrayUtils.html#addAll%28T%5B%5D,%20T...%29)就是专门干这事的

代码：

```java
String[] both = ArrayUtils.addAll(first, second);
```

### 不借助依赖包

#### 非泛型

把下面的`Foo`替换成你自己的类名

```java
public Foo[] concat(Foo[] a, Foo[] b) {
   int aLen = a.length;
   int bLen = b.length;
   Foo[] c= new Foo[aLen+bLen];
   System.arraycopy(a, 0, c, 0, aLen);
   System.arraycopy(b, 0, c, aLen, bLen);
   return c;
}
```

#### 泛型

```java
public <T> T[] concatenate (T[] a, T[] b) {
    int aLen = a.length;
    int bLen = b.length;

    @SuppressWarnings("unchecked")
    T[] c = (T[]) Array.newInstance(a.getClass().getComponentType(), aLen+bLen);
    System.arraycopy(a, 0, c, 0, aLen);
    System.arraycopy(b, 0, c, aLen, bLen);

    return c;
}
```

注意，泛型的方案不适用于基本数据类型（int，boolean……)

## Java修饰符：public，protected，private，不加修饰符。有什么区别呢？

如下表所示,Y表示能访问(可见性），N表示不能访问，例如第一行的第3个Y，表示类的变量/方法如果是用public修饰，它的子类能访问这个变量/方法

 | 修饰符    | 类内部 | 同个包（package） | 子类            | 其他范围 |
 | --------- | ------ | ----------------- | --------------- | -------- |
 | public    | Y      | Y                 | Y               | Y        |
 | protected | Y      | Y                 | Y               | N        |
 | 无修饰符  | Y      | Y                 | N or Y(见说明） | N        |
 | private   | Y      | N                 | N               | N        |

说明：
需要特别说明“无修饰符”这个情况，子类能否访问父类中无修饰符的变量/方法，取决于子类的位置。如果子类和父类在同一个包中，那么子类可以访问父类中的无修饰符的变量/方法，否则不行。
