import{_ as o,r as n,c as r,b as a,w as c,a as e,o as s}from"./app-CbULZrmi.js";const i={},d=e("h1",{id:"地理位置相关",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#地理位置相关"},[e("span",null,"地理位置相关")])],-1),l=e("pre",null,[e("code",{class:"language-html"},`<button onclick='run()'>点击我 </button>
`)],-1),p=e("pre",null,[e("code",{class:"language-js"},`function run (){
    let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

}
`)],-1);function m(u,g){const t=n("CodeDemo");return s(),r("div",null,[d,a(t,{id:"code-demo-3",type:"normal",code:"eJxtUrtOw0AQ/JWVG5+FZdzQmCRShJAoQKB0SG4ul8M5ON9G9+ChKA0NtHwO4nuA32DPdiIUxYVlz83OzI69Tpa+1UmVjObBezSARmglHsapDYZl6eT39fP77evn/QNGxz1lUpskT+4dDd0FI7yiKSIDy9a1Abq09ICriDsYQwdKw+daXqhmORUiWC5eKvA2yDweetVKDL6Ck7IsO6Tlz6oN7bSRFZS12ZzWpjY7MxeEkM6xFbqsl4+Owi7IjbBCINqF62YABKVALQuNDUtvMVggfyuNj1TV6SlXpRnR98iX3CsfFhIqSOEo6hd6gA6x0TTd2T/2FjpAv0IrAS0ld243wIdu6DWFVnppXdEl2ytAWouW0X1Yf6v8xK1h6flsdj1jUZMYVAZtQHpZnytCLXnypkvVCxv+qBru0RaNRI2CtkRDz/6sr+pmaIoNzed9gnz7laMSadF/sfkDPGjNuQ=="},{default:c(()=>[l,p]),_:1})])}const y=o(i,[["render",m],["__file","geo.html.vue"]]),f=JSON.parse('{"path":"/frontend/basic-js/geo.html","title":"地理位置相关","lang":"zh-CN","frontmatter":{"description":"地理位置相关","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/geo.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"地理位置相关"}],["meta",{"property":"og:description","content":"地理位置相关"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-05T00:09:15.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-05T00:09:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"地理位置相关\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-05T00:09:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1650201329000,"updatedTime":1654387755000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.2,"words":61},"filePathRelative":"frontend/basic-js/geo.md","localizedDate":"2022年4月17日","autoDesc":true}');export{y as comp,f as data};
