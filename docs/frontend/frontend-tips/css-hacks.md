# css hack

## 透明度问题

> 如果我们给父元素添加opacity:0.4后，子元素的red颜色也变成了0.4的透明度

解决方法：
父元素的透明度用rgba的方法 ,子集可以用opacity了

```css
background:rgba(0,0,0,0.4);
# 或者使用hex
background:#ffffff67;
```

 透明度对照表见: [链接](https://blog.csdn.net/ezconn/article/details/90052114?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_baidulandingword-1&spm=1001.2101.3001.4242)
​

## 活用less：遍历生成margin/padding/fontSize等类名

起因： 之前项目里写margin/padding之类的样式都是用的穷举的方式，实在觉得冗余又繁琐。下面直接贴代码，解放你的双手

```less
/*
    margin padding fontSize width 通用样式表
    免去你每次重写样式的烦恼
    marked by Jacky
*/
.loopStyle(@counter) when (@counter > 0) {
    .p-@{counter} {
      padding: (1vw * @counter);
    }
    .p-t-@{counter} {
      padding-top: (1vw * @counter);
    }
    .p-r-@{counter} {
      padding-right: (1vw * @counter);
    }
    .p-b-@{counter} {
      padding-bottom: (1vw * @counter);
    }
    .p-l-@{counter} {
      padding-left: (1vw * @counter);
    }
    .m-@{counter} {
      margin: (1vw * @counter);
    }
    .m-t-@{counter} {
      margin-top: (1vw * @counter);
    }
    .m-r-@{counter} {
      margin-right: (1vw * @counter);
    }
    .m-b-@{counter} {
      margin-bottom: (1vw * @counter);
    }
    .m-l-@{counter} {
      margin-left: (1vw * @counter);
    }
    .fz-@{counter} {
      font-size: (1vw * @counter);
    }
    .width@{counter}{
      width: 1% * @counter;
    }
    .loopStyle((@counter - 1));    // 递归调用自身
}
   

.loopStyle(100);

@selectors: range(100);

each(@selectors, .(@v, @k) {
  each(@selectors {
    .m-@{v}-@{value} {
      margin: 1px*@v 1px*@value;
    }
  })
});
```

使用:

```less
<div className="m-t-10"></div> // 对应less样式 marginTop: 10vw
```

使用scss

```less
@for $i from 1 through 200 {
  .m-#{$i} { margin: ($i/100)+rem; }
  .m-t-#{$i} { margin-top: ($i/100)+rem; }
  .m-b-#{$i} { margin-bottom: ($i/100)+rem; }
  .m-l-#{$i} { margin-left: ($i/100)+rem; }
  .m-r-#{$i} { margin-right: ($i/100)+rem; }
 
  .p-#{$i} { padding: ($i/100)+rem; }
  .p-t-#{$i} { padding-top: ($i/100)+rem; }
  .p-b-#{$i} { padding-bottom: ($i/100)+rem; }
  .p-l-#{$i} { padding-left: ($i/100)+rem; }
  .p-r-#{$i} { padding-right: ($i/100)+rem; }
 
  .fz-#{$i} { font-size: ($i/100)+rem; }
}
```
