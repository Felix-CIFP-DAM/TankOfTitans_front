import { Component } from '@angular/core';
import { DataService } from '../../../services/data-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-avatar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-avatar.html',
  styleUrls: ['./crear-avatar.css']
})
export class CrearAvatarComponent {
  nombre: string = '';
  mensaje: string = '';
  exito: boolean = false;

  constructor(private dataService: DataService) {}

  crear() {
    if (!this.nombre.trim()) {
      this.mensaje = 'Debe ingresar un nombre';
      this.exito = false;
      return;
    }

    this.dataService.crearAvatar(this.nombre).then((res: any) => {
      if (res.success) {
        this.mensaje = 'Avatar creado con éxito: ' + res.avatar.nombre;
        this.exito = true;
        this.nombre = '';
      } else {
        this.mensaje = 'Error: ' + res.mensaje;
        this.exito = false;
      }
    }).catch(err => {
      this.mensaje = 'Error de conexión';
      this.exito = false;
    });
  }
}
