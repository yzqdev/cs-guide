# SolidJS 控制流与高级特性

## 条件渲染

```jsx
import { Show, Switch, Match } from 'solid-js';

function App() {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [role, setRole] = createSignal('user');

  return (
    <div>
      {/* Show - 条件渲染 */}
      <Show when={loggedIn()} fallback={<button onClick={() => setLoggedIn(true)}>Login</button>}>
        <button onClick={() => setLoggedIn(false)}>Logout</button>
      </Show>

      {/* Switch/Match - 多条件 */}
      <Switch fallback={<p>Unknown role</p>}>
        <Match when={role() === 'admin'}>
          <p>Admin Panel</p>
        </Match>
        <Match when={role() === 'user'}>
          <p>User Dashboard</p>
        </Match>
      </Switch>
    </div>
  );
}
```

## 列表渲染

```jsx
import { For, Index } from 'solid-js';

function App() {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  return (
    <div>
      {/* For - 列表渲染（推荐，带 key） */}
      <ul>
        <For each={items}>
          {(item, index) => (
            <li>{index() + 1}. {item.name}</li>
          )}
        </For>
      </ul>

      {/* Index - 按索引渲染 */}
      <Index each={items}>
        {(item, index) => (
          <p>{index()}: {item().name}</p>
        )}
      </Index>
    </div>
  );
}
```

## 事件处理

```jsx
function App() {
  const [value, setValue] = createSignal('');

  return (
    <div>
      <input value={value()} onInput={e => setValue(e.target.value)} />
      <p>You typed: {value()}</p>
      <button onClick={() => alert('Clicked!')}>Click</button>
      <form onSubmit={e => { e.preventDefault(); console.log('Submitted'); }}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

## Store（状态管理）

```jsx
import { createStore, produce } from 'solid-js/store';

function TodoApp() {
  const [todos, setTodos] = createStore({
    items: [],
    filter: 'all',
  });

  const addTodo = (text: string) => {
    setTodos('items', [...todos.items, { id: Date.now(), text, done: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos('items', item => item.id === id, 'done', done => !done);
  };

  return (
    <div>
      <For each={todos.items}>
        {todo => (
          <div>
            <input type="checkbox" checked={todo.done} onClick={() => toggleTodo(todo.id)} />
            <span style={{ 'text-decoration': todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </div>
        )}
      </For>
    </div>
  );
}
```

## 资源管理（异步数据）

```jsx
import { createResource, Show } from 'solid-js';

async function fetchUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
}

function UserProfile(props: { id: string }) {
  const [user, { mutate, refetch }] = createResource(props.id, fetchUser);

  return (
    <div>
      <Show when={user.loading}><p>Loading...</p></Show>
      <Show when={user.error}><p>Error: {user.error.message}</p></Show>
      <Show when={user()}>
        <h1>{user().name}</h1>
        <p>{user().email}</p>
        <button onClick={refetch}>Refresh</button>
      </Show>
    </div>
  );
}
```

## Context

```jsx
import { createContext, useContext } from 'solid-js';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeContext);
  return <div class={`theme-${theme}`}>Current theme: {theme}</div>;
}
```

## 路由

```bash
npm install @solidjs/router
```

```jsx
import { Router, Route, Routes, Link, useParams, useNavigate } from '@solidjs/router';

function App() {
  return (
    <Router>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/user/123">User</Link>
      </nav>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/user/:id" component={User} />
      </Routes>
    </Router>
  );
}

function User() {
  const params = useParams();
  const navigate = useNavigate();
  return <div>User: {params.id}</div>;
}
```

## Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: { port: 3000 },
  build: { target: 'esnext' },
});
```

## 常见问题

### 不调用 Signal 的错误

```jsx
// ❌ 错误：忘记调用 signal
<p>{count}</p>

// ✅ 正确：signal 需要作为函数调用
<p>{count()}</p>
```

### 解构会丢失响应性

```jsx
// ❌ 错误：解构后失去响应性
function Counter(props) {
  const { value } = props;
  return <div>{value}</div>;
}

// ✅ 正确：保持 props 引用
function Counter(props) {
  return <div>{props.value}</div>;
}
```

## 推荐 UI 库

- [Solid UI](https://www.solid-ui.com/) - SolidJS 官方组件库
- [Kobalte](https://kobalte.dev/) - 无样式 UI 组件库
- [Ark UI](https://github.com/chakra-ui/ark/) - Chakra UI 的 SolidJS 版本
- [Solid Primitives](https://github.com/solidjs-community/solid-primitives) - 社区实用工具集

## 参考

- [SolidJS 官方文档](https://www.solidjs.com/)
- [SolidJS 教程](https://www.solidjs.com/tutorial)