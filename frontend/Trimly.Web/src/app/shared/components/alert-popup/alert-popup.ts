import {Component, Input} from '@angular/core';
import {Alert} from "../../directives/alert";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-alert-popup',
    imports: [
        Alert
    ],
  templateUrl: './alert-popup.html',
  styleUrl: './alert-popup.css',
})
export class AlertPopup {
  @Input({required: true, alias: 'alertTrigger'}) alertTrigger$: Observable<void> | undefined;
  @Input('text') text = 'text';
}
