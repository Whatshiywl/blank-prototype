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

  canSubmit = true;

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
    if(!this.canSubmit) return;
    this.canSubmit = false;
    let username = this.loginForm.get('username').value;
    let hash = CryptoJS.SHA256(this.loginForm.get('password').value).toString();
    this.httpService.postLogin(username, hash).subscribe(res => {
      console.log(res);
      this.loginForm.reset();
      $('#username').focus();
      if(res.err) {
        let button = $("#submit-btn");
        button.toggleClass('submit-error');
        setTimeout(() => {
          button.toggleClass('submit-error');
          this.canSubmit = true;
        }, 1000);
      } else this.canSubmit = true;
    }, err => console.error(err));
  }

  showWarning() {
    if(this.passWarningState != 'hidden') return;
    if(this.existanceData.password) return;
    this.passWarningState = 'animating';
    let id = '#password-warning';
    let warning = $(id);
    warning.css('height', '10px').show();
    let target = $(`${id} p`).outerHeight();
    warning
    .animate({
      height: `${target}px`
    }, 600, 'swing', () => {
      this.passWarningState = 'shown';
    });
  }

  hideWarning() {
    if(this.passWarningState != 'shown') return;
    this.passWarningState = 'animating';
    $('#password-warning')
    .animate({
      height: "10px"
    }, 600, 'swing', () => {
      $('#password-warning').hide();
      this.passWarningState = 'hidden';
    });
  }

}
