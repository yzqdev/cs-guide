import{_ as e,c as t,o,d as r}from"./app-CbULZrmi.js";const n={},l=r(`<h1 id="nest技巧" tabindex="-1"><a class="header-anchor" href="#nest技巧"><span>nest技巧</span></a></h1><h2 id="引入另一个module的service" tabindex="-1"><a class="header-anchor" href="#引入另一个module的service"><span>引入另一个module的service</span></a></h2><p><a href="https://blog.bitsrc.io/nest-js-inject-service-from-another-module-cf85987398d5" target="_blank" rel="noopener noreferrer">https://blog.bitsrc.io/nest-js-inject-service-from-another-module-cf85987398d5</a></p><blockquote><p>item.module.ts</p></blockquote><pre><code class="language-ts">import { Module } from &#39;@nestjs/common&#39;;
import { ItemController } from &#39;./item.controller&#39;;
import { ItemService } from &#39;./item.service&#39;;

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}

</code></pre><blockquote><p>player.module.ts</p></blockquote><pre><code class="language-ts">import { Module } from &#39;@nestjs/common&#39;;
import { ItemModule } from &#39;src/item/item.module&#39;;
import { PlayerController } from &#39;./player.controller&#39;;
import { PlayerService } from &#39;./player.service&#39;;

@Module({
  imports: [ItemModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
</code></pre><blockquote><p>player.controller.ts 这样使用</p></blockquote><pre><code class="language-ts">import { Controller, Get, Inject, Param } from &#39;@nestjs/common&#39;;
import { PlayerService } from &#39;./player.service&#39;;

@Controller(&#39;player&#39;)
export class PlayerController {
  @Inject(PlayerService)
  private readonly service: PlayerService;

  @Get(&#39;find/:id&#39;)
  public findPlayerById(@Param(&#39;id&#39;) id: string): Promise&lt;any&gt; {
    return this.service.findPlayerById(id);
  }
}

</code></pre>`,9),s=[l];function i(c,a){return o(),t("div",null,s)}const d=e(n,[["render",i],["__file","tips.html.vue"]]),p=JSON.parse('{"path":"/node-tutor/nestjs/tips.html","title":"nest技巧","lang":"zh-CN","frontmatter":{"description":"nest技巧 引入另一个module的service https://blog.bitsrc.io/nest-js-inject-service-from-another-module-cf85987398d5 item.module.ts player.module.ts player.controller.ts 这样使用","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/nestjs/tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nest技巧"}],["meta",{"property":"og:description","content":"nest技巧 引入另一个module的service https://blog.bitsrc.io/nest-js-inject-service-from-another-module-cf85987398d5 item.module.ts player.module.ts player.controller.ts 这样使用"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-05T07:30:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-05T07:30:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nest技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-05T07:30:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"引入另一个module的service","slug":"引入另一个module的service","link":"#引入另一个module的service","children":[]}],"git":{"createdTime":1712302235000,"updatedTime":1712302235000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.38,"words":114},"filePathRelative":"node-tutor/nestjs/tips.md","localizedDate":"2024年4月5日","autoDesc":true}');export{d as comp,p as data};
