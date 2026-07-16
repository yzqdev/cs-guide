# 05 — 集成终端

> VS Code 的集成终端让你无需在编辑器与外部终端之间切换，还支持多 Tab、分屏、自定义 Shell 等高级功能。

---

## 5.1 基本操作

| 操作          | 快捷键 / 方式                                    |
| ------------- | ------------------------------------------------ |
| 打开/切换终端 | `` Ctrl+` ``                                     |
| 新建终端      | `Ctrl+Shift+` `                                  |
| 关闭当前终端  | `Ctrl+W`（在终端聚焦时）                         |
| 切换终端 Tab  | `Ctrl+Tab` / `Ctrl+Shift+Tab`                    |
| 清屏          | `Ctrl+L` 或输入 `clear`                          |
| 复制选中      | `Ctrl+Shift+C`                                   |
| 粘贴          | `Ctrl+Shift+V`                                   |
| 滚动          | `Ctrl+↑/↓`                                       |
| 搜索终端内容  | `Ctrl+Shift+F`（在终端聚焦时）                   |
| 终端分屏      | 点击 Tab 右侧的 **Split** 按钮 或 `Ctrl+Shift+5` |

---

## 5.2 多 Shell 配置

你可以在 VS Code 中同时使用多个不同的 Shell（如 Git Bash、PowerShell、CMD、WSL），并根据需要切换。

### 配置方案

```jsonc
// settings.json
{
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "terminal.integrated.profiles.windows": {
    "Git Bash": {
      "path": "C:\\Program Files\\Git\\bin\\bash.exe",
      "icon": "terminal-bash",
      "color": "terminal.ansiGreen",
    },
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell",
      "color": "terminal.ansiBlue",
    },
    "Command Prompt": {
      "path": "C:\\Windows\\System32\\cmd.exe",
      "icon": "terminal-cmd",
      "color": "terminal.ansiCyan",
    },
    "Windows PowerShell": {
      "path": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
      "icon": "terminal-powershell",
    },
  },
}
```

### 切换 Shell

点击终端 Tab 右侧的 **下拉箭头** → 选择要使用的 Shell。

---

## 5.3 终端分屏

当需要同时看两个终端输出时（如一个运行 dev server，一个运行测试），分屏非常有用。

```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│  终端 1 (npm run dev) │  终端 2 (npm test)    │
│                      │                      │
├──────────────────────┴──────────────────────┤
│  终端 3 (git status)                         │
└─────────────────────────────────────────────┘
```

**操作方式**：

1. 点击终端 Tab 右侧的 **Split Terminal** 按钮（或 `Ctrl+Shift+5`）
2. 拖动分屏之间的分隔线调整大小
3. 关闭分屏：点击分屏 Tab 上的 **X** 按钮

---

## 5.4 终端内交互技巧

### ① Ctrl+Click 打开文件/链接

在终端中按住 `Ctrl` 点击：

- **文件路径** → 在编辑器中打开该文件
- **URL**（如 `http://localhost:5173`）→ 在浏览器中打开
- **错误堆栈** → 跳转到对应代码行

### ② 在终端中打开当前文件目录

```bash
# 在终端中执行
code .
# 或在 VS Code 中右键文件 → Reveal in Explorer
```

### ③ 自定义终端提示符样式

```jsonc
// settings.json
{
  "terminal.integrated.fontFamily": "'Cascadia Code', 'Fira Code', monospace",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.lineHeight": 1.3,
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.smoothScrolling": true,
  "terminal.integrated.enableMultiLinePasteWarning": true,
}
```

---

## 5.5 终端环境变量

有时终端运行时找不到某些命令或模块，需要配置环境变量。

### 设置终端环境变量

```jsonc
// settings.json
{
  "terminal.integrated.env.windows": {
    "PYTHONPATH": "${workspaceFolder}",
    "NODE_ENV": "development",
    "PATH": "${env:PATH};${workspaceFolder}/node_modules/.bin",
  },
}
```

### 变量引用

| 变量                         | 说明                   |
| ---------------------------- | ---------------------- |
| `${workspaceFolder}`         | 当前工作区根目录       |
| `${workspaceFolderBasename}` | 根目录名               |
| `${env:PATH}`                | 系统的 PATH 变量       |
| `${env:HOME}`                | 用户主目录             |
| `${userHome}`                | 用户主目录的另一种写法 |

---

## 5.6 终端自动化

### 自动打开终端

结合 [Tasks](./07-tasks-and-launch.md)，可以在打开项目时自动启动终端：

```jsonc
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Dev Server",
      "type": "npm",
      "script": "dev",
      "isBackground": true,
      "problemMatcher": [],
      "presentation": {
        "panel": "dedicated",
        "reveal": "always",
        "group": "dev",
      },
    },
  ],
}
```

### 终端快捷键绑定

```jsonc
// keybindings.json
{
  "key": "ctrl+shift+t",
  "command": "workbench.action.terminal.newWithProfile",
  "args": { "profileName": "Git Bash" },
}
```

---

## 5.7 常见问题

### 终端输入 `cls` 不生效

**原因**：`cls` 是 Windows CMD 的清屏命令，VS Code 的集成终端默认使用 PowerShell 或 Git Bash。

**解决**：

- 使用 `Clear` 或 `Ctrl+L` 清屏
- 或绑定快捷键：

```jsonc
// keybindings.json
{
  "key": "ctrl+q",
  "command": "workbench.action.terminal.clear",
}
```

### 终端字体乱码/图标不显示

**解决**：安装 Nerd Font 并指定字体：

```jsonc
{
  "terminal.integrated.fontFamily": "MesloLGL NF",
  "terminal.integrated.fontSize": 14,
}
```

### 终端无法运行 `code .`

**解决**：命令面板 → `> Shell Command: Install 'code' command in PATH`

---

## 下一步

终端配置好后，进入 [06 — Git 集成](./06-git-integration.md) 学习 VS Code 的 Git 工具。
