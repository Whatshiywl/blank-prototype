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
          this.hideWarning();
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
      if(pass) this.hideWarning();
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

    this.easyInShow('#welcome-0', 1500, 2000);
    this.easyInShow('#welcome-1', 2000, 2000);
    this.easyInShow('#welcome-2', 2500, 2000);
    this.easyInShow('#login-form', 4000, 4000, () => {
      this.passWarningState = 'hidden';
    });

  }

  onSubmit() {
    if(!this.canSubmit) return;
    this.canSubmit = false;
    let username = this.loginForm.get('username').value;
    let hash = CryptoJS.SHA256(this.loginForm.get('password').value).toString();

    const loginFailed = err => {
      console.error(err);
      let button = $("#submit-btn");
      button.toggleClass('submit-error');
      setTimeout(() => {
        button.toggleClass('submit-error');
        this.canSubmit = true;
      }, 1000);
    }

    const loginSuccess = token => {
      this.canSubmit = true;
      localStorage.setItem('token', token);
      this.httpService.postAnswer(this.route.routeConfig.path).subscribe(res => {
        localStorage.setItem('question', JSON.stringify(res));
        this.router.navigate([`/${res.url}`]);
      }, console.error);
    }

    this.httpService.postLogin(username, hash).subscribe(res => {
      this.loginForm.reset();
      $('#username').focus();
      if(res.err || !res.token) loginFailed(res.err);
      else loginSuccess(res.token);
    }, loginFailed);
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
