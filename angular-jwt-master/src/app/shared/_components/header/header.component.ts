import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@app/shared/_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser$: Subscription;
  currentUser: any;
  userName = '';

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser$ = this.authenticationService.currentUserSubject.subscribe(data => {
      if (data != null) {
        this.currentUser = data;
        this.userName = data.user.name;
      }
    })
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  onLogout() {
    this.authenticationService.logout();
  }
}
