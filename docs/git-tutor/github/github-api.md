# GitHub API 使用指南

GitHub 提供 REST API 和 GraphQL API 两种接口，可用于自动化操作仓库、Issues、PR 等。

## API 类型

| 类型 | 说明 | 文档 |
|------|------|------|
| REST API | 传统的 HTTP API | [官方文档](https://docs.github.com/en/rest) |
| GraphQL API | 灵活的查询语言 | [官方文档](https://docs.github.com/en/graphql) |

## 快速开始

### 获取 Personal Access Token

1. 进入 GitHub → Settings → Developer settings → Personal access tokens
2. 点击 "Generate new token"
3. 选择需要的权限范围
4. 复制生成的 Token（仅显示一次）

### REST API 示例

```bash
# 获取仓库信息
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/用户名/仓库名

# 获取用户信息
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/users/用户名

# 列出仓库的 Issues
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/用户名/仓库名/issues
```

### 使用 GitHub CLI

```bash
# 安装 GitHub CLI
# Windows
winget install GitHub.cli

# macOS
brew install gh

# 登录
gh auth login

# 查看仓库信息
gh repo view 仓库名

# 创建 Issue
gh issue create --title "标题" --body "内容"

# 列出 PR
gh pr list
```

## 常用 API 端点

### 仓库相关

```text
GET /repos/{owner}/{repo}              # 获取仓库信息
GET /repos/{owner}/{repo}/contents/    # 获取文件内容
GET /repos/{owner}/{repo}/releases     # 获取发布版本
```

### Issues 相关

```text
GET /repos/{owner}/{repo}/issues       # 列出 Issues
POST /repos/{owner}/{repo}/issues      # 创建 Issue
PATCH /repos/{owner}/{repo}/issues/{issue_number}  # 更新 Issue
```

### Pull Requests 相关

```text
GET /repos/{owner}/{repo}/pulls             # 列出 PR
POST /repos/{owner}/{repo}/pulls            # 创建 PR
GET /repos/{owner}/{repo}/pulls/{pull_number}/files  # 获取 PR 文件
```

### 用户相关

```text
GET /user                          # 获取当前用户信息
GET /users/{username}              # 获取用户信息
GET /users/{username}/repos        # 获取用户仓库
```

## Python 示例

```python
import requests

TOKEN = "your_token_here"
HEADERS = {"Authorization": f"token {TOKEN}"}

# 获取仓库信息
response = requests.get(
    "https://api.github.com/repos/octocat/Hello-World",
    headers=HEADERS
)
print(response.json())

# 创建 Issue
response = requests.post(
    "https://api.github.com/repos/octocat/Hello-World/issues",
    headers=HEADERS,
    json={
        "title": "Bug Report",
        "body": "发现了以下问题..."
    }
)
print(response.json())
```

## 速率限制

- **未认证请求**：每小时 60 次
- **认证请求**：每小时 5000 次

查看当前速率限制：

```bash
curl -I -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/users/用户名 | grep -i "x-ratelimit"
```

---

## 相关资源

| 资源 | 链接 |
|------|------|
| REST API 文档 | [docs.github.com/en/rest](https://docs.github.com/en/rest) |
| GraphQL Explorer | [docs.github.com/en/graphql/overview/explorer](https://docs.github.com/en/graphql/overview/explorer) |
| API 演练场 | [docs.github.com/en/rest/overview/roles-in-the-rest-api](https://docs.github.com/en/rest/overview/roles-in-the-rest-api) |
