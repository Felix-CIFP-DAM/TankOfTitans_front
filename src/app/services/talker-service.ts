import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TalkerService {

  private snackBar = inject(MatSnackBar);

  success(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack-bar-exito',
    });
  }

  error(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack-bar-error',
    });
  }

  warn(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack-bar-advertencia',
    });
  }

  info(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack-bar-info',
    });
  }

  notificarExito(mensaje: string) {
    this.success(mensaje);
  }

  notificarError(mensaje: string) {
    this.error(mensaje);
  }

  notificarAdvertencia(mensaje: string) {
    this.warn(mensaje);
  }

  notificarInfo(mensaje: string) {
    this.info(mensaje);
  }

}
