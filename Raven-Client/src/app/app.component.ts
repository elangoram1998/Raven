import { Component, OnInit } from '@angular/core';
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

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userData = localStorage.getItem('userData');
    const myChatRoom = localStorage.getItem('myChatRooms');

    if (user && userData && myChatRoom) {
      this.store.dispatch(login({ user: JSON.parse(user) }));
      this.store.dispatch(loadUserData({ userData: JSON.parse(userData) }));
      this.store.dispatch(loadMyChatRoomss({ myChatRooms: JSON.parse(myChatRoom) }));
    }
  }


}
