# lessjs配置

```less
@charset "UTF-8";

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

```
