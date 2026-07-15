# Angular 表单处理

## 模板驱动表单

适合简单表单场景。

```typescript
// app.module.ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}
```

```html
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
  <input name="name" ngModel required #name="ngModel">
  <div *ngIf="name.invalid && name.touched">
    Name is required
  </div>

  <input name="email" ngModel email #email="ngModel">
  <div *ngIf="email.invalid && email.touched">
    Valid email is required
  </div>

  <button type="submit" [disabled]="myForm.invalid">Submit</button>
</form>
```

```typescript
onSubmit(form: NgForm) {
  if (form.valid) {
    console.log(form.value);  // { name: '...', email: '...' }
  }
}
```

## 响应式表单

适合复杂表单场景，更灵活可测试。

```typescript
// app.module.ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule],
})
export class AppModule {}
```

### 基本使用

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ReactiveFormComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [0, [Validators.min(18), Validators.max(100)]],
      address: this.fb.group({
        city: [''],
        street: [''],
      }),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
  }
}
```

```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <input formControlName="name">
  <div *ngIf="myForm.get('name')?.invalid && myForm.get('name')?.touched">
    Name is required
  </div>

  <input formControlName="email">
  <div *ngIf="myForm.get('email')?.errors?.['email']">
    Invalid email format
  </div>

  <div formGroupName="address">
    <input formControlName="city" placeholder="City">
    <input formControlName="street" placeholder="Street">
  </div>

  <button type="submit" [disabled]="myForm.invalid">Submit</button>
</form>
```

### 自定义验证器

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = control.value?.includes(name);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

// 使用
this.myForm = this.fb.group({
  name: ['', [Validators.required, forbiddenNameValidator('admin')]],
});
```

### 动态添加控件

```typescript
import { FormArray } from '@angular/forms';

export class DynamicFormComponent {
  myForm = this.fb.group({
    items: this.fb.array([]),
  });

  get items() {
    return this.myForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.control(''));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }
}
```

```html
<div formArrayName="items">
  <div *ngFor="let item of items.controls; let i = index">
    <input [formControlName]="i">
    <button (click)="removeItem(i)">Remove</button>
  </div>
</div>
<button (click)="addItem()">Add Item</button>
```

## 常见错误

### `Can't bind to 'ngModel' since it isn't a known property of 'input'`

需要导入 `FormsModule`：

```typescript
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [FormsModule],
})
```

## 参考

- [Angular 表单文档](https://angular.io/guide/forms-overview)
- [响应式表单](https://angular.io/guide/reactive-forms)