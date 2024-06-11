# 过滤器

SpringMVC中的Filter两个基类GenericFilterBean与OncePerRequestFilter
## 定义Filter

```java
@Component
@Order(1)
public class TransactionFilter implements Filter {

    @Override
    public void doFilter(
      ServletRequest request, 
      ServletResponse response, 
      FilterChain chain) throws ServletException {
 
        HttpServletRequest req = (HttpServletRequest) request;
        LOG.info(
          "Starting a transaction for req : {}", 
          req.getRequestURI());
 
        chain.doFilter(request, response);
        LOG.info(
          "Committing a transaction for req : {}", 
          req.getRequestURI());
    }

    // other methods 
}


```

## FilterRegistrationBean

```java
@Bean
public FilterRegistrationBean<RequestResponseLoggingFilter> loggingFilter(){
    FilterRegistrationBean<RequestResponseLoggingFilter> registrationBean 
      = new FilterRegistrationBean<>();
        
    registrationBean.setFilter(new RequestResponseLoggingFilter());
    registrationBean.addUrlPatterns("/users/*");
    registrationBean.setOrder(2);
        
    return registrationBean;    
}
```