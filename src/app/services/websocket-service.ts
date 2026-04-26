import { Injectable, NgZone } from '@angular/core';
import { io, Socket} from 'socket.io-client';
import { Observable, Subscriber} from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  private socket: Socket;

  constructor(private ngZone: NgZone) {
    this.socket = io(environment.socketUrl, {
      transports: ['websocket'],
      autoConnect: false
    });
  }

  connect() {
    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('Conectado al servidor de lógica (Node.js)');
    });


    this.socket.on('disconnect', () => {
      console.warn('Desconectado del servidor de sockets');
    });
  }

  emit(evento: string, datos: any) {
    this.socket.emit(evento, datos);
  }

  listen(evento: string): Observable<any>{
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
    if(this.socket) {
      this.socket.disconnect();
    }
  }

}
