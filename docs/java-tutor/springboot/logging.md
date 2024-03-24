# 日志管理

springboot 默认使用 logback 作为日志框架，默认的日志级别是 info，默认的日志文件是 spring.log

## 配置文件

下面是一个好看的日志文件配置  
logback-spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="10 seconds" debug="false">
  <!--引入相关依赖-->
  <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

  <!--引入Spring配置文件属性-->
  <springProperty scope="context" name="appName" source="spring.application.name" defaultValue="spring"/>
  <springProperty scope="context" name="rootLogLevel" source="logging.level.root" defaultValue="INFO"/>

  <!--全局属性:日志输出路径目前是写死的!,配置文件不可配-->
  <property name="log_home" value="logs"/>
  <property name="app_name" value="${appName}"/>
  <property name="root_log_level" value="${rootLogLevel}"/>

  <contextName>${app_name}-logback</contextName>

  <!--彩色日志-->
  <!--彩色日志依赖的渲染类-->
  <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter"/>
  <conversionRule conversionWord="wex"
                  converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter"/>
  <conversionRule conversionWord="wEx"
                  converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter"/>
  <!--彩色日志格式-->
  <property name="colorPatternA"
            value="%boldMagenta(%clr(%d{yyyy-MM-dd HH:mm:ss.Asia/Shanghai}){faint}) %yellow(%-5level){yellow} %clr(${PID:- }) %red(%thread) %blue(%logger{36}:%line) %magenta(➢) %cyan(%msg%n)"/>
  <property name="colorPatternB"
            value="%boldMagenta(%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint}) %yellow(%5.5level){yellow} %magenta(➢) %red([%thread]) %cyan(%-50.50logger{49} [%2.2line]): %msg%n"/>
  <property name="colorPatternC"
            value="%boldBlue(%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint}) %boldGreen(%-5level) %boldRed(➢) %cyan(%-60(%.-10thread - %.-51logger{26})) %boldMagenta([%2.2line]): %msg%n"/>
  <!--非彩色日志格式-->
  <property name="noColorPatternA"
            value="%d{yyyy-MM-dd HH:mm:ss.Asia/Shanghai} %-5level ${PID:- } %thread %logger{36}:%line ➢ %msg%n"/>
  <property name="noColorPatternB"
            value="%d{yyyy-MM-dd HH:mm:ss.SSS} %5.5level ➢ [%thread] %-50.50logger{49} [%2.2line]: %msg%n"/>
  <property name="noColorPatternC"
            value="%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level ➢ %-60(%.-10thread - %.-51logger{26}) [%2.2line]: %msg%n"/>

  <!--控制台实时输出,采用高亮语法,用于开发环境-->
  <appender name="console_appender" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>${colorPatternC}</pattern>
      <charset>UTF-8</charset>
    </encoder>
    <!--此日志文件只记录ERROR级别的-->
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
      <level>INFO</level>
      <onMatch>ACCEPT</onMatch>
    </filter>
  </appender>
  <!--控制台异步实时输出-->
  <appender name="async_console_appender" class="ch.qos.logback.classic.AsyncAppender">
    <includeCallerData>true</includeCallerData>
    <!--不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志-->
    <discardingThreshold>0</discardingThreshold>
    <!--更改默认的队列的深度,该值会影响性能.默认值为256-->
    <queueSize>512</queueSize>
    <!--如果设置为true，队列满了会直接丢弃信息，而不是阻塞（其实就是使用的offer而不是put方法）-->
    <neverBlock>true</neverBlock>
    <!--添加附加的appender,最多只能添加一个-->
    <appender-ref ref="console_appender"/>
  </appender>

  <!--整个项目的所有日志输出到文件-->
  <appender name="file_root_appender" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <encoder>
      <pattern>${noColorPatternC}</pattern>
      <charset>UTF-8</charset>
    </encoder>
    <!--日志记录器的滚动策略，按日期，按大小记录-->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${log_home}/%d{yyyy-MM-dd}/test-root.log</fileNamePattern>
    </rollingPolicy>
  </appender>
  <!--整个项目的所有日志异步输出到文件-->
  <appender name="async_file_root_appender" class="ch.qos.logback.classic.AsyncAppender">
    <includeCallerData>true</includeCallerData>
    <!--不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志-->
    <discardingThreshold>0</discardingThreshold>
    <!--更改默认的队列的深度,该值会影响性能.默认值为256-->
    <queueSize>512</queueSize>
    <!--如果设置为true，队列满了会直接丢弃信息，而不是阻塞（其实就是使用的offer而不是put方法）-->
    <neverBlock>true</neverBlock>
    <!--添加附加的appender,最多只能添加一个-->
    <appender-ref ref="file_root_appender"/>
  </appender>

  <!--整个项目的ERROR日志异步输出到文件-->
  <appender name="file_error_appender" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <encoder>
      <pattern>${noColorPatternC}</pattern>
      <charset>UTF-8</charset>
    </encoder>
    <!--日志记录器的滚动策略，按日期，按大小记录-->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>${log_home}/%d{yyyy-MM-dd}/test-error.log</fileNamePattern>
    </rollingPolicy>
    <!--此日志文件只记录ERROR级别的-->
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
      <level>ERROR</level>
      <onMatch>ACCEPT</onMatch>
      <onMismatch>DENY</onMismatch>
    </filter>
  </appender>
  <!--整个项目的ERROR日志异步输出到文件-->
  <appender name="async_file_error_appender" class="ch.qos.logback.classic.AsyncAppender">
    <includeCallerData>true</includeCallerData>
    <!--不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志-->
    <discardingThreshold>0</discardingThreshold>
    <!--更改默认的队列的深度,该值会影响性能.默认值为256-->
    <queueSize>512</queueSize>
    <!--如果设置为true，队列满了会直接丢弃信息，而不是阻塞（其实就是使用的offer而不是put方法）-->
    <neverBlock>true</neverBlock>
    <!--添加附加的appender,最多只能添加一个-->
    <appender-ref ref="file_error_appender"/>
  </appender>

  <!-- 设置需要打印日志的包及输出级别 -->
  <logger name="com.jiangxianfly.service.FileDataService" level="OFF"> </logger>

  <!--根logger,只接受下级level以上日志信息-->
  <root level="${root_log_level}">
    <appender-ref ref="async_console_appender"/>
    <appender-ref ref="async_file_root_appender"/>
    <appender-ref ref="async_file_error_appender"/>
  </root>
</configuration>

```
