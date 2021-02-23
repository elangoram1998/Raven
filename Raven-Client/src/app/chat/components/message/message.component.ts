import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { updateChatRoom } from 'src/app/auth/actions/my-chat-rooms.actions';
import { selectSeenMsgCount, selectUserByRoomId } from 'src/app/auth/selectors/my-chat-room.selectors';
import { selectUserID, selectUsername } from 'src/app/auth/selectors/user.selectors';
import { Message } from 'src/app/model/message';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { AppState } from 'src/app/reducers';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  roomId!: string;
  myChatRoom!: MyChatRoom;
  msgArray: Message[] = [];
  username: string = "";
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;
  changes!: MyChatRoom;

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
        this.changes = { ...chatRoom };
      }
    );
    console.log(this.myChatRoom);

    this.chatService.joinRoom(this.roomId);

    this.chatService.getStoredMsg(this.roomId).subscribe(
      res => {
        console.log(res)
        this.msgArray = res;
        const arraylength = this.msgArray.length;
        if (this.myChatRoom.total_seen_messages < arraylength) {
          this.updateChatRoom(arraylength, "type1");
        }
      },
      error => {
        console.log(error);
      }
    )

    this.chatService.getMessages().subscribe(
      (res: any) => {
        console.log(res);
        this.msgArray.push(res);
        this.updateChatRoom(1, "type2");
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.store.pipe(select(selectUserID)).subscribe(
      username => {
        this.username = username || "";
      }
    )
  }

  sendMessage() {
    console.log(this.msgForm.get('message')?.value)
    this.chatService.sendMessage(this.roomId, this.msgForm.get('message')?.value, this.username);
    if (this.msgForm.valid) {
      setTimeout(() => this.formGroupDirective.resetForm(), 0)
    }
  }

  updateChatRoom(count: number, type: string) {
    if (type === "type1") {
      this.changes.total_seen_messages = count;
    }
    else if (type === "type2") {
      this.changes.total_seen_messages += 1;
    }
    const updatedChatRoom = {
      ...this.myChatRoom,
      ...this.changes
    }
    const update: Update<MyChatRoom> = {
      id: this.myChatRoom.user_id._id,
      changes: updatedChatRoom
    }
    this.store.dispatch(updateChatRoom({ update }));
  }

  ngOnDestroy(): void {
    console.log("component destroyed");
    this.chatService.updateMsgCount(this.myChatRoom.total_seen_messages, this.roomId).subscribe(
      noop,
      error => {
        console.log(error);
      }
    )
  }

}
