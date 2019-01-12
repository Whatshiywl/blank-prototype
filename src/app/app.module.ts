import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { QuestionComponent } from './components/question/question.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './custom-url-serializer.service';
import { QuestionGuard } from './components/question/question.guard';

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
    QuestionGuard
    // {
    //   provide: UrlSerializer,
    //   useClass: CustomUrlSerializer
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
