import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/auth/actions/auth.actions';
import { selectAvatar } from 'src/app/auth/selectors/user.selectors';
import { NotificationModel } from 'src/app/model/notification';
import { selectAllNotification } from 'src/app/notification/store/notification.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  avatarUrl!: Observable<string | undefined>;
  myNotifications$!: Observable<NotificationModel[]>;

  constructor(private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.avatarUrl = this.store.pipe(select(selectAvatar));
    this.myNotifications$ = this.store.pipe(select(selectAllNotification));
  }

  goToChat() {
    this.router.navigate(['myFriends']);
  }

  signOut() {
    this.store.dispatch(logout());
  }

}
