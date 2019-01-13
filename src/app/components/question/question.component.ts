import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

import * as _ from 'lodash';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question = 'question';

  answerForm = this.fb.group({
    answer: ['']
  });

  canSubmit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if(evt instanceof NavigationEnd) this.onNewQuestion();
    });

    this.onNewQuestion();

  }

  onNewQuestion() {
    let storageUrl = JSON.parse(localStorage.getItem('question')).url;
    let hrefUrl = _.last(window.location.href.split('/'));
    hrefUrl = hrefUrl.replace(/%3D/g, '=');
    let equalsToAdd = hrefUrl.length % 4;
    if(equalsToAdd) hrefUrl += equalsToAdd == 3 ? '=' : '==';
    if(storageUrl == hrefUrl) this.onUrl(storageUrl);
    else {
      this.httpService.postAnswer(this.route.routeConfig.path).subscribe(res => {
        delete res.token;
        localStorage.setItem('question', JSON.stringify(res));
        this.onUrl(hrefUrl);
      }, err => {
        console.error(err);
        this.router.navigate(['/login']);
      });
    }

    $('#answer').focus();
  }

  private onUrl(url: string) {
    window.history.replaceState('', '', `/${url}`);
    let questionData = JSON.parse(localStorage.getItem('question'));
    this.question = questionData.question;
    this.canSubmit = true;
  }

  onSubmit() {
    if(!this.canSubmit) return;

    const loginFailed = err => {
      console.error(err);
      let button = $("#submit-btn");
      button.toggleClass('submit-error');
      setTimeout(() => {
        button.toggleClass('submit-error');
        this.canSubmit = true;
      }, 1000);
    }

    const loginSuccess = res => {
      localStorage.setItem('question', JSON.stringify(res));
      this.router.navigate([`/${res.url}`]);
    }
    
    this.canSubmit = false;
    let answer = this.answerForm.get('answer').value || '';
    answer = answer.toLowerCase();
    let url = _.last(window.location.href.split('/'));
    this.httpService.postAnswer(url, answer).subscribe(res => {
      this.answerForm.reset();
      $('#answer').focus();
      if(res.err || !res.token) loginFailed(res.err);
      else loginSuccess(res);
    }, loginFailed);
  }

}
