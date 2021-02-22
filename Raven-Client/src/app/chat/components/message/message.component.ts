import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectUserByRoomId } from 'src/app/auth/selectors/my-chat-room.selectors';
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
export class MessageComponent implements OnInit {

  roomId!: string;
  myChatRoom!: MyChatRoom;
  msgArray: Message[] = [];
  username: string = "";
  @ViewChild('scrollframe', { static: false })
  scrollFrame!: ElementRef;
  private scrollContainer: any;

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

    this.chatService.getStoredMsg(this.roomId).subscribe(
      res => {
        console.log(res)
        this.msgArray = res;
        this.scrollToBottom();
      },
      error => {
        console.log(error);
      }
    )

    this.chatService.getMessages().subscribe(
      (res: any) => {
        console.log(res);
        this.msgArray.push(res);
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

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    console.log(this.scrollContainer.scrollHeight);
  }

  private scrollToBottom(): void {
    console.log("here")
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  sendMessage() {
    console.log(this.msgForm.get('message')?.value)
    this.chatService.sendMessage(this.roomId, this.msgForm.get('message')?.value, this.username)
  }

}
