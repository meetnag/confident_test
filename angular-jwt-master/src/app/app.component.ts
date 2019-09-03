import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/_services';
import { DashboardService } from './shared/_services/dashboard.service';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    currentUser: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private dashboardService: DashboardService
    ) {
    }

    ngOnInit() {
        if (localStorage.getItem("currentUser")) {
            var user = JSON.parse(localStorage.getItem("currentUser"));
            var token = JSON.parse(localStorage.getItem("currentUserToken"));
            var userRole = JSON.parse(localStorage.getItem("currentUserRole"));
            this.authenticationService.currentUserSubject.next({ 'user': user, 'token': token, 'userRole': userRole });
        }
        if (localStorage.getItem("ocObj")) {
            var ocObj = JSON.parse(localStorage.getItem("ocObj"));
            this.dashboardService.currentOcObj.next(ocObj);
        }
        if (localStorage.getItem("selectedObj")) {
            var ocObj = JSON.parse(localStorage.getItem("selectedObj"));
            this.dashboardService.selectedObj.next(ocObj);
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}