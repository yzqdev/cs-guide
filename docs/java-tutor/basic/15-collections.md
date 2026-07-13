# 集合框架

> Java 集合框架（Collections Framework）提供了一套接口和类，用于存储和操作一组对象。

## 集合框架体系

```
Collection（接口）
├── List（有序、可重复）
│   ├── ArrayList（数组实现，查询快）
│   ├── LinkedList（链表实现，增删快）
│   └── Vector（线程安全，已少用）
│       └── Stack（栈）
├── Set（无序、不可重复）
│   ├── HashSet（哈希表实现，最快）
│   ├── LinkedHashSet（有序的 HashSet）
│   └── TreeSet（红黑树实现，可排序）
└── Queue（队列，FIFO）
    ├── LinkedList
    └── PriorityQueue（优先级队列）

Map（接口，键值对）
├── HashMap（哈希表，最快）
├── LinkedHashMap（有序的 HashMap）
├── TreeMap（红黑树，键可排序）
└── Hashtable（线程安全，已少用）
```

## List

### ArrayList — 数组实现

```java
// 创建
List<String> list = new ArrayList<>();          // JDK 7+ 菱形语法
List<String> list2 = new ArrayList<>(20);       // 指定初始容量
List<String> list3 = new ArrayList<>(list);     // 从其他集合创建

// 常用操作
list.add("A");              // 追加到末尾
list.add(0, "B");           // 在指定位置插入
list.addAll(Arrays.asList("C", "D"));  // 添加多个

list.get(0);                // 获取指定位置元素
list.set(0, "Z");           // 修改指定位置元素
list.remove(0);             // 移除指定位置元素
list.remove("A");           // 移除指定对象

list.size();                // 大小
list.isEmpty();             // 是否为空
list.contains("A");         // 是否包含

list.indexOf("A");          // 首次出现位置
list.lastIndexOf("A");      // 最后出现位置

list.subList(0, 2);         // 截取子列表 [0, 2)

list.toArray(new String[0]); // 转为数组
```

### LinkedList — 链表实现

```java
LinkedList<String> linkedList = new LinkedList<>();

// List 方法
linkedList.add("A");
linkedList.get(0);
linkedList.remove(0);

// 额外提供的方法
linkedList.addFirst("First");     // 头部添加
linkedList.addLast("Last");       // 尾部添加
linkedList.getFirst();            // 获取头部
linkedList.getLast();             // 获取尾部
linkedList.removeFirst();         // 移除头部
linkedList.removeLast();          // 移除尾部

// 可作为队列使用
linkedList.offer("X");            // 入队（尾部）
String head = linkedList.poll();  // 出队（头部）
linkedList.peek();                // 查看头部不移除

// 可作为栈使用
linkedList.push("Top");           // 入栈（头部）
String top = linkedList.pop();    // 出栈（头部）
```

### ArrayList vs LinkedList

| 对比 | ArrayList | LinkedList |
|------|-----------|------------|
| 底层结构 | 动态数组 | 双向链表 |
| 随机访问 `get(i)` | O(1) | O(n) |
| 插入/删除 | O(n)（要移动元素） | O(1)（只需改指针） |
| 内存占用 | 较少 | 较多（存储前后指针） |
| 适用场景 | 查询多，增删少 | 增删多，查询少 |

## Set

### HashSet — 哈希表实现

```java
// 创建
Set<String> set = new HashSet<>();

// 常用操作
set.add("A");
set.add("B");
set.add("A");  // 重复元素不会添加，返回 false

set.size();              // 2
set.contains("A");       // true
set.remove("A");
set.isEmpty();

// 遍历（无序）
for (String s : set) {
    System.out.println(s);
}

// 去重示例
List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3);
Set<Integer> unique = new HashSet<>(numbers);
System.out.println(unique);  // [1, 2, 3]
```

### TreeSet — 红黑树，可排序

```java
// 自然排序（元素必须实现 Comparable）
Set<String> treeSet = new TreeSet<>();
treeSet.add("Banana");
treeSet.add("Apple");
treeSet.add("Cherry");
System.out.println(treeSet);  // [Apple, Banana, Cherry]（按字母排序）

// 自定义排序
Set<Person> personSet = new TreeSet<>((p1, p2) -> 
    p1.getAge() - p2.getAge());
```

## Map

### HashMap

```java
// 创建
Map<String, Integer> map = new HashMap<>();

// 添加 / 修改
map.put("Alice", 25);
map.put("Bob", 30);
map.put("Alice", 26);  // 键已存在，更新值

// 获取
int age = map.get("Alice");          // 26
int defaultValue = map.getOrDefault("Charlie", 0);  // 0

// 删除
map.remove("Bob");

// 判断
map.containsKey("Alice");   // true
map.containsValue(26);      // true
map.isEmpty();
map.size();

// 遍历
// 方式 1：遍历 Entry
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}

// 方式 2：遍历 Key
for (String key : map.keySet()) {
    System.out.println(key);
}

// 方式 3：遍历 Value
for (Integer value : map.values()) {
    System.out.println(value);
}

// 方式 4：Java 8+ forEach
map.forEach((key, value) -> System.out.println(key + " = " + value));

// 其他方法
map.putIfAbsent("David", 28);  // 仅在键不存在时添加
map.merge("Alice", 1, Integer::sum);  // 合并值
```

### HashMap vs TreeMap vs LinkedHashMap

| 对比 | HashMap | TreeMap | LinkedHashMap |
|------|---------|---------|---------------|
| 顺序 | 无序 | 键排序（自然/自定义） | 插入顺序 / 访问顺序 |
| 性能 | O(1) | O(log n) | O(1) |
| 底层 | 哈希表 | 红黑树 | 哈希表 + 双向链表 |
| 适用 | 通用 | 需要排序 | 需要保持插入顺序 |

## Collections 工具类

```java
import java.util.Collections;

List<String> list = new ArrayList<>(Arrays.asList("C", "A", "B", "D"));

// 排序
Collections.sort(list);                  // [A, B, C, D]
Collections.sort(list, Comparator.reverseOrder()); // [D, C, B, A]
Collections.shuffle(list);                // 随机打乱
Collections.reverse(list);                // 反转

// 查找
int index = Collections.binarySearch(list, "C");  // 二分查找（必须先排序）
String max = Collections.max(list);       // 最大值
String min = Collections.min(list);       // 最小值

// 填充
Collections.fill(list, "X");             // 全部替换为 X
Collections.replaceAll(list, "X", "Y");  // 替换指定元素
Collections.nCopies(10, "A");            // 创建 10 个 "A" 的列表

// 不可变集合
List<String> unmodifiableList = Collections.unmodifiableList(list);
// unmodifiableList.add("Z");  // ❌ UnsupportedOperationException

// 空集合
List<String> emptyList = Collections.emptyList();
Set<String> emptySet = Collections.emptySet();
Map<String, String> emptyMap = Collections.emptyMap();
```

## 集合的遍历方式对比

```java
List<String> list = Arrays.asList("A", "B", "C");

// 1. 传统 for 循环
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}

// 2. 增强 for 循环（for-each）
for (String s : list) {
    System.out.println(s);
}

// 3. Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.equals("B")) {
        it.remove();  // 遍历时安全删除
    }
    System.out.println(s);
}

// 4. Java 8+ forEach
list.forEach(System.out::println);

// 5. Java 8+ Stream
list.stream()
    .filter(s -> s.startsWith("A"))
    .forEach(System.out::println);
```

## 最佳实践

```java
// 1. 使用接口类型声明变量（面向接口编程）
List<String> list = new ArrayList<>();    // ✅
// ArrayList<String> list = new ArrayList<>();  // ❌ 不利于更换实现

// 2. 指定初始容量
List<String> list = new ArrayList<>(100);  // 已知大小时指定容量

// 3. 使用 foreach 或 Iterator 遍历时不要增删（除非使用 Iterator.remove）
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("B")) {
        it.remove();  // ✅ 安全
    }
}

// 4. 使用 Map.computeIfAbsent 简化代码
// ❌ 不推荐
Map<String, List<String>> map = new HashMap<>();
if (!map.containsKey("key")) {
    map.put("key", new ArrayList<>());
}
map.get("key").add("value");

// ✅ 推荐
map.computeIfAbsent("key", k -> new ArrayList<>()).add("value");
```

## 练习

```java
// 1. 统计字符串中每个字符出现的次数
String text = "hello world";
Map<Character, Integer> freq = new HashMap<>();
for (char c : text.toCharArray()) {
    freq.put(c, freq.getOrDefault(c, 0) + 1);
}
System.out.println(freq);  // {h=1, e=1, l=3, o=2,  =1, w=1, r=1, d=1}

// 2. 使用 TreeSet 对学生按成绩排序
class Student implements Comparable<Student> {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }

    @Override
    public int compareTo(Student o) {
        return Integer.compare(this.score, o.score);  // 按成绩升序
    }

    @Override
    public String toString() {
        return name + "=" + score;
    }
}

Set<Student> students = new TreeSet<>();
students.add(new Student("张三", 85));
students.add(new Student("李四", 92));
students.add(new Student("王五", 78));
System.out.println(students);  // [王五=78, 张三=85, 李四=92]
```
