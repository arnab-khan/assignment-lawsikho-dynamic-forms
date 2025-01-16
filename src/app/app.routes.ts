import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'registration',
        loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent)
    },
    {
        path: 'user-details',
        loadComponent: () => import('./pages/user-details/user-details.component').then(m => m.UserDetailsComponent)
    },
];
