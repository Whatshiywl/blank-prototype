import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';

import { debounceTime } from 'rxjs/operators';
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

  existanceData: {exists: boolean, password: boolean} = {exists: false, password: false};

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.httpService.getHelloWorld().subscribe(msg => this.message = msg);

    this.loginForm.get('username').valueChanges.pipe(debounceTime(500)).subscribe(user => {
      this.httpService.getUserExists(user).subscribe(data => {
        this.existanceData = data;
        if(this.existanceData.password) {
          this.hideWarning();
          $('#password').prop('required', true);
          this.loginForm.get('password').setValidators(Validators.required);
          this.loginForm.get('password').updateValueAndValidity();
        } else {
          $('#password').prop('required', false);
          this.loginForm.get('password').clearValidators();
          this.loginForm.get('password').updateValueAndValidity();
        }
      }, err => {
        console.error(err);
      });
    });

    this.loginForm.get('password').valueChanges.subscribe(pass => {
      if(pass) this.hideWarning();
    });
  }

  onSubmit() {
    let hash = CryptoJS.SHA256(this.loginForm.get('password').value).toString();
    this.httpService.postLogin(this.loginForm.get('username').value, hash).subscribe(res => {
      console.log(res);
    });
  }

  showWarning() {
    if(this.passWarningState != 'hidden') return;
    if(this.existanceData.password) return;
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
