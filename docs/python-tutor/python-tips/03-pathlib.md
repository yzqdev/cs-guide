---
order: 3
---

# pathlib 用法

> `pathlib` 是 Python 3.4+ 引入的面向对象文件路径库，推荐替代 `os.path`。

## os.path 替代对照表

Python 官方推荐使用 `pathlib` 替代 `os.path`，以下是完整的对照关系：

| `os` / `os.path` | `pathlib` |
|:-----------------------------------------------------------|:-----------------------------------------------------------|
| `os.path.abspath()` | `Path.absolute()` |
| `os.path.realpath()` | `Path.resolve()` |
| `os.chmod()` | `Path.chmod()` |
| `os.mkdir()` | `Path.mkdir()` |
| `os.makedirs()` | `Path.mkdir(parents=True)` |
| `os.rename()` | `Path.rename()` |
| `os.replace()` | `Path.replace()` |
| `os.rmdir()` | `Path.rmdir()` |
| `os.remove()`, `os.unlink()` | `Path.unlink()` |
| `os.getcwd()` | `Path.cwd()` |
| `os.path.exists()` | `Path.exists()` |
| `os.path.expanduser()` | `Path.expanduser()`, `Path.home()` |
| `os.listdir()` | `Path.iterdir()` |
| `os.path.isdir()` | `Path.is_dir()` |
| `os.path.isfile()` | `Path.is_file()` |
| `os.path.islink()` | `Path.is_symlink()` |
| `os.link()` | `Path.hardlink_to()` |
| `os.symlink()` | `Path.symlink_to()` |
| `os.readlink()` | `Path.readlink()` |
| `os.path.relpath()` | `PurePath.relative_to()` |
| `os.stat()` | `Path.stat()`, `Path.owner()`, `Path.group()` |
| `os.path.isabs()` | `PurePath.is_absolute()` |
| `os.path.join()` | `PurePath.joinpath()` |
| `os.path.basename()` | `PurePath.name` |
| `os.path.dirname()` | `PurePath.parent` |
| `os.path.samefile()` | `Path.samefile()` |
| `os.path.splitext()` | `PurePath.stem` and `PurePath.suffix` |

## 常用示例

```python
from pathlib import Path

# 当前目录
p = Path.cwd()                     # /home/user/project

# 路径拼接（自动处理分隔符）
config = p / "config" / "settings.json"
# Windows:  C:\Users\user\project\config\settings.json

# 读取文件
content = config.read_text()        # 相当于 open().read()
config.read_bytes()                 # 二进制读取

# 写入文件
config.write_text('{"key": "val"}') # 相当于 open().write()

# 遍历目录
for child in p.iterdir():
    print(child.name)               # 只输出文件名

# 递归查找
for py in p.rglob("*.py"):
    print(py)

# 路径组件
print(config.name)       # settings.json
print(config.stem)       # settings
print(config.suffix)     # .json
print(config.parent)     # /home/user/project/config
print(config.parents)    # 所有父级目录的列表

# 创建目录
Path("new_dir").mkdir(parents=True, exist_ok=True)

# 检查
Path("file.txt").exists()
Path("file.txt").is_file()
Path("dir").is_dir()
```
