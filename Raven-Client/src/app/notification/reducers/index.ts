import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const notificationFeatureKey = 'notification';

export interface NotificationState {

}

export const reducers: ActionReducerMap<NotificationState> = {

};


export const metaReducers: MetaReducer<NotificationState>[] = !environment.production ? [] : [];
