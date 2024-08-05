import{_ as e,c as t,o,a as n}from"./app-CbULZrmi.js";const r={},s=n("h1",{id:"lessjs配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#lessjs配置"},[n("span",null,"lessjs配置")])],-1),c=n("pre",null,[n("code",{class:"language-less"},`@charset "UTF-8";

// 全局样式开始
.cur-pointer {
  cursor: pointer;
}

.loopStyle(@counter) when (@counter > 0) {
  .p-@{counter} {
    padding: (1px * @counter);
  }
  .p-t-@{counter} {
    padding-top: (1px * @counter);
  }
  .p-r-@{counter} {
    padding-right: (1px * @counter);
  }
  .p-b-@{counter} {
    padding-bottom: (1px * @counter);
  }
  .p-l-@{counter} {
    padding-left: (1px * @counter);
  }
  .m-@{counter} {
    margin: (1px * @counter);
  }
  .m-t-@{counter} {
    margin-top: (1px * @counter);
  }
  .m-r-@{counter} {
    margin-right: (1px * @counter);
  }
  .m-b-@{counter} {
    margin-bottom: (1px * @counter);
  }
  .m-l-@{counter} {
    margin-left: (1px * @counter);
  }
  .fz-@{counter} {
    font-size: (1px * @counter);
  }
  .width-@{counter} {
    width: 1px * @counter;
  }
  .loopStyle((@counter - 1)); // 递归调用自身
}

.loopStyle(100);
@selectors: range(100);

each(@selectors, .(@v ) {
  each(@selectors {
    .m-@{v}-@{value} {
      margin: 1px*@v 1px*@value;
    }
    .p-@{v}-@{value} {
      padding: 1px*@v 1px*@value;
    }
  })
});


.bg-primary {
  background: rgba(19, 46, 160, 1);
}

.df {
  display: flex;
  &-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
.df-col {
  display: flex;
  flex-direction: column;
  &-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.dg-center {
  display: grid;
  align-items: center;
}

//------------全局样式定义结束

`)],-1),p=[s,c];function i(a,l){return o(),t("div",null,p)}const u=e(r,[["render",i],["__file","less-snippets.html.vue"]]),m=JSON.parse('{"path":"/cs-tips/frontend/snippets/less-snippets.html","title":"lessjs配置","lang":"zh-CN","frontmatter":{"description":"lessjs配置","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/less-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"lessjs配置"}],["meta",{"property":"og:description","content":"lessjs配置"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"lessjs配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.69,"words":208},"filePathRelative":"cs-tips/frontend/snippets/less-snippets.md","localizedDate":"2023年5月25日","autoDesc":true}');export{u as comp,m as data};
