import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { CommonUtils } from 'src/app/utils/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  constructor(private http: HttpClient,
    private common: CommonUtils) { }


  getUpdatedChatRooms(): Observable<MyChatRoom[]> {
    const headers = this.common.headers;
    return this.http.get<MyChatRoom[]>(environment.getAllUpdatedChatRooms, { headers });
  }
}
