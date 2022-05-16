# jpa教程生成id

## jpa使用雪花id生成

```java
package im.zhaojun.zfile.util;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.annotation.PostConstruct;
import java.io.Serializable;

/**
 * 雪花算法ID生成器
 * @author mr ying
 */
@SuppressWarnings("all")
@Component
public class SnowFlakeIdGenerator implements IdentifierGenerator {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    /**
     * 起始的时间戳
     */
    private final long twepoch = 1557825652094L;

    /**
     * 每一部分占用的位数
     */
    private final long workerIdBits = 5L;
    private final long datacenterIdBits = 5L;
    private final long sequenceBits = 12L;

    /**
     * 每一部分的最大值
     */
    private final long maxWorkerId = -1L ^ (-1L << workerIdBits);
    private final long maxDatacenterId = -1L ^ (-1L << datacenterIdBits);
    private final long maxSequence = -1L ^ (-1L << sequenceBits);

    /**
     * 每一部分向左的位移
     */
    private final long workerIdShift = sequenceBits;
    private final long datacenterIdShift = sequenceBits + workerIdBits;
    private final long timestampShift = sequenceBits + workerIdBits + datacenterIdBits;

    @Value("${snowflake.datacenter-id:1}")
    private long datacenterId; // 数据中心ID

    @Value("${snowflake.worker-id:0}")
    private long workerId; // 机器ID

    private long sequence = 0L; // 序列号
    private long lastTimestamp = -1L; // 上一次时间戳

    @PostConstruct
    public void init() {
        String msg;
        if (workerId > maxWorkerId || workerId < 0) {
            msg = String.format("worker Id can't be greater than %d or less than 0", maxWorkerId);
            logger.error(msg);
        }
        if (datacenterId > maxDatacenterId || datacenterId < 0) {
            msg = String.format("datacenter Id can't be greater than %d or less than 0", maxDatacenterId);
            logger.error(msg);
        }
    }

    @Transactional
    public synchronized long nextId() {
        long timestamp = timeGen();
        if (timestamp < lastTimestamp) {
            try {
                throw new Exception(String.format(
                        "Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - timestamp));
            } catch (Exception e) {
                e.printStackTrace();
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            }
        }
        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & maxSequence;
            if (sequence == 0L) {
                timestamp = tilNextMillis();
            }
        } else {
            sequence = 0L;
        }
        lastTimestamp = timestamp;

        return (timestamp - twepoch) << timestampShift // 时间戳部分
                | datacenterId << datacenterIdShift // 数据中心部分
                | workerId << workerIdShift // 机器标识部分
                | sequence; // 序列号部分
    }

    private long tilNextMillis() {
        long timestamp = timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = timeGen();
        }
        return timestamp;
    }

    private long timeGen() {
        return System.currentTimeMillis();
    }
 
 //重写IdentifierGenerator的方法
    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object o) throws HibernateException {
        return String.valueOf(nextId());
    }

}

```

然后在`application.yml`配置

```yml
#雪花算法
snowflake:
  datacenter-id: 1
  worker-id: 0
```

使用

```java
    @Id
    @GenericGenerator(name = "idGenerator", strategy = "im.zhaojun.zfile.util.SnowFlakeIdGenerator")
    @GeneratedValue(generator = "idGenerator")
    private String id;
```

## 1.spring boot+jpa项目的构建

请参考[spring boot+jpa简单实现](https://www.jianshu.com/p/b7c0115889ba)

## 2.@Id+@GeneratedValue四种id生成策略

使用`GenerationType.IDENTITY`(mysql要设置成自增)

```java
package com.dancer4code.actuator.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "student")
public class Student implements Serializable{
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    private Integer age;
}
```

JPA提供四种标准用法,由@GeneratedValue的源代码：

```kotlin
    @Target({METHOD,FIELD})    
    @Retention(RUNTIME)    
    public @interface GeneratedValue{    
        GenerationType strategy() default AUTO;    
        String generator() default "";    
    }   
```

其中GenerationType:

```swift
public enum GenerationType{    
    TABLE,    
    SEQUENCE,    
    IDENTITY,    
    AUTO   
} 
```

JPA提供的四种标准用法为`TABLE`,`SEQUENCE`,`IDENTITY`,`AUTO`.

- TABLE：使用一个特定的数据库表格来保存主键。
   GenerationType.TABLE：使用一个特定的数据库表格来保存主键,持久化引擎通过关系数据库的一张特定的表格来生成主键,这种策略的好处就是不依赖于外部环境和数据库的具体实现,在不同数据库间可以很容易的进行移植,但由于其不能充分利用数据库的特性,所以不会优先使用。该策略一般与另外一个注解一起使用@TableGenerator,@TableGenerator注解指定了生成主键的表(可以在实体类上指定也可以在主键字段或属性上指定),然后JPA将会根据注解内容自动生成一张表作为序列表(或使用现有的序列表)。如果不指定序列表,则会生成一张默认的序列表,表中的列名也是自动生成,数据库上会生成一张名为sequence的表(SEQ_NAME,SEQ_COUNT)。序列表一般只包含两个字段:第一个字段是该生成策略的名称,第二个字段是该关系表的最大序号,它会随着数据的插入逐渐累加。例如：

```kotlin
@Id  
@GeneratedValue(strategy = GenerationType.TABLE, generator = "id_sequence")  
@TableGenerator(name = "id_sequence", allocationSize = 1, table = "sequence_table", pkColumnName = "sequence_max_id", valueColumnName = "sequence_count")  
private int id;
```

- SEQUENCE：根据底层数据库的序列来生成主键，条件是数据库支持序列。
   GenerationType.SEQUENCE：在某些数据库中,不支持主键自增长,比如Oracle,其提供了一种叫做"序列(sequence)"的机制生成主键。此时,GenerationType.SEQUENCE就可以作为主键生成策略。该策略的不足之处正好与TABLE相反,由于只有部分数据库(Oracle,PostgreSQL,DB2)支持序列对象,所以该策略一般不应用于其他数据库。类似的,该策略一般与另外一个注解一起使用@SequenceGenerator,@SequenceGenerator注解指定了生成主键的序列.然后JPA会根据注解内容创建一个序列(或使用一个现有的序列)。如果不指定序列,则会自动生成一个序列SEQ_GEN_SEQUENCE。例如：

```kotlin
@Id  
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_sequence")  
@SequenceGenerator(name = "id_sequence", initialValue = 1, allocationSize = 1, sequenceName = "ID_SEQUENCE")  
private int id;
```

- IDENTITY：主键由数据库自动生成（主要是自动增长型）
   GenerationType.IDENTITY：此种主键生成策略就是通常所说的主键自增长,数据库在插入数据时,会自动给主键赋值,比如MYSQL可以在创建表时声明"auto_increment" 来指定主键自增长。该策略在大部分数据库中都提供了支持(指定方法或关键字可能不同),但还是有少数数据库不支持,所以可移植性略差。使用自增长主键生成策略是只需要声明strategy = GenerationType.IDENTITY即可。例如：

```java
@Id  
@GeneratedValue(strategy = GenerationType.IDENTITY)  
private int id;
```

- AUTO：主键由程序控制。
   GenerationType.AUTO：把主键生成策略交给持久化引擎(persistence engine),持久化引擎会根据数据库在以上三种主键生成策略中选择其中一种。此种主键生成策略比较常用,由于JPA默认的生成策略就是GenerationType.AUTO,所以使用此种策略时.可以显式的指定@GeneratedValue(strategy = GenerationType.AUTO)也可以直接@GeneratedValue。例如：

```tsx
//如果不指定具体的生成规则，则默认为AUTO，即下列两种情况等价
@Id  
@GeneratedValue(strategy = GenerationType.AUTO) 
private String id;

@Id  
private String id;
```

常用数据库支持生成规则如下：

|                         | mysql | Oracle | PostgreSQL |
| :---------------------: | :---: | :----: | :--------: |
|  GenerationType.TABLE   |   √   |   √    |     √      |
|   GenerationType.AUTO   |   √   |   √    |     √      |
| GenerationType.IDENTITY |   √   |   x    |     √      |
| GenerationType.SEQUENCE |   x   |   √    |     √      |

## 3.Hibernate主键策略生成

hibernate-5.3.7.Final版本的默认工厂中有`14种`生成策略,具体可见org.hibernate.id.factory.internal.DefaultIdentifierGeneratorFactory

```java
public DefaultIdentifierGeneratorFactory() {
        register( "uuid2", UUIDGenerator.class );
        register( "guid", GUIDGenerator.class );            // can be done with UUIDGenerator + strategy
        register( "uuid", UUIDHexGenerator.class );         // "deprecated" for new use
        register( "uuid.hex", UUIDHexGenerator.class );     // uuid.hex is deprecated
        register( "assigned", Assigned.class );
        register( "identity", IdentityGenerator.class );
        register( "select", SelectGenerator.class );
        register( "sequence", SequenceStyleGenerator.class );
        register( "seqhilo", SequenceHiLoGenerator.class );
        register( "increment", IncrementGenerator.class );
        register( "foreign", ForeignGenerator.class );
        register( "sequence-identity", SequenceIdentityGenerator.class );
        register( "enhanced-sequence", SequenceStyleGenerator.class );
        register( "enhanced-table", TableGenerator.class );
    }
```

对几种比较常用的类型进行说明：

- uuid
   采用128位的uuid算法生成主键，uuid被编码为一个32位16进制数字的字符串。
   当使用strategy为uuid时，使用的时hibernate自己定义的UUID生成算法，此策略已过时，其具体实现参照org.hibernate.id. UUIDHexGenerator, 生成的字符串如402880876359adeb016359ae27190000当使用strategy为uuid2时，此为此版本推荐使用的uuid生成算法，其默认采用标准的生成策略StandardRandomStrategy，实现为使用jdk自带的uuid生成方法，生成的字符串如4af17c8e-8317-43e9-aff9-12d5590a71c6

```kotlin
@Id
@GeneratedValue(generator = "faceset_generator")
@GenericGenerator(name = "faceset_generator", strategy = "uuid")
```

- assigned
   插入主键时，由程序来指定。相当于JPA中的AUTO。

```kotlin
@Id
@GeneratedValue(generator = "faceset_generator")
@GenericGenerator(name = "faceset_generator", strategy = "assigned")
```

- sequence

```kotlin
@Id
@GeneratedValue(generator = "faceset_generator")  
@GenericGenerator(name = "faceset_generator", strategy = "sequence",    parameters = { @Parameter(name = "sequence", value = "faceset_seq") }) 
```

- guid
   采用数据库底层的guid算法机制，对应MYSQL的uuid()函数，SQL Server的newid()函数，ORACLE的rawtohex(sys_guid())函数等

来自[SpringDataJpa-主键生成策略](https://www.jianshu.com/p/ee87671a492b)

## 4.自定义主键生成策略

```dart
package com.dancer4code.actuator.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: liangqing.zhao(zlq)
 * Date: 2019/10/4 17:14
 * Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "student")

public class Student implements Serializable{
    @Id
    @GenericGenerator(name = "my_id", strategy = "com.dancer4code.actuator.utils.MyIdGenerator" )
    @GeneratedValue(generator = "my_id")
    private String id;
    private String name;
    private Integer age;
}
```

*MyIdGenerator.java*

```swift
package com.dancer4code.actuator.utils;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 * User: liangqing.zhao(zlq)
 * Date: 2019/10/4 19:01
 * Description:
 */
public class MyIdGenerator implements IdentifierGenerator {
    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        return "d4c-"+UUID.randomUUID();
    }
}
```

*成功实现自己的id生成*

![img](https:////upload-images.jianshu.io/upload_images/19382524-45ae6b26ffdb8023.png?imageMogr2/auto-orient/strip|imageView2/2/w/495/format/webp)

result

源码见gitee中[spring-boot-lab](https://links.jianshu.com/go?to=https%3A%2F%2Fgitee.com%2Fdancer4code%2Fspring-boot-lab)

如果还不够用请参考雪花算法
 更多其他内容请参考[分布式全局唯一ID生成策略](https://www.jianshu.com/p/9d7ebe37215e)
