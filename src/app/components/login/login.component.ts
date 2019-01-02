import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = 'wait for it...';

  leaderboard = [];

  newest = [
    {name: 'mama', at: 4362454},
    {name: 'killed', at: 654373},
    {name: 'man', at: 5643674}
  ];

  constructor(
    private httpService: HttpService
  ) {
    this.leaderboard = [
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
   }

  ngOnInit() {
    this.httpService.getHelloWorld().subscribe(msg => this.message = msg);
  }

}
