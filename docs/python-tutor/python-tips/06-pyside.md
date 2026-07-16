---
order: 6
---

# PySide6 GUI 开发

> PySide6 是 Qt 6 的官方 Python 绑定，用于开发跨平台 GUI 应用程序。

## 安装

```bash
pip install pyside6
```

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

## 常用组件

```python
from PySide6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout,
    QLabel, QLineEdit, QPushButton, QTextEdit,
    QTableWidget, QTreeWidget, QComboBox,
    QMessageBox, QFileDialog, QProgressBar
)
from PySide6.QtCore import Qt, QTimer, QThread, Signal
from PySide6.QtGui import QPixmap, QFont, QIcon, QAction
```

## 信号与槽

```python
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        button = QPushButton("点击我")
        button.clicked.connect(self.on_button_clicked)
        self.setCentralWidget(button)

    def on_button_clicked(self):
        print("按钮被点击了！")
```

## 布局管理

```python
from PySide6.QtWidgets import (QApplication, QWidget, QVBoxLayout,
                               QHBoxLayout, QLabel, QLineEdit, QPushButton)

class LoginForm(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()

        # 用户名
        username_layout = QHBoxLayout()
        username_layout.addWidget(QLabel("用户名:"))
        username_layout.addWidget(QLineEdit())
        layout.addLayout(username_layout)

        # 密码
        password_layout = QHBoxLayout()
        password_layout.addWidget(QLabel("密码:"))
        password_layout.addWidget(QLineEdit())
        password_layout.setEchoMode(QLineEdit.EchoMode.Password)
        layout.addLayout(password_layout)

        # 登录按钮
        layout.addWidget(QPushButton("登录"))

        self.setLayout(layout)
```

## 打包需求

PySide6 程序打包成 exe 时需要 GCC 运行时支持：

| 工具 | 说明 | 特点 |
|------|------|------|
| **PyInstaller** | 最常用 | 打包体积较大，但简单易用 |
| **Nuitka** | 编译为 C 代码 | 体积小、性能好、启动快 |
| **cx_Freeze** | 另一个打包方案 | 配置较复杂 |

### PyInstaller 打包

```bash
pip install pyinstaller
pyinstaller --windowed --onefile myapp.py
```

### MinGW 下载

如需 MinGW 编译环境：[winlibs_mingw](https://github.com/brechtsanders/winlibs_mingw)

## 官方资源

- [PySide6 官方文档](https://doc.qt.io/qtforpython/)
- [Qt 官方文档](https://doc.qt.io/)
- [Qt 示例代码](https://doc.qt.io/qtforpython/examples/)