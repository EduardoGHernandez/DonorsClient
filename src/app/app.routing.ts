import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Componentes
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {UserComponent} from './components/user/user.component';

const appRoutes:Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component:RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user-edit', component: UserEditComponent},
  {path: 'people/:page', component: UserComponent},
  {path: 'people', component: UserComponent},
  {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
