import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { MyChatRoom } from 'src/app/model/my-chat-room';
import { addNewChatRoom, loadMyChatRoomss, updateAllChatRooms, updateChatRoom } from '../actions/my-chat-rooms.actions';



@Injectable()
export class MyChatRoomEffects {

  loadMyChatRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMyChatRoomss),
      tap(action => {
        localStorage.setItem('myChatRooms', JSON.stringify(action.myChatRooms))
      })
    ),
    { dispatch: false }
  );

  updateChatRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewChatRoom),
      tap(action => {
        const update = JSON.parse(localStorage.getItem('myChatRooms') || "");
        localStorage.removeItem('myChatRooms');
        update.push(action.newRoom);
        localStorage.setItem('myChatRooms', JSON.stringify(update));
      })
    ), { dispatch: false }
  );

  allUpdatedChatRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAllChatRooms),
      tap(action => {
        localStorage.removeItem('myChatRooms');
        localStorage.setItem('myChatRooms', JSON.stringify(action.update));
      })
    ), { dispatch: false }
  )

  updatedChatRoomData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateChatRoom),
      tap(action => {
        const update = JSON.parse(localStorage.getItem('myChatRooms') || "");
        localStorage.removeItem('myChatRooms');
        update.forEach((room: MyChatRoom) => {
          if (room.user_id._id === action.update.id) {
            room.total_seen_messages = action.update.changes.total_seen_messages || 0;
          }
        });
        localStorage.setItem('myChatRooms', JSON.stringify(update));
      })
    ), { dispatch: false }
  )



  constructor(private actions$: Actions) { }

}
