import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserID } from 'src/app/auth/selectors/user.selectors';
import { NotificationModel } from 'src/app/model/notification';
import { AppState } from 'src/app/reducers';
import { CommonUtils } from 'src/app/utils/common';
import { WenSocketService } from 'src/app/utils/wen-socket.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends WenSocketService {

  myUserID!: string | undefined;

  constructor(private store: Store<AppState>, private http: HttpClient, private common: CommonUtils) {
    super();
  }

  liveNotification() {
    this.store.pipe(select(selectUserID)).subscribe(
      id => {
        this.myUserID = id;
      }
    )
    return Observable.create((observer: any) => {
      console.log("user id: ", this.myUserID);
      this.socket.on(`${this.myUserID}-myNotification`, (payload: any) => {
        console.log(payload);
        observer.next(payload);
      })
    });
  }

  getMyNotifications(): Observable<NotificationModel[]> {
    const headers = this.common.headers;
    return this.http.get<NotificationModel[]>(environment.loadMyNotifications, { headers });
  }

  updateNotificationStatus(notifications: NotificationModel[]) {
    const headers = this.common.headers;
    return this.http.put(environment.updateNotificationStatus, notifications, { headers });
  }
}
