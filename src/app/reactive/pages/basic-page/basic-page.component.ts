import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  templateUrl: './basic-page.component.html',
  styles: []
})
export class BasicPageComponent {

  constructor(
    private readonly fb: FormBuilder
  ) {
  }

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
    this.form.reset({
      price: 0,
      stock: 0
    });
  }

  isInvalidField(formField: string): boolean {
    return !!this.form.controls[formField].errors && this.form.controls[formField].touched;
  }

  getFieldError(formField: string): string | null {
    if (!this.form.contains(formField)) return null;

    const errors = this.form.controls[formField].errors || {};

    for(const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `The field ${formField} is required!`;
          break;
        case 'minlength':
          return `Min length is ${ errors[key].requiredLength }!`;
          break;
        case 'min':
          return `The min value is ${ errors[key].min }`;
      }
    }

    return null;
  }
}
