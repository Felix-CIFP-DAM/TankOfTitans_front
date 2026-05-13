import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../services/data-service';
import { TalkerService } from '../services/talker-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const dataService = inject(DataService);
  const router = inject(Router);
  const talker = inject(TalkerService);

  const rol = dataService.obtenerRol();

  if (rol === 'ADMINISTRADOR') {
    return true;
  }

  // Si no es admin, redirigir y notificar
  talker.notificarError('Acceso denegado: Se requieren permisos de administrador');
  router.navigate(['/menu']);
  return false;
};
