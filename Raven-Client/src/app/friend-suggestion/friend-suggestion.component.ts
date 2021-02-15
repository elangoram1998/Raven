import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addFollowing } from '../auth/actions/user-data.actions';
import { selectUserData } from '../auth/selectors/user-data.selectors';
import { FriendSuggestion } from '../model/friend-suggestion';
import { UserData } from '../model/user-data';
import { AppState } from '../reducers';
import { removeFriendSuggestion } from './store/friend-suggestion.actions';
import { selectAllFS } from './store/friend-suggestion.selectors';

@Component({
  selector: 'app-friend-suggestion',
  templateUrl: './friend-suggestion.component.html',
  styleUrls: ['./friend-suggestion.component.scss']
})
export class FriendSuggestionComponent implements OnInit {

  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;
  friendSuggestions$!: Observable<FriendSuggestion[]>;
  updateUserData!: UserData;
  userData!: UserData;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.friendSuggestions$ = this.store.pipe(select(selectAllFS));
    this.store.pipe(select(selectUserData)).subscribe(
      data => {
        this.userData = { ...data };
        console.log(data)
      }
    )
  }

  addFriend(userId: string) {
    console.log(userId);
    this.updateUserData = this.userData;
    console.log(this.userData);
    //this.userData.followings.push(userId);
    console.log(this.userData.user_id)
    this.userData.followings = Object.assign([], this.userData.followings);
    this.userData.followings.push(userId);
    this.store.dispatch(removeFriendSuggestion({ id: userId }));
    this.store.dispatch(addFollowing({ userData: this.userData }));
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 200), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 200), behavior: 'smooth' });
  }

}