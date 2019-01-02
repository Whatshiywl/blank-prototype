import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppModule } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: Http
  ) { }

  getHelloWorld() {
    return this.http.get('http://localhost:9000').map(res => res.text());
  }

}
