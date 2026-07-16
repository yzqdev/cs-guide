---
order: 16
---

# Quartz 定时任务

> Spring Boot 整合 Quartz 实现定时任务调度。

## Quartz 简介

Quartz 是一个功能丰富的开源任务调度库，支持：

- 简单定时器（SimpleTrigger）
- Cron 表达式（CronTrigger）
- 持久化任务
- 集群部署
- 任务监听

## 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```

## 方式一：使用 @Scheduled（推荐）

Spring Boot 内置了简化的定时任务支持，适合简单场景。

### 开启定时任务

```java
@SpringBootApplication
@EnableScheduling  // 开启定时任务
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 创建定时任务

```java
@Component
@Slf4j
public class ScheduledTasks {

    // 固定延迟执行（上次执行完成后延迟 5 秒）
    @Scheduled(fixedDelay = 5000)
    public void taskWithFixedDelay() {
        log.info("固定延迟任务执行: {}", LocalDateTime.now());
    }

    // 固定频率执行（每 5 秒执行一次，不考虑上次执行时间）
    @Scheduled(fixedRate = 5000)
    public void taskWithFixedRate() {
        log.info("固定频率任务执行: {}", LocalDateTime.now());
    }

    // 初始延迟后开始
    @Scheduled(fixedRate = 5000, initialDelay = 10000)
    public void taskWithInitialDelay() {
        log.info("延迟启动的定时任务: {}", LocalDateTime.now());
    }

    // 使用 Cron 表达式
    @Scheduled(cron = "0 0 9 * * ?")  // 每天早上 9 点执行
    public void taskWithCron() {
        log.info("Cron 任务执行: {}", LocalDateTime.now());
    }

    @Scheduled(cron = "0 */5 * * * ?")  // 每 5 分钟执行一次
    public void taskEvery5Minutes() {
        log.info("每5分钟执行一次");
    }
}
```

### Cron 表达式说明

```
 ┌───────────── 秒 (0-59)
 │ ┌───────────── 分 (0-59)
 │ │ ┌───────────── 时 (0-23)
 │ │ │ ┌───────────── 日 (1-31)
 │ │ │ │ ┌───────────── 月 (1-12)
 │ │ │ │ │ ┌───────────── 星期 (1-7 或 SUN-SAT)
 │ │ │ │ │ │
 * * * * * *
```

| 示例 | 说明 |
|------|------|
| `0 0 9 * * ?` | 每天早上 9 点 |
| `0 0/30 8-10 * * ?` | 8-10 点每 30 分钟 |
| `0 0 2 * * ?` | 每天凌晨 2 点 |
| `0 0 0 1 * ?` | 每月 1 号凌晨 |
| `0 0 0 ? * MON` | 每周一凌晨 |
| `0 0/5 * * * ?` | 每 5 分钟 |

## 方式二：使用 Quartz API

### 1. 创建 Job

```java
public class PrintTimeJob implements Job {

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDataMap dataMap = context.getJobDetail().getJobDataMap();
        String jobName = dataMap.getString("jobName");
        System.out.println("任务 " + jobName + " 执行时间: " + LocalDateTime.now());
    }
}
```

### 2. 配置 Job 和 Trigger

```java
@Configuration
public class QuartzConfig {

    @Bean
    public JobDetail printTimeJobDetail() {
        return JobBuilder.newJob(PrintTimeJob.class)
                .withIdentity("printTimeJob")
                .usingJobData("jobName", "打印时间任务")
                .storeDurably()
                .build();
    }

    @Bean
    public Trigger printTimeJobTrigger() {
        // 每 10 秒执行一次
        return TriggerBuilder.newTrigger()
                .forJob(printTimeJobDetail())
                .withIdentity("printTimeTrigger")
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInSeconds(10)
                        .repeatForever())
                .build();
    }

    @Bean
    public JobDetail cronJobDetail() {
        return JobBuilder.newJob(PrintTimeJob.class)
                .withIdentity("cronJob")
                .storeDurably()
                .build();
    }

    @Bean
    public Trigger cronJobTrigger() {
        // Cron 表达式：每天中午 12 点执行
        return TriggerBuilder.newTrigger()
                .forJob(cronJobDetail())
                .withIdentity("cronTrigger")
                .withSchedule(CronScheduleBuilder.cronSchedule("0 0 12 * * ?"))
                .build();
    }
}
```

## 动态创建和删除任务

```java
@Component
public class DynamicJobService {

    @Autowired
    private Scheduler scheduler;

    // 动态创建任务
    public void addJob(String jobName, String cronExpression) throws SchedulerException {
        JobDetail jobDetail = JobBuilder.newJob(PrintTimeJob.class)
                .withIdentity(jobName, "default")
                .usingJobData("jobName", jobName)
                .storeDurably()
                .build();

        CronTrigger trigger = TriggerBuilder.newTrigger()
                .withIdentity(jobName + "Trigger", "default")
                .withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }

    // 暂停任务
    public void pauseJob(String jobName) throws SchedulerException {
        scheduler.pauseJob(JobKey.jobKey(jobName, "default"));
    }

    // 恢复任务
    public void resumeJob(String jobName) throws SchedulerException {
        scheduler.resumeJob(JobKey.jobKey(jobName, "default"));
    }

    // 删除任务
    public void deleteJob(String jobName) throws SchedulerException {
        scheduler.deleteJob(JobKey.jobKey(jobName, "default"));
    }
}
```

## 参考链接

- [Quartz 官方文档](http://www.quartz-scheduler.org/documentation/)
- [Spring Boot Quartz 集成指南](https://docs.spring.io/spring-boot/docs/current/reference/html/io.html#io.quartz)
- [Cron 表达式生成器](https://cron.qqe2.com/)