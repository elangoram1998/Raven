import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { MaterialModule } from '../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MessageListComponent } from './components/message-list/message-list.component';


@NgModule({
  declarations: [ChatComponent, MessageComponent, MessageListComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    ScrollingModule
  ]
})
export class ChatModule { }
