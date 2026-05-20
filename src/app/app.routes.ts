import { Routes } from '@angular/router';
import { Pesquisa } from './pesquisa/pesquisa';

export const routes: Routes = [
    { path: '', redirectTo: 'pesquisa', pathMatch: 'full' },
    { path: 'pesquisa', component: Pesquisa },
];
