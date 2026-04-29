import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './services/websocket-service';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('TankOfTitans_front');

  constructor (
    private wsService: WebsocketService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.wsService.connect();
    this.themeService.initTheme();
  }
}
