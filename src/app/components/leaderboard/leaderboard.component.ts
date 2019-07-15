import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

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
    private httpService: HttpService
  ) { }

  ngOnInit() {
    console.log('leader init')
    this.httpService.getLeaderboard().subscribe(leaderboard => {
      this.leaderboard = leaderboard;
    }, err => {
      console.error(err);
      alert('Error loading leaderboard!');
    });

    setTimeout(() => {
      $('#leaderboard-wrapper').animate({
        opacity: 1
      }, 2000, 'swing');
    }, 3000);

  }

}
