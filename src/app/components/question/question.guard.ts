import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpService } from 'src/app/services/httpService/http.service';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class QuestionGuard implements CanActivate {
    constructor(
        private router: Router,
        private httpService: HttpService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let url = state.url.replace(/%3D/g, '=').substr(1);
        let equalsToAdd = url.length % 4;
        if(equalsToAdd) url += equalsToAdd == 3 ? '=' : '==';

        const reject = () => {
            this.router.navigate(['/login']);
            return false;
        }
        
        let token = this.getQuestionToken();
        let subject = new Subject<boolean>();
        this.httpService.getValidateRoute(url, token).subscribe(res => {
            if(res.success) subject.next(true);
            else reject();
        }, err => {
            reject();
        });
        return subject.asObservable();
    }

    private getQuestionToken() {
        try {
            let questionData = JSON.parse(localStorage.getItem('question')) || {};
            const token = questionData.token;
            delete questionData.token;
            localStorage.setItem('question', JSON.stringify(questionData));
            return token;
        } catch (error) {
            return '';
        }
    }
}