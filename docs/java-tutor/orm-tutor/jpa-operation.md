# jpa操作

## 更新(update)

```java
@Modifying
@Query("update User u set u.firstname = ?1, u.lastname = ?2 where u.id = ?3")
void setUserInfoById(String firstname, String lastname, Integer userId);

```

或者使用save,但是必须带有id

```java
public void updateUser(Userinfos u) {
    User userFromDb = userRepository.findById(u.getid());
    // crush the variables of the object found
    userFromDb.setFirstname("john"); 
    userFromDb.setLastname("dew");
    userFromDb.setAge(16);
    userRepository.save(userFromDb);
}
```


## jpa的dialect


只有sqlite需要community dialect,其他的hibernate-core包含了


### sqlite


```
驱动

implementation("org.xerial:sqlite-jdbc")
implementation("org.hibernate.orm:hibernate-community-dialects")
```

下面需要依赖`org.hibernate.orm:hibernate-community-dialects`

```
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  
#org.hibernate.community.dialect  
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect  
spring.datasource.url=jdbc:sqlite:./demo-sqlite.db  
#spring.datasource.url=jdbc:sqlite:${user.home}/demo-sqlite.db  
spring.datasource.username=  
spring.datasource.password=  
spring.datasource.driver-class-name=org.sqlite.JDBC
```

### postgres

```
驱动
runtimeOnly("org.postgresql:postgresql")
```

```
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  
#org.hibernate.community.dialect  
spring.datasource.username=postgres  
spring.datasource.password=123456  
spring.datasource.driver-class-name=org.postgresql.Driver  
spring.datasource.url=jdbc:postgresql://localhost:5432/rose?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&characterSetResults=utf8&useSSL=false
```


### mariadb

```
驱动
runtimeOnly("org.mariadb.jdbc:mariadb-java-client")
```

```
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  
#org.hibernate.community.dialect  
spring.jpa.database-platform=org.hibernate.dialect.MariaDBDialect  
spring.datasource.username=postgres  
spring.datasource.password=123456  
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver  
spring.datasource.url=jdbc:mariadb://localhost:3307/rose?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&characterSetResults=utf8&useSSL=false
```

### mysql

```
驱动

```