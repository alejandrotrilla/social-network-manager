import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { SocialNetwork, SocialNetworkPage, EMPTY_SOCIAL_NETWORK_PAGE, SOCIAL_NETWORKS } from './social-networks';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkService {
  private apiUrl = environment.apiUrl + '/social-networks';

  constructor(  private http: HttpClient ) {
  }

  getSocialNetworks(pageIndex : number, pageSize : number, token : string) : Observable<SocialNetworkPage> {
    return this.http.get<SocialNetworkPage>(this.apiUrl,  this.getHttpOptionsWithParams(pageIndex, pageSize, token) )
      .pipe(
        catchError(this.handleError<SocialNetworkPage>('getSocialNetworks', EMPTY_SOCIAL_NETWORK_PAGE))
      );
  }

  createSocialNetwork(socialNetwork : SocialNetwork, token : string) : Observable<SocialNetwork> {
    return this.http.post<SocialNetwork>(this.apiUrl, socialNetwork, this.getHttpOptions(token))
      .pipe(
        catchError(this.handleError<SocialNetwork>('createSocialNetwork', undefined))
      );
  }

  deleteSocialNetwork(id : string, token : string) : Observable<SocialNetwork> {
    return this.http.delete<SocialNetwork>(this.apiUrl + '/' + id, this.getHttpOptions(token) )
      .pipe(
        catchError(this.handleError<SocialNetwork>('deleteSocialNetwork', undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private getHttpOptionsWithParams(pageIndex : number, pageSize : number, token : string) {
    let httpOptions = {
                       params: { pageIndex: pageIndex, pageSize: pageSize},
                       headers: {Authorization: 'Bearer ' + token}
                      };
    return httpOptions;
  }


  private getHttpOptions(token : string) {
    let httpOptions = {
                       headers: {Authorization: 'Bearer ' + token}
                      };
    return httpOptions;
  }

}
