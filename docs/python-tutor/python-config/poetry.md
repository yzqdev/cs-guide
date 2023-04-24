# poetry使用

## 安装poetry

```powershell
pip install poetry
```

## 使用命令

```powershell
poetry self update
# 查看所有配置
poetry config --list 
# 查看单个配置
poetry config virtualenvs.path 
# 更新配置
poetry config virtualenvs.in-project true 
# 重置配置
poetry config virtualenvs.path --unset 
# 添加poetry,会在项目目录生成一个pyproject.toml,他是一个非常重要的文件，包含了工程的配置和依赖库信息
poetry init 

# 将依赖包导出为 requirements.txt 格式，导出文件名为 requirements.txt 
poetry export -f requirements.txt --output requirements.txt 

```

## config.toml文件

poetry提供了全局config配置和特定项目的config配置。
windows下的全局config配置文件：`%userprofile%/poetry/config.yoml`

### 指定pip源

```
[[tool.poetry.source]]
name = "custom"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
```

### add命令

```powershell
poetry add requests  # ==> pip install requests 
poetry add requests@^2.20.0 # 安装大于2.20.0版本的包 
poetry add "requests=2.20.0" # ==> pip install requests==2.20.0 
poetry add "uvicorn[standard]" # ==> pip install uvicorn[standard] 
 
# 从 git 仓库安装 
poetry add git+https://github.com/sdispater/pendulum.git 
poetry add git+ssh://git@github.com/sdispater/pendulum.git 
poetry add git+https://github.com/sdispater/pendulum.git#develop 
poetry add git+https://github.com/sdispater/pendulum.git#2.0.5 
 
# 从本地文件安装 
poetry add ./my-package/ 
poetry add ../my-package/dist/my-package-0.1.0.tar.gz 
poetry add ../my-package/dist/my_package-0.1.0.whl 
```

### run命令

这个命令也是一个比较重要的命令，可以让我们不进入虚拟环境就执行虚拟环境内的命令

```
# 查询虚拟环境内的 Python 版本 
poetry run python -V 
 
# 执行虚拟环境内的脚本 
poetry run python test.py 
```

### env命令

```
# 使用指定环境的python 
poetry env use /full/path/to/python 
 
# 如果python在环境变量中，可以使用一下方式指定 
poetry env use python3.7 
 
# 显示当前虚拟环境信息 
poetry env info 
 
# 仅显示虚拟环境的路径 
poetry env info --path 
 
# 显示当前工程的所有虚拟环境列表 
poetry env list 
 
# 显示当前工程的虚拟环境绝对路径 
poetry env list --full-path 
 
# 删除虚拟环境 
poetry env remove /full/path/to/python 
poetry env remove python3.7 

```

cache-dir
Type: string

缓存目录配置，使用 poetry 安装的包源文件都会缓存到这个目录。以下是系统默认目录：

```
macOS: ~/Library/Caches/pypoetry
Windows: C:\Users\AppData\Local\pypoetry\Cache
Unix: ~/.cache/pypoetry
```

virtualenvs.path
Type: string

默认是{cache-dir}/virtualenvs，虚拟环境创建的目录，如果上面的 in-project 为 true，此配置就无效
