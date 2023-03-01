import { Component, OnInit, Inject } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult, AuthenticatedResult } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  name : string = "Social Network Manager"
  username : string = '';
  configuration$: Observable<OpenIdConfiguration> = EMPTY;
  userDataChanged$: Observable<OidcClientNotification<any>> = EMPTY;
  userData$: Observable<UserDataResult> = EMPTY;
  isAuthenticated = false;
  isAuthenticated$ : Observable<AuthenticatedResult>= EMPTY;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private oidcSecurityService: OidcSecurityService,
    ) {
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

    onHome() {
      this.router.navigate(['home/']);
    }

    onProfile() {
      this.router.navigate(['profile/']);
    }
}
