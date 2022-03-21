# springboot升级

## 1.jpa语法升级

原来需要这样

```java
Sort sort=new Sort();
```

Sort，page改为静态方法使用方法如下：

```java
Sort sort=Sort.by("age").ascending();
List<User> userList = userJpaRepository.findAll(example, sort);

Page<User> userPage = userPagingAndSortingRepository.findAll(PageRequest.of(1, 2));
```

### jpa查询语法升级

1、T findOne(ID id) 已取消，改为 `Optional<S> findOne(Example<S> example)和Optional<T> findById(ID id)`，返回的都是Optional对象。使用如下

```java
public ActivityEntity get(Integer id) {
 ActivityEntity activity = new ActivityEntity();
 activity.setId(id);
 activity.setUpperLimit(11);
 Example<ActivityEntity> example = Example.of(activity);
 activity = repository.findOne(example).orElse(null);
 return activity;
}
```

findOne(example)方法可以实现多字段匹配查询

```java
public ActivityEntity get(Integer id) {
 return repository.findById(id).orElse(null);
}
```

## 单元测试语法升级

```java
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)//这里更改为
//@ExtendWith(SpringExtension.class)
public class HttpClientAutoConfigurationTest {
    @Autowired
    private HttpClient httpClient;

    @Test
    public void test() throws ClientProtocolException, IOException {
        HttpEntity httpEntity = httpClient.execute(new HttpGet("http://www.baidu.com")).getEntity();
        String content = EntityUtils.toString(httpEntity, "utf-8");
        System.out.println(content);
        Assert.notNull(content);
        //变为   Assertions.assertNotNull(userResultList);
    }
}

```

## 配置文件

出现错误解决方案
[https://lotabout.me/2018/Maven-Profile-and-Spring-Profile/](https://lotabout.me/2018/Maven-Profile-and-Spring-Profile/)
maven配置
在build下添加

```xml
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <!--先排除所有的配置文件-->
                <excludes>
                    <exclude>application*.yml</exclude>
                </excludes>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <!--引入所需环境的配置文件-->
                <filtering>true</filtering>
                <includes>
                    <include>application.yml</include>
                    <include>application-${activatedProperties}.yml</include>
                </includes>
            </resource>
        </resources>

```

然后添加profile

```xml


<profiles>
        <profile>
            <id>dev</id>
            <properties>
                <activatedProperties>dev</activatedProperties>
            </properties>
            <!-- 这里代表默认使用dev环境配置文件 -->
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <profile>
            <id>test</id>
            <properties>
                <activatedProperties>test</activatedProperties>
            </properties>
        </profile>
        <profile>
            <id>prod</id>
            <properties>
                <activatedProperties>prod</activatedProperties>
            </properties>
        </profile>
    </profiles>
```

application.properties

```java
spring.profiles.active=@activatedProperties@
```
