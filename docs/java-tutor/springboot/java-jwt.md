# java-jwt使用

单点登录
[https://github.com/longguikeji/arkid](https://github.com/longguikeji/arkid)
​

添加依赖

```
// https://mvnrepository.com/artifact/com.auth0/java-jwt
implementation("com.auth0:java-jwt:4.4.0")
或者
```

JwtUtil.java

```java
package com.macro.mall.tiny.security.util;

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
 * {"alg": "HS512","typ": "JWT"}
 * payload的格式（用户名、创建时间、生成时间）：
 * {"sub":"wang","created":1489079981393,"exp":1489684781}
 * signature的生成算法：
 * HMACSHA512(base64UrlEncode(header) + "." +base64UrlEncode(payload),secret)
 * Created by macro on 2018/4/26.
 */
public class JwtTokenUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);
    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_CREATED = "created";
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Long expiration;
    @Value("${jwt.tokenHead}")
    private String tokenHead;

    /**
     * 根据负责生成JWT的token
     */
    private String generateToken(Map<String, Object> claims) {
        Algorithm algorithm = Algorithm.HMAC512(secret);
        System.out.println("生成的过期时间");
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
    private Map<String, Claim> getClaimsFromToken(String token) {
        Map<String, Claim> claims = new HashMap<>(2);
        Algorithm algorithm = Algorithm.HMAC512(secret);
        JWTVerifier verifier = JWT.require(algorithm)

                .build(); //Reusable verifier instance
        DecodedJWT jwt = verifier.verify(token);
        try {
            claims = jwt.getClaims();


        } catch (Exception e) {
            LOGGER.info("JWT格式验证失败:{}", token);
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
            Map<String, Claim> claims = getClaimsFromToken(token);
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
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * 判断token是否已经失效
     */
    private boolean isTokenExpired(String token) {
        Date expiredDate = getExpiredDateFromToken(token);
        System.out.println("过期了吗");
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
        Map<String, Object> claims = new HashMap<>(2);
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
        Map<String, Claim> claims = getClaimsFromToken(token);
        if (claims == null) {
            return null;
        }
        //如果token已经过期，不支持刷新
        if (isTokenExpired(token)) {
            return null;
        }
        Map<String, Object> claim = new HashMap<>(2);
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
        Map<String, Claim> claims = getClaimsFromToken(token);
        Date created = claims.get(CLAIM_KEY_CREATED).asDate();
        Date refreshDate = new Date();
        //刷新时间在创建时间的指定时间内
        if (refreshDate.after(created) && refreshDate.before(DateUtil.offsetSecond(created, time))) {
            return true;
        }
        return false;
    }
}

```

UserController.java

```java
package com.example.first.controller;

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

    @PostMapping("/login")
    public HashMap login(String username, String password) {
        User sqlUser = userService.getOne(new QueryWrapper<User>().eq("username", username));
        String token = "";
        HashMap h = new HashMap();

        if (Objects.equals(password, sqlUser.getPassword())) {
            token = JwtUtil.sign(username, password);
            System.out.println(token);
            h.put("token", token);
            return h;
        }


        return h;
    }

    @PostMapping("/reg")
    public String reg(String username, String password) {
        User u = new User();
        u.setUsername(username);
        u.setPassword(password);
        userService.save(u);
        return u.toString();
    }
    @GetMapping("/ver")
    public HashMap  ver(@RequestParam("token") String token){
        //String username=JwtUtil.getUsername(token);
        Map  user=JwtUtil.getTokenInfo(token);
        HashMap<String,String> res=new HashMap<>(1);
        res.put("user", String.valueOf(user));
        return  res;
    }

    @PostMapping ("/uploadImg")
    public HashMap  uploadFile(@RequestParam("image") MultipartFile image) {
        String imgurl="";
        HashMap<String, Object> res=new HashMap<>();
        //存入数据库的文件地址集合
        List<String> pathList = new ArrayList<>();
        //文件上传
        if (!image.isEmpty()) {
            try {
                Calendar cal = Calendar.getInstance();
                int year = cal.get(Calendar.YEAR);
                //本地测试上传图片文件夹名称
                String fileName =image.getOriginalFilename();
                // 文件名称
                String suffix = fileName.substring(fileName.lastIndexOf('.'));
                // 新文件名（唯一）
                String newFileName = "C:\\Users\\yzqde\\tmp\\"+System.currentTimeMillis() + suffix;

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
                res.put("path",pathList);
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

```
