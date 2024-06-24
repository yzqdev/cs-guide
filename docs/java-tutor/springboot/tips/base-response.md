# 一些封装

## 统一返回值


1. 统一状态码

```java
  
 
  
import lombok.AllArgsConstructor;  
import lombok.Getter;  
  
/**  
 * API 统一返回状态码  
 */  
  
@Getter  
@AllArgsConstructor  
public enum ResultCode {  
    /* 成功状态码 */    SUCCESS(0, "Request is successful"),  
    FAIL(1, "Request is failed"),  
    TOKEN_INVALID(40001, "Token is null or invalid"),  
    ACCESS_DENIED(40003, "Access denied"),  
    FAIL4DELETE(50001, "Delete failed"),  
    FAIL4UPDATE(50002, "Update failed");  
  
    private Integer code;  
    private String message;  
  
  
  
}
```

2. 返回封装
```java
  
import java.io.Serializable;  
import java.time.LocalDateTime;  
import java.time.format.DateTimeFormatter;  
import java.util.HashMap;  
  
/**  
 * @author yzqde  
 */public class RestResponse<T> implements Serializable {  
  private int code;  
  private String message;  
  private T data;  
  
  
  private HashMap<String, String> time;  
  
  public RestResponse() {  
  
  }  
  
  public static RestResponse success() {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setResultCode(ResultCode.SUCCESS);  
    restResponse.setTime(new HashMap<>(16) {{  
      put("timestamp", String.valueOf(System.currentTimeMillis()));  
      put("datetime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
    }});  
  
    return restResponse;  
  }  
  
  public static <T> RestResponse<T> success(T data) {  
    RestResponse<T> restResponse = new RestResponse<T>();  
    restResponse.setResultCode(ResultCode.SUCCESS);  
    restResponse.setData(data);  
    restResponse.setTime(new HashMap<>(16) {{  
      put("timestamp", String.valueOf(System.currentTimeMillis()));  
      put("datetime",LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
    }});  
    return restResponse;  
  }  
  
  public static RestResponse fail() {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setResultCode(ResultCode.FAIL);  
    restResponse.setTime(new HashMap<>(16) {{  
      put("timestamp", String.valueOf(System.currentTimeMillis()));  
      put("datetime",LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
    }});  
    return restResponse;  
  }  
  
  
  public static RestResponse fail(ResultCode resultCode) {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setResultCode(resultCode);  
    restResponse.setTime(new HashMap<>(16) {{  
      put("timestamp", String.valueOf(System.currentTimeMillis()));  
      put("datetime",LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
    }});  
    return restResponse;  
  }  
  
  public static RestResponse fail(String message) {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setCode(ResultCode.FAIL.code());  
    restResponse.setMessage(message);  
    restResponse.setTime(new HashMap<>(16) {{  
      put("timestamp", String.valueOf(System.currentTimeMillis()));  
      put("datetime",LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
    }});  
    return restResponse;  
  }  
  
  public static RestResponse fail(Integer code, String message) {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setCode(code);  
    restResponse.setMessage(message);  
    restResponse.setTime(new HashMap<>(16) {{  
      put("timestamp", String.valueOf(System.currentTimeMillis()));  
      put("datetime",LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
    }});  
    return restResponse;  
  }  
  
  public static RestResponse fail(ResultCode resultCode, Object data) {  
    RestResponse restResponse = new RestResponse();  
    restResponse.setResultCode(resultCode);  
    restResponse.setData(data);  
    restResponse.setTime(new HashMap<>(16) {{  
      put("timestamp", String.valueOf(System.currentTimeMillis()));  
      put("datetime",LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));  
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
  
  public HashMap<String, String> getTime() {  
    return time;  
  }  
  
  public void setTime(HashMap<String, String> time) {  
  
  
    this.time = time;  
  }  
}
```


## 一种简单的方法


```java
 
  
import lombok.Data;  
  
import java.time.LocalDateTime;  
import java.time.format.DateTimeFormatter;  
  
/**  
 * @author yzqde  
 */@Data  
public class RestResponse<T> {  
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
    this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));  
  }  
  
  public static <T> RestResponse<T> success(T data) {  
    return new RestResponse<T>(ResultCode.SUCCESS, data);  
  }  
  
  public static <T> RestResponse<T> error(T data) {  
    return new RestResponse<T>(ResultCode.FAIL, data);  
  }  
  
  public static <T> RestResponse<T> error(ResultCode code, T data) {  
    return new RestResponse<T>(code, data);  
  }  
  
}
```


## 使用controllerAdvice
```java
@ControllerAdvice
public class BaseResponseBodyAdvice implements ResponseBodyAdvice<Object> {


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

        System.out.println("响应拦截成功");
        
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

```