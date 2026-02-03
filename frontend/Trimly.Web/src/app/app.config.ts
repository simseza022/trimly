import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { routes } from './app.routes';
import {InputFieldType} from './shared/components/form-components/input-field-type/input-field-type';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(
      FormlyModule.forRoot({
        types: [
          { name: 'input', component: InputFieldType },
        ],
      })
    )
  ]
};
