import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SalaHost } from '../sala-host/sala-host';
import { SalaUnirse } from '../sala-unirse/sala-unirse';
import { PerfilUsuario } from '../perfil-usuario/perfil-usuario';
import { DataService } from '../../services/data-service';
import { Perfil } from '../../modelos/Perfil';

@Component({
  selector: 'app-panel-principal',
  imports: [MatIconModule, CommonModule, SalaHost, SalaUnirse, PerfilUsuario],
  templateUrl: './panel-principal.html',
  styleUrl: './panel-principal.css',
})
export class PanelPrincipal implements OnInit {

  perfil_imagen: string = "perfil_icono.png";
  nickname: string = "OPERATOR";

  // Modal visibility
  mostrarHostModal: boolean = false;
  mostrarUnirseModal: boolean = false;
  mostrarPerfilModal: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.actualizarDatosLocales();
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
    // Actualizamos inmediatamente con los datos recibidos del modal
    if (perfil.nickname) this.nickname = perfil.nickname;
    
    if (perfil.icono) {
      const nombreArchivo = perfil.icono.split('/').pop() || perfil.icono;
      if (nombreArchivo === 'perfil_icono.png') {
        this.perfil_imagen = nombreArchivo;
      } else {
        this.perfil_imagen = 'perfiles/' + nombreArchivo;
      }
    }
    
    // También refrescamos desde storage por si acaso
    this.actualizarDatosLocales();
  }

  onSalaCreada(res: any) {
    console.log('Sala creada:', res);
    // Podrías navegar a la sala aquí: this.router.navigate(['/sala', res.id]);
  }

  onUnidoASala(res: any) {
    console.log('Unido a sala:', res);
  }

  salir() {
    this.dataService.cerrarSesion();
    this.router.navigate(['/']);
  }

}
