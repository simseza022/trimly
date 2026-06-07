import {Component, HostListener, OnInit} from '@angular/core';
import {FieldType, FieldTypeConfig, FormlyAttributes} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IconType, NgIcon, provideIcons} from '@ng-icons/core';
import {matfEmailColored} from '@ng-icons/material-file-icons/colored';
import {matfEmailUncolored} from '@ng-icons/material-file-icons/uncolored';
import {matPassword} from '@ng-icons/material-icons/baseline';
import {bootstrapEye, bootstrapEyeSlash} from '@ng-icons/bootstrap-icons';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-input-field-type',
  imports: [
    ReactiveFormsModule,
    FormlyAttributes,
    NgIcon,
  ],
  template : `
    <div class="space-y-2 w-full">
      <label class="block font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1">

        <div class="relative">
          <input
            [autocomplete]="field.props['autocomplete']"
            [pattern]="field.props.pattern ?? ''"
            [required]="field.props.required ?? false"
            [type]="field.props.type" class="grow border-0 outline-0 m-0"
            [formControl]="formControl" [formlyAttributes]="field"
            class="w-full bg-surface-container-high border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary/40 focus:bg-surface-container-highest transition-all outline-none" id="email" placeholder="name@example.com" type="email"/>
          @if(field.props['icon']){
            <ng-icon class="text-xl h-4! material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" [name]="field.props['icon']"></ng-icon>
          }
        </div>
        @if(isPassword){
          <ng-icon class="text-lg h-3! cursor-pointer" [name]="'bootstrapEye'"></ng-icon>
        }
      </label>
    </div>


    @if(field.formControl.errors && (field.formControl.touched || field.formControl.dirty)){
      @if(isPassword && field.formControl.errors['pattern']){
        <ul class="text-black list-disc list-inside text-xs" [innerHTML]="field.props['validatorHint']"></ul>
      } @else if (field.formControl.errors['required']){
        <p class="text-red-500 list-disc list-inside text-xs">required</p>
      }
    }

  `,
  styles:'',
  viewProviders: [provideIcons({ matfEmailColored, matfEmailUncolored, matPassword , bootstrapEye, bootstrapEyeSlash})]
})
export class InputFieldType extends FieldType<FieldTypeConfig> implements OnInit{

  isPassword = false;
  ngOnInit(): void {
   this.isPassword = this.field.props.type === 'password';
  }

  protected readonly JSON = JSON;
}
