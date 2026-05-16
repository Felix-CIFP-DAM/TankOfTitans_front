import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio-service';
import { DataService } from '../../services/data-service';
import { TalkerService } from '../../services/talker-service';

@Component({
    selector: 'app-tienda',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './tienda.html',
    styleUrl: './tienda.css'
})
export class Tienda implements OnInit {
    seccionActual: 'tanques' | 'personalizacion' | 'perfil' = 'tanques';
    
    monedas: number = 0;
    tanques: any[] = [];
    avatares: any[] = [];
    cargando: boolean = true;

    constructor(
        private router: Router,
        private audioService: AudioService,
        private dataService: DataService,
        private talkerService: TalkerService
    ) { }

    ngOnInit(): void {
        this.audioService.playMusic('audio/fes-tienda-theme.mp3');
        this.cargarTienda();
    }

    cargarTienda() {
        this.cargando = true;
        console.log('[FRONT][Tienda] 🔍 Iniciando carga de tienda...');
        
        // Timeout de seguridad: si en 10 segundos no hay respuesta, cancelamos el loading
        const safetyTimeout = setTimeout(() => {
            if (this.cargando) {
                console.warn('[FRONT][Tienda] ⚠️ Tiempo de espera agotado para cargar la tienda');
                this.cargando = false;
                this.talkerService.notificarAdvertencia('TIEMPO DE ESPERA AGOTADO: El marketplace no responde.');
            }
        }, 10000);

        this.dataService.obtenerTienda().subscribe({
            next: (res) => {
                console.log('[FRONT][Tienda] ✅ Datos de tienda recibidos:', res);
                clearTimeout(safetyTimeout);
                this.monedas = res.monedas;
                this.tanques = res.tanques;
                this.avatares = res.avatares;
                this.cargando = false;
            },
            error: (err) => {
                console.error('[FRONT][Tienda] ❌ Error al cargar tienda:', err);
                clearTimeout(safetyTimeout);
                this.talkerService.notificarError('FALLO DE CONEXIÓN: ' + (err.message || err));
                this.cargando = false;
            }
        });
    }

    comprarTanque(tanqueId: number) {
        console.log('[FRONT][Tienda] 🛡️ Intentando comprar tanque:', tanqueId);
        this.dataService.comprarTanque(tanqueId).subscribe({
            next: (res) => {
                if (res.success) {
                    this.talkerService.notificarSistema(`ADQUISICIÓN COMPLETADA: ${res.mensaje}`);
                    this.cargarTienda();
                } else {
                    this.talkerService.notificarError('FALLO EN LA TRANSACCIÓN: ' + res.mensaje);
                }
            }
        });
    }

    comprarAvatar(avatarId: number) {
        console.log('[FRONT][Tienda] 🎭 Intentando comprar avatar:', avatarId);
        this.dataService.comprarAvatar(avatarId).subscribe({
            next: (res) => {
                if (res.success) {
                    this.talkerService.notificarSistema(`PERFIL ACTUALIZADO: ${res.mensaje}`);
                    this.cargarTienda();
                } else {
                    this.talkerService.notificarError('ERROR EN EL MARKET: ' + res.mensaje);
                }
            }
        });
    }

    cambiarSeccion(seccion: 'tanques' | 'personalizacion' | 'perfil') {
        this.seccionActual = seccion;
    }

    getImagenTanque(tanque: any): string {
        if (!tanque.imagenPortada) return 'vehiculos/portadas/portada_wolf.png';
        
        // Si es un placeholder genérico
        if (tanque.imagenPortada.includes('tanque_')) {
            const mappings: { [key: string]: string } = {
                'tanque_1.png': 'portada_t90.png',
                'tanque_2.png': 'portada_leopard2.png',
                'tanque_3.png': 'portada_challenger2.png'
            };
            const mapped = mappings[tanque.imagenPortada] || 'portada_wolf.png';
            return 'vehiculos/portadas/' + mapped;
        }

        // Si ya tiene la ruta o es el nombre del archivo
        const path = tanque.imagenPortada.includes('/') ? tanque.imagenPortada : 'vehiculos/portadas/' + tanque.imagenPortada;
        return path;
    }

    getImagenAvatar(avatar: any): string {
        if (!avatar.imagen) return 'perfiles/recluta.png';
        
        if (avatar.imagen.includes('avatar_')) {
            return 'perfiles/recluta.png';
        }

        const path = avatar.imagen.includes('/') ? avatar.imagen : 'perfiles/' + avatar.imagen;
        return path;
    }

    volverAlMenu() {
        this.router.navigate(['/menu']);
    }
}
