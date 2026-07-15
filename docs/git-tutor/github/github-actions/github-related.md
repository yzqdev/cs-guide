# GitHub Actions 实用示例

常用的工作流配置模板，可直接复制使用。

## 常见问题

### GitHub Pages 资源 404

如果使用 Jekyll 构建的 Pages 出现资源 404，需要在仓库根目录添加 `.nojekyll` 文件：

```bash
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll to disable Jekyll processing"
git push
```

---

## 示例一：部署 GitHub Pages

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          branch: gh-pages
          folder: dist
```

---

## 示例二：Java 项目打包 JAR

```yaml
name: Build JAR

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Setup Gradle
        uses: gradle/actions/setup-gradle@v3

      - name: Build with Gradle
        run: ./gradlew clean build

      - name: Upload Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: build/libs/*.jar
```

---

## 示例三：发布 Pages 到指定仓库

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - name: Deploy to specific repo
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          repository-name: 用户名/仓库名
          token: ${{ secrets.ACCESS_TOKEN }}
          branch: gh-pages
          folder: dist
          single-commit: true
```

---

## 示例四：自动同步到 Gitee

```yaml
name: Sync to Gitee

on:
  push:
    branches: [main]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Mirror to Gitee
        uses: Yikun/hub-mirror-action@master
        with:
          src: github/用户名
          dst: gitee/用户名
          dst_key: ${{ secrets.GITEE_PRIVATE_KEY }}
          dst_token: ${{ secrets.GITEE_TOKEN }}
          static_list: "仓库名"
```

---

## 示例五：自动部署 Gitee Pages

```yaml
name: Deploy Gitee Pages

on:
  workflow_run:
    workflows: ["Deploy GitHub Page"]
    types:
      - completed

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_PRIVATE_KEY }}
        with:
          source-repo: git@github.com:用户名/仓库名.git
          destination-repo: git@gitee.com:用户名/仓库名.git

      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          gitee-username: 你的Gitee用户名
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          gitee-repo: 用户名/仓库名
          branch: gh-pages
```
