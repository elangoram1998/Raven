import { createAction, props } from '@ngrx/store';
import { MyChatRoom } from '../../model/my-chat-room';

export const loadMyChatRoomss = createAction(
  '[MyChatRooms] Load MyChatRoomss',
  props<{ myChatRooms: MyChatRoom[] }>()
);



