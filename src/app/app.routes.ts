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
            }
        ]
    }
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
