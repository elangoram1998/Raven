import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllMyChatRooms } from 'src/app/auth/selectors/my-chat-room.selectors';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { AppState } from 'src/app/reducers';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  myFriends$ !: Observable<MyChatRoom[]>;
  friendsArray: MyChatRoom[]=[];

  constructor(private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService) { }

  ngOnInit(): void {
    this.myFriends$ = this.store.pipe(select(selectAllMyChatRooms));
  }

  getMsgCount(roomId: string, msgCount: number) {
    let count = 0;
    this.chatService.chatRoomCount(roomId).subscribe(
      res => {
        console.log(res);
        count = parseInt(res);
      },
      error => {
        console.log(error);
      }
    );
    if (count > msgCount) {
      return true;
    }
    return false;
  }

  msgCount(roomId: string, msgCount: number) {
    let count = 0;
    this.chatService.chatRoomCount(roomId).subscribe(
      res => {
        count = parseInt(res);
      },
      error => {
        console.log(error);
      }
    );
    return count - msgCount;
  }

  goToChat(roomId: string) {
    this.router.navigate(['/', roomId])
  }

}
