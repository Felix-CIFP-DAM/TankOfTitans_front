import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../../services/audio-service';
import { ThemeService } from '../../services/theme-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {
  volumenes;
  estilo;

  constructor(
    public audioService: AudioService, 
    private themeService: ThemeService,
    private router: Router
  ) {
    this.volumenes = this.audioService.getVolumes();
    this.estilo = this.themeService.getTheme();
  }

  guardarConfiguracion() {
    this.audioService.saveSettings();
    this.themeService.setTheme(this.estilo);

    this.router.navigate(['/menu']);
  }

  cancelarConfiguracion() {
    this.volumenes = this.audioService.getVolumes();
    this.estilo = this.themeService.getTheme();

    this.router.navigate(['/menu']);
  }
}
