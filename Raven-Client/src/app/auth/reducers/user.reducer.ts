import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from 'src/app/model/user';
import { environment } from '../../../environments/environment';
import { login, logout } from '../actions/auth.actions';

export interface AuthState {
  user?: User
}

export const initialState: AuthState = {
  user: undefined
}

export const authReducers = createReducer(
  initialState,
  on(login, (state, action) => {
    return {
      user: action.user
    }
  }),
  on(logout, (state, action) => {
    return {
      user: undefined
    }
  })
)


export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
