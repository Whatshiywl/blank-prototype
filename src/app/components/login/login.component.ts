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

  question;

  route = '/';

  leaderboard = [
    {
      key: 3,
      ordered: [
        {name: 'me', at: 3425123451}
      ]
    },
    {
      key: 1,
      ordered: [
        {name: 'myself', at: 5761342},
        {name: 'and', at: 54269807234}
      ]
    },
    {
      key: 0,
      ordered: [
        {name: 'irene', at: 985743627}
      ]
    }
  ];

  newest = [
    {name: 'mama', at: 4362454},
    {name: 'killed', at: 654373},
    {name: 'man', at: 5643674}
  ];

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
