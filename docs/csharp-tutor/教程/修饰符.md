# csharp修饰符

## 文档位置

[https://docs.microsoft.com/zh-cn/dotnet/csharp/](https://docs.microsoft.com/zh-cn/dotnet/csharp/)
[https://www.runoob.com/csharp/csharp-methods.html](https://www.runoob.com/csharp/csharp-methods.html)
[https://www.cjavapy.com/](https://www.cjavapy.com/)

## out修饰符

```java
public void OutFunc()
        {
            int n;
            bool b = MyTryParse("123", out n);
            Console.WriteLine(b);
            Console.WriteLine(n);
             
        }

        public static bool MyTryParse(string s, out int result)
        {
            result = 0;
            try
            {
                result = Convert.ToInt32(s);
                return true;
            }
            catch
            {
                return false;
            }
        }
```

•Person p = new Teacher();
•子类可以隐式的转换成父类.
•Teacher t=(Teacher)p;
•is和as
–typeA is type B 仅判断
–typeA as TypeB先判断,再转换
–如果成功了那就是真的成功了,如果不成功返回空
–//as  也是转换,但是 如果转换不了的 不报异常,返回来的是null
–****// is  转换 ,返回的是bool值,true就是能转换,false 就是不能转换
