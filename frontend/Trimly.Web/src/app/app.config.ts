import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { routes } from './app.routes';
import {InputFieldType} from './shared/components/form-components/input-field-type/input-field-type';
import {provideHttpClient} from '@angular/common/http';
import {API_BASE_URL} from './api/trimly-api';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      FormlyModule.forRoot({
        types: [
          { name: 'input', component: InputFieldType },
        ],
      })
    ),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl }
  ]
};
