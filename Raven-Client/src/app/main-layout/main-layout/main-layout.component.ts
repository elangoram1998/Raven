import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, first, tap } from 'rxjs/operators';
import { loadFriendSuggestions } from 'src/app/friend-suggestion/store/friend-suggestion.actions';
import { areFSLoaded } from 'src/app/friend-suggestion/store/friend-suggestion.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.pipe(select(areFSLoaded)).subscribe(
      loaded => {
        if (!loaded) {
          this.store.dispatch(loadFriendSuggestions())
        }
      }
    )
  }

}
