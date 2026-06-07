import {AfterViewInit, Component, inject, model, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {InputFieldType} from '../../../shared/components/form-components/input-field-type/input-field-type';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {svglGoogle} from '@ng-icons/svgl';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {mergeMap, Subject, Subscription} from 'rxjs';
import {Alert} from '../../../shared/directives/alert';
import {removeQueryParameter} from '../../../shared/utils/UrlUtilities';
import {AlertPopup} from '../../../shared/components/alert-popup/alert-popup';
import {Client, ILoginRequest, LoginRequest} from '../../../api/trimly-api';
import {LOAD_STATE} from '../../../shared/utils/LOAD_STATE';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    NgIcon,
    RouterLink,
    AlertPopup
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  viewProviders: [provideIcons({ svglGoogle })]
})
export class LoginPage implements OnInit, AfterViewInit{
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  client = inject(Client);
  router = inject(Router);
  queryParamsSubscription: Subscription | null = null;
  emailConfirmed = new Subject<void>();
  googleIcon = 'svglGoogle'
  form = new FormGroup({});
  model = { email: '', password: '' };
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
      className:'flex rounded-lg w-full'
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
      className:'flex rounded-lg mt-2 w-full!'
    }
  ];
  loadState = LOAD_STATE.NOT_LOADING;
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParamMap.subscribe(params => {
      const emailConfirmed = params.get('emailConfirmed');
      if(emailConfirmed == 'true') {
        this.emailConfirmed.next();
        removeQueryParameter('emailConfirmed');
      }
    })
  }
  onSubmit() {
    console.log(model);
    if(this.form.valid) {
      const payload: ILoginRequest = {
        email: this.model.email,
        password: this.model.password
      }
      const request = new LoginRequest(payload);
      this.client.login(false, false, request).subscribe({
        error: (err) => {console.log("Back error" )},
        next: (res) => {
          console.log("Back")
          this.router.navigate(['/home']);
        }
      })

    }
  }

}
