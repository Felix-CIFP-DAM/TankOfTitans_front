import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-panel-principal',
  imports: [MatIconModule],
  templateUrl: './panel-principal.html',
  styleUrl: './panel-principal.css',
})
export class PanelPrincipal {

  perfil_imagen: string = "perfil_icono.png";

  get status(): string {
    if (sessionStorage.getItem("token") != null) {
      return "ONLINE";
    } else {
      return "OFFLINE"
    }

  }

}
