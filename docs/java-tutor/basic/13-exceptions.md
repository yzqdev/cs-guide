# 异常处理

> 异常（Exception）是程序运行中出现的非正常情况。Java 通过 try-catch-finally 机制处理异常。

## 异常体系

```
Throwable（根类）
├── Error（错误，程序无法处理）
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── Exception（异常，程序可以处理）
    ├── RuntimeException（运行时异常，无需捕获）
    │   ├── NullPointerException
    │   ├── ArithmeticException
    │   ├── IndexOutOfBoundsException
    │   ├── ClassCastException
    │   ├── IllegalArgumentException
    │   └── ...
    └── Checked Exception（受检异常，必须处理）
        ├── IOException
        ├── SQLException
        ├── FileNotFoundException
        ├── InterruptedException
        └── ...
```

### Error vs Exception

| 特性 | Error | Exception |
|------|-------|-----------|
| 能否处理 | 不能，程序应终止 | 可以捕获处理 |
| 常见例子 | `OutOfMemoryError`, `StackOverflowError` | `NullPointerException`, `IOException` |

### 运行时异常 vs 受检异常

| 特性 | RuntimeException | Checked Exception |
|------|-----------------|-------------------|
| 是否必须捕获 | 否 | 是 |
| 典型场景 | 程序 Bug（空指针、数组越界） | 外部因素（文件不存在、网络中断） |
| 处理方式 | 修复代码 | try-catch 或 throws |

## 异常处理方式

### try-catch

```java
try {
    // 可能抛出异常的代码
    int result = 10 / 0;  // ArithmeticException
} catch (ArithmeticException e) {
    // 捕获特定异常
    System.out.println("除数不能为零");
    e.printStackTrace();  // 打印异常堆栈（调试用）
}
```

### 多 catch 块

```java
try {
    String str = null;
    str.length();              // NullPointerException
    int[] arr = new int[5];
    arr[10] = 10;              // ArrayIndexOutOfBoundsException
} catch (NullPointerException e) {
    System.out.println("空指针异常");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("数组越界异常");
} catch (Exception e) {       // 兜底捕获（必须放在最后）
    System.out.println("其他异常");
}
```

### 多异常合并捕获（Java 7+）

```java
try {
    // 可能抛出多种异常
} catch (NullPointerException | ArrayIndexOutOfBoundsException e) {
    // 合并处理，e 隐式为 final
    System.out.println("空指针或数组越界: " + e.getMessage());
}
```

### try-catch-finally

`finally` 块无论是否发生异常都会执行，常用于释放资源：

```java
FileInputStream fis = null;
try {
    fis = new FileInputStream("test.txt");
    int data = fis.read();
    System.out.println((char) data);
} catch (FileNotFoundException e) {
    System.out.println("文件未找到");
} catch (IOException e) {
    System.out.println("读取文件错误");
} finally {
    // 无论是否异常，都会执行
    if (fis != null) {
        try {
            fis.close();  // 关闭流也可能抛异常
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### try-with-resources（Java 7+）

自动关闭实现了 `AutoCloseable` 接口的资源：

```java
// 方式一：try-with-resources（推荐）
try (FileInputStream fis = new FileInputStream("test.txt");
     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {
    String line = br.readLine();
    System.out.println(line);
} catch (IOException e) {
    System.out.println("文件读取错误");
}
// 资源会自动关闭，无需 finally

// 自定义 AutoCloseable
public class MyResource implements AutoCloseable {
    @Override
    public void close() {
        System.out.println("资源已关闭");
    }
}

try (MyResource resource = new MyResource()) {
    System.out.println("使用资源");
}
```

## throws 关键字

如果一个方法不处理异常，可以用 `throws` 声明抛出，由调用者处理：

```java
public class ThrowsExample {

    // 声明可能抛出异常
    public void readFile(String path) throws FileNotFoundException, IOException {
        FileInputStream fis = new FileInputStream(path);
        // ...
    }

    // 调用者必须处理
    public void process() {
        try {
            readFile("test.txt");
        } catch (FileNotFoundException e) {
            System.out.println("文件不存在: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IO 错误: " + e.getMessage());
        }
    }

    // 或者继续向上抛出
    public void process2() throws IOException {
        readFile("test.txt");
    }
}
```

## throw 关键字

`throw` 用于手动抛出异常：

```java
public class ThrowExample {

    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("年龄不合法: " + age);
            // 抛出后方法立即结束
        }
        System.out.println("年龄: " + age);
    }

    public void login(String username, String password) {
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("用户名不能为空");
        }
        if (password.length() < 6) {
            throw new IllegalArgumentException("密码长度不能少于6位");
        }
    }
}
```

## 自定义异常

```java
// 自定义运行时异常
public class BusinessException extends RuntimeException {
    private int code;

    public BusinessException(String message) {
        super(message);
        this.code = 500;
    }

    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}

// 自定义受检异常
public class InsufficientBalanceException extends Exception {
    private double balance;
    private double required;

    public InsufficientBalanceException(double balance, double required) {
        super(String.format("余额不足: 需要 %.2f，当前 %.2f", required, balance));
        this.balance = balance;
        this.required = required;
    }

    public double getBalance() { return balance; }
    public double getRequired() { return required; }
}

// 使用自定义异常
public class BankAccount {
    private double balance;

    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(balance, amount);
        }
        balance -= amount;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new BusinessException(400, "存款金额必须大于0");
        }
        balance += amount;
    }
}

// 调用
public class BankDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.deposit(100);

        try {
            account.withdraw(200);
        } catch (InsufficientBalanceException e) {
            System.out.println(e.getMessage());
            System.out.println("当前余额: " + e.getBalance());
        }
    }
}
```

## 异常处理的最佳实践

```java
// 1. 不要捕获 Exception 或 Throwable（太宽泛）
try {
    // ...
} catch (Exception e) {  // ❌ 应该捕获具体的异常类型
    // ...
}

// 2. 不要吞掉异常
try {
    // ...
} catch (IOException e) {
    // ❌ 空 catch 块，异常被吞掉
}

// ✅ 正确处理
catch (IOException e) {
    logger.error("文件操作失败", e);  // 记录日志
    throw new BusinessException("操作失败", e);  // 或转为其他异常
}

// 3. 使用 try-with-resources 代替 finally 释放资源
// ✅ 推荐
try (InputStream in = new FileInputStream("file.txt")) {
    // ...
}

// 4. 用异常携带更多信息
throw new BusinessException(400, "用户名已存在: " + username);

// 5. 不要用异常控制正常流程
// ❌ 不要这样做
try {
    int i = Integer.parseInt(str);
} catch (NumberFormatException e) {
    // 用正则或 isDigit 预检查更好
}
```

## 练习

```java
// 1. 编写一个银行账户系统，使用自定义异常
class AccountNotFoundException extends Exception {
    public AccountNotFoundException(String accountNo) {
        super("账户未找到: " + accountNo);
    }
}

class Bank {
    private Map<String, Double> accounts = new HashMap<>();

    public void transfer(String from, String to, double amount)
            throws AccountNotFoundException, InsufficientBalanceException {

        if (!accounts.containsKey(from)) {
            throw new AccountNotFoundException(from);
        }
        if (!accounts.containsKey(to)) {
            throw new AccountNotFoundException(to);
        }

        double fromBalance = accounts.get(from);
        if (fromBalance < amount) {
            throw new InsufficientBalanceException(fromBalance, amount);
        }

        accounts.put(from, fromBalance - amount);
        accounts.put(to, accounts.get(to) + amount);
    }
}
```
