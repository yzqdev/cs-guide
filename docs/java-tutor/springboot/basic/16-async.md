---
title: "异步任务与定时任务"
order: 16
---

# 异步任务与定时任务

> Spring Boot 支持异步方法调用和定时任务调度，适用于后台处理、批处理等场景。

## 异步任务

### 启用异步

```java
@SpringBootApplication
@EnableAsync
public class MyApplication {}
```

### 异步方法

```java
@Service
public class AsyncService {

    @Async
    public CompletableFuture<String> processData(Long id) {
        log.info("异步处理开始: {}", id);
        try {
            Thread.sleep(3000);  // 模拟耗时操作
            String result = "处理完成: " + id;
            log.info("异步处理结束: {}", result);
            return CompletableFuture.completedFuture(result);
        } catch (InterruptedException e) {
            return CompletableFuture.failedFuture(e);
        }
    }

    @Async
    public void sendEmail(String to, String content) {
        log.info("发送邮件给: {}", to);
        // 邮件发送逻辑
    }

    @Async("taskExecutor")  // 指定线程池
    public void processWithCustomPool(String task) {
        log.info("使用自定义线程池处理: {}", task, Thread.currentThread().getName());
    }
}
```

### 调用异步方法

```java
@RestController
@RequestMapping("/api/async")
@RequiredArgsConstructor
public class AsyncController {

    private final AsyncService asyncService;

    @PostMapping("/process/{id}")
    public Result<String> startProcess(@PathVariable Long id) {
        asyncService.processData(id);  // 异步执行，立即返回
        return Result.success("任务已提交");
    }

    @PostMapping("/process/await/{id}")
    public Result<String> processAndWait(@PathVariable Long id) throws Exception {
        CompletableFuture<String> future = asyncService.processData(id);
        String result = future.get(5, TimeUnit.SECONDS);  // 等待结果
        return Result.success(result);
    }
}
```

### 自定义线程池

```java
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Override
    @Bean("taskExecutor")
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);                    // 核心线程数
        executor.setMaxPoolSize(10);                    // 最大线程数
        executor.setQueueCapacity(100);                 // 队列容量
        executor.setKeepAliveSeconds(60);               // 线程保持时间
        executor.setThreadNamePrefix("async-");         // 线程名前缀
        executor.setWaitForTasksToCompleteOnShutdown(true); // 等待任务完成再关闭
        executor.setAwaitTerminationSeconds(30);        // 最大等待时间
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (ex, method, params) ->
                log.error("异步方法执行异常: {}.{}", 
                        method.getDeclaringClass().getSimpleName(),
                        method.getName(), ex);
    }
}
```

### 异常处理

```java
@Component
@Slf4j
public class AsyncExceptionHandler implements AsyncUncaughtExceptionHandler {

    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
        log.error("异步方法 {}.{} 异常: {}",
                method.getDeclaringClass().getSimpleName(),
                method.getName(),
                ex.getMessage(), ex);
    }
}
```

## 定时任务

### 启用定时任务

```java
@SpringBootApplication
@EnableScheduling
public class MyApplication {}
```

### @Scheduled

```java
@Component
@Slf4j
public class ScheduledTasks {

    // 固定延迟（上次执行完成后延迟 5 秒）
    @Scheduled(fixedDelay = 5000)
    public void runWithFixedDelay() {
        log.info("fixedDelay: 任务执行");
        simulateWork();
    }

    // 固定频率（每 5 秒执行一次，不等待上次完成）
    @Scheduled(fixedRate = 5000)
    public void runWithFixedRate() {
        log.info("fixedRate: 任务执行");
        simulateWork();
    }

    // 初始延迟 + 固定频率
    @Scheduled(fixedRate = 5000, initialDelay = 10000)
    public void runWithInitialDelay() {
        log.info("initialDelay: 10 秒后开始执行，之后每 5 秒执行一次");
    }

    // Cron 表达式
    @Scheduled(cron = "0 0 2 * * ?")      // 每天凌晨 2 点执行
    public void runDaily() {
        log.info("每日定时任务执行");
    }

    @Scheduled(cron = "0 */5 * * * ?")     // 每 5 分钟执行
    public void runEvery5Minutes() {
        log.info("每 5 分钟任务执行");
    }

    @Scheduled(cron = "0 0 9-18 * * MON-FRI")  // 工作日 9-18 点每小时执行
    public void runWorkHours() {
        log.info("工作时间任务执行");
    }

    private void simulateWork() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### Cron 表达式

```
秒 分 时 日 月 星期 [年]
*  *  *  *  *  *
```

| 字段 | 范围 |
|------|------|
| 秒 | 0-59 |
| 分 | 0-59 |
| 时 | 0-23 |
| 日 | 1-31 |
| 月 | 1-12 |
| 星期 | 1-7（1=星期日） 或 SUN-SAT |

常用表达式：

| 表达式 | 含义 |
|--------|------|
| `0 0 2 * * ?` | 每天凌晨 2 点 |
| `0 0 9-18 * * ?` | 每天 9 点到 18 点每小时 |
| `0 0/30 9-18 * * ?` | 每天 9-18 点每 30 分钟 |
| `0 0 0 1 * ?` | 每月 1 号零点 |
| `0 15 10 ? * MON-FRI` | 工作日 10:15 |
| `0 0 12 ? * WED` | 每周三 12 点 |
| `0 */5 * * * ?` | 每 5 分钟 |
| `0 0 0 1 1 ?` | 每年 1 月 1 日 |

### 动态定时任务

```java
@Component
@Slf4j
public class DynamicScheduledTask {

    private final TaskScheduler taskScheduler;
    private ScheduledFuture<?> scheduledFuture;

    public DynamicScheduledTask(TaskScheduler taskScheduler) {
        this.taskScheduler = taskScheduler;
    }

    public void startTask(String cron) {
        stopTask();  // 先停止现有任务
        scheduledFuture = taskScheduler.schedule(
                () -> log.info("动态定时任务执行: {}", LocalDateTime.now()),
                triggerContext -> new CronTrigger(cron).nextExecution(triggerContext)
        );
        log.info("定时任务已启动, cron: {}", cron);
    }

    public void stopTask() {
        if (scheduledFuture != null && !scheduledFuture.isCancelled()) {
            scheduledFuture.cancel(false);
            log.info("定时任务已停止");
        }
    }

    public void updateCron(String newCron) {
        startTask(newCron);
        log.info("定时任务已更新, new cron: {}", newCron);
    }
}
```

### 定时任务线程池配置

```java
@Configuration
public class SchedulingConfig {

    @Bean
    public TaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(5);
        scheduler.setThreadNamePrefix("scheduled-");
        scheduler.setWaitForTasksToCompleteOnShutdown(true);
        scheduler.setAwaitTerminationSeconds(30);
        return scheduler;
    }
}
```

### 条件执行定时任务

```java
@Component
@ConditionalOnProperty(name = "app.scheduling.enabled", havingValue = "true", matchIfMissing = true)
public class ConditionalScheduledTask {

    @Scheduled(cron = "0 0 3 * * ?")
    public void runIfEnabled() {
        log.info("条件定时任务执行");
    }
}
```

## 练习

1. 实现一个异步邮件发送服务
2. 使用 Cron 表达式配置一个每天晚上 12 点执行的定时任务
3. 实现一个动态定时任务，允许通过 API 启停和修改执行时间
4. 配置异步和定时任务的线程池参数
