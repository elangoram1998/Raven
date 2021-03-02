import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../material/material/material.module';
// For MDB Angular Free
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, ModalModule, WavesModule } from 'angular-bootstrap-md'
import { MyPostsModule } from '../my-posts/my-posts.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListFollowComponent } from './components/list-follow/list-follow.component';


@NgModule({
  declarations: [ProfileComponent, EditProfileComponent, ChangePasswordComponent, ListFollowComponent],
  imports: [
    MyPostsModule,
    ReactiveFormsModule,
    CommonModule,
    MyPostsModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    SharedModule
    // CarouselModule,
    // ModalModule,
    // WavesModule
  ]
})
export class ProfileModule { }
