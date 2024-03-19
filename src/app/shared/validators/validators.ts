import {FormControl, ValidationErrors} from '@angular/forms';

// MOVED TO VALIDATORS SERVICE
export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const cantBeDefaultUsername = (formControl: FormControl): ValidationErrors | null => {
  const username = formControl.value.trim().toLowerCase();

  if (username && username === 'tiku') {
    return {
      userIsTaken: true
    }
  }

  return null;
}
