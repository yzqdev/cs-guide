# 发送邮件

设置outlook的地址
[https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040](https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040)

```python
conf = ConnectionConfig(MAIL_USERNAME="Microsoft@outlook.com",
                        MAIL_PASSWORD="123456",
                        MAIL_FROM="Microsoft@outlook.com",
                        MAIL_PORT=587,
                        MAIL_SERVER="smtp-mail.outlook.com",
                        MAIL_FROM_NAME="Microsoft",
                        MAIL_TLS=True,
                        MAIL_SSL=False,
                        USE_CREDENTIALS=True,
                        VALIDATE_CERTS=True)
```

如下图

| **电子邮件提供商** | **IMAP 设置** | **POP 设置** | **SMTP 设置** |
| ------------------ | ------------- | ------------ | ------------- |
| Microsoft 365      |
Outlook
Hotmail
Live.com | 服务器：outlook.office365.com
端口：993
加密：SSL/TLS | 服务器：outlook.office365.com
端口：995
加密：SSL/TLS | 服务器：smtp.office365.com
端口：587
加密：STARTTLS |
| MSN | 服务器：imap-mail.outlook.com
端口：993
加密：SSL/TLS | 服务器：pop-mail.outlook.com
端口：995
加密：SSL/TLS | 服务器：smtp-mail.outlook.com
端口：587
加密：STARTTLS |
