import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserID } from 'src/app/auth/selectors/user.selectors';
import { AppState } from 'src/app/reducers';
import { WenSocketService } from 'src/app/utils/wen-socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends WenSocketService {

  myUserID!: string | undefined;

  constructor(private store: Store<AppState>) {
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
}
