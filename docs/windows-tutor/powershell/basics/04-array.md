---
order: 4
---

# 数组

与其他脚本语言一样，Windows PowerShell也支持名为数组的数据结构。 PowerShell中的数组是一种数据结构，用于将值的集合存储在单个变量中。 数组中的值可以是相同类型或不同类型。例如可以是字符串，整数，通用对象或其他数组。

数组中的每个元素或值都有一个索引。 索引是整数，代表值在数组中的位置。 我们可以使用索引检索数组的元素。 数组的索引始终以`0`开头，表示数组的第一个数据项。

## 1.创建和初始化数组

要在PowerShell中声明数组，可使用赋值运算符将多个值分配给变量。 逗号分隔存储在数组中的值。
以下语句是声明数组变量的语法：

```powershell
$variable_name = value1, value2, value3, ..... ,ValueN
```

**示例：**要创建和初始化`$k`数组，该数组包含五个整数值：`10`,`15`,`20`,`50`,`99`。在PowerShell中键入以下命令：

```powershell
$k = 10, 15, 20, 50, 99
```

还可以使用范围运算符来初始化数组。
**示例：**要创建和初始化数组`$arr`，该数组包含从`2`到`10`的值。在PowerShell中键入以下命令：

```powershell
$arr = 2..10
```

## 2.访问数组元素

可以在PowerShell控制台上显示数组的所有值。方法是键入数组的名称，后跟美元($)符号。

```powershell
# 例如: 假设数组$array1包含值：11,20,30,50,66,99。 在PowerShell上键入以下命令以显示数组的所有值：
$array1=11,20,30,50,66,99
$array1
```

还可以使用索引号从数组访问元素，将索引号括在方括号中。以下语句是显示指定位置的值的语法：

```powershell
$variable_name [index_number]
```

例如：假设您要显示数组`$array1`的第二个元素，使用以下命令：

```powershell
$array1[2]
```

可以通过使用范围运算符访问索引来访问数组的一部分。
**例如：**假设要从数组的第三个元素访问第六个元素，使用以下命令：

```powershell
$array1[2..5]
```

可以使用负数访问数组的最后一部分，这些负数用于从数组末尾开始计数元素。 数字`-1`表示数组的最后一个元素。
**示例：**要显示数组的最后一个元素，使用以下命令：

```powershell
$array1[-1]
```

要以索引的升序显示数组的最后四个元素，使用以下命令：

```powershell
$array1[-4..-1]
```

上面示例执行结果如下：
![执行结果](http://www.xntutor.com/uploads/images/2020/02/03/211354_16109.png)

## 3.数组大小

数组的大小取决于元素的数量。可以使用以下语法获取数组的大小：

```powershell
$variable_name.Length
```

**例如：**如果创建一个新数组`$a`，其中包含五个元素。`$a = 20,25,35,50,68`。要获取此数组的大小，使用以下命令：

```powershell
$a.Length
```

上面示例执行结果如下：

```powershell
PS C:\Users\hema> $a = 20,25,35,50,68
PS C:\Users\hema> $a.Length
5
```

## 4.数组操作

我们可以通过指定数组名称和要更改的值的索引号来更改数组中特定索引值的值。
**示例：**要更改`$p`数组中第三个元素的值，使用以下命令：

```powershell
$p[2]=20
```

还可以使用`+=`运算符将值添加到数组。使用以下语法将值添加到现有数组：

```powershell
$variable_name += value
```

**例如：** 要将元素添加到数组`$a`，请键入以下命令：

```powershell
$a += 15
```

## 5.初始化一个空数组

可以使用以下语法初始化一个空数组：

```powershell
$variable_name = @()
```

## 6.从数组中删除元素

通过使用以下示例，我们可以了解如何从数组中删除单个或多个元素：
假设数组`$array`包含五个元素`20,25,35,50,68`。如要从数组中删除第一个和最后一个值，请使用以下命令：

```powershell
$array = ($array[1] $array[2] $array[3])
```

## 7. 强类型数组

可以创建只包含特定类型元素的数组：

```powershell
# 只允许整数
[int[]]$numbers = 1, 2, 3, 4
# $numbers += "string"  # 会报错

# 只允许字符串
[string[]]$names = "Alice", "Bob", "Charlie"
```

## 8. 多维数组

```powershell
# 创建二维数组
$matrix = @(
    (1, 2, 3),
    (4, 5, 6),
    (7, 8, 9)
)
$matrix[0][1]  # 2

# 使用 .NET 多维数组
$multi = New-Object 'object[,]' 3, 3
$multi[0, 0] = "A"
```

## 9. 数组常用方法

```powershell
$arr = @(1, 2, 3, 4, 5)

# 检查是否包含元素
$arr.Contains(3)       # True

# 获取元素索引
[array]::IndexOf($arr, 3)  # 2

# 反转数组
[array]::Reverse($arr)

# 排序数组
[array]::Sort($arr)

# 查找
$arr.Where({ $_ -gt 3 })           # 4, 5
$arr.ForEach({ $_ * 2 })           # 2, 4, 6, 8, 10
```

## 10. ArrayList（可变数组）

PowerShell 数组是固定大小的，使用 `+=` 会创建新数组，性能较差。大量操作时推荐使用 `ArrayList`：

```powershell
# 创建 ArrayList
$list = [System.Collections.ArrayList]@()
$list.Add("Item1")
$list.Add("Item2")
$list.Remove("Item1")
$list.Count

# 或者使用泛型 List
$list2 = [System.Collections.Generic.List[string]]@()
$list2.Add("Hello")
```
