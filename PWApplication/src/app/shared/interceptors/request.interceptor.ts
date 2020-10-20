import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/storage.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private store: LocalStorageService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  const authReq = req.clone({
    headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.store.getToken()
    })
  });

  return next.handle(authReq);
}
}