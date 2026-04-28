import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private music = new Audio();
  private currentTrack: string = '';

  private volumenes = {
    master: 1.0,
    bgm: 0.5,
    sfx: 0.7,
  };

  constructor() {
    this.music.loop = true;

    const saved = localStorage.getItem('game_settings');
    if (saved) this.volumenes = JSON.parse(saved).volumenes;

    this.applyVolumes();
  }

  playMusic(trackPath: string) {
    if (this.currentTrack === trackPath) return;

    this.music.src = trackPath;

    this.music.play().catch(err => {
      console.warn("Autoplay bloqueado por el navegador. Esperando interacción...");
    });

    this.currentTrack = trackPath;
  }

  stopMusic() {
    this.music.pause();
    this.currentTrack = '';
  }

  setBGMVolume(vol: number) {
    this.volumenes.bgm = vol;
    this.applyVolumes();
    this.saveSettings();
  }

  // --- LÓGICA DE EFECTOS (SFX) ---
  playSFX(sfxPath: string) {
    const effect = new Audio(sfxPath);
    // El volumen del efecto es su volumen propio multiplicado por el Master
    effect.volume = this.volumenes.sfx * this.volumenes.master;
    effect.play();
  }

  setSFXVolume(vol: number) {
    this.volumenes.sfx = vol;
    this.saveSettings();
  }

  // --- UTILIDADES ---
  private applyVolumes() {
    this.music.volume = this.volumenes.bgm * this.volumenes.master;
  }

  saveSettings() {
    localStorage.setItem('game_settings', JSON.stringify({ volumenes: this.volumenes }));
  }

  getVolumes() { return this.volumenes; }

}
