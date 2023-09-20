# 一些变量小技巧

:::tip

<https://docs.python.org/3/library/string.html>
:::

## 旧式字符串格式化（％ 运算符）

```python
print("hello %s, this is %d" %('world',45))
```

变量替换:  

```python

```

## 新式字符串格式化（str.format）

```python
print('{2}, {1}, {0}'.format('a', 'b', 'c'))
print("hello {name}, this is {total}".format(name='world',total=45))
```

## 字符串插值 / f-Strings（Python 3.6+)

```python
name,total='world',45
print(f"hello {name}, this is {total}" )
```

## 模板字符串（标准库）

```python

s = Template('$who likes $what')
print(s.substitute(who='tim', what='kung pao'))
d=dict(who='tim')
Template('$who likes $what').safe_substitute(d)
```
- **r** means **raw**
- **b** means **bytes**
- **u** means **unicode**
- **f** means **format**

rstring会返回原始字符串
```python
 dat = r"E:\PycharmProjects\a.py"
```