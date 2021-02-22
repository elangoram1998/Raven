import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { MyChatRoomState, selectAll } from '../reducers/mychatroom.reducer';

export const selectMyChatRooms = createFeatureSelector<MyChatRoomState>('myChatRoom');

export const selectAllMyChatRooms = createSelector(
    selectMyChatRooms,
    selectAll
);

export const selectUserByRoomId = createSelector(
    selectAllMyChatRooms,
    (myRooms: any[], props: { id: string; }) => myRooms.find(room => room.room_id === props.id)
);