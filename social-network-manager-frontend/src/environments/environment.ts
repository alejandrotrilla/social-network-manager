export const CLIENT_ID = 'social-network-manager-frontend';
export const CLIENT_SCOPES = 'openid profile';
export const HOST = 'alejandrotrilla.com.ar';
export const PROTOCOL = 'https';
export const LOCATION_BASE = PROTOCOL + '://' + HOST;
export const APP_BASE_REF = '/social-network-manager-frontend';
export const APP_BASE_URI = LOCATION_BASE + APP_BASE_REF;
export const AUTH_BASE_URI = LOCATION_BASE + '/auth/realms'
export const API_BASE_URI = LOCATION_BASE + '/social-network-manager-backend'
export const FORBIDDEN_ROUTE = '/forbidden/'
export const UNAUTHORIZED_ROUTE = '/unauthorized/'
export const APP_SILENT_RENEW_URI = LOCATION_BASE + '/assets/silent-renew.html'
export const APP_SECURE_ROUTES = []

export const environment = {
  production: true,
  apiUrl: API_BASE_URI,
};
