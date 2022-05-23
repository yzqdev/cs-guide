# spring-security

用过`WebSecurityConfigurerAdapter`的都知道对**Spring Security**十分重要，总管**Spring Security**的配置体系。但是马上这个类要废了，你没有看错，这个类将在5.7版本被`@Deprecated`所标记了，未来这个类将被移除。

 <https://github.com/spring-projects/spring-security/issues/10822>

## HttpSecurity语法对比

old：

```java
@Configuration
static class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .antMatcher("/**")
            .authorizeRequests(authorize -> authorize
                    .anyRequest().authenticated()
            );
    }
}
```

new：

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
            .antMatcher("/**")
            .authorizeRequests(authorize -> authorize
                    .anyRequest().authenticated()
            )
            .build();
}
```

使用`WebSecurity.ignoring()`忽略某些URL请求，这些请求将被**Spring Security**忽略，这意味着这些URL将有受到 CSRF、XSS、Clickjacking 等攻击的可能。以下示例仅仅作为演示，请勿使用在生产环境。

old：

```java
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) {
        // 仅仅作为演示
        web.ignoring().antMatchers("/ignore1", "/ignore2");
    }

}
```

new：

```java
@Configuration
public class SecurityConfiguration {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // 仅仅作为演示
        return (web) -> web.ignoring().antMatchers("/ignore1", "/ignore2");
    }

}
```

> 如果你需要忽略URL，请考虑通过`HttpSecurity.authorizeHttpRequests`的`permitAll`来实现。

`AuthenticationManager`配置主要分为全局的（Global ）、本地的（Local）。

old:

```java
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication();
    }
}
```

上面是通过`WebSecurityConfigurerAdapter`开启的是本地配置。开启全局配置需要覆写其`authenticationManagerBean()`方法并标记为Bean:

```java
       @Bean(name name="myAuthenticationManager")
       @Override
       public AuthenticationManager authenticationManagerBean() throws Exception {
           return super.authenticationManagerBean();
       }
```

new:

本地配置通过`HttpSecurity.authenticationManager`实现：

```java
@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authz) -> authz
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults())
            .authenticationManager(new CustomAuthenticationManager());
    }

}
```

全局配置摆脱了依赖`WebSecurityConfigurerAdapter.authenticationManagerBean()`方法，只需要定义一个`AuthenticationManager`类型的Bean即可：

```java
    @Bean
    AuthenticationManager ldapAuthenticationManager(
            BaseLdapPathContextSource contextSource) {
        LdapBindAuthenticationManagerFactory factory = 
            new LdapBindAuthenticationManagerFactory(contextSource);
        factory.setUserDnPatterns("uid={0},ou=people");
        factory.setUserDetailsContextMapper(new PersonContextMapper());
        return factory.createAuthenticationManager();
    }
```

当然还可以通过自定义`GlobalAuthenticationConfigurerAdapter`并注入**Spring IoC**来修改`AuthenticationManagerBuilder`，不限制数量，但是要注意有排序问题。相关的思维导图：

![img](https:////upload-images.jianshu.io/upload_images/15440995-c543c03c897c15a1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)
