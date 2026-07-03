# 迭代器模式 (Iterator)

> **提供一种顺序访问聚合对象（如集合）中各个元素的方法，而不暴露其内部表示。** Java 集合框架的核心设计模式。

## 场景

- Java 集合（List、Set、Queue）的遍历
- 自定义数据结构的遍历
- 数据库游标（Cursor）

## 核心角色

| 角色 | 说明 |
|------|------|
| **Iterator（抽象迭代器）** | 定义 `hasNext()`、`next()` 等遍历方法 |
| **ConcreteIterator（具体迭代器）** | 实现迭代逻辑 |
| **Aggregate（抽象聚合）** | 定义 `iterator()` 方法 |
| **ConcreteAggregate（具体聚合）** | 返回具体的迭代器实例 |

## 代码示例

```java
import java.util.ArrayList;
import java.util.List;

// ----- Iterator -----
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// ----- Aggregate -----
interface Container<T> {
    Iterator<T> iterator();
}

// ----- ConcreteAggregate -----
class NameRepository implements Container<String> {
    private String[] names = {"张三", "李四", "王五", "赵六"};

    @Override
    public Iterator<String> iterator() {
        return new NameIterator();
    }

    // ----- ConcreteIterator（内部类） -----
    private class NameIterator implements Iterator<String> {
        private int index = 0;

        @Override
        public boolean hasNext() {
            return index < names.length;
        }

        @Override
        public String next() {
            if (hasNext()) {
                return names[index++];
            }
            throw new RuntimeException("没有更多元素");
        }
    }
}

// ----- 使用 -----
public class IteratorDemo {
    public static void main(String[] args) {
        NameRepository repository = new NameRepository();
        Iterator<String> iterator = repository.iterator();

        while (iterator.hasNext()) {
            System.out.println("姓名: " + iterator.next());
        }

        // Java 集合原生迭代器
        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.add("C");

        java.util.Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}
```

## 迭代器的变体

| 类型 | 方向 | 示例 |
|------|------|------|
| 正向迭代器 | 从头到尾 | `iterator()` |
| 反向迭代器 | 从尾到头 | `descendingIterator()`（TreeSet） |
| 双向迭代器 | 可前可后 | `ListIterator` |
| 只读迭代器 | 只能遍历 | `iterator()` |
| 可修改迭代器 | 可遍历并删除 | `iterator().remove()` |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 简化集合的遍历方式 | ❌ 对于简单集合，过度设计 |
| ✅ 单一职责原则：遍历逻辑从集合中分离 | ❌ 遍历过程中修改集合可能抛异常 |
| ✅ 可以统一遍历不同数据结构的接口 | |

## JDK 中的应用

- `java.util.Iterator` 接口 —— 所有集合的核心
- `java.util.ListIterator` —— 双向迭代器
- `java.util.Enumeration` —— 旧的迭代器接口
- `java.util.Spliterator` —— Java 8 新增的分割迭代器（支持并行流）
