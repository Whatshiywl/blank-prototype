import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

import * as _ from 'lodash';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question = 'question';

  // route = '/';

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    console.log('question init')
    let storageUrl = JSON.parse(localStorage.getItem('question')).url;
    let hrefUrl = _.last(window.location.href.split('/'));
    hrefUrl = hrefUrl.replace(/%3D/g, '=');
    let equalsToAdd = hrefUrl.length % 4;
    if(equalsToAdd) hrefUrl += equalsToAdd == 1 ? '=' : '==';
    if(storageUrl == hrefUrl) {
      window.history.replaceState('', '', `/${storageUrl}`);
    } else {
      this.httpService.postAnswer(this.route.routeConfig.path).subscribe(res => {
        delete res.token;
        localStorage.setItem('question', JSON.stringify(res));
      }, console.error);
      window.history.replaceState('', '', `/${hrefUrl}`);
    }

    console.log(window.location.href);
  }

}
