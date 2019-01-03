import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: Http
  ) { }

  getHelloWorld() {
    return this.get('hello', res => res.text());
  }

  getLeaderboard() {
    return this.get('leaderboard');
  }

  private get(path: string, project?: (value: Response, index: number) => any) {
    let url = this.getURL(path);
    return this.http.get(url).map(project || (res => res.json()));
  }

  private post(path: string, body: any, project?: (value: Response, index: number) => any) {
    let url = this.getURL(path);
    return this.http.post(url, body).map(project || (res => res.json()));
  }

  private getURL(path: string) {
    let apiURL = environment.apiURL;
    return `${apiURL}${apiURL.endsWith('/') ? '' : '/'}${path.startsWith('/') ? path.substr(1) : path}`;
  }

}
