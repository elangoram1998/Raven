import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { login } from './auth/actions/auth.actions';
import { loadMyChatRoomss } from './auth/actions/my-chat-rooms.actions';
import { loadUserData } from './auth/actions/user-data.actions';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Raven-Client';
  loading: boolean = true;

  constructor(private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userData = localStorage.getItem('userData');
    const myChatRoom = localStorage.getItem('myChatRooms');

    if (user && userData && myChatRoom) {
      this.store.dispatch(login({ user: JSON.parse(user) }));
      this.store.dispatch(loadUserData({ userData: JSON.parse(userData) }));
      this.store.dispatch(loadMyChatRoomss({ myChatRooms: JSON.parse(myChatRoom) }));
    }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd: {
          this.loading = false;
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    })
  }


}
