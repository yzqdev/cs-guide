# git单个仓库添加token

## token认证提交代码演示说明

> github在2020年8月13日更新以后，停止了对https用户名及密码的支持，可以添加token认证。

### 生成token

在github右上角头像单击

> settings->developer settings ->personal access tokens-generate new token

记住token值。因为只会显示一次。

### 使用token的方法一

git url上添加token
 `git remote -v`查看remote分支，显示如下

将remote分支url改成
 `https://【用户名username】:token值@github.com/<yourname>/Demo.git`
 比如

> <https://hao203:ghp_EMi7kzbp11111111111@github.com/hao203/Demo.git>
> 可以通过对远程仓库重新设置

```git
git remote rm origin
git remote add origin https://hao203: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@github.com/hao203/Demo.git
```

或者直接改，不删原先的origin（**推荐该法**）

```cpp
git remote set-url origin https://hao203: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@github.com/hao203/Demo.git
```

然后就ok了

### 使用token方法二

其实虽然密码不能用，但用户名和token（把token作为密码）的组合是可以使用进行认证并提交的。

当你使用一次，

![img](https://upload-images.jianshu.io/upload_images/943143-4ff2a62c6f0c8a7f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1072/format/webp)

可以用一个credential.helper cache方法，将其保存下来
 `git config --global credential.helper cache`
 下次就不会再让你输账户和密码提交了。
 想要解除这个认证
 `git config --global --unset credential.helper`
