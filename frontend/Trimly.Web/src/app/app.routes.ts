import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login-page/login-page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register-page/register-page').then(m => m.RegisterPage)
  },
  {
    path: 'confirm-email',
    loadComponent: () => import('./features/auth/confirm-email/confirm-email').then(m => m.ConfirmEmail)
  },
  {
    path: 'registration-complete',
    loadComponent: () => import('./features/auth/registration-complete/registration-complete').then(m => m.RegistrationComplete)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home/home').then(m => m.Home)
  }
];
