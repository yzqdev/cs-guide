import{_ as t,c as e,o,d as a}from"./app-CbULZrmi.js";const n={},s=a(`<h1 id="java发送邮件" tabindex="-1"><a class="header-anchor" href="#java发送邮件"><span>java发送邮件</span></a></h1><p>​</p><p>使用新的Jakartaapi</p><pre><code class="language-kotlin">// https://mvnrepository.com/artifact/org.eclipse.angus/jakarta.mail
implementation(&quot;org.eclipse.angus:jakarta.mail:2.0.3&quot;)

</code></pre><h2 id="java基本数据类型有哪些" tabindex="-1"><a class="header-anchor" href="#java基本数据类型有哪些"><span>java基本数据类型有哪些</span></a></h2><p>Java的基本数据类型分为：1、整数类型，用来表示整数的数据类型。2、浮点类型，用来表示小数的数据类型。3、字符类型，字符类型的关键字是“char”。4、布尔类型，是表示逻辑值的基本数据类型。</p><p>Jakarta Mail API提供了一个独立于平台和协议的框架来构建邮件，完成邮件接收与发送功能。它也包含在Java EE平台中，也可以和Java SE平台一起使用。</p><p>Jakarta Mail的前生是JavaMail。JavaMail最后一个版本是于2018年8月发布，已经停止更新。新项目应该使用Jakarta Mail。</p><p>现在很多邮箱默认关闭smtp，pop3，imap服务，需要在设置中手动开启。</p><p><img src="https://cache.yisu.com/upload/information/20210423/112/6545.png#id=P9wE3&amp;originHeight=254&amp;originWidth=999&amp;originalType=binary&amp;ratio=1&amp;status=done&amp;style=none" alt="alt"></p><p>如果邮箱是使用授权码，则需要生成授权码(代替下文中密码)，这种方式更安全。</p><h3 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖"><span>依赖</span></a></h3><pre><code class="language-kotlin">// https://mvnrepository.com/artifact/org.eclipse.angus/jakarta.mail
implementation(&quot;org.eclipse.angus:jakarta.mail:2.0.3&quot;)
或者
// https://mvnrepository.com/artifact/org.eclipse.angus/angus-mail
implementation(&quot;org.eclipse.angus:angus-mail:2.0.3&quot;)
这两个包内容相同
</code></pre><p>所有jar清单：</p><p><img src="https://cache.yisu.com/upload/information/20210423/112/6546.png#id=B4Ayi&amp;originHeight=474&amp;originWidth=1024&amp;originalType=binary&amp;ratio=1&amp;status=done&amp;style=none" alt="alt"></p><p>最新版本包含了对Android的支持，可参考Jakarta Mail for Android</p><h3 id="发送邮件" tabindex="-1"><a class="header-anchor" href="#发送邮件"><span>发送邮件</span></a></h3><p>使用smtp协议接收，本文以QQ邮箱为例。</p><p>发送普通文本邮件</p><pre><code class="language-java">MailObject mailObj = new MailObject();
mailObj.setFrom(&quot;engr-z@qq.com&quot;);
mailObj.setTo(new String[]{&quot;post@engr-z.com&quot;});
mailObj.setSubject(&quot;JavaMail 2.0&quot;);
mailObj.setFormat(MailObject.EmailFormat.TEXT);
mailObj.setBody(&quot;Java 收发邮件 (Jakarta Mail)&quot;);

// smtp配置，可保存到properties文件，读取
Properties props = new Properties();
props.put(&quot;mail.smtp.host&quot;, &quot;smtp.qq.com&quot;);
props.put(&quot;mail.smtp.port&quot;, 465);
props.put(&quot;mail.smtp.ssl&quot;, true);
// 需要认证
props.put(&quot;mail.smtp.auth&quot;, true);
props.put(&quot;mail.smtp.user&quot;, &quot;engr-z@qq.com&quot;);
props.put(&quot;mail.smtp.pass&quot;, &quot;******&quot;);
// 使用ssl
props.put(&quot;mail.smtp.socketFactory.class&quot;, &quot;javax.net.ssl.SSLSocketFactory&quot;);
//props.put(&quot;mail.smtp.socketFactory.fallback&quot;, false);
//props.put(&quot;mail.smtp.socketFactory.port&quot;, mailConfig.getPort());

// 创建会话
Session session = Session.getInstance(props, new Authenticator() {
    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        if (Boolean.valueOf(props.getProperty(&quot;mail.smtp.auth&quot;))) {
            // 需要认证
            PasswordAuthentication auth = new PasswordAuthentication(props.getProperty(&quot;mail.smtp.user&quot;), props.getProperty(&quot;mail.smtp.pass&quot;));
            return auth;
        }
        return super.getPasswordAuthentication();
    }
});

// 构建邮件消息
MimeMessage msg = new MimeMessage(session);
msg.setFrom(new InternetAddress(mailObj.getFrom()));

InternetAddress[] address = new InternetAddress[mailObj.getTo().length];
for (int i = 0, j = mailObj.getTo().length; i &lt; j; i++) {
    address[i] = new InternetAddress(mailObj.getTo()[i]);
}
// 可以用msg.setRecipients方法增加多个接收人，指定接收人类型
// Message.RecipientType.CC 抄送
// Message.RecipientType.BCC 密送
msg.setRecipients(Message.RecipientType.TO, address);

msg.setSubject(mailObj.getSubject());
if (MailObject.EmailFormat.HTML.equals(mailObj.getFormat())) {
    // html格式
    msg.setContent(mailObj.getBody(), &quot;text/html;charset=utf-8&quot;);
} else {
    msg.setText(mailObj.getBody());
}
msg.setSentDate(new Date());

// 发送邮件
Transport.send(msg);
</code></pre><p>发送带附件的邮件</p><pre><code class="language-java">MailObject mailObj = new MailObject();
mailObj.setFrom(&quot;engr-z@qq.com&quot;);
mailObj.setTo(new String[]{&quot;post@engr-z.com&quot;});
mailObj.setSubject(&quot;JavaMail 2.0&quot;);
mailObj.setFormat(MailObject.EmailFormat.TEXT);
mailObj.setBody(&quot;Java 收发邮件 (Jakarta Mail)&quot;);

// smtp配置，可保存到properties文件，读取
Properties props = new Properties();
props.put(&quot;mail.smtp.host&quot;, &quot;smtp.qq.com&quot;);
props.put(&quot;mail.smtp.port&quot;, 465);
props.put(&quot;mail.smtp.ssl&quot;, true);
// 需要认证
props.put(&quot;mail.smtp.auth&quot;, true);
props.put(&quot;mail.smtp.user&quot;, &quot;engr-z@qq.com&quot;);
props.put(&quot;mail.smtp.pass&quot;, &quot;******&quot;);
// 使用ssl
props.put(&quot;mail.smtp.socketFactory.class&quot;, &quot;javax.net.ssl.SSLSocketFactory&quot;);
//props.put(&quot;mail.smtp.socketFactory.fallback&quot;, false);
//props.put(&quot;mail.smtp.socketFactory.port&quot;, mailConfig.getPort());

// 创建会话
Session session = Session.getInstance(props, new Authenticator() {
    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        if (Boolean.valueOf(props.getProperty(&quot;mail.smtp.auth&quot;))) {
            // 需要认证
            PasswordAuthentication auth = new PasswordAuthentication(props.getProperty(&quot;mail.smtp.user&quot;), props.getProperty(&quot;mail.smtp.pass&quot;));
            return auth;
        }
        return super.getPasswordAuthentication();
    }
});

// 构建邮件消息
MimeMessage msg = new MimeMessage(session);
msg.setFrom(new InternetAddress(mailObj.getFrom()));

InternetAddress[] address = new InternetAddress[mailObj.getTo().length];
for (int i = 0, j = mailObj.getTo().length; i &lt; j; i++) {
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
    body.setContent(mailObj.getBody(), &quot;text/html;charset=utf-8&quot;);
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
</code></pre><p>代码中MailObj是我创建的MailObject对象，MailObject封装了邮件相关的信息：</p><pre><code class="language-java">/**
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
</code></pre><h3 id="接收邮件" tabindex="-1"><a class="header-anchor" href="#接收邮件"><span>接收邮件</span></a></h3><p>接收邮件常用的协议有pop3，imap和exchange。exchange是微软的邮箱协议，Jakarta Mail暂不支持。</p><p>使用pop3协议</p><pre><code class="language-java">// pop3配置，可保存到properties文件，读取
Properties props = new Properties();
props.put(&quot;mail.pop3.host&quot;, &quot;pop.qq.com&quot;);
props.put(&quot;mail.pop3.port&quot;, 995);
props.put(&quot;mail.pop3.ssl&quot;, true);
// 需要认证
props.put(&quot;mail.pop3.auth&quot;, true);
props.put(&quot;mail.pop3.user&quot;, &quot;post@engr-z.com&quot;);
props.put(&quot;mail.pop3.pass&quot;, &quot;******&quot;);
// 使用ssl
props.put(&quot;mail.pop3.socketFactory.class&quot;, &quot;javax.net.ssl.SSLSocketFactory&quot;);
//props.put(&quot;mail.pop3.socketFactory.fallback&quot;, false);
//props.put(&quot;mail.pop3.socketFactory.port&quot;, mailConfig.getPort());

Session session = Session.getDefaultInstance(props);
Store store = session.getStore(mailConfig.getProtocol().value);
if (Boolean.valueOf(props.getProperty(&quot;mail.pop3.auth&quot;))) {
    // 需要认证
    store.connect(mailConfig.getHost(), mailConfig.getPort(), props.getProperty(&quot;mail.pop3.user&quot;), props.getProperty(&quot;mail.pop3.pass&quot;));
} else {
    store.connect();
}

// 获取收件箱 store.getDefaultForlder
Folder mbox = store.getFolder(&quot;INBOX&quot;);
// INBOX
mbox.open(Folder.READ_ONLY);
System.out.println(mbox.getName());
int msgCount = mbox.getMessageCount();
System.out.println(&quot;邮件总数：&quot; + msgCount);
// 取最新的邮件
Message msg = mbox.getMessage(msgCount);
System.out.println(&quot;邮件主题：&quot; + msg.getSubject());
System.out.println(&quot;发件人：&quot; + msg.getFrom());
// 返回数组
System.out.println(&quot;收件人：&quot; + msg.getRecipients(Message.RecipientType.TO));
// 没有为null
System.out.println(&quot;抄送人：&quot; + msg.getRecipients(Message.RecipientType.CC));
// 没有为null
System.out.println(&quot;密送人：&quot; + msg.getRecipients(Message.RecipientType.BCC));
// MimeMultipart 对像
System.out.println(&quot;邮件内容：&quot; + msg.getContent());
</code></pre><p>使用imap协议</p><p>只需把上面props配置key改为imap即可，QQ邮件imap端口是 993：</p><pre><code class="language-java">// imap配置，可保存到properties文件，读取
Properties props = new Properties();
props.put(&quot;mail.imap.host&quot;, &quot;imap.qq.com&quot;);
props.put(&quot;mail.imap.port&quot;, 993);
props.put(&quot;mail.imap.ssl&quot;, true);
// 需要认证
props.put(&quot;mail.imap.auth&quot;, true);
props.put(&quot;mail.imap.user&quot;, &quot;post@engr-z.com&quot;);
props.put(&quot;mail.imap.pass&quot;, &quot;******&quot;);
// 使用ssl
props.put(&quot;mail.imap.socketFactory.class&quot;, &quot;javax.net.ssl.SSLSocketFactory&quot;);
//props.put(&quot;mail.imap.socketFactory.fallback&quot;, false);
//props.put(&quot;mail.imap.socketFactory.port&quot;, mailConfig.getPort());

Session session = Session.getDefaultInstance(props);
Store store = session.getStore(mailConfig.getProtocol().value);
if (Boolean.valueOf(props.getProperty(&quot;mail.imap.auth&quot;))) {
    // 需要认证
    store.connect(mailConfig.getHost(), mailConfig.getPort(), props.getProperty(&quot;mail.imap.user&quot;), props.getProperty(&quot;mail.imap.pass&quot;));
} else {
    store.connect();
}

// 以下操作与pop3相同......
</code></pre><p>以上是“Java怎么基于Jakarta Mail实现收发邮件”这篇文章的所有内容，感谢各位的阅读！相信大家都有了一定的了解，希望分享的内容对大家有所帮助，如果还想学习更多知识，欢迎关注亿速云行业资讯频道</p>`,32),p=[s];function i(r,u){return o(),e("div",null,p)}const l=t(n,[["render",i],["__file","java-send-email.html.vue"]]),c=JSON.parse('{"path":"/java-tutor/java-tips/java-send-email.html","title":"java发送邮件","lang":"zh-CN","frontmatter":{"description":"java发送邮件 ​ 使用新的Jakartaapi java基本数据类型有哪些 Java的基本数据类型分为：1、整数类型，用来表示整数的数据类型。2、浮点类型，用来表示小数的数据类型。3、字符类型，字符类型的关键字是“char”。4、布尔类型，是表示逻辑值的基本数据类型。 Jakarta Mail API提供了一个独立于平台和协议的框架来构建邮件，完成...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/java-send-email.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java发送邮件"}],["meta",{"property":"og:description","content":"java发送邮件 ​ 使用新的Jakartaapi java基本数据类型有哪些 Java的基本数据类型分为：1、整数类型，用来表示整数的数据类型。2、浮点类型，用来表示小数的数据类型。3、字符类型，字符类型的关键字是“char”。4、布尔类型，是表示逻辑值的基本数据类型。 Jakarta Mail API提供了一个独立于平台和协议的框架来构建邮件，完成..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cache.yisu.com/upload/information/20210423/112/6545.png#id=P9wE3&originHeight=254&originWidth=999&originalType=binary&ratio=1&status=done&style=none"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T12:34:23.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T12:34:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java发送邮件\\",\\"image\\":[\\"https://cache.yisu.com/upload/information/20210423/112/6545.png#id=P9wE3&originHeight=254&originWidth=999&originalType=binary&ratio=1&status=done&style=none\\",\\"https://cache.yisu.com/upload/information/20210423/112/6546.png#id=B4Ayi&originHeight=474&originWidth=1024&originalType=binary&ratio=1&status=done&style=none\\"],\\"dateModified\\":\\"2024-03-24T12:34:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"java基本数据类型有哪些","slug":"java基本数据类型有哪些","link":"#java基本数据类型有哪些","children":[{"level":3,"title":"依赖","slug":"依赖","link":"#依赖","children":[]},{"level":3,"title":"发送邮件","slug":"发送邮件","link":"#发送邮件","children":[]},{"level":3,"title":"接收邮件","slug":"接收邮件","link":"#接收邮件","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1711283663000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":4.49,"words":1348},"filePathRelative":"java-tutor/java-tips/java-send-email.md","localizedDate":"2022年3月21日","autoDesc":true}');export{l as comp,c as data};
