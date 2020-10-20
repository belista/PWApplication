import {throwError as observableThrowError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import { LocalStorageService } from './storage.service';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
    constructor(private http: HttpClient, private store: LocalStorageService, private router: Router) {}

    private static formatErrors(error: any) {
        alert('Something went wrong...');

        return observableThrowError(error);
    }

    get<T>(uri: string): Observable<T> {
        return new Observable(
          observer => {
            this.http.get<any>(environment.api_url + uri)
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
            this.http.post<any>(environment.api_url + uri, body)
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
