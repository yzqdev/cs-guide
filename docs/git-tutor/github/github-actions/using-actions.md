# 使用 Actions 的开源项目

优秀的 GitHub Actions 实践案例，可作为参考。

## 项目推荐

| 项目 | 说明 | 链接 |
|------|------|------|
| 知乎热榜监控 | 自动抓取知乎热榜 | [GitHub](https://github.com/justjavac/zhihu-trending-hot-questions) |
| 社交媒体 README | 自动生成社交动态 README | [GitHub](https://github.com/zylele/social-readme) |
| GitHub Profile 卡片 | 自动生成个人主页统计卡片 | [GitHub](https://github.com/vn7n24fzkq/github-profile-summary-cards) |

## 常见用途

### 1. 自动化 README 更新

```yaml
name: Update README

on:
  schedule:
    - cron: '0 0 * * *'  # 每天运行
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Update stats
        run: echo "Updating README..."
```

### 2. 定时数据抓取

```yaml
name: Fetch Data

on:
  schedule:
    - cron: '0 */6 * * *'  # 每6小时运行

jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Fetch trending
        run: |
          # 抓取数据的脚本
          python fetch_trending.py
```

### 3. 自动发布通知

```yaml
name: Notify

on:
  release:
    types: [published]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send notification
        run: echo "New release published!"
```

## 相关资源

| 资源 | 说明 |
|------|------|
| [awesome-actions](https://github.com/sdras/awesome-actions) | Actions 资源集合 |
| [GitHub Actions 官方模板](https://github.com/actions/starter-workflows) | 官方工作流模板 |
