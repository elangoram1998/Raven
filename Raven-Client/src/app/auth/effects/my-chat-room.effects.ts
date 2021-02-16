import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { addNewChatRoom, loadMyChatRoomss } from '../actions/my-chat-rooms.actions';



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
  )



  constructor(private actions$: Actions) { }

}
