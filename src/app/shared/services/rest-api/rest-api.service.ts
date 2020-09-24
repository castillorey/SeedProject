import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from "rxjs/operators";

import { ICommonResponse } from '../../interfaces/api/icommon-response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  readonly baseUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  public Get(route: string): Observable<ICommonResponse> {
    return this.http.get<ICommonResponse>(this.baseUrl + route)
                    .pipe(catchError(this.handleError));
  }

  public Delete(route: string): Observable<ICommonResponse> {
    return this.http.delete<ICommonResponse>(this.baseUrl + route)
                    .pipe(catchError(this.handleError));
  }

  public Post(route: string, ob: any = {}, alterBaseUrl = ''): Observable<ICommonResponse> {
    let serverUrl = alterBaseUrl.trim() == '' ? this.baseUrl + route : alterBaseUrl + route;
    return this.http.post<ICommonResponse>(serverUrl, ob)
                    .pipe(catchError(this.handleError));
  }

  public Put(route: string, ob: any = {}): Observable<ICommonResponse> {
    return this.http.put<ICommonResponse>(this.baseUrl + route, ob)
                    .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
    }
    return throwError(err);
  }

}
