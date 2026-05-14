import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SalaHost } from '../sala-host/sala-host';
import { SalaUnirse } from '../sala-unirse/sala-unirse';
import { PerfilUsuario } from '../perfil-usuario/perfil-usuario';
import { DataService } from '../../services/data-service';
import { Perfil } from '../../modelos/Perfil';
import { AudioService } from '../../services/audio-service';

@Component({
  selector: 'app-panel-principal',
  imports: [MatIconModule, CommonModule, SalaHost, SalaUnirse, PerfilUsuario],
  templateUrl: './panel-principal.html',
  styleUrl: './panel-principal.css',
})
export class PanelPrincipal implements OnInit {

  perfil_imagen: string = "perfil_icono.png";
  nickname: string = "OPERATOR";

  // Modal visibilitys
  mostrarHostModal: boolean = false;
  mostrarUnirseModal: boolean = false;
  mostrarPerfilModal: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private audioService: AudioService
  ) { }

  ngOnInit() {
    this.actualizarDatosLocales();
    this.audioService.playMusic('audio/theme.mp3');
  }

  actualizarDatosLocales() {
    const icono = sessionStorage.getItem('icono');
    const nick = sessionStorage.getItem('nickname');

    if (icono) {
      // Si el icono es el original por defecto, está en la raíz.
      // Si es un avatar de unidad, está en la carpeta /perfiles
      if (icono === 'perfil_icono.png' || icono.includes('assets')) {
        this.perfil_imagen = icono;
      } else {
        // Limpiamos posibles prefijos duplicados y aseguramos la ruta correcta
        const nombreArchivo = icono.split('/').pop() || icono;
        this.perfil_imagen = 'perfiles/' + nombreArchivo;
      }
    }

    if (nick) this.nickname = nick;
  }

  get status(): string {
    if (this.dataService.obtenerToken() != null) {
      return "ONLINE";
    } else {
      return "OFFLINE"
    }
  }

  // --- MODAL HANDLERS ---

  abrirHost() {
    this.mostrarHostModal = true;
  }

  abrirUnirse() {
    this.mostrarUnirseModal = true;
  }

  abrirPerfil() {
    this.mostrarPerfilModal = true;
  }

  cerrarModales() {
    this.mostrarHostModal = false;
    this.mostrarUnirseModal = false;
    this.mostrarPerfilModal = false;
  }

  onPerfilActualizado(perfil: Perfil) {
    if (perfil.nickname) {
      this.nickname = perfil.nickname;
      sessionStorage.setItem('nickname', perfil.nickname);
    }
    if (perfil.iconoImagen) {
      this.perfil_imagen = 'perfiles/' + perfil.iconoImagen;
    }
  }


  onSalaCreada(res: any) {
    console.log('[FRONT][PanelPrincipal] ✅ Sala creada:', res);
    // Navegamos a la sala de preparación pasando el ID de la partida
    this.router.navigate(['/preparacion'], { queryParams: { id: res.id } });
  }

  onUnidoASala(res: any) {
    console.log('[FRONT][PanelPrincipal] ✅ Unido a sala:', res);
    // Navegamos a la sala de preparación pasando el ID de la partida
    this.router.navigate(['/preparacion'], { queryParams: { id: res.id } });
  }


  irTienda() {
    this.router.navigate(['/tienda']);
  }
  irAdministracion() {
    this.router.navigate(['/panelAdmin']);
  }
  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  salir() {
    this.dataService.cerrarSesion();
    this.router.navigate(['/']);
  }

  get esAdmin(): boolean {
    return this.dataService.obtenerRol() === 'ADMINISTRADOR';
  }

}