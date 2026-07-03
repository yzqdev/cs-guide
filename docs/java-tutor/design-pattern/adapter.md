# 适配器模式 (Adapter)

> **将一个类的接口转换成客户期望的另一个接口。** 适配器让原本不兼容的类可以合作。

## 场景

- 旧系统接口与新系统接口不兼容时，用适配器做桥梁
- 第三方库的接口与你的业务接口不一致
- 电源插头转换器（两脚转三脚）

## 核心角色

| 角色 | 说明 |
|------|------|
| **Target（目标接口）** | 客户端期望的接口 |
| **Adaptee（被适配者）** | 需要被适配的现有接口 |
| **Adapter（适配器）** | 将 Adaptee 适配成 Target |

## 代码示例

```java
// ----- Target：客户端期望的接口 -----
interface MediaPlayer {
    void play(String audioType, String fileName);
}

// ----- Adaptee：需要被适配的类 -----
class AdvancedMediaPlayer {
    public void playVlc(String fileName) {
        System.out.println("播放 VLC 文件: " + fileName);
    }
    public void playMp4(String fileName) {
        System.out.println("播放 MP4 文件: " + fileName);
    }
}

// ----- Adapter：适配器 -----
class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedPlayer;

    public MediaAdapter() {
        advancedPlayer = new AdvancedMediaPlayer();
    }

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedPlayer.playVlc(fileName);
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedPlayer.playMp4(fileName);
        }
    }
}

// ----- 使用 -----
public class AdapterDemo {
    public static void main(String[] args) {
        MediaPlayer player = new MediaAdapter();
        player.play("mp4", "电影.mp4");
        player.play("vlc", "纪录片.vlc");
    }
}
```

## 类适配器 vs 对象适配器

| 类型 | 实现方式 | 特点 |
|------|---------|------|
| **类适配器** | 继承 Adaptee + 实现 Target | 不需要组合，但需要多重继承（Java 不支持） |
| **对象适配器** | 持有 Adaptee 引用 + 实现 Target | 更灵活，推荐使用（如上述例子） |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 无需修改现有代码即可兼容 | ❌ 增加系统复杂度 |
| ✅ 符合开闭原则 | ❌ 如果接口差异太大，适配器代码会很复杂 |

## JDK 中的应用

- `java.util.Arrays.asList()`（将数组适配为 List）
- `java.util.Collections.list()`（将 Enumeration 适配为 ArrayList）
- Spring MVC 中的 `HandlerAdapter`
