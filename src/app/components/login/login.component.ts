import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';

import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passWarningState = 'animating';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['']
  });

  canSubmit = true;

  existanceData: {exists: boolean, password: boolean} = {exists: false, password: false};

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    localStorage.clear();

    this.easeInAnimations();

    this.loginForm.get('username').valueChanges.pipe(debounceTime(500)).subscribe(user => {
      this.httpService.getUserExists(user).subscribe(data => {
        this.existanceData = data;
        if(this.existanceData.password) {
          this.hideWarning('password-warning');
          $('#password').prop('required', true);
          this.loginForm.get('password').setValidators(Validators.required);
          this.loginForm.get('password').updateValueAndValidity();
          $('#password').attr('placeholder', 'Password');
        } else {
          $('#password').prop('required', false);
          this.loginForm.get('password').clearValidators();
          this.loginForm.get('password').updateValueAndValidity();
          $('#password').attr('placeholder', 'Password (optional)');
        }
      }, err => {
        console.error(err);
      });
    });

    this.loginForm.get('password').valueChanges.subscribe(pass => {
      if(pass) this.hideWarning('password-warning');
    });

    $('#username').focus();
  }

  private easyInShow(id, wait, duration, cb?) {
    setTimeout(() => {
      $(id).animate({
        opacity: 1
      }, duration, 'swing', cb);
    }, wait);
  }

  easeInAnimations() {

    this.easyInShow('#welcome-0', 15, 20);
    this.easyInShow('#welcome-1', 20, 20);
    this.easyInShow('#welcome-2', 25, 20, () => {
      this.passWarningState = 'hidden';
    });
    this.easyInShow('#login-form', 40, 40);

  }

  onSubmit() {
    if(!this.canSubmit) return;

    const loginSuccess = () => {
      this.canSubmit = true;
      this.httpService.postAnswer(this.route.routeConfig.path).subscribe(res => {
        localStorage.setItem('question', JSON.stringify(res));
        this.router.navigate([`/${res.url}`]);
      }, console.error);
    }

    if(!this.loginForm.valid) return loginSuccess();

    const loginFailed = err => {
      console.error(err);
      this.loginForm.reset();
      $('#username').focus();
      let button = $("#submit-btn");
      button.toggleClass('submit-error');
      setTimeout(() => {
        button.toggleClass('submit-error');
        this.canSubmit = true;
      }, 1000);
    }

    this.canSubmit = false;
    let username = this.loginForm.get('username').value.toLowerCase();
    const password = this.loginForm.get('password').value;
    let hash = password ? CryptoJS.SHA256(password).toString() : undefined;

    this.httpService.postLogin(username, hash).subscribe(res => {
      if(res.err || !res.token) loginFailed(res.err);
      else {
        localStorage.setItem('token', res.token);
        loginSuccess();
      };
    }, loginFailed);
  }

  showWarning(id: string) {
    if(this.passWarningState != 'hidden') return;
    if(this.existanceData.password) return;
    this.passWarningState = 'animating';
    id = `#${id}`;
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

  hideWarning(id: string) {
    if(this.passWarningState != 'shown') return;
    this.passWarningState = 'animating';
    id = `#${id}`;
    $(id)
    .animate({
      height: "10px"
    }, 600, 'swing', () => {
      $(id).hide();
      this.passWarningState = 'hidden';
    });
  }

}
