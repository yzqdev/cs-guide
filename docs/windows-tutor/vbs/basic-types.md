---
index: 1
---
# 数据类型

## [https://www.cnblogs.com/Ulysse/p/14926572.html#/c/subject/tag/VBScript/](https://www.cnblogs.com/Ulysse/p/14926572.html#/c/subject/tag/VBScript/)

## 数据类型

VBS只有一种数据类型，称为Variant。而该类型是可变的，以下是Variant的子类型：

|             |                                                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 子类型      | 描述                                                                                                                                           |
| Empty       | 未初始化的Variant。对于数值变量，值为0；对于字符串变量，值为零长度字符串（""）。                                                               |
| Null        | 不包含有效数据的Variant。                                                                                                                      |
| Boolean     | （逻辑型）包含True或False。                                                                                                                    |
| Byte        | （字节型）包含0到255之间的整数。                                                                                                               |
| Integer     | （整型）包含-32,768到32,767之间的整数。                                                                                                        |
| Long        | （长整型）包含-2,147,483,648到2,147,483,647之间的整数。                                                                                        |
| Currency    | （货币类型）-922,337,203,685,477.5808到-922,337,203,685,477.5807                                                                               |
| Single      | （单精度型）包含单精度浮点数，负数范围从-3.402823E38到-1.401298E-45，正数范围从1.401298E-45到3.402823E38。                                     |
| Double      | （双精度型）包含双精度浮点数，负数范围从-1.79769313486232E308到-4.94065645841247E-324，正数范围从4.94065645841247E-324到1.79769313486232E308。 |
| Date (Time) | （日期与时间型）包含表示日期的数字，日期范围从公元100年1月1日到公元9999年12月31日。                                                            |
| String      | （字符串型）包含变长字符串，最大长度可为20亿个字符。                                                                                           |
| Object      | 包含对象。                                                                                                                                     |
| Error       | 包含错误号。                                                                                                                                   |

---

## 变量

1、变量：变量是一种使用方便的占位符，用于引入计算机内存地址，该地址可以存储脚本运行时可更改的程序信息。

2、变量的声明：声明变量的一种方式是使用Dim语句、Public语句和Private语句在脚本中显示和声明变量。

3、命名规则：变量命名必须遵循VBScript的标准命名规则。变量命名必须遵循：

- 字符必须是字母开头，由字母、数字和下划线组成。
- 长度不能超过255个字符。
- 在被声明的作用域内必须唯一。
- 不能为关键字。

4、VBS变量名称的取法

· 匈牙利命名法：匈牙利命名法是一种编程时的命名规则。基本原则是：变量名=类型+对象描述。命名是基于容易记忆容易理解原则。保证名字的连贯性是非常重要的。

常用数据类型的缩写：

|        |         |      |
| ------ | ------- | ---- |
| 中文   | 英文    | 缩写 |
| 字符串 | String  | Str  |
| 整型   | Integer | Int  |
| 长整型 | Long    | Lng  |
| 对象   | Object  | Obj  |

例如：

文件路径：strPath

文件大小：intSize

几何面积：lngArea

FSO对象：objFSO

5、变量赋值

创建如下形式的表达式给变量赋值：变量在表达式左边，要赋的值在表达式右边。例如：

B = 200

6、Option Explicit语句

显式声明与隐式声明的区别：

① 显式声明：Dim、Public、Private语句进行声明。

② 隐式声明：不声明直接使用。

③ 强制声明：Option Explicit语句强制显式声明所有变量。如果试图使用一个未声明的变量，则会在编译时导致错误。Option Explicit语句只能在模块级使用。

7、变量作用域

变量的作用域由声明它的位置决定。如果在过程中声明变量，则只有该过程中的代码可以访问或更改变量值，此时变量具有局部作用域并且是过程级变量。如果在过程之外声明变量，则该变量可以被脚本中所有过程所识别，称为 Script 级变量，具有脚本级作用域。

在VBScript中有三种变量域：

①脚本级作用域

变量在整个脚本文件中都是有效的。声明的变量的作用域就是整个脚本。

②过程级作用域

变量在过程中或函数中有效。过程、函数之外的其它代码都不能访问过程级变量。

③类级作用域

这是一种包含属性和方法的逻辑分组的特殊结构。类定义之外的代码都不能访问类级别变量。

有三种语句可以用于声明变量：Dim、Private、Public

在不同的情况使用不同的语句声明变量，具体取决于变量的作用域：

① Dim：用于声明脚本、过程、类级作用域的变量

1）所有被声明为脚本级的变量在整个脚本文件中有效，无论使用的是Dim、Private还是Public；

2）用于过程变量，必须使用Dim；

3）用于类级的变量，Dim的效果跟Public是完全相同的；

② Private：用于声明脚本、类级作用域使用Private语句

1）如果用于脚本级变量，它的作用跟Dim和Public是完全相同的；

2）为了声明一个私有的类级变量，必须要用Private；

③ Public：用于声明脚本、类级作用域

1）声明脚本级作用域的变量，在效果上它跟Dim或Private是一样的；

2）声明的类级变量就是这个类的公共属性。所有在类级用Dim或Public声明的变量在整个类中都是一个有效的公共属性。

8、变量的存活期

变量存在的时间称为存活期。Script 级变量的存活期从被声明的一刻起，直到脚本运行结束。对于过程级变量，其存活期仅是该过程运行的时间，该过程结束后，变量随之消失。在执行过程时，局部变量是理想的临时存储空间。可以在不同过程中使用同名的局部变量，这是因为每个局部变量只被声明它的过程识别。

---

## 数组

1、数组的声明

有时候，将多个相关赋值给一个变量更为方便，因此可以创建包含一系列值的变量，称为数组变量。下列声明了一个包含11个元素的一维数组：

Dim A(10)

虽然括号中显示的数字是10，但由于在VBScript中所有数组都是基于0的，所以这个数组实际上包含了11个元素。在基于0的数组中，数组元素的数目总是括号中显示的数目加1。这种数组被称为固定大小的数组。

在元素中使用索引为每个元素赋值。从0到10，将数据赋给数组的元素，如下所示：

A(0)=256

A(1)=234

A(2)=100

. . .

A(10)=55

与此类似，使用索引可以检索到所需的数组元素的数据。例如：

. . . SomeVariable = A(8) . . .

2、多维数组、动态数组

多维数组：数组并不仅限于一维。数组的维数最大可为60（尽管大多数人不能理解超过3或4维的数组）。声明多维数组时用逗号分隔括号中每个表示数组大小的数字。

Dim MyTable(5, 10)

动态数组：即在运行脚本时大小发生变化的数组。对数组的最初声明使用Dim或ReDim语句。但是对于动态数组，括号中不包含任何数字。例如：

Dim MyArray()

ReDim AnotherArray()

要使用动态数组，必须随后使用 ReDim 确定维数和每一维的大小。在下例中，ReDim 将动态数组的初始大小设置为 25，而后面的 ReDim 语句将数组的大小重新调整为 30，同时使用 Preserve 关键字在重新调整大小时保留数组的内容。

ReDim MyArray(25) . . . ReDim Preserve MyArray(30)

重新调整动态数组大小的次数是没有任何限制的，尽管将数组的大小调小时，将会丢失被删除元素的数据。

---

## 常量与注释

1、常量：在程序的执行过程中，其值保持不变的量。分常数和符号常量。

VBScript 中设置了一些可以在程序代码中使用的有益常数。常数的便利在于直接使用特定的数值但不需要记住具体的值。如果某些常数的数值可能改变，则使用常数将有助于提高程序的可维护性。由于这些常数已经在 VBScript 中得到定义，在程序代码中不需要显式地声明它们，在需要的地方直接使用它们就可以了。

下面是 VBScript 中提供的常数类型，以及对每种类型的简短描述：

- 颜色常数定义了脚本中可以使用的 8 种基本颜色。
- 日期与时间常数定义了被各种日期与时间函数使用的日期与时间常数。
- 日期格式常数定义了用于规定日期和时间格式的常数。
- 其他常数定义了比较难以归类的常数。
- MsgBox 常数定义了在 MsgBox 函数中使用的常数，用来描述按钮的可见与否、标签、行为和返回值。
- 字符串常数定义在字符串操作中可以使用的各种不可打印字符。
- 三态常数定义了被规定数字格式的函数使用的常数。
- VarType 常数定义了各种 Variant 子类型。

2、创建符号常量

在程序中用标识符表示的常数。分内部符号常量和用户定义符号常量。

可以使用 Const 语句在 VBScript 中创建用户自定义常数。使用 Const 语句可以创建名称具有一定含义的字符串型或数值型常数，并给它们赋原义值。例如：

Const MyString = "这是一个字符串。"

Const PI = 3.14159

请注意字符串文字包含在两个引号 (" ") 之间。这是区分字符串型常数和数值型常数的最明显的方法。日期文字和时间文字包含在两个井号 (#) 之间。例如：

Const CutoffDate = #6-1-97#

最好采用一个命名方案以区分常数和变量。这样可以避免在运行脚本时对常数重新赋值。例如，可以使用“vb”或“con”作常数名的前缀，或将常数名的所有字母大写。将常数和变量区分开可以在开发复杂的脚本时避免混乱。

3、注释

在vbs中注释使用rem 后接注释语句行，或单引号（'）后接注释语句行。例如：

rem 这是一段注释

‘这是一段注释
