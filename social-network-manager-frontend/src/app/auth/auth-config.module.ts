import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule, AuthInterceptor } from 'angular-auth-oidc-client';

import { environment } from '../../environments/environment';

@NgModule({
    imports: [AuthModule.forRoot({
        config: environment.authConfig
      })],
    exports: [AuthModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
})
export class AuthConfigModule {}
