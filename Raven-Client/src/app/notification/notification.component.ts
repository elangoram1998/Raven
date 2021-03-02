import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateUserData } from '../auth/actions/user-data.actions';
import { selectUserData } from '../auth/selectors/user-data.selectors';
import { removeFriendSuggestion } from '../friend-suggestion/store/friend-suggestion.actions';
import { NotificationModel } from '../model/notification';
import { UserData } from '../model/user-data';
import { AppState } from '../reducers';
import { updateAllNotifications } from './store/notification.actions';
import { selectAllNotification, selectUnSeenNotifications } from './store/notification.selectors';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications$!: Observable<NotificationModel[]>;
  userData!: UserData;
  unSeenNotifications: NotificationModel[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.notifications$ = this.store.pipe(select(selectAllNotification));
    this.store.pipe(select(selectUnSeenNotifications)).subscribe(
      notifications => {
        this.unSeenNotifications = notifications;
      }
    )
    this.store.pipe(select(selectUserData)).subscribe(
      userData => {
        this.userData = { ...userData };
      }
    );
    if (this.unSeenNotifications.length > 0) {
      let update = this.unSeenNotifications.map(notification => {
        let change = { ...notification };
        change.status = true;
        return Object.assign({}, { id: notification._id, changes: change });
      });
      this.store.dispatch(updateAllNotifications({ update }));
    }
  }

  addFriend(userId: string) {
    console.log(userId);
    this.userData.followings = Object.assign([], this.userData.followings);
    this.userData.followings.push(userId);
    this.store.dispatch(removeFriendSuggestion({ id: userId }));
    this.store.dispatch(updateUserData({ userData: this.userData }));
  }

}
