import { Response } from 'express';
import { Despesa, Conta, dataGe } from './app/shared/services/dashboard';
import { Injectable } from '@angular/core';
// import { Despesas } from './Despesas';
import { Observable, Subscriber, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // POST, GET, UPDATE, DELETE depesas
  AddDespesas(data: Despesa, table: String): Observable<any> {
    let API_URL = `${this.endpoint}/${table}`;
    console.log(API_URL);
    console.log(data);
    console.log(table);
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  GetDespesas() {
    let API_URL = `${this.endpoint}/despesas`;
    // return this.http.get(API_URL, { headers: this.headers })
    //   .pipe(
    //     map((res) => {
    //       console.log(res);
    //       return res || {}
    //     }),
    //     catchError(this.errorMgmt)
    //   )
    // let retorno = this.http.get(API_URL);
    // retorno.subscribe(c => {
    //   return c;
    // })

    // this.http.get(API_URL).toPromise().then(data => {
    //   console.log(data);
    //   return data;
    // })

    return new Promise(resolve => {
      this.http.get(API_URL).pipe(
        take(1)).subscribe((data: any) => {
          console.log(data);
          // return data;
          resolve(data);
        })
    })
    // return desp;
  }

  GetDespesa(id: any): Observable<any> {
    let API_URL = `${this.endpoint}/despesas/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  UpdateDespesas(id: any, data: any): Observable<any> {
    let API_URL = `${this.endpoint}/despesas/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  DeleteDespesas(id: any): Observable<any> {
    var API_URL = `${this.endpoint}/despesas/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // CONTAS
  AddContas(data: Conta, table: String): Observable<any> {
    let API_URL = `${this.endpoint}/${table}`;
    console.log(API_URL);
    console.log(data);
    console.log(table);
    // console.log(this.http.post(API_URL, data).subscribe({
    //   next(x) { console.log(x) },
    //   error(err) { console.log(err) },
    //   complete() { console.log('done') }
    // }));
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

}
