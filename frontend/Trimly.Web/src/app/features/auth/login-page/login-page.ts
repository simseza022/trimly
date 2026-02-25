import {AfterViewInit, Component, inject, model, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {InputFieldType} from '../../../shared/components/form-components/input-field-type/input-field-type';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {svglGoogle} from '@ng-icons/svgl';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {mergeMap, Subject, Subscription} from 'rxjs';
import {Alert} from '../../../shared/directives/alert';
import {removeQueryParameter} from '../../../shared/utils/UrlUtilities';
import {AlertPopup} from '../../../shared/components/alert-popup/alert-popup';

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
  queryParamsSubscription: Subscription | null = null;
  emailConfirmed = new Subject<void>();
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
     //Todo: Implement login
    }
  }

}
