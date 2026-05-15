import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data-service';
import { Perfil } from '../../modelos/Perfil';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
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
    icono: 0
  };


  contrasena: string = '';
  cargando: boolean = false;
  error: string = '';

  avatares: any[] = [];


  constructor(private dataService: DataService) { }

  getIconName(name: string): string {
    return name;
  }

  seleccionarAvatar(avatar: any) {
    if (!avatar.comprado) {
      console.warn('[FRONT][PerfilUsuario] ⚠️ Intento de seleccionar avatar no comprado:', avatar.nombre);
      return;
    }
    console.log('[FRONT][PerfilUsuario] 🔲 Avatar seleccionado:', avatar.nombre, '| ID:', avatar.id);
    this.perfil.icono = avatar.id;
  }



  ngOnInit() {
    this.cargarPerfil();
    this.cargarAvatares();
  }

  cargarAvatares() {
    console.log('[FRONT][PerfilUsuario] 📤 Solicitando lista de avatares...');
    this.dataService.listarAvatares().subscribe({
      next: (res) => {
        console.log('[FRONT][PerfilUsuario] 📥 Respuesta de listar_avatares recibida. Tipo:', typeof res, '| Es array:', Array.isArray(res));
        console.log('[FRONT][PerfilUsuario] Contenido completo del array avatares:', JSON.stringify(res));
        this.avatares = res;
        console.log('[FRONT][PerfilUsuario] this.avatares.length =', this.avatares.length);
      },
      error: (err) => {
        console.error('[FRONT][PerfilUsuario] ❌ Error al cargar avatares:', err);
      }
    });
  }




  cargarPerfil() {
    console.log('[FRONT][PerfilUsuario] 💾 Cargando perfil desde sessionStorage');
    this.perfil.nickname = sessionStorage.getItem('nickname') || '';
    this.perfil.nombre   = sessionStorage.getItem('nombre') || '';
    this.perfil.icono    = Number(sessionStorage.getItem('icono_id')) || 0;
    console.log('[FRONT][PerfilUsuario] ✅ Perfil cargado:', { nombre: this.perfil.nombre, nickname: this.perfil.nickname, icono: this.perfil.icono });
  }



  guardar() {
    console.log('[FRONT][PerfilUsuario] 💾 Intentando guardar perfil. Datos actuales:', this.perfil);
    
    if (!this.perfil.nickname || !this.perfil.nickname.trim()) {
      console.warn('[FRONT][PerfilUsuario] ⚠️ Error: El nickname está vacío');
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
    
    if (this.contrasena && this.contrasena.trim()) {
      datos.password = this.contrasena;
    }


    console.log('[FRONT][PerfilUsuario] 📤 Llamando a dataService.actualizarPerfil con:', datos);
    
    this.dataService.actualizarPerfil(datos).subscribe({
      next: (res) => {
        console.log('[FRONT][PerfilUsuario] ✅ Éxito al actualizar:', res);
        this.cargando = false;
        // Actualizamos iconoImagen con la respuesta del servidor
        if (res.iconoImagen) this.perfil.iconoImagen = res.iconoImagen;
        this.perfilActualizado.emit(this.perfil);
        this.cerrar.emit();
      },

      error: (err) => {
        console.error('[FRONT][PerfilUsuario] ❌ Error en el componente:', err);
        this.cargando = false;
        this.error = err || 'Error al actualizar el perfil';
      }
    });
  }


  onCerrar() {
    this.cerrar.emit();
  }
}
