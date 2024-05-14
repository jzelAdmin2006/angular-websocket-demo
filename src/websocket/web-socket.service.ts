import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client;
  private messageSource = new BehaviorSubject<string>('No message');
  currentMessage = this.messageSource.asObservable();

  constructor() {
    const serverUrl = 'http://localhost:8080/websocket';
    const socket = new SockJS(serverUrl);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/message', (message) => {
        this.messageSource.next(message.body);
      });
    };

    this.stompClient.activate();
  }

  sendMessage(message: string) {
    this.stompClient.publish({
      destination: '/app/send/message',
      body: message,
    });
  }
}
