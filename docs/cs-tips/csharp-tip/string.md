# 字符串

## 逐字字符串

```cs
string filePath = @"C:\Users\scoleridge\Documents\";

string quote = @"Her name was ""Sara.""";
//Output: Her name was "Sara."
```

## 原始字符串文本

```cs
string singleLine = """Friends say "hello" as they pass by.""";
```

## 字符串内插

```cs
string name = "Mark";
var date = DateTime.Now;

// Composite formatting:
Console.WriteLine("Hello, {0}! Today is {1}, it's {2:HH:mm} now.", name, date.DayOfWeek, date);
// String interpolation:
Console.WriteLine($"Hello, {name}! Today is {date.DayOfWeek}, it's {date:HH:mm} now.");
// Both calls produce the same output that is similar to:
// Hello, Mark! Today is Wednesday, it's 19:40 now.
```
