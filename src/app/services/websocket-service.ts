import { Injectable, NgZone } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  private socket: Socket;

  constructor(private ngZone: NgZone) {
    const token = sessionStorage.getItem('token');
    this.socket = io('/', {
      transports: ['websocket'],
      autoConnect: true,
      auth: { token } // Enviamos el token en la conexión inicial
    });

    this.socket.on('connect', () => {
      console.log(`✅ Conectado al servidor de lógica (Node.js) | ID: ${this.socket.id}`);
    });
  }


  connect() {
    this.socket.connect();
  }

  setToken(token: string) {
    this.socket.auth = { token };
    this.socket.disconnect().connect();
    console.log('[FRONT][WebsocketService] 🔑 Token actualizado y socket reconectado');
  }


  emit(evento: string, datos: any) {
    console.log(`[FRONT][WebsocketService] 📡 Emitiendo '${evento}' | Conectado: ${this.socket.connected} | ID: ${this.socket.id}`);
    this.socket.emit(evento, datos);
  }


  listen(evento: string): Observable<any> {
    return new Observable((subscriber) => {
      const handler = (datos: any) => {
        this.ngZone.run(() => {
          subscriber.next(datos);
        });
      };

      this.socket.on(evento, handler);

      return () => {
        this.socket.off(evento, handler);
      };
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
