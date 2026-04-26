import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { WebsocketService } from './websocket-service';
import { Auth } from '../modelos/Auth';
import { Sala } from '../modelos/Sala';
import { Perfil } from '../modelos/Perfil';
import { Observable, Subject, first } from 'rxjs';
import { Router } from '@angular/router';
import { TalkerService } from './talker-service';


@Injectable({
  providedIn: 'root',
})
export class DataService {

  private apiUrl = environment.socketUrl;

  constructor(
    private socketService: WebsocketService,
    private router: Router,
    private talker: TalkerService
  ) { }

  // ===================== AUTH =====================

  login(datosLogin: any): Observable<Auth> {
    const respuesta = new Subject<Auth>();

    this.socketService.emit('intentar_login', datosLogin);

    this.socketService.listen('login_resultado').subscribe((res: any) => {
      if (res.success) {
        this.talker.notificarExito('Sesión Iniciada');
        this.crearSesion(res.authData);
        respuesta.next(res.authData);
      } else {
        respuesta.error(res.mensaje);
      }
    });

    return respuesta.asObservable();
  }

  registro(datosRegistro: any): Observable<Auth> {
    const respuesta = new Subject<Auth>();

    this.socketService.emit('intentar_registro', datosRegistro);

    this.socketService.listen('registro_resultado').subscribe((res: any) => {
      if (res.success) {
        this.talker.notificarExito('Usuario registrado');
        this.crearSesion(res.authData);
        respuesta.next(res.authData);
      } else {
        respuesta.error(res.mensaje);
      }
    });

    return respuesta.asObservable();
  }

  crearSesion(datosLogin: any) {
    sessionStorage.setItem("token", datosLogin.token);
    sessionStorage.setItem("tokenType", datosLogin.tokenType);
    if (datosLogin.nickname) sessionStorage.setItem("nickname", datosLogin.nickname);
    if (datosLogin.icono) sessionStorage.setItem("icono", datosLogin.icono);
    this.router.navigate(['/menu']);
  }

  obtenerToken() {
    return sessionStorage.getItem("token");
  }

  obtenerTokenType() {
    return sessionStorage.getItem("tokenType");
  }

  eliminarSesion() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenType");
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("icono");
  }

  cerrarSesion() {
    this.eliminarSesion();
  }

  // ===================== SALAS =====================

  crearSala(datos: { nombre: string; esPrivada: boolean; contrasena?: string }): Observable<any> {
    const respuesta = new Subject<any>();
    const token = this.obtenerToken();

    this.socketService.emit('crear_sala', { ...datos, token });

    this.socketService.listen('sala_creada').subscribe((res: any) => {
      if (res.success) {
        this.talker.notificarExito('Sala creada correctamente');
        respuesta.next(res);
      } else {
        this.talker.notificarError(res.mensaje || 'Error al crear la sala');
        respuesta.error(res.mensaje);
      }
    });

    this.socketService.listen('sala_error').subscribe((res: any) => {
      this.talker.notificarError(res.mensaje || 'Error al crear la sala');
      respuesta.error(res.mensaje);
    });

    return respuesta.asObservable();
  }

  listarSalas(): Observable<Sala[]> {
    const respuesta = new Subject<Sala[]>();
    const token = this.obtenerToken();

    this.socketService.emit('listar_salas', { token });

    this.socketService.listen('salas_disponibles').subscribe((res: any) => {
      respuesta.next(res.salas ?? res);
    });

    return respuesta.asObservable();
  }

  unirseASala(datos: { salaId: string; contrasena?: string }): Observable<any> {
    const respuesta = new Subject<any>();
    const token = this.obtenerToken();

    this.socketService.emit('unirse_sala', { ...datos, token });

    this.socketService.listen('unirse_resultado').subscribe((res: any) => {
      if (res.success) {
        this.talker.notificarExito('¡Te has unido a la sala!');
        respuesta.next(res);
      } else {
        this.talker.notificarError(res.mensaje || 'No se pudo unir a la sala');
        respuesta.error(res.mensaje);
      }
    });

    return respuesta.asObservable();
  }

  // ===================== PERFIL =====================

  obtenerPerfil(): Observable<Perfil> {
    const respuesta = new Subject<Perfil>();
    const token = this.obtenerToken();

    this.socketService.emit('obtener_perfil', { token });

    this.socketService.listen('perfil_datos').pipe(first()).subscribe((res: any) => {
      respuesta.next(res);
    });

    return respuesta.asObservable();
  }

  actualizarPerfil(datos: Partial<Perfil> & { contrasena?: string }): Observable<any> {
    const respuesta = new Subject<any>();
    const token = this.obtenerToken();

    this.socketService.emit('actualizar_perfil', { ...datos, token });

    this.socketService.listen('perfil_resultado').pipe(first()).subscribe((res: any) => {
      if (res.success) {
        this.talker.notificarExito('Perfil actualizado');
        if (datos.nickname) sessionStorage.setItem("nickname", datos.nickname);
        if (datos.icono) {
            // Guardamos solo el nombre del archivo, sin prefijos si los tuviera
            const iconoLimpio = datos.icono.split('/').pop() || datos.icono;
            sessionStorage.setItem("icono", iconoLimpio);
        }
        respuesta.next(res);
      } else {
        this.talker.notificarError(res.mensaje || 'Error al actualizar el perfil');
        respuesta.error(res.mensaje);
      }
    });

    return respuesta.asObservable();
  }

}
