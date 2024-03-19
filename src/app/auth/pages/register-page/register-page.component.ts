import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import {ValidatorsService} from '../../../shared/services/validators.service';
import {EmailValidatorService} from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  constructor(
    private readonly fb: FormBuilder,
    private readonly validatorsService: ValidatorsService,
    private readonly emailValidatorService: EmailValidatorService
  ) {
  }

  public form = this.fb.group({
    // name: ['', [Validators.required, Validators.pattern( customValidators.firstNameAndLastnamePattern )]],
    name: ['', [Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )]],
    // email: ['', [Validators.required, Validators.email]],
    // email: ['', [Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidatorService()]],
    email: ['', [Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidatorService ]],
    // username: ['', [Validators.required, customValidators.cantBeDefaultUsername]],
    username: ['', [Validators.required, this.validatorsService.cantBeDefaultUsername]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  public isInvalidField(formField: string): boolean {
    return this.validatorsService.isInvalidField(this.form, formField);
  }

  public onSubmit(): void {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
  }
}
