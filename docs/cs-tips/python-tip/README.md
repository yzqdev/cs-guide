# Python 开发技巧

<Catalog />

## 目录

| 文件 | 内容 |
|------|------|
| [Conda 教程](./conda-tutor.md) | Conda 环境管理、包管理、镜像配置 |
| [Pip 教程](./pip-tutor.md) | Pip 配置、国内镜像源、依赖管理 |
| [Pipenv 教程](./pipenv.md) | Pipenv 虚拟环境管理、Pipfile 配置 |
| [Python 安装](./python-install.md) | Python 多版本安装、环境变量配置 |

## 快速参考

```python
# 列表推导式
squares = [x**2 for x in range(10)]

# 字典合并
merged = {**dict1, **dict2}

# f-string
name = "Python"
print(f"Hello, {name}!")

# 类型提示
def greet(name: str) -> str:
    return f"Hello, {name}"

# 虚拟环境
# python -m venv .venv
# source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate     # Windows
```
