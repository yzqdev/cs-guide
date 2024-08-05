import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const a={},r=o(`<h1 id="spring-aop用法" tabindex="-1"><a class="header-anchor" href="#spring-aop用法"><span>spring aop用法</span></a></h1><p>需要安装</p><pre><code>implementation(&quot;org.javassist:javassist:3.29.2-GA&quot;)
</code></pre><h2 id="weblog" tabindex="-1"><a class="header-anchor" href="#weblog"><span>weblog</span></a></h2><pre><code class="language-java"> 
  
import com.fasterxml.jackson.core.JsonProcessingException;  
import com.fasterxml.jackson.databind.ObjectMapper;  
  
import jakarta.servlet.http.HttpServletRequest;  
import javassist.ClassPool;  
import javassist.CtClass;  
import javassist.CtMethod;  
import javassist.NotFoundException;  
  
  
import org.aspectj.lang.ProceedingJoinPoint;  
import org.aspectj.lang.annotation.Around;  
import org.aspectj.lang.annotation.Aspect;  
import org.aspectj.lang.annotation.Pointcut;  
import org.aspectj.lang.reflect.MethodSignature;  
import org.springframework.stereotype.Component;  
import org.springframework.web.context.request.RequestContextHolder;  
import org.springframework.web.context.request.ServletRequestAttributes;  
import org.springframework.web.servlet.ModelAndView;  
  
import java.lang.reflect.Method;  
import java.util.Enumeration;  
import java.util.StringJoiner;  
  
@Aspect  
@Component  
public class WebLogAspect {  
  
  private static int maxOutputLengthOfParaValue = 512;  
  
  
  @Pointcut(&quot;execution(public * ab.yzq.jv.mini.controller.*.*(..))&quot;)  
  public void webLog() {  
  }  
  
  @Around(&quot;webLog()&quot;)  
  public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {  
    ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();  
    HttpServletRequest request = attributes.getRequest();  
  
    MethodSignature signature = (MethodSignature) proceedingJoinPoint.getSignature();  
    Class&lt;?&gt; controllerClass = signature.getDeclaringType();  
    Method method = signature.getMethod();  
  
    String url = request.getRequestURL().toString();  
    String param = getRequestParamsString(request);  
  
    int lineNumber = getLineNumber(controllerClass, method);  
  
  
    long startTime = System.currentTimeMillis();  
    Object result = null;  
    try {  
      result = proceedingJoinPoint.proceed();  
    } finally {  
      StringBuilder logInfo = new StringBuilder();  
      logInfo.append(&quot;\\n&quot;);  
      logInfo.append(&quot;+========================================= Start ==========================================\\n&quot;);  
      logInfo.append(&quot;| Request        : &quot;).append(request.getMethod()).append(&quot; &quot;).append(url).append(&quot;\\n&quot;);  
      logInfo.append(&quot;| Request Params : &quot;).append(param).append(&quot;\\n&quot;);  
      logInfo.append(&quot;| Request IP     : &quot;).append(request.getRemoteAddr()).append(&quot;\\n&quot;);  
      logInfo.append(&quot;| Controller     : &quot;).append(signature.getDeclaringTypeName()).append(&quot;.&quot;).append(&quot;(&quot;).append(controllerClass.getSimpleName()).append(&quot;.java:&quot;).append(lineNumber).append(&quot;)&quot;).append(&quot;\\n&quot;);  
      logInfo.append(&quot;| Method         : &quot;).append(method.getName()).append(buildParamsString(method)).append(&quot;\\n&quot;);  
      logInfo.append(&quot;| Response       : &quot;).append(getResponseText(result)).append(&quot;\\n&quot;);  
      logInfo.append(&quot;| Elapsed Time   : &quot;).append(System.currentTimeMillis() - startTime).append(&quot;ms&quot;).append(&quot;\\n&quot;);  
      logInfo.append(&quot;+========================================== End ===========================================\\n&quot;);  
      System.out.println(logInfo);  
    }  
    return result;  
  }  
  
  private static String getResponseText(Object result) throws JsonProcessingException {  
    if (result instanceof ModelAndView &amp;&amp; ((ModelAndView) result).isReference()) {  
      return ((ModelAndView) result).getViewName();  
    }  
  
    String originalText;  
    ObjectMapper objectMapper=new ObjectMapper();  
    if (result instanceof String) {  
      originalText = (String) result;  
    } else {  
      originalText = objectMapper.writeValueAsString(result);  
    }  
  
    if (originalText.isBlank()) {  
      return &quot;&quot;;  
    }  
  
    originalText = originalText.replace(&quot;\\n&quot;, &quot;&quot;);  
  
    if (originalText.length() &gt; 100) {  
      return originalText.substring(0, 100) + &quot;...&quot;;  
    }  
  
    return originalText;  
  }  
  
  
  private String buildParamsString(Method method) {  
    StringJoiner joiner = new StringJoiner(&quot;, &quot;, &quot;(&quot;, &quot;)&quot;);  
    for (Class&lt;?&gt; parameterType : method.getParameterTypes()) {  
      joiner.add(parameterType.getSimpleName());  
    }  
    return joiner.toString();  
  }  
  
  
  private int getLineNumber(Class&lt;?&gt; controllerClass, Method method) throws NotFoundException {  
  
    CtClass cc  = ClassPool.getDefault().get(controllerClass .getName());  
  
    CtMethod methodX = cc.getDeclaredMethod(method.getName());  
    int xlineNumber = methodX.getMethodInfo().getLineNumber(0);  
    return  xlineNumber;  
  }  
  
  
  private String getRequestParamsString(HttpServletRequest request) {  
    StringBuilder sb = new StringBuilder();  
    Enumeration&lt;String&gt; e = request.getParameterNames();  
    if (e.hasMoreElements()) {  
      while (e.hasMoreElements()) {  
        String name = e.nextElement();  
        String[] values = request.getParameterValues(name);  
        if (values.length == 1) {  
          sb.append(name).append(&quot;=&quot;);  
          if (values[0] != null &amp;&amp; values[0].length() &gt; maxOutputLengthOfParaValue) {  
            sb.append(values[0], 0, maxOutputLengthOfParaValue).append(&quot;...&quot;);  
          } else {  
            sb.append(values[0]);  
          }  
        } else {  
          sb.append(name).append(&quot;[]={&quot;);  
          for (int i = 0; i &lt; values.length; i++) {  
            if (i &gt; 0) {  
              sb.append(&quot;,&quot;);  
            }  
            sb.append(values[i]);  
          }  
          sb.append(&quot;}&quot;);  
        }  
        sb.append(&quot;  &quot;);  
      }  
    }  
    return sb.toString();  
  }  
  
}
</code></pre><h2 id="weblogutil" tabindex="-1"><a class="header-anchor" href="#weblogutil"><span>weblogutil</span></a></h2><pre><code class="language-java">public final class WebLogUtil {  
  
    /**  
     * void(V).     */    public static final char JVM_VOID = &#39;V&#39;;  
  
    /**  
     * boolean(Z).     */    public static final char JVM_BOOLEAN = &#39;Z&#39;;  
  
    /**  
     * byte(B).     */    public static final char JVM_BYTE = &#39;B&#39;;  
  
    /**  
     * char(C).     */    public static final char JVM_CHAR = &#39;C&#39;;  
  
    /**  
     * double(D).     */    public static final char JVM_DOUBLE = &#39;D&#39;;  
  
    /**  
     * float(F).     */    public static final char JVM_FLOAT = &#39;F&#39;;  
  
    /**  
     * int(I).     */    public static final char JVM_INT = &#39;I&#39;;  
  
    /**  
     * long(J).     */    public static final char JVM_LONG = &#39;J&#39;;  
  
    /**  
     * short(S).     */    public static final char JVM_SHORT = &#39;S&#39;;  
  
  
    /**  
     * get class desc.     * boolean[].class =&gt; &quot;[Z&quot;     * Object.class =&gt; &quot;Ljava/lang/Object;&quot;     *     * @param c class.  
     * @return desc.  
     */    public static String getDesc(Class&lt;?&gt; c) {  
        StringBuilder ret = new StringBuilder();  
  
        while (c.isArray()) {  
            ret.append(&#39;[&#39;);  
            c = c.getComponentType();  
        }  
  
        if (c.isPrimitive()) {  
            String t = c.getName();  
            if (&quot;void&quot;.equals(t)) {  
                ret.append(JVM_VOID);  
            } else if (&quot;boolean&quot;.equals(t)) {  
                ret.append(JVM_BOOLEAN);  
            } else if (&quot;byte&quot;.equals(t)) {  
                ret.append(JVM_BYTE);  
            } else if (&quot;char&quot;.equals(t)) {  
                ret.append(JVM_CHAR);  
            } else if (&quot;double&quot;.equals(t)) {  
                ret.append(JVM_DOUBLE);  
            } else if (&quot;float&quot;.equals(t)) {  
                ret.append(JVM_FLOAT);  
            } else if (&quot;int&quot;.equals(t)) {  
                ret.append(JVM_INT);  
            } else if (&quot;long&quot;.equals(t)) {  
                ret.append(JVM_LONG);  
            } else if (&quot;short&quot;.equals(t)) {  
                ret.append(JVM_SHORT);  
            }  
        } else {  
            ret.append(&#39;L&#39;);  
            ret.append(c.getName().replace(&#39;.&#39;, &#39;/&#39;));  
            ret.append(&#39;;&#39;);  
        }  
        return ret.toString();  
    }  
  
  
    /**  
     * get method desc.     * &quot;(I)I&quot;, &quot;()V&quot;, &quot;(Ljava/lang/String;Z)V&quot;     *     * @param m method.  
     * @return desc.  
     */    public static String getMethodDescWithoutName(Method m) {  
        StringBuilder ret = new StringBuilder();  
        ret.append(&#39;(&#39;);  
        Class&lt;?&gt;[] parameterTypes = m.getParameterTypes();  
        for (int i = 0; i &lt; parameterTypes.length; i++) {  
            ret.append(getDesc(parameterTypes[i]));  
        }  
        ret.append(&#39;)&#39;).append(getDesc(m.getReturnType()));  
        return ret.toString();  
    }  
  
}
</code></pre>`,7),i=[r];function p(s,l){return n(),t("div",null,i)}const g=e(a,[["render",p],["__file","spring-aop.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/springboot/spring-aop.html","title":"spring aop用法","lang":"zh-CN","frontmatter":{"description":"spring aop用法 需要安装 weblog weblogutil","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/springboot/spring-aop.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"spring aop用法"}],["meta",{"property":"og:description","content":"spring aop用法 需要安装 weblog weblogutil"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-18T14:23:02.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-10-18T14:23:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"spring aop用法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-18T14:23:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"weblog","slug":"weblog","link":"#weblog","children":[]},{"level":2,"title":"weblogutil","slug":"weblogutil","link":"#weblogutil","children":[]}],"git":{"createdTime":1696975127000,"updatedTime":1697638982000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":2.09,"words":628},"filePathRelative":"java-tutor/springboot/spring-aop.md","localizedDate":"2023年10月10日","autoDesc":true}');export{g as comp,d as data};
