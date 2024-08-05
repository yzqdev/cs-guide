import{_ as e,c as t,o,d as r}from"./app-CbULZrmi.js";const l={},a=r(`<h1 id="goprotobuf简明教程" tabindex="-1"><a class="header-anchor" href="#goprotobuf简明教程"><span>GoProtobuf简明教程</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>转载自<a href="https://geektutu.com/post/quick-go-protobuf.html" target="_blank" rel="noopener noreferrer">极客兔兔</a></p><p>他的网站<a href="https://geektutu.com" target="_blank" rel="noopener noreferrer">链接</a></p></div><p><img src="https://geektutu.com/post/quick-go-protobuf/go-protobuf.jpg" alt="Golang Protocol Buffers"></p><h2 id="_1-protocol-buffers-简介" tabindex="-1"><a class="header-anchor" href="#_1-protocol-buffers-简介"><span>1 Protocol Buffers 简介</span></a></h2><p>protobuf 即 Protocol Buffers，是一种轻便高效的结构化数据存储格式，与语言、平台无关，可扩展可序列化。protobuf 性能和效率大幅度优于 JSON、XML 等其他的结构化数据格式。protobuf 是以二进制方式存储的，占用空间小，但也带来了可读性差的缺点。protobuf 在通信协议和数据存储等领域应用广泛。例如著名的分布式缓存工具 <a href="https://memcached.org/" target="_blank" rel="noopener noreferrer">Memcached</a> 的 Go 语言版本<a href="https://github.com/golang/groupcache" target="_blank" rel="noopener noreferrer">groupcache</a> 就使用了 protobuf 作为其 RPC 数据格式。</p><p>Protobuf 在 <code>.proto</code> 定义需要处理的结构化数据，可以通过 <code>protoc</code> 工具，将 <code>.proto</code> 文件转换为 C、C++、Golang、Java、Python 等多种语言的代码，兼容性好，易于使用。</p><h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装"><span>2 安装</span></a></h2><h3 id="_2-1-protoc" tabindex="-1"><a class="header-anchor" href="#_2-1-protoc"><span>2.1 protoc</span></a></h3><p>从 <a href="https://github.com/protocolbuffers/protobuf/releases" target="_blank" rel="noopener noreferrer">Protobuf Releases</a> 下载最先版本的发布包安装。如果是 Ubuntu，可以按照如下步骤操作（以3.11.2为例）。</p><pre><code># 下载安装包
$ wget https://github.com/protocolbuffers/protobuf/releases/download/v3.11.2/protoc-3.11.2-linux-x86_64.zip
# 解压到 /usr/local 目录下
$ sudo 7z x protoc-3.11.2-linux-x86_64.zip -o/usr/local
</code></pre><p>如果不想安装在 /usr/local 目录下，可以解压到其他的其他，并把解压路径下的 bin 目录 加入到环境变量即可。</p><p>如果能正常显示版本，则表示安装成功。</p><pre><code class="language-shell">$ protoc --version
libprotoc 3.11.2
</code></pre><h3 id="_2-2-protoc-gen-go" tabindex="-1"><a class="header-anchor" href="#_2-2-protoc-gen-go"><span>2.2 protoc-gen-go</span></a></h3><p>我们需要在 Golang 中使用 protobuf，还需要安装 protoc-gen-go，这个工具用来将 <code>.proto</code> 文件转换为 Golang 代码。</p><pre><code class="language-shell">go get -u github.com/golang/protobuf/protoc-gen-go
</code></pre><p>protoc-gen-go 将自动安装到 <code>$GOPATH/bin</code> 目录下，也需要将这个目录加入到环境变量中。</p><h2 id="_3-定义消息类型" tabindex="-1"><a class="header-anchor" href="#_3-定义消息类型"><span>3 定义消息类型</span></a></h2><p>接下来，我们创建一个非常简单的示例，<code>student.proto</code></p><pre><code class="language-proto">syntax = &quot;proto3&quot;;
package main;

// this is a comment
message Student {
  string name = 1;
  bool male = 2;
  repeated int32 scores = 3;
}
</code></pre><p>在当前目录下执行：</p><pre><code class="language-shell">$ protoc --go_out=. *.proto
$ ls
student.pb.go  student.proto
</code></pre><p>即是，将该目录下的所有的 .proto 文件转换为 Go 代码，我们可以看到该目录下多出了一个 Go 文件 <em>student.pb.go</em>。这个文件内部定义了一个结构体 Student，以及相关的方法：</p><pre><code class="language-go">type Student struct {
 Name string \`protobuf:&quot;bytes,1,opt,name=name,proto3&quot; json:&quot;name,omitempty&quot;\`
 Male bool \`protobuf:&quot;varint,2,opt,name=male,proto3&quot; json:&quot;male,omitempty&quot;\`
 Scores []int32 \`protobuf:&quot;varint,3,rep,packed,name=scores,proto3&quot; json:&quot;scores,omitempty&quot;\`
 ...
}
</code></pre><p>逐行解读<code>student.proto</code></p><ul><li>protobuf 有2个版本，默认版本是 proto2，如果需要 proto3，则需要在非空非注释第一行使用 <code>syntax = &quot;proto3&quot;</code> 标明版本。</li><li><code>package</code>，即包名声明符是可选的，用来防止不同的消息类型有命名冲突。</li><li>消息类型 使用 <code>message</code> 关键字定义，Student 是类型名，name, male, scores 是该类型的 3 个字段，类型分别为 string, bool 和 []int32。字段可以是标量类型，也可以是合成类型。</li><li>每个字段的修饰符默认是 singular，一般省略不写，<code>repeated</code> 表示字段可重复，即用来表示 Go 语言中的数组类型。</li><li>每个字符 <code>=</code>后面的数字称为标识符，每个字段都需要提供一个唯一的标识符。标识符用来在消息的二进制格式中识别各个字段，一旦使用就不能够再改变，标识符的取值范围为 [1, 2^29 - 1] 。</li><li>.proto 文件可以写注释，单行注释 <code>//</code>，多行注释 <code>/* ... */</code></li><li>一个 .proto 文件中可以写多个消息类型，即对应多个结构体(struct)。</li></ul><p>接下来，就可以在项目代码中直接使用了，以下是一个非常简单的例子，即证明被序列化的和反序列化后的实例，包含相同的数据。</p><pre><code class="language-go">package main

import (
 &quot;log&quot;

 &quot;github.com/golang/protobuf/proto&quot;
)

func main() {
 test := &amp;Student{
  Name: &quot;geektutu&quot;,
  Male:  true,
  Scores: []int32{98, 85, 88},
 }
 data, err := proto.Marshal(test)
 if err != nil {
  log.Fatal(&quot;marshaling error: &quot;, err)
 }
 newTest := &amp;Student{}
 err = proto.Unmarshal(data, newTest)
 if err != nil {
  log.Fatal(&quot;unmarshaling error: &quot;, err)
 }
 // Now test and newTest contain the same data.
 if test.GetName() != newTest.GetName() {
  log.Fatalf(&quot;data mismatch %q != %q&quot;, test.GetName(), newTest.GetName())
 }
}
</code></pre><ul><li>保留字段(Reserved Field)</li></ul><p>更新消息类型时，可能会将某些字段/标识符删除。这些被删掉的字段/标识符可能被重新使用，如果加载老版本的数据时，可能会造成数据冲突，在升级时，可以将这些字段/标识符保留(reserved)，这样就不会被重新使用了，protoc 会检查。</p><pre><code class="language-proto">message Foo {
  reserved 2, 15, 9 to 11;
  reserved &quot;foo&quot;, &quot;bar&quot;;
}
</code></pre><h2 id="_4-字段类型" tabindex="-1"><a class="header-anchor" href="#_4-字段类型"><span>4 字段类型</span></a></h2><h3 id="_4-1-标量类型-scalar" tabindex="-1"><a class="header-anchor" href="#_4-1-标量类型-scalar"><span>4.1 标量类型(Scalar)</span></a></h3><table><thead><tr><th style="text-align:left;">proto类型</th><th style="text-align:left;">go类型</th><th style="text-align:left;">备注</th><th style="text-align:left;">proto类型</th><th style="text-align:left;">go类型</th><th style="text-align:left;">备注</th></tr></thead><tbody><tr><td style="text-align:left;">double</td><td style="text-align:left;">float64</td><td style="text-align:left;"></td><td style="text-align:left;">float</td><td style="text-align:left;">float32</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">int32</td><td style="text-align:left;">int32</td><td style="text-align:left;"></td><td style="text-align:left;">int64</td><td style="text-align:left;">int64</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">uint32</td><td style="text-align:left;">uint32</td><td style="text-align:left;"></td><td style="text-align:left;">uint64</td><td style="text-align:left;">uint64</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">sint32</td><td style="text-align:left;">int32</td><td style="text-align:left;">适合负数</td><td style="text-align:left;">sint64</td><td style="text-align:left;">int64</td><td style="text-align:left;">适合负数</td></tr><tr><td style="text-align:left;">fixed32</td><td style="text-align:left;">uint32</td><td style="text-align:left;">固长编码，适合大于2^28的值</td><td style="text-align:left;">fixed64</td><td style="text-align:left;">uint64</td><td style="text-align:left;">固长编码，适合大于2^56的值</td></tr><tr><td style="text-align:left;">sfixed32</td><td style="text-align:left;">int32</td><td style="text-align:left;">固长编码</td><td style="text-align:left;">sfixed64</td><td style="text-align:left;">int64</td><td style="text-align:left;">固长编码</td></tr><tr><td style="text-align:left;">bool</td><td style="text-align:left;">bool</td><td style="text-align:left;"></td><td style="text-align:left;">string</td><td style="text-align:left;">string</td><td style="text-align:left;">UTF8 编码，长度不超过 2^32</td></tr><tr><td style="text-align:left;">bytes</td><td style="text-align:left;">[]byte</td><td style="text-align:left;">任意字节序列，长度不超过 2^32</td><td style="text-align:left;"></td><td style="text-align:left;"></td><td style="text-align:left;"></td></tr></tbody></table><p>标量类型如果没有被赋值，则不会被序列化，解析时，会赋予默认值。</p><ul><li>strings：空字符串</li><li>bytes：空序列</li><li>bools：false</li><li>数值类型：0</li></ul><h3 id="_4-2-枚举-enumerations" tabindex="-1"><a class="header-anchor" href="#_4-2-枚举-enumerations"><span>4.2 枚举(Enumerations)</span></a></h3><p>枚举类型适用于提供一组预定义的值，选择其中一个。例如我们将性别定义为枚举类型。</p><pre><code class="language-proto">message Student {
  string name = 1;
  enum Gender {
    FEMALE = 0;
    MALE = 1;
  }
  Gender gender = 2;
  repeated int32 scores = 3;
}
</code></pre><ul><li>枚举类型的第一个选项的标识符必须是0，这也是枚举类型的默认值。</li><li>别名（Alias），允许为不同的枚举值赋予相同的标识符，称之为别名，需要打开<code>allow_alias</code>选项。</li></ul><pre><code class="language-proto">message EnumAllowAlias {
  enum Status {
    option allow_alias = true;
    UNKOWN = 0;
    STARTED = 1;
    RUNNING = 1;
  }
}
</code></pre><h3 id="_4-3-使用其他消息类型" tabindex="-1"><a class="header-anchor" href="#_4-3-使用其他消息类型"><span>4.3 使用其他消息类型</span></a></h3><p><code>Result</code>是另一个消息类型，在 SearchReponse 作为一个消息字段类型使用。</p><pre><code class="language-proto">message SearchResponse {
  repeated Result results = 1; 
}

message Result {
  string url = 1;
  string title = 2;
  repeated string snippets = 3;
}
</code></pre><p>嵌套写也是支持的：</p><pre><code class="language-proto">message SearchResponse {
  message Result {
    string url = 1;
    string title = 2;
    repeated string snippets = 3;
  }
  repeated Result results = 1;
}
</code></pre><p>如果定义在其他文件中，可以导入其他消息类型来使用：</p><pre><code class="language-proto">import &quot;myproject/other_protos.proto&quot;;
</code></pre><h3 id="_4-4-任意类型-any" tabindex="-1"><a class="header-anchor" href="#_4-4-任意类型-any"><span>4.4 任意类型(Any)</span></a></h3><p>Any 可以表示不在 .proto 中定义任意的内置类型。</p><pre><code class="language-proto">import &quot;google/protobuf/any.proto&quot;;

message ErrorStatus {
  string message = 1;
  repeated google.protobuf.Any details = 2;
}
</code></pre><h3 id="_4-5-oneof" tabindex="-1"><a class="header-anchor" href="#_4-5-oneof"><span>4.5 oneof</span></a></h3><pre><code class="language-proto">message SampleMessage {
  oneof test_oneof {
    string name = 4;
    SubMessage sub_message = 9;
  }
}
</code></pre><h3 id="_4-6-map" tabindex="-1"><a class="header-anchor" href="#_4-6-map"><span>4.6 map</span></a></h3><pre><code class="language-proto">message MapRequest {
  map&lt;string, int32&gt; points = 1;
}
</code></pre><h2 id="_5-定义服务-services" tabindex="-1"><a class="header-anchor" href="#_5-定义服务-services"><span>5 定义服务(Services)</span></a></h2><p>如果消息类型是用来远程通信的(Remote Procedure Call, RPC)，可以在 .proto 文件中定义 RPC 服务接口。例如我们定义了一个名为 SearchService 的 RPC 服务，提供了 <code>Search</code> 接口，入参是 <code>SearchRequest</code> 类型，返回类型是 <code>SearchResponse</code></p><pre><code class="language-go">service SearchService {
  rpc Search (SearchRequest) returns (SearchResponse);
}
</code></pre><p>官方仓库也提供了一个<a href="https://github.com/protocolbuffers/protobuf/blob/master/docs/third_party.md" target="_blank" rel="noopener noreferrer">插件列表</a>，帮助开发基于 Protocol Buffer 的 RPC 服务。</p><h2 id="_6-protoc-其他参数" tabindex="-1"><a class="header-anchor" href="#_6-protoc-其他参数"><span>6 protoc 其他参数</span></a></h2><p>命令行使用方法</p><pre><code class="language-shell">protoc --proto_path=IMPORT_PATH --&lt;lang&gt;_out=DST_DIR path/to/file.proto
</code></pre><ul><li><code>--proto_path=IMPORT_PATH</code>：可以在 .proto 文件中 import 其他的 .proto 文件，proto_path 即用来指定其他 .proto 文件的查找目录。如果没有引入其他的 .proto 文件，该参数可以省略。</li><li><code>--&lt;lang&gt;_out=DST_DIR</code>：指定生成代码的目标文件夹，例如 –go_out=. 即生成 GO 代码在当前文件夹，另外支持 cpp/java/python/ruby/objc/csharp/php 等语言</li></ul><h2 id="_7-推荐风格" tabindex="-1"><a class="header-anchor" href="#_7-推荐风格"><span>7 推荐风格</span></a></h2><ul><li>文件(Files) <ul><li>文件名使用小写下划线的命名风格，例如 lower_snake_case.proto</li><li>每行不超过 80 字符</li><li>使用 2 个空格缩进</li></ul></li><li>包(Packages) <ul><li>包名应该和目录结构对应，例如文件在<code>my/package/</code>目录下，包名应为 <code>my.package</code></li></ul></li><li>消息和字段(Messages &amp; Fields) <ul><li>消息名使用首字母大写驼峰风格(CamelCase)，例如<code>message StudentRequest { ... }</code></li><li>字段名使用小写下划线的风格，例如 <code>string status_code = 1</code></li><li>枚举类型，枚举名使用首字母大写驼峰风格，例如 <code>enum FooBar</code>，枚举值使用全大写下划线隔开的风格(CAPITALS_WITH_UNDERSCORES )，例如 FOO_DEFAULT=1</li></ul></li><li>服务(Services) <ul><li>RPC 服务名和方法名，均使用首字母大写驼峰风格，例如<code>service FooService{ rpc GetSomething() }</code></li></ul></li></ul><h2 id="附-参考" tabindex="-1"><a class="header-anchor" href="#附-参考"><span>附：参考</span></a></h2><ol><li><a href="https://github.com/protocolbuffers/protobuf" target="_blank" rel="noopener noreferrer">protobuf 代码仓库 - github.com</a></li><li><a href="https://github.com/golang/protobuf" target="_blank" rel="noopener noreferrer">golang protobuf 代码仓库 - github.com</a></li><li><a href="https://en.wikipedia.org/wiki/Remote_procedure_call" target="_blank" rel="noopener noreferrer">Remote procedure call 远程过程调用 - wikipedia.org</a></li><li><a href="https://github.com/golang/groupcache" target="_blank" rel="noopener noreferrer">Groupcache Go语言版 memcached - github.com</a></li><li><a href="https://developers.google.com/protocol-buffers/docs/proto3" target="_blank" rel="noopener noreferrer">Language Guide (proto3) 官方指南 - google.com</a></li><li><a href="https://developers.google.com/protocol-buffers/docs/style" target="_blank" rel="noopener noreferrer">Proto Style Guide 代码风格指南 - google.com</a></li><li><a href="https://github.com/protocolbuffers/protobuf/blob/master/docs/third_party.md" target="_blank" rel="noopener noreferrer">Protocol Buffer 插件列表 - github.com</a></li><li><a href="https://geektutu.com/post/quick-go-protobuf.html" target="_blank" rel="noopener noreferrer">极客兔兔</a></li></ol>`,67),n=[a];function s(p,i){return o(),t("div",null,n)}const d=e(l,[["render",s],["__file","go-proto.html.vue"]]),g=JSON.parse('{"path":"/go-tutor/go-proto.html","title":"GoProtobuf简明教程","lang":"zh-CN","frontmatter":{"order":3,"description":"GoProtobuf简明教程 提示 转载自极客兔兔 他的网站链接 Golang Protocol Buffers 1 Protocol Buffers 简介 protobuf 即 Protocol Buffers，是一种轻便高效的结构化数据存储格式，与语言、平台无关，可扩展可序列化。protobuf 性能和效率大幅度优于 JSON、XML 等其他的结构...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/go-proto.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"GoProtobuf简明教程"}],["meta",{"property":"og:description","content":"GoProtobuf简明教程 提示 转载自极客兔兔 他的网站链接 Golang Protocol Buffers 1 Protocol Buffers 简介 protobuf 即 Protocol Buffers，是一种轻便高效的结构化数据存储格式，与语言、平台无关，可扩展可序列化。protobuf 性能和效率大幅度优于 JSON、XML 等其他的结构..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://geektutu.com/post/quick-go-protobuf/go-protobuf.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-29T07:25:09.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-29T07:25:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GoProtobuf简明教程\\",\\"image\\":[\\"https://geektutu.com/post/quick-go-protobuf/go-protobuf.jpg\\"],\\"dateModified\\":\\"2022-07-29T07:25:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1 Protocol Buffers 简介","slug":"_1-protocol-buffers-简介","link":"#_1-protocol-buffers-简介","children":[]},{"level":2,"title":"2 安装","slug":"_2-安装","link":"#_2-安装","children":[{"level":3,"title":"2.1 protoc","slug":"_2-1-protoc","link":"#_2-1-protoc","children":[]},{"level":3,"title":"2.2 protoc-gen-go","slug":"_2-2-protoc-gen-go","link":"#_2-2-protoc-gen-go","children":[]}]},{"level":2,"title":"3 定义消息类型","slug":"_3-定义消息类型","link":"#_3-定义消息类型","children":[]},{"level":2,"title":"4 字段类型","slug":"_4-字段类型","link":"#_4-字段类型","children":[{"level":3,"title":"4.1 标量类型(Scalar)","slug":"_4-1-标量类型-scalar","link":"#_4-1-标量类型-scalar","children":[]},{"level":3,"title":"4.2 枚举(Enumerations)","slug":"_4-2-枚举-enumerations","link":"#_4-2-枚举-enumerations","children":[]},{"level":3,"title":"4.3 使用其他消息类型","slug":"_4-3-使用其他消息类型","link":"#_4-3-使用其他消息类型","children":[]},{"level":3,"title":"4.4 任意类型(Any)","slug":"_4-4-任意类型-any","link":"#_4-4-任意类型-any","children":[]},{"level":3,"title":"4.5 oneof","slug":"_4-5-oneof","link":"#_4-5-oneof","children":[]},{"level":3,"title":"4.6 map","slug":"_4-6-map","link":"#_4-6-map","children":[]}]},{"level":2,"title":"5 定义服务(Services)","slug":"_5-定义服务-services","link":"#_5-定义服务-services","children":[]},{"level":2,"title":"6 protoc 其他参数","slug":"_6-protoc-其他参数","link":"#_6-protoc-其他参数","children":[]},{"level":2,"title":"7 推荐风格","slug":"_7-推荐风格","link":"#_7-推荐风格","children":[]},{"level":2,"title":"附：参考","slug":"附-参考","link":"#附-参考","children":[]}],"git":{"createdTime":1652172111000,"updatedTime":1659079509000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":6.88,"words":2064},"filePathRelative":"go-tutor/go-proto.md","localizedDate":"2022年5月10日","autoDesc":true}');export{d as comp,g as data};
