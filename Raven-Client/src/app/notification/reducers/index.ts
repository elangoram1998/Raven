import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { NotificationModel } from '../../model/notification';
import { addNewNotification, allNotificationsLoaded } from '../store/notification.actions';

export const notificationFeatureKey = 'notification';

export interface NotificationState extends EntityState<NotificationModel> {
  isNotificationsLoaded: boolean
}

export const adapter = createEntityAdapter<NotificationModel>({
  selectId: (notify: NotificationModel) => notify._id
});

export const initialState = adapter.getInitialState({
  isNotificationsLoaded: false
})

export const notifyReducer = createReducer(
  initialState,
  on(allNotificationsLoaded, (state, action) => adapter.addMany(action.notifications, { ...state, isNotificationsLoaded: true })),
  on(addNewNotification, (state, action) => adapter.addOne(action.notification, state))
)

export const { selectAll } = adapter.getSelectors();

export const metaReducers: MetaReducer<NotificationState>[] = !environment.production ? [] : [];


