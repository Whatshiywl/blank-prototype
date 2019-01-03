import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  leaderboard = [
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

  newest = [
    {name: 'mama', at: 4362454},
    {name: 'killed', at: 654373},
    {name: 'man', at: 5643674}
  ];

  constructor() { }

  ngOnInit() {
    console.log('leaderboard init')
  }

}
