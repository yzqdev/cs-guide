---
order: 11
---

# Web 请求

PowerShell 提供了 `Invoke-WebRequest` 和 `Invoke-RestMethod` 两个命令来处理 HTTP 请求。

## 提交 key1=value1&key2=value2 类型参数

### 方法一

```powershell
$textmod = "key=$key&content=$data&touser=$touser"

Invoke-WebRequest -UseBasicParsing $url -Method POST -Body $textmod
# 提交的数据中如果包含符号 & 使用 %26 代替，contentType 解决中文乱码问题
Invoke-WebRequest -UseBasicParsing $url -ContentType 'application/x-www-form-urlencoded;charset=UTF-8' -Method POST -Body $textmod
```

### 方法二

```powershell
# 中文和特殊符号无需特殊处理
$textmod = @{key=$key;content=$data;touser=$touser}
Invoke-WebRequest -UseBasicParsing $url -Method POST -Body $textmod
```

## 提交 JSON 类型参数

```powershell
$text = @{
    "content" = $data
    "touser" = $touser
    "sn" = $sn
} | ConvertTo-Json

Invoke-WebRequest -UseBasicParsing $url -ContentType "application/json" -Method POST -Body $text
```

## GET 请求

```powershell
# 基本 GET 请求
$response = Invoke-WebRequest -Uri "https://api.example.com/users"

# 获取响应内容
$response.Content           # 原始内容
$response.StatusCode         # 状态码（如 200）
$response.Headers            # 响应头
$response.ContentType        # 内容类型

# 解析 JSON 响应
$data = $response.Content | ConvertFrom-Json
```

## 设置请求头

```powershell
$headers = @{
    "Authorization" = "Bearer your_token"
    "User-Agent" = "PowerShell-Script"
    "Accept" = "application/json"
}

$response = Invoke-WebRequest -Uri $url -Headers $headers -Method GET
```

## 使用 Invoke-RestMethod（自动解析 JSON/XML）

`Invoke-RestMethod` 会自动将 JSON/XML 响应解析为 PowerShell 对象：

```powershell
# 自动解析 JSON
$users = Invoke-RestMethod -Uri "https://api.example.com/users"
$users[0].name  # 直接访问属性

# POST JSON 并获取结果
$body = @{ name = "Alice"; email = "alice@example.com" } | ConvertTo-Json
$result = Invoke-RestMethod -Uri "https://api.example.com/users" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

## 文件下载

```powershell
# 下载文件
Invoke-WebRequest -Uri "https://example.com/file.zip" -OutFile "C:\temp\file.zip"

# 带进度显示下载（使用 WebClient）
$wc = New-Object System.Net.WebClient
$wc.DownloadFile("https://example.com/largefile.zip", "C:\temp\largefile.zip")
```

## 处理 Cookie 和 Session

```powershell
# 创建会话（自动管理 Cookie）
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

# 登录
$loginBody = @{ username = "admin"; password = "123456" }
Invoke-WebRequest -Uri "https://example.com/login" `
    -Method POST `
    -Body $loginBody `
    -SessionVariable session

# 使用会话继续请求
Invoke-WebRequest -Uri "https://example.com/profile" `
    -WebSession $session
```

## 错误处理

```powershell
try {
    $response = Invoke-WebRequest -Uri $url -Method GET
    if ($response.StatusCode -eq 200) {
        Write-Host "请求成功"
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $errorMsg = $_.ErrorDetails.Message
    Write-Host "请求失败: $statusCode - $errorMsg"
}
```
