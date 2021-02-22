import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectUserByRoomId } from 'src/app/auth/selectors/my-chat-room.selectors';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { AppState } from 'src/app/reducers';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  roomId!: string;
  myChatRoom!: MyChatRoom;
  array: string[] = [];

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
    private chatService: ChatService,
    private fb: FormBuilder) { }

  msgForm = this.fb.group({
    message: ['', Validators.required]
  })

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.roomId = param.id
    });
    console.log(this.roomId);
    this.store.pipe(select(selectUserByRoomId, { id: this.roomId })).subscribe(
      chatRoom => {
        this.myChatRoom = chatRoom;
      }
    );
    console.log(this.myChatRoom);
    this.chatService.joinRoom(this.roomId);
    this.chatService.getMessages().subscribe(
      (res: any) => {
        console.log(res);
        this.array.push(res);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  sendMessage() {
    console.log(this.msgForm.get('message')?.value)
    this.chatService.sendMessage(this.roomId, this.msgForm.get('message')?.value)
  }

}
