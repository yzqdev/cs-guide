# 项目部署

## 安装php

```shell
sudo apt install php php-devel
# 安装常用工具(可选)
sudo apt install php-mysql php-gd php-imap php-ldap php-odbc php-pear php-xml php-xmlrpc
```

然后重启apache服务器`apachectl restart`

## 测试

```shell
# 添加一个php文件
vi /var/www/html/info.php
```

写入

```php
<?php phpinfo(); ?>

```

然后访问<http://localhost/info.php>
