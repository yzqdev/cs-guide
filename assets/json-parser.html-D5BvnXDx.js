import{_ as e,c as n,o,a as t}from"./app-CbULZrmi.js";const r={},s=t("h1",{id:"json相关",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#json相关"},[t("span",null,"json相关")])],-1),a=t("p",null,"json串反转义",-1),i=t("pre",null,[t("code",{class:"language-java"},`package com.yzq.hutooltest;

import org.apache.commons.text.StringEscapeUtils;
import org.junit.jupiter.api.Test;

/**
 * @author yanni
 * @date time 2022/3/13 13:45
 * @modified By:
 */
public class JsonTest {

    @Test
    public  void parseJson(){
        String s="{\\"c_25\\":{\\"filter\\":{\\"text\\":\\"[\\\\\\"地区/璃月\\\\\\",\\\\\\"元素/岩\\\\\\",\\\\\\"星级/四星\\\\\\",\\\\\\"武器/长柄武器\\\\\\"]\\"}}}";
        System.out.println(StringEscapeUtils.unescapeEcmaScript(s));
    }
}
`)],-1),c=[s,a,i];function p(d,l){return o(),n("div",null,c)}const u=e(r,[["render",p],["__file","json-parser.html.vue"]]),h=JSON.parse('{"path":"/frontend/frontend-tips/json-parser.html","title":"json相关","lang":"zh-CN","frontmatter":{"description":"json相关 json串反转义","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/frontend-tips/json-parser.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"json相关"}],["meta",{"property":"og:description","content":"json相关 json串反转义"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:35:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:35:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"json相关\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:35:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1649172938000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.21,"words":62},"filePathRelative":"frontend/frontend-tips/json-parser.md","localizedDate":"2022年3月21日","autoDesc":true}');export{u as comp,h as data};
