import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNotification from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './store/notification.effects';
import { NotificationComponent } from './notification.component';
import { NotifyBubbleComponent } from './components/notify-bubble/notify-bubble.component';
import { MaterialModule } from '../material/material/material.module';
import { PostModule } from '../post/post.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [NotificationComponent, NotifyBubbleComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    MaterialModule,
    PostModule,
    StoreModule.forFeature(fromNotification.notificationFeatureKey, fromNotification.notifyReducer, { metaReducers: fromNotification.metaReducers }),
    EffectsModule.forFeature([NotificationEffects])
  ]
})
export class NotificationModule { }
