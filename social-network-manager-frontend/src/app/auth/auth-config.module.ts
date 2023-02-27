import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

import { environment } from '../environments/environment';

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
          authority: environment.APP_BASE_URI,
          redirectUrl: environment.APP_BASE_URI,
          postLoginRoute: environment.APP_BASE_URI,
          postLogoutRedirectUri: environment.APP_BASE_URI,
          triggerAuthorizationResultEvent: true,
          clientId: environment.CLIENT_ID,
          startCheckSession: false,
          scope: environment.CLIENT_SCOPES,
          responseType: 'code',
          silentRenew: true,
          silentRenewUrl: environment.APP_SILENT_RENEW_URI,
          ignoreNonceAfterRefresh: true,
          useRefreshToken: true,
          tokenRefreshInSeconds: 10,
          forbiddenRoute: environment.FORBIDDEN_ROUTE,
          unauthorizedRoute: environment.UNAUTHORIZED_ROUTE,
          historyCleanupOff: true,
          secureRoutes: environment.APP_SECURE_ROUTES
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
