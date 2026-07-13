# Java 常用操作

> 日常 Java 开发中的常用代码片段速查，涵盖数组、集合、枚举、字符串、时间等常见操作。

## Maven 编译版本配置

在 `pom.xml` 的 `<plugin>` 中配置 `maven-compiler-plugin`：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.8.1</version>
    <configuration>
        <source>17</source>
        <target>17</target>
        <encoding>utf-8</encoding>
    </configuration>
</plugin>
```

## 时间转换

```java
// Timestamp 转 LocalDateTime
Timestamp time = Timestamp.from(Instant.now());
LocalDateTime localDateTime = time.toLocalDateTime();

// LocalDateTime 转 Timestamp
DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
Timestamp ts = Timestamp.valueOf(LocalDateTime.now().format(dtf));
```

---

## 声明数组

### 原始类型

```java
int[] myIntArray = new int[3];
int[] myIntArray = {1, 2, 3};
int[] myIntArray = new int[]{1, 2, 3};
```

### 对象类型

```java
String[] myStringArray = new String[3];
String[] myStringArray = {"a", "b", "c"};
String[] myStringArray = new String[]{"a", "b", "c"};
```

[StackOverflow: Declare array in Java?](http://stackoverflow.com/questions/1200621/declare-array-in-java)

## 数组转 List

```java
Element[] array = {new Element(1), new Element(2), new Element(3)};

// 方式一：Arrays.asList
new ArrayList<Element>(Arrays.asList(array))

// 方式二：Collections.addAll（推荐，避免定长问题）
Collections.addAll(arraylist, array);
```

:::warning 注意
`Arrays.asList()` 返回的 List 是**定长**的，不支持 `add()` / `remove()` 操作，会抛出 `UnsupportedOperationException`。且原数组的值发生变化时，List 中的对应值也会改变。
:::

## 一行代码初始化 ArrayList

```java
// Arrays.asList（定长）
List<String> places = Arrays.asList("Buenos Aires", "Córdoba", "La Plata");

// 可变 List
ArrayList<String> places = new ArrayList<>(Arrays.asList("Buenos Aires", "Córdoba", "La Plata"));

// 单元素 List
List<String> places = Collections.singletonList("Buenos Aires");

// 匿名内部类（不推荐）
ArrayList<String> list = new ArrayList<String>() {{
    add("A");
    add("B");
    add("C");
}};
```

[StackOverflow: Initialization of an ArrayList in one line](http://stackoverflow.com/questions/1005073/initialization-of-an-arraylist-in-one-line)

## String 转 Enum

```java
public enum Blah {
    A, B, C, D
}

// 基础用法
Blah.valueOf("A")  // 返回 Blah.A

// 自定义文本映射
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
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }
}
```

### 通用工具方法

```java
public static <T extends Enum<T>> T getEnumFromString(Class<T> c, String string) {
    if (c != null && string != null) {
        try {
            return Enum.valueOf(c, string.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            // ignore
        }
    }
    return null;
}
```

[StackOverflow: Convert a String to an enum in Java](http://stackoverflow.com/questions/604424/convert-a-string-to-an-enum-in-java)

## String 转 Int

```java
Integer x = Integer.valueOf(str);  // 返回 Integer 对象
int y = Integer.parseInt(str);     // 返回 int 基本类型
```

注意捕获 `NumberFormatException`：

```java
try {
    int foo = Integer.parseInt("26263");
} catch (NumberFormatException e) {
    // 处理异常
}
```

[StackOverflow: Converting String to int in Java](http://stackoverflow.com/questions/5585779/converting-string-to-int-in-java)

## 计算 MD5 值

```java
import java.security.*;

byte[] bytesOfMessage = yourString.getBytes("UTF-8");
MessageDigest md = MessageDigest.getInstance("MD5");
byte[] thedigest = md.digest(bytesOfMessage);
```

:::tip
一定要显式指定编码（如 `"UTF-8"`），不同平台默认编码可能不同，会导致 MD5 结果不一致。
:::

[StackOverflow: How can I generate an MD5 hash?](http://stackoverflow.com/questions/415953/how-can-i-generate-an-md5-hash)

## 输出数组

```java
int[] intArray = {1, 2, 3, 4, 5};
System.out.println(Arrays.toString(intArray));       // [1, 2, 3, 4, 5]

String[][] b = new String[3][4];
System.out.println(Arrays.deepToString(b));          // 多维数组
```

[StackOverflow: What's the simplest way to print a Java array?](http://stackoverflow.com/questions/409784/whats-the-simplest-way-to-print-a-java-array)

## 字符串比较

```java
// == 比较引用地址
// .equals() 比较值

new String("test").equals("test")  // true
new String("test") == "test"       // false
"test" == "test"                   // true（字符串字面量，常量池）

// 忽略大小写
"Test".equalsIgnoreCase("test")  // true
```

:::tip
重写 `equals()` 时必须同时重写 `hashCode()`，保证相等的对象有相同的 hashCode。
:::

## foreach 循环原理

```java
List<String> someList = new ArrayList<>();
for (String item : someList) {
    System.out.println(item);
}

// 等价于
for (Iterator<String> i = someList.iterator(); i.hasNext(); ) {
    String item = i.next();
    System.out.println(item);
}
```

[StackOverflow: How does the Java for each loop work?](http://stackoverflow.com/questions/85190/how-does-the-java-for-each-loop-work)

## 判断数组是否包含某个值

```java
// 方式一：Arrays.asList + contains
Arrays.asList(arr).contains(targetValue);

// 方式二：Apache Commons Lang
ArrayUtils.contains(fieldsToInclude, "id");

// 方式三：手动遍历
public static boolean useLoop(String[] arr, String targetValue) {
    for (String s : arr) {
        if (s.equals(targetValue))
            return true;
    }
    return false;
}

// 方式四：有序数组使用二分查找
Arrays.binarySearch(arr, targetValue) >= 0;
```

[StackOverflow: How can I test if an array contains a certain value?](http://stackoverflow.com/questions/1128723/how-can-i-test-if-an-array-contains-a-certain-value)

## 数组合并

```java
// 使用 Apache Commons Lang
String[] both = ArrayUtils.addAll(first, second);

// 原生方式（非泛型）
public Foo[] concat(Foo[] a, Foo[] b) {
    int aLen = a.length;
    int bLen = b.length;
    Foo[] c = new Foo[aLen + bLen];
    System.arraycopy(a, 0, c, 0, aLen);
    System.arraycopy(b, 0, c, aLen, bLen);
    return c;
}

// 原生方式（泛型）
@SuppressWarnings("unchecked")
public <T> T[] concatenate(T[] a, T[] b) {
    int aLen = a.length;
    int bLen = b.length;
    T[] c = (T[]) Array.newInstance(a.getClass().getComponentType(), aLen + bLen);
    System.arraycopy(a, 0, c, 0, aLen);
    System.arraycopy(b, 0, c, aLen, bLen);
    return c;
}
```

:::warning
泛型方式不适用于基本数据类型（int、boolean 等）。
:::

## 访问修饰符

| 修饰符 | 类内部 | 同包 | 子类 | 其他 |
|--------|--------|------|------|------|
| public | Y | Y | Y | Y |
| protected | Y | Y | Y | N |
| 无修饰符 | Y | Y | N 或 Y（注） | N |
| private | Y | N | N | N |

> **注：** 无修饰符时，子类能否访问取决于子类是否与父类在同一包中。
