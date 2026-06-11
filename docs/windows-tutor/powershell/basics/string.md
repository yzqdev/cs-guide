# 字符串

PowerShell 字符串是具有 `System.String` 类型的对象。它是一种表示字符序列的数据类型，可以是文字常量或某种变量。

可以在 PowerShell 中使用单引号或双引号来定义字符串。这两个字符串都是使用相同的 `System.String` 对象类型创建的。

## 1. 示例

**示例 1：** 此示例描述如何在字符串中使用单引号：

```powershell
$String1 = 'It is a Single Quoted String'
$String1
```

输出：

```
It is a Single Quoted String
```

**示例 2：** 此示例描述如何在字符串中使用双引号：

```powershell
$String2 = "It is a double Quoted String"
$String2
```

输出：

```
It is a double Quoted String
```

## 2. 串联

字符串的连接使用加号执行。

**示例 1：** 下面的示例描述如何连接两个字符串变量：

```powershell
$s1 = "XN"
$s2 = "TUTOR"
$s1 + $s2
```

上例中最后一条命令的输出将显示为：`XNTUTOR`

**示例 2：** 也可以使用 join 运算符来连接字符串。下面的示例描述如何使用此运算符：

```powershell
$s1, $s2 -join ".COM"
```

本示例的输出将显示为：`XN.COMTUTOR`

**示例 3：** 也可以使用方法 `concat()` 来连接字符串。下面的示例描述如何使用此方法：

```powershell
$s1 = "Power"
$s2 = "Shell"
[System.String]::Concat($s1, $s2)
```

此示例的输出也将显示为：`PowerShell`

## 3. 子串

`SubString` 是一种方法，它接受两个重载参数并返回较长字符串的一部分。这两个参数都是数值，并用逗号（`,`）分隔。第一参数是开始值，第二个表示想从开始位置向往右的字符数量。

**示例：** 下面的示例跳过前三个字符，并从给定的字符串返回下一个七个字符。

```powershell
$s1 = "Windows PowerShell"
$s1.SubString(3, 7)
```

上面示例中的第二个命令显示以下输出：

```
dows Po
```

## 4. 字符串格式

字符串格式化是在字符串中插入一些字符或字符串的过程。我们可以使用 `-f` 运算符来格式化字符串。

```powershell
$s1 = "Windows PowerShell"
$s2 = "XNTUTOR"
$formattedString = "{0} {1}...." -f $s1, $s2
$formattedString
```

执行上面示例代码，得到以下结果：

```
Windows PowerShell XNTUTOR....
```

## 5. 字符替换

`replace()` 方法接受两个参数，并用于替换字符串中的字符。

**示例：** 在下面的示例中，我们将给定字符串中的字符 `P` 替换为 `S`。

```powershell
$s1 = "Windows Powerxhell"
$s1.replace("P", "S")
```

上面示例中的第二个命令显示以下输出：

```
indows Sowerxhell
```
