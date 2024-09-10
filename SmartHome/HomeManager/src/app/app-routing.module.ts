import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CasaComponent } from './casa/casa.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component:LoginComponent}, 
  {path: 'login', component:LoginComponent}, 
  {path: 'managment', component:CasaComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
