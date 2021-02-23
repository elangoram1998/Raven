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
import { addNewChatRoom, loadMyChatRoomss, updateAllChatRooms, updateChatRoom } from '../actions/my-chat-rooms.actions';
import { loadUserData } from '../actions/user-data.actions';


export interface MyChatRoomState extends EntityState<MyChatRoom> {
    areChatRoomsLoaded: boolean
}

export const adapter = createEntityAdapter<MyChatRoom>({
    selectId: (chatRoom: MyChatRoom) => chatRoom.user_id._id
})

export const initialState = adapter.getInitialState({
    areChatRoomsLoaded: false
});

export const myChatRoomReducers = createReducer(
    initialState,
    on(loadMyChatRoomss, (state, action) => adapter.addMany(action.myChatRooms, { ...state, areChatRoomsLoaded: true })),
    on(logout, (state, action) => adapter.removeAll(state)),
    on(addNewChatRoom, (state, action) => adapter.addOne(action.newRoom, state)),
    on(updateChatRoom, (state, action) => adapter.updateOne(action.update, state)),
    on(updateAllChatRooms, (state, action) => adapter.updateMany(action.update, state))
);

export const { selectAll } = adapter.getSelectors();


export const metaReducers: MetaReducer<MyChatRoomState>[] = !environment.production ? [] : [];
