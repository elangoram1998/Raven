import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth';
import { UserData } from '../model/user-data';
import { CommonUtils } from '../utils/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private common: CommonUtils) { }

  signUp(formValue: Auth): Observable<boolean> {
    return this.http.post<boolean>(environment.signUp, formValue);
  }

  signIn(formValue: Auth) {
    return this.http.post(environment.signIn, formValue);
  }

  signOut(): Observable<boolean> {
    const headers = this.common.headers;
    return this.http.post<boolean>(environment.logout, {}, { headers });
  }
}
