# GitHub Actions 入门教程

GitHub Actions 是 GitHub 提供的 CI/CD 平台，可以自动化构建、测试和部署工作流。

## 官方资源

| 资源 | 链接 |
|------|------|
| 快速开始 | [docs.github.com/en/actions/quickstart](https://docs.github.com/en/actions/quickstart) |
| 工作流模板 | [github.com/actions/starter-workflows](https://github.com/actions/starter-workflows) |
| 环境变量 | [docs.github.com/en/actions/learn-github-actions/environment-variables](https://docs.github.com/en/actions/learn-github-actions/environment-variables) |

## 基础概念

### 工作流 (Workflow)

工作流是一个自动化流程，定义在 `.github/workflows/` 目录下的 YAML 文件中。

```yaml
name: CI

# 触发条件
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# 工作任务
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a one-line script
        run: echo "Hello, GitHub Actions!"
```

### 核心组件

| 组件 | 说明 |
|------|------|
| `on` | 触发工作流的事件 |
| `jobs` | 工作流中的任务集合 |
| `steps` | 任务中的步骤 |
| `uses` | 使用预定义的 Action |
| `run` | 执行 shell 命令 |
| `env` | 环境变量 |

### 常用触发事件

```yaml
on:
  push:                    # 推送代码
  pull_request:            # PR 创建/更新
  schedule:
    - cron: '0 0 * * *'   # 定时触发
  workflow_dispatch:        # 手动触发
  release:
    types: [published]     # 发布版本触发
```

## 常用环境变量

| 变量 | 说明 |
|------|------|
| `GITHUB_WORKSPACE` | 工作目录路径 |
| `GITHUB_SHA` | 触发事件的 commit SHA |
| `GITHUB_REF` | 触发事件的分支/tag |
| `GITHUB_EVENT_NAME` | 触发事件的名称 |
| `GITHUB_ACTOR` | 触发事件的用户 |
| `GITHUB_REPOSITORY` | 仓库名称 (owner/repo) |
| `RUNNER_OS` | 运行器操作系统 |
| `RUNNER_TEMP` | 临时文件目录 |

## 参考链接

- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [GitHub Actions 市场](https://github.com/marketplace?type=actions)
- [awesome-actions](https://github.com/sdras/awesome-actions)
