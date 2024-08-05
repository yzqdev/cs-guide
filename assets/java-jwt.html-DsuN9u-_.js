import{_ as e,c as t,o as n,d as r}from"./app-CbULZrmi.js";const a={},i=r(`<h1 id="java-jwt使用" tabindex="-1"><a class="header-anchor" href="#java-jwt使用"><span>java-jwt使用</span></a></h1><p>单点登录 <a href="https://github.com/longguikeji/arkid" target="_blank" rel="noopener noreferrer">https://github.com/longguikeji/arkid</a> ​</p><p>添加依赖</p><pre><code>// https://mvnrepository.com/artifact/com.auth0/java-jwt
implementation(&quot;com.auth0:java-jwt:4.4.0&quot;)
或者
</code></pre><p>JwtUtil.java</p><pre><code class="language-java">package com.macro.mall.tiny.security.util;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * JwtToken生成的工具类
 * JWT token的格式：header.payload.signature
 * header的格式（算法、token的类型）：
 * {&quot;alg&quot;: &quot;HS512&quot;,&quot;typ&quot;: &quot;JWT&quot;}
 * payload的格式（用户名、创建时间、生成时间）：
 * {&quot;sub&quot;:&quot;wang&quot;,&quot;created&quot;:1489079981393,&quot;exp&quot;:1489684781}
 * signature的生成算法：
 * HMACSHA512(base64UrlEncode(header) + &quot;.&quot; +base64UrlEncode(payload),secret)
 * Created by macro on 2018/4/26.
 */
public class JwtTokenUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);
    private static final String CLAIM_KEY_USERNAME = &quot;sub&quot;;
    private static final String CLAIM_KEY_CREATED = &quot;created&quot;;
    @Value(&quot;\${jwt.secret}&quot;)
    private String secret;
    @Value(&quot;\${jwt.expiration}&quot;)
    private Long expiration;
    @Value(&quot;\${jwt.tokenHead}&quot;)
    private String tokenHead;

    /**
     * 根据负责生成JWT的token
     */
    private String generateToken(Map&lt;String, Object&gt; claims) {
        Algorithm algorithm = Algorithm.HMAC512(secret);
        System.out.println(&quot;生成的过期时间&quot;);
        System.out.println(generateExpirationDate());
        return JWT.create()
                .withClaim(CLAIM_KEY_USERNAME, String.valueOf(claims.get(CLAIM_KEY_USERNAME)))
                .withClaim(CLAIM_KEY_CREATED, String.valueOf(claims.get(CLAIM_KEY_CREATED)))
                .withExpiresAt(generateExpirationDate())
                .sign(algorithm);

    }

    /**
     * 从token中获取JWT中的负载
     */
    private Map&lt;String, Claim&gt; getClaimsFromToken(String token) {
        Map&lt;String, Claim&gt; claims = new HashMap&lt;&gt;(2);
        Algorithm algorithm = Algorithm.HMAC512(secret);
        JWTVerifier verifier = JWT.require(algorithm)

                .build(); //Reusable verifier instance
        DecodedJWT jwt = verifier.verify(token);
        try {
            claims = jwt.getClaims();


        } catch (Exception e) {
            LOGGER.info(&quot;JWT格式验证失败:{}&quot;, token);
        }
        return claims;
    }

    /**
     * 生成token的过期时间
     */
    private Timestamp generateExpirationDate() {
        return new Timestamp(System.currentTimeMillis() + expiration * 1000);
    }

    /**
     * 从token中获取登录用户名
     */
    public String getUserNameFromToken(String token) {
        String username;
        try {
            Map&lt;String, Claim&gt; claims = getClaimsFromToken(token);
            System.out.println(claims);
            username = claims.get(CLAIM_KEY_USERNAME).asString();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    /**
     * 验证token是否还有效
     *
     * @param token       客户端传入的token
     * @param userDetails 从数据库中查询出来的用户信息
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        String username = getUserNameFromToken(token);
        return username.equals(userDetails.getUsername()) &amp;&amp; !isTokenExpired(token);
    }

    /**
     * 判断token是否已经失效
     */
    private boolean isTokenExpired(String token) {
        Date expiredDate = getExpiredDateFromToken(token);
        System.out.println(&quot;过期了吗&quot;);
        System.out.println(expiredDate);
        System.out.println(new Date());
        return expiredDate.before(new Date());
    }

    /**
     * 从token中获取过期时间
     */
    private Date getExpiredDateFromToken(String token) {
        Algorithm algorithm = Algorithm.HMAC512(secret);
        JWTVerifier verifier = JWT.require(algorithm)

                .build(); //Reusable verifier instance
        DecodedJWT jwt = verifier.verify(token);

        return jwt.getExpiresAt() ;

    }

    /**
     * 根据用户信息生成token
     */
    public String generateToken(UserDetails userDetails) {
        Map&lt;String, Object&gt; claims = new HashMap&lt;&gt;(2);
        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
        claims.put(CLAIM_KEY_CREATED, System.currentTimeMillis());
        return generateToken(claims);
    }

    /**
     * 当原来的token没过期时是可以刷新的
     *
     * @param oldToken 带tokenHead的token
     */
    public String refreshHeadToken(String oldToken) {
        if (StrUtil.isEmpty(oldToken)) {
            return null;
        }
        String token = oldToken.substring(tokenHead.length());
        if (StrUtil.isEmpty(token)) {
            return null;
        }
        //token校验不通过
        Map&lt;String, Claim&gt; claims = getClaimsFromToken(token);
        if (claims == null) {
            return null;
        }
        //如果token已经过期，不支持刷新
        if (isTokenExpired(token)) {
            return null;
        }
        Map&lt;String, Object&gt; claim = new HashMap&lt;&gt;(2);
        //如果token在30分钟之内刚刷新过，返回原token
        if (tokenRefreshJustBefore(token, 30 * 60)) {
            return token;
        } else {
            claim.put(CLAIM_KEY_USERNAME, claims.get(CLAIM_KEY_USERNAME).asString());
            claim.put(CLAIM_KEY_CREATED, new Date());
            return generateToken(claim);
        }
    }

    /**
     * 判断token在指定时间内是否刚刚刷新过
     *
     * @param token 原token
     * @param time  指定时间（秒）
     */
    private boolean tokenRefreshJustBefore(String token, int time) {
        Map&lt;String, Claim&gt; claims = getClaimsFromToken(token);
        Date created = claims.get(CLAIM_KEY_CREATED).asDate();
        Date refreshDate = new Date();
        //刷新时间在创建时间的指定时间内
        if (refreshDate.after(created) &amp;&amp; refreshDate.before(DateUtil.offsetSecond(created, time))) {
            return true;
        }
        return false;
    }
}

</code></pre><p>UserController.java</p><pre><code class="language-java">package com.example.first.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.first.model.User;
import com.example.first.service.UserService;
import com.example.first.utils.JwtUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.*;
import java.util.*;

/**
 * @author Yangzhengqian
 * @description
 * @date:Created time 2021/8/11 15:02
 * @modified By:
 */
@RestController
public class UserController {
    @Resource
    UserService userService;

    @PostMapping(&quot;/login&quot;)
    public HashMap login(String username, String password) {
        User sqlUser = userService.getOne(new QueryWrapper&lt;User&gt;().eq(&quot;username&quot;, username));
        String token = &quot;&quot;;
        HashMap h = new HashMap();

        if (Objects.equals(password, sqlUser.getPassword())) {
            token = JwtUtil.sign(username, password);
            System.out.println(token);
            h.put(&quot;token&quot;, token);
            return h;
        }


        return h;
    }

    @PostMapping(&quot;/reg&quot;)
    public String reg(String username, String password) {
        User u = new User();
        u.setUsername(username);
        u.setPassword(password);
        userService.save(u);
        return u.toString();
    }
    @GetMapping(&quot;/ver&quot;)
    public HashMap  ver(@RequestParam(&quot;token&quot;) String token){
        //String username=JwtUtil.getUsername(token);
        Map  user=JwtUtil.getTokenInfo(token);
        HashMap&lt;String,String&gt; res=new HashMap&lt;&gt;(1);
        res.put(&quot;user&quot;, String.valueOf(user));
        return  res;
    }

    @PostMapping (&quot;/uploadImg&quot;)
    public HashMap  uploadFile(@RequestParam(&quot;image&quot;) MultipartFile image) {
        String imgurl=&quot;&quot;;
        HashMap&lt;String, Object&gt; res=new HashMap&lt;&gt;();
        //存入数据库的文件地址集合
        List&lt;String&gt; pathList = new ArrayList&lt;&gt;();
        //文件上传
        if (!image.isEmpty()) {
            try {
                Calendar cal = Calendar.getInstance();
                int year = cal.get(Calendar.YEAR);
                //本地测试上传图片文件夹名称
                String fileName =image.getOriginalFilename();
                // 文件名称
                String suffix = fileName.substring(fileName.lastIndexOf(&#39;.&#39;));
                // 新文件名（唯一）
                String newFileName = &quot;C:\\\\Users\\\\yzqde\\\\tmp\\\\&quot;+System.currentTimeMillis() + suffix;

                File newFile = new File(newFileName);
                if (!newFile.exists()) {
                    newFile.createNewFile();
                }
                BufferedOutputStream out =new BufferedOutputStream(new FileOutputStream(newFile));
                out.write(image.getBytes());
                out.flush();
                out.close();
                //此处将imgurl路径进行变更

                pathList.add(newFileName);
                res.put(&quot;path&quot;,pathList);
                return res;
            } catch (FileNotFoundException e) {
                 e.printStackTrace();
            } catch (IOException e) {
               e.printStackTrace();
            }
        }
        return null;
    }
}

</code></pre>`,8),o=[i];function s(l,u){return n(),t("div",null,o)}const m=e(a,[["render",s],["__file","java-jwt.html.vue"]]),g=JSON.parse('{"path":"/java-tutor/springboot/java-jwt.html","title":"java-jwt使用","lang":"zh-CN","frontmatter":{"description":"java-jwt使用 单点登录 https://github.com/longguikeji/arkid ​ 添加依赖 JwtUtil.java UserController.java","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/java-jwt.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java-jwt使用"}],["meta",{"property":"og:description","content":"java-jwt使用 单点登录 https://github.com/longguikeji/arkid ​ 添加依赖 JwtUtil.java UserController.java"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T12:34:23.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T12:34:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java-jwt使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T12:34:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1711283663000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":3.2,"words":961},"filePathRelative":"java-tutor/springboot/java-jwt.md","localizedDate":"2022年3月21日","autoDesc":true}');export{m as comp,g as data};
