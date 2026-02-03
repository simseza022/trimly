import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  setTheme(theme: 'light' | 'dark' | 'intengo') {
    const root = document.documentElement;

    root.classList.remove('dark', 'intengo');

    if (theme !== 'light') {
      root.classList.add(theme);
    }
  }
}
