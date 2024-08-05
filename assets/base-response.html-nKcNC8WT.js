import{_ as e,c as t,o as n,d as s}from"./app-CbULZrmi.js";const o={},a=s(`<h1 id="一些封装" tabindex="-1"><a class="header-anchor" href="#一些封装"><span>一些封装</span></a></h1><h2 id="统一返回值" tabindex="-1"><a class="header-anchor" href="#统一返回值"><span>统一返回值</span></a></h2><ol><li>统一状态码</li></ol><pre><code class="language-java">  
 
  
import lombok.AllArgsConstructor;  
import lombok.Getter;  
  
/**  
 * API 统一返回状态码  
 */  
  
@Getter  
@AllArgsConstructor  
public enum ResultCode {  
    /* 成功状态码 */    SUCCESS(0, &quot;Request is successful&quot;),  
    FAIL(1, &quot;Request is failed&quot;),  
    TOKEN_INVALID(40001, &quot;Token is null or invalid&quot;),  
    ACCESS_DENIED(40003, &quot;Access denied&quot;),  
    FAIL4DELETE(50001, &quot;Delete failed&quot;),  
    FAIL4UPDATE(50002, &quot;Update failed&quot;);  
  
    private Integer code;  
    private String message;  
  
  
  
}
</code></pre><ol start="2"><li>返回封装</li></ol><pre><code class="language-java">  
import java.io.Serializable;  
import java.time.LocalDateTime;  
import java.time.format.DateTimeFormatter;  
import java.util.HashMap;  
  
/**  
 * @author yzqde  
 */public class RestResponse&lt;T&gt; implements Serializable {  
  private int code;  
  private String message;  
  private T data;  
  
  
  private HashMap&lt;String, String&gt; time;  
  
  public RestResponse() {  
  
  }  
  
  public static RestResponse success() {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setResultCode(ResultCode.SUCCESS);  
    restResponse.setTime(new HashMap&lt;&gt;(16) {{  
      put(&quot;timestamp&quot;, String.valueOf(System.currentTimeMillis()));  
      put(&quot;datetime&quot;, LocalDateTime.now().format(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    }});  
  
    return restResponse;  
  }  
  
  public static &lt;T&gt; RestResponse&lt;T&gt; success(T data) {  
    RestResponse&lt;T&gt; restResponse = new RestResponse&lt;T&gt;();  
    restResponse.setResultCode(ResultCode.SUCCESS);  
    restResponse.setData(data);  
    restResponse.setTime(new HashMap&lt;&gt;(16) {{  
      put(&quot;timestamp&quot;, String.valueOf(System.currentTimeMillis()));  
      put(&quot;datetime&quot;,LocalDateTime.now().format(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    }});  
    return restResponse;  
  }  
  
  public static RestResponse fail() {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setResultCode(ResultCode.FAIL);  
    restResponse.setTime(new HashMap&lt;&gt;(16) {{  
      put(&quot;timestamp&quot;, String.valueOf(System.currentTimeMillis()));  
      put(&quot;datetime&quot;,LocalDateTime.now().format(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    }});  
    return restResponse;  
  }  
  
  
  public static RestResponse fail(ResultCode resultCode) {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setResultCode(resultCode);  
    restResponse.setTime(new HashMap&lt;&gt;(16) {{  
      put(&quot;timestamp&quot;, String.valueOf(System.currentTimeMillis()));  
      put(&quot;datetime&quot;,LocalDateTime.now().format(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    }});  
    return restResponse;  
  }  
  
  public static RestResponse fail(String message) {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setCode(ResultCode.FAIL.code());  
    restResponse.setMessage(message);  
    restResponse.setTime(new HashMap&lt;&gt;(16) {{  
      put(&quot;timestamp&quot;, String.valueOf(System.currentTimeMillis()));  
      put(&quot;datetime&quot;,LocalDateTime.now().format(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    }});  
    return restResponse;  
  }  
  
  public static RestResponse fail(Integer code, String message) {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setCode(code);  
    restResponse.setMessage(message);  
    restResponse.setTime(new HashMap&lt;&gt;(16) {{  
      put(&quot;timestamp&quot;, String.valueOf(System.currentTimeMillis()));  
      put(&quot;datetime&quot;,LocalDateTime.now().format(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    }});  
    return restResponse;  
  }  
  
  public static RestResponse fail(ResultCode resultCode, Object data) {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setResultCode(resultCode);  
    restResponse.setData(data);  
    restResponse.setTime(new HashMap&lt;&gt;(16) {{  
      put(&quot;timestamp&quot;, String.valueOf(System.currentTimeMillis()));  
      put(&quot;datetime&quot;,LocalDateTime.now().format(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;)));  
    }});  
    return restResponse;  
  }  
  
  private void setResultCode(ResultCode resultCode) {  
    this.code = resultCode.code();  
    this.message = resultCode.message();  
  }  
  
  public void setData(T data) {  
    this.data = data;  
  }  
  
  public T getData() {  
    return data;  
  }  
  
  public int getCode() {  
    return code;  
  }  
  
  public void setCode(int code) {  
    this.code = code;  
  }  
  
  public String getMessage() {  
    return message;  
  }  
  
  public void setMessage(String message) {  
    this.message = message;  
  }  
  
  public HashMap&lt;String, String&gt; getTime() {  
    return time;  
  }  
  
  public void setTime(HashMap&lt;String, String&gt; time) {  
  
  
    this.time = time;  
  }  
}
</code></pre><h2 id="一种简单的方法" tabindex="-1"><a class="header-anchor" href="#一种简单的方法"><span>一种简单的方法</span></a></h2><pre><code class="language-java"> 
  
import lombok.Data;  
  
import java.time.LocalDateTime;  
import java.time.format.DateTimeFormatter;  
  
/**  
 * @author yzqde  
 */@Data  
public class RestResponse&lt;T&gt; {  
  // 约定好的，业务状态响应码。  
  private int code;  
  // 业务状态提示信息。  
  private String msg;  
  
  private T data; //接口处理完成后，返回的数据结果。  
  private String timestamp;  
  
  public RestResponse(ResultCode code, T data) {  
    this.code = code.getCode();  
    this.msg = code.getMessage();  
    this.data = data;  
    this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;));  
  }  
  
  public static &lt;T&gt; RestResponse&lt;T&gt; success(T data) {  
    return new RestResponse&lt;T&gt;(ResultCode.SUCCESS, data);  
  }  
  
  public static &lt;T&gt; RestResponse&lt;T&gt; error(T data) {  
    return new RestResponse&lt;T&gt;(ResultCode.FAIL, data);  
  }  
  
  public static &lt;T&gt; RestResponse&lt;T&gt; error(ResultCode code, T data) {  
    return new RestResponse&lt;T&gt;(code, data);  
  }  
  
}
</code></pre><h2 id="使用controlleradvice" tabindex="-1"><a class="header-anchor" href="#使用controlleradvice"><span>使用controllerAdvice</span></a></h2><pre><code class="language-java">@ControllerAdvice
public class BaseResponseBodyAdvice implements ResponseBodyAdvice&lt;Object&gt; {


    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType,
            MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request,
            ServerHttpResponse response) {

        // 遇到feign接口之类的请求, 不应该再次包装,应该直接返回
        // 上述问题的解决方案: 可以在feign拦截器中,给feign请求头中添加一个标识字段, 表示是feign请求
        // 在此处拦截到feign标识字段, 则直接放行 返回body.

        System.out.println(&quot;响应拦截成功&quot;);
        
        // 如果返回值是String类型，那就手动把Result对象转换成JSON字符串
        if(body instanceof String){
        return this.objectMapper.writeValueAsString(Result.success(body));
        }else if (body instanceof BaseResponse) {
            return body;
        } else if (body == null) {
            return BaseResponse.ok();
        } else {
            return BaseResponse.ok(body);
        }
    }
}

</code></pre>`,10),r=[a];function i(l,p){return n(),t("div",null,r)}const d=e(o,[["render",i],["__file","base-response.html.vue"]]),c=JSON.parse('{"path":"/java-tutor/springboot/tips/base-response.html","title":"一些封装","lang":"zh-CN","frontmatter":{"description":"一些封装 统一返回值 统一状态码 返回封装 一种简单的方法 使用controllerAdvice","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/tips/base-response.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"一些封装"}],["meta",{"property":"og:description","content":"一些封装 统一返回值 统一状态码 返回封装 一种简单的方法 使用controllerAdvice"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-24T22:53:46.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-24T22:53:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一些封装\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-24T22:53:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"统一返回值","slug":"统一返回值","link":"#统一返回值","children":[]},{"level":2,"title":"一种简单的方法","slug":"一种简单的方法","link":"#一种简单的方法","children":[]},{"level":2,"title":"使用controllerAdvice","slug":"使用controlleradvice","link":"#使用controlleradvice","children":[]}],"git":{"createdTime":1696590718000,"updatedTime":1719269626000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":5}]},"readingTime":{"minutes":2.44,"words":732},"filePathRelative":"java-tutor/springboot/tips/base-response.md","localizedDate":"2023年10月6日","autoDesc":true}');export{d as comp,c as data};
