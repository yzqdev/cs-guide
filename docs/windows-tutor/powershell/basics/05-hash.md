# 哈希表

PowerShell 哈希表是一种数据结构，用于存储一个或多个键/值对。也称为字典或关联数组。

在 PowerShell 中，每个哈希表都有一个哈希表（`System.Collections.Hashtable`）对象。我们可以在 PowerShell 中使用 `Hashtable` 对象的属性和方法。哈希表中的键和值也是 .NET 类型的对象。

在引入 PowerShell 版本 3.0 之后，我们可以使用 `[ordered]` 属性在 PowerShell 中创建一个有序字典（`System.Collections.Specialized.OrderedDictionary`）。

有序字典和哈希表之间的主要区别在于字典中的键始终按照我们列出的顺序显示。但是哈希表中键的顺序不确定。

## 1. 语法

以下语句是创建哈希表的语法：

```powershell
$variable_name = @{ <key1> = <value1> ; <key2> = <value2> ; ..... ; <keyN> = <valueN>;}
```

以下语句是创建有序字典的语法：

```powershell
$variable_name = [ordered] @{ <key1> = <value1> ; <key2> = <value2> ; ..... ; <keyN> = <valueN>;}
```

## 2. 创建哈希表

以下是在 PowerShell 中创建哈希表的步骤：

- 创建一个以 `@` 符号开头的哈希表。
- 将哈希表括在花括号中。
- 输入一个或多个键/值对作为哈希表的数据（内容）。
- 要分隔每个值的键，必须使用等号（`=`）。
- 要分隔键/值对，必须使用分号（`;`）或换行符。
- 包含空格的键将它们括在引号中。并且这些值必须是 PowerShell 的有效表达式。
- 要管理或使用哈希表，请将哈希表名分配给变量。
- 将有序的哈希表分配给变量时，可以将有序的属性放在 `@` 符号之前。

如果要创建一个空的哈希表，请在 PowerShell 中键入以下命令：

```powershell
$variablename = @{}
```

创建哈希表时，我们还可以将其添加到哈希表中。以下示例描述了如何使用三个键及其值创建哈希表。

```powershell
$student = @{ name = "Maxsu" ; Course = "数学" ; Age = 25 }
```

## 3. 显示哈希表

要显示哈希表，请输入存储它的变量的名称。默认情况下，它显示带有两列的表。一列用于键，另一列用于键的值。

以下命令显示哈希表的结果：

```powershell
$Student
```

若要显示哈希表的所有键或所有值，请使用点（`.`）表示法。下面的示例显示以上示例的所有键：

```powershell
$Student.keys
```

下面的示例显示以上示例的所有值：

```powershell
$Student.values
```

哈希表具有 `count` 属性，该属性指示哈希表中键/值对的总数。在上面的示例中，以下命令将显示键-值对的总数：

```powershell
$Student.count
```

输出：

```
3
```

## 4. 完整示例

下面是一个完整的示例，演示了如何创建、初始化和处理哈希表：

```powershell
$hash = @{ ID = 1; Shape = "Square"; Color = "Blue"}

Write-Host("Print all hashtable keys")
$hash.keys

Write-Host("Print all hashtable values")
$hash.values

Write-Host("Get ID")
$hash["ID"]

Write-Host("Get Shape")
$hash.Number

Write-Host("print Size")
$hash.Count

Write-Host("Add key-value")
$hash["Updated"] = "Now"

Write-Host("Add key-value")
$hash.Add("Created","Now")

Write-Host("print Size")
$hash.Count

Write-Host("Remove key-value")
$hash.Remove("Updated")

Write-Host("print Size")
$hash.Count

Write-Host("sort by key")
$hash.GetEnumerator() | Sort-Object -Property key
```

上面示例代码执行结果如下：

```
Print all hashtable keys
Color
Shape
ID
Print all hashtable values
Blue
Square
1
Get ID
1
Get Shape
print Size
3
Add key-value
Add key-value
print Size
5
Remove key-value
print Size
4
sort by key

Name                           Value
----                           -----
Color                          Blue
Created                        Now
ID                             1
Shape                          Square
```

## 5. 哈希表常用方法

```powershell
$hash = @{ ID = 1; Shape = "Square"; Color = "Blue" }

# 检查键是否存在
$hash.ContainsKey("ID")      # True
$hash.ContainsValue("Blue")  # True

# 获取键集合
$hash.Keys
$hash.Values

# 克隆（浅拷贝）
$clone = $hash.Clone()

# 遍历
$hash.GetEnumerator() | ForEach-Object {
    "Key: $($_.Key), Value: $($_.Value)"
}
```

## 6. 嵌套哈希表

```powershell
$config = @{
    Database = @{
        Server = "localhost"
        Port = 3306
        Name = "testdb"
    }
    App = @{
        LogLevel = "Debug"
        Timeout = 30
    }
}

# 访问嵌套值
$config.Database.Server  # localhost
$config["App"]["Timeout"]  # 30
```

## 7. 哈希表与 PSCustomObject

```powershell
# 哈希表转 PSCustomObject
$hash = @{ Name = "Alice"; Age = 30; City = "Beijing" }
$obj = [PSCustomObject]$hash
$obj.Name  # Alice

# 创建对象并排序属性
$obj2 = [PSCustomObject]@{
    Name = "Bob"
    Age = 25
    City = "Shanghai"
}
```

## 8. 常见用途：函数参数传递

```powershell
function Test-Function {
    param(
        [string]$Name,
        [int]$Count,
        [switch]$Verbose
    )
    Write-Host "Name: $Name, Count: $Count"
}

# 使用哈希表传递参数（splatting）
$params = @{
    Name = "Test"
    Count = 5
    Verbose = $true
}
Test-Function @params  # 使用 @ 而非 $
```
