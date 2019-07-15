import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  leaderboardSubject: Subject<any> = new Subject<any>();
  private snapshot: any;

  constructor(
    private httpService: HttpService
  ) {
    setInterval(() => {
      this.update();
    }, 10000);
  }

  update() {
    this.httpService.getLeaderboard().subscribe(leaderboard => {
      this.snapshot = leaderboard;
      this.leaderboardSubject.next(leaderboard);
    }, err => {
      console.error(err);
    });
  }

  onUpdate$() {
    return this.leaderboardSubject.asObservable();
  }

  getSnapshot() {
    return this.snapshot;
  }

}
