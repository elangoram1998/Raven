import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { NotificationModel } from 'src/app/model/notification';
import { NotificationService } from '../services/notification.service';
import { allNotificationsLoaded, loadNotifications, updateAllNotifications } from './notification.actions';



@Injectable()
export class NotificationEffects {

  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      concatMap(action => this.notifyService.getMyNotifications()),
      map(notifications => allNotificationsLoaded({ notifications }))
    )
  );

  updateNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAllNotifications),
      tap(action => {
        let update: any[] = []
        action.update.forEach(notification => {
          update.push(notification.changes._id);
        });
        console.log("updated array: " + update);
        this.notifyService.updateNotificationStatus(update)
      }),
    )
  )

  constructor(private actions$: Actions, private notifyService: NotificationService) { }

}
