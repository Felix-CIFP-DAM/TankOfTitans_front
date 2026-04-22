import { Injectable } from '@angular/core';
import { Enviroment } from '../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../modelos/Auth';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private apiUrl = Enviroment.APILOCAL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(datosLogin: any): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/auth/login`, datosLogin)
      .pipe(
        tap((response: Auth) => {
          this.crearSesion(response);
        })
      );
  }

  registro(datosRegistro: any): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/auth/register`, datosRegistro)
      .pipe(
        tap((response: Auth) => {
          this.crearSesion(response);
        })
      );
  }

  crearSesion(datosLogin: any) {
    sessionStorage.setItem("token", datosLogin.token);
    sessionStorage.setItem("tokenType", datosLogin.tokenType);
    this.router.navigate(['/menu']);
  }

  obtenerToken() {
    return sessionStorage.getItem("token");
  }

  obtenerTokenType() {
    return sessionStorage.getItem("tokenType");
  }

  eliminarSesion() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenType");
  }

  cerrarSesion() {
    this.eliminarSesion();
  }

}
