import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authReducers } from '../auth/reducers/user.reducer';
import { myChatRoomReducers } from '../auth/reducers/mychatroom.reducer';
import { userDataReducers } from '../auth/reducers/userdata.reducer';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducers,
  userData: userDataReducers,
  myChatRoom: myChatRoomReducers,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
