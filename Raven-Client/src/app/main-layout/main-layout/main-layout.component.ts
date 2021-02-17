import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, first, tap } from 'rxjs/operators';
import { addNewChatRoom } from 'src/app/auth/actions/my-chat-rooms.actions';
import { updateUserData } from 'src/app/auth/actions/user-data.actions';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { loadFriendSuggestions } from 'src/app/friend-suggestion/store/friend-suggestion.actions';
import { areFSLoaded } from 'src/app/friend-suggestion/store/friend-suggestion.selectors';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { NotificationModel } from 'src/app/model/notification';
import { UserData } from 'src/app/model/user-data';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { addNewNotification, loadNotifications } from 'src/app/notification/store/notification.actions';
import { areNotificationsLoaded } from 'src/app/notification/store/notification.selectors';
import { AppState } from 'src/app/reducers';
import { RealTimeService } from 'src/app/utils/real-time.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  userData!: UserData;

  constructor(private store: Store<AppState>,
    private notifyService: NotificationService,
    private realTimeService: RealTimeService) { }

  ngOnInit(): void {

    this.store.pipe(select(selectUserData)).subscribe(
      data => {
        this.userData = { ...data };
        console.log(data)
      }
    )

    this.store.pipe(select(areFSLoaded)).subscribe(
      loaded => {
        if (!loaded) {
          this.store.dispatch(loadFriendSuggestions());
        }
      }
    )

    this.store.pipe(select(areNotificationsLoaded)).subscribe(
      loaded => {
        if (!loaded) {
          this.store.dispatch(loadNotifications());
        }
      }
    )

    this.notifyService.liveNotification().subscribe(
      (notification: NotificationModel) => {
        console.log(notification);
        this.store.dispatch(addNewNotification({ notification }));
      },
      (error: any) => {
        console.log(error);
      }
    )

    this.realTimeService.getChatRoomData().subscribe(
      (newRoom: MyChatRoom) => {
        console.log(newRoom);
        this.store.dispatch(addNewChatRoom({ newRoom }));
      },
      (error: any) => {
        console.log(error);
      }
    )

    this.realTimeService.getFollowData().subscribe(
      (userId: string) => {
        this.userData.followers = Object.assign([], this.userData.followers);
        this.userData.followers.push(userId);
        this.store.dispatch(updateUserData({ userData: this.userData }));
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
