import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from 'src/app/services/leaderboardService/leaderboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  leaderboard: {
    leaders: {
      key: number, 
      ordered: {
        name: string, 
        at: string
      }[]
    }[],
    newest: []
  } = {
    leaders: [],
    newest: []
  };

  constructor(
    private leaderboardService: LeaderboardService
  ) { }

  ngOnInit() {
    this.leaderboardService.onUpdate$().subscribe(leaderboard => {
      this.leaderboard = leaderboard;
    });
    this.leaderboardService.update();

    setTimeout(() => {
      $('#leaderboard-wrapper').animate({
        opacity: 1
      }, 2000, 'swing');
    }, 3000);

  }

  mapToLocalTime(time: string) {
    return moment.utc(time, 'DD/MM/YYYY HH:mm:ss').local().format('YYYY/MM/DD HH:mm:ss');
  }

}
