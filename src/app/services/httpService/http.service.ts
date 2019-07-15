import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';

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

  getUserExists(username: string) {
    const query = {
      username
    };
    return this.get(`user-exists`, query);
  }

  getValidateRoute(route: string, routeToken: string) {
    let token = localStorage.getItem('token');
    const query = {
      from: route,
      'route-token': routeToken,
      token
    };
    return this.get(`validate-route`, query);
  }

  postAnswer(from: string, answer?: string) {
    let token = localStorage.getItem('token');
    return this.post(`post-answer`, {from, answer, token});
  }

  postLogin(username: string, hash: string) {
    return this.post('login', {username, hash});
  }

  private get(path: string, params = {}, project?: (value: Response, index: number) => any) {
    let url = this.getURL(path);
    params = _.pickBy(params, Boolean);
    return this.http.get(url, {params}).map(project || (res => res.json()));
  }

  private post(path: string, body = {}, project?: (value: Response, index: number) => any) {
    let url = this.getURL(path);
    return this.http.post(url, body).map(project || (res => res.json()));
  }

  private getURL(path: string) {
    let apiURL = environment.apiURL;
    return `${apiURL}${apiURL.endsWith('/') ? '' : '/'}${path.startsWith('/') ? path.substr(1) : path}`;
  }

}
