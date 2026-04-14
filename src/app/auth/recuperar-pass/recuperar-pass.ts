import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-pass',
  imports: [MatIconModule,
    CommonModule, FormsModule,
    RouterLink
  ],
  templateUrl: './recuperar-pass.html',
  styleUrl: './recuperar-pass.css',
})
export class RecuperarPass {

}
