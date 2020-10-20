import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/shared/guards/auth.guard';

const routes: Routes = [
  { path: "", canActivate: [AuthGuard], loadChildren: () => import("./main/main.module").then(m => m.MainModule)},
  { path: "main", canActivate: [AuthGuard], loadChildren: () => import("./main/main.module").then(m => m.MainModule)},
  { path: "login", loadChildren: () => import("./login/login.module").then(m => m.LoginModule)},
  { path: "**", canActivate: [AuthGuard], loadChildren: () => import("./main/main.module").then(m => m.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
