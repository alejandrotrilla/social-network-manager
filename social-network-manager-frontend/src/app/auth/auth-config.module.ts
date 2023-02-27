import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: window.location.origin + '/auth/realms/social-network',
            redirectUrl: window.location.origin + '/social-network-manager-frontend',
            postLoginRoute: window.location.origin + '/social-network-manager-frontend',
            postLogoutRedirectUri: window.location.origin + '/social-network-manager-frontend',
            triggerAuthorizationResultEvent: true,
            clientId: 'social-network-manager-frontend',
            startCheckSession: false,
            scope: 'openid profile',
            responseType: 'code',
            silentRenew: true,
            silentRenewUrl: window.location.origin + '/assets/silent-renew.html',
            ignoreNonceAfterRefresh: true,
            useRefreshToken: true,
            tokenRefreshInSeconds: 10,
            forbiddenRoute: '/forbidden/',
            unauthorizedRoute: '/unauthorized/',
            historyCleanupOff: true,
            secureRoutes: [
              '/api',
            ]
            }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
