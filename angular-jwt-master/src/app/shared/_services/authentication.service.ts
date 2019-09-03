import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { DashboardService } from './dashboard.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private router: Router, private api: ApiService, private dashboardService: DashboardService) {
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        username = username.trim();
        const body = {
            'email': username,
            'password': password
        }
        return this.onLogin(body)
            .map((result) => {
                if (result.status === 'success' && result.data) {
                    console.log('result login', result);
                    localStorage.setItem('isLogged', 'true');
                    this.currentUserSubject.next({ 'user': result.data['user'], 'token': result.data['token'], 'userRole': result.data['userRole'] })
                    localStorage.setItem('currentUser', JSON.stringify(result.data['user']));
                    localStorage.setItem('currentUserRole', JSON.stringify(result.data['userRole']));
                    localStorage.setItem('currentUserToken', JSON.stringify(result.data['token']));
                    return result;
                } else {
                    return null;
                }

            }).catch((error: any) => Observable.throw(error || 'Server error'));

    }

    logout() {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserRole');
        localStorage.removeItem('currentUserToken');
        localStorage.removeItem('selectedObj');
        localStorage.removeItem('ocObj');
        this.currentUserSubject.next(null);
        this.dashboardService.selectedObj.next(null);
        this.dashboardService.currentOcObj.next(null);
        this.router.navigate(['/login']);
    }

    onLogin(data: any): Observable<any> {
        // alert(data.UserName)
        return this.api.apiCaller('post', 'users/login', data);
    }
}