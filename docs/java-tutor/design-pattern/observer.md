# 观察者模式

```java

// 1. 观察者接口（订阅者）
interface Observer {
    void update(String message);  // 收到通知时的处理方法
}

// 2. 被观察者接口（发布者）
interface Subject {
    void registerObserver(Observer o);  // 添加订阅者
    void removeObserver(Observer o);    // 取消订阅
    void notifyObservers();             // 通知所有订阅者
}



/**
 * 3. 具体被观察者（微信公众号）<br/>
 * <strong>被观察者（Subject）</strong> ：就像微信公众号<br/>
 * 观察者（Observer）：就像订阅公众号的用户<br/>
 * 当公众号发布新文章（状态改变），所有订阅用户都会收到通知
 */
class WeChatPublicAccount implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String message;  // 新发布的消息

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        for (Observer o : observers) {
            o.update(message);  // 通知每个订阅者
        }
    }

    // 发布新消息
    public void publishMessage(String msg) {
        this.message = msg;
        System.out.println("公众号发布新消息: " + msg);
        notifyObservers();  // 发布后自动通知所有订阅者
    }
}

// 4. 具体观察者（微信用户）
class WeChatUser implements Observer {
    private String name;

    public WeChatUser(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println(name + " 收到消息: " + message);
    }
}

// 5. 测试代码
public class ObserverDemo {
   @Test void observerTest() {
        // 创建公众号
        WeChatPublicAccount account = new WeChatPublicAccount();

        // 创建用户
        Observer user1 = new WeChatUser("张三");
        Observer user2 = new WeChatUser("李四");
        Observer user3 = new WeChatUser("王五");

        // 用户订阅公众号
        account.registerObserver(user1);
        account.registerObserver(user2);
        account.registerObserver(user3);

        // 公众号发布消息（自动通知所有订阅者）
        account.publishMessage("Java设计模式系列文章更新啦！");

        System.out.println("----- 李四取消订阅后 -----");
        account.removeObserver(user2);  // 李四取消订阅

        account.publishMessage("观察者模式详解");  // 李四不会收到这条消息
    }
}

```