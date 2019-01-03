import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = 'wait for it...';

  question = 'login';

  route = '/';

  constructor(
    private httpService: HttpService
  ) {
    let apiUrl = environment.apiUrl;
    console.log(apiUrl);
  }

  ngOnInit() {
    this.httpService.getHelloWorld().subscribe(msg => this.message = msg);
  }

}
