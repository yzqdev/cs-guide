import{_ as t,c as n,o as a,a as e}from"./app-CbULZrmi.js";const s={},l=e("h1",{id:"vue-ls实现",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vue-ls实现"},[e("span",null,"vue-ls实现")])],-1),o=e("pre",null,[e("code",{class:"language-javascript"},`export default class ls {
  static get(name, def = null) {
    const item = localStorage.getItem(name)

    if (item !== null) {
      try {
        const data = JSON.parse(item)

        if (data.expire === null) {
          return data.value
        }

        if (data.expire >= new Date().getTime()) {
          return data.value
        }

        localStorage.removeItem(name)
      } catch (err) {
        return def
      }
    }

    return def
  }

  static set(name, value, expire = null) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null,
    })

    localStorage.setItem(name, stringifyValue)
  }
  static remove(item) {
    localStorage.removeItem(item)
  }
  static clear(){
    localStorage.clear()
  }
}

`)],-1),r=e("p",null,"使用:",-1),i=e("pre",null,[e("code",{class:"language-javascript"},`import ls from '@/utils/ls'

ls.get('item'); 
ls.get('item,'default');
ls.set('item','setItem');
ls.set('item','setitem',60*60*1000)//一小时后失效
ls.remove('item');
ls.clear();
`)],-1),c=[l,o,r,i];function m(p,d){return a(),n("div",null,c)}const g=t(s,[["render",m],["__file","simple-vue-ls.html.vue"]]),v=JSON.parse('{"path":"/cs-tips/frontend/snippets/simple-vue-ls.html","title":"vue-ls实现","lang":"zh-CN","frontmatter":{"description":"vue-ls实现 使用:","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/simple-vue-ls.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue-ls实现"}],["meta",{"property":"og:description","content":"vue-ls实现 使用:"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue-ls实现\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.35,"words":106},"filePathRelative":"cs-tips/frontend/snippets/simple-vue-ls.md","localizedDate":"2023年5月25日","autoDesc":true}');export{g as comp,v as data};
