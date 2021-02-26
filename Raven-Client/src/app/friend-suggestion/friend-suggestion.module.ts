import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendSuggestionComponent } from './friend-suggestion.component';
import { StoreModule } from '@ngrx/store';
import * as fromFriendSuggestion from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { FriendSuggestionEffects } from './store/friend-suggestion.effects';
import { MaterialModule } from '../material/material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [
    FriendSuggestionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forFeature(fromFriendSuggestion.friendSuggestionFeatureKey, fromFriendSuggestion.friendSuggestionReducer, { metaReducers: fromFriendSuggestion.metaReducers }),
    EffectsModule.forFeature([FriendSuggestionEffects])
  ],
  exports: [FriendSuggestionComponent]
})
export class FriendSuggestionModule { }
