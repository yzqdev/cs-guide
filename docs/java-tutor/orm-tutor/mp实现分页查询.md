# mybatis教程

## 引入依赖

```xml
<!-- 引入mybatisPlus -->
     　　<dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.2.0</version>
        </dependency>
        <!-- 引入mysql驱动包 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.27</version>
        </dependency>
        <!-- 引入Druid依赖，阿里巴巴所提供的数据源 -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.0.29</version>
　　　　</dependency>
```

 在application.yml配置

```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=UTF-8
    username: root
    password: 123456
```

 在启动类上面添加@MapperScan注解，扫描mapper包

```java
@SpringBootApplication
@MapperScan("com.qiao.demo02.mapper")
public class SpringbootDemo02Application {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootDemo02Application.class, args);
    }

}
```

新建User和UserMapper

```java
@Data
public class User {
    @TableId
    private Integer userId;
    private String userName;
    private Integer userAge;
    private String userEmail;
}
```

usermapper

```java
public interface UserMapper extends BaseMapper<User> {
 
}
```

最重要的是继承`BaseMapper<E>`接口：里面声明了很强大的CRUD方法

```java
public interface BaseMapper<T> extends Mapper<T> {
    int insert(T entity);

    int deleteById(Serializable id);

    int deleteByMap(@Param("cm") Map<String, Object> columnMap);

    int delete(@Param("ew") Wrapper<T> wrapper);

    int deleteBatchIds(@Param("coll") Collection<? extends Serializable> idList);

    int updateById(@Param("et") T entity);

    int update(@Param("et") T entity, @Param("ew") Wrapper<T> updateWrapper);

    T selectById(Serializable id);

    List<T> selectBatchIds(@Param("coll") Collection<? extends Serializable> idList);

    List<T> selectByMap(@Param("cm") Map<String, Object> columnMap);

    T selectOne(@Param("ew") Wrapper<T> queryWrapper);

    Integer selectCount(@Param("ew") Wrapper<T> queryWrapper);

    List<T> selectList(@Param("ew") Wrapper<T> queryWrapper);

    List<Map<String, Object>> selectMaps(@Param("ew") Wrapper<T> queryWrapper);

    List<Object> selectObjs(@Param("ew") Wrapper<T> queryWrapper);

    IPage<T> selectPage(IPage<T> page, @Param("ew") Wrapper<T> queryWrapper);

    IPage<Map<String, Object>> selectMapsPage(IPage<T> page, @Param("ew") Wrapper<T> queryWrapper);
}
```

分页查询[https://baomidou.com/pages/8f40ae/](https://baomidou.com/pages/8f40ae/)

```java
@Configuration
public class MybatisPlusConfig {

    /**
     * 新的分页插件,一缓和二缓遵循mybatis的规则,需要设置 MybatisConfiguration#useDeprecatedExecutor = false 避免缓存出现问题
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }
}

```

然后就可以使用分页了

```java
@Resource
    private UserMapper userMapper;
    @Test
    public void queryUserForPage(){
        IPage<User> userPage = new Page<>(2, 2);//参数一是当前页，参数二是每页个数
        userPage = userMapper.selectPage(userPage, null);
        List<User> list = userPage.getRecords();
        for(User user : list){
            System.out.println(user);
        }
    }
```

**Controller返回json串**
先定义一个包装类UserVo，用来保存分页所需要的数据

```java
package com.qiao.demo02.vo;

@Data
public class UserVo {
    private Integer current;
    private Integer size;
    private Long total;
    private List<User> userList;
}
```

然后在控制器编写代码，这里省略了service层，实际开发业务代码写在service层，Controller只负责：接受参数、调用service层方法处理业务逻辑，返回结果
Controller类贴上了@RestController注解

```java
@GetMapping("queryUser")
    public UserVo queryList(Integer current, Integer size) {
        /**
         * 这些代码应该写在service层
         */
        UserVo userVo = new UserVo();
        IPage<User> page = new Page<>(current, size);
        userMapper.selectPage(page, null);
        userVo.setCurrent(current);
        userVo.setSize(size);
        userVo.setTotal(page.getTotal());
        userVo.setUserList(page.getRecords());
        return userVo;
    }
```
