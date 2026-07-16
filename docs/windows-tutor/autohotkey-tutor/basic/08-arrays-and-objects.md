---
order: 8
---

# 08 - 数组与对象

## Array（数组）

### 创建数组

```ahk
#Requires AutoHotkey v2.0

; 用 [] 创建数组
arr := [10, 20, 30, 40, 50]

; 空 Array
arr := []

; 用 Array() 函数创建
arr := Array(10, 20, 30)

; 混合类型
arr := [1, "hello", true, [1, 2]]   ; 可以包含不同类型
```

> AHK v2 数组索引从 **1** 开始（不是 0）。

### 访问与修改

```ahk
arr := [10, 20, 30, 40]

MsgBox arr[1]       ; 10（第一个元素）
MsgBox arr[4]       ; 40（最后一个元素）

; 修改元素
arr[2] := 25        ; arr 变为 [10, 25, 30, 40]

; 越界访问返回空字符串
MsgBox arr[10]      ; ""（空字符串，不是报错）
```

### 添加与删除

```ahk
arr := [10, 20, 30]

; Push — 在末尾添加
arr.Push(40)          ; [10, 20, 30, 40]
arr.Push(50, 60)      ; [10, 20, 30, 40, 50, 60] — 可添加多个

; InsertAt — 在指定位置插入
arr.InsertAt(2, 15)   ; [10, 15, 20, 30, 40, 50, 60]

; RemoveAt — 删除指定位置
arr.RemoveAt(2)       ; [10, 20, 30, 40, 50, 60] — 删除第2个

; Pop — 删除末尾并返回
last := arr.Pop()     ; last = 60, arr = [10, 20, 30, 40, 50]

; Delete — 删除指定位置（不移动后续元素，留下空洞）
arr.Delete(3)         ; arr[3] = ""（空洞），不影响 arr[4]

; Clear — 清空数组
arr.Clear()
MsgBox arr.Length     ; 0
```

### Push vs InsertAt

```ahk
; Push: 在末尾追加，最常用
arr := [1, 2]
arr.Push(3)           ; [1, 2, 3]

; InsertAt: 在指定位置插入，后续元素往后移
arr := [1, 3]
arr.InsertAt(2, 2)    ; [1, 2, 3]

; InsertAt 可以插入多个
arr := [1, 5]
arr.InsertAt(2, 2, 3, 4)  ; [1, 2, 3, 4, 5]
```

### 长度与遍历

```ahk
arr := [10, 20, 30, 40, 50]

MsgBox arr.Length      ; 5

MsgBox arr.MaxIndex()  ; 5（最大索引）

; 用 for 遍历
for index, value in arr {
    MsgBox index ": " value
}

; 用 Loop 遍历
Loop arr.Length {
    MsgBox A_Index ": " arr[A_Index]
}
```

### 数组常用操作

```ahk
; 查找元素
arr := [10, 20, 30]
pos := arr.IndexOf(20)       ; 2（第2个位置）
pos := arr.IndexOf(99)       ; 0（不存在）

; 包含判断
if arr.IndexOf(20)
    MsgBox "包含 20"

; 判断是否为空
if arr.Length = 0
    MsgBox "空数组"

; 排序
arr := [30, 10, 20]
arr.Sort()                   ; [10, 20, 30]

; 自定义排序
arr.Sort((a, b) => a > b)   ; 降序 [30, 20, 10]

; 反转
arr.Reverse()               ; [10, 20, 30] → [30, 20, 10]

; 拷贝（浅拷贝）
arr2 := arr.Clone()
```

## Map（映射/字典）

### 创建 Map

```ahk
; 用 Map() 创建
m := Map("name", "AHK", "version", 2, "type", "脚本")

; 空 Map
m := Map()

; 添加键值对
m["author"] := "Chris"
m["year"] := 2024
```

### 访问与修改

```ahk
m := Map("name", "AHK", "version", 2)

MsgBox m["name"]          ; "AHK"
MsgBox m["version"]       ; 2

; 修改
m["version"] := 2.1

; 访问不存在的键会报错！
; MsgBox m["notexist"]     ; Error!

; 安全访问：Has 先判断
if m.Has("notexist")
    MsgBox m["notexist"]
else
    MsgBox "键不存在"

; Get 方式（可设默认值）
MsgBox m.Get("notexist", "默认值")  ; "默认值" — 键不存在时返回默认值
```

### 删除键

```ahk
m := Map("a", 1, "b", 2, "c", 3)

; Delete — 删除指定键
m.Delete("b")

; Clear — 清空
m.Clear()

; Count — 键数量
MsgBox m.Count            ; 0（已清空）
```

### 遍历 Map

```ahk
m := Map("name", "AHK", "version", 2, "type", "脚本")

for key, value in m {
    MsgBox key ": " value
}
```

> Map 遍历顺序是**插入顺序**（AHK v2）。

### Map 的键类型

```ahk
; Map 可以用不同类型的键
m := Map()
m["stringKey"] := 1       ; 字符串键
m[42] := "数字键"          ; 数字键
m[true] := "布尔键"        ; 布尔键

; 区分大小写！
m["abc"] := 1
m["ABC"] := 2
MsgBox m["abc"]           ; 1
MsgBox m["ABC"]           ; 2（不同的键）
```

## Object（对象）

AHK v2 的 Object 可以定义属性和方法：

### 基本对象

```ahk
; 创建对象
obj := Object()
obj.name := "AHK"
obj.version := 2
obj.greet := GreetMethod   ; 引用函数

GreetMethod() {
    MsgBox "Hello from " this.name   ; this 指向调用对象
}

obj.greet()               ; "Hello from AHK"
```

### 用类定义对象

```ahk
; 定义类
class Animal {
    name := ""
    age := 0

    __New(name, age) {          ; 构造函数
        this.name := name
        this.age := age
    }

    Speak() {
        MsgBox this.name " says: ..."
    }

    Info() {
        return this.name " (age: " this.age ")"
    }
}

; 创建实例
dog := Animal("Buddy", 3)
dog.Speak()                   ; "Buddy says: ..."
MsgBox dog.Info()             ; "Buddy (age: 3)"

; 继承
class Dog extends Animal {
    breed := ""

    __New(name, age, breed) {
        super.__New(name, age)    ; 调用父类构造函数
        this.breed := breed
    }

    Speak() {
        MsgBox this.name " says: Woof!"
    }
}

myDog := Dog("Max", 5, "Golden")
myDog.Speak()                ; "Max says: Woof!"
MsgBox myDog.breed           ; "Golden"
```

### 类的属性和方法

```ahk
class Rectangle {
    width := 0
    height := 0

    __New(w, h) {
        this.width := w
        this.height := h
    }

    ; 计算属性
    Area {
        get => this.width * this.height
    }

    ; 方法
    Scale(factor) {
        this.width *= factor
        this.height *= factor
    }

    ToString() {
        return "Rectangle(" this.width " x " this.height ")"
    }
}

rect := Rectangle(10, 5)
MsgBox rect.Area             ; 50
rect.Scale(2)
MsgBox rect.Area             ; 200
MsgBox rect.ToString()       ; "Rectangle(20 x 10)"
```

## 嵌套结构

```ahk
; 数组嵌套数组（二维结构）
matrix := [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

MsgBox matrix[2][3]          ; 6（第2行第3列）

; Map 嵌套
config := Map(
    "window", Map("width", 800, "height", 600),
    "colors", Map("bg", "#fff", "fg", "#000")
)

MsgBox config["window"]["width"]   ; 800

; 对象嵌套数组
class Student {
    name := ""
    scores := []

    __New(name, scores*) {
        this.name := name
        this.scores := scores
    }

    Average() {
        total := 0
        for i, s in this.scores
            total += s
        return total / this.scores.Length
    }
}

stu := Student("Alice", 85, 90, 78, 92)
MsgBox stu.name              ; "Alice"
MsgBox stu.Average()         ; 86.25
```

## 数组常用函数模式

### 过滤

```ahk
Filter(arr, predicate) {
    result := []
    for i, v in arr {
        if predicate(v)
            result.Push(v)
    }
    return result
}

arr := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens := Filter(arr, (n) => Mod(n, 2) = 0)
MsgBox evesn[1]  ; 2
MsgBox evens[2]  ; 4
```

### 映射

```ahk
MapArray(arr, func) {
    result := []
    for i, v in arr {
        result.Push(func(v))
    }
    return result
}

arr := [1, 2, 3, 4]
doubled := MapArray(arr, (n) => n * 2)
; doubled = [2, 4, 6, 8]
```

### 查找

```ahk
arr := [10, 20, 30, 40, 50]

; 查找满足条件的元素
FindItem(arr, predicate) {
    for i, v in arr {
        if predicate(v)
            return v
    }
    return ""
}

MsgBox FindItem(arr, (n) => n > 25)   ; 30

; IndexOf 查找具体值
MsgBox arr.IndexOf(30)                  ; 3
```

### 求和

```ahk
Sum(arr) {
    total := 0
    for i, v in arr
        total += v
    return total
}

MsgBox Sum([1, 2, 3, 4, 5])     ; 15
```

---

**下一步**: [09-键盘热键](09-hotkeys.md)
