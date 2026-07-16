# PowerShell 终端美化

> 通过 oh-my-posh、Starship、Terminal-Icons 等工具美化 PowerShell 终端。

## 改造思路

默认的 PowerShell 并不美观。改造方法是在 PowerShell 中添加主题引擎，配合 Terminal 配置字体和颜色。

## 基础美化

### 安装 Terminal-Icons

文件图标支持：

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery
```

然后在 `$profile` 加入：

```powershell
Import-Module -Name Terminal-Icons
```

GitHub：<https://github.com/devblackops/Terminal-Icons>

### 安装 PSReadLine

命令行编辑增强：

```powershell
Install-Module -Name PowerShellGet -Force
```

### 安装 posh-git

Git 状态提示：

```powershell
PowerShellGet\Install-Module posh-git -Scope CurrentUser -Force
```

## Starship（推荐）

Starship 是一个轻量、快速的终端提示工具，支持多种 Shell。

### 安装

```powershell
scoop install starship
```

或在 Windows 直接下载安装包：<https://starship.rs/>

### Starship 配置

```toml
# ~/.config/starship.toml
scan_timeout = 10
command_timeout = 3000

[directory]
truncation_length = 8
truncate_to_repo = false

[package]
disabled = true

[time]
disabled = true

[git_branch]
disabled = false

[git_status]
disabled = false

[dotnet]
format = "[$symbol(🎯 $tfm )]($style)"

[nodejs]
format = "via [$symbol]($style)"

[python]
format = "via [$symbol]($style)"

[rust]
format = "via [$symbol]($style)"
```

## oh-my-posh（不推荐，较卡）

### Windows 安装

从 Microsoft Store 安装 oh-my-posh，或从 GitHub Releases 下载 `install-amd64.exe`：
<https://github.com/JanDeDobbeleer/oh-my-posh/releases>

在 `$profile` 添加：

```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\negligible.omp.json" | Invoke-Expression
```

### 解决执行策略限制

如果提示禁止执行脚本，用管理员 PowerShell 执行：

```powershell
Set-ExecutionPolicy RemoteSigned
```

### 安装 Nerd Fonts

如果 PowerShell 出现乱码，需要安装 Nerd Fonts 字体（如 Meslo LG M Regular Nerd Font），并在终端设置中启用。

### 喜欢的 oh-my-posh 主题

`negligible`、`pure`、`ys`、`paradox`、`powerlevel10k_classic`、`powerlevel10k_lean`

### 修改后的 negligible 主题

```json
{
  "$schema": "https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/schema.json",
  "blocks": [
    {
      "alignment": "left",
      "segments": [
        {
          "foreground": "cyan",
          "style": "powerline",
          "template": "{{ if .WSL }}WSL at {{ end }}{{.Icon}}",
          "type": "os"
        },
        {
          "foreground": "cyan",
          "properties": { "style": "full" },
          "style": "plain",
          "template": " {{ .Path }} ",
          "type": "path"
        },
        {
          "foreground": "#F1502F",
          "properties": { "fetch_status": true },
          "style": "plain",
          "template": ":: {{ .HEAD }}{{ .BranchStatus }}{{ if .Staging.Changed }} \uf046 {{ .Staging.String }}{{ end }}{{ if and (.Working.Changed) (.Staging.Changed) }} |{{ end }}{{ if .Working.Changed }} \uf044 {{ .Working.String }}{{ end }} ",
          "type": "git"
        }
      ],
      "type": "prompt"
    },
    {
      "alignment": "right",
      "segments": [
        { "foreground": "red", "style": "plain", "template": "| root ", "type": "root" },
        { "foreground": "#06A4CE", "style": "powerline", "template": "| \ue798 {{ if .Error }}{{ .Error }}{{ else }}{{ .Full }}{{ end }} ", "type": "dart" },
        { "foreground": "#6CA35E", "style": "powerline", "template": "| \ue718 {{ if .PackageManagerIcon }}{{ .PackageManagerIcon }} {{ end }}{{ .Full }} ", "type": "node" },
        { "foreground": "#4584b6", "properties": { "display_mode": "context", "fetch_virtual_env": true }, "style": "plain", "template": "| \ue235 {{ .Venv }} ", "type": "python" },
        { "type": "dotnet", "style": "powerline", "foreground": "#00ffff", "template": "| \uE77F {{ .Full }} " },
        { "type": "flutter", "style": "powerline", "foreground": "#1389fd", "template": "| \ue28e {{ if .Error }}{{ .Error }}{{ else }}{{ .Full }}{{ end }} " },
        { "type": "java", "style": "powerline", "foreground": "#ce2c00", "template": "| \uE738 {{ .Full }}" },
        { "foreground": "lightGreen", "style": "plain", "template": "| {{ .CurrentDate | date .Format }} ", "type": "time" }
      ],
      "type": "prompt"
    },
    {
      "alignment": "left",
      "newline": true,
      "segments": [
        {
          "foreground": "lightGreen",
          "foreground_templates": [ "{{ if gt .Code 0 }}red{{ end }}" ],
          "properties": { "always_enabled": true },
          "style": "powerline",
          "template": "\u279c ",
          "type": "exit"
        }
      ],
      "type": "prompt"
    }
  ],
  "version": 2
}
```

## 其他工具

- [PSScriptTools](https://github.com/jdhitsolutions/PSScriptTools) — 脚本工具集
- [yarn-completion](https://github.com/PowerShell-Completion/yarn-completion) — yarn 自动补全
- [MavenAutoCompletion](https://github.com/krymtkts/MavenAutoCompletion) — Maven 自动补全

## 参考

- [Starship 官方文档](https://starship.rs/zh-CN/guide/)
- [oh-my-posh 官方文档](https://ohmyposh.dev/)
