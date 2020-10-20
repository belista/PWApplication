import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../app/shared/guards/auth.guard';

const routes: Routes = [
  { path: "", canActivate: [AuthGuard], loadChildren: () => import("./main/main.module").then(m => m.MainModule)},
  { path: "main", canActivate: [AuthGuard], loadChildren: () => import("./main/main.module").then(m => m.MainModule)},
  { path: "login", component: LoginComponent},
  { path: "**", canActivate: [AuthGuard], loadChildren: () => import("./main/main.module").then(m => m.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
