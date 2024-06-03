# pyenv多版本python管理

## 安装

https://github.com/pyenv-win/pyenv-win#installation
注意不要使用scoop安装

需要配置安装镜像

在windows的用户环境变量或系统环境变量中添加PYTHON_BUILD_MIRROR_URL变量，值为https://mirrors.huaweicloud.com/python/，也可以设置
其他的的源

配置完镜像需要先`pyenv update`更新下

然后`pyenv install -l | findstr 3.12`