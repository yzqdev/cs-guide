# 技巧

## 安装版本vscode和portablevscode会在任务栏重叠,怎么办


1. Open directory {vscode_installation_dir}**/resources/app**
2. Edit the file **product.json** with a text editor (VSCode/Notepad.exe/Notepad++ or whatever)
3. Locate the key **win32AppUserModelId**
4. Change its value to what you want it to be, and save the file:
```
"win32AppUserModelId": "Microsoft.VisualStudioCode.ForJupyter"
```

就行了

## vscode运行python出现错误`ModuleNotFoundError: No module named 'crawel'`


1. Press **Ctrl + Shift + P** to open Command Palette
2. Go to **Users.setting.json**
3. Add the following line

`"terminal.integrated.env.windows": { "PYTHONPATH": "${workspaceFolder}" }`