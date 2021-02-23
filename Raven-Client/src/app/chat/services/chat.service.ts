import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/model/message';
import { CommonUtils } from 'src/app/utils/common';
import { WenSocketService } from 'src/app/utils/wen-socket.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends WenSocketService {

  constructor(private http: HttpClient,
    private common: CommonUtils) {
    super();
  }

  getStoredMsg(roomId: string): Observable<Message[]> {
    const headers = this.common.headers;
    const params = new HttpParams({
      fromString: `roomId=${roomId}`
    });
    return this.http.get<Message[]>(environment.loadMessages, { params, headers });
  }

  updateMsgCount(count: number, roomId: string) {
    const headers = this.common.headers;
    const params = new HttpParams({
      fromString: `roomId=${roomId}`
    });
    return this.http.post(environment.updateMsgSeenCount, { count }, { headers, params });
  }

  joinRoom(roomId: string) {
    this.socket.emit('join', { roomId });
  }

  getMessages() {
    return Observable.create((observer: any) => {
      this.socket.on('message', (message: Message) => {
        console.log(message);
        observer.next(message);
      })
    });
  }

  public sendMessage(room: string, message: string, userId: string) {
    this.socket.emit('sendMessage', { room, message, userId }, (msg: string) => {
      console.log("the event is acknowleged")
    });
  }
}
