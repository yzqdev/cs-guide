# 自动同步github代码到gitee

## 推荐方法

<https://github.com/marketplace/actions/hub-mirror-action>

下面是知乎的方法

> 来源 <https://zhuanlan.zhihu.com/p/353862378>

我的个人博客是通过Github的Pages技术搭建的静态博客，使用 `vuepress` 驱动。由于Github在国内环境访问速度慢，并且不够稳定，所以通常对外介绍使用Gitee的镜像博客仓库，但是每次都需要在推送Github之后去Gitee上对应的仓库进行手动同步，就无端增加了很多重复的工作量，经过多方搜索和实践，最终选定了Github一个比较新的技术 -- `Github Actions` **实现代码自动Build，同步到Gitee，自动在Gitee实现Pages功能**。

下面来看一下如何操作吧：

## 1.Github和Gitee添加公钥

## Window下通过git bash生成公钥

输入 `ssh-keygen` ，然后连按三下回车

![img](https://pic2.zhimg.com/v2-87941f9a981a98b493bcd4dd79cc3b25_r.jpg)

## Gitee 和 Github 添加公钥

![img](https://pic4.zhimg.com/v2-00317b83252027a36be6d6ec6f267193_r.jpg)

## 检测公钥是否成功添加

```text
ssh -T git@github.com
ssh -T git@gitee.com
#返回如下图所示结果，则成功添加公钥！
```

![img](https://pic4.zhimg.com/v2-9f38c06db2d467dbb590964e7a96660f_r.jpg)

## 2.Github仓库添加Token

## 1. 生成账号Token

![img](https://pic2.zhimg.com/v2-cc22ebd8fef6fa4c6d8ddee5bee35121_r.jpg)

## 2. 在Secret中添加Token

![img](https://pic3.zhimg.com/v2-a747fed0df42c3c49e561ccbd32e3186_r.jpg)

## 3.Github仓库添加私钥

## 1. 进入Github想要同步的仓库-选择Settings进行设置-选择Secret进行设置

![img](https://pic4.zhimg.com/v2-bcc8ca15bed8ab44d2a59d08934c7bbf_r.jpg)

## 2. 创建新的仓库Secret `GITEE_RSA_PRIVATE_KEY`

![img](https://pic3.zhimg.com/v2-4be95bbb474808761d322777b6e252aa_r.jpg)

## 3. 添加 `GITEE_PASSWORD`

同之前一样，在仓库里添加名为 `GITEE_PASSWORD` 的Secret，内容是你的Gitee账号密码。

最后检查一下是否在 `Github` 中添加了 `ACCESS_TOKEN` ，`GITEE_PASSWORD` ，`GITEE_RSA_PRIVATE_KEY` 三个密钥。如下图：

![img](https://pic2.zhimg.com/v2-dd1befa84a0dab95c1cd0e2ae544bdc5_r.jpg)

## 重头戏来了

在GitHub仓库里添加 Actions 脚本文件！！

![img](https://pic3.zhimg.com/v2-1a38e1b9c9889a5d7e3d33d02f0a8252_r.jpg)

\- 工作流脚本名字可以自定义，随意起！！ - 复制下面的自动打包及同步脚本 - 在之后每次**有 Push 请求**的时候，该脚本就会自动执行，完成**云端Build静态文件**，**部署到 gh_pages 分支**，然后将**代码同步到 Gitee 的镜像仓库**，并且**自动执行 Pages 的 Update 操作**！！！

## 自动打包及自动同步脚本

```text
name: A TO A:GH_PAGES
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        # 你要操作的目标仓库
        TARGET_REPO: china-fanxin/vuepress-blog
        # 构建结果存储的分支
        TARGET_BRANCH: gh_pages
        # 要使用的构建命令
        BUILD_SCRIPT: yarn && yarn build
        # 构建结果存储目录
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
        # 来源仓库
        source-repo: "git@github.com:china-fanxin/vuepress-blog.git"
        # 目标仓库
        destination-repo: "git@gitee.com:china-fanxin/vuepress-blog.git"
  reload-pages:
    needs: sync
    runs-on: ubuntu-latest
    steps:
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: china-fanxin
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: china-fanxin/vuepress-blog
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: gh_pages
```

## 功能实现效果

完成了上述配置后，就已经可以实现当有代码 Push 到 Github 后，自动将代码 Build 生成静态文件 Pages ，并且将代码同步到Gitee 上，并自动 Pages ！！ 如下的 Actions 执行的结果图！！

![img](https://pic4.zhimg.com/v2-cb0186d0db9b53e2e5e9befe45aa222f_r.jpg)

> 文档信息 版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证） 发表日期：2021-03-01 20:42:19 星期一
