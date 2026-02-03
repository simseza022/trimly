import {Component, model} from '@angular/core';
import {form} from '@angular/forms/signals';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {InputFieldType} from '../../../shared/components/form-components/input-field-type/input-field-type';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    FormlyModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: InputFieldType,
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
      },
      className:'flex bg-gray-100 rounded-lg'
    }
  ];

  onSubmit() {
    console.log(model);
  }
}
