## pathlib用法
## os替代品pathlib

 | [`os`](https://docs.python.org/3/library/os.html#module-os) and [`os.path`](https://docs.python.org/3/library/os.path.html#module-os.path) | [`pathlib`](https://docs.python.org/3/library/pathlib.html#module-pathlib) |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`os.path.abspath()`](https://docs.python.org/3/library/os.path.html#os.path.abspath) | [`Path.absolute()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.absolute) [1](https://docs.python.org/3/library/pathlib.html#id5) |
| [`os.path.realpath()`](https://docs.python.org/3/library/os.path.html#os.path.realpath) | [`Path.resolve()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.resolve) |
| [`os.chmod()`](https://docs.python.org/3/library/os.html#os.chmod) | [`Path.chmod()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.chmod) |
| [`os.mkdir()`](https://docs.python.org/3/library/os.html#os.mkdir) | [`Path.mkdir()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.mkdir) |
| [`os.makedirs()`](https://docs.python.org/3/library/os.html#os.makedirs) | [`Path.mkdir()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.mkdir) |
| [`os.rename()`](https://docs.python.org/3/library/os.html#os.rename) | [`Path.rename()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.rename) |
| [`os.replace()`](https://docs.python.org/3/library/os.html#os.replace) | [`Path.replace()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.replace) |
| [`os.rmdir()`](https://docs.python.org/3/library/os.html#os.rmdir) | [`Path.rmdir()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.rmdir) |
| [`os.remove()`](https://docs.python.org/3/library/os.html#os.remove), [`os.unlink()`](https://docs.python.org/3/library/os.html#os.unlink) | [`Path.unlink()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.unlink) |
| [`os.getcwd()`](https://docs.python.org/3/library/os.html#os.getcwd) | [`Path.cwd()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.cwd) |
| [`os.path.exists()`](https://docs.python.org/3/library/os.path.html#os.path.exists) | [`Path.exists()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.exists) |
| [`os.path.expanduser()`](https://docs.python.org/3/library/os.path.html#os.path.expanduser) | [`Path.expanduser()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.expanduser) and [`Path.home()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.home) |
| [`os.listdir()`](https://docs.python.org/3/library/os.html#os.listdir) | [`Path.iterdir()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.iterdir) |
| [`os.path.isdir()`](https://docs.python.org/3/library/os.path.html#os.path.isdir) | [`Path.is_dir()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.is_dir) |
| [`os.path.isfile()`](https://docs.python.org/3/library/os.path.html#os.path.isfile) | [`Path.is_file()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.is_file) |
| [`os.path.islink()`](https://docs.python.org/3/library/os.path.html#os.path.islink) | [`Path.is_symlink()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.is_symlink) |
| [`os.link()`](https://docs.python.org/3/library/os.html#os.link) | [`Path.hardlink_to()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.hardlink_to) |
| [`os.symlink()`](https://docs.python.org/3/library/os.html#os.symlink) | [`Path.symlink_to()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.symlink_to) |
| [`os.readlink()`](https://docs.python.org/3/library/os.html#os.readlink) | [`Path.readlink()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.readlink) |
| [`os.path.relpath()`](https://docs.python.org/3/library/os.path.html#os.path.relpath) | [`PurePath.relative_to()`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.relative_to) [2](https://docs.python.org/3/library/pathlib.html#id6) |
| [`os.stat()`](https://docs.python.org/3/library/os.html#os.stat) | [`Path.stat()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.stat), [`Path.owner()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.owner), [`Path.group()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.group) |
| [`os.path.isabs()`](https://docs.python.org/3/library/os.path.html#os.path.isabs) | [`PurePath.is_absolute()`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.is_absolute) |
| [`os.path.join()`](https://docs.python.org/3/library/os.path.html#os.path.join) | [`PurePath.joinpath()`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.joinpath) |
| [`os.path.basename()`](https://docs.python.org/3/library/os.path.html#os.path.basename) | [`PurePath.name`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.name) |
| [`os.path.dirname()`](https://docs.python.org/3/library/os.path.html#os.path.dirname) | [`PurePath.parent`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.parent) |
| [`os.path.samefile()`](https://docs.python.org/3/library/os.path.html#os.path.samefile) | [`Path.samefile()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.samefile) |
| [`os.path.splitext()`](https://docs.python.org/3/library/os.path.html#os.path.splitext) | [`PurePath.stem`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.stem) and [`PurePath.suffix`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.suffix) |