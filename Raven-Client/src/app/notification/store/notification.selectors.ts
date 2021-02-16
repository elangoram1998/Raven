import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState, selectAll } from '../reducers';

export const selectNotificationState = createFeatureSelector<NotificationState>('notification');

export const selectAllNotification = createSelector(
    selectNotificationState,
    selectAll
);

export const areNotificationsLoaded = createSelector(
    selectNotificationState,
    state => state.isNotificationsLoaded
)