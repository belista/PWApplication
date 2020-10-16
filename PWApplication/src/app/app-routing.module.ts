import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../app/shared/guards/auth.guard';

const routes: Routes = [
  { path: "", component: MainComponent, canActivate: [AuthGuard]},
  { path: "main", component: MainComponent, canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent},
  { path: "**", component: MainComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
