import{_ as t,c as e,o as n,d as r}from"./app-CbULZrmi.js";const o={},a=r(`<h1 id="springboot使用controller传递参数" tabindex="-1"><a class="header-anchor" href="#springboot使用controller传递参数"><span>springboot使用controller传递参数</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>see <a href="https://github.com/yzqdev/spring-tutor/tree/dev/spring-transfer" target="_blank" rel="noopener noreferrer">https://github.com/yzqdev/spring-tutor/tree/dev/spring-transfer</a><br> 额外内容 <a href="https://spring.io/blog/2020/06/30/url-matching-with-pathpattern-in-spring-mvc" target="_blank" rel="noopener noreferrer">AntPathMatcher和PathPattern的区别</a><br> 详细文档见<a href="https://docs.spring.io/spring-framework/docs/5.3.17/reference/html/web.html#mvc-ann-requestmapping-uri-templates" target="_blank" rel="noopener noreferrer">spring.io</a></p></div><h2 id="基本传参方式" tabindex="-1"><a class="header-anchor" href="#基本传参方式"><span>基本传参方式</span></a></h2><p>直接上代码</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><strong>注意</strong> multipart/form-data与x-www-form-urlencoded的区别: multipart/form-data：可以上传文件或者键值对，最后都会转化为一条消息 x-www-form-urlencoded：只能上传键值对，而且键值对都是通过&amp;间隔分开的。 application/json: 上传的是json键值对</p></div><pre><code class="language-java">@RestController
@RequestMapping(&quot;/user&quot;)
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    /**
     * 获取用户
     * api使用: http://localhost:9400/user/getUser
     * @return {@link User}
     */
    @GetMapping(&quot;user&quot;)
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
    @GetMapping(&quot;userByPath/{id}&quot;)
    public String getUserByPath(@PathVariable(&quot;id&quot;) String id) {
        return id;
    }
    /**
     * 添加用户
     * api使用: http://localhost:9400/user/addUserstr?username=aa&amp;password=bb
     * @return {@link User}
     */
    @PostMapping(&quot;/addUser&quot;)
    public User addUser(User user) {
        return user;
    }

    /**
     * 添加用户
     * api使用: http://localhost:9400/user/addUserbody
     *&lt;pre&gt;
     *     &lt;code&gt;
     * {
     *             &quot;username&quot;: &quot;aa&quot;,
     *             &quot;password&quot;: &quot;bb&quot;
     *         }
     *     &lt;/code&gt;
     *&lt;/pre&gt;
     * @param user 用户
     * @return {@link User}
     */
    @PostMapping(&quot;/addUserBody&quot;)
    public User addUserBody(@RequestBody User user) {
        return user;
    }


    /**
     * 添加用户
     *api使用: http://localhost:9400/user/addUserstr?username=aa&amp;password=bb
     * @param username 用户名
     * @param password 密码
     * @return {@link User}
     */
    @PostMapping(&quot;/addUserstr&quot;)
    public User addUserString(String username, String password) {
        User user = User.builder().username(username).password(password).build();
        return user;
    }

    /**
     * 删除多个用户
     * api使用: http://localhost:9400/user/deleteUsers
     * &lt;pre&gt;
     *     &lt;code&gt;
     *         {
     *   &quot;userIds&quot;: [
     *     &quot;string&quot;
     *   ]
     * }
     *     &lt;/code&gt;
     * &lt;/pre&gt;
     * @param userDelDto 用户del dto
     * @return {@link HashMap}&lt;{@link String}, {@link Object}&gt;
     */
    @DeleteMapping(&quot;/deleteUsers&quot;)
    public HashMap&lt;String, Object&gt; deleteUsers(@RequestBody UserDelDto userDelDto) {
        HashMap&lt;String, Object&gt; res = new HashMap&lt;&gt;();
        res.put(&quot;obj&quot;, userDelDto);

        return res;
    }

    /**
     * 删除users1
     * api使用: http://localhost:9400/user/deleteUsers1
     *[
     *   &quot;string&quot;
     * ]
     * @param ids id
     * @return {@link HashMap}&lt;{@link String}, {@link Object}&gt;
     */
    @DeleteMapping(&quot;/deleteUsers1&quot;)
    public HashMap&lt;String, Object&gt; deleteUsers1(@RequestBody String[] ids) {
        HashMap&lt;String, Object&gt; res = new HashMap&lt;&gt;();
        res.put(&quot;obj&quot;, ids);

        return res;
    }

    /**
     * 获取请求头信息
     *
     * @return {@link HashMap}&lt;{@link String}, {@link Object}&gt;
     */
    @GetMapping(&quot;/users&quot;)
    public HashMap&lt;String, Object&gt; getUsers() {
        HashMap&lt;String, Object&gt; res = new HashMap&lt;&gt;();
        String token = RequestHelper.getRequestHeader(&quot;token&quot;);
        String auth = RequestHelper.getRequestHeader(&quot;Authorization&quot;);
        res.put(&quot;token&quot;, token);
        res.put(&quot;auth&quot;, auth);
        return res;
    }

    /**
     * 检索
     *api使用: http://localhost:9400/user/retrieve?username=aa
     * @param username 用户名
     * @return {@link User}
     */
    @GetMapping(&quot;/retrieve&quot;)
    public User retrieve(@RequestParam(&quot;username&quot;) String username) {
        return userService.getOne(new LambdaQueryWrapper&lt;User&gt;().eq(User::getUsername, username));
    }

}
</code></pre><h2 id="map传参方式-不推荐" tabindex="-1"><a class="header-anchor" href="#map传参方式-不推荐"><span>map传参方式(不推荐)</span></a></h2><pre><code class="language-java">@RestController
@RequestMapping(&quot;/my&quot;)
public class MyController {

    /**
     * 保存
     * 用map接收
     * api使用: http://localhost:9400/my/save
     * &lt;pre&gt;
     *     &lt;code&gt;
     *         {
     *   &quot;additionalProp1&quot;: &quot;string&quot;,
     *   &quot;additionalProp2&quot;: &quot;string&quot;,
     *   &quot;additionalProp3&quot;: &quot;string&quot;
     * }
     *     &lt;/code&gt;
     * &lt;/pre&gt;
     * @param map 地图
     * @return {@link Map}&lt;{@link String}, {@link String}&gt;
     */
    @PostMapping(&quot;/save&quot;)
    public Map&lt;String, String&gt; save(@RequestBody Map&lt;String,String&gt; map) {
       return map;
    }
}

</code></pre>`,8),s=[a];function i(p,l){return n(),e("div",null,s)}const g=t(o,[["render",i],["__file","spring-controller.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/springboot/spring-controller.html","title":"springboot使用controller传递参数","lang":"zh-CN","frontmatter":{"description":"springboot使用controller传递参数 提示 see https://github.com/yzqdev/spring-tutor/tree/dev/spring-transfer 额外内容 AntPathMatcher和PathPattern的区别 详细文档见spring.io 基本传参方式 直接上代码 提示 注意 multipart/...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/spring-controller.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"springboot使用controller传递参数"}],["meta",{"property":"og:description","content":"springboot使用controller传递参数 提示 see https://github.com/yzqdev/spring-tutor/tree/dev/spring-transfer 额外内容 AntPathMatcher和PathPattern的区别 详细文档见spring.io 基本传参方式 直接上代码 提示 注意 multipart/..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"springboot使用controller传递参数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"基本传参方式","slug":"基本传参方式","link":"#基本传参方式","children":[]},{"level":2,"title":"map传参方式(不推荐)","slug":"map传参方式-不推荐","link":"#map传参方式-不推荐","children":[]}],"git":{"createdTime":1648641166000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.84,"words":551},"filePathRelative":"java-tutor/springboot/spring-controller.md","localizedDate":"2022年3月30日","autoDesc":true}');export{g as comp,d as data};
