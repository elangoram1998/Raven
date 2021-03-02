import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/auth/actions/auth.actions';
import { selectAvatar, selectUsername } from 'src/app/auth/selectors/user.selectors';
import { NotificationModel } from 'src/app/model/notification';
import { selectAllNotification, selectUnSeenNotificationsCount } from 'src/app/notification/store/notification.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  avatarUrl!: Observable<string | undefined>;
  myNotifications$!: Observable<NotificationModel[]>;
  myUsername!: string | undefined;
  notificationCount: number = 0;

  constructor(private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.avatarUrl = this.store.pipe(select(selectAvatar));
    this.store.pipe(select(selectUsername)).subscribe(
      username => {
        this.myUsername = username;
      }
    )
    this.myNotifications$ = this.store.pipe(select(selectAllNotification));
    this.store.pipe(select(selectUnSeenNotificationsCount)).subscribe(
      count => {
        this.notificationCount = count;
      }
    )
  }
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToChat() {
    this.router.navigate(['myFriends']);
  }

  goToNotification() {
    this.router.navigate(['notifications'], { relativeTo: this.route });
  }

  goToMyProfile() {
    this.router.navigate(['my-profile'], { relativeTo: this.route });
  }
  goToDashboard() {

  }
  goToEditProfile() {
    this.router.navigate(['edit-profile'], { relativeTo: this.route });
  }
  goToChangePassword() {
    this.router.navigate(['change-password'], { relativeTo: this.route });
  }

  signOut() {
    this.store.dispatch(logout());
  }

}
