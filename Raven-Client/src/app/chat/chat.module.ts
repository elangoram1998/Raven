import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { MaterialModule } from '../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatComponent, MessageComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule
  ]
})
export class ChatModule { }
