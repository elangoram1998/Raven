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
import { login } from '../auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const initialState: AuthState = {
  user: {
    _id: "",
    username: "",
    email: "",
    profile_type: "",
    user_type: "",
  }
}

export const authReducers = createReducer(
  initialState,
  on(login, (state, action) => {
    return {
      user: action.user
    }
  })
)


export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
