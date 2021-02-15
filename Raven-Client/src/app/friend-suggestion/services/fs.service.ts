import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddFriendRes } from 'src/app/model/add-friend-res';
import { FriendSuggestion } from 'src/app/model/friend-suggestion';
import { CommonUtils } from 'src/app/utils/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FSService {

  constructor(private http: HttpClient, private common: CommonUtils) { }

  getAllFSList(): Observable<FriendSuggestion[]> {
    const headers = this.common.headers;
    return this.http.get<FriendSuggestion[]>(environment.friendSuggestion, { headers });
  }

  addFriend(id: string): Observable<AddFriendRes> {
    const headers = this.common.headers;
    return this.http.post<AddFriendRes>(environment.addFriend, { id }, { headers });
  }
}
