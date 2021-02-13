import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createReducer,
    createSelector,
    MetaReducer,
    on
} from '@ngrx/store';
import { UserData } from 'src/app/model/user-data';
import { environment } from '../../../environments/environment';
import { loadUserData } from '../actions/user-data.actions';

export const authFeatureKey = 'auth';

export interface UserDataState {
    userData: UserData
}

export const initialState: UserDataState = {
    userData: {
        user_id: "",
        followers: [""],
        followings: [""],
        liked_post: [""],
        saved_post: [""]
    }
}

export const userDataReducers = createReducer(
    initialState,
    on(loadUserData, (state, action) => {
        return {
            userData: action.userData
        }
    })
)


export const metaReducers: MetaReducer<UserDataState>[] = !environment.production ? [] : [];
