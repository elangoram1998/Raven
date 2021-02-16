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
import { addFollowing, loadUserData } from '../actions/user-data.actions';


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
            }
        }
    }),
    on(addFollowing, (state, action) => {
        return {
            userData: action.userData
        }
    })
)


export const metaReducers: MetaReducer<UserDataState>[] = !environment.production ? [] : [];
