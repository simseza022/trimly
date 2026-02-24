import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {catchError, mergeMap, of, Subscription} from 'rxjs';
import {Client} from '../../../api/trimly-api';


@Component({
  selector: 'app-confirm-email',
  imports: [
    RouterLink
  ],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css',
})
export class ConfirmEmail implements OnInit, OnDestroy{
  emailConfirmed = false;
  emailConfirmationFailed = false;
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  apiClient: Client = inject(Client);
  queryParamsSubscription: Subscription | null = null;
  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParamMap.pipe(
      mergeMap(params => {
        const code = params.get('code');
        const userId = params.get('userId');

        if(code == null || userId == null) throw new Error("Invalid URL");
        console.log("Confirming email", userId, code);
        return this.confirmUserEmail(userId, code);
      }),
      catchError(error => {
        console.log(error);
        this.emailConfirmationFailed = true;
        return of(null);
      })
    ).subscribe({
      next: () => {
        console.log("email confirmed");
        this.emailConfirmed = true;
        window.location.href = "/login?emailConfirmed=true";
      },
    });
  }

  confirmUserEmail(userId: string, code: string) {
    return this.apiClient.mapIdentityApi_confirmEmail(userId, code, undefined);
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

}
