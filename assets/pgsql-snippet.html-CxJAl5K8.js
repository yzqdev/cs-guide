import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const i={},r=a(`<h1 id="pgsql的代码片段" tabindex="-1"><a class="header-anchor" href="#pgsql的代码片段"><span>pgsql的代码片段</span></a></h1><h2 id="删除所有的sequence" tabindex="-1"><a class="header-anchor" href="#删除所有的sequence"><span>删除所有的sequence</span></a></h2><pre><code class="language-sql">  
DO $$  
DECLARE  
    seq_record RECORD;  
BEGIN  
    FOR seq_record IN SELECT sequence_name FROM information_schema.sequences where table_schema=&#39;public&#39;  
  
    LOOP  
         raise notice &#39;当前seq %&#39;,seq_record.sequence_name;  
  
        EXECUTE &#39;DROP SEQUENCE IF EXISTS &#39; || quote_ident(seq_record.sequence_name) || &#39; CASCADE;&#39;;  
    END LOOP;  
END;  
$$;
</code></pre><h2 id="更改所有serial格式的id为identity" tabindex="-1"><a class="header-anchor" href="#更改所有serial格式的id为identity"><span>更改所有serial格式的id为identity</span></a></h2><pre><code class="language-sql">do $$  
    declare counter record;  
begin  
  for counter in SELECT table_name  
FROM information_schema.tables  where table_schema =&#39;public&#39; loop  
     begin  
    raise notice &#39;counter: %&#39;, counter.table_name;  
    -- execute  &#39;alter table &#39;||counter.table_name||&#39; alter column id set default null;&#39;;
--     execute  &#39;alter table &#39;||counter.table_name||&#39; alter column id drop  identity ;&#39;;  
execute  &#39;alter table  &#39;||counter.table_name||&#39;   alter column id add generated always as identity;&#39;;  
    EXCEPTION WHEN others THEN  
            -- 这里处理异常，可以选择记录日志或执行其他操作  
            -- RAISE NOTICE &#39;Error occurred for i = %&#39;, i;            -- 继续执行下一个循环迭代          
              CONTINUE;  
    end;  
  end loop;  
end $$;
</code></pre><h2 id="重置identity-id的起始值" tabindex="-1"><a class="header-anchor" href="#重置identity-id的起始值"><span>重置identity id的起始值</span></a></h2><pre><code class="language-sql"> SELECT pg_get_serial_sequence(&#39;table_name&#39;, &#39;column_name&#39;);  
  
ALTER SEQUENCE teacher_id_seq RESTART WITH 1;
</code></pre>`,7),s=[r];function o(l,d){return n(),t("div",null,s)}const p=e(i,[["render",o],["__file","pgsql-snippet.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/orm-tutor/pgsql/pgsql-snippet.html","title":"pgsql的代码片段","lang":"zh-CN","frontmatter":{"description":"pgsql的代码片段 删除所有的sequence 更改所有serial格式的id为identity 重置identity id的起始值","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/pgsql/pgsql-snippet.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"pgsql的代码片段"}],["meta",{"property":"og:description","content":"pgsql的代码片段 删除所有的sequence 更改所有serial格式的id为identity 重置identity id的起始值"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T11:42:51.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-07-09T11:42:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"pgsql的代码片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-09T11:42:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"删除所有的sequence","slug":"删除所有的sequence","link":"#删除所有的sequence","children":[]},{"level":2,"title":"更改所有serial格式的id为identity","slug":"更改所有serial格式的id为identity","link":"#更改所有serial格式的id为identity","children":[]},{"level":2,"title":"重置identity id的起始值","slug":"重置identity-id的起始值","link":"#重置identity-id的起始值","children":[]}],"git":{"createdTime":1720525371000,"updatedTime":1720525371000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.59,"words":177},"filePathRelative":"java-tutor/orm-tutor/pgsql/pgsql-snippet.md","localizedDate":"2024年7月9日","autoDesc":true}');export{p as comp,u as data};
