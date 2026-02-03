import { Component } from '@angular/core';
import {FieldType, FieldTypeConfig, FormlyAttributes} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IconType, NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-input-field-type',
  imports: [
    ReactiveFormsModule,
    FormlyAttributes,
    NgIcon
  ],
  template : `
    <label class="input input-sm focus:outline-0 min-w-72 rounded-md">
      <ng-icon [name]="iconType"></ng-icon>
      <input type="search" class="grow" placeholder="Search"  [formControl]="formControl" [formlyAttributes]="field"/>
    </label>
  `,
  styles:''
})
export class InputFieldType extends FieldType<FieldTypeConfig>{
    iconType:IconType = 'matfEmailUncolored';
}
