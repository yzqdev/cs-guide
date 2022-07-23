# web请求

提交key1=value1&key2=value2类型参数：

方法一：

```powershell
$textmod="key=$key&content=$data&touser=$touser"

Invoke-WebRequest -UseBasicParsing $url  -Method POST -Body $textmod
Invoke-WebRequest -UseBasicParsing $url -ContentType 'application/x-www-form-urlencoded;charset=UTF-8' -Method POST -Body $textmod  #提交的数据中如果包含符号&使用%26代替，contentType解决中文乱码问题
 
```

方法二：

```powershell
#中文和特殊符号无需特殊处理
$textmod = @{key=$key;content=$data;touser=$touser}
Invoke-WebRequest -UseBasicParsing $url -Method POST -Body $textmod  
```

提交json类型参数，未测试

```powershell
$text = @{
 "content" = $data,
 "touser" = $touser,
 "sn" = $sn
} | ConvertTo-Json

Invoke-WebRequest -UseBasicParsing $url -ContentType "application/json" -Method POST -Body $text
```
