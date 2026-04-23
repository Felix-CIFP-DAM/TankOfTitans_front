import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client'
import * as Stomp from 'stompjs'

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  private stompClient: any;

  connect() {
    const socket = new SockJS('http://51.103.219.26:8080/api/ws-endpoint');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      console.log('Conectado: ' + frame);
      this.stompClient.subscribe('/topic/game-updates', (message: any) => {
        console.log('Mensaje recibido: ' + message.body);
      });
    });

  }

  sendMsg(msg: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send("/app/move", {}, JSON.stringify(msg));
    } else {
      console.warn('No se pudo enviar el mensaje: STOMP no está conectado.');
    }
  }

}
