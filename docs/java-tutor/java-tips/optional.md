# java的optional类用法

1. 简介
本文简要介绍一下Java 8 引入的 Optional 类。引入Optional 类的主要目的是为使用可选值代替 null 提供类型级解决方案。如果，你想知道为什么需要更深入的了解和使用 Optional 类，可以参考甲骨文官方文章。

查找另一个教程 [链接](https://blog.csdn.net/weixin_30905133/article/details/96832342)
Optional 是 java.util.package 的一部分，为了能够使用，需要导入Optional：

```java
import java.util.Optional;
```

2. 创建 Optional 对象
有多种方式可以创建 Optional 对象，可以使用下面的方法创建一个空的 Optianal对象:

```java
    @Test
    public void test_createsEmptyOptionalObject() throws Exception {
        Optional<Object> empty = Optional.empty();
        assertFalse(empty.isPresent());
    }
```

3. 可以使用 isPresent API 来检查 Optional 对象是否有封装的值，当且仅当 _Optional_ 封装了非 null 值时，API才返回 true。

还可以使用 Optional 提供了静态方法创建 Optional 对象：

```java
@Test
public void test_createOptionalObjectWithStaticMethod() throws Exception {
    String val = "not null";
    Optional<String> hasVal = Optional.of(val);
    assertTrue(hasVal.isPresent());
}
```

如果 Optional 对象有封装的值（非 null ），可以对封装的值进行处理：

```java
@Test
public void test_processOptionalValue() throws Exception {
    String val = "not null";
    Optional<String> hasVal = Optional.of(val);
    System.out.println(hasVal.toString());
    assertEquals("Optional[not null]", hasVal.toString());
}
```

当使用 Optional 提供的静态方法 of 创建 Optional 对象时，方法的参数不能null，否则，方法会抛出 NullPointerException：

```java
@Test(expected = NullPointerException.class)
public void test_throwNullPointerException() throws Exception {
    String val = null;
    Optional<String> hasVal = Optional.of(val);
}
```

如果构建 Optional 对象时可以传入 null 参数，可以使用 ofNullable 方法代替of ：

```java
@Test
public void test_passNullParamNoException() throws Exception {
    String val = null;
    Optional<String> hasVal = Optional.ofNullable(val);
    assertFalse(hasVal.isPresent());
}
```

使用 ofNullable 方法创建 Optional 对象时，如果传入一个 null 参数，方法不会抛出异常，而是返回一个空的 Optional 对象，和使用 Optional.empty API 创建的一样。

3. 检查值是否存在
当得到一个从其他方法返回或自己创建的 Optional 对象后，可以使用isPresent API 检查 Optional 对象是否有封装值：

```java
@Test  
public void test_checkValuePresentOrNot() throws Exception {
Optional opt = Optional.of("has value");
assertTrue(opt.isPresent()); 
}
```

4. 当且仅当Optional 对象封装一个非空值时，isPresent API才返回true。

```java
 opt = Optional.ofNullable(null);
 assertFalse(opt.isPresent());
```

在Java 11 中可以使用 isEmpty API 完成相反的工作:

```java
@Test
public void test_checkValuePresentOrNotJava11() throws Exception {
    Optional<String> opt = Optional.of("has value");
    assertFalse(opt.isEmpty());

    opt = Optional.ofNullable(null);
    assertTrue(opt.isEmpty());
}
```

当且仅当 Optional 对象封装的值为 null 时，isEmpty 返回true，其他情况返回false。

4. 使用 ifPresent() 进行条件处理
ifPresent API 允许我们在 Optional 对象封装的值非空时执行一些代码，在没有Optional 之前，最常用的方法是使用 if 语句进行判断，结果为真时执行代码逻辑：

```java
if(name != null){
System.out.println(name.length);
}
```

5. 这段代码在执行其他代码之前先检查 name 变量是否为 null。冗长并不是这种方法的唯一问题一，这种方法固有很多潜在的bug。

在习惯了这种方法之后，很容易忘记在代码的某些部分执行空检查。如果 null 值进入该代码，可能会在运行时导致 NullPointerException 异常。 当程序因输入问题而失败时，通常是编码不够健壮导致，也是代码实践不好的结果。
作为强制执行良好编程实践的一种方式，Optional 可以明确地处理 null。 在典型的函数式编程风格中，我们可以对实际存在的对象执行操作，使用Java 8重构上面的代码如下：

```java
@Test
public void doSomeThingWhenExist()  throws Exception {
    Optional<String> opt = Optional.of("baeldung");
    opt.ifPresent(name -> System.out.println(name.length()));
}
```

5. 使用 orElse 获取封装的值
orElse API 用于从 Optional 实例中获取封装的值，orElse 的唯一参数作为Optional 无封装值时的默认值，这点类似 System.getProperty API。如果，Optional 有封装值 orElse API返回 Optional 封装的值，否则返回参数的值。

```java
    @Test
    public void test_getValueUseorElse() throws Exception {
        Optional hasVal = Optional.of("Hello");
        String val = hasVal.orElse("no value");
        assertEquals("Hello", val);
    }
```

```java
 Optional<String> noVal = Optional.empty();
 String defaultVal = noVal.orElse("default");
 assertEquals("default", defaultVal);
```

6. 使用 orElseGet 获封装的值
orElseGet API 功能和 orElse 类似，两者的不同之处在于 orElseGet 的参数为一个 Supplier 实例，当 Optional 对象无封装值时，orElseGet 调用 Supplier 实例的 get 方法，并将返回值作为 orElseGet 的返回值。

```java
    @Test
    public void test_getValueUseorElseget() throws Exception {
        Optional<String> hasVal = Optional.of("Hello");
        String val = hasVal.orElseGet(() -> "no value");
        assertEquals("Hello", val);
    }


 Optional<String> noVal = Optional.empty();
 String defaultVal = noVal.orElseGet(() -> "default");
 assertEquals("default", defaultVal);
```

7. orElse 和 orElseGet 的区别
在 Optional 对象无封装值时，orElse 和 orElseGet 并无本质上的区别，两个API 都返回各自的默认值。但是，当 Optional 对象有封装值时两者有很大的区别，而且两者在性能上的差异也十分明显。一句话总结两者的差异就是：orElse 会触发获取默认值的动作，尽管并不需要。为了更加形象的说明，这里提供一个方法用于获取默认值，方法中使用 sleep 模拟这是一个耗时的操作：

```java
    private String getDefaultValue() {
        System.out.println("enter method get default value");
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "default value";
    }
```

8. 创建一个非空的 Optional 对象，分别调用 orElse 和 orElseGet 方法，观察两者行为上的差异：

```java
    @Test
    public void test_differenceorElseAndorElseGet() throws Exception {
        Optional<String> hasVal = Optional.of("value");
        System.out.println("enter orElse method");
        String var0 = hasVal.orElse(getDefaultValue());
    }
```

9. 上面代码的输出结果如下：

```java
System.out.println("enter orElseGet method");
String var1 = hasVal.orElseGet(this::getDefaultValue);
```

```java
@Test(expected  = IllegalArgumentException.class) 
public void test_throwsExecption() {
String nullName = null;
String name = Optional.ofNullable(nullName).orElseThrow(
IllegalArgumentException::new);
} 
```

enter orElse method
enter method get default value
enter orElseGet method
从输出结果可以非常清晰的看出两个API之间的差异，为了更好的性能，在编码中优先使用 orElseGet API 获取 Optional 的值。。

8. 使用 orElseThrow 抛出异常
orElseThrow 与 orElse 和 orElseGet API类似，orElseThrow 提供了一种在Optional 为空时的处理方法-抛异常而不是返回默认值。

8. 使用 get() 获取值
get 是获取 _Optional_ 值的最后方法（不是一个好方法）：

```java
@Test  
public void test_getValueUseGet() {
Optional opt = Optional.of("value");
String name = opt.get();
assertEquals("value", name);
}
```

10. 和上面三种获取值的方法不同，_get_ 方法只能返回 Optional 封装的值，如果Optional 为空，方法会抛出 NoSuchElementException 异常。

```java
@Test(expected  = NoSuchElementException.class) 
public void test_throwsNoSuchElementException() {
String nullName = null;
String name = Optional.ofNullable(nullName).get();
}
```

11. 抛出异常是 get API 的最大缺陷，Optional 应该帮助我们尽可能屏蔽这些不可见异常，因此 get API 和 _Optional_ 目标相背而驰，该方法将来可能被废弃。应该尽可能的使用其他方法获取值。
11. 使用 filter() 进行过滤
filter API 被用于对 Optional 封装的值进行一个内联测试，filter API 使用一个谓词作为参数并返回一个Optional 对象。如果，被封装的值通过测试则返回Optional 本身，否则返回一个空的 Optional 对象。

```java
@Test  
public void test_filter() throws Exception {
Optional passTest = Optional.of(101);
assertTrue(passTest.filter(integer -> integer.intValue() > 100).isPresent());
Optional notPassTest = Optional.of(99);
assertFalse(notPassTest.filter(integer -> integer.intValue() > 100).isPresent());
}
```

13. filter API 的工作套路：根据某个预定义的规则拒绝 Optional 对象封装的值，可以用于拒绝格式错误的邮箱地址或强度不够的密码。

接下来看一个更有趣的例子（有些场景下不使用 Optional 为了安全的操作，我们通常需要进行多次 null 检查）。假设，我们打算购买一部手机并且只关心手机的价格。我们从手机购买网站得到手机价格的推送消息，手机价格被封装在一个对象中，数据结构定义如下：

```java
public class Phone {
private Double price;
public Phone(Double price) {
    this.price = price;
}

//standard getters and setters
```

}
当把网址的推送数据传递给检查手机价格是否满足我们的预算要求的函数时（假设能接受的手机价格为3000-5000），如果不使用 _Optional_ 一种可能的代码实现如下：

```java
public boolean checkPriceWithoutOptional(Phone phone) {
    boolean isInRange = false;

    if (phone != null && phone.getPrice() != null
            && (phone.getPrice() >= 3000
            && phone.getPrice() <= 5000)) {

        isInRange = true;
    }
    return isInRange;
}
```

为了实现上面的功能我们写了很多代码，尤其在 if 的条件表达式中，函数真正的核心代码仅仅是检查价格范围，其他多余的检查对于实现功能来说都是不必要的。代码冗余可能并不是最严重的问题，忘记 null 检查可能更加糟糕，而这不会引发任何编译错误（代码静态检查工具可以发现并上报告警）。

使用 Optional 的 filter API 可以以一种优雅的方式实现同样的功能：

```java
public boolean checkPriceWithOptional(Phone phone) {
    return Optional.ofNullable(phone)
            .map(Phone::getPrice)
            .filter(p -> p >= 3000)
            .filter(p -> p <= 5000)
            .isPresent();
}
```

使用 Optional 让代码在以下两点优于使用 if 语句检查：

给函数出入一个 null 对象，不会触发任何错误。
代码更加聚焦业务实现（价格检查），其他的事情由 Optional 负责。
11. 使用 map() 进行值变换
在之前的章节，我们已经看到如何使用过滤器接受或拒绝 Optional 封装的值。相同的语法可以用于 map API 对 Optional 封装的值进行变换。

```java
@Test
public void test_mapList2ListSize() {
    List<String> companyNames = Arrays.asList(
            "Java", "C++", "", "C", "", "Python");
    Optional<List<String>> listOptional = Optional.of(companyNames);

    int size = listOptional
            .map(List::size)
            .orElse(0);
    assertEquals(6, size);
}
```

在上面的例子中，我们使用 Optional 封装了一个字符串列表，并使用 map API 对 字符串列表进行变换，上面例子中执行的变化是获取字符串列表的长度。

map API 返回对 Optional 封装对象的计算结果，最后需要调用合适的API来获取Optional 对象的值（变换后的值）。

注意：filter API 值检查 Optional 对象封装的值并返回一个boolean类型的结果,相反 map API 对 Optional 对象封装的值进行计算并返回计算结果。

```java
@Test
public void test_mapString2StringSize() {
    String name = "Hello World";
    Optional<String> nameOptional = Optional.of(name);

    int len = nameOptional
            .map(String::length)
            .orElse(0);
    assertEquals(11, len);
}
```

我们可以链式调用 map 和 filter API 来做一些更有意义的事情。假设，我们有一段代码需要检查用户输入的密码是否正确，我们可以使用 map 对密码进行变换，使用 filter 判断密码是否正确：

```java
@Test
public void test_checkPassword() {
    String password = " password ";
    Optional<String> passOpt = Optional.of(password);
    boolean correctPassword = passOpt.filter(
        pass -> pass.equals("password")).isPresent();
    assertFalse(correctPassword);

    correctPassword = passOpt
        .map(String::trim)
        .filter(pass -> pass.equals("password"))
        .isPresent();
    assertTrue(correctPassword);
}
}
```

12. 使用 flatMap() 对值进行变换
和 map API 一样，我们也可以使用 flatMap API 作为一个替代方法对值进行变换。两者的主要区别是：map 值对未封装的值进行转换，flatMap 在处理值之前先进行“去封装”操作，然后再执行变换操作。
为了更清晰的解释两者的区别，我们假设有一个Person对象，对象有三个基本属性：名字、年龄和密码。

```java
public class Person {
private String name;
private int age;
private String password;
public Person() {
}

public Person(String name, int age, String password) {
    this.name = name;
    this.age = age;
    this.password = password;
}

public Optional<String> getName() {
    return Optional.ofNullable(name);
}

public Optional<Integer> getAge() {
    return Optional.ofNullable(age);
}

public Optional<String> getPassword() {
    return Optional.ofNullable(password);
}

// normal constructors and setters
```

}
我们创建一个Person对象，并使用 Optional 封装创建的Person对象：

```java
    Person person = new Person("john", 26, "pwd");
    Optional<Person> personOptional = Optional.of(person);
```

分别使用 map 和 flatMap API 获取名字的代码如下，从中可以看到使用 flatMap API 的代码量较使用 map 更短小，也更加容易理解。

```java
@Test
public void test_flatMap() {
    Person person = new Person("ct", 26,"pwd");
    Optional<Person> personOptional = Optional.of(person);

    Optional<Optional<String>> nameOptionalWrapper
        = personOptional.map(Person::getName);
    Optional<String> nameOptional
        = nameOptionalWrapper.orElseThrow(IllegalArgumentException::new);
    String name1 = nameOptional.orElse("");
    assertEquals("ct", name1);

    String name = personOptional
        .flatMap(Person::getName)
        .orElse("");
    assertEquals("ct", name);
}
```

13. 总结
本文简要介绍了Java 8 Optional 类的大部分重要特性，与此同时，我们也简单阐述了为什么我们选择使用Optional 代替显示的 null 检查和参数检查。最后，讲解了 orElse 和 orElseGet 之间微妙但重要的区别，关于该主题可以从拓展阅读获取更多内容。

文中的样例代码可以从 GitHub.获取。
