import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { AuthGuard } from './login/auth.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'admin',component:DashboardComponent,canActivate:[AuthGuard],data: { role: 'admin' } },


//admin
  // admin.user
  { path:'user', loadComponent: () => import('./admin/user/user.component').then(m => m.UserComponent),canActivate:[AuthGuard],data: { role: 'admin' } },
  { path:'user/update/:id',loadComponent : () => import('./admin/user/update/update.component').then( m => m.UpdateComponent ),canActivate:[AuthGuard],data: { role: 'admin' }},
  { path:'user/add',loadComponent : () => import('./admin/user/add/add.component').then( m => m.AddComponent ),canActivate:[AuthGuard],data: { role: 'admin' }},
  // admin.service:
  { path: 'Service', loadComponent: () => import('./admin/service-c/service-c.component').then(m => m.ServiceCComponent),canActivate:[AuthGuard],data: { role: 'admin' }},
  { path:'Service/add', loadComponent: () => import('./admin/service-c/add/add.component').then(m => m.AddComponent),canActivate:[AuthGuard],data: { role: 'admin' } },
  { path:'Service/update/:id', loadComponent: () => import('./admin/service-c/update/update.component').then(m => m.UpdateComponent),canActivate:[AuthGuard],data: { role: 'admin' } },
  //admin.role
  { path:'role', loadComponent: () => import('./admin/role/role.component').then(m => m.RoleComponent),canActivate:[AuthGuard],data: { role: 'admin' } },
  { path:'role/update/:id',loadComponent : () => import('./admin/role/update/update.component').then( m => m.UpdateComponent ),canActivate:[AuthGuard],data: { role: 'admin' }},
  { path:'role/add',loadComponent : () => import('./admin/role/add/add.component').then( m => m.AddComponent ),canActivate:[AuthGuard],data: { role: 'admin' }},
  //admin.rdv
  { path:'rdv', loadComponent: () => import('./admin/rdv-a/rdv-a.component').then(m => m.RdvAComponent),canActivate:[AuthGuard],data: { role: 'admin' } },
  { path:'rdv/add', loadComponent: () => import('./admin/rdv-a/add/add.component').then(m => m.AddComponent),canActivate:[AuthGuard],data: { role: 'admin' } },
  { path:'rdv/update/:id', loadComponent: () => import('./admin/rdv-a/update/update.component').then(m => m.UpdateComponent),canActivate:[AuthGuard],data: { role: 'admin' } },

  //admin.patient
  { path:'patient', loadComponent: () => import('./admin/patient/patient.component').then(m => m.PatientComponent),canActivate:[AuthGuard],data: { role: 'admin' } },
  {path:'patient/add', loadComponent: () => import('./admin/patient/add/add.component').then(m => m.AddComponent),canActivate:[AuthGuard],data: { role: 'admin' }},
  {path:'patient/update/:id', loadComponent: () => import('./admin/patient/update/update.component').then(m => m.UpdateComponent),canActivate:[AuthGuard],data: { role: 'admin' }},
  //admin.profil 
  { path:'profil', loadComponent: () => import('./admin/profil/profil.component').then(m => m.ProfilComponent),canActivate:[AuthGuard],data: { role: 'admin' } },


// patient:
  { path:'service/rdv/add/:id', loadComponent: () => import('./client/patient/add/add.component').then(m => m.AddComponent) },
  {path: 'rdv/add/:matricule', loadComponent: () => import('./client/rdv/add/add.component').then(m => m.AddComponent) },
    { path: 'service', loadComponent: () => import('./client/service/service.component').then(m => m.ServiceComponent)},
  { path: 'rdv/:matricule', loadComponent: () => import('./client/rdv/rdv.component').then(m => m.RdvComponent)},
  { path: 'rdv/paiement/:id', loadComponent: () => import('./client/paiement/paiement.component').then(m => m.PaiementComponent)},
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
