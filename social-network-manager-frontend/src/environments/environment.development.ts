import { LogLevel } from 'angular-auth-oidc-client';

export const CLIENT_ID = 'social-network-manager-frontend';
export const REALM = 'social-network';
export const CLIENT_SCOPES = 'openid profile offline_access';
export const HOST = 'localhost';
export const PROTOCOL = 'http';
export const PORT = '4200';
export const LOCATION_BASE = PROTOCOL + '://' + HOST + ':' + PORT;
export const APP_BASE_REF = '/';
export const APP_BASE_URI = LOCATION_BASE + APP_BASE_REF;
export const AUTH_BASE_URI = LOCATION_BASE + '/auth/realms/' + REALM;
export const API_BASE_URI = LOCATION_BASE + '/social-network-manager-backend';
export const FORBIDDEN_ROUTE = '/forbidden/';
export const UNAUTHORIZED_ROUTE = '/unauthorized/';
export const APP_SILENT_RENEW_URI = APP_BASE_URI + 'assets/silent-renew.html';
export const APP_SECURE_ROUTES = [
  API_BASE_URI + '/social-networks',
];

export const environment = {
  production: false,
  apiUrl: '/social-network-manager-backend',
  authConfig: {
    authority: AUTH_BASE_URI,
    redirectUrl: APP_BASE_URI + '/home',
    postLoginRoute: APP_BASE_URI + '/home',
    postLogoutRedirectUri: APP_BASE_URI,
    triggerAuthorizationResultEvent: true,
    clientId: CLIENT_ID,
    startCheckSession: false,
    scope: CLIENT_SCOPES,
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: APP_SILENT_RENEW_URI,
    ignoreNonceAfterRefresh: true,
    useRefreshToken: true,
    tokenRefreshInSeconds: 10,
    forbiddenRoute: FORBIDDEN_ROUTE,
    unauthorizedRoute: UNAUTHORIZED_ROUTE,
    historyCleanupOff: true,
    secureRoutes: APP_SECURE_ROUTES,
    logLevel: LogLevel.Debug,
  }
};
