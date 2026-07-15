# Angular 组件与模板

## 组件 (Component)

组件是 Angular 应用的基本构建块。

```typescript
// hello.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hello',        // 自定义标签名
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {
  @Input() name: string = '';                // 父组件传值
  @Output() greet = new EventEmitter<string>(); // 向父组件发送事件

  message: string = 'Hello Angular';

  sayHello() {
    this.greet.emit(this.message);
  }
}
```

```html
<!-- hello.component.html -->
<div class="hello">
  <h1>{{ message }}</h1>
  <p>Hello, {{ name }}!</p>
  <button (click)="sayHello()">Greet</button>
</div>
```

## 模板语法

```html
<!-- 插值 -->
<p>{{ title }}</p>

<!-- 属性绑定 -->
<img [src]="imageUrl">
<a [href]="url">Link</a>

<!-- 事件绑定 -->
<button (click)="handleClick()">Click</button>
<input (input)="onInput($event)">

<!-- 双向绑定 -->
<input [(ngModel)]="username">

<!-- 条件渲染 -->
<div *ngIf="isLoggedIn">Welcome back!</div>
<div *ngIf="isLoggedIn; else guest">User</div>
<ng-template #guest>Guest</ng-template>

<!-- 循环 -->
<li *ngFor="let item of items; let i = index">{{ i }}: {{ item.name }}</li>
```

## 指令 (Directives)

### 内置结构指令

- `*ngIf` - 条件渲染
- `*ngFor` - 列表循环
- `*ngSwitch` - 多条件切换
- `ngClass` / `ngStyle` - 动态样式

### 自定义指令

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

```html
<p [appHighlight]="'lightblue'">Hover me to highlight</p>
```

## 管道 (Pipe)

```html
<!-- 内置管道 -->
<p>{{ birthday | date:'yyyy-MM-dd' }}</p>
<p>{{ price | currency:'CNY' }}</p>
<p>{{ text | uppercase }}</p>
<p>{{ data | json }}</p>

<!-- 链式管道 -->
<p>{{ date | date:'fullDate' | uppercase }}</p>
```

### 自定义管道

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

```html
<p>{{ 'Angular' | reverse }}</p>  <!-- 输出: ralugnA -->
```

## 组件生命周期

```typescript
export class MyComponent implements
  OnInit, OnChanges, OnDestroy, AfterViewInit {

  ngOnInit() {}         // 初始化，请求数据
  ngOnChanges() {}      // 输入属性变化
  ngAfterViewInit() {}  // 视图初始化
  ngOnDestroy() {}      // 销毁（清理订阅）
}
```

## 参考

- [Angular 组件文档](https://angular.io/guide/component-overview)
- [Angular 模板语法](https://angular.io/guide/template-syntax)