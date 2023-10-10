
# spring aop用法

## weblog

```java
 
  
import com.google.gson.Gson;  
import com.mybatisflex.core.util.ClassUtil;  
import com.mybatisflex.core.util.StringUtil;  
import jakarta.servlet.http.HttpServletRequest;  
import org.apache.ibatis.javassist.ClassPool;  
import org.apache.ibatis.javassist.CtClass;  
import org.apache.ibatis.javassist.CtMethod;  
import org.apache.ibatis.javassist.NotFoundException;  
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
  
  
  @Pointcut("execution(public * ab.yzq.flex.flexbatis.controller.*.*(..))")  
  public void webLog() {  
  }  
  
  @Around("webLog()")  
  public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {  
    ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();  
    HttpServletRequest request = attributes.getRequest();  
  
    MethodSignature signature = (MethodSignature) proceedingJoinPoint.getSignature();  
    Class<?> controllerClass = signature.getDeclaringType();  
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
      logInfo.append("\n");  
      logInfo.append("+========================================= Start ==========================================\n");  
      logInfo.append("| Request        : ").append(request.getMethod()).append(" ").append(url).append("\n");  
      logInfo.append("| Request Params : ").append(param).append("\n");  
      logInfo.append("| Request IP     : ").append(request.getRemoteAddr()).append("\n");  
      logInfo.append("| Controller     : ").append(signature.getDeclaringTypeName()).append(".").append("(").append(controllerClass.getSimpleName()).append(".java:").append(lineNumber).append(")").append("\n");  
      logInfo.append("| Method         : ").append(method.getName()).append(buildParamsString(method)).append("\n");  
      logInfo.append("| Response       : ").append(getResponseText(result)).append("\n");  
      logInfo.append("| Elapsed Time   : ").append(System.currentTimeMillis() - startTime).append("ms").append("\n");  
      logInfo.append("+========================================== End ===========================================\n");  
      System.out.println(logInfo);  
    }  
    return result;  
  }  
  
  private static String getResponseText(Object result) {  
    if (result instanceof ModelAndView && ((ModelAndView) result).isReference()) {  
      return ((ModelAndView) result).getViewName();  
    }  
  
    String originalText;  
    Gson gson = new Gson();  
    if (result instanceof String) {  
      originalText = (String) result;  
    } else {  
      originalText = gson.toJson(result);  
    }  
  
    if (StringUtil.isBlank(originalText)) {  
      return "";  
    }  
  
    originalText = originalText.replace("\n", "");  
  
    if (originalText.length() > 100) {  
      return originalText.substring(0, 100) + "...";  
    }  
  
    return originalText;  
  }  
  
  
  private String buildParamsString(Method method) {  
    StringJoiner joiner = new StringJoiner(", ", "(", ")");  
    for (Class<?> parameterType : method.getParameterTypes()) {  
      joiner.add(parameterType.getSimpleName());  
    }  
    return joiner.toString();  
  }  
  
  
  private int getLineNumber(Class<?> controllerClass, Method method) throws NotFoundException {  
    CtClass ctClass = ClassPool.getDefault().get(ClassUtil.getUsefulClass(controllerClass).getName());  
    ClassPool.getDefault().get(ClassUtil.getUsefulClass(controllerClass).getName());  
    String desc = WebLogUtil.getMethodDescWithoutName(method);  
    CtMethod ctMethod = ctClass.getMethod(method.getName(), desc);  
    return ctMethod.getMethodInfo().getLineNumber(0);  
  }  
  
  
  private String getRequestParamsString(HttpServletRequest request) {  
    StringBuilder sb = new StringBuilder();  
    Enumeration<String> e = request.getParameterNames();  
    if (e.hasMoreElements()) {  
      while (e.hasMoreElements()) {  
        String name = e.nextElement();  
        String[] values = request.getParameterValues(name);  
        if (values.length == 1) {  
          sb.append(name).append("=");  
          if (values[0] != null && values[0].length() > maxOutputLengthOfParaValue) {  
            sb.append(values[0], 0, maxOutputLengthOfParaValue).append("...");  
          } else {  
            sb.append(values[0]);  
          }  
        } else {  
          sb.append(name).append("[]={");  
          for (int i = 0; i < values.length; i++) {  
            if (i > 0) {  
              sb.append(",");  
            }  
            sb.append(values[i]);  
          }  
          sb.append("}");  
        }  
        sb.append("  ");  
      }  
    }  
    return sb.toString();  
  }  
  
}
```

## weblogutil

```java
public final class WebLogUtil {  
  
    /**  
     * void(V).     */    public static final char JVM_VOID = 'V';  
  
    /**  
     * boolean(Z).     */    public static final char JVM_BOOLEAN = 'Z';  
  
    /**  
     * byte(B).     */    public static final char JVM_BYTE = 'B';  
  
    /**  
     * char(C).     */    public static final char JVM_CHAR = 'C';  
  
    /**  
     * double(D).     */    public static final char JVM_DOUBLE = 'D';  
  
    /**  
     * float(F).     */    public static final char JVM_FLOAT = 'F';  
  
    /**  
     * int(I).     */    public static final char JVM_INT = 'I';  
  
    /**  
     * long(J).     */    public static final char JVM_LONG = 'J';  
  
    /**  
     * short(S).     */    public static final char JVM_SHORT = 'S';  
  
  
    /**  
     * get class desc.     * boolean[].class => "[Z"     * Object.class => "Ljava/lang/Object;"     *     * @param c class.  
     * @return desc.  
     */    public static String getDesc(Class<?> c) {  
        StringBuilder ret = new StringBuilder();  
  
        while (c.isArray()) {  
            ret.append('[');  
            c = c.getComponentType();  
        }  
  
        if (c.isPrimitive()) {  
            String t = c.getName();  
            if ("void".equals(t)) {  
                ret.append(JVM_VOID);  
            } else if ("boolean".equals(t)) {  
                ret.append(JVM_BOOLEAN);  
            } else if ("byte".equals(t)) {  
                ret.append(JVM_BYTE);  
            } else if ("char".equals(t)) {  
                ret.append(JVM_CHAR);  
            } else if ("double".equals(t)) {  
                ret.append(JVM_DOUBLE);  
            } else if ("float".equals(t)) {  
                ret.append(JVM_FLOAT);  
            } else if ("int".equals(t)) {  
                ret.append(JVM_INT);  
            } else if ("long".equals(t)) {  
                ret.append(JVM_LONG);  
            } else if ("short".equals(t)) {  
                ret.append(JVM_SHORT);  
            }  
        } else {  
            ret.append('L');  
            ret.append(c.getName().replace('.', '/'));  
            ret.append(';');  
        }  
        return ret.toString();  
    }  
  
  
    /**  
     * get method desc.     * "(I)I", "()V", "(Ljava/lang/String;Z)V"     *     * @param m method.  
     * @return desc.  
     */    public static String getMethodDescWithoutName(Method m) {  
        StringBuilder ret = new StringBuilder();  
        ret.append('(');  
        Class<?>[] parameterTypes = m.getParameterTypes();  
        for (int i = 0; i < parameterTypes.length; i++) {  
            ret.append(getDesc(parameterTypes[i]));  
        }  
        ret.append(')').append(getDesc(m.getReturnType()));  
        return ret.toString();  
    }  
  
}
```