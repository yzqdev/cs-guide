# springboot使用controller传递参数

:::tip

see [https://github.com/yzqdev/spring-tutor/tree/dev/spring-transfer](https://github.com/yzqdev/spring-tutor/tree/dev/spring-transfer)  
额外内容 [AntPathMatcher和PathPattern的区别](https://spring.io/blog/2020/06/30/url-matching-with-pathpattern-in-spring-mvc)  
详细文档见[spring.io](https://docs.spring.io/spring-framework/docs/5.3.17/reference/html/web.html#mvc-ann-requestmapping-uri-templates)
:::

## 基本传参方式

直接上代码

:::tip
**注意**
multipart/form-data与x-www-form-urlencoded的区别:
 multipart/form-data：可以上传文件或者键值对，最后都会转化为一条消息
 x-www-form-urlencoded：只能上传键值对，而且键值对都是通过&间隔分开的。
 application/json: 上传的是json键值对
 :::

```java
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    /**
     * 获取用户
     * api使用: http://localhost:9400/user/getUser
     * @return {@link User}
     */
    @GetMapping("user")
    public User getUser() {
        return null;
    }

    /**
     * 使用pathvariable
     * api使用: http://localhost:9400/userByPath/abcdde
     *
     * @param id id
     * @return {@link String}
     */
    @GetMapping("userByPath/{id}")
    public String getUserByPath(@PathVariable("id") String id) {
        return id;
    }
    /**
     * 添加用户
     * api使用: http://localhost:9400/user/addUserstr?username=aa&password=bb
     * @return {@link User}
     */
    @PostMapping("/addUser")
    public User addUser(User user) {
        return user;
    }

    /**
     * 添加用户
     * api使用: http://localhost:9400/user/addUserbody
     *<pre>
     *     <code>
     * {
     *             "username": "aa",
     *             "password": "bb"
     *         }
     *     </code>
     *</pre>
     * @param user 用户
     * @return {@link User}
     */
    @PostMapping("/addUserBody")
    public User addUserBody(@RequestBody User user) {
        return user;
    }


    /**
     * 添加用户
     *api使用: http://localhost:9400/user/addUserstr?username=aa&password=bb
     * @param username 用户名
     * @param password 密码
     * @return {@link User}
     */
    @PostMapping("/addUserstr")
    public User addUserString(String username, String password) {
        User user = User.builder().username(username).password(password).build();
        return user;
    }

    /**
     * 删除多个用户
     * api使用: http://localhost:9400/user/deleteUsers
     * <pre>
     *     <code>
     *         {
     *   "userIds": [
     *     "string"
     *   ]
     * }
     *     </code>
     * </pre>
     * @param userDelDto 用户del dto
     * @return {@link HashMap}<{@link String}, {@link Object}>
     */
    @DeleteMapping("/deleteUsers")
    public HashMap<String, Object> deleteUsers(@RequestBody UserDelDto userDelDto) {
        HashMap<String, Object> res = new HashMap<>();
        res.put("obj", userDelDto);

        return res;
    }

    /**
     * 删除users1
     * api使用: http://localhost:9400/user/deleteUsers1
     *[
     *   "string"
     * ]
     * @param ids id
     * @return {@link HashMap}<{@link String}, {@link Object}>
     */
    @DeleteMapping("/deleteUsers1")
    public HashMap<String, Object> deleteUsers1(@RequestBody String[] ids) {
        HashMap<String, Object> res = new HashMap<>();
        res.put("obj", ids);

        return res;
    }

    /**
     * 获取请求头信息
     *
     * @return {@link HashMap}<{@link String}, {@link Object}>
     */
    @GetMapping("/users")
    public HashMap<String, Object> getUsers() {
        HashMap<String, Object> res = new HashMap<>();
        String token = RequestHelper.getRequestHeader("token");
        String auth = RequestHelper.getRequestHeader("Authorization");
        res.put("token", token);
        res.put("auth", auth);
        return res;
    }

    /**
     * 检索
     *api使用: http://localhost:9400/user/retrieve?username=aa
     * @param username 用户名
     * @return {@link User}
     */
    @GetMapping("/retrieve")
    public User retrieve(@RequestParam("username") String username) {
        return userService.getOne(new LambdaQueryWrapper<User>().eq(User::getUsername, username));
    }

}
```

## map传参方式(不推荐)

```java
@RestController
@RequestMapping("/my")
public class MyController {

    /**
     * 保存
     * 用map接收
     * api使用: http://localhost:9400/my/save
     * <pre>
     *     <code>
     *         {
     *   "additionalProp1": "string",
     *   "additionalProp2": "string",
     *   "additionalProp3": "string"
     * }
     *     </code>
     * </pre>
     * @param map 地图
     * @return {@link Map}<{@link String}, {@link String}>
     */
    @PostMapping("/save")
    public Map<String, String> save(@RequestBody Map<String,String> map) {
       return map;
    }
}

```
