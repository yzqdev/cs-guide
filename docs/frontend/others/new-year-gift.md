
# 送给前端开发者的一份新年礼物

> 大家好，新年快乐！今天，我开源了一个 [React 的项目](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FKieSun%2FChat-Buy-React)。这个项目虽小，但是五脏六腑俱全，并且接下来我会根据该项目做一整套的免费视频，预计总时间在 20 小时以上。

先来介绍下这个项目的技术栈：

- React 全家桶：React 16 + Redux + React-router 4.0 + Immutable.js
- ES6 + ES7 语法
- 网络请求：Axios + Socket.io
- UI 框架：Antd-mobile
- 后端：Express + MongoDB
<!--more-->
接下来是我初步拟订的课程大纲规划

![课程大纲](https://user-gold-cdn.xitu.io/2017/12/31/160ab7a0feddd5c7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

从2018年1月开始，每周都会更新 2 小时左右的教学视频，视频会按照以上大纲教学，这个视频是完全免费的，保证更新完成。

想第一时间获得更新的视频，可以扫码加群。(二维码在文章最后，你可以先将项目总结看一遍，有兴趣再加不迟)

### 项目总结

#### React 是什么

React 其实只是一个 UI 框架，频繁进行 DOM 操作的代价是很昂贵的，所以 React 使用了虚拟 DOM 的技术，每当状态发生改变，就会生成新的虚拟 DOM 并与原本的进行改变，让变化的地方去渲染。并且为了性能的考虑，只对状态进行浅比较（这是一个很大的优化点）。

React 已经成为当今最流行的框架之一，但是他的学习成本并不低并且需要你有一个良好的 JS 基础。由于React 只是一个 UI 框架，所以你想完成一个项目，你就得使用他的全家桶，更加提高了一个学习成本。所以本课程也是针对初学者，让初学者能够快速的上手 React 。

#### React 组件

如何写好规划好一个组件决定了你的 React 玩的溜不溜。一个组件你需要考虑他提供几个对外暴露的接口，内部状态通过局部状态改变还是全局状态改变好。并且你的组件应该是利于复用和维护的。

##### 组件的生命周期

![生命周期](https://user-gold-cdn.xitu.io/2018/1/1/160ad5cb4105eaeb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- `render` 函数会在 UI 渲染时调用，你多次渲染就会多次调用，所以控制一个组件的重复渲染对于性能优化很重要
- `componentDidMount` 函数只会在组件渲染以后调用一次，通常会在这个发起数据请求
- `shouldComponentUpdate` 是一个很重要的函数，他的返回值决定了是否需要生成一个新的虚拟 DOM 去和之前的比较。通常遇到的性能问题你可以在这里得到很好的解决
- `componentWillMount` 函数会在组件即将销毁时调用，项目中在清除聊天未读消息中用到了这个函数

##### 父子组件参数传递

在项目中我使用的方式是单个模块顶层父组件通过 `connect` 与 Redux 通信。子组件通过参数传递的方式获取需要的参数，对于参数类型我们应该规则好，便于后期 debug。

性能上考虑，我们在参数传递的过程中尽量只传递必须的参数。

#### 路由

在 React-router 4.0 版本，官方也选择了组件的方式去书写路由。

下面介绍一下项目中使用到的按需加载路由高阶组件

```javascript
import React, { Component } from "react";
// 其实高阶组件就是一个组件通过参数传递的方式生成新的组件
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
        // 存储组件
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
    // 引入组件是需要下载文件的，所以是个异步操作
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }
    // 渲染时候判断文件下完没有，下完了就渲染出来
    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}


```

#### Redux

Redux 通常是个另新手困惑的点。首先，不是每个项目都需要使用 Redux，组件间通信不多，逻辑不复杂，你也就不需要使用这个库，毕竟这个使用这个库的开发成本很大。

Redux 是与 React 解耦的，所以你想和 Redux 通信就需要使用 React-redux，你在 action 中使用异步请求就得使用 Redux-thunk，因为 action 只支持同步操作。

##### Redux 的组成

Redux 由三部分组成：action，store，reducer。

Action 顾名思义，就是你发起一个操作，具体使用如下：

```javascript
export function getOrderSuccess(data) {
// 返回的就是一个 action，除了第一个参数一般这样写，其余的参数名随意
  return { type: GET_ORDER_SUCCESS, payload: data };
}

```

Action 发出去以后，会丢给 Reducer。Reducer 是一个纯函数（不依赖于且不改变它作用域之外的变量状态的函数），他接收一个之前的 state 和 action 参数，然后返回一个新的 state 给 store。

```javascript
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return state.set("allOrders", action.payload);
    default:
      break;
  }
  return state;
}

```

Store 很容易和 state 混淆。你可以把 Store 看成一个容器，state 存储在这个容器中。Store 提供一些 API 让你可以对 state 进行访问，改变等等。

PS：state 只允许在 reducer 中进行改变。

说明完了这些基本概念，我觉得是时候对 Redux 进行一点深入的挖掘。

##### 自己实现 Redux

之前说过 Store 是个容器，那么可以写下如下代码

```javascript
class Store {
  constructor() {}
    
    // 以下两个都是 store 的常用 API
  dispatch() {}

  subscribe() {}
}

```

Store 容纳了 state，并且能随时访问 state 的值，那么可以写下如下代码

```javascript
class Store {
  constructor(initState) {
  // _ 代表私有，当然不是真的私有，便于教学就这样写了
    this._state = initState
  }
  
  getState() {
    return this._state
  }
    
    // 以下两个都是 store 的常用 API
  dispatch() {}

  subscribe() {}
}

```

接下来我们考虑 dispatch 逻辑。首先 dispatch 应该接收一个 action 参数，并且发送给 reducer 更新 state。然后如果用户 subscribe 了 state，我们还应该调用函数，那么可以写下如下代码

```javascript
dispatch(action) {
    this._state = this.reducer(this.state, action)
    this.subscribers.forEach(fn => fn(this.getState()))
}

```

reducer 逻辑很简单，在 constructor 时将 reducer 保存起来即可，那么可以写下如下代码

```javascript
constructor(initState, reducer) {
    this._state = initState
    this._reducer = reducer
}

```

现在一个 Redux 的简易半成品已经完成了，我们可以来执行下以下代码

```javascript
const initState = {value: 0}
function reducer(state = initState, action) {
    switch (action.type) {
        case 'increase':
            return {...state, value: state.value + 1}
        case 'decrease': {
            return {...state, value: state.value - 1}
        }
    }
    return state
}
const store = new Store(initState, reducer)
store.dispatch({type: 'increase'})
console.log(store.getState()); // -> 1
store.dispatch({type: 'increase'})
console.log(store.getState()); // -> 2

```

最后一步让我们来完成 subscribe 函数， subscribe 函数调用如下

```javascript
store.subscribe(() =>
  console.log(store.getState())
)

```

所以 subscribe 函数应该接收一个函数参数，将该函数参数 push 进数组中，并且调用该函数

```javascript
subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    fn(this.value);
}
constructor(initState, reducer) {
    this._state = initState
    this._reducer = reducer
    this.subscribers = []
}

```

自此，一个简单的 Redux 的内部逻辑就完成了，大家可以运行下代码试试。

Redux 中间件的实现我会在课程中讲解，这里就先放下。通过这段分析，我相信大家应该不会对 Redux 还是很迷惑了。

#### Immutable.js

我在该项目中使用了该库，具体使用大家可以看项目，这里讲一下这个库到底解决了什么问题。

首先 JS 的对象都是引用关系，当然你可以深拷贝一个对象，但是这个操作对于复杂数据结构来说是相当损耗性能的。

Immutable 就是解决这个问题而产生的。这个库的数据类型都是不可变的，当你想改变其中的数据时，他会clone 该节点以及它的父节点，所以操作起来是相当高效的。

![img](https://user-gold-cdn.xitu.io/2018/1/1/160ad5cb130a8bb4?imageslim)

这个库带来的好处是相当大的： - 防止了异步安全问题 - 高性能，并且对于做 React 渲染优化提供了很大帮助 - 强大的语法糖 - 时空穿梭 （就是撤销恢复）

当然缺点也是有点： - 项目倾入性太大 （不推荐老项目使用） - 有学习成本 - 经常忘了重新赋值。。。

对于 Immutable.js 的使用也会在视频中讲述

#### 性能优化

- 减少不必要的渲染次数
- 使用良好的数据结构
- 数据缓存，使用 Reselect

具体该如何实现性能优化，在课程的后期也会讲述

#### 聊天相关

在聊天功能中我用了 Socket.io 这个库。该库会在支持的浏览器上使用 Websocket，不支持的会降级使用别的协议。

Websocket 底下使用了 TCP 协议，在生产环境中，对于 TCP 的长链接理论上只需要保证服务端收到消息并且回复一个 ACK 就行。

在该项目的聊天数据库结构设计上，我将每个聊天存储为一个 Document，这样后续只需要给这个 Document 的 messages 字段 push 消息就行。

```javascript
const chatSchema = new Schema({
  messageId: String,
  // 聊天双方
  bothSide: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      name: {
        type: String
      },
      lastId: {
        type: String
      }
    }
  ],
  messages: [
    {
      // 发送方
      from: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      // 接收方
      to: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      // 发送的消息
      message: String,
      // 发送日期
      date: { type: Date, default: Date.now }
    }
  ]
});
// 聊天具体后端逻辑
module.exports = function() {
  io.on("connection", function(client) {
    // 将用户存储一起
    client.on("user", user => {
      clients[user] = client.id;
      client.user = user;
    });
    // 断开连接清除用户信息
    client.on("disconnect", () => {
      if (client.user) {
        delete clients[client.user];
      }
    });
    // 发送聊天对象昵称
    client.on("getUserName", id => {
      User.findOne({ _id: id }, (error, user) => {
        if (user) {
          client.emit("userName", user.user);
        } else {
          client.emit("serverError", { errorMsg: "找不到该用户" });
        }
      });
    });
    // 接收信息
    client.on("sendMessage", data => {
      const { from, to, message } = data;
      const messageId = [from, to].sort().join("");
      const obj = {
        from,
        to,
        message,
        date: Date()
      };
      // 异步操作，找到聊天双方
      async.parallel(
        [
          function(callback) {
            User.findOne({ _id: from }, (error, user) => {
              if (error || !user) {
                callback(error, null);
              }
              callback(null, { from: user.user });
            });
          },
          function(callback) {
            User.findOne({ _id: to }, (error, user) => {
              if (error || !user) {
                callback(error, null);
              }
              callback(null, { to: user.user });
            });
          }
        ],
        function(err, results) {
          if (err) {
            client.emit("error", { errorMsg: "找不到聊天对象" });
          } else {
            // 寻找该 messageId 是否存在
            Chat.findOne({
              messageId
            }).exec(function(err, doc) {
              // 不存在就自己创建保存
              if (!doc) {
                var chatModel = new Chat({
                  messageId,
                  bothSide: [
                    {
                      user: from,
                      name: results[0].hasOwnProperty("from")
                        ? results[0].from
                        : results[1].from
                    },
                    {
                      user: to,
                      name: results[0].hasOwnProperty("to")
                        ? results[0].to
                        : results[1].to
                    }
                  ],
                  messages: [obj]
                });
                chatModel.save(function(err, chat) {
                  if (err || !chat) {
                    client.emit("serverError", { errorMsg: "后端出错" });
                  }
                  if (clients[to]) {
                    // 该 messageId 不存在就得发送发送方昵称
                    io.to(clients[to]).emit("message", {
                      obj: chat.messages[chat.messages.length - 1],
                      name: results[0].hasOwnProperty("from")
                        ? results[0].from
                        : results[1].from
                    });
                  }
                });
              } else {
                doc.messages.push(obj);

                doc.save(function(err, chat) {
                  if (err || !chat) {
                    client.emit("serverError", { errorMsg: "后端出错" });
                  }
                  if (clients[to]) {
                    io.to(clients[to]).emit("message", {
                      obj: chat.messages[chat.messages.length - 1]
                    });
                  }
                });
              }
            });
          }
        }
      );
    });
  });
};
```
