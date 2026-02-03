import {Component, HostListener} from '@angular/core';
import {FieldType, FieldTypeConfig, FormlyAttributes} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IconType, NgIcon, provideIcons} from '@ng-icons/core';
import {matfEmailColored} from '@ng-icons/material-file-icons/colored';
import {matfEmailUncolored} from '@ng-icons/material-file-icons/uncolored';
import {matPassword} from '@ng-icons/material-icons/baseline';
import {bootstrapEye, bootstrapEyeSlash} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-input-field-type',
  imports: [
    ReactiveFormsModule,
    FormlyAttributes,
    NgIcon,
  ],
  template : `
    <label class="input input-sm outline-0  bg-gray-50 min-w-64 lg:min-w-72 rounded-md mb-2">
      @if(field.props['icon']){
        <ng-icon class="text-lg h-3!" [name]="field.props['icon']"></ng-icon>
      }

      <input [type]="field.props.type" class="grow border-0 outline-0 m-0" [formControl]="formControl" [formlyAttributes]="field"/>

      @if(field.props.type==='password'){
        <ng-icon class="text-lg h-3! cursor-pointer" [name]="'bootstrapEye'"></ng-icon>
      }
    </label>
  `,
  styles:'',
  viewProviders: [provideIcons({ matfEmailColored, matfEmailUncolored, matPassword , bootstrapEye, bootstrapEyeSlash})]
})
export class InputFieldType extends FieldType<FieldTypeConfig>{
}
