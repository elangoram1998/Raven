import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromComment from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CommentEffects } from './store/comment.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromComment.commentFeatureKey, fromComment.commentReducer, { metaReducers: fromComment.metaReducers }),
    EffectsModule.forFeature([CommentEffects])
  ]
})
export class CommentModule { }
