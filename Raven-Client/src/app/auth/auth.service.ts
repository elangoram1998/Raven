import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth';
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

  sendCode(username: string): Observable<boolean> {
    return this.http.post<boolean>(environment.sendCode, { username });
  }

  validateCode(username: string, code: string) {
    return this.http.post(environment.verifyCode, { username, code }, { responseType: 'text' }).pipe(
      map(token => {
        localStorage.setItem('tempCode', token);
      })
    )
  }

  resetPassword(password: string): Observable<boolean> {
    const token = localStorage.getItem('tempCode') || '';
    const headers = new HttpHeaders({
      "authorization": "Bearer " + token
    });
    return this.http.post<boolean>(environment.resetPassword, { password }, { headers }).pipe(
      map(isValid => {
        if (isValid) {
          localStorage.removeItem('tempCode');
        }
        return isValid;
      })
    )
  }
}
