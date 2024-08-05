import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const r={},i=a(`<h1 id="反射" tabindex="-1"><a class="header-anchor" href="#反射"><span>反射</span></a></h1><h2 id="获取变量类型" tabindex="-1"><a class="header-anchor" href="#获取变量类型"><span>获取变量类型</span></a></h2><pre><code class="language-go">var a int
 typeOfA := reflect.TypeOf(a)
 fmt.Println(typeOfA.Name(), typeOfA.Kind())

</code></pre><h2 id="获取类型名和kind" tabindex="-1"><a class="header-anchor" href="#获取类型名和kind"><span>获取类型名和kind</span></a></h2><pre><code class="language-go">type cat struct {
  }
  // 获取结构体实例的反射类型对象
  typeOfCat := reflect.TypeOf(cat{})
  // 显示反射类型对象的名称和种类
  fmt.Println(typeOfCat.Name(), typeOfCat.Kind())
  // 获取Zero常量的反射类型对象
  typeOfA := reflect.TypeOf(Zero)
  // 显示反射类型对象的名称和种类
  fmt.Println(typeOfA.Name(), typeOfA.Kind())
</code></pre><h2 id="获取成员反射信息" tabindex="-1"><a class="header-anchor" href="#获取成员反射信息"><span>获取成员反射信息</span></a></h2><pre><code class="language-go">func TestStruct(t *testing.T) {
 // 声明一个空结构体
 type cat struct {
  Name string
  // 带有结构体tag的字段
  Type int \`json:&quot;type&quot; id:&quot;100&quot;\`
 }
 // 创建cat的实例
 ins := cat{Name: &quot;mimi&quot;, Type: 1}
 // 获取结构体实例的反射类型对象
 typeOfCat := reflect.TypeOf(ins)
 // 遍历结构体所有成员
 for i := 0; i &lt; typeOfCat.NumField(); i++ {
  // 获取每个成员的结构体字段类型
  fieldType := typeOfCat.Field(i)
  // 输出成员名和tag
  fmt.Printf(&quot;name: %v  tag: &#39;%v&#39;\\n&quot;, fieldType.Name, fieldType.Tag)
 }
 // 通过字段名, 找到字段类型信息
 if catType, ok := typeOfCat.FieldByName(&quot;Type&quot;); ok {
  // 从tag中取出需要的tag
  fmt.Println(catType.Tag.Get(&quot;json&quot;), catType.Tag.Get(&quot;id&quot;))
 }
}
</code></pre><h2 id="实现map转struct" tabindex="-1"><a class="header-anchor" href="#实现map转struct"><span>实现map转struct</span></a></h2><pre><code class="language-go">func Map2Struct(m map[string]interface{}, obj interface{}) {
    value := reflect.ValueOf(obj)

    // obj 必须是指针且指针指向的必须是 struct
    if value.Kind() == reflect.Ptr &amp;&amp; value.Elem().Kind() == reflect.Struct {
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
        for i := 0; i &lt; value.NumField(); i++ {
            // 获取字段 type 对象
            field := value.Field(i)
            if !field.CanSet() {
                continue
            }
            // 获取字段名称
            fieldName := value.Type().Field(i).Name
            fmt.Println(&quot;fieldName -&gt; &quot;, fieldName)
            // 获取 map 中的对应的值
            fieldVal := getMapName(fieldName)
            if fieldVal != nil {
                field.Set(reflect.ValueOf(fieldVal))
            }
        }
    } else {
        panic(&quot;must prt&quot;)
    }

}
</code></pre><h2 id="实现struct转map" tabindex="-1"><a class="header-anchor" href="#实现struct转map"><span>实现struct转map</span></a></h2><pre><code class="language-go">func Struct2Map(obj interface{}) map[string]interface{} {
    value := reflect.ValueOf(obj)

    if value.Kind() != reflect.Ptr || value.Elem().Kind() != reflect.Struct {
        panic(&quot;must prt&quot;)
    }
    value = value.Elem()
    t := value.Type()

    // 创建 map
    resultMap := make(map[string]interface{})

    // 循环获取字段名称以及对应的值
    for i := 0; i &lt; value.NumField(); i++ {
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
</code></pre>`,11),l=[i];function c(p,o){return n(),t("div",null,l)}const u=e(r,[["render",c],["__file","reflect.html.vue"]]),d=JSON.parse('{"path":"/go-tutor/basics/reflect.html","title":"反射","lang":"zh-CN","frontmatter":{"description":"反射 获取变量类型 获取类型名和kind 获取成员反射信息 实现map转struct 实现struct转map","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/reflect.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"反射"}],["meta",{"property":"og:description","content":"反射 获取变量类型 获取类型名和kind 获取成员反射信息 实现map转struct 实现struct转map"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-21T02:04:02.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-21T02:04:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"反射\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-21T02:04:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"获取变量类型","slug":"获取变量类型","link":"#获取变量类型","children":[]},{"level":2,"title":"获取类型名和kind","slug":"获取类型名和kind","link":"#获取类型名和kind","children":[]},{"level":2,"title":"获取成员反射信息","slug":"获取成员反射信息","link":"#获取成员反射信息","children":[]},{"level":2,"title":"实现map转struct","slug":"实现map转struct","link":"#实现map转struct","children":[]},{"level":2,"title":"实现struct转map","slug":"实现struct转map","link":"#实现struct转map","children":[]}],"git":{"createdTime":1661047442000,"updatedTime":1661047442000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.53,"words":460},"filePathRelative":"go-tutor/basics/reflect.md","localizedDate":"2022年8月21日","autoDesc":true}');export{u as comp,d as data};
