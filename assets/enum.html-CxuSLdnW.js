import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const a={},r=o(`<h1 id="枚举" tabindex="-1"><a class="header-anchor" href="#枚举"><span>枚举</span></a></h1><p>2019年10月14日16:59:38 看了一下，还有五个章节就修改完基础部分了。</p><p>干就完事了。</p><h1 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h1><p><img src="http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-枚举类.png" alt=""></p><h1 id="一、枚举类的使用" tabindex="-1"><a class="header-anchor" href="#一、枚举类的使用"><span>一、枚举类的使用</span></a></h1><p>实际开发中，我们离不开定义常量，当我们需要定义常量时，其中一个办法是用大写变量通过整数来定义，例如月份：</p><pre><code class="language-python">JAN = 1
FEB = 2
MAR = 3
...
NOV = 11
DEC = 12
</code></pre><p>当然这样做简单快捷，缺点是类型是 <code>int</code> ，并且仍然是变量。</p><p>那有没有什么好的方法呢？</p><p>这时候我们定义一个 class 类型，每个常量都是 class 里面唯一的实例。</p><p>正好 Python 提供了 Enum 类来实现这个功能如下：</p><pre><code class="language-python">#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from enum import Enum

Month = Enum(&#39;Month&#39;, (&#39;Jan&#39;, &#39;Feb&#39;, &#39;Mar&#39;, &#39;Apr&#39;, &#39;May&#39;, &#39;Jun&#39;, &#39;Jul&#39;, &#39;Aug&#39;, &#39;Sep&#39;, &#39;Oct&#39;, &#39;Nov&#39;, &#39;Dec&#39;))

# 遍历枚举类型
for name, member in Month.__members__.items():
    print(name, &#39;---------&#39;, member, &#39;----------&#39;, member.value)

# 直接引用一个常量
print(&#39;\\n&#39;, Month.Jan)

</code></pre><p>输出的结果如下：</p><p><img src="http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-Python3 枚举类型的使用.png" alt=""></p><p>我们使用 <code>Enum</code> 来定义了一个枚举类。</p><p>上面的代码，我们创建了一个有关月份的枚举类型 Month ，这里要注意的是构造参数，第一个参数 Month 表示的是该枚举类的类名，第二个 tuple 参数，表示的是枚举类的值；当然，枚举类通过 <code>__members__</code> 遍历它的所有成员的方法。</p><p>注意的一点是 ， <code>member.value</code> 是自动赋给成员的 <code>int</code> 类型的常量，默认是从 1 开始的。</p><p><strong>而且 Enum 的成员均为单例（Singleton），并且不可实例化，不可更改</strong></p><h1 id="二、enum-的源码" tabindex="-1"><a class="header-anchor" href="#二、enum-的源码"><span>二、Enum 的源码</span></a></h1><p>通过上面的实例可以知道通过 <code>__members__</code> 可以遍历枚举类的所有成员。</p><p>那有没有想过为什么呢？</p><p>当你看到那段代码的时候，有没有想过为什么通过 <code>__members__</code> 就能遍历枚举类型的所有成员出来？</p><p>我们可以先来大致看看 Enum 的源码是如何实现的；</p><p>Enum 在模块 enum.py 中，先来看看 Enum 类的片段</p><pre><code class="language-python">class Enum(metaclass=EnumMeta):
    &quot;&quot;&quot;Generic enumeration.
    Derive from this class to define new enumerations.
    &quot;&quot;&quot;
</code></pre><p>可以看到，Enum 是继承元类 EnumMeta 的；再看看 EnumMeta 的相关片段</p><pre><code class="language-python">class EnumMeta(type):
    &quot;&quot;&quot;Metaclass for Enum&quot;&quot;&quot;
    @property
    def __members__(cls):
        &quot;&quot;&quot;Returns a mapping of member name-&gt;value.
        This mapping lists all enum members, including aliases. Note that this
        is a read-only view of the internal mapping.
        &quot;&quot;&quot;
        return MappingProxyType(cls._member_map_)
</code></pre><p>首先 <code>__members__</code> 方法返回的是一个包含一个 Dict 既 Map 的 MappingProxyType，并且通过 @property 将方法 <code>__members__(cls)</code> 的访问方式改变为了变量的的形式，那么就可以直接通过 <code>__members__</code> 来进行访问了</p><h1 id="三、自定义类型的枚举" tabindex="-1"><a class="header-anchor" href="#三、自定义类型的枚举"><span>三、自定义类型的枚举</span></a></h1><p>但有些时候我们需要控制枚举的类型，那么我们可以 Enum 派生出自定义类来满足这种需要。通过修改上面的例子：</p><pre><code class="language-python">#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
from enum import Enum, unique

Enum(&#39;Month&#39;, (&#39;Jan&#39;, &#39;Feb&#39;, &#39;Mar&#39;, &#39;Apr&#39;, &#39;May&#39;, &#39;Jun&#39;, &#39;Jul&#39;, &#39;Aug&#39;, &#39;Sep&#39;, &#39;Oct&#39;, &#39;Nov&#39;, &#39;Dec&#39;))


# @unique 装饰器可以帮助我们检查保证没有重复值
@unique
class Month(Enum):
    Jan = &#39;January&#39;
    Feb = &#39;February&#39;
    Mar = &#39;March&#39;
    Apr = &#39;April&#39;
    May = &#39;May&#39;
    Jun = &#39;June&#39;
    Jul = &#39;July&#39;
    Aug = &#39;August&#39;
    Sep = &#39;September &#39;
    Oct = &#39;October&#39;
    Nov = &#39;November&#39;
    Dec = &#39;December&#39;


if __name__ == &#39;__main__&#39;:
    print(Month.Jan, &#39;----------&#39;,
          Month.Jan.name, &#39;----------&#39;, Month.Jan.value)
    for name, member in Month.__members__.items():
        print(name, &#39;----------&#39;, member, &#39;----------&#39;, member.value)

</code></pre><p>输出的结果如下：</p><p><img src="http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-Python3 自定义类型的枚举类.png" alt=""></p><p>通过上面的例子，可以知道枚举模块定义了具有迭代 (interator) 和比较(comparison) 功能的枚举类型。 它可以用来为值创建明确定义的符号，而不是使用具体的整数或字符串。</p><h1 id="四、枚举的比较" tabindex="-1"><a class="header-anchor" href="#四、枚举的比较"><span>四、枚举的比较</span></a></h1><p>因为枚举成员不是有序的，所以它们只支持通过标识(identity) 和相等性 (equality) 进行比较。下面来看看 <code>==</code> 和 <code>is</code> 的使用：</p><pre><code class="language-python">
#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
from enum import Enum


class User(Enum):
    Twowater = 98
    Liangdianshui = 30
    Tom = 12


Twowater = User.Twowater
Liangdianshui = User.Liangdianshui

print(Twowater == Liangdianshui, Twowater == User.Twowater)
print(Twowater is Liangdianshui, Twowater is User.Twowater)

try:
    print(&#39;\\n&#39;.join(&#39;  &#39; + s.name for s in sorted(User)))
except TypeError as err:
    print(&#39; Error : {}&#39;.format(err))

</code></pre><p>输出的结果：</p><pre><code class="language-txt">
False True
False True
 Error : &#39;&lt;&#39; not supported between instances of &#39;User&#39; and &#39;User&#39;

</code></pre><p>可以看看最后的输出结果，报了个异常，那是因为大于和小于比较运算符引发 TypeError 异常。也就是 <code>Enum</code> 类的枚举是不支持大小运算符的比较的。</p><p>那么能不能让枚举类进行大小的比较呢？</p><p>当然是可以的，使用 IntEnum 类进行枚举，就支持比较功能。</p><pre><code class="language-python">#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import enum


class User(enum.IntEnum):
    Twowater = 98
    Liangdianshui = 30
    Tom = 12


try:
    print(&#39;\\n&#39;.join(s.name for s in sorted(User)))
except TypeError as err:
    print(&#39; Error : {}&#39;.format(err))


</code></pre><p>看看输出的结果：</p><pre><code class="language-txt">Tom
Liangdianshui
Twowater
</code></pre><p>通过输出的结果可以看到，枚举类的成员通过其值得大小进行了排序。也就是说可以进行大小的比较。</p>`,47),p=[r];function s(i,c){return t(),n("div",null,p)}const u=e(a,[["render",s],["__file","enum.html.vue"]]),d=JSON.parse('{"path":"/python-tutor/basics/enum.html","title":"枚举","lang":"zh-CN","frontmatter":{"description":"枚举 2019年10月14日16:59:38 看了一下，还有五个章节就修改完基础部分了。 干就完事了。 目录 一、枚举类的使用 实际开发中，我们离不开定义常量，当我们需要定义常量时，其中一个办法是用大写变量通过整数来定义，例如月份： 当然这样做简单快捷，缺点是类型是 int ，并且仍然是变量。 那有没有什么好的方法呢？ 这时候我们定义一个 class ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/basics/enum.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"枚举"}],["meta",{"property":"og:description","content":"枚举 2019年10月14日16:59:38 看了一下，还有五个章节就修改完基础部分了。 干就完事了。 目录 一、枚举类的使用 实际开发中，我们离不开定义常量，当我们需要定义常量时，其中一个办法是用大写变量通过整数来定义，例如月份： 当然这样做简单快捷，缺点是类型是 int ，并且仍然是变量。 那有没有什么好的方法呢？ 这时候我们定义一个 class ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-%E6%9E%9A%E4%B8%BE%E7%B1%BB.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T11:39:36.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T11:39:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"枚举\\",\\"image\\":[\\"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-%E6%9E%9A%E4%B8%BE%E7%B1%BB.png\\",\\"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-Python3%20%E6%9E%9A%E4%B8%BE%E7%B1%BB%E5%9E%8B%E7%9A%84%E4%BD%BF%E7%94%A8.png\\",\\"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-Python3%20%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%9E%9A%E4%B8%BE%E7%B1%BB.png\\"],\\"dateModified\\":\\"2022-05-26T11:39:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1653565176000,"updatedTime":1653565176000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1233},"filePathRelative":"python-tutor/basics/enum.md","localizedDate":"2022年5月26日","autoDesc":true}');export{u as comp,d as data};
