# quasar教程

[解决 Quasar Create Project 卡死的问题](https://www.cnblogs.com/mouseleo/p/14591207.html)
现象：
执行 quasar create app
卡死在：
Quasar downloading quasar starter kit...
分析：
由于 github.com 访问太慢，导致卡死。
下载到本地，避免从 github.com 上拉取。
解决：
> windows上面

进入`c:\users\yanni\`目录然后`git clone https://github.com/quasarframework/quasar-starter-kit.git .quasar-starter-kits`

> linux上面

```bash
cd ~
git clone git@github.com:quasarframework/quasar-starter-kit.git
cd your-project-directory
quasar create <project> --kit ~/quasar-starter-kit
```
