import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { login } from '../actions/auth.actions';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap(action => {
        localStorage.setItem('user', JSON.stringify(action.user));
      })
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions) { }

}
