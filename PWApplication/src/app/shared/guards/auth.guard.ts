import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { LocalStorageService } from "../services/storage.service";
 
@Injectable()
export class AuthGuard implements CanActivate{
 
    constructor(private store: LocalStorageService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

         if(this.store.getToken() === null || this.store.getToken() === "") {
            this.router.navigate(['/login']);
            return false;
         }

         if(route.url.length === 0) {
            this.router.navigate(["/main"]);
            return true;
         }

         if(this.store.getToken() !== null && this.store.getToken() !== "" && route.url[0].path !== "main") {
            this.router.navigate(["/main"]);
            return true;
         }
         
         return true;
    }
}