import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

interface Person {
  gender: string;
  notifications: boolean;
}

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  constructor(
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form.reset(this.person);
  }

  public form = this.fb.group({
    gender: new FormControl('M', Validators.required),
    notifications: new FormControl(true, Validators.required),
    terms: new FormControl(false, Validators.requiredTrue)
  });

  public person: Person = {
    gender: 'F',
    notifications: false,
  };

  onSubmit(): void {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.reset({
      gender: 'M',
      notifications: true,
      terms: false
    });
  }

  isInvalidField(formField: string): boolean {
    return !!this.form.controls.terms.errors && this.form.controls.terms.touched;
  }
}
