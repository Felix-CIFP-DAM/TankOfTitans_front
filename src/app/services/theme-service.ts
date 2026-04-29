import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'estilo';
  private currentTheme: string = 'CamNor';

  constructor() { }

  /**
   * Initializes the theme from local storage.
   */
  initTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || 'CamNor';
    this.applyTheme(savedTheme);
  }

  /**
   * Sets and persists the new theme.
   * @param theme The theme identifier (CamNor, CamNev, CamDes, CamOce)
   */
  setTheme(theme: string) {
    this.applyTheme(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  /**
   * Retrieves the current theme identifier.
   */
  getTheme(): string {
    return localStorage.getItem(this.THEME_KEY) || 'CamNor';
  }

  /**
   * Applies the theme to the document body.
   */
  private applyTheme(theme: string) {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
  }
}
