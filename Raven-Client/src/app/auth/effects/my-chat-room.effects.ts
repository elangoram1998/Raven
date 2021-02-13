import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { loadMyChatRoomss } from '../actions/my-chat-rooms.actions';



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

  constructor(private actions$: Actions) { }

}
