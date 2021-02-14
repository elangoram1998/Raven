import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/auth/actions/auth.actions';
import { selectAvatar } from 'src/app/auth/selectors/user.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  avatarUrl!: Observable<string | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.avatarUrl = this.store.pipe(select(selectAvatar));
  }

  signOut() {
    this.store.dispatch(logout());
  }

}
