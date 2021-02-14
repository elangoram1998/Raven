import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createReducer,
    createSelector,
    MetaReducer,
    on
} from '@ngrx/store';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { UserData } from 'src/app/model/user-data';
import { environment } from '../../../environments/environment';
import { logout } from '../actions/auth.actions';
import { loadMyChatRoomss } from '../actions/my-chat-rooms.actions';
import { loadUserData } from '../actions/user-data.actions';

export const authFeatureKey = 'auth';

export interface MyChatRoomState {
    myChatRoom: MyChatRoom[]
}

export const initialState: MyChatRoomState = {
    myChatRoom: []
}

export const myChatRoomReducers = createReducer(
    initialState,
    on(loadMyChatRoomss, (state, action) => {
        return {
            myChatRoom: action.myChatRooms
        }
    }),
    on(logout, (state, action) => {
        return {
            myChatRoom: []
        }
    })
)


export const metaReducers: MetaReducer<MyChatRoomState>[] = !environment.production ? [] : [];
