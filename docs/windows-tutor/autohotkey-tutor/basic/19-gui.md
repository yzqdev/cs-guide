---
order: 19
---

# 19 - GUI 图形界面

## 创建基本窗口

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 创建 Gui 对象
myGui := Gui()

; 设置窗口标题
myGui.Title := "我的第一个 GUI"

; 显示窗口
myGui.Show()
```

## 添加控件

### 文本控件

```ahk
myGui := Gui()
myGui.Title := "控件演示"

; 添加文本
myGui.Add("Text",, "这是一段文字")                   ; 简单文字
myGui.Add("Text", "w300", "宽度300的文字")             ; 设置宽度
myGui.Add("Text", "cRed Bold", "红色加粗文字")         ; 设置样式

myGui.Show()
```

### 输入控件

```ahk
myGui := Gui()
myGui.Title := "输入控件"

; Edit — 文本输入框
myGui.Add("Text",, "姓名:")
edtName := myGui.Add("Edit", "w200")                  ; 输入框宽度200

myGui.Add("Text",, "年龄:")
edtAge := myGui.Add("Edit", "w200 Number")            ; Number=只接受数字

myGui.Add("Text",, "备注:")
edtNote := myGui.Add("Edit", "w200 h100 Multi")       ; Multi=多行输入

myGui.Show()
```

### 按钮

```ahk
myGui := Gui()
myGui.Title := "按钮演示"

btnOk := myGui.Add("Button", "w100", "确定")
btnCancel := myGui.Add("Button", "w100 ys", "取消")    ; ys=与上一控件同行

; 绑定按钮事件
btnOk.OnEvent("Click", OnOk)
btnCancel.OnEvent("Click", OnCancel)

OnOk(*) {
    MsgBox "点击了确定"
}

OnCancel(*) {
    MsgBox "点击了取消"
}

myGui.Show()
```

### 下拉框

```ahk
myGui := Gui()
myGui.Title := "下拉框"

ddl := myGui.Add("DropDownList", "w200", ["选项1", "选项2", "选项3"])
ddl.Choose(1)    ; 默认选中第1项

; 绑定选择变化事件
ddl.OnEvent("Change", OnSelect)

OnSelect(ctrl, *) {
    MsgBox "选择了: " ctrl.Text
}

myGui.Show()
```

### 列表框

```ahk
myGui.Add("ListBox", "w200 h150", ["项目1", "项目2", "项目3", "项目4"])
```

### 复选框

```ahk
myGui := Gui()
chkAuto := myGui.Add("CheckBox",, "自动保存")
chkVerbose := myGui.Add("CheckBox",, "详细模式")

; 检查状态
btnCheck := myGui.Add("Button",, "检查状态")
btnCheck.OnEvent("Click", CheckState)

CheckState(*) {
    MsgBox "自动保存: " (chkAuto.Value ? "是" : "否")
    MsgBox "详细模式: " (chkVerbose.Value ? "是" : "否")
}

myGui.Show()
```

### Radio 按钮

```ahk
myGui := Gui()
myGui.Add("Radio", "vOpt1", "选项A")
myGui.Add("Radio", "vOpt2", "选项B")
myGui.Add("Radio", "vOpt3", "选项C")
```

### 进度条

```ahk
myGui := Gui()
progress := myGui.Add("Progress", "w300 h20", 50)   ; 50%
myGui.Show()

; 更新进度
progress.Value := 75   ; 设为75%
```

### Slider

```ahk
myGui := Gui()
slider := myGui.Add("Slider", "w300", 50)             ; 范围默认0-100
slider.OnEvent("Change", OnSlider)

OnSlider(ctrl, *) {
    ToolTip "值: " ctrl.Value
    SetTimer () => ToolTip(), -1000
}

myGui.Show()
```

## 事件绑定

### Gui 事件

```ahk
myGui := Gui()
myGui.Title := "事件演示"

; 关闭事件
myGui.OnEvent("Close", OnClose)
; 最小化事件
myGui.OnEvent("Escape", OnEscape)      ; Esc键按下
; 大小变化事件
myGui.OnEvent("Size", OnSize)

OnClose(*) {
    MsgBox "窗口关闭"
}

OnEscape(*) {
    MsgBox "按下Esc"
}

OnSize(gui, minMax, width, height) {
    ; minMax: -1=最小化, 0=还原, 1=最大化
    ToolTip "窗口大小: " width "x" height
    SetTimer () => ToolTip(), -2000
}

myGui.Show()
```

### 控件事件

```ahk
; Button — OnEvent("Click", handler)
btn.OnEvent("Click", OnClick)

; Edit — OnEvent("Change", handler)
edt.OnEvent("Change", OnChange)

; DropDownList / ComboBox — OnEvent("Change", handler)
ddl.OnEvent("Change", OnChange)

; CheckBox / Radio — OnEvent("Click", handler)
chk.OnEvent("Click", OnCheck)

; ListBox — OnEvent("Change", handler)
lb.OnEvent("Change", OnChange)

; Slider — OnEvent("Change", handler)
slider.OnEvent("Change", OnSliderChange)
```

## 读取控件值

```ahk
myGui := Gui()
myGui.Title := "读取控件"

edtName := myGui.Add("Edit", "w200")
chkAuto := myGui.Add("CheckBox",, "自动保存")
ddlSize := myGui.Add("DropDownList", "w200", ["小", "中", "大"])

btnSubmit := myGui.Add("Button", "w200", "提交")
btnSubmit.OnEvent("Click", Submit)

Submit(*) {
    MsgBox "姓名: " edtName.Value
    MsgBox "自动保存: " (chkAuto.Value ? "是" : "否")
    MsgBox "大小: " ddlSize.Text
}

myGui.Show()
```

## 布局选项

控件 Add 方法的第二个参数是选项字符串：

```ahk
; 尺寸
"w200"           ; 宽度200
"h100"           ; 高度100
"w300 h200"      ; 宽300 高200

; 位置
"x10 y20"        ; 指定位置
"xp+10 yp+5"    ; 相对上一个控件偏移

; 对齐
"xs"             ; 与上一个行起始对齐（同行）
"ys"             ; 与上一个控件同行（列对齐）
"x+m"            ; 右边间距
"y+m"            ; 下边间距

; 样式
"Center"         ; 文字居中
"Bold"           ; 加粗
"Italic"         ; 斜体
"cRed"           ; 红色文字
"BackgroundWhite"; 白色背景

; 行为
"Number"         ; Edit只接受数字
"Multi"          ; Edit多行
"Password"       ; Edit密码模式
"ReadOnly"       ; Edit只读
"Disabled"       ; 禁用控件
"Hidden"         ; 隐藏控件
```

## 完整 GUI 示例

### 登录窗口

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 创建登录 GUI
loginGui := Gui()
loginGui.Title := "登录"
loginGui.SetFont("s10", "Segoe UI")

loginGui.Add("Text", "w200", "用户名:")
edtUser := loginGui.Add("Edit", "w200")

loginGui.Add("Text", "w200", "密码:")
edtPass := loginGui.Add("Edit", "w200 Password")

btnLogin := loginGui.Add("Button", "w95", "登录")
btnCancel := loginGui.Add("Button", "w95 ys", "取消")

btnLogin.OnEvent("Click", DoLogin)
btnCancel.OnEvent("Click", (*) => loginGui.Hide())
loginGui.OnEvent("Close", (*) => loginGui.Hide())
loginGui.OnEvent("Escape", (*) => loginGui.Hide())

DoLogin(*) {
    user := edtUser.Value
    pass := edtPass.Value
    if (user = "" || pass = "") {
        MsgBox "请填写用户名和密码", "错误", 48
        return
    }
    MsgBox "登录成功！用户: " user, "成功", 64
    loginGui.Hide()
}

loginGui.Show()
```

### 设置窗口

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

settingsGui := Gui()
settingsGui.Title := "设置"
settingsGui.SetFont("s9", "Segoe UI")

; Tab 控件 — 分页设置
tab := settingsGui.Add("Tab3", "w400 h300", ["通用", "外观", "高级"])

; 通用页
settingsGui.Add("CheckBox",, "自动保存").OnEvent("Click", (*) => MsgBox("自动保存已切换"))
settingsGui.Add("CheckBox",, "显示状态栏")
settingsGui.Add("DropDownList", "w200", ["5分钟", "10分钟", "30分钟"])

; 外观页（在Tab切换时添加更复杂的控件）
settingsGui.Add("Text",, "字体大小:")
settingsGui.Add("Slider", "w200", 12)

; 高级页
settingsGui.Add("CheckBox",, "调试模式")
settingsGui.Add("CheckBox",, "性能监控")

; 底部按钮
settingsGui.Add("Button", "w95 y+m", "保存")
settingsGui.Add("Button", "w95 ys", "取消")

settingsGui.Show()
```

### 提示浮窗

```ahk
; 创建一个小型提示浮窗
tipGui := Gui("AlwaysOnTop -Caption Border")
tipGui.BackColor := 0xFFFFFF
tipGui.Add("Text", "w200 Center", "操作完成!")
tipGui.Show("NA x100 y100")

; 3秒后关闭
SetTimer () => tipGui.Destroy(), -3000
```

---

**下一步**: [20-DLL调用与COM](20-dll-and-com.md)
