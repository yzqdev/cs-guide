import{_ as e,c as t,o,d as l}from"./app-CbULZrmi.js";const a={},n=l(`<h1 id="哈希" tabindex="-1"><a class="header-anchor" href="#哈希"><span>哈希</span></a></h1><p>PowerShell哈希表是一种数据结构，用于存储一个或多个键/值对。也称为字典或关联数组。 在PowerShell中，每个哈希表都有一个哈希表(<code>System.Collections.Hashtable</code>)对象。我们可以在PowerShell中使用<code>Hashtable</code>对象的属性和方法。 哈希表中的键和值也是.NET类型的对象。</p><p>在引入PowerShell版本3.0之后，我们可以使用<code>[ordered]</code>属性在PowerShell中创建一个有序字典(<code>System.Collections.Specialized.OrderedDictionary</code>)。</p><p>有序字典和哈希表之间的主要区别在于字典中的键始终按照我们列出的顺序显示。 但是哈希表中键的顺序不确定。</p><h2 id="_1-语法" tabindex="-1"><a class="header-anchor" href="#_1-语法"><span>1.语法</span></a></h2><p>以下语句是创建哈希表的语法：</p><pre><code class="language-powershell">$variable_name = @{ &lt;key1&gt; = &lt;value1&gt; ; &lt; key2&gt; = &lt;value2&gt; ; ..... ; &lt; keyN&gt; = &lt;valueN&gt;;}
</code></pre><p>以下语句是创建有序字典的语法：</p><pre><code class="language-powershell">$variable_name = [ordered] @{ &lt; key1&gt; = &lt;value1&gt; ; &lt; key2&gt; = &lt;value2&gt; ; ..... ; &lt; keyN&gt; = &lt;valueN&gt;;}
</code></pre><h2 id="_2-创建哈希表" tabindex="-1"><a class="header-anchor" href="#_2-创建哈希表"><span>2.创建哈希表</span></a></h2><p>以下是在PowerShell中创建哈希表的步骤：</p><ul><li>创建一个以<code>@</code>符号开头的哈希表。</li><li>将哈希表括在花括号中。</li><li>输入一个或多个键/值对作为哈希表的数据(内容)。</li><li>要分隔每个值的键，必须使用等号(<code>=</code>)。</li><li>要分隔键/值对，必须使用分号(<code>;</code>)或换行符。</li><li>包含空格的键将它们括在引号中。并且这些值必须是PowerShell的有效表达式。</li><li>要管理或使用哈希表，请将哈希表名分配给变量。</li><li>将有序的哈希表分配给变量时，可以将有序的属性放在<code>@</code>符号之前。</li></ul><p>如果要创建一个空的哈希表，请在PowerShell中键入以下命令：</p><pre><code class="language-powershell">$variablename = @{}
</code></pre><p>创建哈希表时，我们还可以将其添加到哈希表中。以下示例描述了如何使用三个键及其值创建哈希表。</p><pre><code class="language-powershell">$student = @{ name = &quot;Maxsu&quot; ; Course = &quot;数学&quot; ; Age= 25 }
</code></pre><h2 id="_3-显示哈希表" tabindex="-1"><a class="header-anchor" href="#_3-显示哈希表"><span>3.显示哈希表</span></a></h2><p>要显示哈希表，请输入存储它的变量的名称。 默认情况下，它显示带有两列的表。 一列用于键，另一列用于键的值。 以下命令显示哈希表的结果：</p><pre><code class="language-powershell">$Student
</code></pre><p>若要显示哈希表的所有键或所有值，请使用点(<code>.</code>)表示法。 下面的示例显示以上示例的所有键：</p><pre><code class="language-powershell">$Student.keys
</code></pre><p>下面的示例显示以上示例的所有值：</p><pre><code class="language-powershell">$Student.values
</code></pre><p>哈希表具有<code>count</code>属性，该属性指示哈希表中键/值对的总数。 在上面的示例中，以下命令将显示键-值对的总数：</p><pre><code class="language-powershell">PS C:\\Users\\hema&gt; $Student.count
3

</code></pre><p>下面是一个完整的示例，演示了如何创建，初始化和处理哈希表-</p><pre><code class="language-powershell">$hash = @{ ID = 1; Shape = &quot;Square&quot;; Color = &quot;Blue&quot;}

write-host(&quot;Print all hashtable keys&quot;)
$hash.keys

write-host(&quot;Print all hashtable values&quot;)
$hash.values

write-host(&quot;Get ID&quot;)
$hash[&quot;ID&quot;]

write-host(&quot;Get Shape&quot;)
$hash.Number

write-host(&quot;print Size&quot;)
$hash.Count

write-host(&quot;Add key-value&quot;)
$hash[&quot;Updated&quot;] = &quot;Now&quot;

write-host(&quot;Add key-value&quot;)
$hash.Add(&quot;Created&quot;,&quot;Now&quot;)

write-host(&quot;print Size&quot;)
$hash.Count

write-host(&quot;Remove key-value&quot;)
$hash.Remove(&quot;Updated&quot;)

write-host(&quot;print Size&quot;)
$hash.Count

write-host(&quot;sort by key&quot;)
$hash.GetEnumerator() | Sort-Object -Property key
</code></pre><p>上面示例代码执行结果如下：</p><pre><code class="language-powershell">Print all hashtable keys
Color
Shape
ID
Print all hashtable values
Blue
Square
1
Get ID
1
Get Shape
print Size
3
Add key-value
Add key-value
print Size
5
Remove key-value
print Size
4
sort by key

Name                           Value
----                           -----
Color                          Blue
Created                        Now
ID                             1
Shape                          Square
</code></pre>`,29),r=[n];function s(h,i){return o(),t("div",null,r)}const d=e(a,[["render",s],["__file","hash.html.vue"]]),c=JSON.parse('{"path":"/windows-tutor/powershell/basics/hash.html","title":"哈希","lang":"zh-CN","frontmatter":{"description":"哈希 PowerShell哈希表是一种数据结构，用于存储一个或多个键/值对。也称为字典或关联数组。 在PowerShell中，每个哈希表都有一个哈希表(System.Collections.Hashtable)对象。我们可以在PowerShell中使用Hashtable对象的属性和方法。 哈希表中的键和值也是.NET类型的对象。 在引入PowerShe...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/basics/hash.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"哈希"}],["meta",{"property":"og:description","content":"哈希 PowerShell哈希表是一种数据结构，用于存储一个或多个键/值对。也称为字典或关联数组。 在PowerShell中，每个哈希表都有一个哈希表(System.Collections.Hashtable)对象。我们可以在PowerShell中使用Hashtable对象的属性和方法。 哈希表中的键和值也是.NET类型的对象。 在引入PowerShe..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-05T22:42:48.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-05T22:42:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"哈希\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-05T22:42:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1.语法","slug":"_1-语法","link":"#_1-语法","children":[]},{"level":2,"title":"2.创建哈希表","slug":"_2-创建哈希表","link":"#_2-创建哈希表","children":[]},{"level":2,"title":"3.显示哈希表","slug":"_3-显示哈希表","link":"#_3-显示哈希表","children":[]}],"git":{"createdTime":1652240878000,"updatedTime":1659739368000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.7,"words":811},"filePathRelative":"windows-tutor/powershell/basics/hash.md","localizedDate":"2022年5月11日","autoDesc":true}');export{d as comp,c as data};
