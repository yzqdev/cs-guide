# Web 请求

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
