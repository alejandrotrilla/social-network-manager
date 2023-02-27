import { Component, OnInit } from '@angular/core';

import { OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult, AuthenticatedResult } from 'angular-auth-oidc-client';
import { Observable, EMPTY } from 'rxjs';

import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  configuration$: Observable<OpenIdConfiguration> = EMPTY;
  userDataChanged$: Observable<OidcClientNotification<any>> = EMPTY;
  userData$: Observable<UserDataResult> = EMPTY;
  isAuthenticated = false;
  isAuthenticated$ : Observable<AuthenticatedResult>= EMPTY;

  constructor(public oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.configuration$ = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;

    this.oidcSecurityService.checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
        this.isAuthenticated = isAuthenticated;
      });
    }

    onLogin() {
      this.oidcSecurityService.authorize();
    }

    onLogout() {
      this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
    }
}
