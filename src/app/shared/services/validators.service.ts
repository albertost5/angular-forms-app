import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeDefaultUsername = (formControl: FormControl): ValidationErrors | null => {
    const username = formControl.value.trim().toLowerCase();

    if (username && username === 'tiku') {
      return {
        userIsTaken: true
      }
    }

    return null;
  }

  public isInvalidField(form: FormGroup, formField: string): boolean {
    return !!form.controls[formField].errors && form.controls[formField].touched;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({notEqual: true});
        return {notEqual: true}
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }
}
