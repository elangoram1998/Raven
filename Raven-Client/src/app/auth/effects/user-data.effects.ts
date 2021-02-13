import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { loadUserData } from '../actions/user-data.actions';



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

  constructor(private actions$: Actions) { }

}
