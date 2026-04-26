import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./auth/auth/auth')
                .then(m => m.Auth),
        children: [
            {
                path: '',
                redirectTo: 'sesion',
                pathMatch: 'full'
            },
            {
                path: 'sesion',
                loadComponent: () =>
                    import('./auth/sesion/sesion')
                        .then(m => m.Sesion)
            },
            {
                path: 'registro',
                loadComponent: () =>
                    import('./auth/registro/registro')
                        .then(m => m.Registro)
            },
            {
                path: 'recuperar-contra',
                loadComponent: () =>
                    import('./auth/recuperar-pass/recuperar-pass')
                        .then(m => m.RecuperarPass)
            }
        ]
    },
    {
        path: 'menu',
        loadComponent: () =>
            import('./paginas/panel-principal/panel-principal')
                .then(m => m.PanelPrincipal),
        children: [
            {
                path: 'perfil',
                loadComponent: () =>
                    import('./paginas/perfil-usuario/perfil-usuario')
                        .then(m => m.PerfilUsuario)
            },
            {
                path: 'sala-host',
                loadComponent: () =>
                    import('./paginas/sala-host/sala-host')
                        .then(m => m.SalaHost)
            },
            {
                path: 'sala-unirse',
                loadComponent: () =>
                    import('./paginas/sala-unirse/sala-unirse')
                        .then(m => m.SalaUnirse)
            }
        ]
    },

    {
        path: 'temporal',
        loadComponent: () =>
            import('./temp/temporal/temporal')
                .then(m => m.Temporal)
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
