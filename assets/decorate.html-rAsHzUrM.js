import{_ as e,c as t,o,d as r}from"./app-CbULZrmi.js";const a={},c=r(`<h1 id="csharp修饰符" tabindex="-1"><a class="header-anchor" href="#csharp修饰符"><span>csharp修饰符</span></a></h1><h2 id="文档位置" tabindex="-1"><a class="header-anchor" href="#文档位置"><span>文档位置</span></a></h2><ul><li><a href="https://docs.microsoft.com/zh-cn/dotnet/csharp/" target="_blank" rel="noopener noreferrer">https://docs.microsoft.com/zh-cn/dotnet/csharp/</a></li><li><a href="https://www.runoob.com/csharp/csharp-methods.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/csharp/csharp-methods.html</a></li><li><a href="https://www.cjavapy.com/" target="_blank" rel="noopener noreferrer">https://www.cjavapy.com/</a></li></ul><h2 id="out修饰符" tabindex="-1"><a class="header-anchor" href="#out修饰符"><span>out修饰符</span></a></h2><pre><code class="language-csharp">public void OutFunc()
        {
            int n;
            bool b = MyTryParse(&quot;123&quot;, out n);
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
</code></pre><p><code>Person p = new Teacher();</code> •子类可以隐式的转换成父类. <code>Teacher t=(Teacher)p;</code></p><blockquote><p>is和as</p></blockquote><p>– typeA is type B 仅判断 – typeA as TypeB先判断,再转换 – 如果成功了那就是真的成功了,如果不成功返回空 – as 也是转换,但是 如果转换不了的 不报异常,返回来的是null – is 转换 ,返回的是bool值,true就是能转换,false 就是不能转换</p>`,8),n=[c];function s(p,h){return o(),t("div",null,n)}const l=e(a,[["render",s],["__file","decorate.html.vue"]]),d=JSON.parse('{"path":"/csharp-tutor/basics/decorate.html","title":"csharp修饰符","lang":"zh-CN","frontmatter":{"description":"csharp修饰符 文档位置 https://docs.microsoft.com/zh-cn/dotnet/csharp/ https://www.runoob.com/csharp/csharp-methods.html https://www.cjavapy.com/ out修饰符 Person p = new Teacher(); •子类可以隐...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/basics/decorate.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"csharp修饰符"}],["meta",{"property":"og:description","content":"csharp修饰符 文档位置 https://docs.microsoft.com/zh-cn/dotnet/csharp/ https://www.runoob.com/csharp/csharp-methods.html https://www.cjavapy.com/ out修饰符 Person p = new Teacher(); •子类可以隐..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-16T12:04:51.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-16T12:04:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"csharp修饰符\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-16T12:04:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"文档位置","slug":"文档位置","link":"#文档位置","children":[]},{"level":2,"title":"out修饰符","slug":"out修饰符","link":"#out修饰符","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1660651491000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.57,"words":171},"filePathRelative":"csharp-tutor/basics/decorate.md","localizedDate":"2022年3月21日","autoDesc":true}');export{l as comp,d as data};
