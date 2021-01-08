import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { Response, Headers, RequestOptions } from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class HttpUtilService {

  constructor(private router: Router, private http: HttpClient) { }

  private API_URL: string = 'http://localhost:8000/';


  url(path: string) {
    return this.API_URL + path;
  }

  headers() {
    let headersParams = new Headers({ 'Content-Type': 'application/json' });

    if (localStorage['token']) {
      let authToken = localStorage['token'];
      headersParams.append('Authorization', `Bearer ${authToken}`);
    }

    let options = new RequestOptions({ headers: headersParams });
    return options;
  }

  extrairDados(response: Response) {
    let data = response.json();
    console.log(data);
    return data || {};
  }

  processarErros(erro: any) {

    if (erro.status === 401) {
      delete localStorage['user'];
      delete localStorage['token'];
      location.reload();
      this.router.navigate(['/login']);
    }

    return Observable.throw('Erro acessando servidor remoto.');
  }
}
