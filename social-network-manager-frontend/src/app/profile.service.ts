import { Injectable, Inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const apiBase : string = '/api';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileApiUrl: string = apiBase + '/profiles/';

  constructor(
    private http: HttpClient,
  ) {
  }

  changePassword(changePasswordRequest : any) : Observable<any> {
    return this.http.put<any>(this.profileApiUrl + 'changePassword', changePasswordRequest)
          .pipe(
             catchError(err => {
                 // TODO : complete error code (examination already answered)
                 console.log(err);
                 return throwError(err);
             })
           );
  }
}
