import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createReducer,
    createSelector,
    MetaReducer,
    on
} from '@ngrx/store';
import { removeFriendSuggestion } from 'src/app/friend-suggestion/store/friend-suggestion.actions';
import { UserData } from 'src/app/model/user-data';
import { environment } from '../../../environments/environment';
import { logout } from '../actions/auth.actions';
import { loadUserData, updateMyUserData, updateUserData } from '../actions/user-data.actions';


export interface UserDataState {
    userData: UserData
}

export const initialState: UserDataState = {
    userData: {
        user_id: "",
        bio: "",
        followers: [""],
        followings: [""],
        liked_post: [""],
        saved_post: [""],
        liked_comments:[""]
    }
}

export const userDataReducers = createReducer(
    initialState,
    on(loadUserData, (state, action) => {
        return {
            userData: action.userData
        }
    }),
    on(logout, (state, action) => {
        return {
            userData: {
                user_id: "",
                bio: "",
                followers: [""],
                followings: [""],
                liked_post: [""],
                saved_post: [""],
                liked_comments:[""]
            }
        }
    }),
    on(updateUserData, (state, action) => {
        return {
            userData: action.userData
        }
    }),
    on(updateMyUserData, (state, action) => {
        return {
            userData: action.userData
        }
    })
)


export const metaReducers: MetaReducer<UserDataState>[] = !environment.production ? [] : [];
