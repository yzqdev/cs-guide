# 发送邮件

> Python 通过 `smtplib` 标准库发送邮件，支持 Outlook、163、QQ 等常见邮箱。

## 邮箱协议说明

- **SMTP** — 发送邮件协议（Simple Mail Transfer Protocol）
- **POP3** — 接收邮件协议（只能收，不能发）
- **IMAP** — 双向邮件协议（可收可发，支持同步状态）

> 简单说：imap 是双向协议，可以接收邮件也可以发送邮件；pop 是接收邮件；smtp 是发送邮件。

## Outlook 配置

设置 SMTP 和 IMAP 参数参考微软官方文档：
[Outlook.com 的 POP、IMAP 和 SMTP 设置](https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040)

### 配置参数

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

## 完整代码示例

以下是一个使用 `smtplib` 发送 Outlook 邮件的完整示例：

```python
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def send_outlook():
    """
    send outlook email
    """

    # 发件人的邮箱账号
    sender = "111111@outlook.com"
    # 发件人的邮箱密码（注意：这里是授权码，不是登录密码）
    password = "1111111"
    # 收件人的邮箱账号
    receiver = "1111111@11.com"

    # 邮件主题
    subject = "这是邮件主题"
    # 邮件正文
    message = "这是邮件正文"

    # 创建邮件对象
    msg = MIMEText(message, "plain", "utf-8")
    msg["Subject"] = Header(subject, "utf-8")
    msg["From"] = sender
    msg["To"] = receiver

    # 发送邮件
    try:
        server = smtplib.SMTP(
            "smtp-mail.outlook.com", 587
        )
        server.starttls()
        server.login(sender, password)
        server.sendmail(sender, [receiver], msg.as_string())
        server.quit()
        print("邮件发送成功")
    except Exception as e:
        print("邮件发送失败", e)


if __name__ == "__main__":
    send_outlook()
```

## 常见邮箱的 SMTP 地址

| 邮箱 | SMTP 服务器 | 端口 | SSL/TLS |
|------|------------|------|---------|
| Outlook/Hotmail | `smtp-mail.outlook.com` | 587 | STARTTLS |
| Gmail | `smtp.gmail.com` | 587 | STARTTLS |
| QQ 邮箱 | `smtp.qq.com` | 465 | SSL |
| 163 邮箱 | `smtp.163.com` | 25 | 可选 |
| 阿里企业邮箱 | `smtp.mail.aliyun.com` | 465 | SSL |

> **注意**：大部分邮箱需要开启 **SMTP 服务**并使用**授权码**（而非登录密码）才能通过代码发送邮件。
