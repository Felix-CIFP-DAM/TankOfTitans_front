import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DataService } from '../../services/data-service';
import { TalkerService } from '../../services/talker-service';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  formRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private talkerService: TalkerService
  ) {
    this.formRegistro = fb.group({
      nombre: ['', Validators.required],
      nickname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ]],
      repPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repPassword = control.get('repPassword');
    return password && repPassword && password.value !== repPassword.value ? { mismatch: true } : null;
  };

  enviarSolicitud() {
    if (this.formRegistro.invalid) {
      this.talkerService.notificarError("Formulario invalido");
      return;
    }

    if (this.formRegistro.value.password !== this.formRegistro.value.repPassword) {
      this.talkerService.notificarError("Las contraseñas no coinciden");
      return;
    }

    const data = {
      nombre: this.formRegistro.value.nombre,
      nickname: this.formRegistro.value.nickname,
      email: this.formRegistro.value.email,
      password: this.formRegistro.value.password,
    };

    console.log("Enviando datos de registro: ", data);

    this.dataService.registro(data).subscribe({
      next: (response) => {
        this.talkerService.notificarExito("Registro exitoso");
      },
      error: (err) => {
        const message = err.error?.message || err.message || "Error desconocido";
        this.talkerService.notificarError(`Error al registrar: ${message}`);
        console.error("Error al registrar: ", err);
      }
    });
  }

}
