import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Directive({
  selector: '[appAlert]'
})
export class Alert implements OnInit{
  @Input('alertTrigger') alertTrigger$: Observable<void> | undefined;
  sub:Subscription | undefined;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Subscribe to the observable
    this.sub = this.alertTrigger$?.subscribe(color => {
      const hidden = 'hidden';
      const element = this.el.nativeElement;
      if(element.classList.contains(hidden)){
        element.classList.remove(hidden);
        setTimeout(() => {
          element.classList.add(hidden);
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}
