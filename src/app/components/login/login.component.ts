import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = 'wait for it...';

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.getHelloWorld().subscribe(msg => this.message = msg);
  }

}
