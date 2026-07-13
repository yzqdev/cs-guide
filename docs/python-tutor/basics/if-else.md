---
index: 3
---
# 条件语句

通常听到别人说，计算机很聪明，其实计算机一点都聪明，聪明的是在写程序的开发者。

写程序就是跟计算机沟通，告诉它要做什么。

因此，肯定缺少不了一些沟通逻辑。比如要告诉计算机在什么情况下做什么，或者在哪个时间点做什么。

这都需要用到逻辑判断。这一章节主要介绍这部分内容。

# 目录 #

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-09-09-%E6%9D%A1%E4%BB%B6%E8%AF%AD%E5%8F%A5%E5%92%8C%E5%BE%AA%E7%8E%AF%E8%AF%AD%E5%8F%A5.png)

# 一、条件语句 #

## 1、什么是条件语句

Python 条件语句与其他语言基本一致，都是通过一条或多条语句的执行结果（True 或者 False）来决定执行的代码块。

Python 程序语言指定任何非 0 和非空（null）值为 True，0 或者 null 为 False。

执行的流程图如下：

![if语句流程图](http://upload-images.jianshu.io/upload_images/2136918-4ee2486190450a1a?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 2、if 语句的基本形式

Python 中，if 语句的基本形式如下：

```python
if 判断条件：
    执行语句……
else：
    执行语句……
```

之前也提到过，Python 语言有着严格的缩进要求，因此这里也需要注意缩进，也不要少了冒号 `:` 。

if 语句的判断条件可以用>（大于）、<(小于)、==（等于）、>=（大于等于）、<=（小于等于）来表示其关系。

例如：

```python
# -*-coding:utf-8-*-

results=59

if results>=60:
    print ('及格')
else :
    print ('不及格')

```

输出的结果为：

```txt
不及格
```

上面也说到，非零数值、非空字符串、非空 list 等，判断为 True，否则为 False。因此也可以这样写：

```python
num = 6
if num :
    print('Hello Python')
```

输出的结果如下：

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-09-07-072713.png)

可见，把结果打印出来了。

那如果把 `num` 改为空字符串呢？

很明显，空字符串是为 False 的，不符合条件语句，因此不会执行 `print('Hello Python')` 这段代码。

另外需要提醒一下，在条件判断代码中的冒号 `:` 后、下一行内容一定要缩进。不缩进会报错。

冒号和缩进是一种语法，它会帮助 Python 区分代码之间的层次，理解条件执行的逻辑及先后顺序。

## 3、if 语句多个判断条件的形式

有些时候判断语句不止两个条件，比如上面的例子中大于 60 的为及格，大于 90 的为优秀，80 到 90 之间的为良好。

这时候需要使用 if 语句多个判断条件：

用伪代码来表示：

```python
if 判断条件1:
    执行语句1……
elif 判断条件2:
    执行语句2……
elif 判断条件3:
    执行语句3……
else:
    执行语句4……
```

实例：

```python
# -*-coding:utf-8-*-

results = 89

if results > 90:
    print('优秀')
elif results > 80:
    print('良好')
elif results > 60:
    print ('及格')
else :
    print ('不及格')

```

输出的结果：

```txt
良好
```

## 4、if 语句多个条件同时判断

有时候会遇到多个条件同时判断的情况。

例如要求 java 和 python 的考试成绩都大于 80 分才算优秀。

这时候可以结合 `or` 和 `and` 来使用。

`or`（或）表示两个条件有一个成立时判断条件成功。

`and`（与）表示只有两个条件同时成立的情况下，判断条件才成功。

例如：

```python
# -*-coding:utf-8-*-

java = 86
python = 68

if java > 80 and  python > 80:
    print('优秀')
else :
    print('不优秀')

if ( java >= 80  and java < 90 )  or ( python >= 80 and python < 90):
    print('良好')

```

输出结果：

```txt
不优秀
良好
```

注意：if 有多个条件时可使用括号来区分判断的先后顺序，括号中的判断优先执行，此外 and 和 or 的优先级低于 >（大于）、<（小于）等判断符号，即大于和小于在没有括号的情况下会比与或要优先判断。

## 5、if 嵌套

if 嵌套指 if 语句中可以嵌套 if 语句。

比如上面说到的例子，也可以用 if 嵌套来写。

当然这只是为了说明 if 条件语句是可以嵌套的。如果是这个需求，不建议这样使用 if 嵌套，因为嵌套太多，代码量增加，也不方便阅读。

# 二、循环语句 #

## 1、什么是循环语句

一般编程语言都有循环语句。计算机最擅长就是做重复的事情，所以需要用到循环语句，循环语句允许执行一个语句或语句组多次。

循环语句的一般形式如下：

![python循环语句](http://upload-images.jianshu.io/upload_images/2136918-eaaae2fbfec3330f?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在 Python 中提供了 for 循环和 while 循环。

如果需要控制循环的次数，可以使用循环控制语句：

| 循环控制语句 | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| break        | 在语句块执行过程中终止循环，并且跳出整个循环                 |
| continue     | 在语句块执行过程中终止当前循环，跳出该次循环，执行下一次循环 |
| pass         | pass 是空语句，是为了保持程序结构的完整性                    |

这些控制语句用于控制循环的流程。

## 2、for 循环语句

先来看 for 循环语句的流程图：

![for循环的流程图](http://upload-images.jianshu.io/upload_images/2136918-a0728c1c488238af?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

基本的语法格式：

```python
for iterating_var in sequence:
   statements(s)
```

那么我们根据基本语法格式，写个例子测试一下：

```python
for letter in 'Hello 两点水':
    print(letter)
```

输出的结果如下：

```txt
H
e
l
l
o

两
点
水
```

从打印结果来看，它就是把字符串 `Hello 两点水` 一个一个字符地打印出来。

如果换成字典 dict 呢？

![](http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-09-07-094741.png)

你会发现只打印了字典 dict 中的每一个 key 值。

建议在学到一个新知识点时多去尝试。自己观察出来的结论更有助于理解。

如果不知道如何尝试，可以根据例子举一反三。比如上面的 for 循环，试了字符串和字典，之前学的基本数据类型还有哪些呢？可以把所有的基本类型都拿去尝试一下。

比如试了之后会发现，整数和浮点数是不可以直接放在 for 循环里面的。

## 3、range() 函数

for 循环还常常和 range() 函数搭配使用。通过一段程序来理解：

```python
for i in range(3):
    print(i)
```

打印的结果为：

```
0
1
2
```

可见，打印了 0 到 2。

使用 `range(x)` 函数，就可以生成一个从 0 到 x-1 的整数序列。

如果是 `range(a,b)` 函数，生成一个左闭右开的整数序列。

其实例子中的 `range(3)` 可以写成 `range(0,3)`，结果是一样的。

使用 range() 函数，更多是为了把一段代码重复运行 n 次。

这里提一个问题，仔细观察 range() 函数，不管是 1 个参数还是 2 个参数的，都有什么共同的特点？

可以看到，它们都是每次递增 1 的。`range(3)` 就是 0, 1, 2，每次递增 1。`range(3,6)` 就是 3, 4, 5，也是每次递增 1。

那能不能每次递增其他数值呢？比如递增 2？

在实际编程中，肯定会有这样的需求。因此 range 函数还支持三个参数的形式。

比如 `range(0,10,2)`，表示从 0 到 10（不取 10），每次间隔为 2。

## 4、While 循环语句

While 循环和 for 循环的作用类似，先来看 While 循环语句的例子：

这个例子是计算 1 到 100 所有整数的和。

## 5、for 循环和 while 循环的区别

既然都是循环，for 循环和 while 循环肯定有所区别。

那么什么时候使用 for 循环和 while 循环呢？

* for 循环主要用在迭代可迭代对象的情况。
* while 循环主要用在需要满足一定条件为真，反复执行的情况。（死循环+break 退出等情况）。
* 部分情况下，for 循环和 while 循环可以互换使用。

例如：

```python
for i in range(0, 10):
    print(i)


i = 0
while i < 10:
    print(i)
    i = i + 1
```

虽然打印的结果是一样的，但细细品味会发现，它们执行的顺序和执行的条件是不同的。

## 6、嵌套循环

循环语句和条件语句一样，都可以嵌套。

具体的语法如下：

**for 循环嵌套语法**

```python
for iterating_var in sequence:
   for iterating_var in sequence:
      statements(s)
   statements(s)
```

**while 循环嵌套语法**

```python
while expression:
   while expression:
      statement(s)
   statement(s)
```

除此之外，也可以在循环体内嵌入其他的循环体，如在 while 循环中可以嵌入 for 循环，反之亦然。

比如：

当我们需要判断 sum 大于 1000 的时候，不在相加时，可以用到 break ，退出整个循环。

```python
count = 1
sum = 0
while (count <= 100):
    sum = sum + count
    if ( sum > 1000):  #当 sum 大于 1000 的时候退出循环
        break
    count = count + 1
print(sum)
```

输出的结果：

```txt
1035
```

有时候只想统计 1 到 100 之间的奇数和，那么当 count 是偶数时，需要跳出当次循环，不想累加，这时候可以使用 continue。

```python
count = 1
sum = 0
while (count <= 100):
    if ( count % 2 == 0):  # 双数时跳过输出
        count = count + 1
        continue
    sum = sum + count
    count = count + 1
print(sum)
```

输出的语句：

```txt
2500
```

还有：

```python
for num in range(10,20):  # 迭代 10 到 20 之间的数字
   for i in range(2,num): # 根据因子迭代
      if num%i == 0:      # 确定第一个因子
         j=num/i          # 计算第二个因子
         print ('%d 是一个合数' % num)
         break            # 跳出当前循环
   else:                  # 循环的 else 部分
      print ('%d 是一个质数' % num)
```

输出的结果：

```txt
10 是一个合数
11 是一个质数
12 是一个合数
13 是一个质数
14 是一个合数
15 是一个合数
16 是一个合数
17 是一个质数
18 是一个合数
19 是一个质数
```

当然，这里还用到了 `for … else` 语句。

其实 for 循环中的语句和普通的没有区别，else 中的语句会在循环正常执行完（即 for 不是通过 break 跳出而中断的）的情况下执行。

当然有 `for … else`，也有 `while … else`。它们的含义是一样的。

# 三、条件语句和循环语句综合实例

## 1、打印九九乘法表 ##

```python
# -*- coding: UTF-8 -*-

# 打印九九乘法表
for i in range(1, 10):
        for j in range(1, i+1):
            # 打印语句中，大括号及其里面的字符 (称作格式化字段) 将会被 .format() 中的参数替换,注意有个点的
            print('{}x{}={}\t'.format(i, j, i*j), end='')  
        print()
```

输出的结果:

```txt
1x1=1   
2x1=2   2x2=4   
3x1=3   3x2=6   3x3=9   
4x1=4   4x2=8   4x3=12  4x4=16  
5x1=5   5x2=10  5x3=15  5x4=20  5x5=25  
6x1=6   6x2=12  6x3=18  6x4=24  6x5=30  6x6=36  
7x1=7   7x2=14  7x3=21  7x4=28  7x5=35  7x6=42  7x7=49  
8x1=8   8x2=16  8x3=24  8x4=32  8x5=40  8x6=48  8x7=56  8x8=64  
9x1=9   9x2=18  9x3=27  9x4=36  9x5=45  9x6=54  9x7=63  9x8=72  9x9=81 
```

## 2、判断是否是闰年 ##

```python

# 判断是否是闰年

year = int(input("请输入一个年份: "))
if (year % 4) == 0 and (year % 100) != 0 or (year % 400) == 0:
    print('{0} 是闰年' .format(year))
else:
     print('{0} 不是闰年' .format(year))

```
