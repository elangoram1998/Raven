import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserData } from '../model/user-data';
import { CommonUtils } from '../utils/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private common: CommonUtils) { }

  updateUserData(userData: UserData) {
    const headers = this.common.headers;
    return this.http.post(environment.updateUserData, { userData }, { headers });
  }
}
