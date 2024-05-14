import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from '../websocket/web-socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  message = '';
  receivedMessage?: string;

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.currentMessage.subscribe(
      (msg) => (this.receivedMessage = msg),
    );
  }

  sendMessage(): void {
    this.webSocketService.sendMessage(this.message);
    this.message = '';
  }
}
