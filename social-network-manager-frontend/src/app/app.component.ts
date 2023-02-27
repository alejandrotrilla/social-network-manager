import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
      this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
        console.log(userData);
      });
    }

    onLogin() {
      this.oidcSecurityService.authorize();
    }

    onLogout() {
      this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
    }
}
