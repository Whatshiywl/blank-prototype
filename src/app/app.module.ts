import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpService } from './services/httpService/http.service';
import { HttpModule } from '@angular/http';
import { QuestionComponent } from './components/question/question.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { QuestionGuard } from './components/question/question.guard';
import { LeaderboardService } from './services/leaderboardService/leaderboard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    LeaderboardService,
    QuestionGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
