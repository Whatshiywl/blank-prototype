import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = 'wait for it...';

  route = '/';

  passWarningState = 'hidden';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['']
  });

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.httpService.getHelloWorld().subscribe(msg => this.message = msg);
    this.loginForm.get('password').valueChanges.subscribe(pass => {
      if(pass) this.hideWarning();
    });
  }

  onSubmit() {
    console.log('submit', this.loginForm.value);
  }

  showWarning() {
    if(this.passWarningState != 'hidden') return;
    this.passWarningState = 'animating';
    $('#password-warning').css('height', '10px').show().animate({height: "150px"}, 600, 'swing', () => {
      this.passWarningState = 'shown';
    });
  }

  hideWarning() {
    if(this.passWarningState != 'shown') return;
    this.passWarningState = 'animating';
    $('#password-warning').css('height', '150px').animate({height: "10px"}, 600, 'swing', () => {
      $('#password-warning').hide();
      this.passWarningState = 'hidden';
    });
  }

}
