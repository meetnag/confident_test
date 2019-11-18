import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services';
import { Subscription } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    currentUser: any;
    currentUser$: Subscription;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
            if (data) {
                this.currentUser = data;
            }
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isLogged = localStorage.getItem('isLogged');
        if (isLogged === 'true') {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}