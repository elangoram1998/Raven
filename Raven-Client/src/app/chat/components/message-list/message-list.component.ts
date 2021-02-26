import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserID } from 'src/app/auth/selectors/user.selectors';
import { Message } from 'src/app/model/message';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements AfterViewInit {

  @Input() messageList!: Message[];
  @ViewChild('scrollframe', { static: false })
  scrollFrame!: ElementRef;
  @ViewChildren('item') itemElements!: QueryList<any>;
  myUserId!: String;

  private scrollContainer: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log("message list count: " + this.messageList);
    this.store.pipe(select(selectUserID)).subscribe(
      user_id => {
        this.myUserId = user_id || "";
      }
    );
    console.log("my user Id: " + this.myUserId);
  }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    console.log(this.scrollContainer)
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
    console.log(this.scrollContainer.scrollHeight);
  }

  scrolled(event: any): void {
    //console.log(this.scrollContainer.scrollTop);
  }
}
