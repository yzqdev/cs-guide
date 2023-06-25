# events

events模块提供一个事件监听器,用来监听各种事件,ws就是用的events

```ts
import EventEmitter from 'events'

const door = new EventEmitter();
```

他有两个内置的事件监听器

- `newListener` 添加新的监听器
- `removeListener`移除一个监听器

## emitter.addListener()

是`emitter.on()`的缩写

## emitter.emit()

触发事件

```ts
door.emit('slam'); // emitting the event "slam"
```

## emitter.eventNames()

获取一个事件名的数组

## emitter.getMaxListeners()

获取最多能添加的监听器数量,默认是10,可以用`setMaxListeners()`增加

## emitter.listenerCount()

获取事件的参数个数

```ts
door.listenerCount('open');

```

## emitter.listeners()

```ts
door.listeners('open');
```

## emitter.off()

`emitter.removeListener()`的缩写

## emitter.on()

触发一个事件,执行函数

```ts
door.on('open', () => {
  console.log('Door was opened');
});
```

## emitter.once()

只执行一次回调函数

```ts
import EventEmitter from 'events'

const ee = new EventEmitter();

ee.once('my-event', () => {
  // call callback function once
});
```

## emitter.prependListener()

在事件列表最前面添加事件

## emitter.removeAllListeners()

移除所有的事件

```ts
door.removeAllListeners('open');
```

## emitter.removeListener()

移除一个特定的事件

```ts
const doSomething = () => {};
door.on('open', doSomething);
door.removeListener('open', doSomething);
```

## emitter.setMaxListeners()

设置最多的的监听器,默认是10
