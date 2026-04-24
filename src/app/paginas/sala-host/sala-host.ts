import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'app-sala-host',
  imports: [CommonModule, FormsModule],
  templateUrl: './sala-host.html',
  styleUrl: './sala-host.css',
})
export class SalaHost {

  @Output() cerrar = new EventEmitter<void>();
  @Output() salaCreada = new EventEmitter<any>();

  nombreSala: string = '';
  esPrivada: boolean = false;
  contrasena: string = '';
  cargando: boolean = false;
  error: string = '';

  constructor(private dataService: DataService) { }

  togglePrivada(tipo: 'publica' | 'privada') {
    this.esPrivada = tipo === 'privada';
    if (!this.esPrivada) this.contrasena = '';
  }

  crear() {
    if (!this.nombreSala.trim()) {
      this.error = 'El nombre de la sala es obligatorio';
      return;
    }
    if (this.esPrivada && !this.contrasena.trim()) {
      this.error = 'Las salas privadas requieren contraseña';
      return;
    }

    this.error = '';
    this.cargando = true;

    const datos: any = {
      nombre: this.nombreSala.trim(),
      esPrivada: this.esPrivada,
    };
    if (this.esPrivada) datos.contrasena = this.contrasena;

    this.dataService.crearSala(datos).subscribe({
      next: (res) => {
        this.cargando = false;
        this.salaCreada.emit(res);
        this.cerrar.emit();
      },
      error: (err) => {
        this.cargando = false;
        this.error = err || 'Error al crear la sala';
      }
    });
  }

  onCerrar() {
    this.cerrar.emit();
  }
}
