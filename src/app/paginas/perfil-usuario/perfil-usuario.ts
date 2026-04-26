import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data-service';
import { Perfil } from '../../modelos/Perfil';

@Component({
  selector: 'app-perfil-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css',
})
export class PerfilUsuario implements OnInit {

  @Output() cerrar = new EventEmitter<void>();
  @Output() perfilActualizado = new EventEmitter<Perfil>();

  perfil: Perfil = {
    nombre: '',
    nickname: '',
    icono: 'recluta.png'
  };

  contrasena: string = '';
  cargando: boolean = false;
  error: string = '';

  avatares: string[] = [
    'apoyo-aereo-de-blindados.png', 'artillera.png', 'as-volador.png', 'brigada-espartana.png',
    'chapa-de-identidad.png', 'comandante-fem.png', 'comando-artico.png', 'comando-camuflado.png',
    'comando-central.png', 'combafio.png', 'conductor.png', 'craneo-de-batalla.png',
    'cuerpo-reparador.png', 'defensa-de-bunkers.png', 'despliegue-global.png', 'division-de-asalto.png',
    'emblema-basico-de-tanquista.png', 'estratega-de-combate.png', 'estratega.png', 'fuerzas-imperiales.png',
    'guardia-real.png', 'inteligencia-estrategica.png', 'inviernista.png', 'logistica-pesada.png',
    'maestro-artillero.png', 'maestro-de-tanques.png', 'medallista.png', 'medico-de-campo.png',
    'oficial-aliado.png', 'ops-anfibias.png', 'piloto-ligero.png', 'piloto-toxico.png',
    'ratas-del-desierto.png', 'recluta.png', 'reparador-avanzado.png', 'retirado-de-guerra.png',
    'sanitario.png', 'seguridad-maestro-conductor.png', 'servicio-veterano-de-acero.png', 'tnk-master.png',
    'unidad-defensa-nbq.png', 'unidad-infiltracion.png', 'unidad-lobo-terrestre.png', 'unidad-lobo-volador.png',
    'veterano.png'
  ];

  constructor(private dataService: DataService) { }

  getIconName(filename: string): string {
    return filename
      .replace('.png', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.cargando = true;
    this.dataService.obtenerPerfil().subscribe({
      next: (res) => {
        this.perfil = res;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        // Fallback to session storage if socket fails
        this.perfil.nickname = sessionStorage.getItem('nickname') || '';
        this.perfil.icono = sessionStorage.getItem('icono') || 'recluta.png';
      }
    });
  }

  seleccionarAvatar(avatar: string) {
    this.perfil.icono = avatar;
  }

  guardar() {
    if (!this.perfil.nickname.trim()) {
      this.error = 'El nickname es obligatorio';
      return;
    }

    this.error = '';
    this.cargando = true;

    const datos: any = {
      nombre: this.perfil.nombre,
      nickname: this.perfil.nickname,
      icono: this.perfil.icono
    };
    if (this.contrasena.trim()) {
      datos.contrasena = this.contrasena;
    }

    this.dataService.actualizarPerfil(datos).subscribe({
      next: (res) => {
        this.cargando = false;
        this.perfilActualizado.emit(this.perfil);
        this.cerrar.emit();
      },
      error: (err) => {
        this.cargando = false;
        this.error = err || 'Error al actualizar el perfil';
      }
    });
  }

  onCerrar() {
    this.cerrar.emit();
  }
}
