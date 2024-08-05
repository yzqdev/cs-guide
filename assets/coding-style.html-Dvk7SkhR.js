import{_ as e,c as t,o as n,d as c}from"./app-CbULZrmi.js";const a={},s=c(`<h1 id="代码规范" tabindex="-1"><a class="header-anchor" href="#代码规范"><span>代码规范</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p><a href="https://docs.microsoft.com/zh-cn/dotnet/csharp/fundamentals/coding-style/coding-conventions" target="_blank" rel="noopener noreferrer">https://docs.microsoft.com/zh-cn/dotnet/csharp/fundamentals/coding-style/coding-conventions</a></p></div><h2 id="帕斯卡拼写法" tabindex="-1"><a class="header-anchor" href="#帕斯卡拼写法"><span>帕斯卡拼写法</span></a></h2><p>命名 class、record 或 struct 时，使用 pascal 大小写（“PascalCasing”）。</p><pre><code class="language-cs">public class DataService
{
}

public record PhysicalAddress(
    string Street,
    string City,
    string StateOrProvince,
    string ZipCode);

public struct ValueCoordinate
{
}
</code></pre><p>命名 interface 时，使用 pascal 大小写并在名称前面加上前缀 I。 这可以清楚地向使用者表明这是 interface</p><pre><code class="language-cs">public interface IWorkerQueue
{
}
</code></pre><p>命名类型的 public 成员（例如字段、属性、事件、方法和本地函数）时，请使用 pascal 大小写。</p><pre><code class="language-cs">public class ExampleEvents
{
    // A public field, these should be used sparingly
    public bool IsValid;

    // An init-only property
    public IWorkerQueue WorkerQueue { get; init; }

    // An event
    public event Action EventProcessing;

    // Method
    public void StartEventProcessing()
    {
        // Local function
        static int CountQueueItems() =&gt; WorkerQueue.Count;
        // ...
    }
}
</code></pre><h2 id="驼峰式大小写" tabindex="-1"><a class="header-anchor" href="#驼峰式大小写"><span>驼峰式大小写</span></a></h2><p>命名 private 或 internal 字段时，使用驼峰式大小写（“camelCasing”），并且它们以 _ 作为前缀。</p><pre><code class="language-cs">public class DataService
{
    private IWorkerQueue _workerQueue;
}
</code></pre><p>使用为 private 或 internal 的static 字段时 请使用 s_前缀，对于线程静态，请使用 t_。</p><pre><code class="language-cs">public class DataService
{
    private static IWorkerQueue s_workerQueue;

    [ThreadStatic]
    private static TimeSpan t_timeSpan;
}
</code></pre><p>编写方法参数时，请使用驼峰式大小写。</p><pre><code class="language-cs">public T SomeMethod&lt;T&gt;(int someNumber, bool isValid)
{
}
</code></pre><p>linq使用</p><pre><code class="language-cs">var seattleCustomers = from customer in customers
                       where customer.City == &quot;Seattle&quot;
                       select customer.Name;
</code></pre>`,18),o=[s];function r(i,l){return n(),t("div",null,o)}const d=e(a,[["render",r],["__file","coding-style.html.vue"]]),u=JSON.parse('{"path":"/csharp-tutor/basics/coding-style.html","title":"代码规范","lang":"zh-CN","frontmatter":{"description":"代码规范 提示 https://docs.microsoft.com/zh-cn/dotnet/csharp/fundamentals/coding-style/coding-conventions 帕斯卡拼写法 命名 class、record 或 struct 时，使用 pascal 大小写（“PascalCasing”）。 命名 interface...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/basics/coding-style.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"代码规范"}],["meta",{"property":"og:description","content":"代码规范 提示 https://docs.microsoft.com/zh-cn/dotnet/csharp/fundamentals/coding-style/coding-conventions 帕斯卡拼写法 命名 class、record 或 struct 时，使用 pascal 大小写（“PascalCasing”）。 命名 interface..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-23T23:19:21.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-23T23:19:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"代码规范\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-23T23:19:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"帕斯卡拼写法","slug":"帕斯卡拼写法","link":"#帕斯卡拼写法","children":[]},{"level":2,"title":"驼峰式大小写","slug":"驼峰式大小写","link":"#驼峰式大小写","children":[]}],"git":{"createdTime":1661296761000,"updatedTime":1661296761000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.95,"words":286},"filePathRelative":"csharp-tutor/basics/coding-style.md","localizedDate":"2022年8月23日","autoDesc":true}');export{d as comp,u as data};
