import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllMyChatRooms } from 'src/app/auth/selectors/my-chat-room.selectors';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { AppState } from 'src/app/reducers';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  myFriends$ !: Observable<MyChatRoom[]>;
  friendsArray: MyChatRoom[] = [];
  isNoFriends: boolean = true;

  constructor(private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.myFriends$ = this.store.pipe(select(selectAllMyChatRooms));
    this.myFriends$.subscribe(
      friend => {
        if (friend.length > 0) {
          this.isNoFriends = false;
        }
      }
    )
  }

  goToChat(roomId: string) {
    this.router.navigate(['/', roomId])
  }

}
