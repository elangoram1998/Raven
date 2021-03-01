import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserData } from 'src/app/auth/selectors/user-data.selectors';
import { NotificationModel } from 'src/app/model/notification';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-notify-bubble',
  templateUrl: './notify-bubble.component.html',
  styleUrls: ['./notify-bubble.component.scss']
})
export class NotifyBubbleComponent implements OnInit {

  @Input() notification!: NotificationModel;
  myFollowings: string[] = [];
  isFollowing: boolean = false;
  @Output() addFrind: EventEmitter<string> = new EventEmitter()

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(select(selectUserData)).subscribe(
      userData => {
        this.myFollowings = userData.followings;
        this.isFollowing = this.myFollowings.includes(this.notification.sender._id);
      }
    );
  }

  newFriend() {
    this.addFrind.emit(this.notification.sender._id);
  }

}
