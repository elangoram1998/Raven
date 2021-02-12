import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(formValue: Auth): Observable<boolean> {
    return this.http.post<boolean>(environment.signUp, formValue);
  }

  signIn(formValue:Auth){

  }
}
