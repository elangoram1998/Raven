import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { StoreModule } from '@ngrx/store';
import * as fromPost from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './post.effects';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { MaterialModule } from '../material/material/material.module';
import { FromNowPipe } from '../pipes/from-now.pipe';
import { CommentSetComponent } from './components/comment-set/comment-set.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// MDB Angular Pro
import { ButtonsModule, WavesModule, CollapseModule, InputsModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [PostComponent, ImageCardComponent, FromNowPipe, CommentSetComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    ButtonsModule,
    InputsModule,
    WavesModule,
    CollapseModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.postReducer, { metaReducers: fromPost.metaReducers }),
    EffectsModule.forFeature([PostEffects]),
  ],
  exports: [PostComponent,CommentSetComponent,FromNowPipe]
})
export class PostModule { }
