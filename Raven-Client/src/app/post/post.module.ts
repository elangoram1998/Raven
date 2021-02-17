import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { StoreModule } from '@ngrx/store';
import * as fromPost from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './post.effects';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { MaterialModule } from '../material/material/material.module';


@NgModule({
  declarations: [PostComponent, ImageCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.postReducer, { metaReducers: fromPost.metaReducers }),
    EffectsModule.forFeature([PostEffects]),
  ],
  exports: [PostComponent]
})
export class PostModule { }
