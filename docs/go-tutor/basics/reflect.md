# 反射

## 获取变量类型

```go
var a int
 typeOfA := reflect.TypeOf(a)
 fmt.Println(typeOfA.Name(), typeOfA.Kind())

```

## 获取类型名和kind

```go
type cat struct {
  }
  // 获取结构体实例的反射类型对象
  typeOfCat := reflect.TypeOf(cat{})
  // 显示反射类型对象的名称和种类
  fmt.Println(typeOfCat.Name(), typeOfCat.Kind())
  // 获取Zero常量的反射类型对象
  typeOfA := reflect.TypeOf(Zero)
  // 显示反射类型对象的名称和种类
  fmt.Println(typeOfA.Name(), typeOfA.Kind())
```

## 获取成员反射信息

```go
func TestStruct(t *testing.T) {
 // 声明一个空结构体
 type cat struct {
  Name string
  // 带有结构体tag的字段
  Type int `json:"type" id:"100"`
 }
 // 创建cat的实例
 ins := cat{Name: "mimi", Type: 1}
 // 获取结构体实例的反射类型对象
 typeOfCat := reflect.TypeOf(ins)
 // 遍历结构体所有成员
 for i := 0; i < typeOfCat.NumField(); i++ {
  // 获取每个成员的结构体字段类型
  fieldType := typeOfCat.Field(i)
  // 输出成员名和tag
  fmt.Printf("name: %v  tag: '%v'\n", fieldType.Name, fieldType.Tag)
 }
 // 通过字段名, 找到字段类型信息
 if catType, ok := typeOfCat.FieldByName("Type"); ok {
  // 从tag中取出需要的tag
  fmt.Println(catType.Tag.Get("json"), catType.Tag.Get("id"))
 }
}
```

## 实现map转struct

```go
func Map2Struct(m map[string]interface{}, obj interface{}) {
    value := reflect.ValueOf(obj)

    // obj 必须是指针且指针指向的必须是 struct
    if value.Kind() == reflect.Ptr && value.Elem().Kind() == reflect.Struct {
        value = value.Elem()
        getMapName := func(key string) interface{} {
            for k, v := range m {
                if strings.EqualFold(k, key) {
                    return v
                }
            }
            return nil
        }
        // 循环赋值
        for i := 0; i < value.NumField(); i++ {
            // 获取字段 type 对象
            field := value.Field(i)
            if !field.CanSet() {
                continue
            }
            // 获取字段名称
            fieldName := value.Type().Field(i).Name
            fmt.Println("fieldName -> ", fieldName)
            // 获取 map 中的对应的值
            fieldVal := getMapName(fieldName)
            if fieldVal != nil {
                field.Set(reflect.ValueOf(fieldVal))
            }
        }
    } else {
        panic("must prt")
    }

}
```

## 实现struct转map

```go
func Struct2Map(obj interface{}) map[string]interface{} {
    value := reflect.ValueOf(obj)

    if value.Kind() != reflect.Ptr || value.Elem().Kind() != reflect.Struct {
        panic("must prt")
    }
    value = value.Elem()
    t := value.Type()

    // 创建 map
    resultMap := make(map[string]interface{})

    // 循环获取字段名称以及对应的值
    for i := 0; i < value.NumField(); i++ {
        val := value.Field(i)
        typeName := t.Field(i)
        if !val.CanSet() {
            resultMap[typeName.Name] = reflect.New(typeName.Type).Elem().Interface()
            continue
        }
        resultMap[typeName.Name] = val.Interface()
    }

    return resultMap
}
```
