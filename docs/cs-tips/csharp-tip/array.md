# 数组

```csharp
char[] chars = new char[10];
chars[0] = 'a';
chars[1] = 'b';
string[] letters = {"A", "B", "C"};
int[] mylist = {100, 200};
bool[] answers = {true, false};

```

## 循环

```csharp
int[] numbers = {1, 2, 3, 4, 5};
for(int i = 0; i < numbers.Length; i++) {
  Console.WriteLine(numbers[i]);
}
foreach(int num in numbers) {
  Console.WriteLine(num);
}
```
