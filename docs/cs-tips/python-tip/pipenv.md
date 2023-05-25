# pipenv使用

## 安装

安装python
[安装包](https://registry.npmmirror.com/binary.html?path=python/)  
windows安装后会自动吧pip和python加入到环境变量

## 安装pipenv

```shell
pip install pipenv 

```

## 使用pipenv

```
添加镜像

「清华源」："https://pypi.tuna.tsinghua.edu.cn/simple/"
「阿里源」："http://mirrors.aliyun.com/pypi/simple/"
「豆瓣源」："http://pypi.douban.com/simple"
华为也有镜像源 [华为](https://mirrors.huaweicloud.com/home)


配置镜像
export PIPENV_DEFAULT_PYTHON_VERSION=3.7 
export PIPENV_PYPI_MIRROR=https://pypi.tuna.tsinghua.edu.cn/simple
```

```toml
[[source]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
verify_ssl = true
name = "pypi"
```

配置在:Windows路径为：`C:\Users\<UserName>\pip\pip.ini`

```toml
[global]
index-url = https://repo.huaweicloud.com/repository/pypi/simple
trusted-host = repo.huaweicloud.com
timeout = 120
```

默认安装的虚拟环境都在c盘`%userprofile%的.virtualenvs`文件夹下面,如果想更换,可以添加`PIPENV_VENV_IN_PROJECT`环境变量,并设置值为`1`,就是在项目下面创建虚拟环境

```shell
# 创建一个env环境
pipenv install
# 删除env
pipenv --rm
# 安装一个依赖
pipenv install httpx
# 导出requirements
pipenv lock -r > requirements.txt
# 安装包
pipenv install -r requirements.txt
# 检查包
pipenv run pip list
# 删除所有
pipenv uninstall --all

```

:::tip
如何运行呢?
需要在命令行加上一句`pipenv shell;$env:PYTHONPATH="E:\PycharmProjects\douyin-spider";激活当前的pipenv并`把`PYTHONPATH`改为当前路径,才能让python知道自己当前目录是一个包,不然自己写的包没办法引进去,会报错`ModuleNotFoundError: No module named 'util'`
:::

:::tip
命令

```shell
pipenv [OPTIONS] COMMAND [ARGS]...

OPTIONS:
--where          显示项目文件所在路径
--venv           显示虚拟环境实际文件所在路径
--py             显示虚拟环境 Python 解释器所在路径
--envs           显示虚拟环境的选项变量
--rm             删除虚拟环境
--bare           最小化输出
--completion     完整输出
--man            显示帮助页面
--three / two    使用 Python 3 / 2 创建虚拟环境（注意须是本机已安装的 Python 版本）
--python TEXT    指定某个 Python 版本作为虚拟环境的安装源
--site-packages  附带安装原 Python 解释器中的第三方库
--jumbotron      复活节彩蛋
--version        版本信息
--h / help       帮助信息

COMMANDS：
check            检查安全漏洞
graph            显示当前依赖关系图信息
install          安装虚拟环境或者第三方库
lock             锁定并生成 Pipfile.lock 文件
open             在编辑其中查看一个库
run              在虚拟环境中运行命令
shell            进入虚拟环境
uninstall        卸载一个库
update           写在当前所有的库，并安装它们的最新版本

```
