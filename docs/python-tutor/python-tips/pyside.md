# PySide 使用

> PySide6 是 Qt 6 的官方 Python 绑定，用于开发跨平台 GUI 应用程序。

## 安装

```bash
pip install pyside6
```

## 打包需求

PySide6 程序打包成 exe 时需要 GCC 运行时支持，推荐使用 MinGW 编译的 Python 或使用 Nuitka 打包。

- MinGW 下载：[winlibs_mingw](https://github.com/brechtsanders/winlibs_mingw)

## Hello World 示例

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton

app = QApplication(sys.argv)
window = QMainWindow()
button = QPushButton("Hello, PySide6!")
window.setCentralWidget(button)
window.show()
sys.exit(app.exec())
```

## 打包工具

| 工具 | 说明 |
|------|------|
| **PyInstaller** | 最常用，但打包体积较大 |
| **Nuitka** | 编译为 C 代码，体积小、性能好 |
| **cx_Freeze** | 另一个打包方案 |

## 官方资源

- [PySide6 官方文档](https://doc.qt.io/qtforpython/)
- [Qt 官方文档](https://doc.qt.io/)
