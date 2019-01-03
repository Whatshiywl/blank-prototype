import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question = 'question';

  route = '/';

  constructor() { }

  ngOnInit() {
    console.log('question init')
  }

}
