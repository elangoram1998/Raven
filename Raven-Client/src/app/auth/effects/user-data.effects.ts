import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { addFollowing, loadUserData } from '../actions/user-data.actions';



@Injectable()
export class UserDataEffects {

  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserData),
      tap(action => {
        localStorage.setItem('userData', JSON.stringify(action.userData));
      })
    ),
    { dispatch: false }
  )

  updatedUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFollowing),
      tap(action => {
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(action.userData));
      })
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions) { }

}
