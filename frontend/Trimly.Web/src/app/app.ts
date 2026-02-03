import {Component, HostBinding, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {ThemeService} from './ThemeService';
import {LoginPage} from './features/auth/login-page/login-page';
import {InputFieldType} from './shared/components/form-components/input-field-type/input-field-type';


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormlyModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Trimly.Web');
  darkmode = signal(false);
  @HostBinding('class.dark') get mode() { return this.darkmode(); }

  themeService = inject(ThemeService);

  onSubmit() {
   this.themeService.setTheme('dark');
  }
}
