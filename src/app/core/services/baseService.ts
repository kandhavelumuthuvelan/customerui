import { environment } from './../../../environments/environment.dev';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError} from 'rxjs/operators';
@Injectable()
export class BaseService {

//   private header = new HttpHeaders({
//     'Content-Type': 'application/json'
// });

private header = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT,FETCH'
});


  constructor(private http: HttpClient) {}

  extractData(res: Response) {
    return res.json() || {};
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.put<T>(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      {headers: this.header}
    ).pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.post<T>(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      {headers: this.header}
    ).pipe(catchError(this.formatErrors));
  }

  delete<T>(path): Observable<T> {
    return this.http.delete<T>(
      `${environment.apiUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
