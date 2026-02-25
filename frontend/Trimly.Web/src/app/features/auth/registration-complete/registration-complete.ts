import { Component } from '@angular/core';
import {AlertPopup} from "../../../shared/components/alert-popup/alert-popup";
import {FormlyModule} from "@ngx-formly/core";
import {FormsModule} from "@angular/forms";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {RouterLink} from "@angular/router";
import {matfFolderMailColored} from '@ng-icons/material-file-icons/colored';

@Component({
  selector: 'app-registration-complete',
    imports: [
        AlertPopup,
        FormlyModule,
        FormsModule,
        NgIcon,
        RouterLink
    ],
  templateUrl: './registration-complete.html',
  styleUrl: './registration-complete.css',
  viewProviders: [provideIcons({ matfFolderMailColored })]
})
export class RegistrationComplete {

}
