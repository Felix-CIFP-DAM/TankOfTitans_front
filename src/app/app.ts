import { Component, OnInit, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebsocketService } from './services/websocket-service';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('TankOfTitans_front');
  scaleFactor = 1;
  virtualWidth = 1280;

  constructor (
    private wsService: WebsocketService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.wsService.connect();
    this.themeService.initTheme();
    this.checkScale();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScale();
  }

  checkScale(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Scale down on landscape mobile or small viewports where height is small and width > height
    if (w < 1200 && w > h) {
      this.scaleFactor = w / this.virtualWidth;
    } else {
      this.scaleFactor = 1;
    }
  }
}

