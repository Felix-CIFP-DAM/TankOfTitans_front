import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data-service';
import { TalkerService } from '../../services/talker-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sesion',
  imports: [MatIconModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './sesion.html',
  styleUrl: './sesion.css',
})
export class Sesion implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private talkerService: TalkerService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  enviarSolicitud() {
    if (this.loginForm.invalid) {
      this.talkerService.notificarError("Formulario invalido");
      return;
    }

    const data = {
      nickname: this.loginForm.value.nickname,
      password: this.loginForm.value.password,
    };
    
    console.log("Enviando datos de login: ", data);

    this.dataService.login(data).subscribe({
      next: (response) => {
        this.talkerService.notificarExito("Login exitoso");
      },
      error: (err) => {
        const message = err.error?.message || err.message || "Error desconocido";
        this.talkerService.notificarError(`Error al iniciar sesion: ${message}`);
        console.error("Error al iniciar sesion: ", err);
      }
    });
  }

}
