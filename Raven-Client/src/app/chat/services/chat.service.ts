import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WenSocketService } from 'src/app/utils/wen-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends WenSocketService {

  constructor(private http: HttpClient) {
    super();
  }

  joinRoom(roomId: string) {
    this.socket.emit('join', { roomId });
  }

  getMessages() {
    return Observable.create((observer: any) => {
      this.socket.on('message', (message: string) => {
        console.log(message);
        observer.next(message);
      })
    });
  }

  public sendMessage(room: string, message: string) {
    console.log(room + " " + message)
    this.socket.emit('sendMessage', { room, message }, (msg: string) => {
      console.log("the event is acknowleged")
    });
  }
}
