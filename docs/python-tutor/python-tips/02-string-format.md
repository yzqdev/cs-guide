---
order: 2
---

# 字符串格式化技巧

> Python 提供了多种字符串格式化方式，了解它们的区别可以帮助你在不同场景下做出最佳选择。

:::tip
官方文档：<https://docs.python.org/3/library/string.html>
:::

## 四种格式化方式一览

| 方式 | 语法 | 版本 | 推荐场景 |
|------|------|------|---------|
| 旧式 % 格式化 | `"%s %d" % (val, num)` | 所有版本 | 简单格式化 |
| str.format() | `"{} {}".format(a, b)` | Python 2.6+ | 复杂排版 |
| f-string | `f"{var}"` | Python 3.6+ | **推荐，日常首选** |
| Template 模板 | `Template("$who")` | 标准库 | 用户输入安全格式化 |

## 1. 旧式字符串格式化（% 运算符）

```python
print("hello %s, this is %d" % ('world', 45))
```

支持的占位符：`%s`（字符串）、`%d`（整数）、`%f`（浮点数）、`%x`（十六进制）等。

## 2. 新式字符串格式化（str.format）

```python
# 位置参数
print('{2}, {1}, {0}'.format('a', 'b', 'c'))

# 关键字参数
print("hello {name}, this is {total}".format(name='world', total=45))
```

## 3. 字符串插值 / f-Strings（Python 3.6+）

```python
name, total = 'world', 45
print(f"hello {name}, this is {total}")
```

f-string 是目前最推荐的格式化方式，性能最好、可读性最强。

```python
# 支持表达式
print(f"{2 * 3 + 1}")           # 7
print(f"{name.upper()}")        # WORLD
print(f"{3.14159:.2f}")         # 3.14 数字格式化
```

## 4. 模板字符串（标准库）

适用于用户输入需要安全转义的场景（避免格式字符串攻击）：

```python
from string import Template

s = Template('$who likes $what')
print(s.substitute(who='tim', what='kung pao'))

d = dict(who='tim')
Template('$who likes $what').safe_substitute(d)
```

## 字符串前缀

| 前缀 | 含义 | 示例 |
|------|------|------|
| **r** | 原始字符串（raw） | `r"\n\t"` 不会转义 |
| **b** | 字节串（bytes） | `b"hello"` |
| **u** | Unicode 字符串 | `u"你好"`（Python 2 中需要） |
| **f** | 格式化字符串 | `f"value={x}"` |

```python
# r-string 返回原始字符串（不转义反斜杠）
dat = r"E:\PycharmProjects\a.py"
```
