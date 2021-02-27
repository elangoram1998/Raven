import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPostsComponent } from './my-posts.component';
import { StoreModule } from '@ngrx/store';
import * as fromMyPost from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { MyPostEffects } from './my-post.effects';
import { MyPostDialogComponent } from './components/my-post-dialog/my-post-dialog.component';
import { MaterialModule } from '../material/material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// MDB Angular Pro
import { ButtonsModule, WavesModule, CollapseModule, InputsModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentSetComponent } from '../post/components/comment-set/comment-set.component';
import { PostModule } from '../post/post.module';


@NgModule({
  declarations: [MyPostsComponent, MyPostDialogComponent],
  imports: [
    PostModule,
    MDBBootstrapModule.forRoot(),
    ButtonsModule,
    InputsModule,
    WavesModule,
    CollapseModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromMyPost.myPostFeatureKey, fromMyPost.myPostReducer, { metaReducers: fromMyPost.metaReducers }),
    EffectsModule.forFeature([MyPostEffects])
  ]
})
export class MyPostsModule { }
