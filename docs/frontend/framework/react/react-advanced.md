# React 高级特性

## Context

```tsx
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)!;
  return <button onClick={toggleTheme} className={`btn-${theme}`}>Current: {theme}</button>;
}
```

## 状态提升

```tsx
function Parent() {
  const [value, setValue] = useState('');

  return (
    <div>
      <Input value={value} onChange={setValue} />
      <Display value={value} />
    </div>
  );
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function Display({ value }: { value: string }) {
  return <p>Current value: {value}</p>;
}
```

## useReducer

```tsx
import { useReducer } from 'react';

interface State { count: number; }
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET': return { count: 0 };
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </>
  );
}
```

## React 18 新特性

### 新的渲染方式

```tsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

### startTransition

```tsx
import { startTransition, useState } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);  // 紧急更新
    startTransition(() => {
      setResults(search(value));  // 非紧急更新，可被中断
    });
  };

  return <div>...</div>;
}
```

### useDeferredValue

```tsx
import { useDeferredValue, useState, Suspense } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <Suspense fallback="Loading...">
        <SearchResults query={deferredQuery} />
      </Suspense>
    </div>
  );
}
```

## 状态管理

### 轻量方案

- [Zustand](https://github.com/pmndrs/zustand) - 轻量、简单
- [Jotai](https://github.com/pmndrs/jotai) - 原子状态
- [Valtio](https://github.com/pmndrs/valtio) - 代理状态

### 大型应用

- [Redux Toolkit](https://redux-toolkit.js.org/) - 官方推荐
- [MobX](https://mobx.js.org/) - 响应式状态

## 参考

- [React 18 发布说明](https://react.dev/blog/2022/03/29/react-v18)