# 设计模式

> 设计模式（Design Pattern）是软件设计中常见问题的典型解决方案。它们就像蓝图，你可以根据需求定制代码来解决开发中的通用问题。

## 设计模式分类

设计模式分为三大类：

| 类别 | 说明 | 包含模式 |
|------|------|---------|
| **创建型模式** | 处理对象的创建机制，增加代码的灵活性和可复用性 | 单例、工厂、抽象工厂、建造者、原型 |
| **结构型模式** | 处理对象和类的组合，将多个类或对象组合成更大的结构 | 适配器、代理、装饰器、外观、组合、桥接、享元 |
| **行为型模式** | 处理对象间的通信和职责分配 | 策略、模板方法、观察者、命令、责任链、状态、迭代器、中介者、备忘录、访问者、解释器 |

## 模式列表

### 创建型模式

| 模式 | 说明 | 文件 |
|------|------|------|
| **单例模式 (Singleton)** | 确保一个类只有一个实例，并提供全局访问点 | [singleton.md](./singleton.md) |
| **工厂方法 (Factory Method)** | 定义一个创建对象的接口，让子类决定实例化哪个类 | [factory.md](./factory.md) |
| **抽象工厂 (Abstract Factory)** | 创建一组相关或依赖的对象，无需指定具体类 | [abstract-factory.md](./abstract-factory.md) |
| **建造者模式 (Builder)** | 将复杂对象的构建与表示分离 | [builder.md](./builder.md) |
| **原型模式 (Prototype)** | 通过复制已有对象来创建新对象 | [prototype.md](./prototype.md) |

### 结构型模式

| 模式 | 说明 | 文件 |
|------|------|------|
| **适配器模式 (Adapter)** | 将一个类的接口转换成客户期望的另一个接口 | [adapter.md](./adapter.md) |
| **代理模式 (Proxy)** | 为另一个对象提供一个替身以控制对它的访问 | [proxy.md](./proxy.md) |
| **装饰器模式 (Decorator)** | 动态地将附加职责附加到对象上 | [decorator.md](./decorator.md) |
| **外观模式 (Facade)** | 为子系统的一组接口提供一个统一的简化接口 | [facade.md](./facade.md) |
| **组合模式 (Composite)** | 将对象组合成树形结构以表示"部分-整体"的层次结构 | [composite.md](./composite.md) |

### 行为型模式

| 模式 | 说明 | 文件 |
|------|------|------|
| **策略模式 (Strategy)** | 定义一系列算法，把它们一个个封装起来，使它们可以互相替换 | [strategy.md](./strategy.md) |
| **模板方法 (Template Method)** | 在父类中定义算法的框架，允许子类重写特定步骤 | [template-method.md](./template-method.md) |
| **观察者模式 (Observer)** | 定义一对多依赖关系，当一个对象变化时通知所有依赖者 | [observer.md](./observer.md) |
| **命令模式 (Command)** | 将请求封装为对象，支持参数化、排队和撤销操作 | [command.md](./command.md) |
| **责任链模式 (Chain of Responsibility)** | 将请求沿着处理者链传递，直到有一个处理者处理它为止 | [chain-of-responsibility.md](./chain-of-responsibility.md) |
| **状态模式 (State)** | 允许对象在其内部状态改变时改变其行为 | [state.md](./state.md) |
| **迭代器模式 (Iterator)** | 提供一种顺序访问聚合对象元素的方法 | [iterator.md](./iterator.md) |
