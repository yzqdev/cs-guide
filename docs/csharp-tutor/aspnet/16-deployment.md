---
order: 16
---

# 部署

## 发布应用

### 基本发布

```bash
# 发布到当前目录的 publish 文件夹
dotnet publish -c Release -o ./publish

# 发布为单文件（包含所有依赖）
dotnet publish -c Release -o ./publish \
    --runtime win-x64 \
    --self-contained true \
    -p:PublishSingleFile=true \
    -p:IncludeNativeLibrariesForSelfExtract=true

# 发布为 AOT（.NET 8+）
dotnet publish -c Release -o ./publish \
    --runtime win-x64 \
    -p:PublishAot=true
```

### 发布配置对比

| 方式 | 大小 | 启动速度 | 依赖要求 |
|------|------|---------|---------|
| Framework-dependent | 小 | 快 | 目标机器需安装 .NET 运行时 |
| Self-contained | 大 | 快 | 无需安装 .NET |
| Single file | 中 | 中 | 无需安装 .NET |
| AOT (Native AOT) | 大 | 极快 | 无需安装 .NET，无 JIT |

## 部署到 IIS

### 安装 IIS 模块

```bash
# 安装 ASP.NET Core Hosting Bundle
# 下载地址: https://dotnet.microsoft.com/download/dotnet
```

### 配置 IIS 站点

```xml
<!-- web.config（发布时自动生成） -->
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="aspNetCore" path="*" verb="*"
           modules="AspNetCoreModuleV2" resourceType="Unspecified" />
    </handlers>
    <aspNetCore processPath="dotnet"
                arguments=".\MyApp.dll"
                stdoutLogEnabled="false"
                stdoutLogFile=".\logs\stdout"
                hostingModel="inprocess">
      <environmentVariables>
        <environmentVariable name="ASPNETCORE_ENVIRONMENT" value="Production" />
      </environmentVariables>
    </aspNetCore>
  </system.webServer>
</configuration>
```

### IIS 部署步骤

1. 发布应用：`dotnet publish -c Release`
2. 在 IIS 中创建网站
3. 将发布文件复制到网站目录
4. 设置应用程序池为 **无托管代码**
5. 确保网站目录有 IIS_IUSRS 读取权限

## 部署到 Linux

### 使用 systemd 服务

```bash
# 1. 发布应用
dotnet publish -c Release -o /var/www/myapp \
    --runtime linux-x64 --self-contained

# 2. 创建服务文件
sudo vim /etc/systemd/system/myapp.service
```

```ini
[Unit]
Description=My ASP.NET Core App

[Service]
WorkingDirectory=/var/www/myapp
ExecStart=/var/www/myapp/MyApp
Restart=always
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=myapp
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://+:5000

[Install]
WantedBy=multi-user.target
```

```bash
# 3. 启用并启动服务
sudo systemctl enable myapp
sudo systemctl start myapp
sudo systemctl status myapp

# 查看日志
sudo journalctl -u myapp -f
```

### 使用 Nginx 反向代理

```bash
# 安装 Nginx
sudo apt-get install nginx

# 配置站点
sudo vim /etc/nginx/sites-available/myapp
```

```nginx
server {
    listen 80;
    server_name myapp.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 部署到 Docker

### Dockerfile

```dockerfile
# 构建阶段
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

# 运行阶段
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

### docker-compose.yml

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "5000:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Server=db;Database=MyApp;User=sa;Password=Your_password123
    depends_on:
      - db

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=Your_password123
    ports:
      - "1433:1433"
    volumes:
      - sql_data:/var/opt/mssql

volumes:
  sql_data:
```

### 构建和运行

```bash
docker build -t myapp .
docker run -d -p 5000:8080 --name myapp myapp

# 或使用 docker-compose
docker-compose up -d
```

## 环境配置

```bash
# 生产环境配置
export ASPNETCORE_ENVIRONMENT=Production
export ASPNETCORE_URLS=http://+:5000
export ConnectionStrings__DefaultConnection="Server=...;Database=...;"

# 为不同环境创建配置
# appsettings.json               - 所有环境共享
# appsettings.Development.json   - 开发环境
# appsettings.Staging.json       - 预发布环境
# appsettings.Production.json    - 生产环境
```

## 部署后检查清单

- [ ] 关闭 `appsettings.Development.json` 中的详细日志
- [ ] 使用 HTTPS（配置 Kestrel 或反向代理）
- [ ] 设置数据库连接字符串为环境变量或密钥管理服务
- [ ] 配置日志输出到文件或日志服务
- [ ] 配置健康检查终结点
- [ ] 启用响应压缩
- [ ] 设置适当的超时时间和连接池大小
- [ ] 配置防火墙规则，只开放必要端口