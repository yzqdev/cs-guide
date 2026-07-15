# Markdown 语法速查

> Markdown 是一种轻量级标记语言，常用于编写文档、README、博客等。

---

## 一、基本语法

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 文本样式

```markdown
*斜体* 或 _斜体_
**粗体** 或 __粗体__
***粗斜体***
~~删除线~~
`行内代码`
<u>下划线</u>
```

### 列表

```markdown
无序列表：
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

有序列表：
1. 第一项
2. 第二项
3. 第三项

任务列表：
- [x] 已完成
- [ ] 未完成
```

### 链接

```markdown
[显示文本](https://example.com)
[显示文本](https://example.com "悬停提示")
[引用式链接][id]

[id]: https://example.com "标题"
```

### 图片

```markdown
![替代文本](图片URL)
![替代文本](图片URL "悬停提示")
```

### 引用

```markdown
> 单行引用
>
> 多行引用
> 可以包含多个段落
```

### 代码块

````markdown
```语言
代码块
```
````

### 表格

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 左     |   中    |     右 |
| 单元格 |  单元格  |  单元格 |
```

### 分割线

```markdown
---
***
___
```

---

## 二、Emoji 表情

### 人物

| 代码 | 图标 | 代码 | 图标 |
|------|------|------|------|
| `:smile:` | 😄 | `:heart_eyes:` | 😍 |
| `:laughing:` | 😆 | `:wink:` | 😉 |
| `:blush:` | 😊 | `:kissing_heart:` | 😘 |
| `:sweat_smile:` | 😅 | `:joy:` | 😂 |
| `:sob:` | 😭 | `:scream:` | 😱 |
| `:thumbsup:` | 👍 | `:clap:` | 👏 |
| `:ok_hand:` | 👌 | `:wave:` | 👋 |
| `:pray:` | 🙏 | `:muscle:` | 💪 |

### 情感

| 代码 | 图标 | 代码 | 图标 |
|------|------|------|------|
| `:heart:` | ❤️ | `:broken_heart:` | 💔 |
| `:fire:` | 🔥 | `:star:` | ⭐ |
| `:sparkles:` | ✨ | `:100:` | 💯 |
| `:warning:` | ⚠️ | `:zzz:` | 💤 |
| `:anger:` | 💢 | `:dash:` | 💨 |

### 自然

| 代码 | 图标 | 代码 | 图标 |
|------|------|------|------|
| `:sunny:` | ☀️ | `:umbrella:` | ☔ |
| `:cloud:` | ☁️ | `:snowflake:` | ❄️ |
| `:zap:` | ⚡ | `:rainbow:` | 🌈 |
| `:cat:` | 🐱 | `:dog:` | 🐶 |
| `:rose:` | 🌹 | `:cherry_blossom:` | 🌸 |
| `:four_leaf_clover:` | 🍀 | `:cactus:` | 🌵 |

### 物品

| 代码 | 图标 | 代码 | 图标 |
|------|------|------|------|
| `:computer:` | 💻 | `:iphone:` | 📱 |
| `:camera:` | 📷 | `:video_camera:` | 📹 |
| :rocket: | `:rocket:` | :airplane: | `:airplane:` |
| `:bulb:` | 💡 | `:moneybag:` | 💰 |
| `:gift:` | 🎁 | `:tada:` | 🎉 |
| `:beer:` | 🍺 | `:coffee:` | ☕ |
| `:pizza:` | 🍕 | `:apple:` | 🍎 |

### 符号

| 代码 | 图标 | 代码 | 图标 |
|------|------|------|------|
| `:white_check_mark:` | ✅ | `:x:` | ❌ |
| `:copyright:` | ©️ | `:registered:` | ®️ |
| `:tm:` | ™️ | `:trident:` | 🔱 |

---

## 三、快捷键

| 编辑器 | 加粗 | 斜体 | 链接 | 代码 |
|--------|------|------|------|------|
| VS Code | `Ctrl+B` | `Ctrl+I` | `Ctrl+K` | `` Ctrl+` `` |
| Typora | `Ctrl+B` | `Ctrl+I` | `Ctrl+K` | `` Ctrl+Shift+` `` |
| Markdown Here | `Ctrl+B` | `Ctrl+I` | `Ctrl+K` | `` Ctrl+Alt+C `` |

---

## 四、扩展语法

### 脚注

```markdown
这是一个脚注[^1]。

[^1]: 这是脚注的内容。
```

### 定义列表

```markdown
术语
: 定义
: 另一个定义
```

### 删除线

```markdown
~~这是删除的内容~~
```

### 高亮

```markdown
==这是高亮的内容==
```

### 数学公式

```markdown
$$
E = mc^2
$$
```

### 目录

```markdown
[TOC]  <!-- 自动生成目录 -->
```

---

## 五、参考资料

- [Markdown 官方教程](https://markdown.com.cn/)
- [Markdown 指南中文版](https://www.markdown.xyz/)
- [Emoji 完整列表](https://emojipedia.org/)