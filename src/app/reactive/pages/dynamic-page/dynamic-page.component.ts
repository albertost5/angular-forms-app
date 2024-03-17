import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: []
})
export class DynamicPageComponent {

  constructor(
    private readonly fb: FormBuilder
  ) {
  }

  public form = this.fb.group({
    // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Spiderman 3', Validators.required]
      // new FormControl('Metal Gear', Validators.required),
      // new FormControl('Spiderman 3', Validators.required)
    ]),
  });

  public newFavGame =  new FormControl('', Validators.required);
  get favoriteGamesControls(): FormArray {
    return this.form.controls.favoriteGames;
  }

  onSubmit(): void {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    this.form.reset({
      name: '',
      favoriteGames: [] // Not works for FormArray
    });
    this.form.controls.favoriteGames.clear();
  }

   isInvalidField(formField: string): boolean | null  {
    return !!this.form.controls.name.errors && this.form.controls.name.touched
  }

  isInvalidFieldInArray(formArray: FormArray, index: number): boolean {
    return !!formArray.controls[index].errors && formArray.controls[index].touched;
  }

  getFieldError(formField: string): string | null {
    if (!this.form.contains(formField)) return null;

    const errors = this.form.controls.name.errors || {};

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

  onDelete(index: number): void {
    this.form.controls.favoriteGames.removeAt(index);
  }

  onAddFav(): void {
    if(!this.newFavGame.valid) return;
    const favGame = this.newFavGame.value;
    this.form.controls.favoriteGames.push(new FormControl(favGame));
    this.newFavGame.reset();
  }
}
