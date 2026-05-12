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

  private apiUrl = environment.socketUrlLocal;

  constructor(
    private socketService: WebsocketService,
    private router: Router,
    private talker: TalkerService
  ) { }

  // ===================== AUTH =====================

  login(datosLogin: any): Observable<Auth> {
    const respuesta = new Subject<Auth>();
    console.log('[FRONT][DataService] 🔐 Emitiendo evento login ->', datosLogin.nickname);
    this.socketService.emit('login', datosLogin);
    this.socketService.listen('loginSuccess').subscribe((res: any) => {
      console.log('[FRONT][DataService] ✅ loginSuccess recibido ->', { nickname: res.nickname, nombre: res.nombre, icono: res.icono, iconoImagen: res.iconoImagen });
      this.talker.notificarExito('Sesión Iniciada');
      this.crearSesion(res);
      respuesta.next(res);
    });
    this.socketService.listen('loginError').subscribe((err: any) => {
      console.error('[FRONT][DataService] ❌ loginError recibido ->', err);
      this.talker.notificarError(err.error || 'Credenciales incorrectas');
      respuesta.error(err);
    });
    return respuesta.asObservable();
  }



  registro(datosRegistro: any): Observable<Auth> {
    const respuesta = new Subject<Auth>();
    this.socketService.emit('register', datosRegistro);
    // Si llega este evento, es que HA IDO BIEN
    this.socketService.listen('registerSuccess').subscribe((res: any) => {
      console.log("✅ Registro exitoso:", res);
      this.talker.notificarExito(res.message || 'Usuario registrado correctamente');

      this.crearSesion(res);

      respuesta.next(res);
      respuesta.complete(); // Importante completar el Subject
    });
    // Escuchamos el evento de error específico
    this.socketService.listen('registerError').subscribe((err: any) => {
      console.error("❌ Error de registro:", err);
      this.talker.notificarError(err.error || 'Error en el registro');
      respuesta.error(err);
    });
    return respuesta.asObservable();
  }

  crearSesion(datosLogin: any) {
    console.log('[FRONT][DataService] 💾 crearSesion() - datos recibidos:', datosLogin);

    // Limpiamos primero para evitar mezclar datos de sesiones anteriores
    sessionStorage.clear();

    sessionStorage.setItem("token", datosLogin.token ?? '');
    sessionStorage.setItem("userId", String(datosLogin.userId ?? ''));
    sessionStorage.setItem("nickname", datosLogin.nickname ?? '');
    sessionStorage.setItem("nombre", datosLogin.nombre ?? '');
    sessionStorage.setItem("icono_id", String(datosLogin.icono ?? 0));
    sessionStorage.setItem("icono", datosLogin.iconoImagen ?? '');

    // Actualizamos el token en el socket para que el middleware de Node nos reconozca
    if (datosLogin.token) {
      this.socketService.setToken(datosLogin.token);
    }

    console.log('[FRONT][DataService] ✅ sessionStorage guardado:', {

      token: sessionStorage.getItem('token') ? '(existe)' : '(vacío)',
      userId: sessionStorage.getItem('userId'),
      nickname: sessionStorage.getItem('nickname'),
      nombre: sessionStorage.getItem('nombre'),
      icono_id: sessionStorage.getItem('icono_id'),
      icono: sessionStorage.getItem('icono'),
    });

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
    sessionStorage.removeItem("icono_id");
    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("icono");
  }

  cerrarSesion() {
    this.eliminarSesion();
  }

  // ===================== SALAS =====================

  crearSala(datos: { nombre: string; publica: boolean; password?: string }): Observable<any> {
    const respuesta = new Subject<any>();
    const token = this.obtenerToken();

    console.log('[FRONT][DataService] 📤 Emitiendo crearPartida:', datos);
    this.socketService.emit('crearPartida', { ...datos, token });

    this.socketService.listen('partidaCreada').pipe(first()).subscribe((res: any) => {
      console.log('[FRONT][DataService] 📥 partidaCreada recibido:', res);
      this.talker.notificarExito('Sala creada correctamente');
      respuesta.next(res);
    });

    return respuesta.asObservable();
  }

  listarSalas(): Observable<any[]> {
    const respuesta = new Subject<any[]>();
    
    console.log('[FRONT][DataService] 📤 Emitiendo listarPartidas');
    this.socketService.emit('listarPartidas', {});

    this.socketService.listen('listaPartidas').subscribe((res: any) => {
      console.log('[FRONT][DataService] 📥 listaPartidas recibido:', res);
      respuesta.next(res);
    });

    return respuesta.asObservable();
  }

  unirseASala(datos: { partidaId: number; password?: string }): Observable<any> {
    const respuesta = new Subject<any>();
    const token = this.obtenerToken();

    console.log('[FRONT][DataService] 📤 Emitiendo unirsePartida:', datos);
    this.socketService.emit('unirsePartida', { ...datos, token });

    // En unirse, el servidor suele responder con el estado de la sala
    this.socketService.listen('jugadorUnido').pipe(first()).subscribe((res: any) => {
      console.log('[FRONT][DataService] 📥 jugadorUnido recibido:', res);
      this.talker.notificarExito('¡Te has unido a la sala!');
      respuesta.next(res);
    });

    return respuesta.asObservable();
  }


  // ===================== PERFIL =====================

  obtenerPerfil(): Observable<Perfil> {
    const respuesta = new Subject<Perfil>();
    const token = this.obtenerToken();
    console.log('[FRONT][DataService] 📤 Emitiendo obtener_perfil');
    this.socketService.emit('obtener_perfil', { token });

    this.socketService.listen('perfil_datos').pipe(first()).subscribe((res: any) => {
      console.log('[FRONT][DataService] 📥 perfil_datos recibido ->', { nombre: res.nombre, nickname: res.nickname, icono: res.icono, iconoImagen: res.iconoImagen });
      respuesta.next(res);
    });

    return respuesta.asObservable();
  }


  actualizarPerfil(datos: Partial<Perfil> & { contrasena?: string }): Observable<any> {
    const respuesta = new Subject<any>();
    const token = this.obtenerToken();

    console.log('[FRONT][DataService] 📤 Emitiendo actualizar_perfil al socket con datos:', datos);
    
    // Verificación de conexión
    if (!(this.socketService as any).socket?.connected) {
      console.error('[FRONT][DataService] ❌ El socket no está conectado. Intentando reconectar...');
      this.socketService.connect();
    }

    this.socketService.emit('actualizar_perfil', { ...datos, token });



    this.socketService.listen('perfil_resultado').pipe(first()).subscribe((res: any) => {
      console.log('[FRONT][DataService] 📥 perfil_resultado recibido:', res);
      if (res.success) {
        this.talker.notificarExito('Perfil actualizado');
        if (datos.nickname) sessionStorage.setItem("nickname", datos.nickname);
        if (datos.nombre) sessionStorage.setItem("nombre", datos.nombre);
        if (res.icono != null) sessionStorage.setItem("icono_id", res.icono.toString());
        if (res.iconoImagen) {
          sessionStorage.setItem("icono", res.iconoImagen);
        }
        respuesta.next(res);
      } else {
        console.error('[FRONT][DataService] ❌ Error en el resultado:', res.mensaje);
        this.talker.notificarError(res.mensaje || 'Error al actualizar el perfil');
        respuesta.error(res.mensaje);
      }
    });


    return respuesta.asObservable();
  }

  // ===================== ADMIN AVATARES =====================

  crearAvatar(nombre: string): Promise<any> {
    const token = this.obtenerToken();
    this.socketService.emit('crear_avatar', { nombre, token });

    return new Promise((resolve) => {
      this.socketService.listen('avatar_creado').pipe(first()).subscribe((res: any) => {
        if (res.success) {
          this.talker.notificarExito('Avatar creado con éxito');
        } else {
          this.talker.notificarError(res.mensaje || 'Error al crear avatar');
        }
        resolve(res);
      });
    });
  }

  listarAvatares(): Observable<any[]> {
    const respuesta = new Subject<any[]>();
    const token = this.obtenerToken();
    console.log('[FRONT][DataService] 📤 Emitiendo listar_avatares');
    this.socketService.emit('listar_avatares', { token });

    this.socketService.listen('avatares_lista').pipe(first()).subscribe((res: any) => {
      console.log('[FRONT][DataService] 📥 avatares_lista recibido ->', Array.isArray(res) ? `${res.length} avatares` : res);
      respuesta.next(res);
    });

    return respuesta.asObservable();
  }


}
