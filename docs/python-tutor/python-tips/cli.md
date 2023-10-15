# python 命令行编写


# 命令行

打包命令 https://packaging.python.org/en/latest/tutorials/installing-packages/#installing-from-a-local-src-tree
 
https://pip.pypa.io/en/stable/reference/build-system/pyproject-toml/
 
## click

  

使用多个命令

https://zhuanlan.zhihu.com/p/444506577

## 本地执行

其中py是alias

```powershell

function runPython {

   # param (

    #    [string] $file

   # )

    $env:PYTHONPATH=pwd

   # Write-Host $args -BackgroundColor Cyan

     & "$pwd\.venv\Scripts\python.exe"  $args

}

```

```shell

 py .\pytool\hello.py --count 3

```

我们横向对比下argparse、docopt、click 和 fire 库的各项功能和特点

  

```python

from setuptools import setup

setup(

    name='py_tool',

    version='0.0.2',

    packages=[''],

    url='',

    license='MIT',

    author='yzqdev',

    author_email='',

    description='',

    install_requires=['click'],

    entry_points={

        'console_scripts': [

            'say = hello:main',

        ]

    }

)

```

  

- install_requires 是安装的与依赖

- entry_points  console_scripts指的是命令行工具 say是生成的exe名字,hello是模块名称,main是方法名称

  

## 安装到scripts目录(安装到python安装目录的lib下)

```shell

python setup.py install

```

  

或者

```shell

pip install -e .

```

  

不是用setup.py


## 使用pyproject.toml

  

```toml

[build-system]

requires = ["setuptools", "setuptools-scm"]

build-backend = "setuptools.build_meta"

  

[project]

name = "my_package"

authors = [

    {name = "Josiah Carberry", email = "josiah_carberry@brown.edu"},

]

description = "My package description"

readme = "README.rst"

requires-python = ">=3.7"

  

keywords = ["one", "two"]

license = {text = "BSD-3-Clause"}

classifiers = [

    "Framework :: Django",

    "Programming Language :: Python :: 3",

]

dependencies = [

    "requests",

    'importlib-metadata; python_version<"3.8"',

]

dynamic = ["version"]

  

[project.optional-dependencies]

pdf = ["ReportLab>=1.2", "RXP"]

rest = ["docutils>=0.3", "pack ==1.1, ==1.3"]

  

[project.scripts]

my-script = "my_package.module:function"

```

  

https://setuptools.pypa.io/en/latest/userguide/pyproject_config.html


## 使用pipx安装本地poetry包

poetry的pyproject.toml添加脚本
```toml
```python
[tool.poetry.scripts]
my-script = "my_package.log_revision:start"
```
 项目目录如下
 
```python
my_package
├── my_package
│   ├── __init__.py
│   └── log_revision.py
└── pyproject.toml
```
然后
```
poetry install

poetry run my-script

想要安装到本地可执行文件

pipx install .

更新代码之后重新部署
pipx install . --force
或者 
pipx upgrade my_package
 


然后可执行文件就是 my-script

卸载
pipx uninstall my_package

想要打包发布

poetry build

poetry publish
```

安装本地cli

[https://github.com/pypa/pipx/issues/216](https://github.com/pypa/pipx/issues/216)


如果找不到setuptools

就需要
```
poetry add setuptools
```