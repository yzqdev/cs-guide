# React Hooks

## useState

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(c => c + 1)}>+1 (functional)</button>
    </div>
  );
}
```

## useEffect

```tsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 副作用：挂载时执行
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);

    // 清理函数：卸载时执行
    return () => clearInterval(interval);
  }, []); // 空依赖数组 = 只在挂载时执行

  return <div>Seconds: {seconds}</div>;
}
```

## useRef

```tsx
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

## useMemo

```tsx
import { useMemo } from 'react';

function SortedList({ items }: { items: Item[] }) {
  const sortedList = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return (
    <ul>
      {sortedList.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

## useCallback

```tsx
import { useCallback } from 'react';

function Parent() {
  const handleClick = useCallback((id: number) => {
    console.log('Clicked', id);
  }, []);

  return <Child onClick={handleClick} />;
}
```

## 自定义 Hook

```tsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 使用
function App() {
  const { width, height } = useWindowSize();
  return <p>Window: {width} x {height}</p>;
}
```

## 参考

- [React Hooks 文档](https://react.dev/reference/react)