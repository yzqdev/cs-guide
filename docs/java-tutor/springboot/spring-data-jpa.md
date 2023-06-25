# jpa教程

<https://segmentfault.com/a/1190000037755804>
首先了解Spring Date JPA是什么?

SpringData：其实SpringData就是Spring提供了一个操作数据的框架。而SpringData JPA只是SpringData框架下的一个基于JPA标准操作数据的模块。
SpringData JPA：基于JPA的标准数据进行操作。简化操作持久层的代码。只需要编写接口就可以。

JPA是Spring Data下的子项目,JPA是Java Persistence API的简称，中文名为Java持久层API，是JDK 5.0注解或XML描述对象－关系表的映射关系，并将运行期的实体对象持久化到数据库中

你可以理解为JPA和Mybatis是起相同作用的,都是持久层的框架,但是由于现在Mybatis的广泛应用,现在了解和使用JPA的人较少.

但在我使用的过程中,也发现其一些优势.

## 整合

#### 1. 导入jar包

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

#### 2. yml配置文件

```dts
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mytest
    type: com.alibaba.druid.pool.DruidDataSource
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver //驱动
  jpa:
    hibernate:
      ddl-auto: update //自动更新
    show-sql: true  //日志中显示sql语句
```

这里注意:
`jpa:hibernate:ddl-auto: update`是hibernate的配置属性，其主要作用是：自动创建、更新、验证数据库表结构。该参数的几种配置如下：

1. create：每次加载hibernate时都会删除上一次的生成的表，然后根据你的model类再重新来生成新表，哪怕两次没有任何改变也要这样执行，这就是导致数据库表数据丢失的一个重要原因。
2. create-drop：每次加载hibernate时根据model类生成表，但是sessionFactory一关闭,表就自动删除。
3. update：最常用的属性，第一次加载hibernate时根据model类会自动建立起表的结构（前提是先建立好数据库），以后加载hibernate时根据model类自动更新表结构，即使表结构改变了但表中的行仍然存在不会删除以前的行。要注意的是当部署到服务器后，表结构是不会被马上建立起来的，是要等应用第一次运行起来后才会。
4. validate：每次加载hibernate时，验证创建数据库表结构，只会和数据库中的表进行比较，不会创建新表，但是会插入新值。

**我在初次创建时会设为create,创建好后改为validate.**

#### 3.实体类

既然上边的参数可以帮助我们自动的去通过实体类来创建维护表,那么实体类该怎么写呢,又是怎么建立与表的映射

简单的创建一个实体类:get/set方法由注解实现

```java
@Entity
@Getter
@Setter
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "agee", length = 4)
    private int age;
}
```

创建好实体类并标注好注解后启动主启动类,应该就会在你配置的数据库中自动生成表.

#### 4. Repository接口

personRepository接口如下,

若只是简单的对单表进行crud只需要继承JpaRepository接口,传递了两个参数:1.实体类,2.实体类中主键类型

```java
public interface PersonRepository extends JpaRepository<Person, Long> {
}
```

但是当然,我们在工作使用中,不可能只是简单的根据字段查一下就可以了,当你需要传入整个实体类,在根据其中的所有属性进行动态复杂查询,那仅仅继承这个接口就不能满足我们的需求了,

就需要我们再去继承`JpaSpecificationExecutor<T>`该接口,泛型内传入实体类,只要简单实现`toPredicate`方法就可以实现复杂的查询,

该接口中提供了几个方法:

```java
public interface JpaSpecificationExecutor<T> {

    T findOne(Specification<T> spec);

    List<T> findAll(Specification<T> spec);

    Page<T> findAll(Specification<T> spec, Pageable pageable);

    List<T> findAll(Specification<T> spec, Sort sort);

    long count(Specification<T> spec);
}
```

方法中的`Specification`就是需要我们传进去的参数，它是一个接口,也是我们实现复杂查询的关键,其中只有一个方法`toPredicate`

```java
public interface Specification<T> {

    Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb);
}
```

其api编写可以参考:
[http://blog.csdn.net/dracotianlong/article/details/28445725](https://link.segmentfault.com/?enc=r05qZD5acNoUqNAnZib%2BPg%3D%3D.ICYoPanpFx1h4UshPIY005EW13XDmJd5ohahsQPAwikS%2BhefJYoYj2LIy26NBeUgEqCkcz0sqz61Lj4g8VxcQQ%3D%3D)
[http://developer.51cto.com/art/200911/162722.htm](https://link.segmentfault.com/?enc=ehFpQucHYmD6HRnd3qpTdg%3D%3D.UgVVFVz%2FtdjdHP3wgL6FAdzal3C1FE%2BoQwDJ7oln%2FJerjmADbCyrWvHJ3YBteaGdO7CiB08xJZwccapqiam%2BJg%3D%3D)

#### 5. Controller

然后我们可以直接在controller中编写代码即可(如果业务复杂,当然假如service层也是最好).

简单crud:

```typescript
@RestController
@RequestMapping(value = "person")
public class PerconController {

    @Autowired
    private PersonRepository personRepository;

    @PostMapping(path = "addPerson")
    public void addPerson(Person person) {
        personRepository.save(person);
    }

    @DeleteMapping(path = "deletePerson")
    public void deletePerson(Long id) {
        personRepository.delete(id);
    }
}
```

简单的crud甚至不需要在Repository中写代码,JpaRepository中已有封装好的直接使用即可.

那么我们怎么自己去编写一些简单的代码呢?

我们以根据name查询person为例:
在repository接口中添加如下查询方法：

1. 注意方法名一定是findBy+属性名

   ```java
   Person findByName(String name);
   ```

   还需要注意根据ID查找的findById是不用自己添加方法的,由接口已经封装,但是源码中返回的是Optional 类型。那么这个时候该如何获得T 实体类类型呢,只需要get()即可,就是`findById(Id).get()` 即返回T类型

2. 除了添加findBy这种不用写sql的方法外,还有一种可以自己编写sql的方法:

   可以在所添加的方法上通过@Query注解,在value属性上写sql语句来完成对数据库的操作,

   带参查询:（1、根据参数位置2、根据Param注解）

   ```java
      /**
        * 查询根据参数位置
        * @param name
        * @return
        */
       @Query(value = "select * from person  where name = ?1",nativeQuery = true)
       Person findPersonByName(String Name);
    
       /**
        * 查询根据Param注解
        * @param name
        * @return
        */
       @Query(value = "select p from person p where p.uname = :name")
       Person findPersonByNameTwo(@Param("name") String name);
   ```

   相信大家也注意到,在@Query中传入了一个属性nativeQuery,

   - @Query有nativeQuery=true，表示可执行的原生sql，原生sql指可以直接复制sql语句给参数赋值就能运行
   - @Query无nativeQuery=true， 表示不是原生sql，查询语句中的表名则是对应的项目中实体类的类名

**注意:**

对于自定义sql的删改方法,在方法上还要添加`@Transactional/@Modifying`注解,如下所示:

```java
@Transactional
@Modifying
@Query(value = "delete from Account where id =?1",nativeQuery = true)
void delAccount(int id);
```

**这里去了解了一下其生成sql的原理:**

其实JPA在这里遵循Convention over configuration（约定大约配置）的原则，遵循spring 以及JPQL定义的方法命名。Spring提供了一套可以通过命名规则进行查询构建的机制。这套机制会把方法名首先过滤一些关键字，比如 find…By, read…By, query…By, count…By 和 get…By 。系统会根据关键字将命名解析成2个子语句，第一个 By 是区分这两个子语句的关键词。这个 By 之前的子语句是查询子语句（指明返回要查询的对象），后面的部分是条件子语句。如果直接就是 findBy… 返回的就是定义Respository时指定的领域对象集合，同时JPQL中也定义了丰富的关键字：and、or、Between等等，下面我们来看一下JPQL中有哪些关键字：

> **Keyword Sample JPQL snippet**
>
> 1. And----findByLastnameAndFirstname----where x.lastname = ?1 and
> 2. Or----findByLastnameOrFirstname----where x.lastname = ?1 or x.firstname = ?2
> 3. Is,Equals----findByFirstnameIs,findByFirstnameEquals----where x.firstname = ?1
> 4. Between----findByStartDateBetween----where x.startDate between ?1 and ?2
> 5. javaThan----findByAgejavaThan----where x.age < ?1
> 6. javaThanEqual----findByAgejavaThanEqual----where x.age ⇐ ?1
> 7. GreaterThan----findByAgeGreaterThan----where x.age > ?1
> 8. GreaterThanEqual----findByAgeGreaterThanEqual----where x.age >= ?1
> 9. After----findByStartDateAfter----where x.startDate > ?1
> 10. Before----findByStartDateBefore----where x.startDate < ?1
> 11. IsNull----findByAgeIsNull----where x.age is null
> 12. IsNotNull,NotNull----findByAge(Is)NotNull----where x.age not null
> 13. Like----findByFirstnameLike----where x.firstname like ?1
> 14. NotLike----findByFirstnameNotLike----where x.firstname not like ?1
> 15. StartingWith----findByFirstnameStartingWith----where x.firstname like ?1 (parameter bound with appended %)
> 16. EndingWith----findByFirstnameEndingWith----where x.firstname like ?1 (parameter bound with prepended %)
> 17. Containing----findByFirstnameContaining----where x.firstname like ?1 (parameter bound wrapped in %)
> 18. OrderBy----findByAgeOrderByLastnameDesc----where x.age = ?1 order by x.lastname desc
> 19. Not----findByLastnameNot----where x.lastname <> ?1
> 20. In----findByAgeIn(Collection ages)----where x.age in ?1
> 21. NotIn----findByAgeNotIn(Collection age)----where x.age not in ?1
> 22. TRUE----findByActiveTrue()----where x.active = true
> 23. FALSE----findByActiveFalse()----where x.active = false
> 24. IgnoreCase----findByFirstnameIgnoreCase----where UPPER(x.firstame) = UPPER(?1)

复杂crud:

复杂crud的查询是依靠`JpaSpecificationExecutor<T>`接口,以及specification的`toPredicate`方法来添加条件,上文中也基本介绍过,所以在这里就简单贴一下代码,大家根据例子,应该就可以自己写了:

```java
    public List<Flow> queryFlows(int pageNo, int pageSize, String status, String userName, Date createTimeStart, Date createTimeEnd) {
        List<Flow> result = null;

        // 构造自定义查询条件
        Specification<Flow> queryCondition = new Specification<Flow>() {
            @Override
            public Predicate toPredicate(Root<Flow> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicateList = new ArrayList<>();
                if (userName != null) {
                    predicateList.add(criteriaBuilder.equal(root.get("currentOperator"), userName));
                }
                if (status != null) {
                    predicateList.add(criteriaBuilder.equal(root.get("status"), status));
                }
                if (createTimeStart != null && createTimeEnd != null) {
                    predicateList.add(criteriaBuilder.between(root.get("createTime"), createTimeStart, createTimeEnd));
                }
                if (orderId!= null) {
                    predicateList.add(criteriaBuilder.like(root.get("orderId"), "%" + orderId+ "%"));}
                return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };

        // 分页和不分页，这里按起始页和每页展示条数为0时默认为不分页，分页的话按创建时间降序
       
        if (pageNo == 0 && pageSize == 0) {
            result = flowRepository.findAll(queryCondition);
        } else {
            result = flowRepository.findAll(queryCondition, PageRequest.of(pageNo - 1, pageSize, Sort.by(Sort.Direction.DESC, "createTime"))).getContent();
        }
       
        return result;
    }
```

理解了之后其实很简单,上边主要就是两部:1.先将你所需要的条件加到predicate集合中去,例子中也有equal/between/like相等/区间/模糊,基本也是平常使用的几个,添加好条件后2.进行了分页,判断有没有传入分页的参数,所有传了就分页,没传就查全部,分页中有一个getContent(),可以不加,不加的话还会返回页数/总条数等一些分页的参数,加这个方法就只返回list集合.

## 补充

#### 分页

在上边说复杂查询的Repository接口时,其中的findAll方法,多传递一个pageable参数就可以自动的提供分页(pageable包含pageIndex和pageSize),相比较来说,省去了再引入pageHelper的步骤,更加简便.

但是这只是在复杂情况下进行一个分页,可是如果我们只是较简单的查询情况,例如只是用@Query注解来进行原生sql的查询时,该怎么去分页呢?

[https://www.cnblogs.com/hdwang/p/7843405.html](https://link.segmentfault.com/?enc=hTbC1%2FrRI%2BivboTycA1%2BEg%3D%3D.%2FcAgvqY2qSqnA50XqDAQ%2FuxPoSTaLwwzuGCHJ1mmcR2LHPRjylsPs2f2pQrhrOMa)大家可以参考这篇文章,方法比较全.

这篇文章中如果用@Query查询再进行分页时,一定要再@Query中添加countQuery属性,该属性通过查询去获取分页总数,这样分页就没问题了!

`countQuery`代表当前分页的总页数，如果不设置这个参数相信你的分页一定不顺利

如下所示:

```java
@Query(nativeQuery = true,
value = "select id, name,age FROM people WHERE id=?! and name=?2 and age=?3,
countQuery = "select count(*) FROM people WHERE id=?! and name=?2 and age=?3")
public Page findAll(Integer id,String name,Integer age,Pageable pageable);
```

如果既要分组group by,还要分页countQuery就需要: `countQuery = "select count(*) FROM (select count(*) FROM people WHERE id=?! and name=?2 and age=?3 group by name) a"`最后的a为别名,随意命名

如果不用()包裹再count(),返回的就是分组后每一行的count(),所以就需要再进行一步count()计算,才是分页的总数

注意,返回的Page对象要添加泛型,去规定返回的数据类型,若是没有泛型,返回的就是数组而不是对象.

但是需要注意:new PageRequest会发现已经过时,替代的方法是不要new PageRequest，而是直接用 PageRequest.of这个方法 根据你的需求选择入参；
