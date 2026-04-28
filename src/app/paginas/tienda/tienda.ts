import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css'
})
export class Tienda {
  seccionActual: 'tanques' | 'personalizacion' | 'perfil' = 'tanques';

  constructor(private router: Router) {}

  cambiarSeccion(seccion: 'tanques' | 'personalizacion' | 'perfil') {
    this.seccionActual = seccion;
  }

  volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
