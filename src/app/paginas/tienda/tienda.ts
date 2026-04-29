import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio-service';

@Component({
    selector: 'app-tienda',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './tienda.html',
    styleUrl: './tienda.css'
})
export class Tienda implements OnInit {
    seccionActual: 'tanques' | 'personalizacion' | 'perfil' = 'tanques';

    constructor(private router: Router,
        private audioService: AudioService) { }

    ngOnInit(): void {
        this.audioService.playMusic('audio/fes-tienda-theme.mp3');
    }

    cambiarSeccion(seccion: 'tanques' | 'personalizacion' | 'perfil') {
        this.seccionActual = seccion;
    }

    volverAlMenu() {
        this.router.navigate(['/menu']);
    }
}
