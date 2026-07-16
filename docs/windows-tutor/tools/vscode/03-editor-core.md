# 03 — 编辑器核心功能

> 本章覆盖 VS Code 编辑器最核心的生产力功能：多光标、代码补全、Emmet、Snippets、格式化、重构等。

---

## 3.1 多光标编辑

多光标是 VS Code 最强大的编辑功能之一，让你同时修改多个位置。

### 操作方式

| 操作                 | 快捷键 / 方式                 |
| -------------------- | ----------------------------- |
| 追加光标             | `Alt + 点击`                  |
| 上下追加光标         | `Ctrl + Alt + ↑ / ↓`          |
| 选中所有相同词       | `Ctrl + Shift + L`            |
| 逐个添加下一个相同词 | `Ctrl + D`（按多次）          |
| 撤消上一个光标操作   | `Ctrl + U`                    |
| 列选择（框选）       | `Shift + Alt + 拖动鼠标`      |
| 列选择（键盘）       | `Ctrl + Shift + Alt + 箭头键` |

### 实战场景

**场景 1：批量修改变量名**

```javascript
// 选中 name → Ctrl+Shift+L（选中所有 name）
// 直接输入新名称
const name = 'Alice'
const user = { name: name }
console.log(name)
```

**场景 2：批量添加/删除属性**

```javascript
// 把 name, age, city 批量加引号
// 1. 选中 name → Ctrl+D 逐个添加
// 2. 按 Home 到行首，输入 "
// 3. 按 End 到行尾，输入 "
// 4. 同样的方式处理 age, city
{ name: 'Alice', age: 30, city: 'Beijing' }
// ↓
{ "name": 'Alice', "age": 30, "city": 'Beijing' }
```

**场景 3：列选择批量编辑**

```
// Shift+Alt+拖动，从第 1 行第 1 列拖到第 4 行第 5 列
// 选中后直接输入，4 行同时修改
Alice     →  A****
Bob       →  B****
Charlie   →  C****
Diana     →  D****
```

---

## 3.2 代码补全（IntelliSense）

VS Code 内置了强大的 IntelliSense（智能代码补全），按 `Ctrl+Space` 手动触发。

### 补全类型

| 类型         | 说明        | 示例                         |
| ------------ | ----------- | ---------------------------- |
| 关键字补全   | 语言关键字  | `function`、`const`、`class` |
| 符号补全     | 变量/函数名 | 项目中的已定义符号           |
| 属性补全     | 对象属性    | `obj.` 后自动提示            |
| 路径补全     | 文件路径    | `import ... from './'`       |
| Snippet 补全 | 代码模板    | `for` + Tab 生成 for 循环    |
| 参数提示     | 函数参数    | `Ctrl+Shift+Space`           |

### 补全配置

```jsonc
// settings.json
{
  "editor.quickSuggestions": {
    "comments": "off", // 注释中不提示
    "strings": "on", // 字符串中提示
    "other": "on",
  },
  "editor.suggestSelection": "first", // 默认选中第一个
  "editor.snippetSuggestions": "top", // Snippet 优先显示
  "editor.suggest.showKeywords": false, // 隐藏关键字，减少干扰
}
```

---

## 3.3 Emmet

Emmet 是 HTML/CSS 的"奥特曼级"缩写引擎，内置在 VS Code 中，无需安装扩展。

### HTML 速写

| 输入            | 按 Tab 后                                                                        |
| --------------- | -------------------------------------------------------------------------------- |
| `!`             | HTML5 完整骨架                                                                   |
| `div`           | `<div></div>`                                                                    |
| `ul>li*3`       | `<ul><li></li><li></li><li></li></ul>`                                           |
| `div.container` | `<div class="container"></div>`                                                  |
| `div#main`      | `<div id="main"></div>`                                                          |
| `a[href="#"]`   | `<a href="#"></a>`                                                               |
| `ul>li.item$*3` | `<ul><li class="item1"></li><li class="item2"></li><li class="item3"></li></ul>` |

### CSS 速写

| 输入    | 按 Tab 后             |
| ------- | --------------------- |
| `m10`   | `margin: 10px;`       |
| `p20`   | `padding: 20px;`      |
| `fz16`  | `font-size: 16px;`    |
| `c#333` | `color: #333;`        |
| `bgc`   | `background-color: ;` |
| `df`    | `display: flex;`      |
| `jc`    | `justify-content: ;`  |
| `ai`    | `align-items: ;`      |

### 自定义 Emmet

```jsonc
// settings.json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact", // 在 JS 中启用 JSX Emmet
    "vue-html": "html",
    "vue": "html",
  },
  "emmet.triggerExpansionOnTab": true,
  "emmet.showSuggestionsAsSnippets": true,
}
```

---

## 3.4 代码片段（Snippets）

Snippets 是比 Emmet 更通用的代码模板工具，支持任何语言。

### 创建用户片段

1. 命令面板 → `> Configure User Snippets`
2. 选择语言（如 `TypeScript React`）或 `New Global Snippets file`
3. 编辑 JSON 文件

### 实战示例

**TypeScript 函数组件**

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": ["import React from 'react';", "", "interface ${1:ComponentName}Props {", "  $2", "}", "", "const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ $2 }) => {", "  return (", "    <div>", "      $0", "    </div>", "  );", "};", "", "export default ${1:ComponentName};"],
    "description": "Create a React FC with TypeScript"
  }
}
```

**Snippet 语法**

| 占位符                | 说明                       |
| --------------------- | -------------------------- |
| `$1`、`$2`            | Tab 跳转位置（按顺序）     |
| `${1:default}`        | 带默认值的占位符           |
| `$0`                  | 最终光标位置               |
| `${1                  | a,b,c                      | }`  | 下拉选择 |
| `${TM_FILENAME_BASE}` | 变量：文件名（不含扩展名） |
| `${CURRENT_YEAR}`     | 变量：当前年份             |
| `${CLIPBOARD}`        | 变量：剪贴板内容           |

### 常用内置 Snippet 触发词

| 语言   | 触发词                  | 生成内容                     |
| ------ | ----------------------- | ---------------------------- |
| HTML   | `!` + Tab               | HTML5 骨架                   |
| JS/TS  | `log` / `clg`           | `console.log()`              |
| JS/TS  | `for`、`forof`、`forin` | 循环模板                     |
| CSS    | `m`、`p`、`fz`、`c`     | 属性缩写                     |
| Python | `def`                   | 函数定义                     |
| Python | `class`                 | 类定义                       |
| Python | `ifmain`                | `if __name__ == '__main__':` |

---

## 3.5 代码格式化

### 手动格式化

| 操作           | 快捷键              |
| -------------- | ------------------- |
| 格式化整个文档 | `Shift + Alt + F`   |
| 格式化选中区域 | `Ctrl + K Ctrl + F` |

### 自动格式化（推荐）

```jsonc
// settings.json
{
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

---

## 3.6 代码重构

VS Code 内置了轻量级重构功能：

| 重构操作         | 方式                                                      |
| ---------------- | --------------------------------------------------------- |
| **重命名符号**   | 选中符号 → `F2` → 输入新名称（所有引用同时更新）          |
| **提取方法**     | 选中代码 → 右键 → `Refactor...` → `Extract to function`   |
| **提取变量**     | 选中表达式 → 右键 → `Refactor...` → `Extract to variable` |
| **快速修复**     | 在有波浪线的地方按 `Ctrl+.` 或单击灯泡图标                |
| **更改文件语言** | `Ctrl+K M`                                                |

### 重命名实战

`F2` 重命名是 VS Code 最实用的重构功能：

```typescript
// 选中 fetchUserData → 按 F2 → 输入 getUserData
// 所有引用自动更新
async function fetchUserData(id: string) {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// 所有调用处自动更新
const data = await fetchUserData('123')
```

---

## 3.7 代码折叠

| 操作           | 快捷键                             |
| -------------- | ---------------------------------- |
| 折叠当前区域   | `Ctrl+Shift+[`                     |
| 展开当前区域   | `Ctrl+Shift+]`                     |
| 折叠所有子区域 | `Ctrl+K Ctrl+[`                    |
| 展开所有子区域 | `Ctrl+K Ctrl+]`                    |
| 折叠所有区域   | `Ctrl+K Ctrl+0`                    |
| 展开所有区域   | `Ctrl+K Ctrl+J`                    |
| 折叠级别 N     | `Ctrl+K Ctrl+1` 到 `Ctrl+K Ctrl+7` |

---

## 3.8 跳转与导航

| 操作           | 快捷键          | 说明                |
| -------------- | --------------- | ------------------- |
| 跳转到定义     | `F12`           | 查看符号定义        |
| Peek 定义      | `Alt+F12`       | 内联窗口查看定义    |
| 跳转到类型定义 | `Ctrl+K Ctrl+I` | 查看类型定义        |
| 显示引用       | `Shift+F12`     | 查看所有引用        |
| 显示所有符号   | `Ctrl+T`        | 搜索项目中的符号    |
| 跳转到行       | `Ctrl+G`        | 输入行号            |
| 跳转到文件符号 | `Ctrl+Shift+O`  | 输入 `@` 后搜函数名 |
| 返回上一位置   | `Alt+←`         | 代码导航            |
| 前进到下一位置 | `Alt+→`         | 代码导航            |

---

## 3.9 错误与警告

| 操作           | 快捷键         | 说明                  |
| -------------- | -------------- | --------------------- |
| 打开问题面板   | `Ctrl+Shift+M` | 集中查看所有错误/警告 |
| 转到下一个错误 | `F8`           | 循环跳转              |
| 转到上一个错误 | `Shift+F8`     | 反向循环跳转          |
| 快速修复       | `Ctrl+.`       | 显示修复建议          |

---

## 下一步

掌握了编辑器核心功能后，进入 [04 — 扩展推荐与管理](./04-extensions.md) 用插件扩展 VS Code 的能力。
