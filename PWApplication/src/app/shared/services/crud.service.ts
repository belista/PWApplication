import {throwError as observableThrowError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import { LocalStorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable()
export class CrudService {
    constructor(private http: HttpClient, private store: LocalStorageService, private router: Router) {}

    private static formatErrors(error: any) {
        alert('Something went wrong...');

        return observableThrowError(error);
    }

    getHeaders(): HttpHeaders {
        const headersConfig = {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.store.getToken()
        };
        return new HttpHeaders(headersConfig);
    }

    get<T>(uri: string): Observable<T> {
        return new Observable(
          observer => {
            this.http.get<any>(environment.api_url + uri, {headers: this.getHeaders()})
              .subscribe((response: any) => {
                  observer.next(response.value ? response.value : response);
                },
                error => {

                    if(error.status === 401) {
                        alert(error.error);
                        this.router.navigate(["/login"]);
                    }

                    if(error.status === 400) {
                        alert(error.error);
                    }

                  observer.next(null);
                },
                () => { observer.complete(); }
              );
          });
      }

    post<T>(uri: string, body: Object = {}): Observable<T> {
        return new Observable(
          observer => {
            this.http.post<any>(environment.api_url + uri, body, {headers: this.getHeaders()})
              .subscribe((response: any) => {
                  observer.next(response.value ? response.value : response);
                },
                error => {

                    if(error.status === 401) {
                        alert(error.error);
                        this.router.navigate(["/login"]);
                    }

                    if(error.status === 400) {
                        alert(error.error);
                    }

                  observer.next(null);
                },
                () => { observer.complete(); }
              );
          });
      }
}
