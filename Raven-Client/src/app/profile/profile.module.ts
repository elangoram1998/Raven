import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../material/material/material.module';
// For MDB Angular Free
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, ModalModule, WavesModule } from 'angular-bootstrap-md'
import { MyPostsModule } from '../my-posts/my-posts.module';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MyPostsModule,
    // MDBBootstrapModule.forRoot(),
    MaterialModule,
    // CarouselModule,
    // ModalModule,
    // WavesModule
  ]
})
export class ProfileModule { }
