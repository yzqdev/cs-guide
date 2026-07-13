# 日期与时间 API

> Java 8 引入了全新的 `java.time` 包（JSR 310），解决了旧版日期 API 的诸多问题。

## 旧版日期 API 的问题

```java
// 1. 月份从 0 开始（令人困惑）
Date date = new Date(2024, 1, 15);  // ❌ 已废弃，月份 1 表示二月

// 2. 可变对象（线程不安全）
Calendar cal = Calendar.getInstance();
cal.set(2024, Calendar.JANUARY, 15);
cal.add(Calendar.DAY_OF_MONTH, 1);  // 直接修改了 cal 本身

// 3. 设计混乱
Date date = new Date();            // 既表示日期又表示时间
System.out.println(date.getMonth());  // 不推荐使用
```

## 新日期时间 API

`java.time` 包的核心类都是**不可变**的，线程安全。

### LocalDate — 日期（年-月-日）

```java
// 获取当前日期
LocalDate today = LocalDate.now();
System.out.println(today);  // 2024-01-15

// 创建指定日期
LocalDate date = LocalDate.of(2024, Month.JANUARY, 15);
LocalDate date2 = LocalDate.of(2024, 1, 15);

// 解析字符串
LocalDate parsed = LocalDate.parse("2024-01-15");  // 格式必须为 yyyy-MM-dd

// 获取信息
int year = date.getYear();            // 2024
int month = date.getMonthValue();     // 1（1-12）
int day = date.getDayOfMonth();       // 15
DayOfWeek dayOfWeek = date.getDayOfWeek();  // MONDAY
int dayOfYear = date.getDayOfYear();  // 15
boolean isLeap = date.isLeapYear();   // true（2024 是闰年）

// 日期加减
LocalDate tomorrow = today.plusDays(1);
LocalDate nextWeek = today.plusWeeks(1);
LocalDate nextMonth = today.plusMonths(1);
LocalDate nextYear = today.plusYears(1);
LocalDate yesterday = today.minusDays(1);

// 修改（返回新对象，原对象不变）
LocalDate newDate = today.withDayOfMonth(1);  // 当月第一天
LocalDate lastDay = today.with(TemporalAdjusters.lastDayOfMonth());  // 当月最后一天

// 比较
today.isAfter(tomorrow);    // false
today.isBefore(tomorrow);   // true
today.isEqual(today);       // true
today.compareTo(tomorrow);  // 负数
```

### LocalTime — 时间（时:分:秒.纳秒）

```java
// 当前时间
LocalTime now = LocalTime.now();
System.out.println(now);  // 14:30:25.123

// 创建
LocalTime time = LocalTime.of(14, 30);             // 14:30
LocalTime time2 = LocalTime.of(14, 30, 25);         // 14:30:25
LocalTime time3 = LocalTime.of(14, 30, 25, 123456789); // 14:30:25.123456789

// 解析
LocalTime parsed = LocalTime.parse("14:30:25");

// 获取
int hour = time.getHour();          // 14
int minute = time.getMinute();      // 30
int second = time.getSecond();      // 25
int nano = time.getNano();          // 0

// 加减
LocalTime later = now.plusHours(1);
LocalTime earlier = now.minusMinutes(30);
```

### LocalDateTime — 日期+时间

```java
// 获取
LocalDateTime now = LocalDateTime.now();

// 创建
LocalDateTime dt = LocalDateTime.of(2024, 1, 15, 14, 30);
LocalDateTime dt2 = LocalDateTime.of(2024, Month.JANUARY, 15, 14, 30);

// 组合
LocalDate date = LocalDate.of(2024, 1, 15);
LocalTime time = LocalTime.of(14, 30);
LocalDateTime dt3 = LocalDateTime.of(date, time);

// 拆分
LocalDate datePart = dt.toLocalDate();
LocalTime timePart = dt.toLocalTime();

// 加减
LocalDateTime nextHour = dt.plusHours(1);
LocalDateTime nextDay = dt.plusDays(1);
```

### Instant — 时间戳

```java
// 当前时间戳（UTC）
Instant now = Instant.now();
System.out.println(now);  // 2024-01-15T06:30:00Z

// 与 Date 互转
Instant instant = new Date().toInstant();
Date date = Date.from(Instant.now());
```

### Duration 与 Period

```java
// Duration — 时间差（秒/纳秒）
LocalTime start = LocalTime.of(9, 0);
LocalTime end = LocalTime.of(17, 30);
Duration duration = Duration.between(start, end);
System.out.println(duration.toHours());    // 8
System.out.println(duration.toMinutes());  // 510

// Period — 日期差（年/月/日）
LocalDate birthday = LocalDate.of(2000, 1, 1);
LocalDate today = LocalDate.now();
Period period = Period.between(birthday, today);
System.out.println(period.getYears());    // 24
System.out.println(period.getMonths());   // 0
System.out.println(period.getDays());     // 14
```

### 格式化与解析

```java
// 预定义格式
LocalDate date = LocalDate.now();
System.out.println(date.format(DateTimeFormatter.ISO_DATE));       // 2024-01-15
System.out.println(date.format(DateTimeFormatter.ISO_LOCAL_DATE)); // 2024-01-15

// 自定义格式
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
LocalDateTime now = LocalDateTime.now();
String formatted = now.format(formatter);
System.out.println(formatted);  // 2024-01-15 14:30:25

// 解析字符串
String str = "2024-01-15 14:30:25";
LocalDateTime parsed = LocalDateTime.parse(str, formatter);

// 常见格式模式
// yyyy — 年份（2024）
// MM — 月份（01-12）
// dd — 日期（01-31）
// HH — 小时（00-23）
// mm — 分钟（00-59）
// ss — 秒（00-59）
// E — 星期（周一）
// a — 上午/下午
```

### TemporalAdjusters — 时间调整器

```java
LocalDate today = LocalDate.now();

// 下个/上个周一
LocalDate nextMonday = today.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
LocalDate previousMonday = today.with(TemporalAdjusters.previous(DayOfWeek.MONDAY));

// 当月第一天/最后一天
LocalDate firstDay = today.with(TemporalAdjusters.firstDayOfMonth());
LocalDate lastDay = today.with(TemporalAdjusters.lastDayOfMonth());

// 当年第一天/最后一天
LocalDate firstDayOfYear = today.with(TemporalAdjusters.firstDayOfYear());
LocalDate lastDayOfYear = today.with(TemporalAdjusters.lastDayOfYear());

// 当月第一个周一
LocalDate firstMonday = today.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
```

### 时区处理

```java
// ZoneId — 时区
Set<String> allZones = ZoneId.getAvailableZoneIds();  // 所有可用时区
ZoneId beijing = ZoneId.of("Asia/Shanghai");
ZoneId tokyo = ZoneId.of("Asia/Tokyo");
ZoneId utc = ZoneId.of("UTC");

// ZonedDateTime — 带时区的日期时间
ZonedDateTime now = ZonedDateTime.now(beijing);
System.out.println(now);  // 2024-01-15T14:30:25+08:00[Asia/Shanghai]

// 时区转换
ZonedDateTime beijingTime = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));
ZonedDateTime tokyoTime = beijingTime.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));
System.out.println("北京: " + beijingTime);
System.out.println("东京: " + tokyoTime);  // +1 小时
```

## 新旧 API 互转

```java
// Date ↔ Instant
Date oldDate = new Date();
Instant instant = oldDate.toInstant();
Date newDate = Date.from(Instant.now());

// Date ↔ LocalDateTime
LocalDateTime ldt = oldDate.toInstant()
    .atZone(ZoneId.systemDefault())
    .toLocalDateTime();

Date d = Date.from(LocalDateTime.now()
    .atZone(ZoneId.systemDefault())
    .toInstant());

// Calendar ↔ LocalDateTime
Calendar calendar = Calendar.getInstance();
LocalDateTime ldt2 = LocalDateTime.ofInstant(
    calendar.toInstant(), ZoneId.systemDefault());

// Timestamp ↔ LocalDateTime
Timestamp ts = Timestamp.valueOf(LocalDateTime.now());
LocalDateTime ldt3 = ts.toLocalDateTime();
```

## 练习

```java
// 1. 计算从出生到现在活了多少天
LocalDate birthDate = LocalDate.of(2000, Month.JANUARY, 1);
LocalDate today = LocalDate.now();
long days = ChronoUnit.DAYS.between(birthDate, today);
System.out.println("活了 " + days + " 天");

// 2. 判断某个日期是星期几
LocalDate date = LocalDate.of(2024, 1, 15);
System.out.println(date.getDayOfWeek());  // MONDAY
System.out.println(date.getDayOfWeek().getValue());  // 1（周一=1）

// 3. 计算两个时间之间的小时数
LocalTime start = LocalTime.of(9, 0);
LocalTime end = LocalTime.of(18, 30);
long hours = Duration.between(start, end).toHours();     // 9
long minutes = Duration.between(start, end).toMinutes(); // 570

// 4. 格式化并解析日期
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
String dateStr = "2024/01/15";
LocalDate parsed = LocalDate.parse(dateStr, formatter);
System.out.println(parsed.format(formatter));  // 2024/01/15
```
