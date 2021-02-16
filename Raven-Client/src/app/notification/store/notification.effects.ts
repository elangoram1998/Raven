import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { allNotificationsLoaded, loadNotifications } from './notification.actions';



@Injectable()
export class NotificationEffects {

  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      concatMap(action => this.notifyService.getMyNotifications()),
      map(notifications => allNotificationsLoaded({ notifications }))
    )
  )

  constructor(private actions$: Actions, private notifyService: NotificationService) { }

}
