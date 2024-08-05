import{_ as t,c as n,o,a as e}from"./app-CbULZrmi.js";const r={},s=e("h1",{id:"字符串",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#字符串"},[e("span",null,"字符串")])],-1),a=e("p",null,[e("a",{href:"https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated",target:"_blank",rel:"noopener noreferrer"},"https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated")],-1),c=e("pre",null,[e("code",{class:"language-cs"},`  public void StringTest1() {
            //可以讲string类型 看做是char类型的一个只读数组
            string s = "abcdefg";
            s = "bbcdefg";
            // s[0] = 'b';不能这样做  因为是只读的
            //首先将字符串转换为char类型的数组
            char[] chs = s.ToCharArray();
            chs[0] = 'b';
            //将字符数组转换为我们的字符串
            s = new string(chs);
            //既然可以将string看做char类型的只读数组，所以我可以通过下标去访问字符串中的某一个元素
            Console.WriteLine(s[0]);
            Console.WriteLine(s);

        }
`)],-1),i=[s,a,c];function p(d,l){return o(),n("div",null,i)}const m=t(r,[["render",p],["__file","string.html.vue"]]),g=JSON.parse('{"path":"/csharp-tutor/basics/string.html","title":"字符串","lang":"zh-CN","frontmatter":{"description":"字符串 https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/basics/string.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"字符串"}],["meta",{"property":"og:description","content":"字符串 https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-30T13:39:37.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-30T13:39:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-30T13:39:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1661296761000,"updatedTime":1661866777000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.45,"words":136},"filePathRelative":"csharp-tutor/basics/string.md","localizedDate":"2022年8月23日","autoDesc":true}');export{m as comp,g as data};
