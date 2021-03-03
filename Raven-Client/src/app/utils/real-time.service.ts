import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserID } from '../auth/selectors/user.selectors';
import { MyChatRoom } from '../model/my-chat-room';
import { Post } from '../model/post';
import { AppState } from '../reducers';
import { CommonUtils } from './common';
import { WenSocketService } from './wen-socket.service';

@Injectable({
  providedIn: 'root'
})
export class RealTimeService extends WenSocketService {

  myUserID: string | undefined;

  constructor(private store: Store<AppState>, private http: HttpClient, private common: CommonUtils) {
    super();
  }

  getFollowData() {
    this.store.pipe(select(selectUserID)).subscribe(
      id => {
        this.myUserID = id;
      }
    )
    return Observable.create((observer: any) => {
      this.socket.on(`${this.myUserID}-newFollower`, (payload: string) => {
        console.log(payload);
        observer.next(payload);
      })
    })
  }

  getChatRoomData() {
    this.store.pipe(select(selectUserID)).subscribe(
      id => {
        this.myUserID = id;
      }
    )
    return Observable.create((observer: any) => {
      this.socket.on(`${this.myUserID}-newChatRoom`, (payload: MyChatRoom) => {
        console.log(payload)
        observer.next(payload);
      })
    })
  }

  getLikeNotification() {
    this.store.pipe(select(selectUserID)).subscribe(
      id => {
        this.myUserID = id;
      }
    )
    return Observable.create((observer: any) => {
      this.socket.on(`${this.myUserID}-likeNotification`, (payload: Post) => {
        console.log(payload);
        observer.next(payload);
      })
    })
  }

  removeFollower() {
    this.store.pipe(select(selectUserID)).subscribe(
      id => {
        this.myUserID = id;
      }
    )
    return Observable.create((observer: any) => {
      this.socket.on(`${this.myUserID}-removeFollower`, (payload: string) => {
        console.log(payload);
        observer.next(payload);
      })
    })
  }

  removeChatRoom() {
    this.store.pipe(select(selectUserID)).subscribe(
      id => {
        this.myUserID = id;
      }
    )
    return Observable.create((observer: any) => {
      this.socket.on(`${this.myUserID}-removeChatRoom`, (payload: string) => {
        console.log(payload);
        observer.next(payload);
      })
    })
  }

  deletePost() {
    return Observable.create((observer: any) => {
      this.socket.on('deletePost', (payload: string) => {
        console.log(payload);
        observer.next(payload);
      })
    })
  }
}
