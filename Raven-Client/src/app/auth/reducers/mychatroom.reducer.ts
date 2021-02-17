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
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { UserData } from 'src/app/model/user-data';
import { environment } from '../../../environments/environment';
import { logout } from '../actions/auth.actions';
import { addNewChatRoom, loadMyChatRoomss } from '../actions/my-chat-rooms.actions';
import { loadUserData } from '../actions/user-data.actions';


export interface MyChatRoomState extends EntityState<MyChatRoom> {
}

export const adapter = createEntityAdapter<MyChatRoom>({
    selectId: (chatRoom: MyChatRoom) => chatRoom.user_id
})

export const initialState = adapter.getInitialState();

export const myChatRoomReducers = createReducer(
    initialState,
    on(loadMyChatRoomss, (state, action) => adapter.addMany(action.myChatRooms, state)),
    on(logout, (state, action) => adapter.removeAll(state)),
    on(addNewChatRoom, (state, action) => adapter.addOne(action.newRoom, state)),
)


export const metaReducers: MetaReducer<MyChatRoomState>[] = !environment.production ? [] : [];
