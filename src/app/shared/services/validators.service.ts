import { Injectable } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';

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
}
