import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { NotificationModel } from 'src/app/model/notification';

export const loadNotifications = createAction(
  '[Notification] Load Notifications'
);

export const allNotificationsLoaded = createAction(
  '[All Loaded] Notifications Loaded',
  props<{ notifications: NotificationModel[] }>()
);

export const addNewNotification = createAction(
  '[Add Notification] Add One',
  props<{ notification: NotificationModel }>()
);

export const updateAllNotifications = createAction(
  '[Update All] Notifications Update',
  props<{ update: Update<NotificationModel>[] }>()
)




