import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authReducers } from '../auth/reducers';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducers
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
