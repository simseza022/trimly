import {Component, model} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FieldArrayType, FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {InputFieldType} from '../../../shared/components/form-components/input-field-type/input-field-type';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {svglGoogle} from '@ng-icons/svgl';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    NgIcon,
    RouterLink
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  viewProviders: [provideIcons({ svglGoogle })]
})
export class LoginPage {
  googleIcon = 'svglGoogle'
  form = new FormGroup({});
  model = { email: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: InputFieldType,
      props: {
        placeholder: 'Email',
        icon: 'matfEmailUncolored',
        type: 'email',
        required: true
      },
      className:'flex rounded-lg'
    },
    {
      key: 'password',
      type: InputFieldType,
      props: {
        placeholder: 'Password',
        icon: 'matPassword',
        type: 'password',
        required: true
      },
      className:'flex rounded-lg'
    }
  ];

  onSubmit() {
    console.log(model);

  }
}
