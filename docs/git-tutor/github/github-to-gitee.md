# 自动同步 GitHub 代码到 Gitee

由于 GitHub 在国内访问较慢，可以将代码同步到 Gitee 提供国内镜像。

## 推荐方案

使用 [hub-mirror-action](https://github.com/marketplace/actions/hub-mirror-action) 实现自动同步。

---

## 完整配置指南

> 来源：[知乎 - GitHub Actions 自动同步到 Gitee](https://zhuanlan.zhihu.com/p/353862378)

### 第一步：配置 SSH 公钥

#### 生成 SSH 密钥

```bash
ssh-keygen
# 连按三次回车，使用默认配置
```

![生成密钥](https://pic2.zhimg.com/v2-87941f9a981a98b493bcd4dd79cc3b25_r.jpg)

#### 添加公钥到 GitHub 和 Gitee

分别在 GitHub 和 Gitee 的 SSH 设置中添加公钥内容。

![添加公钥](https://pic4.zhimg.com/v2-00317b83252027a36be6d6ec6f267193_r.jpg)

#### 验证公钥

```bash
# 验证 GitHub
ssh -T git@github.com

# 验证 Gitee
ssh -T git@gitee.com
# 返回成功提示即表示公钥配置成功
```

![验证结果](https://pic4.zhimg.com/v2-9f38c06db2d467dbb590964e7a96660f_r.jpg)

### 第二步：配置 GitHub Token

1. 生成 Personal Access Token

![生成 Token](https://pic2.zhimg.com/v2-cc22ebd8fef6fa4c6d8ddee5bee35121_r.jpg)

2. 在仓库 Settings → Secrets 中添加 Token

![添加 Token](https://pic3.zhimg.com/v2-a747fed0df42c3c49e561ccbd32e3186_r.jpg)

### 第三步：配置 Gitee 私钥

1. 进入 GitHub 仓库 → Settings → Secrets

![Settings](https://pic4.zhimg.com/v2-bcc8ca15bed8ab44d2a59d08934c7bbf_r.jpg)

2. 添加 Secret `GITEE_RSA_PRIVATE_KEY`

![私钥](https://pic3.zhimg.com/v2-4be95bbb474808761d322777b6e252aa_r.jpg)

3. 添加 Secret `GITEE_PASSWORD`（Gitee 账号密码）

确认已添加三个 Secret：

- `ACCESS_TOKEN` — GitHub Token
- `GITEE_RSA_PRIVATE_KEY` — Gitee SSH 私钥
- `GITEE_PASSWORD` — Gitee 密码

![Secrets 汇总](https://pic2.zhimg.com/v2-dd1befa84a0dab95c1cd0e2ae544bdc5_r.jpg)

### 第四步：创建 Actions 工作流

在 GitHub 仓库中创建 `.github/workflows/sync.yml`：

![创建文件](https://pic3.zhimg.com/v2-1a38e1b9c9889a5d7e3d33d02f0a8252_r.jpg)

```yaml
name: Sync to Gitee

on:
  push:
    branches: [main, master]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Build and Deploy
        uses: jenkey2011/vuepress-deploy@master
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          TARGET_REPO: 你的用户名/仓库名
          TARGET_BRANCH: gh_pages
          BUILD_SCRIPT: yarn && yarn build
          BUILD_DIR: docs/.vuepress/dist/

  sync:
    needs: build-and-deploy
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
          source-repo: "git@github.com:你的用户名/仓库名.git"
          destination-repo: "git@gitee.com:你的用户名/仓库名.git"

  reload-pages:
    needs: sync
    runs-on: ubuntu-latest
    steps:
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          gitee-username: 你的Gitee用户名
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          gitee-repo: 你的用户名/仓库名
          branch: gh-pages
```

### 效果

配置完成后，每次 Push 到 GitHub 会自动：

1. 构建静态文件
2. 部署到 GitHub Pages
3. 同步代码到 Gitee
4. 部署 Gitee Pages

![执行结果](https://pic4.zhimg.com/v2-cb0186d0db9b53e2e5e9befe45aa222f_r.jpg)

---

## 更多参考

| 工具 | 说明 |
|------|------|
| [hub-mirror-action](https://github.com/marketplace/actions/hub-mirror-action) | 官方推荐的同步 Action |
| [gitee-pages-action](https://github.com/marketplace/actions/gitee-pages-action) | 自动部署 Gitee Pages |
