# 装饰器模式

```java

@Slf4j
class DecoratorPatternTest {
  @Test
  void test() {
    Tiger tiger = new Tiger();
    Living flyDecorator = new ThrowStoneDecorator(new FlyDecorator(tiger));
    flyDecorator.behave();
  }
}

interface Living {
  void behave();
}

class Tiger implements Living {


  @Override
  public void behave() {
    System.out.println("tiger behave");
  }
}

class Bird implements Living {
  @Override
  public void behave() {
    System.out.println("bird behave");
  }
}

abstract class LivingDecorator implements Living {
  Living living;

  public LivingDecorator(Living living) {
    this.living = living;
  }

  @Override
  public void behave() {
    this.living.behave();
  }
}

class FlyDecorator extends LivingDecorator {

  public FlyDecorator(Living living) {
    super(living);
  }

  @Override
  public void behave() {
    super.behave();
    System.out.println("i can fly");
  }
}

class ThrowStoneDecorator extends LivingDecorator {
  public ThrowStoneDecorator(Living living) {
    super(living);
  }

  @Override
  public void behave() {
    super.behave();
    System.out.println("i can throw stone");
  }
}

```