# 02 — 设置系统深度解析

> VS Code 的配置系统分为三层，理解它们之间的关系是高效使用 VS Code 的关键。

---

## 2.1 三层配置体系

| 级别          | 文件位置                            | 覆盖范围 | 谁应该改                |
| ------------- | ----------------------------------- | -------- | ----------------------- |
| **Default**   | 内置（只读）                        | 全局     | VS Code 官方            |
| **User**      | `%APPDATA%\Code\User\settings.json` | 所有项目 | **你** — 个人偏好       |
| **Workspace** | `.vscode/settings.json`             | 当前项目 | **项目团队** — 统一规范 |

**优先级：** Workspace > User > Default（高优先级覆盖低优先级）

### 打开方式

| 目标                         | 操作                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| 图形化设置                   | `Ctrl+,`                                                   |
| 编辑 User settings.json      | 命令面板 → `> Preferences: Open Settings (JSON)`           |
| 编辑 Workspace settings.json | 命令面板 → `> Preferences: Open Workspace Settings (JSON)` |

---

## 2.2 生产级 User 配置

以下是一份经过实战检验的 `settings.json`，可以直接复制到你的用户设置中：

```jsonc
{
  // ── 编辑器外观 ──
  "editor.fontSize": 14,
  "editor.fontFamily": "'Cascadia Code', 'Fira Code', 'JetBrains Mono', Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true, // 启用连字（需字体支持）
  "editor.lineHeight": 24, // 行高，提升可读性
  "editor.letterSpacing": 0.5, // 字符间距
  "editor.minimap.enabled": true, // 小地图
  "editor.minimap.scale": 2, // 小地图缩放
  "editor.renderWhitespace": "boundary", // 显示空格（边界处）
  "editor.bracketPairColorization.enabled": true, // 彩虹括号
  "editor.guides.bracketPairs": true, // 括号连线
  "editor.guides.indentation": true, // 缩进参考线
  "editor.cursorBlinking": "smooth", // 光标闪烁样式
  "editor.cursorSmoothCaretAnimation": "on", // 平滑光标动画

  // ── 编辑行为 ──
  "editor.formatOnSave": true, // 保存时自动格式化
  "editor.formatOnPaste": true, // 粘贴时格式化
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit", // 保存时自动修复
    "source.organizeImports": "explicit", // 保存时整理 import
  },
  "editor.suggestSelection": "first", // 补全建议默认选中第一项
  "editor.snippetSuggestions": "top", // 让 Snippet 优先显示
  "editor.tabSize": 2,
  "editor.wordWrap": "off", // 大文件保持不换行
  "editor.detectIndentation": true, // 自动检测缩进
  "editor.linkedEditing": true, // 同步编辑 HTML/JSX 标签对
  "editor.stickyScroll.enabled": true, // 滚动时显示当前作用域

  // ── 文件 ──
  "files.autoSave": "onFocusChange", // 失去焦点时自动保存
  "files.autoSaveDelay": 1000, // 自动保存延迟（毫秒）
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true,
    "**/.cache": true,
    "**/__pycache__": true,
  },
  "files.insertFinalNewline": true, // 文件末尾自动加空行
  "files.trimTrailingWhitespace": true, // 保存时删除行尾空格
  "files.trimFinalNewlines": true, // 保留文件末尾一个空行

  // ── 终端 ──
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.enableMultiLinePasteWarning": true,
  "terminal.integrated.smoothScrolling": true,

  // ── Git ──
  "git.enableSmartCommit": true, // 无暂存区时直接提交
  "git.autofetch": true, // 自动拉取
  "git.confirmSync": false, // 同步时不确认
  "git.ignoreMissingGitWarning": true,

  // ── 窗口 ──
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.editor.enablePreview": false, // 禁止预览模式覆盖 Tab
  "workbench.editor.wrapTabs": true, // 标签换行
  "workbench.editor.pinnedTabSizing": "compact",
  "window.titleBarStyle": "custom", // Windows 自定义标题栏

  // ── 搜索 ──
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true,
  },
  "search.followSymlinks": false,

  // ── 扩展设置 ──
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "extensions.ignoreRecommendations": false,
  "update.mode": "default",
  "npm.enableScriptExplorer": true,

  // ── 语言特定配置 ──
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[python]": {
    "editor.formatOnType": true,
    "editor.defaultFormatter": "ms-python.black-formatter",
  },
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "comments": "off",
      "strings": "off",
      "other": "off",
    },
  },
}
```

---

## 2.3 项目级配置（Workspace）

在项目根目录创建 `.vscode/settings.json`，推荐将这类配置提交到 Git：

```jsonc
{
  // 项目统一格式
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.encoding": "utf8",
  "files.eol": "\n", // LF 换行

  // 项目级格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },

  // 项目级校验
  "typescript.validate.enable": true,
  "javascript.validate.enable": true,
  "eslint.validate": ["javascript", "typescript", "vue"],
}
```

> **最佳实践**：`.vscode/settings.json` 应该提交到 Git，让团队所有成员使用一致的配置。`.vscode/` 下其他文件同理。

---

## 2.4 常用配置项速查

### 编辑器

| 配置项                        | 作用           | 推荐值                                    |
| ----------------------------- | -------------- | ----------------------------------------- |
| `editor.fontSize`             | 字体大小       | `14`                                      |
| `editor.fontFamily`           | 字体           | `'Cascadia Code', 'Fira Code', monospace` |
| `editor.fontLigatures`        | 连字           | `true`                                    |
| `editor.minimap.enabled`      | 小地图         | `true`                                    |
| `editor.renderWhitespace`     | 空白字符显示   | `"boundary"`                              |
| `editor.rulers`               | 垂直参考线     | `[80, 100, 120]`                          |
| `editor.wordWrap`             | 自动换行       | `"off"` 或 `"on"`                         |
| `editor.tabSize`              | Tab 宽度       | `2` 或 `4`                                |
| `editor.formatOnSave`         | 保存时格式化   | `true`                                    |
| `editor.suggest.showKeywords` | 补全显示关键字 | `false`（减少干扰）                       |

### 文件

| 配置项                         | 作用         | 推荐值                    |
| ------------------------------ | ------------ | ------------------------- |
| `files.autoSave`               | 自动保存     | `"onFocusChange"`         |
| `files.exclude`                | 隐藏文件     | `node_modules`、`dist` 等 |
| `files.trimTrailingWhitespace` | 删除行尾空格 | `true`                    |
| `files.insertFinalNewline`     | 末尾加空行   | `true`                    |

### 窗口

| 配置项                    | 作用       | 推荐值                     |
| ------------------------- | ---------- | -------------------------- |
| `workbench.colorTheme`    | 主题       | 按喜好                     |
| `workbench.iconTheme`     | 图标主题   | `"material-icon-theme"`    |
| `workbench.startupEditor` | 启动页     | `"none"`（直接显示编辑器） |
| `window.titleBarStyle`    | 标题栏样式 | `"custom"`（Windows）      |
| `window.zoomLevel`        | 整体缩放   | `0`（可调）                |

### 终端

| 配置项                                       | 作用         | 推荐值                         |
| -------------------------------------------- | ------------ | ------------------------------ |
| `terminal.integrated.fontSize`               | 终端字体大小 | `13`                           |
| `terminal.integrated.defaultProfile.windows` | 默认 shell   | `"Git Bash"` 或 `"PowerShell"` |
| `terminal.integrated.cursorBlinking`         | 光标闪烁     | `true`                         |

---

## 2.5 设置同步

当你配置好 User 设置后，建议开启 Settings Sync 在多台机器间同步：

- 详见 [09 — 工作区、Profile 与同步](./09-workspace-profile-sync.md)

---

## 2.6 调试配置：Inspect Tokens and Colors

如果你需要查看某个字符的语法高亮 scope（写主题或调试语法高亮时用）：

1. 命令面板 → `> Developer: Inspect Tokens and Colors`
2. 鼠标悬停到任意字符上
3. 会弹出该字符的 `scope`、`foreground` 颜色等信息

---

## 下一步

配置好个性化设置后，进入 [03 — 编辑器核心功能](./03-editor-core.md) 学习编辑器的高效操作。
