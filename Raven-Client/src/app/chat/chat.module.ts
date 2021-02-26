import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { MaterialModule } from '../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ButtonsModule, WavesModule, CollapseModule, InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [ChatComponent, MessageComponent, MessageListComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    ScrollingModule,
    ButtonsModule,
    WavesModule,
    CollapseModule,
    InputsModule,
  ]
})
export class ChatModule { }
