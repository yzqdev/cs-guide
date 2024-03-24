# java发送邮件

​

使用新的Jakartaapi

```kotlin
// https://mvnrepository.com/artifact/org.eclipse.angus/jakarta.mail
implementation("org.eclipse.angus:jakarta.mail:2.0.3")

```

## java基本数据类型有哪些

Java的基本数据类型分为：1、整数类型，用来表示整数的数据类型。2、浮点类型，用来表示小数的数据类型。3、字符类型，字符类型的关键字是“char”。4、布尔类型，是表示逻辑值的基本数据类型。

Jakarta Mail API提供了一个独立于平台和协议的框架来构建邮件，完成邮件接收与发送功能。它也包含在Java EE平台中，也可以和Java SE平台一起使用。

Jakarta Mail的前生是JavaMail。JavaMail最后一个版本是于2018年8月发布，已经停止更新。新项目应该使用Jakarta Mail。

现在很多邮箱默认关闭smtp，pop3，imap服务，需要在设置中手动开启。

![alt](https://cache.yisu.com/upload/information/20210423/112/6545.png#id=P9wE3&originHeight=254&originWidth=999&originalType=binary&ratio=1&status=done&style=none)

如果邮箱是使用授权码，则需要生成授权码(代替下文中密码)，这种方式更安全。

### 依赖

```kotlin
// https://mvnrepository.com/artifact/org.eclipse.angus/jakarta.mail
implementation("org.eclipse.angus:jakarta.mail:2.0.3")
或者
// https://mvnrepository.com/artifact/org.eclipse.angus/angus-mail
implementation("org.eclipse.angus:angus-mail:2.0.3")
这两个包内容相同
```

所有jar清单：

![alt](https://cache.yisu.com/upload/information/20210423/112/6546.png#id=B4Ayi&originHeight=474&originWidth=1024&originalType=binary&ratio=1&status=done&style=none)

最新版本包含了对Android的支持，可参考Jakarta Mail for Android

### 发送邮件

使用smtp协议接收，本文以QQ邮箱为例。

发送普通文本邮件

```java
MailObject mailObj = new MailObject();
mailObj.setFrom("engr-z@qq.com");
mailObj.setTo(new String[]{"post@engr-z.com"});
mailObj.setSubject("JavaMail 2.0");
mailObj.setFormat(MailObject.EmailFormat.TEXT);
mailObj.setBody("Java 收发邮件 (Jakarta Mail)");

// smtp配置，可保存到properties文件，读取
Properties props = new Properties();
props.put("mail.smtp.host", "smtp.qq.com");
props.put("mail.smtp.port", 465);
props.put("mail.smtp.ssl", true);
// 需要认证
props.put("mail.smtp.auth", true);
props.put("mail.smtp.user", "engr-z@qq.com");
props.put("mail.smtp.pass", "******");
// 使用ssl
props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//props.put("mail.smtp.socketFactory.fallback", false);
//props.put("mail.smtp.socketFactory.port", mailConfig.getPort());

// 创建会话
Session session = Session.getInstance(props, new Authenticator() {
    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        if (Boolean.valueOf(props.getProperty("mail.smtp.auth"))) {
            // 需要认证
            PasswordAuthentication auth = new PasswordAuthentication(props.getProperty("mail.smtp.user"), props.getProperty("mail.smtp.pass"));
            return auth;
        }
        return super.getPasswordAuthentication();
    }
});

// 构建邮件消息
MimeMessage msg = new MimeMessage(session);
msg.setFrom(new InternetAddress(mailObj.getFrom()));

InternetAddress[] address = new InternetAddress[mailObj.getTo().length];
for (int i = 0, j = mailObj.getTo().length; i < j; i++) {
    address[i] = new InternetAddress(mailObj.getTo()[i]);
}
// 可以用msg.setRecipients方法增加多个接收人，指定接收人类型
// Message.RecipientType.CC 抄送
// Message.RecipientType.BCC 密送
msg.setRecipients(Message.RecipientType.TO, address);

msg.setSubject(mailObj.getSubject());
if (MailObject.EmailFormat.HTML.equals(mailObj.getFormat())) {
    // html格式
    msg.setContent(mailObj.getBody(), "text/html;charset=utf-8");
} else {
    msg.setText(mailObj.getBody());
}
msg.setSentDate(new Date());

// 发送邮件
Transport.send(msg);
```

发送带附件的邮件

```java
MailObject mailObj = new MailObject();
mailObj.setFrom("engr-z@qq.com");
mailObj.setTo(new String[]{"post@engr-z.com"});
mailObj.setSubject("JavaMail 2.0");
mailObj.setFormat(MailObject.EmailFormat.TEXT);
mailObj.setBody("Java 收发邮件 (Jakarta Mail)");

// smtp配置，可保存到properties文件，读取
Properties props = new Properties();
props.put("mail.smtp.host", "smtp.qq.com");
props.put("mail.smtp.port", 465);
props.put("mail.smtp.ssl", true);
// 需要认证
props.put("mail.smtp.auth", true);
props.put("mail.smtp.user", "engr-z@qq.com");
props.put("mail.smtp.pass", "******");
// 使用ssl
props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//props.put("mail.smtp.socketFactory.fallback", false);
//props.put("mail.smtp.socketFactory.port", mailConfig.getPort());

// 创建会话
Session session = Session.getInstance(props, new Authenticator() {
    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        if (Boolean.valueOf(props.getProperty("mail.smtp.auth"))) {
            // 需要认证
            PasswordAuthentication auth = new PasswordAuthentication(props.getProperty("mail.smtp.user"), props.getProperty("mail.smtp.pass"));
            return auth;
        }
        return super.getPasswordAuthentication();
    }
});

// 构建邮件消息
MimeMessage msg = new MimeMessage(session);
msg.setFrom(new InternetAddress(mailObj.getFrom()));

InternetAddress[] address = new InternetAddress[mailObj.getTo().length];
for (int i = 0, j = mailObj.getTo().length; i < j; i++) {
    address[i] = new InternetAddress(mailObj.getTo()[i]);
}
// 可以用msg.setRecipients方法增加多个接收人，指定接收人类型
// Message.RecipientType.CC 抄送
// Message.RecipientType.BCC 密送
msg.setRecipients(Message.RecipientType.TO, address);

msg.setSubject(mailObj.getSubject());

Multipart mp = new MimeMultipart();

// 邮件内容
MimeBodyPart body = new MimeBodyPart();
if (MailObject.EmailFormat.HTML.equals(mailObj.getFormat())) {
    // html格式
    body.setContent(mailObj.getBody(), "text/html;charset=utf-8");
} else {
    body.setText(mailObj.getBody());
}
mp.addBodyPart(body);

// 附件
for (File file : mailObj.getFiles()) {
    MimeBodyPart attachment = new MimeBodyPart();
    attachment.attachFile(file);
    mp.addBodyPart(attachment);
}

msg.setContent(mp);
msg.setSentDate(new Date());

// 发送邮件
Transport.send(msg);
```

代码中MailObj是我创建的MailObject对象，MailObject封装了邮件相关的信息：

```java
/**
 * @author Engr-Z
 * @since 2021/3/3
 */
@Data
public class MailObject {

    enum EmailFormat {
        TEXT, HTML
    }

    /**
     * 发件人
     */
    private String from;

    /**
     * 收件人
     */
    private String[] to;

    /**
     * 抄送人
     */
    private String[] cc;

    /**
     * 密送人
     */
    private String[] bcc;

    /**
     * 邮件标题
     */
    private String subject;

    /**
     * 邮件内容
     */
    private String body;

    /**
     * 邮件格式
     */
    private EmailFormat format;

    /**
     * 附件
     */
    private File[] files;

}
```

### 接收邮件

接收邮件常用的协议有pop3，imap和exchange。exchange是微软的邮箱协议，Jakarta Mail暂不支持。

使用pop3协议

```java
// pop3配置，可保存到properties文件，读取
Properties props = new Properties();
props.put("mail.pop3.host", "pop.qq.com");
props.put("mail.pop3.port", 995);
props.put("mail.pop3.ssl", true);
// 需要认证
props.put("mail.pop3.auth", true);
props.put("mail.pop3.user", "post@engr-z.com");
props.put("mail.pop3.pass", "******");
// 使用ssl
props.put("mail.pop3.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//props.put("mail.pop3.socketFactory.fallback", false);
//props.put("mail.pop3.socketFactory.port", mailConfig.getPort());

Session session = Session.getDefaultInstance(props);
Store store = session.getStore(mailConfig.getProtocol().value);
if (Boolean.valueOf(props.getProperty("mail.pop3.auth"))) {
    // 需要认证
    store.connect(mailConfig.getHost(), mailConfig.getPort(), props.getProperty("mail.pop3.user"), props.getProperty("mail.pop3.pass"));
} else {
    store.connect();
}

// 获取收件箱 store.getDefaultForlder
Folder mbox = store.getFolder("INBOX");
// INBOX
mbox.open(Folder.READ_ONLY);
System.out.println(mbox.getName());
int msgCount = mbox.getMessageCount();
System.out.println("邮件总数：" + msgCount);
// 取最新的邮件
Message msg = mbox.getMessage(msgCount);
System.out.println("邮件主题：" + msg.getSubject());
System.out.println("发件人：" + msg.getFrom());
// 返回数组
System.out.println("收件人：" + msg.getRecipients(Message.RecipientType.TO));
// 没有为null
System.out.println("抄送人：" + msg.getRecipients(Message.RecipientType.CC));
// 没有为null
System.out.println("密送人：" + msg.getRecipients(Message.RecipientType.BCC));
// MimeMultipart 对像
System.out.println("邮件内容：" + msg.getContent());
```

使用imap协议

只需把上面props配置key改为imap即可，QQ邮件imap端口是 993：

```java
// imap配置，可保存到properties文件，读取
Properties props = new Properties();
props.put("mail.imap.host", "imap.qq.com");
props.put("mail.imap.port", 993);
props.put("mail.imap.ssl", true);
// 需要认证
props.put("mail.imap.auth", true);
props.put("mail.imap.user", "post@engr-z.com");
props.put("mail.imap.pass", "******");
// 使用ssl
props.put("mail.imap.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//props.put("mail.imap.socketFactory.fallback", false);
//props.put("mail.imap.socketFactory.port", mailConfig.getPort());

Session session = Session.getDefaultInstance(props);
Store store = session.getStore(mailConfig.getProtocol().value);
if (Boolean.valueOf(props.getProperty("mail.imap.auth"))) {
    // 需要认证
    store.connect(mailConfig.getHost(), mailConfig.getPort(), props.getProperty("mail.imap.user"), props.getProperty("mail.imap.pass"));
} else {
    store.connect();
}

// 以下操作与pop3相同......
```

以上是“Java怎么基于Jakarta Mail实现收发邮件”这篇文章的所有内容，感谢各位的阅读！相信大家都有了一定的了解，希望分享的内容对大家有所帮助，如果还想学习更多知识，欢迎关注亿速云行业资讯频道
