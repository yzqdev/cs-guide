# 数组

> 数组是存储多个相同类型数据的容器，长度固定，索引从 0 开始。

## 声明与初始化

```java
// 声明方式（推荐第一种）
int[] arr1;      // 推荐
int arr2[];      // C 风格，不推荐

// 初始化 — 静态初始化
int[] numbers = {1, 2, 3, 4, 5};

// 初始化 — 动态初始化
int[] numbers = new int[5];  // 创建长度为 5 的数组，默认值 0

// 初始化 — 先声明后赋值
int[] numbers;
numbers = new int[]{1, 2, 3, 4, 5};  // 注意：不能省略 new int[]
```

### 默认初始值

| 类型 | 默认值 |
|------|--------|
| `int[]`, `byte[]`, `short[]`, `long[]` | `0` |
| `double[]`, `float[]` | `0.0` |
| `boolean[]` | `false` |
| `char[]` | `'\u0000'`（空字符） |
| 对象数组（如 `String[]`） | `null` |

## 访问与修改

```java
int[] arr = {10, 20, 30, 40, 50};

// 访问
int first = arr[0];   // 10
int last = arr[arr.length - 1];  // 50

// 修改
arr[2] = 100;  // {10, 20, 100, 40, 50}

// 长度
int len = arr.length;  // 5（注意：length 是属性，不是方法）

// 遍历
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// 增强 for 循环遍历
for (int num : arr) {
    System.out.println(num);
}
```

## 常见操作

### 排序

```java
int[] arr = {5, 3, 1, 4, 2};
Arrays.sort(arr);  // 升序排序
System.out.println(Arrays.toString(arr));  // [1, 2, 3, 4, 5]

// 部分排序
Arrays.sort(arr, 0, 3);  // 只排序 [0, 3) 区间
```

### 查找

```java
int[] arr = {1, 2, 3, 4, 5};
int index = Arrays.binarySearch(arr, 3);  // 2（二分查找，数组必须有序）

// 线性查找
public static int findIndex(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
```

### 填充

```java
int[] arr = new int[5];
Arrays.fill(arr, 100);       // [100, 100, 100, 100, 100]
Arrays.fill(arr, 1, 4, 50);  // [100, 50, 50, 50, 100]
```

### 复制

```java
int[] original = {1, 2, 3, 4, 5};

int[] copy1 = Arrays.copyOf(original, 3);      // [1, 2, 3]（截取前 3 个）
int[] copy2 = Arrays.copyOf(original, 7);      // [1, 2, 3, 4, 5, 0, 0]（扩充）
int[] copy3 = Arrays.copyOfRange(original, 1, 4);  // [2, 3, 4]

// System.arraycopy（底层方法，效率最高）
int[] dest = new int[5];
System.arraycopy(original, 0, dest, 0, 5);
```

### 比较

```java
int[] arr1 = {1, 2, 3};
int[] arr2 = {1, 2, 3};
int[] arr3 = {1, 2, 4};

Arrays.equals(arr1, arr2);  // true
Arrays.equals(arr1, arr3);  // false

// 多维数组比较
int[][] deep1 = {{1, 2}, {3, 4}};
int[][] deep2 = {{1, 2}, {3, 4}};
Arrays.deepEquals(deep1, deep2);  // true
```

### 转换为字符串

```java
int[] arr = {1, 2, 3, 4, 5};
System.out.println(Arrays.toString(arr));        // [1, 2, 3, 4, 5]

// 多维数组
int[][] matrix = {{1, 2}, {3, 4}};
System.out.println(Arrays.deepToString(matrix)); // [[1, 2], [3, 4]]
```

## 多维数组

```java
// 声明
int[][] matrix = new int[3][4];  // 3 行 4 列

// 静态初始化
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// 不规则数组（每行长度可以不同）
int[][] jagged = new int[3][];
jagged[0] = new int[2];
jagged[1] = new int[3];
jagged[2] = new int[1];

// 遍历二维数组
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}

// 增强 for 遍历
for (int[] row : matrix) {
    for (int num : row) {
        System.out.print(num + " ");
    }
    System.out.println();
}
```

## 数组工具类 Arrays

```java
import java.util.Arrays;

int[] arr = {5, 2, 8, 1, 9};

// 并行排序（大数组时性能更好）
Arrays.parallelSort(arr);

// 数组 → List
List<Integer> list = Arrays.asList(1, 2, 3);
// 注意：这个 List 是定长的，不能 add/remove
// 如需可变 List: new ArrayList<>(Arrays.asList(...))

// 判断是否所有元素满足条件（Java 8+）
boolean allPositive = Arrays.stream(arr).allMatch(n -> n > 0);

// 构造流
int sum = Arrays.stream(arr).sum();
double avg = Arrays.stream(arr).average().orElse(0);
```

## 可变参数

```java
public static int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) {
        total += n;
    }
    return total;
}

// 调用
sum(1, 2, 3);         // 6
sum(1, 2, 3, 4, 5);  // 15
sum();                // 0

// 可变参数必须是方法最后一个参数
public void print(String prefix, String... messages) {
    for (String msg : messages) {
        System.out.println(prefix + msg);
    }
}
```

## 练习

```java
// 1. 冒泡排序
int[] arr = {5, 3, 8, 1, 2};
for (int i = 0; i < arr.length - 1; i++) {
    for (int j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
System.out.println(Arrays.toString(arr));  // [1, 2, 3, 5, 8]

// 2. 找出数组中的最大值和最小值
int[] arr = {12, 45, 7, 89, 23, 56};
int max = Arrays.stream(arr).max().getAsInt();
int min = Arrays.stream(arr).min().getAsInt();
System.out.println("max=" + max + ", min=" + min);

// 3. 数组反转
int[] arr = {1, 2, 3, 4, 5};
for (int i = 0, j = arr.length - 1; i < j; i++, j--) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
System.out.println(Arrays.toString(arr));  // [5, 4, 3, 2, 1]
```
