import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data-service';
import { Sala } from '../../modelos/Sala';

@Component({
  selector: 'app-sala-unirse',
  imports: [CommonModule, FormsModule],
  templateUrl: './sala-unirse.html',
  styleUrl: './sala-unirse.css',
})
export class SalaUnirse implements OnInit {

  @Output() cerrar = new EventEmitter<void>();
  @Output() unido = new EventEmitter<any>();

  salas: Sala[] = [];
  salaSeleccionada: Sala | null = null;
  contrasena: string = '';
  cargando: boolean = false;
  cargandoSalas: boolean = false;
  error: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.refrescarSalas();
  }

  refrescarSalas() {
    this.cargandoSalas = true;
    this.error = '';
    this.dataService.listarSalas().subscribe({
      next: (salas) => {
        this.salas = salas;
        this.cargandoSalas = false;
      },
      error: () => {
        this.cargandoSalas = false;
        this.error = 'No se pudo obtener la lista de salas';
      }
    });
  }

  seleccionarSala(sala: Sala) {
    this.salaSeleccionada = sala;
    this.contrasena = '';
    this.error = '';
  }

  capacidadPorcentaje(sala: Sala): number {
    return (sala.jugadoresActuales / sala.jugadoresMaximos) * 100;
  }

  unirse() {
    if (!this.salaSeleccionada) {
      this.error = 'Selecciona una sala primero';
      return;
    }
    if (this.salaSeleccionada.esPrivada && !this.contrasena.trim()) {
      this.error = 'Esta sala requiere contraseña';
      return;
    }
    if (this.salaSeleccionada.jugadoresActuales >= this.salaSeleccionada.jugadoresMaximos) {
      this.error = 'La sala está llena';
      return;
    }

    this.error = '';
    this.cargando = true;

    const datos: any = { salaId: this.salaSeleccionada.id };
    if (this.salaSeleccionada.esPrivada) datos.contrasena = this.contrasena;

    this.dataService.unirseASala(datos).subscribe({
      next: (res) => {
        this.cargando = false;
        this.unido.emit(res);
        this.cerrar.emit();
      },
      error: (err) => {
        this.cargando = false;
        this.error = err || 'Error al unirse a la sala';
      }
    });
  }

  onCerrar() {
    this.cerrar.emit();
  }
}
