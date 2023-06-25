# csharp委托

[https://www.jianshu.com/p/7aff7509fe2a](https://www.jianshu.com/p/7aff7509fe2a)

委托就是把一个方法传入另一个法，类似javascript的回调函数。下面详细举例。先来看一段javascript代码
```js
function aaa(){

    alert("aaa");

}

function bbb(callback){

      alert("bbb");

      callback();

}

//调用

bbb(aaa);
```

再看c#委托

```csharp
static void Main(string[] args)

        {

            bbb(aaa);

            Console.ReadKey();

        }

        public static void aaa()

        {

            Console.WriteLine("aaa");

        }

        public static void bbb(Action action)

        {

            Console.WriteLine("bbb");

            action();

        }
```