# 07 — 任务自动化与调试

> 通过 `tasks.json` 和 `launch.json`，VS Code 可以替代终端脚本和外部调试器，一站式完成构建、测试、调试。

---

## 第一部分：任务自动化（Tasks）

Tasks 是 VS Code 的"内部脚本引擎"，允许你在编辑器内直接运行构建、测试、打包等命令。

---

### 7.1 快速创建任务

1. 命令面板 → `> Tasks: Configure Task`
2. VS Code 自动检测项目文件（如 `package.json`、`Makefile`、`Cargo.toml`）
3. 选择模板（如 `npm: build`、`npm: test`）
4. 自动生成 `.vscode/tasks.json`

### 7.2 tasks.json 完全解析

```jsonc
{
  "version": "2.0.0", // 版本号，固定
  "tasks": [
    {
      "label": "Build", // 任务名称，显示在命令面板中
      "type": "shell", // 类型：shell 或 process
      "command": "npm run build", // 要执行的命令
      "group": {
        "kind": "build", // build 或 test
        "isDefault": true, // 设为默认构建任务
      },
      "presentation": {
        "reveal": "always", // 何时显示终端：always / never / silent
        "panel": "dedicated", // 使用专用面板
        "echo": true, // 显示执行的命令
        "focus": false, // 自动聚焦到终端
        "clear": true, // 运行前清空终端
      },
      "problemMatcher": [
        // 错误匹配器，从输出中提取错误
        "$eslint-stylish",
        "$tsc",
      ],
      "options": {
        "cwd": "${workspaceFolder}/packages/frontend", // 工作目录
        "env": { "NODE_ENV": "production" }, // 环境变量
      },
    },
  ],
}
```

### 7.3 常用任务类型

**① 运行 npm 脚本**

```jsonc
{
  "label": "Dev Server",
  "type": "npm",
  "script": "dev",
  "isBackground": true, // 后台长期运行
  "presentation": {
    "panel": "dedicated",
    "reveal": "always",
  },
}
```

**② 运行 Makefile**

```jsonc
{
  "label": "Make Build",
  "type": "shell",
  "command": "make",
  "args": ["build"],
  "group": "build",
}
```

**③ 编译 TypeScript**

```jsonc
{
  "label": "tsc watch",
  "type": "shell",
  "command": "npx tsc --watch",
  "isBackground": true,
  "problemMatcher": "$tsc-watch",
  "presentation": {
    "panel": "dedicated",
    "reveal": "silent", // 只在有错误时显示
  },
}
```

**④ 多任务组合（复合任务）**

```jsonc
{
  "label": "Full Build",
  "dependsOn": ["Lint", "Type Check", "Build"],
  "dependsOrder": "sequence", // sequence 或 parallel
}
```

### 7.4 运行任务

| 操作               | 方式                                  |
| ------------------ | ------------------------------------- |
| 运行默认构建任务   | `Ctrl+Shift+B`                        |
| 运行任意任务       | 命令面板 → `> Tasks: Run Task`        |
| 重新运行上一次任务 | 命令面板 → `> Tasks: Rerun Last Task` |
| 终止任务           | 命令面板 → `> Tasks: Terminate Task`  |
| 查看运行中的任务   | 状态栏右侧的终端图标                  |

### 7.5 实战：前端项目完整任务链

```jsonc
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Lint",
      "type": "npm",
      "script": "lint",
      "problemMatcher": ["$eslint-stylish"],
      "group": "build",
    },
    {
      "label": "Type Check",
      "type": "shell",
      "command": "npx tsc --noEmit",
      "problemMatcher": "$tsc",
      "group": "build",
    },
    {
      "label": "Build",
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true,
      },
    },
    {
      "label": "Test",
      "type": "npm",
      "script": "test",
      "group": "test",
      "presentation": {
        "panel": "dedicated",
        "reveal": "always",
      },
    },
    {
      "label": "CI Check",
      "dependsOn": ["Lint", "Type Check", "Build", "Test"],
      "dependsOrder": "sequence",
    },
  ],
}
```

---

## 第二部分：调试配置（Launch）

---

### 7.6 调试入门

在 VS Code 中调试只需三步：

1. **设置断点**：在行号左侧点击（或按 `F9`）
2. **启动调试**：按 `F5`
3. **单步执行**：使用 `F10`、`F11`、`Shift+F11`

### 7.7 launch.json 完全解析

```jsonc
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug App", // 配置名称，显示在调试下拉菜单
      "type": "node", // 调试器类型
      "request": "launch", // launch（启动）或 attach（附加）
      "program": "${workspaceFolder}/src/index.js", // 入口文件
      "args": ["--port", "3000"], // 命令行参数
      "env": {
        // 环境变量
        "NODE_ENV": "development",
      },
      "envFile": "${workspaceFolder}/.env", // 从 .env 文件加载
      "cwd": "${workspaceFolder}", // 工作目录
      "console": "integratedTerminal", // 输出到集成终端
      "skipFiles": [
        // 跳过不需要调试的文件
        "<node_internals>/**",
        "${workspaceFolder}/node_modules/**",
      ],
      "preLaunchTask": "Build", // 调试前先运行 Build 任务
      "postDebugTask": "", // 调试结束后运行的任务
    },
  ],
}
```

### 7.8 各语言调试实战

**Node.js 调试**

```jsonc
{
  "name": "Launch via NPM",
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "dev"],
  "console": "integratedTerminal",
  "skipFiles": ["<node_internals>/**"],
}
```

**附加到已运行的 Node 进程**

```jsonc
{
  "name": "Attach to Process",
  "type": "node",
  "request": "attach",
  "port": 9229, // 先启动 node --inspect
  "restart": true,
  "localRoot": "${workspaceFolder}",
  "remoteRoot": "/app", // 远程调试时用
}
```

**Python 调试**

```jsonc
{
  "name": "Python: Current File",
  "type": "python",
  "request": "launch",
  "program": "${file}",
  "console": "integratedTerminal",
  "args": ["--input", "data.txt"],
  "env": {
    "PYTHONPATH": "${workspaceFolder}",
  },
  "justMyCode": true,
}
```

**Python: Django**

```jsonc
{
  "name": "Django",
  "type": "python",
  "request": "launch",
  "program": "${workspaceFolder}/manage.py",
  "args": ["runserver", "0.0.0.0:8000"],
  "django": true,
}
```

**Go 调试**

```jsonc
{
  "name": "Launch Go Program",
  "type": "go",
  "request": "launch",
  "mode": "auto",
  "program": "${fileDirname}",
  "args": [],
  "env": {},
  "cwd": "${workspaceFolder}",
}
```

### 7.9 断点高级技巧

**条件断点**

右键断点 → `Edit Breakpoint` → 输入条件表达式：

```javascript
// 只有 i 等于 5 时才中断
i === 5

// 只有在特定用户时才中断
user.id === 'admin'

// 每 3 次命中后中断
hitCount % 3 === 0
```

**日志点（Logpoint）**

右键断点 → `Logpoint` → 输入日志消息（不中断执行，只输出日志）：

```text
user logged in: {user.name} at {new Date().toISOString()}
```

**内联断点**

在行内按 `Shift+F9`，仅在该行的特定列触发。

**函数断点**

在调试控制台（DEBUG CONSOLE）中设置：

```text
debug.setBreakpoint('someFunction')
```

### 7.10 调试控制台

调试控制台（`Ctrl+Shift+Y`）可以在调试时实时求值表达式：

```javascript
// 在调试控制台中输入
myVariable
document.querySelector('.app')
typeof someFunction

// 直接在调试控制台中修改变量
myVariable = 'new value'
```

### 7.11 多配置与复合调试

```jsonc
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Frontend",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev:frontend"],
      "console": "integratedTerminal",
    },
    {
      "name": "Backend",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev:backend"],
      "console": "integratedTerminal",
    },
  ],
  "compounds": [
    {
      "name": "Full Stack",
      "configurations": ["Frontend", "Backend"],
      "preLaunchTask": "Build",
      "stopAll": true, // 停止一个时全部停止
    },
  ],
}
```

---

## 7.12 调试快捷键速查

| 快捷键          | 功能            |
| --------------- | --------------- |
| `F5`            | 启动调试 / 继续 |
| `Shift+F5`      | 停止调试        |
| `Ctrl+Shift+F5` | 重启调试        |
| `F9`            | 切换断点        |
| `F10`           | 单步跳过        |
| `F11`           | 单步进入        |
| `Shift+F11`     | 单步跳出        |
| `Ctrl+K Ctrl+I` | 显示悬停信息    |
| `Ctrl+Shift+Y`  | 调试控制台      |
| `Ctrl+Shift+D`  | 打开调试视图    |

---

## 下一步

进入 [08 — 远程开发](./08-remote-development.md) 学习如何远程连接服务器、WSL 和 Docker 容器开发。
