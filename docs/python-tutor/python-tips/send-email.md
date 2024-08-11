# 发送邮件

设置outlook的地址  
[outlook设置](https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040)

imap是双向协议,可以接受邮件可以发送邮件,pop是接受邮件,smtp是发送邮件

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

```python
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def send_outlook():
    """
    send 163 email
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
        )  # 根据你的邮箱服务器进行修改
        server.starttls()
        # server.connect()

        server.login(sender, password)
        server.sendmail(sender, [receiver], msg.as_string())
        server.quit()
        print("邮件发送成功")
    except Exception as e:
        print("邮件发送失败", e)


if __name__ == "__main__":
    send_outlook()
```
