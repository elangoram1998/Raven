import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNotification from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './store/notification.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNotification.notificationFeatureKey, fromNotification.reducers, { metaReducers: fromNotification.metaReducers }),
    EffectsModule.forFeature([NotificationEffects])
  ]
})
export class NotificationModule { }
