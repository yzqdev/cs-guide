# JPA 高级特性

> 审计 Auditing、实体事件监听、二级缓存、多数据源等高级用法。

## 审计（Auditing）

Spring Data JPA 提供了自动填充创建人、创建时间、修改人、修改时间的功能。

### 启用审计

```java
@Configuration
@EnableJpaAuditing  // 启用 JPA 审计
public class JpaConfig {
}
```

### 定义审计字段

```java
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.*;

@Entity
@EntityListeners(AuditingEntityListener.class)  // 必须添加
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 创建时间（自动填充，不可更新）
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    // 最后修改时间（自动填充）
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // 创建人（自动填充）
    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    // 最后修改人（自动填充）
    @LastModifiedBy
    private String lastModifiedBy;
}
```

### 配置创建人获取方式

```java
@Component
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        // 从 Spring Security 获取当前登录用户
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return Optional.of("system");
        }
        return Optional.of(auth.getName());
    }
}
```

### 抽取公共基类

```java
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@MappedSuperclass               // 公共父类，不映射为单独的表
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    @LastModifiedBy
    private String lastModifiedBy;
}

// 使用
@Entity
public class User extends BaseEntity {
    private String username;
    private String email;
    // 自动拥有 id, createdAt, updatedAt, createdBy, lastModifiedBy
}
```

## 实体生命周期回调

| 注解 | 触发时机 | 用途 |
|------|---------|------|
| `@PrePersist` | INSERT 之前 | 设置创建时间 |
| `@PostPersist` | INSERT 之后 | 日志记录 |
| `@PreUpdate` | UPDATE 之前 | 设置修改时间 |
| `@PostUpdate` | UPDATE 之后 | 日志记录 |
| `@PreRemove` | DELETE 之前 | 级联检查 |
| `@PostRemove` | DELETE 之后 | 日志记录 |
| `@PostLoad` | 查询加载后 | 初始化计算字段 |

```java
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @Transient  // 不持久化到数据库
    private String summary;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        System.out.println("文章创建前: " + title);
    }

    @PostPersist
    public void postPersist() {
        System.out.println("文章已创建: id=" + id);
    }

    @PostLoad
    public void postLoad() {
        // 从内容中提取前 100 字作为摘要
        if (content != null && content.length() > 100) {
            this.summary = content.substring(0, 100) + "...";
        } else {
            this.summary = content;
        }
    }

    // 或在实体监听器中实现（适合多个实体共享）
}
```

### 外部实体监听器

```java
public class AuditListener {

    @PrePersist
    public void beforePersist(Object entity) {
        System.out.println("保存前: " + entity.getClass().getSimpleName());
    }

    @PostLoad
    public void afterLoad(Object entity) {
        System.out.println("加载后: " + entity.getClass().getSimpleName());
    }
}

// 使用
@Entity
@EntityListeners(AuditListener.class)
public class User {
    // ...
}
```

## 二级缓存（Second-Level Cache）

Hibernate 二级缓存可减少数据库查询：

```xml
<!-- 引入依赖 -->
<dependency>
    <groupId>org.hibernate.orm</groupId>
    <artifactId>hibernate-jcache</artifactId>
</dependency>
<dependency>
    <groupId>org.ehcache</groupId>
    <artifactId>ehcache</artifactId>
</dependency>
```

```yaml
spring:
  jpa:
    properties:
      hibernate:
        cache:
          use_second_level_cache: true
          region.factory_class: org.hibernate.cache.jcache.JCacheRegionFactory
```

```java
@Entity
@Cacheable                         // 启用二级缓存
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User {
    // ...
}
```

## 多数据源配置

当需要连接多个数据库时：

```java
// ====== 配置第一个数据源 ======
@Configuration
@EnableJpaRepositories(
    basePackages = "com.example.repository.primary",
    entityManagerFactoryRef = "primaryEntityManagerFactory",
    transactionManagerRef = "primaryTransactionManager"
)
public class PrimaryDataSourceConfig {

    @Primary
    @Bean(name = "primaryDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.primary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Primary
    @Bean(name = "primaryEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean primaryEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("primaryDataSource") DataSource dataSource) {
        return builder
            .dataSource(dataSource)
            .packages("com.example.entity.primary")
            .persistenceUnit("primary")
            .build();
    }

    @Primary
    @Bean(name = "primaryTransactionManager")
    public PlatformTransactionManager primaryTransactionManager(
            @Qualifier("primaryEntityManagerFactory") EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);
    }
}

// ====== 配置第二个数据源 ======
@Configuration
@EnableJpaRepositories(
    basePackages = "com.example.repository.secondary",
    entityManagerFactoryRef = "secondaryEntityManagerFactory",
    transactionManagerRef = "secondaryTransactionManager"
)
public class SecondaryDataSourceConfig {

    @Bean(name = "secondaryDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.secondary")
    public DataSource secondaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "secondaryEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean secondaryEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("secondaryDataSource") DataSource dataSource) {
        return builder
            .dataSource(dataSource)
            .packages("com.example.entity.secondary")
            .persistenceUnit("secondary")
            .build();
    }
}
```

```yaml
spring:
  datasource:
    primary:
      url: jdbc:mysql://localhost:3306/db1
      username: root
      password: 123456
    secondary:
      url: jdbc:postgresql://localhost:5432/db2
      username: postgres
      password: 123456
```

## 练习

```java
// 1. 创建 BaseEntity 基类，包含 id、createdAt、updatedAt
// 2. 让所有实体继承 BaseEntity
// 3. 使用 @PrePersist / @PreUpdate 自动填充时间
// 4. 启用 @EnableJpaAuditing 并实现 AuditorAware
// 5. 在实体上添加 @Cacheable 启用二级缓存
```
