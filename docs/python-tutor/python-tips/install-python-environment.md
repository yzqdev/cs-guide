# python环境准备

## 安装python

在[python.org](https://www.python.org/)下载python安装包并安装,注意要把环境变量选中,这样系统就有python命令

## pip创建项目venv方法

<https://docs.python.org/zh-cn/3/library/venv.html>

```txt
cd e:/py-proj

mkdir spider_projs
#进入这个目录
cd spider_projs
# 然后创建虚拟环境,目录是.venv
python -m venv .venv
#然后激活环境,这一步很重要,它是把.venv中的path加入到环境变量去

```

激活命令如下:

| 平台       | Shell                                   | 用于激活虚拟环境的命令               |
| ---------- | --------------------------------------- | ------------------------------------ |
| POSIX      | bash/zsh                                | `$ source *<venv>*/bin/activate`     |
| fish       | `$ source *<venv>*/bin/activate.fish`   |                                      |
| csh/tcsh   | `$ source *<venv>*/bin/activate.csh`    |                                      |
| PowerShell | `$ *<venv>*/bin/Activate.ps1`           |                                      |
| Windows    | cmd.exe                                 | `C:\> *<venv>*\Scripts\activate.bat` |
| PowerShell | `PS C:\> *<venv>*\Scripts\Activate.ps1` |                                      |

:::tip
必须在环境激活的情况下安装依赖`pip install requests`,没激活的话会安装在python的全局`site-packages`目录!!!

```txt
#生成依赖
pip freeze > requirements.txt

# 安装依赖

pip install -r requirements.txt

```

:::

## 安装 pipx

pipx可以吧全局安装的cli工具存在用户目录,做到环境隔离

通常来说安装全局命令行工具可以用`pip install httpie`这种方法,但是pip既可以安装cli也可以安装依赖,这样容易混淆

### pipx安装本地的cli项目

<https://github.com/pypa/pipx/issues/6>

## 安装poetry

```bash
pipx install poetry
```

poetry**不**会使用用户定义的pip.ini里面的镜像,所以要设置url

```toml
[[tool.poetry.source]]

name = "tsinghua"

url = "https://pypi.tuna.tsinghua.edu.cn/simple"

priority = "default"
```

配置环境变量
<https://python-poetry.org/docs/configuration/>

配置在项目目录生成.venv文件夹:
`poetry config virtualenvs.in-project true`,或者设置环境变量`POETRY_VIRTUALENVS_IN_PROJECT`为true  (用户环境变量重启后生效)

配置环境名称`poetry config virtualenvs.prompt "{project_name}"`

poetry缓存路径`C:\Users\{username}\AppData\Local\pypoetry`

## 安装pipenv

```shell
pipx install pipenv

pip install pipenv
```

export PIPENV_VENV_IN_PROJECT=1 设置这个环境变量，pipenv会在当前目录下创建.venv的目录，以后都会把模块装到这个.venv下

pipenv 缓存路径`C:\Users\{username}\AppData\Local\pipenv`
