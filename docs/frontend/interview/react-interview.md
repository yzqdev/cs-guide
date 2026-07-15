# React 面试

React 高频面试题。

## 基础概念

### JSX

JSX 是 `React.createElement` 的语法糖：

```jsx
// JSX
<div className="app"><h1>Hello</h1></div>

// 等价于
React.createElement('div', { className: 'app' },
  React.createElement('h1', null, 'Hello')
);
```

### 虚拟 DOM

React 用虚拟 DOM 描述 UI，通过 Reconciliation（协调）算法找出最小变更。

### 单向数据流

数据从父组件通过 props 向下传递，子组件通过回调函数向上通信。

---

## Hooks

### useState

```jsx
const [count, setCount] = useState(0);

// 函数式更新（推荐）
setCount(prev => prev + 1);

// 惰性初始化
const [state, setState] = useState(() => {
  return expensiveComputation();
});
```

### useEffect

```jsx
useEffect(() => {
  // 副作用
  const timer = setInterval(() => {}, 1000);

  // 清理函数
  return () => clearInterval(timer);
}, [deps]);  // deps 变化时重新执行
```

### useRef

```jsx
const inputRef = useRef(null);

// 访问 DOM
inputRef.current.focus();

// 保存可变值（不触发重渲染）
const countRef = useRef(0);
```

### useMemo / useCallback

```jsx
// 缓存计算结果
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);

// 缓存函数引用
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 自定义 Hook

```jsx
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}
```

### Hook 规则

1. 只在顶层调用 Hook（不能在循环、条件、嵌套函数中调用）
2. 只在 React 函数组件或自定义 Hook 中调用

---

## 状态管理

### Context

```jsx
const ThemeContext = createContext('light');

// 提供
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// 消费
const theme = useContext(ThemeContext);
```

### Redux 核心概念

```javascript
// Action
const ADD_TODO = 'ADD_TODO';
const addAction = (text) => ({ type: ADD_TODO, payload: text });

// Reducer
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.payload, done: false }];
    default:
      return state;
  }
}

// Store
const store = createStore(rootReducer);
```

### Redux 中间件

```javascript
// thunk：处理异步
const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};
```

---

## React Fiber

### 什么是 Fiber

React 16 引入的协调架构，将渲染工作分成小单元，利用浏览器空闲时间执行，避免长任务阻塞。

### 双缓存

- **current tree**：当前屏幕上显示的
- **workInProgress tree**：正在内存中构建的

### 时间切片

将渲染任务拆分为多个小任务（每个 Fiber 节点一个），每完成一个检查是否需要让出控制权给浏览器。

### 优先级

- Immediate（同步）
- UserBlocking（用户交互）
- Normal（一般更新）
- Low（低优先级）
- Idle（空闲时执行）

---

## Diff 算法

### 单节点 Diff

1. 如果 `key` 和 `type` 相同，复用节点
2. 如果 `key` 相同但 `type` 不同，删除旧节点，创建新节点
3. 如果 `key` 不同，删除旧节点，创建新节点

### 多节点 Diff

1. 第一轮遍历：逐个比较新旧节点
2. 如果新节点遍历完，删除剩余旧节点
3. 如果旧节点遍历完，插入剩余新节点
4. 使用 Map 存储旧节点，通过 `key` 快速查找

---

## 性能优化

### 避免不必要的重渲染

```jsx
// 使用 React.memo
const MemoizedComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});

// 使用 useCallback 缓存函数
const handleClick = useCallback(() => {
  doSomething();
}, [dep]);
```

### 列表优化

```jsx
// 使用 key
{items.map(item => (
  <Item key={item.id} data={item} />
))}
```

### 代码分割

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### 虚拟列表

只渲染可视区域内的列表项，适用于长列表。

---

## 事件机制

### 合成事件（SyntheticEvent）

React 自己实现的事件系统，兼容所有浏览器。

### 事件委托

React 将所有事件委托到根节点（React 17+ 委托到 root 容器）。

```jsx
// React 17 之前：document
// React 17+：root 容器
createRoot(document.getElementById('root')).render(<App />);
```

### 事件执行顺序

```jsx
// 从捕获到冒泡
<div onClickCapture={handleCapture}>   {/* 捕获 */}
  <button onClick={handleClick}>Click</button>  {/* 目标 */}
</div>
```

---

## 常见问题

### 为什么不能在循环/条件中调用 Hook

Hook 内部通过调用顺序来关联状态。如果每次渲染 Hook 顺序变化，状态会错乱。

### 状态提升

当多个组件需要共享状态时，将状态移到它们共同的父组件中。

### 受控组件 vs 非受控组件

| 类型 | 说明 |
|------|------|
| 受控组件 | 通过 `state` 和 `onChange` 控制表单值 |
| 非受控组件 | 使用 `ref` 直接访问 DOM 值 |

```jsx
// 受控组件
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />

// 非受控组件
const inputRef = useRef();
<input ref={inputRef} />
const value = inputRef.current.value;
```
