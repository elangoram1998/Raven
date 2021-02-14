import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendSuggestion } from 'src/app/model/friend-suggestion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FSService {

  constructor(private http: HttpClient) { }

  getAllFSList(): Observable<FriendSuggestion[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      "authorization": "Bearer " + token
    })
    return this.http.get<FriendSuggestion[]>(environment.friendSuggestion, { headers });
  }
}
