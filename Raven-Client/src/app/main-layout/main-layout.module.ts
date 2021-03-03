import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FriendSuggestionModule } from '../friend-suggestion/friend-suggestion.module';
import { HomeResolver } from './home.resolver';
import { PostModule } from '../post/post.module';
import { AppRoutingModule } from '../app-routing.module';
import { MyFeedComponent } from './components/my-feed/my-feed.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentModule } from '../comment/comment.module';
import { ChatModule } from '../chat/chat.module';
import { ChatComponent } from '../chat/components/chat/chat.component';
import { MessageComponent } from '../chat/components/message/message.component';
import { ChatResolver } from './chat.resolver';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProfileModule } from '../profile/profile.module';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileResolver } from '../profile/profile.resolver';
import { EditProfileComponent } from '../profile/components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from '../profile/components/change-password/change-password.component';
import { NotificationModule } from '../notification/notification.module';
import { NotificationComponent } from '../notification/notification.component';
import { ViewProfileComponent } from '../profile/components/view-profile/view-profile.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    resolve: {
      home: HomeResolver
    },
    children: [
      { path: '', redirectTo: 'myFeed', pathMatch: 'full' },
      { path: 'myFeed', component: MyFeedComponent },
      {
        path: 'my-profile', component: ProfileComponent,
        resolve: {
          profile: ProfileResolver
        }
      },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: 'view-profile/:id', component: ViewProfileComponent }
    ]
  },
]

@NgModule({
  declarations: [MainLayoutComponent, MyFeedComponent, NewPostComponent, PostDialogComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FriendSuggestionModule,
    PostModule,
    ProfileModule,
    NotificationModule,
    CommentModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(homeRoutes),
  ]
})
export class MainLayoutModule { }
