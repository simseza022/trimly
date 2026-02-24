import {Component, Inject} from '@angular/core';
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {InputFieldType} from '../../../shared/components/form-components/input-field-type/input-field-type';
import {svglGoogle} from '@ng-icons/svgl';
import {RouterLink} from '@angular/router';
import {Client, IRegisterRequest, RegisterRequest} from '../../../api/trimly-api';
import {LOAD_STATE} from '../../../shared/utils/LOAD_STATE';

@Component({
  selector: 'app-register-page',
  imports: [
    FormlyModule,
    FormsModule,
    NgIcon,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
  viewProviders: [provideIcons({ svglGoogle })]
})
export class RegisterPage {
  googleIcon = 'svglGoogle'
  form = new FormGroup({});
  model = { email: '' , password: ''};
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: InputFieldType,
      props: {
        required: true,
        placeholder: 'Email',
        icon: 'matfEmailUncolored',
        type: 'email',
        autocomplete: 'new-password'
      },
      className:'flex rounded-lg'
    },
    {
      key: 'password',
      type: InputFieldType,
      props: {
        required: true,
        placeholder: 'Password',
        icon: 'matPassword',
        type: 'password',
        autocomplete: 'new-password',
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
        validatorHint:
          `Must be more than 8 characters, including
        <li>Minimum 6 characters</li>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one special character</li>`
      },
      className:'flex rounded-lg'
    }
  ];
  apiClient: Client;
  loadState = LOAD_STATE.NOT_LOADING;

  constructor(@Inject(Client) apiClient: Client) {
    this.apiClient = apiClient;
  }

  onSubmit() {
    if(this.form.valid) {
      this.loadState = LOAD_STATE.LOADING;
      const payload: IRegisterRequest = {
        email: this.model.email,
        password: this.model.password
      }

      this.apiClient.register(new RegisterRequest(payload)).subscribe({
        next: () => {
          this.loadState = LOAD_STATE.LOADED;

        },
        error: (err) => {
          this.loadState = LOAD_STATE.ERROR;
        }
      })
    }
  }

  protected readonly LOAD_STATE = LOAD_STATE;
}
